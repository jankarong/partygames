const questions = [
    { optionA: "一生甘いものを食べられない", optionB: "一生しょっぱいものを食べられない" },
    { optionA: "みんなの心が読める", optionB: "自分の心をみんなに読まれる" },
    { optionA: "過去に戻って一つだけやり直せる", optionB: "未来を一度だけ見られる" },
    { optionA: "昼しか起きていられない", optionB: "夜しか起きていられない" },
    { optionA: "世界一頭がいいけれど誰にも愛されない", optionB: "みんなに愛されるけれど頭脳は平均的" },
    { optionA: "瞬間移動できるけれど毎回10分酔う", optionB: "飛べるけれど高さは3メートルまで" },
    { optionA: "一生疲れない", optionB: "一生空腹にならない" },
    { optionA: "動物と話せる", optionB: "人間の言語を全部話せる" },
    { optionA: "無限のお金があるが自分には使えない", optionB: "半分の額でも自由に使える" },
    { optionA: "音楽のない世界で生きる", optionB: "映画やドラマのない世界で生きる" }
];

let currentQuestion = -1;
let selectedOption = null;

const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionAText = document.getElementById('optionAText');
const optionBText = document.getElementById('optionBText');
const nextButton = document.getElementById('nextQuestion');

function showNextQuestion() {
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    document.getElementById('percentageA').style.opacity = '0';
    document.getElementById('percentageB').style.opacity = '0';
    selectedOption = null;

    currentQuestion = (currentQuestion + 1) % questions.length;
    const question = questions[currentQuestion];
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;
    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';
    document.getElementById(`option${option}`).classList.add('selected');

    const percentage = Math.floor(Math.random() * 31) + 35;
    const otherPercentage = 100 - percentage;
    document.getElementById(`percentage${option}`).textContent = `${percentage}%`;
    document.getElementById(`percentage${otherOption}`).textContent = `${otherPercentage}%`;
    document.getElementById(`percentage${option}`).style.opacity = '1';
    document.getElementById(`percentage${otherOption}`).style.opacity = '1';
}

optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showNextQuestion);
showNextQuestion();
