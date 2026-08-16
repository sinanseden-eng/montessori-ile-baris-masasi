"use strict";

const ASSET_ROOT =
  "https://raw.githubusercontent.com/sinanseden-eng/montessori-ile-baris-masasi/main/public/scenes";

const scenarios = [
  {
    number: "01",
    icon: "✎",
    color: "#f06b5f",
    soft: "#fff0ed",
    title: "O kalem kimin?",
    label: "Özel eşya sınırı",
    situation:
      "Efe, Elif’in özel boya setini izin almadan kullandı. Üstelik yeşil kalem de kırıldı.",
    question: "Şimdi bir yetişkin hüküm mü verecek, yoksa çocuklar zararı birlikte mi onaracak?",
    wrongImage: `${ASSET_ROOT}/01-personal-property-dont.png`,
    rightImage: `${ASSET_ROOT}/01-personal-property-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Elif, paylaşmalısın. Sınıfta her şey ortaktır!" },
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Efe, bir daha Elif’in eşyalarına dokunmayacaksın." },
      { speaker: "Elif", role: "Eşyanın sahibi", text: "Ama kırılan kalemim hâlâ kırık…" },
    ],
    wrongResult: "Kural söylendi; fakat Elif’in sınırı, Efe’nin sorumluluğu ve gerçek onarım konuşulmadı.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Kalemlerin izinsiz alındığı için canının sıkıldığını görüyorum. Barış Masası’nda konuşmak ister misiniz?" },
      { speaker: "Elif", role: "Çocuk A", text: "İzin almadan kullandığında ve kalem kırıldığında öfkelendim. Önce bana sormanı istiyorum." },
      { speaker: "Efe", role: "Çocuk B", text: "O yeşil tonu çok beğendiğim için aceleyle aldım. Kırmak istememiştim." },
      { speaker: "Efe", role: "Çocuk B", text: "Bir dahaki sefere soracağım. Kalemi onarmak için ne yapabilirim?" },
      { speaker: "Elif", role: "Çocuk A", text: "Bantlayıp birleştirmeme yardım edebilirsin." },
    ],
    principle: "Özgürlük, sınır ve sorumlulukla birlikte büyür.",
    montessori:
      "Montessori yaklaşımında özgürlük, başkasının alanına sınırsız erişim değildir. Çocuk sınırını ifade eder; diğer çocuk davranışının etkisini görür ve onarımı kendisi seçer.",
    observe: "İzin isteme, zararı adlandırma ve somut telafi yetişkin hükmü olmadan ortaya çıktı.",
  },
  {
    number: "02",
    icon: "≋",
    color: "#24a8d8",
    soft: "#eaf8ff",
    title: "Sıra kimin?",
    label: "Çeşme sırası",
    situation:
      "Ali, su sırasında yandan en öne geçti. Uzun süredir bekleyen Selin bunun adil olmadığını söyledi.",
    question: "Kural yalnızca uygulanacak mı, yoksa adaletin neden gerekli olduğu da düşünülecek mi?",
    wrongImage: `${ASSET_ROOT}/02-fountain-queue-dont.png`,
    rightImage: `${ASSET_ROOT}/02-fountain-queue-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Ali! Hemen en arkaya geç. Kaynak yapmak yasak!" },
      { speaker: "Ali", role: "Çocuk B", text: "Ama çok susamıştım; yalnızca hızlıca su içecektim." },
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Kural kuraldır; tartışma istemiyorum." },
    ],
    wrongResult: "Ali sıranın arkasına gönderildi; fakat davranışın bütün kuyruk üzerindeki etkisini düşünmedi.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Herkesin suyunu içip sınıfa zamanında dönmesi için sırayı nasıl daha adil yönetebilirsiniz?" },
      { speaker: "Selin", role: "Çocuk A", text: "Uzun zamandır bekliyorum. Önüme biri gelince su içmeye zamanım kalmıyor." },
      { speaker: "Ali", role: "Çocuk B", text: "Sadece hızlıca su içmek istemiştim." },
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Herkes susadığında öne geçseydi en arkadakilerin süresi nasıl etkilenirdi?" },
      { speaker: "Ali", role: "Çocuk B", text: "Herkes kendi sırasını beklemeli. Ben de en arkaya geçebilirim." },
    ],
    principle: "İkinci Gelişim Evresi çocuğu kuralın nedenini arar.",
    montessori:
      "6–12 yaş çocuğu yalnızca ‘kurala uy’ cümlesini değil, kuralın topluluk için ürettiği adaleti anlamak ister. Yetişkin cevabı vermek yerine davranışın herkese etkisini görünür kılar.",
    observe: "Ali yalnızca kendi susuzluğunu değil, sıradaki görünmeyen kişilerin zamanını da hesaba kattı.",
  },
  {
    number: "03",
    icon: "⚽",
    color: "#eba92c",
    soft: "#fff7df",
    title: "Gol mü, değil mi?",
    label: "Oyun kuralı",
    situation:
      "Top kaleye yaklaştı; fakat kale direği olan konilerden biri kaydı. Mert gol olduğunu, Duru sınırın belirsiz olduğunu söylüyor.",
    question: "Yetişkin hakem mi olacak, yoksa çocuklar çalışacak bir kural mı kuracak?",
    wrongImage: `${ASSET_ROOT}/03-game-rules-dont.png`,
    rightImage: `${ASSET_ROOT}/03-game-rules-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Kavga ediyorsanız topu alırım; bugün maç bitti!" },
      { speaker: "Mert", role: "Çocuk A", text: "Ama gerçekten goldü!" },
      { speaker: "Öğretmen", role: "Yetişkin · Hakem", text: "Gol değildi. Kararı ben verdim." },
    ],
    wrongResult: "Tartışma sustu; çocukların kanıtları ayırma, müzakere etme ve ortak kural kurma fırsatı da sustu.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Kuralları netleştirmeye ihtiyacınız var gibi. Sırayla anlatıp ortak kararınızı bulun." },
      { speaker: "Mert", role: "Çocuk A", text: "Top iki koninin arasından geçti; bence goldü." },
      { speaker: "Duru", role: "Çocuk B", text: "Ama sağdaki koni kaydığı için kale sınırı net değildi." },
      { speaker: "Mert", role: "Çocuk A", text: "Konileri birlikte hizalayıp bu pozisyonu saymadan yeniden başlayalım mı?" },
      { speaker: "Duru", role: "Çocuk B", text: "Tamam. Topu ortaya koyup devam edelim." },
    ],
    principle: "Çevre, hatayı görünür kıldığında yetişkinin kararı küçülür.",
    montessori:
      "Montessori’nin hazırlanmış çevresinde sınırları belirginleştirmek bir ‘hata denetimi’ oluşturur. Koniler hizalanınca hakemi yetişkin değil, ortaklaşa düzenlenen saha üstlenir.",
    observe: "Çocuklar ‘kim haklı?’ sorusundan ‘aynı belirsizliği nasıl önleriz?’ sorusuna geçti.",
  },
  {
    number: "04",
    icon: "★",
    color: "#7964dc",
    soft: "#f1efff",
    title: "En sona kim kaldı?",
    label: "Takım seçimi",
    situation:
      "Kaptan Emir güçlü bir takım kurmak için Elif’i en sona bıraktı. Elif artık oyuna katılmak istemediğini söyledi.",
    question: "Zorla oyuna eklenmek, gerçekten ait hissetmekle aynı şey mi?",
    wrongImage: `${ASSET_ROOT}/04-team-selection-dont.png`,
    rightImage: `${ASSET_ROOT}/04-team-selection-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Kimseyi dışlayamazsınız. Elif’i hemen takımınıza alın!" },
      { speaker: "Emir", role: "Takım kaptanı", text: "Ama güçlü bir maç yapmak istiyorduk." },
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "İtiraz ederseniz oyun iptal." },
    ],
    wrongResult: "Elif takıma eklendi; fakat seçim yönteminin verdiği incitici mesaj ve gerçek aidiyet ihtiyacı değişmedi.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Kimseyi sona bırakmayan ve oyunu dengeli tutan nasıl bir yöntem bulabilirsiniz?" },
      { speaker: "Emir", role: "Çocuk B", text: "Biz yalnızca en iyi oyuncuları seçmek istedik." },
      { speaker: "Elif", role: "Çocuk A", text: "Herkes seçilip ben kalınca kendimi değersiz hissettim." },
      { speaker: "Emir", role: "Çocuk B", text: "Böyle hissetmeni istemezdim. Takımları renkli kart çekerek karıştırsak?" },
      { speaker: "Elif", role: "Çocuk A", text: "Olur. Böylece kimse seçim sırasının sonunda beklemez." },
    ],
    principle: "Topluluk, her çocuğun onurunu koruyan yöntemler üretir.",
    montessori:
      "Montessori topluluğunda katılım yalnızca fiziksel olarak oyuna alınmak değildir. Çocuklar yöntemin adil olup olmadığını tartışır ve tekrar kullanılabilecek tarafsız bir düzen kurar.",
    observe: "Grup, beceriyi insan değerine dönüştürmeden dengeli takım kurabilen bir yöntem geliştirdi.",
  },
  {
    number: "05",
    icon: "⌛",
    color: "#159b7c",
    soft: "#e8faf4",
    title: "Ne kadar beklemek adil?",
    label: "Salıncak sırası",
    situation:
      "Can salıncakta. Ece 10’a kadar saydı; Can ise bu sürenin çok kısa olduğunu düşünüyor.",
    question: "Sırayı yetişkin mi yönetecek, yoksa somut bir araç mı herkes için görünür kılacak?",
    wrongImage: `${ASSET_ROOT}/05-swing-turn-dont.png`,
    rightImage: `${ASSET_ROOT}/05-swing-turn-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Can, süren bitti. Hemen in!" },
      { speaker: "Can", role: "Salıncaktaki çocuk", text: "Ama daha yeni bindim!" },
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Ben saydım; tartışma yok." },
    ],
    wrongResult: "Sıra yetişkin denetimine bağlandı; çocuklar ortak ve öngörülebilir bir ritim kuramadı.",
    right: [
      { speaker: "Ece", role: "Bekleyen çocuk", text: "10’a kadar saydım ama hâlâ inmedin." },
      { speaker: "Can", role: "Salıncaktaki çocuk", text: "10 saniye çok kısa; daha yeni bindim." },
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Sallanma keyfi ile adil beklemeyi nasıl dengeleyebilirsiniz? Bir araç işe yarar mı?" },
      { speaker: "Can", role: "Çocuk B", text: "Kum saatiyle üç dakika olsun. Bitince kendim sırayı veririm." },
      { speaker: "Ece", role: "Çocuk A", text: "Tamam, kum saatini ben çeviriyorum." },
    ],
    principle: "Hazırlanmış çevre, yetişkin buyruğunun yerini alabilir.",
    montessori:
      "Kum saati ‘çok uzun–çok kısa’ tartışmasını ölçülebilir hale getirir. Zamanı öğretmen değil çevredeki somut araç gösterir; geçiş sorumluluğu çocuklarda kalır.",
    observe: "Süre kişisel güç mücadelesi olmaktan çıkıp iki çocuğun da önceden bildiği ortak ölçüye dönüştü.",
  },
  {
    number: "06",
    icon: "↗",
    color: "#db75a3",
    soft: "#fff0f7",
    title: "Küçüksün, oynayamazsın?",
    label: "Karma yaş",
    situation:
      "11 yaşındaki Mete, 7 yaşındaki Can’ın oyunu bozacağını düşünüp onu oyun alanının dışında bıraktı.",
    question: "Zorunlu katılım mı, yoksa büyük çocuğun doğal liderliği mi gerçek bir köprü kurar?",
    wrongImage: `${ASSET_ROOT}/06-age-hierarchy-dont.png`,
    rightImage: `${ASSET_ROOT}/06-age-hierarchy-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Mete, küçüklere kötü örnek oluyorsun. Can’ı oyuna almak zorundasın." },
      { speaker: "Mete", role: "Büyük çocuk", text: "Ama kurallar onun için çok hızlı." },
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Bahane istemiyorum; aynı görevi verin." },
    ],
    wrongResult: "Katılım dayatıldı; yaş farkının gerektirdiği destek ve anlamlı başlangıç rolü tasarlanmadı.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Mete, oyun kurmadaki ustalığın Can’ın ilgisini çekiyor. Ona hangi gerçek başlangıç rolünü verebilirsiniz?" },
      { speaker: "Mete", role: "Büyük çocuk", text: "Oyun hızlı ama önce kale arkasında topları düzenleyebilir." },
      { speaker: "Can", role: "Küçük çocuk", text: "Sonra bana pas vermeyi de öğretir misin?" },
      { speaker: "Mete", role: "Büyük çocuk", text: "Evet. Önce bu rolle başlarız, sonra kısa pasları birlikte deneriz." },
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Rol netleşti; şimdi nasıl işleyeceğini siz deneyebilirsiniz." },
    ],
    principle: "Karma yaş, doğal model olma ve liderlik için hazırlanmış bir topluluktur.",
    montessori:
      "Büyük çocuk zorunlu yardımcı öğretmen değildir; deneyimini modelleyebilen bir topluluk üyesidir. Küçük çocuğa gerçek, erişilebilir ve gelişmeye açık bir rol verilir.",
    observe: "Mete rehberlik üstlenirken Can pasif izleyici olmadı; anlamlı bir başlangıç sorumluluğu buldu.",
  },
  {
    number: "07",
    icon: "◌",
    color: "#ee6174",
    soft: "#fff0f2",
    title: "Şaka kime göre komik?",
    label: "Lakap ve alay",
    situation:
      "Deniz’in kalemleri kazayla yere düştü. Arda ona ‘sakar’ diyerek güldü; Deniz utandı ve kalem kutusunu kendine çekti.",
    question: "Zoraki bir özür mü duyacağız, yoksa incinen sınır gerçekten anlaşılacak mı?",
    wrongImage: `${ASSET_ROOT}/07-teasing-dont.png`,
    rightImage: `${ASSET_ROOT}/07-teasing-do.png`,
    wrong: [
      { speaker: "Öğretmen", role: "Yetişkin · Yargıç", text: "Arda, çok ayıp! Herkesin önünde hemen özür dile." },
      { speaker: "Arda", role: "Çocuk B", text: "Özür dilerim… Şaka yapmıştım." },
      { speaker: "Deniz", role: "Çocuk A", text: "Ama neden kırıldığımı hiç konuşmadık." },
    ],
    wrongResult: "Özür duyuldu; fakat alayın etkisi, Deniz’in sınırı ve gelecekte değişecek davranış anlaşılmadı.",
    right: [
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Deniz, kalemlerin düştükten sonra sessizleştiğini fark ettim. Ne hissettiğini paylaşmak ister misin?" },
      { speaker: "Deniz", role: "Çocuk A", text: "Bana ‘sakar’ deyip güldüğünde utandım ve kırıldım. Kazalarım üzerinden alay edilmesini istemiyorum." },
      { speaker: "Arda", role: "Çocuk B", text: "Komik olduğunu düşünmüştüm; seni böyle etkilediğini anlamamıştım." },
      { speaker: "Arda", role: "Çocuk B", text: "Özür dilerim. Bir daha alay etmeyeceğim; kalemlerini toplamaya yardım edebilirim." },
      { speaker: "Öğretmen", role: "Montessori danışmanı", text: "Deniz sınırını söyledi; Arda da neyi değiştireceğini belirledi." },
    ],
    principle: "Zarafet ve Kibarlık, ezberlenmiş söz değil; davranışın etkisini fark etmektir.",
    montessori:
      "Yetişkin otomatik özür istemek yerine niyet ile etki arasındaki farkı duyulur kılar. İncinmiş çocuk sınırını söyler; diğer çocuk gönüllü ve somut bir onarım seçer.",
    observe: "Arda ‘şakaydı’ savunmasından uzaklaşıp etkinin sorumluluğunu ve yeni davranışını ifade etti.",
  },
];

