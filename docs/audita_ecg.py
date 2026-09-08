#!/usr/bin/env python3
"""Mede o que `gera_figuras.py` DESENHA e confere contra o que cada figura AFIRMA.

Existe porque o Matheus achou, olhando, dois defeitos que a revisão visual minha não pegou:
  08/09 (1) o ECG de BAV de 1º grau não tinha PR alargado — `pr` era inerte no modelo;
  08/09 (2) a TV monomórfica, anunciada com "QRS > 120 ms", desenhava 124 ms com aspecto de
            taquicardia supraventricular: sem onda q, o triângulo da R começava em 0,24·qd e o
            complexo saía 27% mais estreito do que a legenda dizia.

A primeira versão deste arquivo só conferia 7 traçados e calculava a largura do QRS como
0,94·qd — fórmula que só vale quando existe onda q. Ou seja: o instrumento não pegava (2)
porque estava errado do mesmo jeito que o desenho. Agora:

  * as figuras NÃO são listadas à mão: `svg12`/`svgtira`/`svgpainel` são instrumentadas e
    devolvem título, nota, frequência e os parâmetros de cada derivação de TODAS as figuras;
  * a largura do QRS sai da geometria dos componentes que existem naquela derivação;
  * as tiras montadas à mão (Mobitz I e II, BAVT, TV com dissociação) são conferidas pelas
    constantes do próprio gerador, não por números repetidos aqui.

Uso: python3 docs/audita_ecg.py            # falha (código 1) se alguma afirmação não se sustenta
     python3 docs/audita_ecg.py --detalhe  # imprime as medidas de cada derivação
"""
import argparse
import importlib.util
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("gf", RAIZ / "gera_figuras.py")
gf = importlib.util.module_from_spec(spec)
sys.modules["gf"] = gf
spec.loader.exec_module(gf)

# posição nominal de cada componente do QRS dentro da janela 0.03·qd .. 0.97·qd
COMP = [("q", 0.18, 0.15, 0.15), ("r", 0.45, 0.21, 0.21),
        ("s", 0.78, 0.19, 0.19), ("r2", 0.95, 0.17, 0.17)]


def figuras():
    """Todas as figuras construídas pelos três montadores, com o que elas afirmam."""
    reg = []

    def instrumenta(nome):
        orig = getattr(gf, nome)

        def envelope(*a, **k):
            if nome == "svg12":
                leads, tit, hr = a[0], a[1], a[2]
            elif nome == "svgtira":
                leads, tit, hr = {"II": a[0]}, a[1], a[2]
            else:
                leads, tit, hr = {n: a[1][n] for n in a[0]}, a[2], a[3]
            reg.append(dict(titulo=tit, nota=k.get("nota", ""), hr=hr, leads=leads))
            return orig(*a, **k)
        setattr(gf, nome, envelope)

    for n in ("svg12", "svgtira", "svgpainel"):
        instrumenta(n)
    gf.catalogo()
    gf.catalogo2()
    return reg


def mede(L, hr=60.0):
    """Medidas do batimento definido por L, em ms e mV — pela geometria, que é exata."""
    rr = 60.0 / hr
    qd = L.get("qd", 0.09)
    tem_p = bool(L.get("p", 0.0) or L.get("p2", 0.0))
    pr = L.get("pr", 0.16 if tem_p else 0.0)
    qrs0 = gf.P_INI + pr

    # largura do QRS: do primeiro ao último componente QUE EXISTE nesta derivação.
    # Medir por limiar de inclinação não funciona: a 12% do pico o QRS normal de 85 ms mede 49 ms
    # (quase reportei um defeito inexistente) e a 2% o BRE dispara para 264 ms porque o limiar
    # passa a capturar a onda T.
    pres = [c for c in COMP if L.get(c[0], 0.0)]
    if pres:
        ini = min(pres[0][1] - max(pres[0][2], pres[0][1] - 0.03), 0.03)
        fim = max(pres[-1][1] + max(pres[-1][3], 0.97 - pres[-1][1]), 0.97)
        qrs = (fim - ini) * qd
    else:
        ini, fim, qrs = 0.0, 0.0, 0.0
    j = qrs0 + fim * qd                                   # ponto J
    # a onda delta antecipa o início da ativação ventricular em 20 ms
    ini_vent = qrs0 + ini * qd - (0.02 if L.get("delta") else 0.0)

    tem_p = bool(L.get("p", 0.0) or L.get("p2", 0.0))
    esc = gf.qt_escala(rr)                                # QT encurta com a frequência
    tw = L.get("tw", 0.055 * esc)
    tc = qrs0 + qd + L.get("tdel", 0.16 * esc)
    return {
        "pr": (ini_vent - gf.P_INI) * 1000 if tem_p else None,
        "qrs": qrs * 1000,
        "p_larg": 4 * gf.P_SIG * 1000 if tem_p else None,
        "st_j": gf.beat(j + 0.005, L, rr),
        "st_j60": gf.beat(j + 0.060, L, rr),
        "t_amp": L.get("t", 0.30),
        "t_base": 4 * tw * 1000,
        "t_fim": (tc + 2 * tw) * 1000,
        "rr": rr * 1000,
        "u": L.get("u", 0.0),
        "r_s": abs(L.get("r", 0.0)) / max(1e-6, abs(L.get("s", 0.0))),
    }


