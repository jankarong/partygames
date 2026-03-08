const make50 = (base, generator) => {
  const out = [...base];
  let i = 0;
  while (out.length < 50) {
    out.push(generator(i, out.length));
    i += 1;
  }
  return out.slice(0, 50);
};

const softTopics = ["свидание", "выходные", "рутина", "поездка", "вечер", "утро", "плейлист", "фото", "поцелуй", "прогулка"];
const romanticTopics = ["годовщина", "любовное письмо", "будущее", "дом", "ритуал", "обещание", "доверие", "близость", "план", "воспоминание"];
const spicyTopics = ["флирт", "прикосновение", "темп", "атмосфера", "фантазия", "взгляд", "притяжение", "коммуникация", "граница", "aftercare"];

const softTruth = make50([
  "Каким было твое первое впечатление обо мне?",
  "Какой мой маленький жест дает тебе чувство любви?",
  "Какое наше общее воспоминание ты любишь больше всего?",
  "Когда ты чувствуешь себя со мной ближе всего?",
  "В чем мы как пара особенно сильны?",
  "Какая моя привычка кажется тебе милой?",
  "Куда ты хочешь съездить со мной в этом году?",
  "Что нам стоит улучшить в отношениях?",
  "Какое наше фото тебе нравится больше всего?",
  "Какой мой нежный жест успокаивает тебя сильнее всего?",
  "Какой ежедневный ритуал нам важно сохранить?",
  "Какой мой комплимент ты до сих пор помнишь?",
  "Как выглядит идеальное недорогое свидание для нас?",
  "Какую нашу внутреннюю шутку ты не хочешь терять?",
  "Когда ты особенно чувствуешь, что мы команда?",
  "Что нам стоит чаще делать по выходным?",
  "Какой мой образ тебе нравится сильнее всего?",
  "Какое спокойное занятие вдвоем тебя расслабляет?",
  "Что ты больше всего любишь в нашей повседневности?",
  "За что на этой неделе ты хочешь меня поблагодарить?"
], (i) => `Какая идея про ${softTopics[i % softTopics.length]} лучше всего подходит нам как паре сейчас?`);

const softDare = make50([
  "Обними партнера искренне 20 секунд.",
  "Скажи 3 конкретных комплимента партнеру.",
  "Разыграйте ваше первое свидание за 30 секунд.",
  "Держитесь за руки и смотрите друг другу в глаза 30 секунд.",
  "Отправь партнеру короткое нежное сообщение прямо сейчас.",
  "Станцуйте вместе один полный трек.",
  "Сделай минутный массаж плеч.",
  "Сделайте новое селфи пары.",
  "Назови 5 вещей, за которые ты благодарен(на) сегодня.",
  "За 1 минуту придумайте следующее свидание.",
  "Шепни партнеру, что ты в нем(ней) особенно ценишь.",
  "Придумайте ваш секретный жест пары.",
  "Спойте вместе припев романтичной песни.",
  "Сделайте 10 синхронных приседаний.",
  "По очереди назовите 5 любимых совместных свиданий.",
  "Обнимайтесь 45 секунд молча.",
  "Скажите мини-тост за ваши отношения.",
  "Назначьте мини-свидание без телефона на этой неделе.",
  "Оба завершите фразу: Я выбираю тебя, потому что...",
  "Пройдитесь 20 секунд, держась за руки."
], (i) => `Сделайте 20-секундное мини-задание на тему ${softTopics[i % softTopics.length]}.`);

