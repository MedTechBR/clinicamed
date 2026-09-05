/* ClínicaMed — taxonomia do conteúdo.

   Fonte primária: Edital SBCM/AMB nº 2473 (TECM 2026), item 15 "Conteúdo programático"
   e item 9.6, que define as TRÊS matrizes da prova teórica. O PDF está em
   docs/edital-2473-tecm-2026.pdf — conferir ali antes de mexer em qualquer nome.

   `area`   = seção do conteúdo programático (o filtro principal do app)
   `matriz` = a especialidade correspondente na Matriz de Especialidades do item 9.6
   `peso`   = incidência esperada numa prova de 120 questões (a soma é exatamente 120).
              É ESTIMATIVA calibrada pelo tamanho da seção no edital; ajustar quando
              houver prova real mapeada, como foi feito no app de farmácia (incidencia.js).
   `sub`    = subtemas literais do edital, usados no filtro fino e no índice das leituras. */

window.TAXONOMIA=[
{"id":"cardio","nome":"Cardiologia","matriz":"Cardiologia","peso":15,"sub":[
 "Parada cardiorrespiratória","Síndrome coronária aguda","Síndrome coronária crônica",
 "Cardio-oncologia","Cardiomiopatias","Doença de Chagas","Fibrilação atrial",
 "Hipertensão arterial","Insuficiência cardíaca","Dislipidemias","Prevenção da aterosclerose",
 "Checkup e avaliação perioperatória","Miocardite e pericardite","Valvopatias"]},

{"id":"emergencias","nome":"Emergências e terapia intensiva","matriz":"Clínica Geral","peso":13,"sub":[
 "Insuficiência respiratória aguda","Sepse","Abordagem inicial do paciente instável",
 "Paciente politraumatizado","Emergências em nefrologia","Emergências em neurologia",
 "Emergências em cardiologia"]},

{"id":"infecto","nome":"Infectologia","matriz":"Infectologia","peso":11,"sub":[
 "Infecções bacterianas","Infecções virais","Infecções fúngicas","Infecções parasitárias",
 "Uso racional de antimicrobianos","Infecções relacionadas a dispositivos",
 "Controle de infecção hospitalar","Vacinas e imunizações","Infecções em populações especiais"]},

{"id":"pneumo","nome":"Pneumologia","matriz":"Pneumologia","peso":9,"sub":[
 "Asma","DPOC","Fibrose pulmonar","Embolia pulmonar","Hipertensão pulmonar",
 "Câncer de pulmão: rastreamento e diagnóstico"]},

{"id":"gastro","nome":"Gastroenterologia e hepatologia","matriz":"Gastroenterologia","peso":9,"sub":[
 "DRGE e dispepsia funcional","Hepatites virais B e C","Esteatose hepática (MASLD)",
 "Cirrose e suas complicações","Marcadores laboratoriais hepáticos",
 "Doenças inflamatórias intestinais","Síndromes diarreicas e SII (Roma IV)",
 "Hemorragia digestiva alta e baixa","Câncer colorretal e rastreamento"]},

{"id":"endocrino","nome":"Endocrinologia e metabologia","matriz":"Endocrinologia","peso":8,"sub":[
 "Diabetes tipo 2: diagnóstico (SBD 2024)","Risco cardiovascular no diabetes",
 "Fisiopatologia e classificação da obesidade","Tirzepatida e incretinomiméticos",
 "Síndrome metabólica (critérios IDF)","Tireoide","Emergências endócrinas"]},

{"id":"nefro","nome":"Nefrologia e distúrbios hidroeletrolíticos","matriz":"Nefrologia","peso":9,"sub":[
 "Doença renal crônica","Glomerulopatias","Nefropatia diabética",
 "Distúrbios ácido-básicos","Distúrbios hidroeletrolíticos","Hipertensão secundária",
 "Injúria renal aguda"]},

{"id":"neuro","nome":"Neurologia","matriz":"Neurologia","peso":9,"sub":[
 "Epilepsia","Distúrbios do sono nas demências","Punção lombar",
 "AVC e diagnóstico diferencial","Síndromes demenciais","Cefaleias","Coma de origem central"]},

{"id":"sus","nome":"SUS, ética e clínica geral","matriz":"Clínica Geral","peso":8,"sub":[
 "Política Nacional de Saúde","Epidemiologia e vigilância em saúde","Saúde da família e APS",
 "Atenção às condições crônicas","Saúde da mulher e da criança","Doenças infecciosas no SUS",
 "Atenção à urgência e emergência","Medicamentos e protocolos clínicos",
 "Políticas de promoção da saúde","Aspectos éticos e legais","Saúde mental na APS","DCNT"]},

{"id":"hemato","nome":"Hematologia","matriz":"Hematologia/Oncologia","peso":6,"sub":[
 "Mielofibrose","Anemia falciforme","Doença de von Willebrand","Hemofilia",
 "Mieloma múltiplo","LLC e LMC","Anemias carenciais"]},

{"id":"reumato","nome":"Reumatologia","matriz":"Reumatologia","peso":6,"sub":[
 "Artrite reumatoide","Lúpus eritematoso sistêmico","Fibromialgia","Artrite reativa","Gota",
 "Vasculites","Autoanticorpos"]},

{"id":"geriatria","nome":"Geriatria e cuidados paliativos","matriz":"Clínica Geral/Geriatria","peso":6,"sub":[
 "Avaliação geriátrica ampla","Síndromes geriátricas","Polifarmácia e prescrição segura",
 "Doenças crônicas no idoso","Cuidados paliativos e fim de vida","Nutrição e metabolismo",
 "Vacinação no idoso","Transtornos cognitivos e demenciais"]},

{"id":"onco","nome":"Oncologia","matriz":"Hematologia/Oncologia","peso":5,"sub":[
 "Hallmarks do câncer","Rastreamento mamográfico no Brasil","Fatores de risco do câncer de mama",
 "Agentes carcinogênicos","Rastreamento do câncer de próstata","Terapias-alvo e personalizadas"]},

{"id":"derma","nome":"Dermatologia na clínica","matriz":"Clínica Geral","peso":3,"sub":[
 "Vasculites cutâneas","Manifestações cutâneas do lúpus",
 "Úlceras de membros inferiores (arterial, venosa, neuropática)",
 "Manifestações dermatológicas do paciente grave"]},

{"id":"psiq","nome":"Psiquiatria","matriz":"Clínica Geral","peso":3,"sub":[
 "Esquizofrenia","Transtornos do humor","Transtornos de ansiedade","Abstinência alcoólica"]}
];

