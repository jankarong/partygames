document.addEventListener('DOMContentLoaded', function () {
    // Éléments DOM
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    // Créer le bouton de personnalisation
    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> Personnalisez vos réponses';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    // Créer le conteneur modal
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Personnalisez vos réponses magiques</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        Créez vos propres réponses magiques! Elles seront enregistrées automatiquement.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer"
                            placeholder="Tapez votre réponse personnalisée ici..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> Ajouter
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">Pas encore de réponses personnalisées. Ajoutez-en une première!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <!-- Ligne de compteur -->
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2" id="customAnswerCount">0 réponses</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger" id="clearCustomAnswers">Tout effacer</button>
                            <button type="button" class="btn btn-success" id="saveCustomAnswers">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    // Initialiser le modal Bootstrap
    const modal = new bootstrap.Modal(modalContainer);

    // Afficher le modal lorsque le bouton personnaliser est cliqué
    customizeButton.addEventListener('click', () => modal.show());


    // Réponses pour différentes versions
    const answers = {
        classic: [
            "C'est certain.",
            "C'est décidément ainsi.",
            "Sans aucun doute.",
            "Oui, définitivement.",
            "Vous pouvez compter dessus.",
            "Selon moi, oui.",
            "Très probablement.",
            "Les perspectives sont bonnes.",
            "Oui.",
            "Les signes indiquent que oui.",
            "Réponse floue, réessayez.",
            "Demandez à nouveau plus tard.",
            "Mieux vaut ne pas vous le dire maintenant.",
            "Impossible de prédire maintenant.",
            "Concentrez-vous et demandez à nouveau.",
            "N'y comptez pas.",
            "Ma réponse est non.",
            "Mes sources disent non.",
            "Les perspectives ne sont pas si bonnes.",
            "Très douteux."
        ],
        silly: [
            "Aussi sûr que les licornes sont réelles!",
            "Ma boule de cristal dit OUI!",
            "Absolument... PAS!",
            "Les étoiles s'alignent pour dire peut-être?",
            "Demandez-moi après ma pause-café.",
            "Le hamster magique dit oui!",
            "Seulement si vous sautez sur un pied.",
            "Ma boule magique 8 est en vacances.",
            "La réponse se cache sous votre lit.",
            "Oui, mais seulement le mardi.",
            "Pas question!",
            "L'univers dit d'essayer à nouveau.",
            "C'est un non catégorique de ma part.",
            "Oui, avec des paillettes en plus!",
            "Mes sources rient trop fort pour répondre.",
            "La réponse flotte dans le vent.",
            "Demandez à votre animal de compagnie, il sait mieux.",
            "La magie dit oui, mais la logique dit non.",
            "Seulement si les cochons commencent à voler demain.",
            "La réponse est 42. Toujours 42."
        ],
        sarcastic: [
            "Oh, absolument. Et je suis la reine d'Angleterre.",
            "Laissez-moi vérifier ma boule de cristal... elle dit 'évidemment pas'.",
            "Bien sûr, et les licornes sont réelles aussi.",
            "Est-ce que l'eau n'est pas mouillée?",
            "Je dirais oui, mais je mentirais.",
            "Dans quel univers cela serait-il vrai?",
            "Wow, vous avez vraiment demandé ça?",
            "Je vais faire comme si vous n'aviez pas demandé ça.",
            "Hmm, laissez-moi réfléchir... non.",
            "Les chances sont légèrement pires que de gagner à la loterie. Deux fois.",
            "Je pourrais répondre, mais je suis trop occupé à lever les yeux au ciel.",
            "Avez-vous vraiment besoin que je réponde à cela?",
            "Je ris trop fort pour répondre correctement.",
            "Oh ma chérie, non.",
            "Bien sûr, quand les cochons voyageront en première classe.",
            "Je parierais mon argent inexistant sur 'non'.",
            "C'est hilarant. Question suivante s'il vous plaît.",
            "Êtes-vous sérieux là?",
            "Je vais avoir besoin de plus de café avant de répondre à ça.",
            "La réponse est si évidente que je ne vais même pas la dire."
        ],
        romance: [
            "L'amour est dans l'air!",
            "Votre cœur connaît déjà la réponse.",
            "La flèche de Cupidon ne rate jamais.",
            "Les étoiles s'alignent pour la romance.",
            "L'amour trouvera un chemin.",
            "Tous ceux qui errent en amour ne sont pas perdus.",
            "Suivez votre cœur pour celui-ci.",
            "L'amour est patient; peut-être devriez-vous l'être aussi.",
            "Le cœur veut ce qu'il veut.",
            "La romance est juste au coin de la rue.",
            "Cet amour était écrit dans les étoiles.",
            "Peut-être qu'il est temps de faire le premier pas.",
            "L'amour est un voyage, pas une destination.",
            "Votre avenir romantique semble prometteur!",
            "Faites confiance au processus de l'amour.",
            "Parfois, l'amour a besoin d'un peu de temps.",
            "Les meilleures histoires d'amour prennent du temps à se déployer.",
            "Votre cœur ne vous égarera pas.",
            "L'amour vient quand on s'y attend le moins.",
            "Cette connexion a du potentiel."
        ],
        drinking: [
            "Buvez, mon chou!",
            "Prenez un shot!",
            "Cul sec!",
            "C'est votre tour de boire!",
            "Buvez deux fois!",
            "Tout le monde boit!",
            "Passez votre tour, vous avez de la chance!",
            "Choisissez quelqu'un pour boire!",
            "Pas de boisson cette fois!",
            "Santé! Prenez une gorgée!",
            "Buvez de l'eau à la place, restez hydraté!",
            "La dernière personne à lever la main boit!",
            "Racontez une blague ou prenez une boisson!",
            "Buvez si vous avez déjà...",
            "Pierre, papier, ciseaux avec votre voisin. Le perdant boit!",
            "Buvez si vous portez du bleu!",
            "Prenez une gorgée pour chaque animal de compagnie que vous avez!",
            "Buvez si vous avez vérifié votre téléphone dans les 10 dernières minutes!",
            "La personne la plus grande boit!",
            "Buvez si vous avez regardé une série en boucle cette semaine!"
        ]
    };

    // Charger les réponses personnalisées depuis localStorage
    let customAnswers = JSON.parse(localStorage.getItem('customAnswers')) || [];

    // Ajouter la version personnalisée à l'objet réponses
    answers.custom = customAnswers;

    // Créer et ajouter l'interface utilisateur des réponses personnalisées
    function createCustomAnswersUI() {
        // Ajouter l'option personnalisée à la sélection de version si elle n'existe pas
        if (!Array.from(versionSelect.options).some(option => option.value === 'custom')) {
            const customOption = new Option('✨ Réponses personnalisées', 'custom');
            versionSelect.add(customOption);
        }

        // Mettre à jour la liste des réponses personnalisées
        updateCustomAnswersList();

        // Ajouter des écouteurs d'événements pour les réponses personnalisées
        const addButton = document.getElementById('addCustomAnswer');
        const input = document.getElementById('customAnswer');
        const clearButton = document.getElementById('clearCustomAnswers');

        addButton.addEventListener('click', addCustomAnswer);
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') addCustomAnswer();
        });

        // Ajouter la validation de saisie et le compteur de caractères
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
            if (confirm('Êtes-vous sûr de vouloir supprimer toutes les réponses personnalisées?')) {
                customAnswers = [];
                updateCustomAnswersList();
            }
        });

        // Mettre à jour le compteur de réponses personnalisées lorsque le modal est affiché
        modalContainer.addEventListener('show.bs.modal', () => {
            document.getElementById('customAnswerCount').textContent =
                `${customAnswers.length} réponse${customAnswers.length !== 1 ? 's' : ''}`;
        });

    }

    // Mettre à jour la liste des réponses personnalisées
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');

        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} réponses`;

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

                // Ajouter un effet de survol
                li.addEventListener('mouseenter', () => li.classList.add('active'));
                li.addEventListener('mouseleave', () => li.classList.remove('active'));
            });
        }

        // Mettre à jour l'objet réponses et localStorage
        answers.custom = customAnswers;
        localStorage.setItem('customAnswers', JSON.stringify(customAnswers));

        // Ajouter des écouteurs d'événements pour les boutons d'action
        document.querySelectorAll('.delete-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const li = this.closest('li');

                // Ajouter une animation de disparition
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

                // Créer une modification en ligne
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

    // Ajouter une réponse personnalisée
    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();

        if (answer && !customAnswers.includes(answer)) {
            // Ajouter avec animation
            customAnswers.unshift(answer); // Ajouter au début du tableau
            updateCustomAnswersList();
            input.value = '';

            // Mettre en évidence la nouvelle réponse
            const firstItem = document.querySelector('#customAnswersList li:first-child');
            if (firstItem) {
                firstItem.style.animation = 'highlightNew 1s';
            }
        } else if (customAnswers.includes(answer)) {
            // Afficher les commentaires d'erreur
            input.classList.add('is-invalid');
            setTimeout(() => input.classList.remove('is-invalid'), 1000);
        }
    }

    // Ajouter les styles nécessaires
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

        /* Styles de bouton du pied de page modal */
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

        /* Style de groupe de boutons */
        #customAnswersModal .btn-group .btn {
            border-radius: 0;
        }

        #customAnswersModal .btn-group .btn:first-child {
            border-radius: 25px 0 0 25px;
        }

        #customAnswersModal .btn-group .btn:last-child {
            border-radius: 0 25px 25px 0;
        }

        /* Mise en page réactive des boutons */
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

        /* Améliorer le style des réponses dans l'historique */
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

        /* Style de question */
        .question {
            color: #333;
            font-weight: 500;
            max-width: 60%;
            word-wrap: break-word;
        }

        /* Renforcer l'animation de secousse de la boule magique */
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

    // Créer l'interface utilisateur des réponses personnalisées
    createCustomAnswersUI();

    // Historique des questions et réponses
    let history = [];

    // Fonction pour ajuster la taille du texte en fonction de la longueur
    function adjustTextSize(text) {
        answerElement.classList.remove('long-text', 'very-long-text');

        if (text.length > 20 && text.length <= 50) {
            answerElement.classList.add('long-text');
        } else if (text.length > 50) {
            answerElement.classList.add('very-long-text');
        }

        return text;
    }

    // Fonction pour obtenir une réponse aléatoire en fonction de la version sélectionnée
    function getRandomAnswer(version) {
        const answerList = answers[version];
        const randomIndex = Math.floor(Math.random() * answerList.length);
        return answerList[randomIndex];
    }

    // Fonction pour gérer l'animation de secousse et la génération de réponses
    const handleShake = () => {
        // Empêcher les secousses multiples
        if (magicBall.classList.contains('shake')) return;

        const question = questionInput.value.trim();

        // Ajouter la classe de secousse pour déclencher l'animation
        magicBall.classList.add('shake');

        // Obtenir la réponse en fonction de la version sélectionnée
        const answer = getRandomAnswer(versionSelect.value);

        // Mettre à jour la réponse après un délai
        setTimeout(() => {
            answerElement.textContent = adjustTextSize(answer);
        }, 500);

        // Supprimer la classe de secousse après l'animation
        setTimeout(() => {
            magicBall.classList.remove('shake');
            // N'ajouter à l'historique que s'il y avait une question
            if (question) {
                addToHistory(question, answer);
            }
        }, 1000);
    };

    // Fonction pour ajouter à l'historique
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

        // Garder seulement les 10 derniers éléments
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    // Écouteurs d'événements
    shakeButton.addEventListener('click', handleShake);
    magicBall.addEventListener('click', handleShake);

    questionInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleShake();
        }
    });

    // Initialiser avec le numéro 8
    answerElement.textContent = '8';

    // Ajouter l'écouteur d'événement du bouton de sauvegarde (bouton dans le modal)
    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
            // Afficher le message d'invite
            const toast = document.createElement('div');
            toast.className = 'toast position-fixed bottom-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.innerHTML = `
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Succès</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Vos réponses personnalisées sont maintenant actives!
                </div>
            `;
            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
            setTimeout(() => toast.remove(), 3000);
        } else {
            alert('Veuillez ajouter au moins une réponse personnalisée avant d\'appliquer les modifications.');
        }
    });

});
