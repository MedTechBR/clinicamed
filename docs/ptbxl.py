#!/usr/bin/env python3
"""Escolhe, baixa e mede eletrocardiogramas REAIS do PTB-XL para as figuras do ClínicaMed.

Por que isto existe: o Matheus perguntou por que não usar simplesmente ECGs reais. Tem razão.
Traçado sintetizado carrega um risco que nenhuma revisão elimina de vez — o desenho pode não
corresponder ao que a legenda afirma, e foi exatamente isso que aconteceu duas vezes em 08/09.
Num traçado real o rótulo vem do cardiologista que leu AQUELE paciente, não do meu modelo.

Fonte: PTB-XL, a large publicly available electrocardiography dataset (PhysioNet), 21.799 ECGs
de 12 derivações, 10 s, 500 Hz, com laudo e códigos SCP-ECG.
**Licença CC BY 4.0 — uso comercial permitido com atribuição.** É o ponto que decide: o
ClínicaMed é produto pago, e quase todo acervo de imagem de ECG na internet é "all rights
reserved" ou CC BY-NC. Aqui não se baixa imagem de ninguém: baixa-se o SINAL e desenha-se o
papel milimetrado do próprio app.

Citar (exigência da CC BY):
  Wagner P, Strodthoff N, Bousseljot RD, Kreiseler D, Lunze FI, Samek W, Schaeffter T.
  PTB-XL, a large publicly available electrocardiography dataset. Sci Data 2020;7:154.
  Goldberger AL, et al. PhysioBank, PhysioToolkit, and PhysioNet. Circulation 2000;101(23):e215.

Uso:
  python3 docs/ptbxl.py --censo                 # o que existe, por padrão
  python3 docs/ptbxl.py --escolhe IMI --n 6     # candidatos limpos de um padrão
  python3 docs/ptbxl.py --baixa 00123_hr        # traz .dat/.hea para o cache
"""
import argparse
import ast
import csv
import pathlib
import struct
import subprocess

# espelho oficial do PhysioNet no S3: em 09/09/2026 o certificado TLS de physionet.org expirou
# e o curl (com razão) recusou; o bucket público serve os mesmos arquivos.
BASE = "https://physionet-open.s3.amazonaws.com/ptb-xl/1.0.3/"
CACHE = pathlib.Path.home() / "Documents/Claude/_ptbxl"      # fora do repo: são dados, não código
META = CACHE / "ptbxl_database.csv"


def _baixa(rel, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size:
        return dest
    # curl em vez de urllib: o Python.org 3.14 não enxerga a cadeia de certificados do sistema e
    # passou a falhar com "certificate has expired" para o physionet.org; o curl usa o keychain.
    r = subprocess.run(["curl", "-sfL", "-o", str(dest), BASE + rel])
    if r.returncode or not dest.exists() or not dest.stat().st_size:
        if dest.exists(): dest.unlink()
        raise RuntimeError("falha ao baixar " + rel)
    return dest


def meta():
    _baixa("ptbxl_database.csv", META)
    return list(csv.DictReader(open(META)))


def limpo(r):
    """Registro sem ruído anotado — o laudo vale mais quando o traçado está legível."""
    return not any(r[k].strip() for k in
                   ("baseline_drift", "static_noise", "burst_noise", "electrodes_problems"))


def escolhe(codigo, n=6, so_humano=True, so_limpo=True, exclusivo=True):
    """Candidatos para um código SCP, do mais confiável para o menos.

    `exclusivo` descarta traçados com outros diagnósticos junto: para ENSINAR um padrão, o
    traçado tem de mostrar aquele padrão e não uma sopa de três achados.
    """
    fora = {"SR", "NORM", "ABQRS", "VCLVH", "SARRH", "NDT", "LVOLT", "HVOLT"}
    out = []
    for r in meta():
        cod = ast.literal_eval(r["scp_codes"])
        if cod.get(codigo) != 100.0:
            continue
        if so_humano and r["validated_by_human"] != "True":
            continue
        if so_limpo and not limpo(r):
            continue
        if exclusivo and len([k for k in cod if k != codigo and k not in fora]) > 1:
            continue
        out.append(r)
    return out[:n]


def le_sinal(nome):
    """Devolve {derivação: [mV]} de um registro de 500 Hz. Formato WFDB 16 bits, 12 canais."""
    # o diretório é o id ARREDONDADO PARA BAIXO em milhares (00218_hr mora em records500/00000/),
    # não os cinco primeiros dígitos do nome
    d = "%05d" % (int(nome.split("_")[0]) // 1000 * 1000)
    hea = _baixa(f"records500/{d}/{nome}.hea", CACHE / f"{nome}.hea").read_text().split("\n")
    cab = hea[0].split()
    ncan, fs, n = int(cab[1]), int(cab[2]), int(cab[3])
    ganhos, bases, nomes = [], [], []
    for lin in hea[1:1 + ncan]:
        p = lin.split()
        ganhos.append(float(p[2].split("(")[0].rstrip("/mV")))
        bases.append(int(p[4]))
        nomes.append(p[-1])
    dat = _baixa(f"records500/{d}/{nome}.dat", CACHE / f"{nome}.dat").read_bytes()
    cru = struct.unpack("<%dh" % (len(dat) // 2), dat)
    sig = {}
    for c in range(ncan):
        sig[nomes[c]] = [(cru[i * ncan + c] - bases[c]) / ganhos[c] for i in range(n)]
    return sig, fs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--censo", action="store_true")
    ap.add_argument("--escolhe")
    ap.add_argument("--baixa")
    ap.add_argument("--n", type=int, default=6)
    a = ap.parse_args()
    if a.censo:
        import collections
        c = collections.Counter()
        for r in meta():
            for k, v in ast.literal_eval(r["scp_codes"]).items():
                if v == 100.0 and r["validated_by_human"] == "True":
                    c[k] += 1
        for k, v in c.most_common():
            print("%-8s %5d" % (k, v))
    elif a.escolhe:
        for r in escolhe(a.escolhe, a.n):
            print("%-10s  %-3s %-2s  %s" % (
                pathlib.Path(r["filename_hr"]).name, r["age"].split(".")[0],
                "M" if r["sex"] == "0" else "F", r["report"][:78]))
    elif a.baixa:
        sig, fs = le_sinal(a.baixa)
        print("%s: %d derivações, %d Hz, %.1f s" % (a.baixa, len(sig), fs, len(sig["II"]) / fs))


if __name__ == "__main__":
    main()
