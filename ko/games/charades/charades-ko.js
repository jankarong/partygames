// Korean Word Database for Charades
const wordDatabase = {
    animals: [
        "토끼", "기린", "펭귄", "캥거루", "사자", "호랑이", "원숭이", "나비", "거미", "악어", 
        "돌고래", "독수리", "문어", "판다", "뱀", "얼룩말", "곰", "부엉이", "개구리", "하마",
        "코끼리", "너구리", "다람쥐", "치타", "타조", "카멜레온", "공룡", "상어", "해파리"
    ],
    actions: [
        "수영하기", "춤추기", "스키 타기", "요리하기", "그림 그리기", "달리기", "기타 연주", "독서하기", 
        "잠자기", "노래하기", "복싱하기", "스케이트 타기", "서핑하기", "농구하기", "사진 찍기", 
        "낚시하기", "저글링하기", "테니스 치기", "다이빙하기", "세수하기", "양치질하기", "요가하기",
        "자전거 타기", "줄넘기하기", "머리 감기", "화장하기", "운전하기", "골프 치기"
    ],
    objects: [
        "우산", "스마트폰", "컴퓨터", "기타", "카메라", "시계", "안경", "책", "의자", "테이블", 
        "연필", "거울", "문", "창문", "램프", "텔레비전", "자전거", "피아노", "배낭", "헤드셋",
        "칫솔", "냉장고", "선풍기", "전자레인지", "망원경", "드라이기", "진공청소기"
    ],
    movies: [
        "오징어 게임", "기생충", "겨울왕국", "해리 포터", "어벤져스", "범죄도시", "슬램덩크", 
        "아이언맨", "타이타닉", "라이온 킹", "아바타", "쥬라기 공원", "스파이더맨", "매트릭스", 
        "니모를 찾아서", "캐리비안의 해적", "토이 스토리", "배트맨", "인디아나 존스", "에일리언",
        "신과함께", "극한직업", "명량", "부산행", "토토로", "포켓몬스터", "미니언즈"
    ],
    funny: [
        "취객", "좀비", "슈퍼히어로", "대성통곡", "거만한 사람", "바나나 껍질에 미끄러지기", 
        "연예인 성대모사", "투명 상자 가두기", "꾸벅꾸벅 졸기", "하이힐 신고 걷기", "아기", 
        "허리 삐끗함", "귀신 들린 사람", "변비", "스마트폰 중독자", "어색한 소개팅", 
        "도둑 발걸음", "발연기", "딸깍거리는 마우스", "방구 뀌고 모른 척하기", 
        "매운 음식 먹고 괴로워하기", "간지럼 참기", "비둘기 흉내"
    ],
    sports: [
        "축구", "야구", "농구", "배구", "테니스", "골프", "스키", "피겨 스케이팅", "태권도", 
        "양궁", "배드민턴", "탁구", "당구", "미식축구", "스케이트보드", "클라이밍", "볼링",
        "마라톤", "역도", "펜싱", "레슬링", "유도", "핸드볼"
    ],
    professions: [
        "의사", "선생님", "요리사", "경찰관", "소방관", "간호사", "엔지니어", "변호사", 
        "사진작가", "파일럿", "우주비행사", "미용사", "배우", "마술사", "삐에로", "가수", 
        "화가", "기자", "판사", "운동선수", "승무원", "군인", "환경미화원"
    ],
    historical: [
        "세종대왕", "이순신", "김구", "유관순", "나폴레옹", "클레오파트라", "아인슈타인", 
        "셰익스피어", "링컨", "나이팅게일", "조지 워싱턴", "레오나르도 다 빈치", "간디", 
        "마릴린 먼로", "엘비스 프레슬리", "단군", "광개토대왕", "장영실", "심사임당"
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

class CharadesGame {
    constructor() {
        this.setupScreen = document.getElementById('setup-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.currentWordElement = document.getElementById('current-word');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.gameHeader = document.getElementById('game-header');
        this.infoSection = document.getElementById('info-section');

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
        if (this.gameHeader) this.gameHeader.classList.remove('hidden');
        if (this.infoSection) this.infoSection.classList.remove('hidden');

        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value) || 60;
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
        if (this.scoreElement) {
            this.scoreElement.textContent = `${TRANSLATIONS.score} ${this.score}`;
        }
    }

    endGame() {
        this.isGameRunning = false;
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
    new CharadesGame();
});
