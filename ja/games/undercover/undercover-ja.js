// Undercover Game Logic - Japanese Version
const undercoverTranslations = {
    roles: {
        Civilian: '市民',
        Undercover: 'アンダーカバー',
        'Mr. White': 'ミスターホワイト'
    },
    messages: {
        tooManyRoles: 'アンダーカバーとミスターホワイトが多ます！',
        enterWords: '市民ワードとアンダーカバーワードの両方を入力してください',
        noWords: '選択したカテゴリーに使えるワードがありません！',
        blankCard: '白紙 (ミスターホワイト)',
        eliminated: '脱落',
        selectPlayer: '脱落させるプレイヤーを選んでください！',
        civiliansWin: '市民の勝ち！ アンダーカバーを全員見つけました！',
        undercoverWin: 'アンダーカバーの勝ち！ 正体を隠し切りました！',
        mrWhiteWin: 'ミスターホワイトの勝ち！',
        player: 'プレイヤー',
        tapToSee: 'タップして自分の単語を見る'
    }
};

let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    wordsByCategory: {
        'Food & Drink': [['寿司', '刺身'], ['ラーメン', 'うどん'], ['おにぎり', 'いなり寿司'], ['抹茶ラテ', 'ほうじ茶ラテ'], ['たこ焼き', 'お好み焼き'], ['ビール', '発泡酒'], ['ワイン', 'シャンパン'], ['カレー', 'ハヤシライス'], ['そば', 'そうめん'], ['麦茶', '緑茶'], ['納豆', '豆腐'], ['梅干し', '漬物'], ['お餅', '団子'], ['焼き鳥', '唐揚げ'], ['コーラ', 'サイダー'], ['コーヒー', '紅茶'], ['リンゴ', 'ナシ'], ['桃', 'アプリコット'], ['ハンバーガー', 'サンドイッチ'], ['ピザ', 'パスタ'], ['チョコ', 'バニラ'], ['焼肉', 'ステーキ'], ['餃子', 'シュウマイ'], ['枝豆', 'そら豆'], ['ポテトチップス', 'せんべい']],
        Animals: [['ねこ', 'いぬ'], ['たぬき', 'きつね'], ['ペンギン', 'あざらし'], ['うさぎ', 'ハムスター'], ['イルカ', 'シャチ'], ['ライオン', 'トラ'], ['ゾウ', 'マンモス'], ['リス', 'シマリス'], ['パンダ', 'レッサーパンダ'], ['サメ', 'エイ'], ['カメ', 'トカゲ'], ['ワシ', 'タカ'], ['フクロウ', 'ミミズク'], ['猿', 'ゴリラ'], ['カエル', 'イモリ'], ['蝶', '蛾'], ['ミツバチ', 'スズメバチ'], ['クジラ', 'イルカ'], ['キリン', 'シマウマ'], ['カンガルー', 'コアラ']],
        Objects: [['スマホ', 'タブレット'], ['リュック', 'トートバッグ'], ['傘', 'レインコート'], ['イヤホン', 'ヘッドホン'], ['マグカップ', 'グラス'], ['鉛筆', 'シャーペン'], ['時計', 'スマートウォッチ'], ['椅子', 'ソファ'], ['本', '雑誌'], ['車', 'バス'], ['鍵', '南京錠'], ['靴', 'ブーツ'], ['帽子', 'キャップ'], ['カメラ', 'スマホ'], ['鏡', '窓'], ['スプーン', 'フォーク'], ['財布', 'ポーチ'], ['自転車', 'バイク'], ['パソコン', 'ノートPC'], ['冷蔵庫', '冷凍庫']],
        'Jobs & Roles': [['先生', '講師'], ['医者', '看護師'], ['シェフ', '店員'], ['俳優', '監督'], ['警察官', '警備員'], ['アイドル', '声優'], ['サラリーマン', '公務員'], ['作家', '編集者'], ['農家', '庭師'], ['アーティスト', 'デザイナー'], ['弁護士', '裁判官'], ['美容師', '理容師'], ['パイロット', '運転手'], ['歌手', 'ダンサー'], ['エンジニア', 'プログラマー']],
        Entertainment: [['映画', 'ドラマ'], ['アニメ', '漫画'], ['ライブ', 'フェス'], ['カラオケ', '合唱'], ['ゲーム', 'スポーツ'], ['TikTok', 'YouTube'], ['Twitter', 'Instagram'], ['ラジオ', 'ポッドキャスト'], ['小説', 'ライトノベル'], ['パズル', 'クイズ'], ['キャンプ', 'ハイキング'], ['遊園地', '水族館'], ['美術館', '博物館'], ['ピアノ', 'バイオリン'], ['テニス', 'バドミントン']],
        'Nature & Weather': [['雨', '雪'], ['海', '湖'], ['山', '丘'], ['夕日', '朝日'], ['雷', '稲妻'], ['台風', 'ハリケーン'], ['虹', 'オーロラ'], ['太陽', '月'], ['星', '惑星'], ['雲', '空'], ['森林', '公園'], ['砂漠', '砂浜'], ['火山', '地震'], ['春', '秋'], ['冬', '夏']],
        Funny: [['くしゃみ', 'しゃっくり'], ['パジャマ', '部屋着'], ['おなら', 'げっぷ'], ['変顔', 'ウインク'], ['ドッキリ', 'いたずら'], ['鼻毛', 'まゆ毛'], ['ハゲ', 'デブ'], ['鼻水', 'よだれ'], ['二度寝', '寝坊'], ['居眠り', '失神'], ['天然', '計算'], ['親父ギャグ', '寒いギャグ'], ['筋肉痛', '寝違え']],
        'Sports & Fitness': [['野球', 'ソフトボール'], ['サッカー', 'フットサル'], ['テニス', '卓球'], ['水泳', 'ダイビング'], ['ヨガ', 'ピラティス'], ['マラソン', '短距離走'], ['ジム', 'フィットネスクラブ'], ['腹筋', '背筋'], ['ダンベル', 'バーベル'], ['ゴルフ', 'ゲートボール']],
        'Technology & Digital': [['AI', 'ロボット'], ['仮想通貨', 'NFT'], ['5G', 'Wi-Fi'], ['クラウド', 'サーバー'], ['アプリ', 'WEBサイト'], ['キーボード', 'マウス'], ['液晶', '有機EL'], ['Bluetooth', '赤外線'], ['プログラミング', 'コーディング'], ['ハッカー', 'セキュリティ']],
        'Travel & Places': [['東京', '大阪'], ['北海道', '沖縄'], ['温泉', '銭湯'], ['空港', '駅'], ['ホテル', '旅館'], ['ハワイ', 'グアム'], ['キャンプ', 'グランピング'], ['新幹線', '特急'], ['神社', 'お寺'], ['公園', '庭園']],
        Relationships: [['友達', '親友'], ['恋人', '夫婦'], ['兄弟', '姉妹'], ['先輩', '後輩'], ['同僚', '上司'], ['初恋', '片思い'], ['結婚', '婚約'], ['親子', '親戚'], ['先生', '生徒'], ['幼馴染', '腐れ縁']],
        'Brands & Companies': [['トヨタ', 'ホンダ'], ['ソニー', 'パナソニック'], ['任天堂', 'セガ'], ['ユニクロ', 'しまむら'], ['セブンイレブン', 'ローソン'], ['マクドナルド', 'モスバーガー'], ['スタバ', 'ドトール'], ['Google', 'Microsoft'], ['Apple', 'Samsung'], ['ナイキ', 'アディダス']],
        'Historical Figures': [['織田信長', '豊臣秀吉'], ['徳川家康', '明智光秀'], ['坂本龍馬', '勝海舟'], ['聖徳太子', '小野妹子'], ['卑弥呼', '紫式部'], ['福沢諭吉', '夏目漱石'], ['ナポレオン', 'アレクサンダー'], ['エジソン', 'テスラ'], ['アインシュタイン', 'ニュートン'], ['ピカソ', 'ダ・ヴィンチ']]
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
    const remainingCivilians = gameState.players.filter((role, index) => !gameState.eliminatedPlayers.has(index) && role === 'Civilian').length;

    updatePlayerList();

    if (remainingPlayers === 2) {
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';
        if (remainingUndercover === 0) {
            alert(undercoverTranslations.messages.civiliansWin);
        } else {
            alert(undercoverTranslations.messages.undercoverWin);
        }
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
