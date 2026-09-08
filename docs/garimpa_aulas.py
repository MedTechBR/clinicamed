#!/usr/bin/env python3
"""Garimpo das aulas do internato: temas (texto) e imagens médicas (bitmaps).

Serve ClínicaMed e RadioTítulo. As aulas ficam em ~/Documents/Estácio IDOMED/ e são material
DIDÁTICO MISTO: parte das imagens é do acervo do Matheus, parte veio de atlas, site e PACS de
terceiro. Este script NÃO decide o que pode ser publicado — ele só reduz o monte para um tamanho
em que dá para olhar imagem por imagem. A triagem visual é obrigatória e é o passo seguinte.

Por que extrair o BITMAP e não recortar o slide: `pdfimages` devolve a imagem original embutida,
sem o fundo do Keynote, sem a legenda e na resolução nativa. Recorte de slide renderizado perde
resolução e carrega o desenho do tema.

O peneiramento automático usa três sinais:
  - tamanho: abaixo de 300x250 é ícone, logo ou marcador;
  - saturação: radiografia, TC, US e ECG são quase acromáticos; prancha de atlas e foto de banco
    de imagem são coloridas. A mediana da saturação separa os dois grupos muito bem;
  - repetição: o mesmo bitmap aparece em vários slides (logo, papel de fundo) — hash perceptual
    simples (média 8x8) descarta a partir da terceira ocorrência.

Uso:
    python3 garimpa_aulas.py --saida /caminho/de/trabalho          # tudo
    python3 garimpa_aulas.py --saida ... --aula "SEPSE"            # uma aula
    python3 garimpa_aulas.py --saida ... --so-texto                # só o mapa de temas
"""
import argparse
import collections
import json
import pathlib
import re
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

AULAS = pathlib.Path.home() / "Documents/Estácio IDOMED/AULAS EMERGÊNCIAS CLÍNICAS"
TEMAS = pathlib.Path.home() / "Documents/Estácio IDOMED/Temas e Competências das Disciplinas"
FONTE_TTF = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

MIN_L, MIN_A = 300, 250
SAT_MAX = 26          # mediana de saturação (0-255) acima disso = ilustração colorida
REPETE_MAX = 2        # bitmap que aparece mais que isso é elemento de tema


def texto(pdf: pathlib.Path) -> str:
    r = subprocess.run(["pdftotext", "-layout", str(pdf), "-"],
                       capture_output=True, text=True)
    return r.stdout


def assinatura(im: Image.Image) -> str:
    """Hash perceptual bem simples: 8x8 em cinza, cada pixel acima da média vira 1."""
    g = im.convert("L").resize((8, 8), Image.BILINEAR)
    px = list(g.getdata())
    m = sum(px) / len(px)
    return "".join("1" if p > m else "0" for p in px)


def satura(im: Image.Image) -> float:
    p = im.convert("RGB").resize((60, 60), Image.BILINEAR)
    vals = sorted(max(r, g, b) - min(r, g, b) for r, g, b in p.getdata())
    return vals[len(vals) // 2]


def extrai(pdf: pathlib.Path, dest: pathlib.Path) -> list:
    bruto = dest / "_bruto"
    if bruto.exists():
        shutil.rmtree(bruto)
    bruto.mkdir(parents=True)
    subprocess.run(["pdfimages", "-png", str(pdf), str(bruto / "b")], check=True)

    cand, vistos = [], collections.Counter()
    for f in sorted(bruto.glob("*.png")):
        try:
            im = Image.open(f)
        except Exception:
            continue
        if im.width < MIN_L or im.height < MIN_A:
            continue
        s = satura(im)
        if s > SAT_MAX:
            continue
        a = assinatura(im)
        vistos[a] += 1
        if vistos[a] > REPETE_MAX:
            continue
        cand.append({"arq": f, "w": im.width, "h": im.height, "sat": s, "sig": a})
    return cand


def folhas(cand: list, dest: pathlib.Path, rotulo: str) -> int:
    """Contatos de 12 por folha, numerados — o número é como se marca o que fica."""
    COL, CW, CH = 4, 330, 330
    fonte = ImageFont.truetype(FONTE_TTF, 15)
    n = 0
    for k in range(0, len(cand), 12):
        lote = cand[k:k + 12]
        linhas = (len(lote) + COL - 1) // COL
        folha = Image.new("RGB", (COL * CW, linhas * (CH + 22)), "white")
        d = ImageDraw.Draw(folha)
        for i, c in enumerate(lote):
            im = Image.open(c["arq"]).convert("RGB")
            im.thumbnail((CW - 10, CH - 10))
            x, y = (i % COL) * CW, (i // COL) * (CH + 22)
            folha.paste(im, (x + 5, y + 22))
            d.text((x + 5, y + 4), "%03d  %dx%d" % (k + i, c["w"], c["h"]),
                   fill=(0, 0, 0), font=fonte)
        n += 1
        folha.save(dest / ("contato-%02d.jpg" % n), quality=86)
    return n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--saida", required=True)
    ap.add_argument("--aula", default=None, help="filtra pelo nome do arquivo")
    ap.add_argument("--so-texto", action="store_true")
    a = ap.parse_args()

    raiz = pathlib.Path(a.saida)
    raiz.mkdir(parents=True, exist_ok=True)

    # mapa de temas: as aulas mais as ementas oficiais das sete disciplinas
    mapa = {}
    for pasta in (AULAS, TEMAS):
        for pdf in sorted(pasta.glob("*.pdf")):
            t = texto(pdf)
            (raiz / ("txt-" + re.sub(r"[^A-Za-z0-9]+", "-", pdf.stem)[:60] + ".txt")).write_text(t)
            mapa[pdf.name] = {"pasta": pasta.name, "palavras": len(t.split()),
                              "paginas": t.count("\f") + 1}
    (raiz / "_mapa.json").write_text(json.dumps(mapa, ensure_ascii=False, indent=1))
    print("texto extraído de %d PDFs" % len(mapa))
    if a.so_texto:
        return

    total = 0
    for pdf in sorted(AULAS.glob("*.pdf")):
        if a.aula and a.aula.lower() not in pdf.stem.lower():
            continue
        slug = re.sub(r"[^A-Za-z0-9]+", "-", pdf.stem).strip("-")[:40]
        dest = raiz / slug
        dest.mkdir(parents=True, exist_ok=True)
        cand = extrai(pdf, dest)
        nf = folhas(cand, dest, slug)
        json.dump([{k: (str(v) if k == "arq" else v) for k, v in c.items()} for c in cand],
                  open(dest / "_candidatas.json", "w"), ensure_ascii=False, indent=1)
        print("%-46s %3d candidatas em %d folhas" % (pdf.stem[:46], len(cand), nf))
        total += len(cand)
    print("total: %d candidatas" % total)


if __name__ == "__main__":
    main()
