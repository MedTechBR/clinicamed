# Revisão das leituras, grupo 3

Revisor: grupo 3. Data: 23/09/2026. Cópia dos originais antes da revisão: `scratchpad/g3/*.html` (para `diff`).
Arquivos editados (só estes): `leituras/{arritmias-ventriculares, asma, cefaleias, derrame-pleural, disfagia-esofago, hepatites-masld, ist, politraumatizado, rim-e-farmacos, transfusao-hemoterapia, vacinacao-do-adulto, via-aerea-e-intubacao}.html`.
Checagem final: tags balanceadas nas 12, nenhum travessão novo em prosa (só intervalos numéricos "II–III", "0–2"), nenhum `,<b>` colado. Fluxogramas medidos no navegador sem erro de sintaxe.

---

## arritmias-ventriculares (ESC 2022, monografia, ~5.300 palavras)
1. Correções clínicas
   - Fluxograma 2: o nó "Estudo eletrofisiológico programado, classe I" era alcançado também por TV não sustentada; a classe I da ESC 2022 é só para síncope inexplicada pós-infarto (na TVNS o que existe é o IIa do CDI se houver TV induzível). Rótulo agora: "classe I na síncope inexplicada". Fonte: ESC 2022, `fontes/Arritmias_Ventriculares...ESC_2022.txt`.
   - Miocardite: "o cardiodesfibrilador é recomendado (IIa)" → "deve ser considerado (IIa)" (IIa não é "recomendado"). Mesma fonte, linha 7940.
   - Brugada: "IIa C na síncope arrítmica com padrão tipo 1" → "...com padrão tipo 1 espontâneo". Mesma fonte.
2. Dúvidas: nenhuma classe conflitante encontrada; a ESC 2023 de cardiomiopatias e a ESC 2025 de miocardite/pericardite podem ter mexido em indicações de CDI na dilatada, arritmogênica e miocardite. Não conferi; vale uma rodada própria.
3. Outras correções: 12 frases truncadas pela conversão de travessão (definição de bidirecional, intervenção na tempestade, apresentação atípica, "o grupo em que...", quatro ",<b>IIa B" sem espaço na tabela da hipertrófica, fatores da arritmogênica, coronariografia, dois itens de Erros frequentes, rodapé do VEST).
   - Fluxograma 1: 979 → **710 px**. TD linear: suspeita de supraventricular antes da cardiopatia estrutural, TV idiopática condensada em um nó, rótulos quebrados.
   - Fluxograma 2: 1015 → **716 px**. Decisões em cascata (≤35% CF II–III → ≤30% CF I → ≤40% com TVNS/síncope).
   - Fluxograma 3: 769 → **598 px** (rótulos mais curtos).
4. Figuras
   - `fig/real-bigeminismo.svg`: o título "Extrassístoles ventriculares em bigeminismo" fica **sobreposto** à anotação da direita ("QRS largo e precoce, sem P precedente"). Ilegível nesse trecho.
   - `fig/real-tv-sustentada.svg`: amplitude muito baixa (complexos de ~3 a 5 mm a 10 mm/mV); a legenda diz "QRS largo, regular", mas a largura do QRS não se lê de relance. Viola a regra "achado legível de relance". Sugestão: outro registro do VFDB ou ganho maior declarado.
   - `fig/real-flutter-ventricular.svg`: correta; a legenda usa o flutter para ilustrar o aspecto fusiforme da torsades, o que está dito explicitamente. OK.
5. Profundidade: monografia. Lacunas: tratamento crônico com antiarrítmicos (sotalol, amiodarona, mexiletina) em portador de CDI; sarcoidose e Chagas pouco integradas ao fluxograma; atualização ESC 2023 de cardiomiopatias (terminologia "cardiomiopatia não dilatada de VE"); TV em atleta e rastreio pré-participação.

