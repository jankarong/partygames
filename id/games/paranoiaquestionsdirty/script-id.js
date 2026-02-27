const dirtyParanoiaQuestions = [
  { mode: "Pemanasan", text: "Siapa di sini paling terlihat suka flirting tanpa sadar?" },
  { mode: "Pemanasan", text: "Siapa yang paling mungkin kirim chat nekat tengah malam?" },
  { mode: "Pemanasan", text: "Siapa kelihatannya kalem tapi sebenarnya paling berani?" },
  { mode: "Pemanasan", text: "Siapa yang jadi gebetan paling berbahaya di grup ini?" },
  { mode: "Pemanasan", text: "Siapa paling cepat salah tingkah saat pertanyaan jadi personal?" },
  { mode: "Pedas", text: "Siapa yang terlihat polos di publik tapi paling intens di private?" },
  { mode: "Pedas", text: "Siapa yang paling mungkin kirim pesan paling berani setelah jam 12?" },
  { mode: "Pedas", text: "Siapa yang paling tertarik coba roleplay?" },
  { mode: "Pedas", text: "Siapa yang bisa ubah date biasa jadi malam liar?" },
  { mode: "Pedas", text: "Siapa yang paling dominan di momen intim?" },
  { mode: "Pedas", text: "Siapa yang sengaja naikin level pertanyaan biar panas?" },
  { mode: "Pedas", text: "Siapa yang simpan kenangan paling pedas?" },
  { mode: "Pedas", text: "Siapa yang cukup pakai tatapan buat bikin gugup?" },
  { mode: "Pedas", text: "Siapa yang terlihat pendiam tapi paling nekat?" },
  { mode: "Pedas", text: "Siapa yang paling mungkin rencanain malam tak terlupakan?" },
  { mode: "Chaos", text: "Siapa paling dulu melanggar aturan grup?" },
  { mode: "Chaos", text: "Siapa paling mungkin bikin dua orang suka sekaligus?" },
  { mode: "Chaos", text: "Siapa yang hilang seminggu lalu balik super flirty?" },
  { mode: "Chaos", text: "Siapa yang paling mungkin keceplosan rahasia?" },
  { mode: "Chaos", text: "Siapa bilang santai, padahal paling kepikiran?" },
  { mode: "Chaos", text: "Siapa paling susah ditolak di akhir malam?" },
  { mode: "Chaos", text: "Siapa yang bisa bikin game ini jadi cerita nyata?" },
  { mode: "Chaos", text: "Siapa yang bikin grup panas cuma dengan satu voice note?" },
  { mode: "Chaos", text: "Siapa jadi godaan terbesar malam ini?" },
  { mode: "Chaos", text: "Siapa bilang « satu minum lagi » lalu bikin chaos?" },
  { mode: "Pemanasan", text: "Siapa punya poker face terbaik saat situasi canggung?" },
  { mode: "Pemanasan", text: "Siapa paling gampang kebawa suasana grup?" },
  { mode: "Pemanasan", text: "Siapa paling mungkin tanpa sadar bocorin crush-nya?" },
  { mode: "Pemanasan", text: "Siapa yang ubah candaan jadi tegang beneran?" },
  { mode: "Pemanasan", text: "Siapa paling jago jaga ritme permainan?" },
  { mode: "Pedas", text: "Siapa yang punya sisi kejutan paling besar?" },
  { mode: "Pedas", text: "Siapa paling mungkin ambil langkah pertama?" },
  { mode: "Pedas", text: "Siapa cemburu tapi paling jago nutupin?" },
  { mode: "Pedas", text: "Siapa paling cepat langgar aturan pacaran sendiri?" },
  { mode: "Pedas", text: "Siapa yang tatapannya paling kuat di ruangan ini?" },
  { mode: "Pedas", text: "Siapa paling mungkin jatuh ke orang yang salah?" },
  { mode: "Pedas", text: "Siapa paling dulu mulai flirting di pesta?" },
  { mode: "Pedas", text: "Siapa paling lama simpan rahasia pedas?" },
  { mode: "Pedas", text: "Siapa paling berani kasih pertanyaan paling tajam?" },
  { mode: "Pedas", text: "Siapa yang flirting cuma buat tes reaksi?" },
  { mode: "Chaos", text: "Siapa paling mungkin bikin cinta segitiga tanpa sengaja?" },
  { mode: "Chaos", text: "Siapa menghilang bentar lalu balik bawa gosip besar?" },
  { mode: "Chaos", text: "Siapa paling mungkin chat mantan jam 2 pagi?" },
  { mode: "Chaos", text: "Siapa paling mungkin upload hal privat karena salah klik?" },
  { mode: "Chaos", text: "Siapa yang jadi crush kejutan satu grup?" },
  { mode: "Chaos", text: "Siapa yang ubah game ini jadi sesi pengakuan?" },
  { mode: "Chaos", text: "Siapa yang bisa pecah kubu hanya dengan satu kalimat?" },
  { mode: "Chaos", text: "Siapa pulang dengan cerita paling banyak?" },
  { mode: "Chaos", text: "Siapa yang ubah rumor kecil jadi drama besar?" },
  { mode: "Chaos", text: "Siapa yang paling sering dipilih sepanjang game?" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Pertanyaan ${currentIndex + 1} dari ${dirtyParanoiaQuestions.length}`;
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
