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
        this.roleDescriptions = {
            mafia: 'Eliminate the villagers without being caught',
            villager: 'Find and eliminate the Mafia',
            doctor: 'Save one person during the game AND poison one person during the game',
            detective: 'Investigate one player\'s identity each night'
        };
        this.setupEventListeners();
        this.updateRoleCounts();
        this.setupCustomAlert();
    }

    setupEventListeners() {
        document.getElementById('setupGame').addEventListener('click', () => this.initializeGame());
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('nextPhase').addEventListener('click', () => this.nextPhase());

        // Add listeners for role count inputs
        ['playerCount', 'mafiaCount', 'doctorCount', 'detectiveCount'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.updateRoleCounts());
        });
    }

    updateRoleCounts() {
        const totalPlayers = parseInt(document.getElementById('playerCount').value) || 0;
        const mafiaCount = parseInt(document.getElementById('mafiaCount').value) || 0;
        const doctorCount = parseInt(document.getElementById('doctorCount').value) || 0;
        const detectiveCount = parseInt(document.getElementById('detectiveCount').value) || 0;

        // Calculate villagers
        const villagerCount = totalPlayers - (mafiaCount + doctorCount + detectiveCount);
        document.getElementById('villagerCount').textContent = Math.max(0, villagerCount);

        // Validate role distribution
        const setupButton = document.getElementById('setupGame');
        const warning = document.getElementById('roleWarning');

        if (totalPlayers < 6) {
            warning.textContent = 'Minimum 6 players required';
            setupButton.disabled = true;
            return;
        }

        if (totalPlayers > 15) {
            warning.textContent = 'Maximum 15 players allowed';
            setupButton.disabled = true;
            return;
        }

        if (villagerCount < 1) {
            warning.textContent = 'Need at least 1 villager';
            setupButton.disabled = true;
            return;
        }

        if (mafiaCount < 1) {
            warning.textContent = 'Need at least 1 mafia';
            setupButton.disabled = true;
            return;
        }

        if (mafiaCount >= villagerCount) {
            warning.textContent = 'Too many mafia members';
            setupButton.disabled = true;
            return;
        }

        // All validations passed
        warning.textContent = '';
        setupButton.disabled = false;
    }

    initializeGame() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        const mafiaCount = parseInt(document.getElementById('mafiaCount').value);
        const doctorCount = parseInt(document.getElementById('doctorCount').value);
        const detectiveCount = parseInt(document.getElementById('detectiveCount').value);

        this.players = [];

        // Create roles array based on selected counts
        let roles = Array(mafiaCount).fill('mafia');
        if (doctorCount > 0) roles.push('doctor');
        if (detectiveCount > 0) roles.push('detective');

        // Fill remaining slots with villagers
        const villagerCount = playerCount - roles.length;
        roles = roles.concat(Array(villagerCount).fill('villager'));

        // Shuffle roles
        roles = this.shuffleArray(roles);

        // Create players
        for (let i = 0; i < playerCount; i++) {
            this.players.push({
                id: i + 1,
                name: `Player ${i + 1}`,
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
            <div class="col">
                <div class="role-card" data-player-id="${player.id}">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="card-number">Player ${player.id}</div>
                        </div>
                        <div class="card-back role-${player.role}">
                            <div class="role-name">${player.role.toUpperCase()}</div>
                            <div class="role-description">${this.roleDescriptions[player.role]}</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners to cards
        const cards = cardGrid.getElementsByClassName('role-card');
        Array.from(cards).forEach(card => {
            card.addEventListener('click', (e) => this.flipCard(e));
        });
    }

    flipCard(event) {
        const card = event.currentTarget;
        const playerId = parseInt(card.dataset.playerId);
        const player = this.players.find(p => p.id === playerId);

        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            player.revealed = true;

            // 当所有玩家都查看过身份后，直接显示开始游戏按钮
            if (this.players.every(p => p.revealed)) {
                document.querySelector('.game-controls').style.display = 'block';
            }

            // 3秒后自动翻回
            setTimeout(() => {
                card.classList.remove('flipped');
            }, 3000);
        }
    }

    startGame() {
        // 隐藏身份卡片区域
        document.querySelector('.role-cards').style.display = 'none';
        document.querySelector('.game-controls').style.display = 'none';

        // 显示夜晚行动界面，但不显示玩家状态
        document.querySelector('.night-actions').style.display = 'block';
        document.querySelector('.player-status').style.display = 'none';

        // 开始第一个夜晚
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

        // 开始第一个角色的行动
        this.nextNightRole();
    }

    nextNightRole() {
        const roleOrder = ['mafia', 'doctor', 'detective'];
        const currentIndex = roleOrder.indexOf(this.currentNightRole);
        const nextIndex = currentIndex + 1;

        // 隐藏所有行动区域
        document.querySelectorAll('.role-action').forEach(el => el.style.display = 'none');

        if (nextIndex >= roleOrder.length) {
            // 夜晚阶段结束
            this.completeNightPhase();
            return;
        }

        this.currentNightRole = roleOrder[nextIndex];
        const narratorText = document.getElementById('narrator-text');
        const actionArea = document.getElementById(`${this.currentNightRole}-action`);

        // 显示当前角色的行动区域
        if (this.hasRole(this.currentNightRole)) {
            actionArea.style.display = 'block';
            narratorText.textContent = `${this.currentNightRole.charAt(0).toUpperCase() + this.currentNightRole.slice(1)}, please open your eyes and make your selection.`;
            if (this.currentNightRole === 'doctor') {
                this.startDoctorTurn();
            } else {
                this.updateTargetSelection();
            }
        } else {
            // 如果没有这个角色，跳到下一个
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
                    Player ${player.id}
                </div>
            `).join('');

        // Add click handlers
        const options = targetDiv.getElementsByClassName('player-option');
        Array.from(options).forEach(option => {
            option.addEventListener('click', () => {
                if (this.currentNightRole === 'detective') {
                    // 移除所有选中状态
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    // 添加选中状态
                    option.classList.add('selected');

                    const targetId = parseInt(option.dataset.playerId);
                    const targetPlayer = this.players[targetId - 1];

                    // 设置调查目标
                    this.nightActions.detective = targetId;

                    // 显示调查结果
                    const resultDiv = document.getElementById('investigation-result');
                    const resultText = document.getElementById('investigation-text');
                    resultText.textContent = `Player ${targetId} is ${targetPlayer.role === 'mafia' ? 'a Mafia member!' : 'not a Mafia member.'}`;
                    resultText.className = `result-text ${targetPlayer.role === 'mafia' ? 'mafia' : 'villager'}`;
                    resultDiv.style.display = 'block';

                    // 禁用所有其他选项
                    Array.from(options).forEach(opt => {
                        if (opt !== option) {
                            opt.style.pointerEvents = 'none';
                            opt.style.opacity = '0.5';
                        }
                    });

                    // 添加确认按钮点击事件
                    document.getElementById('confirm-detective').onclick = () => {
                        this.nextNightRole();
                    };
                } else {
                    // 其他角色的选择逻辑
                    Array.from(options).forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                }
            });
        });

        // 为其他角色添加确认按钮事件
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

        let promptText = `Player ${mafiaTarget.id} was targeted by the Mafia.`;
        if (!this.doctorAbilities.hasUsedSave) {
            promptText += ' You can save them,';
        }
        if (!this.doctorAbilities.hasUsedPoison) {
            promptText += ' poison someone,';
        }
        promptText += ' or skip your turn.';

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

        // 显示选择按钮
        doctorTargets.style.display = 'none';
        document.getElementById('doctor-choice').style.display = 'flex';

        // 救人按钮
        saveButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedSave) {
                this.nightActions.doctor.save = mafiaTarget.id;
                this.doctorAbilities.hasUsedSave = true;
                this.nextNightRole();
            }
        };

        // 毒死按钮
        poisonButton.onclick = () => {
            if (!this.doctorAbilities.hasUsedPoison) {
                // 显示可选择的目标
                doctorTargets.style.display = 'block';
                document.getElementById('doctor-choice').style.display = 'none';

                // 更新可选择的玩家列表
                doctorTargets.innerHTML = this.players
                    .filter(player => player.isAlive)
                    .map(player => `
                        <div class="player-option" data-player-id="${player.id}">
                            Player ${player.id}
                        </div>
                    `).join('');

                // 添加点击事件
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

        // 跳过按钮
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

        // 处理医生的毒死效果
        if (doctorPoisonTarget) {
            doctorPoisonTarget.isAlive = false;
        }

        // 处理黑手党的击杀（如果目标被医生救了就不会死）
        if (mafiaTarget && doctorSaveTarget && mafiaTarget.id === doctorSaveTarget.id) {
            // 医生成功救人
        } else if (mafiaTarget) {
            mafiaTarget.isAlive = false;
        }

        // 开始讨论阶段
        this.startDiscussionPhase();
    }

    startDiscussionPhase() {
        // 隐藏夜晚阶段的界面
        document.querySelector('.night-actions').style.display = 'none';
        // 显示讨论阶段界面和玩家状态
        document.querySelector('.discussion-phase').style.display = 'block';
        document.querySelector('.player-status').style.display = 'block';

        // 更新夜晚结果
        const nightResult = document.getElementById('night-result');
        const eliminatedPlayer = this.players.find(p => !p.isAlive);
        if (eliminatedPlayer) {
            nightResult.textContent = `Last night, Player ${eliminatedPlayer.id} was eliminated.`;
        } else {
            nightResult.textContent = 'No one was eliminated last night.';
        }

        // 更新玩家状态
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">Player ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Alive' : 'Dead'}</div>
            </div>
        `).join('');

        // 设置结束讨论按钮
        document.getElementById('end-discussion').onclick = () => {
            this.endDiscussion();
        };
    }

    endDiscussion() {
        // 隐藏讨论阶段界面
        document.querySelector('.discussion-phase').style.display = 'none';

        // 开始投票阶段
        this.startVotingPhase();
    }

    startVotingPhase() {
        // 显示投票界面
        document.querySelector('.voting-phase').style.display = 'block';

        // 更新投票选项
        const votingGrid = document.getElementById('voting-grid');
        votingGrid.innerHTML = this.players.map(player => `
            <div class="vote-card ${player.isAlive ? '' : 'dead'}" data-player-id="${player.id}">
                <div class="player-name">Player ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Click to Vote' : 'Dead'}</div>
            </div>
        `).join('');

        // 添加投票卡片的点击事件
        const voteCards = votingGrid.getElementsByClassName('vote-card');
        Array.from(voteCards).forEach(card => {
            if (!card.classList.contains('dead')) {
                card.addEventListener('click', () => this.selectVoteTarget(card));
            }
        });

        // 添加确认投票按钮的事件
        document.getElementById('confirm-vote').addEventListener('click', () => this.confirmVote());
    }

    selectVoteTarget(card) {
        // 移除其他卡片的选中状态
        const allCards = document.getElementsByClassName('vote-card');
        Array.from(allCards).forEach(c => c.classList.remove('selected'));

        // 选中当前卡片
        card.classList.add('selected');
    }

    confirmVote() {
        const selectedCard = document.querySelector('.vote-card.selected');
        if (!selectedCard) {
            this.showAlert('Please select a player to vote for!');
            return;
        }

        const votedPlayerId = parseInt(selectedCard.dataset.playerId);
        const votedPlayer = this.players.find(p => p.id === votedPlayerId);

        // 处决被投票的玩家
        votedPlayer.isAlive = false;

        // 隐藏投票界面
        document.querySelector('.voting-phase').style.display = 'none';

        // 显示投票结果
        this.showAlert(`Player ${votedPlayerId} has been eliminated by vote!`, () => {
            // 更新玩家状态
            this.updatePlayerStatus();

            // 检查游戏是否结束
            if (this.checkGameEnd()) {
                return;
            }

            // 进入新的夜晚
            this.day++;
            this.phase = 'night';

            // 重置夜晚行动
            this.nightActions = {
                mafia: null,
                doctor: {
                    save: null,
                    poison: null
                },
                detective: null
            };

            // 显示夜晚行动界面
            document.querySelector('.night-actions').style.display = 'block';

            // 开始新的夜晚阶段
            this.startNightPhase();
        });
    }

    checkGameEnd() {
        // 计算存活的玩家数量
        const alivePlayers = this.players.filter(p => p.isAlive);
        const aliveMafia = alivePlayers.filter(p => p.role === 'mafia').length;
        const aliveVillagers = alivePlayers.length - aliveMafia;

        let gameOver = false;
        let winner = null;

        // 如果黑手党数量大于等于好人数量，黑手党胜利
        if (aliveMafia >= aliveVillagers) {
            gameOver = true;
            winner = 'Mafia';
        }
        // 如果黑手党全部死亡，好人胜利
        else if (aliveMafia === 0) {
            gameOver = true;
            winner = 'Villagers';
        }

        if (gameOver) {
            // 显示游戏结束界面
            document.querySelector('.night-actions').style.display = 'none';
            document.querySelector('.discussion-phase').style.display = 'none';
            document.querySelector('.voting-phase').style.display = 'none';
            document.querySelector('.player-status').style.display = 'none';

            // 显示获胜信息和重新开始按钮
            const alertElement = document.querySelector('.custom-alert');
            const messageElement = alertElement.querySelector('.alert-message');
            const confirmButton = alertElement.querySelector('.alert-confirm');
            const playAgainBtn = document.getElementById('playAgainBtn');

            messageElement.textContent = `Game Over! ${winner} Win!`;
            alertElement.style.display = 'flex';

            // 在游戏结束时隐藏 OK 按钮，只显示 Play Again 按钮
            confirmButton.style.display = 'none';
            playAgainBtn.style.display = 'block';

            playAgainBtn.onclick = () => {
                // 隐藏弹窗和重新开始按钮
                alertElement.style.display = 'none';
                playAgainBtn.style.display = 'none';
                confirmButton.style.display = 'block'; // 恢复 OK 按钮显示，供游戏中其他提示使用

                // 重置游戏状态
                this.resetGame();
            };
            return true;
        }

        return false;
    }

    resetGame() {
        // 保存当前的角色设置
        const playerCount = document.getElementById('playerCount').value || '6';
        const mafiaCount = document.getElementById('mafiaCount').value || '1';
        const doctorCount = document.getElementById('doctorCount').value || '1';
        const detectiveCount = document.getElementById('detectiveCount').value || '1';

        // 重置游戏状态
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

        // 重置UI
        document.querySelector('.game-setup').style.display = 'block';
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.player-status').style.display = 'none';
        document.querySelector('.role-cards').style.display = 'block';
        document.querySelector('.game-controls').style.display = 'none';

        // 恢复上一局的角色设置
        document.getElementById('playerCount').value = playerCount;
        document.getElementById('mafiaCount').value = mafiaCount;
        document.getElementById('doctorCount').value = doctorCount;
        document.getElementById('detectiveCount').value = detectiveCount;

        this.updateRoleCounts();
    }

    updatePlayerStatus() {
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">Player ${player.id}</div>
                <div class="player-status">${player.isAlive ? 'Alive' : 'Dead'}</div>
            </div>
        `).join('');
    }

    setupCustomAlert() {
        const alertConfirm = document.querySelector('.alert-confirm');
        if (alertConfirm) {
            alertConfirm.addEventListener('click', () => {
                document.querySelector('.custom-alert').style.display = 'none';
            });
        }
    }

    showAlert(message, callback = null) {
        const alertElement = document.querySelector('.custom-alert');
        const messageElement = alertElement.querySelector('.alert-message');
        const confirmButton = alertElement.querySelector('.alert-confirm');
        const playAgainBtn = document.getElementById('playAgainBtn');

        messageElement.textContent = message;
        alertElement.style.display = 'flex';

        // 确保在普通提示中显示 OK 按钮，隐藏 Play Again 按钮
        confirmButton.style.display = 'block';
        playAgainBtn.style.display = 'none';

        // 移除之前的所有点击事件
        const newConfirmButton = confirmButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

        // 添加新的点击事件
        newConfirmButton.addEventListener('click', () => {
            alertElement.style.display = 'none';
            // 滚动到页面顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (callback) callback();
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    window.game = new MafiaGame();
});
