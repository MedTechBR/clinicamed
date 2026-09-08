# ClínicaMed — plataforma de estudo de Clínica Médica

App pessoal do Matheus, três públicos no mesmo banco: **título de especialista (TECM)**,
**provas de acesso a subespecialidades clínicas (R+)** e **o residente estudando durante a
residência**. Herda a arquitetura do TráfegoTítulo/RadioTítulo e o cronograma vivo do
quiz-enare-farmacia.

## As provas (fonte primária em `docs/`)
**TECM 2026 — Edital SBCM/AMB nº 2473** (`docs/edital-2473-tecm-2026.pdf`, texto extraído em `.txt`):
- 1ª fase: **120 questões**, 5 alternativas. As **100 primeiras valem 0,8** e as **20 últimas valem 1,0**
  (100 pontos). Análise curricular soma até **10 pontos**. Corte de **70% na soma**.
- 2ª fase: **2 estações** de **10 minutos**, entrega **sequencial** dos dados, avaliação **CHA**
  (Conhecimento, Habilidade, Atitude), **5 pontos por estação**, corte de **7 em 10**.
- **Aprovação independente nas duas fases, sem compensação.**
- Calendário 2026: teórica em 23/08, prática em **29/11**, resultado final em 14/12.
- **As três matrizes do item 9.6 são o esqueleto do app** e viram campos obrigatórios de cada questão:
  Especialidade · Cenário (Ambulatório, Enfermaria, Emergência/Urgência, UTI) ·
  Competência (Diagnóstico, Tratamento/Conduta, Urgência/Emergência, Prevenção/Seguimento).

**ENARE pré-requisito (R+)**: prova objetiva de 13/09/2026, **80 questões**, 1,25 ponto cada.

## Arquitetura (não negociar)
- `index.html` single-file (HTML/CSS/JS puro, sem framework, sem build).
- `banco.js` é **GERADO** por `monta_banco.py` a partir de `lotes-questoes/leva*.json`.
  **Nunca editar `banco.js` à mão** — editar a leva e rodar o montador.
- Dados em JSON estrito: `taxonomia.js` (18 áreas + as 3 matrizes + níveis), `provas.js`,
  `trilha.js` (R1/R2/R3 por rodízio), `pratica.js` (estações), `flash.js`, `leituras.js`.
- PWA (auditado em 07/09/2026): `manifest.webmanifest` com id, descrição, categorias, ícone de 180
  para iOS e **atalhos** (`?ir=<aba>` no toque longo do ícone); convite de instalação próprio
  (`beforeinstallprompt`, com instrução do Safari no iPhone e "não mostrar mais" gravado em `cfg`);
  `theme-color` por esquema de cor. **Três baldes de cache**: `cm-vN` (shell, apagado a cada bump),
  `cm-fontes-v1` (fontes, gstatic, jsdelivr) e **`cm-livros-v1`** (leituras e figuras) — os dois
  últimos **sobrevivem ao bump**, senão cada deploy re-baixaria 2,6 MB de conteúdo que não mudou.
  Ajustes tem "Estudar sem internet", que baixa a biblioteca inteira de uma vez (o SW já
  guarda sozinho o que se abre). **O HTML das leituras não era guardado**: offline, a leitura caía
  no fallback e servia o `index.html` DENTRO do iframe — corrigido. **BUMPAR a constante `CACHE` do sw.js a CADA deploy**
  (cm-v1, cm-v2…). Estáticos em stale-while-revalidate; HTML network-first. Testar SW em **aba nova**.
- Os dados vivem no aparelho (localStorage + espelho IndexedDB), prefixo `cm_` na constante `PREF`,
  e sincronizam com a conta. **Login é OBRIGATÓRIO** (`nuvem.js`) desde 07/09/2026: a coordenação
  acompanha os residentes e quem estuda sem conta não aparece. Ver "Contas e coordenação" abaixo.

## Abas
Questões · Simulado · Prática · Leituras · Cartões · Painel · Ajustes

⚠️ **Não reintroduzir modo/objetivo nem trilha da residência.** O Matheus pediu os dois fora em
04/09/2026: o app é de estudo de clínica médica e serve a qualquer público. Não há seletor de prova
no cabeçalho (o formato do simulado é escolha da sessão) e os níveis do banco têm rótulo neutro —
Essencial, Intermediário, Avançado, Nível prova de título — embora os `id` sigam r1/r2/r3/tit por
compatibilidade com o banco e com o progresso gravado.
**Prática** reproduz a 2ª fase: etapas sequenciais, cronômetro de 10 min, o candidato escreve a
conduta ANTES de ver o espelho, e a nota sai da razão entre pesos marcados e o total de 5,0.
**Painel** ordena por prioridade = peso da área na prova × o que você erra × o que ainda não viu,
e mostra a matriz cenário × competência (lacuna ali costuma ser jeito de pensar, não falta de leitura).

## Rigor de conteúdo (o ponto mais importante)
- Toda questão tem **`base` com diretriz E ANO** — o validador **derruba o build** se faltar o ano.
  Conduta clínica envelhece; sem a versão, o comentário vira boato.
- **Nunca escrever conduta de memória.** O conhecimento do modelo estava defasado nesta sessão:
  GINA **2026**, GOLD **2026**, Surviving Sepsis **2026** (março), ADA **2026**, AHA/ASA **2026** de
  AVC e KDIGO **2024** foram todos confirmados por busca antes de virar questão.
