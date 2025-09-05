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
            mafia: 'Eliminiert heimlich Dorfbewohner ohne entdeckt zu werden',
            villager: 'Findet und eliminiert die Werwölfe',
            doctor: 'Kann einmal im Spiel eine Person retten und eine vergiften',
            detective: 'Überprüft jede Nacht die Identität eines Spielers'
        };
        this.roleNames = {
            mafia: 'Werwolf',
            villager: 'Dorfbewohner',
            doctor: 'Arzt',
            detective: 'Seher'
        };
        this.loadCustomRoleNames(); // Lade benutzerdefinierte Rollennamen nach Erstellung der roleNames
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

        // Füge Listener für Rollenanzahl-Eingaben hinzu
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

        // Berechne Anzahl benutzerdefinierter Rollen
        let customRoleCount = 0;
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                customRoleCount += parseInt(countInput.value) || 0;
            }
        });

        // Validiere Rollenverteilung
        const setupButton = document.getElementById('setupGame');
        const warning = document.getElementById('roleWarning');

        const roleTotal = mafiaCount + doctorCount + detectiveCount + villagerCount + customRoleCount;

        if (totalPlayers < 3) {
            warning.textContent = 'Mindestens 3 Spieler erforderlich';
            setupButton.disabled = true;
            return;
        }

        if (roleTotal !== totalPlayers) {
            warning.textContent = `Rollensumme (${roleTotal}) stimmt nicht mit Gesamtspielerzahl (${totalPlayers}) überein`;
            setupButton.disabled = true;
            return;
        }

        if (mafiaCount < 1) {
            warning.textContent = 'Mindestens 1 Werwolf erforderlich';
            setupButton.disabled = true;
            return;
        }

        if (villagerCount < 1) {
            warning.textContent = 'Mindestens 1 Dorfbewohner erforderlich';
            setupButton.disabled = true;
            return;
        }

        // Alle Validierungen bestanden
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

        // Erstelle Rollen-Array basierend auf ausgewählten Anzahlen
        let roles = Array(mafiaCount).fill('mafia');
        if (doctorCount > 0) roles = roles.concat(Array(doctorCount).fill('doctor'));
        if (detectiveCount > 0) roles = roles.concat(Array(detectiveCount).fill('detective'));
        roles = roles.concat(Array(villagerCount).fill('villager'));

        // Füge benutzerdefinierte Rollen hinzu
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                const count = parseInt(countInput.value) || 0;
                if (count > 0) {
                    roles = roles.concat(Array(count).fill(role.id));
                    // Stelle sicher, dass Rollenname und -beschreibung geladen sind
                    this.roleNames[role.id] = role.name;
                    this.roleDescriptions[role.id] = role.description;
                }
            }
        });

        // Mische Rollen
        roles = this.shuffleArray(roles);

        // Erstelle Spieler
        for (let i = 0; i < playerCount; i++) {
            this.players.push({
                id: i + 1,
                name: `Spieler ${i + 1}`,
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
                        <div class="card-number">Spieler ${player.id}</div>
                    </div>
                    <div class="card-back role-${player.role}">
                        <div class="role-name">${this.roleNames[player.role] || player.role}</div>
                        <div class="role-description">${this.roleDescriptions[player.role] || 'Unbekannte Rolle'}</div>
                    </div>
                </div>
            </div>
        `).join('');

        // Füge Klick-Listener zu Karten hinzu
        const cards = cardGrid.getElementsByClassName('role-card');
        Array.from(cards).forEach(card => {
            card.addEventListener('click', (e) => this.flipCard(e));
        });
    }

    flipCard(event) {
        const card = event.currentTarget;
        const playerId = parseInt(card.dataset.playerId);
        const player = this.players.find(p => p.id === playerId);

        // Wechsle den Umdrehstatus der Karte
        if (card.classList.contains('flipped')) {
            // Wenn bereits umgedreht, drehe zurück
            card.classList.remove('flipped');
        } else {
            // Wenn nicht umgedreht, drehe um
            card.classList.add('flipped');
            player.revealed = true;

            // Wenn alle Spieler ihre Identität angeschaut haben, zeige Spiel starten Button direkt
            if (this.players.every(p => p.revealed)) {
                document.querySelector('.game-controls').style.display = 'block';
            }
        }
    }

    startGame() {
        // Verstecke Identitätskarten-Bereich
        document.querySelector('.role-cards').style.display = 'none';
        document.querySelector('.game-controls').style.display = 'none';

        // Zeige Nachtaktions-Interface, aber nicht Spielerstatus
        document.querySelector('.night-actions').style.display = 'block';
        document.querySelector('.player-status').style.display = 'none';

        // Starte erste Nacht
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

        // Starte erste Rollenaktion
        this.nextNightRole();
    }

    nextNightRole() {
        const roleOrder = ['mafia', 'doctor', 'detective'];
        const currentIndex = roleOrder.indexOf(this.currentNightRole);
        const nextIndex = currentIndex + 1;

        // Verstecke alle Aktionsbereiche
        document.querySelectorAll('.role-action').forEach(el => el.style.display = 'none');

        // Setze Seher-Untersuchungsergebnis-Anzeige zurück
        const investigationResult = document.getElementById('investigation-result');
        if (investigationResult) {
            investigationResult.style.display = 'none';
        }

        // Setze Arzt-Interface-Status zurück
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
            // Nachtphase beendet
            this.completeNightPhase();
            return;
        }

        this.currentNightRole = roleOrder[nextIndex];
        const narratorText = document.getElementById('narrator-text');
        const actionArea = document.getElementById(`${this.currentNightRole}-action`);

        // Zeige aktuellen Rollen-Aktionsbereich
        if (this.hasRole(this.currentNightRole)) {
            actionArea.style.display = 'block';
            const roleNameGerman = this.roleNames[this.currentNightRole];
            narratorText.textContent = `${roleNameGerman}, bitte wacht auf und trefft eure Wahl.`;
            if (this.currentNightRole === 'doctor') {
                this.startDoctorTurn();
            } else {
                this.updateTargetSelection();
            }
        } else {
            // Wenn diese Rolle nicht existiert, zur nächsten springen
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
                    Spieler ${player.id}
                </div>
            `).join('');

        // Wenn Seher, stelle sicher dass Untersuchungsergebnis versteckt ist und reaktiviere alle Optionen
        if (this.currentNightRole === 'detective') {
            const investigationResult = document.getElementById('investigation-result');
            if (investigationResult) {
                investigationResult.style.display = 'none';
            }
        }

        // Füge Klick-Handler hinzu
        const options = targetDiv.getElementsByClassName('player-option');
        Array.from(options).forEach(option => {
            option.addEventListener('click', () => {
                if (this.currentNightRole === 'detective') {
                    // Entferne alle ausgewählten Zustände
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    // Füge ausgewählten Zustand hinzu
                    option.classList.add('selected');

                    const targetId = parseInt(option.dataset.playerId);
                    const targetPlayer = this.players[targetId - 1];

                    // Setze Untersuchungsziel
                    this.nightActions.detective = targetId;

                    // Zeige Untersuchungsergebnis
                    const resultDiv = document.getElementById('investigation-result');
                    const resultText = document.getElementById('investigation-text');
                    resultText.textContent = `Spieler ${targetId} ${targetPlayer.role === 'mafia' ? 'ist ein Werwolf!' : 'ist kein Werwolf.'}`;
                    resultText.className = `result-text ${targetPlayer.role === 'mafia' ? 'mafia' : 'villager'}`;
                    resultDiv.style.display = 'block';

                    // Deaktiviere alle anderen Optionen
                    Array.from(options).forEach(opt => {
                        if (opt !== option) {
                            opt.style.pointerEvents = 'none';
                            opt.style.opacity = '0.5';
                        }
                    });

                    // Füge Bestätigungs-Button-Klick-Event hinzu
                    document.getElementById('confirm-detective').onclick = () => {
                        this.nextNightRole();
                    };
                } else {
                    // Auswahllogik anderer Rollen
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                }
            });
        });

        // Füge Bestätigungs-Button-Event für andere Rollen hinzu
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

        let promptText = `Spieler ${mafiaTarget.id} wurde von den Werwölfen ausgewählt.`;
        if (!this.doctorAbilities.hasUsedSave) {
            promptText += ' Du kannst ihn retten,';
        }
        if (!this.doctorAbilities.hasUsedPoison) {
            promptText += ' oder jemanden vergiften,';
        }
        promptText += ' oder deine Aktion überspringen.';

        // Setze Button-Zustände zurück
        saveButton.disabled = false;
        saveButton.style.opacity = '1';
        saveButton.style.cursor = 'pointer';
        poisonButton.disabled = false;
        poisonButton.style.opacity = '1';
        poisonButton.style.cursor = 'pointer';

        // Deaktiviere Buttons basierend auf verwendeten Fähigkeiten
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

        // Setze Interface-Status zurück
        doctorTargets.style.display = 'none';
        document.getElementById('doctor-choice').style.display = 'flex';
        document.getElementById('confirm-doctor').style.display = 'none';

        // Retten-Button
        saveButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedSave) {
                this.nightActions.doctor.save = mafiaTarget.id;
                this.doctorAbilities.hasUsedSave = true;
                this.nextNightRole();
            }
        };

        // Vergiften-Button
        poisonButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedPoison) {
                // Zeige wählbare Ziele
                doctorTargets.style.display = 'block';
                document.getElementById('doctor-choice').style.display = 'none';

                // Aktualisiere wählbare Spielerliste
                doctorTargets.innerHTML = this.players
                    .filter(player => player.isAlive)
                    .map(player => `
                        <div class="player-option" data-player-id="${player.id}">
                            Spieler ${player.id}
                        </div>
                    `).join('');

                // Füge Klick-Events hinzu
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

        // Überspringen-Button
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

        // Behandle Arzt's Vergiftungseffekt
        if (doctorPoisonTarget) {
            doctorPoisonTarget.isAlive = false;
        }

        // Behandle Werwolf's Eliminierung (wenn Ziel vom Arzt gerettet wurde, stirbt es nicht)
        if (mafiaTarget && doctorSaveTarget && mafiaTarget.id === doctorSaveTarget.id) {
            // Arzt hat erfolgreich gerettet
        } else if (mafiaTarget) {
            mafiaTarget.isAlive = false;
        }

        // Starte Diskussionsphase
        this.startDiscussionPhase();
    }

    startDiscussionPhase() {
        // Verstecke Nachtphasen-Interface
        document.querySelector('.night-actions').style.display = 'none';
        // Zeige Diskussionsphasen-Interface und Spielerstatus
        document.querySelector('.discussion-phase').style.display = 'block';
        document.querySelector('.player-status').style.display = 'block';

        // Aktualisiere Nacht-Ergebnisse
        const nightResult = document.getElementById('night-result');
        const eliminatedPlayers = this.players.filter(p => !p.isAlive);
        const newDeaths = eliminatedPlayers.filter(p => !p.previouslyDead);

        // Markiere zuvor verstorbene Spieler
        eliminatedPlayers.forEach(p => p.previouslyDead = true);

        if (newDeaths.length > 1) {
            const deadPlayerNames = newDeaths.map(p => `Spieler ${p.id}`).join(' und ');
            nightResult.textContent = `Letzte Nacht wurden ${deadPlayerNames} eliminiert.`;
        } else if (newDeaths.length === 1) {
            nightResult.textContent = `Letzte Nacht wurde Spieler ${newDeaths[0].id} eliminiert.`;
        } else {
            nightResult.textContent = 'Letzte Nacht war friedlich, niemand wurde eliminiert.';
        }

        // Aktualisiere Spielerstatus
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">Spieler ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Lebendig' : 'Tot'}</div>
            </div>
        `).join('');

        // Prüfe ob Spiel beendet ist (nach Nachtaktionen)
        if (this.checkGameEnd()) {
            return; // Spiel beendet, keine Diskussionsphase nötig
        }

        // Setze Diskussion beenden Button
        document.getElementById('end-discussion').onclick = () => {
            this.endDiscussion();
        };
    }

    endDiscussion() {
        // Verstecke Diskussionsphasen-Interface
        document.querySelector('.discussion-phase').style.display = 'none';

        // Starte Abstimmungsphase
        this.startVotingPhase();
    }

    startVotingPhase() {
        // Prüfe ob Spiel beendet ist (vor Abstimmung)
        if (this.checkGameEnd()) {
            return; // Spiel beendet, keine Abstimmung nötig
        }

        // Zeige Abstimmungs-Interface
        document.querySelector('.voting-phase').style.display = 'block';

        // Aktualisiere Abstimmungsoptionen
        const votingGrid = document.getElementById('voting-grid');
        votingGrid.innerHTML = this.players.map(player => `
            <div class="vote-card ${player.isAlive ? '' : 'dead'}" data-player-id="${player.id}">
                <div class="player-name">Spieler ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Zum Wählen klicken' : 'Verstorben'}</div>
            </div>
        `).join('');

        // Füge Abstimmungskarten-Klick-Events hinzu
        const voteCards = votingGrid.getElementsByClassName('vote-card');
        Array.from(voteCards).forEach(card => {
            if (!card.classList.contains('dead')) {
                card.addEventListener('click', () => this.selectVoteTarget(card));
            }
        });

        // Füge Abstimmung bestätigen Button Event hinzu
        document.getElementById('confirm-vote').addEventListener('click', () => this.confirmVote());
    }

    selectVoteTarget(card) {
        // Entferne ausgewählten Zustand anderer Karten
        const allCards = document.getElementsByClassName('vote-card');
        Array.from(allCards).forEach(c => c.classList.remove('selected'));

        // Wähle aktuelle Karte aus
        card.classList.add('selected');
    }

    confirmVote() {
        const selectedCard = document.querySelector('.vote-card.selected');
        if (!selectedCard) {
            this.showAlert('Bitte wählt einen Spieler zum Abstimmen!');
            return;
        }

        const votedPlayerId = parseInt(selectedCard.dataset.playerId);
        const votedPlayer = this.players.find(p => p.id === votedPlayerId);

        // Exekutiere gewählten Spieler
        votedPlayer.isAlive = false;

        // Verstecke Abstimmungs-Interface
        document.querySelector('.voting-phase').style.display = 'none';

        // Zeige Abstimmungsergebnis
        this.showAlert(`Spieler ${votedPlayerId} wurde abgewählt und eliminiert!`, () => {
            // Aktualisiere Spielerstatus
            this.updatePlayerStatus();

            // Prüfe ob Spiel beendet ist
            if (this.checkGameEnd()) {
                return;
            }

            // Gehe in neue Nacht
            this.day++;
            this.phase = 'night';

            // Setze Nachtaktionen zurück
            this.nightActions = {
                mafia: null,
                doctor: {
                    save: null,
                    poison: null
                },
                detective: null
            };

            // Zeige Nachtaktions-Interface
            document.querySelector('.night-actions').style.display = 'block';

            // Starte neue Nachtphase
            this.startNightPhase();
        });
    }

    checkGameEnd() {
        // Zähle lebende Spieler
        const alivePlayers = this.players.filter(p => p.isAlive);
        const aliveMafia = alivePlayers.filter(p => p.role === 'mafia').length;
        const aliveVillagers = alivePlayers.length - aliveMafia;

        let gameOver = false;
        let winner = null;

        // Wenn Werwolfanzahl größer gleich Dorfbewohneranzahl, gewinnen Werwölfe
        if (aliveMafia >= aliveVillagers) {
            gameOver = true;
            winner = 'Werwölfe';
        }
        // Wenn alle Werwölfe tot sind, gewinnen Dorfbewohner
        else if (aliveMafia === 0) {
            gameOver = true;
            winner = 'Dorfbewohner';
        }

        if (gameOver) {
            // Zeige Spielende-Interface
            document.querySelector('.night-actions').style.display = 'none';
            document.querySelector('.discussion-phase').style.display = 'none';
            document.querySelector('.voting-phase').style.display = 'none';
            document.querySelector('.player-status').style.display = 'none';

            // Zeige Gewinn-Info und Neustart-Button
            const alertElement = document.querySelector('.custom-alert');
            const messageElement = alertElement.querySelector('.alert-message');
            const confirmButton = alertElement.querySelector('.alert-confirm');
            const playAgainBtn = document.getElementById('playAgainBtn');

            messageElement.textContent = `Spiel beendet! ${winner} haben gewonnen!`;
            alertElement.style.display = 'flex';

            // Bei Spielende verstecke OK-Button, zeige nur Play Again-Button
            confirmButton.style.display = 'none';
            playAgainBtn.style.display = 'block';

            playAgainBtn.onclick = () => {
                // Verstecke Popup und Neustart-Button
                alertElement.style.display = 'none';
                playAgainBtn.style.display = 'none';
                confirmButton.style.display = 'block'; // Stelle OK-Button für andere Spiel-Hinweise wieder her

                // Setze Spielstatus zurück
                this.resetGame();
            };
            return true;
        }

        return false;
    }

    resetGame() {
        // Speichere aktuelle Rolleneinstellungen
        const playerCount = document.getElementById('playerCount').value || '8';
        const mafiaCount = document.getElementById('mafiaCount').value || '2';
        const doctorCount = document.getElementById('doctorCount').value || '1';
        const detectiveCount = document.getElementById('detectiveCount').value || '1';
        const villagerCount = document.getElementById('villagerCount').value || '4';

        // Setze Spielstatus zurück
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

        // Zeige Setup-Interface wieder
        document.querySelector('.game-setup').style.display = 'block';
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.role-management').style.display = 'none';

        // Verstecke alle Spiel-Interfaces
        document.querySelector('.role-cards').style.display = 'block';
        document.querySelector('.game-controls').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.discussion-phase').style.display = 'none';
        document.querySelector('.voting-phase').style.display = 'none';
        document.querySelector('.player-status').style.display = 'none';

        // Stelle gespeicherte Werte wieder her
        document.getElementById('playerCount').value = playerCount;
        document.getElementById('mafiaCount').value = mafiaCount;
        document.getElementById('doctorCount').value = doctorCount;
        document.getElementById('detectiveCount').value = detectiveCount;
        document.getElementById('villagerCount').value = villagerCount;

        // Aktualisiere Rollenanzahlen
        this.updateRoleCounts();
    }

    // Benutzerdefinierte Rollen-Management
    showRoleManagement() {
        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.role-management').style.display = 'block';
        this.refreshRolesList();
    }

    backToSetup() {
        document.querySelector('.role-management').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';
        this.updateCustomRoleInputs();
    }

    createCustomRole() {
        const name = document.getElementById('roleName').value.trim();
        const team = document.getElementById('roleTeam').value;
        const description = document.getElementById('roleDescription').value.trim();
        const ability = document.getElementById('roleAbility').value.trim();

        if (!name || !description) {
            alert('Bitte füllt Rollenname und Beschreibung aus');
            return;
        }

        const roleId = this.generateRoleId(name);
        const customRole = {
            id: roleId,
            name: name,
            team: team,
            description: description,
            ability: ability
        };

        this.customRoles[roleId] = customRole;
        this.saveCustomRoles();
        this.clearCreateRoleForm();
        this.refreshRolesList();
        this.updateCustomRoleInputs();
    }

    generateRoleId(name) {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now();
    }

    clearCreateRoleForm() {
        document.getElementById('roleName').value = '';
        document.getElementById('roleDescription').value = '';
        document.getElementById('roleAbility').value = '';
        document.getElementById('roleTeam').value = 'villager';
    }

    refreshRolesList() {
        const rolesList = document.getElementById('rolesList');
        rolesList.innerHTML = Object.values(this.customRoles).map(role => `
            <div class="col-md-6">
                <div class="card role-card">
                    <div class="card-body">
                        <h5 class="card-title">${role.name}</h5>
                        <p class="card-text"><strong>Team:</strong> ${role.team === 'villager' ? 'Dorfbewohner' : 'Werwolf'}</p>
                        <p class="card-text">${role.description}</p>
                        ${role.ability ? `<p class="card-text"><small><strong>Nachtfähigkeit:</strong> ${role.ability}</small></p>` : ''}
                        <button class="btn btn-danger btn-sm" onclick="game.deleteCustomRole('${role.id}')">Löschen</button>
                    </div>
                </div>
            </div>
        `).join('') || '<p>Keine benutzerdefinierten Rollen erstellt.</p>';
    }

    deleteCustomRole(roleId) {
        if (confirm('Seid ihr sicher, dass ihr diese Rolle löschen möchtet?')) {
            delete this.customRoles[roleId];
            this.saveCustomRoles();
            this.refreshRolesList();
            this.updateCustomRoleInputs();
        }
    }

    updateCustomRoleInputs() {
        const customRoleInputs = document.getElementById('customRoleInputs');
        customRoleInputs.innerHTML = Object.values(this.customRoles).map(role => `
            <div class="role-input col-md-4">
                <label for="${role.id}Count" class="form-label">${role.name}:</label>
                <input type="number" id="${role.id}Count" class="form-control" min="0" value="0">
            </div>
        `).join('');

        // Füge Event-Listener für neue Eingaben hinzu
        Object.values(this.customRoles).forEach(role => {
            const input = document.getElementById(`${role.id}Count`);
            if (input) {
                input.addEventListener('input', () => this.updateRoleCounts());
            }
        });
    }

    loadCustomRoles() {
        const saved = localStorage.getItem('mafiaCustomRoles');
        return saved ? JSON.parse(saved) : {};
    }

    saveCustomRoles() {
        localStorage.setItem('mafiaCustomRoles', JSON.stringify(this.customRoles));
    }

    loadCustomRoleNames() {
        Object.values(this.customRoles).forEach(role => {
            this.roleNames[role.id] = role.name;
            this.roleDescriptions[role.id] = role.description;
        });
    }

    // Hilfsfunktionen
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    updatePlayerStatus() {
        const playerStatus = document.getElementById('playerStatus');
        if (playerStatus) {
            playerStatus.innerHTML = this.players.map(player => {
                const statusClass = player.isAlive ? 'list-group-item-success' : 'list-group-item-danger';
                const statusText = player.isAlive ? 'Lebendig' : 'Tot';
                return `
                    <div class="list-group-item ${statusClass}">
                        <strong>Spieler ${player.id}:</strong> ${statusText}
                    </div>
                `;
            }).join('');
        }
    }

    setupCustomAlert() {
        const alertElement = document.querySelector('.custom-alert');
        const confirmButton = alertElement.querySelector('.alert-confirm');

        confirmButton.addEventListener('click', () => {
            alertElement.style.display = 'none';
            if (this.alertCallback) {
                this.alertCallback();
                this.alertCallback = null;
            }
        });
    }

    showAlert(message, callback = null) {
        const alertElement = document.querySelector('.custom-alert');
        const messageElement = alertElement.querySelector('.alert-message');

        messageElement.textContent = message;
        alertElement.style.display = 'flex';
        this.alertCallback = callback;
    }

    returnToSetup() {
        if (confirm('Seid ihr sicher, dass ihr zur Einrichtung zurückkehren möchtet? Der aktuelle Spielfortschritt geht verloren.')) {
            this.resetGame();
        }
    }

    startCompleteNewGame() {
        if (confirm('Seid ihr sicher, dass ihr ein komplett neues Spiel starten möchtet? Der aktuelle Spielfortschritt geht verloren.')) {
            this.resetGame();
        }
    }
}

// Initialisiere Spiel wenn Seite geladen ist
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new MafiaGame();
});