// Hedbanz Game Logic - Japanese Version
const hedbanzTranslations = {
    cards: [
        'ライオン', 'ペンギン', 'パンダ', 'カメレオン', 'フラミンゴ',
        'ピザ', '寿司', 'タピオカ', 'メロンパン', 'パフェ',
        '医者', 'アイドル', '宇宙飛行士', 'YouTuber', '忍者',
        'スマホ', '扇風機', 'メガネ', 'ランドセル', '消しゴム',
        'サフィン', 'キャンプ', 'ヨガ', 'お花見', 'カラオケ',
        'フランス', 'エジプト', '北海道', '沖縄', '月'
    ],
    messages: {
        player: 'プレイヤー',
        score: 'ポイント',
        gameOver: 'ゲーム終了！',
        playAgain: 'もう一度遊ぶ',
        nextPlayer: '次のプレイヤー',
        readyInstruction: 'まわりの人にだけ言葉が見えるように持って、下のボタンで始めてください。'
    }
};

class HedbanzGame {
    constructor() {
        this.playerCount = 2;
        this.duration = 60;
        this.currentPlayer = 1;
        this.scores = [];
        this.timer = null;
        this.timeLeft = 60;
        this.usedWords = new Set();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startSetup());
        document.getElementById('readyBtn').addEventListener('click', () => this.startTurn());
        document.getElementById('correctBtn').addEventListener('click', () => this.handleCorrect());
        document.getElementById('skipBtn').addEventListener('click', () => this.nextWord());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
    }

    startSetup() {
        this.playerCount = parseInt(document.getElementById('playerCount').value);
        this.duration = parseInt(document.getElementById('gameDuration').value);
        this.scores = new Array(this.playerCount).fill(0);
        this.currentPlayer = 1;
        this.showReadyScreen();
    }

    showReadyScreen() {
        document.getElementById('setupScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('resultsScreen').style.display = 'none';
        document.getElementById('readyScreen').style.display = 'block';
        document.getElementById('nextPlayerNum').textContent = this.currentPlayer;
    }

    startTurn() {
        document.getElementById('readyScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        document.getElementById('currentPlayer').textContent = this.currentPlayer;
        document.getElementById('playerScore').textContent = this.scores[this.currentPlayer - 1];
        
        this.timeLeft = this.duration;
        this.updateTimerDisplay();
        this.nextWord();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) this.endTurn();
        }, 1000);
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
    }

    nextWord() {
        if (this.usedWords.size >= hedbanzTranslations.cards.length) this.usedWords.clear();
        let word;
        do {
            word = hedbanzTranslations.cards[Math.floor(Math.random() * hedbanzTranslations.cards.length)];
        } while (this.usedWords.has(word));
        
        this.usedWords.add(word);
        document.getElementById('wordDisplay').textContent = word;
    }

    handleCorrect() {
        this.scores[this.currentPlayer - 1]++;
        document.getElementById('playerScore').textContent = this.scores[this.currentPlayer - 1];
        this.nextWord();
    }

    endTurn() {
        clearInterval(this.timer);
        if (this.currentPlayer < this.playerCount) {
            this.currentPlayer++;
            this.showReadyScreen();
        } else {
            this.showResults();
        }
    }

    showResults() {
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('resultsScreen').style.display = 'block';
        
        const resultsDiv = document.getElementById('finalScores');
        resultsDiv.innerHTML = this.scores.map((score, i) => 
            `<div class="score-row">${hedbanzTranslations.messages.player} ${i + 1}: ${score} ${hedbanzTranslations.messages.score}</div>`
        ).join('');
    }

    resetGame() {
        document.getElementById('resultsScreen').style.display = 'none';
        document.getElementById('setupScreen').style.display = 'block';
    }
}

window.addEventListener('load', () => {
    new HedbanzGame();
    // Accordion logic
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('active');
            const icon = button.querySelector('.accordion-icon');
            icon.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });
});
