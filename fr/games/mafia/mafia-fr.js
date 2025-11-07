class MafiaGame {
    constructor() {
        this.players = [];
        this.phase = 'setup';
        this.day = 0;
        this.currentNightRole = null;
        this.nightActions = {
            mafia: null,
            doctor: {
                save: null,
                poison: null
            },
            detective: null
        };
        this.doctorAbilities = {
            hasUsedSave: false,
            hasUsedPoison: false
        };
        this.roles = ['mafia', 'villager', 'doctor', 'detective'];
        this.customRoles = this.loadCustomRoles();
        this.roleDescriptions = {
            mafia: 'Éliminez les villageois sans être attrapés',
            villager: 'Trouvez et éliminez la Mafia',
            doctor: 'Sauvez une personne pendant le jeu ET empoisonnez une personne pendant le jeu',
            detective: 'Enquêtez sur l\'identité d\'un joueur chaque nuit'
        };
        this.roleNames = {
            mafia: 'Mafia',
            villager: 'Villageois',
            doctor: 'Docteur',
            detective: 'Détective'
        };
        this.loadCustomRoleNames();
        this.setupEventListeners();
        this.updateCustomRoleInputs();
        this.updateRoleCounts();
        this.setupCustomAlert();
    }

    setupEventListeners() {
        document.getElementById('setupGame').addEventListener('click', () => this.initializeGame());
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('manageRoles').addEventListener('click', () => this.showRoleManagement());
        document.getElementById('createRole').addEventListener('click', () => this.createCustomRole());
        document.getElementById('backToSetup').addEventListener('click', () => this.backToSetup());
        document.getElementById('returnToSetup').addEventListener('click', () => this.returnToSetup());
        document.getElementById('startNewGame').addEventListener('click', () => this.startCompleteNewGame());

        // Ajouter des écouteurs pour les entrées de décompte de rôles
        ['playerCount', 'mafiaCount', 'doctorCount', 'detectiveCount', 'villagerCount'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.updateRoleCounts());
        });
    }

    updateRoleCounts() {
        const totalPlayers = parseInt(document.getElementById('playerCount').value) || 0;
        const mafiaCount = parseInt(document.getElementById('mafiaCount').value) || 0;
        const doctorCount = parseInt(document.getElementById('doctorCount').value) || 0;
        const detectiveCount = parseInt(document.getElementById('detectiveCount').value) || 0;
        const villagerCount = parseInt(document.getElementById('villagerCount').value) || 0;

        // Calculer le nombre de rôles personnalisés
        let customRoleCount = 0;
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                customRoleCount += parseInt(countInput.value) || 0;
            }
        });

        // Valider la distribution des rôles
        const setupButton = document.getElementById('setupGame');
        const warning = document.getElementById('roleWarning');

        const roleTotal = mafiaCount + doctorCount + detectiveCount + villagerCount + customRoleCount;

        if (totalPlayers < 3) {
            warning.textContent = 'Minimum 3 joueurs requis';
            setupButton.disabled = true;
            return;
        }

        if (roleTotal !== totalPlayers) {
            warning.textContent = `Le total des rôles (${roleTotal}) ne correspond pas au nombre total de joueurs (${totalPlayers})`;
            setupButton.disabled = true;
            return;
        }

        if (villagerCount < 1) {
            warning.textContent = 'Besoin d\'au moins 1 villageois';
            setupButton.disabled = true;
            return;
        }

        if (mafiaCount < 1) {
            warning.textContent = 'Besoin d\'au moins 1 mafia';
            setupButton.disabled = true;
            return;
        }

        // Toutes les validations sont passées
        warning.textContent = '';
        setupButton.disabled = false;
    }

    initializeGame() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        const mafiaCount = parseInt(document.getElementById('mafiaCount').value);
        const doctorCount = parseInt(document.getElementById('doctorCount').value);
        const detectiveCount = parseInt(document.getElementById('detectiveCount').value);
        const villagerCount = parseInt(document.getElementById('villagerCount').value);

        this.players = [];

        // Créer un tableau de rôles basé sur les comptes sélectionnés
        let roles = Array(mafiaCount).fill('mafia');
        if (doctorCount > 0) roles = roles.concat(Array(doctorCount).fill('doctor'));
        if (detectiveCount > 0) roles = roles.concat(Array(detectiveCount).fill('detective'));
        roles = roles.concat(Array(villagerCount).fill('villager'));

        // Ajouter des rôles personnalisés
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                const count = parseInt(countInput.value) || 0;
                if (count > 0) {
                    roles = roles.concat(Array(count).fill(role.id));
                    // S'assurer que les noms et descriptions des rôles sont chargés
                    this.roleNames[role.id] = role.name;
                    this.roleDescriptions[role.id] = role.description;
                }
            }
        });

        // Mélanger les rôles
        roles = this.shuffleArray(roles);

        // Créer des joueurs
        for (let i = 0; i < playerCount; i++) {
            this.players.push({
                id: i + 1,
                name: `Joueur ${i + 1}`,
                role: roles[i],
                isAlive: true,
                revealed: false
            });
        }

        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.game-area').style.display = 'block';
        this.createCards();
    }

    createCards() {
        const cardGrid = document.getElementById('cardGrid');
        cardGrid.innerHTML = this.players.map(player => `
            <div class="role-card" data-player-id="${player.id}">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="card-number">Joueur ${player.id}</div>
                    </div>
                    <div class="card-back role-${player.role}">
                        <div class="role-name">${this.roleNames[player.role].toUpperCase()}</div>
                        <div class="role-description">${this.roleDescriptions[player.role]}</div>
                    </div>
                </div>
            </div>
        `).join('');

        // Ajouter des écouteurs de clic aux cartes
        const cards = cardGrid.getElementsByClassName('role-card');
        Array.from(cards).forEach(card => {
            card.addEventListener('click', (e) => this.flipCard(e));
        });
    }

    flipCard(event) {
        const card = event.currentTarget;
        const playerId = parseInt(card.dataset.playerId);
        const player = this.players.find(p => p.id === playerId);

        // Basculer l'état de retournement de la carte
        if (card.classList.contains('flipped')) {
            // Si déjà retourné, le fermer
            card.classList.remove('flipped');
        } else {
            // Si pas retourné, le retourner
            card.classList.add('flipped');
            player.revealed = true;

            // Quand tous les joueurs ont consulté l'identité, afficher directement le bouton de démarrage
            if (this.players.every(p => p.revealed)) {
                document.querySelector('.game-controls').style.display = 'block';
            }
        }
    }

    startGame() {
        // Masquer la zone des cartes d'identité
        document.querySelector('.role-cards').style.display = 'none';
        document.querySelector('.game-controls').style.display = 'none';

        // Afficher l'interface d'action nocturne, mais pas l'état des joueurs
        document.querySelector('.night-actions').style.display = 'block';
        document.querySelector('.player-status').style.display = 'none';

        // Commencer la première nuit
        this.phase = 'night';
        this.day = 1;
        this.startNightPhase();
        this.updatePlayerStatus();
    }

    startNightPhase() {
        this.currentNightRole = null;
        this.nightActions = {
            mafia: null,
            doctor: {
                save: null,
                poison: null
            },
            detective: null
        };

        // Commencer l'action du premier rôle
        this.nextNightRole();
    }

    nextNightRole() {
        const roleOrder = ['mafia', 'doctor', 'detective'];
        const currentIndex = roleOrder.indexOf(this.currentNightRole);
        const nextIndex = currentIndex + 1;

        // Masquer toutes les zones d'action
        document.querySelectorAll('.role-action').forEach(el => el.style.display = 'none');

        // Réinitialiser l'affichage des résultats d'enquête
        const investigationResult = document.getElementById('investigation-result');
        if (investigationResult) {
            investigationResult.style.display = 'none';
        }

        // Réinitialiser l'état de l'interface du docteur
        const doctorChoice = document.getElementById('doctor-choice');
        const doctorTargets = document.getElementById('doctor-targets');
        const confirmDoctor = document.getElementById('confirm-doctor');
        if (doctorChoice) {
            doctorChoice.style.display = 'flex';
        }
        if (doctorTargets) {
            doctorTargets.style.display = 'none';
        }
        if (confirmDoctor) {
            confirmDoctor.style.display = 'none';
        }

        if (nextIndex >= roleOrder.length) {
            // Fin de la phase nocturne
            this.completeNightPhase();
            return;
        }

        this.currentNightRole = roleOrder[nextIndex];
        const narratorText = document.getElementById('narrator-text');
        const actionArea = document.getElementById(`${this.currentNightRole}-action`);

        // Afficher la zone d'action du rôle actuel
        if (this.hasRole(this.currentNightRole)) {
            actionArea.style.display = 'block';
            narratorText.textContent = `${this.roleNames[this.currentNightRole]}, veuillez ouvrir les yeux et faire votre sélection.`;
            if (this.currentNightRole === 'doctor') {
                this.startDoctorTurn();
            } else {
                this.updateTargetSelection();
            }
        } else {
            // S'il n'y a pas ce rôle, passer au suivant
            this.nextNightRole();
        }
    }

    hasRole(role) {
        return this.players.some(player => player.role === role && player.isAlive);
    }

    updateTargetSelection() {
        const targetDiv = document.getElementById(`${this.currentNightRole}-targets`);
        targetDiv.innerHTML = this.players
            .filter(player => player.isAlive)
            .map(player => `
                <div class="player-option" data-player-id="${player.id}">
                    Joueur ${player.id}
                </div>
            `).join('');

        // Ajouter des gestionnaires de clic
        const options = targetDiv.getElementsByClassName('player-option');
        Array.from(options).forEach(option => {
            option.addEventListener('click', () => {
                if (this.currentNightRole === 'detective') {
                    // Supprimer tous les états sélectionnés
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    // Ajouter l'état sélectionné
                    option.classList.add('selected');

                    const targetId = parseInt(option.dataset.playerId);
                    const targetPlayer = this.players[targetId - 1];

                    // Définir la cible d'enquête
                    this.nightActions.detective = targetId;

                    // Afficher le résultat de l'enquête
                    const resultDiv = document.getElementById('investigation-result');
                    const resultText = document.getElementById('investigation-text');
                    resultText.textContent = `Joueur ${targetId} est ${targetPlayer.role === 'mafia' ? 'un membre de la Mafia !' : 'pas un membre de la Mafia.'}`;
                    resultText.className = `result-text ${targetPlayer.role === 'mafia' ? 'mafia' : 'villager'}`;
                    resultDiv.style.display = 'block';

                    // Désactiver toutes les autres options
                    Array.from(options).forEach(opt => {
                        if (opt !== option) {
                            opt.style.pointerEvents = 'none';
                            opt.style.opacity = '0.5';
                        }
                    });

                    // Ajouter un événement au bouton de confirmation
                    document.getElementById('confirm-detective').onclick = () => {
                        this.nextNightRole();
                    };
                } else {
                    // Logique de sélection pour les autres rôles
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                }
            });
        });

        // Ajouter un événement au bouton de confirmation pour les autres rôles
        if (this.currentNightRole !== 'detective') {
            document.getElementById(`confirm-${this.currentNightRole}`).onclick = () => {
                const selected = targetDiv.querySelector('.player-option.selected');
                if (selected) {
                    const targetId = parseInt(selected.dataset.playerId);
                    this.nightActions[this.currentNightRole] = targetId;
                    this.nextNightRole();
                }
            };
        }
    }

    startDoctorTurn() {
        const mafiaTarget = this.players[this.nightActions.mafia - 1];
        const doctorPrompt = document.getElementById('doctor-prompt');
        const saveButton = document.getElementById('save-player');
        const poisonButton = document.getElementById('poison-player');
        const skipButton = document.getElementById('skip-action');
        const doctorTargets = document.getElementById('doctor-targets');

        // Réinitialiser les états des boutons
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.style.opacity = '1';
            saveButton.style.cursor = 'pointer';
        }
        if (poisonButton) {
            poisonButton.disabled = false;
            poisonButton.style.opacity = '1';
            poisonButton.style.cursor = 'pointer';
        }

        let promptText = `Le joueur ${mafiaTarget.id} a été ciblé par la Mafia.`;
        if (!this.doctorAbilities.hasUsedSave) {
            promptText += ' Vous pouvez le sauver,';
        }
        if (!this.doctorAbilities.hasUsedPoison) {
            promptText += ' empoisonner quelqu\'un,';
        }
        promptText += ' ou passer votre tour.';

        if (this.doctorAbilities.hasUsedSave) {
            saveButton.disabled = true;
            saveButton.style.opacity = '0.5';
            saveButton.style.cursor = 'not-allowed';
        }

        if (this.doctorAbilities.hasUsedPoison) {
            poisonButton.disabled = true;
            poisonButton.style.opacity = '0.5';
            poisonButton.style.cursor = 'not-allowed';
        }

        doctorPrompt.textContent = promptText;

        // Afficher les boutons de sélection
        doctorTargets.style.display = 'none';
        document.getElementById('doctor-choice').style.display = 'flex';

        // Bouton de sauvetage
        saveButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedSave) {
                this.nightActions.doctor.save = mafiaTarget.id;
                this.doctorAbilities.hasUsedSave = true;
                this.nextNightRole();
            }
        };

        // Bouton d'empoisonnement
        poisonButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedPoison) {
                // Afficher les cibles sélectionnables
                doctorTargets.style.display = 'block';
                document.getElementById('doctor-choice').style.display = 'none';

                // Mettre à jour la liste des joueurs sélectionnables
                doctorTargets.innerHTML = this.players
                    .filter(player => player.isAlive)
                    .map(player => `
                        <div class="player-option" data-player-id="${player.id}">
                            Joueur ${player.id}
                        </div>
                    `).join('');

                // Ajouter des événements de clic
                const options = doctorTargets.getElementsByClassName('player-option');
                Array.from(options).forEach(option => {
                    option.addEventListener('click', () => {
                        Array.from(options).forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');

                        const targetId = parseInt(option.dataset.playerId);
                        this.nightActions.doctor.poison = targetId;
                        this.doctorAbilities.hasUsedPoison = true;
                        this.nextNightRole();
                    });
                });
            }
        };

        // Bouton de saut
        skipButton.onclick = () => {
            this.nightActions.doctor.save = null;
            this.nightActions.doctor.poison = null;
            this.nextNightRole();
        };
    }

    completeNightPhase() {
        document.querySelector('.night-actions').style.display = 'none';
        this.resolveNightActions();
        this.updatePlayerStatus();
    }

    resolveNightActions() {
        const mafiaTarget = this.players[this.nightActions.mafia - 1];
        const doctorSaveTarget = this.nightActions.doctor.save ? this.players[this.nightActions.doctor.save - 1] : null;
        const doctorPoisonTarget = this.nightActions.doctor.poison ? this.players[this.nightActions.doctor.poison - 1] : null;

        // Traiter l'effet d'empoisonnement du docteur
        if (doctorPoisonTarget) {
            doctorPoisonTarget.isAlive = false;
        }

        // Traiter le meurtre de la Mafia (si la cible a été sauvée par le docteur, elle ne mourra pas)
        if (mafiaTarget && doctorSaveTarget && mafiaTarget.id === doctorSaveTarget.id) {
            // Le docteur a sauvé la personne avec succès
        } else if (mafiaTarget) {
            mafiaTarget.isAlive = false;
        }

        // Commencer la phase de discussion
        this.startDiscussionPhase();
    }

    startDiscussionPhase() {
        // Masquer l'interface de la phase nocturne
        document.querySelector('.night-actions').style.display = 'none';
        // Afficher l'interface de la phase de discussion et l'état des joueurs
        document.querySelector('.discussion-phase').style.display = 'block';
        document.querySelector('.player-status').style.display = 'block';

        // Mettre à jour les résultats nocturnes
        const nightResult = document.getElementById('night-result');
        const eliminatedPlayer = this.players.find(p => !p.isAlive);
        if (eliminatedPlayer) {
            nightResult.textContent = `La nuit dernière, le joueur ${eliminatedPlayer.id} a été éliminé.`;
        } else {
            nightResult.textContent = 'Personne n\'a été éliminée la nuit dernière.';
        }

        // Mettre à jour l'état des joueurs
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">Joueur ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Vivant' : 'Mort'}</div>
            </div>
        `).join('');

        // Configurer le bouton de fin de discussion
        document.getElementById('end-discussion').onclick = () => {
            this.endDiscussion();
        };
    }

    endDiscussion() {
        // Masquer l'interface de la phase de discussion
        document.querySelector('.discussion-phase').style.display = 'none';

        // Commencer la phase de vote
        this.startVotingPhase();
    }

    startVotingPhase() {
        // Afficher l'interface de vote
        document.querySelector('.voting-phase').style.display = 'block';

        // Mettre à jour les options de vote
        const votingGrid = document.getElementById('voting-grid');
        votingGrid.innerHTML = this.players.map(player => `
            <div class="vote-card ${player.isAlive ? '' : 'dead'}" data-player-id="${player.id}">
                <div class="player-name">Joueur ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Cliquez pour voter' : 'Mort'}</div>
            </div>
        `).join('');

        // Ajouter des événements de clic aux cartes de vote
        const voteCards = votingGrid.getElementsByClassName('vote-card');
        Array.from(voteCards).forEach(card => {
            if (!card.classList.contains('dead')) {
                card.addEventListener('click', () => this.selectVoteTarget(card));
            }
        });

        // Ajouter un événement au bouton de confirmation du vote
        document.getElementById('confirm-vote').addEventListener('click', () => this.confirmVote());
    }

    selectVoteTarget(card) {
        // Supprimer l'état sélectionné des autres cartes
        const allCards = document.getElementsByClassName('vote-card');
        Array.from(allCards).forEach(c => c.classList.remove('selected'));

        // Sélectionner la carte actuelle
        card.classList.add('selected');
    }

    confirmVote() {
        const selectedCard = document.querySelector('.vote-card.selected');
        if (!selectedCard) {
            this.showAlert('Veuillez sélectionner un joueur à voter !');
            return;
        }

        const votedPlayerId = parseInt(selectedCard.dataset.playerId);
        const votedPlayer = this.players.find(p => p.id === votedPlayerId);

        // Exécuter le joueur voté
        votedPlayer.isAlive = false;

        // Masquer l'interface de vote
        document.querySelector('.voting-phase').style.display = 'none';

        // Afficher le résultat du vote
        this.showAlert(`Le joueur ${votedPlayerId} a été éliminé par le vote !`, () => {
            // Mettre à jour l'état des joueurs
            this.updatePlayerStatus();

            // Vérifier si le jeu est terminé
            if (this.checkGameEnd()) {
                return;
            }

            // Entrer dans une nouvelle nuit
            this.day++;
            this.phase = 'night';

            // Réinitialiser les actions nocturnes
            this.nightActions = {
                mafia: null,
                doctor: {
                    save: null,
                    poison: null
                },
                detective: null
            };

            // Afficher l'interface d'action nocturne
            document.querySelector('.night-actions').style.display = 'block';

            // Commencer une nouvelle phase nocturne
            this.startNightPhase();
        });
    }

    checkGameEnd() {
        // Compter le nombre de joueurs vivants
        const alivePlayers = this.players.filter(p => p.isAlive);
        const aliveMafia = alivePlayers.filter(p => p.role === 'mafia').length;
        const aliveVillagers = alivePlayers.length - aliveMafia;

        let gameOver = false;
        let winner = null;

        // Si le nombre de Mafia >= le nombre de villageois, la Mafia gagne
        if (aliveMafia >= aliveVillagers) {
            gameOver = true;
            winner = 'Mafia';
        }
        // Si tous les Mafia sont morts, les villageois gagnent
        else if (aliveMafia === 0) {
            gameOver = true;
            winner = 'Villageois';
        }

        if (gameOver) {
            // Afficher l'écran de fin de jeu
            document.querySelector('.night-actions').style.display = 'none';
            document.querySelector('.discussion-phase').style.display = 'none';
            document.querySelector('.voting-phase').style.display = 'none';
            document.querySelector('.player-status').style.display = 'none';

            // Afficher le message de victoire et le bouton de redémarrage
            const alertElement = document.querySelector('.custom-alert');
            const messageElement = alertElement.querySelector('.alert-message');
            const confirmButton = alertElement.querySelector('.alert-confirm');
            const playAgainBtn = document.getElementById('playAgainBtn');

            messageElement.textContent = `Fin du jeu ! ${winner} a gagné !`;
            alertElement.style.display = 'flex';

            // Masquer le bouton OK à la fin du jeu, afficher uniquement le bouton Rejouer
            confirmButton.style.display = 'none';
            playAgainBtn.style.display = 'block';

            playAgainBtn.onclick = () => {
                // Masquer la boîte de dialogue et le bouton de redémarrage
                alertElement.style.display = 'none';
                playAgainBtn.style.display = 'none';
                confirmButton.style.display = 'block'; // Restaurer l'affichage du bouton OK pour les autres conseils du jeu

                // Réinitialiser l'état du jeu
                this.resetGame();
            };
            return true;
        }

        return false;
    }

    updatePlayerStatus() {
        const statusDiv = document.querySelector('.player-status');
        if (statusDiv) {
            statusDiv.innerHTML = this.players.map(player => `
                <div class="player-info ${player.isAlive ? 'alive' : 'dead'}">
                    <span>Joueur ${player.id}: ${player.isAlive ? 'Vivant' : 'Mort'}</span>
                </div>
            `).join('');
        }
    }

    loadCustomRoles() {
        try {
            const saved = localStorage.getItem('mafiaCustomRoles');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    loadCustomRoleNames() {
        try {
            const saved = localStorage.getItem('mafiaCustomRoleNames');
            if (saved) {
                const customNames = JSON.parse(saved);
                Object.assign(this.roleNames, customNames);
            }
        } catch (e) {
            // Ignorer les erreurs
        }
    }

    showRoleManagement() {
        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.role-management').style.display = 'block';
    }

    backToSetup() {
        document.querySelector('.role-management').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';
    }

    returnToSetup() {
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';
        this.resetGame();
    }

    startCompleteNewGame() {
        this.resetGame();
    }

    resetGame() {
        this.players = [];
        this.phase = 'setup';
        this.day = 0;
        this.currentNightRole = null;
        this.doctorAbilities = {
            hasUsedSave: false,
            hasUsedPoison: false
        };

        document.querySelector('.game-setup').style.display = 'block';
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.role-cards').style.display = 'block';
        document.querySelector('.game-controls').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.discussion-phase').style.display = 'none';
        document.querySelector('.voting-phase').style.display = 'none';
        document.querySelector('.player-status').style.display = 'none';
    }

    createCustomRole() {
        // Logique pour créer un rôle personnalisé
        const roleId = 'custom_' + Date.now();
        const roleName = document.getElementById('customRoleName')?.value || 'Rôle personnalisé';
        const roleDescription = document.getElementById('customRoleDescription')?.value || '';

        this.customRoles[roleId] = {
            id: roleId,
            name: roleName,
            description: roleDescription
        };

        localStorage.setItem('mafiaCustomRoles', JSON.stringify(this.customRoles));
        localStorage.setItem('mafiaCustomRoleNames', JSON.stringify(this.roleNames));

        this.updateCustomRoleInputs();
    }

    updateCustomRoleInputs() {
        const customRolesContainer = document.getElementById('custom-roles-container');
        if (customRolesContainer) {
            customRolesContainer.innerHTML = Object.values(this.customRoles).map(role => `
                <div class="custom-role-input">
                    <label>${role.name}</label>
                    <input type="number" id="${role.id}Count" value="0" min="0">
                </div>
            `).join('');
        }
    }

    setupCustomAlert() {
        // Configurer la boîte de dialogue d'alerte personnalisée
        const alertElement = document.querySelector('.custom-alert');
        if (alertElement) {
            const confirmButton = alertElement.querySelector('.alert-confirm');
            confirmButton.addEventListener('click', () => {
                alertElement.style.display = 'none';
            });
        }
    }

    showAlert(message, callback) {
        const alertElement = document.querySelector('.custom-alert');
        if (alertElement) {
            const messageElement = alertElement.querySelector('.alert-message');
            messageElement.textContent = message;
            alertElement.style.display = 'flex';

            const confirmButton = alertElement.querySelector('.alert-confirm');
            confirmButton.onclick = () => {
                alertElement.style.display = 'none';
                if (callback) callback();
            };
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Initialiser le jeu au chargement du DOM
let game;
document.addEventListener('DOMContentLoaded', function() {
    game = new MafiaGame();
});

// Exporter pour les tests potentiels
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MafiaGame };
}
