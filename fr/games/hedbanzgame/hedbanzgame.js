// Game words - 1000+ French words
const WORDS = [
    // Animaux (80)
    "Lion", "Tigre", "Éléphant", "Girafe", "Zèbre", "Singe", "Manchot", "Aigle", "Dauphin", "Requin",
    "Chien", "Chat", "Ours", "Lapin", "Renard", "Hibou", "Perroquet", "Serpent", "Baleine", "Papillon",
    "Fourmi", "Abeille", "Araignée", "Grenouille", "Poisson", "Tortue", "Crocodile", "Cochon", "Vache", "Cheval",
    "Poule", "Canard", "Cygne", "Paon", "Flamant", "Mouette", "Faucon", "Colombe", "Corbeau", "Corneille",
    "Moineau", "Rouge-gorge", "Passereau", "Colibri", "Pic", "Corbeau", "Corneille", "Alligator", "Lézard", "Iguane",
    "Python", "Cobra", "Tortue", "Salamandre", "Crapaud", "Saumon", "Truite", "Thon", "Poisson rouge", "Hippocampe",
    "Poulpe", "Calmar", "Méduse", "Étoile de mer", "Crabe", "Homard", "Crevette", "Léopard", "Jaguar", "Puma",
    "Puma", "Hyène", "Loup", "Coyote", "Chacal", "Blaireau", "Loutre", "Castor", "Écureuil", "Tamia",
    "Hamster", "Souris", "Rat", "Hérisson", "Porc-épic", "Mouffette", "Raton laveur", "Kangourou", "Koala", "Panda",

    // Personnages célèbres (50)
    "Zinédine Zidane", "Thierry Henry", "Michel Platini", "Gérard Depardieu", "Marion Cotillard", "Brigitte Bardot", "Jeanne Moreau", "Audrey Hepburn",
    "Claudia Cardinale", "Alain Delon", "Jean-Paul Belmondo", "Sophie Marceau", "Catherine Deneuve", "Isabelle Adjani", "Serge Gainsbourg",
    "Claudine Longet", "Yves Saint Laurent", "Coco Chanel", "Jean Cocteau", "Édith Piaf", "Charles Aznavour", "Jacques Brel",
    "Françoise Hardy", "Brigitte Foley", "Laetitia Casta", "Eva Green", "Louis Vuitton", "Carine Roitfeld", "Naomi Campbell",
    "Philippe Coutinho", "Karim Benzema", "Grégory Gribaudo", "Yannick Noah", "René Lacoste", "Jules Rimet", "Henri Delaunay",
    "David Guetta", "Daft Punk", "Stromae", "Gérard Hernandez", "Mario Balotelli", "Didier Drogba", "Patrick Vieira",

    // Objets (100)
    "Bicyclette", "Téléphone", "Télévision", "Ordinateur", "Tasse à café", "Lit", "Porte", "Fenêtre", "Chaise", "Table",
    "Lampe", "Horloge", "Livre", "Stylo", "Chapeau", "Chaussure", "Cuillère", "Couteau", "Assiette", "Montre",
    "Voiture", "Bus", "Train", "Avion", "Bateau", "Maison", "Bâtiment", "Château", "Tour", "Pont",
    "Canapé", "Sofa", "Bureau", "Armoire", "Étagère", "Réfrigérateur", "Four", "Micro-ondes", "Machine à laver", "Téléphone",
    "Tablette", "Ordinateur portable", "Moniteur", "Clavier", "Souris", "Écouteurs", "Haut-parleur", "Caméra", "Miroir", "Tableau",
    "Peinture", "Vase", "Pot", "Poêle", "Bouilloire", "Mixeur", "Grille-pain", "Toilettes", "Baignoire", "Douche",
    "Sac", "Sac à dos", "Portefeuille", "Bourse", "Ceinture", "Écharpe", "Gant", "Chaussette", "Chemise", "Pantalon",
    "Robe", "Veste", "Manteau", "Pull", "T-shirt", "Jeans", "Shorts", "Bottes", "Sandales", "Pantoufles",
    "Collier", "Bague", "Bracelet", "Boucles d'oreilles", "Lunettes", "Lunettes de soleil", "Bicyclette", "Motocyclette", "Skateboard", "Trottinette",
    "Ballon", "Ballon de football", "Ballon de basket", "Ballon de soccer", "Ballon de tennis", "Ballon de golf", "Ballon de bowling", "Frisbee", "Boomerang", "Cerf-volant",

    // Professions (60)
    "Médecin", "Professeur", "Chef cuisinier", "Policier", "Pompier", "Pilote", "Infirmière", "Astronaute", "Artiste", "Musicien",
    "Avocat", "Juge", "Comptable", "Ingénieur", "Architecte", "Électricien", "Plombier", "Charpentier", "Mécanicien", "Fermier",
    "Scientifique", "Mathématicien", "Chirurgien", "Dentiste", "Vétérinaire", "Photographe", "Cadreur", "Acteur", "Chanteur", "Danseur",
    "Comédien", "Réalisateur", "Producteur", "Journaliste", "Reporter", "Rédacteur", "Écrivain", "Romancier", "Poète", "Peintre",
    "Sculpteur", "Musicien", "Compositeur", "Chef d'orchestre", "DJ", "Entraîneur", "Instructeur", "Athlète", "Arbitre", "Arbitre",
    "Chef", "Cuisinier", "Boulanger", "Barman", "Serveur", "Serveuse", "Hôte", "Agent de sécurité", "Concierge", "Jardinier",
    "Fleuriste", "Coiffeur", "Maquilleur", "Styliste", "Décorateur", "Architecte", "Maire", "Gouverneur", "Président", "Homme d'affaires",

    // Activités (80)
    "Nager", "Courir", "Danser", "Chanter", "Cuisiner", "Lire", "Dessiner", "Écrire", "Dormir", "Faire du ski",
    "Randonnée", "Escalade", "Sauter", "Marcher", "Jogging", "S'étirer", "Exercer", "Levée de poids", "Boxe", "Yoga",
    "Méditation", "Respiration", "Penser", "Rêver", "Rire", "Pleurer", "Sourire", "Froncer les sourcils", "Parler", "Écouter",
    "Chuchoter", "Crier", "Crier", "Siffler", "Fredonnement", "Jouer de la guitare", "Jouer du piano", "Jouer de la batterie", "Peinture", "Sculpture",
    "Esquisse", "Cuisine", "Cuisson", "Grillage", "Friture", "Ébullition", "Nettoyage", "Lavage", "Séchage", "Repassage",
    "Pliage", "Travail", "Étude", "Apprentissage", "Enseignement", "Shopping", "Achat", "Vente", "Voyage", "Exploration",
    "Manger", "Boire", "Lancer", "Attraper", "Coup de pied", "Pousser", "Tirer", "Conduire", "Voler", "Surf",
    "Construction", "Création", "Fabrication", "Réparation", "Dépannage", "Ouverture", "Fermeture", "Assis", "Debout", "Couché",

    // Sports (70)
    "Football", "Basketball", "Tennis", "Soccer", "Baseball", "Hockey", "Golf", "Bowling", "Boxe", "Surf",
    "Natation", "Plongée", "Polo aquatique", "Aviron", "Kayak", "Cyclisme", "VTT", "Ski", "Snowboard", "Patinage sur glace",
    "Badminton", "Ping-pong", "Squash", "Handball", "Crosse", "Cricket", "Softball", "Football américain", "Rugby", "Volley-ball",
    "Beach-volley", "Netball", "Dodgeball", "Athlétisme", "Sprint", "Course de distance", "Saut en hauteur", "Saut en longueur", "Saut à la perche", "Lancer du poids",
    "Gymnastique", "Escalade", "Lutte", "Karaté", "Taekwondo", "Judo", "Jiu-jitsu", "Arts martiaux", "Course de chevaux", "Équitation",
    "Patinage à roulettes", "Skateboard", "Parkour", "Tir à l'arc", "Escrime", "Kendo", "Sumo", "Haltérophilie", "Kickboxing", "Arts martiaux mixtes",
    "Triathlon", "Biathlon", "CrossFit", "Pilates", "Zumba", "Aérobic", "Danse", "Cheerleading", "Patinage artistique", "Patinage de vitesse",

    // Films (70)
    "Spider-Man", "Superman", "Batman", "Harry Potter", "Frozen", "Titanic", "Le Roi Lion", "Les Vengeurs", "Shrek", "Toy Story",
    "Le Monde de Nemo", "Vice-Versa", "Coco", "Vaiana", "Raiponce", "Brave", "Cendrillon", "La Belle au bois dormant", "Blanche-Neige", "Pinocchio",
    "Dumbo", "Bambi", "Le Livre de la Jungle", "Aladdin", "Mulan", "Pocahontas", "Hercule", "Le Bossu de Notre-Dame", "Tarzan", "La Petite Sirène",
    "La Belle et la Bête", "Enchantée", "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Ant-Man", "Doctor Strange", "Black Panther",
    "Wonder Woman", "Aquaman", "Flash", "Le Parrain", "Scarface", "Pulp Fiction", "Inception", "Interstellar", "Avatar", "Avatar 2",
    "Jurassic Park", "Jurassic World", "Le Sixième Sens", "Split", "Get Out", "Scream", "Halloween", "Les Dents de la Mer", "The Ring", "Insidious",
    "The Dark Knight", "The Dark Knight Rises", "The Matrix", "The Matrix Reloaded", "Star Wars", "Rogue One", "The Mandalorian", "Le Seigneur des Anneaux", "Le Hobbit", "Conjuring",

    // Émissions de télévision (40)
    "Game of Thrones", "Breaking Bad", "The Office", "Friends", "The Crown", "Stranger Things", "The Mandalorian", "House of the Dragon",
    "Dexter", "Les Sopranos", "Mad Men", "Downtown Abbey", "Peaky Blinders", "Ozark", "Bodyguard", "Line of Duty",
    "Schitt's Creek", "Community", "Parks and Recreation", "Brooklyn Nine-Nine", "The Good Place", "Veep", "Russian Doll", "Fleabag",
    "Squid Game", "Money Heist", "Dark", "The Last of Us", "Chernobyl", "Mindhunter", "Tiger King", "Bridgerton",
    "Succession", "The Rings of Power", "House of Dragons", "The Witcher", "Castlevania", "Arcane", "Cyberpunk", "The Boys",

    // Nourriture (100)
    "Pizza", "Hamburger", "Sushi", "Crème glacée", "Chocolat", "Pomme", "Banane", "Gâteau", "Café", "Pâtes",
    "Steak", "Poulet", "Poisson", "Saumon", "Pain", "Bagel", "Beignet", "Muffin", "Biscuit", "Brownie",
    "Tarte", "Tourte", "Pâtisserie", "Croissant", "Sandwich", "Hot-dog", "Taco", "Burrito", "Enchilada", "Quesadilla",
    "Nachos", "Salsa", "Guacamole", "Soupe", "Ragoût", "Curry", "Piment", "Ramen", "Nouilles", "Boulettes",
    "Salade", "Épinard", "Laitue", "Tomate", "Concombre", "Carotte", "Brocoli", "Pomme de terre", "Maïs", "Fromage",
    "Lait", "Yaourt", "Beurre", "Œuf", "Jambon", "Bacon", "Saucisse", "Crevette", "Homard", "Crabe",
    "Huître", "Moule", "Riz", "Haricots", "Pois", "Lentille", "Houmous", "Cacahuète", "Amande", "Noix",
    "Orange", "Fraise", "Myrtille", "Framboise", "Pastèque", "Ananas", "Mangue", "Pêche", "Noix de coco", "Avocat",
    "Cornichon", "Olive", "Ail", "Oignon", "Poivre", "Sel", "Sucre", "Miel", "Confiture", "Beurre d'arachide",
    "Mayo", "Ketchup", "Moutarde", "Sauce piquante", "Sauce soja", "Vinaigre", "Huile", "Citron", "Citron vert", "Gingembre",

    // Pays (60)
    "France", "Japon", "Égypte", "Brésil", "Canada", "Australie", "Inde", "Allemagne", "Mexique", "Italie",
    "Espagne", "Portugal", "Grèce", "Turquie", "Russie", "Chine", "Corée du Sud", "Vietnam", "Thaïlande", "Philippines",
    "Indonésie", "Malaisie", "Singapour", "Hong Kong", "Taïwan", "Pakistan", "Bangladesh", "Sri Lanka", "Népal", "Bhoutan",
    "Iran", "Irak", "Arabie Saoudite", "Émirats Arabes Unis", "Israël", "Liban", "Syrie", "Jordanie", "Soudan", "Libye",
    "Tunisie", "Maroc", "Algérie", "Kenya", "Tanzanie", "Ouganda", "Afrique du Sud", "Zimbabwe", "Nigéria", "Ghana",
    "États-Unis", "Royaume-Uni", "Irlande", "Écosse", "Pays de Galles", "Suède", "Norvège", "Finlande", "Danemark", "Pologne",
    "République Tchèque", "Hongrie", "Roumanie", "Bulgarie", "Croatie", "Serbie", "Autriche", "Suisse", "Belgique", "Pays-Bas",

    // Émotions (60)
    "Heureux", "Triste", "Fâché", "Surpris", "Effrayé", "Excité", "Confus", "Fier", "Nerveux", "Détendu",
    "Anxieux", "Stressé", "Déprimé", "Optimiste", "Pessimiste", "Jaloux", "Envieux", "Reconnaissant", "Honteux", "Embarrassé",
    "Confiant", "Insécurisé", "Brave", "Lâche", "Déterminé", "Motivé", "Découragé", "Frustré", "Énervé", "Irrité",
    "Amusé", "Divertissement", "Ennuyé", "Intéressé", "Curieux", "Dégoûté", "Amoureux", "Affection", "Indifférent", "Passionné",
    "Apathique", "Énergique", "Léthargique", "Calme", "Agité", "Paisible", "Turbulent", "Joyeux", "Ravi", "Satisfait",
    "Content", "Satisfait", "Mécontent", "Insatisfait", "Agité", "Serein", "Aimant", "Haineux", "Affectueux", "Froid",

    // Parties du corps (50)
    "Tête", "Cerveau", "Yeux", "Nez", "Bouche", "Dents", "Langue", "Oreilles", "Cheveux", "Visage",
    "Cou", "Épaules", "Bras", "Coudes", "Mains", "Doigts", "Pouces", "Poitrine", "Estomac", "Dos",
    "Taille", "Hanches", "Jambes", "Genoux", "Chevilles", "Pieds", "Orteils", "Talons", "Tibias", "Cuisses",
    "Cœur", "Poumons", "Foie", "Reins", "Peau", "Os", "Muscles", "Veines", "Artères", "Nerfs",
    "Ongles", "Sourcils", "Cils", "Lèvres", "Menton", "Joues", "Front", "Paumes", "Poignets", "Côte",

    // Boissons (40)
    "Eau", "Café", "Thé", "Jus", "Lait", "Limonade", "Bière", "Vin", "Whisky", "Vodka",
    "Rhum", "Tequila", "Gin", "Cognac", "Champagne", "Prosecco", "Limonade", "Thé glacé", "Smoothie", "Milkshake",
    "Café au lait", "Cappuccino", "Espresso", "Americano", "Mocha", "Macchiato", "Plat blanc", "Thé vert", "Thé noir", "Thé oolong",
    "Thé aux herbes", "Thé à la camomille", "Thé à la menthe", "Thé au gingembre", "Eau de coco", "Boisson énergisante", "Boisson pour sportifs", "Punch", "Cidre", "Kombucha",

    // Vêtements (50)
    "Chemise", "T-shirt", "Pantalon", "Jean", "Short", "Jupe", "Robe", "Veste", "Manteau", "Pull",
    "Hoodie", "Gilet", "Costume", "Cravate", "Ceinture", "Chapeau", "Casquette", "Bonnet", "Écharpe", "Gant",
    "Chaussette", "Sous-vêtements", "Soutien-gorge", "Boxer", "Pyjama", "Maillot de bain", "Bikini", "Short de bain", "Bottes", "Chaussures",
    "Baskets", "Sandales", "Pantoufles", "Talons", "Ballerines", "Mocassins", "Tongs", "Sabots", "Oxford", "Escarpins",
    "Collier", "Bague", "Bracelet", "Boucles d'oreilles", "Pendentif", "Broche", "Montre", "Lunettes", "Lunettes de soleil", "Masque",

    // Météo (40)
    "Ensoleillé", "Pluvieux", "Nuageux", "Neigeux", "Venteux", "Orageux", "Brumeux", "Grêle", "Neige fondue", "Tonnerre",
    "Éclair", "Arc-en-ciel", "Tornado", "Ouragan", "Blizzard", "Sécheresse", "Vague de chaleur", "Froid", "Givre", "Rosée",
    "Humidité", "Brise", "Tempête", "Typhon", "Cyclone", "Mousson", "Avalanche", "Tsunami", "Tremblement de terre", "Volcan",
    "Pluie", "Neige", "Glace", "Vent", "Nuage", "Soleil", "Lune", "Étoile", "Météore", "Comète",

    // Musique (50)
    "Rock", "Pop", "Hip Hop", "Rap", "Pays", "Blues", "Jazz", "Classique", "Électronique", "Danse",
    "Reggae", "Métal", "Punk", "Folk", "Gospel", "Opéra", "R&B", "Soul", "Indie", "Alternative",
    "Grunge", "Techno", "House", "Trance", "Disco", "Funk", "Swing", "Salsa", "Tango", "Valse",
    "Ballet", "Claquettes", "Jazz Dance", "Contemporain", "Breakdancing", "Comédie musicale", "Karaoké", "Concerts", "Festival", "Bande",
    "Orchestre", "Chœur", "Guitare", "Piano", "Batterie", "Violon", "Trompette", "Saxophone", "Flûte", "Harmonica",

    // École/Apprentissage (40)
    "École", "Université", "Collège", "Étudiant", "Professeur", "Salle de classe", "Bureau", "Tableau noir", "Tableau blanc", "Crayon",
    "Gomme", "Livre", "Cahier", "Sac à dos", "Casier", "Couloir", "Cafétéria", "Cour de récréation", "Gymnase", "Bibliothèque",
    "Labo informatique", "Labo scientifique", "Cours d'art", "Cours de musique", "Mathématiques", "Anglais", "Histoire", "Géographie", "Science", "Physique",
    "Chimie", "Biologie", "Littérature", "Philosophie", "Psychologie", "Sociologie", "Économie", "Affaires", "Droit", "Médecine",

    // Animaux (simple, continué)
    "Petit lapin", "Chiot", "Chaton", "Agneau", "Poussin", "Caneton", "Porcelet", "Veau", "Pouliche", "Poney",
    "Chèvre", "Mouton", "Vache", "Taureau", "Bœuf", "Âne", "Mulet", "Chameau", "Lama", "Alpaga",
    "Cerf", "Orignal", "Orignal", "Renne", "Antilope", "Buffle", "Bison", "Yak", "Zèbre", "Girafe",

    // Objets simples (continué)
    "Jouet", "Poupée", "Figurine d'action", "Puzzle", "Jeu", "Carte", "Dé", "Bille", "Yo-Yo", "Cerf-volant",
    "Vélo", "Tricycle", "Trottinette", "Skateboard", "Roller", "Rollers", "Luge", "Traîneau", "Planche de surf", "Skateboard",
    "Seau", "Pelle", "Râteau", "Balai", "Serpillière", "Serviette", "Couverture", "Oreiller", "Coussin", "Matelas",
    "Corde", "Ficelle", "Fil", "Chaîne", "Crochet", "Clou", "Vis", "Boulon", "Écrou", "Clé",

    // Actions (simple, continué)
    "Sauter", "Sauter à la corde", "Sautiller", "Ramper", "Escalader", "Glisser", "Se balancer", "Rouler", "Tourner", "Tordre",
    "Plier", "S'étirer", "Atteindre", "Saisir", "Tenir", "Lâcher", "Lancer", "Attraper", "Donner un coup de pied", "Pousser",
    "Tirer", "Traîner", "Soulever", "Abaisser", "Soulever", "Laisser tomber", "Rebondir", "Rouler", "Glisser", "Glisser",
    "Agiter", "Pointer", "Applaudir", "Claquer des doigts", "Piétiner", "Tapoter", "Frapper", "Frotter", "Chatouiller", "Gratter",

    // Vacances (30)
    "Noël", "Halloween", "Pâques", "Saint-Valentin", "Thanksgiving", "Jour de l'Indépendance", "Jour de l'An", "Hanoukka", "Diwali", "Aïd",
    "Fête des Mères", "Fête des Pères", "Anniversaire", "Anniversaire", "Mariage", "Gâteau de mariage", "Graduation", "Bal de fin d'études", "Carnaval", "Défilé",
    "Festival", "Concert", "Journée du sport", "Journée d'école", "Jour de travail", "Vacances", "Jour de congé", "Week-end", "Jour de semaine", "Ce soir",

    // Jouets & Jeux (40)
    "Lego", "Blocs de construction", "Poupée", "Figurine d'action", "Ourson en peluche", "Peluche", "Puzzle", "Jeu de société", "Jeu de cartes", "Jeu vidéo",
    "Console de jeu", "PlayStation", "Xbox", "Nintendo Switch", "Jeu informatique", "Jeu mobile", "Jeu d'arcade", "Jeu de casino", "Dé", "Carte",
    "Marqueur", "Crayon de couleur", "Crayon de couleur", "Peinture", "Pinceau", "Palette", "Toile", "Carnet de croquis", "Tableau blanc", "Autocollant",
    "Ballon", "Confetti", "Ruban", "Bannière", "Décoration", "Chapeau de fête", "Sifflet de fête", "Masque", "Costume", "Maquillage",

    // Transport (30)
    "Voiture", "Camion", "Bus", "Fourgonnette", "Train", "Métro", "Tramway", "Taxi", "Vélo", "Moto",
    "Avion", "Hélicoptère", "Ballon d'air chaud", "Voilier", "Bateau rapide", "Yacht", "Sous-marin", "Fusée", "Vaisseau spatial", "Aéroglisseur",
    "Skateboard", "Roller", "Trottinette", "Segway", "Cheval", "Chameau", "Éléphant", "Bateau", "Canoë", "Kayak",

    // Cuisine (30)
    "Frigo", "Congélateur", "Cuisinière", "Four", "Micro-ondes", "Lave-vaisselle", "Évier", "Comptoir", "Table", "Chaise",
    "Couteau", "Fourchette", "Cuillère", "Assiette", "Bol", "Tasse", "Verre", "Tasse", "Pot", "Poêle",
    "Spatule", "Cuillère en bois", "Fouet", "Mixeur", "Grille-pain", "Bouilloire", "Cafetière", "Ouvre-boîte", "Éplucheur", "Râpe",

    // Chambre (25)
    "Lit", "Oreiller", "Couverture", "Drap", "Courtepointe", "Matelas", "Tête de lit", "Table de nuit", "Commode", "Placard",
    "Garde-robe", "Armoire", "Étagère", "Miroir", "Lampe", "Réveil", "Fenêtre", "Rideau", "Stores", "Porte",
    "Tapis", "Tapis", "Chaise", "Bureau", "Tiroir", "Porte-manteau",

    // Salle de bain (20)
    "Toilettes", "Baignoire", "Douche", "Lavabo", "Robinet", "Miroir", "Armoire de toilette", "Porte-serviettes", "Distributeur de savon", "Porte-brosse à dents",
    "Poubelle", "Papier hygiénique", "Tapis de bain", "Rideau de douche", "Brosse à dents", "Pâte dentifrice", "Peigne", "Brosse", "Balance", "Savon",

    // Verbes simples (40)
    "Manger", "Boire", "Dormir", "Se réveiller", "Courir", "Marcher", "S'asseoir", "Se lever", "Sauter", "Danser",
    "Chanter", "Crier", "Chuchoter", "Rire", "Pleurer", "Sourire", "Froncer les sourcils", "Cligner des yeux", "Hocher la tête", "Secouer",
    "Agiter", "Montrer du doigt", "Applaudir", "Claquer des doigts", "Donner un coup de pied", "Frapper", "Lancer", "Attraper", "Tenir", "Laisser tomber",
    "Prendre", "Prendre", "Donner", "Obtenir", "Faire", "Faire", "Aller", "Venir", "Rester", "Partir",

    // Adjectifs simples (40)
    "Grand", "Petit", "Haut", "Court", "Long", "Large", "Étroit", "Épais", "Mince", "Rapide",
    "Lent", "Chaud", "Froid", "Tiède", "Cool", "Doux", "Dur", "Rugueux", "Lisse", "Mouillé",
    "Sec", "Propre", "Sale", "Brillant", "Sombre", "Clair", "Lourd", "Léger", "Fort", "Faible",
    "Bon", "Mauvais", "Juste", "Faux", "Vrai", "Faux", "Nouveau", "Vieux", "Jeune", "Ancien",

    // Couleurs (20)
    "Rouge", "Bleu", "Jaune", "Vert", "Orange", "Violet", "Rose", "Marron", "Noir", "Blanc",
    "Gris", "Gris", "Argent", "Or", "Beige", "Turquoise", "Cyan", "Magenta", "Citron vert", "Marine",

    // Nombres (20)
    "Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix",
    "Onze", "Douze", "Treize", "Quatorze", "Quinze", "Vingt", "Trente", "Cent", "Mille", "Million",

    // Formes (15)
    "Cercle", "Carré", "Triangle", "Rectangle", "Pentagone", "Hexagone", "Octogone", "Ovale", "Diamant", "Étoile",
    "Cœur", "Cube", "Sphère", "Cône", "Cylindre", "Pyramide", "Prisme",

    // Mois (12)
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",

    // Jours (7)
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche",

    // Saisons (4)
    "Printemps", "Été", "Automne", "Hiver",
];

