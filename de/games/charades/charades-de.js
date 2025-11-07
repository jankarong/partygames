// Deutsche Wort-Datenbank
const wordDatabase = {
    animals: [
        "Elefant", "Giraffe", "Pinguin", "Känguru", "Löwe", "Tiger", "Affe",
        "Schmetterling", "Spinne", "Krokodil", "Delphin", "Adler", "Oktopus",
        "Panda", "Kaninchen", "Schlange", "Zebra", "Bär", "Eule", "Frosch",
        "Hund", "Katze", "Goldfisch", "Schildkröte", "Eichhörnchen", "Waschbär", "Fuchs",
        "Hippo", "Nashorn", "Hai", "Wal", "Seehund", "Koala", "Faultier"
    ],
    actions: [
        "Schwimmen", "Tanzen", "Skifahren", "Kochen", "Malen", "Laufen",
        "Gitarre spielen", "Lesen", "Schlafen", "Singen", "Boxen",
        "Eislaufen", "Surfen", "Basketball spielen", "Fotos machen",
        "Fischen", "Jonglieren", "Tennis spielen", "Tauchen", "Schreiben",
        "Fahrrad fahren", "Auto fahren", "Bergsteigen", "Yoga", "Gewichte heben",
        "Tai Chi", "Fußball spielen", "Tischtennis spielen", "Schach spielen", "Klavier spielen"
    ],
    objects: [
        "Regenschirm", "Handy", "Computer", "Gitarre", "Kamera", "Uhr",
        "Brille", "Buch", "Stuhl", "Tisch", "Bleistift", "Spiegel", "Tür",
        "Fenster", "Lampe", "Fernseher", "Fahrrad", "Klavier", "Rucksack",
        "Kopfhörer", "Tastatur", "Maus", "Ladegerät", "Tasse", "Stäbchen",
        "Löffel", "Teller", "Schüssel", "Topf", "Messer", "Gabel",
        "Handtuch", "Kissen", "Decke", "Bett", "Sofa", "Kühlschrank"
    ],
    movies: [
        "Krieg der Sterne", "Titanic", "Der König der Löwen", "Harry Potter", "Avatar",
        "Jurassic Park", "Spider-Man", "Matrix", "Findet Nemo",
        "Fluch der Karibik", "Die Eiskönigin", "Avengers", "Toy Story",
        "Batman", "Jäger des verlorenen Schatzes", "Alien", "Der weiße Hai", "Superman", "Ghostbusters",
        "Der Zauberer von Oz", "Kung Fu Panda", "Shrek", "Madagaskar"
    ],
    funny: [
        "Betrunken", "Zombie", "Alter mit Rückenschmerzen", "Wichtigtuer",
        "Reich spielen", "Auf Bananenschale rutschen", "Volkstanz",
        "Alte Frau meckern", "Im Aufzug stecken", "Gähnend",
        "In High Heels fallen", "Baby lernt laufen", "Rücken verrenkt",
        "Besessen", "Schüchtern", "Mit Handy ablenken",
        "Nervöse Verabredung", "Schleichen", "Schauspiel", "Stolpern",
        "Schluckauf", "Verwirrt", "Wütend", "Erregt",
        "Müde", "Roboter", "Astronaut", "Fassen fassungslos"
    ],
    sports: [
        "Fußball", "Tennis", "Basketball", "Eishockey", "Baseball", "Volleyball",
        "Golf", "American Football", "Curling", "Biathlon", "Ski Alpin",
        "Skispringen", "Rodeln", "Bobfahren", "Eislaufen", "Eiskunstlauf",
        "Turnen", "Leichtathletik", "Ringen", "Boxen", "Fechten",
        "Schießen", "Radfahren", "Mountainbiking", "Skateboard", "Klettern",
        "Laufen", "Marathon", "Seilspringen", "Fitness", "Yoga",
        "Judo", "Taekwondo", "Karate", "Handball", "Badminton"
    ],
    professions: [
        "Arzt", "Krankenpfleger", "Zahnarzt", "Psychologe", "Polizist", "Feuerwehrmann",
        "Koch", "Kellner", "Taxifahrer", "Lastwagenfahrer", "Pilot", "Flugbegleiterin",
        "Anwalt", "Richter", "Staatsanwalt", "Ingenieur", "Architekt", "Programmierer",
        "UI-Designer", "Maler", "Bildhauer", "Sänger", "Schauspieler", "Filmregisseur",
        "Drehbuchautor", "Journalist", "Fotograf", "Kameramann", "Schriftsteller", "Dichter",
        "Übersetzer", "Reiseführer", "Professor", "Lehrer", "Fitnesstrainer", "Schiedsrichter",
        "Bauer", "Bauarbeiter", "Elektriker", "Klempner", "Zimmermann", "Friseur",
        "Friseurin", "Masseur", "Yogalehrer", "Ernährungsberater", "Medizinstudent", "Krankenpflegeschüler"
    ],
    historical: [
        "Martin Luther", "Johann Wolfgang von Goethe", "Friedrich Schiller", "Ludwig van Beethoven", "Wolfgang Amadeus Mozart",
        "Albert Einstein", "Max Planck", "Otto von Bismarck", "Friedrich der Große", "Barbarossa",
        "Martin Luther King", "Mahatma Gandhi", "Christoph Kolumbus", "Isaak Newton", "Galileo Galilei",
        "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo", "Pablo Picasso", "Claude Monet",
        "George Washington", "Thomas Jefferson", "Benjamin Franklin", "Napoleon", "Königin Elisabeth I",
        "Sokrates", "Platon", "Aristoteles", "Konfuzius", "Laotse",
        "Konfuzius", "Julius Caesar", "Kleopatra", "Katharina die Große", "Peter der Große",
        "Marie Curie", "Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Stephen Hawking"
    ]
};

