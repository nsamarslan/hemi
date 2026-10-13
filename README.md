# Üçüncü Göz Egzersizleri

*Awakening the Third Eye* (Samuel Sagan) kitabının 2. bölümündeki (“Gırtlağın Gizemleri”) egzersizler için telefonda çalışan, sesli rehberli bir uygulama.

Uygulamayı açıp egzersizi seçiyorsun. Uygulama talimatları Türkçe olarak sesli okuyor, arka planda süreyi tutuyor, aşamalar arasında çan çalıyor ve uygulama sırasında kitaptaki ipuçlarını aralıklarla hatırlatıyor.

## Egzersizler

| Egzersiz | Kitap | Akış |
|---|---|---|
| **Gırtlak Sürtünmesi** | §2.1 | Hazırlık (duruş, çene, ağız) → zamanlı sürtünme + hatırlatmalar → kapanış |
| **Arı Vızıltısı** | §2.4 | Hazırlık (dik sırt, gözler kapalı) → vızıltı → sessizlik ve titreşimi hissetme → kapanış |
| **Ağız Kapalı / Açık** | §2.1 | Gırtlak sürtünmesi, ağız kapalı ve hafif açık konumlar arasında dönüşümlü turlar |

Süreler her egzersizin ekranından ayarlanır ve hatırlanır.

## Özellikler

- Türkçe sesli rehber (telefonun kendi metin okuma sesiyle, internet gerektirmez)
- Aşama geçişlerinde çan sesi, “son bir dakika” uyarısı
- Ayarlanabilir hatırlatma sıklığı, konuşma hızı ve çan seviyesi
- Duraklat / devam et, seansı bitir
- Seans boyunca ekran kapanmaz
- Günlük seans sayısı ve süresi
- Ana ekrana eklenebilir, çevrimdışı çalışır (PWA)

## Telefonda kullanma

Uygulama tek bir `index.html` dosyasından oluşur; herhangi bir statik barındırmada çalışır. En kolayı GitHub Pages:

1. GitHub’da depo → **Settings → Pages** → *Branch* olarak bu dalı ve `/ (root)` klasörünü seç.
2. Verilen adresi telefonda aç.
3. **iPhone (Safari):** Paylaş → *Ana Ekrana Ekle*. **Android (Chrome):** ⋮ menü → *Ana ekrana ekle / Uygulamayı yükle*.

Türkçe ses duyulmuyorsa telefonun metin okuma ayarlarından Türkçe ses paketini indir (Android: *Ayarlar → Erişilebilirlik → Metin okuma çıktısı*; iPhone: *Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → Türkçe*).

## Yeni egzersiz eklemek

Egzersizler `index.html` içindeki `EXERCISES` dizisinde tanımlı. Her egzersiz `guide` (sırayla okunan cümleler) ve `timed` (süreli, hatırlatmalı) aşamalardan oluşur; kitabın diğer bölümlerindeki egzersizler aynı yapıyla eklenebilir.

## gateway/ — Gateway (Binaural Keşif) uygulaması

Bu deponun `gateway/` dizininde, Monroe Enstitüsü'nün yolculuk serilerinden esinlenen ayrı ve
bağımsız bir uygulama bulunur: 7 seri, 17 dalga, 145 oturum (Waves of Change I–VIII, özgün 1984
serbest akış serisi, Human Plus fonksiyon egzersizleri, Journeys Out of the Body, Gateway Voyage
açık oturumları, Hemi-Sync albüm serileri, tamamlayıcı pratikler), 21 teknik, iki dilli (Türkçe/
İngilizce) aranabilir konu rehberi (tıklanabilir çapraz göndermelerle), uygulamada oturumu olmayan
175 Hemi-Sync başlığını (tüm Metamusic hattı, iyileşme ve uyku dizileri) listeleyen referans kataloğu, seçilebilir animasyonlu görsel paketler, özgün iki dilli sesli rehberlik (doğal nöral sesle
kaydedilmiş klip paketleri + eksik satırlar için telefon TTS'i) ve tarayıcıda sentezlenen binaural yatak (Hemi-Sync benzeri). Ayarlar'dan ses kaynağı olarak evdeki PC'nizdeki orijinal Hemi-Sync
FLAC kayıtlarını yerel ağdan akıtabilirsiniz (`gateway/tools/pc-server.py`). Tarayıcı/PWA olarak
çalışır; Android için GitHub Actions'ta derlenen APK (Capacitor: arka plan oturum servisi, gerçek
uyandırma alarmı, uygulama kapalıyken bildirimler, yerel TTS) da vardır. Ayrıntılar için
`gateway/README.md`
ve derinlemesine analiz için `gateway/ANALYSIS.md`. Kendi deposuna taşımak için:
`git subtree split -P gateway -b gateway-ayri` (veya dizini kopyalayıp yeni bir depoya
`git init` ile başlatmak).
