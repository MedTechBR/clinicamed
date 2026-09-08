#!/usr/bin/env python3
"""Gera as figuras das leituras: eletrocardiogramas e esquemas, em SVG.

POR QUE GERAR EM VEZ DE COPIAR. A biblioteca do Matheus (~/Documents/Livros/) é toda de
terceiros: diretrizes publicadas em revista (Circulation, European Heart Journal), livros
(Goldman-Cecil, HC-FMUSP, ATLS) e cadernos de cursinho. Recortar figura de lá e republicar
num produto público e pago é violação de direito autoral, e a exposição é do Matheus. Um
traçado sintetizado aqui não tem esse problema — e, para ensinar, é melhor: a morfologia sai
exatamente no ponto que a leitura quer mostrar, sem artefato, sem nome de paciente, sem
recorte ruim.

O papel é sempre claro (papel de ECG é rosa/branco de verdade), mesmo no tema escuro.
Escala padrão: 25 mm/s e 10 mm/mV. 1 unidade do viewBox = 1 mm.

Uso:  python3 gera_figuras.py            (gera tudo em leituras/fig/)
      python3 gera_figuras.py --lista    (só lista o catálogo)
"""
import math, pathlib, sys, json

MM_S, MM_MV = 25.0, 10.0          # varredura e ganho padrão
FS = 500                           # amostras por segundo

# ---------------------------------------------------------------- formas de onda
def _gauss(t, c, w, a):
    if w <= 0: return 0.0
    z = (t - c) / (w / 2.4)
    return a * math.exp(-0.5 * z * z)

def _tri(t, c, w, a):
    """Deflexão triangular — é o que dá o aspecto anguloso do QRS."""
    d = abs(t - c)
    return 0.0 if d > w / 2 else a * (1 - d / (w / 2))

P_INI = 0.05      # onde a onda P COMEÇA dentro do batimento (s)
P_SIG = 0.026     # sigma da P: largura visível ~4 sigma = 104 ms (P normal <= 120 ms)


def beat(t, L, rr):
    """mV no instante t (s) de um batimento que começa em 0. L = parâmetros da derivação.

    O intervalo PR é do INÍCIO DA P ao INÍCIO DO QRS. Por isso a P é ancorada em P_INI e o QRS
    começa em P_INI + pr — mexer em `pr` move só o QRS.

    Era aqui o defeito que o Matheus encontrou em 08/09/2026: a P ficava em `pr - 0.10` e o QRS
    em `pr`, então aumentar `pr` empurrava OS DOIS juntos e o PR desenhado era sempre
    280 + 30*qd ms, independentemente de `pr`. O ECG de BAV de 1º grau saía com o mesmo PR do
    normal — e o "normal" saía com 283 ms, que já é bloqueio. A P também tinha sigma 0.09, ou
    seja, 360 ms de largura: três vezes uma P normal, larga demais para o PR ser legível.
    Conferir com `python3 docs/audita_ecg.py` a cada mexida aqui."""
    v = 0.0
    pr  = L.get("pr", 0.16)
    qd  = L.get("qd", 0.09)                    # duração do QRS
    qrs0 = P_INI + pr                          # início do QRS = um PR depois do início da P
    # onda P (ausente na FA/flutter/TV; bífida ou apiculada conforme amplitude)
    if L.get("p", 0.0) or L.get("p2"):
        v += _gauss(t, P_INI + 2 * P_SIG, P_SIG, L.get("p", 0.0))
        if L.get("p2"): v += _gauss(t, P_INI + 2 * P_SIG + 0.045, P_SIG, L["p2"])
    # onda delta (pré-excitação): empastamento subindo antes do QRS
    if L.get("delta"):
        v += _tri(t, qrs0 + 0.02, 0.08, L["delta"])
    # QRS
    v += _tri(t, qrs0 + qd * 0.18, qd * 0.30, L.get("q", 0.0))
    v += _tri(t, qrs0 + qd * 0.45, qd * 0.42, L.get("r", 0.0))
    v += _tri(t, qrs0 + qd * 0.78, qd * 0.38, L.get("s", 0.0))
    if L.get("r2"):                             # R' (BRD, Brugada, padrão de VD)
        v += _tri(t, qrs0 + qd * 0.95, qd * 0.34, L["r2"])
    # segmento ST + onda T
    st = L.get("st", 0.0)
    jt = qrs0 + qd
    tc = jt + L.get("tdel", 0.16)
    # sigma da T: 0.055 da ~220 ms de largura visivel (T normal 160-200 ms). Estava em 0.17,
    # ou seja 680 ms — a T invadia o segmento ST e o proprio batimento seguinte, e media-se
    # "supra de ST" de 0,11 mV num tracado normal so por causa do ramo ascendente da T.
    tw = L.get("tw", 0.055)
    if t > jt:
        # o ST decai suavemente para a linha da T
        v += st * max(0.0, 1 - (t - jt) / max(0.001, tc - jt) * 0.35)
    v += _gauss(t, tc, tw, L.get("t", 0.30))
    if L.get("u"):
        v += _gauss(t, tc + tw * 1.15, 0.10, L["u"])
    return v

def traco(L, dur, hr, ini=0.0, irregular=False, seed=7):
    """Amostra `dur` segundos da derivação L a `hr` bpm. irregular = FA."""
    rr = 60.0 / hr
    pts, t, rnd = [], 0.0, seed
    # instantes de início de cada batimento
    inicios, x = [], -ini
    while x < dur + 2 * rr:
        inicios.append(x)
        passo = rr
        if irregular:
            rnd = (1103515245 * rnd + 12345) % 2147483648
            passo = rr * (0.62 + 1.05 * (rnd / 2147483648))
        x += passo
    # bigeminismo: entre dois sinusais entra uma extrassístole larga, sem P, mais precoce
    extras = []
    if L.get("bigem"):
        extras = [(b + rr * 0.52, dict(p=0, p2=0, q=0, r=-0.35, s=-1.7, r2=0.2, t=0.62,
                                       pr=0.0, qd=0.16, tdel=0.20, tw=0.20)) for b in inicios]
        inicios = [b for k, b in enumerate(inicios)]
    n = int(dur * FS)
    for i in range(n + 1):
        t = i / FS
        v = L.get("base", 0.0)
        for b in inicios:
            if -0.05 < t - b < 0.75:
                v += beat(t - b, L, rr)
        for b, LE in extras:
            if -0.05 < t - b < 0.75:
                v += beat(t - b, LE, rr)
        if L.get("fib"):        # ondulação fina/grosseira da FA
            v += L["fib"] * (math.sin(t * 2 * math.pi * 7.3) + 0.6 * math.sin(t * 2 * math.pi * 11.7))
        if L.get("spike"):      # espícula do marca-passo: risco vertical fino antes do QRS
            for b in inicios:
                if 0 <= t - (b + L.get("pr", 0.0)) < 0.004: v += 1.6
        if L.get("flutter"):    # dente de serra a ~300/min
            ph = (t * 5.0) % 1.0
            v += L["flutter"] * (2 * ph - 1)
        pts.append((t, v))
    return pts

# ---------------------------------------------------------------- desenho
GRID = ('<defs>'
        '<pattern id="p1" width="1" height="1" patternUnits="userSpaceOnUse">'
        '<path d="M1 0V1M0 1H1" fill="none" stroke="#F3C9C3" stroke-width=".12"/></pattern>'
        '<pattern id="p5" width="5" height="5" patternUnits="userSpaceOnUse">'
        '<rect width="5" height="5" fill="url(#p1)"/>'
        '<path d="M5 0V5M0 5H5" fill="none" stroke="#E39C93" stroke-width=".3"/></pattern>'
        '</defs>')

def _rala(xy, tol=0.02):
    """Tira o ponto que está praticamente sobre a reta entre o anterior e o seguinte.
    Sem isso cada traçado sai com 5.000 pontos e o SVG passa de 100 KB — com isso cai a
    um décimo e o desenho fica idêntico (tolerância de 0,02 mm, bem abaixo do traço)."""
    if len(xy) < 3: return xy
    out = [xy[0]]
    for i in range(1, len(xy) - 1):
        x0, y0 = out[-1]; x1, y1 = xy[i]; x2, y2 = xy[i + 1]
        dx, dy = x2 - x0, y2 - y0
        n = math.hypot(dx, dy)
        dev = abs(dy * (x1 - x0) - dx * (y1 - y0)) / n if n else 0
        if dev > tol: out.append(xy[i])
    out.append(xy[-1])
    return out

def polyline(pts, x0, y0, cor="#1A1A1A", lw=0.42):
    xy = _rala([(x0 + t * MM_S, y0 - v * MM_MV) for t, v in pts])
    d = "".join(("M" if i == 0 else "L") + f"{x:.2f} {y:.2f}" for i, (x, y) in enumerate(xy))
    return f'<path d="{d}" fill="none" stroke="{cor}" stroke-width="{lw}" stroke-linejoin="round" stroke-linecap="round"/>'

def calibracao(x0, y0):
    """Pulso de calibração de 1 mV × 0,2 s, como no aparelho."""
    return (f'<path d="M{x0} {y0}h2v-10h5v10h2" fill="none" stroke="#1A1A1A" stroke-width=".42"/>')

ORDEM12 = [["I", "II", "III"], ["aVR", "aVL", "aVF"], ["V1", "V2", "V3"], ["V4", "V5", "V6"]]

def svg12(leads, titulo, hr, irregular=False, rotulo_ritmo="II", nota=""):
    colw, rowh, mx, my = 62.5, 40.0, 10.0, 12.0
    W, H = mx + 4 * colw + 4, my + 3 * rowh + 44 + 8
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="{titulo}">',
           GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
           f'<rect x="{mx}" y="{my}" width="{4*colw:.1f}" height="{3*rowh+44:.1f}" fill="url(#p5)"/>',
           f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">{titulo}</text>']
    if nota:
        out.append(f'<text x="{W-4:.0f}" y="{my-4:.0f}" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">{nota}</text>')
    for c, col in enumerate(ORDEM12):
        for r, nome in enumerate(col):
            x0 = mx + c * colw + (6 if c == 0 else 2)
            y0 = my + r * rowh + rowh / 2
            L = leads.get(nome, leads.get("_", {}))
            dur = (colw - (8 if c == 0 else 4)) / MM_S
            out.append(polyline(traco(L, dur, hr, ini=0.06 + c * 0.11, irregular=irregular, seed=7 + c), x0, y0))
            if c == 0:
                out.append(calibracao(mx + 1, y0))
            out.append(f'<text x="{x0+1:.1f}" y="{y0-13:.1f}" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">{nome}</text>')
    # tira de ritmo
    y0 = my + 3 * rowh + 22
    L = leads.get(rotulo_ritmo, leads.get("_", {}))
    out.append(polyline(traco(L, 9.6, hr, irregular=irregular, seed=21), mx + 2, y0))
    out.append(f'<text x="{mx+3:.0f}" y="{y0-13:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">{rotulo_ritmo}</text>')
    out.append(f'<text x="{mx}" y="{H-2:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>')
    out.append('</svg>')
    return "".join(out)

