#!/usr/bin/env python3
"""Ajusta alternativas para a janela de 95–108% do comprimento da correta.

Uso como módulo:  from calibra import ajusta; ajusta(arquivo, indice_questao, {prefixo: [variantes]})
Escolhe a primeira variante que cai na janela e avisa quando nenhuma serve, com a janela exata.
Existe porque toda reescrita de alternativa reabre o viés de comprimento, e acertar no olho
custa uma ida e volta por tentativa.
"""
import json

def ajusta(arq, qi, mapa, nova_correta=None):
    b = json.load(open(arq, encoding="utf-8")); q = b[qi]
    if nova_correta:
        outras = [len(a) for i, a in enumerate(q["alts"]) if i != q["gab"]]
        lo, hi = max(outras) / 1.08, min(outras) / 0.95
        ok = [c for c in nova_correta if lo <= len(c) <= hi]
        if ok: q["alts"][q["gab"]] = ok[0]
        else: print(f"  correta: janela {round(lo)}-{round(hi)}, candidatas {[len(c) for c in nova_correta]}")
    Lc = len(q["alts"][q["gab"]]); lo, hi = Lc * 0.95, Lc * 1.08
    for i, a in enumerate(q["alts"]):
        for pref, variantes in mapa.items():
            if not a.startswith(pref): continue
            ok = [v for v in variantes if lo <= len(v) <= hi]
            if ok: q["alts"][i] = ok[0]
            else: print(f"  alt{i}: janela {round(lo)}-{round(hi)}, candidatas {[len(v) for v in variantes]}")
    json.dump(b, open(arq, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
