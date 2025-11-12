// Define Portuguese answers - run as early as possible, outside DOMContentLoaded
window.ptAnswers = {
    classic: [
        "É certo.",
        "Decididamente sim.",
        "Sem dúvida.",
        "Sim, definitivamente.",
        "Você pode confiar nisso.",
        "Como eu vejo, sim.",
        "Muito provável.",
        "As perspectivas são boas.",
        "Sim.",
        "Os sinais apontam para sim.",
        "Resposta nebulosa, tente novamente.",
        "Pergunte novamente mais tarde.",
        "Melhor não te dizer agora.",
        "Não posso prever agora.",
        "Concentre-se e pergunte novamente.",
        "Não conte com isso.",
        "Minha resposta é não.",
        "Minhas fontes dizem não.",
        "As perspectivas não são tão boas.",
        "Muito duvidoso."
    ],
    silly: [
        "Tão certo quanto unicórnios são reais!",
        "Minha bola de cristal diz SIM!",
        "Absolutamente... NÃO!",
        "As estrelas se alinham para dizer talvez?",
        "Me pergunte depois do meu intervalo para café.",
        "O hamster mágico diz sim!",
        "Só se você pular em um pé só.",
        "Minha bola mágica 8 está de férias.",
        "A resposta está escondida debaixo da sua cama.",
        "Sim, mas apenas às terças-feiras.",
        "De jeito nenhum, José!",
        "O universo diz para tentar novamente.",
        "Isso é um não definitivo de mim.",
        "Sim, com granulado por cima!",
        "Minhas fontes estão rindo muito para responder.",
        "A resposta está soprando no vento.",
        "Pergunte ao seu pet, ele sabe melhor.",
        "A mágica diz sim, mas a lógica diz não.",
        "Só se porcos começarem a voar amanhã.",
        "A resposta é 42. Sempre 42."
    ],
    sarcastic: [
        "Ah, absolutamente. E eu sou a Rainha da Inglaterra.",
        "Deixe-me verificar minha bola de cristal... diz 'obviamente não'.",
        "Claro, e unicórnios são reais também.",
        "A água não é molhada?",
        "Eu diria sim, mas estaria mentindo.",
        "Em que universo isso seria verdade?",
        "Uau, você realmente perguntou isso?",
        "Vou fingir que você não perguntou isso.",
        "Hmm, deixe-me pensar... não.",
        "As chances são um pouco piores do que ganhar na loteria. Duas vezes.",
        "Eu poderia responder, mas estou ocupado revirando os olhos.",
        "Você realmente precisa que eu responda isso?",
        "Estou rindo demais para responder adequadamente.",
        "Ah, querido, não.",
        "Claro, quando porcos voarem em primeira classe.",
        "Apostaria meu dinheiro inexistente em 'não'.",
        "Isso é hilário. Próxima pergunta, por favor.",
        "Você está falando sério agora?",
        "Vou precisar de mais café antes de responder isso.",
        "A resposta é tão óbvia que nem vou dizer."
    ],
    romance: [
        "O amor está no ar!",
        "Seu coração já sabe a resposta.",
        "A flecha do Cupido nunca erra.",
        "As estrelas se alinham para o romance.",
        "O amor encontrará um caminho.",
        "Nem todos que vagam no amor estão perdidos.",
        "Siga seu coração neste.",
        "O amor é paciente; talvez você devesse ser também.",
        "O coração quer o que quer.",
        "O romance está logo ali na esquina.",
        "Este amor foi escrito nas estrelas.",
        "Talvez seja hora de dar o primeiro passo.",
        "O amor é uma jornada, não um destino.",
        "Seu futuro romântico parece brilhante!",
        "Confie no processo do amor.",
        "Às vezes o amor precisa de um pouco de tempo.",
        "As melhores histórias de amor levam tempo para se desenvolver.",
        "Seu coração não te levará pelo caminho errado.",
        "O amor vem quando você menos espera.",
        "Esta conexão tem potencial."
    ],
    drinking: [
        "Beba, querido!",
        "Tome um shot!",
        "Fundo!",
        "Sua vez de beber!",
        "Beba duas vezes!",
        "Todo mundo bebe!",
        "Pule sua vez, sortudo você!",
        "Escolha alguém para beber!",
        "Sem bebida desta vez!",
        "Saúde! Tome um gole!",
        "Beba água, mantenha-se hidratado!",
        "A última pessoa a levantar a mão bebe!",
        "Conte uma piada ou beba!",
        "Beba se você já...",
        "Pedra, papel, tesoura com seu vizinho. Perdedor bebe!",
        "Beba se você está usando azul!",
        "Tome um gole para cada pet que você tem!",
        "Beba se você checou seu celular nos últimos 10 minutos!",
        "A pessoa mais alta bebe!",
        "Beba se você maratonou uma série esta semana!"
    ]
};

// Add custom answers support when DOMContentLoaded fires
document.addEventListener('DOMContentLoaded', function () {
    // Load custom answers from localStorage
    let customAnswers = JSON.parse(localStorage.getItem('customAnswers')) || [];

    // Add custom version to answers object (will be added by main script)
    window.ptAnswers.custom = customAnswers;

    // Create and append custom answers UI
    function createCustomAnswersUI() {
        // Add custom option to version select if not exists
        if (!Array.from(versionSelect.options).some(option => option.value === 'custom')) {
            const customOption = new Option('✨ Respostas Personalizadas', 'custom');
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
            if (confirm('Tem certeza de que deseja excluir todas as respostas personalizadas?')) {
                customAnswers = [];
                updateCustomAnswersList();
            }
        });

        // Update custom answer count when modal is shown
        modalContainer.addEventListener('show.bs.modal', () => {
            document.getElementById('customAnswerCount').textContent =
                `${customAnswers.length} resposta${customAnswers.length !== 1 ? 's' : ''}`;
        });

    }

    // Update custom answers list
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');

        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} respostas`;

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
        window.ptAnswers.custom = customAnswers;
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

        /* Melhorar estilo da resposta no histórico */
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

        /* Estilo da pergunta */
        .question {
            color: #333;
            font-weight: 500;
            max-width: 60%;
            word-wrap: break-word;
        }

        /* Melhorar animação de agitar a bola mágica */
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
        const answerList = window.ptAnswers[version];
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

    // Adicionar listener do botão salvar (Botão no Modal)
    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
            // Mostrar mensagem de confirmação
            const toast = document.createElement('div');
            toast.className = 'toast position-fixed bottom-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.innerHTML = `
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Sucesso</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Suas respostas personalizadas estão ativas agora!
                </div>
            `;
            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            setTimeout(() => toast.remove(), 3000);
        } else {
            alert('Por favor, adicione pelo menos uma resposta personalizada antes de aplicar as mudanças.');
        }
    });

});
