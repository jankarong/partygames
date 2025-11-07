// Base de données de mots
const wordDatabase = {
    animals: [
        "Éléphant", "Girafe", "Pingouin", "Kangourou", "Lion", "Tigre", "Singe",
        "Papillon", "Araignée", "Crocodile", "Dauphin", "Aigle", "Pieuvre",
        "Panda", "Lapin", "Serpent", "Zèbre", "Ours", "Hibou", "Grenouille"
    ],
    actions: [
        "Nager", "Danser", "Skier", "Cuisiner", "Peindre", "Courir",
        "Jouer de la Guitare", "Lire", "Dormir", "Chanter", "Boxer",
        "Patin à Glace", "Surfer", "Basket-ball", "Prendre des Photos",
        "Pêcher", "Jongler", "Tennis", "Plonger", "Écrire"
    ],
    objects: [
        "Parapluie", "Téléphone", "Ordinateur", "Guitare", "Caméra", "Horloge",
        "Lunettes", "Livre", "Chaise", "Table", "Crayon", "Miroir", "Porte",
        "Fenêtre", "Lampe", "Télévision", "Bicyclette", "Piano", "Sac à Dos",
        "Écouteurs"
    ],
    movies: [
        "Star Wars", "Titanic", "Le Roi Lion", "Harry Potter", "Avatar",
        "Jurassic Park", "L'Homme-Araignée", "Matrix", "Le Monde de Némo",
        "Pirates des Caraïbes", "La Reine des Neiges", "Avengers", "Toy Story",
        "Batman", "Indiana Jones", "Alien", "Les Dents de la Mer", "Superman", "Ghostbusters",
        "Le Magicien d'Oz"
    ],
    funny: [
        "Saoul", "Zombie", "Superhéros", "Pleurer",
        "Snob", "Peau de Banane", "Danse du Poulet",
        "Elvis", "Boîte Invisible", "Endormi",
        "Talons Hauts", "Bébé", "Mal au Dos",
        "Possédé", "Constipé", "Texte en Marchant",
        "Rendez-vous Maladroit", "Furtif", "Drame", "Trébucher",
        "Hoquet", "Confus", "Timide", "Fâché",
        "Excité", "Fatigué", "Robot", "Astronaute"
    ],
    sports: [
        "Natation", "Tennis", "Basket-ball", "Football", "Base-ball", "Soccer",
        "Golf", "Volley-ball", "Ski", "Hockey sur Glace", "Boxe", "Lutte",
        "Gymnastique", "Surf", "Skateboard", "Escalade", "Bowling",
        "Tennis de Table", "Badminton", "Tir à l'Arc"
    ],
    professions: [
        "Médecin", "Professeur", "Chef", "Policier", "Pompier", "Infirmière",
        "Ingénieur", "Avocat", "Dentiste", "Photographe", "Pilote", "Astronaute",
        "Ouvrier du Bâtiment", "Barbier", "Acteur", "Magicien", "Clown", "Concierge",
        "Bibliothécaire", "Garde de Sécurité"
    ],
    historical: [
        "Napoléon Bonaparte", "Cléopâtre", "Albert Einstein", "Shakespeare",
        "Benjamin Franklin", "Jeanne d'Arc", "Abraham Lincoln", "Jules César",
        "Marie Curie", "George Washington", "Élizabeth Ire", "Léonard de Vinci",
        "Attila le Hun", "Socrate", "Martin Luther King Jr.", "Rosa Parks",
        "Winston Churchill", "Marilyn Monroe", "Elvis Presley", "Mahatma Gandhi"
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
            alert('Pas assez de mots disponibles !');
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

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    nextWord() {
        if (this.currentWords.length === 0) {
            this.endGame();
            return;
        }

        const word = this.currentWords.pop();
        this.currentWordElement.textContent = word;
    }

    handleCorrect() {
        this.score++;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    endGame() {
        clearInterval(this.timerInterval);
        this.isGameRunning = false;

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');

        const resultText = document.getElementById('result-text');
        resultText.textContent = `Vous avez marqué ${this.score} points!`;
    }
}

// Initialiser le jeu
let game;
document.addEventListener('DOMContentLoaded', function() {
    game = new CharadesGame();
});

// Exporter pour les tests potentiels
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CharadesGame };
}
