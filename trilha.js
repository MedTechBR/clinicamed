/* Trilha da residência — o eixo "estudar durante a residência", que não existe nos apps de prova.
   Cada bloco é um rodízio típico do programa de Clínica Médica (Resolução CNRM: 2 anos de
   Clínica Médica com estágios obrigatórios). `areas` casa com os id da taxonomia, de modo que
   o botão "treinar este rodízio" filtra o banco pelo que o residente está vivendo agora.
   `nivel` diz em que profundidade o app deve sortear as questões do bloco. */
window.TRILHA=[
{"ano":"r1","titulo":"R1 — o ano da enfermaria","resumo":"O primeiro ano é sobre segurança: reconhecer o paciente que está piorando, estabilizar e prescrever sem causar dano. A profundidade vem depois.","blocos":[
 {"id":"r1-enf","nome":"Enfermaria de clínica médica","semanas":12,"areas":["emergencias","nefro","infecto","cardio"],
  "foco":"Admissão bem feita, prescrição segura, distúrbios hidroeletrolíticos, antibiótico empírico e reconhecimento precoce de deterioração.",
  "entregas":["Escrever 10 admissões com hipótese e plano problem-oriented","Fechar o cálculo de clearance por CKD-EPI 2021 em todo paciente com creatinina alterada","Discutir 3 casos de sepse usando o pacote da primeira hora"]},
 {"id":"r1-emg","nome":"Emergência","semanas":8,"areas":["emergencias","cardio","neuro","pneumo"],
  "foco":"Dor torácica, dispneia aguda, rebaixamento de consciência, sepse e o paciente instável sem diagnóstico.",
  "entregas":["Interpretar 30 eletrocardiogramas com laudo próprio antes de ver o do serviço","Conduzir 5 casos de AVC dentro da janela, cronometrando porta-agulha","Treinar a passagem de caso no formato SBAR"]},
 {"id":"r1-uti","nome":"Terapia intensiva","semanas":8,"areas":["emergencias","nefro","pneumo"],
  "foco":"Ventilação mecânica básica, choque e vasopressor, sedação e analgesia, injúria renal aguda.",
  "entregas":["Ajustar parâmetros ventilatórios em 10 pacientes com supervisão","Discutir 3 casos de choque diferenciando os perfis hemodinâmicos","Fazer a conta de balanço hídrico diário de um leito por 7 dias"]},
 {"id":"r1-amb","nome":"Ambulatório geral","semanas":12,"areas":["sus","endocrino","cardio","geriatria"],
  "foco":"Hipertensão, diabetes, dislipidemia, rastreamento por faixa etária e a consulta que cabe em 20 minutos.",
  "entregas":["Montar 10 planos de cuidado com metas pactuadas por escrito","Revisar o calendário vacinal de todos os pacientes acima de 60 anos atendidos","Praticar a decisão compartilhada em 3 casos de rastreamento"]}
]},
{"ano":"r2","titulo":"R2 — o ano do raciocínio","resumo":"No segundo ano a pergunta muda: não é mais o que fazer agora, é por que este diagnóstico e não o outro, e o que a evidência sustenta.","blocos":[
 {"id":"r2-esp","nome":"Rodízios de especialidade","semanas":16,"areas":["gastro","reumato","hemato","endocrino"],
  "foco":"Diagnóstico diferencial fino, indicação e interpretação de exame, quando a conduta muda com o subtipo.",
  "entregas":["Apresentar 4 sessões clínicas com leitura crítica do artigo que sustenta a conduta","Acompanhar 5 pacientes do diagnóstico ao ajuste terapêutico","Construir um fluxograma próprio para dois diagnósticos diferenciais frequentes"]},
 {"id":"r2-onco","nome":"Oncologia e hematologia","semanas":8,"areas":["onco","hemato"],
  "foco":"Emergências oncológicas, rastreamento com evidência, toxicidade de terapia-alvo e comunicação de má notícia.",
  "entregas":["Conduzir 3 conversas de má notícia com supervisão e devolutiva","Rastrear corretamente 10 pacientes segundo as diretrizes brasileiras","Reconhecer e tratar 2 emergências oncológicas na prática"]},
 {"id":"r2-inf","nome":"Infectologia e antimicrobianos","semanas":8,"areas":["infecto","emergencias"],
  "foco":"Escolha empírica, descalonamento, duração de tratamento e infecção associada à assistência.",
  "entregas":["Descalonar 10 esquemas com base em cultura e justificar por escrito","Revisar o tempo de tratamento de todos os pacientes sob seu cuidado semanalmente","Apresentar um caso de falha terapêutica com análise da causa"]},
 {"id":"r2-ger","nome":"Geriatria e cuidados paliativos","semanas":8,"areas":["geriatria","psiq"],
  "foco":"Avaliação geriátrica ampla, desprescrição, delirium, capacidade funcional e cuidado de fim de vida.",
  "entregas":["Aplicar a avaliação geriátrica ampla em 10 pacientes","Desprescrever com método em 5 pacientes polimedicados","Conduzir 2 reuniões familiares de definição de objetivos de cuidado"]}
]},
{"ano":"r3","titulo":"R3 — o ano da escolha","resumo":"O terceiro ano é o da subespecialidade ou do título: a leitura passa a ser de diretriz e de ensaio clínico, e o estudo mira a prova que vem.","blocos":[
 {"id":"r3-sub","nome":"Preparação para o acesso à subespecialidade","semanas":20,"areas":["cardio","nefro","gastro","pneumo","endocrino","hemato","reumato","infecto"],
  "foco":"Profundidade de diretriz por área, com atenção ao que mudou nos últimos dois anos — é aí que a banca cobra.",
  "entregas":["Fechar o banco de questões de nível R3 da área escolhida","Ler as diretrizes principais da área na versão vigente, com data anotada","Fazer 4 simulados no formato de 80 questões cronometradas"]},
 {"id":"r3-tit","nome":"Preparação para o título de especialista","semanas":20,"areas":["cardio","emergencias","infecto","pneumo","gastro","endocrino","nefro","neuro","sus","geriatria","hemato","reumato","onco","derma","psiq","oftalmo","orl","go"],
  "foco":"Cobertura ampla no formato do edital, com treino das estações práticas de proficiência clínica.",
  "entregas":["Cobrir as 18 áreas do conteúdo programático ao menos uma vez","Simular as 2 estações práticas cronometradas com avaliador","Revisar os erros do painel a cada quinze dias"]}
]}
];
