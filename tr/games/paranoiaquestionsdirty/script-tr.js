const dirtyParanoiaQuestions = [
  { mode: "Isınma", text: "Bu odada fark etmeden en çok flört enerjisi veren kişi kim?" },
  { mode: "Isınma", text: "Gece gizli sohbeti ilk başlatacak kişi kim olur?" },
  { mode: "Isınma", text: "Dışarıda sakin görünüp aslında en cesur olan kim?" },
  { mode: "Isınma", text: "Bu grupta en tehlikeli crush kim olur?" },
  { mode: "Isınma", text: "Aşkına mesaj atmama challenge'ında en uzun süre dayanacak kişi kim?" },
  { mode: "Cesur", text: "Kirli konuşmayı sevip toplum içinde masum davranacak kişi kim?" },
  { mode: "Cesur", text: "Gece yarısından sonra en riskli mesajı gönderecek kişi kim?" },
  { mode: "Cesur", text: "Gizlice roleplay denemek isteyen kişi kim?" },
  { mode: "Cesur", text: "Normal bir buluşmayı en hızlı şekilde çılgın geceye çevirecek kişi kim?" },
  { mode: "Cesur", text: "Özel anlarda en yüksek özgüvene sahip kişi kim?" },
  { mode: "Cesur", text: "Kaos için doğruluk oyununu özellikle seçecek kişi kim?" },
  { mode: "Cesur", text: "Kimsenin bilmediği baharatlı bir anıyı saklayan kişi kim?" },
  { mode: "Cesur", text: "Sadece göz temasıyla flört edip kazanacak kişi kim?" },
  { mode: "Cesur", text: "En sessiz görünüp aslında en cesur olan kişi kim?" },
  { mode: "Cesur", text: "En unutulmaz gece planını yapacak kişi kim?" },
  { mode: "Kaos", text: "Grubun flört kuralını ilk bozacak kişi kim?" },
  { mode: "Kaos", text: "Aynı anda iki kişinin hoşlandığı kişi kim olur?" },
  { mode: "Kaos", text: "Bir hafta kaybolup sonra çok flörtöz geri dönecek kişi kim?" },
  { mode: "Kaos", text: "Öpüşüp anlatma ihtimali en yüksek kişi kim?" },
  { mode: "Kaos", text: "Umursamıyormuş gibi yapıp en çok umursayan kişi kim?" },
  { mode: "Kaos", text: "Gece sürüşünde karşı konulması en zor kişi kim?" },
  { mode: "Kaos", text: "Bu oyunu gerçek bir hikayeye çevirebilecek kişi kim?" },
  { mode: "Kaos", text: "Tek bir ses kaydıyla drama başlatacak kişi kim?" },
  { mode: "Kaos", text: "Grubun en büyük cazibesi haline gelecek kişi kim?" },
  { mode: "Kaos", text: "Bir içki daha deyip ortalığı karıştıracak kişi kim?" },
  { mode: "Isınma", text: "Flört anında en iyi poker surata sahip kişi kim?" },
  { mode: "Isınma", text: "Bu grupta en kolay takılan kişi kim?" },
  { mode: "Isınma", text: "Crush'ını yanlışlıkla belli edecek kişi kim?" },
  { mode: "Isınma", text: "Bir şakayı gerçek gerilime dönüştürecek kişi kim?" },
  { mode: "Isınma", text: "Herkes paniklerken sakin kalacak kişi kim?" },
  { mode: "Cesur", text: "Gizli maceracı tarafı en güçlü olan kişi kim?" },
  { mode: "Cesur", text: "İlk cesur mesajı atacak kişi kim?" },
  { mode: "Cesur", text: "Kıskanıp bunu en iyi saklayan kişi kim?" },
  { mode: "Cesur", text: "Kendi flört kuralını bozacak kişi kim?" },
  { mode: "Cesur", text: "En güçlü göz temasına sahip kişi kim?" },
  { mode: "Cesur", text: "Aşık olmaması gereken kişiye düşecek kişi kim?" },
  { mode: "Cesur", text: "Partide ilk hamleyi yapacak kişi kim?" },
  { mode: "Cesur", text: "Baharatlı bir sırrı en uzun süre saklayacak kişi kim?" },
  { mode: "Cesur", text: "Doğrulukta en cesur soruyu soracak kişi kim?" },
  { mode: "Cesur", text: "Sadece tepkileri ölçmek için flört edecek kişi kim?" },
  { mode: "Kaos", text: "Yanlışlıkla aşk üçgeni başlatacak kişi kim?" },
  { mode: "Kaos", text: "Partide kaybolup dedikoduyla geri dönecek kişi kim?" },
  { mode: "Kaos", text: "Saat 2'de eski sevgiliye mesaj atacak kişi kim?" },
  { mode: "Kaos", text: "Grup sırrını yanlışlıkla ifşa edecek kişi kim?" },
  { mode: "Kaos", text: "Herkesin beklenmedik crush'ı olacak kişi kim?" },
  { mode: "Kaos", text: "Bu oyunu itiraf gecesine çevirecek kişi kim?" },
  { mode: "Kaos", text: "Odayı iki gruba bölüp drama başlatacak kişi kim?" },
  { mode: "Kaos", text: "Partiden en çok hikayeyle ayrılacak kişi kim?" },
  { mode: "Kaos", text: "Tek bir söylentiyi tam kaosa çevirecek kişi kim?" },
  { mode: "Kaos", text: "Bu paranoya turunu her seferinde kazanacak kişi kim?" }
];

let currentIndex = 0;

function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Soru ${currentIndex + 1} / ${dirtyParanoiaQuestions.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
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
  currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length);
  renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
