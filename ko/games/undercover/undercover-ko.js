// Undercover Game Logic - Korean Version
const undercoverTranslations = {
    roles: {
        Civilian: '시민',
        Undercover: '언더커버',
        'Mr. White': '미스터 화이트'
    },
    messages: {
        tooManyRoles: '역할 인원이 너무 많습니다. 다시 설정해주세요!',
        enterWords: '시민 단어와 언더커버 단어를 모두 입력해주세요.',
        noWords: '선택한 카테고리에 사용할 수 있는 단어가 없습니다.',
        blankCard: '백지 (미스터 화이트)',
        eliminated: '탈락',
        selectPlayer: '탈락시킬 플레이어를 선택하세요!',
        civiliansWin: '시민 승리! 언더커버를 모두 찾아냈습니다.',
        undercoverWin: '언더커버 승리! 정체를 숨기는 데 성공했습니다.',
        mrWhiteWin: '미스터 화이트 승리!',
        player: '플레이어',
        tapToSee: '탭하여 자신의 단어 확인'
    }
};

let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    wordsByCategory: {
        'Food & Drink': [['피자', '치킨'], ['라면', '칼국수'], ['삼겹살', '돼지갈비'], ['아메리카노', '카페라떼'], ['콜라', '사이다'], ['자장면', '짬뽕'], ['소주', '맥주'], ['김치찌개', '된장찌개'], ['떡볶이', '순대'], ['우유', '두유'], ['식혜', '수정과'], ['붕어빵', '호떡'], ['족발', '보쌈'], ['물냉면', '비빔냉면'], ['햄버거', '샌드위치'], ['초밥', '회'], ['스테이크', '돈가스'], ['토마토 스파게티', '크림 스파게티'], ['딸기', '포도'], ['복숭아', '자두']],
        Animals: [['강아지', '고양이'], ['호랑이', '사자'], ['토끼', '다람쥐'], ['펭귄', '북극곰'], ['독수리', '매'], ['늑대', '여우'], ['고래', '상어'], ['소', '말'], ['기린', '얼룩말'], ['코끼리', '하마'], ['판다', '럭키판다'], ['악어', '뱀'], ['참새', '비둘기'], ['금붕어', '거북이'], ['낙타', '타조']],
        Objects: [['연필', '샤프'], ['노트북', '태블릿'], ['스마트폰', '컴퓨터'], ['우산', '양산'], ['안경', '렌즈'], ['시계', '팔찌'], ['의자', '소파'], ['자전거', '오토바이'], ['거울', '창문'], ['가용 배낭', '에코백'], ['텀블러', '머그컵'], ['이어폰', '헤드폰'], ['지갑', '카드지갑'], ['신발', '운동화'], ['모자', '선글라스']],
        'Jobs & Roles': [['선생님', '교수님'], ['의사', '간호사'], ['경찰', '소방관'], ['배우', '가수'], ['요리사', '제과사'], ['판사', '변호사'], ['군인', '경찰'], ['작가', '기자'], ['비서', '매니저'], ['농부', '어부'], ['디자이너', '예술가'], ['개발자', '프로그래머'], ['운동선수', '감독'], ['통계학자', '회계사']],
        Entertainment: [['영화', '드라마'], ['유튜브', '넷플릭스'], ['축구', '야구'], ['게임', '애니메이션'], ['노래방', '클럽'], ['틱톡', '릴스'], ['웹툰', '소설'], ['콘서트', '뮤지컬'], ['테니스', '배드민턴'], ['스키', '보드'], ['수영', '다이빙'], ['등산', '캠핑'], ['미술관', '박물관'], ['놀이공원', '동물원']],
        'Nature & Weather': [['바다', '강'], ['산', '공원'], ['눈', '비'], ['태양', '달'], ['여름', '겨울'], ['봄', '가을'], ['천둥', '번개'], ['무지개', '노을'], ['태풍', '지진'], ['숲', '사막'], ['폭포', '계곡'], ['구름', '하늘'], ['안개', '미세먼지'], ['단풍', '벚꽃']],
        Funny: [['재채기', '딸국질'], ['잠옷', '트레이닝복'], ['방귀', '트림'], ['윙크', '눈싸움'], ['몰카', '장난'], ['콧물', '침'], ['대머리', '곱슬머리'], ['늦잠', '낮잠'], ['잠꼬대', '코골이'], ['다크서클', '피부트러블']],
        'Sports & Fitness': [['축구', '농구'], ['야구', '소프트볼'], ['탁구', '배드민턴'], ['요가', '필라테스'], ['조깅', '전력질주'], ['헬스장', '크로스핏'], ['스쿼트', '런지'], ['아령', '역기'], ['골프', '당구'], ['볼링', '컬링']],
        'Technology & Digital': [['AI', '로봇'], ['비트코인', '주식'], ['5G', '와이파이'], ['인스타그램', '페이스북'], ['카카오톡', '라인'], ['키보드', '마우스'], ['어플', '웹사이트'], ['해킹', '보안'], ['블록체인', '클라우드'], ['프로그래밍', '코딩']],
        'Travel & Places': [['서울', '부산'], ['제주도', '강원도'], ['온천', '사우나'], ['공항', '역'], ['호텔', '모텔'], ['일본', '중국'], ['미국', '유럽'], ['파리', '런던'], ['뉴욕', '도쿄'], ['방콕', '다낭']],
        Relationships: [['친구', '절친'], ['연인', '부부'], ['형제', '자매'], ['선배', '후배'], ['동료', '상사'], ['첫사랑', '짝사랑'], ['결혼', '약혼'], ['부모님', '친척'], ['선생님', '학생'], ['소꿉친구', '비즈니스 파트너']],
        'Brands & Companies': [['삼성', 'LG'], ['현대', '기아'], ['네이버', '카카오'], ['나이키', '아디다스'], ['스타벅스', '이디야'], ['맥도날드', '롯데리아'], ['애플', '구글'], ['배달의민족', '쿠팡이츠'], ['당근마켓', '번개장터'], ['다이소', '올리브영']],
        'Historical Figures': [['세종대왕', '이순신'], ['김구', '안중근'], ['유관순', '신사임당'], ['광개토대왕', '을지문덕'], ['단군', '주몽'], ['공자', '맹자'], ['나폴레옹', '징기스칸'], ['에디슨', '테슬라'], ['아인슈타인', '뉴턴'], ['다빈치', '피카소']]
    }
};

