# Gateway — Sesli Rehberli Binaural Keşif Oturumları

Monroe'nun yolculuk serilerinden **esinlenen**, bağımsız bir PWA uygulaması. Yedi seri, 17 dalga,
145 oturum: Waves of Change I–VIII, özgün 1984 serbest akış serisi (Exploring + Prospecting),
Human Plus (H-Plus®) fonksiyon egzersizleri, erken dönem Journeys Out of the Body serisi,
Gateway Voyage açık oturumları, Hemi-Sync albüm serileri (Lucid Dreaming, Chakra Attunement,
5th Dimensional Transformation) ve tamamlayıcı pratikler. Özgün iki dilli (Türkçe/İngilizce) sesli
rehberlik ve tarayıcıda sentezlenen binaural yatak.
Hemi-Sync® ve Gateway Experience®, Monroe Institute'un tescilli markalarıdır; bu uygulama onlarla
bağlantılı değildir. Tüm metinler özgün yazılmıştır; ritim değerleri yaklaşıktır.

## Hızlı başlangıç

```bash
npm run build     # içerik doğrulama + şablon açma + www/ derlemesi
npm run serve     # derle ve http://localhost:8123 üzerinde sun (önizleme)
```

Telefonundan `http://<bilgisayarının-ipsi>:8123` adresine gir ve kulaklığını tak — önizleme için yeterli.
Ama tarayıcılar düz `http://` adreste servis çalışanına, bildirimlere ve ekranı açık tutmaya izin vermez:
bu yolla **çevrimdışı çalışma, bildirim ve ekran kilidi koruması yoktur**. Çevrimdışı PWA için uygulamayı
https üzerinden (GitHub Pages) aç; ancak https sayfa evdeki PC'nin `http://` ses sunucusuna erişemez.