- `fonte` (banca/ano/prova) só nas questões de prova real; ausência = autoral.

## As armadilhas herdadas (defesas implementadas — manter)
1. **Progresso por chave de conteúdo, nunca por índice**: `chaveQ` = djb2+FNV com `Math.imul`.
   Réplica Python em `valida_banco.py`.
2. **Ordem persistida reconcilia chaves novas**: `ordemQuestoes()` acrescenta no fim quem não está
   na ordem salva. Sem isso, leva nova publicada fica invisível — e se todas as chaves mudarem
   (correção de enunciado em massa) a aba fica **permanentemente vazia** com o filtro intacto.
3. **Fisher-Yates**: `sort(()=>Math.random()-0.5)` não embaralha. `espalhaTemas` sorteia o próximo
   tema **ponderado pelo que resta** — o determinístico degenera em pingue-pongue entre os 2 maiores.
   Medido: 0 pares adjacentes do mesmo tema em simulado de 10 questões.
4. **Viés de tamanho**: todas as alternativas entre 95–108% do comprimento da correta; quando a
   correta fica longa demais, **encurtar a correta**. Medido: correta é a mais longa em 5% (o vício
   de IA fica em 80%), folga mediana de 1%.
5. **Blindagem de armazenamento**: `load()` que falha TRAVA a gravação da chave. Espelho em
   IndexedDB, backups rotativos (12), recuperação por canário. **Testado**: `localStorage.clear()`
   + reload restaurou 10 chaves com faixa de aviso.
6. **Verificar por DOM, não por screenshot**: `window.__cm` expõe `ST`, `ARM`, `QIDX`, `irAba`.
   Seções inativas continuam no DOM — **escopar os seletores na seção certa** (`#sec-simulado .alt`).

## Lições desta sessão (custaram tempo, não repetir)
- **`python3 -m http.server` entrega .js sem charset** e o Chrome decodifica o script externo como
  latin-1 — todo acento vira mojibake mesmo com `<meta charset>` na página, porque o encoding do
  documento não vale para script externo. O GitHub Pages manda `charset=utf-8`. Por isso existe
  `servir.py`, e o launch.json aponta para ele: testar sem charset é testar outro app.
- **Regex com caractere combinante literal** (`[̀-ͯ]`) quebra se o arquivo for lido no charset
  errado. Escrever sempre `[̀-ͯ]`.
- **Colisão de classe utilitária**: `.mini` era texto auxiliar E modificador de botão; mesma
  especificidade, a última regra vencia e pintava o botão primário de cinza sobre teal (1,23:1).
  Resolvido por especificidade (`.bt.mini`, `.bt.sec.mini`), não por ordem.
- **Mapa de abas resolvido na chamada**: `PINTA` referenciando funções declaradas em blocos
  `<script>` posteriores derruba o boot inteiro. Usar `()=>pintaX()`.
- **Equilíbrio do gabarito é GLOBAL, nunca por leva**: a versão herdada distribuía com
  `[i % 5 for i in range(n)]` dentro de cada arquivo; com levas de 3 ou 4 questões isso nunca
  alcança as posições D e E, e o banco inteiro saiu **sem nenhuma resposta na letra E** — viés
  que o aluno explora em prova de 5 alternativas e que o validador não acusa. Passar sempre
  `lotes-questoes/leva*.json` inteiro para o `equilibra_gabarito.py`.
- **Corrigir um tell de linguagem quebra o comprimento**: toda troca de redação reabre o viés de
  tamanho. `ajusta_alts.py` escolhe, entre variantes, a que cai na janela de 95–108%.
- **`.nojekyll` é obrigatório**: o GitHub Pages roda Jekyll, que **ignora arquivos começados com
  `_`**. Sem o arquivo `.nojekyll` na raiz, `leituras/_leitura.css` e `_leitura.js` respondem **404
  em produção** — as leituras abrem sem estilo nenhum e sem tema, ilegíveis no escuro, enquanto no
  servidor local tudo parece perfeito. Foi assim que o app foi ao ar em 04/09/2026.
- **Aba nova NÃO basta para testar o service worker**: se o SW já está registrado naquele origin,
  ele continua servindo o banco velho em qualquer aba. Ao verificar mudança de conteúdo,
  desregistrar (`getRegistrations().then(rs=>rs.map(r=>r.unregister()))`) e limpar `caches` antes
  de recarregar — foi o que fez o app mostrar 42 questões depois de o banco já ter 48.

## Formato "monografia" das leituras (07/09/2026)

Pedido do Matheus: "maior texto nas leituras (maioria ainda extremamente superficial quando comparada
com a diretriz), imagens, fluxogramas, abordagens sindrômicas". O padrão que passou a valer para toda
leitura nova ou reescrita — modelos: `parada-cardiaca.html`, `choque.html`, `dor-toracica.html`:

- **4.500–6.000 palavras** na monografia de diretriz e **3.500–5.000** na abordagem sindrômica; `min = palavras/80`. Kicker termina em `· monografia` (ou `· abordagem
  sindrômica`). O `tipo` em `leituras.js` idem.
- **Classe e nível transcritos da fonte** em `table.rec` (`.cls c1/c2a/c2b/c3` + `.niv`). Quando a
  fonte usa GRADE (ESICM), os rótulos são forte/fraca/boa prática/contra. Item sem classe legível na
  fonte fica sem classe — nunca inventar.