const romanticTruth = make50([
  "Когда ты понял(а), что хочешь со мной серьезных отношений?",
  "Какой мой романтичный жест тебе никогда не надоедает?",
  "Какое наше воспоминание похоже на сцену из фильма?",
  "Какое свидание-мечту ты хочешь прожить со мной?",
  "Чему наши отношения научили тебя в любви?",
  "Как я помогаю тебе в сложные дни?",
  "Какое обещание между нами для тебя самое важное?",
  "Какую следующую большую веху ты хочешь пройти со мной?",
  "Какая песня должна быть нашей официальной песней пары?",
  "Какая моя черта дает тебе чувство безопасности?",
  "Какую романтическую традицию ты хочешь создать с мной?",
  "По чему ты больше всего скучаешь, когда мы не рядом?",
  "Каким словом ты описал(а) бы нашу историю любви?",
  "Что для тебя значит эмоциональная близость между нами?",
  "Какой мой маленький жест мгновенно улучшает твой день?",
  "Как нам сохранить романтику на долгой дистанции времени?",
  "Какую часть нашей истории ты любишь рассказывать?",
  "Когда ты в последний раз снова влюбился(лась) в меня?",
  "Что в наших date night нужно обязательно беречь?",
  "Какую картину нашего будущего ты чаще всего представляешь?"
], (i) => `Какое видение вокруг темы ${romanticTopics[i % romanticTopics.length]} лучше всего подходит нашей паре?`);

const romanticDare = make50([
  "Напиши 2 романтические строки и прочитай вслух.",
  "Сделай поцелуй в лоб на 5 секунд.",
  "Опиши партнера как в любовном письме.",
  "Возьмитесь за руки и назовите 5 причин, почему вы выбираете друг друга.",
  "30 секунд смотрите друг другу в глаза без слов.",
  "Придумайте мини-свидание на сегодняшний вечер.",
  "Повторите вашу любимую позу с парного фото.",
  "Скажи 1 благодарность и 1 желание для отношений.",
  "Сделай минутный массаж рук.",
  "Один раунд говори только комплиментами.",
  "Напой романтическую строчку песни.",
  "Танцуйте медленно 30 секунд без музыки.",
  "Придумайте личный девиз вашей пары.",
  "Трижды закончи фразу: Я ценю тебя, потому что...",
  "Поделись романтическим планом на этот месяц.",
  "Сделайте фото с названием Наша новая глава.",
  "Скажите друг другу искреннее спасибо одним предложением.",
  "Поделись воспоминанием, от которого до сих пор бабочки.",
  "Пообещай одну теплую заботу на завтра.",
  "Завершите раунд поцелуем по взаимному согласию."
], (i) => `Сделайте 20-секундное романтическое задание на тему ${romanticTopics[i % romanticTopics.length]}.`);

const spicyTruth = make50([
  "Какую фантазию ты мне еще не рассказывал(а)?",
  "Какой мой флирт действует на тебя сильнее всего?",
  "Что я делаю, что мгновенно тебя заводит?",
  "Какую новую интимную активность ты хочешь попробовать со мной?",
  "Какой мой образ кажется тебе самым привлекательным?",
  "Чего тебе хочется больше в нашей интимности?",
  "Какое мое прикосновение тебя и расслабляет, и возбуждает?",
  "Какой тип поцелуя тебе нравится больше всего?",
  "Что ты хочешь, чтобы я чаще инициировал(а)?",
  "Какая атмосфера работает для тебя лучше всего?",
  "Какая граница для тебя особенно важна в близости?",
  "Какой aftercare тебе нужен больше всего?",
  "Какие мои слова звучат для тебя наиболее соблазнительно?",
  "Что нам всегда стоит проговаривать до spicy-моментов?",
  "Какую смелую, но безопасную идею ты хочешь попробовать?",
  "Какой мой комплимент дает тебе чувство желанности?",
  "Какой темп сближения тебе нравится?",
  "Какой интимный вопрос ты давно хотел(а) мне задать?",
  "Что дает тебе больше всего безопасности в смелых моментах?",
  "Что в нашей химии ты точно не хочешь потерять?"
], (i) => `Как нам выстроить ${spicyTopics[i % spicyTopics.length]}, чтобы это было и горячо, и безопасно для нас двоих?`);