**Telefon + evdeki PC için önerilen yol Android APK'dır** (arka plan servisi, gerçek alarm, uygulama
kapalıyken bildirim, yerel TTS, PC ses kaynağı): GitHub Actions her itmede `gateway-android-apk`
artefaktını üretir; bkz. [Android uygulaması](#android-uygulaması-apk).

## Ne yapar?

- **7 seri, 17 dalga, 145 oturum** — Erken dönem (Journeys Out of the Body), Waves of Change
  I–VIII, özgün serbest akış serisi (Exploring + Prospecting), Human Plus fonksiyon egzersizleri,
  Gateway Voyage açık oturumları, Hemi-Sync albüm serileri (Lucid Dreaming, Chakra, 5th Dimensional)
  ve Ek Pratikler. Focus 10'dan Focus 27'ye. Her seri ve dalga bir öncekine dayanır; uygulama
  öğrenme yolunu gösterir.
- **Teknikler sekmesi** — 21 teknik (REBAL, ECB, EBT, beden haritası, renk nefesi, örüntü, NVC,
  Compoint, ayrışma yöntemleri, CRV, Miranon renkleri…): ne işe yarar, nasıl yapılır, ne zaman
  kullanılır. **Her tekniğin adım adım animasyonlu hikâye panosu** ("Nasıl görünür?"): REBAL'da
  enerjinin tepeden çıkıp bedenin etrafından dolaşıp ayaklardan girdiği döngü, ECB'de kaygıların
  kutuya konup kapağın kapatılması ve kutunun kenara itilmesi, EBT'de bedeni tarayan ışık çubuğu,
  ayrışma yöntemleri, enerji yürüyüşü, topraklanma… 84 sahne, iki dilli altyazı; sahneler kendiliğinden
  ilerler, dokunarak ya da ok/nokta düğmeleriyle gezilir, duraklatılır. Liste kartlarında küçük
  önizleme; rehber konularında ilgili bölümün hemen altında aynı animasyon.
- **Görsel paketleri galerisi** (Teknikler sekmesinin üstündeki kart, Ayarlar → Galeriyi aç, her
  oturum sayfasındaki önizleme) — oturum sırasında ekranın ortasında duran 6 animasyonlu görsel
  (Portal, Enerji Akışı, Kutu/ECB, Renk Dalgaları, Beden Haritası, Kozmik Görseller); her durumda
  (Hazırlık, Focus 10–27, Keşif, Dönüş) nasıl göründüğünü izle, dokunarak seç, oturum boyutunda
  dene. Görseller video/GIF değil, cihazda çizilen hafif SVG/CSS animasyonlarıdır (çevrimdışı, pil
  dostu); Kozmik Görseller paketi üretilmiş üç resim kullanır.
- **Rehber sekmesi** — internetteki binlerce sayfa dokümanın iki dilli (Türkçe/İngilizce) sentezi,
  17 konu başlığı altında (tarihçe, bilimsel zemin, focus seviyeleri, tüm teknikler, programlar,
  maksimum verim, sorun giderme, SSS, güvenlik, sözlük, kaynaklar). Tüm konuların tam metninde
  **arama** (Türkçe karakter duyarsız: "isik" → ışık; eşleşen bölüme atlar ve terimi işaretler),
  metin içindeki **"8. konu" / "topic 8" göndermeleri tıklanabilir** (geri tuşu geldiğin konuya
  döner), her konunun altında önceki/sonraki konu. Her konunun başında **İçindekiler** (bölüme
  atla), okurken sağ altta **Bölümler** düğmesi (bulunduğun bölüm işaretli; başa dön; önceki/sonraki
  konu).
- **Telefon geri tuşu** — detay, teknik, rehber konusu, katalog, galeri ve açık paneller geri
  tuşu/hareketiyle bir üst seviyeye döner; çalışan bir oturumu geri tuşu kapatmaz.
- **Hemi-Sync referans kataloğu** (Katalog sekmesinin altında) — uygulamada oturumu olmayan
  175 Hemi-Sync başlığı: Mind Food, İngilizce Metamusic hattının tamamı (sanatçı ve katalog
  koduyla), albüm serileri; İyileşme desteği / Uyku ve rüya / Çocuklar / Odak dizileri; kategori,
  tıklanabilir etiketler ve arama (başlık, sanatçı, kod). Her başlıkta ne işe yaradığı ve
  uygulamadaki en yakın oturum bağlantıları; oturum detayında da "Hemi-Sync kataloğunda" ters
  bağlantısı. PC kaynağı açıkken kütüphanende eşleşen klasör/dosyalar listelenir ve doğrudan
  çalınır (albümlerde parçalar sırayla devam eder; sesli yönerge yok, kaydın kendi anlatımı
  kullanılır).
- **Kütüphanem (PC kaynağı)** — PC'deki tüm klasör ve dosyalar; arama, yeniden tarama, dosya ya
  da klasörü sırayla çalma; dosyanın eşleştiği oturum çipte (elle olanlar ✎), eşleşmeyenlere
  "Oturuma ata". Oturum detayındaki PC çipinden dosya seçilir/değiştirilir; seçim PC sunucusuna
  kaydedilir ve tüm cihazlar aynı eşleşmeyi kullanır. Her kayıtta **kaldığın yerden sürdürme**
  (+ Baştan), albüm/klasörde **sonraki parçanın önyüklenmesi**; Günlük'ten **tek dokunuşla PC'ye
  yedek / PC'den geri al** (iki cihaz eşitleme).
- **Binaural yatak** — iki kulağa farklı taşıyıcı frekans; Focus seviyeleri arasında yavaş
  kayar. **Kulaklık şarttır** (hoparlörle ritim oluşmaz).
- **Ekran kilidi dostudur** — tüm oturum (yatak + çanlar + kayıtlı sesli rehber) tek bir
  `<audio>` öğesinden WAV olarak çalar; ekranı kilitle, cebine koy, devam etsin.
- **Katalog filtreleri** — arama kutusunun altında Focus seviyesi, süre (≤ 20 / 20–30 / > 30 dk,
  senin seçtiğin uzunluk ayarlarıyla hesaplanır), seri, durum (yapıldı / yapılmadı), favori ve gece
  filtreleri; metin aramayla birleşir, sonuç sayısı ve "Filtreleri temizle"; seçimler hatırlanır,
  filtrelenmiş dalgalar açık gelir.
- **Görünüm ve erişilebilirlik** — Ayarlar → Görünüm: tema (sistemle aynı / koyu / açık; oturum
  ekranı her temada karanlık kalır), yazı boyutu (4 kademe), hareketi azalt (sistem tercihi, azalt,
  tam). Telefonun okuma sesi için ses seçimi (cihazda kurulu seslerden), okuma hızı ve "Dene".
- **Kayıtlı sesli rehber (tr + en)** — yönerge satırları doğal bir nöral sesle önceden kaydedilip
  oturum sesine karıştırılır; böylece ekran kilitliyken de duyulur ve robotik telefon TTS'ine
  gerek kalmaz. Henüz kaydı olmayan satırları telefonun kendi metin okuma sesi okur (Ayarlar →
  "Kayıtlı sesli rehber" kapatılabilir; aynı yerde dil başına kapsama oranı görünür). Kayıtlar
  parça parça eklenir; bkz. "Sesli rehber paketleri".
- **Gece oturumları** — uyku oturumları dönüş sayımı ve çan yerine seçilen sürede sönümlenerek biter;
  "Gece planı" ile uyandırma çanı / WBTB alarmı (4,5 · 6 · 7,5 · 9 saat sonra ya da belirli saat) aynı
  ses akışında çalar, ertelenebilir; bitişte rüya günlüğü ve WBTB oturumu kısayolları.
- **Nefes rehberi** — nefes temposu olan bölümlerde (her oturumun başındaki rezonans ayarı, Renk
  Nefesi, kutu nefesi, ekstra nefes çalışmaları) kadranın içinde nefesle büyüyüp küçülen bir halka
  ve "Al · 3 / Tut / Ver / Bekle" sayacı; ses tarafında aynı zaman çizelgesinden üretilen ipucu
  (nefes verirken yumuşak uğultu tonu ya da geçişlerde kısa bip), ekran kilitliyken de duyulur.
  Tüm görsel paketlerinin üstünde çalışır, hareketi azalt ayarında halka büyümek yerine parlar;
  Ayarlar'dan kapatılabilir. Detay sayfasındaki akış listesi tempoyu gösterir (ör. "4 sn al · 6 sn
  ver · uğultu tonu").
- **Human Plus günlük pratik** — ana sayfada "Günün komutu" kartı (kodladığın fonksiyonlardan güne
  göre biri; "Başka komut" ile değiştir), her kullanımda +1 pratik sayacı (bugün / 7 gün / toplam /
  gün serisi; oturum sayfasında 7 günlük çubuklar, Program sekmesinde özet), komutu doğrulanmamış
  fonksiyonlar için kendi komut notun, Ayarlar'dan 1–4 saatte bir komut hatırlatıcısı (web: uygulama
  açıkken, izin verirsen bildirimle; Android uygulamasında kapalıyken de bildirim).
