const statements = [
    "Aku tidak pernah pura-pura tidur agar tidak membalas chat.",
    "Aku tidak pernah naksir mantan teman.",
    "Aku tidak pernah salah kirim pesan memalukan.",
    "Aku tidak pernah bohong soal umur.",
    "Aku tidak pernah datang terlambat ke kencan.",
    "Aku tidak pernah stalking berlebihan di media sosial.",
    "Aku tidak pernah ketiduran saat nonton film di bioskop.",
    "Aku tidak pernah menyukai dua orang sekaligus.",
    "Aku tidak pernah kirim voice note lalu menyesal.",
    "Aku tidak pernah flirting demi dapat diskon.",
    "Aku tidak pernah bohong bilang 'otw' padahal belum berangkat.",
    "Aku tidak pernah menyimpan screenshot chat orang.",
    "Aku tidak pernah lupa nama orang yang baru kenalan.",
    "Aku tidak pernah posting story lalu langsung hapus.",
    "Aku tidak pernah cemburu tapi pura-pura santai.",
    "Aku tidak pernah bohong ke teman demi pasangan.",
    "Aku tidak pernah mengintip ponsel orang lain.",
    "Aku tidak pernah bikin akun kedua untuk stalking.",
    "Aku tidak pernah ketawa di momen yang tidak tepat.",
    "Aku tidak pernah pura-pura paham padahal bingung.",
    "Aku tidak pernah naksir rekan kerja.",
    "Aku tidak pernah naksir sahabat sendiri.",
    "Aku tidak pernah bilang 'sebentar lagi' padahal masih lama.",
    "Aku tidak pernah tertidur saat kelas atau meeting.",
    "Aku tidak pernah salah sebut nama pasangan/gebetan.",
    "Aku tidak pernah belanja impulsif tengah malam.",
    "Aku tidak pernah kirim foto yang berani.",
    "Aku tidak pernah janji diet lalu cheat di hari yang sama.",
    "Aku tidak pernah mengulang cerita yang sama berkali-kali.",
    "Aku tidak pernah ghosting seseorang.",
    "Aku tidak pernah nonton ulang chat lama karena kangen.",
    "Aku tidak pernah bohong soal lokasi.",
    "Aku tidak pernah jadian diam-diam.",
    "Aku tidak pernah menyesal setelah confess.",
    "Aku tidak pernah canggung setelah ketahuan naksir.",
    "Aku tidak pernah nyanyi keras di kamar mandi.",
    "Aku tidak pernah ketawa sampai nangis saat nongkrong.",
    "Aku tidak pernah lupa bayar sesuatu lalu panik.",
    "Aku tidak pernah menolak ajakan lalu menyesal.",
    "Aku tidak pernah pura-pura sibuk agar tidak ikut acara.",
    "Aku tidak pernah overthinking gara-gara chat singkat.",
    "Aku tidak pernah memulai drama kecil di grup chat.",
    "Aku tidak pernah telat bangun di hari penting.",
    "Aku tidak pernah jaim di depan gebetan.",
    "Aku tidak pernah menghapus pesan sebelum dibaca.",
    "Aku tidak pernah takut lihat notifikasi bank.",
    "Aku tidak pernah menunda tugas sampai menit terakhir.",
    "Aku tidak pernah salah masuk room meeting online.",
    "Aku tidak pernah kirim email/DM dengan typo fatal.",
    "Aku tidak pernah salah paham lalu bikin suasana awkward.",
    "Aku tidak pernah pura-pura tidak lihat pesan seseorang.",
    "Aku tidak pernah muter lagu galau berulang-ulang.",
    "Aku tidak pernah nonton profil orang berkali-kali.",
    "Aku tidak pernah baper karena pesan 'k'.",
    "Aku tidak pernah bohong 'aku nggak marah'.",
    "Aku tidak pernah ngambek tanpa bilang alasannya.",
    "Aku tidak pernah menilai orang dari first impression saja."
];

let usedStatements = [];

document.addEventListener("DOMContentLoaded", () => {
    const statementElement = document.getElementById("statement");
    const nextButton = document.getElementById("nextBtn");
    const resetButton = document.getElementById("resetBtn");

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return "Semua pertanyaan sudah keluar. Klik Ulangi untuk main lagi.";
        }
        const available = statements.filter((s) => !usedStatements.includes(s));
        const selected = available[Math.floor(Math.random() * available.length)];
        usedStatements.push(selected);
        return selected;
    }

    nextButton.addEventListener("click", () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === "Mulai") {
            nextButton.textContent = "Pertanyaan berikutnya";
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            usedStatements = [];
            nextButton.disabled = false;
            nextButton.textContent = "Mulai";
            statementElement.textContent = "Klik Mulai untuk bermain!";
        });
    }
});
