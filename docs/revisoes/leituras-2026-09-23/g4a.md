# Revisão das leituras, lote g4a

Lote: dialise-e-transplante, diarreia-ma-absorcao, dii, emergencias-oncologicas, farmacodermias-graves.
Nenhuma das cinco tem `<figure class="fig">` nem fluxograma mermaid (conferido por grep): itens E e F não se aplicam.

## dialise-e-transplante

### 1. Correções clínicas
- Anemia (atualização de diretriz). Antes: "alvo de hemoglobina em torno de 10 a 11,5 g/dL, corrigir além disso aumenta eventos". Depois: "iniciado no dialítico com hemoglobina de 9 a 10 g/dL e mantendo-a abaixo de 11,5 g/dL (corrigir além disso aumenta AVC, trombose do acesso e eventos cardiovasculares)". Fonte: KDIGO 2026 Clinical Practice Guideline for the Management of Anemia in CKD (Kidney Int, 2026), https://kdigo.org/wp-content/uploads/2026/01/KDIGO-2026-Anemia-in-CKD-Guideline.pdf; resumo em http://www.nephjc.com/news/kdigo-anemia. Acrescentada ao footer.
- Hipercalemia. Antes: "hipercalemia é a principal causa de morte súbita nessa população" (afirmação exagerada; a morte súbita do dialítico é multifatorial). Depois: "causa importante de arritmia e morte súbita nessa população, sobretudo após o intervalo longo do fim de semana".
- Preservação venosa. Antes: "Evitar cateter central de inserção periférica nesse membro [braço não dominante]". Depois: evitar PICC e punções desnecessárias em todo paciente com DRC G3 a G5 ou em diálise (não só num braço). Fonte: KDOQI Clinical Practice Guideline for Vascular Access 2019 Update, https://www.ajkd.org/article/S0272-6386(19)31137-0/fulltext.
- Hemólise intradialítica: acrescentado "sem devolver o sangue do circuito (risco de hipercalemia); dosar potássio" (conduta padrão; antes dizia só "parar").

### 2. Dúvidas não mexidas
- "Elevação de 20 a 25% sobre o basal é disfunção do enxerto": regra prática consagrada, sem ponto de corte formal no KDIGO 2009; mantida.
- Footer cita KDIGO de transplante (2009) como fonte; não há atualização completa do cuidado do receptor (a de 2020 é só avaliação do candidato). Acrescentei o ano 2009.

### 3. Outras correções
- Vírgulas-travessão convertidas: "cateter por último, o cateter tem" → "porque o cateter tem"; "sobrecarga de volume, o exame" → ";"; "linha de base,<b>elevação" (sem espaço) → ", e elevação"; listas de inibidores/indutores do CYP3A4 entre vírgulas coladas → parênteses; "ao procedimento, ferida, urina…" → parênteses; "neoplasias, pele e…" → parênteses; "remove antimicrobianos…, as doses" → dois-pontos.
- Footer: ano 2009 no KDIGO de transplante; KDIGO 2026 de anemia acrescentado.

### 4. Figuras
- Nenhuma.

### 5. Profundidade
Adequada (texto compacto, ~2.000 palavras; não é monografia). Lacunas para prova de título:
1. Dose de diálise e adequação (Kt/V, URR) e prescrição do peso seco.
2. Distúrbio mineral e ósseo com números (fósforo, cálcio, PTH alvo 2 a 9 vezes o limite superior, calcimiméticos).
3. Rejeição: classificação de Banff, tratamento (pulsoterapia, timoglobulina, plasmaférese/IVIG) e anticorpos doador-específicos.
4. CMV no transplante: profilaxia × terapia preemptiva, duração conforme D+/R−.
5. Intoxicações e EXTRIP (critérios para lítio, metformina, salicilato) e ajuste de antimicrobiano em TRS contínua.

## diarreia-ma-absorcao

