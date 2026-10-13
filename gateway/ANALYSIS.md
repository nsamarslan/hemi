# Gateway Experience — Derinlemesine Analiz ve Uygulama Eşlemesi

Bu doküman, Monroe Enstitüsü'nün **Gateway Experience** ev eğitim serisini derinlemesine inceler ve
`gateway/` dizinindeki uygulamanın bu seriyi nasıl modellediğini açıklar. Uygulama **bağımsızdır**:
özgün sesli metinler, tarayıcıda sentezlenen binaural yatak; Hemi-Sync® / Gateway Experience®
tescilli markalarıdır ve bu uygulama onlarla bağlantılı değildir (bkz. son bölüm).

---

## 1. Giriş

Gateway Experience, Monroe Enstitüsü tarafından geliştirilen, evde çalışmaya uyarlanmış bir bilinç
genişletme eğitimidir. Temel fikri basit ve radikaldir: **iki kulağa biraz farklı frekansta ses
verilirse beyin, aradaki farkı üçüncü bir "hayalet" ritim olarak algılar** ve zamanla o ritme
senkronize olur. Bu ritimler (binaural ritimler / Hemi-Sync), sözlü yönlendirme ve zihinsel
araçlarla birleştirilerek kişi, sıradan uyanık bilincin ötesindeki durumlara — Monroe'nun
adlandırdığı **Focus seviyelerine** — taşınır.

Seri, her biri altı egzersizden oluşan sekiz **Dalga**'dan (Wave) oluşur. Dalgalar sıralıdır; her
biri bir öncekine dayanır. Bir egzersiz tipik olarak 30–45 dakika sürer.

## 2. Tarihçe

- **1958** — Radyo yayıncısı Robert A. Monroe, bedeninin uyuduğu sırada zihinsel olarak dışarı
  çıkabildiği, "beden dışı deneyim" (OBE) dediği ilk yaşantılarını kaydeder.
- **1971** — İlk kitabı *Journeys Out of the Body*'yi (Beden Dışı Yolculuklar) yayımlar;
  aynı yıl Virginia'da **The Monroe Institute**'ü kurar (önce Mind Research Institute).
- **1970'ler** — Hemi-Sync® (hemisferik senkronizasyon) teknolojisini geliştirir: iki kulağa farklı
  frekanslar verilerek beyin yarıkürelerinin senkronize olması.
- **1977–1983** — Enstitü, **Gateway Voyage** adlı 6 günlük yatılı programı sunar. Bu programın
  ev versiyonu olarak **Gateway Experience** serisi (kaset/CD) doğar: önce 6 dalga.
- **1983** — Amerikan ordusu (INSCOM), Yarbay Wayne M. McDonnell'a Gateway Süreci'ni analiz
  ettirir. Rapor 2003'e kadar gizli kalır (bkz. §8).
- **1984–1996** — Dalgalar I–VI (Discovery, Threshold, Freedom, Adventure, Exploring, Prospecting)
  kaset/CD olarak yayınlanır.
- **2004** — **Wave VI Odyssey** (Focus 21'e ilk ev erişimi) yayınlanır; eski "Prospecting"
  dalgasının sesli devamı niteliğindedir.
- **2019** — **Wave VII Voyager** (Focus 23/25/27; Lifeline programına dayanır) yayınlanır.
- **2022** — **Wave VIII Union** (Focus 27 ötesi; Exploration 27 programına dayanır) yayınlanır.
- **2025–2026** — Enstitü, Gateway Voyage'ı Monroe'nun özgün sesiyle, Monroe Sound Science (MSS)
  yeniden master edilmiş olarakçevrimiçi rehberli deneyim olarak sunar.

## 3. Teknoloji: Hemi-Sync ve binaural ritimler

**Mekanizma.** Sol kulağa 180 Hz, sağ kulağa 187,5 Hz verlirse beyin, iki sinyalin farkı olan
7,5 Hz'lik bir "hayalet" ritim algılar. Bu ritim havada yoktur; beynin üst olive kompleksi
tarafından üretilir. Monroe'nun iddiası: bu ritimler iki yarıküreyi aynı genlik ve frekansta
çalışmaya — **hemisferik senkronizasyona** — davet eder.

**Hemi-Sync®**, Monroe Enstitüsü'nün bu teknolojiye verdiği tescilli addır. Gerçek Hemi-Sync
kayıtları tek bir ritim değil, katmanlı frekans karışımları, özel faz ilişkileri ve ince ses
efektleriyle üretilir; bu karışımlar **ticari sırdır** ve kamuya açık değildir.

**Zorunluluklar:**
- **Stereo kulaklık şarttır.** Binaural ritimler iki kulağa ayrı ayrı verilen frekanslarla oluşur;
  hoparlörle (aynı sinyal her iki kulağa equally) veya tek kulakla duyulmaz.
- Ritimler düşük genlikte, uzun süreli ve sabırla sürer; "anında etki" vaat etmez.

**Bu uygulamadaki yaklaşım:** Her Focus seviyesi için kamuya açık açıklamalara dayanan
**yaklaşık** ritim değerleri kullanılır (bkz. §4 ve `content/common.json`). Taşıyıcı frekanslar
135–180 Hz bandında, ritimler 0,5–7,5 Hz arasındadır. Bu değerler Monroe'nun özgün karışımlarının
yerine geçmez; benzer bandlara denk gelen bir sentezdir.

## 4. Focus seviyeleri

Monroe'nun bilinç durumlarına verdiği adlar. Sayılar atlanmaz; seride henüz ele alınmayanlar
yalnızca "evde öğretilmeyen" seviyelerdir.

| Seviye | Adı (TR / EN) | Beyin dalgası (yaklaşık) | Ritim (Hz, approx.) | İlk kez |
|---|---|---|---|---|
| Focus 3 | Tüm Beyin Durumu / Whole-Brain State | alfa | — | Hemi-Sync temeli |
| Focus 10 | Zihin Uyanık, Beden Uykuda / Mind Awake, Body Asleep | alfa–teta sınırı | 7,5 | Dalga I |
| Focus 12 | Genişlemiş Farkındalık / Expanded Awareness | teta | 4,5 | Dalga II |
| Focus 15 | Zamansızlık / No Time | teta–delta sınırı | 2,8 | Dalga V (dokunuş) |
| Focus 21 | Diğer Enerji Sistemleri / Other Energy Systems | derin delta | 1,2 | Dalga VI |
| Focus 23 | Geçiş Bölgesi / The Transition Area | delta ötesi | 0,9 | Dalga VII |
| Focus 25 | İnanç Sistemleri Toprakları / Belief System Territories | delta ötesi | 0,7 | Dalga VII |
| Focus 27 | Yaşamlar Arası Karşılama Merkezi / The Reception Center | delta ötesi | 0,5 | Dalga VII |
| Focus 34/35 | Toplanma / The Gathering | — | — | Far Journeys (yatılı) |
| Focus 42, 49 | İleri seviyeler | — | — | Enstitü programları |

Ek kavramlar: **C-1** = sıradan uyanık bilinç (Focus 1). **Locale 1** = Focus 12 hali;
**Locale 2** = Focus 21 civarı. "Focus 10'a giriş" geleneksel olarak zihinde *on* sayısını
tutmakla yapılır; 10'dan 12'ye *on, on bir, on iki* diye sayarak geçilir.

## 5. Dalgalar (Waves of Change)

Her dalga 6 egzersizdir (Wave VIII resmî olarak 4 CD'de 8 egzersiz içerir; bu uygulamada temsili
6 oturum vardır). Dalgalar sıralıdır.

| Dalga | Adı | Odak | Egzersizler (özet) |
|---|---|---|---|
| I | **Discovery** (Keşif) | 10 | Orientation, Intro to Focus 10, Advanced Focus 10, Release & Recharge, Exploration Sleep, Free Flow 10 |
| II | **Threshold** (Eşik) | 12 | Intro to Focus 12, Problem Solving, One-Month Patterning, Color Breathing, Energy Bar Tool, Living Body Map |
| III | **Freedom** (Özgürlük) | 10/12 | Lift Off, Remote Viewing, Vectors, Five Questions, Energy Food, First-Stage Separation |
| IV | **Adventure** (Macera) | 12 | One-Year Patterning, Five Messages, Free Flow 12, NVC I, NVC II, Compoint |
| V | **Exploring** (Keşifler) | 12/15 | Mission 10, Mission 12, Mission Day, Mission Night, Horizons, Pathways |
| VI | **Odyssey** | 12→21 | Sensing, Expansion, Point of Departure, Nonphysical Friends, Intro to Focus 21, Free Flow Journey in Focus 21 |
| VII | **Voyager** (2019) | 23/25/27 | Explore Total Self, Intro to Focus 23, Intro to Focus 25, Intro to Focus 27, Retrieval, Messages From Beyond |
| VIII | **Union** (2022) | 27+ | Special Tour, Meeting with the Entry Director, Educational Opportunities, Healing and Regeneration, Free Flow 27, ötesi |

Not: Eski **Wave VI "Prospecting"** (1996, sesli yönlendirme içermez: Metamorphosite, Bio-Body,
Null Point, Plus Polarity, Near Reaches, Far Reaches) 2004'te sesli **Odyssey** ile güncellenmiştir;
resmî Wave VI artık Odyssey'dir.

## 6. Temel teknikler ve araçlar

Serideki her egzersiz aynı **Hazırlık Süreci**'yle başlar ve benzer bir iskelet izler:

1. **Hazırlık Süreci (Preparatory Process)**
   - *Enerji Dönüşüm Kutusu (Energy Conversion Box, ECB):* zihinde bir kutu canlandırılır; günün
     kaygıları, dikkat dağıtıcıları kutuya konur, kapak kapatılır. En çok övülen araçlardan biridir.
   - *Rezonans Ayarı (Resonant Tuning):* banttaki uğultuyla birlikte mırıldanarak beden-zihin
     rezonansa getirilir (CIA raporunda ~7 Hz civarı titreşimden söz edilir).
   - *Focus 10 girişi:* zihinde on sayısı tutulur, beden uyur, zihin uyanık kalır.
   - *Gateway Afirmasyonu:* "Fiziksel maddeden fazlasıyım… benden daha bilgili varlıklardan yardım
     ve rehberlik isterim." (uygulamada özgün sözlerle yeniden yazılmıştır).
2. **Araçlar**
   - **Enerji Çubuğu Aracı (Energy Bar Tool, EBT):** avuçlar arasında şarj edilen bir ışık
     noktası, titreşen bir enerji çubuğuna uzatılır; beden taraması, enerji yönlendirme,
     iyileştirme için kullanılır. Uzaktan görmede çubuk bir **girdaba** dönüştürülür.
   - **REBAL (Resonant Energy Balloon):** bedenin etrafında yumurta biçimli bir enerji balonu;
     hem enerji akışını artırır hem koruma sağlar.
   - **Canlı Beden Haritası (Living Body Map):** bedenin zihinsel haritası; EBT ile taranır.
   - **Renk Nefesi (Color Breathing):** renkler nefesle bedene alınır; psike–soma köprüsü.
   - **Örüntüleme (Patterning):** bir aylık / bir yıllık istenen durum, Focus 12'de varmış gibi
     tutulur.
   - **Problem Çözme:** soru merkeze konur, tüm yönlere akıtılır, serbest bırakılır.
   - **Beş Soru / Beş Mesaj:** hazır sorular sorulur, mesajlar alınır.
   - **Enerji Besini (Energy Food):** çevredeki enerji, uzun keşifler için bedene alınır.
   - **Sözsüz İletişim (NVC):** kelimesiz mesajlaşma.
   - **İletişim Noktası (Compoint):** iletişimin yaşanacağı kişisel bir yer kurulur.
   - **Serbest Akış (Free Flow):** amaçsız, yargısız dolaşma; planlı keşiflerin arka planı.
   - **Keşif, Uyku (Exploration, Sleep):** uyku, başka gerçekliklere doğal bir kapıdır.
   - **Birinci Aşama Ayrışma:** bedenden ayrışmanın ilk teknikleri (dönme, yuvarlanma, sürüklenme).
   - **Enerji bedeni çalışmaları (Odyssey):** hissetme, genişleme, kalkış noktası, fiziksel
     olmayan temas.
   - **Kurtarma (Retrieval, Lifeline):** geçiş bölgesinde ilerleyemeyen varlıklara yardım.

## 7. Bir egzersizin anatomisi

Tipik bir Gateway egzersizi (banttan bağımsız ortak yapı):

1. **Hazırlık** — bedenin yerleşmesi, ECB, rezonans ayarı, afirmasyon (birkaç dakika).
2. **Giriş** — Focus 10, gerekirse 12/15/21'e geçiş (binaural ritim bu geçişte yavaşça
   kayar; orijinal bantlarda 10→12 geçişi ~10 dakikada olur).
