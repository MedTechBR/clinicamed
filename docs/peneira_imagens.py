#!/usr/bin/env python3
"""Segunda peneira sobre os bitmaps já extraídos por garimpa_aulas.py.

A primeira peneira (tamanho + saturação) reduziu ~4.000 imagens para ~840, mas deixou passar
duas famílias inúteis que, olhando as folhas de contato, dominavam o volume:

  - **frame preto/uniforme**: poster de vídeo embutido no Keynote. Acromático e grande, passa
    liso pelo filtro de saturação. Peneira: desvio-padrão do cinza abaixo de 12.
  - **tabela e slide de texto**: fundo branco com letra preta. Também é acromático. Peneira:
    fração de pixels quase brancos (>238) acima de 45% — radiografia, TC e US têm fundo escuro
    e tom contínuo; tabela é quase toda papel.

Sobra o que interessa: imagem médica de tom contínuo. O que ainda passa (prancha de atlas,
figura de artigo) só a triagem visual separa — e é para isso que existem as folhas de contato.

Uso: python3 peneira_imagens.py --saida <dir do garimpo> [--aula PARTE_DO_NOME]
"""
import argparse
import glob
import json
import os
import pathlib
import re

from PIL import Image, ImageDraw, ImageFont

FONTE_TTF = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
STD_MIN = 12.0        # abaixo disso a imagem é lisa: frame preto, fundo, gradiente
BRANCO_MAX = 0.45     # acima disso é papel com letra: tabela, fluxograma, slide de texto
MIN_L, MIN_A = 300, 250


def metricas(im: Image.Image):
    g = im.convert("L").resize((96, 96), Image.BILINEAR)
    px = list(g.getdata())
    n = len(px)
    m = sum(px) / n
    var = sum((p - m) ** 2 for p in px) / n
    branco = sum(1 for p in px if p > 238) / n
    return var ** 0.5, branco


def assinatura(im: Image.Image) -> str:
    g = im.convert("L").resize((8, 8), Image.BILINEAR)
    px = list(g.getdata())
    m = sum(px) / len(px)
    return "".join("1" if p > m else "0" for p in px)


def nota_exame(im: Image.Image) -> float:
    """Quanto a imagem 'parece exame' — para as reais virem primeiro na folha de contato.

    Radiografia, TC e US: fundo escuro, quase sem cor, e a informação é tom contínuo.
    Prancha de atlas e ilustração de banco: fundo claro, cor saturada, áreas chapadas.
    Sem isso, a folha 1 de cada aula vem cheia de boneco e o exame fica na folha 5.
    """
    p = im.convert("RGB").resize((64, 64), Image.BILINEAR)
    dados = list(p.getdata())
    n = len(dados)
    escuro = sum(1 for r, g, b in dados if max(r, g, b) < 70) / n
    sat = sum(max(r, g, b) - min(r, g, b) for r, g, b in dados) / n
    # cinza chapado (áreas de cor uniforme) denuncia desenho vetorial
    g = im.convert("L").resize((64, 64), Image.BILINEAR)
    px = list(g.getdata())
    chapado = sum(1 for i in range(1, len(px)) if px[i] == px[i - 1]) / len(px)
    return escuro * 2.0 - sat / 40.0 - chapado


def peneira(bruto: pathlib.Path):
    fica, vistos = [], set()
    for f in sorted(bruto.glob("*.png")):
        try:
            im = Image.open(f)
        except Exception:
            continue
        if im.width < MIN_L or im.height < MIN_A:
            continue
        std, branco = metricas(im)
        if std < STD_MIN or branco > BRANCO_MAX:
            continue
        a = assinatura(im)
        if a in vistos:
            continue
        vistos.add(a)
        fica.append({"arq": str(f), "w": im.width, "h": im.height,
                     "std": round(std, 1), "branco": round(branco, 2),
                     "exame": round(nota_exame(im), 3)})
    fica.sort(key=lambda c: -c["exame"])
    return fica


def folhas(cand, dest: pathlib.Path, prefixo="peneira"):
    for velho in dest.glob(prefixo + "-*.jpg"):
        velho.unlink()
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
        folha.save(dest / ("%s-%02d.jpg" % (prefixo, n)), quality=86)
    return n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--saida", required=True)
    ap.add_argument("--aula", default=None)
    a = ap.parse_args()
    raiz = pathlib.Path(a.saida)
    tot = 0
    for d in sorted(p for p in raiz.iterdir() if p.is_dir()):
        if a.aula and a.aula.lower() not in d.name.lower():
            continue
        bruto = d / "_bruto"
        if not bruto.exists():
            continue
        cand = peneira(bruto)
        nf = folhas(cand, d)
        json.dump(cand, open(d / "_peneiradas.json", "w"), ensure_ascii=False, indent=1)
        antes = len(json.load(open(d / "_candidatas.json"))) if (d / "_candidatas.json").exists() else 0
        print("%-44s %3d -> %3d  (%d folhas)" % (d.name[:44], antes, len(cand), nf))
        tot += len(cand)
    print("total peneirado: %d" % tot)


if __name__ == "__main__":
    main()
