# Yol haritası — parça parça eklenecek yetenekler

Durum işaretleri: ✅ bitti · 🔧 bu turda yapılıyor · ⏳ sırada · 🖥️ PC'de yapılacak (bkz. `docs/`).
Her parça kendi başına test edilip itilir; sıra kullanıcı isteğine göre değişebilir.

## Parça 1 — Platform ve erişilebilirlik temeli (v0.6.0) ✅
- ✅ Rehber çevrimdışı: derleme tüm uygulama dosyalarını (34 rehber md'si, görseller, ikonlar, tüm
  JS modülleri) ön-önbellek listesine yazar; servis çalışanı sürümü içerik karmasından türetilir
  (her derleme otomatik güncellenir, elle `gateway-vN` artırımı yok).
- ✅ CI: GitHub Actions her itmede doğrulama + render + ses paketi + eşleştirme + PC sunucu + duman
  testlerini koşar; derlenen `www/` artefakt olarak indirilebilir.
- ✅ GitHub Pages dağıtım işi hazır (`DEPLOY_PAGES` deposu değişkeni `true` olunca çalışır; özel depoda
  Pages için GitHub Pro gerekir — bkz. README "Yayınlama").
- ✅ Ayarlar: tema (otomatik/koyu/açık), hareketi azalt, yazı boyutu, telefon TTS sesi + hızı + "Dene".

## Parça 2 — Katalog filtreleri (v0.6.1) ✅
- ✅ Focus seviyesi, süre aralığı, seri, yapılmış/yapılmamış, favori, gece; metin aramayla birlikte
  çalışır, seçimler hatırlanır; sonuç sayısı ve "Filtreleri temizle".

## Parça 3 — Günlük (v0.6.2) ✅
- ✅ Kayıt düzenleme: her kayıtta "Düzenle" → yerinde form (etiket çipleri, not, çizimi koru / kaldır,
  Kaydet / Vazgeç); düzenlenen kayıtlar "düzenlendi" damgası taşır (`journal.update`).
- ✅ Markdown dışa aktarma (`gateway-journal-<tarih>.md`: özet, kayıt başına başlık + süre, etiketler,
  not, çizimler gömülü) ve Yazdır / PDF (yazdırma stili: sekmeler, düğmeler, ısı haritası gizli,
  kayıtlar bölünmeden).
- ✅ Rüya günlüğü modu: Oturumlar | Rüyalar anahtarı; sabah girişi formu (metin, 18 rüya işareti ön
  ayarı + kendi işaretlerin, lucidlik 0–3, hatırlama 1–3); rüya listesi, düzenle/sil; istatistik
  (rüya / lucid / işaret) ve "en sık işaretlerin"; gerçeklik testi hatırlatıcısı (aralık + saat
  penceresi, "Şimdi test et"). Hatırlatıcı uygulama açıkken çalışır; izin verilmişse tarayıcı
  bildirimi de gösterir. Uygulama kapalıyken bildirim Android paketiyle (Parça 10) gelecek.

## Parça 4 — Rehber okuma deneyimi (v0.6.3) ✅
- ✅ Okuma ilerlemesi: konu açıkken üstte ince ilerleme çizgisi; kaydırdıkça konu başına yüzde
  kaydedilir (yalnızca artar), %90 ve üstü "okundu" sayılır; listede konu kartlarında ilerleme
  çubuğu + ✓, en üstte "17 konudan N tanesi okundu" çubuğu.
- ✅ "Kaldığın yer": en son okunan konu + bölüm + yüzde kartı liste başında (tek dokunuşla o bölüme
  gider); yarım kalan bir konuyu yeniden açınca araç çubuğunda "Kaldığın yere git · %N" çipi.
- ✅ Yer imleri: konu düzeyinde (araç çubuğundaki ★) ve bölüm düzeyinde (her ## başlığın yanındaki
  ★); liste başında "Yer imleri" bloğu, dokununca o bölüme gider, ✕ ile kaldırılır; listede yer imli
  konular ★ ile işaretli.
