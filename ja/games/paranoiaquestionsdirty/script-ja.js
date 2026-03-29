const dirtyParanoiaQuestions = [
  { mode: "ウォームアップ", text: "この中で、無意識に一番色っぽい雰囲気を出していそうなのは誰？" },
  { mode: "ウォームアップ", text: "深夜に一番先に攻めたメッセージを送りそうなのは誰？" },
  { mode: "ウォームアップ", text: "普段は落ち着いて見えるのに実は一番大胆そうなのは誰？" },
  { mode: "ウォームアップ", text: "このグループで一番危ない沼っぽい魅力があるのは誰？" },
  { mode: "ウォームアップ", text: "ちょっと踏み込んだ質問で一番赤くなりそうなのは誰？" },
  { mode: "スパイシー", text: "人前では無邪気なのに二人きりだとギャップが強そうなのは誰？" },
  { mode: "スパイシー", text: "夜0時を過ぎたら一番大胆になりそうなのは誰？" },
  { mode: "スパイシー", text: "ロールプレイの提案に一番早く乗りそうなのは誰？" },
  { mode: "スパイシー", text: "普通のデートを一番特別な夜に変えそうなのは誰？" },
  { mode: "スパイシー", text: "視線だけで空気を変えられそうなのは誰？" },
  { mode: "スパイシー", text: "からかい上手で、つい相手をドキッとさせそうなのは誰？" },
  { mode: "スパイシー", text: "いちばん忘れられない恋の記憶を隠し持っていそうなのは誰？" },
  { mode: "スパイシー", text: "静かそうに見えて、実はいちばん勇気がありそうなのは誰？" },
  { mode: "スパイシー", text: "今夜の流れを一番上手に作れそうなのは誰？" },
  { mode: "スパイシー", text: "一番センスよく大人の雰囲気を出せそうなのは誰？" },
  { mode: "カオス", text: "グループの暗黙ルールを最初に破りそうなのは誰？" },
  { mode: "カオス", text: "同時に二人から好かれても不思議じゃないのは誰？" },
  { mode: "カオス", text: "一週間音信不通でも、戻った瞬間またモテそうなのは誰？" },
  { mode: "カオス", text: "うっかり大事な秘密を漏らしそうなのは誰？" },
  { mode: "カオス", text: "『別にどっちでも』と言いながら実は一番気にしていそうなのは誰？" },
  { mode: "カオス", text: "夜が更けるほど一番抗えない魅力を出しそうなのは誰？" },
  { mode: "カオス", text: "このゲームを現実の事件にしそうなのは誰？" },
  { mode: "カオス", text: "音声メッセージ一通で場をかき乱しそうなのは誰？" },
  { mode: "カオス", text: "今日いちばん指をさされそうなのは誰？" },
  { mode: "カオス", text: "『あと一回だけ』が止まらなそうなのは誰？" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `質問 ${currentIndex + 1} / ${dirtyParanoiaQuestions.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
}
function nextQuestion() { currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length; renderQuestion(); }
function previousQuestion() { currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length; renderQuestion(); }
function randomQuestion() { currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length); renderQuestion(); }
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
