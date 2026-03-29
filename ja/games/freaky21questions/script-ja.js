const questions = [
    { mode: "ウォームアップ", text: "どんな視線に一番ドキッとする？" },
    { mode: "ウォームアップ", text: "理想のデートの空気感ってどんな感じ？" },
    { mode: "ウォームアップ", text: "言われると照れる褒め言葉は？" },
    { mode: "ウォームアップ", text: "フラートっぽい雰囲気に合う曲は？" },
    { mode: "ウォームアップ", text: "どんなさりげない触れ方が好き？" },
    { mode: "スパイシー", text: "今夜、相手に最初にしてほしいことは？" },
    { mode: "スパイシー", text: "小さな仕草で一番ドキッとするのは？" },
    { mode: "スパイシー", text: "じっくり空気を作る派？ それとも直球派？" },
    { mode: "スパイシー", text: "キスしたくなるシチュエーションは？" },
    { mode: "スパイシー", text: "境界線として大事にしたいことは？" },
    { mode: "Freaky", text: "人にはあまり言わない密かな願望は？" },
    { mode: "Freaky", text: "今夜あなたが主導なら最初に何をする？" },
    { mode: "Freaky", text: "どんなささやき方に弱い？" },
    { mode: "Freaky", text: "どんなタッチで一気に意識しちゃう？" },
    { mode: "Freaky", text: "試してみたい大人っぽい演出は？" },
    { mode: "Freaky", text: "ゆっくり焦らされるのと勢い重視、どっち派？" },
    { mode: "Freaky", text: "相手からの意外な一手でうれしいのは？" },
    { mode: "Freaky", text: "どんな服装だと一気に惹かれる？" },
    { mode: "Freaky", text: "二人の時間で、もっと増やしたい要素は？" },
    { mode: "Freaky", text: "今この場で言える一番大胆なお願いは？" },
    { mode: "Freaky", text: "このラウンドのあと理想の流れは？" }
];

let currentIndex = 0;
const numberEl = document.getElementById('questionNumber');
const textEl = document.getElementById('questionText');
const modeEl = document.getElementById('questionMode');

function renderQuestion() {
    const question = questions[currentIndex];
    numberEl.textContent = `質問 ${currentIndex + 1} / 21`;
    textEl.textContent = question.text;
    modeEl.textContent = question.mode;
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
    document.getElementById('nextBtn').onclick = () => {
        currentIndex = (currentIndex + 1) % questions.length;
        renderQuestion();
    };
    document.getElementById('prevBtn').onclick = () => {
        currentIndex = (currentIndex - 1 + questions.length) % questions.length;
        renderQuestion();
    };
    document.getElementById('randomBtn').onclick = () => {
        currentIndex = Math.floor(Math.random() * questions.length);
        renderQuestion();
    };
});
