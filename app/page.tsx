"use client";

import { useEffect, useMemo, useState } from "react";

type ChapterId = "cover" | "compare" | "practice" | "dialogue" | "guide";
type Speaker = "teacher" | "a" | "b";
type Line = { speaker: Speaker; text: string };
type Choice = { id: string; text: string; correct: boolean; feedback: string };
type Scenario = {
  id: string;
  short: string;
  icon: string;
  color: string;
  title: string;
  context: string;
  names: { a: string; b: string };
  wrongApproach: string;
  rightApproach: string;
  wrong: Line[];
  right: Line[];
  wrongResult: string;
  rightResult: string;
  question: string;
  choices: Choice[];
  thinking: [string, string, string];
  starters: { a: string; b: string };
  guide: {
    notice: string;
    questions: string[];
    avoid: string;
    environment: string;
    followup: string;
  };
  props: [string, string, string];
};

const chapters: { id: Exclude<ChapterId, "cover">; number: string; title: string; subtitle: string; icon: string }[] = [
  { id: "compare", number: "01", title: "Bunu Yapma / Bunu Yap", subtitle: "İki yaklaşımı karşılaştır", icon: "↔" },
  { id: "practice", number: "02", title: "Sen Dene", subtitle: "Sözü seç, sonucu gör", icon: "?" },
  { id: "dialogue", number: "03", title: "Diyalog Kur", subtitle: "Barış nesnesini dolaştır", icon: "✿" },
  { id: "guide", number: "04", title: "Öğretmen Rehberi", subtitle: "Yargıç değil, danışman ol", icon: "⌁" },
];

const chapterBackgrounds: Record<ChapterId, string> = {
  cover: "/backgrounds/bg-cover.png",
  compare: "/backgrounds/bg-compare.png",
  practice: "/backgrounds/bg-practice.png",
  dialogue: "/backgrounds/bg-dialogue.png",
  guide: "/backgrounds/bg-guide.png",
};