# ----------------------------------------------------------------- afirmações de cada figura
# (trecho do título, lista de regras). regra = (rótulo, derivações ou None p/ todas, teste)
# `todas` = a regra vale para cada derivação listada; se `derivs` é None, vale para todas.
def R(rotulo, derivs, teste, modo="todas"):
    return (rotulo, derivs, teste, modo)


AFIRMACOES = [
    ("Traçado normal", [
        R("PR 120–200 ms", None, lambda m: m["pr"] is None or 120 <= m["pr"] <= 200),
        R("QRS < 120 ms", None, lambda m: m["qrs"] < 120),
        R("sem supra nem infra em J+60", None, lambda m: abs(m["st_j60"]) < 0.05),
        R("onda P <= 120 ms", None, lambda m: m["p_larg"] is None or m["p_larg"] <= 120),
    ]),
    ("Supra de ST em II, III e aVF", [
        R("supra >= 0,1 mV", ["II", "III", "aVF"], lambda m: m["st_j60"] >= 0.10),
        R("imagem recíproca", ["I", "aVL"], lambda m: m["st_j60"] <= -0.05),
    ]),
    ("Supra de ST de V1 a V4", [
        R("supra >= 0,1 mV", ["V1", "V2", "V3", "V4"], lambda m: m["st_j60"] >= 0.10),
    ]),
    ("Infra de ST com R alta em V1–V3", [
        R("infra <= -0,05 mV", ["V1", "V2", "V3"], lambda m: m["st_j60"] <= -0.05),
        R("R/S > 1", ["V1", "V2"], lambda m: m["r_s"] > 1.0),
    ]),
    ("Infra de ST em várias derivações com supra em aVR", [
        R("supra em aVR", ["aVR"], lambda m: m["st_j60"] >= 0.05),
        R("infra em >= 6 derivações", None, lambda m: m["st_j60"] <= -0.05, modo="conta>=6"),
    ]),
    ("Taquicardia de QRS estreito", [
        R("QRS < 120 ms", None, lambda m: m["qrs"] < 120),
        R("sem onda P", None, lambda m: m["pr"] is None),
    ]),
    ("Taquicardia de QRS largo", [
        R("QRS > 120 ms", None, lambda m: m["qrs"] > 120),
        R("T não invade o batimento seguinte", None, lambda m: m["t_fim"] < m["rr"] + 60),
    ]),
    ("FA pré-excitada", [
        R("QRS largo (> 120 ms)", None, lambda m: m["qrs"] > 120),
    ]),
    ("PR curto com onda delta", [
        R("PR < 120 ms", None, lambda m: m["pr"] is None or m["pr"] < 120),
        R("QRS > 110 ms", None, lambda m: m["qrs"] > 110),
    ]),
    ("BAV de 1º grau", [
        R("PR ~ 300 ms", None, lambda m: m["pr"] is not None and 280 <= m["pr"] <= 320),
    ]),
    ("Ondas T apiculadas e estreitas", [
        R("T >= 0,5 mV", None, lambda m: m["t_amp"] >= 0.5),
        R("base da T < 250 ms", None, lambda m: m["t_base"] < 250),
        R("QRS alargando (> 100 ms)", None, lambda m: m["qrs"] > 100),
    ]),
    ("Supra de ST descendente em V1–V2", [
        R("supra >= 0,2 mV", ["V1", "V2"], lambda m: m["st_j60"] >= 0.20),
        R("T negativa", ["V1", "V2"], lambda m: m["t_amp"] < 0),
    ]),
    ("Supra de ST difuso", [
        R("supra em >= 7 derivações", None, lambda m: m["st_j60"] >= 0.10, modo="conta>=7"),
        R("aVR na contramão", ["aVR"], lambda m: m["st_j60"] < 0),
    ]),
    ("S em I, Q e T invertida em III", [
        R("S em I", ["I"], lambda m: m["r_s"] < 3),
        R("T negativa", ["III", "V1", "V2", "V3", "V4"], lambda m: m["t_amp"] < 0),
    ]),
    ("QRS ≥ 120 ms, R alargada", [
        R("QRS >= 120 ms em TODA derivação", None, lambda m: m["qrs"] >= 120),
    ]),
    ("QRS ≥ 120 ms com rSR'", [
        R("QRS >= 120 ms em TODA derivação", None, lambda m: m["qrs"] >= 120),
    ]),
    ("Voltagem alta", [
        R("QRS ainda estreito", None, lambda m: m["qrs"] < 120),
    ]),
    ("T achatada", [
        R("T <= 0,15 mV", None, lambda m: abs(m["t_amp"]) <= 0.15),
        R("onda U presente", None, lambda m: m["u"] >= 0.15),
    ]),
    ("Estimulação ventricular", [
        R("QRS largo (> 120 ms)", None, lambda m: m["qrs"] > 120),
    ]),
    ("Supra de ST em V3R–V4R", [
        R("supra >= 0,05 mV (0,5 mm)", ["V3R", "V4R"], lambda m: m["st_j60"] >= 0.05),
    ]),
    ("Infra de ST ascendente no ponto J", [
        R("infra no ponto J", None, lambda m: m["st_j"] <= -0.10),
        R("T alta (>= 0,8 mV)", None, lambda m: m["t_amp"] >= 0.80),
    ]),
    ("Bigeminismo ventricular", [
        R("o batimento sinusal é estreito", None, lambda m: m["qrs"] < 120),
    ]),
]

