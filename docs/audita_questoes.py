#!/usr/bin/env python3
"""Mede as questões do banco contra as METAS TIRADAS DAS PROVAS REAIS que já estão nele.

Por que assim: em 09/09/2026 o Matheus disse que as questões estavam fáceis demais para residente
de clínica médica. Em vez de eu inventar um critério de dificuldade, o critério sai das 211
questões de banca de verdade que o banco já tinha (Revalida, USP, ENARE) — elas são a régua, e a
distância entre elas e as 750 geradas era gritante:

                        prova real     geradas (antes)
  enunciado                101 pal          27 pal
  alternativa               7,8 pal         14,2 pal
  distratores absurdos      0,02/questão     1,42/questão
  vinheta clínica            87%             50%
  dígitos no enunciado      13,8             2,6
  correta é a mais longa     29%             42%   (acaso = 20%)

Alternativa comprida é o tell mais traiçoeiro: quando a correta precisa de 14 palavras para ser
correta, ela vira a única que "explica" — e o candidato acerta sem saber medicina. Ver
[[reference_questoes_ia_vies_tamanho]].

Uso: python3 docs/audita_questoes.py            # só o veredito
     python3 docs/audita_questoes.py --lista    # lista as reprovadas
     python3 docs/audita_questoes.py --json X   # audita um lote novo antes de aplicar
"""
import argparse
import json
import pathlib
import re
import statistics
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent

# Absolutos e fórmulas de distrator-espantalho. Não é lista de palavras proibidas: é lista do que
# transforma uma alternativa em descarte automático — ninguém marca "não discutir com o paciente".
ABSURDO = re.compile(
    r"\b(nunca|jamais|sem qualquer|sem nenhum|exclusivamente|todos os pacientes|em todos os|"
    r"em nenhum caso|imediatamente sem|sem avalia\w*|sem prepar\w*|não discutir|ignorar|"
    r"para todos os|independentemente de qualquer|dispensa qualquer|substitui qualquer)\b", re.I)
VINHETA = re.compile(r"\b(\d{1,3}\s*anos|homem|mulher|paciente de|gestante|idos[ao]|lactente|"
                     r"criança|recém-nascid[ao]|adolescente)\b", re.I)

def carrega_banco():
    s = (RAIZ / "banco.js").read_text()
    return json.loads(re.search(r"=\s*(\[.*\]);?\s*$", s, re.S).group(1))


def mede(x):
    alts, g = x["alts"], x["gab"]
    dis = [a for i, a in enumerate(alts) if i != g]
    return dict(
        pal=len(x["q"].split()),
        alt_med=statistics.mean(len(a.split()) for a in alts),
        alt_max=max(len(a.split()) for a in alts),
        absurdos=sum(1 for a in dis if ABSURDO.search(a)),
        vinheta=bool(VINHETA.search(x["q"])),
        digitos=len(re.findall(r"\d", x["q"])),
        # em PALAVRAS e ESTRITAMENTE maior. Em caracteres, com >=, o empate conta como viés e a
        # própria banca "falha" em 29%; medido assim, a banca dá 19% — abaixo do acaso de 24%,
        # que é o esperado: em prova de verdade a correta não é a alternativa comprida.
        cor_maior=len(alts[g].split()) > max(len(a.split()) for i, a in enumerate(alts) if i != g),
        n_alts=len(alts),
    )


# DUAS RÉGUAS, e a distinção é o que faz o instrumento prestar.
#
# Individual (falha sempre): só o que é errado em QUALQUER questão de residência — distrator
# espantalho, alternativa repetida, gabarito inválido. Absurdo reprova 0% das questões de banca
# e 79% das geradas: é o discriminador de verdade.
#
# De lote (estatística): tamanho de enunciado, vinheta e dígitos NÃO servem como critério
# individual — há questão de banca legítima com 22 palavras e nenhum número ("o único critério
# que NÃO faz parte do BISAP é..."). A primeira versão desta régua reprovava 48% das provas
# reais; medir uma questão conceitual com a régua da vinheta é o mesmo erro de calibração que já
# me custou quatro medições erradas nos ECGs. O que se mede por lote é a DISTRIBUIÇÃO, contra a
# das 211 questões de banca que o próprio banco carrega.
LOTE = dict(pal_mediana=70, alt_media=10.5, vinheta=0.75, digitos_mediana=6, folga_longa=0.08)


