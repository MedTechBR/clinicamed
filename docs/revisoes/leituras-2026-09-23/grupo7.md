# Revisão das leituras, grupo 7

Lote: anemias, bradiarritmias-e-marcapasso, cirrose, cristais-espondilo, doencas-neuromusculares, etica-medica, febre-origem-indeterminada, glomerulopatias, hipertensao, lupus-vasculites, rim-nas-doencas-sistemicas, sindromes-geriatricas.
Só os 12 `leituras/<slug>.html` foram editados. Sem commit. Balanço de tags conferido nos 12 arquivos; nenhum travessão em prosa restante (os que sobraram são faixas numéricas, páginas de referência e uma célula vazia de tabela).
**Pendência para o coordenador:** hipertensao passou de 3 para 4 fluxogramas e bradiarritmias de 2 para 3. Rodar `python3 gera_indice.py` (contagem no cartão).
Observação: o servidor 8711 caiu durante a revisão e foi reiniciado (`python3 servir.py`, log em scratchpad/revisao/servir.log). As larguras dos mermaid foram medidas com Chrome headless (`--dump-dom`, script `scratchpad/revisao/mede_g7.sh`), porque o painel do navegador bateu no limite de abas.

---

## anemias
1. **Correções clínicas**
   - DRC e ferro: "na doença renal crônica os critérios são ainda mais amplos (saturação até 30% com ferritina até 500)" → separado em DRC fora da diálise (ferritina < 100, ou 100 a 299 com saturação < 25%) e hemodiálise (saturação ≤ 30%, ferritina ≤ 500). Fonte: KDIGO 2026 Anemia in CKD, https://kdigo.org/wp-content/uploads/2026/01/KDIGO-2026-Anemia-in-CKD-Guideline.pdf (resumo: http://www.nephjc.com/news/kdigo-anemia).
   - AEE: "alvo restrito de hemoglobina (em torno de 10 a 11,5 g/dL)" → "em diálise, iniciar com Hb entre 9 e 10 e não manter acima de 11,5 g/dL (KDIGO 2026)". Mesma fonte.
   - Transfusão: "Limiares um pouco maiores, em torno de 8 g/dL, são usados em síndrome coronariana aguda e no pós-operatório cardíaco" → AABB 2023 (7,5 na cirurgia cardíaca; 8 na ortopédica e na doença cardiovascular prévia) + infarto com anemia sem sangramento: manter Hb em 10 g/dL (ACC/AHA 2025 de SCA, classe 2b, depois do MINT). Fontes: Carson, JAMA 2023, https://pubmed.ncbi.nlm.nih.gov/37824153/ ; https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309
2. **Dúvidas:** ferritina < 30 "confirma" (BSG 2021 e AGA 2020 usam 45 ng/mL como limiar de investigação); BSG sem ano no rodapé. Não mexido.
3. **Outras:** frase truncada "A estratégia restritiva. Transfundir com..., é equivalente" reescrita; vírgulas-emenda (PTT e plaquetas, G6PD, falciforme); rodapé com KDIGO 2026, AABB 2023 e ACC/AHA 2025 referenciados.
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.830 palavras). Lacunas: eltrombopague na aplasia; caplacizumabe na PTT; HPN (eculizumabe/ravulizumabe); esferocitose; IPSS-R/M na SMD e doses de ferro oral/EV.

## bradiarritmias-e-marcapasso
1. **Correções clínicas**
   - Atropina: mantida a transcrição da Tabela 8 (0,5 a 1 mg) e acrescentado que o algoritmo AHA 2025 padroniza **1 mg a cada 3 a 5 min, até 3 mg**; o Fluxograma 1 passou a 1 mg. Fontes: https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Bradycardia-250514.pdf ; AHA 2025 Part 9 no rodapé.
   - Lógica do Fluxograma 1: a pergunta "QRS largo, infranodal ou transplantado?" vinha depois da atropina e os dois ramos iam para o mesmo nó (decisão sem efeito, contrária ao texto, em que atropina no transplantado é III-Dano). Agora a triagem vem antes: se sim, pula a atropina.
   - Conferidos na fonte local (ACC/AHA/HRS 2018) sem divergência: critérios de BRD, BRE e hemibloqueios, HV ≥ 70 ms, distrofia miotônica (I, B-NR), 46,7%.
