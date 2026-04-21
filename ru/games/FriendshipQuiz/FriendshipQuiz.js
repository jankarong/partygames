const questions = [
    {
        question: "Если бы TA выиграл(а) в лотерею, что бы он(а) сделал(а) в первую очередь?",
        options: ["Путешествие по миру", "Инвестировал(а)/Сохранил(а)", "Безумный шопинг", "Уволился/Бросил(а) учебу"]
    },
    {
        question: "Какой любимый способ TA снять стресс?",
        options: ["Вкусно и много поесть", "Спать весь день", "Поговорить с кем-то", "Игры или время в одиночестве"]
    },
    {
        question: "Как ты думаешь, какой самый большой страх TA?",
        options: ["Насекомые или пауки", "Остаться в одиночестве", "Остаться без денег", "Быть непонятым(ой)"]
    },
    {
        question: "Если бы ты и TA поменялись телами на день, что бы он(а) сделал(а) первым делом?",
        options: ["Проверил(а) бы твой телефон", "Потратил(а) бы все твои деньги", "Признался(ась) бы кому-то за тебя", "Испортил(а) бы твою репутацию"]
    },
    {
        question: "Какими TA видит идеальные выходные?",
        options: ["Приключения на свежем воздухе", "Лежать на диване до темноты", "Обед и ужин с друзьями", "Погружение в хобби"]
    },
    {
        question: "Какой стиль эмодзи TA использует чаще всего?",
        options: ["Стильные и элегантные", "Милые и нежные", "Саркастичные/Злые", "Смешные/Мемы"]
    },
    {
        question: "Какую еду TA абсолютно НЕ переносит?",
        options: ["Кинза или странная зелень", "Безумно острая еда", "Жирное мясо", "Пресные овощи"]
    },
    {
        question: "Если бы у TA была суперспособность, что бы он(а) выбрал(а)?",
        options: ["Телепортация", "Чтение мыслей", "Невидимость", "Бессмертие"]
    },
    {
        question: "Какая обычно роль у TA в караоке?",
        options: ["Звезда (не отдает микрофон)", "Заводила (поддерживает)", "Едок (только за едой)", "Тихий наблюдатель"]
    },
    {
        question: "Какая основная мотивация ТА копить деньги?",
        options: ["Покупка гаджетов или одежды", "Финансовая безопасность", "Путешествие с близкими", "Не копит (живет моментом)"]
    },
    {
        question: "Какое самое частое оправдание TA за опоздание?",
        options: ["'Я уже еду' (только вышел)", "'Будильник не прозвенел'", "'Пробки были ужасные'", "TA никогда не опаздывает"]
    },
    {
        question: "Какая любимая соцсеть у TA?",
        options: ["Instagram/Stories", "TikTok/Reels", "Reddit/YouTube", "Telegram/VK"]
    },
    {
        question: "Какое, по-твоему, самое очаровательное качество TA?",
        options: ["Внешность или фигура", "Чувство юмора", "Доброта и понимание", "Решительность или мудрость"]
    },
    {
        question: "Какой экстремальный спорт TA хотел(а) бы попробовать?",
        options: ["Прыжок с парашютом", "Банджи-джампинг", "Дайвинг", "Рассказать несмешную шутку боссу"]
    },
    {
        question: "Если бы TA оказался(ась) на необитаемом острове, кого бы он(а) взял(а) с собой?",
        options: ["ТЕБЯ (Конечно!)", "Беара Гриллса (выжить)", "Свою половинку", "Шеф-повара"]
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
        document.querySelector('#start-screen h1').innerText = "Насколько хорошо ты знаешь " + targetFriend + "?";
        document.querySelector('#start-screen p.lead').innerHTML = `${targetFriend} бросил(а) тебе вызов!<br>Сможешь ответить на 100%? Давай узнаем.`;
        friendInput.placeholder = "Введите ваше имя";
    } else {
        mode = "create";
        document.querySelector('#start-screen h1').innerText = "Викторина о дружбе";
        document.querySelector('#start-screen p.lead').innerHTML = "Ответь на 15 вопросов о себе,<br>а потом поделись ссылкой, чтобы узнать, кто знает тебя лучше всех!";
        friendInput.placeholder = "Введите ваше имя";
    }
}

startBtn.addEventListener('click', () => {
    const name = friendInput.value.trim();
    if (!name) { alert("Пожалуйста, введите имя!"); return; }
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
    if (mode === "create") displayText = displayText.replace('TA', 'себя');
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
    progressText.innerText = `Вопрос ${currentQuestion + 1} / ${questions.length}`;
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
            titleEl.innerText = "Тест готов!";
            const answerString = userAnswers.join('');
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(targetFriend)}&ans=${answerString}`;
            percentageEl.innerText = "ГОТОВО";
            descEl.innerHTML = `Отлично, ${targetFriend}! Твой тест готов.<br>Скопируй ссылку ниже и отправь ее лучшим друзьям!`;
            targetFriendSpan.innerText = "СЕБЯ";
            shareBtn.innerHTML = '<i class="fas fa-copy me-2"></i> Копировать ссылку';
            shareBtn.onclick = () => {
                navigator.clipboard.writeText(shareUrl).then(() => { alert("Ссылка скопирована!"); });
            };
            restartBtn.innerText = "Переделать тест";
        } else {
            let score = 0;
            userAnswers.forEach((ans, i) => { if (ans === correctAnswers[i]) score++; });
            const finalPercentage = Math.round((score / questions.length) * 100);
            percentageEl.innerText = `${finalPercentage}%`;
            targetFriendSpan.innerText = targetFriend;
            if (finalPercentage === 100) { titleEl.innerText = "Родственные души (100%)"; descEl.innerText = `Невероятно! Ты и ${targetFriend} на одной волне!`; }
            else if (finalPercentage >= 80) { titleEl.innerText = "Лучшие друзья"; descEl.innerText = `Отлично! Ты знаешь ${targetFriend} очень хорошо.`; }
            else if (finalPercentage >= 50) { titleEl.innerText = "Хорошие друзья"; descEl.innerText = `У вас крепкая связь! Но есть еще что узнать.`; }
            else { titleEl.innerText = "Знакомые?"; descEl.innerText = `Может, пора проводить больше времени с ${targetFriend}?`; }
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i> Поделиться счетом';
            shareBtn.onclick = () => { alert("Сделай скриншот, чтобы поделиться!"); };
            restartBtn.innerText = "Создать свой тест";
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
