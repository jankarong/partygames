// Données du jeu
const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                // Léger et amusant
                "Si tu pouvais te transformer en animal, lequel choisirais-tu ?",
                "Quel était ton fantasme d'enfance le plus bizarre ?",
                "Quel est ton emoji préféré ?",
                "Si tu étais invisible pendant une journée, que ferais-tu ?",
                "Quelle est ta citation de film préférée ?",
                "Quel est la chose la plus ennuyeuse que tu aies jamais faite ?",
                "Quel est ton souvenir d'enfance préféré ?",
                "De quoi es-tu le plus fier ?",
                "Quelle est ta plus grande peur ?",
                "Quel est ton personnage de dessin animé préféré ?",
                "Quelle compétence aimerais-tu apprendre ?",
                "Quelle est ta saison préférée ?",
                "Quel est ton moment préféré de la journée ?",
                "Quel animal aimerais-tu avoir comme animal de compagnie ?",
                "Quel est ton temps préféré ?",
                "Quel parc d'attractions aimerais-tu visiter ?",
                "Quel est ton snack préféré ?",
                "Quel emploi aimerais-tu essayer pendant une journée ?",
                "Quelle est ton odeur préférée ?",
                "Quel type de maison aimerais-tu habiter ?",

                // Imagination créative
                "Si tu pouvais avoir un superpouvir, lequel choisirais-tu ?",
                "Si tu pouvais voyager dans le temps, qu'aimerais-tu changer ?",
                "Si tu pouvais être une célébrité pendant une journée, qui choisirais-tu ?",
                "Quel est ton personnage fictif préféré ?",
                "Si tu pouvais inventer un nouveau plat, ce serait quoi ?",
                "Quel est ta fête préférée et pourquoi ?",
                "Si tu pouvais vivre dans le monde d'un film ou d'une série, lequel choisirais-tu ?",
                "Quel est ta destination de rêve ?",
                "Si tu pouvais changer une chose au monde, ce serait quoi ?",
                "Quel est ton jeu d'enfance préféré ?",
                "Si tu pouvais créer une nouvelle fête, ce serait comment ?",
                "Si tu pouvais discuter avec une figure historique, qui choisirais-tu ?",
                "Si tu pouvais posséder un objet magique, ce serait quoi ?",
                "Si tu pouvais être le personnage principal d'un livre, lequel choisirais-tu ?",
                "Si tu pouvais construire ta maison de rêve, à quoi ressemblerait-elle ?",
                "Si tu pouvais faire un film, quel genre choisirais-tu ?",
                "Si tu pouvais ouvrir n'importe quel type de magasin, ce serait quoi ?",
                "Si tu pouvais concevoir un jeu, quel type serait-ce ?",
                "Si tu pouvais avoir un assistant robot, que voudrais-tu qu'il fasse ?",
                "Si tu pouvais créer un nouveau sport, ce serait quoi ?",

                // Préférences quotidiennes
                "Quel est ton aliment préféré ?",
                "Quelle est ta boisson préférée ?",
                "Quelle est ta couleur préférée ?",
                "Quel est ton genre musical préféré ?",
                "Quel est ton sport préféré ?",
                "Quel est ton livre préféré ?",
                "Quel est ton film préféré ?",
                "Quelle est ta série télévisée préférée ?",
                "Quel est ton jeu préféré ?",
                "Quelle est ta plateforme de médias sociaux préférée ?",
                "Quel est ton fruit préféré ?",
                "Quel est ton légume préféré ?",
                "Quelle est ta boisson préférée ?",
                "Quel est ton dessert préféré ?",
                "Quel est ton petit-déjeuner préféré ?",
                "Quel est ton dîner préféré ?",
                "Quel est ton fast-food préféré ?",
                "Quel est ta saveur de crème glacée préférée ?",
                "Quel type de café aimes-tu ?",
                "Quel est ton thé préféré ?",

                // Questions personnelles amicales
                "Qu'aimes-tu le plus chez toi ?",
                "Quel souhait aimerais-tu voir se réaliser ?",
                "À qui es-tu le plus reconnaissant ?",
                "Quelle est la chose la plus heureuse qui t'est arrivée ?",
                "Quelle est la chose la plus surprenante qui t'est arrivée ?",
                "Quel instrument aimerais-tu apprendre ?",
                "Quelle langue aimerais-tu maîtriser ?",
                "Quel pays aimerais-tu visiter ?",
                "Qui aimerais-tu le plus rencontrer ?",
                "Quelle est ta possession la plus précieuse ?",
                "Quel était ton anniversaire le plus mémorable ?",
                "Quel était ton professeur préféré ?",
                "Qu'est-ce qui rend ton meilleur ami spécial ?",
                "Quel souvenir aimerais-tu revivre ?",
                "Quelle habitude aimerais-tu améliorer ?",

                // Loisirs et intérêts
                "Quelle est ton activité de plein air préférée ?",
                "Quelle est ton activité d'intérieur préférée ?",
                "Qu'aimes-tu collectionner ?",
                "Quel nouveau hobby aimerais-tu essayer ?",
                "Quelle est ta forme d'art préférée ?",
                "Quelle danse aimerais-tu apprendre ?",
                "Quel est ton projet artisanal préféré ?",
                "Quel événement aimerais-tu fréquenter ?",
                "Quel type de lecture aimes-tu ?",
                "Quelle technologie aimerais-tu maîtriser ?",

                // Rêves et objectifs
                "Quel type de personne veux-tu être dans 10 ans ?",
                "Quel défi aimerais-tu relever ?",
                "Quel groupe de personnes aimerais-tu aider ?",
                "Quel problème social aimerais-tu résoudre ?",
                "Quel héritage aimerais-tu laisser ?",
                "Pour quoi veux-tu être mémorisé ?",
                "Quel impact aimerais-tu avoir ?",
                "Qu'aimerais-tu créer ?",
                "Quel problème mondial aimerais-tu changer ?",
                "Quelle valeur sociale aimerais-tu promouvoir ?",

                // Philosophie de vie
                "Quelle est la qualité la plus importante selon toi ?",
                "Quelle est ta devise de vie ?",
                "Qu'est-ce que le vrai succès selon toi ?",
                "Qu'est-ce que le plus grand bonheur selon toi ?",
                "Qu'est-ce qui est le plus important en amitié ?",
                "Quel est le meilleur cadeau selon toi ?",
                "Quand te sens-tu le plus accompli ?",
                "Quelle est la meilleure façon d'apprendre selon toi ?",
                "Quelle est la compétence la plus importante dans la vie ?",
                "Qu'est-ce qui rend la vie significative ?",

                // Hypothétiques amusants
                "Si tu avais de l'argent illimité, que ferais-tu ?",
                "Si tu pouvais lire les pensées, comment l'utiliserais-tu ?",
                "Si tu pouvais voler, où irais-tu en premier ?",
                "Si tu pouvais arrêter le temps, que ferais-tu ?",
                "Si tu pouvais être invisible, où irais-tu ?",
                "Si tu pouvais parler aux animaux, quel animal aimerais-tu connaître ?",
                "Si tu pouvais te téléporter, où irais-tu ?",
                "Si tu pouvais voir l'avenir, que voudrais-tu savoir ?",
                "Si tu pouvais ramener une figure historique, qui choisirais-tu ?",
                "Si tu pouvais éliminer une chose du monde, ce serait quoi ?"
            ],
            dare: [
                // Comédie légère
                "Marche comme un pingouin",
                "Parle avec une voix bizarre jusqu'au prochain tour",
                "Imite une célébrité jusqu'au prochain tour",
                "Porte des chaussettes comme gants pendant 5 minutes",
                "Essaie de te lécher le nez (ou le coude)",
                "Dis 'Je suis si beau/belle' au miroir 10 fois",
                "Parle avec un faux accent étranger pendant 5 minutes",
                "Agis comme un chat - mouvements et bruits",
                "Agis comme un chien - mouvements et bruits",
                "Prétends être un robot quand tu parles",
                "Écris des lettres avec tes fesses",
                "Dessine un autoportrait les yeux fermés",
                "Écris ton nom avec tes orteils en tenant un stylo",
                "Imite un bébé qui pleure pendant 30 secondes",
                "Prétends nager",
                "Marche comme une personne âgée",
                "Saute comme une grenouille 10 fois",
                "Prends une pose de superhéros",
                "Prétends conduire une voiture",
                "Imite le bruit d'un éternuement",

                // Démonstrations de compétences
                "Fais 10 pompes",
                "Reste sur un pied pendant 1 minute",
                "Effectue une danse",
                "Chante une chanson complète",
                "Récite une formule difficile",
                "Raconte une blague",
                "Effectue une courte pièce de théâtre",
                "Dessine un autoportrait",
                "Fais 5 abdominaux",
                "Dis une phrase complète à l'envers",
                "Chante 'Joyeux anniversaire' en français",
                "Imite une publicité",
                "Effectue un tour de magie",
                "Fais une pose de yoga",
                "Applaudis d'une main 10 fois",
                "Marche droit les yeux fermés pendant 10 pas",
                "Marche en équilibrant un livre sur ta tête",
                "Tourne sur place 10 fois",
                "Saute à la corde (prétends que tu as une corde) 50 fois",
                "Fais une grimace drôle",

                // Interactions amicales
                "Fais un câlin à quelqu'un",
                "Offre un petit cadeau à quelqu'un",
                "Fais une surprise à quelqu'un",
                "Complimente sincèrement quelqu'un",
                "Félicite tout le monde présent",
                "Fais un massage des épaules à quelqu'un",
                "Fais un high-five à quelqu'un 10 fois",
                "Fais un high-five à quelqu'un",
                "Danse avec quelqu'un",
                "Laisse quelqu'un te coiffer",
                "Chante avec quelqu'un",
                "Fais un baiser volant à quelqu'un",
                "Joue pierre-papier-ciseaux avec quelqu'un",
                "Raconte une histoire à quelqu'un",
                "Fais de l'exercice avec quelqu'un",
                "Salue quelqu'un",
                "Prends une photo avec quelqu'un",
                "Fais une bénédiction à quelqu'un",
                "Partage des snacks avec quelqu'un",
                "Offre un sourire à quelqu'un",

                // Médias sociaux légers
                "Publie un message de remerciement à tes amis",
                "Publie un selfie drôle",
                "Publie une citation inspirante",
                "Publie 'Quelle belle journée !'",
                "Aime les 10 derniers posts d'un ami",
                "Publie une photo de nourriture",
                "Partage ta chanson préférée",
                "Publie bon matin/bonne nuit",
                "Publie une photo de paysage",
                "Partage une citation positive",
                "Publie quelque chose sur les animaux de compagnie",
                "Partage une vidéo intéressante",
                "Publie quelque chose sur l'exercice",
                "Recommande un bon livre",
                "Publie sur tes expériences culinaires",
                "Partage un souvenir de voyage",
                "Publie sur tes expériences d'apprentissage",
                "Partage une histoire touchante",
                "Publie quelque chose sur ta famille",
                "Partage une image inspirante",

                // Expression créative
                "Utilise ton corps pour épeler un mot que les autres doivent deviner",
                "Joue aux charades pendant 1 minute sans parler",
                "Fais des bruits d'animaux",
                "Effectue une mime",
                "Lis un passage avec différentes voix",
                "Invente une histoire sur le champ",
                "Imite un personnage animé",
                "Imite un bébé qui parle",
                "Exprime des émotions comme des emojis",
                "Imite des personnes de différentes professions",
                "Mets en scène un conte de fées",
                "Utilise des ombres chinoises pour montrer un animal",
                "Imite des personnes de différents âges",
                "Mets en scène une scène de film",
                "Utilise ta voix pour imiter des instruments",
                "Mets en scène des changements météorologiques",
                "Imite différents véhicules",
                "Utilise ton corps pour montrer l'heure",
                "Exprime différentes émotions",
                "Imite des citations célèbres de célébrités",

                // Création artistique
                "Dessine un simple dessin",
                "Plie un avion en papier",
                "Fais un petit animal en pâte à modeler",
                "Écris un court poème",
                "Crée un badge",
                "Crée une simple figure de danse",
                "Dessine une simple bande dessinée",
                "Fais un artisanat simple",
                "Crée un nouvel emoji",
                "Crée un nouveau mot",
                "Écris de simples paroles de chanson",
                "Conçois une règle de jeu",
                "Dessine une carte de vœux",
                "Fais un chapeau en papier",
                "Crée une danse avec les mains",
                "Crée un slogan",
                "Dessine une carte mentale",
                "Fais un simple collage",
                "Crée un chant",
                "Crée un simple logo"
            ]
        },
        spicy: {
            truth: [
                // Vie personnelle privée
                "Quand as-tu menti pour la dernière fois ? À qui ?",
                "As-tu secrètement aimé quelqu'un ici ?",
                "Quel est ton moment le plus embarrassant ?",
                "Qu'est-ce qui t'a fait pleurer le plus fort ?",
                "Qui as-tu eu un crush ? Tu lui parles encore ?",
                "Quelle est ta plus mémorable expérience romantique ?",
                "À quoi ressemble ta date idéale ?",
                "Qu'est-ce que tu as fait de plus fou pour l'amour ?",
                "Quelle est la chose que tu aimes le moins chez toi ?",
                "Quand as-tu senti le plus de culpabilité ?",
                "Quelle habitude as-tu que les autres ne connaissent pas ?",
                "Quel est ton plus grand regret ?",
                "Quelle est la chose la plus impulsive que tu aies faite ?",
                "Qu'aimerais-tu le plus dire à quelqu'un ?",
                "Quel est quelque chose que tu ne veux pas que les autres sachent ?",
                "Quelle est la chose la plus infantile que tu aies faite ?",
                "Quel souvenir voudrais-tu oublier ?",
                "Quelle est ta plus grande préoccupation pour l'avenir ?",
                "Qu'as-tu fait secrètement que tu ne veux pas découvrir ?",
                "Quelle est la chose la plus embarrassante que tu aies faite ?",

                // Amour et relations
                "À quoi ressemblait ton premier baiser ?",
                "As-tu déjà eu une relation compliquée ?",
                "As-tu déjà trompé ou pensé à le faire ?",
                "Quelle était la pire rupture que tu as vécue ?",
                "Quelle est la chose la plus dure que tu aies dite lors d'une rupture ?",
                "Combien de petits copains/petites copines as-tu eu ?",
                "Qui aimerais-tu le plus fréquenter ?",
                "Quel est le plus gros mensonge que tu aies dit dans une relation ?",
                "As-tu déjà eu une relation ambiguë ?",
                "Daterais-tu quelqu'un que tu n'aimes pas pour l'argent ?",
                "As-tu déjà regardé le téléphone de quelqu'un ?",
                "As-tu déjà eu une relation en ligne ?",
                "Daterais-tu l'ex d'un ami ?",
                "Avec quel ex voudrais-tu le plus te remettre ensemble ?",
                "Quel est le rêve le plus sauvage que tu aies eu sur quelqu'un ?",
                "As-tu déjà été attiré par quelqu'un du même sexe ?",
                "Quelle célébrité aimerais-tu le plus fréquenter ?",
                "Accepterais-tu une relation ouverte ?",
                "As-tu déjà eu des sentiments pour un professeur ou une figure d'autorité ?",
                "Quel est ton plus grand fantasme romantique ?",

                // Faits saillants des relations interpersonnelles
                "Qu'est-ce dont tu as été en colère contre un ami ?",
                "Qu'est-ce dont tu as été en colère contre ta famille ?",
                "Quel trait détestes-tu le plus chez quelqu'un ici ?",
                "Qu'as-tu dit derrière le dos de quelqu'un ici ?",
                "Qu'envies-tu chez quelqu'un ici ?",
                "Qui ici penses-tu qui est le plus faux ?",
                "Qui ici penses-tu qui est le plus narcissique ?",
                "Qui voudrais-tu le plus gifler ?",
                "Qui penses-tu qui mérite le moins sa vie actuelle ?",
                "Quel type de personne méprises-tu le plus ?",
                "Qui est la personne la plus innocente que tu aies blessée ?",
                "Qui veux-tu le plus te venger ?",
                "Quelle est la chose la plus méchante que tu aies dite ?",
                "Quelle est la pire chose que tu aies faite ?",
                "Le secret de qui aimerais-tu le plus révéler ?",
                "Qui penses-tu qui a la vie la plus échouée ?",
                "Qu'est-ce que tu veux le plus obtenir de quelqu'un ?",
                "Qui voudrais-tu le plus voir échouer ?",
                "Qui ici penses-tu qui est le plus malhonnête ?",
                "Qui veux-tu le plus couper les ponts ?",

                // Frontières morales
                "Quel est le plus gros mensonge que tu aies jamais dit ?",
                "Quel fait important as-tu caché ?",
                "As-tu trompé quelqu'un qui t'aime le plus ?",
                "As-tu trahi quelqu'un qui te faisait confiance le plus ?",
                "As-tu profité de la faiblesse de quelqu'un ?",
                "As-tu blessé un ami pour ton profit personnel ?",
                "As-tu répandu de fausses informations ?",
                "As-tu délibérément ignoré quelqu'un qui avait besoin d'aide ?",
                "As-tu sacrifié d'autres pour ton propre bénéfice ?",
                "As-tu continué à faire quelque chose que tu savais être mauvais ?",
                "As-tu violé tes propres principes ?",
                "As-tu fait quelque chose contre ta conscience pour les apparences ?",
                "As-tu déjà été jaloux du succès de quelqu'un ?",
                "As-tu déjà pris plaisir au malheur de quelqu'un ?",
                "As-tu déjà dénigré quelqu'un qui était déjà à terre ?",
                "As-tu déjà calomnié malveillamment quelqu'un ?",
                "As-tu délibérément donné quelqu'un le froid à l'épaule ?",
                "Qu'as-tu fait pour te venger ?",
                "Quand as-tu été le plus égoïste ?",
                "Quand as-tu été le plus hypocrite ?",

                // Défi intérieur
                "Quelle est ta pensée la plus sombre ?",
                "Qu'est-ce que tu veux le plus faire mais que tu n'oses pas ?",
                "Quel est ton secret le plus honteux ?",
                "Quel passé veux-tu le plus couvrir ?",
                "Quelle faiblesse ne veux-tu pas que les gens connaissent ?",
                "Quelle responsabilité veux-tu le plus éviter ?",
                "Quel mensonge as-tu le plus peur d'être démasqué ?",
                "Qu'est-ce que tu veux le plus mais que tu ne peux pas avoir ?",
                "Qu'est-ce que tu veux devenir le plus mais qui te semble impossible ?",
                "Qu'est-ce que tu veux le plus oublier mais que tu ne peux pas ?",
                "Qu'est-ce que tu veux le plus pardonner mais que tu ne peux pas ?",
                "Qu'est-ce que tu veux le plus récupérer mais que tu ne peux pas ?",
                "Qu'est-ce que tu veux le plus changer mais que tu ne peux pas ?",
                "Qu'est-ce que tu veux le plus fuir mais que tu ne peux pas ?",
                "Qu'est-ce que tu penses être ton plus grand échec ?",
                "Qu'est-ce que tu regrettes le plus de ne pas faire ?",
                "De quoi as-tu le plus peur de perdre ?",
                "Quelle réalité as-tu le plus peur d'affronter ?",
                "Qu'est-ce que tu veux le plus prouver aux autres ?",
                "Quelle est ta plus grande motivation pour vivre ?",

                // Argent et valeurs
                "Quelle est la chose que tu regrettes le plus d'avoir faite pour l'argent ?",
                "Quand as-tu été le plus avide ?",
                "Quels principes abandonnerais-tu pour l'argent ?",
                "Qu'est-ce que tu veux le plus mais que tu ne peux pas te permettre ?",
                "Quelle est la plus grande opportunité que tu as manquée à cause du manque d'argent ?",
                "Combien d'argent te faudrait-il pour trahir un ami ?",
                "Quelle est la chose la plus bon marché que tu aies faite pour économiser l'argent ?",
                "Quand as-tu été le plus jaloux de la richesse de quelqu'un ?",
                "As-tu déjà battu ta famille pour de l'argent ?",
                "À qui veux-tu le plus emprunter de l'argent mais que tu n'oses pas demander ?",

                // Défi des valeurs
                "Quel comportement trouves-tu le plus intolérable ?",
                "Quelle opinion des autres est la plus difficile à accepter pour toi ?",
                "Quel phénomène social veux-tu le plus changer ?",
                "Quel type de personne penses-tu qui est le plus hypocrite ?",
                "Quel double standard trouves-tu le plus dégoûtant ?",
                "Quel concept traditionnel penses-tu qui devrait être brisé ?",
                "Quelle opinion dominante veux-tu le plus réfuter ?",
                "Quelle règle penses-tu qui est la plus déraisonnable ?",
                "Quelle autorité veux-tu le plus remettre en question ?",
                "Quel préjugé social veux-tu le plus changer ?"
            ],
            dare: [
                // Performance extrêmement maladroite
                "Écris ton nom avec tes fesses",
                "Dessine un motif sur ton visage avec du rouge à lèvres",
                "Fais semblant d'être saoul",
                "Fais semblant d'être en colère",
                "Lèche ton nez avec ta langue",
                "Enlève tes chaussettes et laisse d'autres les sentir",
                "Fais semblant d'avoir des contractions de travail",
                "Porte des vêtements du sexe opposé et prends une photo",
                "Laisse d'autres écrire sur ton corps",
                "Laisse d'autres te nourrir les yeux fermés",
                "Laisse d'autres te maquiller",
                "Fais semblant de ton expérience la plus embarrassante",
                "Imite la personne que tu détestes le plus",
                "Prends un selfie exagéré",
                "Fais semblant d'avoir peur de la plupart",
                "Imite un bébé qui pleure",
                "Assieds-toi sur un ballon jusqu'à ce qu'il éclate avec tes fesses",
                "Fais semblant de la nervosité de ta première date",
                "Imite comment tu as l'air quand tu es saoul",
                "Fais semblant de ta réaction quand tu es effrayé",

                // Défis sociaux extrêmes
                "Envoie un SMS à ton ex 'Tu me manques'",
                "Chante fort en public",
                "Fais un câlin à un étranger",
                "Publie une photo laide de toi sur les réseaux sociaux",
                "Appelle une personne aléatoire dans tes contacts en faisant semblant d'être vendeur",
                "Danse en public",
                "Publie 'Je suis amoureuse' sur les réseaux sociaux",
                "Appelle une personne aléatoire en faisant semblant d'être un robot",
                "Crie 'Je vous aime tous !' en public",
                "Appelle une personne aléatoire en faisant semblant d'être un alien",
                "Avoue à un étranger dans la rue",
                "Avoue publiquement ton expérience la plus embarrassante",
                "Dis à haute voix quelle célébrité tu veux le plus rencontrer",
                "Appelle la personne que tu détestes le plus et excuse-toi",
                "Dis à haute voix ton secret le plus honteux",
                "Montre aux autres la photo la plus drôle sur ton téléphone",
                "Imite publiquement la personne que tu détestes le plus",
                "Dis à haute voix l'un de tes défauts",
                "Exprime publiquement ton vrai opinion sur quelqu'un",
                "Excuse-toi publiquement pour quelque chose que tu as mal fait",
                "Dis à haute voix ton plus grand regret",

                // Interaction intime (version modérée)
                "Fais un baiser sur la joue à quelqu'un",
                "Fais un massage des épaules à quelqu'un",
                "Fais un câlin à quelqu'un pendant 30 secondes",
                "Assieds-toi sur les genoux de quelqu'un",
                "Laisse quelqu'un te coiffer",
                "Tiens la main avec quelqu'un et tourne autour",
                "Fais un long câlin à quelqu'un",
                "Prends une photo joue contre joue avec quelqu'un",
                "Laisse quelqu'un te dessiner sur le bras",
                "Danse avec quelqu'un",
                "Fais un baiser volant à quelqu'un",
                "Regarde quelqu'un dans les yeux pendant 30 secondes sans rire",
                "Laisse quelqu'un te nourrir des fruits",
                "Chante une chanson d'amour avec quelqu'un",
                "Fais un massage des mains à quelqu'un",
                "Mets en scène une scène de film romantique avec quelqu'un",
                "Laisse quelqu'un te tresser les cheveux",
                "Fais une forme de cœur avec quelqu'un",
                "Fais un câlin doux à quelqu'un",
                "Prends une photo de couple amoureux avec quelqu'un",

                // Défis de compétences
                "Fais un équilibre sur les mains pendant 10 secondes",
                "Effectue un tour de magie",
                "Défie ta peur (de choses sûres)",
                "Essaie des combinaisons alimentaires étranges mais sûres",
                "Apprends une nouvelle figure de danse",
                "Écris avec ta main non dominante",
                "Marche droit les yeux fermés",
                "Fais une pompe d'une main",
                "Récite un poème complet",
                "Effectue un drame improvisé",
                "Utilise ton corps pour épeler des lettres",
                "Imite 5 animaux différents",
                "Parle à l'envers pendant 5 minutes",
                "Dessine avec tes pieds",
                "Apprends un simple tour de magie",
                "Imite 5 professions différentes",
                "Écris avec un stylo dans ta bouche",
                "Fais 10 expressions faciales différentes",
                "Apprends une formule difficile étrangère",
                "Effectue une scène de film silencieux",

                // Défi personnel
                "Envoie un message à ta célébrité préférée",
                "Commence une chaîne emoji dans un chat de groupe",
                "Avoue publiquement ton plus grand échec",
                "Partage ton souvenir d'enfance le plus embarrassant",
                "Avoue ton comportement le plus infantile",
                "Révèle une habitude que les autres ne connaissent pas",
                "Partage ton histoire embarrassante la plus drôle",
                "Avoue ta décision la plus regrettable",
                "Dis ce dont tu es le plus conscient",
                "Partage ton malentendu le plus bête",
                "Avoue ton moment le plus ignorant",
                "Dis ce dont tu as le plus peur",
                "Partage ton rêve le plus bizarre",
                "Avoue quand tu as été le plus paresseux",
                "Dis ton moment le plus avide",
                "Partage ton achat impulsif le plus gros",
                "Avoue quand tu as été le plus crédule",
                "Dis ton comportement le plus superstitieux",
                "Partage ta pensée la plus bizarre",
                "Avoue quand tu as été le plus mesquin",

                // Défis sociaux
                "Envoie un message à ton crush",
                "Dis au groupe l'un de tes défauts",
                "Avoue une erreur que tu as commise",
                "Dis à haute voix l'un de tes souhaits",
                "Partage l'une de tes histoires embarrassantes",
                "Exprime hardiment une opinion",
                "Dis une habitude que tu veux le plus changer",
                "Excuse-toi auprès de tout le monde pour quelque chose que tu as mal fait",
                "Envoie un message à un ami que tu n'as pas contacté depuis longtemps",
                "Publie une confession sur les réseaux sociaux (peut être une blague)",
                "Complimente publiquement quelqu'un que tu ne complimenterais pas habituellement",
                "Excuse-toi auprès de quelqu'un que tu as déjà mal compris",
                "Avoue publiquement l'un de tes préjugés",
                "Partage un rêve que tu veux réaliser mais que tu as peur de dire",
                "Exprime ta gratitude à quelqu'un",
                "Partage publiquement ton vrai opinion sur quelque chose",
                "Avoue qui tu envies le plus",
                "Partage la compétence que tu veux le plus apprendre",
                "Complimente publiquement quelqu'un que tu as l'habitude de critiquer",
                "Montre du respect à ton concurrent",

                // Défis créatifs
                "Imite quelqu'un ici dans ses mouvements et son discours",
                "Avoue ta première impression sur quelqu'un",
                "Mets en scène ton souvenir le plus maladroit",
                "Montre aux autres la photo la plus drôle sur ton téléphone",
                "Appelle tes parents et dis-leur quelque chose que tu ne leur as jamais dit",
                "Défie-toi à faire quelque chose que tu ne tuerais pas normalement (en sécurité)",
                "Essaie un nouveau style personnel",
                "Apprends une compétence que tu penses être difficile",
                "Exprime ton admiration à quelqu'un que tu respectes",
                "Termine une tâche que tu repousses",
                "Essaie une nourriture que tu n'aimes pas",
                "Apprends une forme d'art dans laquelle tu n'es pas bon",
                "Défie ta zone de confort (dans les limites de la sécurité)",
                "Fais quelque chose de bien pour l'environnement",
                "Aide quelqu'un que tu n'aideras pas habituellement",
                "Apprends à exprimer des sentiments que tu ne dis normalement pas",
                "Essaie un mode de vie complètement nouveau",
                "Termine un objectif que tu pensais impossible",
                "Développe une nouvelle habitude positive",
                "Fais quelque chose pour faire du monde un meilleur endroit"
            ]
        }
    }
};

