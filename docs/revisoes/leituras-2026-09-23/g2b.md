# Relatório g2b (radiografia-torax, choque, choque-septico)

## choque.html (continuação do g2; o g2 já tinha corrigido a dose da vasopressina e a adrenalina na disfunção cardíaca)

### 1. Correções clínicas
- Tabela de vasoativos, vasopressina: "costuma entrar com noradrenalina entre 0,25 e 0,5 µg/kg/min, faixa citada pela edição de 2021" → "o painel a inicia com noradrenalina em torno de 0,3 µg/kg/min (0,2 a 0,5), em dose fixa de até 0,03 U/min", com "sugestão, certeza moderada". Fonte: Surviving Sepsis Campaign 2026, rec. 56 e "In our practice" (mediana 0,3, IIQ 0,2–0,5). Prescott HC et al. Intensive Care Med 2026;52:863–936, doi:10.1007/s00134-026-08361-1 (fontes/ local). O teto de 0,03 U/min vem da SSC 2021 (a 2026 não repete a dose).
- Tabela de vasoativos, hidrocortisona: "Séptico com vasopressor em dose crescente" → "Choque séptico (Surviving Sepsis 2026, sugestão), em geral 200 mg/dia". Fonte: SSC 2026 rec. 79 ("suggest" corticoide IV no choque séptico, sem condicionar a dose crescente de vasopressor; 90% do painel usa 200 mg/24 h).
- Tabela de vasoativos, dobutamina: "Pv-aCO₂ > 6" sem unidade → "> 6 mmHg".
- TCE Glasgow ≤ 8, PAM ≥ 80: estava rotulado "forte" (c1). Na ESICM 2025 (rec. 43) é "Ungraded good practice statement / Strong agreement" → rótulo trocado para "boa prática" (a convenção da própria leitura) e a pergunta de revisão 2 passou de "(recomendação forte)" para "(declaração de boa prática, redigida como "recomendamos")". Fonte: Monnet X et al. ESICM 2025, Intensive Care Med, doi:10.1007/s00134-025-08137-z (fontes/ local).
- Questão-âncora da VPP com Vt 6 mL/kg: "a interpretação de um valor alto também não é confiável" contradiz a ESICM 2025 (texto da rec. 21: "High PPV values may still reliably predict fluid responsiveness, whereas lower values are likely to be less reliable") → "um valor alto ainda tende a indicar resposta, mas a diretriz não aceita a medida sozinha". Conduta da âncora mantida.

### 2. Dúvidas não resolvidas
- A tabela ESICM de 2025 define índice de choque como "systolic arterial pressure over heart rate" (erro da própria diretriz); a leitura usa FC/PAS, que é o correto. Não mexi.

### 3. Outras correções
- Fonte 3 do footer: "Surviving Sepsis Campaign … edição 2026" sem autoria → referência completa (Prescott 2026, ICM 52:863–936, doi).
- Conferidos contra a ESICM 2025 sem mudança: classes/certezas de PLR, oclusão expiratória, VPP, VVS, veia cava, eco (fraca/baixa), fenótipos (fraca/muito baixa), alvos 65–70, trauma 80–90, cardiogênico ≥ 65, ensaio de lactato > 3 mmol/L (sem efeito em mortalidade, menos falência orgânica). PIA ≥ 12 e > 20 com disfunção nova, técnica de PLR/EEO/VPP ok.
- Travessões restantes são só intervalos numéricos (65–70, 80–90) e rótulos de mermaid.

### Fluxogramas (viewBox, largura)
- Fluxograma 1: 1085 → 742 (TD; nó "Ler a pressão" fundido na decisão; os quatro achados de ultrassom viraram nós estreitos sem rótulo de aresta; "Ecocardiografia" → "Ultrassom à beira do leito: coração e pulmão", porque o pneumotórax sai do ultrassom pulmonar, não do eco). Letra efetiva ~14 px.
- Fluxograma 2: 1015 → 697 (rótulos quebrados; a lista de marcadores de congestão foi para o nó "Ponderar"; o laço I → A virou "repetir a avaliação" no nó).
- Fluxograma 3: 1367 → 472 (LR → TD).
- Os três desenham sem "Syntax error" (medido no DOM renderizado pelo Chrome headless).

