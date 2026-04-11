const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                "나에 대한 너의 첫인상은 어땠어?",
                "내 어떤 사소한 행동이 너를 사랑받고 있다고 느끼게 해?",
                "우리의 데이트 중 가장 기억에 남는 추억은 뭐야?",
                "우리를 생각나게 하는 노래가 있어?",
                "내가 불러주는 별명 중 어떤 게 가장 좋아?",
                "내 습관 중에 귀엽다고 생각하는 게 있어?",
                "올해 우리가 꼭 가보고 싶은 여행지는 어디야?",
                "우리가 커플로서 더 발전시키고 싶은 점이 있다면?",
                "언제 나랑 가장 가깝다고 느껴?",
                "우리가 찍은 사진 중 가장 좋아하는 건 뭐야?",
                "어떤 스킨십(비성적인 것)이 너를 가장 행복하게 해?",
                "나에게 꼭 존중받고 싶은 너만의 선(boundary)이 있어?",
                "어떤 영화 장면이 우리 사이랑 가장 비슷하다고 느껴져?",
                "우리가 같이 시작하고 싶은 일상적인 루틴이 있어?",
                "내가 해준 칭찬 중 아직도 기억에 남는 건 뭐야?",
                "내가 너를 어떻게 서포트해주면 좋겠어?",
                "너가 생각하는 가장 이상적인 소박한 데이트는?",
                "나의 어떤 점이 너를 항상 웃게 만들어?",
                "우리가 팀으로서 가장 잘 맞는 부분은 뭐라고 생각해?",
                "나랑 하고 싶은 미래 계획 중 가장 설레는 건 뭐야?",
                "같이 요리해보고 싶은 음식이 있어?",
                "친구들에게 나를 소개할 때 뭐라고 말해?",
                "주말에 우리가 더 자주 했으면 하는 게 있어?",
                "일요일 오후를 나랑 보낸다면 어떻게 보내고 싶어?",
                "내 옷차림 중 어떤 스타일이 제일 예뻐 보여?",
                "우리만의 비밀 암호나 농담이 있다면?",
                "올해 나한테 배운 점이 있어?",
                "하루 중 언제 우리가 가장 연결되어 있다고 느껴?",
                "같이 정주행하고 싶은 드라마나 영화가 있어?",
                "조만간 꼭 해보고 싶은 데이트 아이디어가 있어?"
            ],
            dare: [
                "상대방을 20초 동안 진심으로 꼬옥 안아주기",
                "상대방에게 구체적인 칭찬 3가지 해주기",
                "우리의 첫 데이트 장면을 30초 동안 짧게 재연하기",
                "서로의 손을 잡고 30초 동안 눈 맞춤하기",
                "방 반대편에서 상대방에게 달콤한 문자 보내기",
                "상대방의 특징을 살려 귀엽게 성대모사 하기",
                "상대방을 위해 2줄짜리 짧은 사랑 시 지어주기",
                "노래 한 곡이 끝날 때까지 같이 춤추기",
                "상대방의 어깨를 1분 동안 정성껏 마사지해주기",
                "지금 같이 예쁜 셀카 찍고 간직하기",
                "이번 주에 상대방에게 고마웠던 점 5가지 말하기",
                "다음 데이트 계획을 1분 만에 짜서 발표하기",
                "상대방이 가진 장점에 대해 귓속말로 속삭여주기",
                "손을 잡고 스쿼트 10번 같이 하기",
                "내가 상대방을 처음 좋아하게 됐을 때 표정 짓기",
                "상대방이 내 벨소리를 하루 동안 정해주기",
                "우리 둘만 아는 비밀 손신호 만들기",
                "영화 속 주인공처럼 과장되게 사랑 고백하기",
                "안 쓰는 손으로 종이에 하트 그리고 두 이름 쓰기",
                "사랑 노래 한 구절을 같이 부르기",
                "우리가 했던 데이트 중 좋았던 거 5개 말하기",
                "45초 동안 조용히 서로 기대어 있기",
                "우리의 관계를 위해 짧게 건배사 하고 물 마시기",
                "오늘 상대방 덕분에 기분 좋았던 이유 말하기",
                "가장 잘 나온 셀카 포즈 똑같이 따라 하기",
                "30초 동안 상대방의 손을 잡고 미소 지어주기",
                "무도회장에 온 것처럼 한 바퀴 돌고 인사하기",
                "이번 주에 같이 할 커플 챌린지 하나 정하기",
                "우리의 추억 중 가장 웃겼던 부분 연기하기",
                "상대방의 이름을 세상에서 가장 다정하게 부르기"
            ]
        },
        romantic: {
            truth: [
                "나랑 진지하게 만나고 싶다고 생각하게 된 계기가 뭐야?",
                "우리가 같이 하는 일과 중 가장 좋아하는 시간이 언제야?",
                "내가 해주는 로맨틱한 행동 중 질리지 않는 건 뭐야?",
                "우리 추억 중 어떤 장면이 영화 같다고 느껴져?",
                "아직 못 해본 꿈의 데이트가 있다면 뭐야?",
                "우리 관계가 너에게 '사랑'에 대해 가르쳐준 게 있어?",
                "내가 너의 힘든 날을 어떻게 더 낫게 만들어줬어?",
                "우리가 의미 있게 다시 방문하고 싶은 장소가 있어?",
                "우리가 커플로서 꼭 지켰으면 하는 약속이 있다면?",
                "우리가 함께할 미래 중 가장 기대되는 순간은 언제야?",
                "우리의 공식적인 '커플 송'으로 정하고 싶은 노래는?",
                "나의 어떤 성격이 너를 가장 안심시켜줘?",
                "올해 새로 시작해보고 싶은 우리만의 기념일이나 전통이 있어?",
                "우리가 떨어져 있을 때 내 어떤 점이 가장 그리워?",
                "우리 러브스토리를 한 단어로 표현한다면?",
                "내가 써준 편지나 메시지 중 기억에 남는 문구가 있어?",
                "너에게 우리 관계에서의 정서적 친밀감이란 뭐야?",
                "우리가 더 자주 축하했으면 하는 일이 있어?",
                "나의 어떤 사소한 배려가 너를 감동시켜?",
                "오랫동안 로맨틱한 관계를 유지하려면 어떻게 해야 할까?",
                "어떤 향기를 맡으면 우리 사이가 떠올라?",
                "어떤 로맨틱한 영화 데이트를 따라 해보고 싶어?",
                "다른 사람들에게 우리 이야기 중 어떤 부분을 제일 자랑하고 싶어?",
                "이 관계를 통해 치유된 너만의 두려움이 있어?",
                "나한테 선택받았다고 느낄 때 기분이 어때?",
                "나랑 같이 보낸 시간 중 가장 마법 같았던 순간은?",
                "비 오는 날 우리가 하고 싶은 완벽한 데이트는?",
                "나한테 보내고 싶었지만 쑥스러워서 못 보낸 메시지가 있어?",
                "말없이 '사랑해'라고 표현하는 나의 방법 중 제일 좋아하는 건 뭐야?",
                "우리의 기억 중 하나를 액자에 담아 평생 간직한다면?"
            ],
            dare: [
                "2줄짜리 짧은 러브레터를 써서 소리 내어 읽어주기",
                "상대방의 이마에 5초 동안 부드럽게 키스하기",
                "연애 편지에 너를 묘사한다면 뭐라고 쓸지 말해보기",
                "손을 잡고 서로를 선택한 이유 5가지 나열하기",
                "30초 동안 말없이 서로의 눈만 바라보기",
                "오늘 밤 집에서 할 수 있는 미니 데이트 계획 짜기",
                "가장 좋아하는 커플 사진 포즈 똑같이 재연하기",
                "우리 관계에 대해 고마운 점 하나, 바라는 점 하나 말하기",
                "상대방의 손을 1분 동안 부드럽게 마사지해주기",
                "다음 질문 전까지 모든 대화를 칭찬으로만 하기",
                "우리의 완벽한 결혼기념일 데이트를 상세히 묘사하기",
                "상대방에게 로맨틱한 노래 한 구절 흥얼거려주기",
                "음악 없이 30초 동안 서로를 끌어안고 천천히 춤추기",
                "상대방이 이번 라운드 동안 부를 로맨틱한 애칭 정해주기",
                " '너의 이런 점이 참 좋아'라고 3번 말하기",
                "우리 관계를 상징하는 짧은 좌우명을 1분 안에 만들기",
                "상대방에게 보낼 달콤한 굿나잇 메시지 미리 메모하기",
                "상대방을 안고 세 번 깊게 심호흡 같이 하기",
                "우리의 첫 '심쿵'했던 순간 연기해보기",
                "이번 달에 꼭 같이 하고 싶은 로맨틱한 일 하나 말하기"
            ]
        },
        spicy: {
            truth: [
                "아직 나한테 말하지 못한 판타지가 있어?",
                "내가 너한테 어떤 식으로 유혹할 때가 제일 좋아?",
                "하루 중 나랑 가장 로맨틱해지고 싶은 시간이 언제야?",
                "내가 하는 행동 중 너를 바로 달아오르게 만드는 게 있어?",
                "조만간 우리가 시도해보고 싶은 새로운 자극이 있어?",
                "내 옷차림 중에서 네가 가장 섹시하다고 느끼는 건 뭐야?",
                "우리 사이의 스킨십에서 더 원하는 게 있다면?",
                "지금까지 우리 중에서 가장 대담했던 기억은 뭐야?",
                "어떤 스타일의 애무를 가장 즐겨?",
                "집 안에서 네가 가장 친밀감을 느끼는 장소는 어디야?",
                "나한테 네 몸에 대해 듣고 싶은 최고의 찬사는 뭐야?",
                "예전엔 부끄러워서 못 물어봤던 야한 질문이 있어?",
                "너가 꿈꾸는 완벽한 뜨거운 밤은 어떤 모습이야?",
                "내가 너를 얼마나 원하는지 어떻게 표현해주면 좋겠어?",
                "우리가 같이 공유하고 싶은 비밀스러운 상상이 있어?",
                "우리 사이의 '케미'를 한 단어로 표현한다면?",
                "머릿속에서 자꾸 재생되는 우리만의 야릇한 순간이 있어?",
                "내가 좀 더 먼저 시작해줬으면 하는 게 있어?",
                "이번 달에 시도해보고 싶은 새로운 분위기의 데이트는?",
                "내가 해주는 키스 중 어떤 종류를 제일 좋아해?"
            ],
            dare: [
                "상대방에게 10초 동안 세상에서 가장 치명적인 유혹 해보기",
                "상대방과 10초 동안 아주 천천히 깊게 키스하기",
                "상대방 몸의 부위 중 가장 좋아하는 곳과 이유 속삭이기",
                "상대방을 위한 20초간의 섹시한 댄스(분위기 잡기)",
                "상대방이 원하는 곳 세 군데에 부드럽게 키스해주기",
                "가장 섹시한 목소리로 네가 꿈꾸는 데이트 묘사하기",
                "서로 밀착해서 20초 동안 심장 박동 느껴보기",
                "오늘 밤 나중에 열어볼 수 있는 도발적인 문자 보내기",
                "상대방의 목 라인을 1분 동안 정성껏 마사지해주기",
                "우리가 지켜야 할 스파이시한 규칙 하나 정하기",
                "코와 코를 맞대고 20초 동안 강렬하게 눈 마주치기",
                "이번 달에 꼭 시도해보고 싶은 대담한 일 하나 말하기",
                "상대방이 묻는 야한 질문 하나에 솔직하게 답하기",
                "상대방의 스타일, 향기, 미소에 대해 한 문장으로 찬사하기",
                "상대방을 꽉 껴안고 15초 동안 슬로우 댄스 추기",
                "가장 유혹적인 멘트 하나를 녹음해서 들려주기",
                "우리의 첫 키스 장면을 좀 더 정열적으로 재연하기",
                "우리가 하고 싶은 대담한 소망 하나씩 말해보기",
                "상대방이 정해준 도발적인 애칭으로 라운드 진행하기",
                "이마, 뺨, 그리고 손등에 차례로 키스하기"
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
        questionText.textContent = '👇 커플 라운드: 진실 혹은 도전을 선택하세요 👇';
    } else if (difficulty === 'romantic') {
        selectedDifficulty.innerHTML = '<span class="badge bg-primary">로맨틱 모드</span>';
        questionText.textContent = '👇 로맨틱 라운드: 진실 혹은 도전을 선택하세요 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">스파이시 모드</span>';
        questionText.textContent = '👇 스파이시 라운드: 진실 혹은 도전을 선택하세요 👇';
    }
    selectedDifficulty.style.display = 'block';

    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';
    backButton.style.display = 'inline-block';
}

function selectChoice(type) {
    gameData.currentType = type;
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    questionText.textContent = randomQuestion;
    selectedType.innerHTML = type === 'truth'
        ? '<span class="badge bg-info">진실</span>'
        : '<span class="badge bg-danger">도전</span>';

    selectedType.style.display = 'block';
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    choiceButtons.style.display = 'none';
}

function nextQuestion() {
    if (!gameData.currentType || !gameData.currentDifficulty) return;
    const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = randomQuestion;
}

function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 커플 게임 모드를 선택하세요 👇';
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
    questionText.textContent = '👇 커플 게임 모드를 선택하세요 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
