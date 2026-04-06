// Korean Word Database for Hedbanz
const wordDatabase = {
    celebs: [
        "BTS (방탄소년단)", "블랙핑크", "아이유", "손흥민", "유재석", "봉준호", "싸이", "김연아", 
        "지드래곤", "이정재", "수지", "강호동", "임영웅", "송중기", "송혜교", "박보검",
        "김수현", "신동엽", "박지성", "이효리", "장윤정", "나태주", "백종원", "성시경"
    ],
    characters: [
        "피카츄", "짱구", "도라에몽", "뽀로로", "엘사", "스파이더맨", "스폰지밥", "미키 마우스", 
        "슈퍼 마리오", "해리 포터", "둘리", "올라프", "아이언맨", "배트맨", "미니언즈", "세일러문",
        "루피", "나루토", "손오공", "셜록 홈즈", "허준", "홍길동", "심청이", "슈렉"
    ],
    movies: [
        "기생충", "오징어 게임", "어벤져스", "겨울왕국", "더 글로리", "수리남", "범죄도시", 
        "신과함께", "극한직업", "명량", "부산행", "타이타닉", "라이온 킹", "아바타",
        "인터스텔라", "라라랜드", "해리포터", "킹덤", "스카이 캐슬", "도깨비", "미나리"
    ],
    animals: [
        "토끼", "기린", "코끼리", "펭귄", "캥거루", "사자", "호랑이", "고릴라", "돌고래", 
        "독수리", "하마", "판다", "얼룩말", "다람쥐", "너구리", "악어", "카멜레온", "나무늘보",
        "북극곰", "상어", "고래", "문어", "올빼미", "개구리"
    ],
    objects: [
        "스마트폰", "노트북", "시계", "안경", "책", "의자", "테이블", "거울", "우산", 
        "텔레비전", "냉장고", "세탁기", "컴퓨터", "칫솔", "망원경", "자전거", "드라이기",
        "자동차", "비행기", "다리미", "선풍기", "에어컨", "마우스", "키보드"
    ],
    food: [
        "떡볶이", "김치찌개", "치킨", "피자", "삼겹살", "짜장면", "냉면", "비빔밥", 
        "초밥", "파스타", "김밥", "라면", "돈까스", "햄버거", "보쌈", "족발",
        "된장찌개", "부대찌개", "튀김", "만두", "순대", "탕수육", "칼국수"
    ]
};

const TRANSLATIONS = {
    score: '현재 점수:',
    finalScore: '최종 점수:',
    notEnoughWords: '제시어가 부족합니다!',
    correctWords: '맞춘 제시어:',
    skippedWords: '패스한 제시어:',
    none: '없음'
};

class HedbanzGame {
    constructor() {
        this.setupScreen = document.getElementById('setup-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.currentWordElement = document.getElementById('current-word');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.gameHeader = document.getElementById('game-header');
        this.infoSection = document.getElementById('info-section');

        this.score = 0;
        this.currentWords = [];
        this.correctWords = [];
        this.skippedWords = [];
        this.timeLeft = 90;
        this.timerInterval = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('correct').addEventListener('click', () => this.handleCorrect());
        document.getElementById('skip').addEventListener('click', () => this.handleSkip());
        document.getElementById('play-again').addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        this.score = 0;
        this.correctWords = [];
        this.skippedWords = [];
        this.timeLeft = 90;
        clearInterval(this.timerInterval);

        this.setupScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        if (this.gameHeader) this.gameHeader.classList.remove('hidden');
        if (this.infoSection) this.infoSection.classList.remove('hidden');
        
        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value) || 90;
        const category = document.getElementById('word-category').value;

        this.currentWords = this.getWords(category);
        if (this.currentWords.length === 0) {
            alert(TRANSLATIONS.notEnoughWords);
            return;
        }

        this.setupScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        if (this.gameHeader) this.gameHeader.classList.add('hidden');
        if (this.infoSection) this.infoSection.classList.add('hidden');

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
        this.timerElement.textContent = this.timeLeft;
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
            this.currentWord = this.currentWords.pop();
            this.currentWordElement.textContent = this.currentWord;
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        this.correctWords.push(this.currentWord);
        this.score++;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        this.skippedWords.push(this.currentWord);
        this.nextWord();
    }

    updateScore() {
        if (this.scoreElement) {
            this.scoreElement.textContent = `${TRANSLATIONS.score} ${this.score}`;
        }
    }

    endGame() {
        clearInterval(this.timerInterval);
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        if (this.gameHeader) this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `${TRANSLATIONS.finalScore} ${this.score}`;

        let summary = `<h4 class="fw-bold text-success mb-2">${TRANSLATIONS.correctWords}</h4>`;
        summary += this.correctWords.length > 0 ?
            `<p class="mb-3">${this.correctWords.join(', ')}</p>` :
            `<p class="mb-3 text-muted">${TRANSLATIONS.none}</p>`;

        summary += `<h4 class="fw-bold text-warning mb-2">${TRANSLATIONS.skippedWords}</h4>`;
        summary += this.skippedWords.length > 0 ?
            `<p class="mb-0">${this.skippedWords.join(', ')}</p>` :
            `<p class="mb-0 text-muted">${TRANSLATIONS.none}</p>`;

        document.getElementById('word-summary').innerHTML = summary;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HedbanzGame();
});