const scenarios: Scenario[] = [
  {
    id: "stationery",
    short: "Özel eşya",
    icon: "✎",
    color: "#ff7a6b",
    title: "Kırtasiye ve özel eşya sahipliği",
    context: "Efe, Can’ın özel boya setini izin almadan kullandı ve yeşil kalemi kırdı.",
    names: { a: "Can", b: "Efe" },
    wrongApproach: "“Sınıfta her şey ortaktır” diyerek zoraki paylaşım istemek; cezayı ve yasağı yetişkinin belirlemesi.",
    rightApproach: "Kişisel mülkiyet sınırını görünür kılmak; zararı, duyguyu ve onarımı Barış Masası’nda çocukların konuşmasına alan açmak.",
    wrong: [
      { speaker: "teacher", text: "Can, paylaşmalısın. Sınıfta her şey ortaktır!" },
      { speaker: "teacher", text: "Efe, bir daha Can’ın eşyalarına dokunmayacaksın." },
      { speaker: "a", text: "Ama kırılan kalemim hâlâ kırık…" },
    ],
    right: [
      { speaker: "teacher", text: "Can’ın kalemleri izinsiz alındığı için canının sıkıldığını görüyorum. Barış Masası’nda konuşmak ister misiniz?" },
      { speaker: "a", text: "İzin almadan kullandığında ve yeşil kalem kırıldığında öfkelendim. Önce bana sormanı istiyorum." },
      { speaker: "b", text: "O yeşil tonu beğendiğim için aceleyle aldım. Kırmak istememiştim." },
      { speaker: "b", text: "Bir dahaki sefere soracağım. Kalemi onarmak için ne yapabilirim?" },
      { speaker: "a", text: "Bantlayıp birleştirmeme yardım edebilirsin." },
    ],
    wrongResult: "Yetişkin karar verdi; sınır ve onarım çocukların muhakemesine dönüşmedi.",
    rightResult: "Sınır açıklandı, sorumluluk alındı ve somut bir onarım yolu bulundu.",
    question: "Efe sorumluluk alan bir cevap vermek istiyor. Hangisi çözüm alanı açar?",
    choices: [
      { id: "a", text: "Herkes kullanıyordu; yalnızca ben yapmadım.", correct: false, feedback: "Sorumluluğu dağıtmak, Can’ın sınırını ve kırılan kalemi görünmez bırakır." },
      { id: "b", text: "İzin almadan aldım. Üzgünüm; onarmana yardım edip bir daha önce soracağım.", correct: true, feedback: "Eylem kabul ediliyor, sınır duyuluyor ve onarım öneriliyor." },
      { id: "c", text: "O kadar değerliyse okula getirmeseydin.", correct: false, feedback: "Bu cümle sorumluluğu eşyanın sahibine yükler." },
    ],
    thinking: ["Ne oldu? Özel eşya izinsiz kullanıldı.", "Hangi ihtiyaçlar var? Sınır, izin ve erişim.", "Onarım ne olabilir? Önce sormak ve kırılanı birlikte düzeltmek."],
    starters: {
      a: "Boyalarımı izinsiz kullandığında kendimi … hissettim. Senden … rica ediyorum.",
      b: "Kalemi aldığımda … düşünüyordum. Şimdi … yaparak onarmak istiyorum.",
    },
    guide: {
      notice: "Sınıf materyali ile çocuğun kişisel eşyasını birbirinden ayırın. “Paylaşmak” gönüllü bir toplumsal davranıştır; el koyma izni değildir.",
      questions: ["Eşya sahibine sorulmadığında ne değişti?", "Kırılan kalem için gerçek bir onarım nasıl görünür?", "İki çocuk da bir sonraki sefer neyi farklı yapabilir?"],
      avoid: "Zoraki paylaşım, otomatik özür ve yetişkinin tek taraflı ceza listesi.",
      environment: "Kişisel eşya alanını belirginleştirin; sınıfta küçük bir onarım kutusu bulundurun.",
      followup: "Birkaç gün sonra çözümün işe yarayıp yaramadığını çocuklara sorun; kararı onların güncellemesine izin verin.",
    },
    props: ["🖍️", "✏️", "🩹"],
  },
  {
    id: "queue",
    short: "Sıra düzeni",
    icon: "≋",
    color: "#35b8e8",
    title: "Kantin ve çeşme sırası ihlali",
    context: "Ali, su sırasında arkadaşına yer tuttu ve uzun süredir bekleyen Selin’in önüne bir çocuk daha geçti.",
    names: { a: "Selin", b: "Ali" },
    wrongApproach: "Bağırmak, çocuğu sıranın en arkasına sürmek ve “Sıra tutmak yasaktır” diyerek tartışmayı kapatmak.",
    rightApproach: "Sıranın toplumsal işlevini düşündürmek; herkesin zamanını ve ihtiyacını koruyan düzeni çocukların tarif etmesini istemek.",
    wrong: [
      { speaker: "teacher", text: "Ali! Hemen en arkaya geç. Kaynak yapmak yasak!" },
      { speaker: "b", text: "Ama yalnızca arkadaşıma yardım ediyordum." },
      { speaker: "teacher", text: "Kural kuraldır; tartışma istemiyorum." },
    ],
    right: [
      { speaker: "teacher", text: "Herkesin suyunu içip sınıfa zamanında dönmesi için sırayı nasıl daha adil yönetebiliriz?" },
      { speaker: "a", text: "Uzun zamandır bekliyorum. Önüme biri gelince su içmeye zamanım kalmıyor." },
      { speaker: "b", text: "Sadece arkadaşıma yardım etmek istemiştim." },
      { speaker: "teacher", text: "Herkes bir arkadaşına yer ayırsaydı en arkadakilerin süresi nasıl etkilenirdi?" },
      { speaker: "b", text: "Herkes kendisi için beklemeli. Arkadaşım geldiğinde sıranın arkasına geçebilir." },
    ],
    wrongResult: "Kural uygulandı ama adaletin neden gerekli olduğu düşünülmedi.",
    rightResult: "Çocuklar sıranın mantığını kurdu ve uygulanabilir ortak ilkeyi kendileri söyledi.",
    question: "Ali, arkadaşına yardım ederken sıradakilerin hakkını da nasıl koruyabilir?",
    choices: [
      { id: "a", text: "Arkadaşımı önüme alırım; yalnızca bir kişi zaten.", correct: false, feedback: "Bir kişi bile geride bekleyen herkesin süresini değiştirir." },
      { id: "b", text: "Arkadaşıma sıranın sonunu gösterir, isterse onunla birlikte yeniden beklerim.", correct: true, feedback: "Yardım sürüyor; sıra düzeni ve diğer çocukların zamanı korunuyor." },
      { id: "c", text: "Öğretmen görmeden hızlıca önüme geçiririm.", correct: false, feedback: "Gizlemek, adalet sorununu çözmez; yalnızca görünmez yapar." },
    ],
    thinking: ["Ne oldu? Sıraya sonradan biri eklendi.", "Kim etkilendi? Önündeki ve arkasındaki herkes.", "Adil düzen ne? Herkes kendi sırasını bekler; yardım beklerken de verilebilir."],
    starters: {
      a: "Önüme biri geçtiğinde … çünkü … Senden … rica ediyorum.",
      b: "Arkadaşıma yardım etmek istedim; sırayı korumak için bundan sonra … yapabilirim.",
    },
    guide: {
      notice: "Kaynak yapan tek çocuğa odaklanmadan, davranışın bütün kuyruğun süresini nasıl değiştirdiğini görünür kılın.",
      questions: ["Herkes yer tutsaydı ne olurdu?", "Yardım etmek ile başkasının sırasını değiştirmek aynı şey mi?", "Herkes için uygulanabilecek kural hangisi?"],
      avoid: "Topluluk önünde azarlama, fiziksel olarak sıradan çıkarma ve açıklamasız yasak.",
      environment: "Çeşme önüne bekleme noktaları veya küçük ayak izleri eklemek doğal bir sıra düzeni oluşturabilir.",
      followup: "Çocukların önerdiği düzeni bir hafta deneyin; sonra kısa bir grup değerlendirmesi yapın.",
    },
    props: ["💧", "①", "②"],
  },
  {
    id: "rules",
    short: "Oyun kuralı",
    icon: "⚽",
    color: "#ffbf3f",
    title: "Kural yorumlama tartışması",
    context: "Bahçe maçında top çizgiyi geçti; fakat kale direği olarak kullanılan hırka yerinden kaydığı için gol tartışmalı.",
    names: { a: "Mert", b: "Baran" },
    wrongApproach: "Topu almak, oyunu yasaklamak ya da yetişkin hakem olarak son kararı çocuklara dikte etmek.",
    rightApproach: "Oyunun durmasına izin vermek; tarafların gözlemlerini sırayla anlatıp iki tarafın da kabul edeceği yorumu bulmalarını beklemek.",
    wrong: [
      { speaker: "teacher", text: "Kavga ediyorsanız topu alırım; bugün maç bitti!" },
      { speaker: "a", text: "Ama gerçekten goldü!" },
      { speaker: "teacher", text: "Gol değildi. Kararı ben verdim." },
    ],
    right: [
      { speaker: "teacher", text: "Seslerin yükseldiğini duyuyorum. Kuralları netleştirmeye ihtiyacınız var gibi. Sırayla anlatıp ortak kararınızı bulun." },
      { speaker: "a", text: "Top çizgiyi tamamen geçti; bence goldü." },
      { speaker: "b", text: "Hırka kaydığı için kale çizgisi net değildi." },
      { speaker: "a", text: "Kaleyi taşlarla sabitleyelim; bu şutu yarım gol sayalım mı?" },
      { speaker: "b", text: "Tamam. Kaleyi yeniden kurup devam edelim." },
    ],
    wrongResult: "Tartışma sustu; çocukların kural kurma ve müzakere becerisi de sustu.",
    rightResult: "Belirsizlik kabul edildi, saha düzeltildi ve iki tarafın kabul ettiği geçici karar üretildi.",
    question: "Kale çizgisi belirsizse oyunu en adil biçimde nasıl sürdürebilirler?",
    choices: [
      { id: "a", text: "En yüksek sesle itiraz eden karar versin.", correct: false, feedback: "Ses yüksekliği kanıt veya adalet ölçüsü değildir." },
      { id: "b", text: "Belirsiz şutu ortak bir geçici kararla çözüp kaleyi sabitleyelim.", correct: true, feedback: "Geçmişteki belirsizlik yönetiliyor, sonraki pozisyon için hata denetimi kuruluyor." },
      { id: "c", text: "Maçı tamamen iptal edelim.", correct: false, feedback: "İptal, çocukların çözebileceği bir problemi öğrenme fırsatından çıkarır." },
    ],
    thinking: ["Ne biliyoruz? Topun yeri görüldü ama kale kaymıştı.", "Nerede belirsizlik var? Çizginin kendisinde.", "Sonraki hata nasıl önlenir? Kaleyi sabitleyip ortak geçici karar almak."],
    starters: {
      a: "Ben pozisyonu … gördüm. Emin olamadığımız yer … Bir çözüm olarak … öneriyorum.",
      b: "Benim gördüğüm … Fikrini duyunca … Bu tur için … kabul edebilirim.",
    },
    guide: {
      notice: "Çocukların ‘haklı kişi’ arayışından ‘işleyen ortak kural’ arayışına geçmesini gözlemleyin.",
      questions: ["İkinizin de kesin bildiği şey ne?", "Belirsizlik nereden doğdu?", "Aynı tartışmanın tekrarlanmaması için sahada ne değişebilir?"],
      avoid: "Yetişkin hakemliği, topa el koyma tehdidi ve “son söz benim” yaklaşımı.",
      environment: "Kale sınırlarını görünür ve sabit materyallerle belirlemek çevrenin hata denetimini güçlendirir.",
      followup: "Çocukların oluşturduğu kuralı oyunun başında yeniden söylemelerini isteyin; gerekirse kendileri revize etsin.",
    },
    props: ["⚽", "🥅", "?"],
  },
  {
    id: "teams",
    short: "Takım seçimi",
    icon: "★",
    color: "#8b73ee",
    title: "Takım seçimi ve dışlanma",
    context: "Kaptan Emir güçlü bir takım kurmak için Elif’i en sona bıraktı; Elif oyuna katılmak istemediğini söyledi.",
    names: { a: "Elif", b: "Emir" },
    wrongApproach: "“Herkesi almak zorundasınız” diyerek zoraki işbirliği kurmak ya da oyunu ceza olarak iptal etmek.",
    rightApproach: "Ait olma ve kabul edilme ihtiyaçlarını topluluğun konusu yapmak; takım kurma yöntemini çocukların yeniden tasarlamasını sağlamak.",
    wrong: [
      { speaker: "teacher", text: "Kimseyi dışlayamazsınız. Elif’i hemen takımınıza alın!" },
      { speaker: "b", text: "Ama güçlü bir maç yapmak istiyorduk." },
      { speaker: "teacher", text: "İtiraz ederseniz oyun iptal." },
    ],
    right: [
      { speaker: "teacher", text: "Takım seçerken bazı arkadaşların kendini dışlanmış hissettiğini gözlemledim. Kimseyi sona bırakmayan nasıl bir yöntem bulabiliriz?" },
      { speaker: "b", text: "Biz yalnızca en iyi oyuncuları seçmek istedik." },
      { speaker: "a", text: "Herkes seçilip ben kalınca kendimi değersiz hissettim. Maçı izlemek istemiyorum." },
      { speaker: "b", text: "Böyle hissetmeni istemezdim. Takımları kart çekerek karıştırsak?" },
      { speaker: "a", text: "Olur. Böylece kimse seçim sırasının sonunda beklemez." },
    ],
    wrongResult: "Katılım sağlandı ama aidiyet ve takım kurma yöntemi konuşulmadı.",
    rightResult: "İncinme duyuldu ve grubun tekrar kullanabileceği tarafsız bir seçim yöntemi doğdu.",
    question: "Kaptanlar hem dengeli hem de incitmeyen bir takım seçimini nasıl yapabilir?",
    choices: [
      { id: "a", text: "Oyuncuları herkesin önünde en iyiden en zayıfa sıralayalım.", correct: false, feedback: "Kamuya açık beceri sıralaması dışlanma duygusunu büyütebilir." },
      { id: "b", text: "Renkli kartlarla rastgele takımlar kurup gerekirse denge için takas konuşalım.", correct: true, feedback: "Kimse sona bırakılmıyor; denge ihtiyacı da grupça ele alınabiliyor." },
      { id: "c", text: "İki en zayıf oyuncu kaleci olsun.", correct: false, feedback: "Etiket değiştirse de hiyerarşi ve utandırma devam eder." },
    ],
    thinking: ["Ne oldu? Bir çocuk seçimde sona kaldı.", "Grupta hangi ihtiyaçlar var? Aidiyet ve dengeli oyun.", "Yöntem ne olabilir? Kart, sayışma veya dönüşümlü karışık takım."],
    starters: {
      a: "En sona kaldığımda kendimi … hissettim. Oyuna katılabilmek için … öneriyorum.",
      b: "Güçlü bir oyun istiyordum; ama bunun etkisini şimdi … Takımları … kurabiliriz.",
    },
    guide: {
      notice: "Sadece oyuna girip girmemeye değil, seçim sürecinin çocuğa verdiği toplumsal mesaja dikkat edin.",
      questions: ["Sona kalmak nasıl hissettirebilir?", "Dengeli takım ile değer sıralaması aynı şey mi?", "Kimseyi teşhir etmeyen hangi yöntemler var?"],
      avoid: "Zorla takıma ekleme, kaptanı utandırma ve çocukları yetenek etiketleriyle sıralama.",
      environment: "Takım kartları, renkli bileklikler veya dönüşümlü kaptanlık sistemi hazırlayın.",
      followup: "Yeni yöntemi birkaç oyunda deneyin; çocuklardan hem adalet hem oyun dengesi açısından değerlendirmelerini isteyin.",
    },
    props: ["🔵", "🟡", "★"],
  },
  {
    id: "swing",
    short: "Salıncak sırası",
    icon: "⌛",
    color: "#21b693",
    title: "Park ve oyuncak sırası",
    context: "Mina salıncakta; Ece 10’a kadar saydı fakat Mina bu sürenin çok kısa olduğunu düşünüyor.",
    names: { a: "Ece", b: "Mina" },
    wrongApproach: "Salıncağın başında nöbet tutmak, “Süren bitti!” diyerek çocuğu zorla indirmek.",
    rightApproach: "Tek salıncağın doğal sınırını kullanmak; bekleme ve kullanım süresini çocukların somut bir araçla dengelemesini desteklemek.",
    wrong: [
      { speaker: "teacher", text: "Mina, süren bitti. Hemen in!" },
      { speaker: "b", text: "Ama daha yeni bindim!" },
      { speaker: "teacher", text: "Ben saydım; tartışma yok." },
    ],
    right: [
      { speaker: "a", text: "10’a kadar saydım ama hâlâ inmedin." },
      { speaker: "b", text: "10 saniye çok kısa; daha yeni bindim." },
      { speaker: "teacher", text: "Sallanma keyfi ile adil beklemeyi nasıl dengeleyebilirsiniz? Süreyi ölçen bir araç işe yarar mı?" },
      { speaker: "b", text: "Kronometreyle üç dakika olsun. Bitince kendim inerim." },
      { speaker: "a", text: "Tamam, ben süreyi başlatıyorum." },
    ],
    wrongResult: "Sıra yetişkin denetimine bağlandı; çocuklar ortak ritim kuramadı.",
    rightResult: "Süre görünür oldu, bekleme öngörülebilir hale geldi ve geçiş sorumluluğu çocukta kaldı.",
    question: "Salıncak sırası için hangi çözüm hem keyfi hem adaleti korur?",
    choices: [
      { id: "a", text: "Bekleyen çocuk istediği kadar hızlı saysın.", correct: false, feedback: "Sayma hızı kişiye göre değişir; ortak ve öngörülebilir değildir." },
      { id: "b", text: "Birlikte belirlenen süreyi kronometreyle ölçüp bitince sırayı devredelim.", correct: true, feedback: "Sınır somut, önceden bilinen ve iki çocuk için de uygulanabilir." },
      { id: "c", text: "En büyük çocuk ne zaman inileceğine karar versin.", correct: false, feedback: "Yaş, tek başına adil süre belirleme yetkisi vermez." },
    ],
    thinking: ["Ne oldu? Kullanım ve bekleme ritmi uyuşmadı.", "İki ihtiyaç ne? Yeterli oyun süresi ve öngörülebilir sıra.", "Somut araç ne? Kum saati veya kronometre."],
    starters: {
      a: "Uzun süre beklediğimde … hissediyorum. Süreyi … ile ölçmeyi öneriyorum.",
      b: "10 saniye bana … geliyor. … dakika sonra kendim sırayı verebilirim.",
    },
    guide: {
      notice: "Çocukların süre kavramını soyut tartışmadan çıkarıp ölçülebilir hale getirmesine yardım edin.",
      questions: ["10’a saymak herkes için aynı süre mi?", "Sallanan ve bekleyen için makul süre nasıl belirlenir?", "Süre bittiğini kim değil, ne gösterebilir?"],
      avoid: "Fiziksel olarak indirme, bağırma ve sürekli yetişkin nöbeti.",
      environment: "Çocukların erişebileceği kum saati veya basit kronometre hazırlayın.",
      followup: "Seçilen süre çok kısa ya da uzun gelirse çocukların yeni bir süre deneyebilmesini sağlayın.",
    },
    props: ["⏱️", "〰", "↔"],
  },
  {
    id: "ages",
    short: "Büyük–küçük",
    icon: "↗",
    color: "#f08ab4",
    title: "Büyük–küçük yaş hiyerarşisi",
    context: "11 yaşındaki Mete, 7 yaşındaki Can’ın oyunu bozacağını düşünüp onu gruptan uzaklaştırıyor.",
    names: { a: "Can", b: "Mete" },
    wrongApproach: "Büyük çocukları bencillikle suçlamak ve küçükleri aynı role zorla dahil etmek.",
    rightApproach: "Karma yaşın gücünü kullanmak; büyük çocuğun model ve rehber rolünü, küçük çocuğun gerçek katılım ihtiyacıyla buluşturmak.",
    wrong: [
      { speaker: "teacher", text: "Mete, küçüklere kötü örnek oluyorsun. Can’ı oyuna almak zorundasın." },
      { speaker: "b", text: "Ama kurallar onun için çok hızlı." },
      { speaker: "teacher", text: "Bahane istemiyorum; aynı görevi verin." },
    ],
    right: [
      { speaker: "teacher", text: "Mete, oyun kurmadaki ustalığın Can’ın ilgisini çekiyor. Kuralları bozmadan ona önemli bir rol nasıl verebilirsiniz?" },
      { speaker: "b", text: "Oyun hızlı ama kale arkasında top toplayıcı olabilir." },
      { speaker: "a", text: "Sonra bana pas vermeyi de öğretir misin?" },
      { speaker: "b", text: "Evet. Önce o rolde başlarsın, sonra kısa pasları birlikte deneriz." },
      { speaker: "teacher", text: "Rol netleşti; şimdi nasıl işleyeceğini ikiniz deneyebilirsiniz." },
    ],
    wrongResult: "Katılım dayatıldı; yaş farkının gerektirdiği destek ve gerçek rol tasarlanmadı.",
    rightResult: "Büyük çocuk rehberlik üstlendi, küçük çocuk güvenli ve anlamlı bir giriş rolü buldu.",
    question: "Mete, Can’ı oyuna hangi yolla gerçekten dahil edebilir?",
    choices: [
      { id: "a", text: "Can’a yapamayacağı en zor rolü verip hızlıca öğrenmesini beklemek.", correct: false, feedback: "Aşırı zor görev katılım değil, yeni bir dışlanma biçimi olabilir." },
      { id: "b", text: "Başlangıç rolü verip kuralı modellemek, hazır oldukça sorumluluğu artırmak.", correct: true, feedback: "Karma yaşın rehberlik gücü ve çocuğun gerçek katılımı birlikte korunuyor." },
      { id: "c", text: "Can yalnızca izlesin; büyüyünce oynar.", correct: false, feedback: "İzlemek bazen öğrenme olabilir; fakat burada çocuk katılma isteğini açıkça belirtiyor." },
    ],
    thinking: ["Ne oldu? Yaş farkı katılım engeline dönüştü.", "Hangi güç kullanılabilir? Büyük çocuğun deneyimi.", "Köprü rol ne? Basit, önemli ve gelişmeye açık bir başlangıç görevi."],
    starters: {
      a: "Oyuna katılamadığımda … hissediyorum. Başlangıçta … görevini deneyebilirim.",
      b: "Kurallar hızlı olduğu için … düşündüm. Sana önce … gösterip sonra … yapabiliriz.",
    },
    guide: {
      notice: "Büyük çocuğu ücretsiz yardımcı öğretmene çevirmeden, doğal liderlik ve model olma isteğini davet edin.",
      questions: ["Oyunun hangi bölümü daha kolay öğrenilebilir?", "Can’a gerçek ama güvenli bir rol ne olabilir?", "Sorumluluk zamanla nasıl büyüyebilir?"],
      avoid: "Büyükleri ahlaken suçlama, küçüğü hazırlıksız biçimde aynı role atama ve yaş etiketiyle dışlama.",
      environment: "Karma yaş oyunlarında başlangıç rolleri ve kısa kural gösterimleri için alan oluşturun.",
      followup: "Can rolü öğrendikçe yeni bir sorumluluk isteyip istemediğini, Mete’nin de rehberlik yükünü nasıl yaşadığını sorun.",
    },
    props: ["7", "11", "🤝"],
  },
  {
    id: "nickname",
    short: "Lakap ve alay",
    icon: "◌",
    color: "#ff6577",
    title: "Lakap takma ve alay",
    context: "Arda, Deniz’in diş tellerini ‘tren yoluna’ benzetti; Deniz sessizleşip oyundan uzaklaştı.",
    names: { a: "Deniz", b: "Arda" },
    wrongApproach: "“Çok ayıp!” diyerek çocuğu teşhir etmek ve hemen samimiyetsiz bir özür söylemeye zorlamak.",
    rightApproach: "İncinen çocuğun sınırını ‘ben dili’ ile ifade etmesine; diğer çocuğun etkiyi duyup gerçek bir davranış değişikliği önermesine alan açmak.",
    wrong: [
      { speaker: "teacher", text: "Arda, çok ayıp! Herkesin önünde hemen özür dile." },
      { speaker: "b", text: "Özür dilerim… Şaka yapmıştım." },
      { speaker: "a", text: "Ama neden kırıldığımı hiç konuşmadık." },
    ],
    right: [
      { speaker: "teacher", text: "Deniz, şakadan sonra sessizleştiğini fark ettim. Ne hissettiğini Arda ile paylaşmak ister misin?" },
      { speaker: "a", text: "Tellerimi tren yoluna benzettiğinde kendimi çirkin hissettim ve kırıldım. Bununla ilgili şaka istemiyorum." },
      { speaker: "b", text: "Komik olduğunu düşünmüştüm; seni böyle etkilediğini anlamamıştım." },
      { speaker: "b", text: "Özür dilerim. Diş tellerinle ilgili bir daha şaka yapmayacağım." },
      { speaker: "teacher", text: "Deniz sınırını söyledi; Arda da bundan sonra neyi değiştireceğini belirtti." },
    ],
    wrongResult: "Özür duyuldu ama incinmenin etkisi ve gelecekteki sınır anlaşılmadı.",
    rightResult: "Duygu ve sınır açıklandı; niyet ile etki ayrıldı ve davranış değişikliği netleşti.",
    question: "Arda, ‘şakaydı’ demek yerine hangi cevabı verebilir?",
    choices: [
      { id: "a", text: "Herkes güldü; demek ki komikti.", correct: false, feedback: "Grubun gülmesi, Deniz’in sınırını ve incinmesini geçersiz kılmaz." },
      { id: "b", text: "Seni incittiğini şimdi anlıyorum. Bu konuda bir daha şaka yapmayacağım.", correct: true, feedback: "Etki duyuluyor ve gelecekteki davranış açıkça değiştiriliyor." },
      { id: "c", text: "Bu kadar hassas olmasan sorun çıkmazdı.", correct: false, feedback: "Bu cevap incinmenin sorumluluğunu alay edilen çocuğa yükler." },
    ],
    thinking: ["Ne oldu? Şaka bir kişinin sınırını aştı.", "Niyet ve etki aynı mı? Hayır; komik niyet incitici etkiyi silmez.", "Yeni sınır ne? Fiziksel özelliklerle ilgili şaka yapılmaması."],
    starters: {
      a: "… dediğinde kendimi … hissettim. Fiziksel özelliğimle ilgili … istemiyorum.",
      b: "Niyetim … idi; ama etkisinin … olduğunu duydum. Bundan sonra … yapacağım.",
    },
    guide: {
      notice: "Şakanın niyetine takılıp kalmadan, alıcı üzerindeki etkiyi ve açıkça söylenen sınırı duyulur hale getirin.",
      questions: ["Deniz’in bedeninde ve davranışında ne değişti?", "Komik niyet incitici etkiyi ortadan kaldırır mı?", "Arda’nın gelecekte yapacağı somut değişiklik ne?"],
      avoid: "Topluluk önünde utandırma, otomatik özür ve incinen çocuğa ‘aldırma’ tavsiyesi.",
      environment: "Zarafet ve Kibarlık sunumlarında isim, beden ve kişisel özellik sınırlarına dair gerçekçi kısa canlandırmalar yapın.",
      followup: "Sessiz bir anda Deniz’e sınırının korunup korunmadığını, Arda’ya da yeni davranışı uygulamakta zorlanıp zorlanmadığını sorun.",
    },
    props: ["💬", "✦", "♡"],
  },
];