def svgtira(L, titulo, hr, dur=10.0, irregular=False, nota="", rotulo="II"):
    mx, my = 10.0, 12.0
    W, H = mx + dur * MM_S + 6, my + 42
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="{titulo}">',
           GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
           f'<rect x="{mx}" y="{my}" width="{dur*MM_S:.1f}" height="34" fill="url(#p5)"/>',
           f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">{titulo}</text>']
    if nota:
        out.append(f'<text x="{W-4:.0f}" y="{my-4:.0f}" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">{nota}</text>')
    out.append(polyline(traco(L, dur - 0.25, hr, irregular=irregular, seed=13), mx + 2, my + 17))
    out.append(f'<text x="{mx+3:.0f}" y="{my+5:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">{rotulo}</text>')
    out.append(f'<text x="{mx}" y="{H-2:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>')
    out.append('</svg>')
    return "".join(out)

# ---------------------------------------------------------------- derivações base
def normal():
    """Doze derivações de um traçado normal — base de todas as variações."""
    def B(**k):
        d = dict(p=.12, q=-.05, r=.9, s=-.15, t=.30); d.update(k); return d
    return {
        "I":  B(r=.7, t=.22), "II": B(r=1.05, p=.15, t=.33), "III": B(r=.45, p=.08, t=.14),
        "aVR": dict(p=-.10, q=.05, r=-.75, s=0, t=-.22, base=0),
        "aVL": B(r=.42, p=.06, t=.14), "aVF": B(r=.75, p=.12, t=.24),
        "V1": dict(p=.10, q=0, r=.25, s=-1.0, t=-.10),
        "V2": dict(p=.12, q=0, r=.45, s=-1.5, t=.45),
        "V3": dict(p=.12, q=0, r=.8, s=-1.1, t=.50),
        "V4": dict(p=.12, q=-.05, r=1.6, s=-.5, t=.45),
        "V5": B(r=1.5, s=-.25, t=.38), "V6": B(r=1.1, s=-.15, t=.30),
    }

def mod(base, **por_lead):
    d = {k: dict(v) for k, v in base.items()}
    for lead, ch in por_lead.items():
        if lead == "_todas":
            for k in d: d[k].update(ch)
        else:
            d.setdefault(lead, {}); d[lead].update(ch)
    return d

# ---------------------------------------------------------------- catálogo
def catalogo():
    F = {}
    n = normal()

    F["ecg-normal"] = ("Eletrocardiograma normal", svg12(n, "Traçado normal, ritmo sinusal a 68 bpm", 68,
        nota="P antes de cada QRS · PR 160 ms · QRS 90 ms"))

    # STEMI inferior com imagem em espelho
    sup = mod(n, II=dict(st=.35, t=.5), III=dict(st=.42, t=.45, r=.5), aVF=dict(st=.38, t=.48),
                 I=dict(st=-.12, t=.10), aVL=dict(st=-.18, t=-.10))
    F["ecg-stemi-inferior"] = ("Infarto com supra de ST inferior",
        svg12(sup, "Supra de ST em II, III e aVF com infra recíproco em I e aVL", 62,
              nota="parede inferior · pedir V3R–V4R e V7–V9"))

    ant = mod(n, V1=dict(st=.35, r=.2, s=-.5, t=.55), V2=dict(st=.55, r=.35, s=-.6, t=.8),
                 V3=dict(st=.55, r=.5, s=-.4, t=.8), V4=dict(st=.40, r=.9, s=-.2, t=.6),
                 V5=dict(st=.22, t=.45), aVL=dict(st=.15), III=dict(st=-.15, t=-.05), aVF=dict(st=-.12))
    F["ecg-stemi-anterior"] = ("Infarto com supra de ST anterior extenso",
        svg12(ant, "Supra de ST de V1 a V4 com onda R em progressão perdida", 88,
              nota="parede anterior · descendente anterior proximal"))

    post = mod(n, V1=dict(st=-.30, r=.9, s=-.35, t=.35), V2=dict(st=-.40, r=1.3, s=-.4, t=.45),
                  V3=dict(st=-.30, r=1.2, s=-.5, t=.40), II=dict(st=.10), III=dict(st=.12), aVF=dict(st=.12))
    F["ecg-infarto-posterior"] = ("Infarto de parede posterior",
        svg12(post, "Infra de ST com R alta em V1–V3: imagem em espelho do supra posterior", 70,
              nota="confirmar com V7–V9 · é supra, não isquemia anterior"))

    isq = mod(n, aVR=dict(st=.22, t=-.05), V4=dict(st=-.28, t=-.12), V5=dict(st=-.30, t=-.15),
                 V6=dict(st=-.25, t=-.12), I=dict(st=-.18), II=dict(st=-.22, t=-.05))
    F["ecg-infra-difuso-avr"] = ("Infra difuso com supra em aVR",
        svg12(isq, "Infra de ST em várias derivações com supra em aVR", 104,
              nota="tronco de coronária esquerda ou triarterial até prova em contrário"))

    # Arritmias — tiras de ritmo
    F["ecg-fibrilacao-atrial"] = ("Fibrilação atrial",
        svgtira(dict(p=0, q=-.05, r=1.0, s=-.2, t=.28, fib=.055), "Fibrilação atrial com resposta ventricular rápida",
                126, irregular=True, nota="sem onda P · RR irregularmente irregular"))

    F["ecg-flutter"] = ("Flutter atrial 2:1",
        svgtira(dict(p=0, q=-.04, r=.9, s=-.15, t=.10, flutter=.11), "Flutter atrial com condução 2:1",
                150, nota="dente de serra a ~300/min · ventricular a ~150"))

    F["ecg-tsv"] = ("Taquicardia supraventricular",
        svgtira(dict(p=0, q=0, r=1.0, s=-.22, t=.20, pr=.10, qd=.08), "Taquicardia de QRS estreito, regular, a 180 bpm",
                180, nota="sem P visível · QRS < 120 ms"))

    F["ecg-tv-monomorfica"] = ("Taquicardia ventricular monomórfica",
        svgtira(dict(p=0, q=0, r=1.5, s=-1.0, t=-.5, pr=.0, qd=.17, tdel=.20, tw=.20),
                "Taquicardia de QRS largo, regular, monomórfica, a 168 bpm", 168,
                nota="QRS > 120 ms · é TV até prova em contrário"))

    tdp = dict(p=0, q=0, r=1.2, s=-1.0, t=0, pr=0, qd=.16)
    strip = []
    pts = []
    for i in range(int(6.0 * FS)):
        t = i / FS
        env = 0.35 + 0.85 * abs(math.sin(t * math.pi / 1.55))
        pts.append((t, env * math.sin(t * 2 * math.pi * 3.6) * 1.15))
    mx, my = 10.0, 12.0
    W, H = mx + 6.0 * MM_S + 6, my + 42
    tor = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="Torsades de pointes">',
           GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
           f'<rect x="{mx}" y="{my}" width="{6.0*MM_S:.1f}" height="34" fill="url(#p5)"/>',
           f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">Torsades de pointes</text>',
           f'<text x="{W-4:.0f}" y="{my-4:.0f}" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">eixo que gira em torno da linha de base · QT longo</text>',
           polyline(pts, mx + 2, my + 17),
           f'<text x="{mx}" y="{H-2:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>', '</svg>']
    F["ecg-torsades"] = ("Torsades de pointes", "".join(tor))

    F["ecg-fa-pre-excitada"] = ("Fibrilação atrial pré-excitada",
        svgtira(dict(p=0, q=0, r=1.3, s=-.6, t=-.3, delta=.45, qd=.15, fib=.03),
                "FA pré-excitada: QRS largo, irregular e de morfologia variável", 210, irregular=True,
                nota="nenhum bloqueador do nó AV · cardioversão"))

    F["ecg-wpw"] = ("Pré-excitação (Wolff-Parkinson-White)",
        svg12(mod(n, _todas=dict(delta=.30, pr=.12, qd=.13)), "PR curto com onda delta e QRS alargado", 72,
              nota="empastamento inicial do QRS"))

    # Bloqueios
    F["ecg-bav1"] = ("Bloqueio atrioventricular de primeiro grau",
        svgtira(dict(p=.16, q=-.05, r=1.0, s=-.2, t=.30, pr=.30), "BAV de 1º grau: PR fixo e longo (300 ms)", 62,
                nota="todo P conduz · PR > 200 ms"))

    # Mobitz I e II e BAVT precisam de P dissociado: monta na mão
    def strip_bloqueio(nome, titulo, nota, ps, qrss, dur=9.0):
        W, H = 10 + dur * MM_S + 6, 12 + 42
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="{titulo}">',
             GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
             f'<rect x="10" y="12" width="{dur*MM_S:.1f}" height="34" fill="url(#p5)"/>',
             f'<text x="10" y="8" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">{titulo}</text>',
             f'<text x="{W-4:.0f}" y="8" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">{nota}</text>']
        pts = []
        for i in range(int((dur - .3) * FS)):
            t = i / FS
            v = 0.0
            for tp in ps: v += _gauss(t, tp, .09, .16)
            for tq, largo in qrss:
                d = t - tq
                if -.02 < d < .55:
                    qd = .15 if largo else .09
                    v += _tri(d, qd * .18, qd * .30, -.05) + _tri(d, qd * .45, qd * .42, 1.0) + _tri(d, qd * .78, qd * .38, -.2)
                    v += _gauss(d, qd + .17, .17, .28 if not largo else -.30)
            pts.append((t, v))
        o.append(polyline(pts, 12, 29))
        o.append(f'<text x="13" y="17" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">II</text>')
        o.append(f'<text x="10" y="{H-2:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>')
        o.append('</svg>')
        return (nome, "".join(o))

    ps, qs, t = [], [], 0.35
    for ciclo in range(3):                       # Wenckebach 4:3
        for k, pr in enumerate([.18, .26, .38, None]):
            ps.append(t)
            if pr: qs.append((t + pr, False))
            t += .84
    F["ecg-mobitz1"] = strip_bloqueio("Bloqueio AV de segundo grau Mobitz I",
        "Mobitz I (Wenckebach): PR alonga até uma P bloquear", "ciclo 4:3 · nó AV · costuma responder a atropina", ps, qs)

    ps, qs, t = [], [], 0.3
    for k in range(10):
        ps.append(t)
        if k % 3 != 2: qs.append((t + .17, True))
        t += .82
    F["ecg-mobitz2"] = strip_bloqueio("Bloqueio AV de segundo grau Mobitz II",
        "Mobitz II: PR fixo e P que bloqueia sem aviso", "QRS largo · infranodal · marca-passo", ps, qs)

    ps = [0.25 + i * 0.72 for i in range(12)]
    qs = [(0.55 + i * 1.75, True) for i in range(5)]
    F["ecg-bavt"] = strip_bloqueio("Bloqueio atrioventricular total",
        "BAV total: P e QRS em ritmos independentes", "dissociação AV · escape largo a ~34 bpm", ps, qs)

    # Distúrbios eletrolíticos e outros padrões
    F["ecg-hipercalemia"] = ("Hipercalemia",
        svg12(mod(n, _todas=dict(t=.85, tw=.045, p=.03, qd=.13)), "Ondas T apiculadas e estreitas, P achatada, QRS alargando", 64,
              nota="hipercalemia · cálcio agora"))

    F["ecg-brugada"] = ("Padrão de Brugada tipo 1",
        svg12(mod(n, V1=dict(r=.3, r2=.55, s=-.2, st=.28, t=-.35, qd=.12),
                     V2=dict(r=.35, r2=.6, s=-.25, st=.32, t=-.40, qd=.12)),
              "Supra de ST descendente em V1–V2 com T negativa", 72, nota="tipo 1 · em côncavo para baixo"))

    F["ecg-pericardite"] = ("Pericardite aguda",
        svg12(mod(n, _todas=dict(st=.16), aVR=dict(st=-.18, r=-.75, t=-.20), V1=dict(st=.05)),
              "Supra de ST difuso, côncavo, com infra de PR", 92, nota="difuso · sem território coronariano"))

    F["ecg-tep"] = ("Sobrecarga aguda de ventrículo direito",
        svg12(mod(n, I=dict(s=-.35, r=.55), III=dict(q=-.35, r=.5, t=-.22), aVF=dict(t=-.10),
                     V1=dict(r=.5, s=-.5, r2=.35, t=-.28), V2=dict(t=-.35), V3=dict(t=-.30), V4=dict(t=-.15)),
              "S em I, Q e T invertida em III, T negativa de V1 a V4", 112,
              nota="padrão do TEP · presente em minoria dos casos"))
    return F