### 1. Correções clínicas
- Critérios de Roma IV (erro de critério). Antes: "Dor abdominal recorrente relacionada à evacuação ou a mudança na frequência ou na forma das fezes" (com "ou", um item bastaria). Depois: dor recorrente, em média 1 dia por semana nos últimos 3 meses, início há 6 meses ou mais, associada a **dois ou mais** dos três itens. Fonte: Lacy BE et al., Bowel Disorders, Gastroenterology 2016 (Roma IV), e ACG Clinical Guideline: Management of IBS, Am J Gastroenterol 2021.
- Insuficiência pancreática exócrina. Antes: "reposição enzimática em dose adequada … associada a inibidor de bomba para melhorar a eficácia" (IBP apresentado como rotina, dose vaga). Depois: pelo menos 40 mil unidades de lipase por refeição e metade nos lanches; IBP obrigatório com preparação sem revestimento entérico e útil quando a resposta é insuficiente. Resposta da pergunta de revisão alinhada. Fonte: AGA Clinical Practice Update on EPI, Gastroenterology 2023 (Whitcomb, Buchner, Forsmark), https://pubmed.ncbi.nlm.nih.gov/37737818/.
- Footer com fonte inexistente. Antes: "ACG Guidelines on Chronic Diarrhea…" (não há diretriz ACG de diarreia crônica; conferido na busca) e itens sem ano. Depois: ACG celíaca 2023, ACG SII 2021, ACG SIBO 2020, AGA diarreia funcional 2019, AGA colite microscópica 2016, AGA IPE 2023 e BSG diarreia crônica 2018.
- "A diarreia acorda o paciente à noite? Se sim, é orgânica" → "sugere fortemente causa orgânica" (é indício, não prova).

### 2. Dúvidas não mexidas
- Footer item "Federação Brasileira de Gastroenterologia. Consensos de diarreia crônica e doença celíaca": não localizei esses consensos; manter só se existir a referência exata.
- "Sequestrantes de sais biliares" no tratamento da SII-D: não constam entre as recomendações da AGA 2022 nem da ACG 2021 para SII-D (são para diarreia por sais biliares). Não é erro grave; deixei.
- Alarme "início após os 50 anos": várias fontes já usam 45 (idade de rastreio colorretal). Não mexi.

### 3. Outras correções
- Gap osmolar fecal ganhou números e fórmula (acima de 125 osmótica, abaixo de 50 secretora; 290 menos 2×(Na+K)); os parênteses misturavam característica e causa com um ponto no meio.
- Vírgulas-travessão e frases coladas: "4 semanas, consistência…" → "; o critério é…"; "falsamente negativo. Preferir" → ";"; "mucosa normal, é assim" → ":"; "IgA total, a deficiência" → "porque a deficiência"; "Ignorar diarreia noturna, é sinal" → "…, sinal"; resposta "mantendo glúten na dieta, doença celíaca." reordenada; "afasta padrão funcional, impede fechar…" reescrita.

### 4. Figuras
- Nenhuma.

### 5. Profundidade
Adequada (~1.800 palavras, visão de conjunto). Lacunas para prova:
1. Celíaca: diagnóstico sem biópsia (ACG 2023) e papel do HLA-DQ2/DQ8 para excluir.
2. Diarreia por C. difficile: critérios de gravidade e tratamento (fidaxomicina/vancomicina, IDSA/SHEA 2021).
3. Números do SIBO (teste respiratório: elevação de hidrogênio ≥20 ppm em 90 min; metano ≥10 ppm).
4. Síndrome do intestino curto e diarreia pós-bariátrica/ pós-vagotomia.
5. Tumores neuroendócrinos: exames de triagem (gastrina de jejum, 5-HIAA, VIP) e cromogranina.

## dii

