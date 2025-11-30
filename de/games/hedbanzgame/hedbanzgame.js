// Game words - 1000+ simple, common German words
const WORDS = [
    // Tiere (80)
    "Löwe", "Tiger", "Elefant", "Giraffe", "Zebra", "Affe", "Pinguin", "Adler", "Delfin", "Hai",
    "Hund", "Katze", "Bär", "Kaninchen", "Fuchs", "Eule", "Papagei", "Schlange", "Wal", "Schmetterling",
    "Ameise", "Biene", "Spinne", "Frosch", "Fisch", "Schildkröte", "Krokodil", "Schwein", "Kuh", "Pferd",
    "Huhn", "Ente", "Schwan", "Pfau", "Flamingo", "Möwe", "Habicht", "Taube", "Rabe", "Krähe",
    "Spatz", "Rotkehlchen", "Laubsänger", "Kolibri", "Specht", "Rabe", "Krähe", "Alligator", "Echse", "Leguan",
    "Python", "Kobra", "Schildkröte", "Molch", "Kröte", "Lachs", "Forelle", "Thunfisch", "Goldfisch", "Seepferdchen",
    "Krake", "Tintenfisch", "Qualle", "Seestern", "Krabbe", "Hummer", "Garnele", "Leopard", "Jaguar", "Puma",
    "Puma", "Hyäne", "Wolf", "Kojote", "Schakal", "Dachs", "Otter", "Biber", "Eichhörnchen", "Streifenhörnchen",
    "Hamster", "Maus", "Ratte", "Igel", "Stachelschwein", "Stinktier", "Waschbär", "Känguru", "Koala", "Panda",

    // Berühmte Menschen (50)
    "Michael Schumacher", "Boris Becker", "Steffi Graf", "Dirk Nowitzki", "Bastian Schweinsteiger", "Thomas Müller", "Mats Hummels", "Mario Gomez",
    "Ralf Schumacher", "Sebastian Vettel", "Michael Ballack", "Jürgen Klinsmann", "Mesut Özil", "Mario Gomez", "Toni Kroos", "Julian Draxler",
    "Angela Merkel", "Helmut Kohl", "Willy Brandt", "Konrad Adenauer", "Franz Beckenbauer", "Pelé", "Ronaldo", "Ronaldinho",
    "Christoph Waltz", "Daniel Brühl", "Diane Kruger", "Franka Potente", "Tom Schilling", "Samuel Finzi", "Jella Haase", "Florian David Fitz",
    "Jan Josef Liefers", "Armin Rohde", "Katharina Böhm", "Devrim Lingnau", "Edgar Selge", "Axel Stein", "Michael Kessler",
    "Heino", "Andrea Berg", "Thomas Häßler", "Marco Bode", "Andreas Möller", "Rudi Völler", "Oliver Kahn",

    // Objekte (100)
    "Fahrrad", "Telefon", "Fernseher", "Computer", "Tasse", "Bett", "Tür", "Fenster", "Stuhl", "Tisch",
    "Lampe", "Uhr", "Buch", "Stift", "Hut", "Schuh", "Löffel", "Messer", "Teller", "Armbanduhr",
    "Auto", "Bus", "Zug", "Flugzeug", "Boot", "Haus", "Gebäude", "Schloss", "Turm", "Brücke",
    "Sofa", "Couch", "Schreibtisch", "Schrank", "Regal", "Kühlschrank", "Ofen", "Mikrowelle", "Waschmaschine", "Telefon",
    "Tablet", "Laptop", "Monitor", "Tastatur", "Maus", "Kopfhörer", "Lautsprecher", "Kamera", "Spiegel", "Bild",
    "Gemälde", "Vase", "Topf", "Pfanne", "Kessel", "Mixer", "Toaster", "Toilette", "Badewanne", "Dusche",
    "Tasche", "Rucksack", "Geldbeutel", "Börse", "Gürtel", "Schal", "Handschuh", "Socke", "Hemd", "Hose",
    "Kleid", "Jacke", "Mantel", "Pullover", "T-Shirt", "Jeans", "Shorts", "Stiefel", "Sandalen", "Hausschuhe",
    "Halskette", "Ring", "Armband", "Ohrringe", "Brille", "Sonnenbrille", "Fahrrad", "Motorrad", "Skateboard", "Tretroller",
    "Ball", "Fußball", "Basketball", "Fußball", "Tennisball", "Golfball", "Bowlingkugel", "Frisbee", "Bumerang", "Drachen",

    // Berufe (60)
    "Arzt", "Lehrer", "Koch", "Polizist", "Feuerwehrmann", "Pilot", "Krankenschwester", "Astronaut", "Künstler", "Musiker",
    "Anwalt", "Richter", "Buchhalter", "Ingenieur", "Architekt", "Elektriker", "Klempner", "Zimmermann", "Mechaniker", "Bauer",
    "Wissenschaftler", "Mathematiker", "Chirurg", "Zahnarzt", "Tierarzt", "Fotograf", "Kameramann", "Schauspieler", "Sänger", "Tänzer",
    "Komiker", "Regisseur", "Produzent", "Journalist", "Reporter", "Redakteur", "Schriftsteller", "Romanautor", "Dichter", "Maler",
    "Bildhauer", "Musiker", "Komponist", "Dirigent", "DJ", "Trainer", "Trainerin", "Athlet", "Schiedsrichter", "Schiedsrichter",
    "Koch", "Köchin", "Bäcker", "Barkeeper", "Kellner", "Kellnerin", "Gastgeber", "Sicherheitsbeamter", "Hausmeister", "Gärtner",
    "Florist", "Friseur", "Maskenbildner", "Modedesigner", "Innenarchitekt", "Architekt", "Bürgermeister", "Gouverneur", "Präsident", "Geschäftsleute",

    // Aktivitäten (80)
    "Schwimmen", "Laufen", "Tanzen", "Singen", "Kochen", "Lesen", "Zeichnen", "Schreiben", "Schlafen", "Skifahren",
    "Wandern", "Klettern", "Springen", "Gehen", "Joggen", "Dehnen", "Trainieren", "Gewichtheben", "Boxen", "Yoga",
    "Meditieren", "Atmen", "Denken", "Träumen", "Lachen", "Weinen", "Lächeln", "Stirnrunzeln", "Reden", "Zuhören",
    "Flüstern", "Schreien", "Schreien", "Pfeifen", "Summen", "Gitarre spielen", "Klavier spielen", "Schlagzeug spielen", "Malen", "Bildhauerei",
    "Skizze", "Kochen", "Backen", "Grillen", "Braten", "Kochen", "Putzen", "Waschen", "Trocknen", "Bügeln",
    "Falten", "Arbeiten", "Studieren", "Lernen", "Lehren", "Einkaufen", "Kaufen", "Verkaufen", "Reisen", "Erforschen",
    "Essen", "Trinken", "Werfen", "Fangen", "Treten", "Drücken", "Ziehen", "Fahren", "Fliegen", "Surfen",
    "Bauen", "Kreieren", "Machen", "Reparieren", "Beheben", "Öffnen", "Schließen", "Sitzen", "Stehen", "Liegen",

    // Sport (70)
    "Fußball", "Basketball", "Tennis", "Fußball", "Baseball", "Eishockey", "Golf", "Bowling", "Boxen", "Surfen",
    "Schwimmen", "Tauchen", "Wasserball", "Rudern", "Kajakfahren", "Radfahren", "Mountainbiking", "Skifahren", "Snowboarden", "Eisschlittschuhlaufen",
    "Badminton", "Tischtennis", "Squash", "Handball", "Lacrosse", "Kricket", "Softball", "American Football", "Rugby", "Volleyball",
    "Beachvolleyball", "Netzball", "Dodgeball", "Leichtathletik", "Sprinten", "Langstreckenlauf", "Hochsprung", "Weitsprung", "Stabhochsprung", "Kugelstoßen",
    "Turnen", "Klettern", "Ringen", "Karate", "Taekwondo", "Judo", "Jiu-Jitsu", "Kampfsport", "Pferderennen", "Reiten",
    "Rollschuhlaufen", "Skateboarden", "Parkour", "Bogenschießen", "Fechten", "Kendo", "Sumo", "Gewichtheben", "Kickboxen", "Mixed Martial Arts",
    "Triathlon", "Biathlon", "CrossFit", "Pilates", "Zumba", "Aerobic", "Tanz", "Cheerleading", "Eiskunstlauf", "Kurzstreckenlauf",

    // Filme (70)
    "Spiderman", "Superman", "Batman", "Harry Potter", "Frozen", "Titanic", "Der König der Löwen", "Die Rächer", "Shrek", "Toy Story",
    "Findet Nemo", "Inside Out", "Coco", "Moana", "Rapunzel", "Merida", "Cinderella", "Dornröschen", "Schneewittchen", "Pinocchio",
    "Dumbo", "Bambi", "Das Dschungelbuch", "Aladdin", "Mulan", "Pocahontas", "Herkules", "Der Glöckner von Notre Dame", "Tarzan", "Die kleine Meerjungfrau",
    "Die Schöne und das Biest", "Verzaubert", "Iron Man", "Captain America", "Thor", "Der Hulk", "Black Widow", "Ant-Man", "Doctor Strange", "Black Panther",
    "Wonder Woman", "Aquaman", "Flash", "Der Pate", "Scarface", "Pulp Fiction", "Inception", "Interstellar", "Avatar", "Avatar 2",
    "Jurassic Park", "Jurassic World", "The Sixth Sense", "Split", "Get Out", "Scream", "Halloween", "Der Weiße Hai", "The Ring", "Insidious",
    "The Dark Knight", "The Dark Knight Rises", "The Matrix", "The Matrix Reloaded", "Star Wars", "Rogue One", "The Mandalorian", "Der Herr der Ringe", "Der Hobbit", "Conjuring",

    // Fernsehsendungen (40)
    "Game of Thrones", "Breaking Bad", "The Office", "Friends", "The Crown", "Stranger Things", "The Mandalorian", "House of the Dragon",
    "Dexter", "Die Sopranos", "Mad Men", "Downtown Abbey", "Peaky Blinders", "Ozark", "Bodyguard", "Line of Duty",
    "Schitt's Creek", "Community", "Parks and Recreation", "Brooklyn Nine-Nine", "The Good Place", "Veep", "Russian Doll", "Fleabag",
    "Squid Game", "Money Heist", "Dark", "The Last of Us", "Chernobyl", "Mindhunter", "Tiger King", "Bridgerton",
    "Succession", "The Rings of Power", "House of Dragons", "The Witcher", "Castlevania", "Arcane", "Cyberpunk", "The Boys",

    // Essen (100)
    "Pizza", "Burger", "Sushi", "Eiscreme", "Schokolade", "Apfel", "Banane", "Kuchen", "Kaffee", "Pasta",
    "Steak", "Hähnchen", "Fisch", "Lachs", "Brot", "Bagel", "Donut", "Muffin", "Keks", "Brownie",
    "Kuchen", "Torte", "Blätterteig", "Croissant", "Sandwich", "Hot Dog", "Taco", "Burrito", "Enchilada", "Quesadilla",
    "Nachos", "Salsa", "Guacamole", "Suppe", "Eintopf", "Curry", "Chili", "Ramen", "Nudeln", "Dumplings",
    "Salat", "Spinat", "Kopfsalat", "Tomate", "Gurke", "Karotte", "Brokkoli", "Kartoffel", "Mais", "Käse",
    "Milch", "Joghurt", "Butter", "Ei", "Schinken", "Speck", "Wurst", "Garnele", "Hummer", "Krabbe",
    "Auster", "Muschel", "Reis", "Bohnen", "Erbsen", "Linse", "Hummus", "Erdnuss", "Mandel", "Walnuss",
    "Orange", "Erdbeere", "Blaubeere", "Himbeere", "Wassermelone", "Ananas", "Mango", "Pfirsich", "Kokosnuss", "Avocado",
    "Gurke", "Olive", "Knoblauch", "Zwiebel", "Pfeffer", "Salz", "Zucker", "Honig", "Marmelade", "Erdnussbutter",
    "Mayo", "Ketchup", "Senf", "Hot Sauce", "Sojasauce", "Essig", "Öl", "Zitrone", "Limone", "Ingwer",

    // Länder (60)
    "Frankreich", "Japan", "Ägypten", "Brasilien", "Kanada", "Australien", "Indien", "Deutschland", "Mexiko", "Italien",
    "Spanien", "Portugal", "Griechenland", "Türkei", "Russland", "China", "Südkorea", "Vietnam", "Thailand", "Philippinen",
    "Indonesien", "Malaysia", "Singapur", "Hongkong", "Taiwan", "Pakistan", "Bangladesch", "Sri Lanka", "Nepal", "Bhutan",
    "Iran", "Irak", "Saudi-Arabien", "Vereinigte Arabische Emirate", "Israel", "Libanon", "Syrien", "Jordanien", "Sudan", "Libyen",
    "Tunesien", "Marokko", "Algerien", "Kenia", "Tansania", "Uganda", "Südafrika", "Simbabwe", "Nigeria", "Ghana",
    "Vereinigte Staaten", "Vereinigtes Königreich", "Irland", "Schottland", "Wales", "Schweden", "Norwegen", "Finnland", "Dänemark", "Polen",
    "Tschechien", "Ungarn", "Rumänien", "Bulgarien", "Kroatien", "Serbien", "Österreich", "Schweiz", "Belgien", "Niederlande",

    // Emotionen (60)
    "Glücklich", "Traurig", "Wütend", "Überrascht", "Verängstigt", "Aufgeregt", "Verwirrt", "Stolz", "Nervös", "Entspannt",
    "Angespannt", "Gestresst", "Deprimiert", "Optimistisch", "Pessimistisch", "Eifersüchtig", "Neidisch", "Dankbar", "Schäm", "Verlegen",
    "Selbstbewusst", "Unsicher", "Mutig", "Feige", "Entschlossen", "Motiviert", "Entmutigt", "Frustriert", "Gelangweilt", "Gereizt",
    "Amüsiert", "Unterhalten", "Gelangweilt", "Interessiert", "Neugierig", "Angewidert", "Verliebt", "Zuneigung", "Gleichgültig", "Leidenschaftlich",
    "Apathisch", "Energisch", "Träge", "Ruhig", "Aufgeregt", "Friedlich", "Turbulent", "Freudig", "Entzückt", "Erfreut",
    "Zufrieden", "Befriedigt", "Unzufrieden", "Unzufrieden", "Rastlos", "Gelassen", "Liebevoll", "Hasserfüllt", "Zärtlich", "Kalt",

    // Körperteile (50)
    "Kopf", "Gehirn", "Augen", "Nase", "Mund", "Zähne", "Zunge", "Ohren", "Haare", "Gesicht",
    "Hals", "Schultern", "Arme", "Ellbogen", "Hände", "Finger", "Daumen", "Brust", "Magen", "Rücken",
    "Taille", "Hüften", "Beine", "Knie", "Knöchel", "Füße", "Zehen", "Fersen", "Schienbeine", "Oberschenkel",
    "Herz", "Lungen", "Leber", "Nieren", "Haut", "Knochen", "Muskeln", "Venen", "Arterien", "Nerven",
    "Nägel", "Augenbrauen", "Wimpern", "Lippen", "Kinn", "Wangen", "Stirn", "Handflächen", "Handgelenke", "Rippe",

    // Getränke (40)
    "Wasser", "Kaffee", "Tee", "Saft", "Milch", "Limonade", "Bier", "Wein", "Whiskey", "Wodka",
    "Rum", "Tequila", "Gin", "Cognac", "Champagner", "Prosecco", "Limonade", "Eistee", "Smoothie", "Milchshake",
    "Latte", "Cappuccino", "Espresso", "Americano", "Mocha", "Macchiato", "Flat White", "Grüner Tee", "Schwarzer Tee", "Oolong Tee",
    "Kräutertee", "Kamillenee", "Pfefferminztee", "Ingwertee", "Kokoswasser", "Energy Drink", "Sportgetränk", "Punsch", "Apfelmost", "Kombucha",

    // Kleidung (50)
    "Hemd", "T-Shirt", "Hose", "Jeans", "Shorts", "Rock", "Kleid", "Jacke", "Mantel", "Pullover",
    "Hoodie", "Weste", "Anzug", "Krawatte", "Gürtel", "Hut", "Kappe", "Beanie", "Schal", "Handschuh",
    "Socke", "Unterwäsche", "BH", "Boxershorts", "Pyjama", "Badeanzug", "Bikini", "Badeshorts", "Stiefel", "Schuhe",
    "Turnschuhe", "Sandalen", "Hausschuhe", "Absätze", "Ballerinas", "Mokassins", "Flip-Flops", "Holzschuhe", "Oxfords", "Pumps",
    "Halskette", "Ring", "Armband", "Ohrringe", "Anhänger", "Brosche", "Armbanduhr", "Brille", "Sonnenbrille", "Maske",

    // Wetter (40)
    "Sonnig", "Regnerisch", "Bewölkt", "Verschneit", "Windig", "Stürmisch", "Nebelig", "Hagel", "Schneeregen", "Donner",
    "Blitz", "Regenbogen", "Tornado", "Hurrikan", "Blizzard", "Dürre", "Hitzewelle", "Kälte", "Frost", "Tau",
    "Luftfeuchtigkeit", "Brise", "Sturm", "Taifun", "Zyklon", "Monsun", "Lawine", "Tsunami", "Erdbeben", "Vulkan",
    "Regen", "Schnee", "Eis", "Wind", "Wolke", "Sonne", "Mond", "Stern", "Meteor", "Komet",

    // Musik (50)
    "Rock", "Pop", "Hip Hop", "Rap", "Country", "Blues", "Jazz", "Klassisch", "Elektronisch", "Tanz",
    "Reggae", "Metall", "Punk", "Folk", "Gospel", "Oper", "R&B", "Soul", "Indie", "Alternative",
    "Grunge", "Techno", "House", "Trance", "Disco", "Funk", "Swing", "Salsa", "Tango", "Walzer",
    "Ballett", "Stepptanz", "Jazztanz", "Zeitgenössisch", "Breakdancing", "Musicaltheater", "Karaoke", "Konzerte", "Festival", "Band",
    "Orchester", "Chor", "Gitarre", "Klavier", "Schlagzeug", "Violine", "Trompete", "Saxophon", "Flöte", "Mundharmonika",

    // Schule/Lernen (40)
    "Schule", "Universität", "Hochschule", "Student", "Lehrer", "Klassenzimmer", "Schreibtisch", "Tafel", "Whiteboard", "Bleistift",
    "Radiergummi", "Buch", "Notizbuch", "Rucksack", "Spint", "Flur", "Cafeteria", "Spielplatz", "Turnhalle", "Bibliothek",
    "Computerlabor", "Wissenschaftslabor", "Kunstunterricht", "Musikunterricht", "Mathematik", "Englisch", "Geschichte", "Geographie", "Naturwissenschaft", "Physik",
    "Chemie", "Biologie", "Literatur", "Philosophie", "Psychologie", "Soziologie", "Wirtschaft", "Geschäft", "Recht", "Medizin",

    // Tiere (einfach, fortgesetzt)
    "Häschen", "Welpe", "Kätzchen", "Lamm", "Küken", "Entenküken", "Ferkel", "Kalb", "Fohlen", "Pony",
    "Ziege", "Schaf", "Kuh", "Stier", "Ochse", "Esel", "Maultier", "Kamel", "Lama", "Alpaka",
    "Hirsch", "Elch", "Elch", "Rentier", "Antilope", "Büffel", "Bison", "Yak", "Zebra", "Giraffe",

    // Einfache Objekte (fortgesetzt)
    "Spielzeug", "Puppe", "Actionfigur", "Puzzle", "Spiel", "Karte", "Würfel", "Murmel", "Jo-Jo", "Drachen",
    "Fahrrad", "Dreirad", "Tretroller", "Skateboard", "Rollschuhe", "Inline-Skates", "Schlitten", "Rodel", "Surfbrett", "Skateboard",
    "Eimer", "Schaufel", "Rechen", "Besen", "Mopp", "Handtuch", "Decke", "Kissen", "Kissen", "Matratze",
    "Seil", "Schnur", "Draht", "Kette", "Haken", "Nagel", "Schraube", "Bolzen", "Mutter", "Schraubenschlüssel",

    // Handlungen (einfach, fortgesetzt)
    "Springen", "Hüpfen", "Hüpfen", "Kriechen", "Klettern", "Rutschen", "Schwingen", "Rollen", "Drehen", "Verdrehen",
    "Beugen", "Dehnen", "Erreichen", "Greifen", "Halten", "Loslassen", "Werfen", "Fangen", "Treten", "Drücken",
    "Ziehen", "Schleifen", "Heben", "Senken", "Heben", "Fallen lassen", "Abprallen", "Rollen", "Rutschen", "Gleiten",
    "Welle", "Punkt", "Klatschen", "Schnippen", "Stampfen", "Tippen", "Klopfen", "Reiben", "Kitzeln", "Kratzen",

    // Feiertage (30)
    "Weihnachten", "Halloween", "Ostern", "Valentinstag", "Danksagung", "Unabhängigkeitstag", "Neujahr", "Chanukka", "Diwali", "Eid",
    "Muttertag", "Vatertag", "Geburtstag", "Jahrestag", "Hochzeit", "Hochzeitstorte", "Schulabschluss", "Abitur", "Karneval", "Parade",
    "Festival", "Konzert", "Sporttag", "Schultag", "Arbeitstag", "Urlaub", "Feiertag", "Wochenende", "Wochentag", "Heute Abend",

    // Spielzeug & Spiele (40)
    "Lego", "Bausteine", "Puppe", "Actionfigur", "Teddybär", "Kuscheltier", "Puzzle", "Brettspiel", "Kartenspiel", "Videospiel",
    "Spielkonsole", "PlayStation", "Xbox", "Nintendo Switch", "Computerspiel", "Handyspiel", "Arcadespiel", "Casinospiel", "Würfel", "Karte",
    "Marker", "Buntstift", "Farbstift", "Farbe", "Pinsel", "Palette", "Leinwand", "Skizzenbuch", "Whiteboard", "Aufkleber",
    "Ballon", "Konfetti", "Streamer", "Banner", "Dekoration", "Partyhut", "Partypfeife", "Maske", "Kostüm", "Makeup",

    // Transport (30)
    "Auto", "Lastwagen", "Bus", "Lieferwagen", "Zug", "U-Bahn", "Straßenbahn", "Taxi", "Fahrrad", "Motorrad",
    "Flugzeug", "Hubschrauber", "Heißluftballon", "Segelboot", "Schnellboot", "Jacht", "U-Boot", "Rakete", "Raumschiff", "Luftkissenfahrzeug",
    "Skateboard", "Rollschuhe", "Tretroller", "Segway", "Pferd", "Kamel", "Elefant", "Boot", "Kanu", "Kajak",

    // Küche (30)
    "Kühlschrank", "Gefrierschrank", "Herd", "Ofen", "Mikrowelle", "Geschirrspüler", "Spülbecken", "Arbeitsplatte", "Tisch", "Stuhl",
    "Messer", "Gabel", "Löffel", "Teller", "Schüssel", "Tasse", "Glas", "Becher", "Topf", "Pfanne",
    "Spatel", "Holzlöffel", "Schneebesen", "Mixer", "Toaster", "Kessel", "Kaffeemaschine", "Dosenöffner", "Gemüseschäler", "Reibe",

    // Schlafzimmer (25)
    "Bett", "Kissen", "Decke", "Betttuch", "Bettdecke", "Matratze", "Kopfteil", "Nachttisch", "Kommode", "Kleiderschrank",
    "Garderobe", "Schrank", "Regal", "Spiegel", "Lampe", "Wecker", "Fenster", "Vorhang", "Jalousien", "Tür",
    "Teppich", "Teppich", "Stuhl", "Schreibtisch", "Schublade", "Kleiderständer",

    // Badezimmer (20)
    "Toilette", "Badewanne", "Dusche", "Waschbecken", "Wasserhahn", "Spiegel", "Medizinschrank", "Handtuchständer", "Seifenspender", "Zahnbürstenhalter",
    "Papierkorb", "Toilettenpapier", "Badematte", "Duschvorhang", "Zahnbürste", "Zahnpasta", "Kamm", "Bürste", "Waage", "Seife",

    // Einfache Verben (40)
    "Essen", "Trinken", "Schlafen", "Aufwachen", "Laufen", "Gehen", "Sitzen", "Stehen", "Springen", "Tanzen",
    "Singen", "Schreien", "Flüstern", "Lachen", "Weinen", "Lächeln", "Stirnrunzeln", "Blinzeln", "Nicken", "Schütteln",
    "Winken", "Klatschen", "Schnippen", "Treten", "Schlagen", "Werfen", "Fangen", "Halten", "Fallen lassen", "Holen",
    "Einlegen", "Nehmen", "Geben", "Bekommen", "Machen", "Tun", "Gehen", "Kommen", "Bleiben", "Gehen",

    // Einfache Adjektive (40)
    "Groß", "Klein", "Groß", "Klein", "Lang", "Breit", "Schmal", "Dick", "Dünn", "Schnell",
    "Langsam", "Heiß", "Kalt", "Warm", "Kühl", "Weich", "Hart", "Rau", "Glatt", "Nass",
    "Trocken", "Sauber", "Schmutzig", "Hell", "Dunkel", "Helll", "Schwer", "Leicht", "Stark", "Schwach",
    "Gut", "Schlecht", "Richtig", "Falsch", "Wahr", "Falsch", "Neu", "Alt", "Jung", "Uralt",

    // Farben (20)
    "Rot", "Blau", "Gelb", "Grün", "Orange", "Lila", "Rosa", "Braun", "Schwarz", "Weiß",
    "Grau", "Grau", "Silber", "Gold", "Beige", "Türkis", "Cyan", "Magenta", "Limette", "Navy",

    // Zahlen (20)
    "Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn",
    "Elf", "Zwölf", "Dreizehn", "Vierzehn", "Fünfzehn", "Zwanzig", "Dreißig", "Hundert", "Tausend", "Million",

    // Formen (15)
    "Kreis", "Quadrat", "Dreieck", "Rechteck", "Pentagon", "Hexagon", "Achteck", "Oval", "Diamant", "Stern",
    "Herz", "Würfel", "Kugel", "Kegel", "Zylinder", "Pyramide", "Prisma",

    // Monate (12)
    "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",

    // Tage (7)
    "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag",

    // Jahreszeiten (4)
    "Frühling", "Sommer", "Herbst", "Winter",
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

// DOM
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const readyBtn = document.getElementById('readyBtn');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize scores
function initGame() {
    state.players = parseInt(document.getElementById('playerCount').value);
    state.duration = parseInt(document.getElementById('gameDuration').value);
    state.currentPlayer = 1;
    state.scores = {};
    state.usedWords = [];

    for (let i = 1; i <= state.players; i++) {
        state.scores[i] = 0;
    }

    showReadyScreen();
}

// Show ready screen for next player
function showReadyScreen() {
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'block';

    document.getElementById('readyPlayerNum').textContent = state.currentPlayer;
}

// Start a player's turn
function startTurn() {
    state.currentScore = 0;
    state.timeLeft = state.duration;
    state.isPlaying = true;

    readyScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    document.getElementById('currentPlayer').textContent = state.currentPlayer;
    document.getElementById('playerScore').textContent = state.currentScore;

    drawWord();
    startTimer();
}

// Draw a random word
function drawWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    state.currentWord = word;
    document.getElementById('wordDisplay').textContent = word;
}

// Start countdown timer
function startTimer() {
    clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('timer').textContent = state.timeLeft;

        if (state.timeLeft <= 0) {
            endTurn();
        }
    }, 1000);
}

// Handle correct answer
function handleCorrect() {
    state.currentScore++;
    state.scores[state.currentPlayer]++;
    document.getElementById('playerScore').textContent = state.currentScore;
    drawWord();
}

// Handle skip
function handleSkip() {
    drawWord();
}

// End current player's turn
function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentPlayer < state.players) {
        state.currentPlayer++;
        showReadyScreen();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    let html = '';
    const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);

    sorted.forEach(([player, score], index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        html += `<div class="score-row">${medal} Player ${player}: <strong>${score}</strong> points</div>`;
    });

    document.getElementById('finalScores').innerHTML = html;
}

// Event listeners
startBtn.addEventListener('click', initGame);
readyBtn.addEventListener('click', startTurn);
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});
skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleSkip();
});
playAgainBtn.addEventListener('click', () => {
    setupScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'none';
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