def svgpainel(nomes, leads, titulo, hr, nota="", cols=2, irregular=False):
    """Painel pequeno com poucas derivações — para precordiais direitas e posteriores,
    que não cabem no arranjo de 12 e são justamente as que a prova cobra."""
    colw, rowh, mx, my = 66.0, 38.0, 10.0, 12.0
    linhas = (len(nomes) + cols - 1) // cols
    W, H = mx + cols * colw + 4, my + linhas * rowh + 12
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="{titulo}">',
           GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
           f'<rect x="{mx}" y="{my}" width="{cols*colw:.1f}" height="{linhas*rowh:.1f}" fill="url(#p5)"/>',
           f'<text x="{mx}" y="{my-4:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">{titulo}</text>']
    for i, nome in enumerate(nomes):
        c, r = i % cols, i // cols
        x0 = mx + c * colw + 6
        y0 = my + r * rowh + rowh / 2
        out.append(polyline(traco(leads[nome], (colw - 10) / MM_S, hr, ini=0.05, irregular=irregular, seed=9 + i), x0, y0))
        out.append(f'<text x="{x0+1:.1f}" y="{y0-12:.1f}" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">{nome}</text>')
    out.append(f'<text x="{mx}" y="{H-1.5:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV — ClínicaMed</text>')
    if nota:
        out.append(f'<text x="{W-4:.0f}" y="{H-1.5:.0f}" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">{nota}</text>')
    out.append('</svg>')
    return "".join(out)

# ---------------------------------------------------------------- ECG, segunda leva
def catalogo2():
    F, n = {}, normal()

    F["ecg-bre"] = ("Bloqueio de ramo esquerdo",
        svg12(mod(n, _todas=dict(qd=.15),
                  V1=dict(r=.15, s=-1.4, q=0, t=.45, qd=.15), V2=dict(r=.2, s=-1.6, q=0, t=.5, qd=.15),
                  V3=dict(r=.3, s=-1.3, q=0, t=.45, qd=.15),
                  V5=dict(q=0, r=1.5, r2=.5, s=-.05, t=-.35, qd=.15),
                  V6=dict(q=0, r=1.3, r2=.45, s=-.05, t=-.30, qd=.15),
                  I=dict(q=0, r=.9, r2=.3, s=-.05, t=-.20, qd=.15),
                  aVL=dict(q=0, r=.6, r2=.2, s=-.05, t=-.15, qd=.15)),
              "QRS ≥ 120 ms, R alargada em I, aVL, V5 e V6, S profunda em V1–V3", 74,
              nota="repolarização discordante · atenção aos critérios de Sgarbossa"))

    F["ecg-brd"] = ("Bloqueio de ramo direito",
        svg12(mod(n, _todas=dict(qd=.14),
                  V1=dict(r=.35, s=-.45, r2=.95, t=-.30, qd=.14),
                  V2=dict(r=.4, s=-.7, r2=.7, t=-.20, qd=.14),
                  V5=dict(s=-.45, t=.30, qd=.14), V6=dict(s=-.40, t=.26, qd=.14),
                  I=dict(s=-.35, qd=.14)),
              "QRS ≥ 120 ms com rSR' em V1 e S empastada em I, V5 e V6", 72,
              nota="orelha de coelho em V1"))

    F["ecg-hve"] = ("Hipertrofia ventricular esquerda",
        svg12(mod(n, V1=dict(s=-2.2, r=.2), V2=dict(s=-2.6, r=.3),
                  V5=dict(r=2.9, s=-.2, st=-.14, t=-.35), V6=dict(r=2.4, s=-.15, st=-.12, t=-.30),
                  aVL=dict(r=1.4, st=-.10, t=-.20), I=dict(r=1.5, t=-.12)),
              "Voltagem alta com padrão de sobrecarga em V5, V6, I e aVL", 66,
              nota="Sokolow-Lyon: S em V1 + R em V5/V6 ≥ 35 mm"))

    F["ecg-hipocalemia"] = ("Hipocalemia",
        svg12(mod(n, _todas=dict(t=.09, st=-.09, u=.20, tw=.06)),
              "T achatada, infra de ST discreto e onda U proeminente", 78,
              nota="hipocalemia · repor potássio e magnésio · risco de torsades"))

    F["ecg-marcapasso"] = ("Ritmo de marca-passo ventricular",
        svgtira(dict(p=0, q=0, r=-.25, s=-1.5, r2=.15, t=.55, pr=0, qd=.16, spike=1),
                "Estimulação ventricular: espícula seguida de QRS largo", 72,
                nota="morfologia de BRE quando o eletrodo está no VD · T discordante"))

    # precordiais direitas: o supra que só aparece se alguém pedir
    dir_ = {"V1": dict(p=.10, q=0, r=.3, s=-.7, st=.12, t=.10),
            "V3R": dict(p=.10, q=-.08, r=.35, s=-.35, st=.30, t=.35),
            "V4R": dict(p=.10, q=-.10, r=.30, s=-.30, st=.36, t=.40),
            "V5R": dict(p=.10, q=-.08, r=.35, s=-.25, st=.22, t=.28)}
    F["ecg-infarto-vd"] = ("Infarto de ventrículo direito (precordiais direitas)",
        svgpainel(["V1", "V3R", "V4R", "V5R"], dir_,
                  "Supra de ST em V3R–V4R no infarto inferior", 58,
                  nota="≥ 0,5 mm em V4R · sem nitrato · volume"))

    # De Winter: infra ascendente no ponto J com T apiculada — equivalente de oclusão da DA
    dw = {}
    for k, (r, s) in {"V1": (.3, -.9), "V2": (.5, -1.2), "V3": (.7, -1.0),
                      "V4": (1.3, -.6), "V5": (1.4, -.3), "V6": (1.1, -.2)}.items():
        dw[k] = dict(p=.12, q=0, r=r, s=s, st=-.24, t=1.10, tw=.13, tdel=.19)
    F["ecg-de-winter"] = ("Padrão de De Winter",
        svgpainel(["V1", "V2", "V3", "V4", "V5", "V6"], dw,
                  "Infra de ST ascendente no ponto J com T alta e apiculada", 84, cols=3,
                  nota="equivalente de oclusão da descendente anterior — trata como supra"))

    # TV com os três achados que a ESC chama de diagnósticos: dissociação AV, captura e fusão
    def tv_dissociacao():
        dur, W, H = 10.0, 10 + 10.0 * MM_S + 6, 12 + 46
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="Taquicardia ventricular com dissociação atrioventricular, batimento de captura e batimento de fusão">',
             GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
             f'<rect x="10" y="12" width="{dur*MM_S:.1f}" height="34" fill="url(#p5)"/>',
             '<text x="10" y="8" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">Taquicardia ventricular: dissociação AV, captura e fusão</text>',
             f'<text x="{W-4:.0f}" y="8" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">os três achados que fecham o diagnóstico</text>']
        rr, prr = 0.40, 0.74          # ventrículo a 150/min, átrio a ~81/min, independentes
        vent = [0.18 + i * rr for i in range(25)]
        idx_cap, idx_fus = 11, 17     # um batimento capturado e um de fusão
        pts = []
        for i in range(int((dur - .3) * FS)):
            tt = i / FS
            v = 0.0
            for k in range(20):       # P marchando por conta própria, inclusive dentro do QRS
                v += _gauss(tt, 0.10 + k * prr, .09, .13)
            for k, b in enumerate(vent):
                d = tt - b
                if not (-.02 < d < .42): continue
                if k == idx_cap:      # captura: estreito, com P antes
                    v += _gauss(d, .02, .08, .14) + _tri(d, .18, .03, -.06) + _tri(d, .22, .04, 1.05) + _tri(d, .27, .035, -.18) + _gauss(d, .40, .13, .28)
                elif k == idx_fus:    # fusão: intermediário entre o estreito e o largo
                    v += _tri(d, .05, .05, -.10) + _tri(d, .10, .07, 1.25) + _tri(d, .17, .06, -.55) + _gauss(d, .30, .15, -.20)
                else:                 # o batimento da TV: largo e monomórfico
                    v += _tri(d, .03, .05, -.18) + _tri(d, .08, .075, 1.45) + _tri(d, .15, .065, -.95) + _gauss(d, .29, .17, -.42)
            pts.append((tt, v))
        o.append(polyline(pts, 12, 29))
        # setas apontando a captura e a fusão
        for k, rot in ((idx_cap, "captura"), (idx_fus, "fusão")):
            x = 12 + vent[k] * MM_S + 2
            o.append(f'<path d="M{x:.1f} 15 v6" stroke="#0B6A72" stroke-width=".7"/>')
            o.append(f'<text x="{x:.1f}" y="13.5" text-anchor="middle" font-family="Figtree,system-ui,sans-serif" font-size="3.4" font-weight="600" fill="#0B6A72">{rot}</text>')
        o.append('<text x="13" y="44" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">II</text>')
        o.append(f'<text x="10" y="{H-1.5:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>')
        o.append('</svg>')
        return "".join(o)
    F["ecg-tv-dissociacao"] = ("Taquicardia ventricular com dissociação AV, captura e fusão", tv_dissociacao())

    def tv_bidirecional():
        dur, W, H = 8.0, 10 + 8.0 * MM_S + 6, 12 + 46
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="Taquicardia ventricular bidirecional">',
             GRID, f'<rect width="{W:.0f}" height="{H:.0f}" fill="#FFF8F7"/>',
             f'<rect x="10" y="12" width="{dur*MM_S:.1f}" height="34" fill="url(#p5)"/>',
             '<text x="10" y="8" font-family="Figtree,system-ui,sans-serif" font-size="4.2" font-weight="600" fill="#23272E">Taquicardia ventricular bidirecional</text>',
             f'<text x="{W-4:.0f}" y="8" text-anchor="end" font-family="Figtree,system-ui,sans-serif" font-size="3.4" fill="#5E646B">eixo alterna a cada batimento · TVPC e intoxicação digitálica</text>']
        rr, pts = 0.40, []
        for i in range(int((dur - .3) * FS)):
            tt = i / FS
            v = 0.0
            for k in range(24):
                d = tt - (0.16 + k * rr)
                if not (-.02 < d < .40): continue
                s = 1 if k % 2 == 0 else -1     # é isto que a prova quer: a alternância do eixo
                v += _tri(d, .03, .05, -.15 * s) + _tri(d, .08, .075, 1.35 * s) + _tri(d, .15, .065, -.80 * s) + _gauss(d, .28, .16, -.35 * s)
            pts.append((tt, v))
        o.append(polyline(pts, 12, 29))
        o.append('<text x="13" y="44" font-family="Figtree,system-ui,sans-serif" font-size="3.6" font-weight="600" fill="#23272E">II</text>')
        o.append(f'<text x="10" y="{H-1.5:.0f}" font-family="Figtree,system-ui,sans-serif" font-size="3.2" fill="#5E646B">25 mm/s · 10 mm/mV · traçado sintetizado para ensino — ClínicaMed</text>')
        o.append('</svg>')
        return "".join(o)
    F["ecg-tv-bidirecional"] = ("Taquicardia ventricular bidirecional", tv_bidirecional())

    F["ecg-extrassistoles"] = ("Extrassístoles ventriculares em bigeminismo",
        svgtira(dict(p=.14, q=-.05, r=1.0, s=-.2, t=.30, bigem=1),
                "Bigeminismo ventricular: cada sinusal seguido de uma extrassístole larga", 68,
                nota="pausa compensadora · sem P precedente na larga"))
    return F