const academicReadings: Record<string, { focus: string; reading: string; indicator: string; prompt: string }> = {
  stationery: {
    focus: "Özgürlük, sınır ve sorumluluk",
    reading: "Montessori yaklaşımında özgürlük, başkasının alanına sınırsız erişim anlamına gelmez. Kişisel mülkiyet sınırının çocuk tarafından ifade edilmesi; irade, öz-denetim ve toplumsal sorumluluğun birlikte çalışmasını destekler.",
    indicator: "Çocuklar izin isteme, zararı adlandırma ve telafi önerisini yetişkin hükmü olmadan kurabiliyor.",
    prompt: "“Bu eşyanın sınırını ve oluşan zararı nasıl onarabilirsiniz?”",
  },
  queue: {
    focus: "Ahlaki muhakeme ve toplumsal düzen",
    reading: "İkinci Gelişim Evresi çocuğu yalnızca kurala uymak değil, kuralın adalet üretip üretmediğini anlamak ister. Kuyruğun bütün grup üzerindeki etkisini düşünmek, ahlaki hayal gücünü somut bir topluluk problemine taşır.",
    indicator: "Çocuk, kendi isteğinin yanı sıra sıradaki görünmeyen kişilerin zamanını da hesaba katıyor.",
    prompt: "“Bu çözüm herkes tarafından uygulansaydı sıranın düzeni nasıl etkilenirdi?”",
  },
  rules: {
    focus: "Öz-yönetim ve ortak kural üretimi",
    reading: "Belirsiz bir oyun pozisyonu, yetişkin hakemliği için değil; kanıtı ayırma, farklı bakışları dinleme ve geçici ortak kural kurma pratiği için fırsattır. Çevredeki sınırın netleştirilmesi doğal hata denetimini güçlendirir.",
    indicator: "Çocuklar ‘kim haklı?’ sorusundan ‘bir sonraki belirsizliği nasıl önleriz?’ sorusuna geçiyor.",
    prompt: "“Kesin bildikleriniz, belirsiz kalanlar ve bundan sonrası için ortak kuralınız nedir?”",
  },
  teams: {
    focus: "Aidiyet, onur ve topluluk bilinci",
    reading: "Karma yaş topluluğunda katılım yalnızca oyuna fiziksel olarak alınmak değildir. Seçim yönteminin her çocuğun topluluktaki değerine ilişkin verdiği mesajı incelemek, sosyal adalet muhakemesini görünür kılar.",
    indicator: "Grup, beceriyi insan değerine dönüştürmeden dengeli takım kurabilen bir yöntem geliştiriyor.",
    prompt: "“Dengeli oyun ile arkadaşlarımızı değer sırasına koymak arasındaki fark nedir?”",
  },
  swing: {
    focus: "Somutlaştırma ve hata denetimi",
    reading: "Hazırlanmış çevre, soyut ‘çok uzun–çok kısa’ tartışmasını ölçülebilir hale getirir. Kum saati veya kronometre yetişkin buyruğunun yerini alan bağımsız bir referans sunar; geçiş sorumluluğu çocukta kalır.",
    indicator: "Süre, kişisel güç mücadelesi olmaktan çıkıp iki çocuğun da önceden bildiği ortak ölçüye dönüşüyor.",
    prompt: "“Süre bittiğini bir yetişkin yerine çevrede hangi araç gösterebilir?”",
  },
  ages: {
    focus: "Karma yaş topluluğu ve doğal liderlik",
    reading: "Montessori karma yaş düzeninde daha büyük çocuk, zorunlu yardımcı değil; deneyimini modelleyebilen topluluk üyesidir. Küçük çocuğa gerçek, erişilebilir ve gelişmeye açık bir rol verilmesi karşılıklı yeterlik duygusunu besler.",
    indicator: "Büyük çocuk rehberlik ederken küçük çocuk pasif izleyici değil, anlamlı bir sorumluluk üstleniyor.",
    prompt: "“Katılımı gerçek kılan, fakat başlangıç için yeterince erişilebilir olan rol hangisi?”",
  },
  nickname: {
    focus: "Zarafet, kibarlık ve kişisel onur",
    reading: "Zarafet ve Kibarlık sunumu, dışarıdan dayatılan nezaket cümlelerinden çok davranışın toplumsal etkisini fark ettirmeyi amaçlar. Niyet ile etkiyi ayırmak ve sınırı açıkça duymak, samimi onarımın temelidir.",
    indicator: "Çocuk, ‘şakaydı’ savunmasından uzaklaşıp etkinin sorumluluğunu ve gelecekteki davranış değişikliğini ifade ediyor.",
    prompt: "“Niyetin neydi, arkadaşın üzerindeki etki ne oldu ve bundan sonra neyi değiştireceksin?”",
  },
};

