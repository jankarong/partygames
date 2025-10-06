let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    selectedCategories: ['Essen & Trinken', 'Tiere', 'Gegenstände', 'Berufe & Rollen', 'Unterhaltung', 'Natur & Wetter'],
    premiumCategories: ['Lustig', 'Sport & Fitness', 'Technologie & Digital', 'Reisen & Orte', 'Beziehungen', 'Marken & Unternehmen', 'Historische Persönlichkeiten'],
    wordsByCategory: {
        'Essen & Trinken': [
            ['Pizza', 'Pasta'],
            ['Kaffee', 'Tee'],
            ['Cola', 'Fanta'],
            ['Apfel', 'Birne'],
            ['Schnitzel', 'Steak'],
            ['Brot', 'Brötchen'],
            ['Milch', 'Sahne'],
            ['Torte', 'Kuchen'],
            ['Wurst', 'Schinken'],
            ['Suppe', 'Salat'],
            ['Keks', 'Lebkuchen'],
            ['Espresso', 'Cappuccino'],
            ['Döner', 'Gyros'],
            ['Nudeln', 'Reis'],
            ['Käse', 'Butter'],
            ['Ramen', 'Udon'],
            ['Wasser', 'Sprudelwasser'],
            ['Hähnchen', 'Pute'],
            ['Banane', 'Ananas'],
            ['Joghurt', 'Quark'],
            ['Brezel', 'Laugenbrötchen'],
            ['Honig', 'Marmelade'],
            ['Schweinebraten', 'Rinderbraten'],
            ['Bier', 'Wein'],
            ['Müsli', 'Haferbrei'],
            ['Spaghetti', 'Linguine'],
            ['Spiegelei', 'Rührei'],
            ['Gurke', 'Tomate'],
            ['Schokolade', 'Pralinen'],
            ['Pommes', 'Kartoffelpuffer']
        ],
        'Tiere': [
            ['Katze', 'Hund'],
            ['Löwe', 'Tiger'],
            ['Welpe', 'Kätzchen'],
            ['Vogel', 'Fisch'],
            ['Kuh', 'Pferd'],
            ['Goldfisch', 'Koi'],
            ['Pfau', 'Truthahn'],
            ['Otter', 'Biber'],
            ['Maus', 'Ratte'],
            ['Ente', 'Gans'],
            ['Bär', 'Wolf'],
            ['Krabbe', 'Hummer'],
            ['Schlange', 'Eidechse'],
            ['Ziege', 'Schaf'],
            ['Adler', 'Falke'],
            ['Frosch', 'Kröte'],
            ['Affe', 'Gorilla'],
            ['Reh', 'Hirsch'],
            ['Schmetterling', 'Motte'],
            ['Biene', 'Wespe'],
            ['Schwein', 'Wildschwein'],
            ['Huhn', 'Hahn'],
            ['Elefant', 'Nashorn'],
            ['Zebra', 'Esel'],
            ['Wal', 'Delfin'],
            ['Hai', 'Rochen'],
            ['Schildkröte', 'Landschildkröte'],
            ['Eule', 'Rabe'],
            ['Fuchs', 'Waschbär'],
            ['Eichhörnchen', 'Streifenhörnchen']
        ],
        'Gegenstände': [
            ['Handy', 'Tablet'],
            ['Stuhl', 'Sofa'],
            ['Buch', 'Zeitschrift'],
            ['Kugelschreiber', 'Bleistift'],
            ['Auto', 'Bus'],
            ['Uhr', 'Wecker'],
            ['Tasche', 'Rucksack'],
            ['Tasse', 'Glas'],
            ['Schlüssel', 'Schloss'],
            ['Schuhe', 'Stiefel'],
            ['Mütze', 'Kappe'],
            ['Kamera', 'Smartphone'],
            ['Lampe', 'Kerze'],
            ['Spiegel', 'Fenster'],
            ['Teller', 'Schüssel'],
            ['Löffel', 'Gabel'],
            ['Handtuch', 'Waschlappen'],
            ['Kissen', 'Decke'],
            ['Fernbedienung', 'Controller'],
            ['Geldbeutel', 'Portemonnaie'],
            ['Fahrrad', 'Motorrad'],
            ['Computer', 'Laptop'],
            ['Fernseher', 'Monitor'],
            ['Kühlschrank', 'Gefrierschrank'],
            ['Mikrowelle', 'Backofen'],
            ['Bürste', 'Kamm'],
            ['Messer', 'Schere'],
            ['Regenschirm', 'Regenmantel'],
            ['Flasche', 'Dose'],
            ['Karton', 'Tüte']
        ],
        'Berufe & Rollen': [
            ['Lehrer', 'Schüler'],
            ['Arzt', 'Krankenschwester'],
            ['Koch', 'Kellner'],
            ['Polizist', 'Wachmann'],
            ['Fahrer', 'Pilot'],
            ['Sänger', 'Tänzer'],
            ['Schriftsteller', 'Redakteur'],
            ['Bauer', 'Gärtner'],
            ['Künstler', 'Designer'],
            ['Richter', 'Anwalt'],
            ['Banker', 'Kassierer'],
            ['Schauspieler', 'Regisseur'],
            ['Mechaniker', 'Ingenieur'],
            ['Manager', 'Chef'],
            ['Sachbearbeiter', 'Sekretär'],
            ['Soldat', 'Hauptmann'],
            ['Zahnarzt', 'Therapeut'],
            ['Friseur', 'Stylist'],
            ['Briefträger', 'Zusteller'],
            ['Reinigungskraft', 'Hausmeister'],
            ['Bibliothekar', 'Buchhalter'],
            ['Fotograf', 'Model'],
            ['Verkäufer', 'Kunde'],
            ['Bauarbeiter', 'Architekt'],
            ['Wissenschaftler', 'Forscher'],
            ['Musiker', 'Komponist'],
            ['Journalist', 'Reporter'],
            ['Buchhalter', 'Wirtschaftsprüfer'],
            ['Übersetzer', 'Dolmetscher'],
            ['Trainer', 'Coach']
        ],
        'Unterhaltung': [
            ['Film', 'Serie'],
            ['Musik', 'Lied'],
            ['Spiel', 'Sport'],
            ['Party', 'Tanz'],
            ['Buch', 'Geschichte'],
            ['Theater', 'Kino'],
            ['Konzert', 'Show'],
            ['Komödie', 'Drama'],
            ['Magie', 'Trick'],
            ['Cartoon', 'Anime'],
            ['Festival', 'Karneval'],
            ['Quiz', 'Wettbewerb'],
            ['Hobby', 'Aktivität'],
            ['Scherz', 'Streich'],
            ['Aufführung', 'Akt'],
            ['Radio', 'Podcast'],
            ['Karaoke', 'Singen'],
            ['Schach', 'Dame'],
            ['Puzzle', 'Rätsel'],
            ['Rennen', 'Laufen'],
            ['Schwimmen', 'Tauchen'],
            ['Bowling', 'Golf'],
            ['Tennis', 'Badminton'],
            ['Basketball', 'Fußball'],
            ['Baseball', 'Handball'],
            ['Malen', 'Zeichnen'],
            ['Kochen', 'Backen'],
            ['Lesen', 'Schreiben'],
            ['Einkaufen', 'Bummeln'],
            ['Reisen', 'Wandern']
        ],
        'Natur & Wetter': [
            ['Sonne', 'Mond'],
            ['Regen', 'Schnee'],
            ['Baum', 'Blume'],
            ['Berg', 'Hügel'],
            ['Ozean', 'See'],
            ['Wind', 'Brise'],
            ['Wolke', 'Himmel'],
            ['Fluss', 'Bach'],
            ['Strand', 'Wüste'],
            ['Wald', 'Garten'],
            ['Felsen', 'Stein'],
            ['Feuer', 'Eis'],
            ['Stern', 'Planet'],
            ['Tal', 'Schlucht'],
            ['Insel', 'Küste'],
            ['Donner', 'Blitz'],
            ['Nebel', 'Dunst'],
            ['Sonnenuntergang', 'Sonnenaufgang'],
            ['Frühling', 'Sommer'],
            ['Winter', 'Herbst'],
            ['Gras', 'Moos'],
            ['Blatt', 'Zweig'],
            ['Teich', 'Tümpel'],
            ['Feld', 'Wiese'],
            ['Höhle', 'Tunnel'],
            ['Klippe', 'Grat'],
            ['Vulkan', 'Erdbeben'],
            ['Gezeiten', 'Welle'],
            ['Sand', 'Erde'],
            ['Regenbogen', 'Polarlicht']
        ],
        'Lustig': [
            ['Banane', 'Gurke'],
            ['Bad', 'Dusche'],
            ['Bauch', 'Hintern'],
            ['Kuchen', 'Kacke'],
            ['Bonbon', 'Medizin'],
            ['Kondom', 'Luftballon'],
            ['Furz', 'Rülpser'],
            ['Finger', 'Zeh'],
            ['Haar', 'Fell'],
            ['Kuss', 'Ohrfeige'],
            ['Lippenstift', 'Buntstift'],
            ['Massage', 'Kitzeln'],
            ['Milch', 'Schweiß'],
            ['Schnurrbart', 'Augenbraue'],
            ['Brustwarze', 'Bauchnabel'],
            ['Nase', 'Po'],
            ['Pyjama', 'Unterwäsche'],
            ['Slip', 'Shorts'],
            ['Kissen', 'Brust'],
            ['Seife', 'Shampoo'],
            ['Socken', 'Handschuhe'],
            ['Pullover', 'BH'],
            ['Klopapier', 'Serviette'],
            ['Zahnbürste', 'Haarbürste'],
            ['Zahnpasta', 'Creme'],
            ['Unterhose', 'Bikini'],
            ['Lecken', 'Lutschen'],
            ['Kitzeln', 'Stupsen'],
            ['Spritzen', 'Sprühen'],
            ['Drücken', 'Kneifen'],
            ['Pupsen', 'Rülpsen'],
            ['Schnüffeln', 'Riechen'],
            ['Sabbern', 'Spucken'],
            ['Kratzen', 'Jucken'],
            ['Niesen', 'Husten'],
            ['Gähnen', 'Schnarchen'],
            ['Schwitzen', 'Stinken'],
            ['Pinkeln', 'Kacken'],
            ['Popel', 'Rotz'],
            ['Zunge', 'Speichel'],
            ['Achselhöhle', 'Bauchnabel'],
            ['Warze', 'Pickel'],
            ['Fußschweiß', 'Körpergeruch'],
            ['Mundgeruch', 'Achselgeruch'],
            ['Blähungen', 'Durchfall'],
            ['Schluckauf', 'Niesen'],
            ['Schmatzen', 'Schlürfen'],
            ['Rauschen', 'Gluckern'],
            ['Schlürfen', 'Schmatzen'],
            ['Furzen', 'Pupsen']
        ],
        'Sport & Fitness': [
            ['Yoga', 'Pilates'],
            ['Marathon', 'Sprint'],
            ['Fitnessstudio', 'Sportzentrum'],
            ['Laufband', 'Ergometer'],
            ['Hanteln', 'Langhantel'],
            ['Liegestütze', 'Sit-ups'],
            ['Proteinshake', 'Energydrink'],
            ['Yogamatte', 'Fitnessmatte'],
            ['Laufschuhe', 'Trainingsschuhe'],
            ['Kniebeuge', 'Ausfallschritt'],
            ['Cardio', 'Krafttraining'],
            ['Personal Trainer', 'Coach'],
            ['Dehnen', 'Aufwärmen'],
            ['Bankdrücken', 'Brustpresse'],
            ['Burpee', 'Sprungkniebeuge'],
            ['Unterarmstütz', 'Brücke'],
            ['Radfahren', 'Spinning'],
            ['CrossFit', 'Bootcamp'],
            ['Boxen', 'Kickboxen'],
            ['Seilspringen', 'Hüpfen'],
            ['Klimmzug', 'Chin-up'],
            ['Kreuzheben', 'Umsetzen'],
            ['Sport-BH', 'Tanktop'],
            ['Wasserflasche', 'Shaker'],
            ['Widerstandsband', 'Gewichtsgürtel'],
            ['Faszienrolle', 'Massageball'],
            ['Fitness-Tracker', 'Smartwatch'],
            ['Erholung', 'Ruhetag'],
            ['Muskelaufbau', 'Gewichtsabnahme'],
            ['Wiederholung', 'Satz'],
            ['Joggen', 'Laufen'],
            ['Bauch', 'Core'],
            ['Bizeps', 'Trizeps'],
            ['Rudern', 'Kajakfahren'],
            ['Klettern', 'Bouldern'],
            ['Zumba', 'Aerobic'],
            ['HIIT', 'Zirkeltraining'],
            ['Kettlebell', 'Medizinball'],
            ['Beinpresse', 'Wadenheben'],
            ['Schulterdrücken', 'Seitheben'],
            ['Crunch', 'Beinheben'],
            ['Bergsteiger', 'High Knees'],
            ['Wandsitz', 'Kniebeugehalten'],
            ['Rudergerät', 'Crosstrainer'],
            ['Proteinriegel', 'Energieriegel'],
            ['Pre-Workout', 'Post-Workout'],
            ['Massephase', 'Definitionsphase'],
            ['Sporttasche', 'Reisetasche'],
            ['Turnschuhe', 'Fußballschuhe'],
            ['Schweißband', 'Stirnband']
        ],
        'Technologie & Digital': [
            ['Smartphone', 'Tablet'],
            ['WLAN', 'Bluetooth'],
            ['App', 'Software'],
            ['E-Mail', 'SMS'],
            ['Soziale Medien', 'Plattform'],
            ['Streaming', 'Download'],
            ['Cloud-Speicher', 'Festplatte'],
            ['Passwort', 'PIN'],
            ['Screenshot', 'Bildschirmaufnahme'],
            ['Hashtag', 'Erwähnung'],
            ['Like', 'Teilen'],
            ['Follower', 'Abonnent'],
            ['Benachrichtigung', 'Alarm'],
            ['Emoji', 'Sticker'],
            ['Videoanruf', 'Sprachanruf'],
            ['Browser', 'Suchmaschine'],
            ['Website', 'Webseite'],
            ['Hochladen', 'Herunterladen'],
            ['Anmelden', 'Einloggen'],
            ['Aktualisieren', 'Upgrade'],
            ['Fehler', 'Bug'],
            ['KI', 'Maschinelles Lernen'],
            ['VR', 'AR'],
            ['Kryptowährung', 'Bitcoin'],
            ['NFT', 'Digitale Kunst'],
            ['Podcast', 'Hörbuch'],
            ['E-Book', 'PDF'],
            ['USB', 'SD-Karte'],
            ['Router', 'Modem'],
            ['Firewall', 'Antivirus'],
            ['Backup', 'Wiederherstellen'],
            ['Cache', 'Cookies'],
            ['Spam', 'Junk-Mail'],
            ['Ordner', 'Verzeichnis'],
            ['Datei', 'Dokument'],
            ['Kopieren', 'Einfügen'],
            ['Speichern', 'Exportieren'],
            ['Tastatur', 'Maus'],
            ['Touchscreen', 'Trackpad'],
            ['Ladegerät', 'Powerbank'],
            ['Laptop', 'Desktop'],
            ['SSD', 'HDD'],
            ['RAM', 'Speicher'],
            ['CPU', 'Prozessor'],
            ['GPU', 'Grafikkarte'],
            ['Pixel', 'Auflösung'],
            ['Bildwiederholrate', 'Framerate'],
            ['Bandbreite', 'Geschwindigkeit'],
            ['Server', 'Host'],
            ['Domain', 'URL']
        ],
        'Reisen & Orte': [
            ['Flughafen', 'Bahnhof'],
            ['Hotel', 'Hostel'],
            ['Reisepass', 'Visum'],
            ['Koffer', 'Rucksack'],
            ['Flug', 'Reise'],
            ['Tourist', 'Reisender'],
            ['Urlaub', 'Ferien'],
            ['Kreuzfahrt', 'Yacht'],
            ['Camping', 'Glamping'],
            ['Museum', 'Galerie'],
            ['Denkmal', 'Wahrzeichen'],
            ['Stadt', 'Dorf'],
            ['Hauptstadt', 'Metropole'],
            ['Restaurant', 'Café'],
            ['Bar', 'Kneipe'],
            ['Einkaufszentrum', 'Markt'],
            ['Park', 'Platz'],
            ['Zoo', 'Aquarium'],
            ['Tempel', 'Kirche'],
            ['Spielbank', 'Resort'],
            ['Strandresort', 'Skigebiet'],
            ['Souvenir', 'Geschenk'],
            ['Karte', 'GPS'],
            ['Reiseführer', 'Reisebüro'],
            ['Bordkarte', 'Ticket'],
            ['Einchecken', 'Auschecken'],
            ['Jetlag', 'Zeitzone'],
            ['Fremdwährung', 'Wechselkurs'],
            ['Duty-Free', 'Steuerrückerstattung'],
            ['Reiseroute', 'Reiseplan'],
            ['Taxi', 'Uber'],
            ['Bus', 'Straßenbahn'],
            ['U-Bahn', 'Metro'],
            ['Fähre', 'Boot'],
            ['Mietwagen', 'Leasing'],
            ['Motel', 'Gasthaus'],
            ['Airbnb', 'Homestay'],
            ['Boutique-Hotel', 'Luxushotel'],
            ['Buffet', 'À la Carte'],
            ['Straßenessen', 'Food Court'],
            ['Aussichtspunkt', 'Aussichtsplattform'],
            ['Strand', 'Küste'],
            ['Berg', 'Gipfel'],
            ['Tal', 'Schlucht'],
            ['Wüste', 'Oase'],
            ['Regenwald', 'Dschungel'],
            ['Kathedrale', 'Moschee'],
            ['Palast', 'Schloss'],
            ['Statue', 'Skulptur'],
            ['Brücke', 'Turm']
        ],
        'Beziehungen': [
            ['Freund', 'Freundin'],
            ['Ehemann', 'Ehefrau'],
            ['Dating', 'Kennenlernen'],
            ['Erstes Date', 'Blind Date'],
            ['Liebe', 'Schwarm'],
            ['Valentinstag', 'Jahrestag'],
            ['Antrag', 'Verlobung'],
            ['Hochzeit', 'Ehe'],
            ['Flitterwochen', 'Urlaub'],
            ['Romantik', 'Leidenschaft'],
            ['Flirten', 'Necken'],
            ['Trennung', 'Scheidung'],
            ['Ex', 'Ehemalige'],
            ['Single', 'Verfügbar'],
            ['Verpflichtung', 'Beziehung'],
            ['Vertrauen', 'Loyalität'],
            ['Eifersucht', 'Neid'],
            ['Streit', 'Kampf'],
            ['Versöhnung', 'Wiedergutmachung'],
            ['Seelenverwandte', 'Zwillingsflamme'],
            ['Friendzone', 'Abgelehnt'],
            ['Chemie', 'Verbindung'],
            ['Red Flag', 'Deal Breaker'],
            ['Toxisch', 'Ungesund'],
            ['Unterstützend', 'Fürsorglich'],
            ['Betrug', 'Affäre'],
            ['Fernbeziehung', 'Remote'],
            ['Exklusiv', 'Verbindlich'],
            ['Locker', 'Ernsthaft'],
            ['Zusammenziehen', 'Zusammenleben'],
            ['Partner', 'Lebensgefährte'],
            ['Schatz', 'Liebling'],
            ['Verlobter', 'Verlobte'],
            ['Frischvermählte', 'Gerade geheiratet'],
            ['Date-Nacht', 'Quality Time'],
            ['Kuss', 'Umarmung'],
            ['Händchen halten', 'Kuscheln'],
            ['Kompliment', 'Schmeichelei'],
            ['Geschenk', 'Überraschung'],
            ['Blumen', 'Pralinen'],
            ['Liebesbrief', 'Textnachricht'],
            ['Vermisse dich', 'Denke an dich'],
            ['Schmetterlinge', 'Herzklopfen'],
            ['Funke', 'Vibe'],
            ['Kennenlernphase', 'Kennenlernen'],
            ['Offiziell', 'Zusammen'],
            ['Offene Beziehung', 'Polyamorie'],
            ['Probetrennnung', 'Pause'],
            ['Abschluss', 'Weitermachen'],
            ['Übergangsbeziehung', 'Affäre']
        ],
        'Marken & Unternehmen': [
            ['BMW', 'Mercedes'],
            ['Aldi', 'Lidl'],
            ['Volkswagen', 'Audi'],
            ['Coca-Cola', 'Pepsi'],
            ['Edeka', 'Rewe'],
            ['Porsche', 'Ferrari'],
            ['Adidas', 'Nike'],
            ['Deutsche Bahn', 'FlixBus'],
            ['Telekom', 'Vodafone'],
            ['SAP', 'Siemens'],
            ['DHL', 'Hermes'],
            ['Lufthansa', 'Eurowings'],
            ['Commerzbank', 'Deutsche Bank'],
            ['Bosch', 'Miele'],
            ['Haribo', 'Katjes'],
            ['Ritter Sport', 'Milka'],
            ['Beck\'s', 'Warsteiner'],
            ['Nivea', 'Dove'],
            ['dm', 'Rossmann'],
            ['MediaMarkt', 'Saturn'],
            ['IKEA', 'XXXLutz'],
            ['C&A', 'H&M'],
            ['Zalando', 'About You'],
            ['Amazon', 'Otto'],
            ['Netflix', 'Disney+'],
            ['Spotify', 'Apple Music'],
            ['WhatsApp', 'Telegram'],
            ['Google', 'Bing'],
            ['Facebook', 'Instagram'],
            ['YouTube', 'TikTok'],
            ['Apple', 'Samsung'],
            ['iPhone', 'Android'],
            ['Windows', 'Mac'],
            ['PlayStation', 'Xbox'],
            ['Tchibo', 'Jacobs'],
            ['Maggi', 'Knorr'],
            ['Müller', 'Ehrmann'],
            ['Barilla', 'Buitoni'],
            ['Nutella', 'Nuss-Nougat-Creme'],
            ['Tempo', 'Zewa'],
            ['Persil', 'Ariel'],
            ['Pampers', 'Babylove'],
            ['Opel', 'Ford'],
            ['Birkenstock', 'Adilette'],
            ['Puma', 'Adidas'],
            ['Rolex', 'Omega'],
            ['Louis Vuitton', 'Gucci'],
            ['Chanel', 'Dior'],
            ['Hugo Boss', 'Armani'],
            ['Bayer', 'BASF'],
            ['Henkel', 'Beiersdorf']
        ],
        'Historische Persönlichkeiten': [
            ['Goethe', 'Schiller'],
            ['Beethoven', 'Mozart'],
            ['Einstein', 'Planck'],
            ['Bismarck', 'Kaiser Wilhelm'],
            ['Martin Luther', 'Calvin'],
            ['Bach', 'Händel'],
            ['Kant', 'Hegel'],
            ['Nietzsche', 'Schopenhauer'],
            ['Karl der Große', 'Friedrich der Große'],
            ['Konrad Adenauer', 'Willy Brandt'],
            ['Anne Frank', 'Sophie Scholl'],
            ['Helmut Kohl', 'Helmut Schmidt'],
            ['Karl Marx', 'Friedrich Engels'],
            ['Albrecht Dürer', 'Lucas Cranach'],
            ['Richard Wagner', 'Johannes Brahms'],
            ['Robert Koch', 'Rudolf Virchow'],
            ['Max Planck', 'Werner Heisenberg'],
            ['Marlene Dietrich', 'Romy Schneider'],
            ['Wilhelm Conrad Röntgen', 'Robert Bunsen'],
            ['Heinrich Heine', 'Theodor Fontane'],
            ['Thomas Mann', 'Hermann Hesse'],
            ['Franz Kafka', 'Stefan Zweig'],
            ['Bertolt Brecht', 'Günter Grass'],
            ['Rosa Luxemburg', 'Clara Zetkin'],
            ['Otto von Bismarck', 'Metternich'],
            ['Friedrich Schiller', 'Heinrich von Kleist'],
            ['Richard Strauss', 'Gustav Mahler'],
            ['Carl Friedrich Gauß', 'Gottfried Leibniz'],
            ['Alexander von Humboldt', 'Carl von Linné'],
            ['Johannes Gutenberg', 'Gottlieb Daimler'],
            ['Rudolf Diesel', 'Carl Benz'],
            ['Graf Zeppelin', 'Otto Lilienthal'],
            ['Ludwig II', 'Friedrich Barbarossa'],
            ['Maria Theresia', 'Katharina die Große'],
            ['Napoleon', 'Caesar'],
            ['Kleopatra', 'Nofretete'],
            ['Churchill', 'Roosevelt'],
            ['Gandhi', 'Mandela'],
            ['Leonardo da Vinci', 'Michelangelo'],
            ['Picasso', 'Van Gogh'],
            ['Marie Curie', 'Rosalind Franklin'],
            ['Jeanne d\'Arc', 'Boudicca'],
            ['Marco Polo', 'Kolumbus'],
            ['Darwin', 'Galileo'],
            ['Sokrates', 'Platon'],
            ['Alexander der Große', 'Dschingis Khan'],
            ['Königin Victoria', 'Queen Elizabeth'],
            ['Martin Luther King', 'Rosa Parks'],
            ['Mutter Teresa', 'Prinzessin Diana'],
            ['Sigmund Freud', 'Carl Jung'],
            ['Wilhelm Busch', 'Christian Morgenstern']
        ]
    }
};

