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
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> Customize Your Answers';
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
                    <h5 class="modal-title">Customize Your Magic Answers</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        Create your own magic answers! They will be saved automatically.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer" 
                            placeholder="Type your custom answer here..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">No custom answers yet. Add your first one!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <!-- Counter Row -->
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2" id="customAnswerCount">0 answers</span>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger" id="clearCustomAnswers">Clear All</button>
                            <button type="button" class="btn btn-success" id="saveCustomAnswers">Confirm</button>
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
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ],
        silly: [
            "As sure as unicorns are real!",
            "My crystal ball says YES!",
            "Absolutely... NOT!",
            "The stars align to say maybe?",
            "Ask me after my coffee break.",
            "The magic hamster says yes!",
            "Only if you hop on one foot.",
            "My magic 8 ball is on vacation.",
            "The answer is hiding under your bed.",
            "Yes, but only on Tuesdays.",
            "No way, José!",
            "The universe says to try again.",
            "That's a hard no from me.",
            "Yes, with sprinkles on top!",
            "My sources are giggling too hard to answer.",
            "The answer is blowing in the wind.",
            "Ask your pet, they know better.",
            "The magic says yes, but logic says no.",
            "Only if pigs start flying tomorrow.",
            "The answer is 42. Always 42."
        ],
        sarcastic: [
            "Oh, absolutely. And I'm the Queen of England.",
            "Let me check my crystal ball... it says 'obviously not'.",
            "Sure, and unicorns are real too.",
            "Is water not wet?",
            "I'd say yes, but I'd be lying.",
            "In what universe would that be true?",
            "Wow, you really asked that?",
            "I'm going to pretend you didn't ask that.",
            "Hmm, let me think... no.",
            "The odds are slightly worse than winning the lottery. Twice.",
            "I could answer, but I'm too busy rolling my eyes.",
            "Do you really need me to answer that?",
            "I'm laughing too hard to answer properly.",
            "Oh honey, no.",
            "Sure, when pigs fly first class.",
            "I'd bet my non-existent money on 'no'.",
            "That's hilarious. Next question please.",
            "Are you serious right now?",
            "I'm going to need more coffee before answering that.",
            "The answer is so obvious I'm not even going to say it."
        ],
        romance: [
            "Love is in the air!",
            "Your heart knows the answer already.",
            "Cupid's arrow never misses.",
            "The stars align for romance.",
            "Love will find a way.",
            "Not all who wander in love are lost.",
            "Follow your heart on this one.",
            "Love is patient; maybe you should be too.",
            "The heart wants what it wants.",
            "Romance is just around the corner.",
            "This love was written in the stars.",
            "Maybe it's time to make the first move.",
            "Love is a journey, not a destination.",
            "Your romantic future looks bright!",
            "Trust the process of love.",
            "Sometimes love needs a little time.",
            "The best love stories take time to unfold.",
            "Your heart won't lead you astray.",
            "Love comes when you least expect it.",
            "This connection has potential."
        ],
        drinking: [
            "Drink up, buttercup!",
            "Take a shot!",
            "Bottoms up!",
            "Your turn to drink!",
            "Drink twice!",
            "Everyone drinks!",
            "Skip your turn, lucky you!",
            "Choose someone to drink!",
            "No drink this time!",
            "Cheers! Take a sip!",
            "Drink water instead, stay hydrated!",
            "Last person to raise their hand drinks!",
            "Tell a joke or take a drink!",
            "Drink if you've ever...",
            "Rock, paper, scissors with your neighbor. Loser drinks!",
            "Drink if you're wearing blue!",
            "Take a sip for each pet you have!",
            "Drink if you checked your phone in the last 10 minutes!",
            "The tallest person drinks!",
            "Drink if you've binged a show this week!"
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
            const customOption = new Option('✨ Custom Answers', 'custom');
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
            if (confirm('Are you sure you want to delete all custom answers?')) {
                customAnswers = [];
                updateCustomAnswersList();
            }
        });

        // Update custom answer count when modal is shown
        modalContainer.addEventListener('show.bs.modal', () => {
            document.getElementById('customAnswerCount').textContent =
                `${customAnswers.length} answer${customAnswers.length !== 1 ? 's' : ''}`;
        });

    }

    // Update custom answers list
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');

        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} answers`;

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

    // 添加保存按钮的事件监听器 (Modal中的按钮)
    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
            // 显示提示消息
            const toast = document.createElement('div');
            toast.className = 'toast position-fixed bottom-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.innerHTML = `
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Success</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Your custom answers are now active!
                </div>
            `;
            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            setTimeout(() => toast.remove(), 3000);
        } else {
            alert('Please add at least one custom answer before applying changes.');
        }
    });

});