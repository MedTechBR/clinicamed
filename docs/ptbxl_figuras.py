#!/usr/bin/env python3
"""Gera as figuras de ECG REAL da leitura de eletrocardiograma, a partir do PTB-XL.

A tabela abaixo é CURADA, não automática: cada registro foi escolhido pelo laudo do
cardiologista que leu aquele paciente e conferido olhando o traçado desenhado. A peneira
(`ptbxl_desenha.mede`) serviu só para descartar candidatos ruins — ela não afirma diagnóstico e
nenhum número medido por ela vai para legenda.

Atribuição exigida pela CC BY 4.0 (já impressa no rodapé de cada figura e no rodapé da leitura):
  Wagner P, et al. PTB-XL, a large publicly available electrocardiography dataset.
  Sci Data 2020;7:154. · Goldberger AL, et al. Circulation 2000;101(23):e215.

Uso: python3 docs/ptbxl_figuras.py
"""
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import ptbxl_desenha as D                                    # noqa: E402

DEST = pathlib.Path(__file__).resolve().parent.parent / "leituras/fig"

# nome do arquivo, registro, modo, derivação (modo tira), título, nota do canto
FIGS = [
    ("real-normal",    "00014_hr", "12", None, "Eletrocardiograma normal",
     "ritmo sinusal · P antes de cada QRS"),
    ("real-sae",       "01328_hr", "12", None, "Sobrecarga atrial esquerda",
     "P entalhada em DII · componente negativo em V1"),
    ("real-sad",       "03269_hr", "12", None, "Sobrecarga atrial direita",
     "P apiculada em DII, DIII e aVF"),
    ("real-hve",       "00138_hr", "12", None, "Sobrecarga ventricular esquerda",
     "voltagem alta com padrão de strain"),
    ("real-bav1",      "00209_hr", "tira", "II", "Bloqueio AV de primeiro grau",
     "todo P conduz · PR longo e fixo"),
    # BAVT: os dois registros de 3AVB do PTB-XL não mostram a dissociação de forma legível em
    # DII — o achado tem de saltar aos olhos numa figura de ensino, e não salta. Fica o esquema.
    ("real-bre",       "00346_hr", "12", None, "Bloqueio de ramo esquerdo",
     "QRS ≥ 120 ms · R entalhada em I, aVL, V5 e V6"),
    ("real-brd",       "00680_hr", "12", None, "Bloqueio de ramo direito",
     "rSR' em V1 · S empastada em I, V5 e V6"),
    ("real-fa",        "08215_hr", "tira", "II", "Fibrilação atrial",
     "sem onda P · RR irregularmente irregular"),
    ("real-flutter",   "00023_hr", "tira", "II", "Flutter atrial com condução 2:1",
     "ondas F em dente de serra"),
    ("real-bigeminismo", "10355_hr", "tira", "II", "Extrassístoles ventriculares em bigeminismo",
     "QRS largo e precoce, sem P precedente"),
    ("real-iam-inferior", "00627_hr", "12", None, "Infarto inferior estabelecido",
     "onda Q e T invertida em II, III e aVF"),
    ("real-iam-anterosseptal", "00536_hr", "12", None, "Infarto ântero-septal estabelecido",
     "perda de progressão de R em V1–V3"),
    ("real-wpw",       "09699_hr", "12", None, "Pré-excitação (Wolff-Parkinson-White)",
     "PR curto · onda delta · R dominante em V1"),
]


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    cat = {}
    for nome, reg, modo, deriv, tit, nota in FIGS:
        if modo == "12":
            svg, sig, fs = D.desenha(reg, titulo=tit, nota=nota)
        else:
            svg = D.tira(reg, deriv=deriv, seg=6.0, titulo=tit, nota=nota)
        (DEST / f"{nome}.svg").write_text(svg)
        cat[nome] = {"t": tit, "reg": reg.replace("_hr", "")}
        print("%-26s %-10s %5.1f KB" % (nome, reg, len(svg) / 1024))
    (DEST / "_catalogo_real.json").write_text(json.dumps(cat, ensure_ascii=False, indent=1))
    print("\n%d traçados reais em leituras/fig/ (PTB-XL, CC BY 4.0)" % len(FIGS))


if __name__ == "__main__":
    main()