async function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const undercoverCount = parseInt(document.getElementById('undercoverCount').value);
    const whiteCount = parseInt(document.getElementById('whiteCount').value);
    const useCustomWords = document.getElementById('useCustomWords').checked;
    const selectedCategory = document.getElementById('categorySelect').value;

    if (undercoverCount + whiteCount >= playerCount) {
        alert(undercoverTranslations.messages.tooManyRoles);
        return;
    }

    gameState.players = Array(playerCount).fill('Civilian');

    if (useCustomWords) {
        const civilianWord = document.getElementById('customCivilianWord').value.trim();
        const undercoverWord = document.getElementById('customUndercoverWord').value.trim();
        if (!civilianWord || !undercoverWord) {
            alert(undercoverTranslations.messages.enterWords);
            return;
        }
        gameState.civilianWord = civilianWord;
        gameState.undercoverWord = undercoverWord;
    } else {
        let availableWordPairs = [];
        if (selectedCategory === 'all') {
            Object.values(gameState.wordsByCategory).forEach(categoryPairs => {
                availableWordPairs = availableWordPairs.concat(categoryPairs);
            });
        } else {
            availableWordPairs = gameState.wordsByCategory[selectedCategory] || [];
        }

        if (availableWordPairs.length === 0) {
            alert(undercoverTranslations.messages.noWords);
            return;
        }

        const wordPair = availableWordPairs[Math.floor(Math.random() * availableWordPairs.length)];
        gameState.civilianWord = wordPair[0];
        gameState.undercoverWord = wordPair[1];
    }

    for (let i = 0; i < undercoverCount; i++) {
        let index;
        do { index = Math.floor(Math.random() * playerCount); } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Undercover';
    }

    for (let i = 0; i < whiteCount; i++) {
        let index;
        do { index = Math.floor(Math.random() * playerCount); } while (gameState.players[index] !== 'Civilian');
        gameState.players[index] = 'Mr. White';
    }

    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('word-section').classList.remove('hidden');
    showWord();
}