- ✅ Yazı boyutu: konu araç çubuğunda A− / A+ (Ayarlar'daki ölçekle aynı 4 kademe, kalıcı).
- ✅ İlerleme ve yer imleri JSON yedeğe girer; geri yüklemede konu başına büyük yüzde korunur, yer
  imleri birleştirilir.

## Parça 5 — Uyku ve lucid rüya (v0.6.4) ✅
- ✅ Sönümlenerek bitiş: 13 gece oturumundan (Lucid Dreaming ×4, W1 Sleep, Mission Night, Human Plus
  uyku işlevleri ×4, akşam/rüya/WBTB ekstraları) "Dönüş" sayımı ve bitiş çanı kaldırıldı; zaman
  çizelgesi sona bir "Sönümlenme" evresi ekler, ses yatağı seçilen sürede (1–10 dk, varsayılan 2)
  sıfıra iner. Ayar: detay sayfasındaki "Gece planı" ve Ayarlar'da.
- ✅ Uyandırma çanı / WBTB alarmı: gece planında "4,5 saat sonra · WBTB", "6 saat sonra · WBTB",
  "7,5 / 9 saat sonra" veya belirli saat. Oturum bitince aynı ses akışı sessiz parçalarla sürer
  (8 kHz mono WAV, duvar saati her parça sonunda yeniden kontrol edilir), vakti gelince yükselen çan
  + uyanma cümlesi döngüde çalar; ekranda saat, "Uyandım", "10 dk ertele", "Çanı iptal et". Günlüğe
  yalnızca rehberli kısım yazılır.
- ✅ Bitiş ekranı gece oturumlarında "Rüya günlüğüne yaz" (rüya modu, form açık) ve WBTB çanından
  sonra "WBTB oturumunu aç" düğmeleri.
- Sınır: web sürümünde çan ancak uygulama arka planda çalmaya devam ederse çalar; gerçek alarm
  Android paketinde (Parça 10).

## Parça 6 — Nefes göstergesi (v0.6.5) ✅
- ✅ İçerik şeması: bir evrenin `hold`'u yanında `breath { in, hold, out, rest, tone }` (sn; `tone`
  = `hum` | `tick` | yok). Kullanım: `prep` şablonu (her oturumun rezonans ayarı: 4 al / 6 ver, uğultu),
  Renk Nefesi `breathe` evresi (5 / 7, yalnızca görsel), ekstra "Rezonans Ayarı" (5 / 3 / 7, uğultu)
  ve "Kutu Nefesi" (4 / 4 / 4 / 4, bip). Doğrulayıcı aralık ve ton denetimi yapar.
- ✅ Zaman çizelgesi: `tl.breath[]` bölütleri (`t0/t1`, tempo, evre) tek kaynak; `breathAt(tl, t)` →
  aşama, aşamada kalan sn, akciğer doluluğu (0–1), döngü. Rutinlerde (program / dalga) kaydırmalı
  taşınır.
- ✅ Ses: aynı bölütlerden türetilen ipucu render'a karışır (ekran kilitliyken de çalar): `hum` →
  her nefes verişte 110 Hz + armonikli yumuşak ton (faz mutlak zamana bağlı, parça sınırında
  dikişsiz), `tick` → her aşama geçişinde kısa bip. Çan sesi 0 olsa bile ≥ 0,3 seviyede; Ayarlar
  → "Nefes rehberi" kapatınca ne ses ne halka.
- ✅ Ekran: kadranın içinde halka (`requestAnimationFrame`, nefesle 0,55 → 1,0 ölçek; tut/bekle'de
  kesikli kenar) + "Al · 3" etiketi; görsel paketinin üstünde, geri sayım rakamlarının altında.
  Hareketi azalt (sistem tercihi ya da ayar): ölçek yerine parlaklık değişir. PC kaydı çalarken
  (zaman çizelgesi yok) gösterilmez.
