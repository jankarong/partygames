const questions = [
    {
        question: "Si TA gagnait à la loterie, quelle serait la première chose qu'il/elle ferait ?",
        options: ["Voyager à travers le monde", "Épargner/Investir", "Une virée shopping folle", "Démissionner/Arrêter l'école"]
    },
    {
        question: "Quel est le moyen préféré de TA pour décompresser ?",
        options: ["Faire un énorme repas", "Dormir toute la journée", "Parler à quelqu'un", "Jouer aux jeux vidéo ou être seul"]
    },
    {
        question: "Quelle est selon vous la plus grande peur de TA ?",
        options: ["Les insectes ou les bestioles", "Être tout seul", "Manquer d'argent", "Être mal compris"]
    },
    {
        question: "Si vous et TA changiez de corps pour une journée, que ferait-il/elle en premier ?",
        options: ["Vérifier votre téléphone/vie privée", "Dépenser tout votre argent", "Se confesser à quelqu'un pour vous", "Ruiner votre vie sociale"]
    },
    {
        question: "Quelle est l'idée de TA d'un week-end parfait ?",
        options: ["Aventures en plein air", "Passer la journée sur le canapé", "Brunch & dîner avec des amis", "S'immerger dans un hobby"]
    },
    {
        question: "Quel style d'emoji TA utilise-t-il/elle le plus ?",
        options: ["Cool & Élégant", "Doux & Mignon", "Sarcastique/Méchant", "Drôle/Style mème"]
    },
    {
        question: "Quel aliment TA ne supporte-t-il/elle absolument PAS ?",
        options: ["Les herbes à l'odeur étrange (coriandre etc.)", "La nourriture incroyablement épicée", "La viande grasse", "Les légumes sans goût"]
    },
    {
        question: "Si TA avait un super-pouvoir, il/elle voudrait... ?",
        options: ["La téléportation", "Lire dans les pensées", "L'invisibilité", "L'immortalité"]
    },
    {
        question: "Au Karaoké, quel est le rôle de TA habituellement ?",
        options: ["La star (ne lâche pas le micro)", "L'ambianceur (encourage)", "Le mangeur (ne fait que grignoter)", "L'observateur silencieux"]
    },
    {
        question: "Quelle est la motivation principale de TA pour économiser de l'argent ?",
        options: ["Acheter des gadgets ou des vêtements", "La sécurité financière", "Voyager avec des proches", "Il/elle n'économise pas"]
    },
    {
        question: "Quelle est l'excuse la plus courante de TA pour être en retard ?",
        options: ["'Je suis en chemin' (vient de partir)", "'Le réveil n'a pas sonné'", "'Le trafic était horrible aujourd'hui'", "TA n'est jamais en retard"]
    },
    {
        question: "Quelle est la plateforme sociale préférée de TA ?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Twitter/X"]
    },
    {
        question: "Quelle est selon vous la qualité la plus charmante de TA ?",
        options: ["Le look ou le physique", "L'humour ou le cœur d'or", "L'intelligence émotionnelle ou la gentilless", "La détermination ou la sagesse"]
    },
    {
        question: "Quel sport extrême TA aimerait-il/elle essayer ?",
        options: ["Saut en parachute", "Saut à l'élastique", "Plongée sous-marine", "Raconter une blague nulle au patron"]
    },
    {
        question: "S'il/si elle était coincé(e) sur une île déserte, qui TA emmènerait-il/elle ?",
        options: ["VOUS (Bien sûr !)", "Bear Grylls (pour survivre)", "Son crush ou partenaire", "Un chef de classe mondiale"]
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
        document.querySelector('#start-screen h1').innerText = "À quel point connaissez-vous " + targetFriend + " ?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} vous a défié !<br>Pouvez-vous obtenir 100 % ? Découvrons-le.`;
        friendInput.placeholder = "Entrez votre nom";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Quiz d'amitié";
        document.querySelector('#start-screen p.lead').innerHTML = "Répondez à ces 15 questions sur vous-même,<br>puis partagez le lien pour voir qui vous connaît le mieux !";
        friendInput.placeholder = "Entrez votre nom";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) { alert("Veuillez entrer un nom !"); return; }
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
    if (mode === "create") displayText = displayText.replace('TA', 'vous-même');
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
    progressText.innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
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
            titleEl.innerText = "Quiz prêt !";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            percentageEl.innerText = "PRÊT";
            descEl.innerHTML = `Super, ${targetFriend} ! Votre quiz est prêt.<br>Copiez le lien ci-dessous et envoyez-le à vos amis !`;
            targetFriendSpan.innerText = "VOUS-MÊME";
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Copier le lien';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => { alert("Lien copié !"); });
            };
            restartBtn.innerText = "Recommencer";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => { if (ans === correctAnswers[i]) score++; });
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            targetFriendSpan.innerText = targetFriend;
            if (finalPercentage === 100) { titleEl.innerText = "Ames sœurs (100%)"; descEl.innerText = `Incroyable ! Vous et ${targetFriend} êtes en parfaite harmonie !`; }
            else if (finalPercentage >= 80) { titleEl.innerText = "Meilleurs amis"; descEl.innerText = `Bravo ! Vous connaissez ${targetFriend} extrêmement bien.`; }
            else if (finalPercentage >= 50) { titleEl.innerText = "Bonne alchimie"; descEl.innerText = `Vous avez un lien solide ! Quelques découvertes à faire.`; }
            else { titleEl.innerText = "Connaissances ?"; descEl.innerText = `Il est peut-être temps de passer plus de temps avec ${targetFriend} !`; }
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Partager le score';
            shareBtn.onclick = () => { alert("Prenez une capture d'écran pour partager !"); };
            restartBtn.innerText = "Créer mon propre quiz";
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
