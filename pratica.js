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
 },
 {
  "id": "est-icdescompensada",
  "titulo": "Insuficiência cardíaca descompensada na enfermaria",
  "area": "cardio",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você assume na enfermaria um homem de 67 anos com insuficiência cardíaca de fração de ejeção reduzida (fração de ejeção de 28% no ecocardiograma de seis meses atrás), internado ontem por piora da falta de ar, ortopneia e ganho de 6 kg em duas semanas. Usa em casa furosemida 40 mg/dia, enalapril 10 mg de 12/12 h e carvedilol 12,5 mg de 12/12 h. Pressão arterial 132/82 mmHg, frequência cardíaca 96 bpm, saturação 91% em ar ambiente, estertores até o terço médio dos pulmões, turgência jugular, edema de membros inferiores 3+/4+, extremidades quentes e enchimento capilar de 2 segundos. Creatinina 1,4 mg/dL (basal 1,2), potássio 4,6 mEq/L, sódio 134 mEq/L. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Classifique o perfil clínico-hemodinâmico e prescreva o diurético com dose, via e frequência. Diga como você vai verificar se a resposta foi adequada nas primeiras horas.",
    "entrega": "O examinador informa: duas horas após furosemida 80 mg IV, o sódio urinário é de 38 mEq/L; a diurese das primeiras 6 horas foi de 450 mL. O paciente segue dispneico."
   },
   {
    "n": 2,
    "tarefa": "Interprete a resposta ao diurético e defina o ajuste. Diga o que você faz com o carvedilol e com o enalapril durante a internação.",
    "entrega": "Com o ajuste, o balanço hídrico fica negativo em cerca de 1,8 L/dia por quatro dias. Hoje está sem congestão, pressão arterial 112/70 mmHg, frequência cardíaca 74 bpm, potássio 4,8 mEq/L, creatinina 1,5 mg/dL, taxa de filtração glomerular estimada (CKD-EPI 2021) de 49 mL/min/1,73 m². Alta prevista em 48 horas."
   },
   {
    "n": 3,
    "tarefa": "Monte a prescrição de alta para a insuficiência cardíaca com fração de ejeção reduzida, com as doses iniciais de cada classe, e defina o seguimento após a alta.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Classifica como perfil quente e úmido (congesto e bem perfundido)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Prescreve furosemida IV em dose de 1 a 2 vezes a dose oral diária (40 a 80 mg IV), em bolus (ESC 2021)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Avalia a resposta pelo sódio urinário em 2 horas (alvo de 50 a 70 mEq/L ou mais) ou pela diurese de 100 a 150 mL/h nas primeiras 6 horas (ESC 2021)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Reconhece resposta insuficiente, dobra a dose do diurético de alça e cita associação de tiazídico ou acetazolamida se a resposta seguir inadequada",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Mantém carvedilol e enalapril na descompensação sem hipotensão, choque ou baixo débito, e não suspende por elevação discreta da creatinina durante a descongestão",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Troca enalapril por sacubitril/valsartana (49/51 mg de 12/12 h) respeitando intervalo de 36 horas sem IECA",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Dá alta com as quatro classes: sacubitril/valsartana, carvedilol, espironolactona 25 mg/dia (potássio até 5,0 mEq/L e filtração acima de 30) e dapagliflozina ou empagliflozina 10 mg/dia",
    "peso": 0.7
   },
   {
    "eixo": "H",
    "item": "Escreve a prescrição completa (dose, via, frequência) com peso diário, balanço hídrico, potássio e creatinina diários",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Orienta o paciente sobre pesagem diária, sinais de alerta e adesão, e garante retorno com exames em 1 a 2 semanas para titulação (ESC 2023, estratégia do STRONG-HF)",
    "peso": 0.6
   }
  ]
 },
 {
  "id": "est-faambulatorio",
  "titulo": "Fibrilação atrial no ambulatório",
  "area": "cardio",
  "cenario": "amb",
  "tempo": 10,
  "abertura": "Você atende no ambulatório uma mulher de 78 anos, hipertensa e diabética, em uso de losartana 50 mg de 12/12 h e metformina 850 mg de 12/12 h, que refere palpitações e cansaço há três semanas. Peso 72 kg. Pressão arterial 138/86 mmHg, frequência cardíaca 118 bpm, pulso irregular. O eletrocardiograma mostra fibrilação atrial, sem episódio prévio documentado. Nega AVC, sangramento ou insuficiência cardíaca. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Calcule o risco tromboembólico com o escore adequado, explicando cada ponto, diga se indica anticoagulação e o que você solicita antes de escolher o anticoagulante.",
    "entrega": "O examinador entrega: creatinina 1,3 mg/dL, taxa de filtração glomerular estimada (CKD-EPI 2021) de 41 mL/min/1,73 m², hemoglobina 13,1 g/dL, plaquetas 220.000/mm³, TSH normal. Ecocardiograma: fração de ejeção de 60%, sem estenose mitral e sem prótese valvar. A paciente pergunta se não pode tomar 'AAS, que é mais fraquinho'."
   },
   {
    "n": 2,
    "tarefa": "Escolha o anticoagulante e a dose, justificando pelos critérios de ajuste do fármaco, e responda à pergunta da paciente sobre o AAS.",
    "entrega": "Ela retorna em 15 dias em uso regular do anticoagulante, sem sangramento. Mantém cansaço aos esforços. Frequência cardíaca de 122 bpm em repouso, pressão arterial 134/82 mmHg, sem congestão."
   },
   {
    "n": 3,
    "tarefa": "Defina o controle de frequência: droga, dose inicial e meta. Diga qual classe você evitaria se a fração de ejeção fosse reduzida.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Usa o CHA2DS2-VA (ESC 2024), sem pontuar o sexo feminino, e chega a 4 pontos (idade de 75 anos ou mais = 2, hipertensão = 1, diabetes = 1)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Indica anticoagulação oral porque o escore é 2 ou mais (recomendada na ESC 2024)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Prefere anticoagulante oral direto à varfarina por ausência de estenose mitral moderada a grave e de prótese mecânica",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Prescreve apixabana 5 mg de 12/12 h (dose plena) porque não preenche 2 dos 3 critérios de redução: idade de 80 anos ou mais, peso de 60 kg ou menos, creatinina de 1,5 mg/dL ou mais",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Responde que AAS não é alternativa para prevenir AVC na fibrilação atrial e não associa antiplaquetário ao anticoagulante (ESC 2024)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Inicia betabloqueador (por exemplo, succinato de metoprolol 25 a 50 mg/dia) ou diltiazem/verapamil, permitidos por fração de ejeção acima de 40%; evita diltiazem e verapamil se fração de ejeção de 40% ou menos (ESC 2024)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Define meta inicial de frequência em repouso abaixo de 110 bpm (controle leniente), estreitando se os sintomas persistirem",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Avalia risco de sangramento (HAS-BLED) para corrigir fatores modificáveis, sem usá-lo para negar a anticoagulação",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Solicita creatinina com filtração estimada (CKD-EPI 2021), hemograma, TSH e ecocardiograma antes de escolher o anticoagulante",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Explica à paciente o benefício e o risco da anticoagulação, os sinais de sangramento e a importância de não pular doses (tomada a cada 12 horas)",
    "peso": 0.6
   }
  ]
 },
 {
  "id": "est-pcrchocavel",
  "titulo": "Parada cardiorrespiratória em ritmo chocável",
  "area": "emergencias",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o médico da sala de emergência. Homem de 61 anos, em observação por dor torácica enquanto aguarda a troponina, para de responder. Não respira normalmente e não há pulso carotídeo. O monitor mostra fibrilação ventricular. Com você estão uma enfermeira e dois técnicos de enfermagem; o carrinho de parada com desfibrilador bifásico está ao lado. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas primeiras ações em ordem, distribua as funções da equipe e informe a carga do primeiro choque.",
    "entrega": "Após o primeiro choque e 2 minutos de compressões, o monitor mantém fibrilação ventricular. Há acesso venoso periférico pronto e capnografia em bolsa-válvula-máscara mostrando 14 mmHg."
   },
   {
    "n": 2,
    "tarefa": "Conduza o ciclo seguinte: diga o que faz, qual fármaco entra, com dose, via e momento, e a cada quanto tempo ele se repete.",
    "entrega": "Após o terceiro choque, persiste fibrilação ventricular. O examinador informa que o mesmo técnico comprime há 6 minutos sem troca e que a capnografia caiu para 8 mmHg."
   },
   {
    "n": 3,
    "tarefa": "Corrija o que está errado na reanimação, diga o fármaco e a dose agora, enumere as causas reversíveis que você busca neste paciente e diga o que planeja se houver retorno da circulação espontânea.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece fibrilação ventricular como ritmo chocável e desfibrila imediatamente (bifásico 120 a 200 J conforme o fabricante, ou carga máxima; 360 J se monofásico)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Retoma as compressões logo após o choque, sem checar pulso nem ritmo, por 2 minutos",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Administra adrenalina 1 mg IV após a falha das primeiras desfibrilações (após o segundo choque) e repete a cada 3 a 5 minutos (AHA 2025)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Administra amiodarona 300 mg IV em bolus após o terceiro choque, com segunda dose de 150 mg, ou lidocaína 1 a 1,5 mg/kg como alternativa (AHA 2025)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Enumera as causas reversíveis (hipóxia, hipovolemia, hidrogênio/acidose, hipo ou hipercalemia, hipotermia, pneumotórax hipertensivo, tamponamento, toxinas, trombose coronária e pulmonar) e destaca a síndrome coronariana aguda neste paciente",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Planeja o pós-retorno: eletrocardiograma de 12 derivações, suporte hemodinâmico, coronariografia de emergência se supradesnivelamento de ST e controle direcionado de temperatura evitando febre",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Garante compressões de qualidade: 100 a 120 por minuto, profundidade de 5 a 6 cm, retorno completo do tórax, troca do compressor a cada 2 minutos e pausas mínimas",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Usa a capnografia para avaliar a qualidade da reanimação e corrige ao ver queda abaixo de 10 mmHg (troca o compressor)",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Lidera com funções definidas (compressor, via aérea, desfibrilador, medicação e registro) e comunicação em alça fechada",
    "peso": 0.5
   }
  ]
 },
 {
  "id": "est-anafilaxia",
  "titulo": "Anafilaxia com choque na emergência",
  "area": "emergencias",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Homem de 54 anos, 80 kg, é trazido à emergência 15 minutos após ser picado por várias abelhas no quintal. Refere tontura e falta de ar. Tem urticária generalizada, edema de lábios, sibilância difusa. Pressão arterial 78/40 mmHg, frequência cardíaca 64 bpm, frequência respiratória 28 irpm, saturação 90% em ar ambiente. É hipertenso e usa metoprolol. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Nomeie o diagnóstico e diga, na ordem, as primeiras ações, com fármaco, dose, via e local de aplicação.",
    "entrega": "Cinco minutos após a primeira dose: pressão arterial 80/44 mmHg, sibilância mantida, urticária persistente. Já correram 1.000 mL de cristaloide."
   },
   {
    "n": 2,
    "tarefa": "Defina a conduta agora e, se não houver resposta, a etapa seguinte. Diga o que nesta história explica a resposta ruim e como você trata isso.",
    "entrega": "Após a segunda dose intramuscular, infusão contínua de adrenalina e glucagon, a pressão arterial é de 108/64 mmHg e não há sibilância há 40 minutos. O paciente diz que já está bem e quer ir embora."
   },
   {
    "n": 3,
    "tarefa": "Defina o tempo e o local de observação, o exame que você colhe para documentar o quadro e o plano de alta.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Diagnostica anafilaxia com choque (exposição provável, pele e mucosa, comprometimento respiratório e hipotensão)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Aplica adrenalina IM 0,5 mg (0,5 mL da solução de 1 mg/mL) no vasto lateral da coxa, como primeira medida e sem atraso (WAO 2020; Parâmetro de Prática AAAAI/ACAAI 2023)",
    "peso": 1.0
   },
   {
    "eixo": "H",
    "item": "Deita o paciente com membros inferiores elevados (não o senta nem o põe de pé), oferece oxigênio em alto fluxo, obtém acesso calibroso e monitoriza",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Faz cristaloide em bolus rápido (1 a 2 L no adulto)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Repete a adrenalina IM após 5 minutos sem resposta",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Define anafilaxia refratária (sem resposta a 2 doses IM e volume) e inicia adrenalina IV em infusão contínua titulada, com monitorização, sem bolus IV de 1 mg",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Reconhece o betabloqueador como causa de refratariedade e prescreve glucagon 1 a 5 mg IV em 5 minutos, seguido de infusão se necessário",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Usa anti-histamínico e corticoide apenas como adjuvantes, nunca antes nem no lugar da adrenalina",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Mantém observação prolongada, de pelo menos 12 horas ou em internação, por reação grave com mais de uma dose de adrenalina (Resuscitation Council UK 2021), e colhe triptase sérica até 2 horas do início",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente o risco de reação bifásica e por que não deve sair agora; na alta, prescreve autoinjetor de adrenalina, plano escrito e encaminhamento ao alergista para imunoterapia com veneno",
    "peso": 0.4
   }
  ]
 },
 {
  "id": "est-organofosforado",
  "titulo": "Intoxicação por inseticida organofosforado",
  "area": "emergencias",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você está de plantão em uma emergência do interior. Homem de 34 anos, trabalhador rural, é trazido pela família 1 hora depois de ser encontrado ao lado de um frasco vazio de inseticida agrícola organofosforado; deixou um bilhete de despedida. Está sudoreico, com sialorreia, vômitos, fasciculações em face e tórax e pupilas puntiformes. A roupa está molhada do produto. Frequência cardíaca 48 bpm, pressão arterial 90/56 mmHg, frequência respiratória 30 irpm, saturação 86% em ar ambiente, estertores e sibilos difusos, Glasgow 12. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas primeiras ações, incluindo a proteção da equipe, e nomeie a síndrome tóxica com os achados que a sustentam.",
    "entrega": "O paciente foi despido e lavado, está em oxigênio e com acesso venoso. Persistem broncorreia, sibilos difusos e frequência cardíaca de 46 bpm. A atividade da colinesterase foi colhida; o resultado sai em 24 horas."
   },
   {
    "n": 2,
    "tarefa": "Prescreva o antídoto principal: dose inicial, como você titula e quais são os alvos clínicos que encerram a fase de ataque.",
    "entrega": "Após bolus sucessivos que somaram 30 mg, a ausculta pulmonar está limpa, frequência cardíaca 96 bpm, pressão arterial 108/68 mmHg, axilas secas. Persistem fasciculações e fraqueza para fletir o pescoço."
   },
   {
    "n": 3,
    "tarefa": "Defina a manutenção do antídoto, o segundo antídoto com dose, o que você monitora nos próximos dias e o que NÃO deve ser feito neste paciente.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Paramenta a equipe (luvas e avental), retira as roupas contaminadas e lava a pele com água e sabão antes de seguir o atendimento",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Nomeia a síndrome colinérgica muscarínica e nicotínica (miose, broncorreia, broncoespasmo, bradicardia, sialorreia, fasciculações) por inibidor de colinesterase",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Prioriza via aérea e oxigenação; se intubar, evita succinilcolina pelo risco de bloqueio neuromuscular prolongado e usa rocurônio",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Prescreve atropina 1 a 3 mg IV em bolus, dobrando a dose a cada 5 minutos até a atropinização (Eddleston e colaboradores, Lancet 2008; Organização Mundial da Saúde)",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Cita os alvos de atropinização: ausculta pulmonar limpa, frequência cardíaca acima de 80 bpm, pressão sistólica acima de 80 mmHg, axilas secas e pupilas não puntiformes; taquicardia não impede a atropina se houver broncorreia",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Mantém atropina em infusão de 10 a 20% da dose total de ataque por hora, reavaliando com frequência para sinais de excesso (agitação, hipertermia, íleo, retenção urinária)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Prescreve pralidoxima 30 mg/kg IV em 30 minutos seguida de 8 mg/kg/h (regime da Organização Mundial da Saúde), quando disponível, reconhecendo que o benefício é incerto",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Vigia a síndrome intermediária (24 a 96 horas): força de flexão cervical, pares cranianos e capacidade ventilatória, em terapia intensiva",
    "peso": 0.4
   },
   {
    "eixo": "A",
    "item": "Notifica a intoxicação (SINAN), aciona o Centro de Informação e Assistência Toxicológica e pede avaliação psiquiátrica pela tentativa de suicídio, mantendo o paciente sob vigilância",
    "peso": 0.6
   }
  ]
 },
 {
  "id": "est-choquesepticouti",
  "titulo": "Choque séptico refratário na UTI",
  "area": "emergencias",
  "cenario": "uti",
  "tempo": 10,
  "abertura": "Você é o plantonista da UTI. Homem de 58 anos, 80 kg, chega do centro cirúrgico após laparotomia por perfuração de cólon com peritonite fecal; o foco foi controlado. Recebeu 2.400 mL de cristaloide balanceado nas primeiras 3 horas e piperacilina-tazobactam na primeira hora, após hemoculturas. Está intubado, com cateter venoso central e linha arterial, em noradrenalina 0,35 mcg/kg/min. Pressão arterial média 61 mmHg, frequência cardíaca 124 bpm, lactato 4,6 mmol/L, tempo de enchimento capilar 5 segundos, diurese 20 mL/h. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas metas de ressuscitação e como você decide se este paciente recebe mais volume.",
    "entrega": "Elevação passiva das pernas sem aumento da integral velocidade-tempo na via de saída do ventrículo esquerdo (variação de 4%). Ultrassom pulmonar com linhas B difusas bilaterais. Ecocardiograma com fração de ejeção de 55%. A noradrenalina subiu para 0,5 mcg/kg/min, com pressão arterial média de 62 mmHg."
   },
   {
    "n": 2,
    "tarefa": "Defina a segunda droga vasoativa, com dose, e a outra medida farmacológica indicada agora, justificando ambas.",
    "entrega": "Duas horas depois: pressão arterial média de 66 mmHg com noradrenalina 0,4 mcg/kg/min e vasopressina 0,03 U/min. Lactato 4,4 mmol/L, tempo de enchimento capilar 5 segundos, diurese 15 mL/h. Novo ecocardiograma: fração de ejeção de 30%, integral velocidade-tempo baixa, ainda sem resposta a volume."
   },
   {
    "n": 3,
    "tarefa": "Interprete a evolução e defina a conduta hemodinâmica seguinte. Diga também o que você revisa no antimicrobiano e como comunica a situação à família.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Define pressão arterial média inicial de 65 mmHg (Surviving Sepsis 2026, recomendação forte) e usa lactato seriado e tempo de enchimento capilar como guias de perfusão",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Decide volume por teste dinâmico (elevação passiva das pernas com medida do débito) e suspende fluido diante de ausência de resposta e linhas B difusas",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Adiciona vasopressina 0,03 U/min diante de noradrenalina em escalada (Surviving Sepsis 2026, recomendação condicional)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Prescreve corticoide IV no choque com vasopressor em escalada: hidrocortisona 200 mg/dia, 50 mg IV de 6/6 h (Surviving Sepsis 2026, recomendação condicional)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Reconhece disfunção miocárdica séptica com hipoperfusão persistente e associa dobutamina (início de 2,5 a 5 mcg/kg/min) ou troca por adrenalina isolada (Surviving Sepsis 2026)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Sabe que a adrenalina é a terceira droga se a pressão arterial média seguir inadequada com noradrenalina e vasopressina",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Revisa o antimicrobiano: resultado das culturas, descalonamento, duração curta com foco controlado e ajuste de dose à função renal",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Reavalia perfusão em intervalos definidos (lactato a cada 2 a 4 horas, tempo de enchimento capilar, diurese) e registra cada mudança de droga com horário",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Comunica à família, em local reservado, a gravidade, o plano e as incertezas, com tempo para perguntas e sem prometer desfecho",
    "peso": 0.5
   }
  ]
 },
 {
  "id": "est-meningite-bacteriana",
  "titulo": "Febre, cefaleia e crise convulsiva no pronto-socorro",
  "area": "infecto",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista do pronto-socorro. Homem de 64 anos, 70 kg, diabético, trazido pela esposa com febre e cefaleia intensa há 18 horas. Na triagem teve crise convulsiva focal à direita, com generalização, que cedeu sozinha em 2 minutos. Agora: Glasgow 11 (abertura ocular 3, verbal 3, motora 5), rigidez de nuca, sem petéquias visíveis. Pressão arterial 104/62 mmHg, frequência cardíaca 116 bpm, temperatura 39,2 °C, saturação 95% em ar ambiente, glicemia capilar 168 mg/dL. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga, na ordem, o que você faz nos primeiros minutos e se este paciente faz tomografia antes da punção lombar. Diga o que acontece com o antibiótico enquanto a tomografia não sai.",
    "entrega": "O examinador informa: tomografia de crânio sem lesão expansiva, sem desvio de linha média. Punção lombar realizada 50 minutos depois, com pressão de abertura de 32 cmH2O. Líquor turvo: 2.400 células/mm³ com 90% de neutrófilos, proteína 210 mg/dL, glicose 22 mg/dL (glicemia simultânea 140 mg/dL), Gram com diplococos gram-negativos. A enfermagem nota petéquias novas em membros inferiores."
   },
   {
    "n": 2,
    "tarefa": "Interprete o líquor, nomeie o agente provável e diga o que você mantém, o que ajusta e o que suspende na prescrição inicial, justificando.",
    "entrega": "A esposa pergunta quem da família precisa de remédio. O examinador informa: moram no domicílio a esposa e a neta de 8 anos, que dorme na casa; um colega divide a sala de trabalho com o paciente, sem contato com secreções; o médico do atendimento pré-hospitalar aspirou a via aérea do paciente sem máscara."
   },
   {
    "n": 3,
    "tarefa": "Defina quem recebe quimioprofilaxia, com qual esquema e dose, e quais medidas de vigilância e de isolamento você toma agora.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Indica tomografia antes da punção pela crise convulsiva nova no adulto (OMS 2025, ESCMID 2016, IDSA 2004) e pela alteração de consciência (IDSA 2004)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Colhe hemoculturas e administra dexametasona e antibiótico ANTES da tomografia, sem esperar a punção",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Prescreve ceftriaxona 2 g IV de 12/12 h com ampicilina 2 g IV de 4/4 h pela idade acima de 60 anos e diabetes (cobertura de Listeria, OMS 2025)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Prescreve dexametasona 10 mg IV de 6/6 h (ESCMID 2016) ou 0,15 mg/kg de 6/6 h (IDSA 2004), com a primeira dose antes ou junto do antibiótico",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Interpreta líquor bacteriano (relação glicose líquor/sangue de 0,16) e meningococo pelo Gram e pelas petéquias; suspende ampicilina e dexametasona ao identificar meningococo (OMS 2025, NICE 2024)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Indica rifampicina 600 mg VO de 12/12 h por 2 dias para esposa e médico do pré-hospitalar e 10 mg/kg/dose de 12/12 h por 2 dias para a neta (ou ceftriaxona 125 mg IM dose única), simultaneamente e de preferência em até 48 horas (Guia de Vigilância em Saúde, Ministério da Saúde)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Não indica profilaxia ao colega de sala nem ao paciente tratado com ceftriaxona",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Notifica o caso suspeito em até 24 horas à vigilância municipal, o que dispara a busca de contatos",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Institui precaução para gotículas por 24 horas de antibiótico eficaz e encaminha à terapia intensiva",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica à esposa a gravidade e por que a família precisa tomar o remédio no mesmo dia, em linguagem clara",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-hiv-diagnostico",
  "titulo": "HIV recém-diagnosticado no ambulatório",
  "area": "infecto",
  "cenario": "amb",
  "tempo": 10,
  "abertura": "Você atende no ambulatório da atenção primária um homem de 29 anos que volta para saber o resultado de dois testes rápidos para HIV, ambos reagentes, feitos por perda de 6 kg em três meses. Ele tem placas brancas na mucosa oral. Mora com a companheira, com quem tem relações sem preservativo. Ele senta e pergunta: 'e aí, doutor, deu alguma coisa?'. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Comunique o resultado. Diga suas palavras e, depois, quais exames você pede nesta primeira consulta.",
    "entrega": "Ele chora e pergunta se vai morrer. Depois de acolhido, colhe os exames. O examinador entrega: CD4 de 82 células/mm³ (8%), carga viral de 240.000 cópias/mL, creatinina 0,9 mg/dL, hemograma e transaminases normais, antígeno criptocócico por fluxo lateral não reagente, lipoarabinomanano urinário não reagente, sem tosse, febre ou sudorese noturna, radiografia de tórax normal, IgG para toxoplasmose reagente, HBsAg e anti-HBc não reagentes, anti-HBs não reagente, teste treponêmico não reagente."
   },
   {
    "n": 2,
    "tarefa": "Prescreva a terapia antirretroviral e todas as profilaxias indicadas, com doses, dizendo quando começa cada uma e por quê.",
    "entrega": "Ele diz: 'não quero que ninguém saiba, nem a minha companheira. Posso começar o remédio outro dia, quando eu estiver mais calmo?'"
   },
   {
    "n": 3,
    "tarefa": "Responda às duas questões e feche a consulta com o plano combinado.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Comunica o diagnóstico de forma direta após verificar o que o paciente espera, em ambiente reservado, sem jargão",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Solicita CD4, carga viral, hemograma, função renal e hepática, sífilis, hepatites B e C, IgG para toxoplasmose, antígeno criptocócico (CD4 abaixo de 200) e rastreio de tuberculose (PCDT HIV adultos, Ministério da Saúde 2024)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Prescreve tenofovir/lamivudina 300/300 mg mais dolutegravir 50 mg, uma vez ao dia (esquema preferencial do PCDT 2024), checando a taxa de filtração acima de 60 mL/min para o tenofovir",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Inicia a terapia no mesmo dia ou em até 7 dias, sem esperar os resultados (PCDT 2024)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Prescreve sulfametoxazol-trimetoprima 800/160 mg uma vez ao dia, cobrindo pneumocistose (CD4 abaixo de 200 e candidíase oral) e toxoplasmose (CD4 abaixo de 100 com IgG reagente)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Indica tratamento preventivo da tuberculose (CD4 até 350, sem prova tuberculínica) após excluir doença ativa, preferindo isoniazida com rifapentina por 3 meses, compatível com dolutegravir sem ajuste",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Não indica profilaxia para micobactéria não tuberculosa (só CD4 abaixo de 50 sem terapia) nem para criptococo; indica vacina para hepatite B",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Garante o sigilo, estimula a comunicação voluntária à companheira e oferece testagem e prevenção a ela, sem ameaçar quebrar o sigilo (Código de Ética Médica, art. 73)",
    "peso": 0.6
   },
   {
    "eixo": "A",
    "item": "Acolhe o medo, explica que com tratamento a expectativa de vida é próxima da habitual e que carga viral indetectável sustentada não transmite pela via sexual",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Fecha com plano concreto: início hoje, orientação de adesão e de efeitos adversos, preservativo até a supressão viral e retorno precoce agendado",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-dengue-alarme",
  "titulo": "Dengue com sinais de alarme",
  "area": "infecto",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você assume a enfermaria de clínica médica durante epidemia de dengue. Mulher de 42 anos, 60 kg, sem comorbidades, no quinto dia de febre, que cedeu ontem. Hoje refere dor abdominal intensa e contínua e já vomitou seis vezes, sem conseguir beber. Pressão arterial 100/70 mmHg sem queda postural, frequência cardíaca 108 bpm, tempo de enchimento capilar de 2 segundos, extremidades quentes. Hematócrito 48% (há dois dias, 39%), plaquetas 42.000/mm³. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Classifique a paciente pelo manual do Ministério da Saúde, justifique e prescreva a hidratação da primeira hora com o volume calculado. Diga os exames que pede.",
    "entrega": "O examinador informa: após a primeira hora e mais uma hora de 10 mL/kg, frequência cardíaca 94 bpm, pressão 110/72 mmHg, diurese de 70 mL/h, vômitos cessaram. Hematócrito de controle 43%. Ultrassonografia: pequena quantidade de líquido livre na pelve. Albumina 3,3 g/dL, transaminases discretamente elevadas."
   },
   {
    "n": 2,
    "tarefa": "Diga o que você conclui da reavaliação e prescreva a etapa seguinte de hidratação, com volumes e tempos. Diga o que você faria se ela não tivesse melhorado.",
    "entrega": "Internada há 30 horas, a paciente está afebril, sem dor, aceitando dieta, com pressão estável desde a expansão. Hematócrito 40% e depois 39% com 12 horas de intervalo; plaquetas 42.000, 55.000 e 71.000/mm³. O marido pede alta porque ela 'já está ótima'."
   },
   {
    "n": 3,
    "tarefa": "Decida sobre a alta, citando os critérios do manual um a um, e responda ao marido.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Classifica como grupo C por sinais de alarme (dor abdominal intensa e contínua, vômitos persistentes, aumento progressivo do hematócrito) sem sinais de choque",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Prescreve soro fisiológico 0,9% 10 mL/kg (600 mL) na primeira hora, iniciado imediatamente sem esperar exames (manual Dengue: diagnóstico e manejo clínico, Ministério da Saúde, 6ª edição, 2024)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Pede hemograma, albumina e transaminases (obrigatórios no grupo C), radiografia de tórax e ultrassonografia de abdome",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Reconhece a melhora clínica e laboratorial e prescreve a manutenção: 25 mL/kg (1.500 mL) em 6 horas e depois 25 mL/kg (1.500 mL) em 8 horas",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Sem melhora, repete a expansão até três vezes, com hematócrito a cada 2 horas, e conduz como grupo D se persistir",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Nega a alta: grupo C exige no mínimo 48 horas de internação e estabilidade hemodinâmica por 48 horas",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Cita os cinco critérios de alta: estabilidade hemodinâmica por 48 horas, ausência de febre por 24 horas, melhora visível, hematócrito normal e estável por 24 horas e plaquetas em elevação",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Reavalia sinais vitais e diurese (alvo de 1 mL/kg/h) após cada etapa, vigiando sinais de sobrecarga",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Prescreve dipirona ou paracetamol, proíbe anti-inflamatório e ácido acetilsalicílico e notifica o caso",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica ao marido, sem confronto, por que o período após a queda da febre é o de maior risco e quando a alta será segura",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-cetoacidose",
  "titulo": "Cetoacidose diabética na emergência",
  "area": "endocrino",
  "cenario": "uti",
  "tempo": 10,
  "abertura": "Você é o médico da sala de emergência, com leito de terapia intensiva disponível. Homem de 24 anos, 70 kg, diabético tipo 1, ficou sem insulina há quatro dias por falta de dinheiro. Vômitos, dor abdominal e respiração profunda e rápida. Pressão arterial 98/60 mmHg, frequência cardíaca 124 bpm, frequência respiratória 30 irpm, mucosas secas, sonolento mas orientado. Glicemia capilar 'HI'. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga quais exames definem o diagnóstico e a gravidade, e quais critérios você vai usar.",
    "entrega": "O examinador entrega: glicemia 486 mg/dL, beta-hidroxibutirato 6,8 mmol/L, pH venoso 7,08, bicarbonato 8 mmol/L, potássio 3,1 mmol/L, sódio 131 mmol/L, creatinina 1,6 mg/dL, eletrocardiograma com ondas U discretas."
   },
   {
    "n": 2,
    "tarefa": "Classifique a gravidade e prescreva as primeiras horas, na ordem: volume, potássio, insulina e bicarbonato, com doses.",
    "entrega": "Doze horas depois: glicemia 198 mg/dL, com glicose no soro desde a sexta hora; beta-hidroxibutirato 0,4 mmol/L, pH 7,34, bicarbonato 19 mmol/L, potássio 4,3 mmol/L. O paciente está acordado, com fome, e pede para comer."
   },
   {
    "n": 3,
    "tarefa": "Diga se a cetoacidose está resolvida e por quê, e descreva a transição para insulina subcutânea, com doses, e o que é preciso para a alta.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Usa os critérios do consenso ADA/EASD/JBDS/AACE/DTS 2024: glicemia de 200 mg/dL ou mais (ou diabetes conhecido), cetonemia de 3,0 mmol/L ou mais e pH abaixo de 7,3 ou bicarbonato abaixo de 18",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Classifica como grave (beta-hidroxibutirato acima de 6 mmol/L e bicarbonato abaixo de 10 mmol/L)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Prescreve cristaloide isotônico (salina ou solução balanceada) a 500 a 1.000 mL/h nas primeiras 2 a 4 horas",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "ADIA a insulina com potássio de 3,1 mmol/L e repõe potássio a 10 a 20 mmol/h até ultrapassar 3,5 mmol/L (consenso 2024)",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Inicia insulina regular IV em infusão fixa de 0,1 U/kg/h (7 U/h) quando o potássio passar de 3,5, mantendo-o entre 4 e 5 com potássio no soro",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Não prescreve bicarbonato (pH acima de 7,0) e acrescenta glicose a 5 a 10% quando a glicemia cai abaixo de 250 mg/dL, sem suspender a insulina",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Reconhece a resolução por cetonemia abaixo de 0,6 mmol/L com pH de 7,3 ou mais ou bicarbonato de 18 ou mais, sem usar ânion gap",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Faz a transição com basal subcutânea e mantém a infusão por 1 a 2 horas depois, com dose total de 0,5 a 0,6 U/kg/dia (35 a 42 U), 40 a 60% como basal e o resto como rápida às refeições",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Monitora glicemia capilar a cada 1 a 2 horas e eletrólitos, cetonemia e pH venoso a cada 4 horas",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Aborda a causa (acesso à insulina) e garante insulina, insumos, educação e retorno antes da alta",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-hipoglicemia-sulfonilureia",
  "titulo": "Hipoglicemia grave em idoso com sulfonilureia",
  "area": "endocrino",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Homem de 79 anos, 62 kg, diabético tipo 2 em uso de glibenclamida 10 mg duas vezes ao dia e metformina 850 mg três vezes ao dia, com doença renal crônica (taxa de filtração de 34 mL/min/1,73 m² pela CKD-EPI 2021). Há três dias está gripado e comendo pouco. A esposa o encontrou sonolento, suado e confuso. Glicemia capilar 34 mg/dL, pressão 146/82 mmHg, frequência cardíaca 98 bpm. Tem acesso venoso periférico. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o tratamento imediato, com a solução, o volume e o tempo, e quando você checa de novo.",
    "entrega": "Quinze minutos depois, glicemia 156 mg/dL e o paciente acorda orientado. A esposa pergunta se podem ir para casa. Noventa minutos depois, nova glicemia: 48 mg/dL, com sonolência."
   },
   {
    "n": 2,
    "tarefa": "Explique por que a hipoglicemia voltou e defina a conduta, o local e o tempo de observação, incluindo a medida específica para este caso.",
    "entrega": "Após 40 horas, 24 delas sem octreotida e com dieta oral plena, não houve nova hipoglicemia. Hemoglobina glicada 6,3%. Escala Clínica de Fragilidade 6, déficit cognitivo leve; a esposa, de 81 anos, separa os remédios."
   },
   {
    "n": 3,
    "tarefa": "Defina o plano de alta: o que você suspende, ajusta ou mantém na prescrição antidiabética, a meta glicêmica e as orientações.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Prescreve glicose IV de 15 a 20 g: glicose a 20% 100 mL ou a 10% 200 mL em cerca de 15 minutos (ou 30 a 40 mL a 50% em veia calibrosa), com nova glicemia em 10 a 15 minutos (JBDS 2023)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Reconhece hipoglicemia nível 3 (alteração mental que exige ajuda de terceiros, ADA 2026)",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Explica a recorrência pela ação longa da glibenclamida somada aos metabólitos ativos que acumulam na doença renal",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Não libera: interna para observação prolongada (risco sustentado por 24 a 36 horas ou mais com sulfonilureia e rim ruim), com glicose contínua, dieta e glicemia capilar frequente",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Prescreve octreotida 50 mcg SC de 6/6 h na hipoglicemia recorrente por sulfonilureia, além da glicose (SBTox); sabe que o glucagon rende pouco neste cenário",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Suspende a glibenclamida definitivamente (Beers 2023: evitar sulfonilureias, sobretudo as de ação longa; SBD: contraindicada com filtração abaixo de 60)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Reduz a dose da metformina por filtração entre 30 e 45 mL/min e, se precisar de outro fármaco, escolhe um de baixo risco de hipoglicemia (inibidor de DPP-4 ou de SGLT2)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Define meta de glicada abaixo de 8,0% para idoso com saúde complexa (ADA 2026), sem perseguir valores baixos",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente e à esposa o motivo da internação e da troca do remédio, ensina a reconhecer e tratar hipoglicemia e entrega lista escrita da nova prescrição",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Reconcilia toda a medicação na alta e agenda revisão precoce com glicemia capilar domiciliar",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-crise-tireotoxica",
  "titulo": "Crise tireotóxica na emergência",
  "area": "endocrino",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Mulher de 34 anos, 58 kg, com doença de Graves, parou o metimazol por conta própria há dois meses. Há três dias tem tosse produtiva e febre. Chega agitada, mas orientada, com diarreia desde ontem. Temperatura 39,1 °C, frequência cardíaca 146 bpm irregular, pressão arterial 132/68 mmHg, frequência respiratória 26 irpm, saturação 93% em ar ambiente, crepitações nas bases pulmonares, bócio difuso e tremor fino. O eletrocardiograma mostra fibrilação atrial. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga sua hipótese, calcule a escala de Burch-Wartofsky com os dados disponíveis e interprete o resultado. Diga quais exames você pede.",
    "entrega": "O examinador entrega: TSH abaixo de 0,01 mUI/L, T4 livre 7,2 ng/dL (referência 0,9 a 1,7), teste de gravidez negativo, radiografia com consolidação em lobo inferior direito, enzimas hepáticas normais, potássio 3,8 mmol/L."
   },
   {
    "n": 2,
    "tarefa": "Prescreva o tratamento da crise na ordem correta, com drogas, doses e intervalo entre elas, e as medidas de suporte.",
    "entrega": "Quarenta minutos depois da primeira dose de propranolol oral, pressão 82/50 mmHg, frequência cardíaca 138 bpm, extremidades frias. O ecocardiograma à beira do leito mostra ventrículo esquerdo dilatado com fração de ejeção estimada em 25%."
   },
   {
    "n": 3,
    "tarefa": "Diga o que mudou, o que você suspende, o que mantém e para onde a paciente vai. Diga o que fará se não houver resposta em 24 a 48 horas.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Calcula Burch-Wartofsky acima de 45 (temperatura 20, frequência 25, fibrilação atrial 10, insuficiência cardíaca 10, diarreia 10, agitação 10, precipitante 10) e conclui crise altamente sugestiva; 25 a 44 seria crise iminente",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Prescreve betabloqueador: propranolol 60 a 80 mg VO a cada 4 horas (consenso europeu de 2026 da ETA, BTA e Society for Endocrinology)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Prescreve tionamida: metimazol 60 a 80 mg/dia ou propiltiouracila 500 a 1.000 mg de ataque e 250 mg a cada 4 horas",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Prescreve iodo inorgânico SÓ pelo menos 1 hora DEPOIS da tionamida (Lugol 8 gotas ou solução saturada de iodeto de potássio 5 gotas, quatro vezes ao dia) e explica que antes ele serviria de substrato para nova síntese (ATA 2016)",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Prescreve hidrocortisona 100 mg IV de ataque e 50 mg a cada 6 horas (consenso europeu de 2026; a SBEM cita 100 mg a cada 8 horas)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Suporte: resfriamento e paracetamol, sem ácido acetilsalicílico; antibiótico para a pneumonia; hidratação",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Diante de choque com disfunção ventricular, suspende o propranolol; se ainda precisar de controle de frequência, só esmolol titulável (ataque de 500 mcg/kg em 1 minuto, manutenção até 200 mcg/kg/min), com suporte hemodinâmico",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Mantém tionamida, iodo e corticoide; sem resposta em 24 a 48 horas, revê absorção e precipitante e considera plasmaférese ou tireoidectomia total",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Interna em terapia intensiva com monitorização contínua e ecocardiograma precoce, e avalia anticoagulação da fibrilação atrial pelo CHA2DS2-VASc",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica à paciente a gravidade e a ligação com a suspensão do remédio, sem culpabilizar, e combina tratamento definitivo após a estabilização",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-avc-isquemico",
  "titulo": "Déficit neurológico agudo na emergência",
  "area": "neuro",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência de um hospital com unidade de AVC e hemodinâmica. Homem de 67 anos, hipertenso, trazido pelo SAMU com fraqueza no braço e na perna direitos e dificuldade para falar. A esposa conta que ele estava bem às 7h40, quando tomou café; agora são 9h50. Pressão arterial 196/104 mmHg, frequência cardíaca 88 bpm irregular, saturação 95% em ar ambiente. Conduza o atendimento.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas primeiras ações, na ordem, quais dados da história você confirma e quais exames pede antes de qualquer tratamento.",
    "entrega": "O examinador entrega: glicemia capilar 138 mg/dL. NIHSS de 14 (afasia, paresia braquiocrural direita, desvio do olhar para a esquerda). Tomografia sem contraste sem sangramento, ASPECTS 8. Angiotomografia: oclusão do segmento M1 da artéria cerebral média esquerda. Peso 80 kg, plaquetas 210.000/mm³, INR 1,0. Não usa anticoagulante e nega cirurgia, trauma ou sangramento recentes."
   },
   {
    "n": 2,
    "tarefa": "Decida o tratamento de reperfusão. Diga a droga, a dose calculada para este paciente, o que precisa ser feito antes de infundir e o que acontece em paralelo.",
    "entrega": "Trombólise feita às 10h18 e trombectomia com recanalização completa às 11h05. Na unidade de AVC, às 13h, pressão arterial 172/94 mmHg. A enfermeira pergunta se pode baixar a sistólica para 120 mmHg 'para proteger' e se já pode dar o AAS que ele toma em casa."
   },
   {
    "n": 3,
    "tarefa": "Responda à enfermeira: defina o alvo pressórico, o que não deve ser feito nas próximas 24 horas, a vigilância neurológica e o que você faz se ele piorar.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece AVC isquêmico com déficit incapacitante dentro de 4,5 horas do último momento visto bem (7h40), e não do momento em que foi encontrado",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Aplica o NIHSS e identifica a oclusão de grande vaso proximal (M1) como critério de trombectomia",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Reduz a pressão para menos de 185/110 mmHg antes do trombolítico, com anti-hipertensivo venoso titulável (labetalol ou nicardipina)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Prescreve tenecteplase 0,25 mg/kg em bolus único, 20 mg neste paciente (máximo 25 mg), ou alteplase 0,9 mg/kg, 72 mg com 7,2 mg em bolus e o restante em 60 minutos (AHA/ASA 2026, tenecteplase igualmente preferida)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Aciona a trombectomia em paralelo, sem esperar a resposta ao trombolítico (oclusão de M1, NIHSS 6 ou mais, ASPECTS 3 a 10, dentro de 6 horas, AHA/ASA 2026)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Mantém pressão abaixo de 180/105 mmHg nas 24 horas seguintes e recusa a meta de sistólica abaixo de 140 mmHg após recanalização, que é prejudicial (AHA/ASA 2026)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Não libera AAS nem outro antitrombótico nas primeiras 24 horas após a trombólise, até a tomografia de controle",
    "peso": 0.3
   },
   {
    "eixo": "H",
    "item": "Confere glicemia capilar e checa contraindicações ao trombolítico (sangramento, plaquetas, INR, anticoagulante, cirurgia ou AVC recente) sem atrasar a imagem",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Prescreve NIHSS seriado e, se piorar, tomografia urgente para afastar transformação hemorrágica; triagem de disfagia antes de liberar a via oral",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente e à esposa o benefício e o risco de sangramento da trombólise, e registra os horários (último visto bem, porta-agulha, punção arterial)",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-mal-epileptico",
  "titulo": "Crise convulsiva que não cessa",
  "area": "neuro",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você está na sala de emergência. Mulher de 28 anos, com epilepsia em uso de lamotrigina, chega trazida pelo SAMU em crise tônico-clônica generalizada que, segundo o socorrista, começou há 8 minutos e não parou. Não recebeu nenhuma medicação e ainda não tem acesso venoso. Peso estimado 60 kg. Pressão arterial 152/90 mmHg, frequência cardíaca 124 bpm, saturação 88% com máscara simples. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o que você faz nos primeiros 5 minutos, na ordem, e qual droga, dose e via usa agora, sem acesso venoso.",
    "entrega": "Medicação aplicada. Acesso venoso obtido. Glicemia capilar 96 mg/dL. Cinco minutos depois da primeira dose, a crise continua. O teste de gravidez na urina é positivo; a mãe conta que ela está com cerca de 8 semanas de gestação."
   },
   {
    "n": 2,
    "tarefa": "Defina a segunda linha: droga, dose calculada para 60 kg e tempo de infusão. Diga o que você evita nesta paciente e por quê.",
    "entrega": "Segunda linha infundida. Aos 35 minutos do início, ela não abre os olhos, mantém desvio ocular para a direita e mioclonias discretas na face. Saturação 89%. Gasometria: pH 7,18, lactato 6,1 mmol/L."
   },
   {
    "n": 3,
    "tarefa": "Nomeie a situação e defina a conduta: via aérea, droga com dose, monitorização e o que você investiga a seguir.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Reconhece estado de mal epiléptico (crise contínua acima de 5 minutos) e trata imediatamente",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Sem acesso venoso, aplica midazolam 10 mg intramuscular (peso acima de 40 kg), dose da diretriz da American Epilepsy Society 2016; aceita diazepam 0,15 a 0,2 mg/kg venoso (máximo 10 mg) assim que houver acesso",
    "peso": 0.8
   },
   {
    "eixo": "H",
    "item": "Decúbito lateral, aspiração, oxigênio, monitorização e glicemia capilar; tiamina antes da glicose se houver suspeita de etilismo ou desnutrição",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Na falha do benzodiazepínico, infunde segunda linha em dose plena como no ESETT (2019): levetiracetam 60 mg/kg, 3.600 mg (máximo 4.500 mg) em 10 minutos, ou fosfenitoína 20 mg/kg em equivalentes de fenitoína (fenitoína 20 mg/kg a no máximo 50 mg/min com monitor)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Evita valproato na gestante pela teratogenicidade, mesmo sendo eficaz no ESETT",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Nomeia estado de mal refratário (falha de benzodiazepínico e de um anticrise) e suspeita de crise não convulsiva pela mioclonia facial sem despertar",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Intuba em sequência rápida e inicia infusão contínua de anestésico: midazolam 0,2 mg/kg em bolus (12 mg) e 0,05 a 2 mg/kg/h, ou propofol",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Pede eletroencefalograma contínuo, sabendo que o bloqueador neuromuscular mascara a crise clínica",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Investiga a causa: sódio, cálcio, magnésio, adesão e nível de lamotrigina (cai na gestação), tomografia de crânio, toxicológico e punção lombar se febre ou sem causa aparente",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Comunica à família a gravidade e a ida para terapia intensiva, e aciona a obstetrícia",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-hda-varicosa",
  "titulo": "Hematêmese em paciente cirrótico",
  "area": "gastro",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Homem de 54 anos, etilista, com cirrose conhecida, chega com dois episódios de hematêmese volumosa na última hora. Está pálido e sonolento, mas responde ao chamado. Pressão arterial 88/54 mmHg, frequência cardíaca 122 bpm, saturação 95% em ar ambiente. Peso 70 kg. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga as ações dos primeiros 15 minutos, na ordem, incluindo os medicamentos que você prescreve antes da endoscopia, com dose.",
    "entrega": "O examinador entrega: hemoglobina 6,4 g/dL, plaquetas 58.000/mm³, INR 1,9, bilirrubina total 3,4 mg/dL, albumina 2,6 g/dL, creatinina 1,1 mg/dL. Ascite leve à ultrassonografia, sem encefalopatia. Após 500 mL de cristaloide, pressão 98/60 mmHg. O residente sugere transfundir até hemoglobina de 10 g/dL e dar plasma fresco para corrigir o INR."
   },
   {
    "n": 2,
    "tarefa": "Responda ao residente, defina a estratégia transfusional e o momento da endoscopia, e calcule o Child-Pugh.",
    "entrega": "Endoscopia em 6 horas: varizes esofágicas de grosso calibre, uma com sangramento ativo em jato; feita ligadura elástica com hemostasia. Paciente estável na sala de observação."
   },
   {
    "n": 3,
    "tarefa": "Defina a conduta das próximas 72 horas e a prevenção de novo sangramento, justificando cada decisão.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Protege a via aérea (intubação se rebaixamento ou hematêmese incontrolável antes da endoscopia), dois acessos calibrosos, tipagem e reserva de hemácias",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Inicia vasoativo já na suspeita, antes da endoscopia: terlipressina 2 mg IV a cada 4 horas, ou octreotida 50 mcg em bolus e 50 mcg/h, mantido por 2 a 5 dias (Baveno VII, 2022)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Prescreve antibiótico profilático: ceftriaxona 1 g/dia por até 7 dias (Baveno VII, 2022)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Transfusão restritiva: transfunde com hemoglobina abaixo de 7 g/dL e mira 7 a 8 g/dL, recusando o alvo de 10 g/dL, que aumenta o ressangramento (Baveno VII, 2022)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Não corrige o INR com plasma nem transfunde plaquetas pelo número, e não usa ácido tranexâmico",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Faz endoscopia em até 12 horas, após estabilização, com eritromicina 250 mg IV 30 a 120 minutos antes se não houver QT longo",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Calcula Child-Pugh C de 11 pontos e indica TIPS preemptivo em até 72 horas, idealmente nas primeiras 24 horas (Baveno VII, 2022: Child-Pugh C de 10 a 13, ou B acima de 7 com sangramento ativo na endoscopia)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Sem TIPS, planeja profilaxia secundária com betabloqueador não seletivo (propranolol ou carvedilol) e ligadura elástica seriada, iniciados após a estabilização",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente e à família a gravidade, aborda a abstinência alcoólica sem julgamento e encaminha para avaliação de transplante",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-ascite-febre",
  "titulo": "Cirrótico com ascite e febre na enfermaria",
  "area": "gastro",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você é chamado à enfermaria. Homem de 61 anos, com cirrose alcoólica, internado há 5 dias para tratar ascite volumosa com furosemida 40 mg e espironolactona 100 mg por dia. Hoje tem febre de 38,3 °C, dor abdominal difusa leve e está mais lentificado. Pressão arterial 104/62 mmHg, frequência cardíaca 102 bpm. Plaquetas 64.000/mm³, INR 1,8. Peso 72 kg. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga qual procedimento você faz agora, se precisa corrigir a coagulação antes, como colhe e envia a amostra, e quais outros exames pede.",
    "entrega": "O examinador entrega: líquido ascítico turvo com 820 células/mm³, sendo 640 polimorfonucleares/mm³; proteína total 0,9 g/dL, glicose 98 mg/dL, DHL abaixo do limite superior sérico, gradiente soro-ascite de albumina 1,9 g/dL, Gram sem bactérias. Creatinina 1,5 mg/dL (0,9 na admissão), bilirrubina 4,6 mg/dL, sódio 128 mEq/L."
   },
   {
    "n": 2,
    "tarefa": "Dê o diagnóstico, diga por que não é peritonite secundária, escolha o antibiótico justificando e prescreva a medida que mais reduz a mortalidade neste paciente, com a dose.",
    "entrega": "Após 48 horas: polimorfonucleares no líquido 210/mm³ e febre resolvida. Creatinina 2,3 mg/dL, diurese de 400 mL em 24 horas, pressão 98/58 mmHg. Sedimento urinário normal, sem proteinúria."
   },
   {
    "n": 3,
    "tarefa": "Interprete a resposta ao antibiótico e a função renal, defina a conduta escalonada e o plano de prevenção para depois da alta.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Faz paracentese diagnóstica imediata, antes do antibiótico, sem corrigir INR nem transfundir plaquetas",
    "peso": 0.7
   },
   {
    "eixo": "H",
    "item": "Inocula o líquido à beira do leito em frascos de hemocultura (10 mL em cada) e envia celularidade com diferencial, proteína, glicose, DHL, albumina e Gram; colhe hemoculturas e urocultura",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Diagnostica peritonite bacteriana espontânea por polimorfonucleares de 250/mm³ ou mais no líquido ascítico",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Afasta peritonite secundária: proteína abaixo de 1 g/dL, glicose acima de 50 mg/dL e DHL normal, Gram sem flora mista",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Classifica como infecção hospitalar (mais de 48 horas de internação) e escolhe piperacilina-tazobactam ou carbapenêmico conforme a resistência local, não cefalosporina de terceira geração (EASL 2018)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Prescreve albumina 1,5 g/kg em até 6 horas do diagnóstico (108 g) e 1 g/kg no terceiro dia (72 g), indicada por creatinina acima de 1 mg/dL e bilirrubina acima de 4 mg/dL (EASL 2018; AASLD 2021)",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Suspende diuréticos e evita anti-inflamatório e outros nefrotóxicos",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Reconhece resposta adequada (queda de polimorfonucleares acima de 25% em 48 horas) e lesão renal aguda estágio 2; expande com albumina 1 g/kg/dia por 2 dias (máximo 100 g/dia) e, sem resposta e com critérios de síndrome hepatorrenal, inicia terlipressina com albumina",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Planeja profilaxia secundária contínua (norfloxacino 400 mg/dia ou ciprofloxacino) e encaminha para avaliação de transplante",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente e à família a infecção e o risco renal; registra diurese e creatinina diárias",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-neutropenia-febril",
  "titulo": "Febre após quimioterapia",
  "area": "onco",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Mulher de 47 anos, com câncer de mama em quimioterapia adjuvante com doxorrubicina e ciclofosfamida, último ciclo há 10 dias, chega com febre de 38,6 °C medida em casa há 1 hora. Tem cateter venoso totalmente implantado. Pressão arterial 118/74 mmHg, frequência cardíaca 104 bpm, frequência respiratória 18 irpm, saturação 97% em ar ambiente. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o que você faz e em quanto tempo, quais culturas colhe e de onde, e qual antibiótico prescreve, com a dose.",
    "entrega": "O examinador entrega: neutrófilos 240/mm³, hemoglobina 10,1 g/dL, plaquetas 98.000/mm³, creatinina 0,8 mg/dL, lactato 1,4 mmol/L. Radiografia de tórax normal. Sem sintomas além da febre, sem comorbidades, sem desidratação, pele no local do cateter sem alterações. Ela mora a 15 minutos do hospital, com o marido, e pergunta se pode ir para casa."
   },
   {
    "n": 2,
    "tarefa": "Estratifique o risco com o escore validado, mostrando a conta, e diga onde e como ela será tratada.",
    "entrega": "Ainda na observação, 2 horas depois de o cateter ser lavado para colher a cultura, ela tem calafrios intensos. Pressão 84/50 mmHg, frequência cardíaca 128 bpm, hiperemia de 2 cm ao redor do cateter."
   },
   {
    "n": 3,
    "tarefa": "Reclassifique a paciente, defina a conduta imediata e o ajuste do esquema antimicrobiano, justificando cada mudança.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Trata a neutropenia febril como emergência e prescreve antibiótico venoso em até 60 minutos da chegada, sem esperar o hemograma (ASCO/IDSA 2018)",
    "peso": 0.8
   },
   {
    "eixo": "H",
    "item": "Colhe dois pares de hemocultura antes do antibiótico, um pelo cateter e um periférico, sem atrasar a primeira dose",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Escolhe betalactâmico antipseudomonas em monoterapia: cefepima 2 g IV a cada 8 horas (ou piperacilina-tazobactam 4,5 g a cada 6 horas, ou meropenem), sem vancomicina de rotina (IDSA 2010)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Calcula MASCC de 26 pontos (sintomas leves 5, sem hipotensão 5, sem DPOC 4, tumor sólido 4, sem desidratação 3, ambulatorial 3, menos de 60 anos 2) e classifica como baixo risco (21 ou mais)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Só admite tratamento ambulatorial após a primeira dose venosa e observação de pelo menos 4 horas, com ciprofloxacino e amoxicilina-clavulanato por via oral, cuidador, telefone e acesso rápido ao hospital (ASCO/IDSA 2018)",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Reclassifica como alto risco diante da hipotensão e cancela o plano ambulatorial",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Acrescenta vancomicina por instabilidade hemodinâmica e suspeita de infecção do cateter (IDSA 2010) e amplia a cobertura para gram-negativo resistente conforme a epidemiologia local",
    "peso": 0.8
   },
   {
    "eixo": "H",
    "item": "Ressuscita com cristaloide 30 mL/kg, repete o lactato e pede vaga em terapia intensiva; noradrenalina se a pressão média seguir abaixo de 65 mmHg após o volume",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Planeja suspender a vancomicina em 48 a 72 horas se as culturas não mostrarem gram-positivo, e retirar o cateter se Staphylococcus aureus, Pseudomonas, fungo, infecção de túnel ou bacteremia persistente",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica à paciente a mudança de plano e o motivo da internação, sem minimizar o risco",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-sangramento-doac",
  "titulo": "Hemorragia em uso de anticoagulante oral direto",
  "area": "hemato",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Mulher de 78 anos, com fibrilação atrial, hipertensa e diabética, em uso de apixabana 5 mg duas vezes ao dia, chega 2 horas após o início de cefaleia intensa, vômitos e fraqueza no braço esquerdo. Pressão arterial 192/98 mmHg, frequência cardíaca 84 bpm irregular, Glasgow 14. Peso 62 kg. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga o que você pergunta e pede imediatamente, e qual informação sobre o anticoagulante muda a conduta.",
    "entrega": "O examinador entrega: última dose de apixabana há 4 horas. Tomografia de crânio: hematoma intraparenquimatoso em núcleos da base à direita, volume estimado de 18 mL, sem extensão ventricular. Creatinina 1,2 mg/dL, plaquetas 190.000/mm³, INR 1,3. Dosagem de anti-Xa indisponível. O hospital tem complexo protrombínico de 4 fatores e idarucizumabe, e não tem andexanete."
   },
   {
    "n": 2,
    "tarefa": "Prescreva a reversão com droga e dose calculada, o alvo de pressão e as medidas associadas. Diga o que mudaria se ela usasse dabigatrana.",
    "entrega": "Hematoma estável na tomografia de 24 horas. No 10º dia ela está alerta, com paresia leve à esquerda, e tem CHA2DS2-VASc de 5 pontos. O filho pergunta se ela vai voltar a tomar o anticoagulante e quando."
   },
   {
    "n": 3,
    "tarefa": "Responda ao filho: diga se e quando retomar a anticoagulação, os fatores que pesam na decisão e a alternativa se o risco de nova hemorragia for alto.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Pergunta o horário da última dose e pede creatinina, porque dose recente e função renal definem o efeito residual; não usa TP ou TTPA normais para afastar efeito da apixabana",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Suspende o anticoagulante, pede tomografia de crânio sem contraste imediata e monitoriza Glasgow e déficit",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Prescreve complexo protrombínico de 4 fatores 50 U/kg, cerca de 3.100 UI (faixa de 25 a 50 U/kg na AHA/ASA 2022 para hemorragia intracerebral), sem esperar exame",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Sabe que o andexanete melhorou a hemostasia no ANNEXA-I (2024) à custa de mais trombose e saiu do mercado americano em 2025, e não atrasa a reversão por ele",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Se dabigatrana, prescreve idarucizumabe 5 g IV, em duas doses de 2,5 g (ACC 2020)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Reduz a sistólica para cerca de 140 mmHg, sem baixar de 130 mmHg (AHA/ASA 2022 para hemorragia intracerebral)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Não usa ácido tranexâmico, plasma ou plaquetas como reversão",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Responde que a retomada é possível e tende a favorecer a paciente (hematoma profundo hipertensivo, alto risco embólico), discutida por volta de 7 a 8 semanas (AHA/ASA 2022, recomendação fraca), e cita oclusão do apêndice atrial esquerdo se o risco de recidiva for alto (hematoma lobar, angiopatia amiloide)",
    "peso": 0.7
   },
   {
    "eixo": "H",
    "item": "Interna em unidade de AVC ou terapia intensiva e pede tomografia de controle para detectar expansão do hematoma",
    "peso": 0.2
   },
   {
    "eixo": "A",
    "item": "Explica ao filho os riscos dos dois lados (nova hemorragia e AVC isquêmico), decide com a família e a neurologia e registra a decisão",
    "peso": 0.4
   }
  ]
 },
 {
  "id": "est-monoartrite",
  "titulo": "Monoartrite aguda na emergência",
  "area": "reumato",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista da emergência. Homem de 66 anos com dor, calor e aumento de volume no joelho direito iniciados há 20 horas, que o impedem de andar. Temperatura 37,9 °C, pressão arterial 146/88 mmHg, frequência cardíaca 96 bpm. Tem hipertensão e doença renal crônica e teve dor semelhante no hálux há seis meses, que passou sozinha. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga suas hipóteses principais e qual é o primeiro exame que você faz, antes de qualquer medicação.",
    "entrega": "O examinador entrega a artrocentese: líquido turvo, 38.000 leucócitos/mm³ com 85% de neutrófilos, cristais em agulha intracelulares com birrefringência negativa à luz polarizada, Gram sem bactérias, cultura em andamento. Sangue: creatinina 2,4 mg/dL (taxa de filtração de 29 mL/min/1,73 m² pelo CKD-EPI 2021), ácido úrico 6,3 mg/dL, proteína C reativa 11 mg/dL. Ele conta úlcera péptica com sangramento há um ano."
   },
   {
    "n": 2,
    "tarefa": "Interprete o líquido sinovial, diga se a infecção está afastada e prescreva o tratamento da crise para este paciente, dizendo o que você não usa e por quê.",
    "entrega": "Em 48 horas, a cultura do líquido e as hemoculturas são negativas e a dor caiu de 9 para 3. É a terceira crise em 12 meses. Ele usa hidroclorotiazida 25 mg e anlodipino 10 mg por dia."
   },
   {
    "n": 3,
    "tarefa": "Defina a prevenção: se há indicação de hipouricemiante, qual droga, dose inicial, alvo e duração, e o que você muda na prescrição de base.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Faz a artrocentese antes de antibiótico ou anti-inflamatório e envia o líquido para celularidade, cristais à luz polarizada, Gram e cultura, com hemoculturas pela febre",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Lista artrite séptica, gota e doença por pirofosfato de cálcio como hipóteses, tratando a monoartrite como séptica até prova em contrário",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Identifica cristais de urato e afirma que cristal e Gram negativo não excluem infecção concomitante: aguarda a cultura e reavalia",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Explica que ácido úrico normal durante a crise não afasta gota",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Trata a crise com glicocorticoide (prednisolona 30 a 35 mg/dia por 3 a 5 dias, EULAR 2016; primeira linha pelo ACR 2020) e justifica não usar anti-inflamatório (úlcera com sangramento e filtração de 29) nem colchicina (insuficiência renal grave)",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Indica hipouricemiante por duas ou mais crises ao ano (ACR 2020, recomendação forte) com alopurinol em dose inicial baixa (até 100 mg/dia, menos na doença renal crônica), titulado até ácido úrico abaixo de 6 mg/dL, por tempo indefinido",
    "peso": 0.9
   },
   {
    "eixo": "C",
    "item": "Associa profilaxia anti-inflamatória por 3 a 6 meses ao iniciar o hipouricemiante, com fármaco compatível com a função renal",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Troca a hidroclorotiazida por outro anti-hipertensivo, de preferência losartana (ACR 2020, recomendação condicional)",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Explica ao paciente que o hipouricemiante é contínuo e não deve ser suspenso nas crises",
    "peso": 0.3
   }
  ]
 },
 {
  "id": "est-risco-suicidio",
  "titulo": "Risco de suicídio no pronto-socorro",
  "area": "psiq",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Você é o plantonista do pronto-socorro. Homem de 44 anos foi trazido pelo SAMU após cortes profundos no punho esquerdo, já suturados pela cirurgia. Está lúcido, sem sinais de intoxicação, pressão arterial 124/78 mmHg, frequência cardíaca 88 bpm, hemoglobina 12,8 g/dL. Ele diz que 'foi uma bobagem' e pede para ir embora. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Faça a avaliação do risco de suicídio. Diga as perguntas que você faz, na ordem.",
    "entrega": "Ele responde: pensa em morrer há três semanas, desde a demissão e a separação; escolheu o dia e deixou uma carta para o filho; tentou enforcamento há dois anos; bebe meia garrafa de destilado por dia; mora sozinho e há uma arma de fogo em casa. Diz: 'da próxima vez eu faço direito'."
   },
   {
    "n": 2,
    "tarefa": "Diga como você entende o risco, qual é a conduta e o que você faz agora para manter o paciente seguro dentro do pronto-socorro.",
    "entrega": "Enquanto você fala, ele se levanta, diz que vai embora e que ninguém pode segurá-lo. A irmã acaba de chegar e pergunta o que está acontecendo."
   },
   {
    "n": 3,
    "tarefa": "Responda ao paciente, converse com a irmã e diga o que você registra e notifica, para quem e em que prazo.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Pergunta de forma direta e progressiva: ideação e frequência, plano, intenção, preparativos (carta), tentativas prévias, acesso a meios letais, uso de álcool e fatores de proteção",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Reconhece risco elevado e iminente pelos achados (tentativa prévia, plano com preparativos, intenção declarada, arma em casa, álcool, isolamento), sem decidir alta por escala isolada (NICE NG225, 2022)",
    "peso": 0.8
   },
   {
    "eixo": "H",
    "item": "Mantém o paciente seguro no pronto-socorro: observação contínua sem deixá-lo sozinho, leito à vista da enfermagem, retirada de objetos cortantes, cordões e medicamentos dos pertences",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Indica internação e avaliação psiquiátrica; diante da recusa com risco iminente, indica internação involuntária com laudo médico circunstanciado, comunicada ao Ministério Público em até 72 horas (Lei 10.216/2001)",
    "peso": 0.9
   },
   {
    "eixo": "A",
    "item": "Responde à tentativa de saída com calma e sem confronto, explica por que não pode liberá-lo agora e aciona a equipe de segurança se houver risco de evasão",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Compartilha com a irmã o necessário para proteger a vida (justa causa, Código de Ética Médica art. 73), sem expor detalhes além disso, e a inclui no plano",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Orienta a família a retirar a arma de fogo de casa e a guardar os medicamentos (restrição de meios)",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Notifica a tentativa de suicídio na ficha de violência interpessoal e autoprovocada do SINAN, de forma sigilosa (Lei 13.819/2019), com comunicação imediata, em até 24 horas, à vigilância do município",
    "peso": 0.5
   }
  ]
 },
 {
  "id": "est-lra-enfermaria",
  "titulo": "Queda da diurese na enfermaria",
  "area": "nefro",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você acompanha na enfermaria uma mulher de 72 anos, 60 kg, internada há quatro dias por pneumonia, em uso de piperacilina-tazobactam e vancomicina. Toma losartana 50 mg e hidroclorotiazida 25 mg por dia e recebeu cetoprofeno para dor nos últimos dois dias. A creatinina da admissão era 0,9 mg/dL; hoje é 2,0 mg/dL. Diurese de 240 mL nas últimas 12 horas. Pressão arterial 102/60 mmHg, frequência cardíaca 104 bpm. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Defina e estadie a lesão renal, diga o que você examina à beira do leito e quais exames pede.",
    "entrega": "O examinador informa: mucosas secas, sem edema, estertores apenas na base direita, já conhecidos. Ureia 98 mg/dL, potássio 5,4 mEq/L, bicarbonato 20 mEq/L. Urina: sódio 24 mEq/L, fração de excreção de sódio 1,6%, fração de excreção de ureia 28%, sedimento sem cilindros granulosos. Ultrassom sem hidronefrose. Vale de vancomicina 28 mg/L."
   },
   {
    "n": 2,
    "tarefa": "Interprete os índices urinários, diga se é pré-renal ou necrose tubular e o que você faz com cada medicamento da prescrição.",
    "entrega": "Trinta e seis horas depois, apesar das medidas, a diurese é de 150 mL em 24 horas. Ela está dispneica, com estertores bilaterais e saturação de 88% com 3 L/min de oxigênio. Potássio 6,8 mEq/L com ondas T apiculadas, pH 7,16, bicarbonato 11 mEq/L, ureia 210 mg/dL. Furosemida 80 mg endovenosa sem resposta."
   },
   {
    "n": 3,
    "tarefa": "Diga se há indicação de diálise agora, quais critérios ela preenche e o que você faz enquanto a diálise é providenciada.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "C",
    "item": "Define lesão renal aguda e estadia como KDIGO 2 (creatinina 2,2 vezes a basal e diurese abaixo de 0,5 mL/kg/h por 12 horas; KDIGO 2012)",
    "peso": 0.8
   },
   {
    "eixo": "H",
    "item": "Avalia a volemia à beira do leito (mucosas, pressão, perfusão, sinais de congestão) e pede sedimento, índices urinários, ultrassom de rins e vias urinárias e potássio",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Reconhece que a fração de excreção de sódio perde valor sob diurético e usa a fração de excreção de ureia abaixo de 35% para classificar como pré-renal",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Suspende o anti-inflamatório, a losartana e a hidroclorotiazida",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Reavalia a vancomicina pelo nível sérico alto e pela associação com piperacilina-tazobactam, ajustando ou trocando o esquema pela função renal e pelas culturas",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Repõe cristaloide em alíquotas, reavaliando resposta e sinais de congestão a cada etapa",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Identifica indicação de diálise de urgência: hipercalemia com alteração eletrocardiográfica, acidose metabólica grave e sobrecarga de volume refratária a diurético",
    "peso": 0.9
   },
   {
    "eixo": "H",
    "item": "Faz a ponte até a diálise: gluconato de cálcio, insulina com glicose, suporte ventilatório e contato imediato com a nefrologia para o cateter",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Comunica a piora e a necessidade de diálise à paciente e à família e registra a revisão de cada fármaco",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-delirium-idoso",
  "titulo": "Confusão aguda no idoso internado",
  "area": "geriatria",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você é chamado à noite à enfermaria: mulher de 84 anos, internada há três dias por infecção urinária, em uso de ciprofloxacino, com sonda vesical passada no pronto-socorro sem indicação registrada. A filha conta que ontem ela conversava normalmente e hoje 'não fala coisa com coisa', alterna sonolência e agitação e tenta tirar o acesso. Na prescrição: prometazina 25 mg à noite para dormir, oxibutinina 5 mg duas vezes ao dia (uso domiciliar) e diazepam 10 mg se agitação, deixado pelo plantão anterior. Pressão 132/76 mmHg, frequência cardíaca 92 bpm, temperatura 36,9 °C, saturação 95%, glicemia capilar 118 mg/dL. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga como você confirma o diagnóstico à beira do leito, aplicando o instrumento, e o que você procura no exame e nos exames.",
    "entrega": "O examinador informa: ela não consegue dizer os meses do ano de trás para frente, perde o fio da conversa e o nível de consciência oscila. Antes da internação era independente e sem diagnóstico de demência. Sódio 128 mEq/L, ureia 70 mg/dL, creatinina 1,3 mg/dL (basal 0,8), hemograma sem alteração nova. Última evacuação há cinco dias."
   },
   {
    "n": 2,
    "tarefa": "Nomeie o diagnóstico, liste os fatores precipitantes que você identificou e diga o que muda na prescrição e no cuidado.",
    "entrega": "Duas horas depois, ela grita que há homens no quarto, arrancou o acesso venoso e tenta pular a grade da cama. A reorientação pela filha não a acalmou. Eletrocardiograma com QTc de 440 ms. Não tem doença de Parkinson."
   },
   {
    "n": 3,
    "tarefa": "Decida se usa medicamento, qual, dose, via e duração, e o que você não usa.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Aplica o CAM: início agudo e curso flutuante, desatenção testada de forma objetiva (meses ao contrário) e pensamento desorganizado ou alteração do nível de consciência",
    "peso": 0.8
   },
   {
    "eixo": "C",
    "item": "Diagnostica delirium de forma mista e o separa de demência pela função prévia relatada pela filha",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Identifica os precipitantes: hiponatremia, desidratação com lesão renal, constipação, sonda vesical, infecção e fármacos anticolinérgicos e sedativos",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Suspende prometazina, oxibutinina e o diazepam (anticolinérgicos e benzodiazepínico a evitar no delirium, Critérios de Beers AGS 2023) e revisa o ciprofloxacino",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Retira a sonda vesical sem indicação, corrige a volemia e o sódio e trata a constipação",
    "peso": 0.5
   },
   {
    "eixo": "H",
    "item": "Prescreve medidas não farmacológicas: reorientação, família presente, óculos e aparelho auditivo, sono noturno protegido, mobilização precoce e nenhuma contenção física",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Usa antipsicótico só pela agitação com risco após falha da desescalada: haloperidol em dose baixa (0,5 mg oral ou intramuscular), pelo menor tempo, em geral uma semana ou menos (NICE CG103), reavaliado a cada 24 horas",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Não usa benzodiazepínico para a agitação (piora o delirium fora da abstinência) e acompanha o QTc durante o antipsicótico",
    "peso": 0.3
   },
   {
    "eixo": "A",
    "item": "Explica à filha o que é delirium, que costuma ser reversível, e a envolve na reorientação",
    "peso": 0.2
   }
  ]
 },
 {
  "id": "est-declaracao-obito",
  "titulo": "Óbito na enfermaria e comunicação com a família",
  "area": "sus",
  "cenario": "enf",
  "tempo": 10,
  "abertura": "Você é o plantonista noturno da enfermaria de clínica médica. Às 3 horas, a enfermagem chama: homem de 79 anos, internado há nove dias, foi encontrado sem resposta. Tem insuficiência cardíaca com fração de ejeção de 25% e decisão de não reanimar registrada no prontuário. O médico assistente só chega às 8 horas. A filha está na sala de espera. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga como você constata o óbito e quem deve fornecer a declaração de óbito neste caso.",
    "entrega": "Ao revisar o prontuário, você lê a nota de admissão: internado após queda da própria altura em casa, com fratura de fêmur operada há sete dias; evoluiu com descompensação da insuficiência cardíaca e pneumonia."
   },
   {
    "n": 2,
    "tarefa": "Diga se esse dado muda quem fornece a declaração e para onde vai o corpo, e em que situação o caso seria do Serviço de Verificação de Óbito.",
    "entrega": "A filha entra na sala, emocionada, e pergunta: 'Ele estava melhorando ontem. O que aconteceu? E por que vão levar meu pai para a polícia?'"
   },
   {
    "n": 3,
    "tarefa": "Comunique o óbito à filha e responda à pergunta dela. Diga suas palavras.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Constata o óbito pelo exame (ausência de pulso central, de movimentos respiratórios e de bulhas à ausculta, pupilas fixas) e registra a hora no prontuário",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Sabe que, na morte natural do paciente internado, a declaração é do médico assistente e, na falta dele, do médico substituto da instituição, o plantonista, sem esperar as 8 horas (Res. CFM 1.779/2005; Código de Ética Médica arts. 83 e 84)",
    "peso": 0.7
   },
   {
    "eixo": "C",
    "item": "Reconhece que a cadeia de eventos começou na queda (causa externa) e que a morte, mesmo dias depois, é não natural: o corpo vai ao IML e a declaração é fornecida pelo médico legista, não pelo plantonista",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Situa o Serviço de Verificação de Óbito na morte natural sem assistência médica (Res. CFM 1.779/2005), o que não se aplica a este paciente",
    "peso": 0.5
   },
   {
    "eixo": "C",
    "item": "Aciona o fluxo da instituição para o encaminhamento ao IML, com comunicação à autoridade policial, e registra no prontuário a sequência de eventos desde a queda",
    "peso": 0.4
   },
   {
    "eixo": "H",
    "item": "Prepara o ambiente (sala reservada, sentado, sem interrupções) e pergunta o que a filha sabe antes de informar",
    "peso": 0.6
   },
   {
    "eixo": "H",
    "item": "Dá um aviso prévio e comunica a morte usando a palavra 'morreu' ou 'faleceu', sem eufemismo nem jargão",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Acolhe a emoção com silêncio e empatia, sem preencher o momento com explicação técnica",
    "peso": 0.5
   },
   {
    "eixo": "A",
    "item": "Explica que o IML é exigência legal porque a internação começou com uma queda, não uma suspeita contra a família ou a equipe, e informa os próximos passos para a liberação do corpo",
    "peso": 0.4
   }
  ]
 },
 {
  "id": "est-dpoc-exacerbacao",
  "titulo": "Exacerbação de DPOC na emergência",
  "area": "pneumo",
  "cenario": "emg",
  "tempo": 10,
  "abertura": "Homem de 70 anos, com DPOC e VEF1 de 38% do previsto, ex-tabagista, chega com piora da dispneia há três dias, aumento do volume do escarro, que ficou esverdeado. Frequência respiratória 30 irpm, frequência cardíaca 112 bpm, pressão arterial 150/90 mmHg, temperatura 37,6 °C, saturação 84% em ar ambiente, uso de musculatura acessória, sonolento mas responde ao chamado. Conduza.",
  "etapas": [
   {
    "n": 1,
    "tarefa": "Diga as primeiras medidas, o alvo de saturação e os exames que você pede, incluindo os diagnósticos diferenciais que quer afastar.",
    "entrega": "O examinador entrega: com máscara de Venturi a 28%, saturação de 90%. Gasometria arterial: pH 7,28, PaCO2 68 mmHg, PaO2 58 mmHg, bicarbonato 31 mEq/L. Radiografia de tórax sem consolidação nem pneumotórax. Eletrocardiograma com taquicardia sinusal. Leucócitos 13.000/mm³."
   },
   {
    "n": 2,
    "tarefa": "Interprete a gasometria e prescreva o tratamento completo: broncodilatador, corticoide com dose e duração, antibiótico (se indicado, qual, por quanto tempo e por quê) e suporte ventilatório.",
    "entrega": "Após 2 horas de ventilação não invasiva bem ajustada: pH 7,21, PaCO2 82 mmHg, Glasgow 9, sem conseguir eliminar secreção."
   },
   {
    "n": 3,
    "tarefa": "Decida a conduta seguinte, onde o paciente fica e o que você comunica à família.",
    "entrega": "Encerramento da estação."
   }
  ],
  "espelho": [
   {
    "eixo": "H",
    "item": "Oferece oxigênio controlado por máscara de Venturi com alvo de saturação de 88% a 92%, monitoriza e colhe gasometria arterial precoce",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Pede radiografia e eletrocardiograma e cita diferenciais: pneumonia, pneumotórax, insuficiência cardíaca, embolia pulmonar e arritmia",
    "peso": 0.3
   },
   {
    "eixo": "C",
    "item": "Interpreta acidose respiratória aguda sobre crônica (pH 7,28 e PaCO2 68 mmHg com bicarbonato elevado)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Indica ventilação não invasiva por acidose respiratória (PaCO2 de 45 mmHg ou mais e pH de 7,35 ou menos) com fadiga, em unidade monitorizada (GOLD 2026)",
    "peso": 1.0
   },
   {
    "eixo": "C",
    "item": "Prescreve beta-2 agonista de curta duração com ou sem antimuscarínico de curta duração, nebulizado com ar comprimido e não com oxigênio",
    "peso": 0.4
   },
   {
    "eixo": "C",
    "item": "Prescreve prednisona 40 mg por dia por 5 dias, via oral equivalente à endovenosa (GOLD 2026)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Indica antibiótico por 5 dias pelo escarro purulento com aumento de volume e de dispneia e pela ventilação, com amoxicilina-clavulanato, macrolídeo ou doxiciclina conforme a resistência local (GOLD 2026)",
    "peso": 0.6
   },
   {
    "eixo": "C",
    "item": "Reconhece a falha da ventilação não invasiva (piora do pH e do nível de consciência) e indica intubação orotraqueal sem atraso, com transferência para a terapia intensiva",
    "peso": 0.6
   },
   {
    "eixo": "A",
    "item": "Verifica se há diretiva antecipada sobre intubação e comunica à família a gravidade e a decisão em linguagem clara",
    "peso": 0.3
   }
  ]
 }
];
