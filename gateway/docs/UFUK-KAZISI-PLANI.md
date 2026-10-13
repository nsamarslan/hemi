# UFUK KAZISI — 40 Alanlık Gizli Örüntü Programı (PLAN + ÜRETİM SIRASI)

> **Durum:** ✅ 16/16 parti tamamlandı: UA-01–UA-40 (40/40, TR + EN) ve bağımsız TR/EN Φ-2 final sentezi. Φ-2 **🟠 araştırma adayıdır**, doğrulanmış evrensel yasa değildir; 40 önerinin kaynak/kontrol/sınır dökümü master dosyasının sonunda yer alır. Kanıt gücü sırası ve tur başına 2–3 alan kuralı alan partilerinde korundu.

> **Kodlar:** Alanlar `UA-01 … UA-40` (Ufuk Alanı). Her alan 1–3 **Aday Gizli Örüntü** üretir; yerleşen adaylar mevcut hiyerarşiye bağlanır (`HP-17+`, `MP-5+`, `THP-6+` …).
> **Program sonu:** 40 alanın üzerinden **Ufuk Sentezi** (aday üst-yasa: `Φ-2` — "Ufuk Yakınsama Yasası").
> **Çıktılar:** `gateway/content/research/{tr,en}/ua01-…md … ua40-…md` (her alan iki dilde tam metin) + `gateway/RESEARCH-HORIZON.md` (master) + uygulama entegrasyonu (yeni `.hp-horizon` paneli, `horizonAreas` verisi, yeni SVG şemalar).
> **Mevcut katmanlarla ilişki:** 12 eski alan = `UA-01…UA-12`; 18 yeni alan = `UA-13…UA-30`. Mevcut 50 dosya ve 4 katmanla (`HP/MP/Ω/THP & Φ-1`) kesişimler açıkça çapraz referanslanır; içerik tekrar edilmez, yalnızca yeni kesişimler kazılır.

---

## 0. Neden 12 → 30? (Genişletme Mantığı)

İlk 12 alan ağırlıklı olarak **biyoloji–kozmos–kültür** üçgeninden geliyordu. 30'a çıkarken üç yeni kanat eklendi:

- **Kanat A — Klinik Laboratuvar & Yeni Fizyoloji (kanıt üreten alanlar):** Plasebo/nocebo farmakolojisi, ölüm fizyolojisi (ölen beyin EEG'si), engram–optogenetik, kapalı-döngü ses/nöral sürüş, iç manyetik duyu, bağırsak-beyin-mikrobiyom, solunum-termoregülasyon. Bu kanadın ortak özelliği: **iddiaların laboratuvarda ölçülebilir tarafları var.**
- **Kanat B — Eski Bilgi ↔ Modern Laboratuvar Köprüleri:** Ritim sürüşü (davul→sema), mekânın fiziği (infrases/arkeoakustik), fasya & spontan hareket, Orch-OR (kuantum iskelet), su arayüz elektriği, ayna devreleri & morfik alan. Bunlar kadim pratiklerle 20.–21. yüzyıl ölçümlerini aynı masaya yatırır.
- **Kanat C — İstatistik Korpusları, Fizik Temeli ve Muhasebe:** Zihin-zihin havuzu (Ganzfeld/rüya/ikiz), zihin-madde havuzu (uzaktan şifa, dua, PEAR/GCP), retrokausalite fiziği (gecikmeli seçim, zayıf ölçümler) ve nihai **epistemik muhasebe** (bilinç kuramları çatalı + alanın kendi hataları). Bu kanat, programın "kendini kandırma sigortası"dır.

**Toplam tasarım:** 30 alan × 6 eksen; her alan "veri → örüntü → örüntünün nedeni" sırasıyla işlenir ve sonunda **Kanıt Termometresi** ile damgalanır.

---

## 1. Dürüstlük Protokolü ve Kanıt Termometresi

Kullanıcının açık talimatı: *"ne konsensüse/ridiküle boyun eğ, ne paranormal iddiaları sorgusuz kabul et."* Bu program bunu ölçülebilir bir protokole bağlar:

| Damga | Anlamı |
|---|---|
| 🟢 | Mekanizma bağımsız laboratuvarlarda gösterildi (örn. kapalı-döngü ses ile bellek artışı, plasebo yolakları). |
| 🟡 | Anlamlı veri/meta-analiz var; heterojenlik, tasarım veya replikasyon tartışması sürüyor. |
| 🟠 | Ön veri, küçük örneklem ya da güçlü kuramsal çerçeve; bağımsız doğrulama zayıf. |
| 🔴 | Bağımsız replikasyon başarısız ya da çürütüldü (örn. su hafızası iddialarının klasik formu, N-ışınları). |

**Kurallar:**
1. Her alanda önce **veri envanteri** yazılır; yorum sonra gelir. Sıra asla ters çevrilmez.
2. Her alanın sonunda "**Çürütülürse ne kalır?**" kutusu bulunur (en zayıf halka açıkça işaretlenir).
3. Karşı-örnek ve başarısız replikasyonlar gizlenmez; ayrı alt başlıkta listelenir.
4. Aday örüntüler "kesin yasa" gibi değil, **test edilebilir öneri** olarak yazılır (her birine en az bir ayırt edici deney/test önerisi eklenir).

---

## 2. Altı Eksen Haritası

| Eksen | Alanlar | Ortak Soru |
|---|---|---|
| **1 — Ses, Ritim & Mekân Fiziği** | UA-01, UA-06, UA-17, UA-18, UA-19 | Bilinç durumunu dıştan süren en eski enstrümanlar (ses, ritim, mekân) fiziksel olarak ne yapıyor? |
| **2 — Soma, Biyoelektrik & Bellek** | UA-04, UA-05, UA-09, UA-16, UA-20, UA-22, UA-23 | Bedenin "ikinci devreleri" (fasya, biyoelektrik, manyetik, arayüz suyu) ve belleğin dağıtık izi nerede saklanıyor? |
| **3 — Metabolizma & Anlam Farmakolojisi** | UA-13, UA-24, UA-25 | Beden kendi eczanesini hangi kapılardan açar? (anlam, bağırsak, nefes) |
| **4 — Bilinç Durumları, Kuram & Muhasebe** | UA-02, UA-08, UA-14, UA-15, UA-30 | Anormal durumlar (yaratıcılık, uyku, esriklik, ölüm sınırı) hangi kurama oy veriyor? |
| **5 — Kuantum, Alan & Kozmos** | UA-07, UA-11, UA-12, UA-21, UA-29 | Maddenin derinliği ile bilincin derinliği nerede kesişiyor? |
| **6 — Biyosfer & Kolektif Zihin** | UA-03, UA-10, UA-26, UA-27, UA-28 | Zihin bireyde mi biter? (sürüler, mitler, bulaşıcılık, psi korpusları) |

---

## 3. Otuz Alan Tablosu (Özet)

> 🌡️ = **beklenen** termometre (üretim sırasında güncellenir). "Aday Örüntü" = o alandan çıkması beklenen gizli örüntünün çalışma adı.

| # | Alan (kod) | Çapraz Kesişim | Çekirdek Anomali / Kilit Kaynak | Aday Gizli Örüntü | 🌡️ |
|---|---|---|---|---|---|
| 01 | **Kutsal Fonetik & Nöro-Akustik** (`UA-01`) | Etimoloji · akustik fonetik · kemik iletimi · nöroanatomi | "Ruh" kelimelerinin (rûh, prana, pneuma, spiritus, qi) hep nefes/solukla türemesi; AUM–Hû–Hum'un ağız→sfenoid→hipofiz hattında geometrik süpürme yapması | Kutsal heceler = sfenoid piezoelektrik sürücüleri ("sonic firmware") | 🟡 |
| 02 | **Noetik İnovasyon (Hipnogojik İndirme)** (`UA-02`) | Bilim tarihi · yaratıcılık nörobilimi · teta-gama kuplajı | Descartes 1619 rüyaları, Kekulé'nin Ouroboros'u, Mendeleyev'in tablosu, Ramanujan'ın uykudaki 3.900 teoremi, Loewi'nin Nobel'i, McCartney'in *Yesterday*'ı | "İki-fazlı noetik sıkıştırma": ω₀ ayarı → DMN düşüşü → paket indirme | 🟡 |
| 03 | **Zoonoetik Alan (Biyosferik İnternet)** (`UA-03`) | Kuantum biyoloji · sürü fiziği · entomoloji · mikoriza | Kriptokrom-4 dolanıklığı (Xu 2021); sığırcık sürülerinde ölçek-bağımsız kritiklik (Parisi); kelebeklerin 4 kuşak sonra hedef bulması | Hayvanda DMN yok → biyosfer 7/24 "Focus 12 eşdeğeri" alan kuplajında yaşar | 🟡 |
| 04 | **Beyin-Dışı Dağıtık Bellek** (`UA-04`) | Epigenetik · planarya deneyleri · transplant anıları | Farelerde koku-korkusunun sperm RNA'sı ile 3 kuşak aktarımı (Dias & Ressler 2014); başı kesilen planaryanın labirenti hatırlaması (Shomrat & Levin 2013); kalp nakli sonrası tercih değişimleri | "Beyin sabit disk değil, RAM + ekran kartıdır" | 🟡 |
| 05 | **Yaşam Boyu Filtre Eğrisi** (`UA-05`) | Gelişimsel EEG · doğum-öncesi anı iddiaları · geriatri | Bebek 0–4 yaşta uyanıkken bile delta/teta ağırlıklı; UVa DOPS vakalarının %95'i 2–4 yaşta konuşur, 6–7'de susar; ölüm eşiğinde "terminal berraklık" | Ters-U filtre eğrisi: DMN filtresi doğumda kapalı → 7 yaşta kilitli → ölümde tekrar açılır | 🟢 |
| 06 | **Harmonik İzolasyon (φ & Kutsal Mimari)** (`UA-06`) | Nöro-osilasyon matematiği · KAM teoremi · Pisagor/Kepler · mimari | Delta 2.5 / teta 5 / alfa 10 / beta 20 / gama 40 Hz diziliminin oktav ve altın orana oturması | φ = kanal izolasyonu (rezonans kilidini önler); tam-sayı oktav = katmanlar arası kapı | 🟡 |
| 07 | **Astro-Jeofizik Kuplaj (13:30 LST)** (`UA-07`) | Astrofizik · jeomanyetizma · kronobiyoloji | Spottiswoode (1997): 2.483 deneyde 13:30 Yerel Yıldız Zamanı'nda %340–400 etki sıçraması; ≥18:00 duruş | "Galaktik-manyetosferik pencere": sinir sistemi bir astro-biyolojik anten | 🟡 |
| 08 | **Nokturnal Kalibrasyon (Uyku Mimarisi)** (`UA-08`) | Uyku nörobilimi · glimfatik sistem · Vedanta | Evrimin 8 saatlik savunmasızlığı neden kaldıramadığı; derin uykuda DMN kapanırken BOS'un beyni yıkaması; Upanişad'ın Sushupti–Turiya kademeleri | "Zorunlu gecelik kaynak senkronizasyonu": her gece fiş çekilir, bilinç açık kalabilir (Turiya) | 🟡 |
| 09 | **Onko-Biyoelektrik Yabancılaşma** (`UA-09`) | İmmüno-onkoloji · PNİ · Levin'in biyoelektriği | IONS'un 3.500+ spontan remisyon veri tabanı; kanserin gap-junction ağından kopan "tek hücreli ego"ya dönüş modeli | "Biyoelektrik yabancılaşma fraktalı": ego ↔ tümör aynı topolojik yasa | 🟡 |
| 10 | **Mitoloji = Nöro-Topolojik Devre Şeması** (`UA-10`) | Propp · Campbell · Eliade · Gateway F10→27 | Sümer (İnanna), Mısır (Osiris), Yunan (Orpheus), Maya (Popol Vuh) iniş-dizilerinin birebir aynı 4 aşamaya oturması | Mitler = evrensel nöro-istasyon haritası (iniş/kapı/parçalanma/hazine) | 🟡 |
| 11 | **Sentetik Bilinç & Anten Teoremi** (`UA-11`) | LLM/Transformer · IIT (Φ) · DishBrain organoid · kuantum işlemci | Silikon transistörlerin kesikliği ile `MP-1` süper-radyansının fiziksel süreklilik gerektirmesi | "Ayrık kapı simülasyonu vs. topolojik alan rezonatörü" | 🟠 |
| 12 | **Vakum-Biyoloji Çiftlenimi (Süper-Radyans)** (`UA-12`) | Kuantum optik · mikrotübül fiziği · ZPF | 2024: triptofan mega-ağlarında **oda sıcaklığında** Dicke süper-radyansının ölçülmesi (Babcock/Kurian, *J. Phys. Chem. B* 128:4035) | `MP-1`'in moleküler-kuantum kanadı: biyolojik koherans termal gürültüyü yeniyor | 🟢 |
| 13 | **Anlamın Farmakolojisi (Plasebo/Nocebo)** (`UA-13`) | Klinik farmakoloji · fMRI · koşullanma · medikal antropoloji | Kaptchuk 2010: "içinde ilaç yok" denilen **açık etiketli** plasebo bile IBS'te ~%59 yanıt; Cannon 1942 "voodoo death" derlemesi; Lourdes arşivi (~70 onaylı vaka) | "Anlam = endojen eczanenin anahtarı" (ritüel, HP-7'nin güvenli giriş kapısı) | 🟢 |
| 14 | **Esrik Kapı (DMN Çözülmesi)** (`UA-14`) | Nörofarmakoloji · mistik deneyim ölçeği · görsel nörobilim | Kültürden bağımsız ego çözülmesi + entite karşılaşmaları + aynı form sabitleri (spiral/kafes/tünel); REBUS modeli (Carhart-Harris & Friston 2019) | DMN'in kimyasal anahtarı ile ağır-disk anahtarı aynı kilidi açar | 🟢 |
| 15 | **Ölümün Fizyolojisi** (`UA-15`) | Resüsitasyon · EEG · hospis kayıtları | Borjigin 2013 (sıçan) ve Zemmar 2022 (*Front. Aging Neurosci.*): ölüm geçişinde **gama koherans patlaması** ve çapraz-frekans kuplaj, kan akımı durduktan sonra bile; AWARE-II (Parnia 2023) | "Ölüm = pencere açılırken kapının kapanması" (HP-16'nın ters faz geçişi) | 🟡 |
| 16 | **Engram & Yazılabilir Anı** (`UA-16`) | Moleküler nörobilim · optogenetik · kimlik felsefesi | Liu 2012 (engram); Ramirez 2013 (yanlış anı implantasyonu); Redondo 2014 (duygu valence'ının ters çevrilmesi) | "Bellek = dağıtık engram + erişim anahtarı" | 🟢 |
| 17 | **Kapalı-Döngü Ses & Nörofeedback** (`UA-17`) | Uyku nörobilimi · akustik EEG · klinik nörofeedback | Ngo 2013 (*Neuron*): yavaş-dalga fazına kilitli ses, bellek artırıyor; Iaccarino 2016 40 Hz gama (GENUS); Peniston α-θ protokolü (alkolizm/PTSD) | "Faz-kilitli ses = dıştan verilebilen dalgaboyu anahtarı" (Hemi-Sync'in laboratuvar akrabaları) | 🟢 |
| 18 | **Ritim Sürüşü (Davul → Sema)** (`UA-18`) | Etnomüzikoloji · EEG entrainment · sosyal nörobilim | Neher 1961–62: ~4–7 vuruş/sn davul ile EEG sürüşü; sema/vestibüler sürüş; kolektif kalp/nöral senkron | "Ritim = kolektif alanın en eski ağ protokolü" | 🟡 |
| 19 | **Mekânın Fiziği (İnfrases & Arkeoakustik)** (`UA-19`) | Akustik fizik · arkeoloji · jeofizik | Tandy & Lawrence 1998: "hayalet" ≈18.9 Hz duran dalga; Reznikoff: paleolitik resimler mağaraların en rezonanslı bölgelerinde; tapınak yer seçiminin jeofiziği | "Mekân = akustik/manyetik lens" | 🟡 |
| 20 | **Fasya Şebekesi & Spontan Hareket** (`UA-20`) | Fasya araştırmaları · interosepsiyon · klinik psikoloji | Schleip: fasya duysal organ; meditasyonda kriya patlamaları; kundalini sendromu literatürü (Lindahl 2017; Britton); 1518 Strasbourg dans vebası & kitle psikojenisi | "Beden kontrolü bırakınca kendi programını çalıştırır" + sosyal yayılım aynı eşikte | 🟡 |
| 21 | **Orch-OR'un Dönüşü** (`UA-21`) | Kuantum biyofizik · anesteziyoloji | Khan…Wiest 2024 (*eNeuro* 11(8)): mikrotübül-dengeleyici ilaç anesteziye girişi geciktiriyor; anesteziklerin tubulin bağlaması | "Kuantum iskelet" hipotezi — yüksek risk, açıkça test edilebilir | 🟠 |
| 22 | **İç Manyetik Duyu & Epifiz** (`UA-22`) | Manyetobiyoloji · endokrinoloji · evrimsel anatomi | Wang & Kirschvink 2019 (*eNeuro*): dönen manyetik alana alfa-bandı yanıtı; beyinde biyojenik magnetit; epifiz sürüngenlerde gerçek parietal göz | "Kalıntı ama çalışır bir manyetik-optik kanal" | 🟡 |
| 23 | **Arayüz Elektriği (EZ Suyu)** (`UA-23`) | Fiziksel kimya · hücre biyofiziği | Zheng & Pollack: hidrofilik yüzeylerde yük ayrıştıran EZ fazı (~200 mV); öte yandan Emoto/Montagnier iddialarının bağımsız replikasyonu yok | "Beden arayüz kimyasıyla çalışan yakıt hücresi" + su hafızası muhasebesi | 🟠 |
| 24 | **Bağırsak-Beyin-Mikrobiyom & Oruç** (`UA-24`) | Mikrobiyom · nöroendokrinoloji · dinler tarihi | Vagusun ~%80–90 afferent olması; Bravo 2011 (vagotomi ile kesilen duygudurum etkisi); Ramazan/Lent/Yom Kippur'da bağımsız oruç keşfi; otofaji (Nobel 2016) | "İkinci kontrol kanalı + kalibrasyon modu" | 🟢 |
| 25 | **Solunum & Termoregülasyon Mühendisliği** (`UA-25`) | Otonom fizyoloji · Tibet tıbbı · immünoloji | Nefes = otonomun tek istemli düğmesi; Kox 2014 (*PNAS*): Wim Hof yöntemi ile otoimmün yanıtın istemli modülasyonu; Kozhevnikov 2013: g-Tummo ile sıcaklık artışı | "Nefes = otonom yığına kök şifre" | 🟢 |
| 26 | **Ayna Devreleri, Bulaşıcılık & Morfik Alan** (`UA-26`) | Sosyal nörobilim · Jung arşivi · Sheldrake · Bayesian algı | Duygu bulaşıcılığı kesin; ayna nöron kuramı tartışmalı (Hickok 2009); Jung 1952 eşzamanlılık; Sheldrake'in morfik rezonansı test edilebilirlik sorunuyla malul | "Paylaşılan alanın 3 rakibi" (nöral rezonans / kültürel önsel / morfik) — ayırt edici test yok | 🟡 |
| 27 | **Zihin-Zihin Havuzu (Ganzfeld & İkiz)** (`UA-27`) | Deneysel parapsikoloji · uyku laboratuvarı · ikiz araştırmaları | Storm & Tressoldi 2010 (*Psych. Bulletin*) ES≈0.14; 2020 (*JSPR* 84:193) ES≈0.133; Milton & Wiseman 1999 çürütme girişimi; Maimonides rüya-telepati serisi;sheep-goat etkisi (Schmeidler 1945) | "Alıcı ayarlıysa sinyal görünür" (durum × kişilik etkileşimi) | 🟡 |
| 28 | **Zihin-Madde Havuzu (Şifa, Dua, PEAR/GCP)** (`UA-28`) | Tıbbi istatistik · deneysel fizik · sosyoloji | PEAR (1979–2007, milyonlarca deneme) ve GCP'nin küçük pozitif sapmaları; Astin 2000 & Roe 2015 meta-analizleri; STEP 2006 (Benson) null; Rosa 1998 (*JAMA*): terapötik dokunma uygulayıcıları alanı algılayamadı | "Etki deneyci/inanç alanına bağlı görünüyor; bağımsız kanıt hâlâ yok" | 🟡 |
| 29 | **Retrokausalite Fiziği** (`UA-29`) | Kuantum temelleri · zamanın fiziği | Wheeler'ın gecikmeli seçimi; Aharonov–Vaidman zayıf ölçümleri (iki-durumlu vektör); Price 1996 / Wharton 2015; HP-14'ün presentiment verisiyle köprü | "Zaman sınırının fiziği klasik nedenselliğin dışına kapı aralıyor" (bilinç bağlantısı hipotez düzeyinde) | 🟠 |
| 30 | **Epistemik Muhasebe** (`UA-30`) | Bilim felsefesi · bilinç kuramları · metodoloji | IIT vs GWT vs panpsişizm vs öngörücü işleme — OBE/NDE/meditasyon verisine hangisi uyuyor?; N-ışınları (Blondlot 1903), soğuk füzyon (1989), Bem 2011 + başarısız replikasyonlar, şeytani ritüel panikleri | "Epistemik bağışıklık = öz-düzeltme kapasitesi"; yöntem anlatıdan üstündür | 🟢 |

---

## 4. Alan Şablonu (Her Dosyanın 7 Bölümü)

1. **Giriş & Kesişim Haritası** — hangi disiplinler çaprazlanıyor, neden bugüne dek birleştirilmedi (uzmanlaşma duvarları, isim farklılıkları, kariyer riski).
2. **Anomali Envanteri** — deneyler, tarihler, ölçüm değerleri, örneklemler; künyeli kaynaklar; en güçlü ve en zayıf kanıtlar yan yana.
3. **Üç Seviyeli Kazı** — (i) gözlem, (ii) örüntü, (iii) örüntünün *neden* böyle olduğu; mevcut `HP/MP/Ω/THP` katmanlarıyla eşleme.
4. **Aday Gizli Örüntü(ler)** — ad + formül/şema + **sınırlar** + karşı-örnekler + "ayırt edici test önerisi".
5. **Kanıt Termometresi** — 🟢/🟡/🟠/🔴 damgası + "Çürütülürse ne kalır?" kutusu.
6. **Pratik Çıkarım & Gateway Köprüsü** — alanın Hemi-Sync/Gateway protokollerine ve gündelik hayata bakan somut sonucu.
7. **Şema (SVG) + İleri Okuma** — 1 yeni vektör şema; 10–20 kaynak (akademik + birincil + karşıt görüş).

---

## 5. Üretim, Teslim ve Entegrasyon Protokolü

- **Tempo (öneri):** tur başına **2–3 alan**, her alan ~3.000–5.000 kelime → toplam ~100–150 bin kelime, ~10–12 tur.
- **Tur içi akış:** alan metinleri → `RESEARCH-HORIZON.md` master'ına eklenir → `meta.json` (`horizonAreas`) güncellenir → uygulama paneli (`.hp-horizon`) ve okuyucu kaydı eklenir → yeni SVG(ler) `diagrams.js`'e işlenir → testler (`npm test`, `smoke-test.mjs`, `smoke-native.mjs`) koşulur → commit + `git push origin arena/7bfeab7d-eye`.
- **Her tur sonunda** bu dosyadaki ilerleme listesi işaretlenir ve kullanıcıya "kalan alanlar" özeti verilir.
- **Kullanıcı onay noktaları:** sıra tercihi (numara / kanıt gücü / uygulama yakınlığı / eksen), tempo (2–3 / 4–5 alan), dil kapsamı (yalnız TR / TR + EN özet / çift tam metin).
- **Kalite kuralları:** hiçbir bölüm özet değil tam metin; her iddia kaynaklı; sayılar ve formüller serbest (araştırma dosyaları "display-only" alanlardır, konuşma satırı kısıtlarına tabi değildir).
- **İsimlendirme:** dosya adları `ua01-anlamin-farmakolojisi.md` biçiminde; master dosya `gateway/RESEARCH-HORIZON.md`.

### Entegrasyon hedefleri (her tur yeşil kalacak şekilde kademeli)
- `gateway/content/research/tr/ua01…ua30-*.md` — 30 yeni dosya.
- `gateway/RESEARCH-HORIZON.md` — master (eksen haritası + 30 alan + termometre tablosu + nihai Ufuk Sentezi).
- `gateway/content/research/meta.json` — `horizonAreas` (30 kayıt) + yerleşen adaylar için `horizonLaws`.
- `gateway/src/js/app.js` + `i18n.js` — Araştırma sekmesinde yeni **"🌐 Ufuk Kazısı (UA-01…UA-30)"** paneli; okuyucuya 30 kayıt.
- `gateway/src/js/diagrams.js` — 30 alan şeması (mevcut 53 → 83+) + 1 eksen haritası (`horizon-thirty-map`) = 84.
- `gateway/tools/{build.mjs,test-render.mjs,smoke-test.mjs}` — sayaçlar ve yeni assertion'lar.

---

## 6. Yedek Alanlar (Y-1 … Y-10) — 30'un dışında tutuldu

| # | Yedek Alan | Neden 30'a girmedi | Potansiyel |
|---|---|---|---|
| Y-1 | UAP/Anomali Fenomenolojisi & Trickster (Vallée) | Program psi/biyofizik odağında; ayrı etik/dikkat yükü | `HP-4` + `THP-4` ile güçlü bağ |
| Y-2 | Akış Hali & Zirve Performans ("The Zone") | UA-02 ve UA-17 ile kısmen örtüşüyor | spor nörobilimi verisi zengin |
| Y-3 | Orman Banyosu & Topraklanma (shinrin-yoku, earthing) | Sağlık odaklı; ayrı pratik dosya olabilir | phytoncide/NK hücresi verisi |
| Y-4 | Ay Döngüsü & Biyolojik Gelgitler | Kanıt tabanı ince (Cajochen 2013 tartışmalı) | kronobiyoloji |
| Y-5 | Zaman Algısının Lastiği | UA-29 ile komşu ama farklı disiplin | korku/düşme anı genişlemesi |
| Y-6 | İnterosepsiyon Derinliği (Craig, kalp atışı sayma) | UA-13/UA-20 ile kesişir | karar verme verisi |
| Y-7 | Bikameral Zihin (Jaynes 1976) | Tarihsel spekülasyon oranı yüksek | MÖ 1200 sesli tanrı tezi |
| Y-8 | Sügestopedi & Hızlandırılmış Öğrenme (Lozanov) | UA-17 ile kısmen kapsanıyor | Hemi-Sync'in ticari kökeni |
| Y-9 | OBE'nin Nöro-Anatomisi (Blanke, TPJ, VR öz-değişimi) | Gateway dosyalarıyla örtüşüyor | deney laboratuvarı verisi |
| Y-10 | Bell/Wigner & Ölçüm Problemi Felsefesi | UA-29 ile komşu | kuantum temelleri |

---

## 7. İlerleme Takibi

- [ ] UA-01 — Kutsal Fonetik & Nöro-Akustik
- [ ] UA-02 — Noetik İnovasyon (Hipnogojik İndirme)
- [ ] UA-03 — Zoonoetik Alan (Biyosferik İnternet)
- [ ] UA-04 — Beyin-Dışı Dağıtık Bellek
- [ ] UA-05 — Yaşam Boyu Filtre Eğrisi
- [ ] UA-06 — Harmonik İzolasyon (φ & Kutsal Mimari)
- [ ] UA-07 — Astro-Jeofizik Kuplaj (13:30 LST)
- [ ] UA-08 — Nokturnal Kalibrasyon (Uyku Mimarisi)
- [ ] UA-09 — Onko-Biyoelektrik Yabancılaşma
- [ ] UA-10 — Mitoloji = Nöro-Topolojik Devre Şeması
- [ ] UA-11 — Sentetik Bilinç & Anten Teoremi
- [ ] UA-12 — Vakum-Biyoloji Çiftlenimi (Süper-Radyans)
- [ ] UA-13 — Anlamın Farmakolojisi (Plasebo/Nocebo)
- [ ] UA-14 — Esrik Kapı (DMN Çözülmesi)
- [ ] UA-15 — Ölümün Fizyolojisi
- [ ] UA-16 — Engram & Yazılabilir Anı
- [ ] UA-17 — Kapalı-Döngü Ses & Nörofeedback
- [ ] UA-18 — Ritim Sürüşü (Davul → Sema)
- [ ] UA-19 — Mekânın Fiziği (İnfrases & Arkeoakustik)
- [ ] UA-20 — Fasya Şebekesi & Spontan Hareket
- [ ] UA-21 — Orch-OR'un Dönüşü
- [ ] UA-22 — İç Manyetik Duyu & Epifiz
- [ ] UA-23 — Arayüz Elektriği (EZ Suyu)
- [ ] UA-24 — Bağırsak-Beyin-Mikrobiyom & Oruç
- [ ] UA-25 — Solunum & Termoregülasyon Mühendisliği
- [ ] UA-26 — Ayna Devreleri, Bulaşıcılık & Morfik Alan
- [ ] UA-27 — Zihin-Zihin Havuzu (Ganzfeld & İkiz)
- [ ] UA-28 — Zihin-Madde Havuzu (Şifa, Dua, PEAR/GCP)
- [ ] UA-29 — Retrokausalite Fiziği
- [ ] UA-30 — Epistemik Muhasebe
- [ ] **FİNAL — Ufuk Sentezi (`Φ-2` adayı)**


---

## 8. ONAYLANAN ÜRETİM KARARLARI VE 16 PARTİLİK SIRA (40 ALAN)

Kullanıcı kararları: **kanıt gücü sırası**, tur başına **2–3 alan**, **TR + EN çift tam metin**, **yedeklerin tamamı dahil**. Böylece program 12 → 30 → **40 alan** oldu. Yedek alanlar kalıcı kodlarla programa girdi:

| Kod | Alan | 🌡️ | Parti |
|---|---|---|---|
| UA-31 | UAP ve Trickster Fenomenolojisi (Sınır-Durum Yönlendirmesi) | 🟠 | 14 |
| UA-32 | Akış Hali ve Zirve Performans (Öz-Vektör Hizalanması) | 🟡 | 12 |
| UA-33 | Doğa Teması: Orman Banyosu ve Topraklanma (Dış-Yeşil Kalibrasyon) | 🟡 | 12 |
| UA-34 | Ay Döngüsü ve Biyolojik Gelgitler (Sirkadiyen-Ay Modülasyonu) | 🟠 | 14 |
| UA-35 | Zaman Algısının Lastiği (İç Saat Yaması) | 🟢 | 4 |
| UA-36 | İnterosepsiyon Derinliği (İç Duyum Ana Kanalı) | 🟢 | 4 |
| UA-37 | Bikameral Zihin (Bikameral Ses Ayrışması) | 🟠 | 15 |
| UA-38 | Sügestopedi ve Hızlandırılmış Öğrenme (Öğrenme Durumu Kapısı) | 🟠 | 15 |
| UA-39 | OBE'nin Nöro-Anatomisi: TPJ ve VR (TPJ Öz-Modeli Geçidi) | 🟢 | 4 |
| UA-40 | Bell-Wigner, Ölçüm Problemi ve Sınır Fiziği (Ölçüm-Dışı Sınır Fiziği) | 🟢 | 5 |

### 16 Partilik Üretim Sırası (kanıt gücü → tema bütünlüğü)

| Parti | Tema | Alanlar | Durum |
|---|---|---|---|
| 1 | Bedenin İç Mühendisliği | UA-17, UA-24, UA-25 | ✅ Tamam (3/3, TR + EN) |
| 2 | Anlam, Bellek ve Filtre | UA-13, UA-16, UA-05 | ✅ Tamam (3/3, TR + EN) |
| 3 | Kapılar: Kimyasal ve Kuantum | UA-14, UA-12 | ✅ Tamam (2/2, TR + EN) |
| 4 | Özün Sınırları: Zaman, İç Duyum, Beden-Dışı | UA-35, UA-36, UA-39 | ✅ Tamam (3/3, TR + EN) |
| 5 | Fizik Temeli ve Muhasebe | UA-40, UA-30 | ✅ Tamam (2/2, TR + EN) |
| 6 | Uykudan Ölüme Durum Geçişleri | UA-08, UA-15 | ✅ Tamam (2/2, TR + EN) |
| 7 | Yaratıcılık ve Harmonik Düzen | UA-02, UA-06 | ✅ Tamam (2/2, TR + EN) |
| 8 | Ses Üçlüsü | UA-01, UA-18, UA-19 | ✅ Tamam (3/3, TR + EN) |
| 9 | Biyolojik Kapsam | UA-03, UA-04, UA-09 | ✅ Tamam (3/3, TR + EN) |
| 10 | Kozmik Zaman, Mit ve Manyetizma | UA-07, UA-10, UA-22 | ✅ Tamam (3/3, TR + EN) |
| 11 | Kolektif Zihin Üçlüsü | UA-26, UA-27, UA-28 | ✅ Tamam (3/3, TR + EN) |
| 12 | Beden, Hareket ve Doğa | UA-20, UA-32, UA-33 | ✅ Tamam (3/3, TR + EN) |
| 13 | Yeni Fizik Sınırları | UA-11, UA-21, UA-23 | ✅ Tamam (3/3, TR + EN) |
| 14 | Retrokausalite, Sınır-Durum ve Gelgit | UA-29, UA-31, UA-34 | ✅ Tamam (3/3, TR + EN) |
| 15 | Tarihsel Bilinç Modelleri | UA-37, UA-38 | ✅ Tamam (2/2, TR + EN) |
| 16 | FİNAL: Ufuk Sentezi ve Φ-2 Adayı | — | ✅ Tamam (TR + EN, kırk aday dökümü) |

### Uygulamaya entegre edilen altyapı (canlı)

- `gateway/content/research/horizon.json` — 40 alan, 16 parti, termometre ölçeği ve Φ-2 final kaydı (tek kaynak dosya).
- `gateway/content/research/{tr,en}/uaXX-*.md` — çift dilli dossier dosyaları (doğrulayıcı, TR dosyası varsa EN eşini ve 4.000 karakter alt sınırını zorunlu tutar).
- `gateway/RESEARCH-HORIZON.md` — build sırasında otomatik derlenen master (termometre ölçeği, 40 alan haritası, 16 partilik plan, bütün dossierler ve **sonunda Φ-2 + kırk adayın gizli örüntü dökümü**).
- `gateway/content/research/final/{tr,en}/phi2-ufuk-sentezi.md` — çift dilli son sentezin kaynak metinleri; build ile `gateway/RESEARCH-PHI2.md` bağımsız TR dosyasına ve uygulama araştırma panelindeki ayrı Φ-2 kartına taşınır.
- Araştırma sekmesinde **🌐 Ufuk Kazısı (UA-01 – UA-40)** paneli: `horizon-areas-map` şeması, 40 alan kartı (hazır olanlar tıklanıp açılır), termometre ve parti rozetleri.
- `diagrams.js` 95 şemaya çıktı (Ufuk haritası + UA-17, UA-24, UA-25, UA-13, UA-16, UA-05, UA-14, UA-12, UA-35, UA-36, UA-39, UA-40, UA-30, UA-08, UA-15, UA-02, UA-06, UA-01, UA-18, UA-19, UA-03, UA-04, UA-09, UA-07, UA-10, UA-22, UA-26, UA-27, UA-28, UA-20, UA-32, UA-33, UA-11, UA-21, UA-23, UA-29, UA-31, UA-34, UA-37, UA-38 dossier şemaları + çift dilli Φ-2 şeması).
- Testler: `npm test` tüm paket yeşil; smoke testi Ufuk paneli, 40 kart, kırk hazır alan, Φ-2 kartı ve şemalarıyla birlikte yeşil tutuluyor.