class CharadesGame {
    constructor() {
        this.setupScreen = document.getElementById('setup-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.currentWordElement = document.getElementById('current-word');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.gameHeader = document.querySelector('#game-header');
        this.infoSection = document.querySelector('#info-section');

        this.initializeButtons();
        this.resetGame();
    }

    initializeButtons() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('correct').addEventListener('click', () => this.handleCorrect());
        document.getElementById('skip').addEventListener('click', () => this.handleSkip());
        document.getElementById('play-again').addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        this.score = 0;
        this.currentWords = [];
        this.correctWords = [];
        this.skippedWords = [];
        this.timeLeft = 60;
        this.isGameRunning = false;

        this.setupScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.remove('hidden');
        this.infoSection.classList.remove('hidden');

        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value);
        const category = document.getElementById('word-category').value;

        this.currentWords = this.getWords(category);
        if (this.currentWords.length === 0) {
            alert('Nicht genug Wörter verfügbar!');
            return;
        }

        this.setupScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.add('hidden');
        this.infoSection.classList.add('hidden');

        this.isGameRunning = true;
        this.nextWord();
        this.startTimer();
    }

    getWords(category) {
        let words = [];
        if (category === 'all') {
            Object.values(wordDatabase).forEach(categoryWords => {
                words = words.concat(categoryWords);
            });
        } else {
            words = wordDatabase[category] || [];
        }
        return this.shuffleArray([...words]);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            console.log("Timer:", this.timeLeft);

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    nextWord() {
        if (this.currentWords.length > 0) {
            const word = this.currentWords.pop();
            this.currentWordElement.textContent = word;
            console.log("Aktuelles Wort:", word);
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        if (!this.isGameRunning) return;
        console.log("Korrekt-Schaltfläche geklickt");

        this.correctWords.push(this.currentWordElement.textContent);
        this.score += 1;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        if (!this.isGameRunning) return;
        console.log("Überspringen-Schaltfläche geklickt");

        this.skippedWords.push(this.currentWordElement.textContent);
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = `Punkte: ${this.score}`;
    }

    endGame() {
        this.isGameRunning = false;
        clearInterval(this.timerInterval);

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `Endpunkte: ${this.score}`;

        let summary = '<h3>Korrekte Wörter:</h3>';
        summary += this.correctWords.length > 0 ?
            `<p>${this.correctWords.join(', ')}</p>` :
            '<p>Keine</p>';

        summary += '<h3>Übersprungene Wörter:</h3>';
        summary += this.skippedWords.length > 0 ?
            `<p>${this.skippedWords.join(', ')}</p>` :
            '<p>Keine</p>';

        document.getElementById('word-summary').innerHTML = summary;
    }
}

// Spiel initialisieren wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM geladen, Spiel wird initialisiert...");
    new CharadesGame();
});