3. **Çalışma bölümü** — aracın kurulması ve/veya keşif (en uzun bölüm; 15–30 dk).
4. **Dönüş** — bulunulan seviyeden 10'a, sonra uyanık bilince dönüş; beden canlandırılır.
5. **Değerlendirme** — deneyim not alınır (uygulamada günlüğe kaydedilir).

Çan sesleri bölümleri işaretler; bantlar boyunca Hemi-Sync sinyalleri süreklidir.

## 8. CIA "Gateway Process" raporu (1983)

- **"Analysis and Assessment of Gateway Process"**, Yarbay Wayne M. McDonnell, Amerikan
  Ordusu INSCOM, 9 Haziran 1983. 2003'te deklasifiye edildi; **25. sayfa hâlâ gizli**.
- Rapor binaural ritimleri, hemisferik senkronizasyonu (EEG ile ölçülebilir), Bentov'un
  biyofizik modelini, Bohm'un holografik evren kuramını ve Schumann rezonansını (~7–7,5 Hz)
  bir çerçevede yorumlar.
- Öne çıkan teknik pasajlar: hazırlık süreci, ECB, rezonans ayarı, REBAL, enerji çubuğu,
  beden haritası, uzaktan görme; OBE bandı için "yaklaşık 2877,3 devir/sn" beta sinyalleri
  (raporda bu şekilde geçer).
- Rapor bir **değerlendirmedir**, deney değildir; Stargate uzaktan görme programıyla
  aynı dönemin ruhunu taşır.

## 9. Bilimsel durum (özet)

- **Binaural ritimler gerçektir ve ölçülebilir**: Garcia-Argibay ve ark. (2019) meta-analizi
  (22 çalışma) biliş, anksiyete ve ağrı algısında orta düzey etki (Hedges g ≈ 0,45) buldu;
  anksiyete için daha güçlü (g ≈ 0,69).
- **Hemisferik senkronizasyon** iddiasına EEG desteği sınırlı ama vardır (binaural ritimlere
  yanıtta yarıküreler arası uyum artışı gösteren çalışmalar bulunur).
- **OBE / uzaktan görme / "geçiş bölgesi"** iddiaları için bilimsel kanıt yoktur; bu alanlar
  öznel deneyim olarak ele alınmalıdır.
- Hemi-Sync'ün belgelenmiş tıbbi bir kullanımı vardır (bazı cerrahi işlemlerde fentanyl'e
  kısmi alternatif olarak rapor edilmiştir) — bu, ritimlerin fizyolojik etkisinin ciddiyetinin
  bir göstergesidir, mucizevi bir iddia değildir.

## 10. Güvenlik

- Kulaklık şarttır; hoparlörle ritim oluşmaz.
- Araç sürerken, makine başındayken, tehlikeli işlerde kullanılmaz.
- Baş dönmesi, kaygı, panik, rahatsızlık hissinde oturum durdurulur.
- Epilepsi öyküsü olanlar doktoruna danışmadan bu tür uyaranlardan kaçınmalıdır.
- Uyku oturumlarında (Exploration, Sleep; Mission Night) amaç uykuya dalmaktır; ekran kararır,
  çan çalmaz.
- Bu bir terapi değil, kendini keşif aracıdır; psikiyatrik yakınması olanların profesyonel
  destek alması gerekir.

## 11. Bu uygulamaya eşleme (Eye → Gateway)

Eye (Üçüncü Göz Egzersizleri) projesinin denenmiş mimarisi temel alınarak geliştirilmiştir:

| Eye | Gateway uygulaması |
|---|---|
| `content/exercises/*.json` (20 egzersiz, iki dilli) | `content/sessions/*.json` (124 oturum, 13 dalga, 5 seri) + `templates.json` (paylaşılan fazlar) + `focus.json` + `series.json` |
| `tools/build.mjs` (içeriği `window.APP_CONTENT`'a gömer) | `tools/expand.mjs` (şablonları açar) + `build.mjs` + `validate-content.mjs` |
| `timeline.js` → olay listesi (klip/ zil) | `timeline.js` → olay listesi **+ sürekli binaural yatak** (faz başına segment, çapraz geçiş, frekans kayması, mutlak faz) |
| `audio.js` — OfflineAudioContext ile 300 sn'lik mono WAV chunk'lar | `audio.js` — **saf JS stereo WAV renderer** (22,05 kHz), chunk sınırlarında faz sürekliliği, kenar sönümleri; tek `<audio>` öğesiyle çalar (ekran kilidinde çalar, kilit ekranı kontrolleri) |
| Kayıtlı TTS klipleri (XTTS/Piper) + speechSynthesis yedeği | Telefonun kendi TTS sesi (klipsiz); mimari kayıtlı kliplere hazır (`audio.packs`) |
| Günlük (not + çizim), seri, sık kullanılanlar | Aynı + **deneyim etiketleri** (titreşim, görüntü, hareket, temas, içgörü…) |
| PWA (manifest + sw), Capacitor Android | PWA (manifest + sw); Android sarmalayıcı v1'de yok |
| "Ekranı kilitle, ses devam eder" | Aynı; üstelik yatak (ritim) WAV içinde çaldığı için ekran kilidinde **ritim kesilmez** |

**Tasarım kararları:**
- Yatak sürekli çalar: fazlar arası 8 sn çapraz geçiş, Focus geçişleri tüm giriş fazı boyunca
  yavaş kayar (orijinal bantlardaki 10→12 geçişine benzer).
- Gece oturumları: koyu ekran, bitiş zili yok, sessiz bitiş.
- Program görünümü: istenen oturumları sıraya dizer **veya bir dalgayı baştan sona tek seferde**
  çalar (seri sıralı ilerler).
- Her oturumdan sonra deneyim günlüğü: etiketler + not + çizim.

**Özgünlük:** Tüm sesli metinler bu proje için yazılmıştır; Monroe'nun anlatımından uzun
alıntılar yoktur. Ritim değerleri kamuya açık açıklamalara dayanan yaklaşıklardır.
Hemi-Sync® ve Gateway Experience®, Monroe Institute'un tescilli markalarıdır.

## 12. Sorumluluk reddi

Bu uygulama bağımsız bir eğitim aracıdır. Monroe Enstitüsü ile bağlantılı, onaylı veya onun
adına geliştirilmiş değildir. "Focus seviyeleri", "geçiş bölgesi", "kurtarma" gibi kavramlar
Enstitü'nün kamuya açık literatüründeki adlardır; uygulamadaki deneyimler özneldir ve bilimsel
iddia taşımaz.

## 13. v0.2 katalog genişletmesi — tüm Monroe yolculuk eserleri

İlk sürüm (v0.1) yalnızca Waves of Change I–VIII'i kapsıyordu. v0.2 ile uygulama Monroe'nun tüm
ev tipi yolculuk kataloğunu **5 seri, 13 dalga, 124 oturum** olarak sunar:

| Seri | Dönem | İçerik | Oturum |
| --- | --- | --- | --- |
| Erken Dönem · Beden Dışı Yolculuklar | 1970'ler | *Hemi-Sync Support for Journeys Out of the Body*: giriş, gevşeme egzersizi, sınır uyku yönteminin Koşul A–D | 6 |
| Waves of Change · Değişim Dalgaları | 1998–2022 | Dalga I–VIII; resmi 50 egzersiz + Serbest Akış 27 eşlikçisi | 51 |
| Gateway · Özgün Seri, Serbest Akış | 1984–1996 | *Exploring* (Mission 10/12, Gündüz, Gece, Ufuklar, Yollar) ve *Prospecting* (Metamorfozit, Biyo-Beden, Boşluk Noktası, Artı Kutup, Yakın/Uzak Ufuklar) | 12 |
| Human Plus (H-Plus®) · Fonksiyon Egzersizleri | 1987–1989 | 53 fonksiyon: 1989 kitapçığının 49'u + Zoning, Access To Energy, Do This Now, Hypertension | 53 |
| Gateway Voyage · Açık Oturumlar | 1980 / çevrimiçi | Giriş Egzersizi ve arşivden 43 dakikalık Açık Egzersiz | 2 |

Öne çıkan değişiklikler:

- **Dalga V ayrımı.** Özgün 1984 serbest akış *Exploring* (Mission 10/12, Gündüz, Gece, Ufuklar,
  Yollar) Özgün Seri'ye taşındı; sesli 1998 *Exploring* (İleri Focus 12, Sezgi keşifleri, Focus 15'e
  giriş, Görev 15, Focus 15'te serbest keşif) yeni Dalga V olarak eklendi. Odyssey artık sesli
  Dalga V'e bağlanıyor.
- **Prospecting (1984, 1996 yeniden basımı).** Altı enstrümantal parça eklendi. Boşluk Noktası,
  Focus 12'nin ötesi olarak Focus 15 bandında modellenir (ritim 4,5 Hz'den 2,8 Hz'e kayar);
  Uzak Ufuklar Focus 21'e kadar uzanır.
- **Dalga VIII tamamlandı.** Resmi sekiz egzersizin tamamı: Planlama Merkezi, Koordinasyon
  Bölgesi ve İç Dünya eklendi; son egzersiz "The Absolute" (Mutlak) olarak yeniden adlandırıldı.
  Serbest Akış 27, eşlikçi bir oturum olarak kaldı.
- **Human Plus (H-Plus®).** 53 fonksiyon egzersizi, her biri Erişim Kanalı'na (yeni eklenen
  **Focus 11**, 6 Hz) giriş, komut kodlama ve dönüşten oluşur. Kitapçıktan doğrulanan 22 komut
  (Plus Focus, Plus Flow Better, Plus Calculate, Plus Flow Smooth, Plus Open/Closed, Plus 55515,
  Plus No More, Plus Clean/Clear, Plus Satisfied/Supplied, Plus Eight/Great, Plus Control/Balance/
  Restore, Plus Clear/Remove, Plus Profile, Plus Heart/Better/Better, Plus Imprint, Plus Let Go,
  Plus Lighter/Lighter, Plus Change/Change, Plus Fade, Plus Recall, Plus Relax, Plus 20 20)
  ayrıntı ekranında gösterilir; doğrulanamayan komutlar için alan boş bırakılır. Rakam içeren
  komutlar sesli okunmaz, ekranda gösterilir.
