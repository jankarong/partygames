const softTruth = [
    "Apa kesan pertamamu saat pertama kali bertemu aku?",
    "Hal kecil apa yang aku lakukan yang bikin kamu merasa disayang?",
    "Kenangan kencan kita mana yang paling kamu suka?",
    "Lagu apa yang paling mengingatkan kamu sama kita?",
    "Panggilan sayang apa yang paling kamu suka dariku?",
    "Kebiasaan kecilku apa yang menurutmu lucu?",
    "Kalau ada liburan singkat, kamu mau pergi ke mana sama aku?",
    "Satu hal apa yang ingin kita perbaiki dalam hubungan ini?",
    "Kapan kamu merasa paling dekat secara emosional denganku?",
    "Foto kita mana yang jadi favoritmu dan kenapa?",
    "Sentuhan non-seksual dariku apa yang paling bikin nyaman?",
    "Batasan apa yang ingin selalu aku hargai?",
    "Adegan film romantis apa yang menurutmu mirip cerita kita?",
    "Rutinitas harian apa yang ingin kamu jalani bareng aku?",
    "Pujian dariku mana yang masih kamu ingat sampai sekarang?",
    "Rasa insecure apa yang ingin kamu ceritakan ke aku?",
    "Ide kencan hemat apa yang paling kamu suka?",
    "Hal apa dariku yang selalu bikin kamu ketawa?",
    "Menurutmu kekuatan terbesar kita sebagai tim itu apa?",
    "Rencana masa depan apa yang paling bikin kamu semangat?",
    "Kalau hubungan kita jadi lagu, judulnya apa?",
    "Makanan apa yang pengin kita masak bareng minggu ini?",
    "Momen random apa yang pernah bikin kamu tiba-tiba kangen aku?",
    "Hal apa yang paling kamu syukuri dari hubungan ini?",
    "Di hari yang berat, kamu maunya aku dukung kamu seperti apa?",
    "Tempat nongkrong favorit kita yang wajib diulang itu apa?",
    "Kapan terakhir kamu merasa sangat dipahami oleh aku?",
    "Versi kencan ideal kamu di rumah itu seperti apa?",
    "Kebiasaan baikku apa yang diam-diam kamu kagumi?",
    "Satu hal yang ingin kamu coba bareng aku tahun ini apa?",
    "Bagian dari cerita cinta kita yang paling ingin kamu ulang apa?",
    "Kalau kita bikin tradisi bulanan, kamu pilih tradisi apa?",
    "Apa bahasa cinta kamu yang paling dominan?",
    "Aku paling bikin kamu merasa aman saat melakukan apa?",
    "Kalau kita buat bucket list berdua, 1 item pertama apa?",
    "Apa hal paling dewasa yang kita pelajari dari hubungan ini?",
    "Momen sederhana apa yang buat kamu merasa sangat bahagia?",
    "Kapan kamu merasa aku jadi partner terbaikmu?",
    "Apa cara favoritmu untuk quality time bareng aku?",
    "Apa hal yang kamu harap nggak pernah berubah dari kita?",
    "Kalau bisa, kamu ingin kita lebih sering ngobrol soal apa?",
    "Kebiasaan komunikasi apa yang paling kamu suka dari aku?",
    "Apa hal paling manis yang pernah aku lakukan menurutmu?",
    "Apa yang bikin kamu tetap memilih aku setiap hari?",
    "Kalau ada weekend kosong, aktivitas berdua paling kamu mau apa?",
    "Momen kapan kamu merasa paling bangga punya aku?",
    "Kata apa yang paling menggambarkan hubungan kita?",
    "Apa yang bikin kamu merasa dihargai dalam hubungan ini?",
    "Kalau kita tua nanti, kebiasaan apa yang ingin tetap kita jaga?",
    "Apa satu harapan terdekatmu untuk hubungan kita bulan ini?"
];