# ---------------------------------------------------------------- radiologia e ultrassom (esquemas)
def radiologia():
    """Esquemas de linha, não fotografias. Um desenho rotulado ensina o padrão melhor do que uma
    radiografia recortada — e não depende de imagem de terceiro. As cores acompanham o tema."""
    def base(w=300, h=330):
        return (f'<g fill="none" stroke="#5E646B" stroke-width="1.6">'
                # gradil costal
                + "".join(f'<path d="M{38+i*2} {96+i*30} q {112-i*4} {-26-i*2} {224-i*8} 0" opacity=".45"/>' for i in range(6))
                # contorno do tórax e cúpulas
                + '<path d="M150 44 q-58 6 -74 44 q-20 48 -22 132 q-2 44 8 78"/>'
                + '<path d="M150 44 q58 6 74 44 q20 48 22 132 q2 44 -8 78"/>'
                + '<path d="M62 274 q42 22 76 6" stroke-width="2"/>'
                + '<path d="M238 274 q-42 22 -76 6" stroke-width="2"/>'
                # coluna e traqueia
                + '<path d="M150 50v210" opacity=".35"/><path d="M138 50v42 M162 50v42" opacity=".5"/>'
                + '</g>')
    def coracao(d=None):
        # PA: a direita do paciente fica à ESQUERDA da imagem, então a silhueta cardíaca projeta-se
        # para a DIREITA da figura. A versão anterior desenhava o coração espelhado.
        pad = ("M132 156 C 128 196 134 234 146 258 C 168 272 200 268 206 254 "
               "C 198 220 190 186 182 158 C 176 142 156 138 144 144 C 136 148 133 149 132 156 Z")
        return f'<path d="{d or pad}" fill="#F1F1EC" stroke="#5E646B" stroke-width="1.8"/>'
    def wrap(nome, titulo, corpo, legenda, w=300, h=316):
        return (titulo, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{titulo}">'
                f'<style>text{{font-family:Figtree,system-ui,sans-serif}}.t{{font-size:12.5px;font-weight:600;fill:#23272E}}'
                f'.l{{font-size:10.5px;fill:#5E646B}}.k{{font-size:10.5px;font-weight:600;fill:#0B6A72}}</style>'
                f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>'
                f'<text class="t" x="10" y="20">{titulo}</text>{base()}{corpo}</svg>', legenda)
    F = {}
    F["rx-normal"] = wrap("rx-normal", "Radiografia de tórax — esquema normal",
        coracao() + '<path d="M108 150 q14 10 18 26 M192 150 q-14 10 -18 26" stroke="#5E646B" stroke-width="1.4" fill="none"/>'
        '<text class="k" x="196" y="196">hilo</text><text class="k" x="196" y="286">seio costofrênico</text>'
        '<text class="k" x="60" y="240">coração &lt; metade do tórax</text>',
        "Esquema — não é radiografia de paciente. Índice cardiotorácico normal, seios costofrênicos livres, cúpulas nítidas.")

    F["rx-derrame"] = wrap("rx-derrame", "Derrame pleural",
        coracao() + '<path d="M56 244 q46 -26 90 -2 l-2 34 q-40 26 -84 4 z" fill="#E3F1F1" stroke="#0B6A72" stroke-width="1.8"/>'
        '<path d="M56 244 q46 -26 90 -2" stroke="#0B6A72" stroke-width="2.6" fill="none"/>'
        '<text class="k" x="16" y="232">menisco</text>'
        '<text class="k" x="16" y="296">seio apagado</text>',
        "Opacidade homogênea de base com a borda superior côncava para cima (menisco) e apagamento do seio costofrênico.")

    F["rx-pneumotorax"] = wrap("rx-pneumotorax", "Pneumotórax hipertensivo",
        '<path d="M150 150 q42 8 52 58 q6 40 -28 52 q-28 10 -40 -8" fill="#F1F1EC" stroke="#5E646B" stroke-width="1.8"/>'
        '<path d="M96 96 q-24 60 -22 132 q-1 30 6 46" stroke="#C6453D" stroke-width="2.4" fill="none"/>'
        '<text class="k" x="16" y="150" fill="#C6453D">linha pleural</text>'
        '<text class="l" x="14" y="176">sem trama vascular</text>'
        '<path d="M150 50v210" stroke="#C6453D" stroke-width="2" stroke-dasharray="4 3"/>'
        '<text class="k" x="176" y="120" fill="#C6453D">mediastino desviado</text>',
        "Linha pleural visível, ausência de trama vascular além dela e desvio do mediastino para o lado oposto — o hipertensivo se trata antes da radiografia.")

    F["rx-congestao"] = wrap("rx-congestao", "Congestão pulmonar",
        '<path d="M126 154 C 120 200 126 240 142 262 C 168 278 204 272 212 256 C 202 220 194 184 186 156 C 180 140 156 136 142 142 C 132 147 127 148 126 154 Z" fill="#F1F1EC" stroke="#5E646B" stroke-width="1.8"/>'
        + "".join(f'<path d="M{70+i*8} {250+ (i%3)*8} h16" stroke="#0B6A72" stroke-width="1.8"/>' for i in range(6))
        + "".join(f'<path d="M{216-i*8} {250+ (i%3)*8} h16" stroke="#0B6A72" stroke-width="1.8"/>' for i in range(6))
        + '<ellipse cx="118" cy="168" rx="20" ry="12" fill="#E3F1F1" opacity=".8"/>'
        '<ellipse cx="182" cy="168" rx="20" ry="12" fill="#E3F1F1" opacity=".8"/>'
        '<text class="k" x="16" y="262">linhas B de Kerley</text>'
        '<text class="k" x="176" y="150">infiltrado peri-hilar</text>'
        '<text class="k" x="40" y="216">área cardíaca aumentada</text>',
        "Cardiomegalia, redistribuição para os ápices, infiltrado peri-hilar em asa de borboleta e linhas B de Kerley nas bases.")

    F["rx-consolidacao"] = wrap("rx-consolidacao", "Consolidação lobar",
        coracao() + '<path d="M60 150 q40 -14 82 -6 l-4 76 q-44 8 -84 -4 z" fill="#E3F1F1" stroke="#0B6A72" stroke-width="1.8"/>'
        '<text class="k" x="16" y="140">consolidação</text>'
        '<text class="l" x="16" y="238">broncograma aéreo dentro dela</text>'
        + "".join(f'<path d="M{74+i*14} {176+i*8} l 18 10" stroke="#FFF" stroke-width="2.2" fill="none"/>' for i in range(4)),
        "Opacidade que respeita o limite do lobo, com broncograma aéreo e sem desvio de estruturas — diferente do derrame, que decola e faz menisco.")

    # Ultrassom pulmonar: modo M
    def us(nome, titulo, corpo, legenda, w=320, h=250):
        return (titulo, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{titulo}">'
                f'<style>text{{font-family:Figtree,system-ui,sans-serif}}.t{{font-size:12.5px;font-weight:600;fill:#23272E}}'
                f'.l{{font-size:10.5px;fill:#5E646B}}.k{{font-size:10.5px;font-weight:600;fill:#0B6A72}}</style>'
                f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>'
                f'<text class="t" x="10" y="20">{titulo}</text>{corpo}</svg>', legenda)

    praia = ('<rect x="16" y="32" width="288" height="180" fill="#111"/>'
             '<rect x="16" y="32" width="288" height="52" fill="#2A2A2A"/>'
             + "".join(f'<path d="M16 {40+i*10}h288" stroke="#666" stroke-width="1.3"/>' for i in range(5))
             + '<path d="M16 88h288" stroke="#EEE" stroke-width="2.4"/>'
             + "".join(f'<circle cx="{20+ (i*7)%286}" cy="{96+(i*13)%110}" r="1.4" fill="#BBB" opacity=".8"/>' for i in range(220))
             + '<text class="k" x="24" y="56" fill="#EEE">linhas paralelas (parede)</text>'
             '<text class="k" x="24" y="120" fill="#EEE">areia (pulmão deslizando)</text>'
             '<text class="k" x="200" y="84" fill="#EEE">linha pleural</text>')
    F["us-praia"] = us("us-praia", "Ultrassom pulmonar em modo M — sinal da praia", praia,
        "Deslizamento pleural presente: acima da pleura, linhas paralelas; abaixo, aspecto granular. Afasta pneumotórax naquele ponto.")

    codigo = ('<rect x="16" y="32" width="288" height="180" fill="#111"/>'
              + "".join(f'<path d="M16 {40+i*10}h288" stroke="#666" stroke-width="1.3"/>' for i in range(17))
              + '<path d="M16 88h288" stroke="#EEE" stroke-width="2.4"/>'
              + '<text class="k" x="24" y="140" fill="#EEE">linhas paralelas até o fim</text>'
              '<text class="k" x="200" y="84" fill="#EEE">linha pleural</text>')
    F["us-codigo-barras"] = us("us-codigo-barras", "Ultrassom pulmonar em modo M — código de barras", codigo,
        "Sem deslizamento pleural: as linhas paralelas continuam abaixo da pleura. Sugere pneumotórax — confirme achando o ponto pulmonar.")

    linhasb = ('<path d="M160 34 L36 214 H284 Z" fill="#111"/>'
               '<path d="M60 78 h200" stroke="#EEE" stroke-width="2.6"/>'
               + "".join(f'<path d="M160 40 L{78+i*32} 214" stroke="#DDD" stroke-width="4" opacity=".75"/>' for i in range(5))
               + '<text class="k" x="196" y="70" fill="#EEE">linha pleural</text>'
               '<text class="k" x="176" y="150" fill="#EEE">linhas B</text>')
    F["us-linhas-b"] = us("us-linhas-b", "Ultrassom pulmonar — linhas B", linhasb,
        "Artefatos verticais que partem da pleura, apagam as linhas A e acompanham o deslizamento. Três ou mais num espaço = síndrome intersticial.")
    return F

