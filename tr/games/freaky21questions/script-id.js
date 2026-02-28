const questions = [
  { mode: "Isınma", text: "Sende anında çekim yaratan ama kolay kolay söylemediğin şey nedir?" },
  { mode: "Isınma", text: "Flörtünle ideal gece atmosferin nasıl olur?" },
  { mode: "Isınma", text: "Hangi iltifat seni hemen kızartır?" },
  { mode: "Isınma", text: "Ortamı ısıtmak için hangi şarkıyı açarsın?" },
  { mode: "Isınma", text: "En sevdiğin fiziksel yakınlık türü nedir?" },
  { mode: "Baharatlı", text: "Bu gece birinin sana yapmasını istediğin flört hamlesi nedir?" },
  { mode: "Baharatlı", text: "Hem cesur hem eğlenceli gelen en güçlü çekim noktan nedir?" },
  { mode: "Baharatlı", text: "Tatlı sözlerle mi yoksa uzun göz temasıyla mı başlamayı tercih edersin?" },
  { mode: "Baharatlı", text: "Öpüşmeyi hayal ettiğin bir yer var mı?" },
  { mode: "Baharatlı", text: "Ortam kızışmadan önce partnerinin bilmesini istediğin bir sınırın var mı?" },
  { mode: "Freaky", text: "Çoğu kişiye anlatmadığın gizli bir fantezin var mı?" },
  { mode: "Freaky", text: "Bu gece kontrol sende olsa ilk adımın ne olurdu?" },
  { mode: "Freaky", text: "Hangi tarz dirty talk sana daha çekici geliyor: direkt, eğlenceli, romantik?" },
  { mode: "Freaky", text: "Hangi dokunuş odağını en hızlı dağıtır?" },
  { mode: "Freaky", text: "Gerçekten denemek isteyeceğin bir rol yapma senaryosu var mı?" },
  { mode: "Freaky", text: "Yavaş yavaş yükselen bir gece mi yoksa yüksek tempolu bir gece mi?" },
  { mode: "Freaky", text: "Özel bir anda şaşırmayı en çok nasıl seversin?" },
  { mode: "Freaky", text: "Hangi tarz kıyafet sende anında çekim yaratır?" },
  { mode: "Freaky", text: "Yakınlık sırasında daha fazla olmasını istediğin şey nedir?" },
  { mode: "Freaky", text: "Partnerin şu an cesur bir şey istese ne duymak isterdin?" },
  { mode: "Freaky", text: "Bu tur bittikten sonra sence sıradaki adım ne olmalı?" }
];

let i = 0;
const num = document.getElementById("questionNumber");
const txt = document.getElementById("questionText");
const mode = document.getElementById("questionMode");

function render() {
  const q = questions[i];
  num.textContent = `Soru ${i + 1} / 21`;
  txt.textContent = q.text;
  mode.textContent = q.mode;
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  document.getElementById("nextBtn").addEventListener("click", () => {
    i = (i + 1) % questions.length;
    render();
  });
  document.getElementById("prevBtn").addEventListener("click", () => {
    i = (i - 1 + questions.length) % questions.length;
    render();
  });
  document.getElementById("randomBtn").addEventListener("click", () => {
    i = Math.floor(Math.random() * questions.length);
    render();
  });
});
