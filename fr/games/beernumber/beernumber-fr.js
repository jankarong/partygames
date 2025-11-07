document.addEventListener('DOMContentLoaded', () => {
    // Éléments du jeu
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const message = document.getElementById('message');
    const history = document.getElementById('history');
    const beerFill = document.getElementById('beer-fill');
    const beerMug = document.querySelector('.beer-mug');
    const beerMouth = document.querySelector('.beer-mouth');
    const beerEyes = document.querySelectorAll('.beer-eye');

    // Variables du jeu
    let targetNumber;
    let guesses = [];
    let isGameOver = false;
    let maxFillHeight = 100; // Pourcentage de remplissage maximum
    let lastGuess = null;

    // Initialiser le jeu
    function initGame() {
        // Générer un nombre aléatoire entre 1 et 100
        targetNumber = Math.floor(Math.random() * 100) + 1;

        // Réinitialiser l'état du jeu
        guesses = [];
        isGameOver = false;
        lastGuess = null;

        // Réinitialiser les éléments de l'interface
        message.textContent = '';
        message.className = 'alert d-none';
        beerFill.style.height = '0%';

        // Réinitialiser le visage de la bière
        updateBeerFace('neutral');

        // Mettre à jour l'affichage de l'historique
        updateHistory();

        // Focus sur le champ de saisie
        guessInput.value = '';
        guessInput.focus();

        console.log('Nouveau jeu commencé. Numéro cible:', targetNumber);
    }

    // Mettre à jour l'affichage de l'historique des devinettes
    function updateHistory() {
        if (guesses.length === 0) {
            history.innerHTML = '';
            return;
        }

        history.innerHTML = `
            <div class="guess-history-title">Nombre de devinettes: ${guesses.length}</div>
            <div class="history-list">
                ${guesses.map(num => `<span class="history-item">${num}</span>`).join('')}
            </div>
        `;
    }

    // Mettre à jour l'expression du visage de la chope de bière
    function updateBeerFace(expression) {
        // Réinitialiser toutes les expressions
        beerMug.classList.remove('happy', 'sad', 'excited', 'thinking');

        // Définir la nouvelle expression
        switch (expression) {
            case 'happy':
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            case 'sad':
                beerMouth.style.borderRadius = '15px 15px 0 0';
                beerMouth.style.height = '15px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = 'none';
                break;
            case 'excited':
                beerMouth.style.borderRadius = '50%';
                beerMouth.style.height = '20px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = '3px solid #1a2b47';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                beerMouth.style.borderLeft = '3px solid #1a2b47';
                beerMouth.style.borderRight = '3px solid #1a2b47';
                break;
            case 'thinking':
                beerMouth.style.borderRadius = '0';
                beerMouth.style.height = '3px';
                beerMouth.style.width = '20px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                break;
            default: // neutre
                beerMouth.style.borderRadius = '0 0 15px 15px';
                beerMouth.style.height = '15px';
                beerMouth.style.width = '30px';
                beerMouth.style.borderTop = 'none';
                beerMouth.style.borderBottom = '3px solid #1a2b47';
                beerMouth.style.borderLeft = 'none';
                beerMouth.style.borderRight = 'none';
        }
    }

    // Faire clignoter les yeux de la bière de temps en temps
    function startBlinking() {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% de chance de cligner
                beerEyes.forEach(eye => {
                    eye.style.height = '1px';
                    setTimeout(() => {
                        eye.style.height = '12px';
                    }, 150);
                });
            }
        }, 3000);
    }

    // Calculer à quel point la chope de bière doit être remplie en fonction de la proximité de la devinette
    function updateBeerFill(guess) {
        // Si le jeu est terminé (devinette correcte), remplir à 100%
        if (guess === targetNumber) {
            beerFill.style.height = '100%';
            updateBeerFace('excited');
            return;
        }

        // Calculer à quel point la devinette est proche de la cible
        const distance = Math.abs(guess - targetNumber);
        const maxDistance = 50; // Distance maximale raisonnable

        // Calculer le pourcentage de remplissage (plus proche = plus de remplissage)
        // La formule garantit qu'être à maxDistance ou plus = 0% de remplissage
        // Être à 0 = 100% de remplissage
        let fillPercentage = Math.max(0, 100 - (distance / maxDistance) * 100);

        // Assurer un remplissage minimum de 10% après la première devinette
        fillPercentage = Math.max(10, fillPercentage);

        // Appliquer la hauteur de remplissage
        beerFill.style.height = `${fillPercentage}%`;

        // Mettre à jour le visage de la bière en fonction de la proximité de la devinette
        if (fillPercentage > 80) {
            updateBeerFace('happy');
        } else if (fillPercentage > 50) {
            updateBeerFace('neutral');
        } else {
            updateBeerFace('sad');
        }

        // Si ce n'est pas la première devinette, montrer un visage pensif si on se rapproche
        if (lastGuess !== null) {
            const lastDistance = Math.abs(lastGuess - targetNumber);
            const currentDistance = Math.abs(guess - targetNumber);

            if (currentDistance < lastDistance) {
                // On se rapproche
                updateBeerFace('happy');
            } else {
                // On s'éloigne
                updateBeerFace('sad');
            }
        }

        // Mettre à jour la dernière devinette
        lastGuess = guess;
    }

    // Gérer une soumission de devinette
    function handleGuess() {
        // Obtenir la valeur de la devinette
        const guess = parseInt(guessInput.value);

        // Valider la saisie
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = 'Veuillez entrer un nombre valide entre 1 et 100!';
            message.className = 'alert alert-danger';
            updateBeerFace('sad');
            return;
        }

        // Ajouter au tableau des devinettes
        guesses.push(guess);
        updateHistory();

        // Mettre à jour le remplissage de la bière en fonction de la devinette
        updateBeerFill(guess);

        // Vérifier si la devinette est correcte
        if (guess === targetNumber) {
            message.textContent = `Santé! 🍻 Vous avez trouvé le numéro ${targetNumber} en ${guesses.length} essais!`;
            message.className = 'alert alert-success';
            isGameOver = true;

            // Ajouter une animation de bulles à la bière
            beerFill.classList.add('bubbling');

            // Afficher un visage excité
            updateBeerFace('excited');

            // Commencer un nouveau jeu après 3 secondes
            setTimeout(() => {
                initGame();
                beerFill.classList.remove('bubbling');
            }, 3000);
        }
        // Fournir un indice si la devinette est trop basse
        else if (guess < targetNumber) {
            message.textContent = 'Trop bas! Votre bière a besoin de plus de remplissage! 🍺';
            message.className = 'alert alert-warning';
        }
        // Fournir un indice si la devinette est trop haute
        else {
            message.textContent = 'Trop haut! Vous débordez la chope! 🍺';
            message.className = 'alert alert-warning';
        }

        // Effacer la saisie et focus pour la prochaine devinette
        guessInput.value = '';
        guessInput.focus();
    }

    // Écouteurs d'événements
    submitGuess.addEventListener('click', handleGuess);

    // Permettre à la touche Entrée de soumettre la devinette
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });

    // Rendre la chope de bière interactive
    beerMug.addEventListener('mouseover', () => {
        if (!isGameOver) {
            updateBeerFace('thinking');
        }
    });

    beerMug.addEventListener('mouseout', () => {
        if (!isGameOver) {
            updateBeerFace('neutral');
        }
    });

    // Démarrer l'animation de clignotement
    startBlinking();

    // Initialiser le jeu au chargement de la page
    initGame();
});