2. **Dúvidas:** nenhuma clínica.
3. **Outras:** "carditis" (inglês) → "cardite" (2x); cerca de 40 vírgulas-emenda, parentéticos e fragmentos (legendas das Figuras 1, 3 e 4, questões-âncora, Erros frequentes, Perguntas).
   - **Fluxograma 2:** 1.120 → 619 px. Dividido em Fluxograma 2 ("do bloqueio à indicação") e novo Fluxograma 3 ("escolha do modo", 539 px). A saída de 3 ramos da "causa reversível" virou binária, com a nota IIa num nó tracejado.
   - **Fluxograma 1:** 695 → 642 px.
4. **Figuras:**
   - `fig/real-mobitz1.svg`: o título "Bloqueio AV de segundo grau, Mobitz I" sobrepõe o rótulo da direita ("laudo: bloqueio de 2º grau tipo Wenckebach"). Traçado ruidoso: as P e o alargamento do PR que a legenda manda procurar quase não se veem.
   - `fig/real-bavt.svg` (V5): as P dissociadas são pouco visíveis e o QRS do escape parece estreito ou limítrofe (cerca de 120 ms), mas legenda e rótulo dizem "escape ventricular", QRS largo. Sugiro II/V1 ou outro registro.
   - `fig/real-bav1.svg`: correto (PR cerca de 280 ms); rótulo "todo P conduz" → "toda P conduz".
   - `fig/real-bav-2para1.svg`: correto; o ganho de 5 mm/mV não é avisado na legenda da leitura.
5. **Profundidade:** monografia (5.245 palavras). Lacunas: estimulação do sistema de condução (consenso HRS 2023, ramo esquerdo); ESC 2021 como contraponto; marca-passo sem eletrodo; Chagas com mais peso (BAVT no Brasil); complicações do marca-passo e ressonância.

## cirrose
1. **Correções clínicas**
   - TIPS preemptivo estava dentro de "falha do controle" e sem critérios → item próprio com os critérios do Baveno VII: Child C < 14 ou Child B > 7 com sangramento ativo; em até 72 h, idealmente 24 h. O resgate ficou separado (TIPS de resgate; balão ou prótese esofágica como ponte). Fonte: Baveno VII, J Hepatol 2022, https://www.journal-of-hepatology.eu/article/S0168-8278(21)02299-6/fulltext
   - Regra dos 5: "<15 kPa e >150.000" → "≤15 e ≥150.000", como no Baveno VII. O "≥25" ganhou a ressalva de etiologia. "Também compatível" → "risco de pelo menos 60%".
   - Vasoativo "até cinco dias" → "dois a cinco dias".
2. **Dúvida grave (não mexida):** o **Baveno VIII** saiu em 19/08/2026 (J Hepatol, doi 10.1016/j.jhep.2026.07.030; https://pubmed.ncbi.nlm.nih.gov/42624290/). O texto integral deu 403 em todas as vias. Os trechos indexados sugerem mudanças: LSM < 10 kPa descarta; LSM < 15 com baço < 25 kPa descarta; limiar transfusional; critérios de recompensação. A leitura segue Baveno VII e precisa ser conferida no PDF. Também não conferi se o EASL 2018 de cirrose descompensada ainda é o vigente.
3. **Outras:** vírgulas-emenda em 4 pontos (SHR, terlipressina, rastreio de CHC, PBE).
4. **Figuras:** não há.
5. **Profundidade:** superficial (1.159 palavras). Lacunas: ACLF e escores MELD/Child; hiponatremia; síndromes hepatopulmonar e portopulmonar; trombose de veia porta; dose e metas do BBNS/carvedilol; recompensação.

## cristais-espondilo
1. **Correções clínicas**
   - Tabela de indicação de hipouricemiante: "nefrolitíase ou DRC moderada a grave" aparecia como indicação plena → recomendação **condicional** na primeira crise (DRC ≥ 3, urato > 9 ou litíase). Fonte: ACR 2020, https://acrjournals.onlinelibrary.wiley.com/doi/10.1002/acr.24180
   - HLA-B*58:01 não citava afro-americanos (ACR 2020, condicional).
   - "Losartana e fenofibrato ... escolhas racionais" → o ACR 2020 recomenda **não** trocar nem acrescentar fenofibrato; losartana é a preferida e sugere-se trocar a HCTZ. Fonte: https://www.healio.com/clinical-guidance/gout/2020-american-college-of-rheumatology-guidelines-for-the-management-of-gout-treatment-guidelines
   - Espondiloartrite axial: "dois AINEs em 4 semanas cada" → "4 semanas no total"; acrescentado inibidor de JAK, também na pergunta de revisão. Fonte: ASAS-EULAR 2022, https://ard.eular.org/article/S0003-4967(24)08620-5/fulltext
   - Osteoartrite: "com recomendação forte são não farmacológicas" (o AINE oral também é forte; paracetamol só condicional; glucosamina e condroitina com recomendação forte contra). Fonte: ACR/AF 2019, https://pubmed.ncbi.nlm.nih.gov/31908149/
   - Corticoide "oral, intra-articular ou sistêmico" → "oral, intramuscular ou intra-articular". EULAR gota "atualização 2020" → 2016 (Richette, ARD 2017; conferido).
2. **Dúvidas:** alvo < 5 mg/dL na doença tofosa é do EULAR 2016, não do ACR 2020 (o texto não atribui). Não mexido.
3. **Outras:** vírgulas-emenda (4); "Padrões variados. Oligoarticular" → dois-pontos.
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.561 palavras). Lacunas: critérios ACR/EULAR 2015 (gota) e ASAS; dose e interações da colchicina; febuxostate e CARES; CASPAR; artrite gonocócica.

