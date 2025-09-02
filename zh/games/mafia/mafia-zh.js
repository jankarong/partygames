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
            mafia: '秘密淘汰村民，不被发现',
            villager: '找出并淘汰狼人',
            doctor: '游戏中可以救一人并毒杀一人',
            detective: '每晚查验一名玩家身份'
        };
        this.roleNames = {
            mafia: '狼人',
            villager: '村民',
            doctor: '医生',
            detective: '预言家'
        };
        this.loadCustomRoleNames(); // 在roleNames创建后加载自定义角色名称
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



        // Add listeners for role count inputs
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

        // 计算自定义角色数量
        let customRoleCount = 0;
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                customRoleCount += parseInt(countInput.value) || 0;
            }
        });

        // Validate role distribution
        const setupButton = document.getElementById('setupGame');
        const warning = document.getElementById('roleWarning');

        const roleTotal = mafiaCount + doctorCount + detectiveCount + villagerCount + customRoleCount;

        if (totalPlayers < 3) {
            warning.textContent = '至少需要3名玩家';
            setupButton.disabled = true;
            return;
        }

        if (roleTotal !== totalPlayers) {
            warning.textContent = `角色总数（${roleTotal}）与总玩家数（${totalPlayers}）不匹配`;
            setupButton.disabled = true;
            return;
        }

        if (mafiaCount < 1) {
            warning.textContent = '至少需要1名狼人';
            setupButton.disabled = true;
            return;
        }

        if (villagerCount < 1) {
            warning.textContent = '至少需要1名村民';
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
        const villagerCount = parseInt(document.getElementById('villagerCount').value);

        this.players = [];

        // Create roles array based on selected counts
        let roles = Array(mafiaCount).fill('mafia');
        if (doctorCount > 0) roles = roles.concat(Array(doctorCount).fill('doctor'));
        if (detectiveCount > 0) roles = roles.concat(Array(detectiveCount).fill('detective'));
        roles = roles.concat(Array(villagerCount).fill('villager'));

        // 添加自定义角色
        Object.values(this.customRoles).forEach(role => {
            const countInput = document.getElementById(`${role.id}Count`);
            if (countInput) {
                const count = parseInt(countInput.value) || 0;
                if (count > 0) {
                    roles = roles.concat(Array(count).fill(role.id));
                    // 确保角色名称和描述已加载
                    this.roleNames[role.id] = role.name;
                    this.roleDescriptions[role.id] = role.description;
                }
            }
        });

        // Shuffle roles
        roles = this.shuffleArray(roles);

        // Create players
        for (let i = 0; i < playerCount; i++) {
            this.players.push({
                id: i + 1,
                name: `玩家 ${i + 1}`,
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
                        <div class="card-number">玩家 ${player.id}</div>
                    </div>
                    <div class="card-back role-${player.role}">
                        <div class="role-name">${this.roleNames[player.role] || player.role}</div>
                        <div class="role-description">${this.roleDescriptions[player.role] || '未知角色'}</div>
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

        // 切换卡片的翻转状态
        if (card.classList.contains('flipped')) {
            // 如果已经翻开，则合上
            card.classList.remove('flipped');
        } else {
            // 如果未翻开，则翻开
            card.classList.add('flipped');
            player.revealed = true;

            // 当所有玩家都查看过身份后，直接显示开始游戏按钮
            if (this.players.every(p => p.revealed)) {
                document.querySelector('.game-controls').style.display = 'block';
            }
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

        // 重置预言家调查结果显示
        const investigationResult = document.getElementById('investigation-result');
        if (investigationResult) {
            investigationResult.style.display = 'none';
        }

        // 重置医生界面状态
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
            const roleNameChinese = this.roleNames[this.currentNightRole];
            narratorText.textContent = `${roleNameChinese}请睁眼，做出你的选择。`;
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
                    玩家 ${player.id}
                </div>
            `).join('');

        // 如果是预言家，确保调查结果是隐藏的，并重新启用所有选项
        if (this.currentNightRole === 'detective') {
            const investigationResult = document.getElementById('investigation-result');
            if (investigationResult) {
                investigationResult.style.display = 'none';
            }
        }

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
                    resultText.textContent = `玩家 ${targetId} ${targetPlayer.role === 'mafia' ? '是狼人！' : '不是狼人。'}`;
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

        let promptText = `玩家 ${mafiaTarget.id} 被狼人选中了。`;
        if (!this.doctorAbilities.hasUsedSave) {
            promptText += ' 你可以救他，';
        }
        if (!this.doctorAbilities.hasUsedPoison) {
            promptText += ' 或下毒杀死某人，';
        }
        promptText += ' 或跳过行动。';

        // 重置按钮状态
        saveButton.disabled = false;
        saveButton.style.opacity = '1';
        saveButton.style.cursor = 'pointer';
        poisonButton.disabled = false;
        poisonButton.style.opacity = '1';
        poisonButton.style.cursor = 'pointer';

        // 根据能力使用情况禁用按钮
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

        // 重置界面状态
        doctorTargets.style.display = 'none';
        document.getElementById('doctor-choice').style.display = 'flex';
        document.getElementById('confirm-doctor').style.display = 'none';

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
                            玩家 ${player.id}
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

        // 处理狼人的击杀（如果目标被医生救了就不会死）
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
        const eliminatedPlayers = this.players.filter(p => !p.isAlive);
        const newDeaths = eliminatedPlayers.filter(p => !p.previouslyDead);

        // 标记之前死亡的玩家
        eliminatedPlayers.forEach(p => p.previouslyDead = true);

        if (newDeaths.length > 1) {
            const deadPlayerNames = newDeaths.map(p => `玩家 ${p.id}`).join('和');
            nightResult.textContent = `昨晚，${deadPlayerNames} 被淘汰了。`;
        } else if (newDeaths.length === 1) {
            nightResult.textContent = `昨晚，玩家 ${newDeaths[0].id} 被淘汰了。`;
        } else {
            nightResult.textContent = '昨晚平安夜，没有人被淘汰。';
        }

        // 更新玩家状态
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">玩家 ${player.id}</div>
                <div class="player-status">${player.isAlive ? '存活' : '死亡'}</div>
            </div>
        `).join('');

        // 检查游戏是否结束（在夜晚行动后）
        if (this.checkGameEnd()) {
            return; // 游戏已结束，不需要继续讨论阶段
        }

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
        // 检查游戏是否结束（在投票前）
        if (this.checkGameEnd()) {
            return; // 游戏已结束，不需要投票
        }

        // 显示投票界面
        document.querySelector('.voting-phase').style.display = 'block';

        // 更新投票选项
        const votingGrid = document.getElementById('voting-grid');
        votingGrid.innerHTML = this.players.map(player => `
            <div class="vote-card ${player.isAlive ? '' : 'dead'}" data-player-id="${player.id}">
                <div class="player-name">玩家 ${player.id}</div>
                <div class="player-status">${player.isAlive ? '点击投票' : '已死亡'}</div>
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
            this.showAlert('请选择一名玩家投票！');
            return;
        }

        const votedPlayerId = parseInt(selectedCard.dataset.playerId);
        const votedPlayer = this.players.find(p => p.id === votedPlayerId);

        // 处决被投票的玩家
        votedPlayer.isAlive = false;

        // 隐藏投票界面
        document.querySelector('.voting-phase').style.display = 'none';

        // 显示投票结果
        this.showAlert(`玩家 ${votedPlayerId} 被投票淘汰了！`, () => {
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

        // 如果狼人数量大于等于好人数量，狼人胜利
        if (aliveMafia >= aliveVillagers) {
            gameOver = true;
            winner = '狼人';
        }
        // 如果狼人全部死亡，好人胜利
        else if (aliveMafia === 0) {
            gameOver = true;
            winner = '村民';
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

            messageElement.textContent = `游戏结束！${winner}获胜！`;
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
        const playerCount = document.getElementById('playerCount').value || '8';
        const mafiaCount = document.getElementById('mafiaCount').value || '2';
        const doctorCount = document.getElementById('doctorCount').value || '1';
        const detectiveCount = document.getElementById('detectiveCount').value || '1';
        const villagerCount = document.getElementById('villagerCount').value || '4';

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
        document.getElementById('villagerCount').value = villagerCount;

        this.updateRoleCounts();
    }

    updatePlayerStatus() {
        const statusGrid = document.getElementById('player-statuses');
        statusGrid.innerHTML = this.players.map(player => `
            <div class="player-status-card ${player.isAlive ? '' : 'dead'}">
                <div class="player-name">玩家 ${player.id}</div>
                <div class="player-status">${player.isAlive ? '存活' : '死亡'}</div>
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

    loadCustomRoles() {
        const saved = localStorage.getItem('mafiaCustomRoles');
        return saved ? JSON.parse(saved) : {};
    }

    saveCustomRoles() {
        localStorage.setItem('mafiaCustomRoles', JSON.stringify(this.customRoles));
    }

    loadCustomRoleNames() {
        // 将自定义角色的名称和描述加载到游戏对象中
        if (this.customRoles && typeof this.customRoles === 'object') {
            Object.values(this.customRoles).forEach(role => {
                if (role && role.id && role.name) {
                    this.roleNames[role.id] = role.name;
                    this.roleDescriptions[role.id] = role.description || '';
                }
            });
        }
    }

    showRoleManagement() {
        // Hide setup, show role management
        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.role-management').style.display = 'block';

        this.displayExistingRoles();
    }

    displayExistingRoles() {
        const rolesList = document.getElementById('rolesList');
        rolesList.innerHTML = '';

        // Display built-in roles
        const builtInRoles = [
            { id: 'mafia', name: '狼人', team: 'mafia', description: '秘密淘汰村民，不被发现', builtin: true },
            { id: 'villager', name: '村民', team: 'villager', description: '找出并淘汰狼人', builtin: true },
            { id: 'doctor', name: '医生', team: 'villager', description: '游戏中可以救一人并毒杀一人', builtin: true },
            { id: 'detective', name: '预言家', team: 'villager', description: '每晚查验一名玩家身份', builtin: true }
        ];

        [...builtInRoles, ...Object.values(this.customRoles)].forEach(role => {
            const roleCard = document.createElement('div');
            roleCard.className = 'col-md-6';

            const teamBadgeClass = role.team === 'mafia' ? 'bg-danger' : 'bg-success';

            roleCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${role.name}</h5>
                            <span class="badge ${teamBadgeClass}">${role.team === 'mafia' ? '狼人阵营' : '村民阵营'}</span>
                        </div>
                        <p class="card-text text-muted mb-2">${role.description}</p>
                        ${role.ability ? `<p class="card-text"><small class="text-info">夜晚能力: ${role.ability}</small></p>` : ''}
                        ${!role.builtin ? `<button class="btn btn-sm btn-outline-danger" onclick="game.deleteCustomRole('${role.id}')">删除</button>` : ''}
                    </div>
                </div>
            `;
            rolesList.appendChild(roleCard);
        });
    }

    createCustomRole() {
        const name = document.getElementById('roleName').value.trim();
        const team = document.getElementById('roleTeam').value;
        const description = document.getElementById('roleDescription').value.trim();
        const ability = document.getElementById('roleAbility').value.trim();

        if (!name || !description) {
            this.showAlert('请填写角色名称和描述！');
            return;
        }

        const roleId = 'custom_' + Date.now();

        this.customRoles[roleId] = {
            id: roleId,
            name: name,
            team: team,
            description: description,
            ability: ability,
            builtin: false
        };

        // Update role descriptions for game use
        this.roleDescriptions[roleId] = description;
        this.roleNames[roleId] = name;

        this.saveCustomRoles();
        this.loadCustomRoleNames(); // 重新加载角色名称
        this.displayExistingRoles();

        // Clear form
        document.getElementById('roleName').value = '';
        document.getElementById('roleDescription').value = '';
        document.getElementById('roleAbility').value = '';

        this.showAlert('角色创建成功！');

        // 如果在游戏设置界面，更新输入框
        if (document.querySelector('.game-setup').style.display !== 'none') {
            this.updateCustomRoleInputs();
        }
    }

    deleteCustomRole(roleId) {
        if (confirm(`确定要删除角色 "${this.customRoles[roleId].name}" 吗？`)) {
            delete this.customRoles[roleId];
            delete this.roleDescriptions[roleId];
            delete this.roleNames[roleId];
            this.saveCustomRoles();
            this.displayExistingRoles();
            this.showAlert('角色删除成功！');

            // 更新游戏设置中的输入框
            this.updateCustomRoleInputs();
        }
    }

    backToSetup() {
        document.querySelector('.role-management').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';
        this.updateCustomRoleInputs(); // 返回时更新输入框
    }

    returnToSetup() {
        // 隐藏游戏区域，显示游戏设置
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';

        // 重置游戏状态
        this.phase = 'setup';
        this.players = [];

        // 清空卡片区域
        document.getElementById('cardGrid').innerHTML = '';

        // 隐藏游戏控制按钮
        document.querySelector('.game-controls').style.display = 'none';
    }



    updateCustomRoleInputs() {
        const customRoleInputs = document.getElementById('customRoleInputs');
        customRoleInputs.innerHTML = '';

        // 为每个自定义角色创建输入框
        Object.values(this.customRoles).forEach(role => {
            const roleDiv = document.createElement('div');
            roleDiv.className = 'role-input col-md-4';
            roleDiv.innerHTML = `
                <label for="${role.id}Count" class="form-label">${role.name}：</label>
                <input type="number" id="${role.id}Count" class="form-control" min="0" max="10" value="0">
            `;
            customRoleInputs.appendChild(roleDiv);

            // 添加事件监听器
            document.getElementById(`${role.id}Count`).addEventListener('input', () => this.updateRoleCounts());
        });
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    window.game = new MafiaGame();
});