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
