"""Monta as figuras fotograficas da monografia de radiografia de torax.

As radiografias saem dos bitmaps ORIGINAIS embutidos no PDF da aula (pdfimages), nao de
recorte do slide: assim vem sem o fundo azul, sem a legenda do slide e na resolucao nativa.
So entram imagens SEM marca de terceiro e SEM identificacao de paciente -- a conferencia foi
feita olhando cada uma em resolucao alta. A unica identificacao encontrada ("PILAR", canto
superior esquerdo de s025-002) e coberta aqui.
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

FT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
DEST = pathlib.Path.home() / "Documents/Claude/clinicamed/leituras/fig/foto"
DEST.mkdir(parents=True, exist_ok=True)
TINTA = (35, 39, 46)


def abre(n):
    return Image.open("bm/%s.png" % n).convert("RGB")


def corta_borda(im, tol=18):
    """Tira a moldura preta uniforme que sobra de digitalizacao."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()

    def escura(vals):
        return sum(vals) / len(vals) < tol

    top = 0
    while top < h - 2 and escura([px[x, top] for x in range(0, w, max(1, w // 60))]):
        top += 1
    bot = h - 1
    while bot > top + 2 and escura([px[x, bot] for x in range(0, w, max(1, w // 60))]):
        bot -= 1
    passo = max(1, (bot - top) // 60)
    esq = 0
    while esq < w - 2 and escura([px[esq, y] for y in range(top, bot, passo)]):
        esq += 1
    dire = w - 1
    while dire > esq + 2 and escura([px[dire, y] for y in range(top, bot, passo)]):
        dire -= 1
    return im.crop((esq, top, dire + 1, bot + 1))


def corta_uniforme(im, tol=10):
    """Tira a margem de cor uniforme (clara ou escura) que o slide deixou em volta.

    corta_borda so sabe cortar preto; os montados da aula (rotacao, inspiracao) vem com
    uma faixa cinza-clara em cima e embaixo que, na figura, vira espaco morto."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()

    def uniforme(vals):
        return max(vals) - min(vals) < tol

    def amostra_h(y):
        return [px[x, y] for x in range(0, w, max(1, w // 80))]

    def amostra_v(x, a, b):
        return [px[x, y] for y in range(a, b, max(1, (b - a) // 80))]

    top = 0
    while top < h - 2 and uniforme(amostra_h(top)):
        top += 1
    bot = h - 1
    while bot > top + 2 and uniforme(amostra_h(bot)):
        bot -= 1
    esq = 0
    while esq < w - 2 and uniforme(amostra_v(esq, top, bot)):
        esq += 1
    dire = w - 1
    while dire > esq + 2 and uniforme(amostra_v(dire, top, bot)):
        dire -= 1
    return im.crop((esq, top, dire + 1, bot + 1))


def tapa(im, caixa):
    """Cobre identificacao queimada na imagem."""
    ImageDraw.Draw(im).rectangle(caixa, fill=(0, 0, 0))
    return im


def painel(nome, itens, larg=1080, rotulo_h=34, margem=10):
    """itens = [(imagem, rotulo)]. Fundo branco nos dois temas, como as outras figuras."""
    n = len(itens)
    cw = (larg - margem * (n + 1)) // n
    ims = []
    for im, _ in itens:
        r = cw / im.width
        ims.append(im.resize((cw, max(1, int(im.height * r))), Image.LANCZOS))
    ch = max(i.height for i in ims)
    tem_rot = any(r for _, r in itens)
    alt = ch + margem * 2 + (rotulo_h if tem_rot else 0)
    folha = Image.new("RGB", (larg, alt), "white")
    d = ImageDraw.Draw(folha)
    f = ImageFont.truetype(FT, 20)
    for i, (im, rot) in enumerate(zip(ims, [r for _, r in itens])):
        x = margem + i * (cw + margem)
        folha.paste(im, (x, margem + (ch - im.height) // 2))
        if rot:
            d.text((x + cw // 2, margem + ch + 8), rot, fill=TINTA, font=f, anchor="ma")
    alvo = DEST / ("%s.webp" % nome)
    folha.save(alvo, quality=80, method=6)
    return folha.size, alvo.stat().st_size


saidas = {}

sub = corta_borda(abre("s025-000"))
adeq = corta_borda(tapa(abre("s025-002"), (0, 0, 190, 60)))
sup = corta_borda(abre("s025-001"))
saidas["foto-penetracao"] = painel(
    "foto-penetracao",
    [(sub, "subpenetrada"), (adeq, "adequada"), (sup, "superpenetrada")])

saidas["foto-rotacao"] = painel(
    "foto-rotacao", [(corta_uniforme(abre("s026-000")), "")])
saidas["foto-inspiracao"] = painel(
    "foto-inspiracao", [(corta_uniforme(abre("s028-001")), "")])

saidas["foto-pa-perfil"] = painel(
    "foto-pa-perfil",
    [(corta_borda(abre("s039-003")), "frente (PA)"),
     (corta_borda(abre("s039-004")), "perfil")])

saidas["foto-nodulo"] = painel("foto-nodulo", [(abre("s048-001"), "")])

saidas["foto-pneumotorax-pneumectomia"] = painel(
    "foto-pneumotorax-pneumectomia",
    [(corta_borda(abre("s056-002")), "pneumotorax"),
     (corta_borda(abre("s056-001")), "pneumectomia")])

saidas["foto-cardiomegalia"] = painel(
    "foto-cardiomegalia", [(corta_borda(abre("s073-001")), "")], larg=680)
saidas["foto-pneumoperitonio"] = painel(
    "foto-pneumoperitonio", [(corta_borda(abre("s091-001")), "")], larg=820)
saidas["foto-esquecidos"] = painel(
    "foto-esquecidos", [(corta_borda(abre("s105-001")), "")], larg=760)

tot = 0
for k in saidas:
    dim, peso = saidas[k]
    print("%-34s %dx%d  %d KB" % (k, dim[0], dim[1], peso // 1024))
    tot += peso
print("total %d KB em %s" % (tot // 1024, DEST))