### 4. Figuras
- Não há figuras na leitura.

### 5. Profundidade: monografia (ESICM 2025 completa em diagnóstico e monitorização). Lacunas para prova:
1. Choque cardiogênico: classificação SCAI (A–E) e suporte circulatório mecânico (balão, Impella, ECMO VA) só aparecem de passagem.
2. Anafilaxia: dose de adrenalina IM (0,5 mg, 0,01 mg/kg) e infusão no refratário.
3. Choque hemorrágico: transfusão maciça (razão 1:1:1), ácido tranexâmico em até 3 h, cálcio.
4. Insuficiência adrenal aguda: hidrocortisona 100 mg em bólus e reposição.
5. Choque neurogênico: bradicardia com hipotensão, alvo de PAM no trauma raquimedular.

## choque-septico.html (continuação do g2; o g2 já tinha refeito a pontuação e os dois fluxogramas)

Conferência feita contra o PDF da SSC 2026 em fontes/ (Prescott HC et al. Intensive Care Med 2026;52:863–936, doi:10.1007/s00134-026-08361-1): recs. 1–21 (sistemas, rastreio, culturas, tempo do antimicrobiano, pré-hospitalar), 27, 33, 36–37, 53–64 (vasoativos, inotrópico, azul de metileno, midodrina, betabloqueador), 79 (corticoide, ADRENAL, 260 mg/dia, 88,4/90/86%), 81, 85, 88 e 95–99. Todas as classes/certezas da leitura batem, salvo o que está abaixo.

### 1. Correções clínicas
- Peso para os 30 mL/kg: "peso real, ou o ajustado se o IMC passa de 30" → "real, ou o ajustado ou o ideal se o IMC passa de 30" (texto, pergunta 7 e nó B do fluxograma 2). Fonte: SSC 2026 rec. 10, remarca ("adjusted or ideal body weight in patients with BMI > 30").
- Profilaxia de TEV: a célula de força dizia "forte, moderada" para as três condutas; a farmacológica isolada (sem somar a mecânica) é "suggest", condicional, certeza moderada (rec. 99) → "forte, moderada; a isolada, fraca, moderada".
- Vitamina C: faltava a certeza → "fraca contra, baixa" (rec. 81).

### 2. Dúvidas não resolvidas
- Nenhuma de conteúdo. O fluxograma 2 põe "considerar hidrocortisona" junto da vasopressina; a SSC 2026 (rec. 79) sugere corticoide no choque séptico sem amarrar a um degrau de vasopressor. Não é erro, mas o "quando" é prática do painel, não recomendação. Deixei como estava.

### 3. Outras correções
- Escala de certeza: "possível, suspeita moderada, com alternativa também provável, e improvável" (lia como cinco categorias) → "possível (suspeita moderada, com alternativa também provável) e improvável" (Tabela 3 da SSC tem quatro).
- SVG inline da Figura 1: `font-family:Figtree` → pilha de fonte do sistema (regra "cara de manual").
- Fluxograma 1: rótulos de aresta e dois nós quebrados em linhas.

### Fluxogramas (viewBox, largura)
- Fluxograma 1: 741 (depois do g2) → 664.
- Fluxograma 2: 962 (original) → 706 (reestruturado pelo g2; conferido agora: desenha, sem erro, lógica igual às recs. 10–14 e 55–61).

### 4. Figuras
- Figura 1 é SVG inline (linha do tempo); legenda coerente com o texto e com as recs. 16–18. Sem defeito além da fonte trocada.

