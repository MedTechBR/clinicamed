/* Estações da prova prática de proficiência clínica (TECM 2ª fase).
   Formato do edital nº 2473, item 9.7: 2 estações, 10 minutos cada, dinâmica SEQUENCIAL — o
   examinador só entrega os dados da etapa seguinte depois que o candidato cumpre a ação da
   etapa atual. Avaliação CHA (Conhecimento, Habilidade, Atitude), 5 pontos por estação,
   corte de 7 pontos nos 10 possíveis.

   `espelho` é o gabarito de correção: cada item tem eixo (C/H/A) e peso; a soma dos pesos de
   cada estação é 5,0. O app mostra o espelho só DEPOIS que o candidato registra o que fez. */
window.PRATICA=[
 {
  "id": "est-dortoracica",
  "titulo": "Dor torácica na emergência",
  "area": "cardio",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Homem de 59 anos, tabagista, chega com dor torácica opressiva iniciada há 50 minutos, sudoreico. Pressão arterial 138/84 mmHg, frequência cardíaca 92 bpm, saturação 96% em ar ambiente. Conduza o atendimento.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga em voz alta as três primeiras ações e solicite o exame que define a conduta.",
    "entrega": "O examinador entrega o eletrocardiograma: supradesnivelamento de ST de 3 mm em DII, DIII e aVF, com infradesnivelamento em DI e aVL."
   },
   {
    "n": 2,
    "tarefa": "Interprete o traçado, nomeie o diagnóstico e a parede acometida, e diga qual derivação adicional você pede e por quê.",
    "entrega": "O examinador informa: V3R e V4R com supradesnivelamento de 2 mm. O serviço não tem hemodinâmica; a transferência leva 150 minutos."
   },
   {
    "n": 3,
    "tarefa": "Defina a estratégia de reperfusão e a prescrição imediata, dizendo o que você NÃO vai prescrever neste paciente e por quê.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece infarto com supradesnivelamento de ST de parede inferior",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Pede V3R/V4R e identifica o acometimento de ventrículo direito",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Indica fibrinólise imediata por tempo até angioplastia acima de 120 minutos",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Prevê a transferência para coronariografia em 2 a 24 horas (estratégia fármaco-invasiva)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Evita nitrato e morfina em dose plena diante de infarto de ventrículo direito",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Monitorização, acesso venoso, oxigênio apenas se saturação baixa e desfibrilador à beira do leito",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Obtém o eletrocardiograma em até 10 minutos da chegada",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Comunica ao paciente o diagnóstico e a necessidade de transferência em linguagem clara",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Registra checagem de contraindicações ao fibrinolítico antes de administrá-lo",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-manoticia",
  "titulo": "Comunicação de má notícia e definição de objetivos de cuidado",
  "area": "geriatria",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você acompanha na enfermaria uma paciente de 81 anos com demência avançada, acamada, com terceira pneumonia aspirativa em quatro meses. A filha, cuidadora principal, pede para falar com você e pergunta se 'não tem uma sonda que resolva'. Conduza a conversa.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Abra a conversa e verifique o que a filha já entende sobre a doença da mãe, antes de dar qualquer informação.",
    "entrega": "A filha responde: 'Ela está fraquinha por causa da idade, mas se ela comer melhor ela volta ao normal, né?'"
   },
   {
    "n": 2,
    "tarefa": "Explique o quadro e responda diretamente à pergunta da sonda, com base na evidência.",
    "entrega": "A filha se emociona e diz: 'Então vocês vão deixar minha mãe morrer de fome?'"
   },
   {
    "n": 3,
    "tarefa": "Responda à colocação, proponha um plano de cuidado e defina o próximo passo combinado com a família.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Explica que a sonda de alimentação não reduz aspiração nem mortalidade na demência avançada",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Nomeia a demência avançada como doença progressiva e incurável, com prognóstico limitado",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Propõe alimentação confortável por via oral conforme a aceitação da paciente",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Investiga o entendimento prévio antes de informar (não despeja informação)",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Usa linguagem sem jargão e verifica a compreensão ao final de cada bloco",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Fecha com plano concreto e próximo passo combinado, incluindo controle de sintomas",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Acolhe a emoção e faz silêncio depois da notícia, sem preencher com informação",
    "peso": 0.7
   },
   {
    "eixo": "A",
    "item": "Não confronta a filha nem trata a recusa como ignorância; reconhece o cuidado dela",
    "peso": 0.5
   }
  ]
 },
 {
  "id": "est-sepse",
  "titulo": "Paciente instável na enfermaria",
  "area": "emergencias",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você é chamado à enfermaria por uma mulher de 68 anos, internada há três dias por pielonefrite, que ficou sonolenta. Pressão arterial 84/48 mmHg, frequência cardíaca 118 bpm, temperatura 38,7 °C, frequência respiratória 26 irpm, saturação 93% em ar ambiente. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o que você faz nos primeiros cinco minutos, na ordem, e o que solicita.",
    "entrega": "O examinador entrega: lactato 4,2 mmol/L, creatinina 2,1 mg/dL (basal 0,9), leucócitos 21.000/mm³. Culturas colhidas."
   },
   {
    "n": 2,
    "tarefa": "Nomeie o diagnóstico sindrômico, calcule o volume de ressuscitação e defina o antimicrobiano com a justificativa.",
    "entrega": "Após o volume, a paciente mantém pressão arterial média de 58 mmHg."
   },
   {
    "n": 3,
    "tarefa": "Defina a próxima medida, o alvo pressórico e o local de cuidado, justificando cada escolha.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece choque séptico (hipotensão com lactato elevado e foco infeccioso)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Indica 30 mL/kg de cristaloide na ressuscitação inicial",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Prescreve antimicrobiano de amplo espectro na primeira hora, após colher culturas",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Inicia noradrenalina para pressão arterial média alvo de 65 mmHg (60 a 65 se idoso)",
    "peso": 0.9
   },
   {
    "eixo": "H",
    "item": "Aciona acesso calibroso, monitorização e transferência para terapia intensiva",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Reavalia perfusão à beira do leito e repete o lactato para acompanhar a tendência",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Comunica a gravidade à paciente e à família com clareza e sem eufemismo",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Registra em prontuário o horário de cada intervenção do pacote inicial",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-dispneia",
  "titulo": "Dispneia aguda na emergência",
  "area": "pneumo",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Mulher de 58 anos, obesa, chega com dispneia súbita há 2 horas e dor pleurítica à direita. Frequência 112 bpm, saturação 90% em ar ambiente, pressão 128/80 mmHg, temperatura 36,8 °C. Fez artroplastia de joelho há 12 dias. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas três principais hipóteses, o que você examina especificamente e qual escore você aplica antes de pedir exame.",
    "entrega": "O examinador informa: escore de Wells de 6 pontos. Ausculta pulmonar limpa, sem turgência jugular, panturrilha direita discretamente edemaciada."
   },
   {
    "n": 2,
    "tarefa": "Com essa probabilidade, diga qual exame você pede e qual você NÃO pede, e o que faz enquanto aguarda.",
    "entrega": "A angiotomografia confirma embolia pulmonar em ramos lobares bilaterais. Troponina levemente elevada, relação VD/VE de 1,1. Pressão mantida em 126/78 mmHg."
   },
   {
    "n": 3,
    "tarefa": "Classifique a gravidade, defina onde a paciente será tratada e justifique. Diga quando você consideraria terapia avançada.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Aplica escore de probabilidade clínica antes de solicitar exame",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Reconhece que com probabilidade alta NÃO se pede dímero D",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Inicia anticoagulação enquanto aguarda a confirmação, sem contraindicação",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Classifica como categoria C (disfunção de VD e biomarcador elevado com pressão normal) e indica internação",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Reserva terapia avançada para falência cardiopulmonar (categorias D e E)",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Oxigênio com alvo, monitorização e acesso venoso",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Examina membros inferiores e busca sinais de sobrecarga de ventrículo direito",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Explica à paciente o diagnóstico e a necessidade de internação em linguagem clara",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Checa contraindicações à anticoagulação e registra",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-hipercalemia",
  "titulo": "Alteração eletrocardiográfica na enfermaria",
  "area": "nefro",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você é chamado à enfermaria: homem de 69 anos, com doença renal crônica estágio 4, em uso de enalapril e espironolactona, apresenta fraqueza e mal-estar. A técnica traz um eletrocardiograma. Pressão 138/84 mmHg, frequência 48 bpm.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o que você procura no eletrocardiograma e quais exames pede imediatamente.",
    "entrega": "O examinador entrega: ondas T apiculadas e simétricas, QRS de 130 ms alargado em relação ao traçado prévio. Potássio de 7,4 mEq/L, creatinina de 3,8 mg/dL, bicarbonato de 17 mEq/L."
   },
   {
    "n": 2,
    "tarefa": "Diga a sequência exata do tratamento, na ordem, com as classes de droga e o que cada uma faz.",
    "entrega": "Após as medidas iniciais, o potássio cai para 6,2 mEq/L e o QRS estreita. A diurese está em 20 mL/h."
   },
   {
    "n": 3,
    "tarefa": "Defina a conduta seguinte, os critérios que indicariam diálise e o que você ajusta na prescrição de base.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece hipercalemia com alteração eletrocardiográfica como emergência",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Administra gluconato de cálcio PRIMEIRO, para estabilizar a membrana",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Desloca o potássio com insulina e glicose, com beta-agonista inalatório",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Remove potássio: resina, diurético conforme volemia, ou diálise",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Suspende enalapril e espironolactona",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Monitorização contínua e eletrocardiograma seriado",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Cita critérios de diálise: hipercalemia refratária, acidose grave, sobrecarga refratária, uremia",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Comunica a gravidade à equipe e documenta o horário de cada intervenção",
    "peso": 0.4
   }
  ]
 },
 {
  "id": "est-mnoticia-onco",
  "titulo": "Comunicação de progressão de doença oncológica",
  "area": "onco",
  "cenario": "amb",
  "tempo": 10,
  "abertura": "Você atende no ambulatório um homem de 64 anos com adenocarcinoma de pulmão metastático, em segunda linha de tratamento, ECOG 2. A tomografia de reavaliação mostra progressão em fígado e osso. Ele vem sozinho e pergunta: 'doutor, o exame melhorou?'.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Abra a conversa. Diga exatamente o que você fala primeiro, antes de dar qualquer informação.",
    "entrega": "Ele responde: 'olha, o outro médico falou que esse tratamento ia segurar. Eu tenho fé que melhorou.'"
   },
   {
    "n": 2,
    "tarefa": "Comunique o resultado. Diga suas palavras.",
    "entrega": "Ele silencia, os olhos enchem de lágrimas e diz: 'então não tem mais nada a fazer?'"
   },
   {
    "n": 3,
    "tarefa": "Responda a essa pergunta e proponha o plano, definindo o próximo passo concreto.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Investiga o entendimento prévio antes de informar",
    "peso": 0.7
   },
   {
    "eixo": "H",
    "item": "Verifica o quanto ele quer saber, antes de detalhar",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Dá um aviso prévio e informa em blocos curtos, sem jargão",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Nomeia a progressão com clareza, sem eufemismo que confunda",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Responde ao 'nada a fazer' distinguindo tratamento modificador de cuidado ativo de sintomas",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Propõe avaliação de cuidados paliativos em paralelo, não como abandono",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Acolhe a emoção e faz silêncio, sem preencher com informação",
    "peso": 0.8
   },
   {
    "eixo": "A",
    "item": "Fecha com próximo passo concreto e combinado, e se coloca disponível",
    "peso": 0.5
   }
  ]
 }
];