- **Rehberde okuma takibi** — konu başına okuma yüzdesi ve ✓, "Kaldığın yer" kartı, konu ve bölüm
  yer imleri (★), okurken A− / A+ yazı boyutu; hepsi yedeğe girer.
- **Günlük** — her oturumdan sonra etiketler (titreşim, görüntü, temas, içgörü…), not ve çizim;
  kayıtlar sonradan düzenlenir, tüm günlük Markdown olarak indirilir veya yazdırılır / PDF yapılır.
- **Rüya günlüğü** — Günlük sekmesindeki Rüyalar modu: sabah girişi, rüya işaretleri (ön ayarlar +
  kendi işaretlerin), lucidlik ve hatırlama derecesi, en sık işaretlerin özeti, gerçeklik testi
  hatırlatıcısı (web: uygulama açıkken, izin verilirse tarayıcı bildirimi; Android uygulamasında
  kapalıyken de bildirim).
- **Yedekleme** — Günlük sekmesinden tek dosyalık JSON yedek (günlük, pratik kaydı, favoriler, program, ayarlar) indirilir ve başka cihazda "Yedek yükle" ile birleştirilir; veriler yalnızca cihazda tutulur.
- **Program** — oturumları sıraya diz veya bir dalgayı tek seferde başlat.
- **Gece oturumları** — uykuya dalarken çalan, karanlık ekranlı, çansız oturumlar.
- **Android uygulaması** — aynı uygulamanın Capacitor paketi: oturum sırasında ön plan servisi
  (ekran kapalıyken ses, canlı TTS ve çan kesilmez), uyandırma çanı gerçek alarm olarak da kurulur,
  gerçeklik testi ve komut hatırlatıcıları uygulama kapalıyken bildirim olarak gelir, yerel TTS motoru,
  dışa aktarma/yedek Android paylaşım sayfasıyla. Bkz. [Android uygulaması](#android-uygulaması-apk).

## Görsel paketler (oturum görseli)

Egzersiz sırasında arka planda gösterilen görsel, senin seçtiğin pakete göre değişir
(Ayarlar → Oturum görseli ya da görsel galerisi). Bunlar gözler kapalıyken önemsiz olabilir;
tekniklerin *nasıl yapıldığını* gösteren asıl açıklayıcı animasyonlar Teknikler sekmesindeki
hikâye panolarıdır (yukarıda).

- **Portal (varsayılan)** — iç içe çemberler, odak seviyesine göre renk değiştirir.
- **Enerji Akışı** — yumurta şeklinde enerji bedeni (REBAL), yörüngede parçacıklar.
- **Kutu (ECB)** — Enerji Dönüşüm Kutusu: ışınların aktığı parlayan küp.
- **Renk Dalgaları** — yedi rezonans renginde akan dalgalar (renk nefesi teması).
- **Beden Haritası** — beden silüeti, tarama çizgisi ve yedi çakra noktası.
- **Kozmik Görseller** — üretilmiş görseller (enerji küresi, kutu, dalgalar; nefes alan animasyon).

Paketler `src/js/visuals/<id>.js` modülleri olarak çalışır (durum bazlı SVG/CSS animasyonları).

## PC'den orijinal kayıtları çalma (yerel ağ)

Uygulama sesi kendisi sentezler; ama elinizde tüm Hemi-Sync kayıtları varsa (FLAC), bunları
telefona 30–40 GB olarak koymadan, evdeki PC'nizden akıtabilirsiniz:

1. **PC'de sunucuyu başlatın** (yalnızca Python 3; standart kütüphane yeterli):
   ```bash
   python3 tools/pc-server.py --audio "/path/to/Hemi-Sync"     # Windows: tools\pc-server.bat'e çift tık
   ```
   Sunucu uygulamayı da servis eder (`--app`, varsayılan depo kökündeki `www/`; önce `npm run build`).
2. **Telefon tarayıcısından** (aynı Wi-Fi) `http://<pc-ip>:8700/` adresini açın — uygulama PC'den yüklenir.
3. **Ayarlar → Ses kaynağı** → "PC'den çalsın (yerel ağ)" seçin, adresi girin, "Bağlantıyı test et"e dokunun.
4. Bir oturumu başlattığınızda, oturumun resmi egzersiz adıyla eşleşen kayıt PC'den akar
   (örneğin "Focus 10'a Giriş" → `Wave I Discovery/02 Introduction to Focus 10.flac`).
   Kütüphanende o oturumun kaydı yoksa başka bir kayıt çalınmaz, uygulama sentezler.
   Eşleşme bulunamazsa otomatik olarak uygulama sentezler.

Notlar:

- Uygulama boyutu değişmez; ses PC'nizden akar. Eşleşme için dosya adlarının egzersiz adını
  içermesi yeterli (örn. `Attention.flac`, `02 Introduction to Focus 10.flac`).
- **FLAC**: tarayıcınız çalabiliyorsa direkt servis edilir; değilse sunucu anında WAV'a çevirir
  (PC'de `ffmpeg` ya da `pip install soundfile` gerekir; çevrilmiş dosyalar önbelleğe alınır).
- `/play/...` uç noktası Range isteklerini destekler (iOS gereksinimi) ve yalnızca ses
  dosyalarını servis eder. Ev ağınızda kullanın.
- Uygulama https üzerindeyse tarayıcı düz http adresini engeller; bu durumda uygulamayı
  PC adresinden (http) açın.
- Eşleme: `content/tracks.json` (resmi egzersiz adları) + `src/js/trackmatch.js`
  (test: `tools/test-trackmatch.mjs`); sunucu: `tools/pc-server.py` (test: `tools/test-pc-server.mjs`).
- Sunucu (v0.3) küçük bir paylaşılan durum da tutar — `--data` klasörü (varsayılan `~/.gateway-pc`):
  elle eşleşmeler (`matches.json`), kaldığın yer (`positions.json`), cihaz başına uygulama yedeği
  (`backups/<cihaz>.json`). Uç noktalar: `GET/POST /matches`, `/positions`, `/backup`,
  `/backups.json`. Kimlik doğrulama yoktur; yedek günlüğünüzü içerir — yalnızca güvendiğiniz ağda.
- **Telefon bağlanamıyorsa (Windows):** sunucu konsolda `READY` dese bile Windows Güvenlik Duvarı 8700
  portunu engelliyor olabilir. Ev Wi-Fi'sinin ağ profilini **Özel (Private)** yapın ya da ilk açılıştaki
  izin penceresinde "Ortak ağlar"ı da işaretleyin; elle kural için (yönetici komut istemi):
  `netsh advfirewall firewall add rule name="Gateway PC" dir=in action=allow protocol=TCP localport=8700`.
- `tools\pc-server.bat` önce `py` başlatıcısını kullanır (python.org kurulumunda her zaman vardır);
  Microsoft Store'un `python` kısayoluna takılırsa bunu söyler.
- Tarayıcıdan gelen istekler yalnızca sunucunun kendi servis ettiği uygulamadan, aynı makinedeki bir
  sayfadan (başka port olabilir) ve Android uygulamasından (`http://localhost`) kabul edilir; başka
  bir siteden gelen istek 403 alır (açtığınız bir web sayfası yedeğinizi okuyamaz ya da sahte yedek
  bırakamaz). Uygulamayı başka bir makineden servis ediyorsanız onu ekleyin:
  `--allow-origin http://192.168.1.30:8123` (tekrarlanabilir).

## Android uygulaması (APK)

Web uygulamasının birebir aynısı, Capacitor 8 ile Android paketi olarak (`android/` projesi,
`capacitor.config.json`, `src/js/native.js` köprüsü). Web'de çalışmayan her şeyi tamamlar:

- **Oturum servisi** — oturum başlayınca kalıcı bir bildirimle ön plan servisi (medya türü, uyanık
  kilidi) açılır: ekran kapalı, uygulama arka plandayken ses, canlı sesli yönergeler (TTS) ve uyandırma
  çanı kesilmez. Bildirimdeki **Bitir** oturumu kapatır; uyku beklemesinde **Çanı iptal et**.
- **Gerçek alarm** — WBTB / sabah çanı, uygulama içi çanın yanında `wakeAt` anında yüksek öncelikli
  bir bildirim (kendi zil sesi `bell.wav`) olarak da kurulur (`USE_EXACT_ALARM`; sistem telefonu
  uyandırır). Ertelemede yeniden kurulur, bitirince iptal edilir.
- **Bildirim hatırlatıcıları** — gerçeklik testi ve günün komutu hatırlatıcıları iki gün ileriye kadar
  (pencereye göre, en çok 60'ar) planlanır; uygulama kapalıyken de gelir; her açılışta ve ayar
  değişiminde yenilenir. Günün komutu bildirimi o günün komutunu taşır.
- **Yerel TTS** — kayıt olmayan satırlar Android TTS motoruyla okunur (ses seçimi Ayarlar'da aynı
  liste; arka planda da konuşur).
- **Paylaşım** — Markdown/JSON dışa aktarma ve yedek, indirme yerine Android paylaşım sayfasına
  gider (Drive, e-posta, Dosyalar…). Yedek yükleme dosya seçiciyle çalışır.
- **Geri tuşu** — uygulama içi geçmiş; kökte uygulamayı küçültür (kapatmaz).
- **PC kaynağı** — uygulama WebView'da `http://localhost` adresinden çalışır (`androidScheme: "http"`):
  https bir sayfadan evdeki PC'nin `http://` ses akışı engellenir ya da https'e çevrilip düşer (liste gelir
  ama kayıt yüklenmez); http sayfada bu sorun yoktur. Not: bu adres değişikliğiyle önceki (`https://localhost`)
  kurulumun yerel verisi görünmez — güncellemeden önce Günlük → yedekle, sonra geri yükle.
- Ayarlar → **Android** paneli: bildirim izni, alarm izni, sürüm; pil kısıtlaması notu.

**Kurulum:** Actions → son `gateway` çalışması → `gateway-android-apk` artefaktı (zip içinde
`gateway-<sürüm>-release.apk`), ya da `gateway-v<sürüm>` etiketi / "Run workflow → release" ile
oluşan GitHub sürümünden indir. Telefonda dosyayı aç, "bilinmeyen kaynaklara" izin ver. İlk oturumda
bildirim izni istenir (Android 13+). Sürüm `package.json`'dan gelir (`0.7.0` → `versionCode 700`).

**İmza:** depo, her CI çıktısının bir öncekinin üzerine kurulabilmesi için bir geliştirme anahtarı
taşır (`android/keystore/gateway.p12`, parola `gateway-dev`). **Depo herkese açık olduğu için bu anahtar
gizli değildir:** onunla herkes, kurulu uygulamanın üzerine "güncelleme" olarak kurulan bir APK
imzalayabilir. Gerçek kullanım için kendi anahtarını üretip depo gizli değişkenlerine koy:
`GATEWAY_KEYSTORE_B64` (base64 .p12/.jks), `GATEWAY_KEYSTORE_PASS`, `GATEWAY_KEY_ALIAS`,
`GATEWAY_KEY_PASS`. Anahtar değişince eski kurulum kaldırılıp yeniden kurulur (önce yedek al).

**Yerelde derleme:** Node 22+ (Capacitor CLI 8), Android Studio + JDK 21: `npm ci && npm run build &&
npx cap sync android && cd android && ./gradlew assembleRelease` (ya da `npx cap open android`). CI işi:
`.github/workflows/gateway.yml` → `android` (Node 22, Temurin 21, Android SDK 36, Gradle önbelleği).

## Mimari (kısaca)

```
content/            iki dilli içerik: series.json, waves.json, focus.json, common.json,
                    templates.json, defaults.json, tracks.json (PC kaynak eşleme adları),
                    techniques-a/b.json (21 teknik), guide/tr + guide/en (rehber konuları, iki dil;
                    [[storyboard:id]] satırı ilgili tekniğin animasyonunu gömer),
                    sessions/*.json (kompakt, şablon referanslı)
content/SCHEMA.md   içerik kuralları (özgün metin, sesli metin kuralları, şema)
content/voice/      kayıtlı sesli rehber klipleri (tr/, en/: <anahtar>.mp3 + index.json)
tools/              expand.mjs (şablon açma + ses anahtarları), validate-content.mjs, build.mjs
                    (ses paketlerini de birleştirir), voice-lines.mjs, voice-pack.py, voice-edge-tts.py,
                    test-render.mjs (Node'da binaural render testleri), test-voice.mjs, make-icons.py
src/js/             i18n, store (localStorage + IndexedDB), content, timeline (olaylar + yatak),
                    audio (saf-JS stereo WAV renderer + SessionPlayer + TrackPlayer),
                    session, app, visuals (6 görsel paketi), visuals/gateway|aura|box|waves|body|img,
                    storyboard (21 tekniğin adım adım açıklayıcı animasyonları + oynatıcı),
                    md (rehber yorumlayıcı), trackmatch (PC parça eşleştirme), pcsource (PC istemcisi)
src/                index.html, css, manifest.webmanifest, sw.js, icons
ANALYSIS.md         Gateway Experience derinlemesine analizi (Türkçe)
```

**Sesli rehberlik** iki katmanlıdır: kaydı olan satırlar `www/voice/<dil>/<paket>.mp3`
paketlerinden çözülüp doğrudan oturum WAV'ına karıştırılır (ekran kilidinde de çalar); kaydı
olmayan satırları telefonun metin okuma (TTS) sesi okur (yalnızca ekran açıkken güvenilir).

## Sesli rehber paketleri

Her sesli satırın anahtarı metninin karmasıdır (`voiceKey` = sha1(NFC metin)[:12]; `tools/expand.mjs`
genişletme sırasında `audio: {tr, en}` olarak ekler). Klipler `content/voice/<dil>/<anahtar>.mp3`
(mono 22,05 kHz, 48 kb/s) + `index.json` içinde durur; `tools/build.mjs` bunları paketlere
birleştirir (`common` = uygulama geneli ve ≥2 oturumun paylaştığı satırlar, diğerleri oturum
başına bir paket) ve bayt aralıklarını `APP_CONTENT.audio` manifestine yazar. Paket URL'leri
içerik karması taşır; servis çalışanı onları ayrı bir önbellekte (`gateway-voice-v1`) cache-first
tutar, böylece ses dosyaları her açılışta yeniden inmez.

Kayıt üretim akışı (`tools/voice-pack.py`, Python 3 + numpy, soundfile, imageio-ffmpeg; İngilizce
denetim için pocketsphinx):

```bash
node tools/voice-lines.mjs                       # satır envanteri (anahtar, metin, kullanım)
python3 tools/voice-pack.py plan                 # deterministik toplu metinler (≤1400 karakter, ≤24 satır)
python3 tools/voice-pack.py text --lang tr --batch 5   # TTS'e verilecek metin (satırlar boş satırla ayrılır)
python3 tools/voice-pack.py split --lang tr --batch 5 --audio toplu5.wav --partial
python3 tools/voice-pack.py status               # kapsama; kalan toplu işler
node tools/build.mjs && node tools/test-voice.mjs
```

`split`, TTS'in her noktalama işaretinde verdiği duraklardan yararlanır: sessizlikler metnin
noktalama parçalarıyla dinamik programlamayla eşlenir, satır sınırları buradan çıkar; ardından
her satır süre oranı, satır sonu durağı, hece çekirdeği sayısı (Türkçe) ya da tanınan sesbirimler
(İngilizce) ile denetlenir. Şüpheli satırlar ve komşuları yazılmaz (`--partial`), `plan --missing`
onları yeniden kayıt için gruplar. Alternatif olarak kendi PC'nde ücretsiz Edge nöral sesleriyle
satır satır üretip içe aktarabilirsin:

```bash
pip install edge-tts
python3 tools/voice-edge-tts.py --lang tr --voice tr-TR-EmelNeural --out /tmp/voice-tr
python3 tools/voice-pack.py import --lang tr --dir /tmp/voice-tr --voice "tr-TR-EmelNeural"
```

(`voice-edge-tts.py` internet ister; bu depo içindeki testlerde çalıştırılmaz.)

**Yatak (binaural ritim)** saf JavaScript ile örnek örnek üretilir: faz başına bir segment,
çapraz geçişli, Focus geçişlerinde frekans kayar; her segment mutlak osilatör fazını taşır,
böylece chunk sınırlarında faz atlaması olmaz.

## Geliştirme

```bash
npm run validate   # içerik doğrulama (şema + sesli metin kuralları)
npm test           # doğrulama + Node render testleri (WAV, frekans, faz sürekliliği, md, hikâye panoları) + ses paketi + Android köprüsü testleri; Node 18+
python3 tools/make-icons.py   # ikonları yeniden üret (Pillow gerekir)
```

PC ses kaynağı testleri (eşleştirme + sunucu) dahil tam paket:

```bash
npm test           # doğrulama + render + trackmatch + pc-server + native (sahte Capacitor köprüsü) testleri
```

Uçtan uca duman testi (jsdom ile, ayrı bir geçici dizinde `npm i jsdom esbuild` kurulu olmalı):

```bash
node tools/build.mjs
SMOKE_DIR=/tmp/smoke SMOKE_BUNDLE=/tmp/smoke/app.bundle.js node tools/smoke-test.mjs      # web (362 denetim)
SMOKE_DIR=/tmp/smoke SMOKE_BUNDLE=/tmp/smoke/app.bundle.js node tools/smoke-native.mjs    # Android köprüsü, sahte Capacitor (38 denetim)
```

Yeni oturum eklemek için `content/sessions/` dizinindeki bir dosyaya kompakt bir oturum ekle
(şablonlar: `prep`, `entry`, `encode`, `explore`, `return`); kurallar için `content/SCHEMA.md`.
Yeni bir dalga eklerken onu `content/waves.json`'a (ve gerekliyse `content/series.json`'a) kaydet.
Yeni teknik: `content/techniques-a.json` veya `techniques-b.json`'a ekle. Yeni rehber konusu:
`content/guide/tr/<konu>.md` ve `content/guide/en/<konu>.md` olarak aynı dosya adıyla ekle;
derleme `www/guide/index.json`'u kendisi üretir.

## Sürekli test ve yayınlama

`.github/workflows/gateway.yml`, uygulama dosyalarına (`src/`, `content/`, `tools/`, `android/`,
`package*.json`, `capacitor.config.json`) dokunan her itmede (ve PR'da) şunları koşar: içerik doğrulama,
derleme, derleme çıktısı testleri (servis çalışanı ön-önbellek listesi), Node render testleri, ses paketi
testleri, parça eşleştirme, PC sunucu testleri, Android köprüsü testi ve jsdom duman testleri (web +
sahte Capacitor köprüsüyle Android akışı). Derlenen
`www/` dizini `gateway-www` artefaktı olarak 14 gün indirilebilir. `android` işi (PR dışında) imzalı
`gateway-android-apk` artefaktını üretir; `gateway-v*` etiketi ya da elle "release" seçeneği GitHub
sürümü yayınlar.

**GitHub Pages:** depo ayarlarında *Settings → Pages → Source: GitHub Actions* seçildikten sonra
*Settings → Secrets and variables → Actions → Variables* altında `DEPLOY_PAGES = true` tanımlanınca
`pages` işi varsayılan dala (ya da `PAGES_BRANCH` değişkeninde verilen dala) her itmede uygulamayı
`https://<kullanıcı>.github.io/<depo>/` adresine yayınlar. Uygulama göreli yollar kullandığı için alt
dizinde çalışır; `www/.nojekyll` derlemede yazılır. Özel (private) depoda Pages, GitHub Pro/Team
planı ister; herkese açık depoda ücretsizdir. (Kendi sunucun: `www/` dizinini HTTPS altında herhangi bir
statik sunucuya kopyalaman yeterlidir.)

**Çevrimdışı:** servis çalışanı derlemede üretilen tam listeyi (uygulama kabuğu, tüm JS modülleri,
17 + 17 rehber konusu, araştırma dosyaları, görseller, ikonlar) kurulumda ön-önbelleğe alır; önbellek adı
dosya içeriklerinin karmasıdır, dolayısıyla her derleme kendiliğinden yeni sürüm olarak kurulur.
Ses paketleri ayrı bir cache-first önbellekte ilk kullanımda iner. Ağ önce denenir, ama 3 saniyede yanıt
gelmezse (Wi-Fi var, internet yok) önbellekteki dosya kullanılır; yazı tipleri ilk çizimi bekletmez.

## Sorumluluk reddi

Bağımsız bir kendini keşif aracıdır; terapi değildir. Monroe Institute ile bağlantılı değildir.
Kulaklık şarttır; araç sürerken kullanılmaz; epilepsi öyküsü olanlar doktoruna danışmalıdır.
Ayrıntılar için `ANALYSIS.md` (bölüm 10 ve 12).