function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">✦</span>
      <span><strong>Barışın Küçük Büyük Kitabı</strong><small>Montessori · 6–12 yaş</small></span>
    </span>
  );
}

function speakerName(scene: Scenario, speaker: Speaker) {
  if (speaker === "teacher") return "Öğretmen · Montessori danışmanı";
  return scene.names[speaker];
}

function CartoonCharacter({ role, name, active = false, mood = "calm", placement = "" }: { role: Speaker; name: string; active?: boolean; mood?: "calm" | "tense"; placement?: string }) {
  return (
    <div className={"speaker-token role-" + role + " mood-" + mood + (active ? " speaking" : "") + (placement ? " " + placement : "")} aria-label={name + (active ? ", konuşuyor" : "")}>
      <span>{role === "teacher" ? "M" : name.slice(0, 1)}</span>
      <div><b>{name}</b><small>{role === "teacher" ? "Montessori danışmanı" : role === "a" ? "Çocuk A" : "Çocuk B"}</small></div>
    </div>
  );
}

function AcademicReading({ scene }: { scene: Scenario }) {
  const note = academicReadings[scene.id];
  return (
    <aside className="academic-reading">
      <header><span>II</span><div><small>MONTESSORİ YAKLAŞIMINA GÖRE · PEDAGOJİK OKUMA</small><h2>{note.focus}</h2></div></header>
      <div className="academic-grid">
        <article><small>KURAMSAL ÇERÇEVE</small><p>{note.reading}</p></article>
        <article><small>GÖZLENEBİLİR GÖSTERGE</small><p>{note.indicator}</p></article>
        <article><small>DANIŞMAN SORUSU</small><blockquote>{note.prompt}</blockquote></article>
      </div>
    </aside>
  );
}

