const questions = [
  "...partide masanın üstünde dans edecek?",
  "...ilk buluşmada ilk öpücüğü başlatacak?",
  "...kalabalıkta en yüksek sesle şarkı söyleyecek?",
  "...gece yarısı gizlice atıştırmalık yiyecek?",
  "...eski sevgiliyi yanlışlıkla arayacak?",
  "...seyahatte yönünü kaybedecek?",
  "...filmde uyuyup horlayacak?",
  "...sosyal medyada en çok selfie paylaşacak?",
  "...partide en komik anıyı anlatacak?",
  "...bir şeyi düşürüp hiç olmamış gibi davranacak?",
  "...düğünde buketi yakalayacak?",
  "...en çılgın meydan okumayı kabul edecek?",
  "...dışarıya uyumsuz kıyafetle çıkacak?",
  "...karaokede sesi kısılana kadar söyleyecek?",
  "...arkadaşlarının önünde duygulanıp ağlayacak?",
  "...partide bir yabancıyla sohbeti başlatacak?",
  "...pasaportunu unuttuğunu son anda fark edecek?",
  "...en geç saatte eve dönecek?",
  "...yanlışlıkla bir sırrı ağzından kaçıracak?",
  "...dans etmeye çalışıp en komik görüntüyü verecek?",
  "...kalabalıkta takılıp düşecek?",
  "...gece ilerleyince felsefi konuşmalara girecek?",
  "...başarılarını en çok anlatacak?",
  "...partide en garip yiyeceği deneyecek?",
  "...seyahatten en gereksiz hediyeyi alacak?",
  "...zamanı unutup partiyi kapatacak?",
  "...en utandırıcı gerçeği itiraf edecek?",
  "...bir ünlüyü en iyi taklit edecek?",
  "...kıyafetini ters giydiğini en geç fark edecek?",
  "...sarhoş olunca şarkıya başlayacak?",
  "...en tuhaf rüyasını anlatacak?",
  "...riskli bir oyunu denemekte ısrar edecek?",
  "...oteli bulamayıp şehirde kaybolacak?",
  "...güneş doğana kadar partileyecek?",
  "...yanlış kişiye mesaj atacak?",
  "...en komik fotoğrafları çekecek?",
  "...tanıştığı kişinin adını hemen unutacak?",
  "...eski bir gönderiyi yanlışlıkla beğenecek?",
  "...mutfakta en acı yemeği yapacak?",
  "...bir başkasıyla aynı kıyafeti giyecek?",
  "...partinin en çılgın dans figürünü yapacak?",
  "...grupta herkesi en çok güldürecek?",
  "...ilk tatilde bavulunu unutacak?",
  "...sohbette en çok lafı kesilecek kişi olacak?",
  "...oyunda en çok puanı toplayacak?",
  "...en hızlı utanıp kızaracak?",
  "...en çok şaka yapacak?",
  "...en çok telefonunu kaybedecek?",
  "...en geç cevap veren kişi olacak?",
  "...en spontane planı yapacak?"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  nextQuestionBtn.textContent = 'Oyunu Başlat';
  nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  nextQuestionBtn.textContent = 'Sonraki Soru';

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