// Check if user has premium access
async function isPremiumUser() {
    // Use the global authManager to check premium status
    if (window.authManager) {
        return await window.authManager.checkUserPremiumStatus();
    }
    return false;
}

async function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const undercoverCount = parseInt(document.getElementById('undercoverCount').value);
    const whiteCount = parseInt(document.getElementById('whiteCount').value);
    const useCustomWords = document.getElementById('useCustomWords').checked;
    const selectedCategory = document.getElementById('categorySelect').value;

    // Check if selected category requires premium (including 'all')
    if (selectedCategory === 'all' || gameState.premiumCategories.includes(selectedCategory)) {
        const isPremium = await isPremiumUser();
        if (!isPremium) {
            showPremiumModal();
            return;
        }
    }

    if (undercoverCount + whiteCount >= playerCount) {
        alert('Zu viele Undercover und Mr. White Spieler!');
        return;
    }

    // Initialize players
    gameState.players = Array(playerCount).fill('Civilian');

    // Set words based on custom input or random selection
    if (useCustomWords) {
        const civilianWord = document.getElementById('customCivilianWord').value.trim();
        const undercoverWord = document.getElementById('customUndercoverWord').value.trim();

        if (!civilianWord || !undercoverWord) {
            alert('Bitte gib beide Wörter ein (Zivilisten und Undercover)');
            return;
        }

        gameState.civilianWord = civilianWord;
        gameState.undercoverWord = undercoverWord;
    } else {
        let availableWordPairs = [];

        if (selectedCategory === 'all') {
            // Combine all categories
            Object.values(gameState.wordsByCategory).forEach(categoryPairs => {
                availableWordPairs = availableWordPairs.concat(categoryPairs);
            });
        } else {
            // Use specific category
            if (gameState.wordsByCategory[selectedCategory]) {
                availableWordPairs = gameState.wordsByCategory[selectedCategory];
            }
        }

        if (availableWordPairs.length === 0) {
            alert('Keine Wortpaare für die ausgewählte Kategorie verfügbar!');
            return;
        }

        const wordPair = availableWordPairs[Math.floor(Math.random() * availableWordPairs.length)];
        gameState.civilianWord = wordPair[0];
        gameState.undercoverWord = wordPair[1];
    }

    // Assign undercover players
    for (let i = 0; i < undercoverCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Undercover';
    }

    // Assign Mr. White players
    for (let i = 0; i < whiteCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Mr. White';
    }

    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('word-section').classList.remove('hidden');
    showWord();
}

