#!/usr/bin/env python3
"""Desenha um registro do PTB-XL no papel milimetrado do ClínicaMed e MEDE o que saiu.

O sinal é real; o papel é o mesmo das figuras sintetizadas (25 mm/s, 10 mm/mV, pulso de
calibração), para o leitor não trocar de linguagem visual no meio da leitura.

A medição não é enfeite: ela existe para conferir que o traçado escolhido mostra MESMO o que o
laudo diz, antes de a figura entrar no app. Um rótulo de banco de dados é uma afirmação como
qualquer outra — melhor que a minha, porque veio de quem leu o paciente, mas ainda assim uma
afirmação que se pode medir.

Uso: python3 docs/ptbxl_desenha.py 00218_hr --saida /tmp/x.svg
"""
import argparse
import importlib.util
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "docs"))
spec = importlib.util.spec_from_file_location("gf", RAIZ / "gera_figuras.py")
gf = importlib.util.module_from_spec(spec)
sys.modules["gf"] = gf
spec.loader.exec_module(gf)
import ptbxl                                              # noqa: E402

ORDEM = [["I", "II", "III"], ["AVR", "AVL", "AVF"], ["V1", "V2", "V3"], ["V4", "V5", "V6"]]
ROTULO = {"AVR": "aVR", "AVL": "aVL", "AVF": "aVF"}


def _filtra(x, fs, corte=0.5):
    """Tira só a deriva de linha de base (passa-alta de 0,5 Hz, ida e volta para não torcer o ST).

    Nada de suavizar: o que faz o traçado real ensinar é justamente o ruído e a irregularidade.
    Um passa-baixa mataria o entalhe do QRS, que é metade do que se quer mostrar.
    """
    rc = 1.0 / (2 * 3.141592653589793 * corte)
    a = rc / (rc + 1.0 / fs)
    def hp(v):
        y, ant, out = 0.0, v[0], []
        for s in v:
            y = a * (y + s - ant); ant = s; out.append(y)
        return out
    return hp(hp(x)[::-1])[::-1]


NORMA = {"i": "I", "ii": "II", "iii": "III", "avr": "AVR", "avl": "AVL", "avf": "AVF",
         "v1": "V1", "v2": "V2", "v3": "V3", "v4": "V4", "v5": "V5", "v6": "V6"}


def _norma(sig):
    return {NORMA.get(k.lower(), k): v for k, v in sig.items()}


def desenha(nome, seg=2.5, titulo="", nota="", ritmo="II"):
    sig, fs = ptbxl.le_sinal(nome)
    return desenha_sinal(sig, fs, seg=seg, titulo=titulo, nota=nota, ritmo=ritmo,
                         fonte="PTB-XL (PhysioNet), CC BY 4.0 — registro " + nome.replace("_hr", ""))