- **Fluxogramas em mermaid** dentro de `<div class="fluxo"><div class="leg"><b>Fluxograma N</b>…</div>
  <pre class="mermaid">…</pre></div>`. Rótulos entre aspas, `<br/>` para quebra, sem parênteses fora de
  aspas. O `_leitura.js` só carrega o mermaid se a página tiver algum; offline sem cache o texto do
  diagrama continua legível.
- **Bloco sindrômico** `div.sind` (perguntar / examinar / pedir), **questões-âncora** `div.ancora`
  (mini-caso + `<details>`), **comparação** `div.compara`, **critérios** `table.criterio`, além de
  `.cx chave/armadilha/fonte/nota`, `.dose`, `ol.passos`, "Armadilhas consolidadas", autoteste e
  `<footer>` com fontes primárias numeradas.
- **Imagens** (07/09/2026): as figuras são **geradas**, não copiadas. `gera_figuras.py` sintetiza
  ECGs de 12 derivações e tiras de ritmo em SVG (papel milimetrado, 25 mm/s, 10 mm/mV, pulso de
  calibração), esquemas de radiografia de tórax e de ultrassom pulmonar, e curvas — 37 figuras em
  `leituras/fig/`, catálogo em `leituras/fig/_catalogo.json`, `python3 gera_figuras.py --lista`.
  Uso: `<figure class="fig ecg"><div class="zoom"><img src="fig/NOME.svg" alt="…"></div>
  <figcaption><b>Figura N.</b> …</figcaption></figure>`.
  **Por que gerar em vez de copiar:** a biblioteca em `~/Documents/Livros/` é toda de terceiros —
  diretrizes publicadas em revista, livros e cadernos de cursinho. Recortar figura de lá e
  republicar num app público e pago é violação de direito autoral, e a exposição é do Matheus. Ele
  pediu em 07/09 para "pegar do material"; a resposta foi sintetizar, que além de legal é melhor
  para ensinar — a morfologia sai exatamente no ponto que o texto quer mostrar. **Se faltar um ECG,
  acrescente ao `gera_figuras.py`; não recorte de PDF nem baixe da web.**
  As figuras têm fundo claro nos dois temas (papel de ECG é branco/rosa); no tema escuro ganham
  contorno. Esquemas próprios de uma leitura podem ser SVG inline com `var(--ink)`, `var(--brand)` etc.
- Antes de escrever, **minerar a fonte** em `fontes/` (COR/LOE por regex, ver os greps usados em
  07/09) e conferir na web o que não estiver na biblioteca. `docs/FONTES.md` registra cada fonte usada.
- Depois: `python3 gera_indice.py` (busca por seção + contagem de fluxogramas no cartão) antes do bump.
- **Escrever em paralelo**: `docs/BRIEF_MONOGRAFIA.md` é o brief que se entrega a cada agente —
  formato, componentes, catálogo de figuras e regras de fechamento. Cada agente escreve SÓ as suas
  leituras e a entrada do índice em `leituras/_entradas_<slug>.json`; **ninguém edita `leituras.js`**
  (cinco agentes no mesmo arquivo colidem). Depois, `python3 junta_entradas.py` mescla tudo.

**Já em formato monografia (07–08/09/2026):** parada-cardiaca, choque, dor-toracica (sindrômica),
sindromes-coronarianas, tromboembolismo, sdra, taquiarritmias, arritmias-ventriculares, hipertensao,
choque-septico, fibrilacao-atrial, bradiarritmias-e-marcapasso, **radiografia-torax**,
**derrame-pleural** — 14 leituras, ~82 mil palavras.

### As radiografias da aula de RX (08/09/2026) — quem é dono do quê

`~/Documents/Estácio IDOMED/AULAS EMERGÊNCIAS CLÍNICAS/AULA 1 - RX.pdf` (108 slides) é assinada pelo
**Dr. Gebson Lopes, radiologista, CRM 20411**, mas o **Matheus forneceu as imagens** para essa aula
— ele disse isso explicitamente quando eu recusei usá-las. A recusa inicial estava errada quanto à
autoria; o que ela acertou foi exigir conferência antes de publicar.

