#!/usr/bin/env python3
"""Confere as levas de prova real devolvidas pelos agentes contra as candidatas extraídas do caderno.

Garante: enunciado e alternativas VERBATIM (só se tolera a correção de artefato de extração
permitida no brief), gabarito e fonte intactos, campos completos, sem travessão na prosa.
Uso: python3 provas-reais/confere.py lotes-questoes/leva113-reais-r.json [...]
"""
import json, re, sys, unicodedata

def norm(t):
    t = unicodedata.normalize("NFKD", t)
    t = t.replace("²", "2").replace("³", "3")
    t = "".join(c for c in t if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", t.lower())

C = json.load(open("provas-reais/candidatas.json"))
POR = {norm(x["q"])[:140]: x for x in C}
TEMAS = "cardio emergencias infecto pneumo gastro endocrino nefro neuro sus hemato reumato geriatria onco derma psiq".split()
tot = 0; ruins = 0
for arq in sys.argv[1:]:
    L = json.load(open(arq))
    for i, q in enumerate(L):
        tot += 1
        p = []
        c = POR.get(norm(q["q"])[:140])
        if not c:
            p.append("enunciado não bate com nenhuma candidata")
        else:
            if norm(q["q"]) != norm(c["q"]): p.append("enunciado alterado")
            if len(q["alts"]) != len(c["alts"]) or any(norm(a) != norm(b) for a, b in zip(q["alts"], c["alts"])):
                p.append("alternativas alteradas")
            if q["gab"] != c["gab"]: p.append(f"gab mudou {c['gab']}→{q['gab']}")
            if q.get("fonte") != c["fonte"]: p.append("fonte mudou")
        if q.get("tema") not in TEMAS: p.append("tema inválido")
        if q.get("cenario") not in ("amb", "enf", "emg", "uti"): p.append("cenario inválido")
        if q.get("comp") not in ("dx", "tto", "urg", "prev"): p.append("comp inválido")
        if q.get("nivel") not in ("r1", "r2", "r3", "tit"): p.append("nivel inválido")
        if not re.search(r"\b(19|20)\d\d\b", q.get("base", "")): p.append("base sem ano")
        if len(q.get("coment", "")) < 150: p.append("coment curto")
        pa = q.get("porAlt", [])
        if len(pa) != len(q["alts"]) or any(len(x) <= 20 for x in pa): p.append("porAlt incompleto")
        if re.search(r"[—–]", q.get("coment", "") + " ".join(pa)): p.append("travessão")
        if p:
            ruins += 1
            print(f"{arq}#{i}: {'; '.join(p)}")
print(f"{tot} questões conferidas, {ruins} com problema")