// Éléments DOM
const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

// Sélectionner la difficulté
function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;

    // Afficher la difficulté sélectionnée
    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">Mode Soft</span>';
        questionText.textContent = '👇 Choisissez votre mode ! Contenu familial pour tous les âges 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">Mode Épicé</span>';
        questionText.textContent = '👇 Choisissez votre mode ! Contenu plus intense pour adultes 👇';
    }
    selectedDifficulty.style.display = 'block';

    // Masquer les boutons de difficulté, afficher les boutons vérité/défi
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';

    // Afficher le bouton de retour
    backButton.style.display = 'inline-block';
}

// Sélectionner vérité ou défi
function selectChoice(type) {
    gameData.currentType = type;

    // Obtenir une question aléatoire
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Afficher la question
    questionText.textContent = randomQuestion;

    // Afficher le type sélectionné
    if (type === 'truth') {
        selectedType.innerHTML = '<span class="badge bg-info">Vérité</span>';
    } else {
        selectedType.innerHTML = '<span class="badge bg-danger">Défi</span>';
    }
    selectedType.style.display = 'block';

    // Afficher les boutons de contrôle
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';

    // Masquer les boutons de choix
    choiceButtons.style.display = 'none';
}

// Question suivante
function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion;
    }
}

// Retour à la sélection de difficulté
function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 Choisissez le mode de jeu ! 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

// Réinitialiser le jeu
function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = '👇 Choisissez le mode de jeu ! 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
