// Mafia Game Logic - Japanese Version
const mafiaTranslations = {
    roles: {
        mafia: 'マフィア',
        villager: '村人',
        doctor: '医者',
        detective: '探偵'
    },
    roleDescriptions: {
        mafia: '見つからないように村人を減らす',
        villager: '話し合いでマフィアを見つける',
        doctor: '毎晩ひとりを守るか、一度だけ毒を使える',
        detective: '毎晩ひとりの正体を調べる'
    },
    messages: {
        minPlayers: '最低3人必要です',
        villagerRequired: '村人を最低1人入れてください',
        mafiaRequired: 'マフィアを最低1人入れてください',
        roleMismatch: '役職数がプレイヤー数と一致していません',
        openEyes: '目を開けて対象を選んでください。',
        isMafia: 'はマフィアです！',
        isNotMafia: 'はマフィアではありません。',
        targetedByMafia: 'はマフィアに狙われました。',
        lastNightEliminated: '昨夜、プレイヤー',
        wasEliminated: 'が脱落しました。',
        noOneEliminated: '昨夜は誰も脱落しませんでした。',
        alive: '生存',
        dead: '脱落',
        selectVote: '投票する相手を選んでください！',
        eliminatedByVote: 'が投票で脱落しました！',
        gameOver: 'ゲーム終了！',
        win: 'の勝ち！',
        mafiaTeam: 'マフィア陣営',
        villagerTeam: '村人陣営',
        nightPhase: '夜フェーズ',
        dayPhase: '昼フェーズ',
        clickToVote: 'クリックして投票',
        player: 'プレイヤー',
        setupReady: '準備完了',
        roleCreated: '役職を作成しました',
        fillFields: 'すべて入力してください',
        deleteRoleConfirm: 'この役職を削除してもろしいですか？'
    }
};

class MafiaGame {
    constructor() {
        this.players = [];
        this.phase = 'setup';
        this.day = 0;
        this.currentNightRole = null;
        this.nightActions = { mafia: null, doctor: { save: null, poison: null }, detective: null };
        this.doctorAbilities = { hasUsedSave: false, hasUsedPoison: false };
        this.customRoles = this.loadCustomRoles();
        this.setupEventListeners();
        this.updateCustomRoleInputs();
        this.updateRoleCounts();
    }

    loadCustomRoles() {
        const saved = localStorage.getItem('mafiaCustomRoles_ja');
        return saved ? JSON.parse(saved) : {};
    }

    saveCustomRoles() {
        localStorage.setItem('mafiaCustomRoles_ja', JSON.stringify(this.customRoles));
    }

    setupEventListeners() {
        document.getElementById('setupGame').addEventListener('click', () => this.initializeGame());
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('manageRoles').addEventListener('click', () => this.showRoleManagement());
        document.getElementById('createRole').addEventListener('click', () => this.createCustomRole());
        document.getElementById('backToSetup').addEventListener('click', () => this.backToSetup());
        document.getElementById('returnToSetup').addEventListener('click', () => this.returnToSetup());
        document.getElementById('startNewGame').addEventListener('click', () => this.startCompleteNewGame());

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
        
        let customCount = 0;
        Object.values(this.customRoles).forEach(role => {
            const input = document.getElementById(`${role.id}Count`);
            if (input) customCount += parseInt(input.value) || 0;
        });

        const roleTotal = mafiaCount + doctorCount + detectiveCount + villagerCount + customCount;
        const warning = document.getElementById('roleWarning');
        const setupButton = document.getElementById('setupGame');

        if (totalPlayers < 3) { warning.textContent = mafiaTranslations.messages.minPlayers; setupButton.disabled = true; return; }
        if (roleTotal !== totalPlayers) { warning.textContent = `役職の合計 (${roleTotal}) がプレイヤー数 (${totalPlayers}) と一致しません`; setupButton.disabled = true; return; }
        if (villagerCount < 1) { warning.textContent = mafiaTranslations.messages.villagerRequired; setupButton.disabled = true; return; }
        if (mafiaCount < 1) { warning.textContent = mafiaTranslations.messages.mafiaRequired; setupButton.disabled = true; return; }

        warning.textContent = '';
        setupButton.disabled = false;
    }

