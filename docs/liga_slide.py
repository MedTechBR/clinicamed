#!/usr/bin/env python3
"""Liga cada bitmap extraído ao SLIDE de onde ele saiu, e ao texto daquele slide.

Por que isso importa: sem o slide, uma TC de crânio solta é só uma TC de crânio. Com o slide,
ela herda o rótulo que a aula deu ("AVC isquêmico", "hematoma subdural", "fratura de costelas"),
que é o `diagnostico` do RadioTítulo e a legenda da figura no ClínicaMed. Continua sendo rótulo
de aula, não laudo — o campo `confirmado` do sidecar diz exatamente isso, e é o que impede o app
de afirmar mais do que a fonte sustenta.

`pdfimages -png X root` numera os arquivos pela ORDEM DA LISTA, não por página; `pdfimages -list`
devolve a página de cada índice na mesma ordem. É essa correspondência que amarra os dois.

Uso: python3 liga_slide.py <PDF da aula> <dir da aula no garimpo> [--indices 0,3,7]
"""
import argparse
import json
import pathlib
import re
import subprocess


def mapa_paginas(pdf: pathlib.Path):
    r = subprocess.run(["pdfimages", "-list", str(pdf)], capture_output=True, text=True)
    paginas = []
    for linha in r.stdout.splitlines()[2:]:
        campos = linha.split()
        if len(campos) < 3:
            continue
        try:
            paginas.append(int(campos[0]))
        except ValueError:
            continue
    return paginas


def texto_por_pagina(pdf: pathlib.Path):
    r = subprocess.run(["pdftotext", "-layout", str(pdf), "-"], capture_output=True, text=True)
    return [" ".join(p.split()) for p in r.stdout.split("\f")]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("dir")
    ap.add_argument("--indices", default=None, help="lista separada por vírgula; padrão = todos os peneirados")
    a = ap.parse_args()

    pdf = pathlib.Path(a.pdf).expanduser()
    d = pathlib.Path(a.dir)
    paginas = mapa_paginas(pdf)
    textos = texto_por_pagina(pdf)

    peneiradas = json.load(open(d / "_peneiradas.json"))
    if a.indices:
        alvos = [int(x) for x in a.indices.split(",")]
        peneiradas = [peneiradas[i] for i in alvos if i < len(peneiradas)]

    saida = []
    for c in peneiradas:
        m = re.search(r"-(\d+)\.png$", c["arq"])
        if not m:
            continue
        idx = int(m.group(1))
        pag = paginas[idx] if idx < len(paginas) else None
        txt = textos[pag - 1][:220] if pag and pag - 1 < len(textos) else ""
        saida.append({"idx": idx, "pagina": pag, "arq": c["arq"],
                      "dim": [c["w"], c["h"]], "slide": txt})
    print(json.dumps(saida, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
