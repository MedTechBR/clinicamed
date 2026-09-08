#!/usr/bin/env python3
"""Compoe as figuras de ECG real da monografia de sindromes coronarianas.

Origem: aula SINDROME CORONARIANA AGUDA do internato, bitmaps originais via pdfimages.

Por que ECG real ao lado do sintetico: `gera_figuras.py` desenha o padrao no ponto exato que o
texto quer mostrar, e por isso ensina o CRITERIO melhor. Mas o tracado de papel tem o ruido, a
linha de base que oscila e a caligrafia do plantao — e e nele que a prova pratica acontece. Os
dois juntos ensinam mais do que qualquer um sozinho.

TRIAGEM: nenhuma destas traz marca de terceiro; a faixa de cabecalho do ECG, onde o aparelho
imprime nome e data, ja vinha recortada nos bitmaps. Conferido ampliando topo e rodape de cada uma.
"""
from PIL import Image
import pathlib

ORIG = pathlib.Path.home() / "Documents/Claude/_acervo-aulas"
DEST = pathlib.Path.home() / "Documents/Claude/clinicamed/leituras/fig/foto"
DEST.mkdir(parents=True, exist_ok=True)
TETO = 1400
# Papel de ECG e o pior caso para o WebP: a grade milimetrada e ruido de alta frequencia em toda a
# area da imagem. Com qualidade 82 e 1600 px o conjunto dava 932 KB — quase metade do que a
# biblioteca offline inteira pesava. Em 1400 px e qualidade 68 o tracado continua legivel no zoom
# e o conjunto cai para um terco disso. Medir sempre: aqui a compressao nao se comporta como nas
# radiografias, que sao suaves.
QUALIDADE = 68


def salva(nome, arq, teto=TETO):
    im = Image.open(ORIG / (arq + ".png")).convert("RGB")
    if im.width > teto:
        im = im.resize((teto, int(im.height * teto / im.width)), Image.LANCZOS)
    alvo = DEST / (nome + ".webp")
    im.save(alvo, quality=QUALIDADE, method=6)
    return im.size, alvo.stat().st_size


saidas = {
    "foto-ecg-inferior": salva("foto-ecg-inferior", "ecg-945"),
    "foto-ecg-precordiais-direitas": salva("foto-ecg-precordiais-direitas", "ecg-946"),
    "foto-ecg-posterior-anotado": salva("foto-ecg-posterior-anotado", "ecg-976"),
    "foto-ecg-infra-avr": salva("foto-ecg-infra-avr", "ecg-1015"),
    "foto-ecg-sgarbossa": salva("foto-ecg-sgarbossa", "ecg-940"),
}
tot = 0
for k in saidas:
    dim, peso = saidas[k]
    print("%-32s %dx%d  %d KB" % (k, dim[0], dim[1], peso // 1024))
    tot += peso
print("total %d KB" % (tot // 1024))
