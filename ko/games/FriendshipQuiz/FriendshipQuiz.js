const questions = [
    {
        question: "만약 TA가 복권에 당첨된다면, 가장 먼저 무엇을 할까?",
        options: ["세계 일주 여행", "저축 및 재테크", "미친 듯이 쇼핑", "직장/학교 그만두기"]
    },
    {
        question: "TA가 가장 좋아하는 스트레스 해소법은?",
        options: ["맛있는 거 배부르게 먹기", "하루 종일 잠자기", "누군가에게 하소연하기", "게임이나 혼자만의 시간"]
    },
    {
        question: "TA가 가장 무서워하는 것은 무엇일까?",
        options: ["벌레나 곤충", "홀로 남겨지는 것", "돈이 떨어지는 것", "오해받는 것"]
    },
    {
        question: "너와 TA의 몸이 하루 동안 바뀐다면, TA가 가장 먼저 할 일은?",
        options: ["너의 폰/사생활 확인", "너의 돈 다 쓰기", "너 대신 누군가에게 고백하기", "너의 인간관계 망쳐놓기"]
    },
    {
        question: "TA가 생각하는 완벽한 주말은?",
        options: ["야외 활동", "해 뜰 때까지 침대에서 빈둥거리기", "친구들과 브런치/디너", "취미 생활에 몰두하기"]
    },
    {
        question: "TA가 평소에 가장 많이 쓰는 이모티콘 스타일은?",
        options: ["세련되고 깔끔한 스타일", "포근하고 귀여운 스타일", "비꼬는/얄미운 스타일", "웃기고 병맛인 스타일"]
    },
    {
        question: "TA가 절대 못 먹는(싫어하는) 음식은?",
        options: ["고수 같은 향 강한 채소", "엄청나게 매운 음식", "기름진 비계 부위", "아무 맛 안 나는 밍밍한 채소"]
    },
    {
        question: "TA가 초능력을 가질 수 있다면, 무엇을 원할까?",
        options: ["순간 이동 (어디든 가기)", "독심술 (속마음 읽기)", "투명 인간 (몰래 행동하기)", "불로장생"]
    },
    {
        question: "노래방에서 TA의 포지션은?",
        options: ["마이크 안 놓는 '엔딩 요정'", "분위기 띄우는 '텐션 요정'", "안주만 먹는 '식사 요정'", "한구석에서 호응만 하는 쪽"]
    },
    {
        question: "TA가 돈을 모으는 주된 이유는?",
        options: ["옷이나 전자기기 사기", "미래를 위한 안보감", "소중한 사람과 여행", "돈 안 모음 (욜로족)"]
    },
    {
        question: "TA가 약속에 늦었을 때 가장 자주 하는 변명은?",
        options: ["'이미 가는 중이야' (방금 나옴)", "'알람 못 들었어'", "'차가 너무 막혀'", "TA는 절대 안 늦음"]
    },
    {
        question: "TA가 가장 좋아하는 SNS는?",
        options: ["인스타그램 (스토리)", "틱톡 (릴스)", "유튜브/디시 (정보/공포)", "트위터/X (덕질)"]
    },
    {
        question: "네가 생각하는 TA의 가장 큰 매력은?",
        options: ["외모나 비주얼", "유머나 재밌는 성격", "높은 공감 지수와 다정함", "결단력과 지성"]
    },
    {
        question: "TA가 한 번쯤 도전해보고 싶은 익스트림 스포츠는?",
        options: ["스카이다이빙", "번지점프", "스쿠버다이빙", "상사 앞에서 아재 개그 하기"]
    },
    {
        question: "무인도에 고립된다면, TA는 누구를 데려갈까?",
        options: ["너 (당연히 너지!)", "베어 그릴스 (생존 위해)", "짝사랑 상대나 연인", "세계 최고의 요리사"]
    }
];

