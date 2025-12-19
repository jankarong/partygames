document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    // Create customize button
    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> Настроить ответы';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Настроить волшебные ответы</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        Создайте свои волшебные ответы! Они будут сохранены автоматически.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer"
                            placeholder="Введите свой ответ здесь..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> Добавить
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">Пока нет пользовательских ответов. Добавьте первый!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <!-- Counter Row -->
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2" id="customAnswerCount">0 ответов</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger" id="clearCustomAnswers">Очистить всё</button>
                            <button type="button" class="btn btn-success" id="saveCustomAnswers">Подтвердить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    // Initialize Bootstrap modal
    const modal = new bootstrap.Modal(modalContainer);

    // Show modal when customize button is clicked
    customizeButton.addEventListener('click', () => modal.show());


    // Answers for different versions (use Portuguese if available)
    let answers = window.ptAnswers || {
        classic: [
            "Бесспорно.",
            "Предрешено.",
            "Никаких сомнений.",
            "Определённо да.",
            "Можешь быть уверен в этом.",
            "Мне кажется - да.",
            "Вероятнее всего.",
            "Хорошие перспективы.",
            "Да.",
            "Знаки говорят - да.",
            "Пока не ясно, попробуй ещё раз.",
            "Спроси позже.",
            "Лучше не говорить тебе сейчас.",
            "Сейчас нельзя предсказать.",
            "Сконцентрируйся и спроси опять.",
            "Даже не думай.",
            "Мой ответ - нет.",
            "По моим данным - нет.",
            "Перспективы не очень хорошие.",
            "Весьма сомнительно."
        ],
        silly: [
            "Так же точно, как существуют единороги!",
            "Мой хрустальный шар говорит ДА!",
            "Абсолютно... НЕТ!",
            "Звёзды намекают на возможно?",
            "Спроси меня после кофе-брейка.",
            "Волшебный хомячок сказал да!",
            "Только если попрыгаешь на одной ноге.",
            "Мой магический шар в отпуске.",
            "Ответ прячется под твоей кроватью.",
            "Да, но только по вторникам.",
            "Ни в коем случае, Хосе!",
            "Вселенная советует попробовать ещё раз.",
            "Это категоричное нет от меня.",
            "Да, с посыпкой сверху!",
            "Мои источники смеются слишком сильно, чтобы ответить.",
            "Ответ развеян по ветру.",
            "Спроси своего питомца, он знает лучше.",
            "Магия говорит да, но логика говорит нет.",
            "Только если свиньи начнут летать завтра.",
            "Ответ - 42. Всегда 42."
        ],
        sarcastic: [
            "О, конечно. А я королева Англии.",
            "Дай-ка проверю свой хрустальный шар... он говорит 'очевидно нет'.",
            "Конечно, и единороги тоже реальны.",
            "А вода разве не мокрая?",
            "Я бы сказал да, но я бы солгал.",
            "В какой вселенной это было бы правдой?",
            "Вау, ты правда это спросил?",
            "Я сделаю вид, что ты этого не спрашивал.",
            "Хмм, дай подумать... нет.",
            "Шансы чуть хуже, чем дважды выиграть в лотерею.",
            "Я мог бы ответить, но я слишком занят закатыванием глаз.",
            "Тебе правда нужен мой ответ на это?",
            "Я смеюсь слишком сильно, чтобы ответить правильно.",
            "О милый, нет.",
            "Конечно, когда свиньи полетят бизнес-классом.",
            "Я бы поставил свои несуществующие деньги на 'нет'.",
            "Это уморительно. Следующий вопрос, пожалуйста.",
            "Ты сейчас серьёзно?",
            "Мне нужно больше кофе, прежде чем отвечать на это.",
            "Ответ настолько очевиден, что я даже не буду его говорить."
        ],
        romance: [
            "Любовь витает в воздухе!",
            "Твоё сердце уже знает ответ.",
            "Стрела Купидона никогда не промахивается.",
            "Звёзды складываются в пользу романтики.",
            "Любовь найдёт выход.",
            "Не все, кто блуждает в любви, потеряны.",
            "Следуй за своим сердцем в этом вопросе.",
            "Любовь терпелива; возможно, тебе тоже стоит быть терпеливым.",
            "Сердце хочет того, чего хочет.",
            "Романтика уже не за горами.",
            "Эта любовь была написана на звёздах.",
            "Может быть, пора сделать первый шаг.",
            "Любовь - это путешествие, а не пункт назначения.",
            "Твоё романтическое будущее выглядит светлым!",
            "Доверься процессу любви.",
            "Иногда любви нужно немного времени.",
            "Лучшие истории любви разворачиваются со временем.",
            "Твоё сердце тебя не подведёт.",
            "Любовь приходит, когда меньше всего её ждёшь.",
            "У этой связи есть потенциал."
        ],
        drinking: [
            "Пей до дна, лютик!",
            "Принимай шот!",
            "До дна!",
            "Твоя очередь пить!",
            "Пей дважды!",
            "Все пьют!",
            "Пропусти свой ход, везунчик!",
            "Выбери кого-нибудь выпить!",
            "На этот раз не пьёшь!",
            "За здоровье! Сделай глоток!",
            "Вместо этого пей воду, оставайся гидратированным!",
            "Последний, кто поднимет руку, пьёт!",
            "Расскажи шутку или выпей!",
            "Пей, если ты когда-нибудь...",
            "Камень, ножницы, бумага с соседом. Проигравший пьёт!",
            "Пей, если на тебе что-то синее!",
            "Сделай глоток за каждого своего питомца!",
            "Пей, если проверял телефон за последние 10 минут!",
            "Самый высокий человек пьёт!",
            "Пей, если запоем смотрел сериал на этой неделе!"
        ]
    };

    // Load custom answers from localStorage
    let customAnswers = JSON.parse(localStorage.getItem('customAnswers')) || [];

    // Add custom version to answers object
    answers.custom = customAnswers;

    // Create and append custom answers UI
    function createCustomAnswersUI() {
        // Add custom option to version select if not exists
        if (!Array.from(versionSelect.options).some(option => option.value === 'custom')) {
            const customOption = new Option('✨ Свои ответы', 'custom');
            versionSelect.add(customOption);
        }

        // Update custom answers list
        updateCustomAnswersList();

        // Add event listeners for custom answers
        const addButton = document.getElementById('addCustomAnswer');
        const input = document.getElementById('customAnswer');
        const clearButton = document.getElementById('clearCustomAnswers');

        addButton.addEventListener('click', addCustomAnswer);
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') addCustomAnswer();
        });

        // Add input validation and character count
        input.addEventListener('input', function () {
            const remaining = 100 - this.value.length;
            addButton.disabled = this.value.trim().length === 0;
            if (remaining <= 20) {
                this.classList.add('is-warning');
            } else {
                this.classList.remove('is-warning');
            }
        });

        clearButton.addEventListener('click', function () {
            if (confirm('Вы уверены, что хотите удалить все пользовательские ответы?')) {
                customAnswers = [];
                updateCustomAnswersList();
            }
        });

        // Update custom answer count when modal is shown
        modalContainer.addEventListener('show.bs.modal', () => {
            const count = customAnswers.length;
            let text = `${count} ответ`;
            if (count === 0 || count >= 5) text += 'ов';
            else if (count === 1) text += '';
            else if (count <= 4) text += 'а';
            document.getElementById('customAnswerCount').textContent = text;
        });

    }

    // Update custom answers list
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');

        list.innerHTML = '';
        const count = customAnswers.length;
        let text = `${count} ответ`;
        if (count === 0 || count >= 5) text += 'ов';
        else if (count === 1) text += '';
        else if (count <= 4) text += 'а';
        countBadge.textContent = text;

        if (customAnswers.length === 0) {
            emptyState.style.display = 'block';
            list.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            list.style.display = 'block';

            customAnswers.forEach((answer, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div class="answer-content">
                        <span class="answer-text">${answer}</span>
                    </div>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary edit-answer" data-index="${index}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-danger delete-answer" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                list.appendChild(li);

                // Add hover effect
                li.addEventListener('mouseenter', () => li.classList.add('active'));
                li.addEventListener('mouseleave', () => li.classList.remove('active'));
            });
        }

        // Update answers object and localStorage
        answers.custom = customAnswers;
        localStorage.setItem('customAnswers', JSON.stringify(customAnswers));

        // Add event listeners for action buttons
        document.querySelectorAll('.delete-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const li = this.closest('li');

                // Add fade-out animation
                li.style.transition = 'opacity 0.3s';
                li.style.opacity = '0';

                setTimeout(() => {
                    customAnswers.splice(index, 1);
                    updateCustomAnswersList();
                }, 300);
            });
        });

        document.querySelectorAll('.edit-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const answerText = this.closest('li').querySelector('.answer-text');
                const originalText = answerText.textContent;

                // Create inline edit
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control form-control-sm';
                input.value = originalText;

                answerText.replaceWith(input);
                input.focus();

                const saveEdit = () => {
                    const newText = input.value.trim();
                    if (newText && newText !== originalText) {
                        customAnswers[index] = newText;
                        updateCustomAnswersList();
                    } else {
                        input.replaceWith(answerText);
                    }
                };

                input.addEventListener('blur', saveEdit);
                input.addEventListener('keypress', e => {
                    if (e.key === 'Enter') {
                        saveEdit();
                    }
                });
            });
        });
    }

    // Add custom answer
    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();

        if (answer && !customAnswers.includes(answer)) {
            // Add with animation
            customAnswers.unshift(answer); // Add to beginning of array
            updateCustomAnswersList();
            input.value = '';

            // Highlight new answer
            const firstItem = document.querySelector('#customAnswersList li:first-child');
            if (firstItem) {
                firstItem.style.animation = 'highlightNew 1s';
            }
        } else if (customAnswers.includes(answer)) {
            // Show error feedback
            input.classList.add('is-invalid');
            setTimeout(() => input.classList.remove('is-invalid'), 1000);
        }
    }

    // Add necessary styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-answers-wrapper {
            max-height: 50vh;
            overflow-y: auto;
        }
        .answer-content {
            flex: 1;
            margin-right: 1rem;
        }
        @keyframes highlightNew {
            0% { background-color: #e3f2fd; }
            100% { background-color: transparent; }
        }
        .is-warning {
            border-color: #ffc107;
        }
        .is-invalid {
            animation: shake 0.5s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        #customAnswersModal .modal-body {
            padding: 1.5rem;
        }
        #customAnswersModal .list-group-item {
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            border: 1px solid rgba(0,0,0,.125);
        }
        #customAnswersModal .btn-group {
            opacity: 0;
            transition: opacity 0.2s;
        }
        #customAnswersModal .list-group-item:hover .btn-group {
            opacity: 1;
        }
        
        /* Modal Footer Button Styles */
        #customAnswersModal .modal-footer {
            border-top: 2px solid #80deea;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.9) 100%);
            padding: 1.5rem;
        }
        
        #customAnswersModal .btn {
            border-radius: 25px;
            padding: 0.6rem 1.5rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            box-shadow: 0 3px 0 rgba(0,0,0,0.1);
        }
        
        #customAnswersModal .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 0 rgba(0,0,0,0.1);
        }
        
        #customAnswersModal .btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 0 rgba(0,0,0,0.1);
        }
        
        #customAnswersModal .btn-outline-danger {
            border: 2px solid #dc3545;
            color: #dc3545;
            background: white;
        }
        
        #customAnswersModal .btn-outline-danger:hover {
            background: #dc3545;
            color: white;
            border-color: #dc3545;
        }
        
        
        #customAnswersModal .btn-success {
            background: #198754;
            border: 2px solid #198754;
            color: white;
        }
        
        #customAnswersModal .btn-success:hover {
            background: #157347;
            border-color: #157347;
        }
        
        #customAnswersModal .badge {
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(87, 88, 187, 0.3);
        }
        
        /* Button group styling */
        #customAnswersModal .btn-group .btn {
            border-radius: 0;
        }
        
        #customAnswersModal .btn-group .btn:first-child {
            border-radius: 25px 0 0 25px;
        }
        
        #customAnswersModal .btn-group .btn:last-child {
            border-radius: 0 25px 25px 0;
        }
        
        /* Responsive button layout */
        @media (max-width: 576px) {
            #customAnswersModal .modal-footer .d-flex {
                flex-direction: column;
                gap: 1rem;
            }
            
            #customAnswersModal .btn-group {
                width: 100%;
                margin: 0 !important;
            }
            
            #customAnswersModal .btn-group .btn {
                flex: 1;
            }
            
            #clearCustomAnswers {
                width: 100%;
            }
        }
        
        /* 改进历史记录中答案的样式 */
        .answer-badge {
            background-color: #5758BB;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 60%;
            text-align: right;
            word-wrap: break-word;
        }
        
        /* 问题样式 */
        .question {
            color: #333;
            font-weight: 500;
            max-width: 60%;
            word-wrap: break-word;
        }
        
        /* 加强魔法球的shake动画 */
        .magic-ball {
            transition: transform 0.1s;
            transform-origin: center center;
        }
        
        .magic-ball.shake {
            animation: shakeBall 1.2s cubic-bezier(.36,.07,.19,.97);
        }
        
        @keyframes shakeBall {
            0% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-30px, -40px) rotate(-25deg); }
            20% { transform: translate(30px, 20px) rotate(20deg); }
            30% { transform: translate(-30px, -30px) rotate(-20deg); }
            40% { transform: translate(30px, 25px) rotate(15deg); }
            50% { transform: translate(-20px, -20px) rotate(-15deg); }
            60% { transform: translate(20px, 15px) rotate(10deg); }
            70% { transform: translate(-15px, -15px) rotate(-10deg); }
            80% { transform: translate(15px, 10px) rotate(5deg); }
            90% { transform: translate(-10px, -5px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);

    // Create custom answers UI
    createCustomAnswersUI();

    // History of questions and answers
    let history = [];

    // Function to adjust text size based on length
    function adjustTextSize(text) {
        answerElement.classList.remove('long-text', 'very-long-text');

        if (text.length > 20 && text.length <= 50) {
            answerElement.classList.add('long-text');
        } else if (text.length > 50) {
            answerElement.classList.add('very-long-text');
        }

        return text;
    }

    // Function to get a random answer based on the selected version
    function getRandomAnswer(version) {
        const answerList = answers[version];
        const randomIndex = Math.floor(Math.random() * answerList.length);
        return answerList[randomIndex];
    }

    // Function to handle the shake animation and answer generation
    const handleShake = () => {
        // Prevent multiple shakes
        if (magicBall.classList.contains('shake')) return;

        const question = questionInput.value.trim();

        // Add shake class to trigger animation
        magicBall.classList.add('shake');

        // Get answer based on selected version
        const answer = getRandomAnswer(versionSelect.value);

        // Update answer after a delay
        setTimeout(() => {
            answerElement.textContent = adjustTextSize(answer);
        }, 500);

        // Remove shake class after animation
        setTimeout(() => {
            magicBall.classList.remove('shake');
            // Only add to history if there was a question
            if (question) {
                addToHistory(question, answer);
            }
        }, 1000);
    };

    // Function to add to history
    function addToHistory(question, answer) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span class="question">${question}</span>
                <span class="answer-badge">${answer}</span>
            </div>
        `;
        historyList.insertBefore(li, historyList.firstChild);

        // Keep only last 10 items
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    // Event listeners
    shakeButton.addEventListener('click', handleShake);
    magicBall.addEventListener('click', handleShake);

    questionInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleShake();
        }
    });

    // Initialize with the number 8
    answerElement.textContent = '8';

    // Добавление обработчика для кнопки сохранения (кнопка в модальном окне)
    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
            // Показать уведомление
            const toast = document.createElement('div');
            toast.className = 'toast position-fixed bottom-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.innerHTML = `
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Успешно</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Ваши пользовательские ответы теперь активны!
                </div>
            `;
            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            setTimeout(() => toast.remove(), 3000);
        } else {
            alert('Пожалуйста, добавьте хотя бы один пользовательский ответ перед применением изменений.');
        }
    });

});