const durations = {
  situation: 6800,
  wrong: 6200,
  bridge: 4300,
  right: 6200,
  insight: 9800,
  transition: 3200,
};

const elements = {
  app: document.querySelector("#app"),
  cover: document.querySelector("#cover"),
  story: document.querySelector("#story"),
  stage: document.querySelector("#storyStage"),
  dots: document.querySelector("#scenarioDots"),
  timeline: document.querySelector("#timelineFill"),
  start: document.querySelector("#startButton"),
  restart: document.querySelector("#restartButton"),
  previous: document.querySelector("#previousButton"),
  play: document.querySelector("#playButton"),
  playIcon: document.querySelector("#playIcon"),
  next: document.querySelector("#nextButton"),
};

const state = {
  scenarioIndex: 0,
  phase: "situation",
  lineIndex: 0,
  playing: true,
  timer: null,
  remaining: durations.situation,
  startedAt: 0,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentScenario() {
  return scenarios[state.scenarioIndex];
}

function currentDuration() {
  return durations[state.phase] || 0;
}

function speakerInitial(name) {
  return name === "Öğretmen" ? "M" : name.slice(0, 1).toLocaleUpperCase("tr-TR");
}

const girlSpeakers = new Set(["Elif", "Selin", "Duru", "Ece", "Deniz"]);

function speakerPlacement(name) {
  if (name === "Öğretmen") return "speaker-teacher";
  return girlSpeakers.has(name) ? "speaker-right" : "speaker-left";
}

function preloadScenario(index) {
  const scene = scenarios[index];
  if (!scene) return;
  [scene.wrongImage, scene.rightImage].forEach((source) => {
    const image = new Image();
    image.src = source;
  });
}

function renderDots() {
  elements.dots.innerHTML = scenarios
    .map(
      (scenario, index) => `
        <button
          type="button"
          class="${index === state.scenarioIndex ? "active" : index < state.scenarioIndex ? "done" : ""}"
          data-scenario="${index}"
          aria-label="${index + 1}. senaryo: ${escapeHtml(scenario.label)}"
          aria-current="${index === state.scenarioIndex ? "step" : "false"}"
        >${scenario.number}</button>`,
    )
    .join("");
}

function renderSituation(scene) {
  return `
    <article class="situation-screen" style="--scene:${scene.color};--scene-soft:${scene.soft}">
      <div class="situation-number"><span>${scene.number}</span><i aria-hidden="true">${scene.icon}</i></div>
      <small>Durum ortaya çıkıyor · ${escapeHtml(scene.label)}</small>
      <h2>${escapeHtml(scene.title)}</h2>
      <p class="situation-copy">${escapeHtml(scene.situation)}</p>
      <p class="situation-question">${escapeHtml(scene.question)}</p>
    </article>`;
}

function renderScene(scene, kind) {
  const isRight = kind === "right";
  const lines = scene[kind];
  const line = lines[state.lineIndex];
  const label = isRight ? "2. Yol · Montessori danışmanı" : "1. Yol · Yetişkin yargıç";

  return `
    <article class="scene-screen ${kind}">
      <div class="scene-visual">
        <img class="scene-backdrop" src="${isRight ? scene.rightImage : scene.wrongImage}" alt="" aria-hidden="true" />
        <div class="scene-art">
          <img
            class="scene-image"
            src="${isRight ? scene.rightImage : scene.wrongImage}"
            width="1672"
            height="941"
            alt="${escapeHtml(scene.label)} — ${isRight ? "Montessori yaklaşımı" : "geleneksel yaklaşım"}"
            decoding="async"
            draggable="false"
          />
          <div class="approach-label"><i aria-hidden="true">${isRight ? "✓" : "×"}</i>${label}</div>
          <div class="comic-bubble ${speakerPlacement(line.speaker)}" key="${kind}-${state.lineIndex}">
            <div class="speaker-line">
              <span aria-hidden="true">${speakerInitial(line.speaker)}</span>
              <div><b>${escapeHtml(line.speaker)}</b><small>${escapeHtml(line.role)}</small></div>
            </div>
            <div class="dialogue-index">${state.lineIndex + 1} / ${lines.length}</div>
            <p>${escapeHtml(line.text)}</p>
          </div>
        </div>
      </div>
    </article>`;
}

function renderBridge(scene) {
  return `
    <article class="bridge-screen">
      <small>Birinci yolun ardından</small>
      <h2>Sorun sustu.<br />Peki öğrenme?</h2>
      <p>${escapeHtml(scene.wrongResult)}</p>
      <div class="bridge-arrow" aria-hidden="true">→</div>
    </article>`;
}

function renderInsight(scene) {
  return `
    <article class="insight-screen">
      <div class="insight-mark" aria-hidden="true">✦</div>
      <small>Montessori bağlantısı</small>
      <h2>${escapeHtml(scene.principle)}</h2>
      <p>${escapeHtml(scene.montessori)}</p>
      <div class="observation"><b>Bu sahnede ne değişti?</b><p>${escapeHtml(scene.observe)}</p></div>
    </article>`;
}

function renderTransition() {
  const next = scenarios[state.scenarioIndex + 1];
  return `
    <article class="transition-screen">
      <div class="countdown" aria-hidden="true">${next.number}</div>
      <small>Sıradaki durum otomatik açılıyor</small>
      <h2>${escapeHtml(next.title)}</h2>
    </article>`;
}

function renderComplete() {
  return `
    <article class="complete-screen">
      <div class="insight-mark" aria-hidden="true">✦</div>
      <h2>Yedi çatışma.<br />Bir ortak ilke.</h2>
      <p>Çocuk hazır cevaptan çok, düşünebileceği güvenli bir alana ihtiyaç duyar. Yetişkin geri çekildiğinde toplumsal muhakeme öne çıkar.</p>
      <button type="button" id="replayButton">Baştan yeniden izle ↻</button>
    </article>`;
}

function renderStage() {
  const scene = currentScenario();
  if (state.phase === "situation") elements.stage.innerHTML = renderSituation(scene);
  if (state.phase === "wrong") elements.stage.innerHTML = renderScene(scene, "wrong");
  if (state.phase === "bridge") elements.stage.innerHTML = renderBridge(scene);
  if (state.phase === "right") elements.stage.innerHTML = renderScene(scene, "right");
  if (state.phase === "insight") elements.stage.innerHTML = renderInsight(scene);
  if (state.phase === "transition") elements.stage.innerHTML = renderTransition();
  if (state.phase === "complete") elements.stage.innerHTML = renderComplete();

  document.querySelector("#replayButton")?.addEventListener("click", () => selectScenario(0));
}

function restartTimeline(duration) {
  elements.timeline.classList.remove("running");
  elements.timeline.style.setProperty("--duration", `${duration}ms`);
  void elements.timeline.offsetWidth;
  if (duration > 0) elements.timeline.classList.add("running");
}

function updatePlayButton() {
  const completed = state.phase === "complete";
  elements.playIcon.textContent = completed ? "↻" : state.playing ? "Ⅱ" : "▶";
  elements.play.setAttribute(
    "aria-label",
    completed ? "Baştan yeniden izle" : state.playing ? "Durdur" : "Devam et",
  );
  elements.app.classList.toggle("paused", !state.playing);
}

function clearTimer() {
  if (state.timer) window.clearTimeout(state.timer);
  state.timer = null;
}

function armTimer(duration = currentDuration()) {
  clearTimer();
  state.remaining = duration;
  state.startedAt = Date.now();
  restartTimeline(duration);
  if (state.playing && duration > 0) {
    state.timer = window.setTimeout(advance, duration);
  }
}

function enterPhase(phase, lineIndex = 0) {
  state.phase = phase;
  state.lineIndex = lineIndex;
  renderDots();
  renderStage();
  updatePlayButton();
  armTimer();
}

function advance() {
  clearTimer();
  const scene = currentScenario();

  if (state.phase === "situation") return enterPhase("wrong", 0);
  if (state.phase === "wrong" && state.lineIndex < scene.wrong.length - 1) {
    return enterPhase("wrong", state.lineIndex + 1);
  }
  if (state.phase === "wrong") return enterPhase("bridge");
  if (state.phase === "bridge") return enterPhase("right", 0);
  if (state.phase === "right" && state.lineIndex < scene.right.length - 1) {
    return enterPhase("right", state.lineIndex + 1);
  }
  if (state.phase === "right") return enterPhase("insight");
  if (state.phase === "insight" && state.scenarioIndex < scenarios.length - 1) {
    preloadScenario(state.scenarioIndex + 1);
    return enterPhase("transition");
  }
  if (state.phase === "insight") return enterPhase("complete");
  if (state.phase === "transition") {
    state.scenarioIndex += 1;
    preloadScenario(state.scenarioIndex);
    return enterPhase("situation");
  }
  if (state.phase === "complete") return selectScenario(0);
}

function pause() {
  if (!state.playing || state.phase === "complete") return;
  const elapsed = Date.now() - state.startedAt;
  state.remaining = Math.max(120, state.remaining - elapsed);
  clearTimer();
  state.playing = false;
  updatePlayButton();
}

function resume() {
  if (state.phase === "complete") return selectScenario(0);
  if (state.playing) return;
  state.playing = true;
  state.startedAt = Date.now();
  state.timer = window.setTimeout(advance, state.remaining);
  updatePlayButton();
}

function togglePlay() {
  if (state.phase === "complete") return selectScenario(0);
  if (state.playing) pause();
  else resume();
}

function selectScenario(index) {
  clearTimer();
  state.scenarioIndex = Math.min(Math.max(index, 0), scenarios.length - 1);
  state.playing = true;
  preloadScenario(state.scenarioIndex);
  enterPhase("situation");
}

function nextScenario() {
  if (state.scenarioIndex >= scenarios.length - 1) return enterPhase("complete");
  selectScenario(state.scenarioIndex + 1);
}

function previousScenario() {
  if (state.scenarioIndex === 0) return showCover();
  selectScenario(state.scenarioIndex - 1);
}

function showCover() {
  clearTimer();
  elements.story.classList.add("hidden");
  elements.cover.classList.remove("hidden");
  state.playing = false;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function startStory() {
  elements.cover.classList.add("hidden");
  elements.story.classList.remove("hidden");
  state.scenarioIndex = 0;
  state.playing = true;
  preloadScenario(0);
  enterPhase("situation");
}

elements.start.addEventListener("click", startStory);
elements.restart.addEventListener("click", showCover);
elements.previous.addEventListener("click", previousScenario);
elements.play.addEventListener("click", togglePlay);
elements.next.addEventListener("click", advance);

elements.dots.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scenario]");
  if (button) selectScenario(Number(button.dataset.scenario));
});

document.addEventListener("keydown", (event) => {
  if (elements.story.classList.contains("hidden")) return;
  if (event.key === "ArrowRight") advance();
  if (event.key === "ArrowLeft") previousScenario();
  if (event.key === " ") {
    event.preventDefault();
    togglePlay();
  }
});

let touchStartX = null;
let touchStartY = null;

elements.stage.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  },
  { passive: true },
);

elements.stage.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;
    if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) nextScenario();
    else previousScenario();
  },
  { passive: true },
);

renderDots();