## doencas-neuromusculares
1. **Correções clínicas:** nenhum erro clínico. Rodapé "AAN/EFNS" desatualizado → EAN/PNS 2023 (Guillain-Barré, https://pubmed.ncbi.nlm.nih.gov/37814552/) e EAN/PNS 2021 (PDIC).
2. **Dúvidas:** nenhuma.
3. **Outras:** 3 espaços faltando antes de parêntese ou negrito ("pós-infecciosa,<i>", "crônica,<b>", "suporte,<b>"); 8 vírgulas-emenda; "Esta assimétrica" → "Esta é assimétrica".
4. **Figuras:** não há.
5. **Profundidade:** adequada, no limite de superficial (1.705 palavras). Lacunas: variantes de GBS e EGRIS/mEGOS; MGFA e terapias novas (efgartigimode, eculizumabe, zilucoplan); tofersen na ELA-SOD1; critérios de Gold Coast; paralisia periódica tireotóxica.

## etica-medica
1. **Correções clínicas e legais**
   - "é vedado ... a divulgação de imagens de 'antes e depois'" → permitido com caráter educativo e condições desde a Res. CFM 2.336/2023 (vigência em 11/03/2024). Fontes: https://portal.cfm.org.br/noticias/resolucao-libera-fotos-como-antes-e-depois/ ; https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf
   - Recusa de transfusão na emergência: acrescentados a Res. CFM 2.232/2019, art. 11 (https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2019/2232_2019.pdf), e o STF de 25/09/2024, Temas 952 e 1069 (https://noticias.stf.jus.br/postsnoticias/testemunhas-de-jeova-tem-direito-de-recusar-procedimento-que-envolva-transfusao-de-sangue-decide-stf/). Rodapé atualizado.
2. **Dúvidas:** quem preenche a DO na morte natural sem assistência onde não há SVO não é abordado. Não mexido.
3. **Outras:** fragmento na DO ("A doença que iniciou a sequência.") ligado à frase; 6 vírgulas-emenda e parentéticos; espaço faltando em "alternativas,<b>".
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.623 palavras). Lacunas: telemedicina (Res. CFM 2.314/2022); morte encefálica e doação; objeção de consciência; prontuário eletrônico e LGPD (Lei 13.787/2018); responsabilidade civil e penal.

## febre-origem-indeterminada
1. **Correções clínicas**
   - Clindamicina "retirada por hepatotoxicidade e risco de C. difficile" → o motivo é a colite por C. difficile; claritromicina entrou na lista para alérgicos. ESC 2023 / AHA 2021.
   - Alto risco para profilaxia: faltavam prótese transcateter e dispositivo de assistência ventricular (ESC 2023). A "valvulopatia em coração transplantado" foi atribuída à AHA. Pergunta de revisão alinhada. Fonte: https://www.acc.org/Latest-in-Cardiology/ten-points-to-remember/2023/08/29/20/49/2023-esc-guidelines-for-endocarditis-esc-2023
   - O texto dava a via endovenosa como absoluta, contra a ESC 2023. Acrescentado o tratamento oral parcial (IIa: ≥ 10 dias EV, 7 após cirurgia, paciente estável, ETE sem complicação). Fonte: https://academic.oup.com/eurheartj/article/44/39/3948/7243107
2. **Dúvidas:** nenhuma.
3. **Outras:** fragmento em Erros frequentes (TB extrapulmonar); célula "colonoscopia, neoplasia" reescrita; pontuação em 2 respostas.
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.507 palavras). Lacunas: Duke-ESC 2023 listado (maiores e menores); esquemas por agente; endocardite de dispositivo; anticoagulação e AVC na endocardite; FOI no HIV e na neutropenia.

