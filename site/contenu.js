window.CONTENT = {
  "autres": [
    {
      "key": "soiree",
      "title": "La soirée",
      "intro": "On t'a invité à une soirée. Tu connais la personne qui t'a fait venir, et à peu près personne d'autre. Tu pousses la porte.",
      "items": [
        {
          "k": "q",
          "n": 1,
          "t": "L'entrée",
          "s": "Celui qui t'a invité te fait un signe de loin, puis disparaît vers la cuisine. Te voilà planté dans l'entrée, manteau à la main, au milieu de gens qui se connaissent déjà.",
          "p": null,
          "o": [
            {
              "t": "Je repère un coin tranquille et je m'y pose",
              "w": {
                "DON": -0.6
              },
              "e": null
            },
            {
              "t": "Je file en cuisine voir si je peux aider",
              "w": {
                "DON": 0.5
              },
              "e": null
            },
            {
              "t": "Je me greffe au groupe le plus proche",
              "w": {
                "DON": 0.1,
                "PRESENCE": 0.3
              },
              "e": null
            },
            {
              "t": "Je m'installe et j'observe qui est là",
              "w": {
                "DON": -0.4
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "La question qui tue",
          "s": "Quelqu'un se tourne vers toi : « Et toi, tu fais quoi dans la vie ? » Trois personnes attendent ta réponse.",
          "p": null,
          "o": [
            {
              "t": "Je réponds court et je renvoie la question",
              "w": {
                "PRESENCE": -0.5,
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "Je raconte, ça part pour un moment",
              "w": {
                "PRESENCE": 0.6
              },
              "e": null
            },
            {
              "t": "Je réponds un truc un peu décalé pour voir leur tête",
              "w": {
                "PRESENCE": 0.3,
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Je donne la vraie version, précise, quitte à ce que ce soit long",
              "w": {
                "PRESENCE": 0.4,
                "PARI": 0.4
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "L'assiette inconnue",
          "s": "Sur la table, un truc que tu ne reconnais pas. Ça a l'air bon, mais tu ne sais pas ce que c'est.",
          "p": null,
          "o": [
            {
              "t": "J'y goûte direct, on verra",
              "w": {
                "DETTE": 0.6
              },
              "e": null
            },
            {
              "t": "Je demande ce que c'est avant",
              "w": {
                "DETTE": -0.2,
                "PARI": 0.4
              },
              "e": null
            },
            {
              "t": "Je prends ce que je connais déjà, à côté",
              "w": {
                "DETTE": -0.6
              },
              "e": null
            },
            {
              "t": "Je regarde si quelqu'un d'autre y touche d'abord",
              "w": {
                "DETTE": -0.2,
                "PRESENCE": -0.3
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 4,
          "t": "Le silence qui s'installe",
          "s": "Un creux dans la soirée. La conversation retombe, personne ne relance. Un léger flottement.",
          "p": null,
          "o": [
            {
              "t": "Très bien, les silences ne me dérangent pas",
              "w": {
                "PARI": -0.4
              },
              "e": null
            },
            {
              "t": "Je lance un sujet, n'importe lequel, pour relancer",
              "w": {
                "PARI": 0.2,
                "PRESENCE": 0.3
              },
              "e": null
            },
            {
              "t": "Je propose qu'on fasse quelque chose, un jeu, sortir",
              "w": {
                "PARI": 0.3,
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "J'attends de voir qui va reprendre la main",
              "w": {
                "PARI": 0.3,
                "PRESENCE": -0.3
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 5,
          "t": "Le type dans le coin",
          "s": "Tu allais te resservir. Dans un coin, quelqu'un que personne ne connaît, visiblement pas à l'aise, seul depuis un moment. Personne ne l'a vu. Toi si.",
          "p": 0,
          "o": [
            {
              "t": "Je le laisse, il est peut-être très bien tout seul",
              "w": {
                "DON": -0.5
              },
              "e": 1
            },
            {
              "t": "Je lui souris, je lui dis un mot en passant",
              "w": {
                "DON": 0.3
              },
              "e": 2
            },
            {
              "t": "Je vais m'asseoir avec lui, un moment",
              "w": {
                "DON": 0.6
              },
              "e": 3
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "Et ça dure",
          "s": "Tu es resté avec lui. Sauf qu'il ne repart pas, il s'accroche, et ta soirée file, tes amis sont ailleurs, ça t'échappe.",
          "p": -0.2,
          "o": [
            {
              "t": "Je retourne vers mes amis, j'ai fait ma part",
              "w": {
                "DON": -0.4
              },
              "e": 1
            },
            {
              "t": "Je m'éclipse en douceur, sans le blesser",
              "w": {
                "DON": -0.2
              },
              "e": 2
            },
            {
              "t": "Je reste encore un peu, puis je file",
              "w": {
                "DON": 0.3
              },
              "e": 3
            },
            {
              "t": "La soirée attendra, je reste tant qu'il en a besoin",
              "w": {
                "DON": 0.6
              },
              "e": 4
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "On te tend une porte de sortie",
          "s": "Il est tard. Quelqu'un propose de rentrer et te lance : « Tu veux qu'on parte ensemble ? » Tu n'es pas obligé. La soirée continue sans toi si tu restes.",
          "p": null,
          "o": [
            {
              "t": "Oui, je saisis, j'ai fait mon temps",
              "w": {
                "PRESENCE": -0.4
              },
              "e": 1
            },
            {
              "t": "Je reste encore un peu, on verra",
              "w": {
                "PRESENCE": 0.2
              },
              "e": 2
            },
            {
              "t": "Je reste, franchement je suis bien là, je ne compte pas les heures",
              "w": {
                "PRESENCE": 0.5
              },
              "e": 4
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "Le lendemain",
          "s": "Le lendemain, quelqu'un te demande comment c'était. Qu'est-ce que tu racontes en premier ?",
          "p": null,
          "o": [
            {
              "t": "Rien de spécial, c'était sympa",
              "w": {
                "DON": -0.2,
                "PRESENCE": -0.2
              },
              "e": null
            },
            {
              "t": "Les gens que j'ai rencontrés",
              "w": {
                "DON": 0.3
              },
              "e": null
            },
            {
              "t": "Un moment précis qui m'a fait rire",
              "w": {
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Un truc que j'ai découvert là-bas",
              "w": {
                "DETTE": 0.4
              },
              "e": null
            }
          ]
        }
      ]
    },
    {
      "key": "train",
      "title": "Le train",
      "intro": "Ton train s'arrête en pleine voie. Au bout de vingt minutes, une annonce grésille : incident sur la ligne, arrêt prolongé, durée inconnue. Autour de toi, un wagon d'inconnus qui, comme toi, ne comptaient pas passer la soirée ensemble.",
      "items": [
        {
          "k": "q",
          "n": 1,
          "t": "Le premier quart d'heure",
          "s": "Les gens relèvent la tête, se jettent des regards. Personne ne se parle encore. Ce moment un peu suspendu où le wagon hésite entre l'agacement chacun-dans-son-coin et le début d'un truc commun.",
          "p": null,
          "o": [
            {
              "t": "Je reste dans ma bulle, écouteurs, ça ne me regarde pas",
              "w": {
                "PARI": 0.4,
                "DON": -0.3
              },
              "e": null
            },
            {
              "t": "J'échange un regard, un demi-sourire avec mon voisin",
              "w": {
                "PARI": -0.2,
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "Je lance à la cantonade « bon, ben on est bien là… »",
              "w": {
                "PARI": -0.3,
                "PRESENCE": 0.3
              },
              "e": null
            },
            {
              "t": "J'attends de voir si quelqu'un d'autre brise la glace",
              "w": {
                "PARI": 0.4,
                "PRESENCE": -0.2
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "L'annonce qui se corse",
          "s": "Nouvelle annonce : ce sera long, très long. Un léger soupir collectif. Ton voisin d'en face pose son sac, résigné, et te regarde comme pour dire « bon ».",
          "p": null,
          "o": [
            {
              "t": "« Ça arrive, on va faire avec », je m'installe pour patienter",
              "w": {
                "DETTE": -0.2,
                "PARI": -0.3
              },
              "e": null
            },
            {
              "t": "Je sors un truc de mon sac : bouquin, musique, mon rituel d'attente",
              "w": {
                "DETTE": -0.6
              },
              "e": null
            },
            {
              "t": "« Vous savez si on peut descendre ? Y a moyen de faire autrement ? »",
              "w": {
                "DETTE": 0.4,
                "PARI": 0.2
              },
              "e": null
            },
            {
              "t": "Je commence à imaginer un plan B avec ceux d'à côté",
              "w": {
                "DETTE": 0.5,
                "DON": 0.2
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "Quelqu'un ne va pas bien",
          "s": "Deux rangs plus loin, quelqu'un s'agite : il va rater quelque chose d'important à l'arrivée. Il cherche de l'aide du regard.",
          "p": 0.5,
          "o": [
            {
              "t": "Je me lève et je vais m'en occuper",
              "w": {
                "DON": 0.6
              },
              "e": null
            },
            {
              "t": "J'aide depuis ma place, sans bouger, un mot, un tuyau, mon chargeur",
              "w": {
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "Je regarde si quelqu'un de mieux placé réagit",
              "w": {
                "DON": -0.2,
                "PRESENCE": -0.2
              },
              "e": null
            },
            {
              "t": "Je le laisse gérer, ce n'est pas à moi de m'en mêler",
              "w": {
                "DON": -0.6
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 4,
          "t": "L'organisation du wagon",
          "s": "L'attente s'installe pour de bon. Le wagon commence à s'auto-organiser, qui a de l'eau, qui a du réseau, qui a des nouvelles.",
          "p": null,
          "o": [
            {
              "t": "Je participe si on me sollicite, sans plus",
              "w": {
                "PRESENCE": -0.3
              },
              "e": null
            },
            {
              "t": "Je deviens un peu le point de ralliement, les gens se tournent vers moi",
              "w": {
                "PRESENCE": 0.6
              },
              "e": null
            },
            {
              "t": "Je balance une vanne qui détend tout le monde",
              "w": {
                "PRESENCE": 0.4,
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Je reste en retrait, j'observe le petit théâtre",
              "w": {
                "PRESENCE": -0.5
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 5,
          "t": "Ça déborde",
          "s": "La personne de tout à l'heure revient vers toi, ce que tu lui avais donné n'a pas suffi, elle en redemande. Sauf que maintenant tu es fatigué toi aussi, et ça empiète pour de bon sur ta soirée.",
          "p": 0.2,
          "o": [
            {
              "t": "Je me retire doucement, j'ai fait ma part",
              "w": {
                "DON": -0.5
              },
              "e": 1
            },
            {
              "t": "Je reste, mais je pose une limite",
              "w": {
                "DON": 0.3
              },
              "e": 3
            },
            {
              "t": "Je continue tant qu'elle en a besoin",
              "w": {
                "DON": 0.7
              },
              "e": 4
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "Le wagon se divise",
          "s": "Un groupe décide de descendre sur la voie et de marcher jusqu'à la prochaine gare, dans le noir. Un autre veut attendre les secours, au chaud. Il faut choisir, et ni l'un ni l'autre n'est sûr.",
          "p": null,
          "o": [
            {
              "t": "J'attends, c'est plus raisonnable, on ne sait pas ce qu'il y a dehors",
              "w": {
                "PARI": 0.4
              },
              "e": 3
            },
            {
              "t": "Je suis le groupe qui me met le plus à l'aise",
              "w": {
                "PARI": 0.2,
                "DON": 0.1
              },
              "e": 2
            },
            {
              "t": "Je pars avec ceux qui bougent, l'inconnu ne me fait pas peur",
              "w": {
                "PARI": -0.4
              },
              "e": 4
            },
            {
              "t": "Je pèse le pour et le contre, je demande des détails avant de trancher",
              "w": {
                "PARI": 0.5
              },
              "e": 3
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "Le silence de la fatigue",
          "s": "Plus tard encore. Les conversations sont retombées. Ton voisin, avec qui tu as un peu parlé, somnole contre la vitre. Un vrai creux, long, sans rien à faire.",
          "p": null,
          "o": [
            {
              "t": "Je savoure ce calme suspendu, c'est presque agréable",
              "w": {
                "DETTE": -0.2,
                "PARI": -0.4
              },
              "e": 2
            },
            {
              "t": "Je reprends mon rituel, ce qui m'occupe d'habitude",
              "w": {
                "DETTE": -0.5
              },
              "e": 2
            },
            {
              "t": "Je relance doucement la conversation avec quelqu'un d'éveillé",
              "w": {
                "DETTE": 0.3,
                "PRESENCE": 0.3
              },
              "e": 3
            },
            {
              "t": "Je pense déjà à après, à comment je vais rentrer",
              "w": {
                "PARI": 0.3
              },
              "e": 2
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "La descente",
          "s": "Le train finit par repartir, ou les secours arrivent. En descendant, bien plus tard que prévu, qu'est-ce qui te reste de ces heures-là ?",
          "p": null,
          "o": [
            {
              "t": "Rien de spécial, un contretemps, c'est oublié",
              "w": {
                "DON": -0.2
              },
              "e": null
            },
            {
              "t": "Les têtes croisées, ces gens que je ne reverrai jamais",
              "w": {
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "Un moment absurde qui m'a fait rire tout seul",
              "w": {
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Une conversation qui m'a marqué, contre toute attente",
              "w": {
                "DON": 0.2,
                "DETTE": 0.2
              },
              "e": null
            }
          ]
        }
      ]
    },
    {
      "key": "partie",
      "title": "La partie",
      "intro": "Une attente quelque part, un hall, une salle avant que ça commence, peu importe. Quelqu'un sort un jeu, de ceux qui s'expliquent en deux minutes. « Allez, on a le temps, qui joue ? » Autour de la table, des gens que tu ne connais pas.",
      "items": [
        {
          "k": "q",
          "n": 1,
          "t": "Avant de commencer",
          "s": "On explique vite fait. Deux ou trois points restent flous, on pourrait commencer quand même.",
          "p": null,
          "o": [
            {
              "t": "On clarifie tout d'abord, je veux qu'on parte sur des règles nettes",
              "w": {
                "PARI": 0.5
              },
              "e": null
            },
            {
              "t": "On lance, on ajustera en jouant",
              "w": {
                "PARI": -0.4
              },
              "e": null
            },
            {
              "t": "« Comme vous voulez », je suis ce que le groupe décide",
              "w": {
                "PARI": -0.1,
                "PRESENCE": -0.3
              },
              "e": null
            },
            {
              "t": "Je propose ma version, je connais un peu ce jeu",
              "w": {
                "PARI": 0.3,
                "PRESENCE": 0.3
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "Le tour de chauffe",
          "s": "Premiers tours. Tu sens comment le jeu marche.",
          "p": null,
          "o": [
            {
              "t": "Je joue prudent, des coups sûrs, le temps de piger",
              "w": {
                "DETTE": -0.5
              },
              "e": null
            },
            {
              "t": "Je tente un truc audacieux tout de suite, pour voir",
              "w": {
                "DETTE": 0.6
              },
              "e": null
            },
            {
              "t": "Je refais ce qui a marché pour les autres au tour d'avant",
              "w": {
                "DETTE": -0.4
              },
              "e": null
            },
            {
              "t": "Je joue à l'instinct, sans trop réfléchir",
              "w": {
                "DETTE": 0.2,
                "PARI": -0.3
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "Quelqu'un est largué",
          "s": "Un joueur n'a rien compris et prend cher. Il rigole jaune. C'est ton tour, et tu es en position de lui mettre le coup fatal, ou pas.",
          "p": 0,
          "o": [
            {
              "t": "Je joue mon meilleur coup, le jeu c'est le jeu, il apprendra",
              "w": {
                "DON": -0.5,
                "PARI": 0.4
              },
              "e": null
            },
            {
              "t": "Je propose qu'on assouplisse une règle pour qu'il reste dans le coup",
              "w": {
                "DON": 0.6,
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Je le laisse s'en tirer sans le dire, je joue un coup mou exprès",
              "w": {
                "DON": 0.3,
                "PARI": -0.5
              },
              "e": null
            },
            {
              "t": "Je le laisse jouer sa partie, chacun la sienne",
              "w": {
                "DON": -0.4
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 4,
          "t": "L'ambiance de table",
          "s": "Le jeu prend, ça chambre, ça rigole.",
          "p": null,
          "o": [
            {
              "t": "Je joue, je parle peu, concentré",
              "w": {
                "PRESENCE": -0.4
              },
              "e": null
            },
            {
              "t": "Je mène l'ambiance, je commente, je chambre",
              "w": {
                "PRESENCE": 0.6
              },
              "e": null
            },
            {
              "t": "Je lance une private joke, un running gag",
              "w": {
                "PRESENCE": 0.4,
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "Je regarde surtout, je place un mot de temps en temps",
              "w": {
                "PRESENCE": -0.5
              },
              "e": null
            }
          ]
        },
        {
          "k": "q",
          "n": 5,
          "t": "La règle qui gêne",
          "s": "Un litige : une règle est ambiguë, et l'interpréter dans un sens t'avantage nettement. Personne autour de la table n'est sûr.",
          "p": null,
          "o": [
            {
              "t": "Je tranche pour la version qui m'arrange, c'est défendable",
              "w": {
                "PARI": 0.5,
                "DON": -0.2
              },
              "e": 2
            },
            {
              "t": "Je propose qu'on tranche dans le sens le moins avantageux pour moi",
              "w": {
                "PARI": -0.1,
                "DON": 0.5
              },
              "e": 4
            },
            {
              "t": "Je laisse le groupe décider et je m'y tiens",
              "w": {
                "PARI": 0.1,
                "PRESENCE": -0.2
              },
              "e": 3
            },
            {
              "t": "Je propose de rejouer le coup, on verra plus tard pour la règle",
              "w": {
                "PARI": -0.2
              },
              "e": 3
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "La victoire à portée",
          "s": "Tu peux gagner ce tour-ci. Mais le même coup achève définitivement le joueur déjà à la traîne, qui commençait juste à s'amuser.",
          "p": 0,
          "o": [
            {
              "t": "Je gagne, c'est le but du jeu",
              "w": {
                "DON": -0.5,
                "PARI": 0.3
              },
              "e": 1
            },
            {
              "t": "Je gagne, mais je propose une revanche dans la foulée",
              "w": {
                "DON": 0.2
              },
              "e": 3
            },
            {
              "t": "Je joue un autre coup, moins fort, pour que la partie continue",
              "w": {
                "DON": 0.5
              },
              "e": 4
            },
            {
              "t": "Je fais durer sans le montrer, pour que personne ne soit lâché",
              "w": {
                "DON": 0.4,
                "PARI": -0.4
              },
              "e": 4
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "La partie s'étire",
          "s": "Ça pourrait s'arrêter là, ou repartir pour une manche. L'énergie retombe un peu.",
          "p": null,
          "o": [
            {
              "t": "Bien joué tout le monde, c'était chouette, on en reste là",
              "w": {
                "DETTE": -0.2,
                "PARI": -0.2
              },
              "e": 2
            },
            {
              "t": "Allez, une revanche, on remet ça",
              "w": {
                "DETTE": -0.3
              },
              "e": 2
            },
            {
              "t": "On change de jeu, celui-là on l'a fait",
              "w": {
                "DETTE": 0.5
              },
              "e": 3
            },
            {
              "t": "Je laisse les autres décider si on continue",
              "w": {
                "PRESENCE": -0.3
              },
              "e": 2
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "En repartant",
          "s": "Le jeu se range. Chacun repart de son côté. Ce qui te reste :",
          "p": null,
          "o": [
            {
              "t": "Un bon moment pour passer le temps",
              "w": {
                "DON": -0.2
              },
              "e": null
            },
            {
              "t": "Les gens, l'un était marrant",
              "w": {
                "DON": 0.2
              },
              "e": null
            },
            {
              "t": "Un fou rire",
              "w": {
                "PARI": -0.2
              },
              "e": null
            },
            {
              "t": "L'envie d'y rejouer",
              "w": {
                "DETTE": 0.4
              },
              "e": null
            }
          ]
        }
      ]
    }
  ],
  "nous": [
    {
      "key": "apero",
      "title": "L'apéro de la bande",
      "intro": "Le rituel du vendredi, chez l'un de vous. La bande au complet. On se connaît par cœur.",
      "items": [
        {
          "k": "tree",
          "n": 1,
          "t": "En arrivant",
          "s": "Tu pousses la porte. Deux sont déjà là, vautrés, une bouteille entamée. Trois autres s'activent dans la cuisine, on entend que ça chambre. Tu lâches ton manteau et…",
          "p": null,
          "o": [
            {
              "t": "Je rejoins les deux qui glandent, c'est très bien là",
              "w": {
                "DON": -0.3,
                "PARI": -0.3
              }
            },
            {
              "t": "Je file en cuisine avec ceux qui s'agitent",
              "w": {
                "DON": 0.4,
                "PRESENCE": 0.2
              }
            },
            {
              "t": "Je fais le tour, je dis bonjour à tout le monde d'abord",
              "w": {
                "PRESENCE": 0.3,
                "DON": 0.2
              }
            },
            {
              "t": "Je me sers un truc tranquille et j'observe l'ambiance du soir",
              "w": {
                "PRESENCE": -0.3,
                "PARI": 0.2
              }
            }
          ],
          "br": [
            {
              "s": "Ils sont lancés dans un débat débile mais marrant, et t'embarquent direct pour trancher. « Vas-y, toi, t'en penses quoi ? »",
              "o": [
                {
                  "t": "Je tranche franchement, je rentre dans le jeu",
                  "w": {
                    "PRESENCE": 0.4
                  }
                },
                {
                  "t": "Je botte en touche en rigolant",
                  "w": {
                    "PRESENCE": -0.2,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Je prends le parti du plus seul des deux",
                  "w": {
                    "DON": 0.4
                  }
                },
                {
                  "t": "Je relance avec un truc encore plus absurde",
                  "w": {
                    "DETTE": 0.4,
                    "PRESENCE": 0.3
                  }
                }
              ]
            },
            {
              "s": "En cuisine, c'est le bazar, personne ne coordonne rien, ça se marche dessus. Tu…",
              "o": [
                {
                  "t": "Prends la main, je distribue qui fait quoi",
                  "w": {
                    "PRESENCE": 0.5,
                    "PARI": 0.4
                  }
                },
                {
                  "t": "M'occupe d'un truc précis dans mon coin",
                  "w": {
                    "DON": 0.4,
                    "PRESENCE": -0.2
                  }
                },
                {
                  "t": "Mets de la musique et je fais que ça reste léger",
                  "w": {
                    "PRESENCE": 0.3,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Laisse le bazar, ça fait partie du charme",
                  "w": {
                    "PARI": -0.4,
                    "DON": -0.2
                  }
                }
              ]
            },
            {
              "s": "En faisant le tour, tu sens que l'un de la bande est bizarre, pas dans son assiette. Les autres n'ont pas capté. Tu…",
              "o": [
                {
                  "t": "M'attarde un peu avec lui, l'air de rien",
                  "w": {
                    "DON": 0.5
                  }
                },
                {
                  "t": "Je lui lance juste un « ça va, toi ? » et je continue",
                  "w": {
                    "DON": 0.2
                  }
                },
                {
                  "t": "Me dis qu'il parlera s'il en a besoin",
                  "w": {
                    "DON": -0.4
                  }
                },
                {
                  "t": "Vais discrètement prévenir un autre proche de lui",
                  "w": {
                    "DON": 0.3,
                    "PARI": 0.3
                  }
                }
              ]
            },
            {
              "s": "En observant, tu réalises que la soirée part exactement comme toutes les autres, mêmes gens, mêmes places, même déroulé. Ça te…",
              "o": [
                {
                  "t": "Rassure, c'est confortable, j'aime ça",
                  "w": {
                    "DETTE": -0.4,
                    "CONF": -0.6
                  }
                },
                {
                  "t": "Donne envie de secouer un peu le truc",
                  "w": {
                    "DETTE": 0.5,
                    "CONF": 0.6
                  }
                },
                {
                  "t": "Est égal, je prends ce qui vient",
                  "w": {
                    "PARI": -0.3
                  }
                },
                {
                  "t": "Fait me demander si je ne tourne pas en rond, moi aussi",
                  "w": {
                    "CONF": 0.4,
                    "DETTE": 0.2
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "La énième fois qu'on raconte ça",
          "s": "Quelqu'un ressort LA blague que toute la bande connaît par cœur.",
          "p": null,
          "o": [
            {
              "t": "Je ris, c'est notre truc",
              "w": {
                "DETTE": -0.5,
                "CONF": -0.6
              }
            },
            {
              "t": "J'en rajoute une couche",
              "w": {
                "DETTE": -0.3,
                "PRESENCE": 0.3
              }
            },
            {
              "t": "« Encore ? » mais je souris",
              "w": {
                "DETTE": 0.2
              }
            },
            {
              "t": "J'ai envie de neuf, je lance autre chose",
              "w": {
                "DETTE": 0.6,
                "CONF": 0.4
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "On se sert à manger",
          "s": "Les trucs à grignoter arrivent, tout le monde se jette dessus.",
          "p": 0,
          "o": [
            {
              "t": "Je me sers après les autres",
              "w": {
                "DON": 0.4
              }
            },
            {
              "t": "Je me sers normalement, comme tout le monde",
              "w": {
                "DON": 0
              }
            },
            {
              "t": "Je garde la bonne part pour celui qui n'a pas encore pris",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "Je prends ce que j'aime avant que ça parte",
              "w": {
                "DON": -0.6
              }
            }
          ]
        },
        {
          "k": "tree",
          "n": 4,
          "t": "On décide de la suite",
          "s": "« On fait quoi ? On bouge, on commande, on reste ? » Quatre idées fusent en même temps. Toi, tu…",
          "p": null,
          "o": [
            {
              "t": "Me range derrière celui qu'on suit toujours dans la bande",
              "w": {
                "CONF": -0.5,
                "PARI": -0.2
              }
            },
            {
              "t": "Défends la mienne, même si c'est pas gagné",
              "w": {
                "PRESENCE": 0.4,
                "CONF": 0.2
              }
            },
            {
              "t": "Prends l'idée qui m'arrange, peu importe qui l'a dite",
              "w": {
                "PARI": 0.2,
                "CONF": 0.3
              }
            },
            {
              "t": "Attends que ça se décante tout seul",
              "w": {
                "PARI": 0.3,
                "PRESENCE": -0.3
              }
            }
          ],
          "br": [
            {
              "s": "Son idée finit par tomber à l'eau, personne n'est chaud. Un blanc. Tu…",
              "o": [
                {
                  "t": "Propose autre chose pour relancer",
                  "w": {
                    "PARI": 0.4,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "Attends encore, quelqu'un va bien trouver",
                  "w": {
                    "PARI": 0.2,
                    "PRESENCE": -0.2
                  }
                },
                {
                  "t": "Reprends l'idée en la modifiant un peu",
                  "w": {
                    "DETTE": 0.3,
                    "PARI": 0.3
                  }
                },
                {
                  "t": "Dis qu'on n'a qu'à rester là, finalement",
                  "w": {
                    "DETTE": -0.3,
                    "PARI": -0.3
                  }
                }
              ]
            },
            {
              "s": "Ton idée ne prend pas. Le groupe part sur autre chose. Tu…",
              "o": [
                {
                  "t": "Suis le mouvement de bon cœur",
                  "w": {
                    "DON": 0.3,
                    "CONF": -0.2
                  }
                },
                {
                  "t": "Suis, mais un peu à reculons",
                  "w": {
                    "CONF": -0.1
                  }
                },
                {
                  "t": "Tente une dernière fois de les convaincre",
                  "w": {
                    "PRESENCE": 0.4,
                    "CONF": 0.3
                  }
                },
                {
                  "t": "Fais mon truc dans mon coin, tant pis",
                  "w": {
                    "CONF": 0.4,
                    "PRESENCE": -0.2
                  }
                }
              ]
            },
            {
              "s": "Ça se fait, et c'est un peu grâce à toi que ça a basculé. Quelqu'un te charrie « tiens, ça t'arrangeait bien, toi ». Tu…",
              "o": [
                {
                  "t": "En ris, c'est vrai et alors",
                  "w": {
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "M'en défends un peu, gêné",
                  "w": {
                    "CONF": -0.3
                  }
                },
                {
                  "t": "Rebondis en mettant tout le monde d'accord",
                  "w": {
                    "DON": 0.4,
                    "PARI": 0.3
                  }
                },
                {
                  "t": "Hausse les épaules, l'essentiel c'est qu'on fasse un truc",
                  "w": {
                    "PARI": 0.2
                  }
                }
              ]
            },
            {
              "s": "Pendant que tu attends, deux commencent à s'agacer que personne ne tranche. La tension monte un peu. Tu…",
              "o": [
                {
                  "t": "Finis par trancher pour tout le monde",
                  "w": {
                    "PARI": 0.5,
                    "PRESENCE": 0.4
                  }
                },
                {
                  "t": "Détends en blaguant sur l'indécision générale",
                  "w": {
                    "PRESENCE": 0.3,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Reste en retrait, ça va se régler",
                  "w": {
                    "PARI": -0.2,
                    "PRESENCE": -0.3
                  }
                },
                {
                  "t": "Prends à part le plus agacé pour le calmer",
                  "w": {
                    "DON": 0.4
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 5,
          "t": "La porte de sortie",
          "s": "Il est tard. Deux trois partent. Tu pourrais suivre ou rester avec le noyau dur.",
          "p": 0,
          "o": [
            {
              "t": "Je pars avec les premiers",
              "w": {
                "PRESENCE": -0.6
              }
            },
            {
              "t": "Je reste encore un peu",
              "w": {
                "PRESENCE": 0.2
              }
            },
            {
              "t": "Je reste jusqu'au bout, c'est souvent là le meilleur",
              "w": {
                "PRESENCE": 0.5
              }
            },
            {
              "t": "Je pars, mais je raccompagne celui qui habite loin",
              "w": {
                "DON": 0.4
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "La vieille rengaine de fin",
          "s": "Le rituel de clôture, celui que vous faites toujours.",
          "p": null,
          "o": [
            {
              "t": "Parfait, on continue",
              "w": {
                "DETTE": -0.5,
                "CONF": -0.3
              }
            },
            {
              "t": "Je relance encore autre chose",
              "w": {
                "DETTE": -0.1,
                "PRESENCE": 0.3
              }
            },
            {
              "t": "J'ai envie de clore sur une bonne note",
              "w": {
                "DETTE": 0.2,
                "PARI": 0.2
              }
            },
            {
              "t": "Je propose un truc qu'on n'a jamais fait",
              "w": {
                "DETTE": 0.6,
                "CONF": 0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "Un dernier verre proposé",
          "s": "Celui qui reçoit propose « allez, le dernier pour la route ». Tu es fatigué.",
          "p": null,
          "o": [
            {
              "t": "J'accepte, on ne se refait pas",
              "w": {
                "DON": 0.2,
                "DETTE": -0.2
              }
            },
            {
              "t": "Je décline gentiment, j'ai ma dose",
              "w": {
                "DON": -0.4
              }
            },
            {
              "t": "J'accepte pour lui faire plaisir",
              "w": {
                "DON": 0.4
              }
            },
            {
              "t": "Je propose plutôt de l'aider à ranger",
              "w": {
                "DON": 0.5,
                "PRESENCE": 0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "Le lendemain",
          "s": "Un message de la bande. Tu réponds en premier…",
          "p": null,
          "o": [
            {
              "t": "« C'était cool » et basta",
              "w": {
                "DON": -0.4,
                "PRESENCE": -0.2
              }
            },
            {
              "t": "Un mot sur un moment précis",
              "w": {
                "DON": 0.2
              }
            },
            {
              "t": "Je relance sur le prochain coup",
              "w": {
                "PARI": 0.2
              }
            },
            {
              "t": "Je prends des nouvelles de celui qui n'allait pas",
              "w": {
                "DON": 0.4
              }
            }
          ]
        }
      ]
    },
    {
      "key": "weekend",
      "title": "Le week-end à plusieurs",
      "intro": "Une maison louée pour quelques jours. La bande, des couples, des pièces rapportées. Vivre ensemble use autrement qu'une soirée.",
      "items": [
        {
          "k": "tree",
          "n": 1,
          "t": "L'arrivée",
          "s": "On débarque, on pose les sacs, et tout de suite on sent les affinités habituelles reprendre : les fonceurs filent repérer les lieux, les couples s'isolent, deux traînent déjà dans le canapé. Toi, tu…",
          "p": null,
          "o": [
            {
              "t": "Suis mon petit noyau habituel sans y penser",
              "w": {
                "CONF": -0.6
              }
            },
            {
              "t": "Vais vers ceux que je connais le moins ici",
              "w": {
                "CONF": 0.6,
                "DON": 0.2
              }
            },
            {
              "t": "M'occupe de l'intendance, les sacs, les chambres",
              "w": {
                "DON": 0.4,
                "PRESENCE": 0.2
              }
            },
            {
              "t": "Prends un moment seul pour atterrir",
              "w": {
                "PRESENCE": -0.4,
                "PARI": 0.2
              }
            }
          ],
          "br": [
            {
              "s": "Vous voilà déjà entre vous, comme toujours. Quelqu'un d'un autre cercle tente de se greffer, un peu timide. Tu…",
              "o": [
                {
                  "t": "Lui fais de la place direct",
                  "w": {
                    "DON": 0.5,
                    "CONF": 0.2
                  }
                },
                {
                  "t": "Le laisse s'installer sans forcer",
                  "w": {
                    "DON": 0.2
                  }
                },
                {
                  "t": "Continue entre nous, il trouvera sa place",
                  "w": {
                    "DON": -0.3,
                    "CONF": -0.3
                  }
                },
                {
                  "t": "Fais le lien en le présentant à chacun",
                  "w": {
                    "DON": 0.4,
                    "PRESENCE": 0.3
                  }
                }
              ]
            },
            {
              "s": "Ton petit noyau habituel te lance « bah alors, tu nous abandonnes ? », moitié vanne moitié vrai. Tu…",
              "o": [
                {
                  "t": "Reviens vers eux, c'était juste un passage",
                  "w": {
                    "CONF": -0.6
                  }
                },
                {
                  "t": "Leur dis de venir, on mélange tout le monde",
                  "w": {
                    "DON": 0.4,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "Continue, je les vois tout le temps, eux",
                  "w": {
                    "CONF": 0.6
                  }
                },
                {
                  "t": "En ris et je navigue entre les deux toute la soirée",
                  "w": {
                    "CONF": 0.4,
                    "PRESENCE": 0.2
                  }
                }
              ]
            },
            {
              "s": "Tu te retrouves à tout gérer pendant que les autres posent leurs affaires tranquilles. Tu…",
              "o": [
                {
                  "t": "Continue, ça ne me dérange pas, j'aime que ce soit carré",
                  "w": {
                    "DON": 0.5,
                    "PARI": 0.3
                  }
                },
                {
                  "t": "Délègue, je répartis les tâches",
                  "w": {
                    "PARI": 0.5,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "Lâche l'os, on verra bien",
                  "w": {
                    "DON": -0.3,
                    "PARI": -0.3
                  }
                },
                {
                  "t": "Le fais mais je le signale, pour que ça tourne",
                  "w": {
                    "DON": 0.3,
                    "PARI": 0.3
                  }
                }
              ]
            },
            {
              "s": "Au bout de dix minutes, quelqu'un vient te chercher « tu fais quoi tout seul, viens ! ». Tu…",
              "o": [
                {
                  "t": "Le suis, c'était juste une pause",
                  "w": {
                    "CONF": -0.2,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Lui dis que j'arrive, à mon rythme",
                  "w": {
                    "PARI": 0.2,
                    "CONF": 0.2
                  }
                },
                {
                  "t": "Reste encore un peu, j'en avais besoin",
                  "w": {
                    "CONF": 0.4,
                    "PRESENCE": -0.3
                  }
                },
                {
                  "t": "L'embarque pour un moment à deux, au calme",
                  "w": {
                    "DON": 0.4
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "Le premier repas",
          "s": "Faut nourrir tout le monde, personne n'a encore pris les choses en main.",
          "p": null,
          "o": [
            {
              "t": "J'attends qu'une organisation se mette en place",
              "w": {
                "PRESENCE": -0.6
              }
            },
            {
              "t": "Je me propose pour cuisiner",
              "w": {
                "DON": 0.4
              }
            },
            {
              "t": "Je prends la main sur l'organisation",
              "w": {
                "PRESENCE": 0.6,
                "PARI": 0.3
              }
            },
            {
              "t": "Je fais les courses pendant que d'autres cuisinent",
              "w": {
                "DON": 0.4,
                "PARI": 0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "La corvée que personne ne veut",
          "s": "Vaisselle de la veille, poubelles. Un silence.",
          "p": 0.2,
          "o": [
            {
              "t": "Je laisse couler, quelqu'un s'y collera",
              "w": {
                "DON": -0.6
              }
            },
            {
              "t": "Je la fais sans rien dire",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "Je la fais en proposant un roulement",
              "w": {
                "DON": 0.4,
                "PARI": 0.4
              }
            },
            {
              "t": "J'attends, et si personne ne bouge j'y vais",
              "w": {
                "DON": 0.1
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 4,
          "t": "Le programme de la journée",
          "s": "Les envies divergent : rando, glande, visite.",
          "p": null,
          "o": [
            {
              "t": "Je m'adapte à ce qui se décide",
              "w": {
                "PARI": -0.6
              }
            },
            {
              "t": "Je pousse pour mon idée",
              "w": {
                "PARI": 0.3,
                "PRESENCE": 0.3
              }
            },
            {
              "t": "Je propose un planning qui concilie",
              "w": {
                "PARI": 0.5,
                "DON": 0.2
              }
            },
            {
              "t": "J'attends que le groupe tranche",
              "w": {
                "PARI": 0.1,
                "PRESENCE": -0.3
              }
            }
          ]
        },
        {
          "k": "tree",
          "n": 5,
          "t": "Toujours les mêmes qui font tout",
          "s": "Deuxième jour. Tu remarques que ce sont deux-trois mêmes qui portent toute l'intendance, et d'autres qui ne lèvent pas le petit doigt. Toi, dans ces jours-là, tu es plutôt…",
          "p": 0.2,
          "o": [
            {
              "t": "De ceux qui font, et ça me va",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "De ceux qui laissent faire, sans mauvaise intention",
              "w": {
                "DON": -0.4
              }
            },
            {
              "t": "Au milieu, selon l'énergie du moment",
              "w": {
                "DON": 0.1
              }
            },
            {
              "t": "Pas du genre à compter qui fait quoi",
              "w": {
                "DON": -0.1,
                "PARI": -0.3
              }
            }
          ],
          "br": [
            {
              "s": "Ça continue de peser sur toi, et la fatigue monte. Tu…",
              "o": [
                {
                  "t": "Continue sans rien dire, ça ne me coûte pas tant",
                  "w": {
                    "DON": 0.5
                  }
                },
                {
                  "t": "Le fais remarquer, gentiment",
                  "w": {
                    "DON": 0.3,
                    "PARI": 0.3
                  }
                },
                {
                  "t": "Mets les choses à plat pour que ça tourne",
                  "w": {
                    "DON": 0.2,
                    "PARI": 0.5
                  }
                },
                {
                  "t": "Lâche d'un coup, je profite comme les autres",
                  "w": {
                    "DON": -0.5
                  }
                }
              ]
            },
            {
              "s": "Quelqu'un soupire, assez fort pour que tu entendes, « c'est toujours les mêmes, hein ». Tu…",
              "o": [
                {
                  "t": "Me sens visé, je m'y mets",
                  "w": {
                    "DON": 0.4,
                    "CONF": -0.2
                  }
                },
                {
                  "t": "Fais comme si de rien, chacun son truc",
                  "w": {
                    "DON": -0.3
                  }
                },
                {
                  "t": "Propose qu'on s'organise pour que ce soit clair",
                  "w": {
                    "PARI": 0.5,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Le prends à la rigolade, je dédramatise",
                  "w": {
                    "PRESENCE": 0.3,
                    "DON": 0.1
                  }
                }
              ]
            },
            {
              "s": "La question d'un roulement est posée par quelqu'un. Chacun donne son avis. Tu…",
              "o": [
                {
                  "t": "Soutiens le roulement, c'est plus juste",
                  "w": {
                    "PARI": 0.4,
                    "DON": 0.3
                  }
                },
                {
                  "t": "Dis que ça va se faire naturellement, pas besoin",
                  "w": {
                    "PARI": -0.3
                  }
                },
                {
                  "t": "Propose une version plus souple",
                  "w": {
                    "PARI": 0.3,
                    "DON": 0.2
                  }
                },
                {
                  "t": "Laisse les autres décider et je m'y tiendrai",
                  "w": {
                    "PARI": 0.1,
                    "CONF": -0.2
                  }
                }
              ]
            },
            {
              "s": "Mais là, l'ambiance commence franchement à se tendre là-dessus. Tu…",
              "o": [
                {
                  "t": "Continue de ne pas entrer là-dedans",
                  "w": {
                    "PARI": -0.4,
                    "CONF": 0.3
                  }
                },
                {
                  "t": "Fais un geste pour apaiser, je m'y mets un peu",
                  "w": {
                    "DON": 0.4
                  }
                },
                {
                  "t": "Dis tout haut qu'on ne va pas se gâcher les vacances pour ça",
                  "w": {
                    "PRESENCE": 0.4,
                    "DON": 0.3
                  }
                },
                {
                  "t": "Prends sur moi et je règle ce qui coince",
                  "w": {
                    "DON": 0.4,
                    "PARI": 0.3
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "Le moment qui tourne en rond",
          "s": "Troisième soir, on refait comme les deux d'avant.",
          "p": null,
          "o": [
            {
              "t": "Parfait, j'aime ces soirées qui se ressemblent",
              "w": {
                "DETTE": -0.5,
                "CONF": -0.6
              }
            },
            {
              "t": "Je relance l'énergie",
              "w": {
                "DETTE": -0.1,
                "PRESENCE": 0.4
              }
            },
            {
              "t": "Je propose un truc différent",
              "w": {
                "DETTE": 0.6,
                "CONF": 0.4
              }
            },
            {
              "t": "Je décroche, je vais lire ou dormir",
              "w": {
                "DETTE": -0.1,
                "PRESENCE": -0.6
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "Le petit conflit",
          "s": "Deux s'accrochent sur un truc bête. L'ambiance se tend.",
          "p": 0,
          "o": [
            {
              "t": "Je laisse passer, ça se tasse",
              "w": {
                "DON": -0.5
              }
            },
            {
              "t": "Je prends sur moi de détendre",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "Je m'en mêle pour crever l'abcès",
              "w": {
                "DON": 0.3,
                "PARI": 0.4
              }
            },
            {
              "t": "Je m'éloigne, pas mon affaire",
              "w": {
                "DON": -0.7,
                "PRESENCE": -0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "Le trajet du retour",
          "s": "On remballe. Ce que tu retiens…",
          "p": null,
          "o": [
            {
              "t": "Reposant, sans plus",
              "w": {
                "DON": -0.4
              }
            },
            {
              "t": "Les moments avec les gens",
              "w": {
                "DON": 0.3
              }
            },
            {
              "t": "Un fou rire précis",
              "w": {
                "PARI": -0.2
              }
            },
            {
              "t": "L'envie de recommencer, ou de souffler",
              "w": {
                "DETTE": 0.2
              }
            }
          ]
        }
      ]
    },
    {
      "key": "demenagement",
      "title": "Le déménagement",
      "intro": "Un pote déménage, tu as dit oui. Samedi, toute la journée, du lourd, de l'ingrat. Quelqu'un qui compte.",
      "items": [
        {
          "k": "tree",
          "n": 1,
          "t": "Le matin",
          "s": "Tu arrives à 9h. Vous êtes moins nombreux que prévu, et il y a du boulot. Un autre pote, en te voyant, te glisse à voix basse : « franchement, ils ont encore rien anticipé, c'est toujours pareil. »",
          "p": null,
          "o": [
            {
              "t": "Je hoche la tête, c'est pas faux",
              "w": {
                "CONF": -0.6,
                "PARI": 0.2
              }
            },
            {
              "t": "Je réponds « allez, on s'y met, ça ira »",
              "w": {
                "DON": 0.4,
                "PARI": -0.2
              }
            },
            {
              "t": "Je prends un carton sans relever",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "Je vais direct voir le pote qui déménage pour m'organiser avec lui",
              "w": {
                "DON": 0.3,
                "PARI": 0.3
              }
            }
          ],
          "br": [
            {
              "s": "Du coup une petite ambiance « c'est mal barré » s'installe entre vous deux. Tu…",
              "o": [
                {
                  "t": "La laisse filer, on bosse quand même",
                  "w": {
                    "DON": 0.3,
                    "CONF": -0.2
                  }
                },
                {
                  "t": "Coupe court, je ne veux pas plomber la journée",
                  "w": {
                    "DON": 0.4,
                    "PARI": 0.3
                  }
                },
                {
                  "t": "Embraye, on râle ensemble en portant",
                  "w": {
                    "CONF": -0.6,
                    "DETTE": -0.3
                  }
                },
                {
                  "t": "Vais voir ailleurs, cette ambiance me saoule",
                  "w": {
                    "PRESENCE": -0.2,
                    "DON": 0.2
                  }
                }
              ]
            },
            {
              "s": "Le pote qui râlait te trouve un peu trop positif. « T'es bien gentil, toi. » Tu…",
              "o": [
                {
                  "t": "Reste comme je suis, ça ne me change pas",
                  "w": {
                    "CONF": 0.4,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "Nuance un peu pour ne pas le braquer",
                  "w": {
                    "CONF": -0.3,
                    "DON": 0.2
                  }
                },
                {
                  "t": "L'embarque dans l'action, ça coupe court",
                  "w": {
                    "DON": 0.4,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "Lui réponds que râler ne portera pas les cartons",
                  "w": {
                    "PRESENCE": 0.4,
                    "PARI": 0.2
                  }
                }
              ]
            },
            {
              "s": "En t'y mettant seul, tu te rends compte que personne n'a vraiment lancé la machine. Tu…",
              "o": [
                {
                  "t": "Continue dans mon coin, l'exemple suffira",
                  "w": {
                    "DON": 0.4,
                    "PRESENCE": -0.2
                  }
                },
                {
                  "t": "Lance un « allez, on y va ? » pour entraîner",
                  "w": {
                    "PRESENCE": 0.4,
                    "DON": 0.3
                  }
                },
                {
                  "t": "Vais chercher les consignes auprès du pote",
                  "w": {
                    "DON": 0.3,
                    "PARI": 0.2
                  }
                },
                {
                  "t": "Attends que ça s'organise tout seul",
                  "w": {
                    "PARI": -0.3,
                    "PRESENCE": -0.2
                  }
                }
              ]
            },
            {
              "s": "Il est débordé, un peu perdu dans ses propres affaires, pas sûr de par où commencer. Tu…",
              "o": [
                {
                  "t": "Prends les commandes pour le soulager",
                  "w": {
                    "PRESENCE": 0.5,
                    "PARI": 0.4
                  }
                },
                {
                  "t": "Le rassure et je suis son rythme à lui",
                  "w": {
                    "DON": 0.5
                  }
                },
                {
                  "t": "Propose un plan simple et je lance les autres",
                  "w": {
                    "PARI": 0.4,
                    "PRESENCE": 0.3
                  }
                },
                {
                  "t": "M'occupe d'une zone pendant qu'il gère le reste",
                  "w": {
                    "DON": 0.4
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 2,
          "t": "Le truc lourd et chiant",
          "s": "L'armoire du fond, qui passe à peine. Tout le monde regarde ailleurs.",
          "p": 0.5,
          "o": [
            {
              "t": "J'attends que d'autres s'y mettent",
              "w": {
                "DON": -0.7
              }
            },
            {
              "t": "Je m'y colle, quelqu'un doit le faire",
              "w": {
                "DON": 0.5
              }
            },
            {
              "t": "Je m'y colle en organisant la manœuvre",
              "w": {
                "DON": 0.4,
                "PRESENCE": 0.3
              }
            },
            {
              "t": "Je propose qu'on s'y mette à plusieurs",
              "w": {
                "DON": 0.3,
                "PARI": 0.3
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 3,
          "t": "La pause déjeuner",
          "s": "Midi, pizzas offertes par le pote. Respiration.",
          "p": null,
          "o": [
            {
              "t": "Je souffle dans mon coin, mérité",
              "w": {
                "PRESENCE": -0.6,
                "DON": -0.4
              }
            },
            {
              "t": "Je m'assure que tous aient à manger",
              "w": {
                "DON": 0.3
              }
            },
            {
              "t": "Je relance l'ambiance, je fais rire",
              "w": {
                "PRESENCE": 0.5
              }
            },
            {
              "t": "Je propose d'organiser l'après-midi",
              "w": {
                "PARI": 0.4,
                "PRESENCE": 0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 4,
          "t": "L'imprévu",
          "s": "Le camion est trop petit, il faut improviser.",
          "p": null,
          "o": [
            {
              "t": "J'attends ce que les autres proposent",
              "w": {
                "PARI": -0.5,
                "PRESENCE": -0.2
              }
            },
            {
              "t": "Je lance la première idée, on teste",
              "w": {
                "PARI": -0.6
              }
            },
            {
              "t": "Je réfléchis à la meilleure option avant",
              "w": {
                "PARI": 0.5
              }
            },
            {
              "t": "Je prends en main et je décide",
              "w": {
                "PARI": 0.4,
                "PRESENCE": 0.4
              }
            }
          ]
        },
        {
          "k": "tree",
          "n": 5,
          "t": "Le moment où tu voulais partir",
          "s": "Tu avais un truc de prévu ce soir. L'heure approche, le déménagement n'est pas fini, le pote est débordé. Et là, deux autres commencent discrètement à ranger leurs affaires pour filer. Tu…",
          "p": 0.5,
          "o": [
            {
              "t": "Saisis l'occasion, je pars avec eux",
              "w": {
                "DON": -0.3,
                "CONF": -0.4
              }
            },
            {
              "t": "Reste, même si les autres s'en vont",
              "w": {
                "DON": 0.6,
                "CONF": 0.6
              }
            },
            {
              "t": "Regarde ce que font les autres avant de décider",
              "w": {
                "CONF": -0.6
              }
            },
            {
              "t": "Propose qu'on finisse vite, tous ensemble, avant de partir",
              "w": {
                "DON": 0.4,
                "PARI": 0.4
              }
            }
          ],
          "br": [
            {
              "s": "En enfilant ta veste, tu croises le regard du pote. Il ne dit rien. Tu…",
              "o": [
                {
                  "t": "Pars quand même, j'avais prévenu",
                  "w": {
                    "DON": -0.2
                  }
                },
                {
                  "t": "Fais demi-tour pour un dernier coup de main",
                  "w": {
                    "DON": 0.6
                  }
                },
                {
                  "t": "Lui promets de repasser plus tard",
                  "w": {
                    "DON": 0.2,
                    "PARI": 0.2
                  }
                },
                {
                  "t": "Reste dix minutes de plus par acquit de conscience",
                  "w": {
                    "DON": 0.3
                  }
                }
              ]
            },
            {
              "s": "Ton truc de ce soir, tu vas le rater pour de bon. Tu…",
              "o": [
                {
                  "t": "L'assume pleinement, les potes d'abord",
                  "w": {
                    "DON": 0.6,
                    "CONF": 0.2
                  }
                },
                {
                  "t": "Le fais mais avec un pincement",
                  "w": {
                    "DON": 0.4
                  }
                },
                {
                  "t": "Préviens que je décale, sans drame",
                  "w": {
                    "DON": 0.4,
                    "PARI": 0.2
                  }
                },
                {
                  "t": "Me surprends à en vouloir un peu à ceux qui sont partis",
                  "w": {
                    "DON": 0.3,
                    "CONF": -0.3
                  }
                }
              ]
            },
            {
              "s": "La moitié reste, la moitié part. Pas de consensus, c'est à toi de choisir seul. Tu…",
              "o": [
                {
                  "t": "Reste, puisque d'autres restent",
                  "w": {
                    "CONF": -0.6,
                    "DON": 0.3
                  }
                },
                {
                  "t": "Pars, puisque d'autres partent",
                  "w": {
                    "CONF": -0.6,
                    "DON": -0.2
                  }
                },
                {
                  "t": "Tranche selon ce qui reste à faire, pas selon eux",
                  "w": {
                    "PARI": 0.5,
                    "DON": 0.3
                  }
                },
                {
                  "t": "Demande au pote ce qui l'aiderait le plus",
                  "w": {
                    "DON": 0.5
                  }
                }
              ]
            },
            {
              "s": "Certains te suivent, d'autres filent quand même. Tu te retrouves avec une petite équipe réduite. Tu…",
              "o": [
                {
                  "t": "Mène la fin du chantier avec ceux qui restent",
                  "w": {
                    "PRESENCE": 0.5,
                    "DON": 0.4
                  }
                },
                {
                  "t": "Mets les bouchées doubles sans un mot",
                  "w": {
                    "DON": 0.5
                  }
                },
                {
                  "t": "Garde l'ambiance légère malgré la fatigue",
                  "w": {
                    "PRESENCE": 0.3,
                    "DON": 0.3
                  }
                },
                {
                  "t": "En veux discrètement à ceux qui sont partis",
                  "w": {
                    "CONF": -0.2,
                    "DON": 0.2
                  }
                }
              ]
            }
          ]
        },
        {
          "k": "q",
          "n": 6,
          "t": "Celui qui n'en fout pas une",
          "s": "Un autre passe la journée sur son téléphone pendant que tu te crèves.",
          "p": null,
          "o": [
            {
              "t": "Je laisse couler, chacun son rythme",
              "w": {
                "PARI": -0.6,
                "DON": -0.1
              }
            },
            {
              "t": "Je continue sans rien dire mais je note",
              "w": {
                "PARI": 0.1,
                "DON": 0.3
              }
            },
            {
              "t": "Je lui mets un petit coup de pression",
              "w": {
                "PARI": 0.4
              }
            },
            {
              "t": "Je recadre franchement",
              "w": {
                "PARI": 0.6
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 7,
          "t": "Presque fini",
          "s": "Le gros est fait. Le pote propose de commander à manger pour ceux qui restent.",
          "p": null,
          "o": [
            {
              "t": "Je rentre, lessivé, j'ai donné",
              "w": {
                "PRESENCE": -0.6,
                "DON": -0.4
              }
            },
            {
              "t": "Je reste un peu par politesse",
              "w": {
                "PRESENCE": 0.1
              }
            },
            {
              "t": "Je reste, c'est le moment sympa",
              "w": {
                "PRESENCE": 0.4
              }
            },
            {
              "t": "Je reste et j'aide à ranger les derniers trucs",
              "w": {
                "DON": 0.5,
                "PRESENCE": 0.2
              }
            }
          ]
        },
        {
          "k": "q",
          "n": 8,
          "t": "Le soir, chez toi",
          "s": "Message de remerciement du pote. Tu ressens d'abord…",
          "p": null,
          "o": [
            {
              "t": "Content que ce soit fini",
              "w": {
                "DON": -0.4
              }
            },
            {
              "t": "Content de lui avoir rendu service",
              "w": {
                "DON": 0.4
              }
            },
            {
              "t": "Fier d'un moment précis",
              "w": {
                "PRESENCE": 0.2
              }
            },
            {
              "t": "Prêt à recommencer, c'est l'amitié",
              "w": {
                "DON": 0.4
              }
            }
          ]
        }
      ]
    }
  ],
  "profiles": {
    "chez_les_autres": {
      "----": {
        "n": 1,
        "sav": "Emmental",
        "fig": "L'Aise",
        "paras": [
          "Tu es arrivé, tu as dit bonjour, tu as trouvé un coin qui te convenait, et tu n'as plus vraiment eu besoin de bouger. Tu n'attends rien de spécial de cette soirée, et c'est précisément pour ça qu'elle se passe bien pour toi. Tu ne cherches ni à briller, ni à aider, ni à provoquer quoi que ce soit. Tu es là, tranquillement, et ta tranquillité ne dérange personne : au contraire, elle fait de la place. On vient souvent s'asseoir à côté de toi sans trop savoir pourquoi, et la raison est simple : à côté de toi, il n'y a rien à prouver. Tu es la preuve vivante qu'on peut traverser une soirée entière sans forcer et en profiter plus que tout le monde."
        ],
        "sline": "L'emmental : le goût que tout le monde connaît, qu'on ne remarque pas, et qui manque dès qu'il n'est pas là.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "tu t'es posé là sans y penser, c'était le premier coin libre. Demain, ailleurs, tu serais peut-être tout autre."
          },
          {
            "l": "Par habitude",
            "x": "c'est ta manière de faire depuis toujours, tu te mets en retrait par pli, sans te poser la question."
          },
          {
            "l": "Par choix",
            "x": "tu as appris que cette tranquillité te va mieux que l'agitation, et tu la préfères en connaissance de cause."
          },
          {
            "l": "Par ancrage",
            "x": "ta paix, c'est une part de toi profonde. On ne t'en déloge pas, et tu n'as aucune envie qu'on essaie."
          }
        ],
        "col": "#FFEB89"
      },
      "---+": {
        "n": 2,
        "sav": "Échalote ciboulette",
        "fig": "La Réserve",
        "paras": [
          "Tu ne prends pas beaucoup de place, et tu y tiens. Mais ne t'y trompe pas : derrière ton calme, il y a de l'exigence. Tu aimes que les choses soient faites correctement, tu repères vite ce qui cloche, et tu n'es pas du genre à te jeter sur n'importe quoi. Tu observes, tu jauges, et quand tu t'engages, c'est que tu as décidé que ça valait le coup. Les autres te prennent parfois pour quelqu'un de distant, alors que tu es simplement quelqu'un qui ne se disperse pas. Ta discrétion n'est pas de la timidité, c'est de la sélection."
        ],
        "sline": "L'échalote ciboulette : discrète en apparence, précise en bouche, elle ne se livre qu'à qui fait attention.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu étais sur la réserve, mais c'était l'humeur du moment plus qu'une manière d'être."
          },
          {
            "l": "Par habitude",
            "x": "tu gardes tes distances par réflexe, c'est devenu ta façon d'aborder les gens."
          },
          {
            "l": "Par choix",
            "x": "tu as décidé que l'exigence valait mieux que la facilité, et tu l'assumes."
          },
          {
            "l": "Par ancrage",
            "x": "cette rigueur tranquille, c'est une colonne vertébrale. Tu ne transigeras pas dessus."
          }
        ],
        "col": "#C7E77D"
      },
      "--+-": {
        "n": 3,
        "sav": "Cèpes",
        "fig": "Le Connaisseur",
        "paras": [
          "Tu ne t'imposes pas, mais tu as un œil, et un vrai. Tu as goûté le truc que personne ne connaissait, repéré la bouteille intéressante, parlé à la personne la plus singulière de la pièce, le tout sans en faire une affaire, juste pour toi. Tu ne collectionnes pas les découvertes pour les raconter : tu les fais parce que le familier t'ennuie un peu et que l'inconnu te nourrit. Tu as cette élégance rare de chercher le nouveau sans avoir besoin qu'on le remarque. Tu repars souvent d'une soirée avec une trouvaille que personne d'autre n'a vue passer."
        ],
        "sline": "Les cèpes : ça ne se trouve pas partout, ça ne crie pas, et ceux qui savent les cherchent.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir la curiosité t'a pris, mais c'était l'occasion, pas une quête."
          },
          {
            "l": "Par habitude",
            "x": "tu vas vers le neuf par pente naturelle, sans y réfléchir."
          },
          {
            "l": "Par choix",
            "x": "tu cultives cette ouverture parce que tu sais qu'elle te fait du bien."
          },
          {
            "l": "Par ancrage",
            "x": "cette faim d'inédit, c'est le moteur de ton rapport au monde, ancien et tenace."
          }
        ],
        "col": "#EC9F3D"
      },
      "--++": {
        "n": 4,
        "sav": "Gouda cumin",
        "fig": "L'Esthète",
        "paras": [
          "Tu vas vers l'inconnu, mais l'inconnu qui a de la tenue, pas n'importe quoi. Tu as des critères, et tu les assumes sans te justifier. Tu sais reconnaître ce qui vaut le détour et distinguer ce qui ne le vaut pas, et tu ne vois pas pourquoi tu t'excuserais d'avoir du goût. Tu n'es pas snob pour autant : tu ne hiérarchises pas les gens, tu hiérarchises les choses, ce qui est très différent. Discret mais exigeant, curieux mais sélectif, tu es de ceux qui élèvent le niveau d'une pièce simplement en y étant."
        ],
        "sline": "Le gouda cumin : familier et surprenant à la fois, pour ceux qui aiment le connu relevé d'une trouvaille.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ton exigence du soir tenait au contexte, elle n'est pas toujours aussi vive."
          },
          {
            "l": "Par habitude",
            "x": "tu tries et tu sélectionnes par automatisme, c'est ta façon d'aborder les choses."
          },
          {
            "l": "Par choix",
            "x": "tu as fait de l'exigence un principe, et tu sais pourquoi."
          },
          {
            "l": "Par ancrage",
            "x": "le goût du beau et du juste, c'est une part de ton identité, non négociable."
          }
        ],
        "col": "#FFAB24"
      },
      "-+--": {
        "n": 5,
        "sav": "Poivre vert",
        "fig": "L'Étincelle",
        "paras": [
          "Tu ne prends pas beaucoup de place en apparence, mais quand tu en prends, ça pique. Tu gardes tes forces, tu observes, et au bon moment tu poses le mot juste, la remarque qui réveille la table. Tu ne cherches pas à durer dans la conversation, seulement à y laisser une trace. On te remarque sans que tu te sois donné du mal, parce que tu as l'art de l'intervention qui compte. Tu es la preuve qu'on n'a pas besoin de parler beaucoup pour marquer les esprits, il suffit de parler bien."
        ],
        "sline": "Le poivre vert : on n'en met qu'un peu, et pourtant c'est lui qu'on retient.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as lancé une pique bien placée, mais c'était l'inspiration du moment."
          },
          {
            "l": "Par habitude",
            "x": "tu places tes mots par réflexe, c'est ta manière naturelle d'exister dans un groupe."
          },
          {
            "l": "Par choix",
            "x": "tu as compris que tu portais plus en disant peu, et tu le cultives."
          },
          {
            "l": "Par ancrage",
            "x": "cette présence tranchante, c'est profondément toi, et tu n'en changerais pour rien."
          }
        ],
        "col": "#9ECE66"
      },
      "-+-+": {
        "n": 6,
        "sav": "Bleu",
        "fig": "Le Clivant",
        "paras": [
          "Tu as un avis, tu l'as donné, et la table s'est réveillée. Tu ne cherches pas à plaire : tu trouves que c'est vrai, et tu tiens ta position même quand elle dérange. Tu prends de la place, mais pas pour faire du bien à tout le monde, pour défendre ce que tu penses. Deux personnes t'ont trouvé formidable, une troisième est allée prendre l'air. Tu as arrêté depuis longtemps d'essayer de faire l'unanimité, et c'est exactement ce qui te rend intéressant. On ne t'oublie pas après t'avoir rencontré, et c'est tout ce qui compte pour toi."
        ],
        "sline": "Le bleu : on l'adore ou on le laisse, il n'a jamais cherché à être aimé de tous, et il s'en porte très bien.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as planté le débat, mais c'était l'ambiance qui s'y prêtait."
          },
          {
            "l": "Par habitude",
            "x": "tu prends position par tempérament, sans calculer."
          },
          {
            "l": "Par choix",
            "x": "tu as décidé qu'il valait mieux être clivant que tiède, et tu l'assumes pleinement."
          },
          {
            "l": "Par ancrage",
            "x": "tenir ta position seul contre tous, c'est une colonne vertébrale. On ne te fera pas plier."
          }
        ],
        "col": "#3A68DF"
      },
      "-++-": {
        "n": 7,
        "sav": "Olive verte",
        "fig": "Le Rapporteur",
        "paras": [
          "Tu observes, tu tries, tu retiens. Tu vas vers le nouveau, mais avec méthode : tu demandes ce que c'est avant de te lancer, tu jauges les gens avant de t'ouvrir. Tu ne t'épanches pas, tu prélèves. De cette soirée tu repartiras avec des choses vues, classées, gardées. Tu prends de la place à ta façon, en étant celui qui sait, celui qui a remarqué ce que les autres ont manqué. Tu aimes l'inédit à condition de pouvoir le comprendre, et cette curiosité maîtrisée fait de toi une mémoire vivante des soirées."
        ],
        "sline": "L'olive verte : franche, un peu à part, elle a du caractère et ne se livre qu'à qui prend le temps.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ta curiosité méthodique du soir tenait à la situation."
          },
          {
            "l": "Par habitude",
            "x": "tu jauges avant de t'ouvrir par réflexe installé."
          },
          {
            "l": "Par choix",
            "x": "tu as fait de la prudence curieuse une méthode, et tu sais pourquoi."
          },
          {
            "l": "Par ancrage",
            "x": "observer avant de donner, c'est une manière d'être qui te définit en profondeur."
          }
        ],
        "col": "#CDEC50"
      },
      "-+++": {
        "n": 8,
        "sav": "Chorizo",
        "fig": "Le Trublion",
        "paras": [
          "Tu aimes secouer, et tu le fais avec un certain art. Tu prends de la place, tu lances des trucs neufs, tu provoques un peu, mais tu maîtrises ton effet, tu sais jusqu'où aller. Tu ne donnes pas dans le soin : tu donnes du piquant, du mouvement, du désordre choisi. Tu tiens à ce que ta provocation ait de l'allure, jamais gratuite ni vulgaire. Sans toi, les soirées seraient plus lisses et franchement plus ennuyeuses. Tu es celui qui empêche le confort de virer à l'endormissement, et c'est un vrai talent."
        ],
        "sline": "Le chorizo : du caractère, du piquant, une présence qui ne passe jamais inaperçue.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu avais envie de secouer, mais ce n'est pas toujours le cas."
          },
          {
            "l": "Par habitude",
            "x": "tu provoques par tempérament, c'est ta pente."
          },
          {
            "l": "Par choix",
            "x": "tu as fait du grain de sel une signature, et tu la cultives."
          },
          {
            "l": "Par ancrage",
            "x": "ce goût de secouer avec style, c'est une part de toi dont tu ne te déferais pas."
          }
        ],
        "col": "#FF593D"
      },
      "+---": {
        "n": 9,
        "sav": "Chèvre",
        "fig": "Le Calme",
        "paras": [
          "Tu ne fais rien de visible, et pourtant tout le monde va un peu mieux quand tu es dans la pièce. Tu n'as organisé aucune soirée, pris personne en charge, mais tu as vu celui qui n'avait pas de verre, glissé un mot à celle qui semblait perdue, sans que ça se remarque. Tu donnes en te faisant petit. Ta générosité ne fait pas de bruit : elle s'occupe des bords, là où personne ne regarde, là où ça compte le plus. Tu es la chaleur discrète d'un groupe, celle qu'on ne voit pas mais qu'on sentirait tout de suite partir."
        ],
        "sline": "Le chèvre : doux, discret, et bien plus présent qu'il n'en a l'air.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as pris soin des gens un peu par les circonstances."
          },
          {
            "l": "Par habitude",
            "x": "tu veilles sur les autres sans y penser, c'est devenu naturel."
          },
          {
            "l": "Par choix",
            "x": "tu as décidé que prendre soin, discrètement, c'était ce qui te ressemblait."
          },
          {
            "l": "Par ancrage",
            "x": "ce soin invisible, c'est le fond de qui tu es. Tu le ferais même épuisé."
          }
        ],
        "col": "#FFE599"
      },
      "+--+": {
        "n": 10,
        "sav": "Ail & fines herbes",
        "fig": "Le Liant",
        "paras": [
          "Tu es arrivé avec ce qu'il fallait, et tu avais raison, il manquait quelque chose. Tu as trouvé les verres, ouvert la fenêtre avant qu'on ait chaud, veillé à ce que ça tourne rond, sans jamais te mettre en avant. Tu donnes, mais tu donnes en organisant : pour toi, prendre soin des gens, c'est faire en sorte que rien ne cloche. Personne ne t'a remercié, parce que personne n'a rien remarqué, et c'est exactement ce que tu voulais. Tu es l'huile dans les rouages, celui grâce à qui une soirée se passe bien sans qu'on sache pourquoi."
        ],
        "sline": "L'ail & fines herbes : le goût qui lie tout le reste, qu'on ne sert jamais seul et sans lequel rien n'a le même liant.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ton sens de l'organisation du soir tenait au besoin du moment."
          },
          {
            "l": "Par habitude",
            "x": "tu arranges les choses par réflexe, tu ne sais pas rester les bras croisés."
          },
          {
            "l": "Par choix",
            "x": "tu as compris que ton soin passait par l'organisation, et tu l'assumes."
          },
          {
            "l": "Par ancrage",
            "x": "prendre soin en faisant tourner les choses, c'est ta façon d'aimer, chevillée au corps."
          }
        ],
        "col": "#ADEF5B"
      },
      "+-+-": {
        "n": 11,
        "sav": "Noix",
        "fig": "L'Hôte discret",
        "paras": [
          "Tu vas vers ce que tu ne connais pas, et tu y emmènes les autres sans en avoir l'air. Tu as parlé à l'inconnu du fond, tu lui as présenté quelqu'un, tu as ouvert une porte pour un autre, toujours en te tenant en retrait, sans réclamer le mérite. Tu donnes en reliant, en faisant circuler les gens et les choses nouvelles. Ta générosité, c'est d'élargir le cercle sans jamais te mettre au centre. Tu es celui qui fait que des gens qui ne se seraient jamais parlé finissent la soirée ensemble, et ça, c'est un cadeau rare."
        ],
        "sline": "La noix : elle se marie à tout, relie les saveurs entre elles, et ne cherche jamais le premier rôle.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as relié les gens un peu par hasard des rencontres."
          },
          {
            "l": "Par habitude",
            "x": "tu ouvres des portes aux autres par pente naturelle."
          },
          {
            "l": "Par choix",
            "x": "tu as fait du lien et de l'ouverture une manière d'être, et tu la cultives."
          },
          {
            "l": "Par ancrage",
            "x": "relier, ouvrir, faire circuler, c'est profondément ta façon d'être au monde."
          }
        ],
        "col": "#E88F30"
      },
      "+-++": {
        "n": 12,
        "sav": "Cheddar Tex Mex",
        "fig": "Le Guide",
        "paras": [
          "À un moment de la soirée, tout le monde s'est retrouvé à faire un truc que personne n'avait prévu, et en cherchant bien, c'était toi. Tu embarques les gens vers du nouveau, y compris ceux qui n'avaient rien demandé, et tu t'assures qu'ils suivent, qu'ils ne se perdent pas en route. Tu donnes en ouvrant des horizons : ta générosité, c'est de faire vivre aux autres ce qu'ils n'auraient pas osé seuls. Tu organises l'aventure au lieu de la subir. Certains rentrent plus tard qu'ils ne l'auraient voulu, et aucun ne le regrette."
        ],
        "sline": "Le cheddar Tex Mex : généreux et dépaysant, il emmène la table ailleurs sans jamais la lâcher.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as entraîné les autres un peu par l'élan du moment."
          },
          {
            "l": "Par habitude",
            "x": "tu prends la tête des explorations par réflexe, c'est ta pente."
          },
          {
            "l": "Par choix",
            "x": "tu as vu que sans toi rien ne bouge, et tu as choisi d'être celui qui lance."
          },
          {
            "l": "Par ancrage",
            "x": "faire découvrir, entraîner sans abandonner personne, c'est une vocation profonde."
          }
        ],
        "col": "#FF501A"
      },
      "++--": {
        "n": 13,
        "sav": "Jambon",
        "fig": "Le Bon Vivant",
        "paras": [
          "Tu remplis la pièce et tu en fais profiter tout le monde. Tu ressers les verres, tu relances celui qui décroche, tu embarques les timides dans la conversation, le tout en tenant le centre, parce que tu aimes ça et que ça te vient sans effort. Tu donnes en occupant : ta générosité, c'est ta présence même, chaleureuse et débordante. Les soirées où tu es là sont plus pleines, plus bruyantes, plus vivantes. Tu es la preuve qu'on peut prendre toute la place et que personne ne t'en veuille, parce que cette place, tu la remplis pour les autres autant que pour toi."
        ],
        "sline": "Le jambon : la valeur sûre, généreuse, celle qui met tout le monde d'accord et remplit la table.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as pris le centre un peu porté par l'ambiance."
          },
          {
            "l": "Par habitude",
            "x": "tu occupes et tu animes par tempérament, sans y penser."
          },
          {
            "l": "Par choix",
            "x": "tu as compris que ta chaleur faisait du bien, et tu la donnes volontiers."
          },
          {
            "l": "Par ancrage",
            "x": "cette générosité expansive, c'est le cœur de qui tu es. Tu donnes en existant."
          }
        ],
        "col": "#FF9F99"
      },
      "++-+": {
        "n": 14,
        "sav": "Bacon grillé",
        "fig": "Le Meneur",
        "paras": [
          "Tu prends les choses en main et tu emmènes le groupe. Tu as vu ce qui manquait, tu as proposé, organisé, distribué les rôles, et les gens ont suivi, parce que tu donnes de l'énergie en même temps que tu diriges. Ta générosité et ton autorité sont la même chose : tu t'occupes de tout le monde en tenant la barre. On te confie volontiers les rênes parce que tu ne les lâches pas et que, avec toi, ça avance. Tu es celui qui transforme un groupe indécis en une soirée réussie, et tu le fais sans même y réfléchir."
        ],
        "sline": "Le bacon grillé : franc, nourrissant, celui qui donne le ton d'une soirée où on est vraiment ensemble.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir tu as pris les commandes parce qu'il fallait bien quelqu'un."
          },
          {
            "l": "Par habitude",
            "x": "tu mènes par réflexe, tu ne sais pas rester spectateur."
          },
          {
            "l": "Par choix",
            "x": "tu as décidé que cadrer le groupe le faisait tenir, et tu l'assumes."
          },
          {
            "l": "Par ancrage",
            "x": "mener pour que tout le monde aille bien, c'est ta façon de donner, chevillée au corps."
          }
        ],
        "col": "#FC5B1D"
      },
      "+++-": {
        "n": 15,
        "sav": "Poivron piment jalapeño",
        "fig": "L'Aventurier",
        "paras": [
          "Tu ne supportes pas qu'une soirée reste où elle a commencé. Tu prends de la place, tu proposes de sortir, de tenter, d'aller voir ailleurs, et tu y vas, que les autres suivent ou non. Tu entraînes sans forcer : ton énergie est contagieuse et ta curiosité sans fond. Tu donnes du mouvement, de l'imprévu, des histoires à raconter. C'est de tes soirées qu'on reparle des années après, celles où on a fini quelque part qu'on n'avait pas prévu. Tu es la preuve qu'une soirée peut être une petite aventure, à condition qu'il y ait quelqu'un comme toi pour la lancer."
        ],
        "sline": "Le poivron piment jalapeño : ça réveille, ça pique, ça ne laisse jamais la soirée s'endormir.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "ce soir l'envie d'ailleurs t'a pris, mais ce n'est pas toujours aussi fort."
          },
          {
            "l": "Par habitude",
            "x": "tu cherches le mouvement par tempérament, c'est ta pente."
          },
          {
            "l": "Par choix",
            "x": "tu cultives ce goût de l'imprévu parce qu'il te fait vivre."
          },
          {
            "l": "Par ancrage",
            "x": "ce besoin d'horizon et de nouveau, c'est le moteur de ta vie entière."
          }
        ],
        "col": "#C7FB2A"
      },
      "++++": {
        "n": 16,
        "sav": "Chorizo piment de Cayenne",
        "fig": "L'Incendie",
        "paras": [
          "Tu es le moteur, et tu chauffes fort. Tu prends toute la place, tu ouvres tout, tu bouscules, tu emmènes, et tu donnes une énergie colossale à qui te suit. Ta générosité est brûlante et un peu envahissante : tu veux que ça bouge, que ça vive, que personne ne reste au bord du truc. Tu cadres ce feu, tu sais où tu vas, mais ceux qui restent près de toi finissent parfois aussi épuisés qu'émerveillés. Une soirée avec toi, on s'en souvient longtemps. Tu es un tempérament entier, de ceux qui ne connaissent pas les demi-mesures, et c'est à la fois ta force et ton intensité qu'on n'oublie pas."
        ],
        "sline": "Le chorizo piment de Cayenne : le plus intense de tous, le défi de la gamme, celui qui laisse une trace durable.",
        "teintes": [
          {
            "l": "Au hasard",
            "x": "même toi, parfois, ce feu te prend sans prévenir, porté par un soir d'exception."
          },
          {
            "l": "Par habitude",
            "x": "tu brûles à fond par tempérament, c'est ta façon d'être depuis toujours."
          },
          {
            "l": "Par choix",
            "x": "tu as décidé d'assumer ton intensité plutôt que de la brider, et tu la donnes pleinement."
          },
          {
            "l": "Par ancrage",
            "x": "ce feu que tu donnes aux autres, c'est ta nature même, indéfectible et sans retour en arrière."
          }
        ],
        "col": "#FF361A"
      }
    },
    "chez_nous": {
      "----": {
        "n": 17,
        "sav": "Camembert",
        "fig": "Le Pilier",
        "paras": [
          "Avec tes gens, tu n'as rien à prouver, et tu ne cherches pas à le faire. Tu es là, fidèle au poste, présent sans être envahissant. Tu ne portes pas la soirée à bout de bras et tu n'en fais pas des caisses : tu es le socle tranquille sur lequel la bande se repose sans même s'en rendre compte. Ta valeur ne se voit pas dans ce que tu fais, elle se voit dans ce que tu es, une présence stable au milieu des gens que tu aimes. On sait qu'avec toi, ce sera toujours simple, et dans un groupe, cette simplicité-là vaut de l'or."
        ],
        "sline": "Le camembert : la valeur fondamentale, celle qui rassemble sans effort et qu'on a toujours dans le frigo.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "ta place dans la bande, tu la connais par cœur et tu l'habites pleinement. C'est ton foyer."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu te sens bien dans tes repères, avec tes gens, et tu t'y tiens volontiers."
          },
          {
            "l": "Plutôt libre",
            "x": "tu as ta place mais tu n'y es pas enfermé, tu gardes un pied dehors."
          },
          {
            "l": "Très libre",
            "x": "même avec ta bande, tu restes un électron, présent mais jamais tout à fait rangé."
          }
        ],
        "col": "#FFE499"
      },
      "---+": {
        "n": 18,
        "sav": "Saumon aneth",
        "fig": "Le Fidèle discret",
        "paras": [
          "Dans ton groupe, tu es celui sur qui on peut compter pour que les choses soient faites bien. Tu ne prends pas la lumière, mais tu as tes exigences, et tes proches le savent : avec toi, pas d'à-peu-près. Tu tiens à certaines façons de faire, à certains rituels, et tu veilles discrètement à ce qu'ils soient respectés. Ta fidélité n'est pas bruyante, elle est fiable. Tu es la mémoire des bonnes manières du groupe, celui qui se souvient de comment on fait les choses chez nous, et qui y tient."
        ],
        "sline": "Le saumon aneth : raffiné, discret, un classique qui ne se démode pas et qu'on sert aux occasions qui comptent.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "les codes du groupe, c'est toi qui les gardes, et tu y tiens profondément."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu aimes les repères partagés et tu veilles à ce qu'ils tiennent."
          },
          {
            "l": "Plutôt libre",
            "x": "tu as tes exigences propres, qui ne sont pas toujours celles du groupe."
          },
          {
            "l": "Très libre",
            "x": "tu gardes tes critères à toi, même quand ils te mettent un peu à part."
          }
        ],
        "col": "#FF9564"
      },
      "--+-": {
        "n": 19,
        "sav": "Bleu & noix",
        "fig": "Le Curieux fidèle",
        "paras": [
          "Avec tes proches, tu aimes ce qui bouge, ce qui change, ce qu'on n'a pas encore fait. Tu ne t'imposes pas, mais tu es souvent celui qui glisse « et si on essayait autre chose ? ». Tu apportes du neuf dans la bande sans casser ce qui existe, tu renouvelles les rituels de l'intérieur. Discret mais curieux, tu empêches le groupe de s'encroûter sans jamais le brusquer. Tu es celui qui fait que vos habitudes ne deviennent jamais tout à fait des routines."
        ],
        "sline": "Le bleu & noix : une association qui surprend sans dépayser, du caractère dans une valeur sûre.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tu renouvelles de l'intérieur, toujours dans le respect de ce qui vous lie."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu aimes le neuf mais tu restes attaché à ton groupe."
          },
          {
            "l": "Plutôt libre",
            "x": "ta curiosité te porte souvent au-delà des habitudes de la bande."
          },
          {
            "l": "Très libre",
            "x": "tu vas chercher ailleurs ce que le groupe ne t'apporte pas, sans t'en cacher."
          }
        ],
        "col": "#6363B5"
      },
      "--++": {
        "n": 20,
        "sav": "Truffe",
        "fig": "L'Exigeant",
        "paras": [
          "Avec tes gens, tu as du goût et tu l'assumes. Tu aimes découvrir, mais le beau, le bon, le qui-vaut-le-coup, et tu n'as pas peur de pousser le groupe vers le haut. Tu es celui qui propose l'endroit qu'on ne connaît pas, le truc un peu plus raffiné, et qui tient à ce que ce soit bien fait. Discret mais sélectif, tu élèves le niveau de la bande sans la snober. Tes proches savent qu'avec toi, on ne fait pas les choses à moitié, et c'est pour ça qu'on te suit."
        ],
        "sline": "La truffe : rare, raffinée, un luxe discret qu'on ne partage qu'avec ceux qui savent l'apprécier.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "ton exigence, tu la mets au service du groupe, pour qu'on vive mieux ensemble."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu pousses vers le haut tout en restant attaché à ta bande."
          },
          {
            "l": "Plutôt libre",
            "x": "tes critères te portent parfois là où le groupe ne te suit pas."
          },
          {
            "l": "Très libre",
            "x": "tu gardes tes exigences, quitte à les vivre en dehors du cercle."
          }
        ],
        "col": "#A96936"
      },
      "-+--": {
        "n": 21,
        "sav": "Basilic",
        "fig": "Le Grain de sel",
        "paras": [
          "Avec tes proches, tu as ta façon bien à toi de te faire entendre. Tu ne portes pas le groupe, mais tu l'assaisonnes : une remarque, une vanne, un avis tranché au bon moment, et la soirée reprend du relief. Tu prends ta place sans la voler, et tes gens comptent sur toi pour ce piquant-là, celui qui empêche les retrouvailles de ronronner. Tu es la touche qui réveille, celui dont on dit « ah, ça c'est bien toi » avec un sourire."
        ],
        "sline": "Le basilic : une herbe qui change tout, fraîche et vive, qu'on reconnaît entre mille.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "ton grain de sel, tu le réserves à tes gens, c'est une intimité."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu t'affirmes dans le groupe tout en te sentant des leurs."
          },
          {
            "l": "Plutôt libre",
            "x": "ton franc-parler te distingue souvent du reste de la bande."
          },
          {
            "l": "Très libre",
            "x": "tu dis ce que tu penses où que tu sois, sans te couler dans aucun moule."
          }
        ],
        "col": "#97FF3D"
      },
      "-+-+": {
        "n": 22,
        "sav": "Tomate piment basque",
        "fig": "Le Caractère",
        "paras": [
          "Avec tes gens, tu as un avis et tu le tiens, même quand ça chauffe. Tu prends de la place, tu ne lâches pas facilement, et tu préfères une bonne discussion franche à un consensus mou. Tu ne cherches pas le conflit, mais tu ne le fuis pas : pour toi, une vraie bande, c'est aussi des gens qui peuvent ne pas être d'accord et s'aimer quand même. Tes proches savent à quoi s'en tenir avec toi, et cette franchise-là, même quand elle pique, ils la respectent."
        ],
        "sline": "La tomate piment basque : du soleil et du feu, un caractère affirmé qui ne laisse personne indifférent.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tu tiens tes positions, mais toujours dans le cadre de ce qui vous unit."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu t'affirmes franchement tout en restant soudé au groupe."
          },
          {
            "l": "Plutôt libre",
            "x": "ton caractère te met souvent à contre-courant de la bande."
          },
          {
            "l": "Très libre",
            "x": "tu ne plies devant aucun groupe, tes convictions passent avant l'appartenance."
          }
        ],
        "col": "#FF2E20"
      },
      "-++-": {
        "n": 23,
        "sav": "Pizza",
        "fig": "L'Électron",
        "paras": [
          "Avec tes proches, tu es celui qui ramène des idées d'ailleurs. Tu bouges, tu papillonnes, tu connais du monde partout, et tu fais entrer dans la bande des souffles nouveaux. Tu prends de la place par ton énergie et ta curiosité, pas par le soin. Tu n'es pas du genre à t'enfermer dans un seul cercle : tu as plusieurs vies, plusieurs groupes, et tu les fais parfois se rencontrer. Tes proches aiment ça chez toi, cette façon d'élargir leur monde sans qu'ils aient à bouger."
        ],
        "sline": "La pizza : populaire, généreuse, celle qui plaît à tout le monde et rassemble les envies les plus diverses.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tes découvertes, tu les ramènes toujours à ta bande, ton port d'attache."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu papillonnes mais tu reviens, le groupe reste ta base."
          },
          {
            "l": "Plutôt libre",
            "x": "tu vis entre plusieurs cercles, sans en privilégier vraiment un."
          },
          {
            "l": "Très libre",
            "x": "tu es partout et nulle part, aucun groupe ne te contient tout entier."
          }
        ],
        "col": "#FF541A"
      },
      "-+++": {
        "n": 24,
        "sav": "Sauce barbecue",
        "fig": "Le Frondeur",
        "paras": [
          "Avec tes gens, tu secoues et tu assumes. Tu prends de la place, tu lances des idées neuves, tu bouscules les habitudes de la bande, et tu le fais avec panache. Tu ne te contentes pas de suivre le mouvement, tu le crées, quitte à déranger un peu. Tes proches savent que tu es celui qui empêche le groupe de tourner en rond, celui qui propose le truc fou qu'on n'aurait jamais tenté sans toi. Tu as du caractère et tu le mets au service de l'aventure commune."
        ],
        "sline": "La sauce barbecue : généreuse et corsée, elle relève tout ce qu'elle touche et ne fait jamais dans la demi-mesure.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tu bouscules la bande mais tu l'aimes profondément, c'est ta tribu."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu secoues de l'intérieur, attaché à ton groupe malgré tout."
          },
          {
            "l": "Plutôt libre",
            "x": "ton goût de la fronde te porte souvent hors des sentiers du groupe."
          },
          {
            "l": "Très libre",
            "x": "tu ne te ranges sous aucune bannière, pas même celle de tes amis."
          }
        ],
        "col": "#FF6829"
      },
      "+---": {
        "n": 25,
        "sav": "Jambon cru",
        "fig": "Le Cœur",
        "paras": [
          "Avec tes proches, tu es celui qui prend soin sans qu'on le demande. Tu vois celui qui ne va pas fort, tu portes attention aux petits détails, tu es là dans les moments qui comptent sans jamais te mettre en avant. Ta générosité est discrète mais profonde : tu donnes du temps, de l'écoute, de la présence. Tes gens savent qu'en cas de coup dur, tu seras là, sans faire d'histoires. Tu es le cœur tranquille de la bande, celui dont on mesure la valeur surtout quand on en a besoin."
        ],
        "sline": "Le jambon cru : authentique et généreux, un goût de vrai qui se bonifie avec le temps, comme les amitiés.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tes gens, c'est ton monde, tu prends soin d'eux comme d'une famille."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu donnes beaucoup à ta bande, qui est ton ancrage."
          },
          {
            "l": "Plutôt libre",
            "x": "tu prends soin des gens au-delà de ton cercle, sans frontière."
          },
          {
            "l": "Très libre",
            "x": "ton attention va à qui en a besoin, quel que soit le groupe."
          }
        ],
        "col": "#FF4940"
      },
      "+--+": {
        "n": 26,
        "sav": "3 fromages",
        "fig": "Le Ciment",
        "paras": [
          "Avec tes proches, tu es celui qui fait tenir l'ensemble. Tu donnes, mais tu donnes en organisant : tu prévois, tu anticipes, tu veilles à ce que rien ne manque et que tout le monde soit bien. Tu n'as pas besoin d'être au centre, ton plaisir c'est que ça tourne rond. Tes gens se reposent sur toi pour les détails qui font qu'une soirée, un week-end, un projet commun se passent sans accroc. Tu es le ciment discret du groupe, celui sans qui les choses se feraient moins bien, ou pas du tout."
        ],
        "sline": "Les 3 fromages : une alliance équilibrée qui marie les caractères, la recette qui met tout le monde d'accord.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "faire tenir le groupe, c'est ta mission, ta place et ta fierté."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu organises pour ta bande, à laquelle tu tiens fort."
          },
          {
            "l": "Plutôt libre",
            "x": "tu mets de l'ordre partout où tu passes, pas seulement chez les tiens."
          },
          {
            "l": "Très libre",
            "x": "tu aides à faire tenir les choses sans t'attacher à un cercle en particulier."
          }
        ],
        "col": "#FFCE44"
      },
      "+-+-": {
        "n": 27,
        "sav": "Tomate",
        "fig": "Le Passeur",
        "paras": [
          "Avec tes proches, tu donnes en ouvrant des portes. Tu présentes les gens, tu fais découvrir, tu relies des mondes qui ne se seraient pas rencontrés. Tu ne prends pas la lumière, mais tu es celui grâce à qui la bande s'agrandit, se renouvelle, rencontre du neuf. Ta générosité, c'est de faire circuler, de connecter, d'élargir le cercle sans le diluer. Tes gens comptent sur toi pour amener du sang neuf et des idées fraîches, et tu le fais avec une discrétion qui force le respect."
        ],
        "sline": "La tomate : franche et solaire, le goût de l'évidence partagée, celui qui plaît à tous et relie les tablées.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tu fais grandir ta bande en lui amenant du monde, fidèlement."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu ouvres le cercle tout en y restant bien ancré."
          },
          {
            "l": "Plutôt libre",
            "x": "tu relies plusieurs groupes, à cheval entre les mondes."
          },
          {
            "l": "Très libre",
            "x": "tu es un pont entre des cercles, sans vraiment appartenir à aucun."
          }
        ],
        "col": "#FF2F1A"
      },
      "+-++": {
        "n": 28,
        "sav": "Saint-Jacques",
        "fig": "Le Grand Cœur",
        "paras": [
          "Avec tes proches, tu donnes beaucoup, et tu donnes bien. Tu es généreux et exigeant à la fois : tu veux que les gens que tu aimes vivent de belles choses, et tu te donnes du mal pour ça. Tu organises les beaux moments, tu proposes les aventures, tu fais en sorte que vos retrouvailles aient de la tenue. Discret sur ton effort, tu portes une grande partie de ce qui fait la richesse de la bande. Tes gens ont de la chance de t'avoir, et au fond, ils le savent."
        ],
        "sline": "La Saint-Jacques : raffinée et généreuse, le haut de gamme du partage, réservé à ceux qu'on aime vraiment.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tout ce que tu donnes, c'est pour tes gens, ton monde, ta tribu."
          },
          {
            "l": "Plutôt conforme",
            "x": "ta générosité exigeante nourrit la bande à laquelle tu tiens."
          },
          {
            "l": "Plutôt libre",
            "x": "tu offres de belles choses au-delà de ton cercle proche."
          },
          {
            "l": "Très libre",
            "x": "ta générosité ne connaît pas les frontières des groupes."
          }
        ],
        "col": "#FFD999"
      },
      "++--": {
        "n": 29,
        "sav": "Poulet grillé",
        "fig": "Le Chaleureux",
        "paras": [
          "Avec tes proches, tu remplis l'espace de ta chaleur. Tu es le boute-en-train, celui qui relance, qui ressert, qui veille à ce que personne ne reste dans son coin. Tu prends de la place et tu la remplis pour les autres : ta présence est un cadeau que tu fais au groupe. Tes gens savent que quand tu es là, ce sera chaleureux, vivant, généreux. Tu es l'âme des retrouvailles, celui qui fait que les soirées entre vous ont toujours ce supplément de vie."
        ],
        "sline": "Le poulet grillé : convivial et rassasiant, le plat qui réunit, simple et généreux, qu'on partage sans chichis.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "ta chaleur, tu la déploies pour tes gens, c'est ta famille choisie."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu animes la bande avec générosité, bien ancré parmi les tiens."
          },
          {
            "l": "Plutôt libre",
            "x": "ta chaleur rayonne au-delà de ton cercle, partout où tu passes."
          },
          {
            "l": "Très libre",
            "x": "tu réchauffes tous les groupes que tu croises, sans en élire un seul."
          }
        ],
        "col": "#FFB71A"
      },
      "++-+": {
        "n": 30,
        "sav": "Oignon fondant",
        "fig": "Le Capitaine",
        "paras": [
          "Avec tes proches, tu prends la barre et tu emmènes tout le monde. Tu donnes de l'énergie, tu organises, tu décides quand il faut décider, et la bande te suit parce qu'avec toi, ça avance et ça se passe bien. Ton autorité est généreuse : tu diriges pour que le groupe vive de bons moments, pas pour le pouvoir. Tes gens te confient volontiers les rênes des projets communs, parce qu'ils savent que tu les mèneras à bon port. Tu es le capitaine naturel de la tribu."
        ],
        "sline": "L'oignon fondant : une base généreuse qui donne du corps à tout, la fondation sur laquelle le reste repose.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tu mènes ta bande parce que c'est ta tribu, et tu la portes haut."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu prends les rênes du groupe auquel tu tiens profondément."
          },
          {
            "l": "Plutôt libre",
            "x": "tu prends naturellement la tête, dans ta bande comme ailleurs."
          },
          {
            "l": "Très libre",
            "x": "tu mènes partout où tu passes, sans te lier à un seul équipage."
          }
        ],
        "col": "#FFD56E"
      },
      "+++-": {
        "n": 31,
        "sav": "Ail des ours",
        "fig": "L'Explorateur commun",
        "paras": [
          "Avec tes proches, tu es le moteur des aventures. Tu donnes, tu occupes l'espace, et tu entraînes toute la bande vers du nouveau, des endroits, des expériences, des trucs qu'on n'aurait jamais faits sans toi. Ton énergie est généreuse et contagieuse : tu veux que tes gens vivent, découvrent, se souviennent. Tu es celui qui propose le voyage, l'escapade, le défi collectif, et qui s'assure que personne ne reste sur le bord. Grâce à toi, la bande a des histoires à raconter."
        ],
        "sline": "L'ail des ours : sauvage et généreux, un goût de grand air et de liberté, celui des découvertes partagées.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "tes aventures, tu les vis avec tes gens, c'est ça qui leur donne du sens."
          },
          {
            "l": "Plutôt conforme",
            "x": "tu entraînes ta bande vers le neuf, fidèle à ta tribu."
          },
          {
            "l": "Plutôt libre",
            "x": "ton goût de l'exploration te porte dans plusieurs cercles à la fois."
          },
          {
            "l": "Très libre",
            "x": "tu explores avec qui veut te suivre, sans attendre que ce soit toujours les mêmes."
          }
        ],
        "col": "#78E823"
      },
      "++++": {
        "n": 32,
        "sav": "Hot Challenge",
        "fig": "Le Volcan",
        "paras": [
          "Avec tes proches, tu es l'intensité faite personne. Tu donnes tout, tu prends toute la place, tu ouvres tout, tu mènes tout : la bande vit à ton rythme quand tu es là, et ton rythme est trépidant. Ta générosité est volcanique, parfois épuisante, mais tes gens ne t'échangeraient contre personne, parce que tu mets dans vos moments communs une énergie que nul autre n'apporte. Tu es le cœur battant de la tribu, celui qui chauffe tout le monde et qui laisse, à chaque retrouvaille, un souvenir impossible à oublier. Avec toi, c'est toujours trop, et c'est exactement ce qu'on aime."
        ],
        "sline": "Le Hot Challenge : l'extrême de la gamme, le défi ultime, une intensité qui se vit pleinement et ne s'oublie jamais.",
        "teintes": [
          {
            "l": "Très conforme",
            "x": "toute ton énergie va à tes gens, ils sont ton univers entier."
          },
          {
            "l": "Plutôt conforme",
            "x": "ton feu nourrit la bande à laquelle tu es viscéralement attaché."
          },
          {
            "l": "Plutôt libre",
            "x": "ton intensité déborde ton cercle et enflamme tout ce que tu croises."
          },
          {
            "l": "Très libre",
            "x": "tu brûles pour tous et pour personne en particulier, insaisissable et total."
          }
        ],
        "col": "#D71300"
      }
    }
  },
  "meta": {
    "rec": {
      "chez_les_autres": {
        "DON": 0.0211,
        "PRESENCE": -0.2464,
        "DETTE": -0.0456,
        "PARI": -0.1205
      },
      "chez_nous": {
        "DON": -0.1957,
        "PRESENCE": -0.4977,
        "DETTE": -0.0381,
        "PARI": -0.9935,
        "CONF": 0.284
      }
    },
    "aw": 0.5,
    "confT": [
      -0.466,
      0.034,
      0.484
    ],
    "engT": [
      2.333,
      2.556,
      2.778
    ]
  }