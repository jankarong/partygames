// База данных слов
const wordDatabase = {
    animals: [
        "Слон", "Жираф", "Пингвин", "Кенгуру", "Лев", "Тигр", "Обезьяна",
        "Бабочка", "Паук", "Крокодил", "Дельфин", "Орёл", "Осьминог",
        "Панда", "Кролик", "Змея", "Зебра", "Медведь", "Сова", "Лягушка"
    ],
    actions: [
        "Плавание", "Танцы", "Катание на лыжах", "Готовка", "Рисование", "Бег",
        "Игра на гитаре", "Чтение", "Сон", "Пение", "Бокс",
        "Катание на коньках", "Серфинг", "Баскетбол", "Фотографирование",
        "Рыбалка", "Жонглирование", "Теннис", "Дайвинг", "Письмо"
    ],
    objects: [
        "Зонт", "Телефон", "Компьютер", "Гитара", "Камера", "Часы",
        "Очки", "Книга", "Стул", "Стол", "Карандаш", "Зеркало", "Дверь",
        "Окно", "Лампа", "Телевизор", "Велосипед", "Пианино", "Рюкзак",
        "Наушники"
    ],
    movies: [
        "Звёздные войны", "Титаник", "Король Лев", "Гарри Поттер", "Аватар",
        "Парк Юрского периода", "Человек-паук", "Матрица", "В поисках Немо",
        "Пираты Карибского моря", "Холодное сердце", "Мстители", "История игрушек",
        "Бэтмен", "Индиана Джонс", "Чужой", "Челюсти", "Супермен", "Охотники за привидениями",
        "Волшебник страны Оз"
    ],
    funny: [
        "Пьяный", "Зомби", "Супергерой", "Плач",
        "Сноб", "Банановая кожура", "Танец курицы",
        "Элвис", "Невидимая коробка", "Сонный",
        "Высокие каблуки", "Младенец", "Больная спина",
        "Одержимый", "Запор", "СМС на ходу",
        "Неловкое свидание", "Подкрадывание", "Драма", "Споткнулся",
        "Икота", "Растерянный", "Застенчивый", "Злой",
        "Взволнованный", "Усталый", "Робот", "Космонавт"
    ],
    sports: [
        "Плавание", "Теннис", "Баскетбол", "Американский футбол", "Бейсбол", "Футбол",
        "Гольф", "Волейбол", "Лыжи", "Хоккей", "Бокс", "Борьба",
        "Гимнастика", "Серфинг", "Скейтбординг", "Скалолазание", "Боулинг",
        "Настольный теннис", "Бадминтон", "Стрельба из лука"
    ],
    professions: [
        "Доктор", "Учитель", "Шеф-повар", "Полицейский", "Пожарный", "Медсестра",
        "Инженер", "Адвокат", "Стоматолог", "Фотограф", "Пилот", "Космонавт",
        "Строитель", "Парикмахер", "Актёр", "Фокусник", "Клоун", "Уборщик",
        "Библиотекарь", "Охранник"
    ],
    historical: [
        "Наполеон Бонапарт", "Клеопатра", "Альберт Эйнштейн", "Шекспир",
        "Бенджамин Франклин", "Жанна д'Арк", "Авраам Линкольн", "Юлий Цезарь",
        "Мария Кюри", "Джордж Вашингтон", "Королева Елизавета I", "Леонардо да Винчи",
        "Аттила", "Сократ", "Мартин Лютер Кинг", "Роза Паркс",
        "Уинстон Черчилль", "Мэрилин Монро", "Элвис Пресли", "Махатма Ганди"
    ]
};

class CharadesGame {
    constructor() {
        this.setupScreen = document.getElementById('setup-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.currentWordElement = document.getElementById('current-word');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.gameHeader = document.querySelector('#game-header');
        this.infoSection = document.querySelector('#info-section');

        this.initializeButtons();
        this.resetGame();
    }

    initializeButtons() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('correct').addEventListener('click', () => this.handleCorrect());
        document.getElementById('skip').addEventListener('click', () => this.handleSkip());
        document.getElementById('play-again').addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        this.score = 0;
        this.currentWords = [];
        this.correctWords = [];
        this.skippedWords = [];
        this.timeLeft = 60;
        this.isGameRunning = false;

        this.setupScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.remove('hidden');
        this.infoSection.classList.remove('hidden');

        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value);
        const category = document.getElementById('word-category').value;

        this.currentWords = this.getWords(category);
        if (this.currentWords.length === 0) {
            alert('Недостаточно слов!');
            return;
        }

        this.setupScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.add('hidden');
        this.infoSection.classList.add('hidden');

        this.isGameRunning = true;
        this.nextWord();
        this.startTimer();
    }

    getWords(category) {
        let words = [];
        if (category === 'all') {
            Object.values(wordDatabase).forEach(categoryWords => {
                words = words.concat(categoryWords);
            });
        } else {
            words = wordDatabase[category] || [];
        }
        return this.shuffleArray([...words]);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            console.log("Таймер:", this.timeLeft);

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    nextWord() {
        if (this.currentWords.length > 0) {
            const word = this.currentWords.pop();
            this.currentWordElement.textContent = word;
            console.log("Текущее слово:", word);
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        if (!this.isGameRunning) return;
        console.log("Кнопка правильно нажата");

        this.correctWords.push(this.currentWordElement.textContent);
        this.score += 1;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        if (!this.isGameRunning) return;
        console.log("Кнопка пропустить нажата");

        this.skippedWords.push(this.currentWordElement.textContent);
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = `Счёт: ${this.score}`;
    }

    endGame() {
        this.isGameRunning = false;
        clearInterval(this.timerInterval);

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `Финальный счёт: ${this.score}`;

        let summary = '<h3>Угаданные слова:</h3>';
        summary += this.correctWords.length > 0 ?
            `<p>${this.correctWords.join(', ')}</p>` :
            '<p>Нет</p>';

        summary += '<h3>Пропущенные слова:</h3>';
        summary += this.skippedWords.length > 0 ?
            `<p>${this.skippedWords.join(', ')}</p>` :
            '<p>Нет</p>';

        document.getElementById('word-summary').innerHTML = summary;
    }
}

// Инициализация игры при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM загружен, инициализация игры...");
    new CharadesGame();
});