def desenha_sinal(sig, fs, seg=2.5, titulo="", nota="", ritmo="II", fonte="", ini=0.0):
    """12 derivações no arranjo 4x3 + tira de ritmo, como sai do aparelho.

    O ganho é escolhido pelo traçado: ECG real tem R de 20 mm em V4 e, a 10 mm/mV, a onda invade
    a raia de cima. Aparelho de verdade resolve isso do mesmo jeito — cai para 5 mm/mV e imprime
    o pulso de calibração pela metade, para quem lê saber. O rodapé diz qual ganho está em uso.
    """
    sig = {k: _filtra(v, fs) for k, v in _norma(sig).items()}
    off = int(ini * fs)
    sig = {k: v[off:] for k, v in sig.items()}
    n = int(seg * fs)
    colw, mx, my = 62.5, 10.0, 12.0
    pico = max(max(abs(x) for x in v) for v in sig.values())
    # a raia CRESCE para caber a onda; só se nem assim couber é que o ganho cai pela metade —
    # meio ganho encolhe a onda P junto, e é justamente a P que várias figuras precisam mostrar
    ganho = gf.MM_MV
    rowh = max(42.0, 2 * (pico * ganho + 3))
    if rowh > 68:
        ganho, rowh = gf.MM_MV / 2, max(42.0, 2 * (pico * gf.MM_MV / 2 + 3))
    W, H = mx + 4 * colw + 4, my + 3 * rowh + 46 + 10
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" '
         f'aria-label="{gf.esc(titulo)}">', gf.GRID,
         f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
         f'<rect x="{mx}" y="{my}" width="{4*colw:.1f}" height="{3*rowh+46:.1f}" fill="url(#p5)"/>',
         f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" '
         f'font-weight="600" fill="#23272E">{gf.esc(titulo)}</text>']
    if nota:
        o.append(f'<text x="{W-4:.0f}" y="{my-4:.0f}" text-anchor="end" '
                 f'font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">'
                 f'{gf.esc(nota)}</text>')

    def traco(d, x0, y0, ini, dur):
        pts = [(i / fs, sig[d][ini + i]) for i in range(int(dur * fs)) if ini + i < len(sig[d])]
        xy = gf._rala([(x0 + t * gf.MM_S, y0 - v * ganho) for t, v in pts])
        return ('<polyline fill="none" stroke="#23272E" stroke-width=".45" '
                'stroke-linejoin="round" points="'
                + " ".join(f"{x:.2f},{y:.2f}" for x, y in xy) + '"/>')

    for c, col in enumerate(ORDEM):
        for r, d in enumerate(col):
            x0 = mx + c * colw + (7 if c == 0 else 2)
            y0 = my + r * rowh + rowh / 2
            o.append(traco(d, x0, y0, int(c * seg * fs), seg))
            if c == 0:
                o.append(_calib(mx + 1, y0, ganho))
            o.append(f'<text x="{x0+1:.1f}" y="{my+r*rowh+5:.1f}" font-family="Figtree,'
                     f'system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">'
                     f'{ROTULO.get(d, d)}</text>')
    y0 = my + 3 * rowh + 24
    o.append(traco(ritmo, mx + 7, y0, 0, (4 * colw - 14) / gf.MM_S))
    o.append(_calib(mx + 1, y0, ganho))
    o.append(f'<text x="{mx+8:.0f}" y="{my+3*rowh+6:.0f}" font-family="Figtree,system-ui,'
             f'sans-serif" font-size="3.6" font-weight="600" fill="#23272E">'
             f'{ROTULO.get(ritmo, ritmo)}</text>')
    g = "10 mm/mV" if ganho == gf.MM_MV else "5 mm/mV (metade do ganho)"
    o.append(f'<text x="{mx}" y="{H-3:.0f}" font-family="Figtree,system-ui,sans-serif" '
             f'font-size="3.2" fill="#5E646B">25 mm/s · {g} · {gf.esc(fonte)}</text>')
    o.append('</svg>')
    return "".join(o), sig, fs


def tira(nome, deriv="II", seg=8.0, titulo="", nota=""):
    sig, fs = ptbxl.le_sinal(nome)
    return tira_sinal(sig[deriv], fs, deriv=deriv, seg=seg, titulo=titulo, nota=nota,
                      fonte="PTB-XL (PhysioNet), CC BY 4.0 — registro " + nome.replace("_hr", ""))


def tira_sinal(canal, fs, deriv="II", seg=8.0, titulo="", nota="", fonte="", ini=0.0):
    """Uma derivação na largura inteira — o formato em que ritmo e bloqueio se leem."""
    v = _filtra(canal[int(ini * fs):], fs)
    pico = max(abs(x) for x in v)
    ganho = gf.MM_MV if pico * gf.MM_MV < 20 else gf.MM_MV / 2
    mx, my = 10.0, 12.0
    W, H = mx + seg * gf.MM_S + 6, my + 50
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" '
         f'aria-label="{gf.esc(titulo)}">', gf.GRID,
         f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
         f'<rect x="{mx}" y="{my}" width="{seg*gf.MM_S:.1f}" height="42" fill="url(#p5)"/>',
         f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" '
         f'font-weight="600" fill="#23272E">{gf.esc(titulo)}</text>']
    if nota:
        o.append(f'<text x="{W-4:.0f}" y="{my-4:.0f}" text-anchor="end" font-family="Figtree,'
                 f'system-ui,sans-serif" font-size="3.4" fill="#5E646B">{gf.esc(nota)}</text>')
    y0 = my + 23
    xy = gf._rala([(mx + 8 + i / fs * gf.MM_S, y0 - v[i] * ganho)
                   for i in range(min(len(v), int(seg * fs)))])
    o.append('<polyline fill="none" stroke="#23272E" stroke-width=".45" stroke-linejoin="round" '
             'points="' + " ".join(f"{x:.2f},{y:.2f}" for x, y in xy) + '"/>')
    o.append(_calib(mx + 1, y0, ganho))
    o.append(f'<text x="{mx+9:.0f}" y="{my+5:.0f}" font-family="Figtree,system-ui,sans-serif" '
             f'font-size="3.6" font-weight="600" fill="#23272E">{ROTULO.get(deriv, deriv)}</text>')
    g = "10 mm/mV" if ganho == gf.MM_MV else "5 mm/mV"
    o.append(f'<text x="{mx}" y="{H-3:.0f}" font-family="Figtree,system-ui,sans-serif" '
             f'font-size="3.2" fill="#5E646B">25 mm/s · {g} · {gf.esc(fonte)}</text>')
    o.append('</svg>')
    return "".join(o)


