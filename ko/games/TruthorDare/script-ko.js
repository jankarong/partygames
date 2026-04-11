const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                "어릴 때 꿈은 무엇이었나요?",
                "지금 당장 배우고 싶은 기술이 있다면?",
                "최근에 가장 크게 웃었던 일은?",
                "가장 좋아하는 휴일 보내는 방법은?",
                "하루 동안 다른 직업을 가질 수 있다면 무엇을 택할까요?",
                "남들에게 자랑할 만한 사소한 특기가 있나요?",
                "최근에 푹 빠져 있는 취미는?",
                "학창 시절 가장 기억에 남는 창피한 순간은?",
                "투명 인간이 된다면 가장 먼저 하고 싶은 일은?",
                "지금 가장 가고 싶은 여행지는?",
                "가장 좋아하는 음식 3가지는?",
                "복권에 당첨된다면 가장 먼저 무엇을 살까요?",
                "무인도에 한 가지만 가져갈 수 있다면?"
            ],
            dare: [
                "펭귄처럼 걷기 (방 한 바퀴 돌기)",
                "다음 내 차례가 올 때까지 이상한 목소리로 말하기",
                "30초 동안 아무 음악 없이 막춤 추기",
                "안 쓰는 손으로 자신의 얼굴 그리기",
                "지금 여기 있는 사람 중 한 명을 진심으로 칭찬하기",
                "어려운 문장(간장 공장 공장장은...) 3번 반복하기",
                "제자리에서 5번 돌고 멋진 포즈 취하기",
                "좋아하는 노래 한 구절 부르기",
                "아기 울음소리 10초 동안 내기",
                "다음 내 차례까지 로봇처럼 말하기",
                "지금 스마트폰 갤러리의 마지막 사진 보여주기"
            ]
        },
        spicy: {
            truth: [
                "첫 키스에서 가장 중요하다고 생각하는 것은?",
                "상대방의 어떤 행동에 가장 약한가요?",
                "연애하면서 가장 설레는 순간은 언제인가요?",
                "가장 이상적인 데이트의 마무리는 어떤 모습인가요?",
                "지금까지 했던 사랑의 행동 중 가장 대담했던 것은?",
                "좋아하는 사람이 해줬으면 하는 행동은?",
                "남들에게 말하지 못한 비밀스러운 연애 환상이 있나요?",
                "이성에게 듣고 싶은 심쿵한 한마디는?",
                "조금 위험하지만 시도해보고 싶은 상황이 있나요?",
                "지금 나에게 부족한 연애의 기술은 무엇이라고 생각하나요?",
                "첫눈에 반해본 적이 있나요?",
                "여기 있는 사람 중 이성으로서 가장 매력적인 사람은?"
            ],
            dare: [
                "관심 있는 사람에게 보낼 달콤한 멘트를 여기서 말하기",
                "가장 섹시한 눈빛을 5초 동안 한 사람에게 발사하기",
                "합의 하에 10초 동안 한 사람과 눈 맞추기",
                "오늘 밤 하고 싶은 꿈같은 데이트를 귓속말로 속삭이기",
                "드라마 속 고백 장면을 주인공처럼 연기하기",
                "가장 설레는 키스 상황을 표정으로 연기하기",
                "상대방의 손을 잡고 매력 포인트 3가지 말하기",
                "가장 매력적이라고 생각하는 신체 부위 공개하기",
                "지금 기분을 유혹적인 멘트로 표현하기",
                "옆 사람의 귓가에 사랑한다고 속삭이기"
            ]
        }
    }
};

const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;
    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">소프트 모드</span>';
        questionText.textContent = '👇 진실 혹은 도전을 선택해 주세요 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">스파이시 모드</span>';
        questionText.textContent = '👇 자극적인 진실 혹은 도전을 선택해 주세요 👇';
    }
    selectedDifficulty.style.display = 'block';
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';
    backButton.style.display = 'inline-block';
}

function selectChoice(type) {
    gameData.currentType = type;
    const questions = gameData.questions[gameData.currentDifficulty][type];
    questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
    selectedType.innerHTML = type === 'truth'
        ? '<span class="badge bg-info">진실</span>'
        : '<span class="badge bg-danger">도전</span>';
    selectedType.style.display = 'block';
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    choiceButtons.style.display = 'none';
}

function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
    }
}

function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 모드를 선택해 주세요 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = '👇 모드를 선택해 주세요 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

// Accordion Logic
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.textContent = this.classList.contains('active') ? '-' : '+';
            }
        });
    });
});