    initializeGame() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        let roles = Array(parseInt(document.getElementById('mafiaCount').value)).fill('mafia')
            .concat(Array(parseInt(document.getElementById('doctorCount').value)).fill('doctor'))
            .concat(Array(parseInt(document.getElementById('detectiveCount').value)).fill('detective'))
            .concat(Array(parseInt(document.getElementById('villagerCount').value)).fill('villager'));

        Object.values(this.customRoles).forEach(role => {
            const count = parseInt(document.getElementById(`${role.id}Count`)?.value || 0);
            if (count > 0) roles = roles.concat(Array(count).fill(role.id));
        });

        roles = this.shuffleArray(roles);
        this.players = roles.map((role, i) => ({ id: i + 1, role, isAlive: true, revealed: false }));

        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.game-area').style.display = 'block';
        this.createCards();
    }

    createCards() {
        const grid = document.getElementById('cardGrid');
        grid.innerHTML = this.players.map(p => `
            <div class="role-card" data-player-id="${p.id}">
                <div class="card-inner">
                    <div class="card-front"><div class="card-number">プレイヤー ${p.id}</div></div>
                    <div class="card-back role-${p.role}">
                        <div class="role-name">${mafiaTranslations.roles[p.role] || p.role}</div>
                        <div class="role-description">${mafiaTranslations.roleDescriptions[p.role] || (this.customRoles[p.role]?.description || '')}</div>
                    </div>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
                const p = this.players.find(p => p.id === parseInt(card.dataset.playerId));
                p.revealed = true;
                if (this.players.every(p => p.revealed)) document.querySelector('.game-controls').style.display = 'block';
            });
        });
    }

    startGame() {
        document.querySelector('.role-cards').style.display = 'none';
        document.querySelector('.game-controls').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'block';
        this.phase = 'night';
        this.day = 1;
        this.startNightPhase();
    }

    startNightPhase() {
        this.currentNightRole = null;
        this.nightActions = { mafia: null, doctor: { save: null, poison: null }, detective: null };
        this.nextNightRole();
    }

    nextNightRole() {
        const order = ['mafia', 'doctor', 'detective'];
        const nextIdx = order.indexOf(this.currentNightRole) + 1;
        document.querySelectorAll('.role-action').forEach(el => el.style.display = 'none');

        if (nextIdx >= order.length) { this.completeNightPhase(); return; }

        this.currentNightRole = order[nextIdx];
        if (this.players.some(p => p.role === this.currentNightRole && p.isAlive)) {
            document.getElementById(`${this.currentNightRole}-action`).style.display = 'block';
            document.getElementById('narrator-text').textContent = `${mafiaTranslations.roles[this.currentNightRole]}さん、${mafiaTranslations.messages.openEyes}`;
            this.updateTargetSelection();
        } else {
            this.nextNightRole();
        }
    }

    updateTargetSelection() {
        const role = this.currentNightRole;
        const targetDiv = document.getElementById(`${role}-targets`);
        targetDiv.innerHTML = this.players.filter(p => p.isAlive).map(p => `
            <div class="player-option" data-player-id="${p.id}">プレイヤー ${p.id}</div>
        `).join('');

        if (role === 'doctor') {
            document.getElementById('doctor-choice').style.display = 'flex';
            document.getElementById('doctor-targets').style.display = 'none';
            document.getElementById('save-player').onclick = () => {
                this.nightActions.doctor.save = this.nightActions.mafia; // Save the one mafia targeted
                this.nextNightRole();
            };
            document.getElementById('poison-player').onclick = () => {
                document.getElementById('doctor-choice').style.display = 'none';
                document.getElementById('doctor-targets').style.display = 'block';
            };
            document.getElementById('skip-action').onclick = () => this.nextNightRole();
        }

        targetDiv.querySelectorAll('.player-option').forEach(opt => {
            opt.onclick = () => {
                const targetId = parseInt(opt.dataset.playerId);
                if (role === 'detective') {
                    const target = this.players[targetId - 1];
                    const resDiv = document.getElementById('investigation-result');
                    const resText = document.getElementById('investigation-text');
                    resText.textContent = `プレイヤー ${targetId} ${target.role === 'mafia' ? mafiaTranslations.messages.isMafia : mafiaTranslations.messages.isNotMafia}`;
                    resDiv.style.display = 'block';
                    document.getElementById('confirm-detective').onclick = () => this.nextNightRole();
                } else if (role === 'doctor') {
                    this.nightActions.doctor.poison = targetId;
                    this.nextNightRole();
                } else {
                    this.nightActions[role] = targetId;
                    this.nextNightRole();
                }
            };
        });
        
        const confirmBtn = document.getElementById(`confirm-${role}`);
        if (confirmBtn) confirmBtn.onclick = () => this.nextNightRole();
    }

    completeNightPhase() {
        const mafiaT = this.players[this.nightActions.mafia - 1];
        const docS = this.nightActions.doctor.save ? this.players[this.nightActions.doctor.save - 1] : null;
        const docP = this.nightActions.doctor.poison ? this.players[this.nightActions.doctor.poison - 1] : null;

        if (docP) docP.isAlive = false;
        if (mafiaT && (!docS || docS.id !== mafiaT.id)) mafiaT.isAlive = false;

        this.startDiscussionPhase();
    }

    startDiscussionPhase() {
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.discussion-phase').style.display = 'block';
        document.querySelector('.player-status').style.display = 'block';
        
        const res = document.getElementById('night-result');
        const dead = this.players.filter(p => !p.isAlive && !p.revealedForDead);
        if (dead.length > 0) {
            res.textContent = dead.map(p => { p.revealedForDead = true; return `プレイヤー ${p.id}`; }).join('と') + ' が脱落しました。';
        } else {
            res.textContent = mafiaTranslations.messages.noOneEliminated;
        }

        this.updatePlayerStatus();
        document.getElementById('end-discussion').onclick = () => {
             document.querySelector('.discussion-phase').style.display = 'none';
             this.startVotingPhase();
        };
    }

    startVotingPhase() {
        document.querySelector('.voting-phase').style.display = 'block';
        const grid = document.getElementById('voting-grid');
        grid.innerHTML = this.players.map(p => `
            <div class="vote-card ${p.isAlive ? '' : 'dead'}" data-player-id="${p.id}">
                <div class="player-name">プレイヤー ${p.id}</div>
                <div class="player-status">${p.isAlive ? mafiaTranslations.messages.clickToVote : mafiaTranslations.messages.dead}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.vote-card').forEach(card => {
            if (!card.classList.contains('dead')) {
                card.onclick = () => {
                    grid.querySelectorAll('.vote-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                };
            }
        });

        document.getElementById('confirm-vote').onclick = () => {
            const sel = grid.querySelector('.vote-card.selected');
            if (!sel) return;
            const target = this.players[parseInt(sel.dataset.playerId) - 1];
            target.isAlive = false;
            alert(`プレイヤー ${target.id} が追放されました。`);
            document.querySelector('.voting-phase').style.display = 'none';
            if (!this.checkGameEnd()) this.startNightPhase();
        };
    }

    checkGameEnd() {
        const alive = this.players.filter(p => p.isAlive);
        const mafia = alive.filter(p => p.role === 'mafia').length;
        const villagers = alive.length - mafia;

        if (mafia === 0) { alert('村人陣営の勝利！'); this.resetGame(); return true; }
        if (mafia >= villagers) { alert('マフィア陣営の勝利！'); this.resetGame(); return true; }
        return false;
    }

    updatePlayerStatus() {
        const grid = document.getElementById('player-statuses');
        if (grid) grid.innerHTML = this.players.map(p => `
            <div class="player-status-card ${p.isAlive ? '' : 'dead'}">
                <div class="player-name">プレイヤー ${p.id}</div>
                <div class="player-status">${p.isAlive ? mafiaTranslations.messages.alive : mafiaTranslations.messages.dead}</div>
            </div>
        `).join('');
    }

    resetGame() {
        document.querySelector('.game-setup').style.display = 'block';
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.role-cards').style.display = 'block';
    }

    startCompleteNewGame() { this.resetGame(); }
    showRoleManagement() { document.querySelector('.game-setup').style.display = 'none'; document.querySelector('.role-management').style.display = 'block'; }
    backToSetup() { document.querySelector('.role-management').style.display = 'none'; document.querySelector('.game-setup').style.display = 'block'; }
    returnToSetup() { this.resetGame(); }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    updateCustomRoleInputs() { /* Not implemented in basic migration, keeps it simple */ }
    createCustomRole() { alert('カスタム役職は現在メンテナンス中です。'); }
}

window.addEventListener('load', () => { window.game = new MafiaGame(); });