let currentQuestion = 0;
let userAnswers = [];
let targetFriend = "";
let correctAnswers = null;
let mode = "create";

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-game-btn');
const friendInput = document.getElementById('friend-name');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('question-counter');
const progressBar = document.getElementById('quiz-progress');
const targetFriendSpan = document.getElementById('target-friend');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedAns = urlParams.get('ans');
    const creatorName = urlParams.get('name');

    if (encodedAns && creatorName) {
        mode = "guess";
        targetFriend = creatorName;
        correctAnswers = encodedAns.split('').map(Number);
        document.querySelector('#start-screen h1').innerText = targetFriend + "를 얼마나 알고 있어?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend}가 너에게 도전장을 보냈어!<br>100점을 맞을 수 있을까? 지금 확인해봐.`;
        friendInput.placeholder = "내 이름 입력";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "우정 퀴즈";
        document.querySelector('#start-screen p.lead').innerHTML = "나에 대한 15개 질문에 먼저 답해줘.<br>링크를 공유해서 누가 너를 가장 잘 아는지 확인해봐!";
        friendInput.placeholder = "내 이름 입력";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) { alert("이름을 입력해줘!"); return; }
    if (mode === "create") targetFriend = name;
    startScreen.classList.remove('active');
    setTimeout(() => {
        startScreen.classList.add('d-none');
        quizScreen.classList.remove('d-none');
        quizScreen.classList.add('active');
        currentQuestion = 0;
        userAnswers = [];
        showQuestion();
    }, 400);
});

function showQuestion() {
    const q = questions[currentQuestion];
    let displayText = q.question;
    if (mode === "create") displayText = displayText.replace('TA', '나');
    else displayText = displayText.replace('TA', targetFriend);
    questionText.innerText = displayText;
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn pulse-hover';
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(btn);
    });
    progressText.innerText = `질문 ${currentQuestion + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(index) {
    userAnswers.push(index);
    if (currentQuestion < questions.length - 1) { currentQuestion++; showQuestion(); }
    else showResults();
}

function showResults() {
    quizScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('d-none');
        resultScreen.classList.remove('d-none');
        resultScreen.classList.add('active');
        const titleEl = document.getElementById('result-title');
        const descEl = document.getElementById('result-description');
        const percentageEl = document.getElementById('result-percentage');
        if (mode === "create") {
            titleEl.innerText = "테스트 준비 완료!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            percentageEl.innerText = "완료";
            descEl.innerHTML = `좋아, ${targetFriend}! 너만의 우정 테스트가 만들어졌어.<br>아래 링크를 복사해서 친구들에게 보내봐!`;
            targetFriendSpan.innerText = "나 자신";
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> 링크 복사';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => { alert("링크가 복사됐어!"); });
            };
            restartBtn.innerText = "다시 만들기";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => { if (ans === correctAnswers[i]) score++; });
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            targetFriendSpan.innerText = targetFriend;
            if (finalPercentage === 100) { titleEl.innerText = "소울메이트 (100%)"; descEl.innerText = `대박! 너와 ${targetFriend}는 텔레파시가 통하는 사이네!`; }
            else if (finalPercentage >= 80) { titleEl.innerText = "찐친 인증"; descEl.innerText = `진짜 잘 안다! 너와 ${targetFriend}는 정말 친한가 봐.`; }
            else if (finalPercentage >= 50) { titleEl.innerText = "그냥 친구"; descEl.innerText = `어느 정도는 아네! 조금 더 대화를 나눠봐.`; }
            else { titleEl.innerText = "더 친해지자"; descEl.innerText = `${targetFriend}에 대해 더 알아갈 시간이 필요할 것 같아!`; }
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> 점수 공유';
            shareBtn.onclick = () => { alert("스크린샷으로 친구에게 자랑해봐!"); };
            restartBtn.innerText = "나도 테스트 만들기";
            restartBtn.onclick = () => { window.location.href = window.location.pathname; };
        }
    }, 400);
}

init();

restartBtn.addEventListener('click', () => {
    if (mode === "guess") return;
    resultScreen.classList.remove('active');
    setTimeout(() => {
        resultScreen.classList.add('d-none');
        startScreen.classList.remove('d-none');
        startScreen.classList.add('active');
        friendInput.value = '';
    }, 400);
});
