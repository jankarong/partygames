const questions = [
    "...飲み会でテーブルの上に乗って踊りそうなのは？",
    "...初デートでキスしそうなのは？",
    "...カラオケで一番本気を出しそうなのは？",
    "...深夜にこっそりお菓子を食べそうなのは？",
    "...酔った勢いで元恋人に連絡しそうなのは？",
    "...旅行で道に迷ってもなんとかなると思っていそうなのは？",
    "...映画館で寝落ちしそうなのは？",
    "...SNSに自撮りをたくさん載せそうなのは？",
    "...恥ずかしい失敗談を自分から話しそうなのは？",
    "...場を盛り上げるために無茶ぶりに乗りそうなのは？",
    "...結婚式でブーケを本気で取りに行きそうなのは？",
    "...危ないノリのチャレンジでも先にやりそうなのは？",
    "...服の組み合わせを攻めすぎそうなのは？",
    "...朝までカラオケを続けそうなのは？",
    "...映画やドラマで一番泣きそうなのは？",
    "...知らない人にも自然に話しかけそうなのは？",
    "...旅行でパスポートを最後まで探していそうなのは？",
    "...二次会三次会まで残りそうなのは？",
    "...勢いで秘密を口にしてしまいそうなのは？",
    "...踊ったあとに自分で笑っていそうなのは？",
    "...人前でつまずいても平然としていそうなのは？",
    "...酔うと急に人生論を語りだしそうなのは？",
    "...自分の武勇伝を盛って話しそうなのは？",
    "...変わった料理でも最初に試しそうなのは？",
    "...旅行先でいらないお土産を買いそうなのは？",
    "...遊んでいると時間を忘れそうなのは？",
    "...うっかり本音を言ってしまいそうなのは？",
    "...有名人のモノマネをしそうなのは？",
    "...服を裏表逆のまま外に出そうなのは？",
    "...酔ったら突然歌い出しそうなのは？",
    "...変な夢を真剣に語りそうなのは？",
    "...危なっかしいゲームでも参加しそうなのは？",
    "...ホテルに戻る道を見失いそうなのは？",
    "...朝日を見るまで遊びそうなのは？",
    "...一番気まずい秘密を持っていそうなのは？",
    "...失敗しても笑いに変えそうなのは？",
    "...何もなかった顔でごまかしそうなのは？",
    "...酔うと急におもしろ担当になりそうなのは？",
    "...新しい服を一番早く見せたがりそうなのは？",
    "...珍味メニューにワクワクしそうなのは？",
    "...恋バナになると顔に出そうなのは？",
    "...ノリでリスキーな約束をしそうなのは？",
    "...最後まで元気が切れなさそうなのは？",
    "...メッセージを誤爆しそうなのは？",
    "...一番おもしろい写真を撮られそうなのは？",
    "...会った直後に名前を忘れそうなのは？",
    "...昔の投稿にうっかりいいねしそうなのは？",
    "...激辛を平気な顔で食べそうなのは？",
    "...友だちと服がかぶりそうなのは？",
    "...パーティーで一番クセの強いダンスをしそうなのは？"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'スタート';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = '次の質問';

    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);
    document.getElementById('questionText').textContent = currentQuestion;
}