const softDare = [
    "Peluk pasanganmu selama 20 detik tanpa lepas.",
    "Kasih 3 pujian spesifik ke pasanganmu sekarang.",
    "Peragakan momen pertama kalian ketemu dalam 30 detik.",
    "Pegangan tangan dan tatap mata selama 30 detik.",
    "Kirim chat manis ke pasanganmu meski lagi sebelahan.",
    "Tirukan gaya pasanganmu dengan cara yang lucu dan sopan.",
    "Buat puisi cinta 2 baris untuk pasanganmu.",
    "Dance bareng selama 1 lagu.",
    "Pijat bahu pasanganmu selama 1 menit.",
    "Ambil selfie couple paling gemas sekarang.",
    "Ucapkan terima kasih untuk 5 hal dari pasanganmu minggu ini.",
    "Rencanakan ide kencan berikutnya dalam 1 menit.",
    "Bisikkan satu kalimat yang bikin pasanganmu merasa spesial.",
    "Lakukan 10 squat bareng sambil saling pegang tangan.",
    "Peragakan momen saat kamu sadar kamu suka dia.",
    "Biarkan pasangan memilih wallpaper HP kamu sampai malam ini.",
    "Bikin kode tangan rahasia kalian sekarang.",
    "Kasih pujian ala drama sinetron ke pasanganmu.",
    "Gambar hati kecil dan tulis inisial kalian.",
    "Nyanyikan reff lagu romantis bareng pasangan.",
    "Sebutkan 5 alasan kenapa kamu nyaman sama pasanganmu.",
    "Lakukan slow walk berdua 20 detik sambil senyum.",
    "Bikin janji manis kecil untuk minggu ini.",
    "Kasih high-five lucu versi kalian berdua.",
    "Ceritakan satu memori favorit kalian dengan gaya storyteller.",
    "Tulis 1 kalimat cinta di notes lalu tunjukkan ke pasangan.",
    "Lakukan saling tatap tanpa ngomong selama 15 detik.",
    "Kasih tepuk tangan khusus untuk pasanganmu.",
    "Pilih 1 lagu dan buat 15 detik dance challenge berdua.",
    "Ceritakan alasan kamu bangga punya pasanganmu.",
    "Kasih cium kening pasangan dengan penuh perhatian.",
    "Buat nama panggilan lucu baru untuk pasanganmu.",
    "Ajak pasangan main suit 3 ronde, yang kalah kasih pujian.",
    "Lakukan mini interview: tanya 1 hal random ke pasangan.",
    "Bilang “aku pilih kamu karena...” lalu lanjutkan kalimatnya.",
    "Bikin daftar 3 tempat yang ingin dikunjungi bareng.",
    "Pegang tangan pasangan dan tarik napas bareng 3 kali.",
    "Peragakan gaya foto prewedding versi kocak.",
    "Kasih motivasi 20 detik untuk pasanganmu.",
    "Sebutkan 3 hal kecil yang kamu suka dari pasanganmu.",
    "Bikin toast imajiner untuk hubungan kalian.",
    "Pilih 1 aktivitas no gadget untuk malam ini.",
    "Kasih kata semangat paling manis ke pasangan sekarang.",
    "Lakukan mini slow dance tanpa musik 20 detik.",
    "Ceritakan 1 hal yang ingin kamu pelajari dari pasanganmu.",
    "Kasih sentuhan tangan lembut dan bilang terima kasih.",
    "Buat tantangan couple seru untuk akhir pekan ini.",
    "Lakukan pose favorit kalian lalu hitung sampai 5.",
    "Tulis 1 rencana kecil untuk bikin pasanganmu bahagia besok.",
    "Tutup ronde ini dengan pelukan hangat."
];

