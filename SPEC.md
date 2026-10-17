# Apéricube — spécification fonctionnelle et note de conception

*Document de hand-off pour Claude Code. Il explique ce qu'est le projet, toutes les mécaniques, ce qu'on veut en faire, et comment les trois fichiers techniques (`data.json`, `profils.json`, `engine.py`) s'articulent. Lire ce document en entier avant de coder.*

---

## 1. Ce qu'est le projet, en une page

Un test ludique, façon « quel Apéricube es-tu ». Le participant traverse des **scènes** de vie sociale (une soirée, un train en panne, un déménagement entre potes…), fait des choix, et reçoit à la fin une **saveur d'Apéricube** avec un nom de figure et un texte. C'est léger, c'est fait pour rigoler et se partager entre amis.

**Ce que le participant vient chercher** : un résultat rigolo et partageable. Rien d'autre. Aucun enjeu affiché, aucune profondeur revendiquée. C'est précisément parce qu'il n'y a pas d'enjeu que les gens répondent spontanément.

**Ce que le projet fait réellement, en coulisse** : il cartographie la façon dont une personne *circule* dans ses relations — comment elle donne, prend de la place, ouvre ou rejoue, s'engage ou pose des conditions. Cette donnée est à usage de recherche (le concepteur), jamais restituée telle quelle au participant. La saveur est le costume ; la circulation est la mesure.

Deux principes gouvernent tout :
- **Non-diagnostic** : on ne dit jamais au participant quelque chose d'anxiogène sur lui, aucun manque, aucun jugement. Voir §9.
- **On observe, on ne prescrit pas** : le résultat décrit, avec chaleur, ce qu'on a vu. Il ne conseille rien. La personne fait le reste du chemin elle-même.

---

## 2. Les sphères

