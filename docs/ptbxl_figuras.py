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
    # (arquivo, banco, registro, modo, derivação, início s, título, nota)
    ("real-normal",    "ptbxl", "00014_hr", "12", None, 0, "Eletrocardiograma normal", "ritmo sinusal · P antes de cada QRS"),
    ("real-sae",       "ptbxl", "01328_hr", "12", None, 0, "Sobrecarga atrial esquerda", "P entalhada em DII · componente negativo em V1"),
    ("real-sad",       "ptbxl", "03269_hr", "12", None, 0, "Sobrecarga atrial direita", "P apiculada em DII, DIII e aVF"),
    ("real-hve",       "ptbxl", "00138_hr", "12", None, 0, "Sobrecarga ventricular esquerda", "voltagem alta com padrão de strain"),
    ("real-bav1",      "ptbxl", "00209_hr", "tira", "II", 0, "Bloqueio AV de primeiro grau", "todo P conduz · PR longo e fixo"),
    ("real-mobitz1",   "ptbxl", "01222_hr", "tira", "II", 0, "Bloqueio AV de segundo grau, Mobitz I", "laudo: bloqueio de 2º grau tipo Wenckebach"),
    ("real-bavt",      "ptbxl", "00959_hr", "tira", "V5", 0, "Bloqueio AV total", "laudo: bloqueio completo com escape ventricular"),
    ("real-bre",       "ptbxl", "00346_hr", "12", None, 0, "Bloqueio de ramo esquerdo", "QRS ≥ 120 ms · R entalhada em I, aVL, V5 e V6"),
    ("real-brd",       "ptbxl", "00680_hr", "12", None, 0, "Bloqueio de ramo direito", "rSR' em V1 · S empastada em I, V5 e V6"),
    ("real-fa",        "ptbxl", "08215_hr", "tira", "II", 0, "Fibrilação atrial", "sem onda P · RR irregularmente irregular"),
    ("real-flutter",   "ptbxl", "00023_hr", "tira", "II", 0, "Flutter atrial com condução 2:1", "ondas F em dente de serra"),
    ("real-bigeminismo", "ptbxl", "10355_hr", "tira", "II", 0, "Extrassístoles ventriculares em bigeminismo", "QRS largo e precoce, sem P precedente"),
    ("real-iam-inferior", "ptbxl", "00627_hr", "12", None, 0, "Infarto inferior estabelecido", "onda Q e T invertida em II, III e aVF"),
    ("real-iam-anterosseptal", "ptbxl", "00536_hr", "12", None, 0, "Infarto ântero-septal estabelecido", "perda de progressão de R em V1–V3"),
    ("real-wpw",       "ptbxl", "09699_hr", "12", None, 0, "Pré-excitação (Wolff-Parkinson-White)", "PR curto · onda delta · R dominante em V1"),
    ("real-tsv",       "ptbxl", "01919_hr", "tira", "II", 0, "Taquicardia supraventricular", "laudo: TSV regular, sem P evidente"),
    ("real-fa-pre-excitada", "ptbxl", "16497_hr", "12", None, 0, "Fibrilação atrial pré-excitada", "laudo: FA taquicárdica em portador de WPW"),
    ("real-iam-posterior", "ptbxl", "02993_hr", "12", None, 0, "Infarto ínfero-lateral com comprometimento posterior", "laudo: agudo, com envolvimento posterior verdadeiro"),
    ("real-infra-avr", "ptbxl", "02886_hr", "12", None, 0, "Infra de ST difuso com supra em aVR", "laudo: supra em aVR, infra em I, II, aVL"),
    ("real-tep",       "ptbxl", "06997_hr", "12", None, 0, "Padrão S1Q3 em taquicardia sinusal", "laudo: S em DI e Q em DIII"),
    ("real-stemi-inferior", "ptbdb", "patient011_s0039lre", "12", None, 5, "Infarto inferior agudo", "ECG do 1º dia após o infarto"),
    ("real-stemi-anterior", "ptbdb", "patient005_s0021are", "12", None, 5, "Infarto anterior agudo", "ECG do 1º dia após o infarto"),
    ("real-bav-2para1", "mitdb", "231", "tira", "MLII", 340, "Bloqueio AV de segundo grau 2:1", "anotação: bloqueio AV de 2º grau"),
    ("real-tv-fusao",  "mitdb", "205", "tira", "MLII", 302, "Salva de taquicardia ventricular", "anotação: TV com batimento de fusão"),
    ("real-tv-sustentada", "vfdb", "420", "tira", "ECG", 1432, "Taquicardia ventricular sustentada", "anotação: TV"),
    ("real-flutter-ventricular", "vfdb", "609", "tira", "ECG", 1022, "Flutter ventricular", "anotação: flutter ventricular"),
    ("real-fv",        "vfdb", "424", "tira", "ECG", 1262, "Fibrilação ventricular", "anotação: FV"),
]

FONTE = {
    "ptbxl": ("PTB-XL (PhysioNet), CC BY 4.0 — registro ", lambda r: r.replace("_hr", "")),
    "ptbdb": ("PTB Diagnostic ECG Database (PhysioNet), ODC-BY 1.0 — ", lambda r: r.replace("_", "/")),
    "mitdb": ("MIT-BIH Arrhythmia Database (PhysioNet), ODC-BY 1.0 — registro ", lambda r: r),
    "vfdb":  ("MIT-BIH Malignant Ventricular Ectopy Database (PhysioNet), ODC-BY 1.0 — registro ", lambda r: r),
}
CACHE2 = pathlib.Path.home() / "Documents/Claude/_physionet"


def _sinal(banco, reg):
    if banco == "ptbxl":
        import ptbxl
        return ptbxl.le_sinal(reg)
    import wfdb
    sig, fs, _ = wfdb.le_sinal(CACHE2 / banco / (reg + ".hea"))
    return sig, fs


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    cat = {}
    for nome, banco, reg, modo, deriv, ini, tit, nota in FIGS:
        sig, fs = _sinal(banco, reg)
        pref, fmt = FONTE[banco]
        fonte = pref + fmt(reg)
        if modo == "12":
            svg, _, _ = D.desenha_sinal(sig, fs, titulo=tit, nota=nota, fonte=fonte, ini=ini)
        else:
            svg = D.tira_sinal(sig[deriv], fs, deriv=deriv, seg=6.0, titulo=tit, nota=nota, fonte=fonte, ini=ini)
        (DEST / f"{nome}.svg").write_text(svg)
        cat[nome] = {"t": tit, "fonte": fonte}
        print("%-26s %-6s %-22s %5.1f KB" % (nome, banco, reg, len(svg) / 1024))
    (DEST / "_catalogo_real.json").write_text(json.dumps(cat, ensure_ascii=False, indent=1))
    print("\n%d traçados reais em leituras/fig/" % len(FIGS))


if __name__ == "__main__":
    main()
