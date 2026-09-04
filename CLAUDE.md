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
- PWA: `manifest.webmanifest` + `sw.js`. **BUMPAR a constante `CACHE` do sw.js a CADA deploy**
  (cm-v1, cm-v2…). Estáticos em stale-while-revalidate; HTML network-first. Testar SW em **aba nova**.
- Sem Firebase, sem login, sem sincronização: os dados vivem no aparelho (localStorage + espelho
  IndexedDB), com prefixo `cm_` centralizado na constante `PREF`.

## Abas
Questões · Simulado · Prática · **Trilha** · Leituras · Cartões · Painel · Ajustes

**Trilha** é o que não existe nos apps de prova: R1/R2/R3 por rodízio, com foco, entregas marcáveis e
botão que filtra o banco pelo que o residente está vivendo agora.
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

## Identidade visual — "Papel de ECG"
Tirada do próprio assunto, não decorativa: papel quente com a grade milimetrada no cabeçalho, tinta
grafite, e o **teal do monitor** (`#0B6A72` claro / `#4FB8BD` escuro) como marca — verde e vermelho
ficam reservados para acerto e erro, como na prática. Títulos em **Newsreader** (ar de compêndio
clínico), corpo em **Inter**. Fontes cacheadas em `cm-fontes-v1`, separado do `CACHE`.
Auditoria de contraste por DOM: **0 falhas** nos 8 painéis × 2 temas (≥4,5:1 normal, ≥3:1 grande).

## Rotina de QA (antes de dizer "pronto")
1. `python3 monta_banco.py` (roda o validador; erro duro = não publica).
2. `node --check` na sintaxe de todos os `.js` e dos blocos inline do index.
3. Servir com `servir.py` (launch.json → `clinicamed`, porta 8711) e rodar asserções por DOM.
4. Auditoria de contraste nos 8 painéis × 2 temas — exigido: `total: 0`.
5. Só então: commit, **bump do `CACHE` do sw.js** e push.

### Receita de fechamento de leva
1. Escrever a leva; `python3 checa_leva.py <arquivo>` aponta o que está fora de 95–108%.
2. Janela da correta: `L ∈ [max(outros)/1.08, min(outros)/0.95]`. Corrigir casando por **prefixo**
   de texto (índices mudam depois do equilíbrio).
3. `python3 equilibra_gabarito.py <arquivo>` — **uma vez só, antes de publicar**. Depois que o app
   estiver em uso, NÃO rodar de novo: as respostas gravadas guardam o índice da alternativa.
4. `python3 monta_banco.py` e conferir "OK: nenhum erro duro".

## Estado do conteúdo (04/09/2026)
- **20 questões** em 6 levas, 20 chaves únicas, zero erros duros. Gabarito A:6 B:6 C:6 D:2.
- Cobertura: cardio 3 · emergências 4 · pneumo 4 · endócrino 3 · nefro 3 · neuro 3.
  **12 das 18 áreas ainda sem nenhuma questão** (infecto, gastro, SUS, hemato, reumato, geriatria,
  onco, derma, psiq, oftalmo, ORL, GO). Alvo do validador: peso × 3 = 360 questões.
- **0 questões de prova real** — o banco misto foi decidido, mas só a parte autoral existe hoje.
- 18 cartões · 3 estações · 2 leituras (sepse e AVC).

## Hospedagem
GitHub Pages, repo público `MedTechBR/clinicamed` → medtechbr.github.io/clinicamed/.
Conteúdo 100% autoral. Se entrarem questões transcritas de provas reais, reavaliar: material de
banca pode exigir o esquema privado do RadioTítulo.