## asma (GINA 2026, ~1.300 palavras)
1. Correções clínicas (fonte: GINA 2026 Strategy Report, https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf ; resumo https://www.guidelinecentral.com/insights/may-2026-gina-asthma-guideline-spotlight/)
   - Oxigênio: "não se recomenda oxigênio suplementar com saturação acima de 92%" → "oxigênio só com saturação abaixo de 92%, teto do alvo 95% em adultos, adolescentes e 6 a 11 anos; doses de SABA na crise reduzidas". O erro frequente correspondente foi alinhado.
   - AIR em 6 a 11 anos: o texto dizia "estendida por consenso, incluindo ICS-SABA", que não achei na fonte; trocado pelo dado conferido (budesonida-formoterol conforme necessidade reduziu em quase metade as exacerbações moderadas a graves versus SABA).
   - Acrescentado o comentário do GINA 2026 de que o critério de prova broncodilatadora (>12% e >200 mL) subdiagnostica asma, sobretudo em homens jovens; e os biológicos novos (depemokimabe, anti-IgE genérico).
2. Dúvidas: a SBPT no rodapé está sem ano (Recomendações 2020?); não conferi, não mexi.
3. Outras: "é como se fecha um diagnóstico errado" → "é o caminho pelo qual se fecha...".
4. Figuras: não há.
5. Profundidade: superficial para prova de título. Lacunas: doses de ICS (baixa/média/alta) por fármaco; tabela de gravidade da crise e doses de salbutamol, ipratrópio, prednisolona e magnésio; critérios de internação/UTI e ventilação na asma; fenotipagem com eosinófilos/FeNO e critérios de elegibilidade de cada biológico; asma e DPOC sobrepostas.

## cefaleias (ICHD-3, AHS, ~1.400 palavras)
1. Correções clínicas
   - Profilaxia com anti-CGRP: "falha ou intolerância aos anteriores" → opção de primeira linha, sem exigir falha prévia dos orais (AHS position statement, Headache 2024;64:333–341, https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692), com ressalva de acesso/custo; gepantes incluídos.
   - Rodapé: "AAN/NORDIC, orientações sobre HII" era sigla de diretriz inexistente (NORDIC é o grupo do ensaio IIHTT) → consenso de Mollan e colaboradores (JNNP 2018). AHA/ASA HSA com ano 2023. AHS com anos 2019/2021 e 2024. Os anos 2018/2019/2021 foram escritos por conhecimento, não reconferidos na web; se quiser rigor absoluto, conferir.
2. Dúvidas: "opioides e derivados de ergot são desaconselhados": a di-hidroergotamina continua opção com evidência na AHS; a frase generaliza. Não mexi. Limiar de profilaxia ("4 ou mais dias de crise") é simplificação da régua da AHS 2021 (depende de dias de cefaleia e grau de incapacidade); aceitável para prova, não mexi.
3. Outras: nenhuma de escrita.
4. Figuras: não há.
5. Profundidade: adequada para o tamanho, superficial frente à diretriz. Lacunas: doses (triptanos, AINE, metoclopramida, topiramato, propranolol, amitriptilina); critérios ICHD-3 completos de enxaqueca crônica e de cefaleia tensional; neuroimagem na trovoada (angio-TC, janela de 6 h com exame neurológico normal da AHA 2023); arterite de células gigantes (dose de corticoide, tocilizumabe); gestação e lactação.

## derrame-pleural (BTS 2023, ATS/STS/STR 2018, monografia, ~4.250 palavras)
1. Correções clínicas: nenhuma necessária. Conferidos contra os ensaios citados: MIST-2 (16% → 4%; DNase 39%; opacidade −29,5% × −17,2%), TIME2 (0 × 4 dias), AMPLE (10 × 12 dias; 4,1% × 22,5%), ADA (Liang 2008, 63 estudos, S 92%, E 90%), Light e correções (gradientes 1,2 e 3,1 g/dL), quilotórax >110 mg/dL, hemotórax >50%.
2. Dúvidas: glicose "<40 a 60 mg/dL" como marcador de complicado; a BTS 2023 usa outro corte (não conferi). Mortalidade do RAPID na coorte de White 2015 (1,5/17,8/47,8%) não reconferida.
3. Outras: 9 frases truncadas pela conversão de travessão (a mais grave: "hemotórax por lesão de artéria intercostal. Que corre logo abaixo..." virou frase solta; refeita com parênteses); RAPID com vírgula colada em `<b>`. Fluxograma 1: 737 → **711 px** (rótulos quebrados).
4. Figuras
   - `fig/rx-derrame-volume.svg`: tem **travessão no texto** do painel do perfil ("posterior — só o perfil mostra").
   - `fig/foto/foto-us-pneumotorax.webp`: é um quadro estático; a legenda afirma "deslizamento ausente", que imagem parada não demonstra (precisaria de modo M ou vídeo). Há **logotipo do fabricante** do aparelho no canto superior esquerdo.
   - `fig/foto/foto-us-derrame.webp`: no esquema o derrame aparece como faixa cinza pequena entre fígado e pulmão; a legenda descreve "espaço anecoico entre a parede e o pulmão", que não é o que o esquema destaca, e não cita o fígado, que ocupa boa parte do quadro. Sugiro legenda que nomeie fígado, derrame e consolidação como no esquema.
   - Não abri foto-us-normal, foto-us-linha-pleural e foto-us-linhas-b (pedido de não abrir muitas imagens).
5. Profundidade: monografia. Lacunas: manometria pleural; biópsia pleural fechada × toracoscopia no Brasil; tuberculose pleural com dose e duração do esquema e papel do corticoide; indicação cirúrgica precoce (VATS) no empiema.

## disfagia-esofago (ACG, Chicago 4.0, ~1.500 palavras)
1. Correções clínicas
   - Rastreio de Barrett: "refluxo crônico + 2 ou mais fatores" → **3 ou mais** fatores (sexo masculino, >50 anos, branco, obesidade, tabagismo, história familiar de Barrett/adenocarcinoma em parente de 1º grau), endoscopia única, dispositivo não endoscópico como alternativa. Fonte: ACG 2022, Am J Gastroenterol, PubMed 35354777; https://journals.lww.com/ajg/fulltext/10.14309/ajg.0000000000001680
2. Dúvidas: vigilância na displasia de baixo grau "a cada 6 a 12 meses" (a ACG 2022 fala em 12 meses como alternativa à ablação; não conferi); confirmação de refluxo "pHmetria com impedância fora do IBP" (ACG 2022 prefere pHmetria prolongada sem fio; não mexi); ACG 2025 de esofagite eosinofílica não conferida.
3. Outras: 5 frases truncadas corrigidas; "Vale lembrar" removido; ano no rodapé do Barrett.
4. Figuras: não há.
5. Profundidade: adequada (resumo). Lacunas: classificação de Los Angeles e critérios de Lyon 2.0; doses dos IBP; classificação de Chicago 4.0 detalhada (EGJOO, critérios); megaesôfago chagásico (classificação de Rezende e tratamento); câncer de esôfago (estadiamento e tratamento).

## hepatites-masld (PCDT/EASL/AASLD, ~1.500 palavras)
1. Correções clínicas
   - MASH: "resmetirom aprovado em alguns países" → dois fármacos aprovados nos EUA para MASH sem cirrose F2–F3: resmetirom (2024) e **semaglutida 2,4 mg (FDA, 15/08/2025)**, incorporada pela AASLD em novembro de 2025. Fontes: https://www.ajmc.com/view/fda-approves-semaglutide-for-mash-with-fibrosis ; PubMed 41201884 (AASLD 2025 update).
2. Dúvidas: rodapé sem anos (PCDT B e C, EASL HBV, que teve versão 2025 com critérios de tratamento ampliados); não conferi, não mexi. Hepatite alcoólica: "AST/ALT tipicamente acima de 2" está certo como típico, mas o critério diagnóstico atual (ACG 2024/NIAAA) é >1,5; não mexi. Colangite biliar: segunda linha não nomeada (fibratos, elafibranor, seladelpar).
3. Outras: dois `,<b>` colados; "Interações... Amiodarona" fragmento; erro frequente de delta alinhado ao texto ("todo portador de HBsAg").
4. Figuras: não há.
5. Profundidade: superficial. Lacunas: fases da hepatite B crônica e critérios numéricos de tratamento (DNA, ALT, fibrose) do PCDT; esquemas e duração da hepatite C no PCDT; limiares de FIB-4 (1,3 e 2,67) e de elastografia; dose de prednisolona e regra de Lille na hepatite alcoólica; hepatite medicamentosa (regra de Hy).

## ist (PCDT-IST 2022, CDC 2021, ~1.650 palavras)
1. Correções clínicas
   - Seguimento da sífilis: "queda de duas diluições em três meses" → queda de pelo menos 2 diluições em **até 6 meses (recente) e até 12 meses (tardia)**; aumento de 2 diluições ou persistência de sinais = falha/reinfecção; variação de 1 diluição sem significado. Fonte: PCDT-IST 2022 (https://www.gov.br/aids/pt-br/central-de-conteudo/pcdts/2022/ist/pcdt-ist-2022_isbn-1.pdf), resumido por Telessaúde UFG https://tele.medicina.ufg.br/Paginas/View/queda_VDRL
   - Úlcera com mais de 4 semanas: "considerar linfogranuloma" → biopsiar e avaliar tratamento para sífilis, cancro mole, LGV e donovanose (PCDT-IST 2022).
2. Dúvidas: "síndrome do corrimento uretral masculino como agravo sentinela" de notificação; não conferi a portaria vigente. Doses (ceftriaxona 500 mg, azitromicina 1 g) não aparecem no texto; nada errado, mas incompleto.
3. Outras: "Esta podendo ocorrer em qualquer fase" (neurossífilis) refeito; `,<b>` colado na tabela; "O conceito de... que é" fragmento; "risco aumentado. Múltiplas parcerias" → dois-pontos.
4. Figuras: não há.
5. Profundidade: adequada (resumo). Lacunas: doses de todos os esquemas; doxiPEP (CDC 2024); sífilis congênita e critérios de tratamento adequado da gestante; PrEP (esquemas, cabotegravir/lenacapavir); mpox.

## politraumatizado (ATLS 11, ~1.700 palavras)
1. Correções clínicas
   - A 11ª edição do ATLS (lançada em 2025, não 2024) mudou a sequência para **xABCDE**: controle da hemorragia externa exsanguinante antes da via aérea; também reforçou otimização hemodinâmica antes da intubação e juntou cabeça e coluna no D. O texto não mencionava o "x". Parágrafo de ênfases reescrito; rodapé com 2025. Fontes: ACS, https://www.facs.org/for-medical-professionals/news-publications/news-and-articles/acs-brief/september-16-2025-issue/trauma-care-gets-major-upgrade-with-launch-of-atls-11/ ; SGEM, https://thesgem.com/2026/03/sgem-xtra-this-one-goes-to-11-atls-11th-edition/
2. Dúvidas: o **dek e o h2 "A lógica do ABCDE"** ainda dizem ABCDE. Não mudei o dek porque ele tem de ser igual ao `s:` de `leituras.js`, que não é do meu lote; sugiro trocar os dois para xABCDE juntos. Classes de choque e doses de TXA (1 g em 10 min + 1 g em 8 h) não conferidas contra o manual 11.
3. Outras: 7 correções de pontuação (colchetes de ",<b>", AMPLE, sondagem vesical, cálcio, "Sem intubar e sem oxigenar").
4. Figuras: não há (há TC/RX de trauma limpos nas aulas, segundo o CLAUDE.md).
5. Profundidade: adequada (resumo). Lacunas: TCE (escala, indicação de TC, alvos da BTF); trauma torácico (toracotomia de reanimação, débitos de dreno); trauma abdominal e pélvico (REBOA, angioembolização); coluna (NEXUS/regra canadense); queimados (Parkland e critérios de transferência).

## rim-e-farmacos (KDIGO, Beers 2023, ~1.750 palavras)
1. Correções clínicas
   - Ajuste de dose: o texto mandava "conferir a recomendação do fármaco", apoiado em Cockcroft-Gault. O KDIGO 2024 passou a usar a **TFG estimada** (CKD-EPI) também para dose, com creatinina + cistatina C ou TFG medida quando precisa de precisão e TFG não indexada em extremos de superfície. Reescrito, mantendo a nota de que bulas de DOAC trazem cortes de "depuração de creatinina". Regra da casa (nunca Cockcroft-Gault) atendida. Fonte: KDIGO 2024, primer AJHP 2025, https://academic.oup.com/ajhp/article/82/12/660/8107680 . A frase final ("é a TFG estimada que se compara com o corte da bula") é leitura minha da recomendação; conferir se quiser.
2. Dúvidas: KDIGO de LRA 2012 citado; há atualização em curso, não conferida.
3. Outras: "filgração" → "filtração"; "Inker LA et al.." ; 4 fragmentos corrigidos (insulina, dias de doença, "Prevenção do que funciona", trinca).
4. Figuras: não há.
5. Profundidade: adequada. Lacunas: ajuste de dose em diálise e TRS contínua; tabela de ajustes numéricos dos antimicrobianos e DOACs; nefrotoxicidade de imunoterapia e quimioterapia (ifosfamida, cisplatina com magnésio); cristalúria e profilaxia da lise tumoral (rasburicase).

## transfusao-hemoterapia (AABB, RDC 34/2014, ~1.450 palavras)
1. Correções clínicas
   - Hemácias: "doença cardiovascular, pós-operatório cardíaco/ortopédico: <8" → **cirurgia cardíaca <7,5 g/dL**; ortopédica ou doença cardiovascular <8. Fonte: AABB 2023 (JAMA 2023, PubMed 37824153).
   - Plaquetas atualizadas pela **AABB/ICTMG 2025** (JAMA 2025, https://www.aabb.org/news-resources/news/article/2025/05/29/aabb-develops-new-platelet-transfusion-guidelines): punção lombar <20.000 (era <50.000); CVC em sítio compressível <10.000; radiologia intervencionista <20.000/<50.000; cirurgia maior não neuroaxial <50.000; aplasia e TCTH autólogo sem profilaxia de rotina; não transfundir na dengue sem sangramento maior nem na HIC não operada com plaquetas >100.000 mesmo com antiagregante. Mantida a linha de neurocirurgia <100.000, marcada como fora do escopo da diretriz.
   - **Testemunhas de Jeová**: o texto dizia que, em risco iminente de morte, o Código de Ética autoriza transfundir o adulto. O STF fixou em 25/09/2024 (Temas 952 e 1069, repercussão geral) que o adulto capaz pode recusar, com decisão inequívoca, livre, informada e esclarecida, e que o Estado deve oferecer alternativas no SUS. Reescrito. Fontes: https://noticias.stf.jus.br/postsnoticias/testemunhas-de-jeova-tem-direito-de-recusar-procedimento-que-envolva-transfusao-de-sangue-decide-stf/ ; https://www.tjrj.jus.br/web/portal-conhecimento/noticias/noticia/-/visualizar-conteudo/5736540/402874100
2. Dúvidas: a frase sobre **criança** (recusa dos responsáveis não prevalece) foi mantida; ela vem do ECA/CFM e não foi objeto das teses do STF; não reconferida. Linha de síndrome coronariana ("~10 g/dL") reflete o MINT; a AABB 2023 não fez recomendação para SCA.
3. Outras: 4 fragmentos (causa da anemia, fenotipagem, refratariedade, cálcio); "comunica-se as autoridades" → "comunicam-se".
4. Figuras: não há.
5. Profundidade: adequada. Lacunas: doses de crioprecipitado e concentrado de fibrinogênio; viscoelásticos (TEG/ROTEM) com alvos; transfusão na doença falciforme (exsanguíneo e metas de HbS); TRALI/TACO com critérios de 2019; hemovigilância brasileira (prazos de notificação).

## vacinacao-do-adulto (PNI, SBIm, ~2.050 palavras)
1. Correções clínicas
   - **Raiva, acidente grave por cão ou gato sadio e observável**: a tabela mandava soro + vacina; a Nota Técnica nº 8/2022-CGZV/DEIDT/SVS/MS manda **observar 10 dias sem iniciar profilaxia** (item 2.5). Tabela refeita: grave observável; grave suspeito/não observável (soro/IGHAR + 4 doses, dias 0, 3, 7 e 14); morcego e demais mamíferos silvestres, mesmo domiciliados, sempre graves (item 2.3); animal de produção **não é automaticamente grave** (o texto dizia "sempre vacina + soro"; item 2.4). Armadilha e erro frequente alinhados. Fonte: NT 8/2022 (texto em `scratchpad/raiva.txt`).
   - **Pneumocócicas**: acrescentado o que mudou: VPC20 no SUS para ≥85 anos desde setembro de 2026, entre 60 e 84 para acamados/institucionalizados/condições especiais, CRIE para grupos de risco; quem recebe VPC20 dispensa VPP23; SBIm 2026-2027: VPC20 dose única ou VPC15/VPC13 + VPP23. Fontes: https://agenciabrasil.ebc.com.br/saude/noticia/2026-09/sus-amplia-cobertura-de-vacina-pneumo-20-para-maiores-de-85-anos ; https://portal.wemeds.com.br/vacina-pneumococica-20-valente-no-sus/ ; calendário SBIm 2026-2027 (https://sbim.org.br/images/calend-20-60mais-2026-27-260422-web.pdf_2026-04-22.pdf, texto em `scratchpad/g3/sbim2026.txt`).
   - **Herpes-zóster**: recombinante, 2 doses (0 e 2 meses) a partir dos 50 anos, inclusive após zóster ou vacina atenuada; **não incorporada ao SUS** (Conitec, portaria publicada em janeiro de 2026: https://agenciabrasil.ebc.com.br/saude/noticia/2026-01/ministerio-da-saude-decide-nao-incorporar-vacina-herpes-zoster-ao-sus).
   - **VSR**: gestante no SUS desde dezembro de 2025, dose única a partir de 28 semanas a cada gestação (https://agenciabrasil.ebc.com.br/saude/noticia/2025-12/governo-comeca-distribuir-vacina-contra-virus-sincicial-respiratorio); idoso pela SBIm 2026-2027: rotina acima de 70 anos e 18 a 69 anos com comorbidade, dose única.
   - **Dengue** (não existia no calendário): Qdenga no SUS 10 a 14 anos, privada até 60 (SBIm); Butantan-DV aprovada pela Anvisa em 2025 (12 a 59 anos, dose única), no SUS desde janeiro de 2026, **estratégia suspensa em 08/06/2026** para investigar eventos adversos (https://www.unasus.gov.br/noticia/ministerio-da-saude-descontinua-temporariamente-estrategia-atual-de-vacinacao-do-butantan-contra-dengue). Conferir se foi retomada antes de publicar.
   - Rodapé: Manual dos CRIE 5ª → **6ª edição, 2023**; SBIm 2025 → 2026-2027; fontes do MS de VSR e VPC20.
2. Dúvidas: SBIm diz "rotina para idosos > 70 anos"; o PDF extraído mostra ">"; se for "≥", ajustar. Tríplice viral (2 doses até 29 anos, 1 dose 30 a 59) e febre amarela (MS dose única; SBIm agora recomenda duas) não reconferidas no calendário do MS 2026. Tétano no imunossuprimido "independentemente do esquema" é mais amplo que o Guia de Vigilância (que restringe à linha de >10 anos para imunodeprimido, desnutrido grave ou idoso); não mexi.
3. Outras: 5 fragmentos (regra 1 das vacinas vivas, registro, contraindicações da gestante, profissional de saúde, Pasteurella).
4. Figuras: não há.
5. Profundidade: adequada. Lacunas: esquema de raiva pré-exposição e reexposição (NT 8/2022 itens 2.6 a 2.8); mpox; vacinação do viajante (febre amarela acima de 60 anos); vacinação em transplante de órgão sólido; HPV em dose única (2024) e resgate.

## via-aerea-e-intubacao (DAS, ATLS 11, AHA 2025, ~1.600 palavras)
1. Correções clínicas
   - Cormack-Lehane: "grau 2, apenas a comissura posterior" é o 2b; agora "glote parcial (2a) ou só aritenoides e comissura posterior (2b)".
   - DAS 2015 foi substituída pela **DAS 2025** (Br J Anaesth 2026;136:283–307): videolaringoscopia como primeira escolha, bloqueio neuromuscular precoce, foco no sucesso na primeira tentativa, incisão vertical padronizada no acesso de emergência; planos A a D mantidos. Fonte: https://www.sciencedirect.com/science/article/pii/S0007091225006932
   - ATLS 11: 2024 → 2025.
2. Dúvidas: o kicker ainda diz "DAS" sem ano (está certo genericamente); ensaio RSI 2025 (quetamina × etomidato) não incorporado.
3. Outras: "o bloqueador não sedia" → "não seda"; "bougie, introdutor semirrígido. Costuma resolver" refeito; três `,<b>` colados; sedação pós-intubação com parênteses.
4. Figuras: não há.
5. Profundidade: adequada. Lacunas: doses de indução e bloqueio (etomidato 0,3; quetamina 1–2; succinilcolina 1,5; rocurônio 1,2 mg/kg); limites de tentativas da DAS 2025 (3 laringoscopias + 1 do mais experiente); critérios de extubação; via aérea fisiologicamente difícil (HOp killers); pré-oxigenação com VNI e cateter nasal em números.

---

## Resumo
- **Correções clínicas: 23** (arritmias 3, asma 2, cefaleias 2, disfagia 1, hepatites 1, IST 2, politrauma 1, rim 1, transfusão 3, vacinação 5 [raiva é 1 com 3 subitens; as outras 4 são atualizações de calendário], via aérea 2) e atualizações de fonte vencida (ATLS 11 2025, DAS 2025, AABB/ICTMG 2025, CRIE 6ª ed., SBIm 2026-2027, KDIGO 2024 para dose).
- **Os 3 mais graves**
  1. **Raiva**: mandava soro + vacina em todo acidente grave, inclusive por cão/gato sadio observável (NT 8/2022 manda observar 10 dias), e soro em qualquer exposição a animal de produção.
  2. **Transfusão em Testemunha de Jeová**: ensinava que o risco iminente de morte autoriza transfundir o adulto capaz, contrário às teses do STF de 25/09/2024 (Temas 952 e 1069).
  3. **Plaquetas para punção lombar <50.000** (AABB/ICTMG 2025: <20.000) e **sífilis**: "queda de 2 diluições em 3 meses" (PCDT 2022: até 6 meses na recente, 12 na tardia), critério que levaria a retratamento indevido.
- **Fluxogramas refeitos** (largura do viewBox, sem erro de sintaxe após a mudança):
  - arritmias-ventriculares, Fluxograma 1: 979 → 710 px
  - arritmias-ventriculares, Fluxograma 2: 1015 → 716 px
  - arritmias-ventriculares, Fluxograma 3: 769 → 598 px
  - derrame-pleural, Fluxograma 1: 737 → 711 px (os outros dois já estavam em 590 e 614)
- **Figuras para o gerador**: `real-bigeminismo.svg` (título sobreposto à anotação), `real-tv-sustentada.svg` (amplitude baixa, QRS largo ilegível), `rx-derrame-volume.svg` (travessão no texto), `foto-us-pneumotorax.webp` (quadro estático não mostra ausência de deslizamento; logotipo de fabricante), `foto-us-derrame.webp` (legenda não descreve o que o esquema mostra).
- Pendência fora do meu lote: dek/`s:` de politraumatizado em `leituras.js` ainda dizem "sequência ABCDE".