### 1. Correções clínicas
- Vigilância de câncer colorretal. Antes: vigilância aos 8 anos "na doença extensa" (deixava de fora a colite esquerda e a colite de Crohn). Depois: aos 8 anos do início dos sintomas em toda colite além do reto, inclusive Crohn com mais de um terço do cólon; colangite esclerosante desde o diagnóstico; proctite isolada fora da vigilância. Fonte: ECCO, Third European Consensus on UC, Part 1 (J Crohns Colitis 2017), https://academic.oup.com/ecco-jcc/article/11/6/649/2966917; ECCO E-Guide, https://www.e-guide.ecco-ibd.eu/interventions-investigational/colorectal-carcinoma-surveillance.
- Profundidade na retocolite. Antes: "Mucosa e submucosa". Depois: "Restrita à mucosa (submucosa superficial só na doença grave)" (a tabela contrasta com transmural; "mucosa e submucosa" é o que a prova marca como errado).
- Moduladores de S1P: "monitorar bradicardia, macular e linfopenia" → "edema macular" (palavra faltando mudava o sentido).
- Footer atualizado com as versões vigentes: ECCO UC 2022, ECCO Crohn 2024, ECCO-ESGAR 2019, AGA UC 2024, AGA Crohn 2025 (Gastroenterology 169(7), 2025, https://www.gastrojournal.org/article/S0016-5085(25)06091-3/fulltext), ACG UC 2025 e Crohn 2025 (https://journals.lww.com/ajg/fulltext/10.14309/ajg.0000000000003463), STRIDE-II 2021, ECCO infecções 2021. Antes, nenhum item tinha ano.

### 2. Dúvidas não mexidas
- "Reavaliar no terceiro ao quinto dia" na colite aguda grave: ECCO fixa a avaliação formal no dia 3 (critérios de Oxford). Não é erro; poderia ser "no terceiro dia".
- A tabela de retocolite por extensão não traz doses (mesalazina oral ≥2,4 g/dia na indução, 4,8 g na extensa; supositório 1 g). Não acrescentei.

### 3. Outras correções
- Tuberculose × Crohn: "o tratamento imunossupressor de uma agrava fatalmente a outra" (impreciso) → "imunossuprimir uma tuberculose tomada por Crohn pode disseminá-la".
- "subocluí" → "suboclui" (ortografia).
- Frases soltas/fragmento: "Informação que muda completamente a conduta." e "Distinguindo dose insuficiente…" incorporadas à frase anterior.
- Vírgulas-travessão convertidas em ";", ":" ou "que/porque/pelo" em 8 pontos (enema, profilaxia, anticolinérgicos, colangite, patergia, ferro entre parênteses, erros frequentes, respostas das perguntas de revisão).

### 4. Figuras
- Nenhuma.

### 5. Profundidade
Adequada no limite (~1.400 palavras; a mais curta do lote). Lacunas para prova:
1. Escores de atividade (Mayo, Harvey-Bradshaw) e critérios de Oxford/índice de Travis no dia 3.
2. Doses e esquemas: mesalazina, corticoide IV (hidrocortisona 100 mg 6/6 h ou metilprednisolona 60 mg), infliximabe 5 mg/kg de resgate.
3. Tiopurinas: dosagem de TPMT/NUDT15 antes, e metotrexato no Crohn.
4. Crohn perianal: exame sob anestesia, sedenho, anti-TNF.
5. Gestação e DII; tratamento de manutenção após colectomia/bolsite.

## emergencias-oncologicas

### 1. Correções clínicas
- Hipercalcemia, contradição interna. Antes: "raramente, paratormônio ectópico. Sempre com PTH suprimido". Depois: "Fora desse caso raro, o PTH vem suprimido".
- Hipercalcemia, antirreabsortivo (atualização). Antes: "o denosumabe é preferido na insuficiência renal". Depois: a Endocrine Society sugere denosumabe em vez de bisfosfonato; é a opção na insuficiência renal e na refratariedade ao bisfosfonato. Calcitonina: acrescentado o uso na hipercalcemia grave (>14 mg/dL) associada ao antirreabsortivo e o limite de 48 a 72 h. Fonte: Endocrine Society, Treatment of Hypercalcemia of Malignancy in Adults, JCEM 2023, https://pubmed.ncbi.nlm.nih.gov/36545746/. O footer citava "ESMO, hypercalcaemia of malignancy" sem ano (não localizei diretriz ESMO específica); trocado pela Endocrine Society 2023.
- Neutropenia febril, definição. Antes: "ou abaixo de 1.000 com previsão de queda". Depois: "ou com previsão de cair abaixo de 500 nas próximas 48 horas" (definição IDSA 2010). MASCC: acrescentado o ponto de corte de baixo risco (≥ 21). Fonte: Freifeld et al., IDSA 2010; Taplitz et al., ASCO/IDSA 2018.
- Toxicidade da imunoterapia. Acrescentado: exceções do grau 1 (neurológicas, hematológicas, cardíacas), desmame "de pelo menos" 4 a 6 semanas e "grau 4 costuma indicar suspensão definitiva, exceto endocrinopatias com reposição". Corticoide da colite especificado como metilprednisolona 1 a 2 mg/kg/dia (antes "corticoide 1–2 mg/kg", com travessão). Fonte: Schneider et al., ASCO Guideline Update, J Clin Oncol 2021;39:4073, https://ascopubs.org/doi/10.1200/JCO.21.01440.
- Footer: "ASCO … atualização 2024" → 2021 (a busca só encontra a atualização de 2021; não achei versão 2024); "ESC Guidelines on Pericardial Diseases" sem ano → ESC 2025 Guidelines for the management of myocarditis and pericarditis (https://academic.oup.com/eurheartj/article/46/40/3952/8234483); lise tumoral: "ASCO/BCSH" sem ano → BCSH 2015 e Coiffier et al., J Clin Oncol 2008; IDSA 2010 e ASCO/IDSA 2018 com ano.

### 2. Dúvidas não mexidas
- Kicker e dek citam NCCN, mas nenhuma fonte NCCN aparece no footer. Sugiro tirar "NCCN" do kicker/dek ou citar a diretriz NCCN usada (não mexi porque o `s:` do catálogo em leituras.js repete o dek e não é meu arquivo).
- Se existir de fato uma atualização ASCO de irAE de 2024, voltar o ano; não a encontrei.
- "Hipofisite: corticoide em dose de estresse": na hipofisite com insuficiência adrenal a reposição é fisiológica (dose de estresse só se crise ou doença aguda); dose alta só com efeito de massa. Não mexi; vale reescrever com a fonte ASCO à mão.

### 3. Outras correções
- MASCC: frase partida por ponto ("…acesso rápido ao serviço. Podem ser tratados…") reunida.
- Frase-aforismo "O oposto da intuição…" incorporada; "A pré-carga é o que sustenta o débito." incorporada com "porque".
- Vírgulas-travessão → parênteses ou ":" (sintomas de hipocalcemia, tecido para biópsia, dexametasona, alcalinização, salina "que corrige").
- Único travessão do lote (1–2 mg/kg) removido.

### 4. Figuras
- Nenhuma.

### 5. Profundidade
Adequada no limite (~1.700 palavras para oito emergências). Lacunas para prova:
1. Critérios de Cairo-Bishop (laboratorial e clínica) da lise tumoral e doses de alopurinol/rasburicase.
2. Dose de dexametasona na compressão medular (10 mg EV + 16 mg/dia) e escala SINS de instabilidade.
3. Hiperviscosidade e leucostase (plasmaférese, leucaférese).
4. Neutropenia febril: CISNE para tumor sólido, G-CSF (não rotina) e quando retirar o cateter.
5. Hiponatremia por SIADH do pequenas células e síndromes paraneoplásicas neurológicas.

## farmacodermias-graves

### 1. Correções clínicas
- Footer com ano e sigla errados. Antes: "British Association of Dermatologists guidelines … SJS/TEN in adults, 2019". Depois: 2016 (Creamer et al., Br J Dermatol 2016, https://pubmed.ncbi.nlm.nih.gov/27287213/; a de 2018/2019 é a pediátrica). Antes: "ASA/AAAAI. Penicillin Allergy Evaluation…, 2022" (ASA não é autora). Depois: "AAAAI/ACAAI. Drug allergy: a 2022 practice parameter update" (Khan et al., J Allergy Clin Immunol 2022).
- DRESS, eosinofilia sem unidade. Antes: "eosinofilia acima de 700 a 1.500". Depois: "a partir de 700/mm³ já pontua no escore RegiSCAR, e 1.500/mm³ ou mais pontua em dobro" (Kardaun et al., Br J Dermatol 2007). RegiSCAR ganhou a referência no footer.
- Mortalidade do DRESS: "quase sempre por falência hepática" → "sobretudo por falência hepática, e também por miocardite".

### 2. Dúvidas não mexidas
- Footer "Sociedade Brasileira de Dermatologia. Consenso sobre reações adversas cutâneas graves a medicamentos, 2020": não encontrei esse consenso nos Anais Brasileiros de Dermatologia. O texto brasileiro de referência que existe é "Reações cutâneas graves adversas a drogas: aspectos relevantes ao diagnóstico e ao tratamento", partes I e II (An Bras Dermatol, https://www.scielo.br/j/abd/a/BxzpyjLKByRTbZ4fR7rtL8w/?lang=pt). Provável fonte inventada; conferir e trocar. O kicker "SBD e RegiSCAR" depende disso.
- "Recomenda-se dosar TSH em 3 e 6 meses" após DRESS: a vigilância tireoidiana é recomendada, mas não achei o calendário "3 e 6 meses" numa diretriz; a autoimunidade pode surgir até 1 a 2 anos depois.
- "Rastrear familiares de primeiro grau quando há associação genética conhecida": não é recomendação padrão de diretriz; o que se recomenda é genotipar HLA antes de prescrever (HLA-B*58:01 para alopurinol, HLA-B*15:02 para carbamazepina) em populações de risco.

### 3. Outras correções
- Frase partida: "duas ou mais mucosas, oral, ocular, genital. Está presente…" → parênteses e frase única.
- Vírgulas-travessão → ":" ou ";" (urticária fugaz, avaliação oftalmológica, registro em prontuário, janela do DRESS); "dor da pele. Ela precede" → ", que precede".

### 4. Figuras
- Nenhuma (tema que ganharia muito com figura: SJS/NET × eritema multiforme, alvo típico × atípico).

### 5. Profundidade
Adequada (~1.800 palavras). Lacunas para prova:
1. Eritema multiforme × SJS (alvo típico × atípico; herpes e micoplasma).
2. Critérios e itens do SCORTEN (7 itens) e do escore RegiSCAR (pontuação para DRESS).
3. Anafilaxia: dose de adrenalina IM (0,01 mg/kg, máx. 0,5 mg) e anafilaxia bifásica.
4. Angioedema por IECA: icatibanto/plasma fresco e diferencial com angioedema hereditário (C4).
5. Algoritmo ALDEN de causalidade e dessensibilização.

---

# Resumo do lote g4a

- Arquivos editados: `leituras/dialise-e-transplante.html`, `diarreia-ma-absorcao.html`, `dii.html`, `emergencias-oncologicas.html`, `farmacodermias-graves.html`. Tags balanceadas, zero travessão, as cinco respondem 200 no servidor local.
- Erros clínicos corrigidos: **18** (diálise 4, diarreia 4, DII 3, emergências oncológicas 4 blocos, farmacodermias 3), mais atualização de footer em todas (5 fontes sem ano ou com ano/sigla errados, 2 fontes provavelmente inexistentes).
- Os 3 mais graves:
  1. Roma IV com "ou" (um critério bastaria) em diarreia-ma-absorcao: a definição exige dois ou mais dos três itens.
  2. Vigilância de câncer colorretal na DII restrita à "doença extensa" em dii: deixava de fora colite esquerda e colite de Crohn.
  3. Hipercalcemia da malignidade em emergencias-oncologicas: "sempre com PTH suprimido" logo após citar PTH ectópico, e posicionamento do denosumabe desatualizado frente à Endocrine Society 2023. Menção honrosa: alvo de hemoglobina em diálise atualizado para KDIGO 2026.
- Fluxogramas refeitos: nenhum (o lote não tem mermaid). Figuras: nenhuma no lote.
- Pendências para o Matheus: fontes brasileiras não localizadas (FBG em diarreia; "SBD 2020" em farmacodermias); NCCN no kicker/dek de emergências sem fonte no footer; confirmar se existe ASCO irAE 2024.