const romanticTruth = [
    "Kapan kamu pertama kali merasa benar-benar jatuh cinta sama aku?",
    "Momen apa dari hubungan kita yang terasa paling hangat di hati?",
    "Apa versi kencan sederhana yang paling romantis menurutmu?",
    "Hal apa dariku yang bikin kamu merasa tenang setiap hari?",
    "Kalau kita bikin tradisi bulanan, kamu mau tradisi apa?",
    "Apa momen paling manis yang pernah kita alami berdua?",
    "Kalimat dariku mana yang paling kamu simpan di hati?",
    "Menurutmu, kenapa hubungan kita terasa spesial?",
    "Apa yang paling kamu suka dari cara kita berkomunikasi?",
    "Momen kapan kamu merasa paling diprioritaskan oleh aku?",
    "Kalau kita bikin film cinta, adegan wajibnya apa?",
    "Apa kebiasaan kecilku yang bikin kamu senyum sendiri?",
    "Apa arti “nyaman” dalam hubungan kita menurutmu?",
    "Tempat apa yang paling ingin kamu datangi lagi sama aku?",
    "Apa impian romantis jangka pendekmu untuk kita berdua?",
    "Kapan kamu merasa paling didengar oleh aku?",
    "Satu kata apa yang paling menggambarkan cinta kita?",
    "Apa hal paling sederhana yang bikin kamu bahagia saat bersama aku?",
    "Kalau kita menua bareng, hal apa yang ingin tetap kita lakukan?",
    "Apa rasa syukur terbesarmu tentang hubungan ini?",
    "Kapan kamu terakhir merasa “aku beruntung punya kamu”?",
    "Apa momen yang bikin kamu percaya hubungan ini bisa panjang?",
    "Kalau kita bikin playlist cinta, lagu pertama pilihmu apa?",
    "Apa bentuk perhatian kecil yang paling kamu sukai dariku?",
    "Apa hal yang ingin kamu rayakan lebih sering bersama aku?",
    "Apa yang bikin kamu merasa dihargai sebagai pasangan?",
    "Apa kenangan random yang tiba-tiba bikin kamu kangen aku?",
    "Versi quality time idealmu sama aku itu seperti apa?",
    "Apa pujian paling tulus yang ingin kamu dengar dariku?",
    "Apa yang membuat kamu tetap memilih aku sampai sekarang?",
    "Momen ngobrol apa yang paling kamu anggap bermakna?",
    "Kalau ada libur satu hari, kamu mau habiskan dengan cara apa berdua?",
    "Apa hal dari hubungan kita yang paling ingin kamu jaga?",
    "Apa sifatku yang paling bikin kamu merasa aman?",
    "Bagian dari perjalanan kita yang paling kamu banggakan apa?",
    "Apa kebiasaan romantis yang pengin kita mulai minggu ini?",
    "Hal apa yang paling bikin hubungan kita terasa dewasa?",
    "Kalau kamu kirim surat cinta, kalimat pembukanya apa?",
    "Apa yang bikin kamu merasa “kita satu tim”?",
    "Apa momen kecil yang menurutmu paling intim secara emosional?",
    "Apa cara terbaik untuk menunjukkan cinta menurutmu?",
    "Kalau kita flashback, periode mana yang paling kamu rindukan?",
    "Apa yang kamu harap aku pahami lebih dalam tentang dirimu?",
    "Momen kapan kamu merasa paling dipeluk, bukan cuma secara fisik?",
    "Apa yang bikin kamu paling excited untuk masa depan kita?",
    "Kalau kita punya ritual malam, kamu mau seperti apa?",
    "Apa kata-kata afirmasi favorit yang ingin kamu dengar dari aku?",
    "Hal apa dari aku yang bikin kamu merasa “pulang”?",
    "Apa arti romantis yang sehat menurutmu dalam hubungan?",
    "Apa satu harapan romantismu untuk bulan ini bersama aku?"
];

