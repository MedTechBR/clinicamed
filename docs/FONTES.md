# Catálogo de fontes do ClínicaMed

As diretrizes em PDF vivem em `~/Documents/Livros/` (biblioteca do Matheus) e **não são versionadas**
— são grandes e de terceiros. O que fica no repo é este catálogo e o texto extraído fica em
`fontes/` (também fora do git). Para reextrair:

```
pdftotext -layout "~/Documents/Livros/<arquivo>.pdf" fontes/<nome>.txt
```

## Diretrizes usadas como âncora (atualizadas — usar)

| Fonte | Ano | Onde já foi usada |
|---|---|---|
| ESC — Atrial fibrillation (AF-CARE, CHA₂DS₂-VA) | 2024 | leitura `fibrilacao-atrial.html`, levas de cardiologia |
| ACC/AHA — Acute Coronary Syndromes | 2025 | leitura `sindromes-coronarianas.html`, leva 28 |
| SBC/SBH/SBN — Diretriz Brasileira de Hipertensão | 2025 | leitura `hipertensao.html`, leva 18 |
| AHA/ACC — Acute Pulmonary Embolism (categorias A–E) | 2026 | leitura `tromboembolismo.html` |
| Surviving Sepsis Campaign | 2026 | leitura `choque-septico.html`, leva 3 |
| AHA — CPR/ECC, Parts 7 e 9 (SBV e SAV) | 2025 | leva 18 |
| AHA/ASA — Acute Ischemic Stroke | 2026 | leitura `avc-isquemico.html`, leva 6 |
| ESICM/ATS/SCCM — Nova definição global de SDRA | 2024 | leituras `sdra.html` e `ventilacao-mecanica.html` |
| ESICM — Choque circulatório e monitorização hemodinâmica | 2025 | leitura `choque-circulatorio.html` |
| GINA — Global Strategy for Asthma | 2026 | leva 2 |
| GOLD — Global Strategy for COPD | 2026 | leva 2 |
| ESC — Arritmias ventriculares e morte súbita | 2022 | leitura `arritmias-ventriculares.html` |
| ESC — Taquicardia supraventricular | 2019 | leitura `taquiarritmias.html` (sem versão mais nova) |
| ACC/AHA/HRS — Bradiarritmias e distúrbios de condução | 2018 | leitura `bradiarritmias-e-marcapasso.html` (sem versão mais nova) |
| Ministério da Saúde — Dengue, diagnóstico e manejo, 6ª ed. | 2024 | leitura `dengue.html`, leva 16 (PDF em `docs/`) |
| SBC/AMB — Edital TECM nº 2473 | 2026 | taxonomia e formato do simulado (PDF em `docs/`) |
| AHA — Part 11: Post–Cardiac Arrest Care (conferida na web; PDF não está na biblioteca) | 2025 | leitura `parada-cardiaca.html` (seção pós-ROSC) |
| ESICM — Guidelines on circulatory shock and hemodynamic monitoring (Monnet et al., ICM) | 2025 | leitura `choque.html` (monografia; 50 declarações) |
| AHA/ACC — Evaluation and Diagnosis of Chest Pain (conferida na web) | 2021 | leitura `dor-toracica.html` |
| ACC/AHA — Diagnosis and Management of Aortic Disease (conferida na web) | 2022 | leitura `dor-toracica.html` (ADD-RS, alvos de FC e PA) |
| ATS — An Update on Management of Adult Patients with ARDS (Qadir et al.; **conferida na web**, PDF não está na biblioteca) | 2024 | leitura `sdra.html` — força e certeza de todas as recomendações de tratamento |
| ESC — Acute Pulmonary Embolism (só a tabela de contraindicações à fibrinólise, que a AHA/ACC 2026 não traz) | 2019 | leitura `tromboembolismo.html` |