# regras que valem para TODA derivação de TODA figura
UNIVERSAIS = [
    R("onda P <= 120 ms", None, lambda m: m["p_larg"] is None or m["p_larg"] <= 120),
    R("T termina antes do batimento seguinte", None, lambda m: m["t_fim"] < m["rr"] + 80),
    R("QRS cabe no ciclo", None, lambda m: m["qrs"] < m["rr"] * 0.75),
]


def aplica(nome, leads, hr, regras, falhas, detalhe=False):
    for rotulo, derivs, teste, modo in regras:
        alvo = {k: v for k, v in leads.items() if derivs is None or k in derivs}
        if derivs and not alvo:
            continue
        if modo.startswith("conta>="):
            n = sum(1 for v in alvo.values() if teste(mede(v, hr)))
            if n < int(modo.split(">=")[1]):
                falhas.append("%-46s %-38s só %d derivação(ões)" % (nome, rotulo, n))
            continue
        for d, L in sorted(alvo.items()):
            m = mede(L, hr)
            if not teste(m):
                falhas.append("%-46s %-38s %s: PR=%s QRS=%.0f ST(J+60)=%.2f T=%.2f/%.0fms" % (
                    nome, rotulo, d,
                    "%.0f" % m["pr"] if m["pr"] is not None else "—",
                    m["qrs"], m["st_j60"], m["t_amp"], m["t_base"]))