### 5. Profundidade: monografia. Lacunas para prova:
1. Oxigenoterapia nova de 2026 (recs. 66–69): cateter nasal de alto fluxo sobre O2 convencional com PaO₂/FiO₂ < 200 e sobre VNI como terapia inicial; alvos de SpO₂.
2. Antipirético (rec. 80, nova): sugestão contra antitérmico para melhorar desfecho.
3. Imunoglobulina, técnicas de purificação do sangue e hemoperfusão com polimixina B (recs. 82–84, contra).
4. Cuidado pós-sepse e seguimento após a alta (recs. 110–119).
5. Esquemas empíricos concretos por foco (a leitura remete a outra leitura; é o que a prova de título mais cobra).

## radiografia-torax.html (revisão completa)

Cópia do original antes das edições: scratchpad/revisao/g2b/radiografia-torax.orig.html.

### 1. Correções clínicas
- Ângulo da carina: "que normalmente fica em torno de 90 graus" → "(a faixa normal é larga, de cerca de 50 a 100 graus, e o sinal é pouco sensível)". 90° está dentro do normal; o texto dava a entender que é o valor típico e que qualquer alargamento acima disso é átrio esquerdo. Fontes: Walker HK et al. Clinical Methods, cap. "Chest Roentgenography for Cardiovascular Evaluation" (NCBI Bookshelf NBK355: "normal carinal angle is said to be 50 to 100 degrees"); Murray JG et al. AJR 1995;164:1089 (sinal insensível e inespecífico), https://www.ajronline.org/doi/10.2214/ajr.164.5.7717208.
- Rotação: "o hemitórax que gira para a frente parece mais opaco" (direção ambígua na PA, em que o paciente já está de frente para o detector; a literatura descreve o lado rodado como mais TRANSPARENTE) → "um hemitórax fica mais transparente que o outro" (texto e legenda da Figura 5). Fonte: AJR, "Pulmonary Hyperlucency in Adults" (hipertransparência espúria unilateral é, na maioria, rotação), https://ajronline.org/doi/10.2214/AJR.12.8917.
- Dek: "com a diretriz Fleischner 2024 para o nódulo" estava errado. A Fleischner 2024 (Bankier, Radiology 2024;310:e232558) é o GLOSSÁRIO; a recomendação de nódulo é a de 2017 (MacMahon), e a própria leitura diz que ela não vale para radiografia → "com o vocabulário do glossário da Fleischner Society (2024)". **O `s:` de leituras.js linha 128 tem o mesmo texto errado e precisa da mesma troca (não editei).**
- Fluxograma 1: "pneumotórax hipertensivo" estava listado como causa de "opacidade" que empurra o mediastino; pneumotórax é hipertransparência → saiu do nó (ficou "derrame volumoso ou massa grande").
- Fluxograma 3: "Deslizamento pleural ausente? sim → Pneumotórax" contradizia o fluxograma 2 (que exige o ponto pulmonar) → "Pneumotórax provável: confirmar com o ponto pulmonar".

### 2. Dúvidas não resolvidas (não mexidas)
- Números da metanálise Vera-Ponce 2025 (Respir Med Res 2025;88:101200) na tabela "Limites": radiografia 72,6%/82,0% e ultrassom 90,0%/90,8%. O artigo existe (PubMed 40934635), mas PubMed e ScienceDirect bloquearam a leitura do resumo; números não conferidos.
- Figura 13 (foto-nodulo.webp): o painel tem rótulos "A" e "B" na tipografia de livro-texto e aspecto de prancha de atlas. A nota do footer diz "nenhuma imagem de terceiro foi reproduzida". Vale conferir a procedência antes de manter.
- Demais números conferidos de memória contra as fontes citadas e coerentes: Self 2013 (3.423 pacientes, 43,5%/93,0%/VPP 26,9%), ESCAPED/Claessens 2015 (319, 33%, 29,8%, 58,6%), ADHERE/Collins 2006 (85.376, 18,7%), Alrajab 2013 (13 estudos, 39,8%/99,3% × 78,6%/98,4%), Goodman 1976 (5 ± 2 cm), hilo esquerdo 1 a 2 cm mais alto (Radiology Masterclass; 97%).

