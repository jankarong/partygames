const questions = [
    {
        question: "Se TA ganhasse na loteria, qual seria a primeira coisa que faria?",
        options: ["Viajar pelo mundo", "Investir/Guardar", "Compras loucas", "Sair do emprego/escola"]
    },
    {
        question: "Qual é a forma favorita de TA para desestressar?",
        options: ["Comer uma refeição enorme", "Dormir o dia todo", "Conversar com alguém", "Jogar ou ficar sozinho"]
    },
    {
        question: "Qual você acha que é o maior medo de TA?",
        options: ["Insetos ou bichos", "Ficar sozinho", "Ficar sem dinheiro", "Ser incompreendido"]
    },
    {
        question: "Se você e TA trocassem de corpo por um dia, o que ele(a) faria primeiro?",
        options: ["Checar seu celular/privacidade", "Gastar todo o seu dinheiro", "Se declarar para alguém por você", "Arruinar sua vida social"]
    },
    {
        question: "Qual é a ideia de TA de um fim de semana perfeito?",
        options: ["Aventuras ao ar livre", "Ficar no sofá até escurecer", "Brunch & jantar com amigos", "Imerso em um hobby"]
    },
    {
        question: "Qual estilo de emoji TA mais usa?",
        options: ["Cool & Elegante", "Fofo", "Sarcástico/Irônico", "Engraçado/Memes"]
    },
    {
        question: "Qual comida TA absolutamente NÃO suporta?",
        options: ["Coentros ou ervas estranhas", "Comida muito apimentada", "Carne gordurosa", "Legumes sem gosto"]
    },
    {
        question: "Se TA tivesse um superpoder, qual seria?",
        options: ["Teletransporte", "Ler mentes", "Invisibilidade", "Imortalidade"]
    },
    {
        question: "No Karaoke, qual é o papel de TA usualmente?",
        options: ["A estrela (não solta o microfone)", "O animador (incentiva)", "O comedor (só petiscos)", "O observador silencioso"]
    },
    {
        question: "Qual é a motivação principal de TA para economizar dinheiro?",
        options: ["Comprar gadgets ou roupas", "Segurança financeira", "Viajar com entes queridos", "Não economiza"]
    },
    {
        question: "Qual é a desculpa mais comum de TA para estar atrasado?",
        options: ["'Estou a caminho' (acabou de sair)", "'O despertador não tocou'", "'O trânsito estava horrível'", "TA nunca se atrasa"]
    },
    {
        question: "Qual é a rede social favorita de TA?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Twitter/X"]
    },
    {
        question: "Qual você acha que é a qualidade mais charmosa de TA?",
        options: ["Aparência ou físico", "Humor ou coração de ouro", "QE alto ou gentileza", "Decisão ou sabedoria"]
    },
    {
        question: "Qual esporte radical TA gostaria de tentar?",
        options: ["Paraquedismo", "Bungee jumping", "Mergulho", "Contar uma piada ruim para o chefe"]
    },
    {
        question: "Se estivesse em uma ilha deserta, quem TA levaria?",
        options: ["VOCÊ (Claro!)", "Bear Grylls (para sobreviver)", "O crush ou parceiro", "Um chef de classe mundial"]
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
        document.querySelector('#start-screen h1').innerText = "O quanto você conhece " + targetFriend + "?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} te desafiou!<br>Consegue acertar 100%? Vamos descobrir.`;
        friendInput.placeholder = "Digite seu nome";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Quiz de Amizade";
        document.querySelector('#start-screen p.lead').innerHTML = "Responda a estas 15 perguntas sobre você,<br>depois compartilhe o link para ver quem te conhece melhor!";
        friendInput.placeholder = "Digite seu nome";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) { alert("Por favor, digite um nome!"); return; }
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
    if (mode === "create") displayText = displayText.replace('TA', 'você mesmo');
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
    progressText.innerText = `Pergunta ${currentQuestion + 1} / ${questions.length}`;
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
            titleEl.innerText = "Teste Pronto!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            percentageEl.innerText = "OK";
            descEl.innerHTML = `Boa, ${targetFriend}! Seu teste está pronto.<br>Copie o link abaixo e envie para seus melhores amigos!`;
            targetFriendSpan.innerText = "VOCÊ MESMO";
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Copiar Link';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => { alert("Link copiado!"); });
            };
            restartBtn.innerText = "Refazer Teste";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => { if (ans === correctAnswers[i]) score++; });
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            targetFriendSpan.innerText = targetFriend;
            if (finalPercentage === 100) { titleEl.innerText = "Almas Gêmeas (100%)"; descEl.innerText = `Incrível! Você e ${targetFriend} estão perfeitamente sintonizados!`; }
            else if (finalPercentage >= 80) { titleEl.innerText = "Melhores Amigos"; descEl.innerText = `Muito bem! Você conhece ${targetFriend} extremamente bem.`; }
            else if (finalPercentage >= 50) { titleEl.innerText = "Boa Química"; descEl.innerText = `Vocês têm um selo sólido! Ainda há o que descobrir.`; }
            else { titleEl.innerText = "Conhecidos?"; descEl.innerText = `Talvez seja hora de passar mais tempo com ${targetFriend}!`; }
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Compartilhar Placar';
            shareBtn.onclick = () => { alert("Tire um print para compartilhar!"); };
            restartBtn.innerText = "Criar Meu Próprio Teste";
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
