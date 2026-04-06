// 21 Freaky Questions - Korean Version
const questions = [
    { mode: "웜업", text: "어떤 눈빛에 가장 설레나요?" },
    { mode: "웜업", text: "이상적인 데이트 분위기는 어떤 느낌인가요?" },
    { mode: "웜업", text: "들으면 기분 좋아지는 칭찬은?" },
    { mode: "웜업", text: "오늘 당신의 기분을 나타내는 노래가 있다면?" },
    { mode: "웜업", text: "어떤 자연스러운 스킨십을 좋아하시나요?" },
    { mode: "스파이시", text: "오늘 밤, 상대방이 먼저 해줬으면 하는 행동은?" },
    { mode: "스파이시", text: "사소한 행동 중 가장 섹시하다고 느끼는 것은?" },
    { mode: "스파이시", text: "분위기를 천천히 잡는 편인가요, 아니면 직진하는 편인가요?" },
    { mode: "스파이시", text: "키스하고 싶어지는 상황이나 장소가 있나요?" },
    { mode: "스파이시", text: "연인 사이에서 꼭 지켜야 할 선이 있다면?" },
    { mode: "프리키", text: "남들에게 잘 말하지 않는 은밀한 취향이 있나요?" },
    { mode: "프리키", text: "오늘 밤 당신이 주도한다면 가장 먼저 무엇을 할까요?" },
    { mode: "프리키", text: "어떤 목소리 톤이나 귓속말에 약한가요?" },
    { mode: "프리키", text: "어떤 터치 한 번에 완전히 의식하게 되나요?" },
    { mode: "프리키", text: "시도해보고 싶은 대담한 연출이 있다면?" },
    { mode: "프리키", text: "천천히 애태우는 것과 강렬한 속도감 중 어느 쪽을 선호하나요?" },
    { mode: "프리키", text: "상대방의 의외의 과감한 행동 중 기분 좋은 것은?" },
    { mode: "프리키", text: "어떤 옷차림을 입었을 때 가장 매력을 느끼나요?" },
    { mode: "프리키", text: "둘만의 시간에서 더 늘리고 싶은 요소가 있다면?" },
    { mode: "프리키", text: "지금 이 자리에서 할 수 있는 가장 대담한 부탁은?" },
    { mode: "프리키", text: "이 게임이 끝난 후 꿈꾸는 이상적인 흐름은?" }
];

let currentIndex = 0;

function renderQuestion() {
    const questionNumberEl = document.getElementById('questionNumber');
    const questionTextEl = document.getElementById('questionText');
    const questionModeEl = document.getElementById('questionMode');

    if (questionNumberEl && questionTextEl && questionModeEl) {
        const question = questions[currentIndex];
        questionNumberEl.textContent = `질문 ${currentIndex + 1} / 21`;
        questionTextEl.textContent = question.text;
        questionModeEl.textContent = question.mode;

        // Add a slight fade effect when changing questions
        questionTextEl.classList.remove('fade-in');
        void questionTextEl.offsetWidth; // Trigger reflow
        questionTextEl.classList.add('fade-in');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const randomBtn = document.getElementById('randomBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % questions.length;
            renderQuestion();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + questions.length) % questions.length;
            renderQuestion();
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const lastIndex = currentIndex;
            do {
                currentIndex = Math.floor(Math.random() * questions.length);
            } while (currentIndex === lastIndex && questions.length > 1);
            renderQuestion();
        });
    }
});
