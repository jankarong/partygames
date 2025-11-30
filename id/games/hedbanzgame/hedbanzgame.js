// Game words - 1000+ Indonesian words
const WORDS = [
    // Hewan (80)
    "Singa", "Harimau", "Gajah", "Jerapah", "Zebra", "Monyet", "Penguin", "Elang", "Lumba-lumba", "Hiu",
    "Anjing", "Kucing", "Beruang", "Kelinci", "Rubah", "Burung Hantu", "Burung Beo", "Ular", "Paus", "Kupu-kupu",
    "Semut", "Lebah", "Laba-laba", "Katak", "Ikan", "Kura-kura", "Buaya", "Babi", "Sapi", "Kuda",
    "Ayam", "Bebek", "Angsa", "Burung Merak", "Flamingo", "Camar", "Elang", "Merpati", "Burung Gagak", "Burung Hantu",
    "Pipit", "Robin", "Burung Kecil", "Kolibri", "Pelatuk", "Burung Gagak", "Burung Hantu", "Buaya", "Biawak", "Iguana",
    "Ular Python", "Ular Kobra", "Kura-kura", "Salamander", "Katak", "Salmon", "Trout", "Ikan Tuna", "Ikan Mas", "Kuda Laut",
    "Gurita", "Cumi-cumi", "Ubur-ubur", "Bintang Laut", "Kepiting", "Lobster", "Udang", "Macan Tutul", "Jaguar", "Puma",
    "Puma", "Hiena", "Serigala", "Koyote", "Serigala Berbintik", "Musang", "Berang-berang", "Berang-berang Pembuat Bendungan", "Tupai", "Tupai Bergaris",
    "Hamster", "Tikus", "Tikus", "Landak", "Landak Berduri", "Tikus Serbet", "Rakun", "Kanguru", "Koala", "Panda",

    // Orang Terkenal (50)
    "Soekarno", "Suharto", "Habibie", "Megawati Soekarnoputri", "Joko Widodo", "Prabowo Subianto", "Susilo Bambang Yudhoyono", "Sinta Nuriyah",
    "Agnez Mo", "Lea Michele", "Raisa Andriana", "Sheryl Sheinafia", "Yuni Shara", "Katon Bagaskara", "Iwan Fals", "Rhoma Irama",
    "Didi Kempot", "Ari Lasso", "Ahmad Dhani", "Tulus", "Peterpan", "Gigi", "Nidji", "Sheila On 7",
    "Raden Bagus", "Presiden Jokowi", "Roy Marten", "Christine Hakim", "Shenina Cinnamon", "Duta Cecilia", "Putri Marino", "Gal Gadot",
    "Eyang Mak Lampir", "Ki Hajar Dewantara", "Bapak Teknologi Indonesia", "Tan Malaka", "Kartini", "Sri Sultan Hamengkubuwono",
    "Nusantara", "Bhinneka Tunggal Ika", "Garuda Pancasila", "Negara Alam Semesta", "Pramudya Ananta Toer",

    // Benda (100)
    "Sepeda", "Telepon", "Televisi", "Komputer", "Cangkir Kopi", "Tempat Tidur", "Pintu", "Jendela", "Kursi", "Meja",
    "Lampu", "Jam", "Buku", "Pena", "Topi", "Sepatu", "Sendok", "Pisau", "Piring", "Jam Tangan",
    "Mobil", "Bus", "Kereta", "Pesawat", "Perahu", "Rumah", "Gedung", "Kastil", "Menara", "Jembatan",
    "Sofa", "Sofa", "Meja Tulis", "Lemari", "Rak", "Kulkas", "Oven", "Microwave", "Mesin Cuci", "Telepon",
    "Tablet", "Laptop", "Monitor", "Keyboard", "Mouse", "Headphone", "Speaker", "Kamera", "Cermin", "Lukisan",
    "Lukisan", "Vas", "Panci", "Wajan", "Ketel", "Blender", "Pemanggang Roti", "Toilet", "Bak Mandi", "Shower",
    "Tas", "Ransel", "Dompet", "Dompet", "Sabuk", "Syal", "Sarung Tangan", "Kaos Kaki", "Kemeja", "Celana",
    "Gaun", "Jaket", "Mantel", "Sweater", "Kaos", "Jeans", "Celana Pendek", "Sepatu Bot", "Sandal", "Sandal Rumah",
    "Kalung", "Cincin", "Gelang", "Anting", "Kacamata", "Kacamata Hitam", "Sepeda", "Sepeda Motor", "Skateboard", "Skuter",
    "Bola", "Bola Sepak", "Bola Basket", "Bola Sepak", "Bola Tenis", "Bola Golf", "Bola Bowling", "Frisbee", "Boomerang", "Layang-layang",

    // Profesi (60)
    "Dokter", "Guru", "Chef", "Polisi", "Pemadam Kebakaran", "Pilot", "Perawat", "Astronot", "Seniman", "Musisi",
    "Pengacara", "Hakim", "Akuntan", "Insinyur", "Arsitek", "Tukang Listrik", "Tukang Ledeng", "Tukang Kayu", "Mekanik", "Petani",
    "Ilmuwan", "Ahli Matematika", "Ahli Bedah", "Dokter Gigi", "Dokter Hewan", "Fotografer", "Sinematografer", "Aktor", "Penyanyi", "Penari",
    "Komedian", "Sutradara", "Produser", "Jurnalis", "Reporter", "Editor", "Penulis", "Novelis", "Penyair", "Pelukis",
    "Pemahat", "Musisi", "Komponis", "Dirigen", "DJ", "Pelatih", "Instruktur", "Atlet", "Wasit", "Wasit",
    "Chef", "Koki", "Tukang Roti", "Bartender", "Pelayan", "Pelayan Perempuan", "Tuan Rumah", "Penjaga Keamanan", "Penggosok", "Tukang Taman",
    "Penjual Bunga", "Penata Rambut", "Penata Rias", "Desainer Mode", "Desainer Interior", "Arsitek", "Walikota", "Gubernur", "Presiden", "Pengusaha",

    // Aktivitas (80)
    "Berenang", "Berlari", "Menari", "Bernyanyi", "Memasak", "Membaca", "Melukis", "Menulis", "Tidur", "Bermain Ski",
    "Hiking", "Panjat", "Melompat", "Berjalan", "Jogging", "Peregangan", "Berolahraga", "Angkat Beban", "Tinju", "Yoga",
    "Meditasi", "Bernafas", "Berpikir", "Bermimpi", "Tertawa", "Menangis", "Tersenyum", "Cemberut", "Berbicara", "Mendengarkan",
    "Berbisik", "Berteriak", "Berteriak", "Bersiul", "Bersenandung", "Bermain Gitar", "Bermain Piano", "Bermain Drum", "Melukis", "Memahat",
    "Menggambar", "Memasak", "Memasak", "Memanggang", "Menggoreng", "Merebus", "Membersihkan", "Mencuci", "Mengeringkan", "Menyeterika",
    "Melipat", "Bekerja", "Belajar", "Pembelajaran", "Pengajaran", "Berbelanja", "Membeli", "Menjual", "Bepergian", "Menjelajahi",
    "Makan", "Minum", "Melempar", "Menangkap", "Menendang", "Mendorong", "Menarik", "Mengemudi", "Terbang", "Berselancar",
    "Membangun", "Menciptakan", "Membuat", "Memperbaiki", "Menambal", "Membuka", "Menutup", "Duduk", "Berdiri", "Berbaring",

    // Olahraga (70)
    "Sepak Bola", "Bola Basket", "Tenis", "Sepak Bola", "Baseball", "Hoki", "Golf", "Bowling", "Tinju", "Selancar",
    "Renang", "Menyelam", "Polo Air", "Mendayung", "Kayak", "Bersepeda", "Bersepeda Gunung", "Ski", "Snowboard", "Seluncur Es",
    "Badminton", "Ping Pong", "Squash", "Bola Tangan", "Lacrosse", "Kriket", "Softball", "Bola Sepak Amerika", "Ragi", "Bola Voli",
    "Bola Voli Pantai", "Netball", "Dodgeball", "Atletik", "Sprint", "Lari Jarak Jauh", "Lompat Tinggi", "Lompat Jauh", "Lompat Galah", "Tolak Peluru",
    "Senam", "Panjat Tebing", "Gulat", "Karate", "Taekwondo", "Judo", "Jiu-jitsu", "Seni Bela Diri", "Pacuan Kuda", "Menunggang Kuda",
    "Sepatu Roda", "Skateboard", "Parkour", "Panahan", "Anggar", "Kendo", "Sumo", "Angkat Beban", "Kickboxing", "Seni Bela Diri Campuran",
    "Triatlon", "Biathlon", "CrossFit", "Pilates", "Zumba", "Aerobik", "Tari", "Kepemimpinan Anak", "Seluncur Angka", "Kecepatan Seluncur",

    // Film (70)
    "Spider-Man", "Superman", "Batman", "Harry Potter", "Frozen", "Titanic", "Raja Singa", "The Avengers", "Shrek", "Toy Story",
    "Menemukan Nemo", "Inside Out", "Coco", "Moana", "Tangled", "Brave", "Cinderella", "Sleeping Beauty", "Snow White", "Pinocchio",
    "Dumbo", "Bambi", "Jungle Book", "Aladdin", "Mulan", "Pocahontas", "Hercules", "Hunchback of Notre Dame", "Tarzan", "The Little Mermaid",
    "Beauty and the Beast", "Enchanted", "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Ant-Man", "Doctor Strange", "Black Panther",
    "Wonder Woman", "Aquaman", "Flash", "The Godfather", "Scarface", "Pulp Fiction", "Inception", "Interstellar", "Avatar", "Avatar 2",
    "Jurassic Park", "Jurassic World", "The Sixth Sense", "Split", "Get Out", "Scream", "Halloween", "Jaws", "The Ring", "Insidious",
    "The Dark Knight", "The Dark Knight Rises", "The Matrix", "The Matrix Reloaded", "Star Wars", "Rogue One", "The Mandalorian", "Lord of the Rings", "The Hobbit", "Conjuring",

    // Acara TV (40)
    "Game of Thrones", "Breaking Bad", "The Office", "Friends", "The Crown", "Stranger Things", "The Mandalorian", "House of the Dragon",
    "Dexter", "The Sopranos", "Mad Men", "Downtown Abbey", "Peaky Blinders", "Ozark", "Bodyguard", "Line of Duty",
    "Schitt's Creek", "Community", "Parks and Recreation", "Brooklyn Nine-Nine", "The Good Place", "Veep", "Russian Doll", "Fleabag",
    "Squid Game", "Money Heist", "Dark", "The Last of Us", "Chernobyl", "Mindhunter", "Tiger King", "Bridgerton",
    "Succession", "The Rings of Power", "House of Dragons", "The Witcher", "Castlevania", "Arcane", "Cyberpunk", "The Boys",

    // Makanan (100)
    "Pizza", "Burger", "Sushi", "Es Krim", "Cokelat", "Apel", "Pisang", "Kue", "Kopi", "Pasta",
    "Steak", "Ayam", "Ikan", "Salmon", "Roti", "Bagel", "Donat", "Muffin", "Kuki", "Brownie",
    "Pai", "Tart", "Pastri", "Croissant", "Sandwich", "Hot Dog", "Taco", "Burrito", "Enchilada", "Quesadilla",
    "Nachos", "Salsa", "Guacamole", "Sup", "Semur", "Kari", "Cabai", "Ramen", "Mie", "Bakso",
    "Salad", "Bayam", "Selada", "Tomat", "Mentimun", "Wortel", "Brokoli", "Kentang", "Jagung", "Keju",
    "Susu", "Yoghurt", "Mentega", "Telur", "Ham", "Bacon", "Sosis", "Udang", "Lobster", "Kepiting",
    "Tiram", "Kerang", "Nasi", "Kacang", "Kacang Polong", "Lentil", "Hummus", "Kacang Tanah", "Almond", "Kenari",
    "Jeruk", "Strawberry", "Blueberry", "Raspberry", "Semangka", "Nanas", "Mangga", "Persik", "Kelapa", "Alpukat",
    "Acar", "Zaitun", "Bawang Putih", "Bawang Merah", "Lada Hitam", "Garam", "Gula", "Madu", "Jam", "Selai Kacang",
    "Mayo", "Ketchup", "Mustard", "Saus Pedas", "Saus Kedelai", "Cuka", "Minyak", "Lemon", "Jeruk Nipis", "Jahe",

    // Negara (60)
    "Perancis", "Jepang", "Mesir", "Brasil", "Kanada", "Australia", "India", "Jerman", "Meksiko", "Italia",
    "Spanyol", "Portugal", "Yunani", "Turki", "Rusia", "Cina", "Korea Selatan", "Vietnam", "Thailand", "Filipina",
    "Indonesia", "Malaysia", "Singapura", "Hong Kong", "Taiwan", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan",
    "Iran", "Irak", "Arab Saudi", "Uni Emirat Arab", "Israel", "Lebanon", "Suriah", "Yordania", "Sudan", "Libya",
    "Tunisia", "Maroko", "Aljazair", "Kenya", "Tanzania", "Uganda", "Afrika Selatan", "Zimbabwe", "Nigeria", "Ghana",
    "Amerika Serikat", "Inggris", "Irlandia", "Skotlandia", "Wales", "Swedia", "Norwegia", "Finlandia", "Denmark", "Polandia",
    "Republik Ceko", "Hungaria", "Rumania", "Bulgaria", "Kroasia", "Serbia", "Austria", "Swiss", "Belgia", "Belanda",

    // Emosi (60)
    "Bahagia", "Sedih", "Marah", "Terkejut", "Takut", "Bersemangat", "Bingung", "Bangga", "Gugup", "Santai",
    "Cemas", "Stres", "Tertekan", "Optimis", "Pesimis", "Iri Hati", "Iri", "Bersyukur", "Malu", "Malu",
    "Percaya Diri", "Tidak Aman", "Berani", "Pengecut", "Determined", "Termotivasi", "Keputusasaan", "Frustrasi", "Kesal", "Kesal",
    "Terhibur", "Hiburan", "Bosan", "Tertarik", "Ingin Tahu", "Jijik", "Jatuh Cinta", "Kasih Sayang", "Acuh", "Passionate",
    "Apatis", "Energik", "Lesu", "Tenang", "Gelisah", "Damai", "Turbulent", "Gembira", "Senang", "Puas",
    "Puas", "Puas", "Tidak Puas", "Tidak Puas", "Gelisah", "Tenang", "Mencintai", "Membenci", "Kasih Sayang", "Dingin",

    // Bagian Tubuh (50)
    "Kepala", "Otak", "Mata", "Hidung", "Mulut", "Gigi", "Lidah", "Telinga", "Rambut", "Wajah",
    "Leher", "Bahu", "Lengan", "Siku", "Tangan", "Jari", "Ibu Jari", "Dada", "Perut", "Punggung",
    "Pinggang", "Pinggul", "Kaki", "Lutut", "Pergelangan Kaki", "Kaki", "Jari-jari Kaki", "Tumit", "Tulang Kering", "Paha",
    "Jantung", "Paru-paru", "Hati", "Ginjal", "Kulit", "Tulang", "Otot", "Pembuluh Darah", "Arteri", "Saraf",
    "Kuku", "Alis", "Bulu Mata", "Bibir", "Dagu", "Pipi", "Dahi", "Telapak Tangan", "Pergelangan Tangan", "Rusuk",

    // Minuman (40)
    "Air", "Kopi", "Teh", "Jus", "Susu", "Limonade", "Bir", "Anggur", "Whiskey", "Vodka",
    "Rum", "Tequila", "Gin", "Cognac", "Champagne", "Prosecco", "Limonade", "Teh Dingin", "Smoothie", "Milkshake",
    "Café Latte", "Cappuccino", "Espresso", "Americano", "Mocha", "Macchiato", "Flat White", "Teh Hijau", "Teh Hitam", "Teh Oolong",
    "Teh Herbal", "Teh Chamomile", "Teh Peppermint", "Teh Jahe", "Air Kelapa", "Minuman Energi", "Minuman Olahraga", "Punch", "Cider", "Kombucha",

    // Pakaian (50)
    "Kemeja", "T-shirt", "Celana", "Jeans", "Celana Pendek", "Rok", "Gaun", "Jaket", "Mantel", "Sweater",
    "Hoodie", "Rompi", "Jas", "Dasi", "Sabuk", "Topi", "Topi Bisbol", "Beanie", "Syal", "Sarung Tangan",
    "Kaos Kaki", "Pakaian Dalam", "Bra", "Boxer", "Piyama", "Pakaian Renang", "Bikini", "Celana Renang", "Sepatu Bot", "Sepatu",
    "Sneaker", "Sandal", "Sandal Rumah", "Tumit", "Flat", "Loafer", "Flip Flop", "Sepatu Kayu", "Oxford", "Pump",
    "Kalung", "Cincin", "Gelang", "Anting", "Liontin", "Peniti", "Jam Tangan", "Kacamata", "Kacamata Hitam", "Topeng",

    // Cuaca (40)
    "Cerah", "Hujan", "Mendung", "Bersalju", "Berangin", "Badai", "Berkabut", "Hujan Es", "Hujan Salju", "Guntur",
    "Kilat", "Pelangi", "Tornado", "Badai Besar", "Badai Salju", "Kekeringan", "Gelombang Panas", "Dingin", "Es Beku", "Embun",
    "Kelembaban", "Angin Sepoi-sepoi", "Angin Kencang", "Taifun", "Siklon", "Musim", "Longsoran Salju", "Tsunami", "Gempa Bumi", "Gunung Berapi",
    "Hujan", "Salju", "Es", "Angin", "Awan", "Matahari", "Bulan", "Bintang", "Meteor", "Komet",

    // Musik (50)
    "Rock", "Pop", "Hip Hop", "Rap", "Country", "Blues", "Jazz", "Klasik", "Elektronik", "Dansa",
    "Reggae", "Metal", "Punk", "Folk", "Gospel", "Opera", "R&B", "Soul", "Indie", "Alternative",
    "Grunge", "Techno", "House", "Trance", "Disco", "Funk", "Swing", "Salsa", "Tango", "Waltz",
    "Ballet", "Tap Dance", "Jazz Dance", "Contemporary", "Breakdancing", "Musical Theatre", "Karaoke", "Konser", "Festival", "Band",
    "Orkestra", "Paduan Suara", "Gitar", "Piano", "Drum", "Biola", "Trompet", "Saxophone", "Flute", "Harmonika",

    // Sekolah/Pembelajaran (40)
    "Sekolah", "Universitas", "Perguruan Tinggi", "Siswa", "Guru", "Ruang Kelas", "Meja", "Papan Tulis", "Papan Putih", "Pensil",
    "Penghapus", "Buku", "Buku Catatan", "Tas", "Loker", "Koridor", "Kantin", "Taman Bermain", "Gym", "Perpustakaan",
    "Lab Komputer", "Lab Sains", "Kelas Seni", "Kelas Musik", "Matematika", "Bahasa Inggris", "Sejarah", "Geografi", "Sains", "Fisika",
    "Kimia", "Biologi", "Sastra", "Filosofi", "Psikologi", "Sosiologi", "Ekonomi", "Bisnis", "Hukum", "Kedokteran",

    // Hewan (sederhana, lanjutan)
    "Kelinci Kecil", "Anak Anjing", "Anak Kucing", "Anak Domba", "Anak Ayam", "Anak Bebek", "Anak Babi", "Anak Sapi", "Foal", "Poni",
    "Kambing", "Domba", "Sapi", "Banteng", "Sapi Jantan", "Keledai", "Bagal", "Unta", "Llama", "Alpaka",
    "Rusa", "Elk", "Moose", "Rusa Kutub", "Antelope", "Kerbau", "Bison", "Yak", "Zebra", "Jerapah",

    // Benda Sederhana (lanjutan)
    "Mainan", "Boneka", "Aksi Angka", "Puzzle", "Permainan", "Kartu", "Dadu", "Kelereng", "Yo-Yo", "Layang-layang",
    "Sepeda", "Tricycle", "Skuter", "Skateboard", "Roller Skate", "Roller Blade", "Kereta Luncur", "Toboggan", "Papan Selancar", "Skateboard",
    "Ember", "Sekop", "Rakitan", "Sapu", "Pel", "Handuk", "Selimut", "Bantal", "Bantal", "Kasur",
    "Tali", "Benang", "Kawat", "Rantai", "Kait", "Paku", "Sekrup", "Bolt", "Mur", "Wrench",

    // Tindakan (sederhana, lanjutan)
    "Melompat", "Lompat Tali", "Lompat", "Merangkak", "Panjat", "Meluncur", "Berayun", "Berguling", "Berputar", "Memuntir",
    "Membengkokkan", "Meregangkan", "Menjangkau", "Menangkap", "Memegang", "Melepaskan", "Melempar", "Menangkap", "Menendang", "Mendorong",
    "Menarik", "Menyeret", "Mengangkat", "Menurunkan", "Mengangkat", "Menjatuhkan", "Memantul", "Berguling", "Meluncur", "Meluncur",
    "Melambai", "Menunjuk", "Bertepuk Tangan", "Menjepit Jari", "Menginjak", "Menepuk", "Memukul", "Menggosok", "Menggelitik", "Menggaruk",

    // Hari Raya (30)
    "Natal", "Halloween", "Paskah", "Hari Valentine", "Hari Terima Kasih", "Hari Kemerdekaan", "Tahun Baru", "Hanukkah", "Diwali", "Idul Fitri",
    "Hari Ibu", "Hari Ayah", "Ulang Tahun", "Ulang Tahun", "Pernikahan", "Kue Pernikahan", "Wisuda", "Prom", "Karnaval", "Parade",
    "Festival", "Konser", "Hari Olahraga", "Hari Sekolah", "Hari Kerja", "Liburan", "Hari Libur", "Akhir Pekan", "Hari Kerja", "Malam Ini",

    // Mainan & Game (40)
    "Lego", "Blok Bangunan", "Boneka", "Aksi Angka", "Teddy Bear", "Binatang Mainan", "Puzzle", "Permainan Papan", "Permainan Kartu", "Video Game",
    "Konsol Game", "PlayStation", "Xbox", "Nintendo Switch", "Permainan Komputer", "Permainan Ponsel", "Permainan Arcade", "Permainan Casino", "Dadu", "Kartu",
    "Spidol", "Pensil Warna", "Pensil Warna", "Cat", "Kuas", "Palet", "Kanvas", "Buku Sketsa", "Papan Putih", "Stiker",
    "Balon", "Confetti", "Pita", "Banner", "Dekorasi", "Topi Pesta", "Peluit Pesta", "Topeng", "Kostum", "Makeup",

    // Transportasi (30)
    "Mobil", "Truk", "Bus", "Van", "Kereta", "Metro", "Trem", "Taksi", "Sepeda", "Motor",
    "Pesawat", "Helikopter", "Balon Udara Panas", "Kapal Layar", "Speedboat", "Yacht", "Kapal Selam", "Roket", "Pesawat Ruang Angkasa", "Hovercraft",
    "Skateboard", "Roller Skate", "Skuter", "Segway", "Kuda", "Unta", "Gajah", "Perahu", "Kano", "Kayak",

    // Dapur (30)
    "Kulkas", "Freezer", "Kompor", "Oven", "Microwave", "Pencuci Piring", "Wastafel", "Meja Konter", "Meja", "Kursi",
    "Pisau", "Garpu", "Sendok", "Piring", "Mangkuk", "Cangkir", "Gelas", "Mug", "Panci", "Wajan",
    "Spatula", "Sendok Kayu", "Pengaduk", "Blender", "Pemanggang Roti", "Ketel", "Pembuat Kopi", "Pembuka Kaleng", "Pengupas", "Parutan",

    // Kamar Tidur (25)
    "Tempat Tidur", "Bantal", "Selimut", "Sprei", "Selimut", "Kasur", "Kepala Tempat Tidur", "Meja Samping", "Lemari Pakaian", "Lemari",
    "Lemari Pakaian", "Lemari Kabinet", "Rak", "Cermin", "Lampu", "Jam Alarm", "Jendela", "Gorden", "Blind", "Pintu",
    "Karpet", "Karpet", "Kursi", "Meja Tulis", "Laci", "Gantungan Mantel",

    // Kamar Mandi (20)
    "Toilet", "Bak Mandi", "Shower", "Wastafel", "Keran", "Cermin", "Lemari Obat", "Pemegang Handuk", "Dispenser Sabun", "Pemegang Sikat Gigi",
    "Tempat Sampah", "Kertas Toilet", "Karpet Mandi", "Tirai Shower", "Sikat Gigi", "Pasta Gigi", "Sisir", "Sikat", "Timbangan", "Sabun",

    // Kata Kerja Sederhana (40)
    "Makan", "Minum", "Tidur", "Bangun", "Berlari", "Berjalan", "Duduk", "Berdiri", "Melompat", "Menari",
    "Bernyanyi", "Berteriak", "Berbisik", "Tertawa", "Menangis", "Tersenyum", "Cemberut", "Mengedip", "Mengangguk", "Menggelengkan Kepala",
    "Melambai", "Menunjuk", "Bertepuk Tangan", "Menjepit Jari", "Menendang", "Memukul", "Melempar", "Menangkap", "Memegang", "Menjatuhkan",
    "Mengambil", "Mengambil", "Memberikan", "Mendapatkan", "Membuat", "Melakukan", "Pergi", "Datang", "Tinggal", "Pergi",

    // Kata Sifat Sederhana (40)
    "Besar", "Kecil", "Tinggi", "Pendek", "Panjang", "Lebar", "Sempit", "Tebal", "Tipis", "Cepat",
    "Lambat", "Panas", "Dingin", "Hangat", "Sejuk", "Lembut", "Keras", "Kasar", "Halus", "Basah",
    "Kering", "Bersih", "Kotor", "Cerah", "Gelap", "Terang", "Berat", "Ringan", "Kuat", "Lemah",
    "Baik", "Buruk", "Benar", "Salah", "Benar", "Palsu", "Baru", "Tua", "Muda", "Kuno",

    // Warna (20)
    "Merah", "Biru", "Kuning", "Hijau", "Oranye", "Ungu", "Merah Muda", "Coklat", "Hitam", "Putih",
    "Abu-abu", "Abu-abu", "Perak", "Emas", "Beige", "Turquoise", "Cyan", "Magenta", "Lime", "Navy",

    // Angka (20)
    "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh",
    "Sebelas", "Dua Belas", "Tiga Belas", "Empat Belas", "Lima Belas", "Dua Puluh", "Tiga Puluh", "Seratus", "Seribu", "Sejuta",

    // Bentuk (15)
    "Lingkaran", "Persegi", "Segitiga", "Persegi Panjang", "Pentagon", "Hexagon", "Octagon", "Oval", "Diamond", "Bintang",
    "Hati", "Kubus", "Sphere", "Kerucut", "Silinder", "Pyramid", "Prism",

    // Bulan (12)
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember",

    // Hari (7)
    "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu",

    // Musim (4)
    "Musim Semi", "Musim Panas", "Musim Gugur", "Musim Dingin",
];

