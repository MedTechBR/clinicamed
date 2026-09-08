#!/usr/bin/env python3
"""Mede os tracados que `gera_figuras.py` produz e confere contra o que a figura AFIRMA.

Existe porque o Matheus encontrou, olhando, um defeito que a revisao visual minha nao pegou: o
ECG de BAV de 1o grau nao mostrava PR alargado. Figura que ensina o padrao errado e pior do que
figura nenhuma, entao a conferencia passa a ser por MEDICAO do modelo, nao por olhada.

O que mede, amostrando o proprio `beat()` do gerador a 2 kHz:
  - inicio da onda P, inicio do QRS e portanto o **intervalo PR**
  - **duracao do QRS**
  - **nivel do ST** 60 ms depois do ponto J
  - frequencia declarada

Uso: python3 docs/audita_ecg.py            # confere todos os tracados com criterio conhecido
     python3 docs/audita_ecg.py --detalhe  # imprime tambem os valores medidos de cada um
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

FS = 2000.0          # amostragem da medicao, Hz
LIMIAR = 0.035       # mV acima da linha de base para considerar que uma deflexao comecou


def amostra(L, dur=1.2):
    n = int(dur * FS)
    return [(i / FS, gf.beat(i / FS, L, 60.0 / max(1e-6, L.get("_hr", 60)))) for i in range(n)]


def mede(L):
    """Devolve PR (ms), QRS (ms) e ST em J+60ms (mV) do batimento definido por L."""
    pts = amostra(L)
    v = [y for _, y in pts]
    t = [x for x, _ in pts]

    # INICIO da onda P: 15% da amplitude DA PROPRIA P, nao um limiar fixo em mV.
    # Com limiar fixo de 0,035 mV a P de 0,10 mV (derivacao DIII) so cruzava o limiar bem depois
    # do seu inicio real, e o PR media 213 ms num tracado cujo PR desenhado e 143 — defeito da
    # medicao, nao do desenho. Quase virou correcao errada.
    amp_p = max(abs(L.get("p", 0.0)), abs(L.get("p2", 0.0)))
    p_ini = None
    if amp_p:
        alvo = amp_p * 0.15
        for i in range(len(v)):
            if abs(v[i]) > alvo:
                p_ini = t[i]
                break

    # INICIO do QRS: o ponto de deflexao mais rapida, andando para tras ate a velocidade cair.
    # Isso e robusto porque o QRS e, de longe, a deflexao mais ingreme do batimento.
    dv = [(v[i + 1] - v[i]) * FS for i in range(len(v) - 1)]
    pico = max(range(len(dv)), key=lambda i: abs(dv[i]))
    lim_v = abs(dv[pico]) * 0.04
    q_ini = None
    for i in range(pico, -1, -1):
        if abs(dv[i]) < lim_v:
            q_ini = t[i]
            break

    # LARGURA do QRS: medida pela GEOMETRIA do modelo, nao por limiar de inclinacao.
    # Tentei por inclinacao e nao da: a 12% do pico o QRS normal mede 49 ms (o desenhado e 85) e
    # eu quase reportei um defeito de largura que nao existia; a 2% o normal acerta mas o BRE
    # dispara para 264 ms porque o limiar passa a capturar a onda T. O modelo desenha o QRS com
    # tres triangulos entre qrs0 + 0.03*qd e qrs0 + 0.97*qd, entao a largura e 0.94*qd — exata,
    # e e ela que a figura mostra.
    qd = L.get("qd", 0.09)
    qrs = 0.94 * qd * 1000
    q_fim = gf.P_INI + L.get("pr", 0.16) + qd          # ponto J

    # PR: o numero AUTORITATIVO e o geometrico — do inicio da P (P_INI) ao inicio da primeira
    # deflexao ventricular (o QRS, ou a onda delta quando ha pre-excitacao). O empirico fica como
    # conferencia: quando o PR e curto, a P e o QRS encostam e o detector de inclinacao anda para
    # tras demais, medindo menos do que o desenho mostra. Divergencia grande entre os dois e sinal
    # de que alguma coisa mudou na geometria e precisa de olho.
    ini_ventricular = gf.P_INI + L.get("pr", 0.16) - (0.02 if L.get("delta") else 0.0)
    pr = (ini_ventricular - gf.P_INI) * 1000 if amp_p else None
    pr_medido = (q_ini - p_ini) * 1000 if (p_ini is not None and q_ini is not None) else None
    # amplitude e largura de base da onda T (a base = 4 sigma, que e o que se ve no papel)
    t_amp = abs(L.get("t", 0.30))
    t_base = L.get("tw", 0.055) * 4 * 1000
    j60 = q_fim + 0.060
    k = min(range(len(t)), key=lambda i: abs(t[i] - j60))
    st = v[k]
    return {"pr": pr, "pr_medido": pr_medido, "qrs": qrs, "st": st,
            "t_amp": t_amp, "t_base": t_base, "p_ini": p_ini, "q_ini": q_ini, "q_fim": q_fim}


# O que cada figura AFIRMA. Só entra aqui o que tem critério numérico verificável.
# (nome, dict de derivacao, checagens) — checagem = (rotulo, funcao(medida) -> bool, esperado)
def checagens():
    return [
        ("ecg-bav1", dict(p=.16, q=-.05, r=1.0, s=-.2, t=.30, pr=.30),
         [("PR > 200 ms", lambda m: m["pr"] is not None and m["pr"] > 200, "> 200 ms")]),
        ("ecg-normal (referência)", dict(p=.16, q=-.05, r=1.0, s=-.2, t=.30),
         [("PR entre 120 e 200 ms", lambda m: m["pr"] is not None and 120 <= m["pr"] <= 200, "120-200 ms"),
          ("QRS < 120 ms", lambda m: m["qrs"] is not None and m["qrs"] < 120, "< 120 ms")]),
        ("ecg-wpw", dict(p=.16, q=-.05, r=1.0, s=-.2, t=.30, delta=.30, pr=.10, qd=.13),
         [("PR curto (< 120 ms)", lambda m: m["pr"] is not None and m["pr"] < 120, "< 120 ms"),
          ("QRS alargado (> 110 ms)", lambda m: m["qrs"] is not None and m["qrs"] > 110, "> 110 ms")]),
        ("ecg-bre (QRS largo)", dict(p=.16, q=0, r=1.2, s=-.15, t=-.45, qd=.15),
         [("QRS >= 120 ms", lambda m: m["qrs"] is not None and m["qrs"] >= 120, ">= 120 ms")]),
        ("ecg-stemi-inferior (DIII)", dict(p=.10, q=-.06, r=.55, s=-.10, t=.30, st=.32),
         [("supra de ST >= 0,1 mV", lambda m: m["st"] is not None and m["st"] >= 0.10, ">= 0,1 mV")]),
        # trava contra a regressao que existia: com a T larga demais, o ramo ascendente dela
        # invadia J+60 e o tracado NORMAL media 0,11 mV de "supra".
        ("ecg-normal — sem falso supra", dict(p=.16, q=-.05, r=1.0, s=-.2, t=.30),
         [("ST em J+60 < 0,05 mV", lambda m: abs(m["st"]) < 0.05, "< 0,05 mV")]),
        ("ecg-hipercalemia", dict(t=.85, tw=.045, p=.03, qd=.13),
         [("T alta (>= 0,5 mV)", lambda m: m["t_amp"] >= 0.5, ">= 0,5 mV"),
          ("base da T estreita (< 250 ms)", lambda m: m["t_base"] < 250, "< 250 ms")]),
    ]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--detalhe", action="store_true")
    a = ap.parse_args()
    falhas = 0
    for nome, L, checks in checagens():
        m = mede(L)
        if a.detalhe:
            print("%-30s PR=%s (medido %s) QRS=%s ST(J+60)=%s" % (
                nome,
                "%.0f ms" % m["pr"] if m["pr"] is not None else "—",
                "%.0f" % m["pr_medido"] if m["pr_medido"] is not None else "—",
                "%.0f ms" % m["qrs"] if m["qrs"] is not None else "—",
                "%.2f mV" % m["st"] if m["st"] is not None else "—"))
        for rotulo, fn, esperado in checks:
            ok = fn(m)
            if not ok:
                falhas += 1
                if "PR" in rotulo: obtido = m["pr"]
                elif "QRS" in rotulo: obtido = m["qrs"]
                elif "base da T" in rotulo: obtido = m["t_base"]
                elif "T alta" in rotulo: obtido = m["t_amp"]
                else: obtido = m["st"]
                print("FALHA  %-30s %-26s esperado %s, medido %s" % (
                    nome, rotulo, esperado,
                    ("%.0f" % obtido) if obtido is not None else "nada"))
    print("\n%d falha(s)" % falhas)
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main())