- ✅ Detay sayfası akış listesinde tempo çipi ("4 sn al · 6 sn ver · uğultu tonu").
- ✅ Testler: render 68 (tempo normalizasyonu, `breathAt`, uğultu yalnızca nefes verişte, parça
  sınırı sürekliliği, bip yerleri, görsel-tek tempo sese dokunmaz, rutin kaydırmaları), duman 280
  (akış çipi, halka gizli → tutuşta görünür → etiket ilerler → atlayınca gizlenir, ayar kalıcılığı,
  kapalıyken hiç görünmez).

## Parça 7 — Referans kataloğu genişletme (v0.6.6) ✅
- ✅ Katalog 46 → 175 başlık: İngilizce Metamusic hattının tamamı (132 albüm; sanatçı, katalog kodu,
  uygulama etiketleri), Support for Healing / Health Issues başlıkları (Chemotherapy & Radiation
  Companion, T-Cells, Healing Journeys Support, Circle of Trees, Ultimate Healer, Weight Loss,
  Healing Through Awareness, Resonant Tuning, Cancer Support, Stroke Recovery, Transforming Life's
  Challenges, Network of Light düzeltildi), Sleep Better başlıkları (Sound Sleeper, Hemi-Sync Nap,
  From Anxiety to Rest, Sacred Sleep) ve 6 çocuk uyku masalı. Bütün açıklamalar özgün; `code`
  (DL eki atılmış yayıncı kodu) ve `creator` eklendi. Transformation (zaten oturum), demetler ve
  Hemi-Sync dışı albümler alınmadı.
- ✅ Etiketler 15 → 21 (meditasyon, yaratıcılık, çocuklar, ruhsal gelişim, masaj/yoga, genişlemiş
  farkındalık); listedeki etiket yongaları tıklanınca süzer. Arama kod/sanatçı/takma adla da eşleşir.
- ✅ Diziler (`collections`): İyileşme desteği (19), Uyku ve rüya (17), Çocuklar için (15), Odak ve
  öğrenme (15); her dizi tanıtım + uygulamadaki en yakın oturum listesi. Tek başlıkta
  `related` yoksa `relatedByTag` varsayılanları (en çok 3) gösterilir → her başlıkta en az bir
  oturum bağlantısı.
- ✅ Ters bağlantı: oturum detayında "Hemi-Sync kataloğunda" paneli (bu oturumu gösteren başlıklar
  + listelendiği diziler); tıklayınca katalog o başlığa kaydırılıp vurgulanır, geri aynı detaya döner.
- ✅ `tracks.json`: Brain/Heart "Support & Maintenance" (sitedeki güncel ad) takma adları.
- ✅ Doğrulayıcı: dizi/etiket/oturum kimlikleri, `code` biçimi, bağlantısız başlık uyarısı. Duman
  280 → 298.

## Parça 8 — Human Plus günlük pratik (v0.6.7) ✅
- ✅ **Günün komutu** kartı (ana sayfa, arama boşken): kodlanmış (günlükte en az bir kez tamamlanmış)
  ve komutu bilinen fonksiyonlardan güne göre deterministik seçim; "Başka komut" o günkü seçimi
  döndürür (`gateway.hpDay`). Henüz kodlanmış fonksiyon yoksa kart doğrulanmış komutlu bir fonksiyonu
  "önce kodla" diye önerir. Kart başlığında hatırlatıcı aralığı ya da `kodlanan/53` sayısı.
- ✅ **Pratik sayacı**: her gerçek kullanımda +1 (kart ve oturum sayfası), geri al; bugün / 7 gün /
  toplam / gün serisi; oturum sayfasında 7 günlük çubuklar; Program sekmesinde özet (kodlanan, 7 gün,
  toplam, seri, en çok kullanılan 5 komut). `gateway.hpPractice` (≤ 5000 kayıt), yedeğe girer, içe
  aktarma tekrarsız.