## glomerulopatias
1. **Correções clínicas**
   - Nefropatia por IgA: "imunossupressão em proteinúria persistente apesar de terapia otimizada" → KDIGO 2025: meta < 0,5 g/dia (ideal < 0,3) e estratégia dupla. De um lado, IECA/BRA ou sparsentana com iSGLT2; do outro, budesonida de liberação entérica por 9 meses se ≥ 0,5 g/dia, ou corticoide sistêmico na falta dela. Fonte: https://kdigo.org/wp-content/uploads/2024/08/KDIGO-2025-IgAN-IgAV-Guideline.pdf
   - Plasmaférese na vasculite ANCA: "Hemorragia alveolar grave, creatinina muito elevada" (fragmento vago) → KDIGO 2024: Cr > 3,4 mg/dL, diálise ou Cr subindo rápido, hemorragia alveolar com hipoxemia. Fonte: https://kdigo.org/wp-content/uploads/2024/02/KDIGO-2024-ANCA-Vasculitis-Guideline.pdf
   - Biópsia na nefrite lúpica "acima de 0,5" → "0,5 ou mais" (KDIGO 2024 LN). Estatina "indicada" → "conforme o risco CV". Na GESF, acrescentada a forma genética.
2. **Dúvidas:** "C3 normaliza em 8 a 12 semanas" na pós-infecciosa (a maioria das fontes cita 6 a 8; persistência além de 12 sugere glomerulopatia por C3). Não mexido.
3. **Outras:** 2 fragmentos ("Define a classe", parêntese quebrado nos rins pequenos); espaço em "tipo III,<b>"; cerca de 12 vírgulas-emenda em listas.
4. **Figuras:** não há.
5. **Profundidade:** adequada, no limite de superficial (1.428 palavras). Lacunas: glomerulopatia por C3 e GNMP; esquemas da membranosa por risco; anti-nefrina na lesão mínima; corticoide na GESF primária; anti-MBG completo.

## hipertensao
Conferida contra `fontes/Hipertensão_Arterial_-_Diretriz_Brasileira_SBC-SBH-SBN_2025.txt`.
1. **Correções clínicas e de coerência**
   - Figura 2: a legenda dizia Sokolow-Lyon "≥ 35 mm" e a tabela "> 35 mm". A fonte (Quadro 4.4) diz "> 35 mm", e a legenda foi corrigida; a frase parentética quebrada dela também foi reescrita.
   - Gestação: acrescentado o betabloqueador, exceto atenolol, como alternativa de primeira linha, como na fonte ("metildopa, nifedipina de ação prolongada ou amlodipina, ou BB – exceto atenolol").
   - Conferidos sem divergência: Quadros 3.4, 4.4 e 4.6, doses EV da crise, alvos por cenário, gestação, aleitamento (Quadro 10.3), feocromocitoma, prevalências de HAR.
2. **Dúvida:** a nitroglicerina aparece como "5–15 mg/h" no quadro de fármacos EV da própria SBC 2025 (transcrita fielmente). Essa é a faixa da nicardipina; a NTG usual é de 5 a 200 µg/min. Conferir com o Matheus. Não mexido.
3. **Outras:** cerca de 30 correções de escrita: fragmentos ("Que é o que define...", "A etapa que mais se pula", "A inversão do reflexo...", "Período em que...", "Exatamente o que a nifedipina...", "Exceto na DRC"), espaços antes de `<b>`, parentéticos com vírgula.
   - **Fluxograma 1:** 932 → 656 px. Os 4 fenótipos passaram a sair de uma decisão binária dupla, com rótulos quebrados.
   - **Fluxograma 3:** 2.237 → 511 px. Dividido em Fluxograma 3 ("triagem no PS") e novo **Fluxograma 4** ("alvo por órgão", 468 px), em pares órgão → alvo empilhados (LR).
   - Mermaid validado sem erro.
