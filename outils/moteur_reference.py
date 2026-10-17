"""Calcule des parcours avec engine.py, pour outils/verifier.js.

Lit sur l'entrée standard une liste de {sphere, reponses} et renvoie, pour
chacun, les valeurs NON arrondies du moteur de référence.
Usage : python moteur_reference.py <racine du projet>
"""

import json
import sys

racine = sys.argv[1]
sys.dont_write_bytecode = True  # ne pas laisser de __pycache__ dans le projet
sys.path.insert(0, racine)
import engine  # noqa: E402

data = engine.charger(racine + "/data.json")
with open(racine + "/profils.json", encoding="utf-8") as f:
    profils = json.load(f)

sortie = []
for p in json.load(sys.stdin):
    sphere = p["sphere"]
    reponses = {s: [tuple(c) if isinstance(c, list) else c for c in choix]
                for s, choix in p["reponses"].items()}
    brut, eng = engine.score_sphere(data, sphere, reponses)
    pos = engine.recentrer(data, sphere, brut)
    code = engine.profil_binaire(pos)
    teinte = engine.teinte(data, sphere, pos, eng)
    niveaux = data["meta"]["teintes"][sphere]["niveaux"]
    sortie.append({
        "pos": pos,
        "code": code,
        "delta": engine.delta_global(pos),
        "saveur": profils[sphere][code]["saveur"],
        "figure": profils[sphere][code]["figure"],
        "teinte": niveaux.index(teinte) if teinte in niveaux else None,
    })

sys.stdout.reconfigure(encoding="utf-8")
json.dump(sortie, sys.stdout, ensure_ascii=False)
