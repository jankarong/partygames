const make50 = (base, generator) => {
  const out = [...base];
  let i = 0;
  while (out.length < 50) {
    out.push(generator(i, out.length));
    i += 1;
  }
  return out.slice(0, 50);
};

const softTopics = ["randevu", "hafta sonu", "gunluk rutin", "kisa gezi", "aksam", "sabah", "playlist", "fotograf", "opusme", "yuruyus"];
const romanticTopics = ["yildonumu", "ask mektubu", "gelecek", "ev", "rituel", "soz", "guven", "yakınlik", "ortak plan", "ani"];
const spicyTopics = ["flort", "dokunus", "tempo", "atmosfer", "fantezi", "goz temasi", "cekim", "iletisim", "sinir", "aftercare"];

const softTruth = make50([
  "Benim hakkimdaki ilk izlenimin neydi?",
  "Bende hangi kucuk sey seni sevildigini hissettiriyor?",
  "Bizim en sevdigin randevu anin hangisi?",
  "Ne zaman bana en yakin hissediyorsun?",
  "Cift olarak en iyi yaptigimiz sey ne?",
  "Bendeki hangi aliskanligi cok tatli buluyorsun?",
  "Bu yil benimle hangi kisa geziyi yapmak istersin?",
  "Iliskimizde birlikte gelistirmemiz gereken sey ne?",
  "Bizim hangi fotografimizi en cok seviyorsun?",
  "Hangi sarilma sekli seni en cok rahatlatiyor?",
  "Hangi gunluk ritueli korumaliyiz?",
  "Benden duydugun hangi iltifat aklinda kaldi?",
  "Dusuk butceli ideal randevun nasil olurdu?",
  "Hangi ic sakamizi hic kaybetmek istemezsin?",
  "Hangi durumda harika bir takim oldugumuzu dusunuyorsun?",
  "Hafta sonlari neyi daha fazla yapmaliyiz?",
  "Hangi kiyafetimi en cekici buluyorsun?",
  "Birlikte yaptigimiz hangi sakin aktivite seni dinlendiriyor?",
  "Gunluk hayatimizdaki en sevdigin kisim ne?",
  "Bu hafta bana ne icin tesekkur etmek istersin?"
], (i) => `${softTopics[i % softTopics.length]} konusunda su an cift olarak bize en cok uyan fikir sence ne?`);

const softDare = make50([
  "Partnerine 20 saniye icten bir sarilma ver.",
  "Partnerine 3 net iltifat soyle.",
  "Ilk bulusmanizi 30 saniyede canlandirin.",
  "30 saniye el ele tutusup goz temasi kurun.",
  "Partnerine simdi kisa tatli bir mesaj at.",
  "Bir sarki boyunca birlikte dans edin.",
  "1 dakika omuz masaji yap.",
  "Simdi bir cift selfie'si cekin.",
  "Bugun icin minnettar oldugun 5 seyi soyle.",
  "1 dakikada bir sonraki bulusmayi planlayin.",
  "Partnerine fısıldayarak sevdigin bir ozelligini soyle.",
  "Kendinize gizli bir cift isareti bulun.",
  "Bir nakarati birlikte soyleyin.",
  "10 senkron squat yapin.",
  "Sirayla en sevdiginiz 5 bulusmayi sayin.",
  "45 saniye konusmadan sarilin.",
  "Iliskiniz icin mini bir kadeh kaldirma cumlesi soyleyin.",
  "Bu hafta bir telefonpsuz mini bulusma karari alin.",
  "Ikiniz de su cumleyi tamamlayin: Seni seciyorum cunku...",
  "20 saniye el ele yuruyun."
], (i) => `${softTopics[i % softTopics.length]} temali 20 saniyelik mini bir cift gorevi yapin.`);

const romanticTruth = make50([
  "Benimle ciddi bir iliski istedigini ne zaman fark ettin?",
  "Benden hangi romantik jesti asla sikici bulmazsin?",
  "Hangi ortak animiz sana film sahnesi gibi geliyor?",
  "Benimle mutlaka yapmak istedigin hayal bulusma nedir?",
  "Bu iliski sana ask hakkinda ne ogretti?",
  "Zor gunlerinde sana nasil iyi geliyorum?",
  "Aramizdaki en onemli soz hangisi?",
  "Benimle kutlamak istedigin bir sonraki buyuk adim ne?",
  "Hangi sarki bizim resmi cift sarkimiz olmali?",
  "Bendeki hangi ozellik sana guven veriyor?",
  "Hangi romantik gelenegi baslatmak istersin?",
  "Uzak kaldigimizda bende en cok neyi ozluyorsun?",
  "Ask hikayemizi tek kelimeyle nasil anlatirsin?",
  "Aramizdaki duygusal yakinlik senin icin ne demek?",
  "Benden gelen hangi kucuk hareket gununu guzellestiriyor?",
  "Romantizmi uzun vadede nasil guclu tutariz?",
  "Hikayemizin hangi bolumunu anlatmayi seviyorsun?",
  "Bana en son ne zaman yeniden asik oldun?",
  "Date nightlarda hangi bolumu korumaliyiz?",
  "Gelecekte bizi hayal ettigin en guzel sahne hangisi?"
], (i) => `${romanticTopics[i % romanticTopics.length]} konusunda iliskimize en uygun hayalin ne?`);

