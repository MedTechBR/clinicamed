# Brief para escrever uma monografia do ClínicaMed

Você vai reescrever (ou criar) leituras do ClínicaMed no formato **monografia**. Leia este brief
inteiro antes de escrever a primeira linha.

## Contexto

ClínicaMed é a plataforma de estudo de Clínica Médica do MedTech (`~/Documents/Claude/clinicamed/`,
no ar em medtechbr.github.io/clinicamed/). O público é médico: candidato ao **título de especialista
em Clínica Médica (TECM/SBCM)**, a provas de acesso a subespecialidade (R+) e residente estudando.
O dono é o Matheus, médico, coordenador de internato. Ele pediu textos **muito mais completos**:
"maioria ainda extremamente superficial quando comparada com a diretriz".

## Modelos — leia os três antes de escrever

- `leituras/parada-cardiaca.html` (monografia de diretriz, 5.753 palavras, 4 fluxogramas)
- `leituras/choque.html` (monografia de diretriz com GRADE, 4.841 palavras)
- `leituras/dor-toracica.html` (abordagem sindrômica, 3.564 palavras)

## Regras de conteúdo (as que mais importam)

1. **Minere a fonte primária** em `fontes/*.txt` (texto extraído com `pdftotext -layout`, duas
   colunas achatadas). Receita que funciona para achar as recomendações com classe e nível:
   ```
   grep -n -B2 -A6 "\(^\| \)\(1\|2a\|2b\|3: Harm\|3: No Benefit\) \{2,\}[ABC]-\(R\|NR\|LD\|EO\)\( \|$\)" ARQUIVO.txt \
     | sed 's/^\([0-9]*[-:]\) \{1,\}/\1 /; s/ \{3,\}/ | /g' | cut -c1-230
   ```
   Para diretrizes europeias com GRADE, procure `We recommend|We suggest|Strong recommendation|
   Weak recommendation|Class I|Class IIa|Class IIb|Class III`. Para tabelas de dose, procure o nome
   do fármaco e leia o bloco em volta.
2. **Classe e nível vêm da fonte, transcritos**, em `table.rec` com `<span class="cls c1|c2a|c2b|c3">`
   e `<span class="niv">`. **Nunca invente classe.** Item cuja classe você não conseguiu ler na fonte
   entra sem classe, ou como texto corrido.
3. **Números exatos**: doses, alvos, cortes, prazos, escores. Se não achou na fonte local, confirme
   na web (WebSearch/WebFetch) e registre a fonte no rodapé. Não escreva número de memória.
4. **Tamanho**: 4.500–6.000 palavras (monografia de diretriz); 3.500–5.000 (abordagem sindrômica).
   Conte com `sed 's/<[^>]*>/ /g' arquivo.html | wc -w`.
5. **Português do Brasil, prosa de médico para médico.** Sem "é importante notar", sem listar por
   listar. Cada seção precisa dizer *o que muda a conduta*. Explique o porquê fisiopatológico quando
   ele decide a escolha. Nomes de fármacos em minúscula, genéricos.
6. Nada de conselho que a fonte não sustenta. Onde a evidência é fraca, diga que é fraca.

## Estrutura obrigatória do HTML

```html
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="_leitura.css?v=51"><script src="_leitura.js?v=51"></script>
<div class="wrap">
<p class="kicker">Área · NN min · Fonte ANO · monografia</p>
<h1>…</h1>
<p class="dek">Parágrafo que diz por que este texto existe e o que o leitor vai levar.</p>
<nav class="toc"><b>Neste texto</b><ol><li><a href="#id">…</a></li></ol></nav>
<h2 id="id">1. …</h2>
…
<a class="vaiQuestoes" href="../index.html?area=AREA#questoes">Treinar questões de …</a>
<footer><b>Fontes primárias</b><ol><li>Citação completa com revista, ano e doi.</li></ol></footer>
</div>
```

O `<meta charset>` é a **primeira linha**. Todo `<h2>` tem `id` e aparece no índice (`nav.toc`), na
mesma ordem e com o mesmo texto. O validador `python3 valida_leituras.py` checa isso.

### Componentes disponíveis (definidos em `leituras/_leitura.css`)

| Componente | Uso |
|---|---|
| `<table class="rec">` + `td.c` + `span.cls.c1/.c2a/.c2b/.c3` + `span.niv` | recomendações com classe e nível |
| `<table class="criterio">` | critérios diagnósticos, escores |
| `<div class="rolagem"><table>…</table></div>` | qualquer tabela larga |
| `<div class="cx chave">`, `.cx armadilha`, `.cx fonte`, `.cx nota` | caixas; `<b>` na primeira linha vira título |
| `<div class="ancora"><b>Questão-âncora</b>mini-caso<details><summary>…</summary>…</details></div>` | caso curto que testa a seção |
| `<div class="sind">` com 3 `<div><b>O que perguntar</b><ul>…` | abordagem sindrômica |
| `<div class="compara">` com `<div><b>Título</b>texto</div>` | dois a quatro blocos lado a lado |
| `<div class="dose"><b>…</b><ul>…</ul></div>` | doses |
| `<ol class="passos">` | passos numerados |
| `<details><summary>pergunta</summary>resposta</details>` | autoteste |