Trois sphères étaient prévues ; **deux sont faites et livrées** :
- **Chez les autres** : la sociabilité avec des inconnus (l'impersonnel).
- **Chez nous** : la sociabilité avec des proches (le lien choisi, le groupe qui a une histoire).
- *Chez moi* (seul) : prévue, non écrite. Hors périmètre de cette livraison.

Chaque sphère est **indépendante** : on peut jouer l'une, l'autre, ou les deux. Chaque sphère donne **sa propre saveur**, et les deux jeux de saveurs sont **étanches** (aucune saveur commune). Quelqu'un qui fait les deux sphères obtient deux saveurs différentes — ce qui est voulu : on n'est pas le même avec des inconnus et avec ses proches.

---

## 3. Les continuums (ce qu'on mesure)

Cinq réglettes bipolaires. Les quatre premières sont le **cœur**, communes aux deux sphères. La cinquième (conformité) n'existe que chez nous.

| Continuum | Pôle − | Pôle + | Ce qu'il mesure |
|---|---|---|---|
| **DON** | retenir | donner | vers qui va ce qui circule |
| **PRÉSENCE** | s'effacer | occuper | combien d'espace on prend |
| **DETTE** | rejouer | ouvrir | rapport au connu vs au neuf |
| **PARI** | laisser venir | conditionner | gratuité vs cadre, le régime de l'engagement |
| **CONF** *(chez nous)* | se conformer | circuler | rapport au groupe comme système |

Chaque continuum porte **deux données** : une **position** (de quel côté, et combien) et un **engagement** (à quel point c'est tenu : hasard → habitude → choix → ancrage). L'engagement se lit via les **sondes** (voir §5).

Aucun pôle n'est « mieux » qu'un autre. Retenir vaut donner, s'effacer vaut occuper. C'est une carte, pas une note.

---

## 4. La structure des scènes

Chaque scène est un **fil narratif** de 8 moments, qu'on déroule comme une petite histoire (arrivée → montée → clôture). Le participant ne voit jamais qu'il est « testé » : il vit une soirée, un trajet.

Deux types de moments :
- **simple** : une question, 3 ou 4 options, un choix.
- **arbre** *(chez nous uniquement)* : une première question (étage 1) dont **chaque** réponse ouvre une seconde question spécifique (étage 2) à 3-4 options. Une réponse → quatre nouvelles situations. Les deux étages comptent dans le calcul. Les arbres sont placés là où le groupe pèse le plus. Ils créent de la surprise (on ne sait jamais quand un 2e étage tombe) et font que le contexte se recharge selon le choix.

**Troncs et sondes.** Les premiers moments d'une scène sont des **troncs** : ils posent une position à froid. Les moments tardifs sont des **sondes** : ils ré-éprouvent un continuum quand le coût a monté (la nuit avance, la fatigue arrive). L'engagement se lit dans la sonde : un geste qui tient quand ça coûte est ancré ; un geste qui cède est du hasard. Chaque sonde de don porte un cran d'engagement (1 à 4) dans ses options.

**Règle d'or des arbres** : un arbre *réagit* au choix précédent (le décor change) mais ne *restreint* jamais l'éventail des gestes possibles. On ne mesure pas un enfermement qu'on aurait imposé ; chaque branche reste une situation digne, aucune ne punit le choix d'avant.

---

## 5. Le calcul, étape par étape

Implémenté dans `engine.py`. Résumé :

**a. Score brut.** On parcourt les réponses, on additionne les poids de chaque option choisie par continuum. Pour un moment-arbre, les deux étages comptent, **pondérés à 0,5 chacun** (`pondération_arbre` dans data.json) pour qu'un arbre ne pèse pas plus lourd qu'un moment simple.

**b. Recentrage du DON par la pression.** Le don ne se mesure pas en absolu mais comme **écart au comportement attendu vu la situation**. Chaque question de don porte une `pression` (forte +0,5 / moyenne +0,2 / faible 0 / négative −0,2) : plus la situation pousse à donner (un inconnu en détresse, un pote débordé), plus donner est « normal » donc peu signifiant ; donner quand rien n'y pousse ressort comme un vrai don gratuit. On soustrait la pression au poids du don. *(C'est le cœur de l'objet : distinguer le don gratuit du don contraint.)*

**c. Recentrage des autres continuums.** Même équilibrés, les répondants aléatoires ne tombent pas pile au centre (les sondes penchent structurellement). On a mesuré par simulation le « zéro réel » de chaque continuum et on l'y ramène (`recentrage` dans data.json). Ça préserve tous les écarts entre personnes, ça déplace juste l'origine. Comme étalonner le zéro d'un instrument.

**d. Profil binaire.** Le **signe** de chaque axe de profil (DON, PRÉSENCE, DETTE, PARI) donne un code à 4 lettres (ex. `-+++`) → une des **16 cases** → une saveur. (La conformité n'entre PAS dans le code : chez nous elle est une teinte, pas un axe de profil. Voir §7.)

**e. Delta global.** La somme des distances au centre sur les 4 axes de profil. Mesure à quel point la personne est **tranchée**. Pilote le **ton** du texte (doux si proche du centre, relevé si extrême), jamais la case.

**f. Teinte.** Voir §7.

**g. Saveur.** Le code binaire → `profils.json` → saveur + figure. Le texte complet de chaque profil est dans `les-32-profils.md`.

---

## 6. Les saveurs et le delta

32 saveurs au total, 16 par sphère, étanches. **Nature est évacué** (trop fade pour représenter qui que ce soit).

La répartition suit le delta : les cases extrêmes (`++++`) reçoivent les saveurs les plus intenses (Chorizo piment de Cayenne chez les autres, Hot Challenge chez nous) et un **texte relevé** ; les cases proches du centre reçoivent les saveurs douces (Emmental, Camembert) et un **texte enveloppant**. Logique : une personnalité tranchée mérite une saveur à caractère, et un ton qui épouse son tempérament sans le juger. On ne ménage pas tout le monde pareil : le nuancé est rassuré par la douceur, le tranché est *validé* par une saveur forte.

Le delta module le **ton**, pas la saveur : deux personnes de la même case (même saveur) mais de deltas différents reçoivent la même saveur avec une version du texte plus ou moins relevée. *(Les variantes de texte par delta restent à rédiger ; les pavés actuels sont au niveau « moyen ».)*

---

## 7. Les teintes

Quatre teintes par profil, qui **nuancent le texte sans changer la saveur**. Chaque sphère a sa teinte propre :

- **Chez les autres → l'engagement** (4 niveaux : hasard, habitude, choix, ancrage). Calculé en moyennant les crans d'engagement des sondes rencontrées, arrondi.
- **Chez nous → la conformité** (4 niveaux : très conforme, plutôt conforme, plutôt libre, très libre). Calculé en découpant la position CONF par trois seuils (`[-0.47, 0.03, 0.48]`).

Pourquoi la conformité est une teinte et non un axe de profil : pour garder la **symétrie** entre les deux sphères (chacune = 4 axes de profil + 1 teinte). Comme l'engagement chez les autres, la conformité colore chez nous, elle ne double pas les profils. Les deux font le même travail, chacune dans sa sphère.

Les scènes de chez nous ont été **calibrées pour que les 4 niveaux de conformité soient lisibles** (le signal de conformité a été renforcé à cet effet, sans qu'il déborde de son rôle d'invité discret : son amplitude reste sous celle des axes du cœur).

---

## 8. Le flux complet (ce que l'app enchaîne)

1. **Onboarding** *(chez nous)* : un écran d'intro qui finit sur « Et c'est ok », puis 3 questions « effet Barnum » qui ne comptent pas (zéro point, réponses toutes flatteuses), puis une bascule qui révèle le piège (« c'était ton horoscope »). But : mettre à l'aise, désarmer le sceptique. Détail dans `chez-nous-v3.md` §1. *(Chez les autres n'a pas d'onboarding piège, juste une courte intro.)*
2. **Les 3 scènes** de la sphère, dans l'ordre, chaque moment présenté comme une situation de vie.
3. **Calcul** (engine.py) : réponses → constellation → profil → saveur → teinte → ton.
4. **Restitution** : la saveur, le nom de figure, le texte du profil (version du ton selon le delta), la teinte intégrée au texte. **Rien d'autre.**

---

## 9. Non-diagnostic — règle absolue

Ce que l'app montre au participant : saveur, figure, texte chaleureux, teinte. Point.

Ce qu'elle ne montre **jamais** : les positions brutes, le code binaire, le delta, la conformité chiffrée, toute lecture négative d'un pôle (« tu te soumets », « tu t'effaces », « tu fuis »), tout conseil correctif (« pense à toi »), toute comparaison entre les sphères (« tu donnes chez toi mais pas chez les autres »).

Aux positions **extrêmes**, le texte en dit *moins* et plus doux, jamais plus : on ne pointe pas le point sensible, on décrit et on s'arrête. La base de restitution de la conformité (dans `les-32-profils.md`, teintes) applique déjà ça.

Les données « recherche » (positions, deltas, écarts inter-sphères) sont pour le concepteur, dans un canal séparé. Dans le code, tout ce qui est renvoyé par `evaluer()` sous "côté RECHERCHE" ne doit pas atteindre l'écran du participant.

---

## 10. Les fichiers livrés

- **`SPEC.md`** — ce document.
- **`data.json`** — toutes les données du moteur : les 2 sphères, chaque scène, chaque moment (simple ou arbre), chaque option avec ses poids, les pressions de don, les offsets de recentrage, les seuils de teinte, la pondération des arbres.
- **`profils.json`** — le mapping code binaire → saveur + figure, pour les 2 sphères.
- **`engine.py`** — le moteur de calcul fonctionnel (référence à porter). Testé, tourne de bout en bout.
- **`les-32-profils.md`** *(dans les documents du projet)* — les textes complets des 32 profils : saveur, figure, pavé descriptif, coordonnées, 4 teintes rédigées chacune.
- **`chez-nous-v3.md`** *(idem)* — l'onboarding, le continuum conformité, les 3 scènes complètes avec leurs arbres rédigés et la base de restitution conformité.
- **`scenes-chez-les-autres.md`** *(idem)* — les 3 scènes de chez les autres, texte complet.

---

## 11. État réel et ce qui reste à faire (à lire absolument)

Rien ici n'est « fini à 100 % ». État honnête :

**Calibré et fiable :**
- Les 4 continuums du cœur sont équilibrés sur les deux sphères (un répondant aléatoire ne penche nulle part).
- Le recentrage et les pressions de don sont mesurés et intégrés.
- La conformité est muscée pour que ses 4 teintes soient lisibles, sans déborder.
- Le moteur tourne de bout en bout.

**À faire / trous connus :**
- **ÉCART IMPORTANT** : chez nous devait avoir **3 arbres par scène** (spec validée) ; la version calibrée et livrée en a **2 par scène**. L'ajout du 3e arbre est un raffinement prévu mais **non calibré** — à faire puis recalibrer si on le veut. Le document `chez-nous-v3.md` décrit la version à 3 arbres ; `data.json` contient la version à 2 arbres calibrée. **En cas de divergence, data.json fait foi pour le calcul.**
- **Test de séparation jamais lancé** : on a vérifié que les tables sont *équilibrées* (ne poussent personne), PAS qu'elles *séparent* bien les profils (que des gens différents tombent à des endroits différents). C'est le prochain test à faire. Risque connu : la DETTE est molle (beaucoup de monde au centre) sur les deux sphères.
- **Variantes de texte par delta** non rédigées (les pavés sont au niveau moyen).
- **Coordonnées des profils** (dans les-32-profils.md) sont indicatives (−10 à +10), à normaliser sur les scores réels du moteur.
- **Sphère chez moi** non écrite.
- **Seuil delta → ton** (`SEUIL_DELTA_RELEVE` dans engine.py) posé à l'estime, à caler sur la distribution réelle.
- **Onboarding chez nous** : la transition « horoscope » a une formulation en cours d'ajustement (le mot « fini de rire » est à remplacer, cf. discussion).

---

## 12. Format des réponses attendu par le moteur

```
reponses = {
  "nom_scene": [choix_moment_1, choix_moment_2, ...],   # un choix par moment, dans l'ordre
  ...
}
```
- moment **simple** : le choix est un entier (index de l'option, à partir de 0).
- moment **arbre** : le choix est un couple `(index_étage1, index_branche_étage2)`.

Voir l'exemple exécutable en bas de `engine.py`.


## 13. Mise à jour du calibrage (prototype complet)

- **Recentrage chez nous corrigé** : l'ancien offset du DON (−1,76) avait été calculé sans les pressions de situation, que le moteur applique ensuite ; le DON était corrigé deux fois et les profils « qui donnent » ne sortaient presque jamais. Nouvel offset : −0,20 (résidu de don gratuit +0,25, comme chez les autres). Tous les offsets de `data.json` ont été recalculés avec le moteur exact.
- **Teinte d'engagement** : la moyenne des crans se tasse au centre, donc l'arrondi ne donnait jamais « au hasard » ni « par ancrage ». Seuils désormais aux quartiles : 2,333 / 2,556 / 2,778.
- **Vérification** : 20 000 parcours aléatoires par sphère, les 16 profils sont atteints de chaque côté (entre 4 et 11 %), les 4 teintes apparaissent.
- **Prototype de référence** : `apericube.html` contient l'intégralité des scènes, les arbres, le calcul et les écrans de résultat. Il fait foi pour le comportement attendu de l'interface.
