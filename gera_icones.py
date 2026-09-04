#!/usr/bin/env python3
"""Ícones do ClínicaMed: traçado de ECG sobre papel quente, no teal da marca.
   Gera icons/icon-192.png, icon-512.png e icon-maskable-512.png."""
from PIL import Image, ImageDraw

TEAL = (11, 106, 114, 255)
PAPEL = (250, 245, 241, 255)
GRADE = (226, 200, 186, 255)

def tracado(tam, margem):
    """Pontos do complexo QRS normalizados na largura útil."""
    x0, x1 = margem, tam - margem
    L = x1 - x0
    c = tam / 2
    amp = tam * 0.20
    # (fração da largura, deslocamento vertical em múltiplos de amp)
    pts = [(0.00, 0.0), (0.16, 0.0), (0.24, -0.35), (0.32, 0.0), (0.42, 0.30),
           (0.50, -1.00), (0.58, 0.55), (0.66, 0.0), (0.78, -0.45), (0.88, 0.0), (1.00, 0.0)]
    return [(x0 + fx * L, c + fy * amp) for fx, fy in pts]

def icone(tam, maskable=False):
    im = Image.new("RGBA", (tam, tam), PAPEL)
    d = ImageDraw.Draw(im)
    passo = tam // 8
    for i in range(1, 8):                      # grade do papel milimetrado
        d.line([(i * passo, 0), (i * passo, tam)], fill=GRADE, width=max(1, tam // 190))
        d.line([(0, i * passo), (tam, i * passo)], fill=GRADE, width=max(1, tam // 190))
    margem = tam * (0.26 if maskable else 0.13)
    d.line(tracado(tam, margem), fill=TEAL, width=max(3, round(tam * 0.055)), joint="curve")
    return im

for tam in (192, 512):
    icone(tam).save(f"icons/icon-{tam}.png")
icone(512, maskable=True).save("icons/icon-maskable-512.png")
print("ícones gerados")
