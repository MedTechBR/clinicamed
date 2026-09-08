"""Compoe as figuras de ultrassom pulmonar da monografia de derrame pleural.

Origem: aula INSUFICIENCIA RESPIRATORIA do internato, bitmaps originais via pdfimages.

TRIAGEM: duas imagens desse mesmo conjunto (perfil C / pneumonia e o par TEP-TVP) trazem a
marca d'agua circular do **THE POCUS ATLAS** no canto inferior direito, e uma terceira ("A lines",
legenda em ingles) tem toda a cara de vir do mesmo acervo com a marca recortada. As tres ficaram
de fora: o ClinicaMed e publico e pago. Entram so as sem marca.
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

FT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ORIG = pathlib.Path.home() / "Documents/Claude/_acervo-aulas"
DEST = pathlib.Path.home() / "Documents/Claude/clinicamed/leituras/fig/foto"
DEST.mkdir(parents=True, exist_ok=True)
TINTA = (35, 39, 46)


def painel(nome, itens, larg=1080, margem=10, rotulo_h=34):
    n = len(itens)
    cw = (larg - margem * (n + 1)) // n
    ims = []
    for arq, _ in itens:
        im = Image.open(ORIG / (arq + ".png")).convert("RGB")
        r = cw / im.width
        ims.append(im.resize((cw, max(1, int(im.height * r))), Image.LANCZOS))
    ch = max(i.height for i in ims)
    tem_rot = any(r for _, r in itens)
    folha = Image.new("RGB", (larg, ch + margem * 2 + (rotulo_h if tem_rot else 0)), "white")
    d = ImageDraw.Draw(folha)
    f = ImageFont.truetype(FT, 20)
    for i, (im, (_, rot)) in enumerate(zip(ims, itens)):
        x = margem + i * (cw + margem)
        folha.paste(im, (x, margem + (ch - im.height) // 2))
        if rot:
            d.text((x + cw // 2, margem + ch + 8), rot, fill=TINTA, font=f, anchor="ma")
    alvo = DEST / (nome + ".webp")
    folha.save(alvo, quality=82, method=6)
    return folha.size, alvo.stat().st_size


saidas = {
    "foto-us-normal": painel("foto-us-normal", [("us-095", "")], larg=1000),
    "foto-us-derrame": painel("foto-us-derrame", [("us-101", "")], larg=1000),
    "foto-us-linhas-b": painel("foto-us-linhas-b", [("us-096", "")], larg=620),
    "foto-us-pneumotorax": painel("foto-us-pneumotorax", [("us-104", "")], larg=760),
    "foto-us-linha-pleural": painel("foto-us-linha-pleural", [("us-091", "")], larg=560),
}
tot = 0
for k, (dim, peso) in saidas.items():
    print("%-26s %dx%d  %d KB" % (k, dim[0], dim[1], peso // 1024))
    tot += peso
print("total %d KB" % (tot // 1024))