// Game state
let state = {
    players: 2,
    duration: 60,
    currentPlayer: 1,
    scores: {},
    currentWord: null,
    usedWords: [],
    currentScore: 0,
    timeLeft: 60,
    timerInterval: null,
    isPlaying: false
};

// DOM elements
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const playerCountSelect = document.getElementById('playerCount');
const durationSelect = document.getElementById('duration');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const gameTimer = document.getElementById('timer');
const wordDisplay = document.getElementById('wordDisplay');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const scoreDisplay = document.getElementById('playerScore');
const nextPlayerBtn = document.getElementById('nextPlayerBtn');

// Initialize game
startBtn.addEventListener('click', () => {
    const playerCount = parseInt(playerCountSelect.value);
    const duration = parseInt(durationSelect.value);

    state.players = playerCount;
    state.duration = duration;
    state.timeLeft = duration;

    // Initialize scores
    state.scores = {};
    for (let i = 1; i <= playerCount; i++) {
        state.scores[i] = 0;
    }

    // Shuffle words
    state.usedWords = [];

    // Show ready screen
    setupScreen.style.display = 'none';
    readyScreen.style.display = 'block';
    updateReadyScreen();
});

function updateReadyScreen() {
    document.getElementById('readyNumber').textContent = state.currentPlayer;
    nextPlayerBtn.addEventListener('click', startGame, { once: true });
}