function SceneVignette({ scene, calm = true }: { scene: Scenario; calm?: boolean }) {
  return (
    <div className={"scene-vignette vignette-" + scene.id + (calm ? " calm" : " tense")} style={{ "--scene": scene.color } as React.CSSProperties} aria-hidden="true">
      <span>{scene.props[0]}</span><span>{scene.props[1]}</span><span>{scene.props[2]}</span>
      <i /><b />
    </div>
  );
}

function ScenarioPicker({ sceneIndex, onSelect }: { sceneIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="scenario-picker" aria-label="Yedi gerçek yaşam senaryosu">
      <div className="scenario-picker-label"><span>7 senaryo</span><small>Birini seç</small></div>
      <div className="scenario-rail">
        {scenarios.map((item, index) => (
          <button
            key={item.id}
            className={sceneIndex === index ? "active" : ""}
            style={{ "--scene": item.color } as React.CSSProperties}
            onClick={() => onSelect(index)}
            aria-pressed={sceneIndex === index}
          >
            <span>{item.icon}</span><b>{index + 1}</b><small>{item.short}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function DialoguePanel({ kind, scene, step }: { kind: "wrong" | "right"; scene: Scenario; step: number }) {
  const lines = scene[kind];
  const good = kind === "right";
  const activeSpeaker = step > 0 ? lines[Math.min(step - 1, lines.length - 1)]?.speaker : undefined;
  const activeLine = step > 0 ? lines[Math.min(step - 1, lines.length - 1)] : undefined;
  return (
    <article className={"dialogue-panel " + kind}>
      <header>
        <span className="approach-mark">{good ? "✓" : "×"}</span>
        <div><small>{good ? "BUNU YAP" : "BUNU YAPMA"}</small><h3>{good ? "Danışmanlık alan açar" : "Yargıçlık kararı kapatır"}</h3></div>
      </header>
      <div className="speaker-key" style={{ "--scene": scene.color } as React.CSSProperties}>
        <CartoonCharacter role={activeSpeaker || "teacher"} name={activeSpeaker ? speakerName(scene, activeSpeaker).split(" · ")[0] : "Montessori"} active mood={good ? "calm" : "tense"} />
        <span>{good ? "Gözlem → soru → geri çekilme" : "Hüküm → emir → bağımlılık"}</span>
      </div>
      <div className="dialogue-stream" aria-live="polite">
        {!activeLine && <div className="dialogue-placeholder"><span>•••</span><p>Baloncuklar birazdan konuşacak.</p></div>}
        {activeLine && <div className={"bubble speaker-" + activeLine.speaker} key={kind + "-" + step}>
          <b>{speakerName(scene, activeLine.speaker)}</b><p>{activeLine.text}</p>
        </div>}
      </div>
      <div className={"dialogue-result " + (step >= lines.length ? "show" : "")}>
        <span>{good ? "↗" : "↘"}</span><p>{good ? scene.rightResult : scene.wrongResult}</p>
      </div>
    </article>
  );
}

function PageHeading({ number, eyebrow, title, text, onHome }: { number: string; eyebrow: string; title: string; text: string; onHome: () => void }) {
  return (
    <header className="page-heading">
      <div className="page-number">{number}</div>
      <div><p>MARIA MONTESSORİ · {eyebrow}</p><h1>{title}</h1><span>{text}</span></div>
      <button className="home-button" onClick={onHome}><span>⌂</span>Kapağa dön</button>
    </header>
  );
}

const DIALOGUE_DELAY = 2050;

export default function Home() {
  const [chapter, setChapter] = useState<ChapterId>("cover");
  const [previousChapter, setPreviousChapter] = useState<ChapterId | null>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [compareStep, setCompareStep] = useState(0);
  const [comparePlaying, setComparePlaying] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [dialoguePlaying, setDialoguePlaying] = useState(false);
  const [roleSpeaker, setRoleSpeaker] = useState<"a" | "b">("a");
  const [drafts, setDrafts] = useState({ a: "", b: "" });
  const [guideOpen, setGuideOpen] = useState(0);
  const [guideLens, setGuideLens] = useState<"judge" | "advisor">("advisor");

  const scene = scenarios[sceneIndex];
  const maxCompare = Math.max(scene.wrong.length, scene.right.length);
  const answer = useMemo(() => scene.choices.find((item) => item.id === selectedChoice), [scene, selectedChoice]);

  useEffect(() => {
    Object.values(chapterBackgrounds).forEach((source) => {
      const image = new window.Image();
      image.src = source;
    });
  }, []);

  useEffect(() => {
    if (!comparePlaying) return;
    const timer = window.setTimeout(() => {
      if (compareStep >= maxCompare) setComparePlaying(false);
      else setCompareStep((value) => value + 1);
    }, compareStep >= maxCompare ? 0 : DIALOGUE_DELAY);
    return () => window.clearTimeout(timer);
  }, [comparePlaying, compareStep, maxCompare]);

  useEffect(() => {
    if (!dialoguePlaying) return;
    const timer = window.setTimeout(() => {
      if (dialogueStep >= scene.right.length) setDialoguePlaying(false);
      else setDialogueStep((value) => value + 1);
    }, dialogueStep >= scene.right.length ? 0 : DIALOGUE_DELAY);
    return () => window.clearTimeout(timer);
  }, [dialoguePlaying, dialogueStep, scene.right.length]);

  const selectScene = (index: number) => {
    setSceneIndex(index);
    setCompareStep(0);
    setComparePlaying(false);
    setSelectedChoice(null);
    setDialogueStep(0);
    setDialoguePlaying(false);
    setRoleSpeaker("a");
    setDrafts({ a: "", b: "" });
    setGuideOpen(0);
    if (chapter === "compare") window.setTimeout(() => setComparePlaying(true), 700);
    if (chapter === "dialogue") window.setTimeout(() => setDialoguePlaying(true), 700);
  };

  const goChapter = (next: ChapterId) => {
    if (next !== chapter) setPreviousChapter(chapter);
    setChapter(next);
    setComparePlaying(false);
    setDialoguePlaying(false);
    if (next === "compare") {
      setCompareStep(0);
      window.setTimeout(() => setComparePlaying(true), 700);
    }
    if (next === "dialogue") {
      setDialogueStep(0);
      window.setTimeout(() => setDialoguePlaying(true), 700);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    window.history.replaceState(null, "", next === "cover" ? "#kapak" : "#" + next);
  };

  const toggleCompare = () => {
    if (comparePlaying) { setComparePlaying(false); return; }
    if (compareStep >= maxCompare) setCompareStep(0);
    setComparePlaying(true);
  };

  const toggleDialogue = () => {
    if (dialoguePlaying) { setDialoguePlaying(false); return; }
    if (dialogueStep >= scene.right.length) setDialogueStep(0);
    setDialoguePlaying(true);
  };

  const currentDialogueLine = dialogueStep > 0 ? scene.right[Math.min(dialogueStep - 1, scene.right.length - 1)] : null;
  const guideItems = [
    ["01", "Neyi gözlemle?", scene.guide.notice],
    ["02", "Hangi soruları sor?", scene.guide.questions.join("  •  ")],
    ["03", "Neyi yapma?", scene.guide.avoid],
    ["04", "Çevreyi nasıl hazırla?", scene.guide.environment],
    ["05", "Sonra ne yap?", scene.guide.followup],
  ];

  return (
    <main className={"book-app chapter-" + chapter}>
      <div className="site-backdrop" aria-hidden="true">
        {previousChapter && (
          <div
            className={"backdrop-image backdrop-previous backdrop-" + previousChapter}
            style={{ backgroundImage: `url(${chapterBackgrounds[previousChapter]})` }}
          />
        )}
        <div
          key={chapter}
          className={"backdrop-image backdrop-current backdrop-" + chapter}
          style={{ backgroundImage: `url(${chapterBackgrounds[chapter]})` }}
        />
        <div className="backdrop-shade" />
      </div>
      <header className="book-nav">
        <button className="brand-button" onClick={() => goChapter("cover")} aria-label="Kitap kapağına dön"><Brand /></button>
        <nav aria-label="Kitap bölümleri">
          {chapters.map((item) => (
            <button key={item.id} className={chapter === item.id ? "active" : ""} onClick={() => goChapter(item.id)}>
              <span>{item.number}</span>{item.title}
            </button>
          ))}
        </nav>
        <div className="age-chip"><b>II.</b><span>Gelişim Evresi<small>6–12 yaş</small></span></div>
      </header>

      {chapter === "cover" && (
        <section className="cover-page page-enter">
          <div className="cover-copy">
            <p className="cover-kicker"><span>ETKİLEŞİMLİ MONTESSORİ KİTAPÇIĞI</span><i />7 gerçek durum · 4 bölüm</p>
            <h1>Çatışmayı bitirme.<br /><em>Düşünmeyi başlat.</em></h1>
            <p className="cover-lead">6–12 yaş arasındaki <strong>İkinci Gelişim Evresi</strong> çocuğu, Maria Montessori’nin bakışıyla toplumsal dünyayı yeni keşfeder. Kuralı yalnız uygulamak değil; adaleti, sınırı ve onarımı anlamak ister.</p>
            <blockquote className="montessori-quote"><span>“</span><p>Çocuğun başarabileceğini hissettiği bir işte ona yardım etmeyin.</p><cite>— Maria Montessori</cite></blockquote>
            <div className="cover-principle">
              <span className="principle-adult">MONTESSORİ’DE YETİŞKİN</span>
              <div><b>Yargıç değil, danışman.</b><p>Kararı dikte etmez; gözlemi söyler, açık soru sorar ve çocuğun kendi çözümünü kurabilmesi için geri çekilir.</p></div>
            </div>
            <button className="open-book-button" onClick={() => goChapter("compare")}>Kitabı aç <span>→</span></button>
          </div>
          <div className="cover-books" aria-label="Dört interaktif bölüm">
            <div className="floating-orbit orbit-one">✦</div><div className="floating-orbit orbit-two">●</div>
            {chapters.map((item, index) => (
              <button key={item.id} className={"chapter-card card-" + (index + 1)} onClick={() => goChapter(item.id)}>
                <span className="chapter-index">{item.number}</span>
                <i>{item.icon}</i>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
                <em>Sayfayı aç →</em>
              </button>
            ))}
          </div>
          <div className="cover-scenarios">
            {scenarios.map((item, index) => <button key={item.id} style={{ "--scene": item.color } as React.CSSProperties} onClick={() => { selectScene(index); goChapter("compare"); }}><span>{item.icon}</span>{item.short}</button>)}
          </div>
        </section>
      )}

      {chapter === "compare" && (
        <section className="book-page compare-page page-enter" key={"compare-" + scene.id}>
          <PageHeading number="01" eyebrow="BUNU YAPMA / BUNU YAP" title="Aynı olay, iki yetişkin tavrı." text="Montessori yaklaşımında yetişkinin sözü azalırken çocuğun muhakeme alanı büyür. Baloncukları oynatıp farkı görün." onHome={() => goChapter("cover")} />
          <ScenarioPicker sceneIndex={sceneIndex} onSelect={selectScene} />
          <article className="scenario-intro">
            <SceneVignette scene={scene} />
            <div><small>SENARYO {sceneIndex + 1} / 7</small><h2>{scene.title}</h2><p>{scene.context}</p></div>
            <div className="scene-people-chip">{scene.names.a}<span>+</span>{scene.names.b}</div>
          </article>
          <div className="approach-summaries">
            <article className="summary-wrong"><span>×</span><div><small>BUNU YAPMA</small><p>{scene.wrongApproach}</p></div></article>
            <article className="summary-right"><span>✓</span><div><small>BUNU YAP</small><p>{scene.rightApproach}</p></div></article>
          </div>
          <div className="comparison-stage">
            <DialoguePanel kind="wrong" scene={scene} step={compareStep} />
            <div className="versus-badge">VS</div>
            <DialoguePanel kind="right" scene={scene} step={compareStep} />
          </div>
          <div className="play-controls">
            <button className="play-primary" onClick={toggleCompare}><span>{comparePlaying ? "Ⅱ" : compareStep >= maxCompare ? "↻" : "▶"}</span>{comparePlaying ? "Durdur" : compareStep >= maxCompare ? "Yeniden oynat" : compareStep > 0 ? "Devam et" : "Baştan oynat"}</button>
            <button className="play-secondary" disabled={compareStep >= maxCompare} onClick={() => { setComparePlaying(false); setCompareStep((value) => Math.min(maxCompare, value + 1)); }}>Sıradaki söz <span>→</span></button>
            <div className={"auto-status " + (comparePlaying ? "running" : "paused")}><i />{comparePlaying ? "Otomatik akış · sakin Montessori temposu" : compareStep > 0 && compareStep < maxCompare ? "Akış durduruldu · tek tek ilerleyebilirsiniz" : compareStep >= maxCompare ? "Diyalog tamamlandı" : "Sayfa açılınca otomatik başlar"}</div>
            <div className="play-progress" aria-label={String(compareStep) + "/" + String(maxCompare) + " konuşma adımı"}><i style={{ width: String((compareStep / maxCompare) * 100) + "%" }} /></div>
          </div>
        </section>
      )}

      {chapter === "practice" && (
        <section className="book-page practice-page page-enter" key={"practice-" + scene.id}>
          <PageHeading number="02" eyebrow="SEN DENE" title="Sözü seç. Ortam cevap versin." text="Tek bir sihirli cümle yok; gözlem, ihtiyaç ve uygulanabilir rica için daha çok alan açan seçenekler var." onHome={() => goChapter("cover")} />
          <ScenarioPicker sceneIndex={sceneIndex} onSelect={selectScene} />
          <div className="practice-layout">
            <aside className="thinking-ladder">
              <SceneVignette scene={scene} />
              <small>MONTESSORİ MUHAKEME MERDİVENİ</small>
              <h2>{scene.title}</h2>
              {scene.thinking.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p></div>)}
              <p className="ladder-note">Cevabı ezberleme; düşüncenin nasıl kurulduğunu izle.</p>
            </aside>
            <article className={"challenge-card " + (answer ? answer.correct ? "success" : "retry" : "")}>
              <header><span>?</span><div><small>ŞİMDİ SIRA SENDE · {sceneIndex + 1}/7</small><h2>{scene.question}</h2></div></header>
              <div className="choice-list">
                {scene.choices.map((choice, index) => (
                  <button key={choice.id} className={selectedChoice === choice.id ? "selected" : ""} onClick={() => setSelectedChoice(choice.id)}>
                    <span>{String.fromCharCode(65 + index)}</span><p>{choice.text}</p><i>{selectedChoice === choice.id ? choice.correct ? "✓" : "×" : ""}</i>
                  </button>
                ))}
              </div>
              {answer && <div className="choice-feedback" aria-live="polite"><span>{answer.correct ? "Montessori çözüm alanı açıldı" : "Bu cümle muhakemeyi daraltıyor"}</span><p>{answer.feedback}</p>{!answer.correct && <button onClick={() => setSelectedChoice(null)}>Başka bir cevap dene ↻</button>}</div>}
            </article>
          </div>
        </section>
      )}

      {chapter === "dialogue" && (
        <section className="book-page dialogue-page page-enter" key={"dialogue-" + scene.id}>
          <PageHeading number="03" eyebrow="DİYALOG KUR" title="Barış nesnesi kimdeyse söz onda." text="Montessori Barış Masası’nda çocuk yetişkin hükmünü değil, arkadaşının bakışını duyar. Örneği oynatın; sonra sözü çocuklara bırakın." onHome={() => goChapter("cover")} />
          <ScenarioPicker sceneIndex={sceneIndex} onSelect={selectScene} />
          <div className="dialogue-theatre">
            <div className="theatre-stage" style={{ "--scene": scene.color } as React.CSSProperties}>
              <CartoonCharacter role="teacher" name="Öğretmen" active={currentDialogueLine?.speaker === "teacher"} placement="theatre-teacher" />
              <CartoonCharacter role="a" name={scene.names.a} active={currentDialogueLine?.speaker === "a"} placement="theatre-a" />
              <CartoonCharacter role="b" name={scene.names.b} active={currentDialogueLine?.speaker === "b"} placement="theatre-b" />
              <div className={"peace-token token-" + (currentDialogueLine?.speaker || "teacher")}><span>✿</span><small>konuşma nesnesi</small></div>
              <SceneVignette scene={scene} />
            </div>
            <div className="theatre-script">
              <header><small>ÇÖZÜM DİYALOĞU · {sceneIndex + 1}/7</small><h2>{scene.title}</h2></header>
              <div className="script-window" aria-live="polite">
                {dialogueStep === 0 && <div className="script-empty"><span>“</span><p>Örnek diyaloğu oynatın veya sözleri tek tek ilerletin.</p></div>}
                {scene.right.slice(Math.max(0, dialogueStep - 2), dialogueStep).map((line, index) => <div className={"script-line line-" + line.speaker} key={dialogueStep + "-" + index}><b>{speakerName(scene, line.speaker)}</b><p>{line.text}</p></div>)}
              </div>
              <div className="script-controls">
                <button onClick={toggleDialogue}><span>{dialoguePlaying ? "Ⅱ" : dialogueStep >= scene.right.length ? "↻" : "▶"}</span>{dialoguePlaying ? "Durdur" : dialogueStep >= scene.right.length ? "Baştan oynat" : dialogueStep > 0 ? "Devam et" : "Baştan oynat"}</button>
                <button disabled={dialogueStep >= scene.right.length} onClick={() => { setDialoguePlaying(false); setDialogueStep((value) => Math.min(scene.right.length, value + 1)); }}>Sıradaki konuşmacı →</button>
                <div className={"auto-status " + (dialoguePlaying ? "running" : "paused")}><i />{dialoguePlaying ? "Otomatik diyalog · sakin Montessori temposu" : dialogueStep > 0 && dialogueStep < scene.right.length ? "Durduruldu · sıradaki konuşmacıya geçebilirsiniz" : dialogueStep >= scene.right.length ? "Diyalog tamamlandı" : "Sayfa açılınca otomatik başlar"}</div>
              </div>
            </div>
          </div>
          <div className="dialogue-workshop">
            <header><div><small>MONTESSORİ DİLİYLE · KENDİ SÖZÜNÜ KUR</small><h2>Hazır cümleyi kopyalama; ihtiyacını açıkla.</h2></div><div className="formula"><span>GÖZLEM</span><i>+</i><span>DUYGU / İHTİYAÇ</span><i>+</i><span>RİCA</span></div></header>
            <div className="speaker-toggle">
              <button className={roleSpeaker === "a" ? "active" : ""} onClick={() => setRoleSpeaker("a")}><span>{scene.names.a.slice(0, 1)}</span>{scene.names.a}</button>
              <button className="pass-object" onClick={() => setRoleSpeaker(roleSpeaker === "a" ? "b" : "a")}><span>✿</span><small>Sözü ver</small></button>
              <button className={roleSpeaker === "b" ? "active" : ""} onClick={() => setRoleSpeaker("b")}><span>{scene.names.b.slice(0, 1)}</span>{scene.names.b}</button>
            </div>
            <label>
              <span>Şu anda konuşan: <b>{scene.names[roleSpeaker]}</b></span>
              <small>{scene.starters[roleSpeaker]}</small>
              <textarea rows={4} value={drafts[roleSpeaker]} onChange={(event) => setDrafts({ ...drafts, [roleSpeaker]: event.target.value })} placeholder={scene.names[roleSpeaker] + " kendi cümlesini buraya yazabilir…"} />
            </label>
            <p className="workshop-note"><b>Montessori hatırlatması:</b> Yetişkin cümleyi tamamlamaz; gerekirse yalnızca “Bunu daha açık nasıl söyleyebilirsin?” diye sorar.</p>
          </div>
        </section>
      )}

      {chapter === "guide" && (
        <section className="book-page guide-page page-enter" key={"guide-" + scene.id}>
          <PageHeading number="04" eyebrow="ÖĞRETMEN REHBERİ" title="Kararı verme. Muhakemeyi uyandır." text="İkinci Gelişim Evresi çocuğu toplumsal düzeni araştırır. Yetişkin, çözümün sahibi değil; düşünmenin güvenli danışmanıdır." onHome={() => goChapter("cover")} />
          <ScenarioPicker sceneIndex={sceneIndex} onSelect={selectScene} />
          <div className="guide-lens">
            <div>
              <small>MONTESSORİ’DE YETİŞKİNİN MERCEĞİ</small>
              <h2>Aynı anda neyi büyütüyorsun?</h2>
              <p>Yetişkinin rolü küçüldükçe çocuğun aktif çabası için yer açılır.</p>
              <div className="lens-toggle">
                <button className={guideLens === "judge" ? "active" : ""} onClick={() => setGuideLens("judge")}>Yargıç</button>
                <button className={guideLens === "advisor" ? "active" : ""} onClick={() => setGuideLens("advisor")}>Danışman</button>
              </div>
            </div>
            <article className={"lens-card " + guideLens}>
              <span>{guideLens === "judge" ? "⚑" : "✦"}</span>
              <small>{guideLens === "judge" ? "BUNU YAPMA" : "BUNU YAP"}</small>
              <h3>{guideLens === "judge" ? "“Kararı ben veririm.”" : "“Nasıl bir çözüm deneyebilirsiniz?”"}</h3>
              <p>{guideLens === "judge" ? "Hızlı sessizlik sağlayabilir; fakat adalet, sorumluluk ve onarım yetişkinin zihninde kalır." : "Gözlemi tarafsız söyler, güvenliği korur, açık soru sorar ve uygulanabilir çözümü çocukların kurmasına izin verir."}</p>
            </article>
          </div>
          <div className="guide-content">
            <aside>
              <SceneVignette scene={scene} />
              <small>SENARYO {sceneIndex + 1} / 7</small>
              <h2>{scene.title}</h2>
              <p>{scene.context}</p>
              <div className="guide-reminder"><span>II</span><p><b>Toplumsal olarak yeni doğuyor.</b> Kuralı yalnız uygulamak değil, neden var olduğunu anlamak istiyor.</p></div>
            </aside>
            <div className="guide-accordion">
              {guideItems.map((item, index) => (
                <article key={item[0]} className={guideOpen === index ? "open" : ""}>
                  <button onClick={() => setGuideOpen(guideOpen === index ? -1 : index)}><span>{item[0]}</span><h3>{item[1]}</h3><i>{guideOpen === index ? "−" : "+"}</i></button>
                  {guideOpen === index && <p>{item[2]}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {chapter !== "cover" && (
        <>
          <AcademicReading scene={scene} />
          <div className="page-footer-nav">
            <button onClick={() => selectScene((sceneIndex + scenarios.length - 1) % scenarios.length)}>← Önceki senaryo</button>
            <span><b>{sceneIndex + 1}</b> / 7</span>
            <button onClick={() => selectScene((sceneIndex + 1) % scenarios.length)}>Sonraki senaryo →</button>
          </div>
        </>
      )}
    </main>
  );
}
