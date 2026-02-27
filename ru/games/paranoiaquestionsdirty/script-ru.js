const dirtyParanoiaQuestions = [
  { mode: "Разогрев", text: "Кто в этой компании флиртует даже когда делает вид, что нет?" },
  { mode: "Разогрев", text: "Кто первым напишет рискованное сообщение ночью?" },
  { mode: "Разогрев", text: "Кто выглядит спокойным, но на деле самый смелый?" },
  { mode: "Разогрев", text: "Кто здесь самый опасный краш?" },
  { mode: "Разогрев", text: "Кто быстрее всех смущается от личных вопросов?" },
  { mode: "Остро", text: "Кто в обществе скромный, а в приватном общении самый дерзкий?" },
  { mode: "Остро", text: "Кто отправит самое смелое сообщение после полуночи?" },
  { mode: "Остро", text: "Кто первым согласится на ролевой сценарий?" },
  { mode: "Остро", text: "Кто превратит обычное свидание в безумную ночь?" },
  { mode: "Остро", text: "У кого самая сильная энергетика в близком общении?" },
  { mode: "Остро", text: "Кто поднимет градус вопросов ради эффекта?" },
  { mode: "Остро", text: "У кого, скорее всего, самый пикантный секрет?" },
  { mode: "Остро", text: "Кто может выбить из равновесия одним взглядом?" },
  { mode: "Остро", text: "Кто кажется тихим, но на самом деле самый смелый?" },
  { mode: "Остро", text: "Кто устроит самый запоминающийся вечер?" },
  { mode: "Хаос", text: "Кто первым нарушит правила компании?" },
  { mode: "Хаос", text: "Кто может одновременно нравиться двум людям?" },
  { mode: "Хаос", text: "Кто исчезнет на неделю и вернется максимально флиртующим?" },
  { mode: "Хаос", text: "Кто скорее всего случайно проболтается?" },
  { mode: "Хаос", text: "Кто говорит « мне все равно », но переживает сильнее всех?" },
  { mode: "Хаос", text: "Кому сложнее всего отказать поздно ночью?" },
  { mode: "Хаос", text: "Кто превратит эту игру в реальную историю?" },
  { mode: "Хаос", text: "Кто устроит бурю одним голосовым?" },
  { mode: "Хаос", text: "Кто станет главным соблазном вечера?" },
  { mode: "Хаос", text: "Кто скажет « по одной » и устроит хаос?" },
  { mode: "Разогрев", text: "У кого лучший покерфейс в неловких моментах?" },
  { mode: "Разогрев", text: "Кто быстрее всех поддается настроению толпы?" },
  { mode: "Разогрев", text: "Кто случайно спалит своего краша?" },
  { mode: "Разогрев", text: "Кто превращает шутку в реальное напряжение?" },
  { mode: "Разогрев", text: "Кто лучше всех держит ритм игры?" },
  { mode: "Остро", text: "У кого самая неожиданная скрытая сторона?" },
  { mode: "Остро", text: "Кто первым сделает решающий шаг?" },
  { mode: "Остро", text: "Кто ревнует, но отлично это скрывает?" },
  { mode: "Остро", text: "Кто быстрее всех нарушит свои же правила?" },
  { mode: "Остро", text: "У кого самый сильный взгляд в этой комнате?" },
  { mode: "Остро", text: "Кто влюбится не в того человека?" },
  { mode: "Остро", text: "Кто первым начнет флирт на вечеринке?" },
  { mode: "Остро", text: "Кто дольше всех хранит пикантные секреты?" },
  { mode: "Остро", text: "Кто задаст самый дерзкий вопрос?" },
  { mode: "Остро", text: "Кто флиртует просто ради проверки реакции?" },
  { mode: "Хаос", text: "Кто случайно создаст любовный треугольник?" },
  { mode: "Хаос", text: "Кто пропадет и вернется с самым громким инсайдом?" },
  { mode: "Хаос", text: "Кто напишет бывшему в 2 ночи?" },
  { mode: "Хаос", text: "Кто может случайно выложить слишком личное?" },
  { mode: "Хаос", text: "Кто станет неожиданным фаворитом всей компании?" },
  { mode: "Хаос", text: "Кто превратит игру в вечер признаний?" },
  { mode: "Хаос", text: "Кто разделит компанию одной фразой?" },
  { mode: "Хаос", text: "Кто уедет домой с лучшими историями?" },
  { mode: "Хаос", text: "Кто раздует маленький слух до большого скандала?" },
  { mode: "Хаос", text: "Кого будут выбирать чаще всего?" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Вопрос ${currentIndex + 1} из ${dirtyParanoiaQuestions.length}`;
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