- **Erken dönem.** 1970'ler serisi: giriş, gevşeme egzersizi ve Koşul A–D. Orijinalde yönlendirme
  içermeyen Koşul B–D'ye bu uygulama hafif özgün hatırlatmalar ekler (notlarda belirtilir).
- **Gateway Voyage.** Programın iki klasik açık oturumu: Giriş Egzersizi ve arşivden 43 dakikalık
  Açık Egzersiz (1980). Programın geri kalanı Waves of Change I–VI oturumlarından oluşur.
- **Altyapı.** `content/series.json` (5 seri), dalga bazında `series` alanı, `encode` şablonu,
  oturum bazında `command` alanı, Focus 11 (6,0 Hz, 175 Hz taşıyıcı). Arayüz seri bazında gruplar;
  ana sekme adı "Katalog" oldu. Service worker önbelleği `gateway-v2`'ye yükseltildi.
- **Testler.** İçerik doğrulama: 124 oturum / 13 dalga / 5 seri / 12 seviye, 0 uyarı. Render
  testleri 31/31 (Focus 11 ve Boşluk Noktası yatak kaymaları dahil). Duman testi 48/48 (seri
  gruplama, komut çipi, yeni kartlar, arama).

## 14. v0.3 — PC ses kaynağı: orijinal kayıtlar yerel ağdan

Kullanıcının elindeki tüm Hemi-Sync FLAC kayıtlarını uygulamaya gömmeden (30–40 GB) evdeki PC'den
akıtmak için yerel ağ kaynağı eklendi. Ayarlar → Ses kaynağı: "Uygulama sentezlesin" (varsayılan)
veya "PC'den çalsın". PC modunda her oturum `content/tracks.json`'daki resmi egzersiz adlarıyla
PC'deki dosyalarla eşleştirilir (`src/js/trackmatch.js`: token-tabanlı bulanık eşleştirme; tam
dosya adı eşleşmesi baskındır, bu yüzden "Sleep" → "Sleep.flac", "Sleep Easy.flac"ten önce gelir;
eski/yeni Exploring ayrımı egzersiz adlarıyla çözülür). Eşleşen kayıt `tools/pc-server.py`'nin
`/play/` uç noktasından tek bir `<audio>` öğesiyle çalınır (TrackPlayer); uygulamanın kendi sesi,
ritmi ve çanları kapanır — uygulama zamanı tutar, aşama adlarını gösterir ve günlüğe kaydeder.
Eşleşme yoksa otomatik sentez geri dönüşü olur.

Sunucu (yalnızca standart kütüphane): `/ping`, `/index.json` (parça dizini), `/rescan`,
`/play/<dosya>?mode=raw|wav` (Range desteği — iOS gereksinimi; CORS açık; yol geçişi engelli;
yalnızca ses uzantıları). FLAC tarayıcıda çözülemezse anında WAV'a çevrilir (ffmpeg veya
`soundfile`; önbellekli). `--app` ile uygulama aynı sunucudan servis edilir — telefon
`http://<pc-ip>:8700/` adresinden açıldığında her şey aynı origin olur. Uygulama https
üzerindeyse tarayıcı düz http adresini karma içerik olarak engeller; bu durumda ayarlarda kırmızı
uyarı gösterilir.