const romanticDare = [
    "Tulis 2 kalimat cinta untuk pasanganmu dan bacakan sekarang.",
    "Tatap mata pasanganmu 30 detik sambil senyum tanpa ngomong.",
    "Kasih cium kening dan bilang satu kalimat yang menenangkan.",
    "Peluk pasanganmu 20 detik sambil tarik napas bareng.",
    "Sebutkan 3 hal yang kamu cintai dari pasanganmu hari ini.",
    "Bikin janji romantis kecil untuk besok.",
    "Peragakan ulang momen pertama kalian jalan bareng.",
    "Bisikkan satu doa/harapan baik untuk hubungan kalian.",
    "Kasih pujian tentang hati pasanganmu, bukan penampilannya.",
    "Bikin rencana mini date di rumah untuk malam ini.",
    "Nyanyikan satu potongan lagu cinta untuk pasanganmu.",
    "Pegang tangan pasangan dan ucapkan “aku bersyukur punya kamu”.",
    "Tulis 1 alasan kenapa pasanganmu bikin hidupmu lebih baik.",
    "Lakukan slow dance 20 detik tanpa musik.",
    "Kasih “good morning text” versi draft untuk besok pagi.",
    "Sebutkan 1 kenangan favoritmu lalu ceritakan kenapa spesial.",
    "Bilang “aku bangga sama kamu karena...” lalu lanjutkan.",
    "Bikin nama panggilan romantis baru untuk pasanganmu.",
    "Kasih pasanganmu 1 menit hand massage lembut.",
    "Ucapkan 3 kata yang paling menggambarkan pasanganmu.",
    "Ajak pasanganmu memilih ide kencan pekan ini dari 2 opsi.",
    "Buat toast cinta 15 detik untuk hubungan kalian.",
    "Tuliskan satu mimpi masa depan kalian berdua di notes.",
    "Peragakan pose foto couple favorit selama 10 detik.",
    "Kasih pasanganmu kalimat validasi paling menenangkan.",
    "Ulangi kalimat ini sambil menatap pasangan: “Aku pilih kamu.”",
    "Tunjukkan gestur cinta favoritmu ke pasangan sekarang.",
    "Bacakan 1 kalimat “terima kasih” paling tulus untuk pasangan.",
    "Lakukan challenge 20 detik senyum bareng tanpa ketawa.",
    "Kasih sentuhan lembut di tangan pasangan sambil bilang “aku ada”.",
    "Buat daftar 3 aktivitas romantis low budget untuk minggu ini.",
    "Kirim voice note pendek yang isinya apresiasi untuk pasangan.",
    "Buat kode kata rahasia untuk bilang “aku kangen”.",
    "Kasih pasanganmu “virtual bouquet” versi deskripsi bunga favorit.",
    "Sebutkan 1 alasan kenapa kamu nyaman jadi diri sendiri dengannya.",
    "Lakukan mini roleplay “first date” versi manis 30 detik.",
    "Pilih 1 lagu lalu dedikasikan ke pasanganmu.",
    "Bilang satu kalimat: “Aku merasa dicintai saat kamu...”",
    "Tulis 1 tujuan komunikasi sehat kalian bulan ini.",
    "Buat “check-in question” romantis untuk dipakai tiap minggu.",
    "Kasih ciuman tangan pasangan dengan penuh rasa hormat.",
    "Rangkum hubungan kalian dalam 1 kalimat puitis.",
    "Ceritakan versi singkat “kenapa aku jatuh cinta padamu”.",
    "Ajak pasanganmu tarik napas 3 kali dan bilang “kita tim”.",
    "Kasih 2 pujian tentang usaha pasanganmu akhir-akhir ini.",
    "Tentukan 1 malam “no gadget, fokus berdua”.",
    "Buat daftar 3 hal yang ingin kamu lakukan bareng sebelum akhir tahun.",
    "Lakukan pelukan dari belakang selama 15 detik (jika nyaman).",
    "Tutup ronde ini dengan kalimat cinta paling jujur versimu.",
    "Kasih pasangan satu kalimat penutup: “terima kasih sudah jadi rumah.”"
];