/* Matriz por Cenário (item 9.6) — onde o paciente está muda a conduta certa. */
window.CENARIOS=[
 {"id":"amb","nome":"Ambulatório"},
 {"id":"enf","nome":"Enfermaria"},
 {"id":"emg","nome":"Pronto-socorro"},
 {"id":"uti","nome":"UTI"}
];

/* Matriz por Competência (item 9.6) — o que a questão cobra de você. */
window.COMPETENCIAS=[
 {"id":"dx","nome":"Diagnóstico"},
 {"id":"tto","nome":"Tratamento/Conduta"},
 {"id":"urg","nome":"Urgência/Emergência"},
 {"id":"prev","nome":"Prevenção/Seguimento"}
];

/* Nível de profundidade da questão. Os `id` são históricos e NÃO devem mudar — o banco inteiro
   os referencia e o progresso gravado depende deles. Os rótulos são neutros de propósito: o app
   é de estudo de clínica médica e serve a qualquer público, não a um ano de residência. */
window.NIVEIS=[
 {"id":"r1","nome":"Essencial","desc":"Reconhecer, estabilizar e prescrever com segurança — o que não se pode errar."},
 {"id":"r2","nome":"Intermediário","desc":"Diagnóstico diferencial mais fino, indicação de exames e seguimento crônico."},
 {"id":"r3","nome":"Avançado","desc":"Nuance de diretriz e do estudo que mudou a conduta; profundidade de subespecialidade."},
 {"id":"tit","nome":"Nível prova de título","desc":"Cenário clínico completo com tomada de decisão, no formato da prova de título."}
];