// Game state
let state = {
    players: 2,
    duration: 60,
    currentPlayer: 1,
    scores: {},
    currentWord: null,
    usedWords: [],
    currentScore: 0,
    timeLeft: 60,
    timerInterval: null,
    isPlaying: false
};

// DOM elements
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const playerCountSelect = document.getElementById('playerCount');
const durationSelect = document.getElementById('gameDuration');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const gameTimer = document.getElementById('timer');
const wordDisplay = document.getElementById('wordDisplay');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const scoreDisplay = document.getElementById('playerScore');
const nextPlayerBtn = document.getElementById('readyBtn');
const restartBtn = document.getElementById('playAgainBtn');

// Initialize game
startBtn.addEventListener('click', () => {
    const playerCount = parseInt(playerCountSelect.value);
    const duration = parseInt(durationSelect.value);

    state.players = playerCount;
    state.duration = duration;
    state.timeLeft = duration;

    // Initialize scores
    state.scores = {};
    for (let i = 1; i <= playerCount; i++) {
        state.scores[i] = 0;
    }

    // Shuffle words
    state.usedWords = [];

    // Show ready screen
    setupScreen.style.display = 'none';
    readyScreen.style.display = 'block';
    updateReadyScreen();
});

function updateReadyScreen() {
    document.getElementById('nextPlayerNum').textContent = state.currentPlayer;
    nextPlayerBtn.addEventListener('click', startGame, { once: true });
}