4. **Figuras:**
   - `fig/real-hve.svg`: a legenda e o rótulo "padrão de strain" descrevem infra de ST com T negativa em V5, V6, DI e aVL. No traçado, as T de V5 e V6 parecem positivas e aVL é quase isoelétrica. O strain não aparece; só a voltagem.
   - Figuras 1 e 3 (SVG inline): usam `font-family: Figtree`, fonte aposentada. A Figura 3 se chama "Octeto do tratamento" e o aria-label diz "Pirâmide". Não mexido.
5. **Profundidade:** monografia (5.553 palavras). Lacunas: números do rastreio de hiperaldosteronismo (relação aldosterona/renina) e da apneia; denervação renal; HA no dialítico.

## lupus-vasculites
1. **Correções clínicas**
   - Nefrite classe III/IV: "corticoide + micofenolato ou ciclofosfamida; esquemas atuais associam belimumabe ou voclosporina" → a EULAR 2025 prefere a terapia combinada: MMF ou CYC em dose baixa + belimumabe; MMF + inibidor de calcineurina (voclosporina ou tacrolimo); MMF + obinutuzumabe. Fonte: https://pubmed.ncbi.nlm.nih.gov/41107121/ ; https://rheumnow.com/news/2025-update-eular-recommendations-lupus-nephritis
   - Classe V: "imunossupressão se nefrótica" → "nefrótica ou > 1 g/24 h apesar do bloqueio do SRA". Fonte: EULAR/ERA-EDTA 2019, https://pubmed.ncbi.nlm.nih.gov/32220834/
   - Vasculite ANCA: "plasmaférese ... hemorragia alveolar grave ou creatinina muito elevada; manutenção 18 a 24 meses" → Cr > 3,4 mg/dL (300 µmol/L). A EULAR 2022 não recomenda plasmaférese de rotina na hemorragia alveolar; o KDIGO 2024 a admite com hipoxemia. Manutenção preferencial com rituximabe, por 24 a 48 meses. Fonte: https://pubmed.ncbi.nlm.nih.gov/36927642/
   - Biópsia "acima de 0,5" → "0,5 ou mais". Rodapé com EULAR 2025, KDIGO 2024 LN e KDIGO 2024 AAV.
2. **Dúvidas:** para portador assintomático de aPL de alto risco, a EULAR 2019 recomenda AAS; o texto diz "considerar". Não mexido.
3. **Outras:** parêntese aninhado quebrado no rastreio da HCQ; fragmentos (rash malar, pergunta 3); vírgulas-emenda.
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.746 palavras). Lacunas: critérios ACR/EULAR 2023 de SAF; doses de corticoide na indução; PAN e hepatite B; ultrassom e critérios 2022 na ACG; lúpus neuropsiquiátrico.

## rim-nas-doencas-sistemicas
1. **Correções clínicas**
   - A nefropatia por IgA aparecia em "Outras hereditárias", como se fosse hereditária. Agora o texto explicita que não é, entra como diferencial da hematúria e segue o KDIGO 2025.
   - Policística → KDIGO 2025 ADPKD. Tolvaptana com TFGe ≥ 25 e Mayo 1C a 1E ou queda ≥ 3/ano. Rastreio de aneurisma recomendado com HSA prévia ou história familiar de aneurisma, HSA ou morte súbita; em ocupação de risco e no pré-operatório, "considerar". Pergunta alinhada; rodapé passou de "Controversies Conference" para o KDIGO 2025. Fonte: https://kdigo.org/wp-content/uploads/2025/01/KDIGO-2025-ADPKD-Guideline.pdf
   - Nefrite lúpica: biópsia "0,5 ou mais"; indução com obinutuzumabe ou inibidor de calcineurina (EULAR 2025).
   - "Principal causa de DRC terminal no país" (diabetes) → "uma das duas principais, ao lado da hipertensão".
2. **Dúvidas:** (1) "Hematúria familiar benigna (membrana basal fina)": a nomenclatura atual trata boa parte dos casos como Alport autossômico heterozigótico, com risco de progressão. Não conferi; não mexido. (2) Censo SBN mais recente para a causa nº 1 de DRC dialítica não conferido.
3. **Outras:** 4 fragmentos ("Artrite reumatoide, ...", "Incluindo profilaxia", "Lembrando que"); 5 parentéticos.
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.865 palavras). Lacunas: rim do mieloma (dexametasona precoce, SLiM-CRAB); MGRS; ATTR (tafamidis) e AL (dara-CyBorD); HIVAN, hepatites e falciforme; crise renal esclerodérmica (IECA).

