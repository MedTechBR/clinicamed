/* Alvos de prova do ClínicaMed. Datas e regras conferidas em fonte primária:
   TECM  → Edital SBCM/AMB nº 2473 (docs/edital-2473-tecm-2026.pdf), itens 1 (cronograma), 9.6 a 9.8.
   ENARE → Edital 03/2026 (pré-requisito). Prova objetiva de 13/09/2026, 80 questões, 1,25 ponto cada.
   O modo "residencia" não tem data: é estudo contínuo, e o app usa a trilha em vez do contador. */
window.PROVAS=[
{"id":"tecm","nome":"Título de especialista (TECM)","org":"SBCM/AMB",
 "data":"2026-11-29","oque":"Prova prática — 2 estações","q":120,"alts":5,
 "regra":"1ª fase: 120 questões (100 valendo 0,8 + 20 valendo 1,0) = 100 pontos, somados a até 10 pontos de análise curricular; corte de 70%. 2ª fase: 2 estações de 10 minutos avaliadas por Conhecimento, Habilidade e Atitude, 5 pontos cada, corte de 7. Aprovação independente nas duas fases, sem compensação entre elas.",
 "edital":"Edital nº 2473 — docs/edital-2473-tecm-2026.pdf"},
{"id":"enare","nome":"ENARE pré-requisito (R+)","org":"FGV/EBSERH",
 "data":"2026-09-13","oque":"Prova objetiva de acesso à subespecialidade","q":80,"alts":5,
 "regra":"80 questões objetivas, 1,25 ponto cada, total de 100 pontos. Programas de pré-requisito em Clínica Médica: cardiologia, nefrologia, gastroenterologia, pneumologia, endocrinologia, hematologia, reumatologia, infectologia, geriatria e medicina intensiva, entre outros.",
 "edital":"Edital ENARE 03/2026 (pré-requisito, ano adicional e área de atuação)"},
{"id":"residencia","nome":"Residência em curso","org":"estudo contínuo",
 "data":null,"oque":"Sem data — a régua é a trilha do ano","q":null,"alts":5,
 "regra":"Modo para quem está na residência: o app deixa de contar dias para a prova e passa a seguir a trilha do ano (R1, R2, R3), com o conteúdo casado ao rodízio em curso.",
 "edital":""}
];
