const statements = [
    "今まで初デートでキスしたことがない",
    "友だちの恋人をちょっといいなと思ったことがない",
    "送り先を間違えてメッセージしたことがない",
    "予定を断るために体調不良のふりをしたことがない",
    "年齢をごまかしたことがない",
    "秘密の恋愛をしたことがない",
    "テストでこっそり答えを見たことがない",
    "うそがバレたことがない",
    "先生や上司にときめいたことがない",
    "夜ふかしして朝を迎えたことがない",
    "授業中や会議中に寝落ちしたことがない",
    "お風呂で熱唱したことがない",
    "人前で盛大につまずいたことがない",
    "深夜にコンビニへ部屋着のまま行ったことがない",
    "推しに本気で恋したことがない",
    "スマホをのぞき見したことがない",
    "SNSでリア充っぽく見せたことがない",
    "仕事やバイトの話を盛ったことがない",
    "隣の席の人にひそかにときめいたことがない",
    "友だちの友だちを好きになったことがない",
    "オンライン会議でミュートし忘れたことがない",
    "ネットで衝動買いしたことがない",
    "洗濯でお気に入りの服をダメにしたことがない",
    "電車やバスで乗り過ごしたことがない",
    "大事な日付を勘違いしたことがない",
    "人の名前を呼び間違えたことがない",
    "既読をつけたまま返信を忘れたことがない",
    "酔って余計なことを話したことがない",
    "カラオケで本気を出しすぎたことがない",
    "終電ギリギリで走ったことがない",
    "家族に見られたくない検索履歴がある",
    "メッセージを何度も書き直して送ったことがある",
    "好きな人のSNSをさかのぼって見たことがある",
    "コンビニでお箸をもらい忘れたことがある",
    "旅行でパスポートやチケットを探し回ったことがある",
    "自撮りを20枚以上撮り直したことがある",
    "寝坊して全力で言い訳したことがある",
    "恋愛相談のつもりが自分語りになったことがある",
    "人前でお腹が鳴ったことがある",
    "推し活に思った以上のお金を使ったことがある",
    "好き避けしたことがある",
    "メッセージの誤爆で青ざめたことがある",
    "食べ物を一口だけと言って多めにもらったことがある",
    "雨の日に傘を忘れたことがある",
    "会話を聞き取れず笑ってごまかしたことがある",
    "写真を撮る前に机の上だけ片付けたことがある",
    "バッテリー1%で外出したことがある",
    "友だちに内緒で同じお店をチェックしていたことがある",
    "恋バナで顔に出たことがある",
    "誰にも言っていない黒歴史がある"
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return '全部出し切りました。リセットしてもう一度遊んでください。';
        }

        const availableStatements = statements.filter(statement => !usedStatements.includes(statement));
        const randomIndex = Math.floor(Math.random() * availableStatements.length);
        const selectedStatement = availableStatements[randomIndex];
        usedStatements.push(selectedStatement);
        return selectedStatement;
    }

    nextButton.addEventListener('click', () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === '開始') {
            nextButton.textContent = '次へ';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });
});