# ---------------------------------------------------------------- radiografia de tórax (monografia)
def radiologia_torax():
    """Esquemas da monografia de radiografia de tórax. Desenho de linha rotulado, nunca radiografia
    de paciente: as imagens da aula de RX do material são de terceiro (Dr. Gebson Lopes, CRM 20411),
    e a biblioteca em ~/Documents/Livros é toda de terceiros.

    ORIENTAÇÃO PA: a direita do paciente aparece à ESQUERDA da imagem. Por isso o coração projeta-se
    para a direita da figura e a cúpula mais alta é a da esquerda da figura (a direita do paciente).

    Nada de <text> solto com frase longa: SVG não quebra linha e a legenda vaza para fora do quadro.
    Toda frase passa por txt(), que quebra por largura estimada em caracteres."""
    INK, INK2, BR, RED, AMB, OK = "#23272E", "#5E646B", "#0B6A72", "#C6453D", "#A3730A", "#1D7A46"
    CL, PAPEL = "#C7CBC4", "#FFFFFF"
    W, H = 620, 372

    def txt(x, y, s, cls="l", larg=44, dy=14, anchor="start"):
        """Quebra por contagem de caracteres — suficiente para fonte de 10,5 px em caixa fixa."""
        linhas, atual = [], ""
        for palavra in s.split():
            if len(atual) + len(palavra) + 1 > larg and atual:
                linhas.append(atual); atual = palavra
            else:
                atual = (atual + " " + palavra).strip()
        if atual: linhas.append(atual)
        return "".join(f'<text class="{cls}" x="{x}" y="{y + i * dy}" text-anchor="{anchor}">{l}</text>'
                       for i, l in enumerate(linhas))

    def moldura(titulo, corpo, legenda, w=W, h=H):
        return (titulo,
                f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{titulo}">'
                f'<style>text{{font-family:Figtree,system-ui,sans-serif}}'
                f'.t{{font-size:13.5px;font-weight:600;fill:{INK}}}.l{{font-size:10.5px;fill:{INK2}}}'
                f'.k{{font-size:10.5px;font-weight:600;fill:{BR}}}.r{{font-size:10.5px;font-weight:600;fill:{RED}}}'
                f'.a{{font-size:10.5px;font-weight:600;fill:{AMB}}}.v{{font-size:10.5px;font-weight:600;fill:{OK}}}'
                f'.n{{font-size:11.5px;font-weight:600;fill:{INK}}}</style>'
                f'<rect width="{w}" height="{h}" fill="{PAPEL}"/>'
                f'<text class="t" x="16" y="24">{titulo}</text>{corpo}</svg>', legenda)

    # --- tórax em caixa local de 210 x 250 ------------------------------------------------------
    CONT_D = "M105 16 C 66 20 34 54 26 104 C 21 140 20 170 23 190"
    CONT_E = "M105 16 C 144 20 176 54 184 104 C 189 140 190 170 187 190"
    CUP_D  = "M23 190 C 46 212 84 216 104 192"          # direita do paciente: mais alta
    CUP_E  = "M187 196 C 166 218 128 222 106 198"       # esquerda do paciente: fígado não a empurra
    CORACAO = ("M92 118 C 88 152 94 186 106 200 C 124 212 152 208 158 196 "
               "C 150 168 142 140 136 118 C 130 100 112 96 102 102 C 95 106 93 108 92 118 Z")

    def torax(x=0, y=0, s=1.0, coracao=True, costelas=True, hilos=True, dentro="", cupulas=True):
        g = [f'<g transform="translate({x},{y}) scale({s})">']
        g.append(f'<g fill="none" stroke="{INK2}" stroke-width="1.5">')
        if costelas:
            for i in range(6):
                g.append(f'<path d="M{30+i*2} {62+i*24} q {74-i*3} {-17-i} {148-i*6} 0" opacity=".32"/>')
        g.append(f'<path d="{CONT_D}"/><path d="{CONT_E}"/>')
        if cupulas:
            g.append(f'<path d="{CUP_D}" stroke-width="2.2"/><path d="{CUP_E}" stroke-width="2.2"/>')
        g.append('<path d="M105 18 V196" opacity=".25"/>')
        g.append('<path d="M98 16 V70 M112 16 V70" opacity=".45"/>')
        g.append('<path d="M105 72 L80 90 M105 72 L131 88" opacity=".45"/>')
        g.append('</g>')
        if coracao:
            g.append(f'<path d="{CORACAO}" fill="#F0F0EB" stroke="{INK2}" stroke-width="1.8"/>')
        if hilos:
            g.append(f'<g fill="none" stroke="{INK2}" stroke-width="1.4" opacity=".65">'
                     '<path d="M80 90 q-10 14 -13 30"/><path d="M131 88 q9 14 12 28"/></g>')
        g.append(dentro); g.append('</g>')
        return "".join(g)

    F = {}

    # 1. ABCDE -----------------------------------------------------------------------------------
    itens = [("A", "Vias aéreas", "traqueia central, carina, brônquios-fonte"),
             ("B", "Pulmões", "os dois campos, zona a zona, até os ápices"),
             ("C", "Coração e mediastino", "índice cardiotorácico, bordas, hilos, aorta"),
             ("D", "Diafragma", "cúpulas, seios costofrênicos, ar sob o diafragma"),
             ("E", "Esqueleto e esquecidos", "arcos, coluna, partes moles, tubos, cateteres")]
    c = [torax(22, 44, 1.16, dentro=(
         f'<path d="M105 18 V70" stroke="{BR}" stroke-width="2.6" fill="none"/>'
         f'<ellipse cx="105" cy="126" rx="76" ry="62" fill="none" stroke="{BR}" stroke-width="1.4" stroke-dasharray="5 4" opacity=".75"/>'
         f'<circle cx="27" cy="192" r="9" fill="none" stroke="{BR}" stroke-width="1.8"/>'
         f'<circle cx="184" cy="198" r="9" fill="none" stroke="{BR}" stroke-width="1.8"/>'))]
    for i, (L, t, sub) in enumerate(itens):
        yy = 64 + i * 58
        c.append(f'<circle cx="300" cy="{yy-5}" r="13.5" fill="#E3F1F1" stroke="{BR}" stroke-width="1.4"/>')
        c.append(f'<text x="300" y="{yy-1}" text-anchor="middle" font-size="13" font-weight="700" fill="{BR}">{L}</text>')
        c.append(f'<text class="n" x="326" y="{yy-8}">{t}</text>')
        c.append(txt(326, yy + 8, sub, "l", larg=40))
    c.append(txt(16, 352, "A ordem existe para o olho não parar no primeiro achado e deixar de varrer o resto do filme.", "l", larg=96))
    F["rx-abcde"] = moldura("Leitura sistemática: A · B · C · D · E", "".join(c),
        "A sequência ABCDE não é enfeite mnemônico: é o que impede o erro de satisfação de busca — enxergar a pneumonia e não ver o pneumotórax ao lado dela.")

    # 2. Qualidade técnica -------------------------------------------------------------------------
    def mini(x, titulo, corpo, nota):
        return (f'<g transform="translate({x},44)">'
                f'<rect width="138" height="182" rx="10" fill="none" stroke="{CL}"/>'
                f'<text class="n" x="10" y="22">{titulo}</text>{corpo}</g>'
                + txt(x + 10, 250, nota, "l", larg=26))
    q = []
    pen = (f'<g transform="translate(24,34) scale(.42)">'
           f'<path d="{CONT_D}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<path d="{CONT_E}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<path d="{CORACAO}" fill="#EFEFEA" stroke="{INK2}" stroke-width="2.2"/>'
           + "".join(f'<path d="M97 {126+i*18} h16" stroke="{BR}" stroke-width="3.4"/>' for i in range(4))
           + '</g>')
    q.append(mini(16, "Penetração", pen, "vértebras visíveis ATRÁS do coração"))
    rota = (f'<g transform="translate(20,40) scale(.48)">'
            f'<path d="M105 18 V170" stroke="{INK2}" stroke-width="2.6"/>'
            f'<path d="M36 48 q69 -18 138 0" fill="none" stroke="{INK2}" stroke-width="3.4"/>'
            f'<circle cx="72" cy="40" r="7" fill="{BR}"/><circle cx="138" cy="40" r="7" fill="{BR}"/>'
            f'<circle cx="105" cy="44" r="6" fill="none" stroke="{RED}" stroke-width="3.4"/></g>')
    q.append(mini(166, "Rotação", rota, "espinhosa no meio das duas clavículas"))
    insp = (f'<g transform="translate(16,38) scale(.5)">'
            + "".join(f'<path d="M18 {36+i*20} q 84 -18 168 0" fill="none" stroke="{INK2}" stroke-width="2.4" opacity=".55"/>' for i in range(6))
            + f'<path d="M16 158 C 62 184 138 186 190 160" fill="none" stroke="{BR}" stroke-width="4.4"/>'
            + f'<text x="176" y="146" font-size="20" font-weight="700" fill="{BR}">6</text></g>')
    q.append(mini(316, "Inspiração", insp, "6 arcos anteriores ou 9 a 10 posteriores"))
    enq = (f'<g transform="translate(24,34) scale(.42)">'
           f'<path d="{CONT_D}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<path d="{CONT_E}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<path d="{CUP_D}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<path d="{CUP_E}" fill="none" stroke="{INK2}" stroke-width="2.6"/>'
           f'<rect x="10" y="4" width="192" height="230" fill="none" stroke="{BR}" stroke-width="3.4" stroke-dasharray="8 5"/></g>')
    q.append(mini(466, "Enquadramento", enq, "ápices e os dois seios dentro do filme"))
    q.append(txt(16, 320, "Filme mal feito muda o laudo: rotação cria falso desvio de mediastino e falsa cardiomegalia; "
                          "expiração cria falsa congestão e falso aumento da área cardíaca.", "l", larg=98))
    F["rx-qualidade"] = moldura("Antes de laudar: os quatro controles de qualidade", "".join(q),
        "Julgar a técnica antes do conteúdo. A pergunta não é 'o que tem aqui?', e sim 'esta imagem permite responder o que eu preciso saber?'.")

    # 3. PA x AP e índice cardiotorácico -----------------------------------------------------------
    p = []
    p.append(f'<g transform="translate(22,44)"><rect width="266" height="152" rx="10" fill="none" stroke="{CL}"/>'
             f'<text class="n" x="12" y="22">PA — de pé, tubo atrás</text>'
             f'<circle cx="30" cy="76" r="7" fill="{INK2}"/>'
             f'<path d="M38 76 L 190 46 M38 76 L190 128" stroke="{INK2}" stroke-width="1.1" stroke-dasharray="4 3"/>'
             f'<rect x="190" y="36" width="8" height="102" fill="#EFEFEA" stroke="{INK2}"/>'
             f'<ellipse cx="158" cy="88" rx="24" ry="17" fill="#E3F1F1" stroke="{BR}" stroke-width="1.8"/>'
             f'<text class="k" x="12" y="140">coração encostado no filme → tamanho real</text></g>')
    p.append(f'<g transform="translate(310,44)"><rect width="290" height="152" rx="10" fill="none" stroke="{CL}"/>'
             f'<text class="n" x="12" y="22">AP — no leito, tubo à frente</text>'
             f'<circle cx="30" cy="76" r="7" fill="{INK2}"/>'
             f'<path d="M38 76 L 214 30 M38 76 L214 140" stroke="{INK2}" stroke-width="1.1" stroke-dasharray="4 3"/>'
             f'<rect x="214" y="24" width="8" height="122" fill="#EFEFEA" stroke="{INK2}"/>'
             f'<ellipse cx="112" cy="86" rx="18" ry="13" fill="#E3F1F1" stroke="{BR}" stroke-width="1.8"/>'
             f'<ellipse cx="186" cy="84" rx="30" ry="22" fill="none" stroke="{RED}" stroke-width="1.8" stroke-dasharray="4 3"/>'
             f'<text class="r" x="12" y="140">coração longe do filme → projetado maior</text></g>')
    p.append(f'<g transform="translate(40,232)">'
             f'<path d="M0 40 H250" stroke="{INK2}" stroke-width="1.4"/>'
             f'<path d="M0 28 V54 M250 28 V54" stroke="{INK2}" stroke-width="2"/>'
             f'<path d="M74 28 V54 M186 28 V54" stroke="{BR}" stroke-width="2"/>'
             f'<path d="M74 40 H186" stroke="{BR}" stroke-width="3"/>'
             f'<text class="k" x="76" y="22">maior diâmetro cardíaco</text>'
             f'<text class="l" x="0" y="72">maior diâmetro torácico interno</text></g>')
    p.append(f'<text class="n" x="330" y="258">Índice cardiotorácico = coração ÷ tórax</text>')
    p.append(txt(330, 280, "Acima de 0,50 na PA de pé = cardiomegalia. Na AP de leito o índice não vale: "
                           "a magnificação sozinha leva coração normal a ultrapassar 0,50.", "k", larg=42))
    p.append(txt(16, 352, "Diante de 'aumento da área cardíaca' num raio-x de leito, a primeira pergunta é a incidência.", "l", larg=98))
    F["rx-pa-ap"] = moldura("PA × AP e o índice cardiotorácico", "".join(p),
        "Na PA o coração encosta no filme e sai do tamanho real; na AP de leito ele fica longe do detector e o feixe divergente o amplia. Índice cardiotorácico só se mede em PA de pé.")

    # 4. Lobos: PA e perfil --------------------------------------------------------------------------
    l = [torax(18, 46, 1.14, dentro=(
        f'<path d="M25 106 C 62 122 88 132 97 136" fill="none" stroke="{BR}" stroke-width="2" stroke-dasharray="5 4"/>'
        f'<path d="M33 156 C 60 146 82 140 97 138" fill="none" stroke="{BR}" stroke-width="2" stroke-dasharray="5 4"/>'
        f'<path d="M183 118 C 154 136 128 148 114 154" fill="none" stroke="{BR}" stroke-width="2" stroke-dasharray="5 4"/>'
        f'<text class="k" x="42" y="74">LSD</text><text class="k" x="34" y="132">LM</text>'
        f'<text class="k" x="36" y="180">LID</text>'
        f'<text class="k" x="150" y="78">LSE</text><text class="k" x="152" y="182">LIE</text>'
        f'<text class="l" x="14" y="240">frente (PA)</text>'))]
    l.append(f'<g transform="translate(316,46) scale(1.14)">'
             f'<path d="M34 16 C 10 44 6 106 12 158 C 16 184 22 192 28 196" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
             f'<path d="M34 16 C 102 22 148 64 158 124 C 162 158 158 180 152 192" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
             f'<path d="M28 196 C 64 210 122 208 152 192" fill="none" stroke="{INK2}" stroke-width="2.2"/>'
             f'<path d="M30 62 C 74 100 114 146 148 180" stroke="{BR}" stroke-width="2" stroke-dasharray="5 4" fill="none"/>'
             f'<path d="M82 110 C 106 108 128 112 154 124" stroke="{BR}" stroke-width="2" stroke-dasharray="5 4" fill="none"/>'
             f'<text class="k" x="46" y="56">superior</text><text class="k" x="102" y="104">médio</text>'
             f'<text class="k" x="48" y="170">inferior</text>'
             f'<text class="l" x="10" y="232">perfil direito</text></g>')
    l.append(txt(16, 344, "A cissura horizontal só existe à direita. É por isso que o lobo médio é a chave do sinal da silhueta: "
                          "é o único que encosta na borda direita do coração.", "l", larg=98))
    F["rx-lobos"] = moldura("Onde cada lobo encosta — a base do sinal da silhueta", "".join(l),
        "Na incidência de frente os lobos se sobrepõem; o perfil os separa. Guardar o que cada lobo toca vale mais do que decorar o desenho das cissuras.")

    # 5. Sinal da silhueta ----------------------------------------------------------------------------
    s = [torax(24, 46, 1.10, dentro=(
        f'<path d="M88 120 C 76 138 72 164 82 182 C 96 194 122 190 128 182 C 122 158 116 136 110 118 Z" fill="{BR}" opacity=".26"/>'
        f'<path d="M92 118 C 88 152 94 186 106 200" fill="none" stroke="{RED}" stroke-width="3.2" stroke-dasharray="4 4"/>'
        f'<path d="M23 190 C 46 212 84 216 104 192" fill="none" stroke="{OK}" stroke-width="2.6"/>'))]
    s.append(f'<text class="n" x="28" y="320">Lobo médio: encosta no coração</text>')
    s.append(txt(28, 338, "A opacidade apaga a borda direita do coração; a cúpula continua nítida.", "l", larg=44))
    s.append(torax(330, 46, 1.10, dentro=(
        f'<path d="M34 152 C 60 148 88 154 102 164 L 98 192 C 64 200 38 190 30 180 Z" fill="{BR}" opacity=".26"/>'
        f'<path d="M92 118 C 88 152 94 186 106 200" fill="none" stroke="{OK}" stroke-width="3.2"/>'
        f'<path d="M23 190 C 46 212 84 216 104 192" fill="none" stroke="{RED}" stroke-width="3.2" stroke-dasharray="4 4"/>')))
    s.append(f'<text class="n" x="334" y="320">Lobo inferior: encosta no diafragma</text>')
    s.append(txt(334, 338, "A borda do coração aparece nítida através da opacidade; a cúpula é que some.", "l", larg=44))
    F["rx-silhueta"] = moldura("Sinal da silhueta: a opacidade apaga o que ela toca", "".join(s),
        "Duas estruturas de mesma densidade encostadas perdem a interface entre si. É o que localiza a consolidação sem tomografia: apagou a borda do coração, é lobo médio (ou língula); apagou a cúpula, é lobo inferior.")

    # 6. Consolidação x atelectasia --------------------------------------------------------------------
    a = [torax(24, 46, 1.10, dentro=(
        f'<path d="M32 92 C 64 84 88 88 100 100 L 96 154 C 62 162 34 152 27 144 Z" fill="{BR}" opacity=".26"/>'
        + "".join(f'<path d="M{44+i*13} {106+i*10} l 16 8" stroke="#FFFFFF" stroke-width="2.6" fill="none"/>' for i in range(4))
        + f'<path d="M105 18 V196" stroke="{OK}" stroke-width="2.6"/>'))]
    a.append(f'<text class="n" x="28" y="320">Consolidação: alvéolo cheio, volume mantido</text>')
    a.append(txt(28, 338, "Traqueia e cúpula no lugar; broncograma aéreo dentro da opacidade.", "l", larg=46))
    a.append(torax(330, 46, 1.10, costelas=False, dentro=(
        f'<path d="M34 88 C 62 82 84 88 94 100 L 90 142 C 62 150 38 140 30 132 Z" fill="{BR}" opacity=".30"/>'
        f'<path d="M105 18 C 100 62 94 104 90 144" stroke="{RED}" stroke-width="2.8" fill="none"/>'
        f'<path d="M23 172 C 46 194 84 198 104 176" stroke="{RED}" stroke-width="2.8" fill="none"/>'
        + "".join(f'<path d="M{36+i*2} {58+i*17} q {58-i*3} {-14-i} {116-i*6} 0" fill="none" stroke="{RED}" stroke-width="1.5" opacity=".65"/>' for i in range(5))
        + f'<text class="r" x="6" y="52">arcos aproximados</text>' 
        + f'<text class="r" x="112" y="46">traqueia puxada</text>'
        f'<text class="r" x="6" y="214">cúpula elevada</text>')))
    a.append(f'<text class="n" x="334" y="320">Atelectasia: perda de volume</text>')
    a.append(txt(334, 338, "Tudo é atraído PARA a opacidade — traqueia, cissura, cúpula, hilo e arcos.", "l", larg=46))
    F["rx-consolidacao-atelectasia"] = moldura("Opacidade que empurra × opacidade que puxa", "".join(a),
        "A pergunta que separa as duas em cinco segundos: para onde foram as estruturas móveis? Atelectasia puxa; derrame volumoso e massa empurram; consolidação não desloca nada.")

    # 7. S de Golden -------------------------------------------------------------------------------------
    g = [torax(30, 46, 1.20, dentro=(
        f'<path d="M32 56 C 62 48 88 56 100 72 C 96 92 88 104 76 112 C 58 122 38 112 28 100 Z" fill="{BR}" opacity=".28"/>'
        f'<path d="M28 100 C 40 84 56 82 68 94 C 78 104 88 106 100 72" fill="none" stroke="{RED}" stroke-width="3.4"/>'
        f'<circle cx="92" cy="86" r="14" fill="#EFEFEA" stroke="{RED}" stroke-width="2.4"/>'
        f'<text class="r" x="112" y="90">massa</text>'
        f'<text class="l" x="30" y="140">lobo colapsado</text>'))]
    g.append(f'<text class="n" x="330" y="86">A cissura do lobo colapsado faz um S,</text>')
    g.append(f'<text class="n" x="330" y="104">não uma linha reta</text>')
    g.append(txt(330, 130, "A parte côncava é o colapso puxando; a parte convexa é a massa que obstrui o "
                           "brônquio e não deixa o lobo colabar até o fim.", "l", larg=42))
    g.append(txt(330, 190, "Atelectasia lobar em adulto fumante pede tomografia e broncoscopia, "
                           "não fisioterapia respiratória.", "k", larg=42))
    g.append(txt(16, 344, "Descrito por Ross Golden em 1925 para o colapso do lobo superior direito; o raciocínio vale para "
                          "qualquer atelectasia com massa central.", "l", larg=98))
    F["rx-golden"] = moldura("Sinal do S de Golden", "".join(g),
        "Colapso lobar cuja cissura, em vez de reta, desenha um S: a convexidade é o tumor que obstrui. É o achado que transforma um laudo de 'atelectasia' em investigação de câncer.")

    # 8. Volume do derrame -----------------------------------------------------------------------------
    d = []
    for i, (inc, vol, nota) in enumerate(
            [("perfil", "≈ 50 mL", "apaga o seio costofrênico posterior — só o perfil mostra"),
             ("PA", "≈ 200 mL", "apaga o seio costofrênico lateral, já com menisco"),
             ("PA", "≈ 500 mL", "o menisco sobe e apaga a cúpula diafragmática")]):
        x = 22 + i * 200
        if inc == "perfil":
            corpo = (f'<path d="M34 16 C 10 44 6 106 12 158 C 16 184 22 192 28 196" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
                     f'<path d="M34 16 C 102 22 148 64 158 124 C 162 158 158 180 152 192" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
                     f'<path d="M28 196 C 64 210 122 208 152 192" fill="none" stroke="{INK2}" stroke-width="2.2"/>'
                     f'<path d="M22 182 C 36 198 48 202 58 200 L 56 184 C 44 184 32 178 24 170 Z" fill="#E3F1F1" stroke="{BR}" stroke-width="2.2"/>')
        else:
            # o menisco sobe NA PAREDE e desce em direção ao mediastino: a borda é côncava para cima
            alt = 0.34 if vol.endswith("200 mL") else 0.62
            hpar = 192 - alt * 104          # altura junto à parede lateral
            hmed = 192 - alt * 34           # altura junto ao mediastino
            corpo = (f'<path d="{CONT_D}" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
                     f'<path d="{CONT_E}" fill="none" stroke="{INK2}" stroke-width="1.5"/>'
                     f'<path d="{CUP_E}" fill="none" stroke="{INK2}" stroke-width="2.2"/>'
                     f'<path d="M105 18 V196" stroke="{INK2}" stroke-width="1.2" opacity=".28"/>'
                     f'<path d="{CORACAO}" fill="#F0F0EB" stroke="{INK2}" stroke-width="1.6"/>'
                     f'<path d="M24 {hpar:.0f} C 48 {hmed+26:.0f} 76 {hmed:.0f} 100 {hmed:.0f} '
                     f'L 100 196 C 72 214 44 210 23 190 Z" fill="#E3F1F1" stroke="{BR}" stroke-width="2.2"/>'
                     f'<path d="M24 {hpar:.0f} C 48 {hmed+26:.0f} 76 {hmed:.0f} 100 {hmed:.0f}" '
                     f'fill="none" stroke="{BR}" stroke-width="2.8"/>')
        d.append(f'<g transform="translate({x},44) scale(.78)">{corpo}</g>')
        d.append(f'<text class="n" x="{x+4}" y="244">{vol} · {inc}</text>')
        d.append(txt(x + 4, 262, nota, "l", larg=30))
    d.append(txt(16, 344, "Regra de Blackmore: cerca de 50 mL para aparecer no perfil, 200 mL na PA e 500 mL para apagar a "
                          "cúpula. Abaixo disso, só ultrassom ou tomografia enxergam.", "l", larg=98))
    F["rx-derrame-volume"] = moldura("Quanto líquido cada incidência enxerga", "".join(d),
        "Derrame pequeno não é derrame ausente: a PA de pé só o mostra a partir de cerca de 200 mL, enquanto o ultrassom à beira do leito detecta poucos mililitros e ainda guia a punção.")

    # 9. Pneumotórax de pé x deitado ---------------------------------------------------------------------
    n = [torax(24, 46, 1.10, dentro=(
        f'<path d="M74 44 C 48 78 42 130 46 172 L 26 174 C 20 128 26 76 50 40 Z" fill="{RED}" opacity=".10"/>'
        f'<path d="M74 44 C 48 78 42 130 46 172" fill="none" stroke="{RED}" stroke-width="3"/>'
        f'<text class="r" x="80" y="40">linha pleural</text>'
        f'<text class="l" x="14" y="120">ar</text>'))]
    n.append(f'<text class="n" x="28" y="320">De pé: o ar sobe para o ápice</text>')
    n.append(txt(28, 338, "Linha pleural fina paralela à parede, sem trama vascular além dela.", "l", larg=46))
    n.append(torax(330, 46, 1.10, dentro=(
        f'<path d="M23 190 C 38 208 54 214 68 214 L 70 196 C 52 196 36 188 25 178 Z" fill="{RED}" opacity=".18"/>'
        f'<path d="M23 190 C 38 210 56 216 70 215" fill="none" stroke="{RED}" stroke-width="3.2"/>'
        f'<text class="r" x="34" y="232">sulco profundo</text>'
        f'<text class="l" x="118" y="56">ápice sem linha</text>')))
    n.append(f'<text class="n" x="334" y="320">Deitado: o ar vai para a base anterior</text>')
    n.append(txt(334, 338, "Sinal do sulco profundo: seio costofrênico escuro e alongado, sem linha apical.", "l", larg=46))
    F["rx-pneumotorax-deitado"] = moldura("Pneumotórax: onde o ar aparece muda com a posição", "".join(n),
        "No paciente deitado — o do CTI e o do trauma — o ar não vai ao ápice. Procurar linha apical num filme de leito é a causa clássica de pneumotórax não visto.")

    # 10. Pneumoperitônio ------------------------------------------------------------------------------------
    pp = [torax(40, 46, 1.16, dentro=(
        f'<path d="M23 190 C 46 212 84 216 104 192 L 102 204 C 80 224 44 220 22 200 Z" fill="{RED}" opacity=".22"/>'
        f'<path d="M22 200 C 44 220 80 224 102 204" fill="none" stroke="{RED}" stroke-width="2.6"/>'
        f'<text class="r" x="34" y="240">ar livre</text>'))]
    pp.append(f'<text class="n" x="316" y="76">A incidência decide</text>')
    pp.append(txt(316, 98, "De pé, ou em decúbito lateral esquerdo com raio horizontal, o ar sobe e se desenha "
                           "como faixa fina sob o diafragma. Deitado, esse mesmo ar fica na frente das alças e some.", "l", larg=44))
    pp.append(txt(316, 168, "Sentar o paciente por 5 a 10 minutos antes do disparo.", "k", larg=44))
    pp.append(f'<text class="a" x="316" y="212">Não confundir com o sinal de Chilaiditi:</text>')
    pp.append(txt(316, 230, "alça de cólon interposta entre fígado e diafragma, com haustrações visíveis dentro do ar.", "l", larg=44))
    pp.append(txt(16, 344, "Ausência de ar livre na radiografia não exclui perfuração — a tomografia é bem mais sensível.", "l", larg=98))
    F["rx-pneumoperitonio"] = moldura("Ar livre sob o diafragma", "".join(pp),
        "Faixa de ar entre a cúpula e o fígado, com o diafragma nitidamente desenhado dos dois lados. Só aparece com o paciente vertical, e sua ausência não afasta perfuração.")

    # 11. Pontos cegos ------------------------------------------------------------------------------------------
    zonas = [(105, 40, 40, 20, "Ápices", "atrás da clavícula e do primeiro arco"),
             (128, 152, 30, 36, "Região retrocardíaca", "o coração esconde o lobo inferior esquerdo"),
             (60, 196, 42, 16, "Abaixo das cúpulas", "bases pulmonares, câmara gástrica, ar livre"),
             (82, 96, 26, 18, "Hilos", "massa e linfonodo somem no emaranhado vascular"),
             (176, 124, 18, 46, "Parede e partes moles", "pneumotórax fino, mama, enfisema de subcutâneo")]
    corpo_b = "".join(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{AMB}" opacity=".16" '
                      f'stroke="{AMB}" stroke-width="1.4" stroke-dasharray="4 3"/>' for cx, cy, rx, ry, _, _ in zonas)
    b = [torax(24, 46, 1.16, dentro=corpo_b)]
    for i, (_, _, _, _, nome, sub) in enumerate(zonas):
        yy = 66 + i * 56
        b.append(f'<circle cx="306" cy="{yy-5}" r="5.5" fill="{AMB}"/>')
        b.append(f'<text class="n" x="322" y="{yy-1}">{nome}</text>')
        b.append(txt(322, yy + 15, sub, "l", larg=40))
    b.append(txt(16, 350, "Boa parte dos cânceres de pulmão perdidos em radiografia estava numa destas cinco áreas. "
                          "Revisá-las é parte do E de 'esquecidos'.", "l", larg=98))
    F["rx-pontos-cegos"] = moldura("As cinco áreas onde o achado se esconde", "".join(b),
        "Depois do ABCDE, uma segunda passada obrigatória por ápices, região retrocardíaca, abaixo das cúpulas, hilos e parede torácica.")

    # 12. Tubos e cateteres --------------------------------------------------------------------------------------
    t = [torax(24, 46, 1.20, dentro=(
        f'<path d="M105 16 V62" stroke="{BR}" stroke-width="3.6"/>'
        f'<path d="M100 62 h10" stroke="{BR}" stroke-width="3.6"/>'
        f'<path d="M105 72 L80 90 M105 72 L131 88" stroke="{RED}" stroke-width="1.6" opacity=".5"/>'
        f'<path d="M113 16 C 118 62 122 112 118 156 C 116 178 113 190 111 200" stroke="{AMB}" stroke-width="2.6" fill="none"/>'
        f'<circle cx="111" cy="202" r="3.6" fill="{AMB}"/>'
        f'<path d="M152 38 C 142 60 130 78 122 92" stroke="{OK}" stroke-width="2.6" fill="none"/>'
        f'<circle cx="122" cy="92" r="3.6" fill="{OK}"/>'))]
    linhas = [(BR, "Tubo orotraqueal", "ponta a 5 ± 2 cm da carina, com o pescoço em posição neutra; flexão e extensão movem a ponta cerca de 2 cm"),
              (AMB, "Sonda nasogástrica", "desce na linha média, corta a carina, cruza o diafragma e a ponta fica abaixo da cúpula esquerda"),
              (OK, "Cateter venoso central", "ponta no terço distal da veia cava superior, perto da junção com o átrio direito"),
              (RED, "Dreno de tórax", "todos os orifícios laterais dentro da pleura; ar sobe, líquido desce")]
    for i, (cor, nome, sub) in enumerate(linhas):
        yy = 66 + i * 70
        t.append(f'<path d="M300 {yy-9} h24" stroke="{cor}" stroke-width="3.6"/>')
        t.append(f'<text class="n" x="332" y="{yy-5}">{nome}</text>')
        t.append(txt(332, yy + 12, sub, "l", larg=40))
    t.append(txt(16, 352, "A radiografia pós-procedimento responde a duas perguntas: o dispositivo está onde deveria "
                          "e o procedimento causou dano?", "l", larg=98))
    F["rx-tubos"] = moldura("Tubos e cateteres: onde a ponta tem de estar", "".join(t),
        "Sonda enteral mal posicionada é evento adverso grave e a radiografia é a confirmação padrão. Conferir o trajeto inteiro, não apenas a ponta.")

    return F