const spicyDare = make50([
  "Прошепчи уверенную флирт-фразу 10 секунд.",
  "Сделай медленный 10-секундный поцелуй (по согласию).",
  "Тихо скажи, что тебе особенно нравится в теле партнера.",
  "Сделайте 20 секунд интенсивного зрительного контакта.",
  "Отправь флирт-сообщение на вечер.",
  "Сделай минутный массаж шеи.",
  "В одном предложении назови границу и желание.",
  "За 20 секунд опиши идеальную атмосферу вашего вечера.",
  "Станцуйте 15 секунд в очень близком медленном ритме.",
  "Предложи безопасную, но смелую идею для следующего приватного свидания.",
  "Сделайте check-in безопасности с кодовым словом.",
  "Задай spicy вопрос да/нет и честно ответь.",
  "Поцелуй в лоб, щеку и руку по очереди.",
  "Под музыку двигайтесь чувственно 20 секунд.",
  "Закончи фразу: Сегодня вечером я хочу с тобой...",
  "Скажи один романтичный и один страстный комплимент.",
  "Сделай игривый жест иди ко мне и улыбнись.",
  "Назови 3 слова про вашу химию.",
  "Сделайте PG13-версию lap dance на 10 секунд по согласию.",
  "Завершите раунд безопасным spicy мини-челленджем."
], (i) => `Сделайте согласованное 20-секундное задание на тему ${spicyTopics[i % spicyTopics.length]}.`);

const gameData = {
  currentType: null,
  currentDifficulty: null,
  questions: {
    soft: { truth: softTruth, dare: softDare },
    romantic: { truth: romanticTruth, dare: romanticDare },
    spicy: { truth: spicyTruth, dare: spicyDare }
  }
};

const t = {
  choose: "👇 Выберите режим пары 👇",
  chooseRound: "👇 Выберите Правду или Действие 👇",
  chooseRomantic: "👇 Романтический режим: Правда или Действие 👇",
  chooseSpicy: "👇 Пикантный режим: Правда или Действие 👇",
  softBadge: "Мягкий режим",
  romanticBadge: "Романтический режим",
  spicyBadge: "Пикантный режим",
  truthBadge: "Правда",
  dareBadge: "Действие"
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
    selectedDifficulty.innerHTML = '<span class="badge bg-success">' + t.softBadge + '</span>';
    questionText.textContent = t.chooseRound;
  } else if (difficulty === 'romantic') {
    selectedDifficulty.innerHTML = '<span class="badge bg-primary">' + t.romanticBadge + '</span>';
    questionText.textContent = t.chooseRomantic;
  } else {
    selectedDifficulty.innerHTML = '<span class="badge bg-warning">' + t.spicyBadge + '</span>';
    questionText.textContent = t.chooseSpicy;
  }
  selectedDifficulty.style.display = 'block';
  difficultyButtons.style.display = 'none';
  choiceButtons.style.display = 'flex';
  backButton.style.display = 'inline-block';
}

function selectChoice(type) {
  gameData.currentType = type;
  const questions = gameData.questions[gameData.currentDifficulty][type];
  questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
  selectedType.innerHTML = type === 'truth'
    ? '<span class="badge bg-info">' + t.truthBadge + '</span>'
    : '<span class="badge bg-danger">' + t.dareBadge + '</span>';
  selectedType.style.display = 'block';
  nextButton.style.display = 'inline-block';
  resetButton.style.display = 'inline-block';
  choiceButtons.style.display = 'none';
}

function nextQuestion() {
  if (!gameData.currentType || !gameData.currentDifficulty) return;
  const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
  questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
}

function backToDifficulty() {
  gameData.currentType = null;
  questionText.textContent = t.choose;
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
  questionText.textContent = t.choose;
  selectedType.style.display = 'none';
  selectedDifficulty.style.display = 'none';
  nextButton.style.display = 'none';
  resetButton.style.display = 'none';
  backButton.style.display = 'none';
  choiceButtons.style.display = 'none';
  difficultyButtons.style.display = 'flex';
}