**O deck é MISTO, e a conferência provou.** Ao abrir os 108 slides em resolução alta apareceram
marcas de terceiro que a miniatura escondia:
- slide 042: **"LearningRadiology.com (C) All Rights Reserved"** queimado no canto da imagem;
- slide 004: marca d'água **www.labcisco.com.br**;
- slide 107: burn-in de PACS americano (`9/22/2017`, `PORTABLE`, `ERECT`) — não é exame brasileiro;
- dezenas de slides com rotulagem de atlas em inglês (*Right lung*, *Aortic knuckle*, *Cardiac width*,
  *Bat's wing*, *Bulbar urethral stricture*) e pranchas de editora.

Por isso a regra que ficou: **entra só imagem sem marca de terceiro e sem burn-in estrangeiro.**
Nove figuras passaram (`leituras/fig/foto/*.webp`, 224 KB), extraídas com `pdfimages` — bitmap
ORIGINAL, não recorte do slide, então vêm sem o fundo azul e sem a legenda do Keynote. O script está
em `scratchpad/rx/compoe.py` (copiado para `docs/` se for repetir).

**LGPD:** cada imagem foi ampliada nos quatro cantos antes de publicar. Não havia nome, data nem
registro — só marcadores de lateralidade (`L`, `R`, `pa`) e iniciais do técnico no marcador de chumbo.
A única identificação encontrada foi **"PILAR"** no canto de um dos filmes de penetração, coberta por
tarja no `compoe.py`. **Repetir essa conferência sempre que entrar radiografia nova.**

`window.FOTOS` (gerado por `gera_indice.py` a partir de `leituras/fig/foto/*.webp`) existe porque
`OFF.urls()` montava a URL das figuras com sufixo `.svg` fixo: sem a lista própria, a biblioteca
offline baixaria os esquemas e deixaria as radiografias de fora.

**Bug corrigido junto:** o `coracao()` de `radiologia()` desenhava a silhueta cardíaca ESPELHADA
(para a esquerda da imagem); em PA a direita do paciente fica à esquerda do filme e o coração
projeta-se para a direita. Afetava `rx-normal`, `rx-consolidacao` e `rx-congestao`, que nunca tinham
sido usadas em leitura nenhuma. **`<text>` do SVG não quebra linha** — frase longa vaza para fora do
quadro; por isso `radiologia_torax()` tem o helper `txt()`, que quebra por largura em caracteres.

### Os ECGs sintetizados estavam errados — três defeitos (08/09/2026)

O Matheus achou olhando: **o ECG de BAV de 1º grau não tinha PR alargado**. A conferência que eu
tinha feito era visual, e visual não pega isto. Passou a existir **`docs/audita_ecg.py`**, que mede
o traçado que o gerador produz e confere contra o que a figura AFIRMA. Rodar a cada mexida no
`beat()`.

Os três defeitos, todos no modelo de batimento:

1. **O parâmetro `pr` não fazia nada.** A P era desenhada em `pr - 0.10` e o QRS em `pr` — aumentar
   `pr` empurrava os dois juntos, e o PR desenhado era sempre `280 + 30*qd` ms, qualquer que fosse
   `pr`. Consequência dupla: o BAV de 1º grau saía com o mesmo PR do normal, e o "normal" saía com
   **283 ms**, que já é bloqueio. Corrigido ancorando a P em `P_INI` e pondo o QRS em `P_INI + pr`.
   Medido depois: normal 160 ms, BAV1 300 ms, WPW 80 ms.
2. **A onda P tinha 360 ms de largura** (sigma 0.09). Uma P normal tem até 120 ms. Com a P ocupando
   três vezes o normal, nenhum PR seria legível mesmo com o item 1 corrigido. Sigma passou a 0.026.
3. **A onda T tinha 680 ms** (sigma 0.17). O ramo ascendente dela invadia o ponto J + 60 ms e o
   traçado NORMAL media **0,11 mV de "supra de ST"**. Sigma passou a 0.055 (~220 ms). Junto, a T da
   hipercalemia (base de 400 ms) e a da hipocalemia (560 ms) foram estreitadas: o achado da
   hipercalemia é T de base ESTREITA, e a larga ensinava o contrário do sinal.

**Erro meu de método, registrado porque quase virou correção errada:** o primeiro detector de
largura de QRS usava limiar de 12% da inclinação de pico e media 49 ms num QRS normal de 85 ms —
eu quase reportei um defeito de largura que não existia. A largura do QRS passou a ser calculada
pela GEOMETRIA do modelo (`0,94 x qd`), que é exata; o limiar de inclinação ficou só para achar o
início do QRS. Mesma coisa no início da P: limiar fixo em mV atrasava a detecção em derivação de P
pequena e inflava o PR medido. **Medir com um instrumento não calibrado é pior do que não medir.**

### Segunda rodada: a TV monomórfica parecia TSV (08/09/2026)

O Matheus achou olhando de novo, e de novo estava certo: **a tira de "Taquicardia de QRS largo,
regular, monomórfica, a 168 bpm" desenhava um QRS estreito**. Cinco defeitos saíram daí — e a
lição principal é que a primeira versão do auditor *não pegava nenhum deles*, porque só conferia
7 dos 30 traçados e usava uma fórmula de largura que só valia num caso.

1. **Derivação sem onda q desenhava um QRS 27% mais estreito do que o `qd` declarado.** Os três
   triângulos vão de `0,03·qd` a `0,97·qd`, mas o primeiro deles é o da q: onde `q=0` (a TV, e
   V1–V3 no BRE — justamente as derivações que a figura usa para mostrar QRS largo) o complexo
   começava só em `0,24·qd`. A TV com `qd=170 ms` saía com 124 ms. Corrigido com `_tri2()`, de
   meias-larguras diferentes: o primeiro componente PRESENTE encosta em `0,03·qd` e o último vai
   até `0,97·qd`. Agora TV = 160 ms, TSV = 75 ms, BRE ≥ 141 ms em toda derivação.
2. **`ecg-tsv.svg` era XML inválido e não abria no navegador.** A nota dizia `QRS < 120 ms` com o
   `<` cru; SVG servido em `<img>` é lido como XML, e o arquivo inteiro morre. Existe agora `esc()`
   nos montadores e, principalmente, **`main()` recusa gravar SVG que não passe no parser** — as 53
   figuras são validadas a cada geração.
3. **Mobitz I, Mobitz II e BAVT tinham uma cópia velha do modelo dentro de `strip_bloqueio`**, que
   a correção da manhã não alcançou: P de 360 ms e T de 680 ms, e o PR do Wenckebach saía 180 ms
   mais longo do que o declarado. Passaram a usar a mesma geometria, com `ps`/`qrss` guardando
   INÍCIOS de onda, não picos.
4. **O QT não encurtava com a frequência.** A T era desenhada com o mesmo atraso a 60 e a 210 bpm e
   caía dentro do batimento seguinte na FA, no flutter, na TSV e na FA pré-excitada. Existe
   `qt_escala(rr)` (Bazett). Junto: **sem onda P não existe PR** — na FA o `pr` padrão de 0,16
   empurrava o QRS 160 ms para dentro do ciclo à toa.
5. **A decimação (`_rala`) deformava o traçado.** Ela olhava só o ponto do meio e nunca movia o
   âncora, então o erro somava; e media distância PERPENDICULAR, que num segmento quase vertical
   (a descida de uma S de 2,5 mV) deixa o ápice praticamente sobre a corda — comia 0,6 mm de
   amplitude sem "errar" pelo critério. Agora o desvio é vertical, contra todos os pontos pulados,
   `tol=0,10 mm`. Amostragem subiu para 1 kHz.

**O auditor foi refeito.** Ele não lista mais as figuras à mão: instrumenta `svg12`/`svgtira`/
`svgpainel` e recebe título, nota, frequência e os parâmetros de cada derivação das **30** figuras.
As tiras montadas à mão são conferidas pelas constantes do próprio gerador (`WENCKEBACH_PR`,
`MOBITZ2_PR`, `BAVT_*`, `TVD_*`, `EXTRA_BIGEM`) — repetir os números no auditor seria aferir uma
balança com outra balança. Há ainda uma trava de fidelidade: o que sobra depois da decimação tem de
ter o mesmo pico e o mesmo vale do traçado cheio.

**De novo o erro de instrumento**, agora medindo o arquivo gravado: comparei desenho e modelo pela
diferença VERTICAL e li 0,28 mV de erro. Não havia erro nenhum — sobre a subida do R, quase
vertical, um deslocamento horizontal de 2 ms vira 1 mm de diferença vertical. As amplitudes batem
até a terceira casa. **É a terceira vez neste projeto que a medida errada quase virou conserto.**

### Peso da biblioteca offline (08/09/2026)

Medido depois de entrarem as imagens reais: **3,1 MB** — 336 KB de esquemas SVG, 913 KB de fotos
WebP e 1,9 MB do HTML das leituras. Os ECGs em papel são o pior caso de compressão que existe aqui:
a grade milimetrada é ruído de alta frequência em toda a área, e o WebP não tem o que jogar fora.
Um único traçado de 12 derivações a 1600 px e qualidade 82 pesava 400 KB. Em 1400 px e qualidade
**68** o mesmo traçado cai para 242 KB e continua legível no zoom — testar grayscale não ajudou
(225 KB), porque o custo é a grade, não a cor. **Medir antes de escolher o parâmetro: aqui a
compressão não se comporta como nas radiografias, que são suaves.** Receita em `docs/extrai_ecg.py`.

### Varredura das 16 aulas — o que existe onde (08/09/2026)

Triagem visual concluída com `docs/garimpa_aulas.py` + `peneira_imagens.py` + `liga_slide.py`.
Guardar este mapa: refazer a varredura custa horas e o resultado não muda.

| Aula | O que tem |
|---|---|
| AVC, trauma, AULA 1 - RX | **imagem real e limpa** — TC de crânio e difusão, TC/RX de trauma, RX e TC de tórax, contrastados |
| Insuficiência respiratória | **ultrassom pulmonar** (linhas A, linhas B, consolidação, derrame) — ainda não usado, serve ao `derrame-pleural` e à sindrômica de dispneia |
| Arritmias, SCA | ECG real, inclusive infarto posterior com V7–V9 e precordiais direitas |
| TEP, DPOC, asma, sepse, PCR | quase só ilustração gerada por IA — não rende figura |
| Paciente crítico, intoxicação | fotos clínicas e de embalagem — fora por privacidade e por serem produto de marca |

31 imagens foram para o **RadioTítulo** (banco de imagens 15 → 46 casos). O que ficou de fora e
por quê está no commit e nos lotes 003/004/005 de lá.

**Fila de reescrita** (mais peso no edital × texto mais curto). Com fonte em `fontes/`: avc-isquemico
(AHA/ASA 2026), asma e dpoc (GINA/GOLD 2026), intoxicacoes (COVISA 2017), politraumatizado (ATLS 11).
**derrame-pleural** foi reescrita em 08/09 (1.906 → 5.124 palavras, 6 figuras, 3 fluxogramas), com
quatro ultrassons pulmonares reais do acervo das aulas. Três imagens do mesmo conjunto saíram por
marca d'água do **THE POCUS ATLAS**; receita da extração em `docs/extrai_ultrassom.py`.
Sem fonte local, conferir na web antes: insuficiencia-cardiaca, pneumonia-duracao, cirrose,
eletrolitos, hemorragia-digestiva, dengue, avc, drc, diabetes-tipo2.
Abordagens sindrômicas a criar: dispneia aguda, síncope, cefaleia aguda, febre no imunossuprimido,
icterícia, edema, rebaixamento do sensório, dor abdominal aguda no clínico.

## Identidade visual — gramática MedTech (07/09/2026)

O "Papel de ECG" (Newsreader, fundo-grade, tons quentes) foi substituído em 07/09 pela gramática do
ecossistema: papel `#FAFAF8` e tokens de `/_mttokens.css`, **Figtree**, ícones **Tabler** (nunca emoji
nem glifo Unicode como ◐★✓✕), cabeçalho branco com linha fina, um botão primário + ghost, sombras
leves, sem gradiente. O **teal `#0B6A72`** continua como cor canônica do ClínicaMed (`#4FB8BD` no
escuro). No celular (≤640px) as abas viram barra inferior fixa (`--nav`, grade de `--nAbas` colunas).
Busca global no cabeçalho (tecla `/`) usa `indice-leituras.js`.

## Identidade visual anterior — "Papel de ECG" (histórico)
Tirada do próprio assunto, não decorativa: papel quente com a grade milimetrada no cabeçalho, tinta
grafite, e o **teal do monitor** (`#0B6A72` claro / `#4FB8BD` escuro) como marca — verde e vermelho
ficam reservados para acerto e erro, como na prática. Títulos em **Newsreader** (ar de compêndio
clínico), corpo em **Inter**. Fontes cacheadas em `cm-fontes-v1`, separado do `CACHE`.
Auditoria de contraste por DOM: **0 falhas** nos 8 painéis × 2 temas (≥4,5:1 normal, ≥3:1 grande).

## Rotina de QA (antes de dizer "pronto")
1. `python3 monta_banco.py` (roda o validador; erro duro = não publica).
2. `python3 valida_html.py` — sintaxe dos `.js` E dos `<script>` **inline** do index. Não pular:
   um `async` comido por substituição de texto deixou um `await` órfão, o bloco inteiro parou de
   executar e o app subiu **sem nenhuma aba**; `node --check` sozinho não vê isso.
   Se mexeu em `nuvem.js`: `node teste_nuvem.js` (16 casos de mesclagem).
3. Servir com `servir.py` (launch.json → `clinicamed`, porta 8711) e rodar asserções por DOM.
4. Auditoria de contraste nos 8 painéis × 2 temas — exigido: `total: 0`.
   Conferir também a distribuição do gabarito impressa pelo validador: as cinco letras devem
   aparecer, e nenhuma pode ficar zerada.
5. Só então: commit, **bump do `CACHE` do sw.js** e push.

### Receita de fechamento de leva
1. Escrever a leva; `python3 checa_leva.py <arquivo>` aponta o que está fora de 95–108%.
2. Janela da correta: `L ∈ [max(outros)/1.08, min(outros)/0.95]`. Corrigir casando por **prefixo**
   de texto (índices mudam depois do equilíbrio).
3. `python3 equilibra_gabarito.py <arquivo>` — **uma vez só, antes de publicar**. Depois que o app
   estiver em uso, NÃO rodar de novo: as respostas gravadas guardam o índice da alternativa.
4. `python3 monta_banco.py` e conferir "OK: nenhum erro duro".

## Estado do conteúdo (04/09/2026)
- **143 questões** em 34 levas, 143 chaves únicas, **zero erros duros e zero avisos**.
- **18 áreas cobertas.** Gabarito uniforme: A:29 B:29 C:29 D:28 E:28.
- **116 cartões** · **16 leituras (~317 min)** · **6 estações práticas** (todas somando 5,0 pontos).
- Correta é a mais longa em 11,9%; folga mediana de 1,1%.

### As leituras são o diferencial (não deixar regredir)
As leituras nasceram curtas e o Matheus reprovou: *"a parte de leitura está péssima, básica e com
pouco conteúdo"*. O padrão atual é **diretriz integral**, escrita a partir do PDF, com:
tabela de recomendação com **classe e nível de evidência** (`table.rec` + badges `.cls .c1/.c2a/.c2b/.c3`),
tabela de doses, passos numerados (`ol.passos`), caixas `.chave` e `.armadilha`, seção de armadilhas
consolidadas, autoteste em `<details>` e fonte primária numerada no rodapé.
Tamanho de referência: **1.200 a 2.100 palavras**. Um resumo de 600 palavras não passa.

### Detector de tells: como foi calibrado (não afrouxar sem medir)
A regex de termos absolutos herdada via só `todos?` e era cega para **toda/todas/qualquer** — com o
detector ampliado, o padrão aparecia em 33 de 107 questões. Antes de mexer no limiar, foi medido o
quanto o tell é explorável: **nenhuma questão** tinha o caso perfeito (4 distratores com absoluto e
correta sem); o pior caso eram 3 questões com 3 de 4. Com 2 distratores ainda sobram duas
alternativas sem absoluto, e marcar "a que não tem absoluto" não resolve a questão — além de que
distrator errado POR restringir demais ("tratar apenas com X") é conteúdo, não vício de escrita.
Por isso o limiar passou a ser **3 distratores**, com a justificativa registrada no próprio código.

### Diretrizes já verificadas em fonte (reusar a âncora, não reinventar)
GINA 2026 · GOLD 2026 · Surviving Sepsis 2026 · ADA 2026 · KDIGO 2024 · AHA/ASA 2026 (AVC) ·
**ESC 2026 (insuficiência cardíaca — eliminou o fenótipo de fração levemente reduzida; tudo abaixo
de 50% virou fração reduzida)** · **AHA 2025 (parada — adrenalina só após a falha das
desfibrilações iniciais no ritmo chocável)** · **Ministério da Saúde 2024 (dengue, 6ª ed. — grupos,
sinais de alarme e volumes; PDF em docs/)** · **Diretriz Brasileira de Hipertensão SBC 2025** ·
ESC 2024 (fibrilação atrial) · ESC 2023 (síndromes coronárias) · ESC 2019 (embolia pulmonar) ·
ATS 2025 (pneumonia comunitária, duração curta) · Baveno VII 2022 · EASL 2018 (cirrose) · ACR 2020 (gota) ·
ACR 2021 (artrite reumatoide) · EULAR 2023 (lúpus) · IMWG 2014 (mieloma) · BSG 2021 (ferropenia) ·
ASH 2020 (falciforme) · AGS Beers 2023 · Ministério da Saúde 2025 + Lei 15.284/2025 (mamografia a
partir dos 40 anos — mudou em 2025, o conhecimento de modelo ainda diz 50 a 69) · nota técnica
INCA 2023 (não rastreamento populacional de próstata).

## Contestação de conteúdo (04/09/2026)
Pedido do Matheus: o usuário que discorda de uma questão ou de uma leitura sinaliza, e aquilo chega
ao e-mail do MedTech para ele e o Claude avaliarem.

- Botão **"Discordo desta questão"** aparece no rodapé do feedback, depois de responder; **"Discordo"**
  aparece na barra da leitura aberta.
- O modal tem motivos **diferentes por tipo** (questão × leitura), texto obrigatório com pelo menos 10
  caracteres e e-mail de contato opcional.
- Envio por `mailto:` para **medtechbr1@gmail.com**, com o conteúdo INTEIRO no corpo — enunciado, as
  cinco alternativas com o gabarito marcado, comentário, âncora, procedência e versão do app. Quem
  revisa não precisa abrir o app para entender o caso.
- **Cópia local sempre**: a contestação é gravada em `ST.contest` (chave `cm_contest`) antes de abrir
  o e-mail, e listada em Ajustes com "Reabrir e-mail" e "Copiar". Sem backend, o `mailto:` pode não
  abrir — e sem essa cópia a contestação se perderia em silêncio.
- Contraste do modal auditado nos dois temas: 0 falhas.

## Biblioteca de fontes (04/09/2026)
⚠️ Os **cadernos de curso** da pasta (`Caderno Completo – …`, `CASAL MED`, `Mapas`, `Decorebas`,
`Intensivão`) têm marca d'água de material pago. **Não copiar texto deles** para o app — servem
para calibrar escopo e conferir pontos; o conteúdo publicado é escrito do zero e ancorado em
diretriz ou na bibliografia oficial do edital.
O Matheus deu acesso a `~/Documents/Livros/` — diretrizes em PDF e livros. O catálogo, com o que é
âncora válida e **o que é referência antiga a não usar**, está em `docs/FONTES.md`. Regras:
- Os PDFs **não** entram no repo (grandes, de terceiros). O texto extraído vai para `fontes/`, que
  está no `.gitignore`. Reextrair com `pdftotext -layout`.
- **Proibido ancorar em referência antiga** (Cecil 25ª ed., Diagnóstico por Imagem 2015, toxicologia
  2017). Sem diretriz recente na biblioteca, usar a bibliografia oficial do edital.
- Quando houver PDF da diretriz, **ler o PDF em vez de confiar em busca web**: a diretriz brasileira
  de hipertensão de 2025 mostrou que a busca dava a régua americana (dupla acima de 150/90) enquanto
  a fonte primária recomenda dupla para a **maioria** dos pacientes, com meta única de <130/80.

## Contas e coordenação (06–07/09/2026, cm-v44)

**Login obrigatório, pelo login único do ecossistema.** `/_mtfb.js` + `/_mtauth.js` vêm da RAIZ do
medtechbr.github.io — mesma origem, então a sessão é a mesma dos outros apps MedTech. Se a raiz
não responder, `window.MT` não existe e o app segue local. As duas cópias locais desses arquivos
(para testar em localhost) estão no `.gitignore` **de propósito**: commitá-las criaria uma segunda
versão que envelhece sozinha.

**A trava `#cmTrava` está no HTML, não é montada por script.** O `_mtauth.js` é `type="module"` e
portanto diferido: entre a pintura da página e a execução dele existe uma janela em que o app
apareceria inteiro. A trava cobre essa janela e só sai com usuário confirmado. Some só `#mt-home`,
que cobriria a marca no cabeçalho fixo (o caminho de volta ao portal está em Ajustes).

**Offline continua valendo para quem já entrou uma vez neste aparelho** — a sessão do Firebase fica
gravada aqui e o módulo do login está no cache do SW. Quem nunca entrou e está sem rede lê o motivo
na trava, com botão de tentar de novo: entrar em silêncio sem conta é justamente o caso que o login
obrigatório existe para eliminar.

**`nuvem.js` NÃO usa o `MT.save` cru.** O `MT.save` grava o estado inteiro num doc só com
`setDoc merge`: last-write-wins, exatamente o que apagou dados no Granaê. Aqui o que vem da nuvem
é mesclado **antes** de gravar:
- mapas (`resp`, `fav`, `flash`, `treino`, `lidas`): carimbo por item + **lápide** na exclusão
  (sem lápide, o item apagado aqui volta do outro aparelho);
- `resp`: o histórico é **unido** por `ts`, então nenhum lado perde uma resposta;
- `atividade`: o **maior** por dia (somar inflaria o número em estudo simultâneo);
- `sim`/`contest`: união por `quando`; `erros` é **derivado** de `resp`, não mesclado.
- **Fora da sincronização de propósito:** `cfg`, `pos`, `simativo` — são a tela DESTE aparelho.
- Comparação com `estavel()` (chaves ordenadas): `JSON.stringify` cru depende da ordem das chaves,
  e os dois aparelhos montam o objeto em ordens diferentes → ficariam se reenviando para sempre.
- O carimbo nasce em `salva()`, o único funil de gravação. Não espalhar carimbo por ponto de escrita.

**Aba Turma** — a coordenação cria as contas e vê o desempenho. Passa pela função `clinicamed`
(backend `medtech-c658c`, código em `MedTech/backend/functions/clinicamed.js`, deploy com
`bash ~/Documents/Claude/MedTech/backend/deploy-clinicamed.command`). Ela existe porque criar conta
no cliente TROCA a sessão de quem cria, e ler o desempenho alheio exigiria afrouxar as regras do
Firestore. A função roda com a conta de serviço e confere a permissão ela mesma — **nenhuma regra
foi mexida, e nenhuma deve ser**. Coordenadores em `clinicamed_cfg/chefes`, coleção que cliente
nenhum alcança. Esconder o botão da aba é conveniência de tela; a permissão é conferida a cada
chamada. O app publica `users/{uid}/apps/clinicamed_resumo` só com o agregado: **o caderno de
respostas não sai do aparelho de ninguém**, e o aluno lê em Ajustes que é acompanhado.
Com login obrigatório, quem cria a própria conta ficaria invisível para a coordenação; por isso a
aba tem **"Já usam o ClínicaMed, fora da turma"** (op `descobre`), que varre as contas do projeto e
mostra só quem TEM resumo do ClínicaMed e não está em turma nenhuma. Cadastrar por e-mail não pede
senha quando a conta já existe: mexer nela levaria junto o acesso e os dados dos outros apps.

## Hospedagem
GitHub Pages, repo público `MedTechBR/clinicamed` → medtechbr.github.io/clinicamed/.
Conteúdo 100% autoral. Se entrarem questões transcritas de provas reais, reavaliar: material de
banca pode exigir o esquema privado do RadioTítulo.

## Deploy: rode `python3 bump.py` antes de todo commit

O `sw.js` usa stale-while-revalidate nos estáticos e o handler casa por URL **completa**.
Bumpar só a constante `CACHE` não bastava: quem não tinha o service worker registrado
(primeira visita, aba anônima, PWA recém-instalado) recebia o `banco.js` da cache HTTP do
navegador, que não expira — o deploy ficava invisível. Foi exatamente o que aconteceu ao
publicar as 700 questões: o arquivo no ar já tinha 700, e a página carregada mostrava 645.

`bump.py` incrementa a versão em quatro lugares de uma vez, para que não possam divergir:
- `const CACHE="cm-vN"` no sw.js
- a lista `PRE` do sw.js (precisa do mesmo `?v=` que a página pede, senão o precache
  nunca atende e o app perde o offline na primeira visita)
- as tags `<script src="...?v=N">` do index.html
- `_leitura.css` / `_leitura.js` nas 16 páginas de leitura

Verificação de deploy: buscar `banco.js?cb=<timestamp>` com `cache:'no-store'` e contar
`"gab":` — comparar com `window.BANCO.length` da página carregada. Se divergirem, é cache,
não build.

## Questões de prova real: o que se copia e o que se escreve

O banco é misto: 700 autorais + 211 copiadas de provas oficiais públicas
(ENARE 2024/EBSERH-FGV, Revalida 2022 e 2024/INEP-MEC, USP 2026/FUVEST). A fonte
delas é `MedTech/site/flashmed-provas.js` — **espelho, nunca commitar de lá**.

**Enunciado e alternativas são VERBATIM.** Reescrever o texto da banca falsifica a
questão e destrói o que a torna útil: treinar no enunciado que a banca escreveu,
com os tells que a banca teve. O caderno oficial só traz `"Gabarito oficial (…)"`,
então tudo o mais é escrito aqui: tema/cenário/competência/nível, `base` com
diretriz **e ano**, `coment` (≥150 caracteres) e um `porAlt` por alternativa.

`valida_banco.py` reconhece a questão real pelo campo `fonte:{banca,ano}` e a
isenta das regras de estilo AUTORAL — comprimento das alternativas em 95–108%,
termos absolutos, linguagem cautelosa, acento nos distratores — porque essas
regras policiam vício de escrita, não a prova. Aceita 4 ou 5 alternativas
(Revalida e ENARE usam 4). O viés de tamanho das reais é **medido e reportado
separado, não corrigido**. O que continua valendo para elas: `coment` mínimo,
`porAlt` completo, `base` com ano, chave única, classificação obrigatória.

Triagem: das 655 questões das 7 provas, 286 eram de clínica médica; 211 entraram.
Descartadas as de GO, pediatria, cirurgia, as sem gabarito (`correct: -1`) e as
cujo gabarito oficial contraria a diretriz vigente (ensinar o erro é pior que
não ter a questão).

O app deixa isso visível: filtro **Procedência** na aba Questões (todas / só de
prova real / só autorais) e pílula com banca e ano no feedback pós-resposta.

**Repo segue público** — decidido pelo Matheus em 05/09/2026, perguntado
explicitamente: os cadernos são públicos, o gabarito é oficial e cada questão
carrega banca e ano. Não entra no banco questão de prova cujo caderno não seja
público — TECM/SBCM, por exemplo, publica só o edital e o gabarito atrás de
login, então questão de título continua sendo autoral.
