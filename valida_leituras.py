#!/usr/bin/env python3
"""Valida a ESTRUTURA das leituras (nao o conteudo clinico).

Por que existe: as leituras sao HTML escrito a mao, sem build. Um </p> orfao
dentro de uma caixa .cx ou um <div> sem fechar nao quebra nada visivelmente no
Chrome — ele conserta em silencio — mas empurra o resto do texto para dentro da
caixa e o leitor recebe um bloco de aviso gigante. Este script pega isso antes
do deploy. Uso: python3 valida_leituras.py
"""
import re, sys, pathlib, html

TAX = dict(re.findall(r'"id":"(\w+)","nome":"([^"]+)"',
                      pathlib.Path('taxonomia.js').read_text()))
erros = []
for f in sorted(pathlib.Path('leituras').glob('*.html')):
    if f.name.startswith('_'): continue
    s = f.read_text(); e = lambda m: erros.append(f"{f.name}: {m}")
    if not s.startswith('<meta charset'): e('nao comeca com <meta charset>')
    for req in ('_leitura.css', '_leitura.js', 'class="kicker"', '<h1>',
                'class="dek"', 'class="toc"', '<details>', '<footer>'):
        if req not in s: e(f'falta {req}')
    if not re.search(r'<b>Fontes? primárias?</b>|<b>Fontes?</b>', s):
        e('footer sem bloco de fontes')
    # tags balanceadas
    for tag in ('div', 'table', 'details', 'ol', 'ul', 'nav', 'footer'):
        a = len(re.findall(rf'<{tag}[\s>]', s)); b = s.count(f'</{tag}>')
        if a != b: e(f'<{tag}> {a} abre x {b} fecha')
    # </p> orfao dentro de caixa (o bug do adrenal-hipofise)
    for cx in re.findall(r'<div class="cx[^"]*">(.*?)</div>', s, re.S):
        if '</p>' in cx and '<p' not in cx: e('</p> orfao dentro de .cx')
    # ancoras do sumario resolvem
    for a in re.findall(r'<a href="#([^"]+)"', s):
        if f'id="{a}"' not in s: e(f'ancora #{a} sem destino')
    # link de area valido — as leituras de doencas raras atravessam varias
    # areas de proposito e linkam a aba de questoes sem filtro
    if 'class="vaiQuestoes"' not in s: e('sem link vaiQuestoes')
    m = re.search(r'\?area=(\w+)#questoes', s)
    if m and m.group(1) not in TAX: e(f'area invalida no link: {m.group(1)}')

print('\n'.join(erros) if erros else 'estrutura OK')
print(f"{len(list(pathlib.Path('leituras').glob('[!_]*.html')))} leituras, {len(erros)} erros")
sys.exit(1 if erros else 0)