def fidelidade(figs, falhas):
    """O desenho tem de valer o que o modelo diz: a decimação não pode comer pico nem ST.

    `_rala` descarta pontos que o traço não distingue. Com a versão antiga do filtro (que só
    olhava o ponto do meio e nunca movia o âncora) o erro somava, e ao dobrar a amostragem o
    desenho saiu 0,3 mV fora do modelo — 3 mm no papel. Aqui se compara o que sobra depois do
    filtro com o traçado cheio."""
    for f in figs:
        for d, L in sorted(f["leads"].items()):
            cheio = gf.traco(L, 3.0, f["hr"], seed=13)
            xy = [(x * gf.MM_S, -v * gf.MM_MV) for x, v in cheio]
            ralo = gf._rala(xy)
            for rot, fn in (("pico", max), ("vale", min)):
                a = fn(v for _, v in cheio)
                b = fn(-y / gf.MM_MV for _, y in ralo)
                if abs(a - b) > 0.02:
                    falhas.append("%-46s %s %s do desenho %.3f mV × modelo %.3f mV"
                                  % (f["titulo"][:44], d, rot, b, a))


def tiras_manuais(falhas):
    """As tiras montadas à mão não passam por svg12/svgtira — conferidas pelas constantes."""
    pr = [p for p in gf.WENCKEBACH_PR if p]
    if not all(b > a for a, b in zip(pr, pr[1:])):
        falhas.append("Mobitz I: o PR precisa alongar a cada batimento — %s" % pr)
    if not (120 <= pr[0] * 1000 <= 200):
        falhas.append("Mobitz I: o primeiro PR do ciclo devia ser normal — %.0f ms" % (pr[0] * 1000))
    if pr[-1] * 1000 <= 200:
        falhas.append("Mobitz I: o último PR conduzido devia estar alargado — %.0f ms" % (pr[-1] * 1000))
    if len(gf.WENCKEBACH_PR) - len(pr) != 1:
        falhas.append("Mobitz I: o ciclo precisa de exatamente uma P bloqueada")
    if not (120 <= gf.MOBITZ2_PR * 1000 <= 220):
        falhas.append("Mobitz II: PR fixo fora da faixa — %.0f ms" % (gf.MOBITZ2_PR * 1000))
    if abs(gf.BAVT_ESC_RR / gf.BAVT_P_RR - round(gf.BAVT_ESC_RR / gf.BAVT_P_RR)) < 0.08:
        falhas.append("BAVT: átrio e escape estão em razão inteira — não parece dissociação")
    if 60 / gf.BAVT_ESC_RR > 50:
        falhas.append("BAVT: escape a %.0f bpm é rápido demais" % (60 / gf.BAVT_ESC_RR))
    if abs(gf.TVD_RR / gf.TVD_P_RR - round(gf.TVD_RR / gf.TVD_P_RR)) < 0.08:
        falhas.append("TV com dissociação: ventrículo e átrio em razão inteira")
    if 60 / gf.TVD_RR < 120:
        falhas.append("TV com dissociação: %.0f bpm não é taquicardia" % (60 / gf.TVD_RR))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--detalhe", action="store_true")
    a = ap.parse_args()
    falhas = []
    figs = figuras()
    for f in figs:
        nome = f["titulo"][:44]
        aplica(nome, f["leads"], f["hr"], UNIVERSAIS, falhas)
        for trecho, regras in AFIRMACOES:
            if trecho in f["titulo"]:
                aplica(nome, f["leads"], f["hr"], regras, falhas)
        if a.detalhe:
            for d, L in sorted(f["leads"].items()):
                m = mede(L, f["hr"])
                print("%-46s %-4s PR=%-6s QRS=%3.0f ST(J+60)=%+.2f T=%+.2f/%.0fms" % (
                    nome, d, "%.0f" % m["pr"] if m["pr"] is not None else "—",
                    m["qrs"], m["st_j60"], m["t_amp"], m["t_base"]))
    # a extrassístole do bigeminismo é desenhada dentro de traco(), não é uma derivação
    m = mede(gf.EXTRA_BIGEM, 68)
    if m["qrs"] <= 120:
        falhas.append("Bigeminismo: a extrassístole devia ser larga — QRS %.0f ms" % m["qrs"])
    if m["pr"] is not None:
        falhas.append("Bigeminismo: a extrassístole não pode ter onda P")
    fidelidade(figs, falhas)
    tiras_manuais(falhas)

    for x in falhas:
        print("FALHA  " + x)
    print("\n%d figura(s) conferida(s) · %d falha(s)" % (len(figs) + 6, len(falhas)))
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main())