def falhas(x):
    """Só o que é defeito em qualquer questão, isolada."""
    m = mede(x)
    f = []
    if m["absurdos"]:
        f.append("%d distrator(es) com absoluto/espantalho" % m["absurdos"])
    if len(set(a.strip().lower() for a in x["alts"])) != len(x["alts"]):
        f.append("alternativas repetidas")
    if not (0 <= x["gab"] < len(x["alts"])):
        f.append("gabarito fora da faixa")
    if m["n_alts"] < 4:
        f.append("menos de 4 alternativas")
    return f


def falhas_lote(qs):
    """O que só faz sentido no conjunto."""
    ms = [mede(x) for x in qs]
    f = []
    med_pal = statistics.median(m["pal"] for m in ms)
    if med_pal < LOTE["pal_mediana"]:
        f.append("mediana de %.0f palavras por enunciado (banca: 95; meta ≥ %d)" % (med_pal, LOTE["pal_mediana"]))
    alt = statistics.mean(m["alt_med"] for m in ms)
    if alt > LOTE["alt_media"]:
        f.append("alternativas com média de %.1f palavras (banca: 7,8; meta ≤ %.1f)" % (alt, LOTE["alt_media"]))
    vin = statistics.mean(m["vinheta"] for m in ms)
    if vin < LOTE["vinheta"]:
        f.append("vinheta clínica em %.0f%% (banca: 87%%; meta ≥ %.0f%%)" % (100 * vin, 100 * LOTE["vinheta"]))
    dig = statistics.median(m["digitos"] for m in ms)
    if dig < LOTE["digitos_mediana"]:
        f.append("mediana de %.0f dígitos por enunciado (banca: 8; meta ≥ %d)" % (dig, LOTE["digitos_mediana"]))
    acaso = statistics.mean(1 / m["n_alts"] for m in ms)
    obs = statistics.mean(m["cor_maior"] for m in ms)
    if obs > acaso + LOTE["folga_longa"]:
        f.append("correta é a mais longa em %.0f%% (acaso %.0f%%) — viés de tamanho" % (100 * obs, 100 * acaso))
    return f


def veredito(qs, rot, lista=False):
    ruins = [(i, x, falhas(x)) for i, x in enumerate(qs)]
    ruins = [r for r in ruins if r[2]]
    ms = [mede(x) for x in qs]
    fl = falhas_lote(qs)
    print("%s: %d questões · %d com defeito individual (%.0f%%) · %d desvio(s) de lote" % (
        rot, len(qs), len(ruins), 100 * len(ruins) / max(1, len(qs)), len(fl)))
    print("  enunciado %.0f pal (mediana %.0f) · alternativa %.1f pal · absurdos %.2f/questão · "
          "vinheta %.0f%% · dígitos %.1f · correta+longa %.0f%%" % (
              statistics.mean(m["pal"] for m in ms), statistics.median(m["pal"] for m in ms),
              statistics.mean(m["alt_med"] for m in ms), statistics.mean(m["absurdos"] for m in ms),
              100 * statistics.mean(m["vinheta"] for m in ms),
              statistics.mean(m["digitos"] for m in ms), 100 * statistics.mean(m["cor_maior"] for m in ms)))
    for y in fl:
        print("  LOTE: " + y)
    if lista:
        for i, x, f in ruins:
            print("\n  #%d [%s/%s] %s" % (i, x["tema"], x.get("nivel"), x["q"][:110]))
            for y in f:
                print("      · " + y)
    return len(ruins) + len(fl)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lista", action="store_true")
    ap.add_argument("--json")
    a = ap.parse_args()
    if a.json:
        return veredito(json.loads(pathlib.Path(a.json).read_text()), "lote " + a.json, a.lista) and 1 or 0
    q = carrega_banco()
    veredito([x for x in q if x.get("fonte")], "PROVA REAL (a régua)")
    print()
    n = veredito([x for x in q if not x.get("fonte")], "GERADAS", a.lista)
    return 1 if n else 0


if __name__ == "__main__":
    sys.exit(main())
