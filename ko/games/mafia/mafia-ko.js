// Mafia Game Logic - Korean Version
const mafiaTranslations = {
    roles: {
        mafia: '마피아',
        villager: '시민',
        doctor: '의사',
        detective: '경찰'
    },
    roleDescriptions: {
        mafia: '들키지 않게 시민들을 하나씩 제거하세요.',
        villager: '토론과 투표를 통해 마피아를 찾아내세요.',
        doctor: '매일 밤 한 명을 보호하거나, 한 번의 독을 사용할 수 있습니다.',
        detective: '매일 밤 한 명의 정체가 마피아인지 조사합니다.'
    },
    messages: {
        minPlayers: '최소 6명의 플레이어가 필요합니다.',
        villagerRequired: '시민을 최소 1명 이상 설정해 주세요.',
        mafiaRequired: '마피아를 최소 1명 이상 설정해 주세요.',
        roleMismatch: '설정된 역할의 합이 전체 인원수와 일치하지 않습니다.',
        openEyes: '님, 눈을 떠서 대상을 선택해 주세요.',
        isMafia: '님은 마피아가 맞습니다!',
        isNotMafia: '님은 마피아가 아닙니다.',
        targetedByMafia: '님이 마피아의 표적이 되었습니다.',
        lastNightEliminated: '지난밤, 플레이어 ',
        wasEliminated: '님이 탈락했습니다.',
        noOneEliminated: '지난밤에는 아무도 탈락하지 않았습니다.',
        alive: '생존',
        dead: '탈락',
        selectVote: '투표할 대상을 선택해 주세요!',
        eliminatedByVote: '님이 다수결로 처형되었습니다.',
        gameOver: '게임 종료!',
        win: '의 승리!',
        mafiaTeam: '마피아 진영',
        villagerTeam: '시민 진영',
        nightPhase: '밤 페이즈',
        dayPhase: '낮 페이즈',
        clickToVote: '클릭하여 투표',
        player: '플레이어',
        setupReady: '준비 완료',
        roleCreated: '새로운 역할이 생성되었습니다.',
        fillFields: '모든 빈칸을 채워주세요.',
        deleteRoleConfirm: '이 역할을 삭제하시겠습니까?'
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
        this.updateRoleCounts();
    }

    loadCustomRoles() {
        const saved = localStorage.getItem('mafiaCustomRoles_ko');
        return saved ? JSON.parse(saved) : {};
    }

    saveCustomRoles() {
        localStorage.setItem('mafiaCustomRoles_ko', JSON.stringify(this.customRoles));
    }

    setupEventListeners() {
        const setupBtn = document.getElementById('setupGame');
        const startBtn = document.getElementById('startGame');
        const manageBtn = document.getElementById('manageRoles');
        const createBtn = document.getElementById('createRole');
        const backBtn = document.getElementById('backToSetup');
        const returnBtn = document.getElementById('returnToSetup');
        const newGameBtn = document.getElementById('startNewGame');

        if (setupBtn) setupBtn.addEventListener('click', () => this.initializeGame());
        if (startBtn) startBtn.addEventListener('click', () => this.startGame());
        if (manageBtn) manageBtn.addEventListener('click', () => this.showRoleManagement());
        if (createBtn) createBtn.addEventListener('click', () => this.createCustomRole());
        if (backBtn) backBtn.addEventListener('click', () => this.backToSetup());
        if (returnBtn) returnBtn.addEventListener('click', () => this.returnToSetup());
        if (newGameBtn) newGameBtn.addEventListener('click', () => this.startCompleteNewGame());

        ['playerCount', 'mafiaCount', 'doctorCount', 'detectiveCount', 'villagerCount'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => this.updateRoleCounts());
        });
    }

    updateRoleCounts() {
        const totalPlayers = parseInt(document.getElementById('playerCount')?.value) || 0;
        const mafiaCount = parseInt(document.getElementById('mafiaCount')?.value) || 0;
        const doctorCount = parseInt(document.getElementById('doctorCount')?.value) || 0;
        const detectiveCount = parseInt(document.getElementById('detectiveCount')?.value) || 0;
        const villagerCount = parseInt(document.getElementById('villagerCount')?.value) || 0;
        
        let customCount = 0;
        Object.values(this.customRoles).forEach(role => {
            const input = document.getElementById(`${role.id}Count`);
            if (input) customCount += parseInt(input.value) || 0;
        });

        const roleTotal = mafiaCount + doctorCount + detectiveCount + villagerCount + customCount;
        const warning = document.getElementById('roleWarning');
        const setupButton = document.getElementById('setupGame');

        if (!warning || !setupButton) return;

        if (totalPlayers < 6) { 
            warning.textContent = mafiaTranslations.messages.minPlayers; 
            setupButton.disabled = true; 
            return; 
        }
        if (roleTotal !== totalPlayers) { 
            warning.textContent = `역할의 합 (${roleTotal})이 전체 인원 (${totalPlayers})과 일치하지 않습니다.`; 
            setupButton.disabled = true; 
            return; 
        }
        if (villagerCount < 1) { 
            warning.textContent = mafiaTranslations.messages.villagerRequired; 
            setupButton.disabled = true; 
            return; 
        }
        if (mafiaCount < 1) { 
            warning.textContent = mafiaTranslations.messages.mafiaRequired; 
            setupButton.disabled = true; 
            return; 
        }

        warning.textContent = '';
        setupButton.disabled = false;
    }

    initializeGame() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        let roles = Array(parseInt(document.getElementById('mafiaCount').value)).fill('mafia')
            .concat(Array(parseInt(document.getElementById('doctorCount').value)).fill('doctor'))
            .concat(Array(parseInt(document.getElementById('detectiveCount').value)).fill('detective'))
            .concat(Array(parseInt(document.getElementById('villagerCount').value)).fill('villager'));

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
                    <div class="card-front"><div class="card-number">플레이어 ${p.id}</div></div>
                    <div class="card-back role-${p.role}">
                        <div class="role-name">${mafiaTranslations.roles[p.role] || p.role}</div>
                        <div class="role-description small">${mafiaTranslations.roleDescriptions[p.role] || ''}</div>
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
        document.querySelector('.role-instructions').style.display = 'block';
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
        const currentIdx = this.currentNightRole ? order.indexOf(this.currentNightRole) : -1;
        const nextIdx = currentIdx + 1;
        
        const actionArea = document.getElementById('action-area');
        if (!actionArea) return;
        actionArea.innerHTML = '';

        if (nextIdx >= order.length) { 
            this.completeNightPhase(); 
            return; 
        }

        this.currentNightRole = order[nextIdx];
        if (this.players.some(p => p.role === this.currentNightRole && p.isAlive)) {
            const roleName = mafiaTranslations.roles[this.currentNightRole];
            document.getElementById('narrator-text').innerHTML = `<strong class="text-primary">${roleName}</strong>${mafiaTranslations.messages.openEyes}`;
            this.renderActionUI(this.currentNightRole);
        } else {
            this.nextNightRole();
        }
    }

    renderActionUI(role) {
        const actionArea = document.getElementById('action-area');
        let html = '';
        
        const alivePlayers = this.players.filter(p => p.isAlive);

        if (role === 'mafia') {
            html = `
                <div class="role-action text-center">
                    <h5 class="fw-bold mb-3">탈락시킬 시민을 선택하세요</h5>
                    <div class="player-selection d-flex flex-wrap justify-content-center gap-2">
                        ${alivePlayers.map(p => `<button class="btn btn-outline-danger btn-sm target-btn rounded-pill px-3" data-id="${p.id}">플레이어 ${p.id}</button>`).join('')}
                    </div>
                </div>
            `;
        } else if (role === 'doctor') {
            html = `
                <div class="role-action text-center">
                    <h5 class="fw-bold mb-3">누구를 보호하시겠습니까?</h5>
                    <div class="player-selection d-flex flex-wrap justify-content-center gap-2">
                        ${alivePlayers.map(p => `<button class="btn btn-outline-success btn-sm target-btn rounded-pill px-3" data-id="${p.id}">플레이어 ${p.id}</button>`).join('')}
                    </div>
                    <button class="btn btn-link link-secondary small mt-3 skip-btn">이번엔 건너뛰기</button>
                </div>
            `;
        } else if (role === 'detective') {
            html = `
                <div class="role-action text-center">
                    <h5 class="fw-bold mb-3">정체를 조사할 사람을 선택하세요</h5>
                    <div class="player-selection d-flex flex-wrap justify-content-center gap-2">
                        ${alivePlayers.map(p => `<button class="btn btn-outline-warning btn-sm target-btn rounded-pill px-3 text-dark" data-id="${p.id}">플레이어 ${p.id}</button>`).join('')}
                    </div>
                </div>
            `;
        }

        actionArea.innerHTML = html;

        actionArea.querySelectorAll('.target-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = parseInt(btn.dataset.id);
                if (role === 'mafia') this.nightActions.mafia = targetId;
                if (role === 'doctor') this.nightActions.doctor.save = targetId;
                if (role === 'detective') {
                    const target = this.players[targetId - 1];
                    const isMafia = target.role === 'mafia';
                    this.showCustomAlert(`플레이어 ${targetId}님은 <strong class="${isMafia ? 'text-danger' : 'text-primary'}">${isMafia ? '마피아' : '시민'}</strong> ${isMafia ? '입니다!' : '입니다.'}`, () => this.nextNightRole());
                    return;
                }
                this.nextNightRole();
            });
        });

        const skipBtn = actionArea.querySelector('.skip-btn');
        if (skipBtn) skipBtn.addEventListener('click', () => this.nextNightRole());
    }

    completeNightPhase() {
        const mafiaTargetId = this.nightActions.mafia;
        const doctorSaveId = this.nightActions.doctor.save;
        
        let eliminatedId = null;
        if (mafiaTargetId && mafiaTargetId !== doctorSaveId) {
            eliminatedId = mafiaTargetId;
            this.players[eliminatedId - 1].isAlive = false;
        }

        this.startDiscussionPhase(eliminatedId);
    }

    startDiscussionPhase(eliminatedId) {
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.role-instructions').style.display = 'none';
        document.querySelector('.discussion-phase').style.display = 'block';
        
        const res = document.getElementById('night-result');
        if (eliminatedId) {
            res.innerHTML = `지난밤, <span class="text-danger">플레이어 ${eliminatedId}</span>님이 탈락하셨습니다.`;
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
        const phase = document.querySelector('.voting-phase');
        phase.style.display = 'block';
        const grid = document.getElementById('voting-grid');
        grid.innerHTML = this.players.filter(p => p.isAlive).map(p => `
            <div class="vote-card card border p-3 rounded-4 text-center cursor-pointer mb-2" data-player-id="${p.id}">
                <div class="fw-bold">플레이어 ${p.id}</div>
                <div class="small text-muted">${mafiaTranslations.messages.clickToVote}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.vote-card').forEach(card => {
            card.onclick = () => {
                grid.querySelectorAll('.vote-card').forEach(c => c.classList.remove('bg-primary', 'text-white'));
                card.classList.add('bg-primary', 'text-white');
            };
        });

        document.getElementById('confirm-vote').onclick = () => {
            const sel = grid.querySelector('.vote-card.bg-primary');
            if (!sel) {
                alert(mafiaTranslations.messages.selectVote);
                return;
            }
            const targetId = parseInt(sel.dataset.playerId);
            const target = this.players[targetId - 1];
            target.isAlive = false;
            
            this.showCustomAlert(`투표 결과, 플레이어 ${targetId}님이 <span class="text-danger">처형</span>되었습니다.`, () => {
                document.querySelector('.voting-phase').style.display = 'none';
                if (!this.checkGameEnd()) this.startNightPhase();
            });
        };
    }

    checkGameEnd() {
        const alive = this.players.filter(p => p.isAlive);
        const mafia = alive.filter(p => p.role === 'mafia').length;
        const villagers = alive.length - mafia;

        if (mafia === 0) { 
            this.showCustomAlert(`<h2 class="text-primary fw-bold">${mafiaTranslations.messages.villagerTeam} 승리!</h2> 모든 마피아가 제거되었습니다.`, () => this.resetGame());
            return true; 
        }
        if (mafia >= villagers) { 
            this.showCustomAlert(`<h2 class="text-danger fw-bold">${mafiaTranslations.messages.mafiaTeam} 승리!</h2> 마피아가 도시를 장악했습니다.`, () => this.resetGame());
            return true; 
        }
        return false;
    }

    updatePlayerStatus() {
        const grid = document.getElementById('player-statuses');
        if (grid) grid.innerHTML = this.players.map(p => `
            <div class="player-status-card p-2 border rounded-3 text-center mb-1 ${p.isAlive ? '' : 'bg-light text-muted text-decoration-line-through'}">
                플레이어 ${p.id} (${p.isAlive ? mafiaTranslations.messages.alive : mafiaTranslations.messages.dead})
            </div>
        `).join('');
    }

    showCustomAlert(message, callback) {
        const alertBox = document.querySelector('.custom-alert');
        const alertMsg = alertBox.querySelector('.alert-message');
        const confirmBtn = alertBox.querySelector('.alert-confirm');
        
        alertMsg.innerHTML = message;
        alertBox.style.display = 'flex';
        
        const handler = () => {
            alertBox.style.display = 'none';
            confirmBtn.removeEventListener('click', handler);
            if (callback) callback();
        };
        confirmBtn.addEventListener('click', handler);
    }

    resetGame() {
        document.querySelector('.game-setup').style.display = 'block';
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.night-actions').style.display = 'none';
        document.querySelector('.role-cards').style.display = 'block';
        window.location.reload(); // Simplest way to reset all state
    }

    startCompleteNewGame() { window.location.reload(); }
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
    
    createCustomRole() { alert('커스텀 역할 기능은 현재 준비 중입니다.'); }
}

window.addEventListener('load', () => { window.game = new MafiaGame(); });