def _calib(x, y, ganho):
    """Pulso de calibração de 1 mV — meia altura quando o ganho está pela metade."""
    a = ganho
    return (f'<path d="M{x:.1f} {y:.1f}h1.6v{-a:.1f}h4v{a:.1f}h1.6" fill="none" '
            f'stroke="#23272E" stroke-width=".45"/>')


def _suave(v, k):
    return [sum(v[max(0, i-k):i+k+1]) / len(v[max(0, i-k):i+k+1]) for i in range(len(v))]


def mede(sig, fs, deriv="II"):
    """PENEIRA, não laudo. Serve para DESCARTAR candidato, nunca para escrever número em legenda.

    Em 09/09/2026 eu publiquei "PR 300 ms" a partir de uma janela de busca de 300 ms — o número
    era o tamanho da janela, não uma medida. O Matheus desmontou olhando. Depois de corrigido, o
    detector ainda agarrava a cauda da onda T num registro e o platô do segmento PR em outro.
    Por isso o que importa aqui é a DISPERSÃO: se o PR varia muito entre batimentos do mesmo
    traçado, o detector está discordando de si mesmo e o registro não entra. Quem afirma o
    diagnóstico é o laudo do cardiologista que leu o paciente.
    """
    v = sig[deriv]
    dv = [(v[i+1] - v[i]) * fs for i in range(len(v) - 1)]
    lim = 0.4 * max(abs(x) for x in dv)
    picos, i = [], 0
    while i < len(dv):
        if abs(dv[i]) > lim:
            j = i
            while j < len(dv) and abs(dv[j]) > lim * 0.25:
                j += 1
            picos.append(max(range(i, min(j + 1, len(v))), key=lambda k: abs(v[k])))
            i = j + int(0.25 * fs)
        else:
            i += 1
    rr = [(b - a) / fs for a, b in zip(picos, picos[1:])]
    fc = 60 / (sum(rr) / len(rr)) if rr else 0
    prs = []
    for p in picos:
        lim2 = 0.06 * max(abs(dv[k]) for k in range(max(0, p - int(.05*fs)),
                                                    min(len(dv), p + int(.05*fs))))
        q0 = p
        while q0 > 1 and abs(dv[q0-1]) > lim2:
            q0 -= 1
        ini, fim = q0 - int(0.32 * fs), q0 - int(0.03 * fs)
        if ini < 0:
            continue
        w = _suave(v[ini:fim], int(0.012 * fs))
        base = sorted(w[:max(3, len(w)//3)])[max(3, len(w)//3)//2]
        kp = max(range(len(w)), key=lambda k: abs(w[k] - base))
        amp = abs(w[kp] - base)
        if amp < 0.025:
            continue
        k = kp
        while k > 0 and abs(w[k] - base) > amp * 0.15:
            k -= 1
        prs.append((q0 - (ini + k)) / fs * 1000)
    med = sorted(prs)[len(prs)//2] if prs else None
    disp = (max(prs) - min(prs)) if len(prs) > 2 else None
    return {"fc": fc, "n_qrs": len(picos), "pr": med, "pr_disp": disp,
            "rr_disp": (max(rr) - min(rr)) * 1000 if len(rr) > 2 else None}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("registro")
    ap.add_argument("--saida", default="/tmp/ptbxl.svg")
    ap.add_argument("--titulo", default="")
    ap.add_argument("--nota", default="")
    a = ap.parse_args()
    svg, sig, fs = desenha(a.registro, titulo=a.titulo, nota=a.nota)
    pathlib.Path(a.saida).write_text(svg)
    m = mede(sig, fs)
    print("%s -> %s" % (a.registro, a.saida))
    print("  FC %.0f bpm · %d QRS · PR %s (dispersão %s) — peneira, não laudo" % (
        m["fc"], m["n_qrs"], "%.0f ms" % m["pr"] if m["pr"] else "—",
        "%.0f ms" % m["pr_disp"] if m["pr_disp"] else "—"))
