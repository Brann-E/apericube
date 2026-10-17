"""
Apéricube — moteur de calcul (implémentation de référence).

Prend les réponses d'une personne à une sphère, produit :
  - la constellation (position par continuum)
  - le profil binaire (les 4 axes de profil → une case parmi 16)
  - le delta global (à quel point la personne est tranchée)
  - la saveur attribuée
  - la teinte (engagement chez les autres, conformité chez nous)

Ce code est une RÉFÉRENCE lisible, à porter dans le langage de l'app.
Toutes les valeurs numériques (poids, offsets, seuils) viennent de data.json.

Règle de non-diagnostic : ce moteur produit des données côté RECHERCHE.
L'app ne montre au participant QUE la saveur, le nom de figure et le texte
du profil (côté RÉPONDANT). Jamais les positions brutes, jamais une lecture
négative d'un pôle. Voir SPEC.md §non-diagnostic.
"""

import json

AXES_PROFIL = ["DON", "PRESENCE", "DETTE", "PARI"]


def charger(path="data.json"):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------------------------
# 1. SCORE D'UNE SPHÈRE
# ---------------------------------------------------------------------------
# Une "réponse" est, pour chaque moment, l'index de l'option choisie.
# Pour un moment-arbre : un couple (index_étage1, index_branche_étage2).
#
# reponses = {
#   "soiree":  [0, 2, 1, 3, 0, 2, 1, 0],          # chez les autres : que des simples
#   "apero":   [(1,2), 0, 3, 1, (0,1), 2, 0, 3],  # chez nous : arbres = tuples
#   ...
# }

def score_sphere(data, sphere, reponses):
    """Retourne les positions brutes par continuum (avant recentrage)."""
    meta = data["meta"]
    aw = meta["pondération_arbre"]          # 0.5 : chaque étage d'arbre compte à moitié
    scenes = data[sphere]["scenes"]
    pos = {c: 0.0 for c in meta["continuums"]}
    engagements = []                         # crans d'engagement rencontrés (pour la teinte)

    for nom_scene, moments in scenes.items():
        choix_scene = reponses[nom_scene]
        for moment, choix in zip(moments, choix_scene):
            if moment["type"] == "simple" if "type" in moment else moment.get("role") != "arbre":
                # moment simple (chez les autres n'a pas de champ "type")
                opts = moment["options"]
                opt = opts[choix]
                _ajoute(pos, opt["poids"], 1.0, moment.get("pression"))
                if "engagement" in opt:
                    engagements.append(opt["engagement"])
            else:
                # moment-arbre (chez nous)
                i1, i2 = choix
                o1 = moment["etage1"][i1]
                o2 = moment["branches"][str(i1)][i2]
                _ajoute(pos, o1["poids"], aw, moment.get("pression"))
                _ajoute(pos, o2["poids"], aw, moment.get("pression"))

    return pos, engagements


def _ajoute(pos, poids, facteur, pression):
    """Ajoute les poids d'une option, en recentrant le DON sur la pression locale."""
    for c, v in poids.items():
        if c == "DON" and pression is not None:
            # le don est mesuré comme écart au comportement attendu vu la pression
            pos[c] += (v - pression) * facteur
        else:
            pos[c] += v * facteur


# ---------------------------------------------------------------------------
# 2. RECENTRAGE
# ---------------------------------------------------------------------------
# On ramène chaque continuum à son zéro réel (mesuré par simulation).
# Préserve tous les écarts entre personnes ; déplace seulement l'origine.

def recentrer(data, sphere, pos):
    off = data["meta"]["recentrage"][sphere]
    return {c: pos[c] + off.get(c, 0.0) for c in pos}


# ---------------------------------------------------------------------------
# 3. PROFIL BINAIRE → CASE → SAVEUR
# ---------------------------------------------------------------------------
# Le signe de chaque axe de profil donne un code à 4 lettres → une des 16 cases.

def profil_binaire(pos):
    return "".join("+" if pos[a] > 0 else "-" for a in AXES_PROFIL)


# ---------------------------------------------------------------------------
# 4. DELTA GLOBAL
# ---------------------------------------------------------------------------
# Distance totale au centre, tous axes de profil confondus (la somme de tout).
# Pilote le TON du texte (doux ↔ relevé), jamais la case.

def delta_global(pos):
    return sum(abs(pos[a]) for a in AXES_PROFIL)


# ---------------------------------------------------------------------------
# 5. TEINTE
# ---------------------------------------------------------------------------
def teinte(data, sphere, pos, engagements):
    t = data["meta"]["teintes"][sphere]
    if t["source"] == "engagement":
        # moyenne des crans d'engagement rencontrés, arrondie au niveau le plus proche
        if not engagements:
            return None
        moy = sum(engagements) / len(engagements)
        s = t.get("seuils_engagement_moyen", [2.333, 2.556, 2.778])
        niveau = 0 if moy < s[0] else 1 if moy < s[1] else 2 if moy < s[2] else 3
        return t["niveaux"][niveau]
    else:
        # conformité : position CONF découpée en 4 par les seuils
        x = pos["CONF"]
        s = t["seuils"]
        if x < s[0]:
            return t["niveaux"][0]   # très conforme
        if x < s[1]:
            return t["niveaux"][1]   # plutôt conforme
        if x < s[2]:
            return t["niveaux"][2]   # plutôt libre
        return t["niveaux"][3]       # très libre


# ---------------------------------------------------------------------------
# 6. ASSEMBLAGE
# ---------------------------------------------------------------------------
def evaluer(data, sphere, reponses, mapping_saveurs):
    """
    mapping_saveurs : dict { sphere : { code_binaire : {saveur, figure} } }
    (fourni séparément, voir profils.json / les-32-profils.md)
    """
    brut, eng = score_sphere(data, sphere, reponses)
    pos = recentrer(data, sphere, brut)
    code = profil_binaire(pos)
    d = delta_global(pos)
    tt = teinte(data, sphere, pos, eng)
    saveur = mapping_saveurs[sphere].get(code, {})

    return {
        # ---- côté RECHERCHE (ne jamais montrer au participant) ----
        "positions": {c: round(pos[c], 2) for c in pos},
        "code_binaire": code,
        "delta_global": round(d, 2),
        # ---- côté RÉPONDANT (ce que l'app affiche) ----
        "saveur": saveur.get("saveur"),
        "figure": saveur.get("figure"),
        "teinte": tt,
        # le ton du texte (doux/relevé) se choisit sur delta_global :
        "ton_suggere": "relevé" if d > SEUIL_DELTA_RELEVE else "doux",
    }


# Seuil indicatif delta → ton. À caler sur la distribution réelle (voir SPEC §delta).
SEUIL_DELTA_RELEVE = 6.0


# ---------------------------------------------------------------------------
# Exemple d'usage
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    data = charger()
    # réponses fictives (chez nous, avec arbres = tuples)
    rep = {
        "apero":        [(1, 2), 0, 3, (1, 0), 0, 2, 1, 0],
        "weekend":      [(0, 3), 1, 1, 2, (0, 1), 2, 1, 0],
        "demenagement": [(2, 0), 1, 2, 3, (1, 1), 3, 2, 1],
    }
    # mapping minimal pour l'exemple (normalement chargé depuis profils.json)
    mapping = {"chez_nous": {}}
    res = evaluer(data, "chez_nous", rep, mapping)
    print(json.dumps(res, ensure_ascii=False, indent=2))