## sindromes-geriatricas
1. **Correções clínicas**
   - "no frágil, glicada entre 8 e 8,5% é aceitável" (meta antiga) → ADA 2026: < 7,0 a 7,5% no saudável; < 8,0% no frágil ou com limitação; na saúde muito comprometida, não perseguir meta de HbA1c e evitar hipoglicemia e hiperglicemia sintomática. Fonte: https://diabetesjournals.org/care/article/49/Supplement_1/S277/163921/13-Older-Adults-Standards-of-Care-in-Diabetes-2026. O < 8,0 e o "avoid reliance" foram conferidos por busca; a faixa de 7,0 a 7,5 vem da tabela 13.1 das edições 2024-2025, que não consegui reabrir na de 2026.
   - Quedas: a avaliação multifatorial era indicada também por "alteração da marcha e do equilíbrio". Pelo World Falls Guidelines 2022, alto risco é queda com lesão, ≥ 2 quedas no ano, fragilidade, não conseguir se levantar do chão ou suspeita de perda de consciência. Instabilidade isolada é risco intermediário e vai para exercício. Fonte: https://academic.oup.com/ageing/article/51/9/afac205/6730755
   - Cascata de prescrição: "Anti-hipertensivo para o edema da anlodipina" → "diurético", coerente com a pergunta de revisão.
2. **Dúvidas:** nenhuma além da nota da ADA.
3. **Outras:** 8 vírgulas-emenda e fragmentos (Fried, STOPP/START, fármacos do delirium, perda de peso, perguntas 2 e 5).
4. **Figuras:** não há.
5. **Profundidade:** adequada (1.592 palavras). Lacunas: CAM/4AT; itens específicos de Beers 2023; demência × delirium × depressão; disfagia; hipotensão ortostática.

---

## Resumo
- **Erros clínicos e de atualidade corrigidos:** 36 itens, com fonte conferida. Contagem: anemias 3, bradi 2, cirrose 3, cristais 6, neuromusculares 1 (fonte), ética 2, FOI 3, glomerulopatias 3, hipertensão 2, lúpus 4, rim 4, geriatria 3, somando os ajustes de coerência número a número.
- **Os 3 mais graves:**
  1. **Ética:** a leitura dizia que imagens de "antes e depois" são vedadas. A Res. CFM 2.336/2023 as permite com condições desde março de 2024. Era erro legal atual e questão de prova certa.
  2. **Bradiarritmias, Fluxograma 1:** a triagem "QRS largo, infranodal ou transplantado" vinha depois da atropina e não mudava a conduta. Contradizia o III-Dano da atropina no transplantado e a parcimônia no infranodal. Junto veio a atualização para atropina 1 mg (AHA 2025).
  3. **Anemias:** o alvo transfusional de 8 g/dL "na síndrome coronariana aguda" estava desatualizado; depois do MINT, a ACC/AHA 2025 aceita manter 10 g/dL no infarto com anemia. Menção honrosa: a gota tratava como indicação plena o que é condicional, e sugeria o fenofibrato, contra o ACR 2020.
- **Pendência crítica:** Baveno VIII (agosto de 2026) já substitui o Baveno VII usado em cirrose. Não consegui acessar o texto; precisa de conferência no PDF.
- **Fluxogramas refeitos (largura do viewBox, antes → depois):**
  - hipertensao F1: 932 → 656 px.
  - hipertensao F3: 2.237 → 511 px, com o novo F4 de 468 px.
  - bradiarritmias F2: 1.120 → 619 px, com o novo F3 de 539 px.
  - bradiarritmias F1: 695 → 642 px (lógica corrigida).
  - Todos desenham sem erro de sintaxe (medido por Chrome headless).
- **Figuras com defeito (para o gerador):** `real-mobitz1.svg` (título sobreposto; P e PR ilegíveis), `real-bavt.svg` (escape que não parece largo), `real-hve.svg` (strain descrito e não visível), `real-bav1.svg` ("todo P" → "toda P"). SVGs inline de hipertensao usam Figtree.