| Fleischner Society — Glossary of Terms for Thoracic Imaging (Bankier, Radiology 2024;310:e232558) | 2024 | leitura `radiografia-torax.html` (edição vigente do glossário) |
| Fleischner Society — Glossary (Hansell, Radiology 2008;246:697-722) | 2008 | leitura `radiografia-torax.html` — as definições transcritas saíram desta edição, que está em texto acessível |
| Self WH, *Am J Emerg Med* 2013;31:401-5 — radiografia × TC para opacidade pulmonar | 2013 | leitura `radiografia-torax.html` (sensibilidade 43,5%) |
| Claessens YE, *AJRCCM* 2015;192:974-82 — TC precoce na PAC suspeita | 2015 | leitura `radiografia-torax.html` |
| Alrajab S, *Crit Care* 2013;17:R208 — ultrassom × radiografia no pneumotórax | 2013 | leitura `radiografia-torax.html` (39,8% × 78,6%) |
| Collins SP, *Ann Emerg Med* 2006;47:13-8 — registro ADHERE, radiografia negativa na IC | 2006 | leitura `radiografia-torax.html` (18,7%) |
| Blackmore CC, *Acad Radiol* 1996;3:103-9 — volume de derrame por radiografia | 1996 | leitura `radiografia-torax.html` (50 / 200 / 500 mL) |
| Vera-Ponce VJ, *Respir Med Res* 2025;88:101200 — metanálise ultrassom × radiografia na PAC | 2025 | leitura `radiografia-torax.html` |
| Goodman LR, *AJR* 1976;127:433-4 — posição do tubo orotraqueal | 1976 | leitura `radiografia-torax.html` (5 ± 2 cm da carina) |
| Mettler FA, *Radiology* 2008;248:254-63 — catálogo de doses efetivas | 2008 | leitura `radiografia-torax.html` (0,02 mSv) |

## Cadernos de revisão do Matheus (uso como MAPA DE TEMAS, nunca como texto)

Os cadernos de cursinho em `~/Documents/Livros/` — Intensiva I (cardio e pneumointensivismo),
Intensiva II (neurointensivismo e paliativos), Gastroenterologia, Hepatologia e Neurologia — são
material de terceiros e **não são fonte citável**. Servem para uma coisa: descobrir quais temas o
público-alvo estuda e quais faltavam na biblioteca. O texto das leituras é escrito do zero e
ancorado nas diretrizes primárias listadas acima, que são as que aparecem no campo `base`.

Foi assim que saíram, em 05/09/2026, as leituras de via aérea e intubação, ventilação mecânica,
sedação-analgesia-delirium, nutrição do paciente crítico, coma e hipertensão intracraniana.

## Livros de referência (atualizados)

| Fonte | Ano/edição |
|---|---|
| Manual do Residente de Clínica Médica | 3ª ed., 2023 |
| Tratado de Geriatria e Gerontologia | 5ª ed., 2022 |
| Medicina de Emergência: Abordagem Prática (USP) | citado na bibliografia do edital |
| HC-FMUSP Clínica Médica, volumes 2 a 5 | — |
| ATLS | 11ª ed. |
| Cadernos 2026 (Neurologia, Hepatologia, Gastroenterologia, Cardio e Pneumointensivismo, Neurointensivismo e Paliativos) | 2026 |

## ⚠️ Referências ANTIGAS — não usar como âncora

O Matheus foi explícito em 04/09/2026: *"ignore o que for de referência antiga e coloque só
referências atualizadas"*.

| Fonte | Por quê |
|---|---|
| Goldman-Cecil Medicine, **25ª edição** | O edital do TECM pede a **26ª (2022)**; a 25ª é de 2016 |
| Diagnóstico por Imagem, 2ª ed., 2015 | Desatualizada e fora do escopo de clínica médica |
| Manual de Toxicologia Clínica COVISA/SMS-SP, 2017 | Antiga para ancorar conduta |
| Manual do Residente de Radiologia | Fora do escopo |

Quando um tema não tiver diretriz recente na biblioteca, ancorar na bibliografia oficial do edital
(Harrison 22ª ed./2025 ou Cecil 26ª ed./2022) — nunca em edição antiga.

## Aulas de terceiros (roteiro, nunca imagem)

`~/Documents/Estácio IDOMED/AULAS EMERGÊNCIAS CLÍNICAS/AULA 1 - RX.pdf` — **Dr. Gebson Lopes,
radiologista, CRM 20411, RQE 16352**. 108 slides. Usada como MAPA da monografia de radiografia de
tórax (ABCDE, os cinco padrões, os sinais que ele ensina). As radiografias do arquivo são dele e
**não foram reproduzidas**: o ClínicaMed é público e pago. Todas as figuras da leitura são esquemas
gerados por `gera_figuras.py`. Se houver autorização escrita dele, as imagens podem entrar com
crédito na abertura da leitura.
