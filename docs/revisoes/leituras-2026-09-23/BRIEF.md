# Brief: revisão de qualidade das Leituras do ClínicaMed

App: `~/Documents/Claude/clinicamed/` (leia antes o `CLAUDE.md`, seções "Formato monografia das leituras",
"Identidade visual cara de manual" (regras de escrita) e as notas sobre figuras/ECG). As leituras são
`leituras/<slug>.html` (HTML estático com `_leitura.css`/`_leitura.js`). Público: residentes e candidatos
a título de Clínica Médica. O app é público e pago: erro clínico publicado é o pior defeito possível.
Pedido do Matheus (dono, médico): "revise a qualidade dos textos de ler e das imagens e fluxogramas".

## Para CADA leitura do seu lote, leia o arquivo inteiro e confira

A. **Exatidão clínica** (prioridade máxima): doses, vias, intervalos, pontos de corte, critérios
   diagnósticos, escores, metas, indicações/contraindicações, nomes de fármacos, classes de recomendação.
   Compare com a diretriz VIGENTE em setembro de 2026. Em qualquer dúvida, confira na web (WebSearch/WebFetch)
   e anote fonte + ano. Nunca "corrija" de memória algo que você não conferiu; se não conseguir conferir,
   liste como dúvida no relatório sem mexer. Regras da casa: função renal = CKD-EPI 2021 (nunca
   Cockcroft-Gault); não inventar sigla de diretriz nem ano; classe/nível só se transcritos da fonte.
B. **Atualidade:** diretriz citada que já foi substituída (ex.: há versão 2024-2026) → atualize o que mudou
   de fato e a fonte no `<footer>`. Só com a fonte nova conferida.
C. **Coerência interna:** texto × tabelas × fluxogramas × legendas das figuras × resposta das
   questões-âncora (`div.ancora`) × "Perguntas de revisão". Um número não pode aparecer de dois jeitos.
D. **Escrita:** português (concordância, acentos, frase truncada), HTML quebrado, travessão (— ou –) em
   prosa (só é permitido em célula vazia de tabela e rótulo de mermaid; converta com vírgula, dois-pontos,
   parênteses ou ponto), frases-muleta ("é importante ressaltar", "vale destacar", "neste contexto"),
   dek que narra o próprio texto. Não reescreva estilo que já está bom; corrija o que está errado.
E. **Figuras** (`<figure class="fig">`, arquivos em `leituras/fig/`): a legenda e o `alt` descrevem o que
   a imagem mostra? Para ver uma figura, renderize-a:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu
   --hide-scrollbars --window-size=1120,700 --screenshot=<scratchpad>/x.png
   "http://localhost:8711/leituras/fig/<nome>"` e abra o PNG com Read. (Servidor: `servir.py` na porta
   8711 já está rodando; se não estiver, `python3 servir.py &` na pasta do app.) NÃO edite os SVG nem o
   `gera_figuras.py`: defeito de figura vai para o relatório (eu corrijo no gerador).
F. **Fluxogramas** (`<div class="fluxo">…<pre class="mermaid">`): a lógica bate com o texto e a diretriz?
   Legibilidade: a coluna de texto tem 664 px; fluxograma mais largo que isso é encolhido e a letra fica
   miúda. Os que mediram letra efetiva abaixo de 11 px estão listados no seu lote abaixo: reestruture-os
   (direção `TD` em vez de `LR`, rótulos mais curtos, menos nós lado a lado, ou divida em dois
   fluxogramas). Regras: rótulos entre aspas, `<br/>` para quebra, nada de parênteses fora de aspas.
   Depois de mexer, confirme que desenha: abra `http://localhost:8711/leituras/<slug>.html` numa aba SUA
   do Browser pane (`tabs_create` e depois `navigate` com o `tabId` devolvido; use sempre esse tabId) e
   rode no `javascript_tool`, após ~4 s:
   `[...document.querySelectorAll('pre.mermaid')].map(p=>{const s=p.querySelector('svg');return s?{w:Math.round(s.viewBox.baseVal.width),erro:/Syntax error/i.test(s.textContent)}:'sem svg'})`
   Meta: largura do viewBox ≤ ~720 (letra efetiva ≥ 13 px) e nenhum erro.
G. **Profundidade** (só avaliar, NÃO expandir): classifique cada leitura como superficial / adequada /
   monografia e liste até 5 lacunas importantes para prova de título (tema que a diretriz cobre e a
   leitura não).

## Regras duras
- Edite SÓ os arquivos `leituras/<slug>.html` do seu lote. Não toque em `leituras.js`,
  `indice-leituras.js`, `index.html`, `_leitura.*`, figuras, nem arquivos de outro lote (há 7 outros
  revisores trabalhando em paralelo).
- Edições mínimas e cirúrgicas, preservando classes, estrutura e o tom de manual. Sem emoji, sem negrito
  novo decorativo, sem travessão.
- Não faça commit nem push.

## Relatório (obrigatório)
Escreva `/private/tmp/claude-501/-Users-matheusparente/d51ccb09-be43-4e60-9a61-a91a40317e8f/scratchpad/revisao/grupo<N>.md` com, por leitura:
1. Correções clínicas feitas: trecho antes → depois, fonte (nome + ano + URL).
2. Dúvidas não resolvidas (não mexidas).
3. Outras correções (escrita, coerência, fluxograma) em uma linha cada.
4. Defeitos de figura (arquivo + o que está errado).
5. Profundidade + lacunas.
No fim, um resumo: nº de erros clínicos corrigidos, os 3 mais graves, fluxogramas refeitos com
largura antes/depois.
