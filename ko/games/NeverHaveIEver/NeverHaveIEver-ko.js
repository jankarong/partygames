const statements = [
    "나는 절대로 첫 데이트에서 키스해본 적이 없다.",
    "나는 절대로 친구의 연인에게 호감을 느껴본 적이 없다.",
    "나는 절대로 메시지를 엉뚱한 사람에게 잘못 보낸 적이 없다.",
    "나는 절대로 약속을 취소하려고 아픈 척해본 적이 없다.",
    "나는 절대로 나이를 속여본 적이 없다.",
    "나는 절대로 몰래 연애를 해본 적이 없다.",
    "나는 절대로 시험에서 커닝을 해본 적이 없다.",
    "나는 절대로 거짓말을 하다가 들킨 적이 없다.",
    "나는 절대로 밤새도록 술을 마셔본 적이 없다.",
    "나는 절대로 수업이나 회의 중에 졸아본 적이 없다.",
    "나는 절대로 샤워하면서 노래를 크게 불러본 적이 없다.",
    "나는 절대로 사람들 앞에서 크게 넘어진 적이 없다.",
    "나는 절대로 집 앞 편의점에 잠옷 차림으로 간 적이 없다.",
    "나는 절대로 연예인이나 캐릭터와 진심으로 사랑에 빠진 적이 없다.",
    "나는 절대로 누군가의 휴대폰을 몰래 훔쳐본 적이 없다.",
    "나는 절대로 SNS에서 엄청 잘 사는 척 연출 사진을 올린 적이 없다.",
    "나는 절대로 아르바이트나 회사 경력을 부풀려 말한 적이 없다.",
    "나는 절대로 짝사랑하는 사람의 SNS를 구석구석 뒤져본 적이 없다.",
    "나는 절대로 인터넷 쇼핑으로 충동구매를 해본 적이 없다.",
    "나는 절대로 버스나 지하철에서 졸다가 종점까지 간 적이 없다.",
    "나는 절대로 술 취해서 흑역사를 생성해본 적이 없다.",
    "나는 절대로 길거리에서 번호를 따여본 적이 없다.",
    "나는 절대로 헤어진 연인에게 '자니?'라고 연락해본 적이 없다.",
    "나는 절대로 혼자 코인 노래방에 가본 적이 없다.",
    "나는 절대로 부모님께 성적표를 속인 적이 없다.",
    "나는 절대로 1년 이상 연애를 쉬어본 적이 없다.",
    "나는 절대로 친구의 비밀을 나도 모르게 발설한 적이 없다.",
    "나는 절대로 길에서 모르는 사람을 아는 사람으로 착각해 인사한 적이 없다.",
    "나는 절대로 화장실이 급해서 식은땀을 흘려본 적이 없다.",
    "나는 절대로 배달 음식을 시키고 문 앞에서 기사님 가기를 기다렸다가 가져온 적이 없다.",
    "나는 절대로 길에서 연예인을 마주친 적이 없다.",
    "나는 절대로 혼자서 영화관에 가본 적이 없다.",
    "나는 절대로 실수로 부장님이나 선생님께 '엄마'라고 부른 적이 없다.",
    "나는 절대로 짝사랑하는 사람 앞에서 넘어진 적이 없다.",
    "나는 절대로 휴대폰을 변기에 빠뜨린 적이 없다.",
    "나는 절대로 모르는 사람의 결혼식에 축의금 내고 밥 먹은 적이 없다.",
    "나는 절대로 가위눌려 본 적이 없다.",
    "나는 절대로 머리를 3일 이상 안 감은 적이 없다.",
    "나는 절대로 친구 몰래 친구의 간식을 뺏어 먹은 적이 없다.",
    "나는 절대로 잠꼬대를 심하게 해본 적이 없다."
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return '모든 질문이 끝났습니다! 다시 하려면 새로고침해 주세요.';
        }

        const availableStatements = statements.filter(statement => !usedStatements.includes(statement));
        const randomIndex = Math.floor(Math.random() * availableStatements.length);
        const selectedStatement = availableStatements[randomIndex];
        usedStatements.push(selectedStatement);
        return selectedStatement;
    }

    nextButton.addEventListener('click', () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === '시작') {
            nextButton.textContent = '다음';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
            nextButton.style.opacity = '0.5';
        }
    });
});