function startGame() {
    state.isPlaying = true;
    readyScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
    state.currentScore = 0;
    state.timeLeft = state.duration;

    updateDisplay();
    startTimer();
}

function getNextWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    return word;
}

function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        gameTimer.textContent = state.timeLeft;

        if (state.timeLeft === 0) {
            endTurn();
        }
    }, 1000);
}

function handleCorrect() {
    if (!state.isPlaying) return;

    state.currentScore++;
    state.scores[state.currentPlayer]++;
    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
    scoreDisplay.textContent = state.currentScore;
}

function handleSkip() {
    if (!state.isPlaying) return;

    state.currentWord = getNextWord();
    wordDisplay.textContent = state.currentWord;
}

function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentPlayer < state.players) {
        state.currentPlayer++;
        gameScreen.style.display = 'none';
        readyScreen.style.display = 'block';
        updateReadyScreen();
    } else {
        showResults();
    }
}

function updateDisplay() {
    currentPlayerDisplay.textContent = `Pemain ${state.currentPlayer}`;
    scoreDisplay.textContent = state.currentScore;
}

function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    const scoresContainer = document.getElementById('finalScores');
    scoresContainer.innerHTML = '';

    for (let i = 1; i <= state.players; i++) {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.innerHTML = `Pemain ${i} <strong>${state.scores[i]}</strong>`;
        scoresContainer.appendChild(row);
    }

    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', () => {
        state.currentPlayer = 1;
        setupScreen.style.display = 'block';
        resultsScreen.style.display = 'none';
    });
}

// Event listeners
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});

skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleSkip();
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
        });
    });
});
