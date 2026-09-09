#!/usr/bin/env python3
"""Aplica um lote de questões reescritas ao banco.js, por índice, com trava de auditoria.

O lote é um JSON: {"indice": {campos reescritos}, ...}. Só entra se passar em
`docs/audita_questoes.py` — individualmente (zero distrator espantalho) e como lote (distribuição
de enunciado, alternativa, vinheta e dígitos parecida com a das 211 questões de banca do banco).

Uso: python3 docs/aplica_lote.py lote.json [--forca]
"""
import json
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "docs"))
import audita_questoes as A                                   # noqa: E402

OBRIG = ("q", "alts", "gab", "coment", "porAlt")


def main():
    arq = sys.argv[1]
    forca = "--forca" in sys.argv
    lote = json.loads(pathlib.Path(arq).read_text())
    q = A.carrega_banco()
    novas = []
    for k, v in lote.items():
        i = int(k)
        if q[i].get("fonte"):
            raise SystemExit("#%d é questão de banca — não se reescreve prova real" % i)
        for c in OBRIG:
            if c not in v:
                raise SystemExit("#%d sem campo %s" % (i, c))
        if len(v["porAlt"]) != len(v["alts"]):
            raise SystemExit("#%d porAlt com %d itens para %d alternativas" % (i, len(v["porAlt"]), len(v["alts"])))
        nova = dict(q[i]); nova.update(v)
        novas.append((i, nova))

    ruins = [(i, A.falhas(n)) for i, n in novas]
    ruins = [r for r in ruins if r[1]]
    fl = A.falhas_lote([n for _, n in novas])
    print("lote: %d questões · %d com defeito individual · %d desvio(s) de lote" % (len(novas), len(ruins), len(fl)))
    for i, f in ruins:
        print("  #%d: %s" % (i, "; ".join(f)))
    for y in fl:
        print("  LOTE: " + y)
    if (ruins or fl) and not forca:
        raise SystemExit("nada aplicado")

    for i, n in novas:
        q[i] = n
    s = (RAIZ / "banco.js").read_text()
    corpo = json.dumps(q, ensure_ascii=False, indent=1)
    # substituição por FATIA, não por re.sub: o JSON está cheio de barras invertidas (\u, \")
    # e o replacement de re.sub as interpreta como escape — foi assim que a primeira versão
    # corrompeu o banco inteiro num caractere de controle inválido.
    i = s.index("=", s.index("window.BANCO"))
    (RAIZ / "banco.js").write_text(s[:i] + "=" + corpo + ";\n")
    A.carrega_banco()                                          # relê: se não parseia, o build quebra aqui
    print("aplicadas %d questões · banco com %d" % (len(novas), len(q)))


if __name__ == "__main__":
    main()