- ✅ **Komut notu**: resmî komutu kamuya açık kaynaklarda doğrulanmamış 32 fonksiyonda "Komutu yaz"
  → kullanıcı kendi kaydından dinlediği komutu not eder (`gateway.hpCmd`, cihazda + yedekte; "senin
  notun" etiketiyle gösterilir, günün komutu havuzuna girer). Uygulama komut uydurmaz.
- ✅ **Komut hatırlatıcısı**: Ayarlar → 1–4 saatte bir (uygulama açıkken; izin varsa bildirim),
  rüya günlüğündeki hatırlatma penceresiyle ortak; "Şimdi hatırlat". Bitiş ekranı H-Plus oturumundan
  sonra komutu ve kullanım ipucunu gösterir. Rehber 11. konuya kullanım notu eklendi.
- ✅ Duman 298 → 327. Sınır: web'de hatırlatıcı yalnızca uygulama açıkken; gerçek alarm Parça 10.

## Parça 9 — PC tarafı (v0.6.8) ✅
- ✅ **Kütüphanem** (ana sayfa kartı ve Ayarlar; PC kaynağı açıkken): PC'deki **tüm** klasörler ve
  dosyalar, arama, "Yeniden tara"; her dosya doğrudan çalınır (▶), klasör sırayla çalınır; dosyanın
  hangi oturumla eşleştiği çipte görünür (elle olanlar ✎), eşleşmeyenlere "Oturuma ata".
- ✅ **Elle eşleştirme**: oturum detayındaki PC çipi → dosya seçme sayfası (en olası adaylar ★ üstte,
  arama, "Otomatik eşleşmeye dön"); kütüphaneden "Oturuma ata / ✎ / Eşleşmeyi kaldır". Seçim PC
  sunucusuna kaydedilir (`POST /matches`, `~/.gateway-pc/matches.json`) → bütün cihazlar aynı
  eşleşmeyi kullanır; sunucu eskiyse/kapalıysa yalnızca cihazda (`gateway.pcMatches`). Elle eşleşme
  bulanık eşleşmeyi her zaman ezer.
- ✅ **Kaldığı yerden sürdürme**: PC'den çalan her dosyada konum 10 sn'de bir ve durdurunca
  kaydedilir (cihazda `gateway.pos` + PC'de `positions.json`, yeni olan kazanır); ≥ 1 dk dinlenmiş,
  bitmesine > 1 dk kalmış, 30 günden yeni ise oradan sürer ("Kaldığın yerden sürüyor (12:34)" +
  **Baştan** düğmesi); bitince unutulur. Kütüphanede "kaldığın yer 12:34" notu.
- ✅ **Sonraki parçayı önyükleme**: klasör/albüm çalarken bitmesine 45 sn kala sonraki dosya gizli
  ikinci `<audio preload=auto>` ile indirilmeye başlar ve sıra gelince o öğe devralınır (iOS'ta
  paylaşılan öğe korunur, önbellek ısıtılır) → parçalar arasında boşluk yok.
- ✅ **Tek dokunuşla PC yedeği**: Günlük → yedek paneli → "PC'ye yedekle" / "PC'den geri al"
  (`POST/GET /backup`, cihaz başına yuva, Ayarlar'da cihaz adı); geri alma birleştirir, silmez →
  iki cihaz eşitlenir. Yedeğe `positions` alanı eklendi (biçim `gateway-backup/1` korunur).
- ✅ Sunucu `tools/pc-server.py` v0.3: `--data` (vars. `~/.gateway-pc`), `GET/POST /matches`,
  `/positions`, `/backup`, `/backups.json`, CORS'a POST; ping `features`. Testler: pc-server 17 → 41,
  duman 327 → 362. Sınır: kimlik doğrulama yok — yalnızca ev ağında.

## Parça 10 — Android paketi (Capacitor) (v0.7.0) ✅
- ✅ Capacitor 8 projesi (`android/`, `capacitor.config.json`, appId `dev.nsamarslan.gateway`, SDK 36,
  minSdk 24, JDK 21); eklentiler: App, LocalNotifications, Filesystem, Share, Capawesome ön plan
  servisi, community TTS. Köprü `src/js/native.js`: `window.Capacitor.Plugins` üzerinden, paketleyici
  yok; web'de her şey zararsız no-op.
- ✅ **Oturum servisi**: oturum başlayınca `mediaPlayback` türünde ön plan servisi + uyanık kilidi,
  kalıcı bildirim (başlık, "Bitir" düğmesi; uyku beklemesinde "Uyku · çan 05:30" + "Çanı iptal et").
  Ekran kapalıyken ses, canlı TTS (`speakLive` arka planda da konuşur) ve çan sürer.
- ✅ **Gerçek alarm**: uyku beklemesine girince `wakeAt` için tam zamanlı bildirim (`gateway-wake`
  kanalı, `res/raw/bell.wav`, titreşim, `USE_EXACT_ALARM`); ertelemede yeniden kurulur, bitirince
  iptal. Tam alarm izni geri alınmışsa sessizce yaklaşık alarma düşer (gece ayar ekranı açılmaz).
- ✅ **Bildirim hatırlatıcıları**: gerçeklik testi (`rc`, id 7000+) ve günün komutu (`hp`, id 7200+)
  iki gün ileriye, pencere başlangıcına hizalı (`reminderSlots`), en çok 60'ar; açılışta, uygulamaya
  dönüşte ve ayar değişiminde yenilenir; ön plandayken gelen bildirim toast olur; dokununca ilgili
  sekme. Web'deki `setInterval` yolu Android'de kapalı (çift bildirim yok).
- ✅ **Yerel TTS**: `tts.js` Android'de `TextToSpeech` eklentisine yönlenir (ses listesi `getSupportedVoices`,
  `voiceURI` → dizin; kuyruk ekleme). Dışa aktarma / yedek: `Filesystem(CACHE)` + `Share`.
  Geri tuşu: geçmiş varsa geri, kökte küçült. SW kaydı, yazdırma düğmesi ve https karışık içerik
  uyarısı Android'de yok. Ayarlar → Android paneli (bildirim/alarm izni, sürüm).
- ✅ Android projesi: izinler (POST_NOTIFICATIONS, FOREGROUND_SERVICE(_MEDIA_PLAYBACK), WAKE_LOCK,
  SCHEDULE/USE_EXACT_ALARM, RECEIVE_BOOT_COMPLETED, VIBRATE), servis + alıcı bildirimi,
  `usesCleartextTraffic` (PC akışı), uyarlanabilir simge + açılış ekranı (markadan üretildi),
  `ic_stat_gateway` durum simgesi, sürüm `package.json`'dan (`0.7.0` → 700), çıktı adı
  `gateway-<sürüm>-release.apk`, imza: depodaki geliştirme anahtarı (`keystore/gateway.p12`) ya da
  `GATEWAY_KEYSTORE_*` gizli değişkenleri.
- ✅ CI `android` işi: Node 20 + Temurin 21 + Android SDK 36 + Gradle önbelleği; `npm ci` → derle →
  `cap sync` → `assembleRelease`; `gateway-android-apk` artefaktı (30 gün); `gateway-v*` etiketi ya da
  "release" girdisiyle GitHub sürümü. Testler: `tools/test-native.mjs` (14 denetim; web no-op'ları,
  sahte köprüyle servis/hatırlatıcı/alarm/paylaşım/TTS, proje dosyaları) `npm test`e eklendi;
  `tools/smoke-native.mjs` (38 denetim, jsdom + sahte `window.Capacitor`: açılışta kanallar, Ayarlar
  Android paneli, yerel TTS sesleri, komut/gerçeklik testi bildirim planları ve pencere değişimi, ön
  planda bildirim → toast, yedek → paylaşım, oturum → ön plan servisi → bildirim düğmesiyle bitiş,
  kökte geri = küçült, dönüşte yeniden planlama) CI duman adımına eklendi. İlk CI derlemesi başarılı
  (APK ≈ 9,4 MB artefakt).
- Sınır: APK yalnızca CI'da derlenir (sandbox'ta JDK/SDK yok); ilk gerçek cihaz denemesi kullanıcıda.
  iOS yok.

## Parça 11 — Sesli rehber kayıtlarının tamamlanması 🖥️
- Arena'da "devam et" turlarıyla (tur başına ≈ 4 + 4 toplu iş) **veya** PC'de yapay zekâ ajanıyla:
  `docs/VOICE-PACK-HANDOFF.md`. Şu an tr 112/532, en 109/531.
