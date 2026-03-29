// Japanese Word Database for Charades
const wordDatabase = {
    animals: [
        "ゾウ", "キリン", "ペンギン", "カンガルー", "ライオン", "タイガー", "さる",
        "チョウチョ", "クモ", "ワニ", "イルカ", "ワシ", "タコ",
        "パンダ", "ウサギ", "ヘビ", "シマウマ", "クマ", "フクロウ", "カエル"
    ],
    actions: [
        "水泳", "ダンス", "スキー", "料理", "絵を描く", "ランニング",
        "ギターを弾く", "読書", "睡眠", "歌う", "ボクシング",
        "スケート", "サーフィン", "バスケットボール", "写真を撮る",
        "釣り", "ジャグリング", "テニス", "ダイビング", "習字"
    ],
    objects: [
        "傘", "スマホ", "パソコン", "ギター", "カメラ", "時計",
        "メガネ", "本", "椅子", "テーブル", "鉛筆", "鏡", "ドア",
        "窓", "ランプ", "テレビ", "自転車", "ピアノ", "バックパック",
        "ヘッドフォン"
    ],
    movies: [
        "スター・ウォーズ", "タイタニック", "ライオン・キング", "ハリー・ポッター", "アバター",
        "ジュラシック・パーク", "スパイダーマン", "マトリックス", "ファインディング・ニモ",
        "パイレーツ・オブ・カリビアン", "アナと雪の女王", "アベンジャーズ", "トイ・ストーリー",
        "バットマン", "インディ・ジョーンズ", "エイリアン", "ジョーズ", "スーパーマン", "ゴーストバスターズ",
        "オズの魔法使い"
    ],
    funny: [
        "酔っ払い", "ゾンビ", "スーパーヒーロー", "号泣",
        "気取り屋", "バナナの皮で滑る", "コマネチ",
        "エルビス・プレスリー", "見えない箱", "居眠り",
        "ハイヒールを履く", "赤ちゃん", "ぎっくり腰",
        "何かに取り憑かれた人", "便秘", "歩きスマホ",
        "気まずいデート", "抜き足差し足", "大げさな演技", "つまずく",
        "しゃっくり", "混乱", "人見知り", "激怒",
        "大興奮", "疲れ果てた人", "ロボット", "宇宙飛行士"
    ],
    sports: [
        "水泳", "テニス", "バスケットボール", "アメリカンフットボール", "野球", "サッカー",
        "ゴルフ", "バレーボール", "スキー", "アイスホッケー", "ボクシング", "レスリング",
        "体操", "サーフィン", "スケートボード", "ロッククライミング", "ボーリング",
        "卓球", "バドミントン", "アーチェリー"
    ],
    professions: [
        "医者", "先生", "シェフ", "警察官", "消防士", "看護師",
        "エンジニア", "弁護士", "歯医者", "写真家", "パイロット", "宇宙飛行士",
        "建設作業員", "理容師", "俳優", "マジシャン", "ピエロ", "清掃員",
        "司書", "警備員"
    ],
    historical: [
        "ナポレオン", "クレオパトラ", "アインシュタイン", "シェイクスピア",
        "ベンジャミン・フランクリン", "ジャンヌ・ダルク", "リンカーン", "カエサル",
        "キュリー夫人", "ジョージ・ワシントン", "エリザベス1世", "レオナルド・ダ・ヴィンチ",
        "アッティラ", "ソクラテス", "キング牧師", "ローザ・パークス",
        "チャーチル", "マリリン・モンロー", "エルビス・プレスリー", "ガンジー"
    ]
};

const TRANSLATIONS = {
    score: 'スコア:',
    finalScore: '最終スコア:',
    notEnoughWords: 'お題が足りません！',
    correctWords: '正解したお題:',
    skippedWords: 'スキップしたお題:',
    none: 'なし'
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
            alert(TRANSLATIONS.notEnoughWords);
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
        if (this.currentWords.length > 0) {
            const word = this.currentWords.pop();
            this.currentWordElement.textContent = word;
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        if (!this.isGameRunning) return;
        this.correctWords.push(this.currentWordElement.textContent);
        this.score += 1;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        if (!this.isGameRunning) return;
        this.skippedWords.push(this.currentWordElement.textContent);
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = `${TRANSLATIONS.score} ${this.score}`;
    }

    endGame() {
        this.isGameRunning = false;
        clearInterval(this.timerInterval);

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `${TRANSLATIONS.finalScore} ${this.score}`;

        let summary = `<h3>${TRANSLATIONS.correctWords}</h3>`;
        summary += this.correctWords.length > 0 ?
            `<p>${this.correctWords.join(', ')}</p>` :
            `<p>${TRANSLATIONS.none}</p>`;

        summary += `<h3>${TRANSLATIONS.skippedWords}</h3>`;
        summary += this.skippedWords.length > 0 ?
            `<p>${this.skippedWords.join(', ')}</p>` :
            `<p>${TRANSLATIONS.none}</p>`;

        document.getElementById('word-summary').innerHTML = summary;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CharadesGame();
});