const romanticDare = make50([
  "Iki satir romantik not yaz ve sesli oku.",
  "5 saniye alin opucugu ver.",
  "Partnerini ask mektubu tarzinda anlat.",
  "El ele tutusup birbirinizi secme nedeninizden 5 tane soyleyin.",
  "30 saniye konusmadan goz temasi yapin.",
  "Bu aksam icin mini bir bulusma planlayin.",
  "En sevdiginiz cift fotografi pozunu tekrar yapin.",
  "Iliskiniz icin 1 minnet ve 1 dilek soyle.",
  "1 dakika el masaji yap.",
  "Bir tur sadece iltifat ederek konus.",
  "Romantik bir sarki satiri mirmirlan.",
  "30 saniye muziksiz yavas dans edin.",
  "Size ozel bir cift mottosu bulun.",
  "3 kez su cumleyi tamamla: Seni takdir ediyorum cunku...",
  "Bu ay icin romantik bir plan paylas.",
  "Bizim sonraki bolumumuz basliyor baslikli foto cekin.",
  "Tek cumlede kalpten bir tesekkur soyleyin.",
  "Hala kelebek etkisi yaratan bir anini paylas.",
  "Yarin icin sevecen bir davranis sozu ver.",
  "Turu, riza ile bir opucukle bitirin."
], (i) => `${romanticTopics[i % romanticTopics.length]} temali 20 saniyelik romantik bir gorev yapin.`);

const spicyTruth = make50([
  "Henuz anlatmadigin hangi fantazin var?",
  "Benim seni en cok etkileyen flort tarzim ne?",
  "Bende seni aninda atesleyen sey ne?",
  "Benimle denemek istedigin yeni yakinlik aktivitesi ne?",
  "Hangi kiyafetimi daha cekici buluyorsun?",
  "Yakinlikta daha fazla ne yasamak istersin?",
  "Hangi dokunusum seni hem rahatlatip hem heyecanlandiriyor?",
  "En sevdigin opusme tarzi hangisi?",
  "Benden daha cok hangi adimi baslatmami istersin?",
  "Hangi ortam/ambiyans sende daha iyi calisiyor?",
  "Yakinlikta senin icin olmazsa olmaz sinir nedir?",
  "Hangi aftercare sekli sana en iyi geliyor?",
  "Benden duydugunda en cekici gelen kelimeler hangileri?",
  "Spicy anlardan once mutlaka netlestirmemiz gereken sey ne?",
  "Guvenli ama cesur hangi fikri denemek istersin?",
  "Hangi iltifatim seni en cok arzulandigini hissettiriyor?",
  "Yavas yaklasimda en sevdigin tempo ne?",
  "Uzun suredir sormami istedigin yakinlik sorusu ne?",
  "Daha cesur anlarda seni en guvende hissettiren ne?",
  "Aramizdaki kimyada asla kaybetmek istemedigin sey ne?"
], (i) => `${spicyTopics[i % spicyTopics.length]} konusunda ikimiz icin hem heyecanli hem guvenli yol ne olur?`);

const spicyDare = make50([
  "10 saniye boyunca ozguvenli bir flort cumlesi fisilda.",
  "10 saniyelik yavas bir opucuk ver (rizayla).",
  "Partnerinin bedeninde en sevdigin noktayi alçak sesle soyle.",
  "20 saniye yogun goz temasi yapin.",
  "Daha sonra acilmak uzere flortoz bir mesaj gonder.",
  "1 dakika boyun masaji yap.",
  "Ayni cumlede bir sinir ve bir istek soyle.",
  "20 saniyede ideal gece atmosferinizi tarif et.",
  "15 saniye cok yakin yavas dans yapin.",
  "Bir sonraki ozel bulusma icin seksi ama guvenli fikir soyle.",
  "Kod kelime ile hizli guvenlik check-in yapin.",
  "Bir spicy evet/hayir sorusu sor ve durust cevapla.",
  "Alin, yanak ve el opucugunu sirayla ver.",
  "Muzikle 20 saniye duyusal sallanma yapin.",
  "Su cumleyi tamamla: Bu gece seninle ... istiyorum.",
  "Bir romantik bir tutkulu iltifat yap.",
  "Gel buraya jesti yapip gulumse.",
  "Kimyanizi anlatan 3 kelime soyle.",
  "Rizali 10 saniyelik PG13 lap dance versiyonu yapin.",
  "Turu guvenli ve spicy mini challenge ile bitirin."
], (i) => `${spicyTopics[i % spicyTopics.length]} temali 20 saniyelik, rizali bir gorev yapin.`);

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
  choose: "👇 Cift modunu secin 👇",
  chooseRound: "👇 Dogruluk mu Cesaret mi secin 👇",
  chooseRomantic: "👇 Romantik mod: Dogruluk mu Cesaret mi 👇",
  chooseSpicy: "👇 Atesli mod: Dogruluk mu Cesaret mi 👇",
  softBadge: "Yumusak mod",
  romanticBadge: "Romantik mod",
  spicyBadge: "Atesli mod",
  truthBadge: "Dogruluk",
  dareBadge: "Cesaret"
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
