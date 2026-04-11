const questions = [
    "술자리에서 테이블 위에 올라가 춤을 출 것 같은 사람은?",
    "첫 데이트에서 키스할 것 같은 사람은?",
    "노래방에서 노래에 가장 진심일 것 같은 사람은?",
    "새벽에 몰래 야식을 먹을 것 같은 사람은?",
    "술 취해서 전 애인에게 연락할 것 같은 사람은?",
    "여행 가서 길을 잃어도 '어떻게든 되겠지'라고 생각할 사람은?",
    "영화를 보다 가장 먼저 잠들 것 같은 사람은?",
    "SNS에 셀카를 가장 많이 올릴 것 같은 사람은?",
    "자신의 흑역사를 당당하게 말할 것 같은 사람은?",
    "분위기를 띄우기 위해 무리한 벌칙도 기꺼이 수행할 사람은?",
    "결혼식에서 부케를 받으려고 가장 열심히 뛸 것 같은 사람은?",
    "아무리 매운 음식도 태연하게 먹을 것 같은 사람은?",
    "아침까지 쉬지 않고 놀 수 있을 것 같은 사람은?",
    "영화나 드라마를 보며 가장 많이 울 것 같은 사람은?",
    "처음 본 사람과도 금방 친해질 것 같은 사람은?",
    "여행 가서 여권을 마지막까지 찾고 있을 것 같은 사람은?",
    "술자리 3차, 4차까지 끝까지 남을 것 같은 사람은?",
    "자신도 모르게 비밀을 발설할 것 같은 사람은?",
    "사람들 앞에서 넘어져도 아무렇지 않은 척할 것 같은 사람은?",
    "술 취하면 갑자기 인생론을 펼칠 것 같은 사람은?",
    "자신의 무용담을 잔뜩 부풀려 말할 것 같은 사람은?",
    "이상한 요리라도 가장 먼저 시도해볼 것 같은 사람은?",
    "놀다 보면 시간 가는 줄 모를 것 같은 사람은?",
    "연예인 성대모사를 가장 잘할 것 같은 사람은?",
    "옷을 뒤집어입고 외출할 것 같은 사람은?",
    "술 취하면 갑자기 노래를 부를 것 같은 사람은?",
    "가장 신선한 비밀을 가지고 있을 것 같은 사람은?",
    "실수해도 웃음으로 승화시킬 것 같은 사람은?",
    "연애 이야기만 나오면 얼굴이 빨개질 것 같은 사람은?",
    "메시지를 엉뚱한 방에 잘못 보낼 것 같은 사람은?",
    "가장 웃긴 사진이 찍힐 것 같은 사람은?",
    "방금 만난 사람의 이름을 바로 잊어버릴 것 같은 사람은?",
    "옛날 SNS 게시물에 실수로 '좋아요'를 누를 것 같은 사람은?",
    "무인도에 떨어져도 가장 잘 살 것 같은 사람은?",
    "복권 1등에 당첨될 것 같은 사람은?",
    "하루 종일 잠만 잘 수 있을 것 같은 사람은?",
    "가장 낯가림이 심할 것 같은 사람은?",
    "가장 먼저 결혼할 것 같은 사람은?",
    "나중에 유명한 연예인이 될 것 같은 사람은?",
    "가장 길치인 사람은?",
    "나중에 엄청난 부자가 될 것 같은 사람은?",
    "평소에는 조용하지만 술 마시면 돌변할 것 같은 사람은?",
    "거짓말을 가장 못 할 것 같은 사람은?",
    "자기애가 가장 강할 것 같은 사람은?",
    "평소에 연락이 가장 안 되는 사람은?"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    if (nextQuestionBtn) {
        nextQuestionBtn.textContent = '게임 시작';
        nextQuestionBtn.addEventListener('click', nextQuestion);
    }
});

function nextQuestion() {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = '다음 질문';

    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);
    document.getElementById('questionText').textContent = currentQuestion;
}
