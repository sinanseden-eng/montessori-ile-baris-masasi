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
    wrongResult: "Yetişkin karar verdi; sınır ve onarım çocukların akıl yürütmesine dönüşmedi.",
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
      { speaker: "a", text