const spicyTruth = [
    "Fantasi romantis apa yang belum pernah kamu ceritakan ke aku?",
    "Gaya flirting aku yang paling bikin kamu luluh itu apa?",
    "Waktu kapan kamu merasa paling pengin dekat sama aku?",
    "Hal apa dariku yang paling cepat bikin kamu deg-degan?",
    "Aktivitas couple baru apa yang pengin kamu coba bareng aku?",
    "Outfit aku mana yang paling menarik menurutmu?",
    "Dalam chemistry kita, bagian mana yang ingin kamu tingkatkan?",
    "Momen paling berani kita yang paling kamu ingat apa?",
    "Foreplay non-eksplisit favoritmu biasanya seperti apa?",
    "Tempat privat mana yang menurutmu paling cocok buat quality time?",
    "Pujian tentang dirimu yang paling suka kamu dengar dariku apa?",
    "Hal apa yang dulu kamu malu minta ke aku?",
    "Versi malam romantis idealmu di rumah itu kayak gimana?",
    "Aku bisa bikin kamu merasa lebih diinginkan dengan cara apa?",
    "Fantasi aman apa yang pengin kita obrolin tanpa tekanan?",
    "Satu kata yang paling menggambarkan chemistry kita apa?",
    "Momen intim mana yang suka kepikiran lagi sama kamu?",
    "Kamu pengin aku lebih sering inisiatif di hal apa?",
    "Aktivitas sensual non-seks apa yang pengin dicoba bulan ini?",
    "Jenis ciuman favoritmu dariku apa?",
    "Saat aku bisik ke kamu, bagian mana yang paling bikin merinding?",
    "Apa hal kecil yang menurutmu sangat menggoda dari aku?",
    "Kalau date night ideal versi berani, urutannya gimana?",
    "Apa sinyal dari aku yang paling cepat kamu tangkap?",
    "Kamu lebih suka suasana intimate yang tenang atau playful?",
    "Apa batasan penting yang ingin selalu kita sepakati?",
    "Komunikasi seperti apa yang bikin kamu merasa aman saat spicy mode?",
    "Apa yang bikin kamu merasa dihormati saat momen intim?",
    "Bagian dari dirimu yang paling ingin diapresiasi pasangan apa?",
    "Kalimat flirt seperti apa yang kamu suka dengar dariku?",
    "Kamu lebih suka aku spontan atau terencana saat ngajak quality time?",
    "Hal apa yang bikin momen romantis terasa lebih dalam buatmu?",
    "Pace seperti apa yang paling nyaman buat kamu?",
    "Apa yang pengin kamu coba tapi tetap level aman dan sopan?",
    "Gaya kencan malam favoritmu lebih ke elegan atau santai?",
    "Apa kode rahasia pasangan yang pengin kita punya?",
    "Apa yang kamu harap aku lakukan setelah momen romantis selesai?",
    "Satu hal apa yang bikin kamu merasa sangat diinginkan?",
    "Kalau kita bikin playlist spicy, lagu pembuka pilihmu apa?",
    "Apa momen paling memorable saat chemistry kita lagi tinggi?",
    "Kamu suka dipuji lewat chat atau langsung tatap muka?",
    "Satu kata apa yang bikin kamu langsung senyum kalau aku ucapkan?",
    "Hal apa yang harus selalu kita cek sebelum masuk mode spicy?",
    "Apa yang bikin flirting kita terasa natural dan nggak maksa?",
    "Kalau boleh pilih, malam romantis ideal dimulai jam berapa?",
    "Apa gestureku yang paling bikin kamu ngerasa disayang sekaligus tertarik?",
    "Apa yang pengin kamu eksplor bareng tapi tetap nyaman?",
    "Di hubungan ini, bagian intim apa yang paling kamu hargai?",
    "Apa yang bikin kamu yakin chemistry kita sehat?",
    "Hal apa yang paling kamu tunggu dari date night kita berikutnya?"
];

