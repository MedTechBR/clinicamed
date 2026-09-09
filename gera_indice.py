#!/usr/bin/env python3
"""Gera indice-leituras.js: título, resumo e os cabeçalhos (h2/h3 com id) de cada leitura.

É o que alimenta a busca global do app — "onde está o critério de Light?" acha a seção, não só
o arquivo. Indexar o texto inteiro custaria ~1 MB a mais no carregamento; os cabeçalhos mais o
resumo do leituras.js cobrem o que se procura numa revisão. Rodar antes do bump.py.
"""
import re, pathlib, json, html

itens = []
for f in sorted(pathlib.Path('leituras').glob('*.html')):
    if f.name.startswith('_'): continue
    s = f.read_text()
    tit = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S)
    secs = []
    for m in re.finditer(r'<h([23])[^>]*\bid="([^"]+)"[^>]*>(.*?)</h\1>', s, re.S):
        txt = html.unescape(re.sub(r'<[^>]+>', '', m.group(3))).strip()
        txt = re.sub(r'^\d+(\.\d+)*\.\s*', '', txt)
        if txt: secs.append({'id': m.group(2), 't': txt})
    palavras = len(re.sub(r'<[^>]+>', ' ', s).split())
    itens.append({'f': f.name, 'h': secs, 'w': palavras,
                  'fx': len(re.findall(r'class="mermaid"', s))})
cat = pathlib.Path('leituras/fig/_catalogo.json')
figs = sorted(json.loads(cat.read_text()).keys()) if cat.exists() else []
# Os traçados reais do PTB-XL são SVG como os esquemas, mas saem de outro gerador
# (docs/ptbxl_figuras.py) e têm catálogo próprio. Sem juntar aqui, a biblioteca offline
# baixaria os esquemas e deixaria de fora justamente os 13 eletrocardiogramas de paciente.
real = pathlib.Path('leituras/fig/_catalogo_real.json')
if real.exists():
    figs = sorted(set(figs) | set(json.loads(real.read_text()).keys()))
# As radiografias são raster e ficam em fig/foto/*.webp, fora do catálogo do gerador de SVG.
# Precisam de lista própria, senão a biblioteca offline baixa os esquemas e deixa as fotos de fora.
fotos = sorted(p.stem for p in pathlib.Path('leituras/fig/foto').glob('*.webp'))
pathlib.Path('indice-leituras.js').write_text(
    '/* GERADO por gera_indice.py — não editar à mão. */\nwindow.IDXL=' +
    json.dumps(itens, ensure_ascii=False, separators=(',', ':')) + ';\n'
    'window.FIGS=' + json.dumps(figs, ensure_ascii=False, separators=(',', ':')) + ';\n'
    'window.FOTOS=' + json.dumps(fotos, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'{len(itens)} leituras, {sum(len(i["h"]) for i in itens)} seções indexadas, '
      f'{sum(i["fx"] for i in itens)} fluxogramas, {len(figs)} esquemas, {len(fotos)} radiografias')