function startGame() {
    state.isPlaying = true;
    readyScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
    state.currentScore = 0;
    state.timeLeft = state.duration;

    updateDisplay();
    startTimer();
}

function getNextWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    return word;
}

function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        gameTimer.textContent = state.timeLeft;

        if (state.timeLeft === 0) {
            endTurn();
        }
    }, 1000);
}

function handleCorrect() {
    if (!state.isPlaying) return;

    state.currentScore++;
    state.scores[state.currentPlayer]++;
    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
    scoreDisplay.textContent = state.currentScore;
}

function handleSkip() {
    if (!state.isPlaying) return;

    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
}

function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentPlayer < state.players) {
        state.currentPlayer++;
        gameScreen.style.display = 'none';
        readyScreen.style.display = 'block';
        updateReadyScreen();
    } else {
        showResults();
    }
}

function updateDisplay() {
    currentPlayerDisplay.textContent = `Joueur ${state.currentPlayer}`;
    scoreDisplay.textContent = state.currentScore;
}

function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    const scoresContainer = document.getElementById('finalScores');
    scoresContainer.innerHTML = '';

    for (let i = 1; i <= state.players; i++) {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.innerHTML = `Joueur ${i} <strong>${state.scores[i]}</strong>`;
        scoresContainer.appendChild(row);
    }

    restartBtn.addEventListener('click', () => {
        state.currentPlayer = 1;
        setupScreen.style.display = 'block';
        resultsScreen.style.display = 'none';
    });
}

// Event listeners
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});

skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleSkip();
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
        });
    });
});
