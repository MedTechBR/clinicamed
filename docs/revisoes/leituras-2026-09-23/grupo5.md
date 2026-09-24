# Revisão das leituras, grupo 5

Lote: antimicrobianos, demencias-parkinson, drc, eletrolitos, emergencias-glicemicas, fibrilacao-atrial,
insonia-e-sono, prova-de-funcao-pulmonar, sdra, sus-principios, tontura-e-vertigem,
tosse-cronica-e-bronquiectasias. Cópia dos originais em `scratchpad/g5/orig/`. Só esses 12 arquivos foram
editados. Nenhum commit.

Aviso para o coordenador: `leituras.js` (que não posso editar) ainda tem `tipo:"AAN/AHA e Bárány Society"` e o
`s:` com "segundo AAN/AHA" para `tontura-e-vertigem`. O kicker e o dek do HTML agora dizem GRACE-3 (ver abaixo).
O `s:` do catálogo precisa receber o mesmo texto.

---

## antimicrobianos

**1. Correções clínicas**
- AmpC: "Indutível em *Enterobacter*, *Serratia*, *Citrobacter*" → risco moderado a alto em *E. cloacae*,
  *K. aerogenes* e *C. freundii*; *Serratia marcescens* é de baixo risco; cefepima sugerida se CIM ≤ 2.
  Fonte: IDSA 2024 Guidance on AMR Gram-negative infections, Clin Infect Dis 2024 (https://pubmed.ncbi.nlm.nih.gov/39108079/).
- Carbapenemases: "ceftazidima-avibactam, meropenem-vaborbactam conforme o perfil" → KPC: essas duas;
  NDM/metalobetalactamase: ceftazidima-avibactam + aztreonam, ou cefiderocol. Mesma fonte (texto do PDF conferido).
- Alergia: "história de anafilaxia... é contraindicação a nova exposição e não é candidata a provocação" →
  anafilaxia à penicilina pede teste cutâneo antes de provocação; cefalosporina de cadeia lateral diferente
  (cefazolina) pode ser dada sem teste mesmo após anafilaxia; SJS/NET/DRESS seguem contraindicando.
  Fonte: AAAAI/ACAAI Drug allergy 2022 practice parameter update, JACI 2022
  (https://www.jacionline.org/article/S0091-6749(22)01186-1/fulltext).
- "a precocidade do antimicrobiano é a variável mais associada à sobrevida" (afirmação excessiva) → "cada hora de
  atraso associa-se a maior mortalidade".

**2. Dúvidas não resolvidas**
- Rodapé: guidelines IDSA sem ano (pneumonia, pele, ITU, intra-abdominal, neutropenia). Não acrescentei anos que
  não conferi.
- "Cistite 3 a 5 dias" não contempla fosfomicina em dose única.

**3. Outras correções**
- "biodisponibilidade oral, quinolonas..." → dois-pontos. Rodapé ganhou IDSA 2024 com ano e o parâmetro AAAAI 2022.

**4. Figuras:** não há.

**5. Profundidade:** superficial (≈1.400 palavras). Lacunas: PK/PD (tempo × concentração, infusão estendida de
betalactâmico); monitorização de vancomicina por AUC e de aminoglicosídeos; pneumonia hospitalar e associada à
ventilação; transição oral em endocardite e osteomielite (POET, OVIVA) sem detalhe; antifúngicos empíricos.

---

## demencias-parkinson

**1. Correções clínicas**
- Fatores de risco modificáveis: acrescentados LDL elevado e perda visual não tratada (Comissão Lancet 2024,
  14 fatores; Livingston et al., Lancet 2024).

**2. Dúvidas:** nenhuma relevante.

**3. Outras correções**
- Quatro frases quebradas pela conversão antiga de travessão ("Os biomarcadores. Amiloide e tau... Reposicionaram";
  "(... mudança alimentar. Frequentemente...)"; "(magnética... base alargada. O sintoma...)"; "(anti-NMDA, anti-LGI1.
  Potencialmente...)") reescritas com parênteses ou ponto e vírgula.
- "Lembrando que" (muleta) removido duas vezes; "Parkinsonismo medicamentoso, metoclopramida" → dois-pontos.
- Rodapé: anos acrescentados (NG97 2018, critérios revisados de Alzheimer 2024, consenso DLB 2017, MDS 2015,
  Lancet 2024, EAN/PNS 2023).

**4. Figuras:** não há.

**5. Profundidade:** superficial (≈1.600 palavras para demência + Parkinson + neuropatia). Lacunas: critérios
formais (DSM-5 / NIA-AA 2024, estadiamento biológico); manejo das complicações motoras da levodopa e opções
avançadas; delirium × demência; ELA e doença do neurônio motor; tratamento da demência vascular e CADASIL.

---

## drc

**1. Correções clínicas**
- iSGLT2: "Doença renal crônica com albuminúria, com ou sem diabetes" → TFGe ≥ 20: DM2 com qualquer
  albuminúria; sem diabetes, ACR ≥ 200 mg/g ou IC (1A); sugerido com TFGe 20–45 e ACR menor.
  Fonte: KDIGO 2024 CKD, rec. 3.7.1 (https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf).
- Acidose: "repor bicarbonato para manter acima de 22 mEq/L; reduz progressão" (KDIGO 2012) → considerar
  tratamento quando bicarbonato < 18 mEq/L, sem ultrapassar o limite superior do normal. KDIGO 2024, PP 3.10.1/3.10.2.
- Ferro: "TSAT ≤ 30% e ferritina ≤ 500" (KDIGO 2012) → KDIGO 2026: fora da HD, ferritina < 100 (TSAT < 40%) ou
  ferritina 100–300 com TSAT < 25%; na HD, ferritina ≤ 500 e TSAT ≤ 30%; suspender com ferritina > 700 ou
  TSAT ≥ 40%; HIF-PHI em segunda linha. Hb em uso de AEE até 11,5 (tipicamente 10–11,5).
  Fonte: KDIGO 2026 Anemia in CKD, Executive Summary, Kidney Int 2026
  (https://kdigo.org/wp-content/uploads/2026/01/KDIGO-2026-Anemia-in-CKD-Guideline-Executive-Summary.pdf).
- Pergunta 1 ("TFG 75 com ACR 600, tem DRC?"): a resposta afirmava "Sim" sem a persistência > 3 meses que o enunciado
  não dá → "Sim, se persistir por mais de 3 meses: G2A3".
- "resinas quelantes de nova geração" → quelantes (patirômer, ciclossilicato de zircônio sódico; este não é resina).

**2. Dúvidas**
- "Confirmar com duas de três amostras em 3 a 6 meses" é regra da ADA; a KDIGO 2024 pede confirmação por nova
  amostra. Não mexi.
- Encaminhamento: a KDIGO 2024 inclui ACR ≥ 300 mg/g e risco KFRE de 3–5% em 5 anos; o texto só cita TFGe < 30
  e "albuminúria muito elevada".

**3. Outras correções**
- "marcadores de dano. Albuminúria, ..." → dois-pontos com o corte de 30 mg/g; parêntese quebrado da dieta
  proteica corrigido (0,8 g/kg/dia em G3–G5); concordância "todas elevam" → "situações que a elevam".
- Rodapé: anemia KDIGO 2026 com título correto; anos em CKD-MBD (2017) e PA (2021).

**4. Figuras:** não há.

**5. Profundidade:** superficial (≈1.500 palavras). Lacunas: KFRE e critérios de encaminhamento de 2024;
cistatina C combinada (CKD-EPI creatinina-cistatina); metas de PTH, fósforo e cálcio; manejo detalhado da
hipercalemia; vacinação e ajuste de fármacos.

---

## eletrolitos

**1. Correções clínicas**
- Limite de correção da hiponatremia: "cerca de 8 mEq/L em 24 h, 6 nos de risco", atribuído à diretriz europeia →
  10 mEq/L nas primeiras 24 h e 8 a cada 24 h seguintes (diretriz europeia 2014); no alto risco de desmielinização,
  no máximo 8 em 24 h. Bólus de hipertônica: meta de ~5 mEq/L nas primeiras horas. Resposta da pergunta 2 alinhada.
  Fonte: Spasovski et al., ESE/ESICM/ERA-EDTA 2014, Eur J Endocrinol (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12844543/
  cita os limites; conferido também em Medscape guidelines summary).

**2. Dúvidas:** nenhuma.

**3. Outras correções**
- Os seis passos da gasometria, as fórmulas de compensação e os passos da hiponatremia tinham o travessão
  convertido em vírgula ("pH, acidemia..."); passaram a dois-pontos. "osmolaridade" → "osmolalidade" nos passos.
  "Decidir pela gravidade" ganhou "e pela velocidade de instalação" (coerente com o dek).

**4. Figuras:** não há.

**5. Profundidade:** superficial (≈1.200 palavras). Lacunas: critérios de SIADH e tratamento (ureia, tolvaptana);
doses da hipercalemia (gluconato, insulina, salbutamol); hipofosfatemia e síndrome de realimentação; acidose tubular
renal por tipo e ânion gap urinário; osmol gap nas intoxicações.

---

## emergencias-glicemicas

Fonte conferida no PDF primário: Umpierrez GE et al. Hyperglycemic crises in adults with diabetes: a consensus
report. Diabetes Care 2024;47:1257–1275 (https://profketandhatariya.com/wp-content/uploads/2024/08/Diabetes-Care-2024.pdf;
PMC11272983). O texto dizia "consenso 2024" mas trazia os números da ADA 2009 em quase todo o tratamento.

**1. Correções clínicas**
- Potássio: "< 3,3 adiar insulina, repor 20–40 mEq/h; 3,3–5,2: 20–30 mEq/L; > 5,2" → < 3,5 adiar insulina e
  repor 10–20 mEq/h até > 3,5; 3,5–5,0: 10–20 mEq por litro para manter 4–5; > 5,0: sem K, rechecar a cada 2 h.
  Pergunta 1 e sua resposta alinhadas (3,5 e 10–20 mEq/h).
- Bicarbonato: pH < 6,9 → pH < 7,0 (texto e "Erros frequentes").
- Resolução da CAD: "glicemia < 200 + 2 de 3 (HCO₃ ≥ 15, pH > 7,3, AG ≤ 12)" → cetonemia < 0,6 mmol/L e
  pH ≥ 7,3 ou HCO₃ ≥ 18, idealmente glicemia < 200; ânion gap e cetonúria deixaram de ser critério.
  Resolução do EHH: osmolalidade < 300, diurese > 0,5 mL/kg/h, melhora cognitiva, glicemia < 250.
  Resposta da pergunta 2 alinhada; a 5 continua correta pelos critérios novos.
- Critérios do EHH (tabela): "osm > 320; pH > 7,3 e HCO₃ > 18" → osmolalidade efetiva > 300 ou total > 320;
  pH ≥ 7,3 e HCO₃ ≥ 15; BHB < 3,0; alteração mental deixou de ser critério (confirmado também em CCJM 2025,
  https://www.ccjm.org/content/92/3/152).
- Volume: "10–20 mL/kg na 1ª hora; manutenção 250–500 mL/h com 0,45% se Na corrigido normal" → 500–1.000 mL/h
  nas primeiras 2–4 h (≈1 L/h na hipovolemia grave), alíquotas de 250 mL em idoso/IC/diálise; repor metade do
  déficit em 8–12 h; 0,45% só se a osmolalidade não cai apesar de balanço e insulina adequados.
- Glicose: "a 200–250 mg/dL" → abaixo de 250; manter 150–200 até a resolução; na CAD euglicêmica, glicose desde o início.
- EHH: insulina 0,05 U/kg/h (0,1 se cetonemia significativa); queda de glicemia máx. 90–120 mg/dL/h, sódio
  máx. 10 mEq/L/24 h, osmolalidade 3–8 mOsm/kg/h; glicemia 200–250 até a resolução (antes: "50–75 mg/dL/h,
  glicemia 250–300").
- Déficit corporal de K: 3–5 → 3–6 mEq/kg. "Pseudo-hiponatremia dilucional" → hiponatremia translocacional
  (pseudo-hiponatremia é outra entidade, como a leitura de eletrólitos define).

**2. Dúvidas não resolvidas**
- Fosfato: o texto diz repor com "fósforo abaixo de 1,0 mg/dL"; o consenso de 2024 grafa "< 1.0 mmol/L"
  (≈ 3,1 mg/dL), o que parece erro de unidade da própria fonte. Não mexi.
- "Alvo de queda 50–75 mg/dL/h" na CAD vem da ADA 2009; o consenso de 2024 não fixa esse número. Mantido.
- Kicker/tipo "Consenso ADA/EASD 2024": o documento é de ADA, EASD, JBDS, AACE e DTS. O rodapé agora cita
  as cinco; kicker e catálogo não foram mexidos.

**3. Outras correções**
- Frases quebradas ("3 a 5 mEq/kg. Pela diurese"; "semelhante ao da cetoacidose. 50 a 75") reescritas.
  Rodapé com referência completa.

**4. Figuras:** não há.

**5. Profundidade:** adequada (≈1.900 palavras). Lacunas: hipoglicemia (ausente); CAD euglicêmica por iSGLT2 (manejo
e reintrodução); CAD na gestação; prevenção de recorrência e plano de alta; critérios de gravidade em tabela.

---

## fibrilacao-atrial

Fonte local conferida: `fontes/Fibrilação_Atrial_-_ESC_2024.txt`.

**1. Correções clínicas**
- Nenhum erro de conduta. Conferido na fonte (e mantido): anticoagulação de longo prazo na FA pós-operatória é
  IIa B para cirurgia cardíaca e não cardíaca; bariátrica também com IMC ≥ 35 e complicações (nota da tabela).
- Coerência: "Dabigatrana contraindicada com filtração < 30 mL/min/1,73 m²" → "clearance < 30 mL/min", como na
  tabela de doses e na diretriz.
- Removido o número "250 a 300 bpm" da condução 1:1 do flutter por classe IC (não está na diretriz e a droga
  lentifica o flutter); ficou "resposta ventricular muito rápida".

**2. Dúvidas:** nenhuma.

**3. Outras correções**
- Fluxograma 2 (letra miúda) refeito: largura do viewBox **1035 → 547**. Os nós "anticoagular" viraram rótulos de
  seta, e o fluxo ficou em coluna (CMH/amiloidose → CHA₂DS₂-VA → valva → varfarina ou direto → sangramento).
- Fluxograma 1: 762 → 732; fluxograma 3: 793 → 717 (rótulos quebrados em mais linhas). Os três desenham sem erro.
- Espaço faltando após vírgula antes de negrito (4 lugares); "traçado,não serve vestível" reescrito;
  "Câncer, doença renal..." e várias frases de fragmento (EAST-AFNET 4, 48 horas, reversão espontânea,
  vernakalant, flutter, perguntas de revisão) com dois-pontos; "“fibrilação atrial valvar”" com maiúscula;
  legenda "Tabela 11" → "Tabela 11 da diretriz".

**4. Figuras**
- `real-fa.svg`, `real-flutter.svg`: conferem com a legenda.
- `real-fa-pre-excitada.svg`: a legenda afirma "QRS largo de morfologia variável"; em V4–V6 e aVL os complexos
  parecem estreitos e altos, e o alargamento só é evidente em parte das derivações. Conferir se o recorte
  sustenta "QRS largo" ou ajustar a legenda.

**5. Profundidade:** monografia (≈5.500 palavras). Lacunas: reversão dos anticoagulantes com doses
(idarucizumabe, andexanete, complexo protrombínico); FA na gestação; energia e técnica da cardioversão elétrica;
retomada do anticoagulante após hemorragia intracraniana; FA e doença renal avançada/diálise.

---

## insonia-e-sono

**1. Correções clínicas**
- Doxepina/trazodona: "úteis quando há depressão associada" → doxepina 3–6 mg tem sugestão da AASM para insônia de
  manutenção; trazodona e mirtazapina quando há depressão; a AASM sugere não usar trazodona na insônia isolada.
  Fonte: AASM Pharmacologic Treatment of Chronic Insomnia, J Clin Sleep Med 2017.
- Pernas inquietas: reposição de ferro com ferritina < 75 ng/mL **ou saturação < 20%** (faltava a saturação).
  Fonte: AASM 2024 RLS/PLMD guideline, rec. 6 (https://aasm.org/wp-content/uploads/2024/03/Treatment-of-RLS-and-PLMD-CPG.pdf).

**2. Dúvidas:** nenhuma.

**3. Outras correções**
- Definição de insônia e "privação de sono" com frases quebradas → parênteses; "Polissonografia, não é" e
  "Rever fármacos que pioram. Antidepressivos" → dois-pontos; segurança do quarto em parênteses.
- Rodapé: ICSD-3 → ICSD-3-TR (2023).

**4. Figuras:** não há.

**5. Profundidade:** adequada no limite inferior (≈1.900 palavras). Lacunas: apneia obstrutiva (diagnóstico,
CPAP, gravidade por IAH); critérios de narcolepsia (TLMS, hipocretina) e fármacos; parassonias do NREM; antagonistas
de orexina (daridorexanto, lemborexante) com lugar definido; sono no idoso.

---

## prova-de-funcao-pulmonar

**1. Correções clínicas**
- Gravidade: tabela em cinco faixas por % do previsto (ATS/ERS 2005) → três níveis por escore z (leve −1,65 a −2,5;
  moderada −2,51 a −4,0; grave < −4,0), com nota de que a escala antiga ainda aparece em laudos e de que o GOLD
  estadia em % do previsto. Fonte: ERS/ATS technical standard on interpretive strategies, Eur Respir J 2022
  (https://publications.ersnet.org/content/erj/60/1/2101499).
- DPOC: "relação abaixo do limite inferior (historicamente abaixo de 0,70 pelo GOLD)" dava a entender que o GOLD
  abandonou o 0,70 → GOLD 2026 mantém VEF₁/CVF < 0,70 pós-BD; a ATS/ERS prefere o LIN (coerente com `dpoc.html`).

**2. Dúvidas:** ano da diretriz SBPT de função pulmonar não citado; não acrescentei.

**3. Outras correções**
- Aceitabilidade/reprodutibilidade, siglas, causas de obstrução, curvas fluxo-volume, broncoprovocação e oximetria:
  vírgulas herdadas do travessão → parênteses ou dois-pontos. Rodapé GOLD/GINA com parênteses quebrados refeito.

**4. Figuras:** não há (lacuna: a leitura descreve as alças fluxo-volume sem nenhum esquema).

**5. Profundidade:** superficial (≈1.600 palavras). Lacunas: padrão inespecífico e PRISm; KCO e interpretação da
DLCO pelo volume alveolar; critérios de aceitabilidade da ATS 2019 (BEV, EOFE); broncoprovocação (PC20/PD20);
prova de função no pré-operatório.

---

## sdra

Fonte local conferida: `fontes/SDRA_-_Nova_Definição_Global_2024_ESICM-ATS-SCCM_-_AJRCCM.txt` (tabela 2 e notas).

**1. Correções clínicas**
- Limiares da definição global: o texto usava "< 300", "< 315", "SpO₂ abaixo de 97%" e "alto fluxo acima de
  30 L/min"; a definição é ≤ 300, ≤ 315, SpO₂ ≤ 97% (a razão "não é válida acima de 97%") e fluxo ≥ 30 L/min.
  Gravidade: leve 235 < S/F ≤ 315; moderada 148 < S/F ≤ 235; grave P/F ≤ 100 e S/F ≤ 148. Corrigido em texto,
  tabelas, fluxograma 1, "Erros frequentes" e perguntas de revisão. Matthay MA et al. AJRCCM 2024;209:37–47.

**2. Dúvidas**
- Bloqueio neuromuscular "PaO₂/FiO₂ de 100 ou menos" (ACURASYS usou < 150): não conferi o texto da ATS 2024.
- As recomendações de volume corrente, prona e oscilatória vêm da ATS 2017 e foram mantidas na atualização de
  2024; o rodapé atribui todas à de 2024.

**3. Outras correções**
- Fluxograma 1 (não estava na lista, mas media 862 px): refeito com rótulos quebrados → **704**. Fluxograma 2: 544.
  Os dois desenham sem erro.
- SVG inline da Figura 1: a linha começava com vírgula (", 80% acima do alvo") → "…pelo peso real:" / "80% acima…".
- "As três categorias,<b>não intubada</b>" e "rotina,<b>proteger" sem espaço; legenda da Figura 2 e a definição de
  pressão de distensão com frases de fragmento ("O atelectrauma, que..."); definição de recrutamento prolongado em
  parênteses; "Erros frequentes" com vírgula no lugar de dois-pontos.

**4. Figuras**
- `fig-curva-pv.svg`: o **ponto de inflexão inferior** está marcado no meio da sigmoide (trecho de maior inclinação),
  não no joelho inferior onde a complacência aumenta; o rótulo "pressão de vias aéreas" fica abaixo das notas,
  longe do eixo x; título no molde "Assunto: manchete" ("Curva pressão-volume: onde a PEEP e o platô precisam ficar").

**5. Profundidade:** monografia (≈5.200 palavras). Lacunas: alto fluxo × VNI antes da intubação e falha
(índice ROX); ajuste de sedação e desmame; dexametasona na COVID-19 e hidrocortisona na PAC grave (citadas sem dose);
pressão de distensão com PEEP titulada por tomografia de impedância; manejo da hipercapnia permissiva (limites).

---

## sus-principios

**1. Correções clínicas / de legislação**
- Equidade: "a Constituição fala em igualdade de assistência 'sem preconceitos ou privilégios'" — essa frase é da
  Lei 8.080 (art. 7º, IV); a Constituição (art. 196) diz "acesso universal e igualitário". Corrigido.
- Violência contra a mulher: acrescentada a Lei 13.931/2019 (comunicação à autoridade policial em até 24 h dos
  casos com indícios ou confirmação, preservado o sigilo clínico), no texto e na resposta da pergunta 4.
  Fonte: http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13931.htm.
- Determinantes da Lei 8.080 (art. 3º): acrescentados atividade física e acesso a bens e serviços essenciais.

**2. Dúvidas**
- A paridade 50/25/25 do conselho vem da Resolução CNS 453/2012, não da Lei 8.142. Não citada.
- PNAB 2017 segue como referência; o cofinanciamento da APS mudou em 2024 e não aparece.

**3. Outras correções**
- Atributos de Starfield com vírgula → dois-pontos; "Conferências" sem espaço; "linhas de cuidado. Urgência...";
  "por ordem de chegada. Que serve..."; NNT e confusão com frases quebradas.

**4. Figuras:** não há.

**5. Profundidade:** superficial (≈1.600 palavras). Lacunas: financiamento (EC 29, LC 141/2012, cofinanciamento
da APS); níveis de prevenção (inclusive quaternária); razão de verossimilhança, curva ROC, erro tipo I/II e poder;
Política Nacional de Humanização; lista e prazos de notificação imediata.

---

## tontura-e-vertigem

**1. Correções clínicas / de fonte**
- Sigla de diretriz inexistente: "AAN/AHA" (kicker, dek e rodapé) não corresponde a documento conjunto sobre tontura.
  O documento que embasa o texto (HINTS, audição, imagem) é o GRACE-3, Society for Academic Emergency Medicine:
  Edlow JA et al., Acad Emerg Med 2023 (https://pubmed.ncbi.nlm.nih.gov/37166022/). Kicker, dek e rodapé trocados.
- Imagem: "angiotomografia e ressonância" como caminho → ressonância com difusão, com angiografia (TC ou RM) de vasos
  cervicais e intracranianos se dissecção ou AIT vertebrobasilar; a GRACE-3 recomenda não usar TC para excluir AVC.
- Acrescentado que o HINTS só tem a acurácia descrita nas mãos de examinador treinado (GRACE-3).

**2. Dúvidas**
- "Cerca de um quarto dos AVC de fossa posterior se apresenta como tontura isolada": não conferi a proporção.

**3. Outras correções**
- HINTS "plus" com frase quebrada; alarmes, VPPB, Epley, TPPP, ângulo pontocerebelar e sedativos vestibulares:
  vírgulas do travessão → dois-pontos ou parênteses; "Kattah JC et al.." corrigido.

**4. Figuras:** não há.

**5. Profundidade:** adequada (≈1.800 palavras). Lacunas: critérios Bárány de migrânea vestibular e de Ménière em
tabela; manobras do canal horizontal e do anterior; corticoide na neurite (evidência); algoritmo STANDING;
vertigem no idoso e quedas.

---

## tosse-cronica-e-bronquiectasias

**1. Correções clínicas**
- Tosse refratária: "Codeína e outros opioides têm papel limitado e não devem ser a estratégia" contrariava a
  ERS 2020, que recomenda prova com morfina de liberação lenta 5–10 mg 12/12 h (forte, evidência moderada) e sugere
  gabapentina/pregabalina (condicional); codeína não é recomendada. Texto e "Erros frequentes" ajustados.
  Fonte: Morice AH et al., ERS guidelines on chronic cough, Eur Respir J 2020 (https://eprints.gla.ac.uk/191844/7/191844.pdf).
- Exacerbação de bronquiectasia: faltava "três ou mais" sintomas; definição refeita pelo consenso de Hill et al.,
  Eur Respir J 2017.
- ABPA: "corticoide sistêmico e itraconazol" → corticoide ou itraconazol em monoterapia, associados nas exacerbações
  recorrentes. Fonte: ISHAM-ABPA 2024, Eur Respir J 2024 (https://publications.ersnet.org/content/erj/63/4/2400061).
- DNase: "contraindicada" → "não deve ser usada: piorou desfecho" (é recomendação contra, ERS 2017).

**2. Dúvidas**
- Brensocatib (inibidor de DPP-1) para bronquiectasias: não conferi aprovação regulatória; não entrou.

**3. Outras correções**
- "tudo,<b>usa inibidor" sem espaço e com "?." duplo; causas de bronquiectasia, localizada × difusa e macrolídeo
  ("azitromicina. Que reduz...") com frases quebradas. Rodapé: Hill 2017 e ISHAM 2024 acrescentados; "2018-2020" → 2018.

**4. Figuras:** não há.

**5. Profundidade:** adequada (≈1.900 palavras). Lacunas: erradicação de *Pseudomonas* (esquemas); hemoptise
(graduação e manejo); escores de gravidade (BSI, FACED); bronquiectasia associada a DPOC e asma; coqueluche no adulto
(diagnóstico e tratamento).

---

## Resumo

- **Erros clínicos corrigidos: 35** (antimicrobianos 4, demências 1, DRC 5, eletrólitos 1, emergências glicêmicas 9,
  FA 1 de coerência, insônia 2, PFP 2, SDRA 1 bloco de limiares, SUS 3, tontura 2, tosse 4). Todos com fonte
  conferida (PDF primário, fonte local em `fontes/` ou página oficial).
- **Os 3 mais graves**
  1. **Cetoacidose/EHH** ensinava o protocolo da ADA 2009 com rótulo de 2024: adiar insulina com K < 3,3 (hoje 3,5),
     bicarbonato com pH < 6,9 (hoje 7,0), resolução por ânion gap (abandonado), critérios de EHH e metas de glicose
     do EHH antigos.
  2. **DRC** com metas superadas: bicarbonato > 22 (KDIGO 2024: tratar abaixo de 18) e critérios de ferro da KDIGO 2012
     (a KDIGO 2026 mudou os limiares fora da diálise); indicação de iSGLT2 incompleta.
  3. **Antimicrobianos, alergia**: afirmava que anafilaxia à penicilina contraindica nova exposição, quando o parâmetro
     de 2022 manda testar e libera cefalosporina de cadeia lateral diferente; e AmpC listava *Serratia* como alto risco.
  Menção: a leitura de tontura citava uma diretriz "AAN/AHA" que não existe; a de tosse contrariava a ERS 2020 sobre morfina.
- **Fluxogramas refeitos (largura do viewBox)**
  - fibrilacao-atrial, fluxograma 2: **1035 → 547** (o da lista)
  - fibrilacao-atrial, fluxograma 1: 762 → 732; fluxograma 3: 793 → 717
  - sdra, fluxograma 1: 862 → 704 (fluxograma 2 já estava em 544)
  - Todos desenham sem erro (conferido no Browser pane).
- **Figuras com defeito (para o gerador):** `fig-curva-pv.svg` (ponto de inflexão inferior no lugar errado, rótulo do
  eixo x deslocado, título-manchete); `real-fa-pre-excitada.svg` (legenda diz "QRS largo" e várias derivações mostram
  QRS estreito).
- **Pendente fora do meu lote:** `leituras.js`, entrada `tontura-e-vertigem` (`tipo` e `s:` com "AAN/AHA").