### 3. Outras correções
- Travessão em cinco h2 e cinco itens do sumário ("A – vias aéreas…") → "A, vias aéreas…". Obs.: rodar `gera_indice.py`, porque o índice de busca usa o texto dos h2.
- "regra simples de física,<b>duas" (sem espaço) → "física: <b>duas".
- "Vale conhecer as cinco definições" com tabela de sete termos → "Estas são as definições que mais aparecem na enfermaria".
- Frases-muleta retiradas: "Vale reconhecer", "Também vale lembrar", "vale saber de cabeça".
- Pontuação/frases truncadas corrigidas em 12 pontos (legendas das Figuras 2, 4, 10, 19; satisfação de busca; varredura por zonas; pneumonia aspirativa; pneumomediastino; tubo orotraqueal; âncora da sonda; erro frequente da expiração; pergunta do Chilaiditi).
- Legendas ajustadas ao que a imagem mostra: Figura 5 (filmes 1 e 2 rodados, 3 reto), Figura 6 (sete arcos no filme 1, dez no filme 2), Figura 14 ("com cateter" → "com sonda gástrica": o dispositivo desce até a bolha gástrica), Figura 17 (acrescentado "A área cardíaca aumentada é achado à parte", porque a cardiomegalia domina o filme).

### Fluxogramas (viewBox, largura)
- Fluxograma 1: 1211 → 640 (rótulos quebrados; o ramo "adulto fumante?" virou um nó só).
- Fluxograma 2: 815 → 717.
- Fluxograma 3: 850 → 546 (a cascata de decisões deixou de escorregar para a direita: as folhas alternam de lado).
- Os três desenham sem erro (DOM renderizado pelo Chrome headless).

### 4. Defeitos de figura (não editados; para o gerador ou para o compoe.py)
- **fig/foto/foto-penetracao.webp: RÓTULOS TROCADOS.** O filme da esquerda, com pulmões pretos e coluna nítida atrás do coração, é o SUPERpenetrado, mas está rotulado "subpenetrada"; o da direita, esbranquiçado e sem contraste, é o SUBpenetrado, rotulado "superpenetrada". A legenda (Figura 4) descreve a física certa, então imagem e legenda se contradizem. Grave: ensina o contrário. Trocar os rótulos no compoe.py.
- fig/rx-tubos.svg: (a) a ponta do cateter venoso central está à esquerda da linha média, perto do brônquio-fonte esquerdo, e não na veia cava superior, que fica à direita do mediastino; (b) a sonda nasogástrica termina na base do coração, na linha média, e não cruza o diafragma até abaixo da cúpula esquerda, o que contradiz o texto e a legenda; (c) não há dreno de tórax desenhado: a legenda vermelha "Dreno de tórax" coincide com as linhas vermelhas dos brônquios principais. Grave.
- fig/rx-congestao.svg: as linhas B de Kerley estão desenhadas como traços horizontais mediais, até sobre o coração, e não periféricas, perpendiculares à pleura e tocando nela; a legenda da leitura cita "redistribuição para os ápices", que não está desenhada; os rótulos "linhas B de Kerley" e "infiltrado peri-hilar" se sobrepõem aos traços e à borda cardíaca.
- fig/rx-golden.svg: o rótulo "lobo colapsado" está abaixo da cissura, no pulmão aerado; o lobo superior colapsado é a área sombreada acima dela.
- fig/rx-lobos.svg: na PA, a "cissura horizontal" desce obliquamente e atravessa a silhueta cardíaca; à esquerda, uma linha sobe do coração para a parede; a língula, citada na legenda, não está marcada.
- fig/rx-consolidacao-atelectasia.svg: o título "Opacidade que empurra × opacidade que puxa" não bate com o painel da esquerda (consolidação não empurra); "arcos aproximados" sobrepõe a linha da traqueia.
- fig/rx-silhueta.svg: no painel do lobo inferior, a opacidade flutua acima da cúpula que ela deveria apagar (não encosta nela).
- fig/rx-pa-ap.svg: os textos "tamanho real" e "projetado maior" invadem o retângulo do detector.
- fig/rx-pneumotorax-deitado.svg: rótulo "ar" cortado fora do tórax; "ápice sem linha" está no ápice do lado oposto ao do sulco profundo.
- fig/rx-pontos-cegos.svg: a mancha dos "ápices" fica sobre a traqueia, no centro, e não nos dois ápices; só um hilo marcado.
- fig/rx-derrame-volume.svg: atribui 50/200/500 mL inteiros a "Blackmore"; o limiar de 50 mL no perfil costuma ser creditado a Collins 1972 (baixa prioridade).
- fig/foto/foto-pneumotorax-pneumectomia.webp: rótulo "pneumotorax" sem acento.
- fig/foto/foto-pneumoperitonio.webp: o ar livre sob a cúpula direita é uma faixa cinza muito sutil nesta resolução, sem seta; o que salta aos olhos é a cardiomegalia. Considerar uma seta ou trocar a imagem.
- Conferidas e corretas: foto-pa-perfil, foto-rotacao, foto-inspiracao, foto-cardiomegalia (legenda ajustada), foto-esquecidos (imagem retrocardíaca com nível, compatível com hérnia hiatal), rx-qualidade, rx-abcde, rx-pneumoperitonio.svg.

