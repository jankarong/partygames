const questions = [
    { optionA: "평생 치킨만 먹기", optionB: "평생 피자만 먹기" },
    { optionA: "자고 일어났더니 10억 생김 (단, 군대 다시 가야 함)", optionB: "그냥 지금처럼 살기" },
    { optionA: "평생 머리 안 감기 (냄새 안 남)", optionB: "평생 양치 안 하기 (입 냄새 안 남)" },
    { optionA: "물복 (물렁한 복숭아)", optionB: "딱복 (딱딱한 복숭아)" },
    { optionA: "민초 (민트초코) 좋아함", optionB: "민초는 치약 맛이지! 절대 안 먹음" },
    { optionA: "짜장면", optionB: "짬뽕" },
    { optionA: "탕수육 찍먹", optionB: "탕수육 부먹" },
    { optionA: "겨울에 에어컨 풀가동", optionB: "여름에 히터 풀가동" },
    { optionA: "과거로 돌아가서 다시 시작하기", optionB: "미래로 가서 인생 결과 보기" },
    { optionA: "친구와 사이좋게 100만 원 나누기", optionB: "나 혼자 1억 가지고 친구와 절교" },
    { optionA: "내 애인의 깻잎을 떼어주는 내 절친", optionB: "내 절친의 깻잎을 떼어주는 내 애인" },
    { optionA: "평생 여름인 나라에서 살기", optionB: "평생 겨울인 나라에서 살기" },
    { optionA: "모르는 사람 100명에게 사랑받기", optionB: "아는 사람 10명에게 미움받기" },
    { optionA: "평생 고기만 먹기", optionB: "평생 밀가루만 먹기" },
    { optionA: "모든 동물의 말 알아듣기", optionB: "모든 외국어 완벽하게 마스터하기" },
    { optionA: "핸드폰 없이 1년 살기", optionB: "컴퓨터 없이 1년 살기" },
    { optionA: "평생 라면에 김치 없음", optionB: "평생 치킨에 치킨무 없음" }
];

let currentQuestion = -1;
let selectedOption = null;

const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionAText = document.getElementById('optionAText');
const optionBText = document.getElementById('optionBText');
const percentageA = document.getElementById('percentageA');
const percentageB = document.getElementById('percentageB');
const nextButton = document.getElementById('nextQuestion');
const resetButton = document.getElementById('resetButton');

function showNextQuestion() {
    // Reset selections
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    percentageA.style.opacity = '0';
    percentageB.style.opacity = '0';
    selectedOption = null;

    // Get next random question (different from current)
    let nextIdx;
    do {
        nextIdx = Math.floor(Math.random() * questions.length);
    } while (nextIdx === currentQuestion && questions.length > 1);
    
    currentQuestion = nextIdx;
    const question = questions[currentQuestion];

    // Update text
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;

    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';

    // Show selection
    document.getElementById(`option${option}`).classList.add('selected');

    // Generate random percentages
    const percentage = Math.floor(Math.random() * 31) + 35; // 35-65%
    const otherPercentage = 100 - percentage;

    // Show percentages
    const pA = option === 'A' ? percentage : otherPercentage;
    const pB = option === 'B' ? percentage : otherPercentage;

    percentageA.textContent = `${pA}%`;
    percentageB.textContent = `${pB}%`;
    
    percentageA.style.opacity = '1';
    percentageB.style.opacity = '1';
}

function resetGame() {
    currentQuestion = -1;
    showNextQuestion();
}

optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showNextQuestion);
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

// Show first question
document.addEventListener('DOMContentLoaded', showNextQuestion);