Testler: `tools/test-trackmatch.mjs` (26/26), `tools/test-pc-server.mjs` (17/17; sunucu gerçekten
boot edilip tüm HTTP yüzeyi sınanır), duman testi 56/56 (ayar satırları, bağlantı testi, eşleşme çipi,
sentez fallback'i).

## 15. v0.4 — Teknikler sekmesi, iki dilli Rehber ve görsel paketler

Kullanıcının isteğiyle uygulama "bilgi" katmanıyla büyüdü:

- **Teknikler sekmesi** (`content/techniques-a.json` + `techniques-b.json`, 21 teknik): hazırlık
  (hazırlık süreci, ECB, afirmasyon), koruma (REBAL), araçlar (EBT, beden haritası), nefes
  (rezonans ayarı, renk nefesi, tek nefes), zihinsel (örüntü, enerji besini), iletişim (NVC,
  Compoint, beş soru), keşif (serbest akış, enerji yürüyüşleri, topraklanma, ayrışma yöntemleri,
  CRV) ve kuram (Miranon'un yedi rezonans rengi, focus haritası). Her teknik; ne, neden, adım adım
  nasıl, ne zaman + ipuçları + uyarılar; görsel önizleme ile.
- **Rehber sekmesi** (`content/guide/tr/*.md` + `content/guide/en/*.md`): internetteki binlerce
  sayfa dokümanın iki dilli sentezi, 17 konu başlığı altında (v0.4'te ilk 5 konu; v0.4.1'de
  17'si de tamamlandı — bkz. aşağıdaki alt bölüm). Uygulama içinde konu konu okunur;
  dil ayarı konunun dilini seçer. Derleme (`tools/build.mjs`) `www/guide/index.json`'u üretir;
  `src/js/md.js` minimal markdown yorumlayıcıdır. Doğrulayıcı her konunun iki dilde dengini ve
  uzunluğunu sınar.
- **Görsel paketler** (6, kullanıcı seçer — Ayarlar → Oturum görseli ya da teknik önizlemesinde
  paket çipleri): `gateway` (portal, varsayılan), `aura` (enerji akışı/REBAL), `box` (ECB kutusu),
  `waves` (yedi rezonans rengi dalgası), `body` (beden haritası + tarama çizgisi + çakra noktaları),
  `img` (üretilmiş görseller: orb/kutu/dalgalar, nefes alan animasyon). Hepsi durum bazlı
  (prep, focus10–27, explore, return) animasyonlu SVG/CSS; oturum ekranı seçili paketi kullanır.
- **Yeni seriler**: *Hemi-Sync Serileri* (Lucid Dreaming 4 egzersiz — 90 dk'lıklar + 8 saatlik
  programlama; Chakra Attunement 3; 5th Dimensional Transformation 4) ve *Ek Pratikler* (10 oturum:
  el kitabı teknikleri + tamamlayıcı pratikler — beden taraması, kutu nefesi, aşamalı gevşeme,
  şefkat, rüya günlüğü, WBTB, akşam gözden geçirme; Monroe dışı olanlar açıkça etiketli).
- Uygulama 6 sekme oldu (Katalog, Teknikler, Rehber, Program, Günlük, Ayarlar). PC ses kaynağı,
  teknik önizleme ve oturum görseli birbirine bağımsız katmanlardır.
- Testler: içerik doğrulama 145 oturum / 17 dalga / 7 seri / 12 seviye / 21 teknik / guide dengesi;
  render 31/31; trackmatch 26/26; pc-server 17/17; duman testi 68/68 (6 sekme, teknik kartları +
  önizleme + paket seçimi, rehber konu listesi + okuma görünümü, PC çipi, görsel paketi seçimi).

### 15.1 v0.4.1 — Rehber tamamlandı (17/17 konu, iki dil), günlük yedekleme

- **Rehber konuları** (her biri `content/guide/tr/<ad>.md` + `content/guide/en/<ad>.md`, aynı dosya adı):
  01 giriş · 02 tarihçe · 03 bilimsel zemin · 04 focus seviyeleri ve yedi rezonans rengi ·
  05 hazırlık süreci · 06 araçlar ve teknikler (REBAL, ECB, EBT, beden haritası, renk nefesi, örüntü,
  enerji besini, NVC, Compoint, beş soru/mesaj, vektörler; birleştirme zincirleri) · 07 serbest akış,
  enerji yürüyüşleri, topraklanma (özgün serinin 12 enstrümantal parçasının yönergeleri dahil) ·
  08 beden dışı yol (Koşul A–D, titreşim durumu, beş ayrışma yöntemi + ekran yöntemleri, Odyssey
  enerji bedeni, Locale I–III, uyku felci) · 09 uzak görme (Gateway RV/Vektörler; CRV altı aşama —
  1985 DIA/SRI belgesi; AOL; kör hedef ev protokolü; Utts/Hyman) · 10 tüm programlar ve seriler
  (uygulamadaki 7 seri; uygulamada olmayan Hemi-Sync koleksiyonları; Enstitü yatılı/çevrimiçi
  programları ve ön koşulları; ev serisi eşlemesi; önerilen sıra) · 11 Human Plus (iki yüzlü kaset
  yapısı, Erişim Kanalı, 1989 kuralları, 53 fonksiyon kategorili katalog, komut anatomisi) ·
  12 tamamlayıcı pratikler (Monroe'ya ait 3 + Monroe dışı 7; kaynakları ve Gateway'e katkıları;
  birleştirme tablosu; sınırlar) · 13 maksimum verim (koşullar, ritim, oturum öncesi/içi/sonrası,
  ilerleme ölçütleri, derin seviye kuralları, kontrol listesi) · 14 sorun giderme (30 sorun:
  deneyimsel, bedensel, ritim, teknik) · 15 SSS (40 soru) · 16 güvenlik, etik ve sözlük (hekim onayı
  gerektiren durumlar, uyarı işaretleri, 7 etik ilke, ~45 terim) · 17 kaynaklar ve ileri okuma.
- Rehber metinleri **özgün sentezdir**; yalnızca kısa kamuya açık ifadeler (afirmasyon parçaları,
  komut sözcükleri, egzersiz adları) alıntılanır. Bilimsel iddialar kanıt düzeyiyle verilir.
- `src/js/md.js`: pipe tablo (`| a | b |` + ayraç satırı) ve görev listesi (`- [ ]`) desteği
  (9, 12, 13. konular tablo kullanır).
- **Günlük yedekleme**: Günlük sekmesinde "Yedeği indir (JSON)" / "Yedek yükle" — biçim
  `gateway-backup/1` (günlük, pratik kaydı, favoriler, program, ayarlar); içe aktarma kimliğe göre
  birleştirir, aynı yedek iki kez yüklenince kayıt çoğalmaz; yabancı dosya reddedilir
  (`store.js` `exportBackup/importBackup`, `journal.putMany`).
- Servis çalışanı önbelleği `gateway-v5`; sürüm 0.4.1.
- Testler: içerik doğrulama 0 uyarı (17 konu tr/en dengesi); render 35/35 (md tablo + görev
  listesi testleri eklendi); trackmatch 26/26; pc-server 17/17; duman testi 75/75 (yedek dışa/içe
  aktarma, çoğaltmama, geçersiz dosya; 17 rehber konusu).

### 15.2 v0.5.0 — Rehberde arama, tıklanabilir çapraz göndermeler, Hemi-Sync referans kataloğu

- **Rehber araması** (`renderGuide` → `searchGuide`): arama kutusu 17 konunun tam metnini (seçili
  dilde) yükler ve `## ` bölümlerine ayırarak arar. Karakter bazlı katlama uzunluğu korur
  (Türkçe küçük harf, aksan ayıklama, ı→i), böylece "isik" → "ışık", "rebal" → "REBAL" eşleşir ve
  parçacık içindeki vurgular (`<mark>`) orijinal metin üzerinde konumlanır. Tüm terimler aynı
  bölümde geçmelidir. Sonuç kartı tıklanınca konu açılır, bölüm başlığına (`#ch-<slug>`) kaydırılır
  ve terimler işaretlenir; geri tuşu aramayı ve sonuçları korur.
- **Çapraz göndermeler** (`linkTopicRefs`): konu açılınca metin düğümleri taranır (a/code/pre/h1
  hariç); TR `"8. konu"`, `"4. ve 10. konu"`, `"1–5. konuları"`, `"5, 6, 7 ve 8. konularının"`;
  EN `"topic 8"`, `"topics 2 and 3"`, `"topics 5, 6, 7 and 8"`, `"topics 1–5"` biçimleri her sayı
  için ayrı bağlantıya dönüşür (konu numarası = `guide/index.json` sırası). 17 konuda 63 TR / 63 EN
  gönderme bağlanır; yanlış eşleşme için numarasız "17 konu" gibi ifadeler bağlanmaz. Bağlantıyla
  açılan konular `guideStack`'e eklenir: geri tuşu "‹ Geri · <geldiğin konu>" yazar ve oraya döner.
  Her konunun altında önceki/sonraki konu düğmeleri.
- **Hemi-Sync referans kataloğu** (`content/reference.json`, 46 başlık: 10 Mind Food, 21 Metamusic,
  15 albüm serisi): uygulamada oturumu olmayan başlıklar; her birinde özgün iki dilli açıklama,
  etiketler (uyku, odak, enerji, sağlık, rüya, OBE, şamanik, kalp, çakra, geçiş…), varsa sanatçı ve
  uygulamadaki en yakın oturuma bağlantı (`related`). Katalog sekmesinin altındaki kart açar;
  kategori çipleri + arama. PC kaynağı açıkken `findTracksForHints` → `findAlbum` (klasör adı
  eşleşirse klasördeki tüm dosyalar doğal sırada; yoksa dosya adı eşleşmeleri) ile kütüphanedeki
  parçalar listelenir; ▶ ile `runSession` ham parça modunda çalar (`logId: "ref:<id>"`), albümde
  parça bitince sıradaki otomatik başlar. PC kaynağı kapalıysa Ayarlar yönlendirmesi gösterilir.
  Doğrulayıcı başlığın bir `tracks.json` ipucuyla çakışmasını reddeder (Energy Walk ve WILD bu
  nedenle listede değil, oturumları var). Katalog bilgi amaçlıdır; kayıt içermez.
- Servis çalışanı önbelleği `gateway-v6`; sürüm 0.5.0.
- Testler: içerik doğrulama 0 uyarı (46 referans başlığı dahil); render 35/35; trackmatch 33/33
  (`findAlbum` klasör/dosya/sıra testleri); pc-server 17/17; duman testi 111/111 (rehber arama,
  vurgulama, Türkçe katlama, çapraz bağlantı + geri yığını, liste göndermeleri, önceki/sonraki;
  referans görünümü sayım/kategori/arama/PC eşleşmesi/albüm sırası/çalma; İngilizce rehber
  bağlantıları ve araması).

### 15.3 v0.5.1 — Görsel galerisi, rehberde bölüm gezintisi, telefon geri tuşu

- **Görseller keşfedilebilir oldu.** Altı görsel paketi (5 prosedürel SVG animasyonu + 3 üretilmiş
  resimli "Kozmik Görseller") daha önce yalnızca oturum ekranında ve teknik detayında görünüyordu.
  Yeni `renderGallery()` (Teknikler sekmesi kartı, Ayarlar → "Galeriyi aç", oturum sayfasındaki
  önizleme satırı): durum çipleri (Hazırlık, F10, F12, F15, F21, F27, Keşif, Dönüş) tüm paketleri o
  durumda yeniden çizer, karta dokunmak paketi seçer (`settings.visualPack`), "Oturum boyutunda
  izle" tam boy panel açar. Ayarlar'da canlı mini önizleme; oturum detayında seçili paketin
  oturumun ilk Focus seviyesindeki hali. Uygulamada video/GIF dosyası yoktur; bu bilinçli bir
  tercihtir (çevrimdışı, 2 MB'lik uygulama, pil dostu) ve galeri notunda açıklanır.
- **Rehberde bölüm gezintisi.** Konu açılınca `addTopicContents`: `##` başlıklarından İçindekiler
  kutusu (açık `details`, `#ch-<slug>` bağlantıları) ve sağ altta sabit "Bölümler" düğmesi →
  bölüm paneli (bulunduğun bölüm kaydırma konumundan işaretlenir, "Başa dön", önceki/sonraki
  konu). `data-jump` tıklamaları yumuşak kaydırır; `scroll-margin-top` ile başlık kenara
  yapışmaz.
- **Geçmiş/geri tuşu entegrasyonu.** Alt görünümler (`enter()`: detay, teknik, konu, katalog,
  galeri; `startSession`; `mountSheet`) `history.pushState` ile giriş ekler, `histDepth` sayacı
  tutulur; sekme köküne dönüş `history.go(-depth)` ile tek seferde temizler (`popGuard` bizim
  tetiklediğimiz popstate'i yutar). Donanım geri tuşu: açık panel kapanır → çalışan oturumda giriş
  yeniden itilir (oturum kapanmaz) → rehber çapraz bağlantı yığını → sekme kökü; kökte eski/bayat
  giriş varsa (yeniden yükleme sonrası) zincirleme geri. Aynı seviyede alt görünüm değişimi
  (detay → ön koşul detayı) `replaceState` kullanır.
- Servis çalışanı önbelleği `gateway-v7`; sürüm 0.5.1.
- Testler: duman testi **137/137** (galeri 6 paket/durum çipi/seçim/tam boy; ayarlar ve detay
  önizlemesi; içindekiler = h2 sayısı, bölüm paneli, panelde geri tuşu, bölüme atlama; geçmiş
  durumu detay/oturum/panel, oturumda geri tuşu, köke dönüşte temiz geçmiş); diğer testler
  değişmedi (35/33/17, doğrulama 0 uyarı).

### 15.4 v0.5.2 — Teknikleri *gösteren* animasyonlar (hikâye panoları)

- **Düzeltilen yanlış anlama.** v0.5.1'in görsel galerisi oturum arka planı içindi; kullanıcı
  gözleri kapalı çalıştığı için bunun değil, tekniklerin *kendisini anlatan* görsellerin
  istendiğini belirtti (REBAL'da enerjinin beden etrafındaki döngüsü, ECB'de kutuya konan
  sorunlar ve kutunun uzaklaştırılması). Oturum görselleri korunur ama geliştirilmez.
- **`src/js/storyboard.js`.** 21 tekniğin her biri için 3–5 sahnelik hikâye panosu (toplam 84
  sahne). Her sahne 240×160 bir SVG'yi birkaç ilkel (yatan/oturan/ayakta/yürüyen piktogram,
  kutu, çubuk, yumurta, kaynaklar) ve CSS keyframe sınıflarıyla (`sb-flow` akış çizgisi,
  `sb-move`, `sb-lid` kapak, `sb-ring`, `sb-grow/shrink`, `sb-drift`, `sb-rainbow`…) çizer; iki
  dilli altyazı ve sahne içi etiketler (`T(lang, tr, en)`). Oynatıcı (`createPlayer`) 5,2 s'de
  bir ilerler, döner, sahneye dokununca sonraki, ‹ › ve nokta düğmeleri, oynat/duraklat,
  görünür değilken (`IntersectionObserver`) ve `prefers-reduced-motion`'da animasyon durur;
  görünümden çıkan oynatıcılar `sweepPlayers()` ile temizlenir. Video/GIF yok: ~40 KB JS.
- **Nerede görünür.** Teknik detayında "Nasıl görünür?" bölümü (eski pak çipleri kaldırıldı);
  teknik listesi kartlarında statik küçük önizleme (`renderThumb`, animasyonsuz); rehberde
  `[[storyboard:id]]` yönergesi (`md.js` → `.sb-embed[data-sb-embed]`, `openGuideTopic` →
  `hydrateStoryboards`) ile 22 yerde ilgili bölümün hemen altında (06: 13 teknik; 05: hazırlık
  ve tek nefes; 07: serbest akış, enerji yürüyüşü, topraklanma; 08: ayrışma yöntemleri; 04:
  focus merdiveni ve Miranon renkleri; 09: CRV aşamaları). Arama dizini yönergeyi atlar.
- `store.js` artık tarayıcı dışında da içe aktarılabilir: `navigator.language` okuması
  `typeof navigator` korumasıyla (Node 20 ve altında `navigator` global'i yok; `npm test` orada
  `ReferenceError` ile çöküyordu). `package.json` → `engines.node >= 18`.
- Servis çalışanı önbelleği `gateway-v8`; sürüm 0.5.2.
- Testler: render **39/39** (md yönergesi; 21/21 teknik kapsanıyor; 84 sahnenin tr/en SVG'si
  iyi biçimli — jsdom varsa XML ayrıştırma; dil etiketleri), duman **150/150** (21 küçük
  önizleme; REBAL oynatıcı 5 sahne, ileri/geri/nokta/sahne dokunuşu/duraklat; ECB kendi panosu;
  rehber 06'da 13 gömülü pano başlık altında, yönerge sızıntısı yok).

### 15.5 v0.5.3 — Kayıtlı sesli rehber paketleri (tr + en)

- **Neden:** telefonun metin okuma sesi robotik ve ekran kilitliyken güvenilmez. Yönerge satırları
  doğal bir nöral sesle önceden kaydedilip oturum WAV'ına karıştırılınca ses ekran kilidinde de
  çalar ve hep aynı tınıyı taşır. Eksik satırlar için TTS yedek olarak kalır.
- **Anahtarlama:** her sesli satırın kimliği metninin karması (`voiceKey` = sha1(NFC)[:12]);
  `expandContent` tüm faz satırlarına ve hatırlatmalara `audio: {tr, en}` ekler, `common.lines`
  doğrudan `.audio` taşır. Metin değişirse anahtar değişir → klip otomatik olarak düşer (eski kayıt
  asla yanlış metinle çalmaz). Envanter: tr 532 / en 531 benzersiz satır (≈23k / 27k karakter).
- **Üretim:** üretken ses aracı çağrı başına ≤1500 karakter verdiği için satırlar deterministik
  toplu metinlere bölünür (≤1400 karakter, ≤24 satır; satırlar boş satırla ayrılır; dil başına 23
  toplu iş). Dönen sesi `tools/voice-pack.py split` satırlara ayırır: sessizlik koşuları (≥0,12 s)
  TTS'in **her noktalama işaretinde** verdiği duraklarla neredeyse bire bir örtüşür; dinamik
  programlama noktalama parçalarını sırayla bu duraklara, parça süresi/karakter sayısı oranına göre
  atar (konuşma hızı toplu iş içinde kalibre edilir; fazladan nefesler atlanır, eksik virgül
  durakları parçaları birleştirir). Sadece satır süresine dayanan ilk yaklaşım yanılıyordu (cümle
  durakları ile satır durakları uzunlukça ayırt edilemiyor: hepsi 0,3–0,6 s); parça düzeyi
  hizalama bunu çözdü (pilot: 53 parça ↔ 54 durak).
- **Denetim:** satır süre oranı (0,68–1,45), satır sonu durağı, Türkçe için ses zarfındaki hece
  çekirdeği sayısı ↔ metindeki ünlü sayısı, İngilizce için pocketsphinx tanıma çıktısının CMU
  sözlüğü üzerinden **sesbirim benzerliği** (kelime eşleşmesi değil: "close your eyes" → "closure
  rise" gibi eş sesli hatalar sayılmaz). Şüpheli satır + komşuları yazılmaz (`--partial`), kalanlar
  `plan --missing` ile yeniden kayıt turuna girer. Klipler −20 dBFS medyan RMS'e dengelenir,
  0,10/0,22 s baş/son payı, 10 ms kenar geçişleri, 22,05 kHz mono 48 kb/s MP3 (Xing/ID3 yok).
- **Paketler:** `tools/build.mjs` klipleri paketlere birleştirir (`common` = uygulama geneli + ≥2
  oturumun paylaştığı satırlar; diğerleri oturum başına) ve bayt aralıklarını
  `APP_CONTENT.audio[dil].packs[paket] = {file, clips:{key:[off,len,dur]}}` olarak yazar; her aralık
  tek başına çözülebilen bir MP3'tür (`decodeAudioData(buf.slice(off, off+len))`). Paket URL'si
  içerik karması taşır (`voice/tr/common.mp3?v=…`); servis çalışanı bunları `gateway-voice-v1`
  önbelleğinde cache-first tutar, aynı yolun eski sürümünü siler. Oturum başlarken yalnızca
  `common` + o oturumun paketi yüklenir; yükleme hiçbir zaman oturumu engellemez (hata → TTS).
- **Uygulama:** Ayarlar → "Kayıtlı sesli rehber" anahtarı ve dil başına kapsama satırı; oturum
  sayfasındaki not, tüm satırları kayıtlıysa bunu söyler. Zaman çizelgesi klip süresini manifestten
  alır, karıştırıcı `voiceVol·0,8` kazancıyla ekler.
- **Durum:** bu sürümde tr 112/532, en 109/531 satır kayıtlı (ortak satırların tamamı dahil:
  dakika uyarısı, bitiş, program geçişleri, hazırlık/giriş/dönüş şablonları); kalan toplu işler
  sonraki turlarda eklenir. PC tarafı alternatif: `tools/voice-edge-tts.py` (Edge nöral sesleri,
  satır satır) + `voice-pack.py import`.
- Servis çalışanı önbelleği `gateway-v9`; sürüm 0.5.3. Testler: render 39/39, **voice 30/30**
  (anahtarlar, indeks ↔ dosyalar, bayt aralıkları dosyayı döşer, her klipte MP3 eşzaman sözcüğü,
  paket atamaları, kapsama sayıları), trackmatch 33/33, pc-server 17/17, duman **155/155**.

### 15.6 v0.6.0 — Parça 1: platform ve erişilebilirlik temeli

Yol haritası `ROADMAP.md`'de; bu parça çevrimdışı güvenilirlik, sürekli test/yayın ve görünüm
ayarlarını kapsar.

- **Rehber çevrimdışı:** rehber konuları daha önce yalnızca açıldıktan sonra önbelleğe giriyordu.
  `tools/build.mjs` artık `www/` içindeki tüm dosyaları (ses paketleri hariç, 67 dosya) `sw.js`'e
  `PRECACHE` listesi olarak yazar; önbellek adı bu dosyaların içerik karmasıdır (`gateway-<sha1[:10]>`),
  elle sürüm artırımı kalktı. Kurulumda çekirdek dosyalar `addAll` ile (biri inmezse kurulum
  başarısız → eski sürüm çalışmaya devam eder), geri kalanı `allSettled` ile en iyi gayret.
- **CI:** `.github/workflows/gateway.yml` — Node 20 + Python 3.12; `npm test` (doğrulama, derleme,
  derleme testi, render, ses, eşleştirme, PC sunucu) + jsdom duman testi; `www/` artefaktı. Pages işi
  `DEPLOY_PAGES` değişkeniyle açılır (özel depoda Pro gerekir; API ile etkinleştirme bu ortamdan 403
  döndü — kullanıcı ayarlardan açar).
- **Görünüm:** `tokens.css`'te açık tema zaten sistem tercihine bağlıydı; artık `data-theme=light|dark`
  ile zorlanabiliyor, `.session` kapsamı her temada koyu paleti taşıyor (gözler kapalı, odaya az ışık).
  `data-motion=reduce` (veya sistem tercihi) tüm animasyon/geçişleri ~0 süreye indirir; yazı boyutu kök
  `font-size` yüzdesiyle (her şey rem). `applyAppearance()` açılışta ve ayar değişince.
- **Telefon TTS:** `src/js/tts.js` tek giriş noktası (`speak`, `ttsVoices`, `onVoices`); ayarlardan
  dil için kurulu sesler (`voiceschanged` ile tembel doldurma), hız 0,8/0,9/1,0, deneme cümlesi.
  jsdom'da `speechSynthesis` yok → satırlar devre dışı + not.
- Testler: yeni `tools/test-build.mjs` 14/14 (ön-önbellek tamlığı, karma, `.nojekyll`, göreli yollar),
  duman **164/164**. Sürüm 0.6.0.

### 15.7 v0.6.1 — Parça 2: katalog filtreleri

- Ana listede arama kutusunun altında yatay kaydırılan filtre çubuğu: Focus (oturumlarda geçen
  seviyeler), süre, seri, durum, favori ve gece çipleri. `passFilters(ex)` metin aramasıyla aynı
  `match` içinde çalışır; favoriler bölümü de filtrelenir; filtre/arama varken tüm dalga başlıkları
  açık gelir, "N oturum" sayacı ve "Filtreleri temizle" görünür. Seçimler `store` → `gateway.filters`.
- Süre, kullanıcının o oturum için seçtiği ön ayar/parametrelerle `buildTimeline` tahmini
  (145 oturum ≈ 23 ms, önbellekli). Varsayılanlarda oturumların %83'ü 25–30 dk olduğu için eşikler
  ≤ 20 / 20–30 / > 30 dk seçildi.
- Duman testi 176/176 (focus filtresi yalnızca F21 kartları, sayaç ↔ kart sayısı, seçili select
  vurgusu, boş durum, temizle, favori çipi, seri + süre birleşimi, kalıcılık, gece çipi).

### 15.8 v0.6.2 — Parça 3: günlük düzenleme, dışa aktarma, rüya günlüğü

- Günlük sekmesi `js/journal.js` modülüne taşındı (oturum/rüya listeleri, düzenleme formu, Markdown,
  yazdırma, yedek, gerçeklik testi zamanlayıcısı). `store.journal.update(id, patch)` kimlik ve oluşturma
  zamanını korur, `editedAt` damgalar; IndexedDB yoksa localStorage yoluna düşer.
- Rüya kayıtları aynı günlük deposunda `kind: "dream"` ile tutulur (`signs[]`, `lucid 0–3`,
  `recall 1–3`, `sec: 0`); böylece JSON yedek / geri yükleme değişmeden rüyaları da taşır. Oturum
  listesi ve ısı haritası rüyaları dışlar. Rüya işaretleri 18 ön ayar (uçmak, ölmüş biri, tuhaf
  eller, değişen yazı, sahte uyanış, titreşim…) + `gateway.dreamSigns` içinde kalıcı özel işaretler;
  istatistik bloğu en sık 6 işareti sayar (lucid rüya literatüründeki "dream sign" günlüğü yaklaşımı).
- Gerçeklik testi hatırlatıcısı: `settings.rcEvery` (0 kapalı / 1–4 saat), `rcFrom–rcTo` saat
  penceresi, son hatırlatma `gateway.rcLast`; 60 sn'lik aralıkla denetlenir, uygulama içi bildirim
  + izin varsa `Notification` / SW `showNotification`. Web platformu kapalı PWA için zamanlanmış
  bildirim sunmadığından gerçek arka plan hatırlatıcısı Android paketine (Parça 10) bırakıldı.
- Markdown dışa aktarma: başlık + toplam süre, kayıt başına `## tarih — başlık (süre)`, lucidlik /
  hatırlama / etiket satırları, not (satır sonları korunur), çizimler `![]()` veri URL'si olarak.
  Yazdırma: `body.printing` + `@media print` (gezinme, düğmeler, ısı haritası gizli; `.entry`
  `break-inside: avoid`).
- Duman testi 215/215 (düzenleme aç / vazgeç / kaydet / etiket / `editedAt`, Markdown adı ve içeriği,
  yazdırma sınıfı, rüya modu: boş durum, oluşturucu, ön ayar + özel işaret, lucidlik rozeti,
  istatistikler, rüya düzenleme, mod ayrımı, hatırlatıcı ayarları kalıcılığı, manuel test, silme).

### 15.9 v0.6.3 — Parça 4: rehber okuma deneyimi

- `store.reading` (`gateway.gprog`: konu → `{pct, ch, chTitle, y, at}`; `gateway.glast`: son konum) ve
  `store.bookmarks` (`gateway.gmarks`: `{id, ch|null, title, at}`; anahtar `id#ch`). Yüzde, makalenin
  görünür alanın altına kadar geçen kısmı (`(innerHeight − top) / height`), 250 ms'lik kaydırma
  kısıcısıyla ölçülür ve yalnızca büyür; ≥ %90 "okundu". Düzen bilgisi olmayan ortamda (jsdom) ölçüm
  atlanır; duman testi `getBoundingClientRect` taklidiyle kaydırmayı canlandırır.
- Konu görünümü: sabit 3 px okuma çizgisi, araç çubuğu (★ yer imi, A− / A+, "Kaldığın yere git"),
  her `h2` içine eklenen bölüm yıldızı (`data-markch`); başlık metni `data-title` ile saklanır ki
  içindekiler ve bölümler sayfası yıldızı almasın. Yazı boyutu Ayarlar ile aynı `fontScale`
  kademelerini (0.9 / 1 / 1.15 / 1.3) kullanır.
- Liste: "Kaldığın yer" kartı (`data-resume` → açılışta kaydedilen bölüme atlar), genel ilerleme
  çubuğu, yer imleri bloğu (bölüm yer imleri `data-ch` ile açılır, arama vurgusu yalnızca `.g-hit`
  için), konu kartlarında ilerleme çubuğu / ✓ / ★.
- Yedek: `reading` ve `bookmarks` alanları eklendi; içe aktarmada konu başına büyük yüzde, yer
  imlerinde anahtar birleşimi.
- Duman testi 246/246 (araç çubuğu, yazı boyutu kademeleri ve kalıcılığı, kaydırmayla ilerleme ve
  "kaldığın yer", geri kaydırmada azalmama, konu + bölüm yer imi, liste kartları, kısmi ilerleme ve
  devam çipi, devam kartı, yer iminden açma, ✕ ile kaldırma, yedekte taşınma, boş liste gizlenmesi).

### 15.10 v0.6.4 — Parça 5: uyku oturumları, sönümlenme, uyandırma çanı

- İçerik: 13 `night: true` oturumun son `{ "use": "return" }` evresi kaldırıldı (uykuya dalması
  amaçlanan bir oturumda "uyanık bilince dön" sayımı ve yumuşak çan çelişkiliydi; SCHEMA.md
  güncellendi). `common.lines.wake` / `wakeWbtb` uyanma cümleleri eklendi (ses satırı sayısı
  tr 534 / en 533).
- Zaman çizelgesi: gece oturumlarında bitiş dalı `fade` evresi (`FADE_PHASE`, `holdStart/holdEnd`
  ile geri sayım) ekler; `o.sleepFade` sn (varsayılan 120, ayar `sleepFade` dk). Ses yatağı için
  `envCos` artık `fadeOut` parametresi alır (giriş × çıkış zarfı çarpımı); fade evresinin bölütü
  `fadeOut = len` ile baştan sona iner. Render testi: fade evresinde erken/geç RMS oranı < 0,15.
- Uyku bekleyici (`audio.SleepWaiter`): oturum sesi bitince aynı `<audio>` öğesinde en çok 600 sn'lik
  sessiz WAV parçaları (`silenceWav`, 8 kHz mono, sıfır veri; 10 dk ≈ 9,6 MB) `ended` zinciriyle
  oynatılır; her parça sonunda duvar saati (`Date.now`) yeniden okunur, böylece zamanlayıcı kısıtlaması
  ve askıya alma süreyi kaydırmaz. Vakti gelince `alarmSamples` (60 sn, 4,5 sn'de bir yumuşak/başlangıç
  çanı, seviye 0,3 → 1,0, 24. sn'de kayıtlıysa uyanma cümlesi) `loop` ile çalar; 20 dk yanıt yoksa
  oturum biter. Ertele = 10 dk sonra yeniden bekle.
- Oturum ekranı: `sleeping` durumunda kadran gizli, büyük saat + çan vakti; `ringing` durumunda
  "Uyandım" / "10 dk ertele", titreşim. Günlüğe `tl.duration` yazılır. Bitiş ekranı: `r.night` →
  "Rüya günlüğüne yaz" (`journal.openDreamComposer`), `r.woke && kind === "wbtb"` → WBTB kısayolu.
- Gece planı (`gateway.nightPlan`): `wake` ∈ off | wbtb:4.5 | wbtb:6 | after:7.5 | after:9 | at,
  `at` HH:MM (geçmişse ertesi gün). Çan zamanı oturum başlangıcından ölçülür.
- Testler: render 52 (gece çizelgesi, fade bölütü, RMS düşüşü, sessizlik WAV başlığı, alarm seviyesi
  ve cümlesi), duman 267 (gece planı denetimleri, akış listesi, kalıcılık, sahte ses öğesiyle bekleme →
  çan → ertele → çan → uyandım → bitiş ekranı → rüya günlüğü).

### 15.11 v0.6.5 — Parça 6: nefes rehberi (ekran halkası + ses ipucu, tek zaman çizelgesinden)

- Neden: Gateway'in her alıştırması rezonans ayarıyla (burundan uzun nefes al, verirken mırıldan)
  açılır; Renk Nefesi, kutu nefesi gibi bölümlerde de tempo esastır. Konuşulan yönerge tempoyu bir
  kez söyler, sonrası dinleyiciye kalır. Tempoyu *göstermek* ve *duyurmak* için ses ile ekranın aynı
  kaynaktan beslenmesi gerekiyordu; yoksa ekran kilitliyken ekran, kilit açıkken ses geride kalır.
- Şema: `phase.breath = { in, hold, out, rest, tone }` (sn, `hold/rest` varsayılan 0; `tone`
  `hum` | `tick` | yok). Yalnızca `hold`'u olan evrelerde geçerli; doğrulayıcı 0–60 sn aralığını ve
  tonu denetler. Şablon evreleri (`prep`) tempoyu bütün oturumlara taşır; oturum kendi evresinde
  farklı tempo verebilir.
- Zaman çizelgesi (`timeline.js`): `buildTimeline` tutuş başlangıcında `breathPattern(ph)` ile
  normalize edip `tl.breath.push({ ...tempo, t0, t1, phase })`; `buildRoutine` kaydırır. `breathAt(tl,
  now)` döngü içi konumu (`τ = (now − t0) mod period`) aşamaya böler; `level` = al'da `k`, tut'ta 1,
  ver'de `1 − k`, bekle'de 0.
- Ses (`audio.js`): `addBreathCues` yalnızca `[a, b)` parçasıyla kesişen döngüleri gezer. `hum`:
  `addHum` 110 / 220 / 330 Hz (1 : 0,45 : 0,2) × `envCos(τ, len, ≤0,8 s)` × 0,075 × seviye; faz
  `tAbs` üzerinden hesaplandığı için 150 sn'lik parça sınırında süreklilik testi (maks. fark < 1e‑4)
  geçer. `tick`: aşama geçişinde `addBell(..., "beep", seviye × 0,5)`. Seviye `max(0,3, bellVol)`;
  `o.breathCue` (test) ya da `settings.breathGuide` kapalıysa hiç eklenmez (render sonucu bayt bayt
  aynı → "görsel-tek tempo sese dokunmaz" testi `cd === 0`).
- Ekran (`session.js`): `.s-breath` kadranın içinde, `.s-visual` ile `.s-dial` arasında (geri sayım
  rakamları üstte kalır; dolgu `--glow` ile yarı saydam, görsel paketi görünür). `paintBreath` hem
  250 ms'lik `paint`'ten hem `requestAnimationFrame` döngüsünden çağrılır; etiket yalnızca
  `aşama:kalan sn` anahtarı değişince yazılır (DOM yazımı saniyede ≤ 1). Hareketi azalt:
  `html[data-motion="reduce"]` ya da (ayar `full` değilken) `prefers-reduced-motion` → `transform`
  yerine `opacity 0,3 → 1`.
- Detay: akış listesinde `breathLabel()` çipi (`bIn/bHold/bOut/bRest` + ton). Ayar: `breathGuide`
  (varsayılan açık), Ayarlar → Oturum satırı.
- Testler: render 52 → 68, duman 267 → 280 (duman testinde jsdom `currentTime` önceki testten
  kaldığı için oturum başında sıfırlanır; 40 sn'ye sarınca halka görünür, 44 sn'de etiket değişir,
  "Atla" ile dönüş evresine geçince gizlenir).

### 15.12 v0.6.6 — Parça 7: referans kataloğu genişletme (175 başlık, diziler, etiket süzgeci)

- Kaynak: hemi-sync.com mağazasının genel ürün listesi (Ekim 2026): Metamusic türünde 133 İngilizce
  başlık, "Health Issues" ve "Sleep Better" uygulama kategorileri (ad, kod, sanatçı, kategori
  etiketleri). Tanıtım metinleri **kopyalanmadı**; her başlık için tema/sanatçı/kullanım bilgisi
  iki dilde yeniden yazıldı (`desc`). Katalogda artık olmayan Holomovement korundu; demetler
  (Shaman's Heart Collection, Sleep seti, Wellness seti, Attention/At Ease), Hemi-Sync dışı albümler
  ve zaten oturumu olan başlıklar (Transformation → `fifthd-transformation`; Brain/Heart "Support &
  Maintenance" → `hp-brain`/`hp-heart`, takma ad olarak `tracks.json`'a eklendi) alınmadı.
- Düzeltmeler: eski kayıtta yanlış kategorideki dört albüm (Chakra Journey, Waves of Love, Timeless,
  The Journey Home) Metamusic'e taşındı; Network of Light'ın gerçek içeriği (Shealy, 4 egzersiz:
  zihin-duygular, endokrin, bağışıklık, sinir sistemi) yazıldı; "Pain Control" → resmi ad "Pain
  Management" (eski ad takma ad kaldı); "Where Earth Touches Stars" → "Where the Earth Touches the
  Stars". Eski kayıtların 31 açıklaması (çoğu "instrumental Metamusic album…" gibi jenerikti) somutlaştırıldı.
- Veri modeli: `code` (DL eki atılmış SKU), `creator`, site uygulama kategorileri → 21 etiket
  (eşleme: Dream Better → genişlemiş farkındalık, Spa & Yoga → masaj/yoga, ADD/ADHD-Learning →
  odak, Child & Baby → çocuklar; wellbeing/wellness atıldı; başlık başına en çok 5 etiket).
  `collections` dört dizi (iyileşme 19, uyku ve rüya 17, çocuklar 15, odak 15) + her dizinin
  uygulamadaki oturumları; `relatedByTag` her etiket için varsayılan oturumlar.
- Arayüz (`renderReference`): dizi yongaları (`[data-refcol]`, tekrar tıklayınca kapanır; aktifken
  tanıtım + oturum bağlantıları), kategori yongaları, arama (başlık, sanatçı, kod, takma ad, etiket,
  açıklama), etiket yongaları tıklanabilir (`[data-reftag]`, sayaç satırında "✕" ile temizleme),
  liste kategori → başlık (baştaki the/a/an atılarak) sıralı. `relatedFor(it)` = küratörlü
  `related`, yoksa etiket varsayılanları (≤ 3). Oturum detayında `refPanel(id)`: bu oturumu
  gösteren başlıklar (küratörlü) + listelendiği diziler; `openReference({item, col, from})` katalogu
  **iterek** açar ve `refFrom` sayesinde geri tuşu (UI ve popstate) aynı detaya döner; `go()`
  `refFrom`'u sıfırlar.
- Üretim: katalog `scratch/gen_ref.py` ile üretildi (mevcut 46 kayıt kimlik/açıklama/takma ad korunarak,
  kompakt iki satır/kayıt biçimi), depoya yalnızca sonuç JSON girdi.
- Testler: doğrulayıcı dizi/etiket/oturum kimlikleri + `code` biçimi + bağlantısız başlık uyarısı
  (0 uyarı); duman 280 → 298 (dizi süzme/temizleme, etiket süzme/temizleme, kod araması, 130+
  Metamusic satırı, her başlıkta oturum bağlantısı, detay → ters bağlantı → vurgulu başlık → geri
  aynı detay).

### 15.13 v0.6.7 — Parça 8: Human Plus günlük pratik (günün komutu, sayaç, komut notu, hatırlatıcı)

- Neden: H-Plus'ın özü kodlama oturumu değil, komutun **gün içinde** kullanılmasıdır (kitapçık:
  "etki ince ve birikimlidir"). Uygulama şimdiye kadar yalnızca kodlamayı destekliyordu; kullanım
  tarafı görünmezdi.
- Modül `src/js/practice.js`: `hpIds()` (Human Plus dalgasındaki 53 oturum), `commandOf(ex)` →
  `{ text, yours }` (içerikteki `command`, yoksa kullanıcının notu `gateway.hpCmd[id]`),
  `encodedIds()` (günlükte kaydı olan H-Plus oturumları), `commandPool()` (kodlanmış + komutu
  bilinen; boşsa doğrulanmış komutlu tüm fonksiyonlar, `encoded=false`), `commandOfDay()` (FNV-1a
  `hash(dayKey) % n`, `gateway.hpDay` ile o günkü elle seçim), `shuffleCommand()` (havuzda bir
  sonraki), `practice` (`add/undo/merge`, `gateway.hpPractice`, ≤ 5000), `practiceStats(id?)` →
  bugün / 7 gün / toplam / seri / 7 günlük dizi, hatırlatıcı (`scheduleCommandReminders`, 60 sn
  denetim, `settings.hpRemind` saat, pencere `rcFrom/rcTo` ile ortak, son `gateway.hpLast`;
  `commandReminder(manual)` toast + izinli bildirim `tag: gateway-hp`).
- Arayüz: ana sayfa `.hp-card[data-hpid]` (`[data-hp=practiced|shuffle]`, `[data-open]`),
  yalnızca kart yeniden çizilir (`refreshHpCard`, arama/kaydırma korunur); detayda `hpDetailPanel`
  (`cmd-chip` + `[data-d=cmd]` not sayfası `#hpCmdInput`/`[data-cmdsave]`, `.hp-practice` paneli
  `[data-d=practiced|undo]`, `.hp-bars` 7 çubuk); Program `hpProgramBlock` (`.hp-sum`); Ayarlar
  `#sHpRemind` + `#sHpNow`; bitiş ekranı `.done-cmd`. Yedek: `practice` ve `hpCmd` alanları
  (`gateway-backup/1` biçimi korunur; içe aktarmada `at:id` ile tekrarsız, yerel notlar kazanır).
- İlke: uygulama komut **uydurmaz**; doğrulanmamış 32 fonksiyonda kullanıcı kendi kaydından not alır
  ve bu "senin notun" diye işaretlenir.
- Testler: duman 298 → 327 (kodlama öncesi kart "önce kodla", günlük kaydı sonrası Plus Relax, +1 ×2,
  toast, kalıcılık, detay çubukları, geri al, komut notu normalizasyonu ve kalıcılığı, iki aday →
  karıştır + `hpDay`, Program özeti `2/53`, ayar + elle hatırlatma + `hpLast`, yedekte `practice`/
  `hpCmd`, tekrar içe aktarma tekrarsız). Önbellek 69 → 70 dosya.

### 15.14 v0.6.8 — Parça 9: PC tarafı (Kütüphanem, elle eşleştirme, sürdürme, önyükleme, PC yedeği)

- Neden: PC kaynağı yalnızca "resmi ad ↔ dosya adı" bulanık eşleşmesine dayanıyordu; farklı
  adlandırılmış kütüphanelerde eşleşmeyen dosyalar erişilemez kalıyor, uzun kayıtlar baştan
  başlıyor, iki cihaz arasında günlük taşınmıyordu.
- Sunucu `tools/pc-server.py` v0.3 (stdlib): `State` sınıfı `--data` altında atomik JSON dosyaları
  (`matches.json`, `positions.json`, `backups/<slug>.json`; tmp + `os.replace`, kilit). `do_POST` +
  `_read_json` (Content-Length ≤ 64 MB, geçersiz JSON → 400, nesne değilse → 400, `BodyError` ile
  bağlantı kapatılır), `_route_post`: `/matches` (`{id,path|null}` ya da `{matches:{…}}` toplu
  değiştirme; yol `_safe_audio_path(quoted=False)` ile doğrulanır, yoksa bir kez yeniden tarama,
  yine yoksa 404; kimlik `^[\w.:-]+$`), `/positions` (`pos ≤ 0` ya da `done` siler; en yeni 1000),
  `/backup` (`backup.format` dize olmalı; cihaz adı slug'lanır). GET: `/matches.json`,
  `/positions.json`, `/backups.json`, `/backup[?device=]` (en yeni `ts`). CORS `POST` +
  `Content-Type`. `ping.features = ["matches","positions","backup"]` ile istemci yetenek algılar.
- İstemci `src/js/pcsource.js`: `pcMatches()` (sunucu haritası doğru kaynak, `gateway.pcMatches`
  yansısı; 60 sn önbellek), `saveMatch(id, path|null)` → önce yerel, sonra POST, `{shared}`;
  `findTrackFor` önce elle eşleşme (dosya indekste varsa, `manual:true`), sonra `findTrack`.
  `pcLibrary()` → klasör ağacı + her dosyanın oturumu (otomatik: `tracks.json` ipuçlarıyla 145 ×
  dosya puanlama — `trackmatch.scoreFile` artık taban ad belirteçlerini önbellekler; elle olanlar
  ezer). `rankFilesFor(id, paths, q)` (★ = puan > 69), `nextInFolder`, `pcRescan`. Konumlar:
  `gateway.pos` + `pcPositions()` birleşimi (`at` yeni olan kazanır), `savePosition` (yerel anında,
  PC best-effort), `resumePointFor` (≥ 60 sn, kuyruğa > 60 sn, ≤ 30 gün). Yedek: `pcBackupPush`,
  `pcBackupPull` (404 → null), `pcBackups`, `deviceName()` (ayar ya da UA tahmini);
  `gateway.pcSync {pushedAt, pulledAt}`.
- Çalma: `TrackPlayer(url, meta, {startAt})` metadata gelince `currentTime = startAt`;
  `warmTrack(url)` gizli ikinci `<audio preload=auto>` (`data-warm`), `start()` aynı URL'yi
  **devralır** (`readyState ≥ 1` ise hemen hazır; iOS'ta devralma yok, paylaşılan öğe korunur),
  `restart()`. `session.js`: `track.resumeAt` → `.s-say` "Kaldığın yerden sürüyor" + `[data-a=restart]`;
  `track.onPosition(sec, dur, done)` 10 sn'de bir ve `finish`te (tamamlandıysa `done`);
  `track.next` → kalan ≤ 45 sn'de `warmTrack`. `app.js`: `withResume(track, next)` ortak sarmalayıcı
  (oturum, referans albümü, kütüphane); `openPickSheet(ex)` (`.sheet.pick #pq [data-pick]
  [data-pickauto]`), `openLibrary/renderLibrary/paintLibrary` (`#lq [data-lib=rescan] .lib-folder
  [data-libplayall] [data-libplay] .lib-session [data-libassign]`), `openAssignSheet(path)`
  (`#aq [data-assign] [data-assignrm]`), `playLibraryFile(queue, i)` (`logId "pc:<path>"`, bitince
  sıradaki). Günlük: `#bkPcPush/#bkPcPull/#bkPcMsg`; Ayarlar: `#sDevice`, `#sLibrary`; ana sayfa
  `[data-act=library]` kartı (yalnızca PC modunda). Yedek biçimi `gateway-backup/1` korunur, yeni
  alan `positions` (içe aktarmada yeni `at` kazanır).
- Tasarım kararları: (1) elle eşleşme sunucuda tutulur ki iki telefon aynı dosyayı çalsın; sunucu
  eskiyse cihazda kalır ve kullanıcıya söylenir. (2) Konum sunucu + cihaz; çalma zaten PC'ye
  bağımlı olduğundan sunucu her zaman erişilebilir. (3) Yedek geri alma birleştirir (mevcut
  `importBackup`), silme yok — "eşitleme" iki yönlü it/çek ile sağlanır. (4) Kimlik doğrulama yok;
  belgelerde ev ağı uyarısı.
- Testler: pc-server 17 → 41 (eşleşme ekle/sil/toplu/404/400, konum ekle/sil, yedek 404 → ekle →
  listele → al → cihazla al → 400, OPTIONS POST), duman 327 → 362 (çip → seçme sayfası → POST →
  `manual` çip → otomatiğe dön; kütüphane 4 klasör, özet, arama, oturuma ata ✎, kaldır; dosya çal →
  konum 100 sn yerel + PC → durdur → "kaldığın yer 01:40" → sürdürme `currentTime=100` + Baştan →
  bitince unutulur; klasör çalma 1/2 → 2/2 — süre 100 sn, 60. sn'de `audio[data-warm]` 2. parça, bitince o öğe devralır, durdurunca kaldırılır; günlükte PC'ye yedekle → `positions` alanı → PC'den geri
  al 1 oturum birleşti).

### 15.15 v0.7.0 — Parça 10: Android paketi (Capacitor)

- Neden Capacitor 8: web uygulaması olduğu gibi `www/` olarak paketlenir; eklentiler
  `window.Capacitor.Plugins` üzerinden çağrılır (Capacitor'ın çalışma zamanı `capacitor.plugins.json`'daki
  her eklenti için promise sarmalayıcı + `addListener` üretir), bu yüzden paketleyici/ESM import
  gerekmez ve web derlemesi hiç değişmez. `native.js` hiçbir modülü import etmez; metinler çağırandan
  gelir, böylece `tools/test-native.mjs` onu sahte bir köprüyle iki kez (web / android, sorgu dizesiyle
  ayrı örnek) yükleyebilir.
- Arka plan: Capacitor WebView'ı `onPause`'da duraklatmaz; HTML ses öğeleri ve `onended` zinciri
  süreç yaşadıkça çalışır. Süreci yaşatan şey `@capawesome-team/capacitor-android-foreground-service`:
  `mediaPlayback` türü (`serviceType: 2`), eklenti kısmi uyanık kilidini kendisi alır. Chromium'un
  arka plan zamanlayıcı kısıtlaması ses çalan sayfalara uygulanmaz; yine de hatırlatıcılar
  zamanlayıcıya değil planlı bildirimlere taşındı.
- Alarm: `@capacitor/local-notifications` 8.3+ `isExactNotification` (vars. true) ile planlarken izin
  yoksa **sistem ayar ekranını açar** — gece oturumunun ortasında kabul edilemez; bu yüzden
  `scheduleWake` önce `checkExactNotificationSetting` sorar, izin yoksa `isExactNotification:false`
  ile yaklaşık alarma düşer. `USE_EXACT_ALARM` (Android 13+, alarm uygulamalarına açık normal izin)
  + `SCHEDULE_EXACT_ALARM` (Android 12) bildirildiği için normalde izin hazırdır. Hatırlatıcılar
  bilerek yaklaşık (`setAndAllowWhileIdle`, pil dostu).
- Kanallar: `gateway-session` (önem 2, sessiz), `gateway-remind` (3), `gateway-wake` (5, `bell.wav`,
  titreşim, ışık). Kanal sesi ilk oluşturmada sabitlenir (Android kuralı).
- Planlama: `reminderSlots({every, from, to, now, days=2, cap=40})` pencere başlangıcına hizalı,
  gece yarısını aşan pencereyi destekler, `now + 30 sn`'den sonrası; `scheduleReminders(kind, items)`
  o türün 60 kimlikli bloğunu iptal edip yeniden yazar. HP bildirimi gün bazında `commandOfDay(date)`
  ile o günün komutunu taşır (`hpDay` seçimi yalnızca kendi gününde geçerli).
- TTS: community eklentisi `voice` olarak **dizin** ister; dizin `getSupportedVoices`'ın ada göre
  sıralı listesine göredir — ayarlarda `voiceURI` saklanır, konuşurken dizine çevrilir. Arka planda
  `speakLive` yalnızca web'de görünürlük koşuluna bağlı.
- İmza: sandbox'ta JDK yok; PKCS12 anahtar OpenSSL ile üretildi (AES-256/PBKDF2/SHA-256 — JDK 21
  okur), `storeType "PKCS12"`. CI'da anahtar sabit olduğundan APK'lar üst üste kurulur; gizli
  değişkenlerle değiştirilebilir.
- Test: `tools/test-native.mjs` 14 denetim (web no-op'ları; `reminderSlots` üç senaryo; sahte köprüde
  init/kanallar/dinleyiciler, izinler, servis start→update→stop + düğme, hatırlatıcı bloğu, tam/yaklaşık
  alarm, paylaşım + iptal/uygulanmamış ayrımı, TTS ses dizini, proje dosyaları); `tools/smoke-native.mjs`
  38 denetim (uygulama paketi jsdom'da sahte `window.Capacitor` ile açılır: kanallar, Android paneli,
  TTS sesleri, hatırlatıcı planları, paylaşım, servis + bildirim düğmesi, geri tuşu, dönüşte yeniden
  planlama). Duman 362 değişmedi (web yolu). Gradle derlemesi yalnızca CI'da doğrulanır (ilk derleme
  başarılı; Capacitor CLI 8 Node 22 ister — CI'da Node 22).

## 16. Kaynaklar

- hemi-sync.com — Wave VI Odyssey, Wave VII Voyager, Wave VIII Union ürün sayfaları (egzersiz
  listeleri, çıkış yılları, anlatıcılar).
- monroeinstitute.org — ürün sayfaları ve açıklamalar.
- *The Gateway Experience Guidance Manual* (tam metin: studocu, scribd, thelonerider.com,
  archive.org "The Gateway Experience Manual.pdf") — dalga dizini, araçlar, SSS.
- CIA Reading Room — *Analysis and Assessment of Gateway Process* (McDonnell, 1983).
- gateway-experience.fandom.com — Focus seviyeleri ansiklopedisi.
- Discogs / MusicBrainz / Amazon — dalga sıralamaları ve süreleri, katalog numaraları.
- Garcia-Argibay et al. (2019), *A systematic review of binaural-beat research* — meta-analiz.
- Reddit r/gatewaytapes — Odyssey/Prospecting ayrımı, Voyager çıkışı, MSS yeniden master.
