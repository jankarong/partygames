// Word Database
const wordDatabase = {
    animals: [
        "Elephant", "Giraffe", "Penguin", "Kangaroo", "Lion", "Tiger", "Monkey",
        "Butterfly", "Spider", "Crocodile", "Dolphin", "Eagle", "Octopus",
        "Panda", "Rabbit", "Snake", "Zebra", "Bear", "Owl", "Frog"
    ],
    actions: [
        "Swimming", "Dancing", "Skiing", "Cooking", "Painting", "Running",
        "Playing Guitar", "Reading", "Sleeping", "Singing", "Boxing",
        "Ice Skating", "Surfing", "Basketball", "Taking Photos",
        "Fishing", "Juggling", "Tennis", "Diving", "Writing"
    ],
    objects: [
        "Umbrella", "Phone", "Computer", "Guitar", "Camera", "Clock",
        "Glasses", "Book", "Chair", "Table", "Pencil", "Mirror", "Door",
        "Window", "Lamp", "Television", "Bicycle", "Piano", "Backpack",
        "Headphones"
    ],
    movies: [
        "Star Wars", "Titanic", "Lion King", "Harry Potter", "Avatar",
        "Jurassic Park", "Spider-Man", "The Matrix", "Finding Nemo",
        "Pirates of the Caribbean", "Frozen", "Avengers", "Toy Story",
        "Batman", "Indiana Jones", "Alien", "Jaws", "Superman", "Ghostbusters",
        "Wizard of Oz"
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
        this.gameHeader = document.querySelector('.game-header');
        this.setupCards = document.querySelector('.setup-cards');

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
        this.setupCards.classList.remove('hidden');

        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value);
        const category = document.getElementById('word-category').value;

        this.currentWords = this.getWords(category);
        if (this.currentWords.length === 0) {
            alert('Not enough words available!');
            return;
        }

        this.setupScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.add('hidden');
        this.setupCards.classList.add('hidden');

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
            console.log("Current word:", word);
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        if (!this.isGameRunning) return;
        console.log("Correct button clicked");

        this.correctWords.push(this.currentWordElement.textContent);
        this.score += 1;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        if (!this.isGameRunning) return;
        console.log("Skip button clicked");

        this.skippedWords.push(this.currentWordElement.textContent);
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    endGame() {
        this.isGameRunning = false;
        clearInterval(this.timerInterval);

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `Final Score: ${this.score}`;

        let summary = '<h3>Correct words:</h3>';
        summary += this.correctWords.length > 0 ?
            `<p>${this.correctWords.join(', ')}</p>` :
            '<p>None</p>';

        summary += '<h3>Skipped words:</h3>';
        summary += this.skippedWords.length > 0 ?
            `<p>${this.skippedWords.join(', ')}</p>` :
            '<p>None</p>';

        document.getElementById('word-summary').innerHTML = summary;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing game...");
    new CharadesGame();
});
