#!/usr/bin/env python3
"""Leitor mínimo de WFDB (PhysioNet) para os bancos usados nas figuras do ClínicaMed.

Formatos: 16 (PTB-XL, PTB Diagnóstico) e 212 (MIT-BIH Arrhythmia, VFDB). Anotações .atr no
formato MIT, com os rótulos de RITMO ("(VT", "(AFIB", "(B" …) que é o que interessa aqui: eles
dizem, no tempo, onde começa e termina cada episódio anotado pelos cardiologistas do banco.

Licenças: PTB-XL CC BY 4.0; mitdb, vfdb e ptbdb ODC-BY 1.0 (atribuição; uso comercial permitido).
"""
import pathlib
import struct

# códigos de anotação do MIT (só os que aparecem nos rótulos de batimento que se usa aqui)
COD = {1: "N", 2: "L", 3: "R", 4: "a", 5: "V", 6: "F", 7: "J", 8: "A", 9: "S", 10: "E", 11: "j",
       12: "/", 13: "Q", 14: "~", 16: "|", 18: "s", 19: "T", 20: "*", 21: "D", 22: '"', 23: "=",
       24: "p", 25: "B", 26: "^", 27: "t", 28: "+", 29: "u", 30: "?", 31: "!", 32: "[", 33: "]",
       34: "e", 35: "n", 36: "@", 37: "x", 38: "f", 39: "(", 40: ")", 41: "r"}


def le_hea(caminho):
    lin = [l for l in pathlib.Path(caminho).read_text(errors="ignore").split("\n")]
    cab = lin[0].split()
    nome, ncan, fs = cab[0], int(cab[1]), float(cab[2])
    canais = []
    for l in lin[1:1 + ncan]:
        p = l.split()
        arq, fmt = p[0], p[1]
        ganho = float(p[2].split("(")[0].split("/")[0]) if len(p) > 2 else 200.0
        base = int(p[4]) if len(p) > 4 else 0
        canais.append(dict(arq=arq, fmt=fmt, ganho=ganho or 200.0, base=base, nome=p[-1]))
    return dict(nome=nome, fs=fs, canais=canais, coment=[l for l in lin if l.startswith("#")])


def le_sinal(caminho_hea):
    """{nome_do_canal: [mV]} de todos os canais que moram no arquivo .dat do próprio registro."""
    h = le_hea(caminho_hea)
    pasta = pathlib.Path(caminho_hea).parent
    sig = {}
    por_arq = {}
    for c in h["canais"]:
        por_arq.setdefault(c["arq"], []).append(c)
    for arq, cs in por_arq.items():
        p = pasta / arq
        if not p.exists():
            # o .hea do PTB Diagnóstico lista também s00xx.xyz (Frank), que não baixamos
            alt = pasta / (pathlib.Path(caminho_hea).stem + pathlib.Path(arq).suffix)
            if not alt.exists():
                continue
            p = alt
        dat = p.read_bytes()
        n = len(cs)
        fmt = cs[0]["fmt"]
        if fmt == "16":
            cru = struct.unpack("<%dh" % (len(dat) // 2), dat)
            for k, c in enumerate(cs):
                sig[c["nome"]] = [(cru[i * n + k] - c["base"]) / c["ganho"] for i in range(len(cru) // n)]
        elif fmt == "212":
            if n != 2:
                raise ValueError("212 com %d canais" % n)
            a, b = [], []
            for i in range(0, len(dat) - 2, 3):
                b0, b1, b2 = dat[i], dat[i + 1], dat[i + 2]
                x = b0 | ((b1 & 0x0F) << 8)
                y = b2 | ((b1 & 0xF0) << 4)
                if x >= 2048: x -= 4096
                if y >= 2048: y -= 4096
                a.append(x); b.append(y)
            sig[cs[0]["nome"]] = [(v - cs[0]["base"]) / cs[0]["ganho"] for v in a]
            sig[cs[1]["nome"]] = [(v - cs[1]["base"]) / cs[1]["ganho"] for v in b]
        else:
            raise ValueError("formato WFDB nao suportado: " + fmt)
    return sig, h["fs"], h


def le_atr(caminho_atr):
    """Lista de (amostra, código, aux). Formato MIT: pares de bytes; código nos 6 bits altos."""
    dat = pathlib.Path(caminho_atr).read_bytes()
    out, t, i = [], 0, 0
    while i + 1 < len(dat):
        b0, b1 = dat[i], dat[i + 1]
        i += 2
        cod = b1 >> 2
        val = ((b1 & 3) << 8) | b0
        if cod == 0 and val == 0:
            break                              # fim
        if cod == 59:                          # SKIP: 4 bytes de deslocamento longo
            # o intervalo longo vem com a palavra ALTA primeiro (é o que a spec do MIT diz e o que
            # o vfdb exige — com a ordem trocada os episódios saíam em 8.931.246 s)
            hi = dat[i] | (dat[i + 1] << 8); lo = dat[i + 2] | (dat[i + 3] << 8)
            v = (hi << 16) | lo
            if v >= 1 << 31: v -= 1 << 32
            t += v; i += 4
            continue
        if cod == 60 or cod == 61 or cod == 62:  # NUM, SUB, CHN: modificadores, ignorar
            continue
        if cod == 63:                          # AUX: string de val bytes (+ padding)
            aux = dat[i:i + val].decode("latin-1").rstrip("\x00")
            i += val + (val & 1)
            if out:
                out[-1] = (out[-1][0], out[-1][1], aux)
            continue
        t += val
        out.append((t, COD.get(cod, "?"), ""))
    return out


def episodios_de_ritmo(anots, fs):
    """[(rótulo, t_ini_s, t_fim_s)] a partir das anotações '+' com aux '(XXX'."""
    ep, atual, t0 = [], None, 0.0
    for t, c, aux in anots:
        if c == "+" and aux.startswith("("):
            if atual:
                ep.append((atual, t0, t / fs))
            atual, t0 = aux[1:], t / fs
    if atual:
        ep.append((atual, t0, anots[-1][0] / fs))
    return ep