function showWord() {
    const playerNum = gameState.currentPlayer + 1;
    document.getElementById('currentPlayer').textContent = playerNum;

    let word;
    const playerRole = gameState.players[gameState.currentPlayer];
    if (playerRole === 'Civilian') {
        word = gameState.civilianWord;
    } else if (playerRole === 'Undercover') {
        word = gameState.undercoverWord;
    } else {
        word = undercoverTranslations.messages.blankCard;
    }

    document.getElementById('wordDisplay').textContent = word;
    const flipCard = document.querySelector('.flip-card');
    flipCard.classList.remove('flipped');

    const newFlipCard = flipCard.cloneNode(true);
    flipCard.parentNode.replaceChild(newFlipCard, flipCard);
    newFlipCard.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });
}

function nextPlayer() {
    gameState.currentPlayer++;
    if (gameState.currentPlayer >= gameState.players.length) {
        startVoting();
        return;
    }
    showWord();
}

function startVoting() {
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    updatePlayerList();
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    gameState.players.forEach((role, index) => {
        const playerNum = index + 1;
        const isEliminated = gameState.eliminatedPlayers.has(index);
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${isEliminated ? 'eliminated' : ''} mb-2 p-2 rounded`;
        playerDiv.style.background = isEliminated ? '#333' : '#444';

        if (!isEliminated) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'playerVote';
            radio.value = index;
            radio.id = `player${playerNum}`;
            radio.className = 'me-2';
            playerDiv.appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = `player${playerNum}`;
            label.textContent = `${undercoverTranslations.messages.player} ${playerNum}`;
            label.className = 'text-light mb-0 cursor-pointer';
            playerDiv.appendChild(label);
        } else {
            playerDiv.textContent = `${undercoverTranslations.messages.player} ${playerNum} (${undercoverTranslations.messages.eliminated})`;
            playerDiv.className += ' text-muted';
        }
        playerList.appendChild(playerDiv);
    });
}

function eliminatePlayer() {
    const selectedPlayer = document.querySelector('input[name="playerVote"]:checked');
    if (!selectedPlayer) {
        alert(undercoverTranslations.messages.selectPlayer);
        return;
    }

    const eliminatedIndex = parseInt(selectedPlayer.value);
    gameState.eliminatedPlayers.add(eliminatedIndex);

    const remainingPlayers = gameState.players.filter((_, index) => !gameState.eliminatedPlayers.has(index)).length;
    const remainingUndercover = gameState.players.filter((role, index) => !gameState.eliminatedPlayers.has(index) && role === 'Undercover').length;
    
    updatePlayerList();

    if (remainingPlayers === 2) {
        if (remainingUndercover === 0) {
            alert(undercoverTranslations.messages.civiliansWin);
        } else {
            alert(undercoverTranslations.messages.undercoverWin);
        }
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';
    } else if (remainingUndercover === 0) {
        alert(undercoverTranslations.messages.civiliansWin);
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';
    }
}

function resetGame() {
    gameState.currentPlayer = 0;
    gameState.eliminatedPlayers = new Set();
    document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'inline-block';
    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('setup-section').classList.remove('hidden');
}

function showPremiumModal() {
    document.getElementById('premium-modal').classList.remove('hidden');
}

function closePremiumModal() {
    document.getElementById('premium-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const useCustomWordsCheckbox = document.getElementById('useCustomWords');
    const customWordsSection = document.getElementById('customWordsSection');
    if (useCustomWordsCheckbox) {
        useCustomWordsCheckbox.addEventListener('change', function () {
            customWordsSection.style.display = this.checked ? 'block' : 'none';
        });
    }
});