function showWord() {
    const playerNum = gameState.currentPlayer + 1;
    document.getElementById('currentPlayer').textContent = playerNum;

    let word;
    const playerRole = gameState.players[gameState.currentPlayer];
    if (playerRole === 'Civilian') {
        word = gameState.civilianWord;
    } else if (playerRole === 'Undercover') {
        word = gameState.undercoverWord;
    } else { // Mr. White
        word = 'Blanke Karte';
    }

    document.getElementById('wordDisplay').textContent = word;

    // Reset flip card state
    const flipCard = document.querySelector('.flip-card');
    flipCard.classList.remove('flipped');

    // Remove previous event listeners
    const newFlipCard = flipCard.cloneNode(true);
    flipCard.parentNode.replaceChild(newFlipCard, flipCard);

    // Add new click event listener for simple toggle
    newFlipCard.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });

    // Always show "Next Player" button
    document.querySelector('button[onclick="nextPlayer()"]').style.display = 'inline-block';
}

function nextPlayer() {
    gameState.currentPlayer++;
    if (gameState.currentPlayer >= gameState.players.length) {
        startVoting();
        return;
    }
    showWord();
}

function startVoting() {
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    updatePlayerList();
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    gameState.players.forEach((role, index) => {
        const playerNum = index + 1;
        const isEliminated = gameState.eliminatedPlayers.has(index);
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${isEliminated ? 'eliminated' : ''}`;

        // Create radio button for non-eliminated players
        if (!isEliminated) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'playerVote';
            radio.value = index;
            radio.id = `player${playerNum}`;
            playerDiv.appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = `player${playerNum}`;
            label.textContent = ` Spieler ${playerNum}`;
            playerDiv.appendChild(label);
        } else {
            playerDiv.textContent = `Spieler ${playerNum} (Eliminiert)`;
        }

        playerList.appendChild(playerDiv);
    });
}

function eliminatePlayer() {
    const selectedPlayer = document.querySelector('input[name="playerVote"]:checked');
    if (!selectedPlayer) {
        alert('Bitte wähle einen Spieler zum Eliminieren aus!');
        return;
    }

    const eliminatedIndex = parseInt(selectedPlayer.value);
    gameState.eliminatedPlayers.add(eliminatedIndex);

    const remainingPlayers = gameState.players.filter((_, index) =>
        !gameState.eliminatedPlayers.has(index)
    ).length;

    const remainingCivilians = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === 'Civilian'
    ).length;

    const remainingUndercover = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === 'Undercover'
    ).length;

    updatePlayerList();

    // Check for winners
    if (remainingPlayers === 2) {
        // Hide eliminate button when game is over
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';

        if (remainingUndercover === 0) {
            alert('Zivilisten gewinnen! Alle Undercover-Spieler wurden eliminiert!');
        } else if (remainingUndercover === 2) {
            alert('Undercover-Spieler gewinnen! Die letzten beiden Spieler sind beide Undercover!');
        } else if (remainingUndercover === 1 && remainingCivilians === 1) {
            alert('Undercover-Spieler gewinnt! Sie haben es erfolgreich bis zum Ende geschafft!');
        }
    }
}

function resetGame() {
    const originalWordsByCategory = gameState.wordsByCategory;
    gameState = {
        players: [],
        currentPlayer: 0,
        civilianWord: '',
        undercoverWord: '',
        eliminatedPlayers: new Set(),
        selectedCategories: ['Essen & Trinken', 'Tiere', 'Gegenstände', 'Berufe & Rollen', 'Unterhaltung', 'Natur & Wetter'],
        premiumCategories: ['Lustig', 'Sport & Fitness', 'Technologie & Digital', 'Reisen & Orte', 'Beziehungen', 'Marken & Unternehmen', 'Historische Persönlichkeiten'],
        wordsByCategory: originalWordsByCategory
    };

    // Show eliminate button again when game resets
    document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'inline-block';

    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('setup-section').classList.remove('hidden');
}

// Show premium modal
function showPremiumModal() {
    document.getElementById('premium-modal').classList.remove('hidden');
}

// Close premium modal
function closePremiumModal() {
    document.getElementById('premium-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const useCustomWordsCheckbox = document.getElementById('useCustomWords');
    const customWordsSection = document.getElementById('customWordsSection');

    useCustomWordsCheckbox.addEventListener('change', function () {
        customWordsSection.style.display = this.checked ? 'block' : 'none';
    });
});