# ---------------------------------------------------------------- esquemas (não-ECG)
def esquemas():
    def cx(w, h, titulo, corpo, aria):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{aria}">'
                f'<style>text{{font-family:Figtree,system-ui,sans-serif}} .t{{font-size:13px;font-weight:600;fill:#23272E}}'
                f'.l{{font-size:11px;fill:#5E646B}} .k{{font-size:11px;font-weight:600;fill:#0B6A72}}</style>'
                f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>'
                f'<text class="t" x="16" y="24">{titulo}</text>{corpo}</svg>')
    F = {}

    # Curva pressão-volume / driving pressure
    p = ['<g fill="none" stroke="#DDDDD5" stroke-width="1">']
    for i in range(6): p.append(f'<path d="M70 {60+i*36}H520"/>')
    for i in range(7): p.append(f'<path d="M{70+i*75} 60V240"/>')
    p.append('</g>')
    p.append('<path d="M70 240 C 150 236, 190 200, 235 150 C 280 100, 340 78, 430 70 C 470 67, 500 66, 520 66" fill="none" stroke="#0B6A72" stroke-width="2.6"/>')
    p.append('<path d="M235 150 L235 240" stroke="#C6453D" stroke-width="1.4" stroke-dasharray="4 3"/>')
    p.append('<path d="M430 70 L430 240" stroke="#C6453D" stroke-width="1.4" stroke-dasharray="4 3"/>')
    p.append('<text class="k" x="196" y="256">ponto de inflexão inferior</text>')
    p.append('<text class="k" x="392" y="256">ponto de inflexão superior</text>')
    p.append('<text class="l" x="70" y="276">PEEP abaixo dele: colapso e reabertura a cada ciclo</text>')
    p.append('<text class="l" x="70" y="292">Pressão de platô acima dele: hiperdistensão do alvéolo aberto</text>')
    p.append('<text class="l" x="16" y="150" transform="rotate(-90 16 150)">volume</text>')
    p.append('<text class="l" x="280" y="316">pressão de vias aéreas</text>')
    F["fig-curva-pv"] = ("Curva pressão-volume do sistema respiratório",
        cx(560, 330, "Curva pressão-volume: onde a PEEP e o platô precisam ficar", "".join(p),
           "Curva pressão-volume com pontos de inflexão inferior e superior"))

    # Capnografia
    c = ['<g fill="none" stroke="#DDDDD5" stroke-width="1">']
    for i in range(5): c.append(f'<path d="M70 {70+i*38}H540"/>')
    c.append('</g>')
    c.append('<path d="M70 222 h40 c12 0 14 -100 34 -104 c22 -4 40 -6 92 -8 c30 -1 46 -2 60 -3 l0 115 h30 c12 0 14 -100 34 -104 c22 -4 40 -6 92 -8 c14 0 22 -1 28 -1" fill="none" stroke="#0B6A72" stroke-width="2.6"/>')
    c.append('<text class="k" x="120" y="104">fase de subida</text>')
    c.append('<text class="k" x="250" y="96">platô alveolar</text>')
    c.append('<text class="k" x="300" y="200">queda inspiratória</text>')
    c.append('<text class="l" x="16" y="150" transform="rotate(-90 16 150)">CO₂ expirado</text>')
    c.append('<text class="l" x="70" y="260">O valor do fim do platô é o CO₂ expirado que se lê no monitor. Traçado achatado com via aérea correta = fluxo pulmonar baixo.</text>')
    F["fig-capnografia"] = ("Capnografia de onda normal",
        cx(560, 280, "Capnografia: as quatro fases de uma onda normal", "".join(c),
           "Curva de capnografia com fase de subida, platô alveolar e queda inspiratória"))

    # Troponina ultrassensível 0/1 h
    t = []
    t.append('<rect x="60" y="60" width="200" height="54" rx="10" fill="#E6F3EB" stroke="#1D7A46"/>')
    t.append('<text class="k" x="76" y="84" fill="#1D7A46">Muito baixa na chegada</text>')
    t.append('<text class="l" x="76" y="102">e sintoma há mais de 3 h → exclui</text>')
    t.append('<rect x="300" y="60" width="200" height="54" rx="10" fill="#FBEAE8" stroke="#C6453D"/>')
    t.append('<text class="k" x="316" y="84" fill="#C6453D">Alta na chegada</text>')
    t.append('<text class="l" x="316" y="102">ou variação grande → inclui</text>')
    t.append('<rect x="180" y="150" width="200" height="54" rx="10" fill="#FBF1DC" stroke="#A3730A"/>')
    t.append('<text class="k" x="196" y="174" fill="#A3730A">Zona de observação</text>')
    t.append('<text class="l" x="196" y="192">repetir em 3 h · ECG · eco</text>')
    t.append('<path d="M160 114 L250 150" stroke="#5E646B" stroke-width="1.4" marker-end="url(#a)"/>')
    t.append('<path d="M400 114 L320 150" stroke="#5E646B" stroke-width="1.4"/>')
    t.append('<text class="l" x="60" y="240">Variação entre as duas medidas = lesão AGUDA. Valor alto e estável, sem variação = lesão crônica.</text>')
    t.append('<text class="l" x="60" y="258">Infarto exige lesão aguda MAIS evidência de isquemia: sintoma, ECG, imagem ou angiografia.</text>')
    F["fig-troponina"] = ("Troponina ultrassensível no caminho 0/1 h",
        cx(560, 280, "Troponina ultrassensível: o que cada resultado decide", "".join(t),
           "Esquema do algoritmo 0/1 hora da troponina ultrassensível"))
    return F

# ---------------------------------------------------------------- main
def main():
    dest = pathlib.Path("leituras/fig"); dest.mkdir(parents=True, exist_ok=True)
    F = {}; F.update(catalogo()); F.update(catalogo2()); F.update(radiologia()); F.update(radiologia_torax()); F.update(esquemas())
    if "--lista" in sys.argv:
        for k, v in sorted(F.items()): print(f"{k}.svg  —  {v[0]}")
        return
    idx = {}
    for nome, item in F.items():
        titulo, svg = item[0], item[1]
        cap = item[2] if len(item) > 2 else ""
        (dest / f"{nome}.svg").write_text(svg)
        idx[nome] = {"t": titulo, "cap": cap} if cap else {"t": titulo}
    (dest / "_catalogo.json").write_text(json.dumps(idx, ensure_ascii=False, indent=1))
    tot = sum((dest / f"{n}.svg").stat().st_size for n in F)
    print(f"{len(F)} figuras em leituras/fig/ ({tot//1024} KB)")

if __name__ == "__main__":
    main()