const spicyDare = [
    "Kasih pasanganmu tatapan flirt paling percaya diri selama 10 detik.",
    "Cium pasanganmu perlahan selama 10 detik (sesuai consent).",
    "Bisikkan satu hal dari pasanganmu yang paling kamu suka.",
    "Lakukan mini dance sensual 20 detik yang tetap sopan.",
    "Biarkan pasangan memilih 3 titik ciuman yang nyaman (PG-13).",
    "Deskripsikan date night impianmu dengan suara paling menggoda.",
    "Peluk pasanganmu rapat dan samakan napas 20 detik.",
    "Kirim chat flirt yang boleh dibuka nanti malam.",
    "Pijat leher pasanganmu selama 1 menit.",
    "Sebutkan 1 batasan aman dan 1 keinginan berani sekarang.",
    "Berdiri dekat, tatap mata pasangan 20 detik tanpa ketawa.",
    "Kasih tahu 1 ide spicy date yang pengin dicoba bulan ini.",
    "Jawab 1 pertanyaan spicy ya/tidak dari pasanganmu secara jujur.",
    "Puji style, aroma, dan senyum pasanganmu dalam 1 kalimat.",
    "Ajak pasangan slow dance dengan posisi dekat selama 15 detik.",
    "Rekam voice note pendek kenapa pasanganmu menarik banget.",
    "Peragakan ulang momen ciuman pertama kalian versi singkat.",
    "Sebutkan 1 keinginan romantis dan 1 keinginan berani.",
    "Pakai panggilan sayang pilihan pasangan selama ronde ini.",
    "Kasih ciuman kening, pipi, dan tangan secara berurutan.",
    "Lakukan “come here” look paling menggoda ke pasangan.",
    "Pilih lagu dan lakukan sensual sway 20 detik berdua.",
    "Bisikkan rencana private date kalian berikutnya.",
    "Kasih pasanganmu pujian paling nakal tapi tetap sopan.",
    "Mainkan tantangan 5 detik tatap bibir pasangan lalu senyum.",
    "Pegang tangan pasangan, tarik perlahan, lalu peluk.",
    "Tunjukkan gaya jalan paling percaya diri seperti di runway.",
    "Kasih pasangan 3 kalimat flirting tanpa mengulang kata.",
    "Lakukan pose duduk berdua paling romantis selama 15 detik.",
    "Biarkan pasangan pilih satu lagu untuk “mode malam ini”.",
    "Sebutkan 1 hal yang ingin kamu coba di date privat berikutnya.",
    "Kasih ciuman singkat di titik yang dipilih pasangan (aman).",
    "Buat kode kata untuk bilang “lanjut” atau “pause”.",
    "Ajak pasangan hitung mundur 5 detik sebelum ciuman.",
    "Bilang nama pasangan dengan nada lembut lalu nada berani.",
    "Lakukan mini lap dance versi sopan 10 detik.",
    "Ucapkan kalimat: “Malam ini aku ingin kita...” lalu lanjutkan.",
    "Kasih satu compliment paling jujur tentang chemistry kalian.",
    "Pegang pinggang pasangan (dengan izin) dan sway 15 detik.",
    "Buat tantangan flirt baru khusus untuk kalian berdua.",
    "Lakukan roleplay singkat: perkenalan pertama versi lebih berani.",
    "Ajak pasangan pilih antara “kiss” atau “hug”, lalu lakukan.",
    "Tatap pasangan dari dekat dan bilang satu kalimat bikin baper.",
    "Sebutkan 1 hal dari pasangan yang paling bikin kamu penasaran.",
    "Lakukan “whisper challenge” satu kalimat romantis.",
    "Kasih pasangan sentuhan tangan paling lembut selama 20 detik.",
    "Pilih 1 emoji yang menggambarkan mood kamu ke pasangan.",
    "Kasih pasangan “good night line” versi paling manis + berani.",
    "Lakukan putaran dance pendek lalu cium kening pasangan.",
    "Tutup ronde dengan pelukan dekat dan kata: “aku mau kamu”."
];

const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: { truth: softTruth, dare: softDare },
        romantic: { truth: romanticTruth, dare: romanticDare },
        spicy: { truth: spicyTruth, dare: spicyDare }
    }
};

const t = {
    choose: "👇 Pilih mode untuk kalian berdua 👇",
    chooseRound: "👇 Pilih JUJUR atau BERANI 👇",
    chooseRomantic: "👇 Mode romantis: pilih JUJUR atau BERANI 👇",
    chooseSpicy: "👇 Mode pedas: pilih JUJUR atau BERANI 👇",
    softBadge: "Mode santai",
    romanticBadge: "Mode romantis",
    spicyBadge: "Mode pedas",
    truthBadge: "Jujur",
    dareBadge: "Berani"
};

const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;

    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">' + t.softBadge + '</span>';
        questionText.textContent = t.chooseRound;
    } else if (difficulty === 'romantic') {
        selectedDifficulty.innerHTML = '<span class="badge bg-primary">' + t.romanticBadge + '</span>';
        questionText.textContent = t.chooseRomantic;
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">' + t.spicyBadge + '</span>';
        questionText.textContent = t.chooseSpicy;
    }

    selectedDifficulty.style.display = 'block';
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';
    backButton.style.display = 'inline-block';
}

function selectChoice(type) {
    gameData.currentType = type;
    const questions = gameData.questions[gameData.currentDifficulty][type];
    questionText.textContent = questions[Math.floor(Math.random() * questions.length)];

    selectedType.innerHTML = type === 'truth'
        ? '<span class="badge bg-info">' + t.truthBadge + '</span>'
        : '<span class="badge bg-danger">' + t.dareBadge + '</span>';

    selectedType.style.display = 'block';
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    choiceButtons.style.display = 'none';
}

function nextQuestion() {
    if (!gameData.currentType || !gameData.currentDifficulty) return;
    const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
    questionText.textContent = questions[Math.floor(Math.random() * questions.length)];
}

function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = t.choose;
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = t.choose;
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
