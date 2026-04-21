const questions = [
    {
        question: "Wenn TA im Lotto gewinnen würde, was wäre das Erste, was sie/er tun würde?",
        options: ["Um die Welt reisen", "Es anlegen/sparen", "Ein verrückter Shopping-Trip", "Job/Schule kündigen"]
    },
    {
        question: "Was ist TAs bevorzugte Art, Stress abzubauen?",
        options: ["Ein riesiges Essen genießen", "Den ganzen Tag schlafen", "Mit jemandem reden", "Zocken oder Zeit allein"]
    },
    {
        question: "Was ist deiner Meinung nach TAs größte Angst?",
        options: ["Insekten oder Krabbeltiere", "Ganz allein zu sein", "Dass das Geld ausgeht", "Missverstanden zu werden"]
    },
    {
        question: "Wenn du und TA für einen Tag den Körper tauschen würdet, was würde sie/er zuerst tun?",
        options: ["Dein Handy/Privatsphäre checken", "Dein ganzes Geld ausgeben", "Für dich jemandem eine Liebeserklärung machen", "Dein soziales Leben ruinieren"]
    },
    {
        question: "Was ist TAs Vorstellung von einem perfekten Wochenende?",
        options: ["Abenteuer im Freien", "Couch-Potato bis dunkelt", "Brunch & Dinner mit Freunden", "In einem Hobby versinken"]
    },
    {
        question: "Welchen Emoji-Stil benutzt TA am häufigsten?",
        options: ["Cool & Elegant", "Süß & Kitschig", "Sarkastisch/Gemein", "Lustig/Meme-Stil"]
    },
    {
        question: "Welches Essen kann TA absolut NICHT ausstehen?",
        options: ["Komisch riechendes Grünzeug (Koriander etc.)", "Wahnsinnig scharfes Essen", "Fettiges Fleisch", "Geschmackloses Gemüse"]
    },
    {
        question: "Wenn TA eine Superkraft hätte, welche wäre es?",
        options: ["Teleportation", "Gedankenlesen", "Unsichtbarkeit", "Unsterblichkeit"]
    },
    {
        question: "Welche Rolle hat TA normalerweise beim Karaoke?",
        options: ["Der Star (gibt das Mikro nicht ab)", "Die Stimmungskanone (anfeuern)", "Der Esser (nur am Buffet)", "Der stille Beobachter"]
    },
    {
        question: "Was ist TAs Hauptmotivation beim Geldsparen?",
        options: ["Gadgets oder Kleidung kaufen", "Finanzielle Sicherheit", "Reisen mit geliebten Menschen", "TA spart nicht (lebt von Tag zu Tag)"]
    },
    {
        question: "Was ist TAs häufigste Ausrede fürs Zu-spät-kommen?",
        options: ["'Bin schon unterwegs' (gerade erst los)", "'Wecker nicht gehört'", "'Stau war schrecklich heute'", "TA kommt nie zu spät"]
    },
    {
        question: "Was ist TAs Lieblings-Social-Media-Plattform?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Twitter/X"]
    },
    {
        question: "Was ist deiner Meinung nach TAs charmanteste Eigenschaft?",
        options: ["Aussehen oder Figur", "Goldener Humor", "Hohe EQ oder Herzlichkeit", "Entschlossenheit oder Weisheit"]
    },
    {
        question: "Welche Extremsportart würde TA gerne ausprobieren?",
        options: ["Fallschirmspringen", "Bungeespringen", "Tauchen", "Dem Chef einen schlechten Witz erzählen"]
    },
    {
        question: "Wenn TA auf einer einsamen Insel stranden würde, wen würde sie/er mitnehmen?",
        options: ["DICH (Natürlich!)", "Bear Grylls (zum Überleben)", "Ihren/Seinen Crush oder Partner", "Einen Weltklasse-Koch"]
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
        
        document.querySelector('#start-screen h1').innerText = "Wie gut kennst du " + targetFriend + "?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} hat dich herausgefordert!<br>Kannst du 100% erreichen? Finden wir es heraus.`;
        friendInput.placeholder = "Dein Name eingeben";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Freundschafts-Quiz";
        document.querySelector('#start-screen p.lead').innerHTML = "Beantworte diese 15 Fragen über dich selbst,<br>und teile den Link, um zu sehen, wer dich am besten kennt!";
        friendInput.placeholder = "Dein Name eingeben";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) {
        alert("Bitte gib einen Namen ein!");
        return;
    }
    
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
    
    if (mode === "create") {
        displayText = displayText.replace('TA', 'dich selbst');
    } else {
        displayText = displayText.replace('TA', targetFriend);
    }
    
    questionText.innerText = displayText;
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn pulse-hover';
        btn.innerText = option;
        btn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    progressText.innerText = `Frage ${currentQuestion + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(index) {
    userAnswers.push(index);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
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
            titleEl.innerText = "Quiz bereit!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            
            percentageEl.innerText = "FERTIG";
            
            descEl.innerHTML = `Super, ${targetFriend}! Dein Quiz ist fertig.<br>Kopiere den Link unten und sende ihn an deine Besties!`;
            targetFriendSpan.innerText = "DICH SELBST";
            
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Link kopieren';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("Link kopiert! Jetzt senden!");
                });
            };
            
            restartBtn.innerText = "Quiz neu machen";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === correctAnswers[i]) score++;
            });
            
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            
            targetFriendSpan.innerText = targetFriend;
            
            if (finalPercentage === 100) {
                titleEl.innerText = "Seelenverwandte (100%)";
                descEl.innerText = `Unglaublich! Du und ${targetFriend} seid perfekt synchron!`;
            } else if (finalPercentage >= 80) {
                titleEl.innerText = "Besties";
                descEl.innerText = `Toll! Du kennst ${targetFriend} extrem gut.`;
            } else if (finalPercentage >= 50) {
                titleEl.innerText = "Gute Chemie";
                descEl.innerText = `Ihr habt eine starke Bindung! Aber es gibt noch einiges zu entdecken.`;
            } else {
                titleEl.innerText = "Bekannte?";
                descEl.innerText = `Vielleicht solltet ihr mal wieder mehr Zeit zusammen verbringen!`;
            }
            
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Score teilen';
            shareBtn.onclick = () => {
                 if (navigator.share) {
                    navigator.share({
                        title: 'Freundschafts-Test Ergebnisse',
                        text: `Ich kenne ${targetFriend} zu ${finalPercentage}%! Kannst du das schlagen?`,
                        url: window.location.href
                    });
                } else {
                    alert("Mach einen Screenshot zum Teilen!");
                }
            };
            
            restartBtn.innerText = "Eigenes Quiz erstellen";
            restartBtn.onclick = () => {
                window.location.href = window.location.pathname;
            };
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
