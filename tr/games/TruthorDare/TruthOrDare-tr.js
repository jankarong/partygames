// Game data
const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                // Light and Fun
                "Bir hayvana dönüşme şansın olsaydı bu ne olurdu?",
                "En tuhaf çocukluk fanteziniz neydi?",
                "En sevdiğiniz emoji hangisi?",
                "Bir günlüğüne görünmez olsaydınız ne yapardınız?",
                "En sevdiğiniz film alıntısı nedir?",
                "Şimdiye kadar yaptığınız en sıkıcı şey nedir?",
                "En sevdiğiniz çocukluk anınız nedir?",
                "En çok gurur duyduğun şey nedir?",
                "En büyük korkunuz nedir?",
                "En sevdiğiniz çizgi film karakteri hangisi?",
                "Hangi beceriyi öğrenebilmeyi isterdin?",
                "En sevdiğiniz mevsim hangisi?",
                "Günün en sevdiğiniz saati hangisi?",
                "Hangi evcil hayvana sahip olmak isterdin?",
                "En sevdiğiniz hava hangisi?",
                "En çok hangi tema parkını ziyaret etmek istersiniz?",
                "En sevdiğiniz atıştırmalık hangisi?",
                "Bir gün boyunca hangi işi denemek isterdin?",
                "En sevdiğiniz koku hangisi?",
                "Nasıl bir evde yaşamak isterdiniz?",
                
                // Creative Imagination
                "Eğer herhangi bir süper güce sahip olabilseydin bu ne olurdu?",
                "Zamanda yolculuk yapma imkanınız olsaydı neyi değiştirirdiniz?",
                "Bir günlüğüne herhangi bir ünlü olma şansın olsaydı kimi seçerdin?",
                "En sevdiğiniz kurgusal karakter kim?",
                "Yeni bir yiyecek icat etme şansınız olsaydı bu ne olurdu?",
                "En sevdiğiniz tatil hangisi ve neden?",
                "Herhangi bir film veya dizi dünyasında yaşayabilseydiniz bu hangisi olurdu?",
                "Hayalinizdeki seyahat hedefi neresi?",
                "Dünyayla ilgili bir şeyi değiştirebilseydiniz bu ne olurdu?",
                "En sevdiğiniz çocukluk oyunu hangisi?",
                "Yeni bir tatil yaratabilseydin bu ne olurdu?",
                "Herhangi bir tarihi figürle sohbet etme şansın olsaydı kimi seçerdin?",
                "Herhangi bir büyülü eşyaya sahip olabilseydin bu ne olurdu?",
                "Herhangi bir kitabın ana karakteri olma şansınız olsaydı hangisini seçerdiniz?",
                "Hayalinizdeki evi inşa edebilseydiniz neye benzerdi?",
                "Eğer bir film çekebilseydiniz bu hangi tür olurdu?",
                "Herhangi bir mağaza açma şansınız olsa bu ne olurdu?",
                "Bir oyun tasarlasaydınız bu ne tür olurdu?",
                "Eğer bir robot asistanınız olsaydı onun ne yapmasını isterdiniz?",
                "Yeni bir spor yaratabilseydin bu ne olurdu?",
                
                // Daily Preferences
                "En sevdiğiniz yemek hangisi?",
                "En sevdiğiniz içecek hangisi?",
                "En sevdiğiniz renk nedir?",
                "En sevdiğiniz müzik türü nedir?",
                "En sevdiğiniz spor hangisi?",
                "En sevdiğiniz kitap hangisi?",
                "En sevdiğiniz film hangisi?",
                "En sevdiğiniz TV şovu hangisi?",
                "En sevdiğiniz oyun hangisi?",
                "En sevdiğiniz sosyal medya platformu hangisi?",
                "En sevdiğiniz meyve hangisi?",
                "En sevdiğiniz sebze hangisi?",
                "En sevdiğiniz içecek hangisi?",
                "En sevdiğiniz tatlı hangisi?",
                "En sevdiğiniz kahvaltı hangisi?",
                "En sevdiğiniz akşam yemeği hangisi?",
                "En sevdiğiniz fast food hangisi?",
                "En sevdiğiniz dondurma aroması hangisi?",
                "Ne tür kahve seversiniz?",
                "En sevdiğiniz çay hangisi?",
                
                // Friendly Personal Questions
                "Kendinizle ilgili en çok neyi beğeniyorsunuz?",
                "Hangi dileğinizin gerçekleşmesini istiyorsunuz?",
                "En çok kime minnettarsınız?",
                "Başınıza gelen en mutlu şey nedir?",
                "Başınıza gelen en şaşırtıcı şey nedir?",
                "Hangi enstrümanı öğrenmek istersiniz?",
                "Hangi dile hakim olmak istersiniz?",
                "Hangi ülkeyi ziyaret etmek istersiniz?",
                "En çok kiminle tanışmak isterdin?",
                "En değerli varlığınız nedir?",
                "En unutulmaz doğum günün hangisiydi?",
                "En sevdiğiniz öğretmeniniz kimdi?",
                "En iyi arkadaşınızı özel kılan şey nedir?",
                "Hangi anıyı yeniden yaşamak istersiniz?",
                "Hangi alışkanlığınızı geliştirmek istersiniz?",
                
                // Hobbies and Interests
                "En sevdiğiniz açık hava etkinliği nedir?",
                "En sevdiğiniz kapalı mekan etkinliği nedir?",
                "Ne toplamayı seversin?",
                "Hangi yeni hobiyi denemek istersiniz?",
                "En sevdiğiniz sanat formu hangisi?",
                "Hangi dansı öğrenmek istersiniz?",
                "En sevdiğiniz el işi projeniz nedir?",
                "Hangi etkinliğe katılmak istersiniz?",
                "Ne tür okumaktan hoşlanırsınız?",
                "Hangi teknolojide uzmanlaşmak istersiniz?",
                
                // Dreams and Goals
                "10 yıl sonra nasıl bir insan olmak istiyorsunuz?",
                "Hangi mücadeleyi tamamlamak istersiniz?",
                "Hangi grup insana yardım etmek istersiniz?",
                "Hangi sosyal sorunu çözmek istersiniz?",
                "Nasıl bir miras bırakmak istersiniz?",
                "Neyle hatırlanmak istiyorsun?",
                "Nasıl bir etki yaratmak istersiniz?",
                "Ne yaratmak istersiniz?",
                "Hangi dünya problemini değiştirmek istersiniz?",
                "Hangi sosyal değeri teşvik etmek istersiniz?",
                
                // Life Philosophy
                "Sizce en önemli kalite nedir?",
                "Hangi hayat mottosuna inanıyorsunuz?",
                "Sizce gerçek başarı nedir?",
                "Sizce en büyük mutluluk nedir?",
                "Arkadaşlıkta en önemli şey nedir?",
                "Sizce en güzel hediye nedir?",
                "Kendinizi en çok ne zaman başarılı hissediyorsunuz?",
                "Sizce öğrenmenin en iyi yolu nedir?",
                "En önemli yaşam becerisi nedir?",
                "Hayatı anlamlı kılan şey nedir?",
                
                // Fun Hypotheticals
                "Sınırsız paranız olsaydı ne yapardınız?",
                "Eğer zihin okuyabilseydin bunu ne için kullanırdın?",
                "Uçabilseydin ilk nereye giderdin?",
                "Eğer zamanı durdurabilseydin ne yapardın?",
                "Eğer görünmez olabilseydin nereye giderdin?",
                "Hayvanlarla konuşabilseydin hangi hayvanla sohbet ederdin?",
                "Eğer ışınlanabilseydin nereye giderdin?",
                "Geleceği görebilseydiniz ne bilmek isterdiniz?",
                "Tarihi bir figürü geri getirebilseydiniz kimi seçerdiniz?",
                "Eğer dünyadan bir şeyi ortadan kaldırabilseydiniz bu ne olurdu?"
            ],
            dare: [
                // Light Comedy
                "Walk like a penguin",
                "Talk in a weird voice until the next round",
                "Imitate a celebrity until the next round",
                "Wear socks as gloves for 5 minutes",
                "Burnunuzu (veya dirseğinizi) yalamayı deneyin",
                "Say 'I'm so handsome/beautiful' to the mirror 10 times",
                "Speak with a fake foreign accent for 5 minutes",
                "Act like a cat - movements and sounds",
                "Act like a dog - movements and sounds",
                "Pretend to be a robot when speaking",
                "Kıçınla mektup yaz",
                "Gözleriniz kapalı bir otoportre çizin",
                "Adını ayak parmaklarınla ​​kalem tutarak yaz",
                "Imitate a baby crying for 30 seconds",
                "Pretend to swim",
                "Walk like an elderly person",
                "Hop like a frog 10 times",
                "Strike a superhero pose",
                "Pretend to drive a car",
                "Imitate a sneeze sound",
                
                // Skill Demonstrations
                "10 şınav çek",
                "Stand on one foot for 1 minute",
                "Perform a dance",
                "Sing a complete song",
                "Say a tongue twister",
                "Şaka söyle",
                "Kısa bir oyun gerçekleştirin",
                "Draw a self-portrait",
                "5 mekik yapın",
                "Say a complete sentence backwards",
                "Sing 'Happy Birthday' in English",
                "Imitate a commercial",
                "Perform a magic trick",
                "Yoga pozu yapın",
                "Clap with one hand 10 times",
                "Walk straight with eyes closed for 10 steps",
                "Bir kitabı başınızın üstünde dengeleyerek yürüyün",
                "Spin in place 10 times",
                "50 kez ip atlayın (bir ipiniz varmış gibi davranın)",
                "Make a funny face",
                
                // Friendly Interactions
                "Give someone a hug",
                "Give someone a small gift",
                "Give someone a surprise",
                "Sincerely compliment someone",
                "Praise everyone present",
                "Give someone a shoulder massage",
                "High-five someone 10 times",
                "Give someone a high-five",
                "Dance with someone",
                "Birinin saçınıza şekil vermesine izin verin",
                "Sing with someone",
                "Give someone a flying kiss",
                "Birisiyle taş-kağıt-makas oyna",
                "Birine bir hikaye anlat",
                "Exercise with someone",
                "Greet someone",
                "Take a photo with someone",
                "Give someone a blessing",
                "Share snacks with someone",
                "Give someone a smile",
                
                // Mild Social Media
                "Arkadaşlarınıza teşekkür mesajı gönderin",
                "Post a funny selfie",
                "Post an inspirational quote",
                "'Ne güzel bir gün!' yazısını yayınlayın",
                "Like a friend's last 10 posts",
                "Post a food photo",
                "En sevdiğiniz şarkıyı paylaşın",
                "Post good morning/good night",
                "Post a landscape photo",
                "Share a positive quote",
                "Post about pets",
                "Share an interesting video",
                "Post about exercise",
                "Recommend a good book",
                "Post about food experiences",
                "Share a travel memory",
                "Post about learning experiences",
                "Share a heartwarming story",
                "Post about family",
                "Share an inspirational image",
                
                // Creative Expression
                "Başkalarının tahmin etmesi için bir kelimeyi hecelemek için vücudunuzu kullanın",
                "1 dakika boyunca konuşmadan sessiz sinema oynayın",
                "Make animal sounds",
                "Perform a mime act",
                "Read a passage in different voices",
                "Make up a story on the spot",
                "Imitate an animated character",
                "Imitate baby talk",
                "Express emotions like emojis",
                "Imitate people of different professions speaking",
                "Act out a fairy tale",
                "Use hand shadows to show an animal",
                "Imitate people of different ages",
                "Act out a movie scene",
                "Enstrümanları taklit etmek için sesinizi kullanın",
                "Act out weather changes",
                "Imitate different vehicles",
                "Zamanı göstermek için vücudunuzu kullanın",
                "Express different emotions",
                "Imitate famous quotes from celebrities",
                
                // Art Creation
                "Draw a simple picture",
                "Fold a paper airplane",
                "Make a small animal with clay",
                "Write a short poem",
                "Design a badge",
                "Create a simple dance move",
                "Draw a simple comic",
                "Make a simple craft",
                "Design a new emoji",
                "Create a new word",
                "Write simple song lyrics",
                "Bir oyun kuralı tasarlayın",
                "Draw a greeting card",
                "Make a paper hat",
                "Create a hand dance",
                "Design a slogan",
                "Draw a mind map",
                "Make a simple collage",
                "Create a chant",
                "Design a simple logo"
            ]
        },
        spicy: {
            truth: [
                // Personal Deep Privacy
                "En son ne zaman yalan söyledin? Kime?",
                "Burada hiç gizlice birinden hoşlandın mı?",
                "En utanç verici anınız nedir?",
                "Seni en çok ne ağlattı?",
                "Kime aşık oldun? Hala konuşuyor musun?",
                "En unutulmaz romantik deneyiminiz nedir?",
                "İdeal randevunuz nasıl?",
                "Aşk uğruna yaptığınız en çılgın şey nedir?",
                "Kendinizle ilgili en az sevdiğiniz şey nedir?",
                "Kendinizi en çok ne zaman suçlu hissettiniz?",
                "Başkalarının bilmediği alışkanlığınız nedir?",
                "En büyük pişmanlığın ne?",
                "Yaptığınız en dürtüsel şey nedir?",
                "Birine en çok ne söylemek istersin?",
                "Başkalarının bilmesini istemediğiniz şey nedir?",
                "Yaptığınız en çocukça şey nedir?",
                "En çok hangi anıyı unutmak istiyorsun?",
                "Gelecekle ilgili en büyük endişeniz nedir?",
                "Keşfedilmesini istemediğin gizlice ne yaptın?",
                "Yaptığınız en utanç verici şey nedir?",
                
                // Romance and Relationships (Edgy but Safe)
                "İlk öpücüğünüz nasıldı?",
                "Hiç karmaşık bir ilişki yaşadınız mı?",
                "Hiç aldattın mı ya da bunu düşündün mü?",
                "Yaşadığınız en kötü ayrılık neydi?",
                "Ayrılık sırasında söylediğiniz en sert şey nedir?",
                "Kaç erkek/kız arkadaşın oldu?",
                "En çok kiminle çıkmak isterdin?",
                "Bir ilişkide söylediğiniz en büyük yalan nedir?",
                "Hiç belirsiz bir ilişkiniz oldu mu?",
                "Sevmediğiniz biriyle para karşılığında çıkar mısınız?",
                "Hiç birinin telefonuna baktınız mı?",
                "Hiç çevrimiçi bir ilişkiniz oldu mu?",
                "Arkadaşınızın eski sevgilisiyle çıkar mıydınız?",
                "En çok hangi eski sevgilinizle tekrar bir araya gelmek istersiniz?",
                "Birisi hakkında gördüğünüz en çılgın rüya nedir?",
                "Hiç aynı cinsiyetten birine ilgi duydunuz mu?",
                "En çok hangi ünlüyle birlikte olmak isterdin?",
                "Açık bir ilişkiyi kabul eder misiniz?",
                "Hiç bir öğretmene veya otorite figürüne karşı hisleriniz oldu mu?",
                "En büyük romantik fanteziniz nedir?",
                
                // Sharp Interpersonal Relations
                "Bir arkadaşınıza neden kızdınız?",
                "Ailene ne için kızdın?",
                "Buradaki birinin en çok hangi özelliğinden nefret ediyorsunuz?",
                "Burada birinin arkasından ne söyledin?",
                "Buradaki birinin neyini kıskanıyorsun?",
                "Sizce burada en sahte olan kim?",
                "Sizce burada en narsist kim?",
                "En çok kimi tokatlamak istersin?",
                "Sizce şu anki hayatını en az hak eden kim?",
                "En çok hangi tip insanı küçümsersiniz?",
                "Kırdığın en masum insan kim?",
                "En çok kimden intikam almak istersiniz?",
                "Söylediğin en kötü şey neydi?",
                "Yaptığın en kötü şey nedir?",
                "En çok kimin sırrını açığa çıkarmak istersiniz?",
                "Sizce en başarısız hayatı kim yaşıyor?",
                "Birinden en çok ne almak istersiniz?",
                "En çok kimin başarısız olmasını istersiniz?",
                "Sizce burada en sahtekar kim?",
                "En çok kiminle bağınızı koparmak istersiniz?",
                
                // Moral Boundaries (Safe Version)
                "Söylediğin en büyük yalan nedir?",
                "Hangi önemli gerçeği sakladınız?",
                "Seni en çok seven birini aldattın mı?",
                "Size en çok güvenen birine ihanet ettiniz mi?",
                "Birinin zayıflığından faydalandın mı?",
                "Kişisel çıkarınız için bir arkadaşınıza zarar verdiniz mi?",
                "Yanlış bilgi mi yaydınız?",
                "Yardıma ihtiyacı olan birini kasıtlı olarak görmezden mi geldiniz?",
                "Kendi çıkarınız için başkalarını feda ettiniz mi?",
                "Yanlış olduğunu bildiğiniz bir şeyi yapmaya devam ettiniz mi?",
                "Kendi ilkelerinizi ihlal mi ettiniz?",
                "Görünüş uğruna vicdanınıza aykırı bir şey yaptınız mı?",
                "Birinin başarısını kıskandın mı?",
                "Hiç birinin talihsizliğinden zevk aldınız mı?",
                "Hiç yere düşen birine tekme attınız mı?",
                "Birine kötü niyetle iftira attınız mı?",
                "Birisine kasıtlı olarak soğuk davrandınız mı?",
                "İntikam için ne yaptın?",
                "En çok ne zaman bencil oldun?",
                "En çok ne zaman ikiyüzlü oldun?",
                
                // Inner Challenge
                "En karanlık düşüncen ne?",
                "En çok yapmak istediğin ama cesaret edemediğin şey nedir?",
                "En utanç verici sırrınız nedir?",
                "En çok hangi geçmişi örtbas etmek istersiniz?",
                "İnsanların en az hangi zayıf noktasını bilmesini istersiniz?",
                "En çok kaçınmak istediğiniz sorumluluk hangisidir?",
                "Açığa çıkmasından en çok korktuğunuz yalan hangisi?",
                "En çok istediğin ama elde edemediğin şey nedir?",
                "En çok olmak istediğin ama imkansız olduğunu düşündüğün şey ne?",
                "En çok unutmak istediğin ama unutamadığın şey nedir?",
                "En çok affetmek istediğiniz ama yapamadığınız şey nedir?",
                "En çok neyi kurtarmak istiyorsunuz ama yapamıyorsunuz?",
                "En çok değiştirmek istediğiniz ama değiştiremediğiniz şey nedir?",
                "En çok kaçmak istediğin ama başaramadığın şey nedir?",
                "Sizce en büyük başarısızlığınız nedir?",
                "Yapmadığınıza en çok pişman olduğunuz şey nedir?",
                "Kaybetmekten en çok korktuğunuz şey nedir?",
                "Yüzleşmekten en çok korktuğunuz gerçeklik hangisi?",
                "Başkalarına en çok neyi kanıtlamak istersiniz?",
                "Yaşamak için en büyük motivasyonunuz nedir?",
                
                // Money and Values
                "Para için yaptığınıza en çok pişman olduğunuz şey nedir?",
                "En çok ne zaman açgözlü oldun?",
                "Para için hangi ilkelerden vazgeçersiniz?",
                "En çok istediğin ama karşılayamadığın şey nedir?",
                "Parasızlıktan dolayı kaçırdığınız en büyük fırsat nedir?",
                "Bir arkadaşına ihanet etmen ne kadar para kazandırır?",
                "Tasarruf etmek için yaptığınız en ucuz şey nedir?",
                "Birinin zenginliğini en çok ne zaman kıskandınız?",
                "Ailenizle para yüzünden kavga ettiniz mi?",
                "En çok kimden borç almak istersiniz ama sormaya cesaret edemezsiniz?",
                
                // Value Challenge
                "En dayanılmaz bulduğunuz davranış hangisi?",
                "Başkalarının hangi görüşünü kabul etmek sizin için en zor?",
                "En çok değiştirmek istediğiniz sosyal olgu hangisi?",
                "Sizce en ikiyüzlü insan türü hangisidir?",
                "Hangi çifte standart davranışı en iğrenç buluyorsunuz?",
                "Sizce hangi geleneksel kavramın kırılması gerekiyor?",
                "En çok hangi ana akım görüşü çürütmek istiyorsunuz?",
                "Sizce en mantıksız kural hangisidir?",
                "En çok hangi otoriteyi sorgulamak istersiniz?",
                "En çok değiştirmek istediğiniz toplumsal önyargı hangisi?"
            ],
            dare: [
                // Extremely Awkward Performance
                "İsmini kıçınla yaz",
                "Rujla yüzünüze bir desen çizin",
                "Act drunk",
                "Act angry",
                "Dilinle burnunu yala",
                "Çoraplarınızı çıkarın ve başkalarının onları koklamasına izin verin",
                "Act out the pain of childbirth",
                "Wear clothes of the opposite gender and take a photo",
                "Başkalarının vücudunuza yazmasına izin verin",
                "Başkalarının sizi gözleriniz kapalı beslemesine izin verin",
                "Bırakın makyajınızı başkaları yapsın",
                "En utanç verici deneyiminizi canlandırın",
                "En nefret ettiğiniz kişiyi taklit edin",
                "Take an exaggerated selfie",
                "En çok korktuğunuz şeyi yapın",
                "Imitate a baby crying",
                "Poponuzla birlikte patlayana kadar bir balonun üzerinde oturun",
                "İlk buluşma gerginliğinizi canlandırın",
                "Sarhoşken nasıl göründüğünüzü taklit edin",
                "Korktuğunuz zaman tepkinizi sergileyin",
                
                // Extreme Social Challenges
                "Eski sevgiline 'Seni özledim' mesajı at",
                "Sing loudly in public",
                "Hug a stranger",
                "Post an ugly photo of yourself on social media",
                "Kişilerinizden rastgele bir kişiyi satış elemanı gibi davranarak arayın",
                "Dance in public",
                "Post 'I'm in love' on social media",
                "Call a random person pretending to be a robot",
                "'Hepinizi seviyorum!' diye bağırın halka açık",
                "Call a random person pretending to be an alien",
                "Confess to a stranger on the street",
                "En tuhaf deneyiminizi herkesin önünde itiraf edin",
                "En çok hangi ünlüyle tanışmak istediğinizi yüksek sesle söyleyin",
                "En nefret ettiğiniz kişiyi arayın ve özür dileyin",
                "En utanç verici sırrınızı yüksek sesle söyleyin",
                "Telefonunuzdaki en komik fotoğrafı başkalarına gösterin",
                "En nefret ettiğiniz kişiyi herkesin önünde taklit edin",
                "Kusurlarınızdan birini yüksek sesle itiraf edin",
                "Birisi hakkındaki gerçek fikrinizi kamuya açık bir şekilde ifade edin",
                "Yanlış yaptığınız bir şey için herkesin önünde özür dileyin",
                "En büyük pişmanlığını yüksek sesle söyle",
                
                // Intimate Interaction (Moderate Version)
                "Kiss someone on the cheek",
                "Give someone a shoulder massage",
                "Hug someone for 30 seconds",
                "Sit on someone's lap",
                "Birinin saçınıza şekil vermesine izin verin",
                "Hold hands with someone and spin around",
                "Give someone a long hug",
                "Take a cheek-to-cheek photo with someone",
                "Birinin kolunuza çizim yapmasına izin verin",
                "Dance with someone",
                "Give someone a flying kiss",
                "Stare into someone's eyes for 30 seconds without laughing",
                "Birisinin sana meyve vermesine izin ver",
                "Sing a love song with someone",
                "Give someone a hand massage",
                "Act out a romantic movie scene with someone",
                "Birinin saçınızı örmesine izin verin",
                "Make a heart shape with someone",
                "Give someone a gentle hug",
                "Take a loving couple photo with someone",
                
                // Skill Challenges
                "10 saniye boyunca amuda kalkın",
                "Perform a magic trick",
                "Korkunuza meydan okuyun (güvenli şeylerden)",
                "Garip ama güvenli yiyecek kombinasyonlarını deneyin",
                "Learn a new dance move",
                "Baskın olmayan elinizle yazın",
                "Walk straight with eyes closed",
                "Tek elle şınav yapın",
                "Recite a complete poem",
                "Perform an impromptu drama",
                "Harfleri hecelemek için vücudunuzu kullanın",
                "Imitate 5 different animals",
                "Speak backwards for 5 minutes",
                "Ayaklarınızla çizin",
                "Learn a simple magic trick",
                "Imitate 5 different professions",
                "Ağzında kalemle yaz",
                "Make 10 different facial expressions",
                "Learn a foreign tongue twister",
                "Perform a silent movie scene",
                
                // Self-Challenge
                "Ünlü aşkına bir mesaj gönder",
                "Start an emoji chain in a group chat",
                "En büyük başarısızlığınızı herkesin önünde itiraf edin",
                "En tuhaf çocukluk anılarınızı paylaşın",
                "En çocukça davranışınızı kabul edin",
                "Reveal a habit others don't know about",
                "En komik utanç verici hikayenizi paylaşın",
                "En pişman olduğunuz kararınızı itiraf edin",
                "En güvensiz olduğun şeyi söyle",
                "En aptalca yanlış anlamanızı paylaşın",
                "En cahil anınızı itiraf edin",
                "En çok korktuğun şeyi söyle",
                "En tuhaf rüyanı paylaş",
                "En tembel olduğun zamanı itiraf et",
                "En açgözlü anınızı söyleyin",
                "En dürtüsel satın alma işleminizi paylaşın",
                "En saf olduğun zamanı itiraf et",
                "En batıl inancınızı söyleyin",
                "En tuhaf düşüncenizi paylaşın",
                "En önemsiz olduğun zamanı itiraf et",
                
                // Social Challenges
                "Hoşlandığın kişiye mesaj at",
                "Gruba kusurlarınızdan birini söyleyin",
                "Yaptığın bir hatayı kabul et",
                "Dileklerinizden birini yüksek sesle belirtin",
                "Utanç verici hikayelerinizden birini paylaşın",
                "Boldly express an opinion",
                "En çok değiştirmek istediğiniz alışkanlığınızı söyleyin",
                "Yanlış yaptığınız bir şey için herkesten özür dileyin",
                "Uzun zamandır iletişim kurmadığınız bir arkadaşınıza mesaj gönderin",
                "Post a confession on social media (can be joking)",
                "Genellikle iltifat etmeyeceğiniz birini herkesin önünde övün",
                "Bir zamanlar yanlış anladığınız birinden özür dileyin",
                "Önyargılarınızdan birini herkesin önünde itiraf edin",
                "Gerçekleştirmek istediğiniz ama söylemeye korktuğunuz bir hayalinizi paylaşın",
                "Express gratitude to someone",
                "Bir şey hakkındaki gerçek fikrinizi herkese açık olarak paylaşın",
                "En çok kimi kıskandığını itiraf et",
                "En çok öğrenmek istediğiniz beceriyi paylaşın",
                "Genellikle eleştirdiğiniz birini alenen övün",
                "Rakibinize saygı gösterin",
                
                // Creative Challenges
                "Imitate someone here in their movements and speech",
                "Birisi hakkındaki ilk izleniminizi itiraf edin",
                "En garip anınızı canlandırın",
                "Telefonunuzdaki en komik fotoğrafı başkalarına gösterin",
                "Anne babanı ara ve onlara hiç söylemediğin bir şeyi anlat",
                "Genellikle cesaret edemeyeceğiniz bir şeyi yapmak için kendinize meydan okuyun (güvenli bir şekilde)",
                "Yeni bir kişisel stil deneyin",
                "Zor olduğunu düşündüğünüz bir beceriyi öğrenin",
                "Örnek aldığınız birine hayranlığınızı ifade edin",
                "Ertelediğiniz bir görevi tamamlayın",
                "Sevmediğiniz yiyecekleri deneyin",
                "İyi olmadığınız bir sanat formunu öğrenin",
                "Konfor alanınıza meydan okuyun (güvenli sınırlar dahilinde)",
                "Çevre için iyi bir şey yapın",
                "Normalde yardım etmeyeceğin birine yardım et",
                "Genellikle söylemediğiniz duyguları ifade etmeyi öğrenin",
                "Tamamen yeni bir yaşam tarzı deneyin",
                "İmkansız olduğunu düşündüğünüz bir hedefi tamamlayın",
                "Develop a new positive habit",
                "Dünyayı daha iyi bir yer haline getirmek için bir şeyler yapın"
            ]
        }
    }
};

// DOM elements
const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

// Select difficulty
function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;
    
    // Show selected difficulty
    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">Yumuşak Mod</span>';
        questionText.textContent = '👇 Seçimini yap! Aile dostu içerik 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">Baharatlı Mod</span>';
        questionText.textContent = '👇 Seçimini yap! Yetiskinler için daha cesur içerik 👇';
    }
    selectedDifficulty.style.display = 'block';
    
    // Hide difficulty buttons, show truth/dare buttons
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';
    
    // Show back button
    backButton.style.display = 'inline-block';
}

// Select truth or dare
function selectChoice(type) {
    gameData.currentType = type;
    
    // Get random question
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // Display question
    questionText.textContent = randomQuestion;
    
    // Show selected type
    if (type === 'truth') {
        selectedType.innerHTML = '<span class="badge bg-info">Gerçek</span>';
    } else {
        selectedType.innerHTML = '<span class="badge bg-danger">Cesaret</span>';
    }
    selectedType.style.display = 'block';
    
    // Show control buttons
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    
    // Hide choice buttons
    choiceButtons.style.display = 'none';
}

// Next question
function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion;
    }
}

// Back to difficulty selection
function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 Oyun modunu seç! 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

// Reset game
function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = '👇 Oyun modunu seç! 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