### 5. Profundidade: monografia (abordagem sindrômica, ~6 mil palavras). Lacunas para prova:
1. Sinais clássicos que caem em prova e não aparecem: sinal cervicotorácico, sinal do hilo sobreposto, sinal da convergência hilar, sinal de Westermark, corcova de Hampton, sinal de Fleischner (TEP).
2. Padrões de atelectasia lobar por lobo (LSE com "véu" e luftsichel, lobo inferior esquerdo com triângulo retrocardíaco, lobo médio).
3. Padrão miliar e padrões intersticiais nodulares (tuberculose miliar, silicose, sarcoidose com estadiamento de Siltzbach/Scadding).
4. Cavitação: diagnóstico diferencial estruturado (tuberculose, abscesso, carcinoma epidermoide, granulomatose) e bola fúngica com sinal do crescente.
5. Classificação de derrame pelo tamanho e o sinal do diafragma contínuo no pneumomediastino.

## Resumo g2b

- Erros clínicos ou factuais corrigidos: 13 (choque 5, choque-septico 3, radiografia-torax 5).
- Os 3 mais graves:
  1. radiografia-torax: o dek anunciava "diretriz Fleischner 2024 para o nódulo" (a de 2024 é o glossário; a de nódulo é de 2017 e nem se aplica a radiografia). O mesmo texto está em leituras.js linha 128 (`s:`), que eu não editei.
  2. choque: a questão-âncora dizia que VPP alta com Vt baixo "também não é confiável", o contrário da ESICM 2025 (valor alto ainda prediz resposta). E o alvo PAM ≥ 80 no TCE estava rotulado "forte", quando é declaração de boa prática não graduada.
  3. radiografia-torax: o ângulo da carina aparecia como "normalmente em torno de 90°", e a rotação dizia que o hemitórax que "gira para a frente" fica mais opaco. Ambos reescritos com fonte.
- O defeito mais grave está numa figura, não no texto: **foto-penetracao.webp tem os rótulos sub/superpenetrada trocados.** Depois vem **rx-tubos.svg**: cateter central à esquerda, sonda sem cruzar o diafragma e nenhum dreno desenhado.
- Fluxogramas (largura do viewBox antes → depois):
  - choque 1: 1085 → 742
  - choque 2: 1015 → 697
  - choque 3: 1367 → 472
  - choque-septico 1: 741 → 664
  - choque-septico 2: 962 → 706 (refeito pelo g2, conferido)
  - radiografia 1: 1211 → 640
  - radiografia 2: 815 → 717
  - radiografia 3: 850 → 546
  - Todos desenham sem "Syntax error". Medido com Chrome headless (`--dump-dom`) porque o Browser pane estava no limite de abas; script em scratchpad/revisao/mede_g2b.sh.
- Pendências para o dono: trocar o `s:` de radiografia-torax em leituras.js, rodar `gera_indice.py` (h2 da radiografia mudaram), consertar as figuras listadas e confirmar a procedência de foto-nodulo.webp.
