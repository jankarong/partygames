// Magic 8 Ball Game Logic - Japanese Version
const answers = {
    classic: [
        "その通りです。", "かなり可能性が高いです。", "間違いありません。", "はい、きっとそうです。", "信じて進んで大丈夫です。",
        "私にはそう見えます。", "たぶんうまくいきます。", "流れは良さそうです。", "はい。", "サインはイエスです。",
        "今はまだ曖昧です。もう一度。", "あとでもう一度聞いてください。", "今はまだ言わないほうがよさそうです。", "現時点では読めません。", "気持ちを落ち着けてもう一度。",
        "期待しすぎないで。", "答えはノーです。", "情報源もノーと言っています。", "あまり良い流れではありません。", "かなり厳しそうです。"
    ],
    silly: [
        "ユニコーンが実在するくらい確かです！", "水晶玉はイエスと言っています！", "もちろん……ノー！", "星はたぶんと言っているかも？", "コーヒーブレイクのあとでもう一度。",
        "魔法のハムスターはイエスです。", "片足で3回跳べたらね。", "今日の8ボールは休暇中です。", "答えはたぶん布団の下にあります。", "火曜日ならイエスです。",
        "それはさすがに無理です。", "宇宙がもう一回聞けと言っています。", "かなり強めのノーです。", "はい、しかもトッピング付き！", "情報源が笑いすぎて答えられません。",
        "答えは風まかせです。", "ペットに聞くほうが早いかも。", "魔法はイエス、理性はノー。", "明日ブタが飛べばね。", "答えは42。いつだって42。"
    ],
    sarcastic: [
        "ええ、もちろん。私が王様ならね。", "水晶玉を見ますね……『どう見ても違う』だそうです。", "はいはい、ユニコーンも実在しますしね。", "それ、本気で聞いてます？", "イエスと言いたいけれど無理があります。",
        "どの世界線ならそうなるんでしょう。", "その質問、勇気ありすぎです。", "今のは聞かなかったことにします。", "うーん……やっぱりノー。", "宝くじに2回連続で当たるより低そうです。",
        "答える前に一回ため息をついていいですか。", "それ、答えが必要ですか？", "笑いすぎてちゃんと答えられません。", "残念ですが、ないです。", "ブタがファーストクラスで飛んだらね。",
        "存在しない全財産をノーに賭けます。", "おもしろいですね。次どうぞ。", "今それを本気で？", "コーヒーを飲んでからでも遅くないです。", "答えは明白すぎて逆に言いません。"
    ],
    romance: [
        "恋の気配があります。", "あなたの心はもう答えを知っています。", "キューピッドは案外外しません。", "星回りは恋向きです。", "恋はちゃんと道を見つけます。",
        "迷っているようで、ちゃんと進んでいます。", "今回は心に従ってよさそうです。", "恋は待つもの。少し焦らずに。", "心が求めるほうへ。", "ときめきはすぐ近くです。",
        "この恋は縁がありそうです。", "そろそろ一歩踏み出すタイミングかも。", "恋は旅のようなものです。", "恋愛運は明るめです。", "流れを信じてみてください。",
        "恋には少し時間が必要なときもあります。", "いい恋ほどゆっくり育ちます。", "心はきっと間違えません。", "恋は思わぬ瞬間に来ます。", "このつながり、かなり期待できます。"
    ],
    drinking: [
        "ひと口どうぞ！", "ショット1杯！", "乾杯して飲もう！", "あなたの番です！", "2口いきましょう！",
        "全員飲み！", "今回はスキップ。ラッキー！", "誰か一人を指名して飲ませて！", "今回は飲まなくてOK！", "乾杯、ひと口！",
        "たまには水も飲んでね。", "最後に手を上げた人が飲む！", "一発ギャグか、ひと口！", "やったことがある人は飲んで！", "隣の人とじゃんけん、負けたら飲む！",
        "青い服の人は飲む！", "飼っているペットの数だけひと口！", "ここ10分でスマホを見た人は飲む！", "一番背の高い人が飲む！", "今週一気見した人は飲む！"
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> 回答をカスタマイズする';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">回答のカスタマイズ</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        自分たちだけの回答を作れます！自動で保存されます。
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer" 
                            placeholder="回答を入力してください..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> 追加
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">カスタム回答はまだありません。</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2" id="customAnswerCount">0 個の回答</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger" id="clearCustomAnswers">すべて削除</button>
                            <button type="button" class="btn btn-success" id="saveCustomAnswers">決定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(modalContainer);
    customizeButton.addEventListener('click', () => modal.show());

    let customAnswers = JSON.parse(localStorage.getItem('customAnswers_ja')) || [];
    answers.custom = customAnswers;

    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');
        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} 個の回答`;

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
                    <div class="answer-content"><span class="answer-text">${answer}</span></div>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary edit-answer" data-index="${index}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-outline-danger delete-answer" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                list.appendChild(li);
            });
        }
        answers.custom = customAnswers;
        localStorage.setItem('customAnswers_ja', JSON.stringify(customAnswers));

        document.querySelectorAll('.delete-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                customAnswers.splice(index, 1);
                updateCustomAnswersList();
            });
        });

        document.querySelectorAll('.edit-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const answerText = this.closest('li').querySelector('.answer-text');
                const originalText = answerText.textContent;
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
                    } else { input.replaceWith(answerText); }
                };
                input.addEventListener('blur', saveEdit);
                input.addEventListener('keypress', e => { if (e.key === 'Enter') saveEdit(); });
            });
        });
    }

    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();
        if (answer && !customAnswers.includes(answer)) {
            customAnswers.unshift(answer);
            updateCustomAnswersList();
            input.value = '';
        }
    }

    const addButton = document.getElementById('addCustomAnswer');
    const input = document.getElementById('customAnswer');
    const clearButton = document.getElementById('clearCustomAnswers');

    addButton.addEventListener('click', addCustomAnswer);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') addCustomAnswer(); });
    clearButton.addEventListener('click', () => {
        if (confirm('すべてのカスタム回答を削除してもよろしいですか？')) {
            customAnswers = [];
            updateCustomAnswersList();
        }
    });

    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
        } else { alert('少なくとも1つは回答を追加してください。'); }
    });

    updateCustomAnswersList();

    const handleShake = () => {
        if (magicBall.classList.contains('shake')) return;
        const question = questionInput.value.trim();
        magicBall.classList.add('shake');
        const answerList = answers[versionSelect.value];
        const answer = answerList[Math.floor(Math.random() * answerList.length)] || '...';

        setTimeout(() => { answerElement.textContent = answer; }, 500);
        setTimeout(() => {
            magicBall.classList.remove('shake');
            if (question) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<div class="d-flex justify-content-between"><span>${question}</span><span class="badge bg-primary">${answer}</span></div>`;
                historyList.insertBefore(li, historyList.firstChild);
                if (historyList.children.length > 10) historyList.removeChild(historyList.lastChild);
            }
        }, 1000);
    };

    shakeButton.addEventListener('click', handleShake);
    magicBall.addEventListener('click', handleShake);
    questionInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleShake(); });
});