### Fluxogramas (mermaid)

```html
<div class="fluxo"><div class="leg"><b>Fluxograma 1</b>Legenda curta</div>
<pre class="mermaid">
flowchart TD
  A["Rótulo entre aspas"] --> B{"Pergunta?"}
  B -->|"sim"| C["Ação"]
</pre></div>
```
Todo rótulo entre aspas; quebra de linha com `<br/>`; **sem parênteses ou vírgula fora das aspas**.
Mínimo 2 fluxogramas por monografia.

### Figuras — ECG e esquemas

As figuras já existem em `leituras/fig/` (geradas por `gera_figuras.py`; catálogo em
`leituras/fig/_catalogo.json`). Use assim:

```html
<figure class="fig ecg"><div class="zoom"><img src="fig/ecg-stemi-inferior.svg" alt="Supra de ST em II, III e aVF"></div>
<figcaption><b>Figura 1.</b> O que olhar no traçado, em uma ou duas frases que ensinam.</figcaption></figure>
```

Catálogo completo e atualizado: **`leituras/fig/_catalogo.json`** (título e, em algumas, uma
legenda pronta). Rode `python3 gera_figuras.py --lista` para ver os nomes. Hoje há:

- **ECG de 12 derivações**: `ecg-normal`, `ecg-stemi-inferior`, `ecg-stemi-anterior`,
  `ecg-infarto-posterior`, `ecg-infra-difuso-avr`, `ecg-wpw`, `ecg-hipercalemia`, `ecg-hipocalemia`,
  `ecg-brugada`, `ecg-pericardite`, `ecg-tep`, `ecg-bre`, `ecg-brd`, `ecg-hve`
- **Tiras de ritmo**: `ecg-fibrilacao-atrial`, `ecg-flutter`, `ecg-tsv`, `ecg-tv-monomorfica`,
  `ecg-torsades`, `ecg-fa-pre-excitada`, `ecg-bav1`, `ecg-mobitz1`, `ecg-mobitz2`, `ecg-bavt`,
  `ecg-marcapasso`, `ecg-extrassistoles`
- **Radiografia de tórax (esquemas de linha)**: `rx-normal`, `rx-derrame`, `rx-pneumotorax`,
  `rx-congestao`, `rx-consolidacao`, `rx-abcde`, `rx-qualidade`, `rx-pa-ap`, `rx-lobos`,
  `rx-silhueta`, `rx-consolidacao-atelectasia`, `rx-golden`, `rx-derrame-volume`,
  `rx-pneumotorax-deitado`, `rx-pneumoperitonio`, `rx-pontos-cegos`, `rx-tubos`
- **Ultrassom pulmonar (esquemas)**: `us-praia`, `us-codigo-barras`, `us-linhas-b`
- **Curvas e algoritmos**: `fig-curva-pv`, `fig-capnografia`, `fig-troponina`

**Não copie imagem de PDF, de diretriz ou da web.** A biblioteca em `~/Documents/Livros/` é toda de
terceiros (revistas, livros, cursinhos) e o app é público e pago — recorte de figura é violação de
direito autoral. Se precisar de um esquema que não existe no catálogo, **desenhe em SVG inline** com
as cores do tema:

```html
<figure class="fig"><svg viewBox="0 0 560 280" role="img" aria-label="…">
  <style>text{font-family:Figtree,system-ui,sans-serif}.t{font-size:13px;font-weight:600;fill:var(--ink)}.l{font-size:11px;fill:var(--ink2)}</style>
  …
</svg><figcaption><b>Figura N.</b> …</figcaption></figure>
```
Use `var(--ink)`, `var(--ink2)`, `var(--brand)`, `var(--linha)`, `var(--ok)`, `var(--err)`,
`var(--avi)` — a figura acompanha o tema claro/escuro. Se precisar de um **ECG novo**, não desenhe:
anote no seu relatório final o que falta (derivação, morfologia, frequência) que o gerador cria.

## Como fechar

1. `sed 's/<[^>]*>/ /g' leituras/ARQUIVO.html | wc -w` — confira o tamanho.
2. `python3 valida_leituras.py` — tem de sair `0 erros`.
3. Escreva a entrada do índice em `leituras/_entradas_SEUNOME.json` (um arquivo só seu; **não edite
   `leituras.js`**), assim:
   ```json
   [{"f":"arquivo.html","tipo":"ESC 2024 · monografia","area":"cardio","min":58,
     "t":"Título","s":"Resumo de duas a quatro linhas dizendo o que o texto entrega."}]
   ```
   `min` = palavras ÷ 80, arredondado. `area` é o id em `taxonomia.js`.
4. **Não toque** em: `leituras.js`, `index.html`, `CLAUDE.md`, `gera_figuras.py`, `sw.js`, `banco.js`,
   nem em leitura que não seja sua. Não rode `bump.py`, não faça commit, não faça push.
5. No relatório final, diga: arquivos escritos, palavras de cada um, fluxogramas e figuras usadas,
   figuras que faltaram, e qualquer número que você não conseguiu confirmar na fonte.
