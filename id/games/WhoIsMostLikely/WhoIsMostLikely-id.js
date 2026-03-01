const questions = [
    "...akan joget di atas meja saat pesta",
    "...akan mencium seseorang di kencan pertama",
    "...akan nyanyi paling keras di tempat umum",
    "...akan ngemil diam-diam tengah malam",
    "...akan menelepon mantan saat mabuk",
    "...akan nyasar saat traveling",
    "...akan ketiduran di bioskop dan ngorok",
    "...akan upload selfie paling banyak di media sosial",
    "...akan cerita hal paling memalukan saat kumpul",
    "...akan kentut lalu nyalahin orang lain",
    "...akan menangkap buket di pernikahan",
    "...akan menerima tantangan paling nekat",
    "...akan pakai baju paling tidak nyambung",
    "...akan karaoke sampai suaranya habis",
    "...akan nangis di depan teman-teman",
    "...akan flirting dengan orang asing di pesta",
    "...akan lupa bawa paspor",
    "...akan pulang paling akhir dari pesta",
    "...akan membocorkan rahasia",
    "...akan mencoba menari tapi gagal total",
    "...akan tersandung di tempat umum",
    "...akan bahas filsafat saat mabuk",
    "...akan paling sering pamer pencapaian",
    "...akan coba makanan paling aneh di pesta",
    "...akan beli oleh-oleh yang tidak penting",
    "...akan lupa waktu saat pesta",
    "...akan jujur blak-blakan sampai bikin canggung",
    "...akan menirukan selebriti",
    "...akan sadar pakai baju terbalik paling terakhir",
    "...akan mulai nyanyi saat mabuk",
    "...akan cerita mimpi paling aneh",
    "...akan coba game paling berisiko",
    "...akan hilang arah dan tidak menemukan hotel",
    "...akan pesta sampai matahari terbit",
    "...akan salah kirim chat ke orang yang salah",
    "...akan mengambil foto paling memalukan",
    "...akan lupa nama orang yang baru kenal",
    "...akan tidak sengaja like postingan lama",
    "...akan masak makanan paling pedas",
    "...akan memakai outfit kembaran tanpa sengaja",
    "...akan ketawa paling keras",
    "...akan jadi orang pertama yang lapar lagi",
    "...akan jadi MC dadakan saat acara",
    "...akan ngajak main game tambahan",
    "...akan paling sulit berhenti ngobrol",
    "...akan datang paling telat",
    "...akan bawa gosip paling panas",
    "...akan jadi favorit semua orang di pesta",
    "...akan paling cepat jatuh cinta",
    "...akan paling cepat ketiduran setelah pesta"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Mulai Game';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Pertanyaan Berikutnya';

    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);

    document.getElementById('questionText').textContent = 'Siapa yang paling mungkin ' + currentQuestion;
}
