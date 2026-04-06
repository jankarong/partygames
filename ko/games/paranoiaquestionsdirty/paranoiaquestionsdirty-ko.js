// Dirty Paranoia Questions - Korean Version
const dirtyParanoiaQuestions = [
  { mode: "웜업", text: "이 중에서 가장 먼저 취해서 뻗을 것 같은 사람은?" },
  { mode: "웜업", text: "가장 문란한(?) 비밀을 숨기고 있을 것 같은 사람은?" },
  { mode: "웜업", text: "처음 본 사람과 바로 사귈 수 있을 것 같은 사람은?" },
  { mode: "웜업", text: "연상의 이성에게 가장 인기가 많을 것 같은 사람은?" },
  { mode: "웜업", text: "헤어진 연인의 SNS를 가장 자주 염탐할 것 같은 사람은?" },
  { mode: "스파이시", text: "술 마시고 전 애인에게 전화할 것 같은 사람은?" },
  { mode: "스파이시", text: "가장 특이한 잠버릇을 가지고 있을 것 같은 사람은?" },
  { mode: "스파이시", text: "이성 앞에서 가장 가식적(?)으로 행동할 것 같은 사람은?" },
  { mode: "스파이시", text: "가장 화려한 연애 경력을 가지고 있을 것 같은 사람은?" },
  { mode: "스파이시", text: "소개팅에서 분위기 파악 못 할 것 같은 사람은?" },
  { mode: "스파이시", text: "가장 야한 농담을 잘 할 것 같은 사람은?" },
  { mode: "스파이시", text: "첫눈에 반해서 바로 고백할 것 같은 사람은?" },
  { mode: "스파이시", text: "연인의 휴대폰을 몰래 볼 것 같은 사람은?" },
  { mode: "스파이시", text: "남사친/여사친과 선 넘을 가능성이 가장 높은 사람은?" },
  { mode: "스파이시", text: "가장 반전 매력(낮져밤이 등)을 가졌을 것 같은 사람은?" },
  { mode: "카오스", text: "한 달 안에 결혼 발표를 해도 이상하지 않을 사람은?" },
  { mode: "카오스", text: "가장 은밀한 취미를 숨기고 있을 것 같은 사람은?" },
  { mode: "카오스", text: "술자리에서 끝까지 살아남을 것 같은 사람은?" },
  { mode: "카오스", text: "이 중에서 가장 금사빠(금방 사랑에 빠지는 사람)는?" },
  { mode: "카오스", text: "가장 로맨틱한 서프라이즈를 잘할 것 같은 사람은?" },
  { mode: "카오스", text: "바람을 피울 확률이 가장 낮을 것 같은 사람은?" },
  { mode: "카오스", text: "이별 후 가장 빨리 다음 연애를 시작할 사람은?" },
  { mode: "카오스", text: "가장 보수적인 연애관을 가졌을 것 같은 사람은?" },
  { mode: "카오스", text: "클럽에서 가장 독보적으로 놀 것 같은 사람은?" },
  { mode: "카오스", text: "이 중에서 가장 비밀이 많을 것 같은 사람은?" }
];

let currentIndex = 0;

function renderQuestion() {
  const numberEl = document.getElementById("questionNumber");
  const textEl = document.getElementById("questionText");
  const modeEl = document.getElementById("questionMode");

  if (numberEl && textEl && modeEl) {
    const q = dirtyParanoiaQuestions[currentIndex];
    numberEl.textContent = `질문 ${currentIndex + 1} / ${dirtyParanoiaQuestions.length}`;
    textEl.textContent = q.text;
    modeEl.textContent = q.mode;

    // Fade effect logic (simple class toggle)
    textEl.classList.remove('fade-in');
    void textEl.offsetWidth; // Force reflow
    textEl.classList.add('fade-in');
  }
}

function nextQuestion() {
  currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length;
  renderQuestion();
}

function previousQuestion() {
  currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length;
  renderQuestion();
}

function randomQuestion() {
  const lastIndex = currentIndex;
  do {
    currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length);
  } while (currentIndex === lastIndex && dirtyParanoiaQuestions.length > 1);
  renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const randomBtn = document.getElementById("randomBtn");

  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
  if (prevBtn) prevBtn.addEventListener("click", previousQuestion);
  if (randomBtn) randomBtn.addEventListener("click", randomQuestion);
});
