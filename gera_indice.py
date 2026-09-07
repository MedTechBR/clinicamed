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
pathlib.Path('indice-leituras.js').write_text(
    '/* GERADO por gera_indice.py — não editar à mão. */\nwindow.IDXL=' +
    json.dumps(itens, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'{len(itens)} leituras, {sum(len(i["h"]) for i in itens)} seções indexadas, '
      f'{sum(i["fx"] for i in itens)} fluxogramas')
