# Quel Apéricube es-tu ?

**Le site : https://brann-e.github.io/apericube/**

Un petit jeu à faire sur son téléphone. On traverse des scènes de vie sociale (une soirée où l'on ne connaît personne, un train en panne, un apéro avec la bande, un déménagement entre potes…), on fait des choix, et on reçoit à la fin une **saveur d'Apéricube**, un nom de figure et un portrait. C'est léger, c'est fait pour rire et se partager entre amis.

Derrière ce costume, le jeu est un **instrument de recherche**. Il ne cherche pas à dire *qui* est quelqu'un, mais à relever *comment ça circule* à travers lui dans ses relations : ce qu'il donne ou garde, la place qu'il prend, s'il rejoue le connu ou ouvre du neuf, s'il s'engage sans condition ou pose un cadre.

> La saveur est le costume ; la circulation est la mesure.

---

## Ce que le projet cherche à voir

Ce n'est **pas un test de personnalité**. Un test de personnalité mesure des traits supposés stables et range les gens dans des types. Ici, on décrit des **formes de circulation relationnelle** : comment une personne fait passer, ou retient, de l'attention, de la reconnaissance, du temps, dans des moments ordinaires qui n'appartiennent ni au travail ni aux obligations.

En arrière-plan, une question oriente le regard : comment chacun tient ensemble **le geste qui ouvre** (donner sans garantie) et **la limite qui protège** (ne pas se laisser déborder). Cette question est observée, jamais tranchée, et jamais renvoyée au participant.

Deux principes guident la démarche :

- **Morphologique** : on reconnaît des formes, on ne prédit rien. Le résultat est une forme nommée, pas un score.
- **Géographique** : on dessine une carte, pas une coordonnée. Une même personne peut avoir un relief différent selon le contexte, sans que ce soit une contradiction.

C'est pourquoi l'expérience est découpée en **sphères**.

## Les deux sphères

| Sphère | De quoi on parle | Teinte du résultat |
|---|---|---|
| **Chez les autres** | la sociabilité avec des inconnus, l'impersonnel | l'engagement |
| **Chez nous** | la sociabilité avec ses proches, le groupe qui a une histoire | la conformité |

Chaque sphère est indépendante et donne **sa propre saveur**. Les deux jeux de 16 saveurs sont étanches : quelqu'un qui fait les deux sphères obtient forcément deux saveurs différentes. C'est voulu, on n'est pas le même avec des inconnus et avec les siens.

## Les continuums : ce qu'on mesure

Tout repose sur des **continuums**, des réglettes à deux pôles. Les quatre premiers sont communs aux deux sphères ; le cinquième n'existe que chez nous.

| Continuum | Pôle − | Pôle + | Ce qu'il décrit |
|---|---|---|---|
| **Le don** | retenir | donner | vers qui va ce qui circule |
| **La présence** | s'effacer | occuper | combien d'espace on prend dans le flux |
| **La dette** | rejouer | ouvrir | le rapport au connu et au neuf |
| **Le pari** | laisser venir | conditionner | le régime de l'engagement : gratuité ou cadre |
| **La conformité** *(chez nous)* | se conformer | circuler | le rapport au groupe comme système |

- **Le don** est l'axe central de l'objet. Il s'inspire du don chez Mauss et de l'axe d'affiliation des modèles interpersonnels.
- **La présence** reprend l'axe d'affirmation de soi, le plus robuste des modèles relationnels.
- **La dette** est l'apport propre du projet : entretenir les circuits connus (honorer, rejouer ce qui a marché) ou nouer sans cesse de nouvelles alliances.
- **Le pari** porte la tension entre l'inconditionnel qui ouvre et la règle qui protège (Simmel, Caillé). C'est le continuum le plus proche de la question de fond.
- **La conformité** colore le résultat chez nous ; elle ne change pas la saveur.

**Aucun pôle n'est meilleur qu'un autre.** Retenir vaut donner, s'effacer vaut occuper, poser une limite est un geste légitime. C'est une carte, pas une note.

### Position et engagement

Chaque continuum porte deux informations :

- la **position** : de quel côté on penche, et combien ;
- l'**engagement** : à quel point cette position est tenue. On peut donner parce qu'on s'en fiche, ou parce que ça fait sens. L'engagement se lit sur une échelle à quatre crans :

| Cran | Nom | Ce qu'il ajoute |
|---|---|---|
| 1 | le hasard | rien : on est là sans l'avoir choisi |
| 2 | l'habitude | la durée : installé, par inertie |
| 3 | le choix | la raison : assumé, défendable |
| 4 | l'ancrage | l'identité : c'est ce qu'on *est*, pas ce qu'on *fait* |

## Les scènes

Chaque sphère compte **trois scènes de huit moments**, racontées comme une petite histoire (arrivée, montée, clôture). Le participant ne se sent jamais « testé » : il vit une soirée, un trajet, un week-end.

- **Les troncs** (premiers moments) posent une position à froid.
- **Les sondes** (moments tardifs) ré-éprouvent un continuum quand le coût monte : la nuit avance, la fatigue arrive. Un geste qui tient quand il coûte est ancré ; un geste qui cède relève du hasard. C'est là qu'on lit l'engagement.
- **Les arbres** (chez nous seulement) : une première question dont chaque réponse ouvre une seconde question propre. Le décor réagit au choix précédent, mais **ne restreint jamais** l'éventail des gestes possibles : aucune branche ne punit le choix d'avant.

Chez nous commence par un petit **onboarding** : trois questions façon horoscope, toutes flatteuses et sans aucun poids, puis une bascule (« C'était ton horoscope. ») qui met à l'aise et désarme le sceptique.

## Le calcul

Le moteur de référence est [`engine.py`](engine.py) ; toutes les valeurs viennent de [`data.json`](data.json).

1. **Score brut.** On additionne, par continuum, les poids de chaque réponse. Dans un arbre, chaque étage compte pour moitié, pour qu'un arbre ne pèse pas plus qu'un moment simple.
2. **Le don recentré sur la pression.** Le don se mesure comme un **écart à ce que la situation appelle**. Chaque question de don porte une pression (forte, moyenne, faible, négative). Donner quand tout y pousse est attendu, donc peu signifiant ; donner quand rien n'y pousse ressort comme un vrai don gratuit.
3. **Recentrage.** Même avec des réponses au hasard, les continuums ne tombent pas pile au centre. On a mesuré par simulation le « zéro réel » de chacun, et on l'y ramène : comme étalonner le zéro d'un instrument.
4. **Profil.** Le signe des quatre continuums du cœur donne un code (par exemple `+ − + +`), donc **une case parmi 16**, donc une saveur.
5. **Delta.** La distance totale au centre dit à quel point la personne est tranchée. Il doit piloter le **ton** du texte (doux ou relevé), jamais la case.
6. **Teinte.** Elle nuance le texte sans changer la saveur : l'engagement chez les autres (hasard, habitude, choix, ancrage), la conformité chez nous (très conforme, plutôt conforme, plutôt libre, très libre).

## Les 32 saveurs

La répartition suit le caractère : les cases extrêmes reçoivent les saveurs les plus intenses (Chorizo piment de Cayenne, Hot Challenge), les cases proches du centre les plus douces (Emmental, Camembert). Une personnalité tranchée mérite une saveur à caractère ; une personnalité nuancée est accueillie par la douceur.

<details>
<summary><b>Chez les autres</b></summary>

| Don | Présence | Dette | Pari | Saveur | Figure |
|:-:|:-:|:-:|:-:|---|---|
| − | − | − | − | Emmental | L'Aise |
| − | − | − | + | Échalote ciboulette | La Réserve |
| − | − | + | − | Cèpes | Le Connaisseur |
| − | − | + | + | Gouda cumin | L'Esthète |
| − | + | − | − | Poivre vert | L'Étincelle |
| − | + | − | + | Bleu | Le Clivant |
| − | + | + | − | Olive verte | Le Rapporteur |
| − | + | + | + | Chorizo | Le Trublion |
| + | − | − | − | Chèvre | Le Calme |
| + | − | − | + | Ail & fines herbes | Le Liant |
| + | − | + | − | Noix | L'Hôte discret |
| + | − | + | + | Cheddar Tex Mex | Le Guide |
| + | + | − | − | Jambon | Le Bon Vivant |
| + | + | − | + | Bacon grillé | Le Meneur |
| + | + | + | − | Poivron piment jalapeño | L'Aventurier |
| + | + | + | + | Chorizo piment de Cayenne | L'Incendie |

</details>

<details>
<summary><b>Chez nous</b></summary>

| Don | Présence | Dette | Pari | Saveur | Figure |
|:-:|:-:|:-:|:-:|---|---|
| − | − | − | − | Camembert | Le Pilier |
| − | − | − | + | Saumon aneth | Le Fidèle discret |
| − | − | + | − | Bleu & noix | Le Curieux fidèle |
| − | − | + | + | Truffe | L'Exigeant |
| − | + | − | − | Basilic | Le Grain de sel |
| − | + | − | + | Tomate piment basque | Le Caractère |
| − | + | + | − | Pizza | L'Électron |
| − | + | + | + | Sauce barbecue | Le Frondeur |
| + | − | − | − | Jambon cru | Le Cœur |
| + | − | − | + | 3 fromages | Le Ciment |
| + | − | + | − | Tomate | Le Passeur |
| + | − | + | + | Saint-Jacques | Le Grand Cœur |
| + | + | − | − | Poulet grillé | Le Chaleureux |
| + | + | − | + | Oignon fondant | Le Capitaine |
| + | + | + | − | Ail des ours | L'Explorateur commun |
| + | + | + | + | Hot Challenge | Le Volcan |

</details>

Les textes complets des profils et de leurs teintes sont dans [`les-32-profils.md`](les-32-profils.md).

## La règle de non-diagnostic

Le participant voit **sa saveur, sa figure, sa nuance et son portrait. Rien d'autre.**

Il ne voit jamais les positions chiffrées, le code, le delta, une lecture négative d'un pôle (« tu t'effaces », « tu fuis »), un conseil correctif, ni une comparaison entre ses deux sphères. Aux positions extrêmes, le texte en dit moins et plus doucement, jamais plus. On observe, on ne prescrit pas : la personne fait le reste du chemin elle-même.

Le détail du calcul n'est visible qu'en ajoutant `?recherche` à l'adresse du site.

## Les données collectées

À la fin de chaque sphère, le participant peut, s'il le veut, envoyer ses réponses et un commentaire libre. Ils servent à améliorer le questionnaire : les scènes, les questions, et la façon dont les profils sont calculés.

Chaque envoi ajoute une ligne dans une Google Sheet : version du questionnaire, identifiant de session tiré au hasard (il relie les deux sphères d'une même visite, et n'est jamais sauvegardé), saveur, figure, code, teinte, delta, positions brutes et recentrées, réponses (au format d'`engine.py`, donc recalculables), commentaire.

**Rien n'identifie la personne** : ni nom, ni adresse mail, ni adresse IP n'est enregistré. À noter : la police du site est chargée depuis Google Fonts, ce qui transmet techniquement l'adresse IP du visiteur à Google au chargement de la page.

## Organisation du dépôt

| Chemin | Rôle |
|---|---|
| `site/` | le site publié, et rien d'autre |
| `netlify.toml` | les réglages de publication sur Netlify |
| `site/contenu.js` | les scènes, les questions, les poids, les profils, les couleurs |
| `site/app.js` | la 3D, la navigation, le calcul, l'envoi |
| `site/envoi.js` | l'adresse de la Google Sheet et la **version du questionnaire** |
| `outils/verifier.js` | le test de conformité (voir plus bas) |
| `outils/google-sheet.gs` | le script qui reçoit les envois dans la Google Sheet |
| `data.json`, `profils.json`, `engine.py` | les données et le moteur de référence |
| `SPEC.md`, `methodologie-instrument.md` | la spécification et le cadre méthodologique |
| `scenes-chez-les-autres.md`, `chez-nous-v3.md`, `les-32-profils.md` | les textes |
| `couleurs-apericube.html` | la palette des 32 saveurs (version pop, qui fait foi) |
| `apericube.html` | le prototype d'origine, gardé comme référence |

## Travailler sur le projet

**Voir le site en local** : servir le dossier `site/` avec n'importe quel serveur statique.

**Tester** : avant toute publication, et après toute modification des données ou du calcul.

```bash
node outils/verifier.js
```

Le test vérifie que les données du site sont identiques à `data.json`, `profils.json` et à la palette ; que le calcul du site donne exactement le même résultat qu'`engine.py` sur 1 000 parcours au hasard par sphère ; et que les réponses envoyées à la Google Sheet sont exactement celles du parcours. Il demande Node et Python.

**Publier** : chaque push sur `main` relance ce test, puis publie `site/` **seulement si le test passe** :

- sur **Netlify**, réglé par [`netlify.toml`](netlify.toml) ;
- sur **GitHub Pages**, réglé par [`.github/workflows/publier.yml`](.github/workflows/publier.yml).

**Changer les questions ou les poids** : penser à changer `version` dans `site/envoi.js`, pour savoir avec quelle version du questionnaire chaque ligne a été produite.

## État et chantiers connus

- Le test de **séparation** des profils (vérifier que des personnes différentes tombent à des endroits différents) n'a pas encore été lancé. La dette est probablement molle : beaucoup de monde au centre.
- Les variantes de texte **douce et relevée** selon le delta ne sont pas encore écrites : tout le monde reçoit le texte de niveau moyen.
- Chez nous compte **deux arbres par scène** (version calibrée) ; le troisième prévu dans `chez-nous-v3.md` n'est pas calibré. `data.json` fait foi.
