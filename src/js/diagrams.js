// Scientific, biophysical, neurological, and philosophical vector diagrams for the Research Dossiers.
// Rendered inside dossier markdown via `[[diagram:<id>]]`. Uses CSS custom properties so diagrams
// adapt automatically to dark and light themes.

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const DIAGRAMS = {
  "master-hidden-patterns": {
    title: {
      tr: "Şekil 0: 50 Dosya Boyunca Keşfedilen 7 Çapraz-Alan Gizli Örüntüsü (İzomorfizm Haritası)",
      en: "Figure 0: The 7 Cross-Domain Hidden Patterns Discovered Across All 50 Dossiers"
    },
    caption: {
      tr: "Yalnızca birbirinden kopuk disiplinler (kardiyoloji, jeofizik, nörogörüntüleme, kuantum bilgi kuramı, Yeni-Platonculuk ve Tasavvuf) aynı anda üst üste çakıştırıldığında beliren 7 matematiksel ve yapısal değişmez.",
      en: "Seven mathematical and structural invariants that emerge only when disconnected disciplines (cardiology, geophysics, neuroimaging, quantum information, Neoplatonism, and Sufism) are superimposed."
    },
    svg: () => `<svg viewBox="0 0 680 320" role="img" aria-label="7 Hidden Patterns">
      <defs>
        <linearGradient id="hpG1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.28"/><stop offset="100%" stop-color="var(--violet)" stop-opacity="0.12"/></linearGradient>
      </defs>
      <rect x="8" y="8" width="664" height="304" rx="14" fill="url(#hpG1)" stroke="var(--line)"/>
      <!-- Central Hub -->
      <circle cx="340" cy="160" r="52" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
      <circle cx="340" cy="160" r="44" fill="none" stroke="var(--violet)" stroke-dasharray="3 3"/>
      <text x="340" y="152" text-anchor="middle" fill="var(--ink)" font-size="11" font-weight="700">GİZLİ ÖRÜNTÜ</text>
      <text x="340" y="167" text-anchor="middle" fill="var(--accent)" font-size="10" font-weight="700">ÇEKİRDEĞİ</text>
      <text x="340" y="181" text-anchor="middle" fill="var(--muted)" font-size="8.5">50 Dosya · 8 Katman</text>
      <!-- Spokes -->
      <g stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.75">
        <line x1="288" y1="145" x2="165" y2="62"/>
        <line x1="288" y1="160" x2="155" y2="160"/>
        <line x1="288" y1="175" x2="165" y2="258"/>
        <line x1="392" y1="140" x2="515" y2="54"/>
        <line x1="392" y1="155" x2="525" y2="126"/>
        <line x1="392" y1="170" x2="525" y2="198"/>
        <line x1="392" y1="184" x2="515" y2="270"/>
      </g>
      <!-- Left nodes -->
      <g>
        <rect x="22" y="28" width="150" height="58" rx="9" fill="var(--surface)" stroke="var(--accent)"/>
        <text x="32" y="46" fill="var(--accent)" font-size="9.5" font-weight="700">HP-1 · Oktav Kilitlenmesi</text>
        <text x="32" y="60" fill="var(--ink)" font-size="8.5">0.1 Hz Kalp/BOS → 7.83 Hz</text>
        <text x="32" y="73" fill="var(--muted)" font-size="8">Aort/Schumann → 40 Hz Gama</text>

        <rect x="22" y="131" width="142" height="58" rx="9" fill="var(--surface)" stroke="var(--accent)"/>
        <text x="32" y="149" fill="var(--accent)" font-size="9.5" font-weight="700">HP-2 · Eksiltmeli Açılma</text>
        <text x="32" y="163" fill="var(--ink)" font-size="8.5">DMN / Sol-Temporal Susar</text>
        <text x="32" y="176" fill="var(--muted)" font-size="8">fMRI ↓ = Öznel Genişleme ↑</text>

        <rect x="22" y="232" width="150" height="58" rx="9" fill="var(--surface)" stroke="var(--accent)"/>
        <text x="32" y="250" fill="var(--accent)" font-size="9.5" font-weight="700">HP-3 · Stokastik Rezonans</text>
        <text x="32" y="264" fill="var(--ink)" font-size="8.5">Duyusal Sıfır + Pembe Gürültü</text>
        <text x="32" y="277" fill="var(--muted)" font-size="8">Eşik-Altı Sinyali Yükseltir</text>
      </g>
      <!-- Right nodes -->
      <g>
        <rect x="498" y="22" width="160" height="54" rx="9" fill="var(--surface)" stroke="var(--violet)"/>
        <text x="508" y="39" fill="var(--violet)" font-size="9.5" font-weight="700">HP-4 · Sınır-Durum &amp; Trickster</text>
        <text x="508" y="52" fill="var(--ink)" font-size="8.5">İletişimsizlik Teoremi =</text>
        <text x="508" y="64" fill="var(--muted)" font-size="8">Zorlanan Kanıtta Dekoherans</text>

        <rect x="506" y="96" width="152" height="54" rx="9" fill="var(--surface)" stroke="var(--violet)"/>
        <text x="516" y="113" fill="var(--violet)" font-size="9.5" font-weight="700">HP-5 · 4 Katmanlı Topoloji</text>
        <text x="516" y="126" fill="var(--ink)" font-size="8.5">Mülk · Berzah · Melekût · Bir</text>
        <text x="516" y="138" fill="var(--muted)" font-size="8">F10 · F12–23 · F15–27 · Boşluk</text>

        <rect x="506" y="170" width="152" height="54" rx="9" fill="var(--surface)" stroke="var(--violet)"/>
        <text x="516" y="187" fill="var(--violet)" font-size="9.5" font-weight="700">HP-6 · Sıvı-Kristal İkinci Ağ</text>
        <text x="516" y="200" fill="var(--ink)" font-size="8.5">EZ Su + Fasya + Efaptik Alan</text>
        <text x="516" y="212" fill="var(--muted)" font-size="8">+ Biyofoton + Manyetit</text>

        <rect x="498" y="244" width="160" height="54" rx="9" fill="var(--surface)" stroke="var(--violet)"/>
        <text x="508" y="261" fill="var(--violet)" font-size="9.5" font-weight="700">HP-7 · İdeo-Plastik Root Yetkisi</text>
        <text x="508" y="274" fill="var(--ink)" font-size="8.5">Derin Teta + İmaj = Otonom</text>
        <text x="508" y="286" fill="var(--muted)" font-size="8">ve Epigenetik Yeniden Yazım</text>
      </g>
    </svg>`
  },

  "epistemic-bayes-filter": {
    title: {
      tr: "Şekil 1.1: Dogmatik Ön-Seçilim (Sagan Tuzağı) vs. Dürüst Bayesçi Güncelleme ve Hans Berger Döngüsü",
      en: "Figure 1.1: Dogmatic Prior Zeroing vs. Honest Bayesian Updating and the Hans Berger Loop"
    },
    caption: {
      tr: "Önsel olasılık P(H)=0 seçildiğinde hiçbir deneysel kanıt E son-olasılığı değiştiremez. Bilim tarihinde anomali gözlemi (Berger 1892 telepati krizi) → yeni cihaz (1924 EEG) → ana akım nörobilim döngüsü.",
      en: "When prior probability P(H)=0 is fixed dogmatically, no experimental evidence E can update the posterior. Historically, anomaly observation (Berger 1892 crisis) drove instrument invention (1924 EEG)."
    },
    svg: () => `<svg viewBox="0 0 660 230" role="img" aria-label="Bayesian Epistemology">
      <rect x="8" y="8" width="644" height="214" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Formula Box -->
      <rect x="24" y="24" width="290" height="86" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="38" y="45" fill="var(--accent)" font-size="10" font-weight="700">BAYES TEOREMİ VE "SIFIR ÖNSEL" TUZAĞI</text>
      <text x="38" y="66" fill="var(--ink)" font-size="11" font-family="monospace">P(H|E) = [P(E|H) · P(H)] / P(E)</text>
      <text x="38" y="85" fill="var(--muted)" font-size="8.5">• İnanççı Hata: P(H) ≈ 1 → Her gürültüyü mucize sayar</text>
      <text x="38" y="99" fill="var(--muted)" font-size="8.5">• Sözde-Şüpheci Hata: P(H) = 0 → P(H|E) daima 0 kalır!</text>
      <!-- Berger Timeline -->
      <rect x="332" y="24" width="304" height="86" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="346" y="45" fill="var(--violet)" font-size="10" font-weight="700">BİLİM TARİHİ İRONİSİ: HANS BERGER (EEG)</text>
      <text x="346" y="64" fill="var(--ink)" font-size="8.8">1892: Topçu kazası anında ablasının uzaktan panik telgrafı</text>
      <text x="346" y="80" fill="var(--ink)" font-size="8.8">1924: "Psişik enerjiyi" ararken insan EEG'sini (Alfa) icat eder</text>
      <text x="346" y="96" fill="var(--muted)" font-size="8.5">1950: Alan Turing (Mind) — ESP'yi AI testinin 1. engeli sayar</text>
      <!-- 5-tier scale -->
      <text x="24" y="134" fill="var(--ink)" font-size="9.5" font-weight="700">BU ARAŞTIRMADA KULLANILAN 5 KADEMELİ KANIT CETVELİ:</text>
      <g transform="translate(24,145)">
        <rect x="0" y="0" width="118" height="58" rx="7" fill="var(--surface-2)" stroke="var(--good)"/>
        <text x="10" y="18" fill="var(--good)" font-size="9" font-weight="700">Sınıf A · Kesin</text>
        <text x="10" y="33" fill="var(--ink)" font-size="8">Bağımsız çoklu</text>
        <text x="10" y="45" fill="var(--muted)" font-size="7.8">replikasyon + mekanizma</text>

        <rect x="126" y="0" width="118" height="58" rx="7" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="136" y="18" fill="var(--accent)" font-size="9" font-weight="700">Sınıf B · Güçlü Anomali</text>
        <text x="136" y="33" fill="var(--ink)" font-size="8">p &lt; 10⁻⁶ meta-analiz,</text>
        <text x="136" y="45" fill="var(--muted)" font-size="7.8">mekanizma tartışmalı</text>

        <rect x="252" y="0" width="118" height="58" rx="7" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="262" y="18" fill="var(--violet)" font-size="9" font-weight="700">Sınıf C · Sınır Veri</text>
        <text x="262" y="33" fill="var(--ink)" font-size="8">Klinik/gözlemsel vaka,</text>
        <text x="262" y="45" fill="var(--muted)" font-size="7.8">kısmi kontrol</text>

        <rect x="378" y="0" width="118" height="58" rx="7" fill="var(--surface-2)" stroke="var(--line)"/>
        <text x="388" y="18" fill="var(--ink)" font-size="9" font-weight="700">Sınıf D · İzomorfik</text>
        <text x="388" y="33" fill="var(--ink)" font-size="8">Felsefi/matematiksel</text>
        <text x="388" y="45" fill="var(--muted)" font-size="7.8">model eşyapılılığı</text>

        <rect x="504" y="0" width="108" height="58" rx="7" fill="var(--surface-2)" stroke="var(--danger)"/>
        <text x="514" y="18" fill="var(--danger)" font-size="9" font-weight="700">Sınıf E · Çürütülmüş</text>
        <text x="514" y="33" fill="var(--ink)" font-size="8">Hile, duyusal sızıntı</text>
        <text x="514" y="45" fill="var(--muted)" font-size="7.8">veya fizik hatası</text>
      </g>
    </svg>`
  },

  "monroe-focus-topology": {
    title: {
      tr: "Şekil 2.1: Monroe'nun Focus 10 → 27 Kartografyası ve Nörofizyolojik Eşlenikleri",
      en: "Figure 2.1: Monroe's Focus 10 → 27 Cartography and Neurophysiological Correlates"
    },
    caption: {
      tr: "Locale I/II/III'ten Focus 10–27'ye evrilen topoloji: Duyusal kapının kapanması (F10), uzamsal sınırın çözülmesi (F12), zamansızlık (F15), sınır-köprü (F21) ve ideo-plastik ara katman (F23–27).",
      en: "Topology evolving from Locale I/II/III to Focus 10–27: sensory gating (F10), spatial boundary dissolution (F12), no-time (F15), bridge state (F21), and ideoplastic inter-zone (F23–27)."
    },
    svg: () => `<svg viewBox="0 0 660 240" role="img" aria-label="Monroe Focus Topology">
      <rect x="8" y="8" width="644" height="224" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Axis -->
      <line x1="36" y1="195" x2="628" y2="195" stroke="var(--line)" stroke-width="1.5"/>
      <text x="36" y="214" fill="var(--muted)" font-size="8.5">Duyusal Girdi &amp; DMN (Ego Filtresi) → Sıfıra İner</text>
      <text x="455" y="214" fill="var(--accent)" font-size="8.5">İdeo-Plastiklik &amp; Faz Tutarlılığı → Maksimum</text>
      <!-- Stages -->
      <g transform="translate(26,28)">
        <rect x="0" y="96" width="104" height="60" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="10" y="114" fill="var(--accent)" font-size="10" font-weight="700">Focus 10</text>
        <text x="10" y="128" fill="var(--ink)" font-size="8.2">Beden Uykuda, Zihin</text>
        <text x="10" y="140" fill="var(--muted)" font-size="7.8">Uyanık · ~4–7 Hz Teta</text>

        <rect x="122" y="74" width="104" height="82" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="132" y="92" fill="var(--accent)" font-size="10" font-weight="700">Focus 12</text>
        <text x="132" y="106" fill="var(--ink)" font-size="8.2">Genişlemiş Farkındalık</text>
        <text x="132" y="119" fill="var(--muted)" font-size="7.8">Parietal sınır azalır;</text>
        <text x="132" y="131" fill="var(--muted)" font-size="7.8">Teta + Alfa/Gama patlaması</text>

        <rect x="244" y="52" width="104" height="104" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="254" y="70" fill="var(--accent)" font-size="10" font-weight="700">Focus 15</text>
        <text x="254" y="84" fill="var(--ink)" font-size="8.2">"Zaman Yok" (No-Time)</text>
        <text x="254" y="98" fill="var(--muted)" font-size="7.8">İnsula &amp; DMN saat</text>
        <text x="254" y="110" fill="var(--muted)" font-size="7.8">sayacı susar; derin</text>
        <text x="254" y="122" fill="var(--muted)" font-size="7.8">delta-teta koheransı</text>

        <rect x="366" y="30" width="108" height="126" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="376" y="48" fill="var(--violet)" font-size="10" font-weight="700">Focus 21</text>
        <text x="376" y="62" fill="var(--ink)" font-size="8.2">Uzay-Zaman Sınırı</text>
        <text x="376" y="76" fill="var(--muted)" font-size="7.8">Fiziksel Markov</text>
        <text x="376" y="88" fill="var(--muted)" font-size="7.8">battaniyesi ile Berzah</text>
        <text x="376" y="100" fill="var(--muted)" font-size="7.8">(Locale II) arasındaki</text>
        <text x="376" y="112" fill="var(--muted)" font-size="7.8">eşik / köprü durumu</text>

        <rect x="492" y="6" width="118" height="150" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="502" y="24" fill="var(--violet)" font-size="10" font-weight="700">Focus 23–27</text>
        <text x="502" y="38" fill="var(--ink)" font-size="8.2">İdeo-Plastik Katman</text>
        <text x="502" y="53" fill="var(--muted)" font-size="7.8">• F23: Sabit inanç/tutku</text>
        <text x="502" y="65" fill="var(--muted)" font-size="7.8">• F24–26: Kolektif inanç</text>
        <text x="502" y="77" fill="var(--muted)" font-size="7.8">  sistemleri (Âlem-i Misâl)</text>
        <text x="502" y="91" fill="var(--ink)" font-size="8">• F27: "Park / Kabul</text>
        <text x="502" y="103" fill="var(--ink)" font-size="8">  Merkezi" — ortak</text>
        <text x="502" y="115" fill="var(--ink)" font-size="8">  arke-tipik geçiş üssü</text>
      </g>
    </svg>`
  },

  "mcdonnell-chain-audit": {
    title: {
      tr: "Şekil 3.1: McDonnell (1983 CIA Raporu) Argüman Zinciri — Hangi Halka Sağlam, Hangisi Fiziksel Hata?",
      en: "Figure 3.1: McDonnell (1983 CIA Report) Argument Chain — Valid Links vs. Physical Fallacy"
    },
    caption: {
      tr: "McDonnell'ın 5 halkasından 4'ü nörofizyoloji ve bilgi kuramıyla uyumludur; ancak 4. halkadaki 'düşük frekanslı dalga Planck mesafesinin (10⁻³³ cm) altına iner' iddiası temel dalga denklemine (λ = v/f) terstir.",
      en: "Four of McDonnell's five links align with neurophysiology and information theory, but Link 4 ('low-frequency oscillations drop below the Planck length 10⁻³³ cm') inverts λ = v/f."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="McDonnell Report Audit">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <g transform="translate(20,26)">
        <rect x="0" y="0" width="112" height="106" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
        <text x="10" y="19" fill="var(--good)" font-size="9" font-weight="700">1. FFR &amp; Faz Kilidi</text>
        <text x="10" y="35" fill="var(--ink)" font-size="8">Binaural faz farkı</text>
        <text x="10" y="47" fill="var(--ink)" font-size="8">üst olivar çekirdekte</text>
        <text x="10" y="59" fill="var(--ink)" font-size="8">fark frekansı üretir.</text>
        <text x="10" y="92" fill="var(--good)" font-size="8" font-weight="700">✓ DOĞRULANDI</text>

        <rect x="126" y="0" width="112" height="106" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
        <text x="136" y="19" fill="var(--good)" font-size="9" font-weight="700">2. ~7 Hz Aort-BOS</text>
        <text x="136" y="35" fill="var(--ink)" font-size="8">Kalp-aort duran dalgası</text>
        <text x="136" y="47" fill="var(--ink)" font-size="8">&amp; ventrikül sıvı</text>
        <text x="136" y="59" fill="var(--ink)" font-size="8">salınımı (Lewis 2019).</text>
        <text x="136" y="92" fill="var(--good)" font-size="8" font-weight="700">✓ DOĞRULANDI</text>

        <rect x="252" y="0" width="112" height="106" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="262" y="19" fill="var(--accent)" font-size="9" font-weight="700">3. Pribram–Bohm</text>
        <text x="262" y="35" fill="var(--ink)" font-size="8">Dendritik girişim</text>
        <text x="262" y="47" fill="var(--ink)" font-size="8">desenleri ↔ Holografik</text>
        <text x="262" y="59" fill="var(--ink)" font-size="8">sınır bilgisi (AdS/CFT).</text>
        <text x="262" y="92" fill="var(--accent)" font-size="8" font-weight="700">◐ GÜÇLÜ MODEL</text>

        <rect x="378" y="0" width="124" height="106" rx="8" fill="var(--surface-2)" stroke="var(--danger)" stroke-width="1.8"/>
        <text x="388" y="19" fill="var(--danger)" font-size="9" font-weight="700">4. "Planck Tıklaması"</text>
        <text x="388" y="35" fill="var(--ink)" font-size="8">İddia: Beyin dalgası</text>
        <text x="388" y="47" fill="var(--ink)" font-size="8">10⁻³³ cm altına iner.</text>
        <text x="388" y="61" fill="var(--danger)" font-size="7.8">Hata: f→0 iken λ=v/f→∞!</text>
        <text x="388" y="73" fill="var(--muted)" font-size="7.5">Genlik ≠ Dalga boyu.</text>
        <text x="388" y="92" fill="var(--danger)" font-size="8" font-weight="700">✕ FİZİKSEL HATA</text>

        <rect x="516" y="0" width="104" height="106" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="524" y="19" fill="var(--violet)" font-size="9" font-weight="700">5. Doğru Onarım</text>
        <text x="524" y="35" fill="var(--ink)" font-size="8">Mekanizma Planck</text>
        <text x="524" y="47" fill="var(--ink)" font-size="8">küçülmesi değil,</text>
        <text x="524" y="59" fill="var(--ink)" font-size="8">makro-faz kilidi ve</text>
        <text x="524" y="71" fill="var(--ink)" font-size="8">filtre gevşemesidir.</text>
        <text x="524" y="92" fill="var(--violet)" font-size="8" font-weight="700">✦ BİZİM ONARIMIMIZ</text>
      </g>
      <rect x="20" y="144" width="620" height="52" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="32" y="163" fill="var(--ink)" font-size="9" font-weight="700">2003'e Kadar "Kayıp" Olan 25. Sayfanın Özeti (2021'de TMI Arşivinden Çıktı):</text>
      <text x="32" y="180" fill="var(--muted)" font-size="8.3">Gizli bir büyü formülü değil; Mutlak'ın sonsuz potansiyelini deneyimlemek için bilincin sonlu uzay-zaman kesitlerine yayılması ve Ordu için pratik Focus eğitimi tavsiyeleri yer alır.</text>
    </svg>`
  },

  "bentov-aorta-torus": {
    title: {
      tr: "Şekil 4.1: Itzhak Bentov'un ~7 Hz Kalp–Aort Duran Dalgası, Ventrikül Rezonansı ve Toroid Kozmosu",
      en: "Figure 4.1: Itzhak Bentov's ~7 Hz Heart-Aorta Standing Wave, Ventricular Resonance, and Torus Cosmos"
    },
    caption: {
      tr: "Sol: Sol ventrikül atımı aort-iliak çatallanmadan yansıyıp ~7 Hz duran dalga kurduğunda kafatası ve beyin ventriküllerinde mikro-rezonans başlar. Sağ: Sarkaç dönüş noktasında (v→0) ve Toroid evrende bilgi döngüsü.",
      en: "Left: Left ventricular ejection reflects at the iliac bifurcation to form a ~7 Hz standing wave driving cranial/ventricular micro-resonance. Right: Toroidal cosmos and pendulum turnaround dynamics."
    },
    svg: () => `<svg viewBox="0 0 660 230" role="img" aria-label="Bentov Aorta Standing Wave and Torus">
      <rect x="8" y="8" width="644" height="214" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Aorta Standing Wave -->
      <rect x="20" y="20" width="305" height="190" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="40" fill="var(--accent)" font-size="9.5" font-weight="700">A. KALP–AORT ÇATALLANMASI DURAN DALGASI (~7 Hz)</text>
      <!-- Body silhouette / aorta -->
      <circle cx="92" cy="74" r="18" fill="none" stroke="var(--violet)" stroke-width="1.8"/>
      <path d="M84 70 Q92 60 100 70 Q92 80 84 70" fill="none" stroke="var(--accent)" stroke-width="1.4"/>
      <line x1="92" y1="92" x2="92" y2="164" stroke="var(--accent)" stroke-width="2.5"/>
      <line x1="92" y1="164" x2="72" y2="194" stroke="var(--accent)" stroke-width="2"/>
      <line x1="92" y1="164" x2="112" y2="194" stroke="var(--accent)" stroke-width="2"/>
      <circle cx="92" cy="112" r="6" fill="var(--danger)"/>
      <!-- Standing wave curve -->
      <path d="M122 92 Q138 110 122 128 Q106 146 122 164" fill="none" stroke="var(--good)" stroke-width="1.8"/>
      <path d="M122 92 Q106 110 122 128 Q138 146 122 164" fill="none" stroke="var(--good)" stroke-width="1.8" stroke-dasharray="3 2"/>
      <text x="148" y="66" fill="var(--ink)" font-size="8.3">4. Beyin Ventrikülleri &amp; Korpus</text>
      <text x="148" y="78" fill="var(--muted)" font-size="7.8">Kallozum: Akustik teta sürüklemesi</text>
      <text x="148" y="102" fill="var(--ink)" font-size="8.3">3. Fizyolojik Kundalini Döngüsü</text>
      <text x="148" y="114" fill="var(--muted)" font-size="7.8">Duyu korteksi homunkulus halkası</text>
      <text x="148" y="138" fill="var(--ink)" font-size="8.3">2. Kalp Sol Ventrikül Atımı</text>
      <text x="148" y="150" fill="var(--muted)" font-size="7.8">Nefes tutulunca/yavaşlayınca kilitlenir</text>
      <text x="148" y="174" fill="var(--ink)" font-size="8.3">1. İliak Çatallanma Yansıması</text>
      <text x="148" y="186" fill="var(--muted)" font-size="7.8">Giden + dönen basınç = Duran Dalga</text>

      <!-- Right: Torus Cosmos -->
      <rect x="338" y="20" width="302" height="190" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="350" y="40" fill="var(--violet)" font-size="9.5" font-weight="700">B. BENTOV TOROİD EVRENİ &amp; SARKAÇ SIFIR NOKTASI</text>
      <ellipse cx="488" cy="118" rx="96" ry="52" fill="none" stroke="var(--violet)" stroke-width="1.6"/>
      <ellipse cx="488" cy="118" rx="58" ry="44" fill="none" stroke="var(--accent)" stroke-width="1.3" stroke-dasharray="4 3"/>
      <path d="M488 74 C470 96, 470 140, 488 162 C506 140, 506 96, 488 74 Z" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="1.5"/>
      <circle cx="488" cy="118" r="4" fill="var(--good)"/>
      <text x="352" y="186" fill="var(--ink)" font-size="8.2">• Sarkaç uç noktada: v = 0, ivme = max → Faz hızı v_p = c²/v → ∞</text>
      <text x="352" y="200" fill="var(--muted)" font-size="8">• Merkezdeki "Beyaz Delik / Kara Delik" Boşluğu = Focus 15/21 Köprüsü</text>
    </svg>`
  },

  "campbell-vr-rendering": {
    title: {
      tr: "Şekil 5.1: Whistlefield CHEC Ölçümleri ve Thomas Campbell'ın Olasılıksal Sanal Gerçeklik (MBT) Mimarisi",
      en: "Figure 5.1: Whistlefield CHEC Measurements and Thomas Campbell's Probabilistic VR (MBT) Architecture"
    },
    caption: {
      tr: "Fiziksel uzay-zaman tam zamanlı bir katı madde simülasyonu değil, yalnızca sorgulandığında olasılık dağılımından örneklenen (render edilen) bir kullanıcı arayüzüdür.",
      en: "Physical spacetime is not a brute-force continuous matter simulation, but a user interface rendered on demand from a underlying probability distribution."
    },
    svg: () => `<svg viewBox="0 0 660 215" role="img" aria-label="Campbell MBT VR Architecture">
      <rect x="8" y="8" width="644" height="199" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <g transform="translate(22,24)">
        <rect x="0" y="0" width="186" height="165" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="12" y="22" fill="var(--accent)" font-size="9.5" font-weight="700">1. BÜYÜK BİLİNÇ SİSTEMİ (LCS)</text>
        <text x="12" y="40" fill="var(--ink)" font-size="8.3">• Temel töz: Dijital / Hücresel</text>
        <text x="12" y="53" fill="var(--ink)" font-size="8.3">  Otomat Bilgi Ağı (Bit / Qubit)</text>
        <text x="12" y="70" fill="var(--ink)" font-size="8.3">• Evrim Ölçütü: Sistem Entropisini</text>
        <text x="12" y="83" fill="var(--ink)" font-size="8.3">  Düşürmek (Negentropi = İşbirliği)</text>
        <text x="12" y="102" fill="var(--muted)" font-size="8">• Gelecek Olabilirlik Veritabanı</text>
        <text x="12" y="115" fill="var(--muted)" font-size="8">  (Future Probable Database)</text>
        <text x="12" y="131" fill="var(--muted)" font-size="8">• Geçmiş Gerçekleşen Veritabanı</text>
        <text x="12" y="144" fill="var(--muted)" font-size="8">  (Akashic / İmpilike Kayıt)</text>

        <rect x="214" y="0" width="186" height="165" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="226" y="22" fill="var(--violet)" font-size="9.5" font-weight="700">2. KURAL SETİ &amp; RENDER MOTORU</text>
        <text x="226" y="40" fill="var(--ink)" font-size="8.3">• Hesaplama Tasarrufu Yasası:</text>
        <text x="226" y="53" fill="var(--muted)" font-size="8">  Gözlemlenmeyen iç detaylar</text>
        <text x="226" y="65" fill="var(--muted)" font-size="8">  olasılık dalgası (Ψ) olarak kalır.</text>
        <text x="226" y="84" fill="var(--ink)" font-size="8.3">• Kuantum Çift-Yarık &amp; c Hızı:</text>
        <text x="226" y="97" fill="var(--muted)" font-size="8">  c = Simülasyonun maksimum</text>
        <text x="226" y="109" fill="var(--muted)" font-size="8">  piksel/adım yenileme hızı (Δx/Δt).</text>
        <text x="226" y="128" fill="var(--good)" font-size="8.2">• Psi-Belirsizlik İlkesi (PUB):</text>
        <text x="226" y="141" fill="var(--muted)" font-size="7.8">  Kural setini bozacak kaba mucize</text>
        <text x="226" y="153" fill="var(--muted)" font-size="7.8">  gürültü maskesiyle engellenir.</text>

        <rect x="428" y="0" width="188" height="165" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
        <text x="440" y="22" fill="var(--good)" font-size="9.5" font-weight="700">3. FİZİKSEL ARAYÜZ &amp; FOCUS API</text>
        <text x="440" y="40" fill="var(--ink)" font-size="8.3">• Beden/Beyin = Avatar İstemcisi</text>
        <text x="440" y="55" fill="var(--muted)" font-size="8">• Normal Uyanıklık (F1): Yalnızca</text>
        <text x="440" y="67" fill="var(--muted)" font-size="8">  5 duyusal veri akışını okur.</text>
        <text x="440" y="86" fill="var(--ink)" font-size="8.3">• Focus 12–21 Modu:</text>
        <text x="440" y="99" fill="var(--muted)" font-size="8">  Avatar veri akışı susturulur →</text>
        <text x="440" y="111" fill="var(--muted)" font-size="8">  Niyet (Intent) sorgusu doğrudan</text>
        <text x="440" y="123" fill="var(--muted)" font-size="8">  veritabanı olasılıklarını okur</text>
        <text x="440" y="135" fill="var(--muted)" font-size="8">  (Uzaktan Görü) veya hafifçe</text>
        <text x="440" y="147" fill="var(--muted)" font-size="8">  kaydırır (REG / İyileşme).</text>
      </g>
    </svg>`
  },

  "menninger-copper-wall": {
    title: {
      tr: "Şekil 6.1: Menninger Vakfı (Elmer Green) 'Bakır Duvar' Elektrostatik Deneyi ve Hipnogojik Teta Penceresi",
      en: "Figure 6.1: Menninger Foundation (Elmer Green) 'Copper Wall' Electrostatic Setup and Hypnagogic Theta Window"
    },
    caption: {
      tr: "Yalıtkan cam izolatör üzerinde oturan meditatör/şifacı hiçbir fiziksel temas olmadan, solunum ve kalp atımından bağımsız olarak dört yöndeki yüzer bakır levhalarda eşzamanlı voltaj sıçramaları üretir.",
      en: "Seated on glass insulators with zero contact, subjects generated synchronous multi-volt electrostatic pulses on surrounding floating copper plates independent of respiration or heart artifacts."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Menninger Copper Wall Experiment">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Copper walls -->
      <rect x="34" y="34" width="12" height="148" rx="3" fill="var(--accent)" opacity="0.75"/>
      <rect x="274" y="34" width="12" height="148" rx="3" fill="var(--accent)" opacity="0.75"/>
      <rect x="64" y="22" width="192" height="10" rx="3" fill="var(--accent)" opacity="0.75"/>
      <rect x="64" y="184" width="192" height="10" rx="3" fill="var(--accent)" opacity="0.75"/>
      <!-- Subject in center -->
      <circle cx="160" cy="96" r="18" fill="var(--surface-2)" stroke="var(--violet)" stroke-width="2"/>
      <rect x="136" y="116" width="48" height="32" rx="6" fill="var(--surface-2)" stroke="var(--violet)"/>
      <rect x="124" y="150" width="72" height="10" rx="3" fill="none" stroke="var(--good)" stroke-dasharray="3 2"/>
      <text x="160" y="172" text-anchor="middle" fill="var(--good)" font-size="7.8">Cam İzolatör Kürsü</text>
      <text x="160" y="48" text-anchor="middle" fill="var(--accent)" font-size="8.2" font-weight="700">4x Yüzer Bakır Duvar (Elektrometre)</text>
      <!-- Right side findings -->
      <rect x="312" y="24" width="322" height="170" rx="9" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="326" y="45" fill="var(--ink)" font-size="9.5" font-weight="700">MENNINGER LABORATUVARI BULGULARI (1970–1988):</text>
      <text x="326" y="65" fill="var(--accent)" font-size="8.5" font-weight="700">• Swami Rama (1970):</text>
      <text x="336" y="78" fill="var(--muted)" font-size="8">Avuç içi iki noktada 11°F (~6°C) zıt sıcaklık farkı; 17 sn</text>
      <text x="336" y="90" fill="var(--muted)" font-size="8">boyunca 306 atım/dk atriyal flatter; bilinçli 4 Hz Teta / Delta.</text>
      <text x="326" y="110" fill="var(--violet)" font-size="8.5" font-weight="700">• Jack Schwarz (1971):</text>
      <text x="336" y="123" fill="var(--muted)" font-size="8">Örgü şişini biseps kasına batırırken alfa-teta geçişiyle</text>
      <text x="336" y="135" fill="var(--muted)" font-size="8">ağrı yanıtını ve kanamayı 1–2 saniye içinde iradi durdurma.</text>
      <text x="326" y="155" fill="var(--good)" font-size="8.5" font-weight="700">• Bakır Duvar (1983–1989):</text>
      <text x="336" y="168" fill="var(--muted)" font-size="8">Normal insan ~mV salınım üretirken, derin odak/şifa halinde</text>
      <text x="336" y="180" fill="var(--muted)" font-size="8">temassız duvarlarda &gt;1–50 Volt eşzamanlı elektrostatik darbe.</text>
    </svg>`
  },

  "schumann-csf-fascia": {
    title: {
      tr: "Şekil 7.1: HP-1 Oktav Kilitlenmesi — Schumann Kavitesi (7.83 Hz), Ventrikül BOS Dalgaları (Lewis 2019) ve Fasya Piezoelektriği",
      en: "Figure 7.1: HP-1 Octave Locking — Schumann Cavity (7.83 Hz), Ventricular CSF Waves (Lewis 2019), and Fascial Piezoelectricity"
    },
    caption: {
      tr: "Yerküre-iyonosfer rezonansı (7.83 Hz), insan hipokampal teta-alfa sınırı (~7.8 Hz) ve derin yavaş-dalga geçişindeki beyin-omurilik sıvısı (BOS) dalgalarının çok-ölçekli eşleşmesi.",
      en: "Multi-scale coupling between the Earth-ionosphere cavity (7.83 Hz), the human hippocampal theta-alpha boundary (~7.8 Hz), and slow-wave cerebrospinal fluid (CSF) pulses."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Schumann CSF Fascia Coupling">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <g transform="translate(20,24)">
        <rect x="0" y="0" width="196" height="170" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="12" y="20" fill="var(--accent)" font-size="9.2" font-weight="700">1. JEOFİZİKSEL KAVİTE (SCHUMANN)</text>
        <text x="12" y="38" fill="var(--ink)" font-size="8.5">f₁ = 7.83 Hz (Temel Mod)</text>
        <text x="12" y="52" fill="var(--muted)" font-size="8">f₂ = 14.3 Hz · f₃ = 20.8 Hz</text>
        <text x="12" y="66" fill="var(--muted)" font-size="8">f₄ = 27.3 Hz · f₅ = 33.8 Hz</text>
        <path d="M12 106 Q36 80 60 106 T108 106 T156 106" fill="none" stroke="var(--accent)" stroke-width="2"/>
        <text x="12" y="136" fill="var(--ink)" font-size="8">Herbert König (1979):</text>
        <text x="12" y="149" fill="var(--muted)" font-size="7.8">7.83 Hz ELF dalgası ile insan</text>
        <text x="12" y="161" fill="var(--muted)" font-size="7.8">alfa/teta EEG faz-sürüklemesi.</text>

        <rect x="212" y="0" width="196" height="170" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="224" y="20" fill="var(--violet)" font-size="9.2" font-weight="700">2. BOS TSUNAMİLERİ (SCIENCE 2019)</text>
        <text x="224" y="38" fill="var(--ink)" font-size="8.5">Fultz &amp; Lewis (Boston Üniv.):</text>
        <text x="224" y="54" fill="var(--muted)" font-size="8">1. Nöronlar yavaş dalgada susar</text>
        <text x="224" y="68" fill="var(--muted)" font-size="8">2. Serebral kan hacmi çekilir</text>
        <text x="224" y="82" fill="var(--muted)" font-size="8">3. 4. Ventrikülden beyne dev</text>
        <text x="224" y="96" fill="var(--ink)" font-size="8" font-weight="700">   ~0.05–0.1 Hz BOS dalgası dolar!</text>
        <text x="224" y="122" fill="var(--good)" font-size="8">✓ Bentov'un 1977 "ventrikül</text>
        <text x="224" y="135" fill="var(--good)" font-size="8">  hidrodinamik osilatörü"nün</text>
        <text x="224" y="148" fill="var(--good)" font-size="8">  7-Tesla fMRI doğrulaması.</text>

        <rect x="424" y="0" width="196" height="170" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
        <text x="436" y="20" fill="var(--good)" font-size="9.2" font-weight="700">3. FASYA PİEZOELEKTRİĞİ</text>
        <text x="436" y="38" fill="var(--ink)" font-size="8.5">Fukada (1957) &amp; Langevin (Harvard):</text>
        <text x="436" y="54" fill="var(--muted)" font-size="8">• Kollajen üçlü sarmalı mekanik</text>
        <text x="436" y="67" fill="var(--muted)" font-size="8">  gerilim/ses altında elektrik</text>
        <text x="436" y="80" fill="var(--muted)" font-size="8">  kutuplanması (piezo) üretir.</text>
        <text x="436" y="98" fill="var(--ink)" font-size="8">• Resonant Tuning (mırıldanma) +</text>
        <text x="436" y="111" fill="var(--ink)" font-size="8">  kalp darbesi → kraniyosakral</text>
        <text x="436" y="124" fill="var(--ink)" font-size="8">  dura mater zarından ventriküllere</text>
        <text x="436" y="137" fill="var(--ink)" font-size="8">  elektromekanik transdüksiyon.</text>
      </g>
    </svg>`
  },

  "ez-water-liquid-crystal": {
    title: {
      tr: "Şekil 8.1: Gerald Pollack'ın Dördüncü Faz Suyu (EZ — H₃O₂) ve Mae-Wan Ho'nun Sıvı-Kristal Matrisi",
      en: "Figure 8.1: Gerald Pollack's Fourth Phase Water (EZ — H₃O₂) and Mae-Wan Ho's Liquid-Crystalline Matrix"
    },
    caption: {
      tr: "Hidrofilik hücre zarları ve kollajen lifleri boyunca dizilen altıgen H₃O₂ tabakaları elektronlarını vererek eksi (-150 mV) yüklenir; dışarı itilen protonlar (H₃O⁺) ile birlikte ışık/sesle şarj olan biyolojik bir pil ve proton otobanı kurar.",
      en: "Hexagonal H₃O₂ sheets lining hydrophilic membranes and collagen fibers build a -150 mV exclusion zone and proton highway recharged by infrared and acoustic energy."
    },
    svg: () => `<svg viewBox="0 0 660 215" role="img" aria-label="EZ Water and Liquid Crystal Body">
      <rect x="8" y="8" width="644" height="199" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Hydrophilic surface + EZ layers -->
      <rect x="24" y="26" width="24" height="162" rx="4" fill="var(--violet)"/>
      <text x="36" y="112" text-anchor="middle" fill="var(--on-accent)" font-size="8.5" font-weight="700" transform="rotate(-90 36 112)">KOLLAJEN / MİYELİN ZARI</text>
      <!-- EZ Zone -->
      <rect x="48" y="26" width="166" height="162" fill="var(--accent)" fill-opacity="0.16" stroke="var(--accent)"/>
      <text x="131" y="45" text-anchor="middle" fill="var(--accent)" font-size="9.5" font-weight="700">EZ SUYU (H₃O₂) · -150 mV</text>
      <text x="131" y="61" text-anchor="middle" fill="var(--ink)" font-size="8">Altıgen Sıvı-Kristal Kafes</text>
      <g fill="var(--accent)" font-size="11" font-family="monospace">
        <text x="64" y="86">⊖  ⊖  ⊖  ⊖  ⊖</text>
        <text x="64" y="110">⊖  ⊖  ⊖  ⊖  ⊖</text>
        <text x="64" y="134">⊖  ⊖  ⊖  ⊖  ⊖</text>
        <text x="64" y="158">⊖  ⊖  ⊖  ⊖  ⊖</text>
      </g>
      <text x="131" y="178" text-anchor="middle" fill="var(--muted)" font-size="7.8">Yarı-iletken elektron/eksiton iletimi</text>
      <!-- Bulk Water Proton Zone -->
      <rect x="214" y="26" width="110" height="162" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="269" y="45" text-anchor="middle" fill="var(--good)" font-size="9" font-weight="700">PROTON BÖLGESİ</text>
      <g fill="var(--good)" font-size="11" font-family="monospace">
        <text x="230" y="86">⊕  ⊕  ⊕</text>
        <text x="230" y="110">⊕  ⊕  ⊕</text>
        <text x="230" y="134">⊕  ⊕  ⊕</text>
        <text x="230" y="158">⊕  ⊕  ⊕</text>
      </g>
      <text x="269" y="178" text-anchor="middle" fill="var(--muted)" font-size="7.8">Grotthuss H⁺ otobanı</text>
      <!-- Right Explanation -->
      <rect x="340" y="26" width="296" height="162" rx="9" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="354" y="46" fill="var(--ink)" font-size="9.5" font-weight="700">NEDEN KİLİT ÖNEMDE? (GİZLİ ÖRÜNTÜ HP-6)</text>
      <text x="354" y="66" fill="var(--ink)" font-size="8.3">1. Klasik akson iletimi (1–100 m/s) tüm beden</text>
      <text x="354" y="79" fill="var(--muted)" font-size="8">   koheransı için çok yavaştır.</text>
      <text x="354" y="97" fill="var(--ink)" font-size="8.3">2. EZ su katmanları boyunca proton atlaması</text>
      <text x="354" y="110" fill="var(--muted)" font-size="8">   (Grotthuss mekanizması) kimyasal difüzyondan</text>
      <text x="354" y="123" fill="var(--muted)" font-size="8">   binlerce kat hızlı kolektif faz geçişi sağlar.</text>
      <text x="354" y="141" fill="var(--good)" font-size="8.3">3. Mae-Wan Ho: Canlı doku polarize ışıkta tek</text>
      <text x="354" y="154" fill="var(--good)" font-size="8">   bir kuantum-uyumlu sıvı kristal gibi parlar;</text>
      <text x="354" y="167" fill="var(--good)" font-size="8">   genel anestezikler tam bu su katmanını çözer!</text>
    </svg>`
  },

  "heart-brain-coherence": {
    title: {
      tr: "Şekil 9.1: Nörokardiyoloji — 0.1 Hz Kalp–Vagus–Talamus Faz Kilidi ve Sistol/Diyastol Algı Kapısı",
      en: "Figure 9.1: Neurocardiology — 0.1 Hz Heart-Vagus-Thalamus Phase Lock and Systole/Diastole Sensory Gate"
    },
    caption: {
      tr: "Vagus liflerinin %80'i kalpten beyne (afferent) çıkar. Dakikada 6 nefes (0.1 Hz, 10 sn periyot) alındığında HRV tam sinüs dalgasına girer ve talamokortikal alfa/teta ritmini kilitler.",
      en: "80% of vagal fibers are afferent (heart to brain). At 6 breaths/min (0.1 Hz), HRV becomes a clean sine wave that entrains thalamocortical alpha/theta oscillations."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Heart Brain Coherence">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Incoherent vs Coherent HRV -->
      <rect x="22" y="24" width="290" height="172" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="34" y="44" fill="var(--danger)" font-size="9" font-weight="700">A. Dağınık (Beta/Stres) HRV Spektrumu</text>
      <polyline points="34,76 52,58 64,84 78,62 92,88 108,55 122,79 138,72 154,89 170,60 188,82 204,64 222,86 242,58 264,80 288,68" fill="none" stroke="var(--danger)" stroke-width="1.6"/>
      <text x="34" y="114" fill="var(--good)" font-size="9" font-weight="700">B. 0.1 Hz Koherans (10 sn Nefes · Hesychasm / Focus 10)</text>
      <path d="M34 150 Q66 118 98 150 T162 150 T226 150 T290 150" fill="none" stroke="var(--good)" stroke-width="2.2"/>
      <text x="34" y="182" fill="var(--muted)" font-size="8">Tek tepe: 0.10 Hz (Mayer dalgası + Baroreseptör rezonansı)</text>

      <!-- Right: Vagus & Garfinkel Gate -->
      <rect x="328" y="24" width="308" height="172" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="342" y="44" fill="var(--violet)" font-size="9.5" font-weight="700">KALP → BEYİN AFFERENT OTOBANI</text>
      <text x="342" y="64" fill="var(--ink)" font-size="8.4">• Armour (1991): Kalpte ~40.000 otonom nöron</text>
      <text x="342" y="80" fill="var(--ink)" font-size="8.4">• Vagus Siniri: %80 Afferent (Kalpten → NTS →</text>
      <text x="342" y="93" fill="var(--muted)" font-size="8">  Talamus → Amigdala &amp; İnsula → Ön Korteks)</text>
      <text x="342" y="112" fill="var(--ink)" font-size="8.4">• Manyetik Alan: Kalp (~50 pT) &gt; Beyin (~0.5 pT)</text>
      <text x="342" y="132" fill="var(--good)" font-size="8.4" font-weight="700">• Garfinkel &amp; Critchley (Sistol / Diyastol Kapısı):</text>
      <text x="342" y="146" fill="var(--muted)" font-size="8">  Kalp her kasıldığında (sistol) baroreseptör darbesi</text>
      <text x="342" y="159" fill="var(--muted)" font-size="8">  dış duyusal acıyı/girdiyi bastırır; diyastolde içsel</text>
      <text x="342" y="172" fill="var(--muted)" font-size="8">  sezgisel sinyal talamustan kortekse geçer.</text>
    </svg>`
  },

  "stochastic-resonance-snr": {
    title: {
      tr: "Şekil 10.1: Doğrusal-Olmayan Nöronlarda Stokastik Rezonans — Pembe Gürültü Eşik-Altı Sinyali Nasıl Yükseltir?",
      en: "Figure 10.1: Stochastic Resonance in Nonlinear Neurons — How Pink Noise Amplifies Sub-Threshold Signals"
    },
    caption: {
      tr: "Sol: Gürültü yokken zayıf sinyal S(t) ateşleme eşiği Θ'nın altında kalır (SNR=0). Orta: Optimum 1/f pembe gürültü D_opt eklendiğinde tepe noktaları eşiği tam sinyal periyodunda aşar! Sağ: SNR eğrisi.",
      en: "Left: With zero noise, weak signal S(t) stays below threshold Θ. Center: Optimal 1/f pink noise D_opt pushes peaks across threshold in phase with S(t). Right: Bell-shaped SNR curve."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Stochastic Resonance Curve">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Panel 1: Zero Noise -->
      <rect x="20" y="22" width="192" height="174" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="40" fill="var(--muted)" font-size="8.8" font-weight="700">1. Gürültü Yok (D = 0)</text>
      <line x1="30" y1="74" x2="200" y2="74" stroke="var(--danger)" stroke-dasharray="4 3"/>
      <text x="32" y="68" fill="var(--danger)" font-size="7.8">Ateşleme Eşiği Θ</text>
      <path d="M30 126 Q58 98 86 126 T142 126 T198 126" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="30" y="164" fill="var(--ink)" font-size="8">Zayıf sinyal S(t) eşiği</text>
      <text x="30" y="177" fill="var(--muted)" font-size="7.8">hiç aşamaz → Çıktı = 0 (Kör)</text>

      <!-- Panel 2: Optimal Pink Noise -->
      <rect x="224" y="22" width="204" height="174" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.5"/>
      <text x="234" y="40" fill="var(--good)" font-size="8.8" font-weight="700">2. Optimum Pembe Gürültü (D_opt)</text>
      <line x1="234" y1="74" x2="416" y2="74" stroke="var(--danger)" stroke-dasharray="4 3"/>
      <path d="M234 126 L246 105 L254 62 L262 56 L270 98 L286 142 L302 150 L318 118 L334 95 L344 58 L352 64 L362 110 L382 146 L402 132 L416 96" fill="none" stroke="var(--good)" stroke-width="1.6"/>
      <circle cx="258" cy="58" r="4" fill="var(--good)"/>
      <circle cx="348" cy="60" r="4" fill="var(--good)"/>
      <text x="234" y="164" fill="var(--good)" font-size="8" font-weight="700">✓ Faz-Kilitli Ateşleme!</text>
      <text x="234" y="177" fill="var(--muted)" font-size="7.8">Hemi-Sync / Ganzfeld / Şaman davulu</text>

      <!-- Panel 3: SNR Bell Curve -->
      <rect x="440" y="22" width="200" height="174" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="450" y="40" fill="var(--violet)" font-size="8.8" font-weight="700">3. Sinyal-Gürültü Oranı (SNR)</text>
      <line x1="460" y1="154" x2="622" y2="154" stroke="var(--muted)"/>
      <line x1="460" y1="154" x2="460" y2="56" stroke="var(--muted)"/>
      <path d="M462 150 C482 148, 495 62, 520 62 C548 62, 575 136, 618 148" fill="none" stroke="var(--violet)" stroke-width="2.2"/>
      <line x1="520" y1="62" x2="520" y2="154" stroke="var(--good)" stroke-dasharray="3 2"/>
      <text x="520" y="168" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">D_opt (1/f)</text>
      <text x="450" y="184" fill="var(--muted)" font-size="7.6">Benzi (1981) · Moss &amp; Wiesenfeld (Nature 1995)</text>
    </svg>`
  },

  "grinberg-syntergic-lattice": {
    title: {
      tr: "Şekil 11.1: Jacobo Grinberg'in Sinterjik Kafesi (La Látice) ve Çift Faraday Kafesi 'Aktarılan Potansiyel' Deneyi (1994)",
      en: "Figure 11.1: Jacobo Grinberg's Syntergic Lattice (La Látice) and Dual Faraday Cage 'Transferred Potential' Setup (1994)"
    },
    caption: {
      tr: "Sol: Beynin Nöronal Alanı (Campo Neuronal) uzay-zaman kafesiyle (La Látice) girişim yaparak algısal gerçekliği üretir; hemisferik koherans arttıkça çarpıtma sıfırlanır. Sağ: 14.5 metre aralıklı iki ayrı Faraday kafesinde eşzamanlı uyarılmış potansiyel (ERP).",
      en: "Left: The brain's Neuronal Field interferes with the spacetime Lattice to produce perceptual reality. Right: Synchronous evoked potential (ERP) across two separate Faraday cages 14.5 m apart."
    },
    svg: () => `<svg viewBox="0 0 660 225" role="img" aria-label="Grinberg Syntergic Lattice and Transferred Potential">
      <rect x="8" y="8" width="644" height="209" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Syntergic Lattice -->
      <rect x="20" y="22" width="298" height="180" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9.2" font-weight="700">A. SİNTERJİK KURAM (LA LÁTICE × NÖRONAL ALAN)</text>
      <g stroke="var(--line)" stroke-width="0.9">
        <line x1="36" y1="62" x2="296" y2="62"/><line x1="36" y1="82" x2="296" y2="82"/><line x1="36" y1="102" x2="296" y2="102"/><line x1="36" y1="122" x2="296" y2="122"/>
        <line x1="66" y1="52" x2="66" y2="132"/><line x1="116" y1="52" x2="116" y2="132"/><line x1="166" y1="52" x2="166" y2="132"/><line x1="216" y1="52" x2="216" y2="132"/><line x1="266" y1="52" x2="266" y2="132"/>
      </g>
      <circle cx="166" cy="92" r="28" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="1.8"/>
      <circle cx="166" cy="92" r="14" fill="none" stroke="var(--violet)" stroke-dasharray="3 2"/>
      <text x="32" y="152" fill="var(--ink)" font-size="8.2">• Düşük Sinterji (Ego/Beta): Kafes yerel olarak bükülür →</text>
      <text x="32" y="165" fill="var(--muted)" font-size="7.9">  "Katı ve ayrı nesneler" yanılsaması (Normal Algı).</text>
      <text x="32" y="181" fill="var(--good)" font-size="8.2">• Yüksek Sinterji (Şaman/Pachita/F15): Nöronal alan kafesle</text>
      <text x="32" y="194" fill="var(--good)" font-size="7.9">  izomorfik olur → Yerel-olmayan doğrudan etkileşim.</text>

      <!-- Right: Transferred Potential -->
      <rect x="332" y="22" width="308" height="180" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="344" y="42" fill="var(--violet)" font-size="9.2" font-weight="700">B. AKTARILAN POTANSİYEL (PHYSICS ESSAYS, 1994)</text>
      <rect x="348" y="56" width="112" height="84" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-dasharray="4 2"/>
      <text x="404" y="72" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">Faraday Kafesi A</text>
      <text x="404" y="88" text-anchor="middle" fill="var(--danger)" font-size="8">⚡ 100 Işık Çakması</text>
      <path d="M362 118 L382 118 L390 98 L398 130 L408 106 L418 118 L444 118" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="404" y="134" text-anchor="middle" fill="var(--muted)" font-size="7.5">Uyarılmış Potansiyel (ERP)</text>

      <rect x="512" y="56" width="112" height="84" rx="6" fill="var(--surface)" stroke="var(--good)" stroke-dasharray="4 2"/>
      <text x="568" y="72" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Faraday Kafesi B</text>
      <text x="568" y="88" text-anchor="middle" fill="var(--muted)" font-size="8">Karanlık &amp; Sessiz (14.5 m)</text>
      <path d="M526 118 L546 118 L554 103 L562 127 L572 109 L582 118 L608 118" fill="none" stroke="var(--good)" stroke-width="1.8"/>
      <text x="568" y="134" text-anchor="middle" fill="var(--good)" font-size="7.5">Aktarılan Potansiyel (p&lt;0.01)</text>

      <line x1="462" y1="98" x2="510" y2="98" stroke="var(--violet)" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="486" y="92" text-anchor="middle" fill="var(--violet)" font-size="7.5">EM=0</text>
      <text x="344" y="160" fill="var(--ink)" font-size="8">• Ön-koşul: İki denek birlikte 20 dk meditasyon yapıp bağ kurar.</text>
      <text x="344" y="174" fill="var(--ink)" font-size="8">• Bağımsız Replikasyonlar: Wackermann (2003), Standish &amp;</text>
      <text x="344" y="187" fill="var(--muted)" font-size="7.8">  Richards (2004 — fMRI V1 aktivasyonu), Radin (2004).</text>
    </svg>`
  },

  "vasiliev-faraday-cage": {
    title: {
      tr: "Şekil 12.1: Leonid Vasiliev'in (Leningrad, 1932–1937) Cıva Mühürlü Kurşun/Faraday Kapsülü ve Radyo Hipotezinin Çöküşü",
      en: "Figure 12.1: Leonid Vasiliev's (Leningrad, 1932–1937) Mercury-Sealed Lead/Faraday Capsule and Refutation of the EM Radio Hypothesis"
    },
    caption: {
      tr: "Çelik zırhlı oda + cıva oluklu 3 mm kurşun kapsül içinde elektromanyetik dalgalar tamamen soğurulduğu halde, 1.700 km (Sevastopol–Leningrad) mesafeden sözsüz hipnotik uyutma/uyandırma gecikmesiz gerçekleşti.",
      en: "Inside a steel-shielded room plus a mercury-sealed 3 mm lead capsule blocking EM waves, non-verbal hypnotic sleep/wake induction succeeded up to 1,700 km (Sevastopol–Leningrad)."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Vasiliev Faraday Lead Capsule">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Shielded Capsule -->
      <rect x="22" y="22" width="296" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="34" y="42" fill="var(--accent)" font-size="9.2" font-weight="700">1. ÇİFT ZIRHLI KURŞUN &amp; CIVA KAPSÜLÜ (LENİNGRAD)</text>
      <rect x="44" y="56" width="126" height="96" rx="6" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 3"/>
      <rect x="56" y="66" width="102" height="76" rx="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2.5"/>
      <text x="107" y="84" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">3 mm Kurşun Zırh</text>
      <text x="107" y="98" text-anchor="middle" fill="var(--good)" font-size="7.8">+ Cıva Oluklu Mühür</text>
      <text x="107" y="114" text-anchor="middle" fill="var(--ink)" font-size="8">Alıcı (İvanova / Fedorova)</text>
      <text x="107" y="128" text-anchor="middle" fill="var(--muted)" font-size="7.5">Pnömograf / Aktograf</text>
      <text x="190" y="78" fill="var(--ink)" font-size="8">• Gönderici (Tomashevsky):</text>
      <text x="190" y="92" fill="var(--muted)" font-size="7.8">  Başka binada veya</text>
      <text x="190" y="104" fill="var(--muted)" font-size="7.8">  1.700 km ötede (Sevastopol)</text>
      <text x="190" y="120" fill="var(--ink)" font-size="8">• Rastgele dönen çark</text>
      <text x="190" y="132" fill="var(--muted)" font-size="7.8">  dakikayı belirler.</text>
      <text x="34" y="172" fill="var(--good)" font-size="8.2" font-weight="700">Sonuç: Kurşun kafes açıkken de kapalıyken de p &lt; 0.001!</text>
      <text x="34" y="186" fill="var(--muted)" font-size="7.8">→ Klasik EM / Radyo Dalgası (Cazzamalli) hipotezi elendi.</text>

      <!-- Right: Chizhevsky & Geomagnetic Window -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="344" y="42" fill="var(--violet)" font-size="9.2" font-weight="700">2. ÇİJEVSKİ GÜNEŞ–JEOMANYETİK KORELASYONU</text>
      <text x="344" y="62" fill="var(--ink)" font-size="8.2">• Aleksandr Çijevski (1915–1936): 11 yıllık güneş lekesi ve</text>
      <text x="344" y="75" fill="var(--muted)" font-size="7.9">  jeomanyetik fırtınalar insan otonom sinir sistemini sürer.</text>
      <text x="344" y="95" fill="var(--ink)" font-size="8.2">• Gizli Örüntü (HP-8): Faraday kafesi neden telepatiyi</text>
      <text x="344" y="108" fill="var(--ink)" font-size="8.2">  engellemediği gibi bazen isabeti artırır (Puharich / SRI)?</text>
      <text x="344" y="126" fill="var(--good)" font-size="8">  Çünkü kafes "sinyali" değil, beynin alıcı hassasiyetini</text>
      <text x="344" y="139" fill="var(--good)" font-size="8">  bozan dış RF/endüstriyel elektromanyetik gürültüyü</text>
      <text x="344" y="152" fill="var(--good)" font-size="8">  keser! (Sinyal EM taşıyıcılı değil, yerel-olmayan fazdır).</text>
      <text x="344" y="176" fill="var(--muted)" font-size="7.8">Vasiliev, Experiments in Mental Suggestion (1962 / 1963 İng.)</text>
    </svg>`
  },

  "kozyrev-mirror-kaznacheev": {
    title: {
      tr: "Şekil 13.1: Novosibirsk Psikotroniği — Kozırev'in Alüminyum Spiral Aynası ve Kaznaçeyev'in Kuvars Hücre Deneyi",
      en: "Figure 13.1: Novosibirsk Psychotronics — Kozyrev's Aluminum Spiral Mirror and Kaznacheev's Quartz Cell Experiment"
    },
    caption: {
      tr: "Sol: Nikolay Kozırev ve Vlail Kaznaçeyev'in Dikson (Kuzey Kutbu) deneylerinde kullandığı 1.5 sarımlı içbükey alüminyum spiral ayna. Sağ: Yalnızca UV-geçirgen kuvars pencere varken gerçekleşen biyofotonik sitopatik ayna etkisi.",
      en: "Left: 1.5-turn concave aluminum spiral mirror used by Kozyrev and Kaznacheev in Arctic Dikson trials. Right: Biophotonic cytopathic mirror effect occurring across UV-transparent quartz windows."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Kozyrev Mirror and Kaznacheev Quartz Cell">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Kozyrev Spiral -->
      <rect x="20" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9.2" font-weight="700">A. KOZIREV AYNASI (1.5 SARIM ARŞİMET SPİRALİ)</text>
      <path d="M165 112 m -52 0 a 52 52 0 1 1 92 32 a 38 38 0 1 0 -68 -24 a 22 22 0 1 1 36 14" fill="none" stroke="var(--accent)" stroke-width="3"/>
      <circle cx="168" cy="112" r="6" fill="var(--good)"/>
      <text x="32" y="168" fill="var(--ink)" font-size="8">• Alüminyum silindir (h=2.6 m) odak noktasında denek:</text>
      <text x="32" y="182" fill="var(--muted)" font-size="7.8">  Akustik + termal IR + biyofoton + EM ekranlama odağı.</text>

      <!-- Right: Kaznacheev Cytopathic Mirror Effect -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="344" y="42" fill="var(--violet)" font-size="9.2" font-weight="700">B. KAZNAÇEYEV "SİTOPATİK AYNA ETKİSİ" (15.000 DENEY)</text>
      <rect x="352" y="60" width="106" height="72" rx="6" fill="var(--surface)" stroke="var(--danger)"/>
      <text x="405" y="80" text-anchor="middle" fill="var(--danger)" font-size="8" font-weight="700">Kültür A (Enfekte)</text>
      <text x="405" y="96" text-anchor="middle" fill="var(--ink)" font-size="7.8">Virüs / HgCl₂ / UV</text>
      <text x="405" y="114" text-anchor="middle" fill="var(--muted)" font-size="7.5">Hücre ölümü başlar</text>

      <rect x="462" y="56" width="14" height="80" rx="2" fill="var(--accent)" fill-opacity="0.4" stroke="var(--accent)"/>
      <text x="469" y="148" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">KUVARS CAM</text>

      <rect x="480" y="60" width="106" height="72" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="533" y="80" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Kültür B (Steril)</text>
      <text x="533" y="96" text-anchor="middle" fill="var(--ink)" font-size="7.8">Kimyasal temas = 0</text>
      <text x="533" y="114" text-anchor="middle" fill="var(--danger)" font-size="7.8">~%75 Aynı Patoloji!</text>

      <text x="344" y="168" fill="var(--ink)" font-size="8">• Kontrol: Normal pencere camı (UV geçirmez) konursa etki = %0!</text>
      <text x="344" y="182" fill="var(--good)" font-size="7.9">→ Kanıt: Mekanizma mistik değil, 200–350 nm UV Biyofoton iletişimidir.</text>
    </svg>`
  },

  "china-507-teyi-gongneng": {
    title: {
      tr: "Şekil 14.1: Qian Xuesen, 507. Enstitü ve Çin 'Tèyì Gōngnéng' Deneylerinde Hile Sınırı ile Kalan Anomali",
      en: "Figure 14.1: Qian Xuesen, Institute 507, and the Fraud vs. Residual Anomaly Boundary in China's 'Tèyì Gōngnéng' Trials"
    },
    caption: {
      tr: "Gevşek göz bağı/zarf testlerinde (1988 CSICOP heyeti) çocuklar el çabukluğuyla yakalandı; ancak Pekin Üniversitesi'nin (Chen Shouliang, 40 çift-kör test) lehimli/mühürlü tüp protokollerinde anlamlı artık anomali kaldı.",
      en: "In loose envelope tests (1988 CSICOP visit), children were caught peeking; in Peking University's (Chen Shouliang) doubly-sealed tube protocols, significant residual hits persisted."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="China 507 Institute Teyi Gongneng">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <g transform="translate(20,22)">
        <rect x="0" y="0" width="196" height="174" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
        <text x="12" y="20" fill="var(--accent)" font-size="9" font-weight="700">1. QIAN XUESEN &amp; 507. ENSTİTÜ</text>
        <text x="12" y="38" fill="var(--ink)" font-size="8">• Caltech JPL kurucusu &amp; Çin</text>
        <text x="12" y="51" fill="var(--ink)" font-size="8">  uzay/füze programının babası.</text>
        <text x="12" y="68" fill="var(--ink)" font-size="8">• "Renti Kexue" (Bedensel Bilim):</text>
        <text x="12" y="81" fill="var(--muted)" font-size="7.8">  İnsan bedenini "Açık, Karmaşık</text>
        <text x="12" y="94" fill="var(--muted)" font-size="7.8">  Dev Sistem" olarak modeller;</text>
        <text x="12" y="107" fill="var(--muted)" font-size="7.8">  Qigong + Tèyì Gōngnéng +</text>
        <text x="12" y="120" fill="var(--muted)" font-size="7.8">  Geleneksel Tıp birleşimi.</text>
        <text x="12" y="144" fill="var(--good)" font-size="8">• Pekin Üniv. (Chen Shouliang):</text>
        <text x="12" y="157" fill="var(--muted)" font-size="7.8">  Mühürlü PVC tüplerde p &lt; 10⁻⁹.</text>

        <rect x="210" y="0" width="198" height="174" rx="8" fill="var(--surface-2)" stroke="var(--danger)"/>
        <text x="222" y="20" fill="var(--danger)" font-size="9" font-weight="700">2. YAKALANAN HİLELER (SINIF E)</text>
        <text x="222" y="38" fill="var(--ink)" font-size="8">• 1988 CSICOP (Randi, Hyman,</text>
        <text x="222" y="51" fill="var(--ink)" font-size="8">  Kurtz) &amp; He Zuoxiu testleri:</text>
        <text x="222" y="68" fill="var(--muted)" font-size="7.8">• Kağıt katlama veya sıradan</text>
        <text x="222" y="81" fill="var(--muted)" font-size="7.8">  zarf verildiğinde çocukların</text>
        <text x="222" y="94" fill="var(--muted)" font-size="7.8">  koltuk altında zarfı açıp</text>
        <text x="222" y="107" fill="var(--muted)" font-size="7.8">  baktığı gizli kamerayla</text>
        <text x="222" y="120" fill="var(--muted)" font-size="7.8">  yakalandı (Tang Yu dahil).</text>
        <text x="222" y="144" fill="var(--danger)" font-size="8">• Performans baskısı = Hileye</text>
        <text x="222" y="157" fill="var(--danger)" font-size="8">  başvurma (Trickster Yasası).</text>

        <rect x="422" y="0" width="198" height="174" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="434" y="20" fill="var(--violet)" font-size="9" font-weight="700">3. KALAN ÇEKİRDEK ANOMALİ</text>
        <text x="434" y="38" fill="var(--ink)" font-size="8">• Tüm çocuklarda ortak rapor:</text>
        <text x="434" y="53" fill="var(--good)" font-size="8" font-weight="700">  "Alında 3. Göz Ekranı (Tianmu)"</text>
        <text x="434" y="68" fill="var(--muted)" font-size="7.8">• Harf "deriyle" değil, 15–40 dk</text>
        <text x="434" y="81" fill="var(--muted)" font-size="7.8">  sonra alnın ortasında önce</text>
        <text x="434" y="94" fill="var(--muted)" font-size="7.8">  bulanık, sonra aniden netleşen</text>
        <text x="434" y="107" fill="var(--muted)" font-size="7.8">  bir içsel ekran flaşı olarak</text>
        <text x="434" y="120" fill="var(--muted)" font-size="7.8">  görülür (CRV &amp; Focus 12 ile</text>
        <text x="434" y="133" fill="var(--muted)" font-size="7.8">  birebir aynı fenomenoloji!).</text>
      </g>
    </svg>`
  },

  "john-chang-mo-pai-dantian": {
    title: {
      tr: "Şekil 15.1: John Chang (Mo Pai / Neidan) Biyo-Kapasitör Modeli ve Harvard Tummo Sıcaklık Ölçümleri (Benson 1982)",
      en: "Figure 15.1: John Chang (Mo Pai / Neidan) Bio-Capacitor Model and Harvard gTum-mo Temperature Measurements (Benson 1982)"
    },
    caption: {
      tr: "Sol: Alt Dantian (enterik pleksus + mezenterik fasya + EZ su katmanları) içinde solunum/pelvik kilit ile sıkıştırılan biyoelektrik yük. Sağ: Herbert Benson'ın (Nature, 1982) Tibet gTum-mo rahiplerinde ölçtüğü +8.3°C parmak sıcaklığı sıçraması.",
      en: "Left: Bioelectric charge storage in the Lower Dantian (enteric plexus + mesenteric fascia + EZ water layers). Right: Herbert Benson's (Nature, 1982) +8.3°C peripheral temperature jump in Tibetan gTum-mo monks."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="John Chang Mo Pai and Tummo">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Mo Pai Bio-Capacitor -->
      <rect x="20" y="22" width="302" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9.2" font-weight="700">A. MO PAI (NEİDAN) ALT DANTİAN BİYO-KAPASİTÖRÜ</text>
      <circle cx="92" cy="116" r="36" fill="var(--accent)" fill-opacity="0.16" stroke="var(--accent)" stroke-width="2"/>
      <path d="M56 116 A36 36 0 0 1 128 116" fill="var(--danger)" fill-opacity="0.25"/>
      <text x="92" y="106" text-anchor="middle" fill="var(--danger)" font-size="8.5" font-weight="700">YANG (+)</text>
      <text x="92" y="132" text-anchor="middle" fill="var(--accent)" font-size="8.5" font-weight="700">YİN (−)</text>
      <text x="142" y="66" fill="var(--ink)" font-size="8">1. Alt Dantian (Göbek altı ~5 cm):</text>
      <text x="142" y="79" fill="var(--muted)" font-size="7.8">   Enterik Sinir Sistemi (~500 milyon</text>
      <text x="142" y="91" fill="var(--muted)" font-size="7.8">   nöron) + Mezenterik Kollajen Fasya</text>
      <text x="142" y="103" fill="var(--muted)" font-size="7.8">   + EZ Su (H₃O₂) dielektrik zarları.</text>
      <text x="142" y="122" fill="var(--ink)" font-size="8">2. Seviye 1–4 Eğitim: Meditasyon +</text>
      <text x="142" y="135" fill="var(--muted)" font-size="7.8">   diyafram/perineum piezoelektrik</text>
      <text x="142" y="147" fill="var(--muted)" font-size="7.8">   sıkıştırması (elektrikli yılanbalığı</text>
      <text x="142" y="159" fill="var(--muted)" font-size="7.8">   elektrosit dizilimi analojisi).</text>
      <text x="32" y="184" fill="var(--good)" font-size="7.9">• 1988/1996 Kayıtları: LED yakma, denek kasında istemsiz tetani.</text>

      <!-- Right: Benson Harvard Tummo -->
      <rect x="336" y="22" width="304" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="348" y="42" fill="var(--violet)" font-size="9.2" font-weight="700">B. HARVARD TUMMO ÖLÇÜMÜ (BENSON, NATURE 1982)</text>
      <line x1="364" y1="146" x2="612" y2="146" stroke="var(--muted)"/>
      <line x1="364" y1="146" x2="364" y2="62" stroke="var(--muted)"/>
      <path d="M366 134 L412 132 L442 74 L536 68 L586 112 L610 124" fill="none" stroke="var(--good)" stroke-width="2.2"/>
      <text x="450" y="64" fill="var(--good)" font-size="8.2" font-weight="700">+8.3°C Artış (Parmak/Ayak Ucu)</text>
      <text x="348" y="166" fill="var(--ink)" font-size="8">• Soğuk odada ıslak çarşafları sırtında kurutan rahipler</text>
      <text x="348" y="180" fill="var(--muted)" font-size="7.8">• Wim Hof (Kox et al., PNAS 2014): İradi adrenalin + IL-10 artışı</text>
    </svg>`
  },

  "dermo-optic-skin-opsins": {
    title: {
      tr: "Şekil 16.1: Dermo-Optik Algı ('Deriyle Görme') — Burun Boşluğu Sızıntısı vs. İnsan Derisindeki Gerçek Opsin Fotoreseptörleri",
      en: "Figure 16.1: Dermo-Optic Perception — Nose-Gap Optical Leak vs. Genuine Cutaneous Opsin Photoreceptors in Human Skin"
    },
    caption: {
      tr: "Göz bağıyla yapılan 'gazete okuma' gösterileri burun oluğundan ışık sızıntısıdır (Sınıf E); ancak modern moleküler biyoloji (Oancea 2011–2015) insan derisinde gerçek Rodopsin (OPN2), OPN3, Melanopsin (OPN4) ve Nöropsin (OPN5) bulunduğunu kanıtladı (Sınıf A)!",
      en: "Blindfold newspaper-reading stunts rely on nose-gap peeking (Class E), yet molecular biology (Oancea 2011–2015) proved human skin expresses functional Rhodopsin (OPN2), OPN3, Melanopsin (OPN4), and Neuropsin (OPN5) (Class A)!"
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Dermo Optic Perception and Skin Opsins">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Nose Peek vs Opaque Box -->
      <rect x="20" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--danger)"/>
      <text x="32" y="42" fill="var(--danger)" font-size="9" font-weight="700">1. OPTİK FİZİK SINIRI: MERCEKSİZ GÖRÜNTÜ OLMAZ</text>
      <text x="32" y="62" fill="var(--ink)" font-size="8.2">• Kuleshova &amp; Göz Bağı Gösterileri (1960'lar):</text>
      <text x="32" y="76" fill="var(--muted)" font-size="7.9">  Tek kat göz bağı burun kemerinin iki yanında 1–2 mm</text>
      <text x="32" y="89" fill="var(--muted)" font-size="7.9">  aşağı doğru görüş konisi bırakır (Gardner, 1966).</text>
      <text x="32" y="109" fill="var(--ink)" font-size="8.2">• Optik Kanun: Deride kornea/mercek (lens) yoktur!</text>
      <text x="32" y="122" fill="var(--muted)" font-size="7.9">  Mercek olmadan harften saçılan fotonlar deride üst üste</text>
      <text x="32" y="135" fill="var(--muted)" font-size="7.9">  biner (bulanık aydınlanma); uzamsal "A harfi" görüntüsü</text>
      <text x="32" y="148" fill="var(--muted)" font-size="7.9">  (spatial focus) oluşturamaz.</text>
      <text x="32" y="172" fill="var(--good)" font-size="8">→ Kapalı kutuda harf biliniyorsa bu "deri optiği" değil,</text>
      <text x="32" y="185" fill="var(--good)" font-size="8">   dokunsal mikrokabartı ya da merkezi durugörüdür (CRV).</text>

      <!-- Right: Genuine Skin Opsins -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="344" y="42" fill="var(--good)" font-size="9" font-weight="700">2. BİYOLOJİK SÜRPRİZ: DERİDEKİ 4 OPSİN (SINIF A)</text>
      <text x="344" y="62" fill="var(--ink)" font-size="8.2">• Elena Oancea (Brown Üniv., Current Biology 2011):</text>
      <text x="344" y="76" fill="var(--muted)" font-size="7.9">  Gözdeki retinanın kullandığı G-protein bağlı ışık</text>
      <text x="344" y="89" fill="var(--muted)" font-size="7.9">  reseptörleri insan epidermisinde de aktif olarak çalışır!</text>
      <text x="344" y="108" fill="var(--accent)" font-size="8.2" font-weight="700">• OPN2 (Rodopsin) &amp; OPN3 (Encephalopsin): Mavi/Yeşil</text>
      <text x="344" y="123" fill="var(--violet)" font-size="8.2" font-weight="700">• OPN4 (Melanopsin) &amp; OPN5 (Nöropsin): UVA (380 nm)</text>
      <text x="344" y="142" fill="var(--ink)" font-size="8">• Ne Yapabilir? Harf okuyamaz ama ışığın rengini/frekansını,</text>
      <text x="344" y="155" fill="var(--muted)" font-size="7.9">  kızılötesi/UV foton akısını algılar, Ca²⁺ dalgası ve</text>
      <text x="344" y="168" fill="var(--muted)" font-size="7.9">  Nitrik Oksit (NO) salgılayarak damarları/sinirleri uyarır!</text>
      <text x="344" y="184" fill="var(--good)" font-size="7.8">→ Gateway "Renk Nefesi"nin gerçek fotobiyolojik zemini.</text>
    </svg>`
  },

  "mesmer-puysegur-1784": {
    title: {
      tr: "Şekil 17.1: 1784 Franklin–Lavoisier Kraliyet Komisyonu Kör Testi ve Puységur'ün 'Yapay Somnambulizm' Keşfi",
      en: "Figure 17.1: The 1784 Franklin–Lavoisier Royal Commission Blind Test and Puységur's Discovery of 'Artificial Somnambulism'"
    },
    caption: {
      tr: "1784 Komisyonu Mesmer'in 'fiziksel manyetik sıvı' iddiasını çürütürken, farkında olmadan zihinsel imgelemin (Imagination) beden üzerinde kriz ve iyileşme yaratan devasa gücünü kanıtladı; aynı yıl Puységur Focus 10–12'nin atası olan somnambulik transı keşfetti.",
      en: "While refuting Mesmer's physical fluid, the 1784 Commission inadvertently proved the somatic power of top-down imagination; the same year, Puységur discovered somnambulic trance."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Mesmer 1784 Commission and Puysegur">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: 1784 Commission -->
      <rect x="20" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">1. 1784 FRANKLIN–LAVOISIER KÖR AĞAÇ TESTİ</text>
      <text x="32" y="62" fill="var(--ink)" font-size="8.2">• Bahçedeki 1 ağaç "manyetize" edildi; gözü bağlı denek</text>
      <text x="32" y="75" fill="var(--muted)" font-size="7.9">  manyetize edilmemiş 4. ağaca sarıldığında "manyetik</text>
      <text x="32" y="88" fill="var(--muted)" font-size="7.9">  kriz" geçirip bayıldı; gerçek ağaca değince hiçbir şey</text>
      <text x="32" y="101" fill="var(--muted)" font-size="7.9">  hissetmedi.</text>
      <text x="32" y="121" fill="var(--danger)" font-size="8.2" font-weight="700">• Komisyonun Kararı: "Sıvı yok, her şey İmajinasyon!"</text>
      <text x="32" y="139" fill="var(--good)" font-size="8">• Bilim Tarihinin Kör Noktası: Eğer "salt imajinasyon"</text>
      <text x="32" y="152" fill="var(--good)" font-size="7.9">  saniyeler içinde otonom nöbet, anestezi ve iyileşme</text>
      <text x="32" y="165" fill="var(--good)" font-size="7.9">  üretebiliyorsa, asıl incelenmesi gereken dev güç</text>
      <text x="32" y="178" fill="var(--good)" font-size="7.9">  İmajinasyonun biyolojik yazma yetkisidir (HP-7)!</text>

      <!-- Right: Puysegur Somnambulism -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="344" y="42" fill="var(--violet)" font-size="9" font-weight="700">2. PUYSÉGUR &amp; VICTOR RACE (MAYIS 1784 — BUZANCY)</text>
      <text x="344" y="62" fill="var(--ink)" font-size="8.2">• Çırpınmalı kriz yerine derin, berrak "Uyurgezer Uyanıklık"</text>
      <text x="344" y="75" fill="var(--muted)" font-size="7.9">  (Somnambulisme Artificiel = Monroe'nun Focus 10–12'si!).</text>
      <text x="344" y="94" fill="var(--ink)" font-size="8.2">• Gözlemlenen 3 Temel Fenomen:</text>
      <text x="352" y="109" fill="var(--good)" font-size="8">1. Üstün Zihinsel Berraklık: Eğitimsiz köylü Victor'un</text>
      <text x="352" y="121" fill="var(--muted)" font-size="7.8">   trans halinde akıcı ve analitik bir kişiliğe bürünmesi.</text>
      <text x="352" y="136" fill="var(--good)" font-size="8">2. Sözsüz Niyet Aktarımı (Communauté de sensation):</text>
      <text x="352" y="148" fill="var(--muted)" font-size="7.8">   Puységur'ün içinden geçirdiği komutları ses çıkarmadan</text>
      <text x="352" y="160" fill="var(--muted)" font-size="7.8">   yerine getirmesi.</text>
      <text x="352" y="175" fill="var(--good)" font-size="8">3. İçsel Tıbbi Teşhis ve Amnezik Kapanış.</text>
    </svg>`
  },

  "burr-becker-levin-bioelectric": {
    title: {
      tr: "Şekil 18.1: Becker'in Perinöral DC Bilinç Polaritesi ve Michael Levin'in Biyoelektrik Morfogenetik Kodu (V_mem)",
      en: "Figure 18.1: Becker's Perineural DC Consciousness Polarity and Michael Levin's Bioelectric Morphogenetic Code (V_mem)"
    },
    caption: {
      tr: "Sol: Robert O. Becker'in gösterdiği glial/perinöral doğru akım (DC) dipolü — anestezi altında baş-kuyruk voltajı sıfırlanır veya ters döner. Sağ: Michael Levin (Tufts) — DNA'ya dokunmadan yalnızca V_mem voltaj haritasını değiştirerek iki başlı yassısolucan üretimi!",
      en: "Left: Robert O. Becker's glial/perineural DC dipole — head-to-tail voltage zeroes or reverses under anesthesia. Right: Michael Levin (Tufts) — rewriting V_mem bioelectric gradients creates permanent two-headed planaria without altering DNA!"
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Becker DC System and Levin Morphogenetic Code">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Becker DC -->
      <rect x="20" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. ROBERT O. BECKER: PERİNÖRAL DC SİSTEMİ</text>
      <text x="32" y="62" fill="var(--ink)" font-size="8.2">• Schwann &amp; Glia hücre kılıfları yarı-iletken doğru akım</text>
      <text x="32" y="75" fill="var(--muted)" font-size="7.9">  (DC) taşır (aksiyon potansiyelinden daha eski ana sistem).</text>
      <rect x="34" y="88" width="124" height="44" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="96" y="106" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Uyanık: Alın (−) / Ensede (+)</text>
      <text x="96" y="121" text-anchor="middle" fill="var(--muted)" font-size="7.6">Normal bilinç akımı</text>
      <rect x="172" y="88" width="132" height="44" rx="6" fill="var(--surface)" stroke="var(--danger)"/>
      <text x="238" y="106" text-anchor="middle" fill="var(--danger)" font-size="8" font-weight="700">Anestezi / Derin Hipnoz</text>
      <text x="238" y="121" text-anchor="middle" fill="var(--muted)" font-size="7.6">DC Voltaj → 0 veya Ters (+)</text>
      <text x="32" y="152" fill="var(--ink)" font-size="8">• Dışarıdan mikroamper DC akım veya manyetik alan</text>
      <text x="32" y="165" fill="var(--muted)" font-size="7.9">  uygulayarak uzuv rejenerasyonu ve elektro-anestezi.</text>
      <text x="32" y="182" fill="var(--good)" font-size="7.9">• Hall Etkisi: DC akım jeomanyetik alana duyarlıdır!</text>

      <!-- Right: Michael Levin Vmem -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="344" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. MICHAEL LEVIN (TUFTS): BİYOELEKTRİK ANATOMİ KODU</text>
      <text x="344" y="62" fill="var(--ink)" font-size="8.2">• DNA yalnızca "protein tuğlalarını" kodlar; binanın</text>
      <text x="344" y="75" fill="var(--ink)" font-size="8.2">  3 boyutlu mimari planı hücreler-arası zar voltajı</text>
      <text x="344" y="88" fill="var(--accent)" font-size="8.2" font-weight="700">  (V_mem + Gap Junction) ağında saklanır!</text>
      <text x="344" y="108" fill="var(--good)" font-size="8">• Planaria Deneyi (Oviedo &amp; Levin, 2010):</text>
      <text x="344" y="121" fill="var(--muted)" font-size="7.9">  Genomu %100 normal olan solucanın kuyruk voltajı</text>
      <text x="344" y="134" fill="var(--muted)" font-size="7.9">  48 saatliğine depolarize edildiğinde hayvan "iki başlı"</text>
      <text x="344" y="147" fill="var(--muted)" font-size="7.9">  büyür; tekrar kesildiğinde (ilaçsız!) sonsuza dek</text>
      <text x="344" y="160" fill="var(--good)" font-size="7.9" font-weight="700">  iki başlı olarak çoğalmaya devam eder (Elektriksel Bellek)!</text>
      <text x="344" y="182" fill="var(--muted)" font-size="7.8">→ Burr'ün "L-Alansal Kalıp" kuramının modern moleküler ispatı.</text>
    </svg>`
  },

  "biophoton-waveguide-magnetite": {
    title: {
      tr: "Şekil 19.1: Miyelinli Akson Biyofoton Dalga Kılavuzları (Simon 2022) ve İnsan Beyninde Manyetit Algısı (Kirschvink 2019)",
      en: "Figure 19.1: Myelinated Axon Biophoton Waveguides (Simon 2022) and Human Brain Magnetoreception (Kirschvink 2019)"
    },
    caption: {
      tr: "Sol: Miyelin kılıfın yüksek kırılma indisi (n≈1.44) biyofotonları tıpkı fiber optik kablo gibi toplam iç yansımayla iletir. Sağ: Caltech (2019) Faraday kafesi deneyinde Dünya manyetik alanı döndürüldüğünde insan beyninde Alfa (8–13 Hz) genliğinin düşmesi.",
      en: "Left: High refractive index of myelin (n≈1.44) guides biophotons via total internal reflection like an optical fiber. Right: Caltech (2019) Faraday cage trial showing human Alpha (8–13 Hz) suppression upon geomagnetic rotation."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Biophoton Waveguide and Human Magnetite">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Myelinated Axon Fiber Optic -->
      <rect x="20" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. FİBER OPTİK AKSON &amp; BİYOFOTON (KUMAR / SIMON)</text>
      <!-- Axon diagram -->
      <rect x="34" y="58" width="268" height="14" rx="3" fill="var(--violet)" fill-opacity="0.45"/>
      <rect x="34" y="72" width="268" height="28" fill="var(--surface)"/>
      <rect x="34" y="100" width="268" height="14" rx="3" fill="var(--violet)" fill-opacity="0.45"/>
      <polyline points="40,86 85,73 135,99 185,73 235,99 285,76" fill="none" stroke="var(--good)" stroke-width="2"/>
      <text x="168" y="69" text-anchor="middle" fill="var(--ink)" font-size="7.5">Miyelin Kılıf (n ≈ 1.44) &gt; Dış Ortam (n ≈ 1.34)</text>
      <text x="168" y="90" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Toplam İç Yansıma (300–900 nm Biyofoton)</text>
      <text x="32" y="134" fill="var(--ink)" font-size="8">• Tang &amp; Dai (2014): Glutamat uyarımı biyofoton yayar.</text>
      <text x="32" y="149" fill="var(--ink)" font-size="8">• Kumar, Boone, Tuszynski &amp; Simon (Sci. Rep. 2016;</text>
      <text x="32" y="162" fill="var(--muted)" font-size="7.8">  Zarkeshian 2022): Miyelinli aksonlar fotonları ileten</text>
      <text x="32" y="175" fill="var(--muted)" font-size="7.8">  optik dalga kılavuzlarıdır (c/n ≈ 2×10⁸ m/s hız!).</text>

      <!-- Right: Kirschvink 2019 Magnetoreception -->
      <rect x="332" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="344" y="42" fill="var(--good)" font-size="9" font-weight="700">B. İNSAN BEYNİNDE MANYETİK ALGI (KIRSCHVINK, 2019)</text>
      <text x="344" y="62" fill="var(--ink)" font-size="8.2">• Caltech &amp; Tokyo Üniv. (Wang et al., eNeuro 2019):</text>
      <text x="344" y="76" fill="var(--muted)" font-size="7.9">• 6-yüzlü alüminyum Faraday kafesi + Merritt bobinleri</text>
      <text x="344" y="89" fill="var(--muted)" font-size="7.9">  içinde oturan sağlıklı insanlar (ses/titreşim/ısı = 0).</text>
      <text x="344" y="107" fill="var(--accent)" font-size="8.2" font-weight="700">• Bulgu: Dünya şiddetindeki (~35 μT) manyetik alan</text>
      <text x="344" y="120" fill="var(--accent)" font-size="8.2" font-weight="700">  saat yönünün tersine döndürüldüğünde, beynin</text>
      <text x="344" y="133" fill="var(--good)" font-size="8.2" font-weight="700">  8–13 Hz Alfa dalga gücü %25–40 oranında düşer!</text>
      <text x="344" y="152" fill="var(--ink)" font-size="8">• Reseptör: İnsan beynindeki biyojenik Manyetit (Fe₃O₄)</text>
      <text x="344" y="165" fill="var(--muted)" font-size="7.8">  kristalleri (Kirschvink, PNAS 1992 — gram başına milyonlarca</text>
      <text x="344" y="178" fill="var(--muted)" font-size="7.8">  tek-domenli mıknatıs kristali, özellikle etmoid/hipokampüste).</text>
    </svg>`
  },

  "ephaptic-coupling-turin-spin": {
    title: {
      tr: "Şekil 20.1: Bıçakla Kesilen Hipokampüste Sinapssız Efaptik Dalga Atlaması (Durand 2019) ve Elektron Spini Anestezisi (Turin 2014)",
      en: "Figure 20.1: Non-Synaptic Ephaptic Wave Jumping Across a Severed Hippocampus (Durand 2019) and Electron-Spin Anesthesia (Turin 2014)"
    },
    caption: {
      tr: "Sol: Dominique Durand (J. Physiol. 2019) hipokampüsü bıçakla tam ikiye kestiği halde, teta/yavaş dalgalar hiçbir sinaps veya akson olmadan elektrik alanıyla (efaptik) yarığın üzerinden atlar! Sağ: Luca Turin (PNAS 2014) genel anestezide elektron spini değişimi.",
      en: "Left: Dominique Durand (J. Physiol. 2019) severed the hippocampus completely, yet slow/theta waves jumped across the physical gap via electric fields alone (ephaptic coupling). Right: Luca Turin (PNAS 2014) electron-spin shift under general anesthesia."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Ephaptic Coupling and Turin Electron Spin">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Durand 2019 Ephaptic Coupling -->
      <rect x="20" y="22" width="302" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. SİNAPSSIZ EFAPTİK DALGA YAYILIMI (DURAND, 2019)</text>
      <!-- Two severed halves -->
      <rect x="38" y="60" width="106" height="54" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="91" y="84" text-anchor="middle" fill="var(--ink)" font-size="8" font-weight="700">Hipokampüs Parça 1</text>
      <path d="M48 102 Q70 84 92 102 T134 102" fill="none" stroke="var(--good)" stroke-width="1.8"/>

      <line x1="158" y1="52" x2="158" y2="122" stroke="var(--danger)" stroke-width="2.5" stroke-dasharray="4 2"/>
      <text x="158" y="134" text-anchor="middle" fill="var(--danger)" font-size="7.5" font-weight="700">TAM BIÇAK KESİĞİ (Sinaps=0)</text>

      <rect x="172" y="60" width="106" height="54" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="225" y="84" text-anchor="middle" fill="var(--ink)" font-size="8" font-weight="700">Hipokampüs Parça 2</text>
      <path d="M182 102 Q204 84 226 102 T268 102" fill="none" stroke="var(--good)" stroke-width="1.8"/>

      <path d="M138 72 Q158 54 178 72" fill="none" stroke="var(--good)" stroke-width="2"/>
      <text x="32" y="154" fill="var(--good)" font-size="8.2" font-weight="700">• Dalga kesiğin üzerinden elektrik alanıyla atlar (~0.1 m/s)!</text>
      <text x="32" y="168" fill="var(--muted)" font-size="7.8">• Kanıt: Sinaptik blokerler (CNQX/APV) dalgayı durduramaz;</text>
      <text x="32" y="181" fill="var(--muted)" font-size="7.8">  yalnızca ters elektrik alanı uygulandığında dalga durur.</text>

      <!-- Right: Turin 2014 Electron Spin -->
      <rect x="336" y="22" width="304" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="348" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. GENEL ANESTEZİDE ELEKTRON SPİNİ (TURIN, PNAS 2014)</text>
      <text x="348" y="62" fill="var(--ink)" font-size="8.2">• Soru: Kimyasal olarak tamamen asal olan Ksenon (Xe)</text>
      <text x="348" y="75" fill="var(--muted)" font-size="7.9">  gazı hiçbir kovalent bağ kurmadan bilinci nasıl kapatır?</text>
      <text x="348" y="94" fill="var(--accent)" font-size="8.2" font-weight="700">• Deney (Turin, Skoulakis &amp; Horsfield, PNAS 2014):</text>
      <text x="348" y="108" fill="var(--muted)" font-size="7.9">  Canlı Drosophila sinekleri Elektron Paramanyetik Rezonans</text>
      <text x="348" y="121" fill="var(--muted)" font-size="7.9">  (EPR) spektrometresine konup anestezik gaz verildiğinde</text>
      <text x="348" y="134" fill="var(--good)" font-size="8" font-weight="700">  g ≈ 2.003 serbest elektron spin sinyalinde keskin sıçrama!</text>
      <text x="348" y="152" fill="var(--ink)" font-size="8">• Li et al. (Anesthesiology, 2018): Nükleer spini sıfır olan</text>
      <text x="348" y="165" fill="var(--muted)" font-size="7.8">  ¹³²Xe/¹³⁴Xe izotopları, spini 1/2 olan ¹²⁹Xe'den çok daha</text>
      <text x="348" y="178" fill="var(--muted)" font-size="7.8">  güçlü anestezi yapar! → Bilinç kuantum spinine duyarlıdır.</text>
    </svg>`
  },

  "mason-ichthyosis-did-switch": {
    title: {
      tr: "Şekil 21.1: Albert Mason'ın Konjenital İktiyozis Vakası (BMJ, 1952), Ikemi Çift-Kör Dermatit Deneyi ve DID Fizyolojik Geçişleri",
      en: "Figure 21.1: Albert Mason's Congenital Ichthyosis Case (BMJ, 1952), Ikemi Double-Blind Dermatitis & DID Physiological Switches"
    },
    caption: {
      tr: "Derin somnambulik/hipnotik odakta uzuv bazında seçici epigenetik/keratinosit yenilenmesi (Mason 1952), gerçek zehirli sarmaşığın nötr yaprak telkiniyle bloke edilmesi (Ikemi 1962) ve Çoğul Kişilik (DID) hastalarında aynı bedende dakikalar içinde değişen VEP/göz kusuru/alerji yanıtları.",
      en: "Limb-by-limb epigenetic skin clearing under hypnosis (Mason 1952), double-blind poison-ivy suppression (Ikemi 1962), and rapid physiological/optical switches across DID alters."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Mason Ichthyosis and DID Switches">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Col 1: Mason 1952 -->
      <rect x="20" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">1. MASON (BMJ 1952) — İKTİYOZİS</text>
      <text x="32" y="60" fill="var(--ink)" font-size="8">Hastalık: Konjenital İktiyoziform</text>
      <text x="32" y="72" fill="var(--muted)" font-size="7.8">Eritroderma (doğuştan siyah boynuzsu</text>
      <text x="32" y="84" fill="var(--muted)" font-size="7.8">deri; deri greftleri bile reddedilmiş).</text>
      <text x="32" y="102" fill="var(--good)" font-size="8" font-weight="700">Kontrollü Uzuv Protokolü:</text>
      <text x="32" y="116" fill="var(--ink)" font-size="7.8">• Hafta 1: Sadece SOL KOL telkini →</text>
      <text x="32" y="128" fill="var(--good)" font-size="7.8">  5 günde kabuklar döküldü, pembe deri!</text>
      <text x="32" y="142" fill="var(--ink)" font-size="7.8">• Hafta 2–6: Sağ kol → Bacaklar → Sırt</text>
      <text x="32" y="155" fill="var(--muted)" font-size="7.6">  sırayla hedeflendi (%70–90 kalıcı açılma).</text>
      <text x="32" y="174" fill="var(--accent)" font-size="7.6">→ Nöro-epigenetik dermatom hedeflemesi</text>

      <!-- Col 2: Ikemi & Nakagawa 1962 -->
      <rect x="230" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="242" y="42" fill="var(--violet)" font-size="8.8" font-weight="700">2. IKEMI &amp; NAKAGAWA (1962)</text>
      <text x="242" y="60" fill="var(--ink)" font-size="8">Japon Vernik Ağacı (Zehirli Urushiol)</text>
      <text x="242" y="74" fill="var(--muted)" font-size="7.8">13 aşırı alerjik deneğe gözü bağlı test:</text>
      <text x="242" y="94" fill="var(--warn)" font-size="7.9" font-weight="700">• Sağ Kol: Zararsız Kestane Yaprağı</text>
      <text x="242" y="107" fill="var(--muted)" font-size="7.6">  ("Zehirli ağaca değdin" telkini verildi)</text>
      <text x="242" y="119" fill="var(--warn)" font-size="7.8">  → 13 deneğin 13'ünde ağır su toplama!</text>
      <text x="242" y="138" fill="var(--good)" font-size="7.9" font-weight="700">• Sol Kol: Gerçek Zehirli Ağaç!</text>
      <text x="242" y="151" fill="var(--muted)" font-size="7.6">  ("Zararsız kestane yaprağı" dendi)</text>
      <text x="242" y="163" fill="var(--good)" font-size="7.8">  → 13 deneğin 11'inde SIFIR alerji!</text>
      <text x="242" y="180" fill="var(--accent)" font-size="7.6">→ Mast hücresi / IgE kortikal kapısı</text>

      <!-- Col 3: DID Switches -->
      <rect x="440" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="452" y="42" fill="var(--good)" font-size="8.8" font-weight="700">3. DID KİŞİLİK GEÇİŞLERİ (PUTNAM)</text>
      <text x="452" y="60" fill="var(--ink)" font-size="8">Aynı beyin ve aynı DNA içinde</text>
      <text x="452" y="72" fill="var(--ink)" font-size="8">Alter A → Alter B geçişinde (dk içinde):</text>
      <text x="452" y="92" fill="var(--muted)" font-size="7.8">• Görsel Uyarılmış Potansiyel (VEP):</text>
      <text x="452" y="104" fill="var(--ink)" font-size="7.8">  Farklı iki insan kadar ayrışır (Putnam).</text>
      <text x="452" y="120" fill="var(--muted)" font-size="7.8">• Oftalmoloji (Birnbaum &amp; Thomann):</text>
      <text x="452" y="132" fill="var(--ink)" font-size="7.8">  Kornea eğriliği, göz içi basıncı, şaşılık</text>
      <text x="452" y="144" fill="var(--ink)" font-size="7.8">  ve renk körlüğü altere göre değişir!</text>
      <text x="452" y="160" fill="var(--good)" font-size="7.8" font-weight="700">• Strasburger (2015): Psikojenik kör</text>
      <text x="452" y="172" fill="var(--good)" font-size="7.8">  alterde V1 EEG sinyali fiziksel kapanır!</text>
    </svg>`
  },

  "sham-surgery-voodoo-tukdam": {
    title: {
      tr: "Şekil 22.1: Plasebo Cerrahisi (Moseley, NEJM 2002), Vudu Ölümü (Cannon, 1942) ve Tibet Tukdam Araştırması (Davidson, 2021)",
      en: "Figure 22.1: Sham Surgery (Moseley, NEJM 2002), Voodoo Death (Cannon, 1942) & Tibetan Tukdam Research (Davidson, 2021)"
    },
    caption: {
      tr: "İnanç ve derin meditatif durumun üç uç sınırı: (1) Sadece deri kesilip dikilen sahte diz ameliyatının gerçek cerrahi kadar iyileştirmesi; (2) Mutlak ölüm inancının otonom fırtınayla sağlam kalbi durdurması; (3) Tukdam meditasyonunda klinik ölümden sonra günlerce geciken doku bozunması.",
      en: "Three extremes of top-down physiological control: sham knee surgery matching real surgery, lethal autonomic storm in Voodoo death, and delayed post-mortem decomposition in Tukdam."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Sham Surgery Voodoo Death and Tukdam">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Col 1: Sham Surgery -->
      <rect x="20" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="32" y="42" fill="var(--good)" font-size="8.8" font-weight="700">1. PLASEBO CERRAHİSİ (NEJM 2002)</text>
      <text x="32" y="60" fill="var(--ink)" font-size="8">Dr. Bruce Moseley (180 hasta, 2 yıl):</text>
      <text x="32" y="76" fill="var(--muted)" font-size="7.8">• Grup 1: Tam artroskopik kazıma</text>
      <text x="32" y="90" fill="var(--muted)" font-size="7.8">• Grup 2: Yalnızca eklem yıkama</text>
      <text x="32" y="104" fill="var(--good)" font-size="7.9" font-weight="700">• Grup 3 (Sahte Cerrahi): Deriye 3 kesi</text>
      <text x="32" y="117" fill="var(--muted)" font-size="7.6">  atılıp hiçbir kıkırdağa dokunmadan dikildi.</text>
      <text x="32" y="138" fill="var(--ink)" font-size="8" font-weight="700">24 Ay Sonucu (Ağrı &amp; Yürüme):</text>
      <text x="32" y="152" fill="var(--good)" font-size="8">Sahte Cerrahi ≥ Gerçek Ameliyat!</text>
      <text x="32" y="170" fill="var(--muted)" font-size="7.5">(Sihvonen NEJM 2013 menisküs ve</text>
      <text x="32" y="181" fill="var(--muted)" font-size="7.5">Al-Lamee Lancet 2017 anjiyoplasti!)</text>

      <!-- Col 2: Voodoo Death -->
      <rect x="230" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="242" y="42" fill="var(--warn)" font-size="8.8" font-weight="700">2. NOSEBO / VUDU ÖLÜMÜ (1942)</text>
      <text x="242" y="60" fill="var(--ink)" font-size="8">Walter Cannon (Harvard) &amp; Curt Richter:</text>
      <text x="242" y="76" fill="var(--muted)" font-size="7.8">• Mutlak çaresizlik ve ölüm telkini</text>
      <text x="242" y="90" fill="var(--muted)" font-size="7.8">• Faz 1: Aşırı sempatik-adrenalin</text>
      <text x="242" y="103" fill="var(--muted)" font-size="7.8">  fırtınası (kapiller spazm, hipovolemi)</text>
      <text x="242" y="118" fill="var(--warn)" font-size="7.9" font-weight="700">• Faz 2 (Richter, 1957): Parasempatik</text>
      <text x="242" y="131" fill="var(--warn)" font-size="7.8">  Vagal Aşırı-Frenleme → Kalp diyastolde</text>
      <text x="242" y="144" fill="var(--warn)" font-size="7.8">  aniden durur (Asistoli)!</text>
      <text x="242" y="164" fill="var(--ink)" font-size="7.8">• Takotsubo ("Kırık Kalp") Kardiyomiyo-</text>
      <text x="242" y="177" fill="var(--muted)" font-size="7.6">  patisi: Sol ventrikülün akut felci.</text>

      <!-- Col 3: Tukdam -->
      <rect x="440" y="22" width="200" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="452" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">3. TUKDAM (DAVIDSON &amp; LOMAS 2021)</text>
      <text x="452" y="60" fill="var(--ink)" font-size="8">Tibetli ustaların ölüm anı meditasyonu:</text>
      <text x="452" y="76" fill="var(--muted)" font-size="7.8">• Kalp, solunum ve beyin sapı EEG'si</text>
      <text x="452" y="89" fill="var(--muted)" font-size="7.8">  tamamen durduktan (klinik ölüm)</text>
      <text x="452" y="102" fill="var(--good)" font-size="7.9" font-weight="700">  sonra 7–21 gün boyunca rigor mortis,</text>
      <text x="452" y="115" fill="var(--good)" font-size="7.9" font-weight="700">  koku ve çürüme başlamaz!</text>
      <text x="452" y="134" fill="var(--ink)" font-size="7.8">• Lomas, Davidson et al. (Frontiers 2021)</text>
      <text x="452" y="147" fill="var(--muted)" font-size="7.6">  &amp; Medvedev: Ölüm öncesi derin hipoksi-</text>
      <text x="452" y="160" fill="var(--muted)" font-size="7.6">  vagal adaptasyon otoliz enzimlerini ve</text>
      <text x="452" y="173" fill="var(--muted)" font-size="7.6">  hücre zarı yıkımını günlerce kilitler.</text>
    </svg>`
  },

  "uva-dops-birthmark-autopsy": {
    title: {
      tr: "Şekil 23.1: Virginia Üniversitesi (UVa DOPS — Stevenson & Tucker) Doğum İzi – Otopsi Raporu Eşleşmesi ve İstatistiksel Dağılımı",
      en: "Figure 23.1: University of Virginia (UVa DOPS — Stevenson & Tucker) Birthmark-to-Autopsy Correspondence & Statistical Distribution"
    },
    caption: {
      tr: "Ian Stevenson'ın 225 fiziksel anomali vakasında (1997) kurşun giriş (küçük yuvarlak) ve çıkış (büyük düzensiz) yaralarının çocuğun bedenindeki doğum lekeleriyle otopsi raporu bazında milimetrik örtüşmesi ve 2.500+ vakalık CORT veritabanı.",
      en: "Forensic correspondence between small round entry wounds and large irregular exit wounds on autopsy reports and dual birthmarks in Stevenson's 225 biological cases."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="UVa DOPS Birthmark and Autopsy Match">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Autopsy vs Birthmark Diagram -->
      <rect x="20" y="22" width="305" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. ÇİFT YARA (GİRİŞ / ÇIKIŞ) OTOPSİ EŞLEŞMESİ</text>
      <!-- Head/Body outline 1: Autopsy -->
      <circle cx="95" cy="95" r="28" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
      <circle cx="76" cy="90" r="3.5" fill="var(--warn)"/>
      <text x="95" y="138" text-anchor="middle" fill="var(--ink)" font-size="8" font-weight="700">1. Otopsi Raporu</text>
      <text x="95" y="150" text-anchor="middle" fill="var(--muted)" font-size="7.5">Küçük Giriş Yarası (Sol)</text>
      <path d="M 114,82 L 124,78 L 121,90 L 126,96 L 113,94 Z" fill="var(--warn)"/>
      <text x="95" y="162" text-anchor="middle" fill="var(--warn)" font-size="7.5">Büyük Çıkış Yarası (Sağ)</text>
      <!-- Arrow -->
      <line x1="145" y1="95" x2="188" y2="95" stroke="var(--accent)" stroke-width="2"/>
      <text x="166" y="86" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">Birebir</text>
      <!-- Head/Body outline 2: Child Birthmarks -->
      <circle cx="235" cy="95" r="28" fill="none" stroke="var(--good)" stroke-width="1.5"/>
      <circle cx="216" cy="90" r="3.5" fill="var(--good)"/>
      <path d="M 254,82 L 264,78 L 261,90 L 266,96 L 253,94 Z" fill="var(--good)"/>
      <text x="235" y="138" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">2. Çocukta Doğum Lekesi</text>
      <text x="235" y="150" text-anchor="middle" fill="var(--muted)" font-size="7.5">18 vakada giriş + çıkış</text>
      <text x="235" y="162" text-anchor="middle" fill="var(--muted)" font-size="7.5">asimetrileri tam eşleşti!</text>
      <text x="32" y="184" fill="var(--ink)" font-size="7.8">• Ortak rassal olasılık (2 leke × 160 bölge): p = (1/160)² = 1 / 25.600</text>

      <!-- Right: UVa DOPS Statistics -->
      <rect x="338" y="22" width="302" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="350" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. 2.500+ VAKALIK UVa DOPS VERİTABANI ÖRÜNTÜSÜ</text>
      <text x="350" y="62" fill="var(--ink)" font-size="8.2">• Konuşma Başlangıcı: Ortalama 28–35 aylıkken</text>
      <text x="350" y="76" fill="var(--ink)" font-size="8.2">• Unutma Yaşı: 6–8 yaşında (%90 doğal silinme)</text>
      <text x="350" y="90" fill="var(--muted)" font-size="7.8">  (Tam DMN ve sol-yarıküre otobiyografik filtre kapanışı!)</text>
      <text x="350" y="108" fill="var(--warn)" font-size="8.2" font-weight="700">• Şiddetli / Ani Ölüm Oranı: %70+ (Normal toplumda %8)</text>
      <text x="350" y="122" fill="var(--good)" font-size="8.2" font-weight="700">• Tıbbi Belge/Otopsi Doğrulaması: 49 vakada resmi</text>
      <text x="350" y="135" fill="var(--muted)" font-size="7.8">  hastane/otopsi kaydıyla %88 anatomik örtüşme.</text>
      <text x="350" y="153" fill="var(--accent)" font-size="8" font-weight="700">• Keil &amp; Tucker (2005): Çocuk doğmadan ÖNCE</text>
      <text x="350" y="166" fill="var(--muted)" font-size="7.8">  ifadelerin yazılı kaydedildiği vakalarda da doğrulama!</text>
      <text x="350" y="182" fill="var(--ink)" font-size="7.8">• Fobi Aktarımı: Suda boğulanların %82'sinde su fobisi.</text>
    </svg>`
  },

  "terminal-lucidity-lorber-hydrocephalus": {
    title: {
      tr: "Şekil 24.1: Terminal Berraklık (Nahm, 2012) ve %90–95 Hidrosefali Vakaları (Lorber, Science 1980; Feuillet, Lancet 2007)",
      en: "Figure 24.1: Terminal Lucidity (Nahm, 2012) and 90–95% Hydrocephalus Cases (Lorber, Science 1980; Feuillet, Lancet 2007)"
    },
    caption: {
      tr: "Klasik nörobilimin en büyük iki paradoksu: (Sol) Ağır Alzheimer/beyin tümörü hastalarında ölümden saatler önce tüm hafızanın ve konuşmanın aniden geri gelmesi; (Sağ) Kafatasının %90–95'i beyin-omurilik sıvısıyla dolu olduğu halde IQ=126 matematik onur öğrencisi olan bireyler.",
      en: "Two major paradoxes for strict localizationism: sudden return of full cognition hours before death in destroyed brains, and high-IQ functioning despite 90–95% hydrocephalic cortical loss."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Terminal Lucidity and Lorber Hydrocephalus">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Terminal Lucidity Curve -->
      <rect x="20" y="22" width="305" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. TERMİNAL BERRAKLIK (NAHM &amp; GREYSON, 2012)</text>
      <line x1="42" y1="158" x2="306" y2="158" stroke="var(--muted)" stroke-width="1.2"/>
      <line x1="42" y1="58" x2="42" y2="158" stroke="var(--muted)" stroke-width="1.2"/>
      <text x="48" y="68" fill="var(--muted)" font-size="7.5">Biliş / Hafıza</text>
      <!-- Alzheimer decline + terminal spike -->
      <path d="M 45,70 Q 110,145 190,152 L 245,153 L 262,64 L 278,64 L 290,158" fill="none" stroke="var(--good)" stroke-width="2.5"/>
      <circle cx="270" cy="64" r="5" fill="var(--good)"/>
      <text x="135" y="138" text-anchor="middle" fill="var(--muted)" font-size="7.8">Yıllarca Ağır Demans / Afazi</text>
      <text x="266" y="55" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Terminal Berraklık!</text>
      <text x="42" y="176" fill="var(--ink)" font-size="7.8">• Vakaların %84'ü ölümden &lt;7 gün önce (%43'ü son 24 saatte)</text>
      <text x="42" y="189" fill="var(--muted)" font-size="7.6">• Sinapslar çürümüşken hafıza/kimlik aniden %100 geri döner!</text>

      <!-- Right: Lorber Hydrocephalus -->
      <rect x="338" y="22" width="302" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="350" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. LORBER (SCIENCE 1980) &amp; FEUILLET (LANCET 2007)</text>
      <!-- Normal vs Hydrocephalus Brain scans -->
      <circle cx="405" cy="105" r="36" fill="var(--violet)" fill-opacity="0.35" stroke="var(--violet)" stroke-width="2"/>
      <circle cx="405" cy="105" r="8" fill="var(--surface)"/>
      <text x="405" y="154" text-anchor="middle" fill="var(--ink)" font-size="7.8" font-weight="700">Normal Beyin (~1400 g)</text>
      <text x="405" y="166" text-anchor="middle" fill="var(--muted)" font-size="7.4">45 mm korteks kalınlığı</text>

      <circle cx="545" cy="105" r="36" fill="var(--surface)" stroke="var(--good)" stroke-width="3.5"/>
      <circle cx="545" cy="105" r="32" fill="var(--accent)" fill-opacity="0.18"/>
      <text x="545" y="102" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">%95 BOS</text>
      <text x="545" y="114" text-anchor="middle" fill="var(--good)" font-size="7.5">1 mm zar!</text>
      <text x="545" y="154" text-anchor="middle" fill="var(--good)" font-size="7.8" font-weight="700">Sheffield Öğrencisi (~50–150 g)</text>
      <text x="545" y="166" text-anchor="middle" fill="var(--good)" font-size="7.5">IQ = 126 · Matematik Onur Mezunu!</text>
      <text x="350" y="186" fill="var(--ink)" font-size="7.8">→ Ventrikül BOS akışkan kavitesi + ince kortikal zar yeterli!</text>
    </svg>`
  },

  "aware-nde-sde-timeline": {
    title: {
      tr: "Şekil 25.1: Kardiyak Arrest (AWARE I–II, Parnia 2014/2023) Zaman Çizelgesi ve Ölüm Anı Gama/Teta Patlaması (Borjigin, PNAS 2023)",
      en: "Figure 25.1: Cardiac Arrest Timeline (AWARE I–II, Parnia 2014/2023) & Dying-Brain Gamma/Theta Surge (Borjigin, PNAS 2023)"
    },
    caption: {
      tr: "Kalp durduktan (VF/Asistoli) 20–30 saniye sonra kortikal EEG düz çizgiye (izoelektrik) inmesine rağmen, AWARE çalışmasında 3 dakikalık periyotta doğrulanmış görsel-işitsel farkındalık ve Borjigin'in kaydettiği ölüm anı hiper-koherent gama/teta patlaması.",
      en: "Verified 3-minute conscious recall during flatline cardiac arrest in AWARE I alongside Borjigin's (PNAS 2013/2023) paradoxical hyper-coherent gamma/theta surge at clinical death."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="AWARE NDE Cardiac Arrest Timeline">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="24" y="30" fill="var(--accent)" font-size="9.5" font-weight="700">KARDİYAK ARREST (KALP DURMASI) VE ÖLÜME YAKIN DENEYİM (NDE) FİZYOLOJİK ZAMAN ÇİZELGESİ</text>
      <!-- Timeline Axis -->
      <line x1="30" y1="115" x2="630" y2="115" stroke="var(--ink)" stroke-width="1.8"/>
      <!-- T = 0s -->
      <circle cx="55" cy="115" r="5" fill="var(--warn)"/>
      <text x="55" y="134" text-anchor="middle" fill="var(--warn)" font-size="8.2" font-weight="700">t = 0 sn</text>
      <text x="55" y="147" text-anchor="middle" fill="var(--ink)" font-size="7.8">Kalp Durması (VF)</text>
      <text x="55" y="159" text-anchor="middle" fill="var(--muted)" font-size="7.4">Kan akışı = 0</text>

      <!-- T = 20s -->
      <circle cx="195" cy="115" r="5" fill="var(--violet)"/>
      <text x="195" y="134" text-anchor="middle" fill="var(--violet)" font-size="8.2" font-weight="700">t = 15–30 sn</text>
      <text x="195" y="147" text-anchor="middle" fill="var(--ink)" font-size="7.8">İzoelektrik Düz EEG</text>
      <text x="195" y="159" text-anchor="middle" fill="var(--muted)" font-size="7.4">Kornea refleksi yok</text>
      <!-- Borjigin Gamma Surge box above -->
      <rect x="125" y="44" width="165" height="54" rx="7" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="207" y="61" text-anchor="middle" fill="var(--violet)" font-size="8" font-weight="700">Borjigin (PNAS 2013 &amp; 2023):</text>
      <text x="207" y="74" text-anchor="middle" fill="var(--ink)" font-size="7.6">Teta–Gama (25–150 Hz) Hiper-</text>
      <text x="207" y="86" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">Koherans Patlaması (TPO Kavşağı)!</text>

      <!-- T = 1 to 3 min (AWARE Case) -->
      <circle cx="395" cy="115" r="6" fill="var(--good)"/>
      <rect x="305" y="44" width="185" height="54" rx="7" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="397" y="61" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">AWARE I (Parnia, 2014) Vakası:</text>
      <text x="397" y="74" text-anchor="middle" fill="var(--ink)" font-size="7.6">AED cihazının 2 bip sesi arası</text>
      <text x="397" y="86" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">3 DAKİKA doğrulanmış gözlem!</text>
      <text x="395" y="134" text-anchor="middle" fill="var(--good)" font-size="8.2" font-weight="700">t = 1–5 dakika</text>
      <text x="395" y="147" text-anchor="middle" fill="var(--ink)" font-size="7.8">Tam NDE / OBE Anlatısı</text>
      <text x="395" y="159" text-anchor="middle" fill="var(--muted)" font-size="7.4">Zaman genişlemesi &amp; 360° algı</text>

      <!-- Shared Death Experience -->
      <circle cx="565" cy="115" r="5" fill="var(--accent)"/>
      <rect x="502" y="44" width="138" height="54" rx="7" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="571" y="61" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">Paylaşılan Ölüm (SDE):</text>
      <text x="571" y="74" text-anchor="middle" fill="var(--ink)" font-size="7.5">Sağlıklı/oksijenli yakınların</text>
      <text x="571" y="86" text-anchor="middle" fill="var(--good)" font-size="7.5" font-weight="700">aynı vizyonu görmesi!</text>
      <text x="565" y="134" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">Peak in Darien</text>
      <text x="565" y="147" text-anchor="middle" fill="var(--muted)" font-size="7.4">Hipoksi argümanını aşan</text>
      <text x="565" y="159" text-anchor="middle" fill="var(--muted)" font-size="7.4">bilinmeyen ölüm vakaları</text>

      <text x="30" y="192" fill="var(--ink)" font-size="8">• van Lommel (Lancet, 2001 — 344 hasta): NDE derinliği verilen ilaçlardan, hipoksi süresinden ve ölüm korkusundan BAĞIMSIZDIR!</text>
    </svg>`
  },

  "telepathy-pioneers-sinclair-berger": {
    title: {
      tr: "Şekil 26.1: Bilim Öncülerinin Telepati Araştırmaları (Berger, Turing, Richet, Einstein–Sinclair) ve Warcollier'nin Gestalt Parçalanma Yasası",
      en: "Figure 26.1: Telepathy Research by Science Pioneers (Berger, Turing, Richet, Einstein–Sinclair) & Warcollier's Gestalt Law"
    },
    caption: {
      tr: "EEG'nin (Berger 1924), istatistiksel kör testin (Richet 1884) ve yapay zekâ testinin (Turing 1950) doğrudan telepati araştırmalarından doğması; sağda ise Upton Sinclair ve René Warcollier'nin çizim deneylerinde keşfettiği Sağ-Yarıküre Gestalt/Sembolik Bozulma yasası.",
      en: "How EEG (Berger 1924), randomized probability testing (Richet 1884), and Turing's 1950 paper emerged from telepathy research, alongside Sinclair & Warcollier's drawing experiments."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Telepathy Pioneers and Warcollier Gestalt">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Science Pioneers Table -->
      <rect x="20" y="22" width="320" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. MODERN BİLİMİ DOĞURAN TELEPATİ ÖNCÜLERİ</text>
      <text x="32" y="62" fill="var(--ink)" font-size="8" font-weight="700">1. Charles Richet (Nobel Tıp 1913):</text>
      <text x="32" y="75" fill="var(--muted)" font-size="7.7">   1884'te bilimde ilk olasılık hesabını telepati kartlarında kullandı!</text>
      <text x="32" y="93" fill="var(--ink)" font-size="8" font-weight="700">2. Hans Berger (EEG'nin Mucidi, 1924):</text>
      <text x="32" y="106" fill="var(--muted)" font-size="7.7">   1893'te kız kardeşiyle yaşadığı kriz-telepatisinin fiziksel dalgasını</text>
      <text x="32" y="118" fill="var(--muted)" font-size="7.7">   bulmak için 30 yıl çalışıp Alfa/Beta EEG dalgalarını keşfetti!</text>
      <text x="32" y="136" fill="var(--ink)" font-size="8" font-weight="700">3. Albert Einstein &amp; Upton Sinclair (Mental Radio, 1930):</text>
      <text x="32" y="149" fill="var(--muted)" font-size="7.7">   290 çizim testinde %23 tam + %53 kısmi isabet; önsöz Einstein'dan!</text>
      <text x="32" y="167" fill="var(--good)" font-size="8" font-weight="700">4. Alan Turing (Mind, 1950 — Yapay Zekâ Makalesi):</text>
      <text x="32" y="180" fill="var(--muted)" font-size="7.7">   "Telepati için istatistiksel kanıtlar kahir ekseriyetle güçlüdür!"</text>

      <!-- Right: Sinclair / Warcollier Drawing Law -->
      <rect x="352" y="22" width="288" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="364" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. SINCLAIR &amp; WARCOLLIER ÇİZİM KANUNU</text>
      <text x="364" y="58" fill="var(--muted)" font-size="7.8">Zihin "kelimeyi" değil, ham GEOMETRİK FORMU alır,</text>
      <text x="364" y="70" fill="var(--muted)" font-size="7.8">sol yarıküre ise üzerine yanlış isim (AOL) yapıştırır:</text>
      <!-- Target drawing -->
      <rect x="372" y="84" width="112" height="72" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
      <circle cx="428" cy="112" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <line x1="406" y1="112" x2="450" y2="112" stroke="var(--accent)" stroke-width="1.5"/>
      <line x1="428" y1="90" x2="428" y2="134" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="428" y="149" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">Hedef: Pusula / Dümen</text>

      <!-- Receiver drawing -->
      <rect x="510" y="84" width="112" height="72" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <circle cx="566" cy="112" r="14" fill="none" stroke="var(--good)" stroke-width="2" stroke-dasharray="4 2"/>
      <line x1="544" y1="112" x2="588" y2="112" stroke="var(--good)" stroke-width="1.5"/>
      <line x1="566" y1="90" x2="566" y2="134" stroke="var(--good)" stroke-width="1.5"/>
      <text x="566" y="149" text-anchor="middle" fill="var(--good)" font-size="7.5" font-weight="700">Alıcı: "Dilimli Elma?"</text>

      <text x="364" y="175" fill="var(--ink)" font-size="7.8">→ Sağ Yarıküre şekli %100 doğru çizer; Sol Yarıküre</text>
      <text x="364" y="187" fill="var(--good)" font-size="7.8" font-weight="700">   (Analitik Kaplama — AOL) yanlış isimlendirir!</text>
    </svg>`
  },

  "stargate-sri-remote-viewing": {
    title: {
      tr: "Şekil 27.1: SRI / Stargate Uzaktan Görü (CRV) Sinyal-Gürültü Ayrıştırma Mimarisi ve Edwin May'in Entropi Gradyanı (ΔS)",
      en: "Figure 27.1: SRI / Stargate Coordinate Remote Viewing (CRV) Signal-to-AOL Architecture & Edwin May's Entropy Gradient (ΔS)"
    },
    caption: {
      tr: "Ingo Swann ve Hal Puthoff'un (SRI, 1972–1985) geliştirdiği 6 Aşamalı CRV protokolü: Sağ yarıkürenin ilk 1.5 saniyede aldığı ham İdeogram/Duyusal Sinyali sol yarıkürenin Analitik Kaplama (AOL — tahmin/hayal) gürültüsünden fiziksel olarak ayırma.",
      en: "Ingo Swann and Hal Puthoff's 6-Stage CRV protocol separating right-hemisphere raw sensory/ideogram signal in the first 1.5 s from left-hemisphere Analytical Overlay (AOL)."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Stargate SRI Remote Viewing Architecture">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: CRV Stages 1-6 vs AOL -->
      <rect x="20" y="22" width="355" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. INGO SWANN &amp; PUTHOFF CRV AŞAMALARI (SİNYAL vs. AOL)</text>
      <!-- Timeline of 2 seconds -->
      <rect x="34" y="54" width="160" height="58" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="44" y="70" fill="var(--good)" font-size="8.2" font-weight="700">t = 0.0 – 1.5 sn (SAĞ YARIKÜRE)</text>
      <text x="44" y="84" fill="var(--ink)" font-size="7.8">• Aşama 1: Otonom İdeogram</text>
      <text x="44" y="96" fill="var(--ink)" font-size="7.8">• Aşama 2: Ham Duyular (Soğuk,</text>
      <text x="44" y="107" fill="var(--muted)" font-size="7.5">  metalik, dikey, uğultulu, sarı)</text>

      <rect x="204" y="54" width="158" height="58" rx="6" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="214" y="70" fill="var(--warn)" font-size="8.2" font-weight="700">t &gt; 1.5 sn (SOL YARIKÜRE TUZAĞI)</text>
      <text x="214" y="84" fill="var(--warn)" font-size="7.8">• Analitik Kaplama (AOL):</text>
      <text x="214" y="96" fill="var(--muted)" font-size="7.6">  "Soğuk + dikey + metalik =</text>
      <text x="214" y="107" fill="var(--warn)" font-size="7.6">  Kesin Eyfel Kulesi!" (YANLIŞ!)</text>

      <text x="34" y="132" fill="var(--good)" font-size="8" font-weight="700">• CRV Kuralı: İsim koymak YASAKTIR! Sadece sıfat ve çizim</text>
      <text x="34" y="146" fill="var(--ink)" font-size="7.8">  (Aşama 3–4 Boyutsal Eskiz); AOL gelirse kağıdın sağ kenarına</text>
      <text x="34" y="159" fill="var(--ink)" font-size="7.8">  "AOL Break" yazılıp sol yarıküre tampon belleği boşaltılır!</text>
      <text x="34" y="178" fill="var(--accent)" font-size="7.8">• Pat Price (Semipalatinsk 1974) &amp; McMoneagle (Typhoon Denizaltısı)</text>

      <!-- Right: Edwin May Entropy Gradient -->
      <rect x="387" y="22" width="253" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="399" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. EDWIN MAY: ENTROPİ GRADYANI (ΔS)</text>
      <text x="399" y="60" fill="var(--ink)" font-size="8">SAIC / SRI fizikçisi Dr. Edwin May'in</text>
      <text x="399" y="73" fill="var(--ink)" font-size="8">keşfi: Uzaktan görü "statik bilgiyi" değil,</text>
      <text x="399" y="86" fill="var(--good)" font-size="8" font-weight="700">Termodinamik / Shannon Entropi</text>
      <text x="399" y="99" fill="var(--good)" font-size="8" font-weight="700">Değişimini (∇S) en güçlü algılar!</text>
      <text x="399" y="118" fill="var(--muted)" font-size="7.8">• Tıpkı göz retinasının sabit ışığa kör</text>
      <text x="399" y="131" fill="var(--muted)" font-size="7.8">  olup yalnızca kontrast sınırlarını (∇I)</text>
      <text x="399" y="144" fill="var(--muted)" font-size="7.8">  görmesi gibi, yerel-olmayan algı da</text>
      <text x="399" y="157" fill="var(--ink)" font-size="7.8">  yüksek enerji/entropi gradyanına sahip</text>
      <text x="399" y="170" fill="var(--ink)" font-size="7.8">  hedeflerde (nükleer reaktör, şelale, roket)</text>
      <text x="399" y="183" fill="var(--good)" font-size="7.8" font-weight="700">  3 kat daha yüksek etki büyüklüğü verir!</text>
    </svg>`
  },

  "utts-hyman-ganzfeld-pear": {
    title: {
      tr: "Şekil 28.1: Ganzfeld Meta-Analiz İsabet Oranları (Honorton, Bem, Storm 1974–2020) ve Princeton PEAR / GCP Kümülatif Sapma Eğrisi",
      en: "Figure 28.1: Ganzfeld Meta-Analysis Hit Rates (Honorton, Bem, Storm 1974–2020) & Princeton PEAR / GCP Cumulative Deviation"
    },
    caption: {
      tr: "Sol: 4 seçenekli Ganzfeld deneylerinde %25 şans beklentisine karşı genel popülasyon (%32, p < 10⁻¹¹) ve sanatçı/meditasyoncu grupların (%41–50) isabet oranları. Sağ: Princeton PEAR laboratuvarında insan niyetinin rastgele olay üreteci (REG) üzerinde ürettiği kümülatif Z sapması.",
      en: "Left: Ganzfeld 4-choice hit rates vs. 25% chance across general (~32%) and artistic/meditative cohorts (41–50%). Right: Princeton PEAR cumulative Z-deviation under High/Low intention."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Ganzfeld Meta-Analysis and PEAR Curve">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Ganzfeld Hit Rate Bars -->
      <rect x="20" y="22" width="310" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. GANZFELD İSABET ORANLARI (%25 ŞANS BEKLENTİSİ)</text>
      <!-- 25% Chance dashed line -->
      <line x1="40" y1="142" x2="314" y2="142" stroke="var(--warn)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="275" y="137" fill="var(--warn)" font-size="7.5" font-weight="700">%25 Şans</text>
      <!-- Bar 1: Chance -->
      <rect x="52" y="142" width="44" height="36" fill="var(--muted)" fill-opacity="0.4"/>
      <text x="74" y="136" text-anchor="middle" fill="var(--muted)" font-size="8">%25.0</text>
      <text x="74" y="190" text-anchor="middle" fill="var(--muted)" font-size="7.5">Beklenti</text>
      <!-- Bar 2: All Ganzfeld (32%) -->
      <rect x="122" y="122" width="44" height="56" fill="var(--accent)"/>
      <text x="144" y="116" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">%32.2</text>
      <text x="144" y="190" text-anchor="middle" fill="var(--ink)" font-size="7.5">Genel (4000+)</text>
      <!-- Bar 3: Meditators / Artists (41%) -->
      <rect x="192" y="96" width="44" height="82" fill="var(--violet)"/>
      <text x="214" y="90" text-anchor="middle" fill="var(--violet)" font-size="8" font-weight="700">%41.4</text>
      <text x="214" y="190" text-anchor="middle" fill="var(--ink)" font-size="7.5">Meditasyoncu</text>
      <!-- Bar 4: Juilliard / Edinburgh Artists (48%) -->
      <rect x="260" y="76" width="44" height="102" fill="var(--good)"/>
      <text x="282" y="70" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">%47.8</text>
      <text x="282" y="190" text-anchor="middle" fill="var(--good)" font-size="7.5">Juilliard Sanat</text>

      <!-- Right: PEAR / GCP Cumulative Z Curve -->
      <rect x="342" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="354" y="42" fill="var(--good)" font-size="9" font-weight="700">B. PRINCETON PEAR (JAHN &amp; DUNNE) &amp; GCP</text>
      <!-- Zero Baseline -->
      <line x1="364" y1="118" x2="622" y2="118" stroke="var(--muted)" stroke-width="1.2"/>
      <!-- 95% parabola envelope -->
      <path d="M 364,118 Q 480,82 620,72" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"/>
      <path d="M 364,118 Q 480,154 620,164" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"/>
      <!-- High Intention (HI) -->
      <path d="M 364,118 Q 440,100 520,78 T 620,54" fill="none" stroke="var(--good)" stroke-width="2.3"/>
      <text x="580" y="50" fill="var(--good)" font-size="7.8" font-weight="700">HI (Yüksek Niyet)</text>
      <!-- Baseline (BL) -->
      <path d="M 364,118 Q 450,122 530,115 T 620,119" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
      <!-- Low Intention (LO) -->
      <path d="M 364,118 Q 440,136 520,154 T 620,174" fill="none" stroke="var(--accent)" stroke-width="2.3"/>
      <text x="580" y="186" fill="var(--accent)" font-size="7.8" font-weight="700">LO (Düşük Niyet)</text>
      <text x="354" y="193" fill="var(--muted)" font-size="7.4">GCP (1998–2015, 500 olay): Z = 7.31 (p ≈ 1.3 × 10⁻¹³)</text>
    </svg>`
  },

  "maimonides-paller-lucid-dream": {
    title: {
      tr: "Şekil 29.1: Maimonides REM Rüya Telepatisi (Ullman & Krippner) ve 2021 Çift-Yönlü Gerçek Zamanlı Lüsid Rüya İletişimi (Paller & Konkoly, Current Biology 2021)",
      en: "Figure 29.1: Maimonides REM Dream Telepathy & 2021 Real-Time Two-Way Lucid Dream Communication (Paller & Konkoly, Current Biology 2021)"
    },
    caption: {
      tr: "Sol: Maimonides Tıp Merkezi'nde REM uykusu sırasında gönderilen görsel hedeflerin kör hakem eşleştirmesi. Sağ: 2021'de 4 uluslararası laboratuvarda REM uykusundaki lüsid rüyacıya sorulan matematik sorularına göz hareketleriyle (EOG: Sol-Sağ-Sol-Sağ) verilen canlı doğru yanıtlar.",
      en: "Left: Maimonides REM dream telepathy protocol. Right: Paller & Konkoly's (2021) four-lab real-time dialogue with lucid dreamers answering math problems via EOG eye signals during REM."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Maimonides and 2021 Lucid Dream Communication">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Maimonides Dream Lab -->
      <rect x="20" y="22" width="302" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="42" fill="var(--violet)" font-size="9" font-weight="700">A. MAIMONIDES RÜYA LABORATUVARI (1962–1978)</text>
      <text x="32" y="60" fill="var(--ink)" font-size="8">Dr. Montague Ullman &amp; Stanley Krippner:</text>
      <text x="32" y="76" fill="var(--muted)" font-size="7.8">1. Alıcı ses geçirmez odada uyur; EEG/EOG ile</text>
      <text x="32" y="89" fill="var(--muted)" font-size="7.8">   REM rüya evresine girdiği an tespit edilir.</text>
      <text x="32" y="104" fill="var(--muted)" font-size="7.8">2. Uzak odadaki gönderici rastgele seçilen sanat</text>
      <text x="32" y="117" fill="var(--muted)" font-size="7.8">   tablosuna (veya multisensör kutuya) odaklanır.</text>
      <text x="32" y="132" fill="var(--muted)" font-size="7.8">3. REM bitiminde denek uyandırılıp rüyası kaydedilir.</text>
      <text x="32" y="152" fill="var(--good)" font-size="8" font-weight="700">• 450 Gece Meta-Analizi (Sherwood &amp; Roe, 2003):</text>
      <text x="32" y="166" fill="var(--good)" font-size="8">  %63 isabet (Şans = %50, p &lt; 10⁻⁶)!</text>
      <text x="32" y="182" fill="var(--ink)" font-size="7.6">• Jeomanyetik sakin gecelerde (Kp &lt; 2) başarı zirvede!</text>

      <!-- Right: 2021 Paller & Konkoly Current Biology -->
      <rect x="334" y="22" width="306" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="346" y="42" fill="var(--good)" font-size="9" font-weight="700">B. 2021 ÇİFT-YÖNLÜ LÜSİD RÜYA İLETİŞİMİ (CELL / CUR. BIOL.)</text>
      <text x="346" y="60" fill="var(--ink)" font-size="8">Northwestern, Sorbonne, Osnabrück &amp; Radboud Üniv.:</text>
      <!-- Signal lines -->
      <rect x="348" y="70" width="278" height="72" rx="6" fill="var(--surface)" stroke="var(--line)"/>
      <text x="358" y="86" fill="var(--accent)" font-size="7.8" font-weight="700">1. Deneyci Sesi (Dışarıdan): "Sekiz eksi altı kaçtır? (8 − 6 = ?)"</text>
      <text x="358" y="102" fill="var(--violet)" font-size="7.8" font-weight="700">2. EEG (Alfa/Teta/Gama): Denek %100 REM uykusunda!</text>
      <text x="358" y="118" fill="var(--good)" font-size="7.8" font-weight="700">3. EOG (Göz Kasları — Felçli Olmayan Tek Kanal!):</text>
      <path d="M 364,132 L 385,132 L 392,123 L 400,139 L 408,123 L 416,139 L 424,132 L 600,132" fill="none" stroke="var(--good)" stroke-width="2"/>
      <text x="495" y="129" fill="var(--good)" font-size="7.6" font-weight="700">Sol-Sağ × 2 kez ("Cevap = 2"!)</text>
      <text x="346" y="158" fill="var(--ink)" font-size="7.8">• 36 denekte 158 sorgu: %18.4 tam doğru gerçek-zamanlı yanıt!</text>
      <text x="346" y="172" fill="var(--good)" font-size="7.8" font-weight="700">• Focus 10/21 "Zihin Uyanık – Beden Uykuda" durumunun</text>
      <text x="346" y="185" fill="var(--good)" font-size="7.8" font-weight="700">  nörobilimde %100 kanıtlanmış laboratuvar karşılığı!</text>
    </svg>`
  },

  "twin-telepathy-microchimerism-sheldrake": {
    title: {
      tr: "Şekil 30.1: İkiz Telepatisi (Duane & Behrendt, Science 1965), Beyin Mikrokimerizmi ve Sheldrake–Wiseman 'Jaytee' Zaman Serisi",
      en: "Figure 30.1: Twin Telepathy (Duane & Behrendt, Science 1965), Brain Microchimerism & Sheldrake–Wiseman 'Jaytee' Time Series"
    },
    caption: {
      tr: "Sol: Science (1965) dergisinde yayımlanan tek yumurta ikizleri arası uzaktan Alfa EEG indüksiyonu ve anne-bebek/ikiz beyin mikrokimerizmi (Chan 2012). Sağ: Rupert Sheldrake ve şüpheci Richard Wiseman'ın aynı köpek (Jaytee) üzerinde kaydettiği özdeş pencere-bekleme eğrisi.",
      en: "Left: Duane & Behrendt's (Science 1965) remote alpha-EEG induction in identical twins and brain microchimerism. Right: Identical window-waiting curves recorded by both Sheldrake and skeptic Wiseman."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Twin Telepathy Microchimerism and Sheldrake">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Science 1965 Twin EEG & Microchimerism -->
      <rect x="20" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. İKİZ TELEPATİSİ (SCIENCE, 1965) &amp; MİKROKİMERİZM</text>
      <text x="32" y="60" fill="var(--ink)" font-size="8" font-weight="700">1. Duane &amp; Behrendt (Science, 150, 367 — 1965):</text>
      <text x="32" y="74" fill="var(--muted)" font-size="7.8">• 15 çift tek yumurta ikizi, tamamen ayrı odalarda.</text>
      <text x="32" y="87" fill="var(--muted)" font-size="7.8">• İkiz A gözlerini kapattığında (veya ışıklı uyarı aldığında)</text>
      <text x="32" y="100" fill="var(--good)" font-size="7.8" font-weight="700">  diğer odadaki İkiz B'nin gözleri AÇIK olduğu halde</text>
      <text x="32" y="113" fill="var(--good)" font-size="7.8" font-weight="700">  beyninde eşzamanlı Alfa (8–12 Hz) patlaması oluştu!</text>
      <text x="32" y="133" fill="var(--violet)" font-size="8" font-weight="700">2. Beyin Mikrokimerizmi (Chan et al., PLoS ONE 2012):</text>
      <text x="32" y="147" fill="var(--muted)" font-size="7.8">• Anne karnında ikizler arasında ve bebeğin kök hücrelerinden</text>
      <text x="32" y="160" fill="var(--muted)" font-size="7.8">  annenin beynine (kan-beyin bariyerini geçerek!) canlı</text>
      <text x="32" y="173" fill="var(--ink)" font-size="7.8">  nöronlar yerleşir ve 50+ yıl boyunca annenin beyninde</text>
      <text x="32" y="186" fill="var(--good)" font-size="7.8" font-weight="700">  çocuğun %100 genetik ikiz nöronları ateşlemeye devam eder!</text>

      <!-- Right: Sheldrake vs Wiseman Jaytee Plot -->
      <rect x="340" y="22" width="300" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="352" y="42" fill="var(--good)" font-size="9" font-weight="700">B. SHELDRAKE vs. WISEMAN ("JAYTEE" VERİSİ, 1998)</text>
      <text x="352" y="57" fill="var(--muted)" font-size="7.6">Sahibi Pam rastgele saatte eve dönmeye karar verdiğinde</text>
      <text x="352" y="69" fill="var(--muted)" font-size="7.6">köpek Jaytee'nin pencerede bekleme süresi (% zaman):</text>
      <!-- Axes -->
      <line x1="368" y1="158" x2="620" y2="158" stroke="var(--muted)" stroke-width="1.2"/>
      <line x1="368" y1="82" x2="368" y2="158" stroke="var(--muted)" stroke-width="1.2"/>
      <!-- Sheldrake curve -->
      <path d="M 380,152 L 450,149 L 510,144 L 565,92 L 605,86" fill="none" stroke="var(--good)" stroke-width="2.3"/>
      <!-- Wiseman curve (identical!) -->
      <path d="M 380,154 L 450,150 L 510,147 L 565,96 L 605,90" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="415" y="171" text-anchor="middle" fill="var(--muted)" font-size="7.3">Yolculuk Öncesi (%4)</text>
      <text x="580" y="171" text-anchor="middle" fill="var(--good)" font-size="7.3" font-weight="700">Eve Dönüş Kararı (%55–78!)</text>
      <text x="352" y="188" fill="var(--ink)" font-size="7.6">→ Şüpheci Wiseman'ın kendi kamerası da aynı sıçramayı kaydetti!</text>
    </svg>`
  },

  "myers-subliminal-cross-correspondences": {
    title: {
      tr: "Şekil 31.1: Frederic Myers'ın Eşik-Altı Benlik (Subliminal Self) Spektrumu ve 30 Yıllık 'Çapraz-Yazışmalar' (Cross-Correspondences) Şifrelemesi",
      en: "Figure 31.1: Frederic Myers's Subliminal Self Spectrum & the 30-Year 'Cross-Correspondences' Distributed Cipher"
    },
    caption: {
      tr: "Sol: Myers'ın (1903) uyanık egoyu yalnızca dar bir 'görünür spektrum' (Supraliminal) olarak tanımlayan, kızılötesi (somatik) ve morötesi (transpersonel) uçları içeren bilinç modeli. Sağ: 1901–1932 arasında 3 kıtadaki 4 ayrı otomatistin aldığı anlamsız yapboz parçalarının birleştirildiğinde klasik Yunanca/Latince bilmeceyi çözmesi.",
      en: "Left: Myers's (1903) spectrum model of consciousness. Right: The 1901–1932 Cross-Correspondences experiment where four isolated automatists received complementary fragments of classical riddles."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Myers Subliminal Self and Cross Correspondences">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Myers Subliminal Iceberg/Spectrum -->
      <rect x="20" y="22" width="295" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. FREDERIC MYERS: SUBLIMINAL SELF (1903)</text>
      <!-- Threshold line (Limen) -->
      <line x1="34" y1="92" x2="300" y2="92" stroke="var(--warn)" stroke-width="1.8" stroke-dasharray="4 3"/>
      <text x="248" y="86" fill="var(--warn)" font-size="7.5" font-weight="700">EŞİK (LIMEN)</text>
      <!-- Supraliminal tip -->
      <polygon points="145,52 115,92 175,92" fill="var(--accent)" fill-opacity="0.3" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="145" y="82" text-anchor="middle" fill="var(--ink)" font-size="7.5" font-weight="700">Uyanık Ego</text>
      <!-- Subliminal base -->
      <polygon points="115,92 65,168 225,168 175,92" fill="var(--violet)" fill-opacity="0.22" stroke="var(--violet)" stroke-width="1.5"/>
      <text x="145" y="114" text-anchor="middle" fill="var(--violet)" font-size="8.2" font-weight="700">SUBLIMINAL SELF (Eşik-Altı Benlik)</text>
      <text x="145" y="130" text-anchor="middle" fill="var(--ink)" font-size="7.6">• Kızılötesi Uç: Otonom/hücresel kontrol (Janet)</text>
      <text x="145" y="144" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">• Morötesi Uç: Deha, Telepati, Xenoglossy</text>
      <text x="145" y="158" text-anchor="middle" fill="var(--muted)" font-size="7.4">  ve Kozmik Süreklilik (Focus 12–27)</text>
      <text x="32" y="185" fill="var(--ink)" font-size="7.6">→ William James (1901): "Psikolojinin en büyük adımı!"</text>

      <!-- Right: Cross-Correspondences Jigsaw -->
      <rect x="327" y="22" width="313" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="339" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. ÇAPRAZ-YAZIŞMALAR (CROSS-CORRESPONDENCES, 1901–32)</text>
      <text x="339" y="57" fill="var(--muted)" font-size="7.5">"Yaşayanlardan telepati (Living-Agent Psi)" itirazını</text>
      <text x="339" y="69" fill="var(--muted)" font-size="7.5">test etmek için dağıtık şifreli yapboz protokolü:</text>
      <!-- 3 Automatist nodes -->
      <rect x="341" y="80" width="90" height="42" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
      <text x="386" y="96" text-anchor="middle" fill="var(--accent)" font-size="7.6" font-weight="700">Mrs. Verrall</text>
      <text x="386" y="110" text-anchor="middle" fill="var(--muted)" font-size="7.2">(Cambridge): Parça A</text>

      <rect x="439" y="80" width="90" height="42" rx="5" fill="var(--surface)" stroke="var(--violet)"/>
      <text x="484" y="96" text-anchor="middle" fill="var(--violet)" font-size="7.6" font-weight="700">Mrs. Holland</text>
      <text x="484" y="110" text-anchor="middle" fill="var(--muted)" font-size="7.2">(Hindistan!): Parça B</text>

      <rect x="537" y="80" width="90" height="42" rx="5" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="582" y="96" text-anchor="middle" fill="var(--warn)" font-size="7.6" font-weight="700">Mrs. Piper</text>
      <text x="582" y="110" text-anchor="middle" fill="var(--muted)" font-size="7.2">(Boston): Parça C</text>

      <!-- Converging arrows to central solution -->
      <line x1="386" y1="122" x2="465" y2="144" stroke="var(--good)" stroke-width="1.5"/>
      <line x1="484" y1="122" x2="484" y2="144" stroke="var(--good)" stroke-width="1.5"/>
      <line x1="582" y1="122" x2="503" y2="144" stroke="var(--good)" stroke-width="1.5"/>
      <rect x="360" y="144" width="248" height="42" rx="6" fill="var(--surface)" stroke="var(--good)" stroke-width="1.8"/>
      <text x="484" y="160" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">Merkezde Birleşen Klasik Yunanca/Latince Anahtar!</text>
      <text x="484" y="174" text-anchor="middle" fill="var(--ink)" font-size="7.4">(Ör. "Hope Star &amp; Browning" / "Kulak Memesi" Testi)</text>
    </svg>`
  },

  "rosenheim-rspk-tandy-infrasound": {
    title: {
      tr: "Şekil 32.1: Rosenheim Poltergeist Fizik Ölçümü (Max Planck Enstitüsü, 1967) vs. Vic Tandy'nin 18.98 Hz Göz Küresi İnfrason Rezonansı (1998)",
      en: "Figure 32.1: Rosenheim Poltergeist Physics Audit (Max Planck Institute, 1967) vs. Vic Tandy's 18.98 Hz Eyeball Infrasound Resonance (1998)"
    },
    caption: {
      tr: "Sahte/çevresel hayalet algısı ile gerçek RSPK anomalisinin keskin ayrımı: Sağda 18.98 Hz duran ses dalgasının göz küresini titreterek yarattığı optik hayalet illüzyonu (Tandy 1998); solda ise Max Planck fizikçilerinin şebekeden bağımsız bataryalı kaydedicide ölçtüğü Rosenheim sapmaları ve Radin'in çift-yarık interferometre testi.",
      en: "Separating environmental infrasound illusions (Tandy's 18.98 Hz eyeball resonance) from instrumentally recorded RSPK anomalies (Max Planck Institute at Rosenheim, 1967) and Radin's double-slit interferometer tests."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Rosenheim RSPK and Tandy 18.98 Hz Infrasound">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Rosenheim & Double Slit -->
      <rect x="20" y="22" width="312" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. ROSENHEIM (MAX PLANCK FİZİKÇİLERİ, 1967) &amp; ÇİFT-YARIK</text>
      <text x="32" y="60" fill="var(--ink)" font-size="8" font-weight="700">1. Dr. F. Karger (Max Planck Plazma Fiziği) &amp; G. Zicha:</text>
      <text x="32" y="74" fill="var(--muted)" font-size="7.7">• Şebekeden bağımsız, mühürlü bataryalı voltaj kaydedici</text>
      <text x="32" y="86" fill="var(--muted)" font-size="7.7">  ve ses/manyetik sensörler avukatlık bürosuna kuruldu.</text>
      <text x="32" y="100" fill="var(--good)" font-size="7.8" font-weight="700">• Sonuç: Elektrik şebekesinde voltaj dalgalanması SIFIR</text>
      <text x="32" y="113" fill="var(--good)" font-size="7.8" font-weight="700">  olduğu halde kaydedici kalemi mekanik olarak 50A saptı!</text>
      <text x="32" y="127" fill="var(--muted)" font-size="7.6">• Odak (19 yaşındaki Annemarie) binadan çıkınca olay %100 durdu.</text>
      <text x="32" y="146" fill="var(--violet)" font-size="8" font-weight="700">2. Dean Radin Çift-Yarık İnterferometre (2012–2016):</text>
      <text x="32" y="160" fill="var(--ink)" font-size="7.7">• 250 km uzaktan bile meditasyoncuların dikkati çift-yarık</text>
      <text x="32" y="173" fill="var(--good)" font-size="7.7" font-weight="700">  girişim saçak oranında (R = P_çift / P_tek) 4.4σ kayma üretti!</text>

      <!-- Right: Vic Tandy 18.98 Hz Infrasound -->
      <rect x="344" y="22" width="296" height="176" rx="9" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="356" y="42" fill="var(--warn)" font-size="9" font-weight="700">B. VIC TANDY: 18.98 Hz İNFRASON ("HAYALET ODASI", 1998)</text>
      <text x="356" y="60" fill="var(--ink)" font-size="8">Coventry Üniversitesi mühendisi Vic Tandy'nin keşfi:</text>
      <!-- Standing wave in room -->
      <rect x="360" y="72" width="264" height="52" rx="5" fill="var(--surface)" stroke="var(--warn)"/>
      <path d="M 364,98 Q 430,68 492,98 T 620,98" fill="none" stroke="var(--warn)" stroke-width="2"/>
      <path d="M 364,98 Q 430,128 492,98 T 620,98" fill="none" stroke="var(--warn)" stroke-width="1.5" stroke-dasharray="3 2"/>
      <circle cx="492" cy="98" r="4" fill="var(--warn)"/>
      <text x="492" y="117" text-anchor="middle" fill="var(--warn)" font-size="7.3" font-weight="700">Oda Ortası Düğüm (18.98 Hz)</text>
      <text x="356" y="142" fill="var(--ink)" font-size="7.9" font-weight="700">NASA Teknik Raporu (1973-10268):</text>
      <text x="356" y="156" fill="var(--muted)" font-size="7.7">• İnsan göz küresinin mekanik rezonans frekansı = ~18–19 Hz!</text>
      <text x="356" y="170" fill="var(--good)" font-size="7.8" font-weight="700">• 18.98 Hz ses-altı dalga → Göz küresi titrer (gri gölge</text>
      <text x="356" y="183" fill="var(--good)" font-size="7.8" font-weight="700">  halüsinasyonu) + Vagal panik/soğuk terleme üretir!</text>
    </svg>`
  },

  "lucadou-mpi-trickster-matrix": {
    title: {
      tr: "Şekil 33.1: Walter von Lucadou'nun Pragmatik Bilgi Modeli (MPI: I = R × A) ve Kuantum İletişimsizlik (No-Signaling / Trickster) Yasası",
      en: "Figure 33.1: Walter von Lucadou's Model of Pragmatic Information (MPI: I = R × A) & the Quantum No-Signaling / Trickster Law"
    },
    caption: {
      tr: "Yerel-olmayan dolanıklık korelasyonu (A: Özerklik/Yenilik) dışarıdan deterministik bir telgraf sinyali (R: Güvenilirlik/Tekrarlanabilirlik) olarak kullanılmaya zorlandığında, NT (Non-Transmission) aksiyomu gereği R × A çarpımı sabit kaldığından etki başka bir değişkene kayar (Displacement / Decline Effect).",
      en: "Why forcing a non-local correlation (Autonomy A) to act as a deterministic causal signal (Reliability R) triggers the Decline/Displacement Effect under the Non-Transmission axiom."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Lucadou Pragmatic Information and Trickster Law">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Hyperbola R x A <= const -->
      <rect x="20" y="22" width="308" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. LUCADOU PRAGMATİK BİLGİ DENKLEMİ (I = R × A)</text>
      <line x1="48" y1="162" x2="305" y2="162" stroke="var(--muted)" stroke-width="1.3"/>
      <line x1="48" y1="58" x2="48" y2="162" stroke="var(--muted)" stroke-width="1.3"/>
      <text x="54" y="66" fill="var(--good)" font-size="7.5" font-weight="700">A: Özerklik / Anomali (Novelty)</text>
      <text x="195" y="176" fill="var(--accent)" font-size="7.5" font-weight="700">R: Mekanik Zorlama / Tekrar (Reliability)</text>
      <!-- Hyperbola curve -->
      <path d="M 65,68 Q 95,142 292,155" fill="none" stroke="var(--violet)" stroke-width="2.6"/>
      <circle cx="80" cy="86" r="5" fill="var(--good)"/>
      <text x="138" y="86" fill="var(--good)" font-size="7.6" font-weight="700">İlk Denemeler / Liminal Hal</text>
      <text x="138" y="98" fill="var(--muted)" font-size="7.3">(Yüksek A, Düşük Zorlama → Güçlü Sinyal!)</text>
      <circle cx="255" cy="153" r="5" fill="var(--warn)"/>
      <text x="225" y="138" text-anchor="middle" fill="var(--warn)" font-size="7.6" font-weight="700">10.000. Mekanik Tekrar</text>
      <text x="225" y="149" text-anchor="middle" fill="var(--muted)" font-size="7.2">(Sinyal Kayması / Decline Effect!)</text>
      <text x="32" y="191" fill="var(--ink)" font-size="7.6">• Kuantum Karşılığı: Eberhard İletişimsizlik Teoremi (No-Signaling)</text>

      <!-- Right: Evolutionary Filter Reason -->
      <rect x="340" y="22" width="300" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="352" y="42" fill="var(--good)" font-size="9" font-weight="700">B. EVRİM NEDEN BEYİN FİLTRESİNİ SEÇTİ? (BERGSON)</text>
      <text x="352" y="62" fill="var(--ink)" font-size="8">Soru: "Eğer telepati ve yerel-olmayan algı gerçekse,</text>
      <text x="352" y="75" fill="var(--ink)" font-size="8">Darwinci doğal seçilim neden bunu tam açmadı?"</text>
      <text x="352" y="96" fill="var(--warn)" font-size="8" font-weight="700">1. Filtresiz Beyin = Biyolojik Ölüm:</text>
      <text x="352" y="110" fill="var(--muted)" font-size="7.7">   Eğer ormanda size saldıran kaplandan kaçarken</text>
      <text x="352" y="123" fill="var(--muted)" font-size="7.7">   aynı anda 500 km uzaktaki kabilenin duygularını ve</text>
      <text x="352" y="136" fill="var(--muted)" font-size="7.7">   Focus 21 vizyonlarını görseydiniz, kaplana yem olurdunuz!</text>
      <text x="352" y="156" fill="var(--good)" font-size="8" font-weight="700">2. Çözüm (İndirgeme Valfi + Acil Durum Kapısı):</text>
      <text x="352" y="170" fill="var(--ink)" font-size="7.7">   Evrim uyanık Beta halinde filtreyi %99 kapattı; yalnız</text>
      <text x="352" y="183" fill="var(--good)" font-size="7.7" font-weight="700">   uykuda, ölüm krizinde ve derin Teta'da valfi açar!</text>
    </svg>`
  },

  "mcgilchrist-hemispheres-snyder-rtms": {
    title: {
      tr: "Şekil 34.1: Iain McGilchrist'in Yarıküre Asimetrisi ('Efendi ve Elçisi') ve Allan Snyder'ın Sol-Temporal rTMS ile 'Savant Dehası' Açma Deneyi",
      en: "Figure 34.1: Iain McGilchrist's Hemispheric Asymmetry ('Master and Emissary') & Allan Snyder's Left-Temporal rTMS Savant Induction"
    },
    caption: {
      tr: "Sol: Sol yarıkürenin dar, sözel-kategorik ve kapalı devre filtreleme modu vs. Sağ yarıkürenin bütüncül, dalga-fazlı ve doğrudan deneyim modu. Sağ: Allan Snyder'ın 1 Hz ketleyici rTMS ile sağlıklı insanların Sol Ön Temporal Lobunu 15 dakika susturduğunda aniden ortaya çıkan Savant çizim ve sayı yetenekleri.",
      en: "Left: Left hemisphere narrow categorical filter vs. Right hemisphere holistic wave-phase perception. Right: Allan Snyder's 1 Hz inhibitory rTMS over the left anterior temporal lobe unlocking savant skills."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="McGilchrist Hemispheres and Snyder rTMS Savant">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: McGilchrist Two Hemispheres -->
      <rect x="20" y="22" width="318" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. SPERRY &amp; McGILCHRIST: SOL (ELÇİ) vs. SAĞ (EFENDİ)</text>
      <!-- Left Hemisphere Box -->
      <rect x="32" y="54" width="142" height="114" rx="6" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="103" y="70" text-anchor="middle" fill="var(--warn)" font-size="8.2" font-weight="700">SOL YARIKÜRE ("Elçi")</text>
      <text x="40" y="86" fill="var(--muted)" font-size="7.5">• Dar Lazer Odak (Av yakalama)</text>
      <text x="40" y="99" fill="var(--muted)" font-size="7.5">• Sözel Etiket &amp; Kategori</text>
      <text x="40" y="112" fill="var(--muted)" font-size="7.5">• Parçalara Böler (Statik/Ölü)</text>
      <text x="40" y="125" fill="var(--warn)" font-size="7.5" font-weight="700">• Analitik Kaplama (AOL)</text>
      <text x="40" y="138" fill="var(--warn)" font-size="7.5" font-weight="700">• Bilmediğini İnkâr Eder</text>
      <text x="40" y="151" fill="var(--muted)" font-size="7.4">  (Konfabülasyon / Yorumcu)</text>

      <!-- Right Hemisphere Box -->
      <rect x="184" y="54" width="142" height="114" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="255" y="70" text-anchor="middle" fill="var(--good)" font-size="8.2" font-weight="700">SAĞ YARIKÜRE ("Efendi")</text>
      <text x="192" y="86" fill="var(--ink)" font-size="7.5">• 360° Panoramik / Bütüncül</text>
      <text x="192" y="99" fill="var(--ink)" font-size="7.5">• Sözsüz Dalga, Ritim &amp; Faz</text>
      <text x="192" y="112" fill="var(--ink)" font-size="7.5">• Canlı Bağlam &amp; Metafor</text>
      <text x="192" y="125" fill="var(--good)" font-size="7.5" font-weight="700">• Ham Gestalt &amp; Empati</text>
      <text x="192" y="138" fill="var(--good)" font-size="7.5" font-weight="700">• Bolte Taylor İnmesi (1996):</text>
      <text x="192" y="151" fill="var(--muted)" font-size="7.4">  Sol susunca: Kozmik Birlik!</text>

      <text x="32" y="185" fill="var(--ink)" font-size="7.6">→ Hemi-Sync: Sol yarıküreyi Sağ yarıkürenin fazına kilitler!</text>

      <!-- Right: Allan Snyder rTMS Savant -->
      <rect x="350" y="22" width="290" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="362" y="42" fill="var(--violet)" font-size="9" font-weight="700">B. ALLAN SNYDER: rTMS İLE "SAVANT" AÇMA (2003–12)</text>
      <text x="362" y="60" fill="var(--ink)" font-size="8">Sydney Üniv. Prof. Allan Snyder'ın Deneyi:</text>
      <text x="362" y="75" fill="var(--muted)" font-size="7.7">Sağlıklı üniversite öğrencilerinin SOL Ön Temporal</text>
      <text x="362" y="88" fill="var(--muted)" font-size="7.7">Lobuna (LATL) 15 dk boyunca 1 Hz ketleyici rTMS</text>
      <text x="362" y="101" fill="var(--muted)" font-size="7.7">(veya katodal tDCS) uygulanarak sol sansür kapatıldı:</text>
      <rect x="362" y="112" width="266" height="58" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="372" y="128" fill="var(--good)" font-size="8" font-weight="700">Sol Lob Susturulduğu Anda Ortaya Çıkanlar:</text>
      <text x="372" y="142" fill="var(--ink)" font-size="7.7">1. Perspektif ve doğalcı çizim yeteneğinde ani sıçrama!</text>
      <text x="372" y="155" fill="var(--ink)" font-size="7.7">2. 9 nokta bulmacasında %0 → %40 çözüm + hızlı nokta sayma!</text>
      <text x="362" y="185" fill="var(--good)" font-size="7.8" font-weight="700">→ Kanıt (HP-2): Ham deha hepimizde var; Sol Lob sansürlüyor!</text>
    </svg>`
  },

  "carhart-harris-dmn-reducing-valve": {
    title: {
      tr: "Şekil 35.1: Aldous Huxley'nin 'İndirgeme Valfi' (Reducing Valve) ve Carhart-Harris'in (PNAS, 2012) Paradoksal DMN Kapanması Keşfi",
      en: "Figure 35.1: Huxley's 'Reducing Valve' & Carhart-Harris's (PNAS, 2012) Paradoxical Default Mode Network (DMN) Deactivation"
    },
    caption: {
      tr: "2012'де Imperial College London'da yapılan tarihi fMRI deneyi: Psilosibin/DMT mistik deneyim sırasında beynin hiçbir yerinde kan akışını ARTIRMADI; tam tersine ego merkezi olan Varsayılan Mod Ağını (PCC ve mPFC) %20–40 KAPATTI ve normalde birbiriyle konuşmayan beyin ağlarını birbirine bağladı!",
      en: "Carhart-Harris et al. (PNAS, 2012) fMRI discovery: psilocybin causes ZERO activation increases, instead deactivating the Default Mode Network hubs (PCC/mPFC) and unlocking global brain connectivity."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Carhart-Harris DMN Deactivation and Reducing Valve">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Normal DMN Censor vs Deactivated DMN -->
      <rect x="20" y="22" width="318" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. CARHART-HARRIS &amp; NUTT (PNAS, 2012) fMRI ŞOKU</text>
      <text x="32" y="58" fill="var(--muted)" font-size="7.7">Beklenti: "Zengin vizyonlar = Beyin metabolizması artmalı!"</text>
      <text x="32" y="72" fill="var(--good)" font-size="8" font-weight="700">Gerçek fMRI Sonucu: Beynin HİÇBİR yerinde artış yok!</text>
      <!-- Bar chart of PCC and mPFC decrease -->
      <line x1="48" y1="92" x2="318" y2="92" stroke="var(--ink)" stroke-width="1.2"/>
      <text x="52" y="87" fill="var(--muted)" font-size="7.3">Bazal Kan Akışı (0%)</text>
      <rect x="75" y="92" width="52" height="44" fill="var(--accent)"/>
      <text x="101" y="149" text-anchor="middle" fill="var(--accent)" font-size="7.6" font-weight="700">PCC (-22%)</text>
      <rect x="155" y="92" width="52" height="40" fill="var(--violet)"/>
      <text x="181" y="149" text-anchor="middle" fill="var(--violet)" font-size="7.6" font-weight="700">mPFC (-20%)</text>
      <rect x="235" y="92" width="52" height="36" fill="var(--good)"/>
      <text x="261" y="149" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">Talamus (-18%)</text>
      <text x="32" y="170" fill="var(--ink)" font-size="7.7">• DMN (Ego/Otobiyografik Sansür Ağı) ne kadar ÇOK</text>
      <text x="32" y="183" fill="var(--good)" font-size="7.8" font-weight="700">  kapanırsa, öznel deneyim o kadar YOĞUNLAŞIYOR!</text>

      <!-- Right: Connectome Circle (Normal vs Psilocybin/Meditation) -->
      <rect x="350" y="22" width="290" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="362" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. KÜRESEL FAZ BAĞLANTISALLIĞI (PETRI ET AL., 2014)</text>
      <!-- Circle 1: Normal Brain (Segregated) -->
      <circle cx="425" cy="112" r="42" fill="none" stroke="var(--muted)" stroke-width="1.5"/>
      <line x1="395" y1="82" x2="415" y2="72" stroke="var(--muted)" stroke-width="1.5"/>
      <line x1="455" y1="82" x2="465" y2="105" stroke="var(--muted)" stroke-width="1.5"/>
      <line x1="395" y1="142" x2="425" y2="154" stroke="var(--muted)" stroke-width="1.5"/>
      <text x="425" y="170" text-anchor="middle" fill="var(--muted)" font-size="7.6" font-weight="700">1. Normal Ego (DMN Açık)</text>
      <text x="425" y="182" text-anchor="middle" fill="var(--muted)" font-size="7.2">İzole kompartımanlar</text>

      <!-- Circle 2: DMN Off (Hyper-connected) -->
      <circle cx="565" cy="112" r="42" fill="none" stroke="var(--good)" stroke-width="1.8"/>
      <g stroke="var(--good)" stroke-width="1" stroke-opacity="0.75">
        <line x1="523" y1="112" x2="607" y2="112"/>
        <line x1="565" y1="70" x2="565" y2="154"/>
        <line x1="535" y1="82" x2="595" y2="142"/>
        <line x1="535" y1="142" x2="595" y2="82"/>
        <line x1="523" y1="112" x2="565" y2="70"/>
        <line x1="565" y1="70" x2="607" y2="112"/>
        <line x1="607" y1="112" x2="565" y2="154"/>
        <line x1="565" y1="154" x2="523" y2="112"/>
        <line x1="535" y1="82" x2="607" y2="112"/>
        <line x1="535" y1="142" x2="565" y2="70"/>
      </g>
      <text x="565" y="170" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">2. DMN Kapalı (Focus 12–21)</text>
      <text x="565" y="182" text-anchor="middle" fill="var(--good)" font-size="7.2">Tam Küresel Entegrasyon!</text>
    </svg>`
  },

  "kluver-form-constants-cymatics": {
    title: {
      tr: "Şekil 36.1: Heinrich Klüver'in 4 Evrensel Görsel Geometri Sabiti (Ermentrout–Cowan V1 Turing Dönüşümü) ve Chladni/Simatik Duran Dalgaları",
      en: "Figure 36.1: Heinrich Klüver's 4 Universal Form Constants (Ermentrout–Cowan V1 Turing Mapping) & Cymatic Standing Waves"
    },
    caption: {
      tr: "Gözler kapalıyken (hipnogojik teta, titrek ışık, mağara sanatı veya Focus 10–15) tüm insanların neden aynı 4 geometrik formu (Tünel, Spiral, Altıgen Kafes, Satranç Tahtası) gördüğünün matematiksel kanıtı: V1 korteksindeki paralel Turing dalgalarının retino-kortikal log-kutupsal (ln r, θ) haritalamayla dönüşümü.",
      en: "Mathematical proof of why humans universally see the same 4 geometric forms (Tunnels, Spirals, Hexagonal Lattices, Cobwebs): log-polar retino-cortical mapping of Turing standing waves in V1."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Kluver Form Constants and V1 Turing Mapping">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="24" y="30" fill="var(--accent)" font-size="9.2" font-weight="700">HEINRICH KLÜVER (1926) &amp; ERMENTROUT–COWAN (1979): V1 LOG-KUTUPSAL TURING GEOMETRİLERİ</text>
      <!-- 4 Form Constant Boxes -->
      <!-- 1. Tunnel / Funnel -->
      <rect x="22" y="44" width="146" height="122" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <circle cx="95" cy="96" r="34" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <circle cx="95" cy="96" r="23" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <circle cx="95" cy="96" r="13" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <circle cx="95" cy="96" r="4" fill="var(--good)"/>
      <text x="95" y="146" text-anchor="middle" fill="var(--accent)" font-size="8" font-weight="700">1. Tünel / Huni</text>
      <text x="95" y="158" text-anchor="middle" fill="var(--muted)" font-size="7.2">(V1'de dikey şeritler → r)</text>

      <!-- 2. Spiral -->
      <rect x="180" y="44" width="146" height="122" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <path d="M 253,96 m 0,0 a 4,4 0 1,0 8,0 a 10,10 0 1,0 -20,0 a 18,18 0 1,0 36,0 a 26,26 0 1,0 -52,0" fill="none" stroke="var(--violet)" stroke-width="1.8"/>
      <text x="253" y="146" text-anchor="middle" fill="var(--violet)" font-size="8" font-weight="700">2. Logaritmik Spiral</text>
      <text x="253" y="158" text-anchor="middle" fill="var(--muted)" font-size="7.2">(V1'de diyagonal şeritler)</text>

      <!-- 3. Hexagonal Lattice / Honeycomb -->
      <rect x="338" y="44" width="146" height="122" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <g stroke="var(--good)" stroke-width="1.3" fill="none">
        <polygon points="411,66 427,75 427,93 411,102 395,93 395,75"/>
        <polygon points="395,93 411,102 411,120 395,129 379,120 379,102"/>
        <polygon points="427,93 443,102 443,120 427,129 411,120 411,102"/>
      </g>
      <text x="411" y="146" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">3. Altıgen Kafes / Ağ</text>
      <text x="411" y="158" text-anchor="middle" fill="var(--muted)" font-size="7.2">(3 dalga süperpozisyonu)</text>

      <!-- 4. Cobweb / Radial Checkerboard -->
      <rect x="496" y="44" width="142" height="122" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <circle cx="567" cy="96" r="30" fill="none" stroke="var(--warn)" stroke-width="1.4"/>
      <circle cx="567" cy="96" r="16" fill="none" stroke="var(--warn)" stroke-width="1.4"/>
      <line x1="537" y1="96" x2="597" y2="96" stroke="var(--warn)" stroke-width="1.3"/>
      <line x1="567" y1="66" x2="567" y2="126" stroke="var(--warn)" stroke-width="1.3"/>
      <line x1="546" y1="75" x2="588" y2="117" stroke="var(--warn)" stroke-width="1.3"/>
      <line x1="546" y1="117" x2="588" y2="75" stroke="var(--warn)" stroke-width="1.3"/>
      <text x="567" y="146" text-anchor="middle" fill="var(--warn)" font-size="8" font-weight="700">4. Radyal Mandala</text>
      <text x="567" y="158" text-anchor="middle" fill="var(--muted)" font-size="7.2">(V1'de yatay şeritler → θ)</text>

      <text x="24" y="186" fill="var(--ink)" font-size="8">• Denklemi: z = x + iy (Retina) → w = ln(r) + iθ (V1 Korteksi). Neolitik taş oymalardaki (Newgrange) spiraller ve</text>
      <text x="24" y="198" fill="var(--good)" font-size="8" font-weight="700">  Focus 10→21 "Tünel" deneyimi, beynin kendi duran dalga (Simatik) öz-fonksiyonlarının doğrudan okunmasıdır!</text>
    </svg>`
  },

  "friston-fep-markov-iit-phi": {
    title: {
      tr: "Şekil 37.1: Karl Friston'ın Serbest Enerji İlkesi (Markov Battaniyesi & Kesinlik Ağırlığı Π) ve Tononi'nin Bütünleşik Bilgi (Φ) Kuramı",
      en: "Figure 37.1: Karl Friston's Free Energy Principle (Markov Blanket & Precision Weighting Π) & Tononi's Integrated Information (Φ)"
    },
    caption: {
      tr: "Tahminsel Kodlamada (Friston & Seth) algı, aşağıdan-yukarı duyusal hata (Π_duyusal) ile yukarıdan-aşağı içsel modelin (Π_önsel) çarpışmasıdır. Gateway / Meditasyonda Π_duyusal → 0 yapıldığında içsel teta modeli gerçekliği doğrudan inşa eder ve küresel Φ (bilgi entegrasyonu) maksimize olur.",
      en: "In Predictive Processing (Friston/Seth), silencing bottom-up sensory precision (Π_sensory → 0) during meditation shifts dominance to top-down generative models while maximizing global integrated information (Φ)."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Friston Free Energy Principle and IIT Phi">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Markov Blanket & Precision Weighting -->
      <rect x="20" y="22" width="335" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="9" font-weight="700">A. TAHMİNSEL KODLAMA VE MARKOV BATTANİYESİ (FRISTON)</text>
      <!-- Top-Down Model Box -->
      <rect x="40" y="56" width="132" height="58" rx="7" fill="var(--surface)" stroke="var(--violet)" stroke-width="1.8"/>
      <text x="106" y="74" text-anchor="middle" fill="var(--violet)" font-size="8" font-weight="700">İçsel Üretici Model</text>
      <text x="106" y="88" text-anchor="middle" fill="var(--ink)" font-size="7.5">Yukarıdan-Aşağı Tahmin</text>
      <text x="106" y="102" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">Ağırlık: Π_önsel (Prior)</text>

      <!-- Bottom-Up Sensory Box -->
      <rect x="206" y="56" width="132" height="58" rx="7" fill="var(--surface)" stroke="var(--warn)" stroke-width="1.8"/>
      <text x="272" y="74" text-anchor="middle" fill="var(--warn)" font-size="8" font-weight="700">Dış Duyusal Girdi</text>
      <text x="272" y="88" text-anchor="middle" fill="var(--ink)" font-size="7.5">Aşağıdan-Yukarı Hata (ε)</text>
      <text x="272" y="102" text-anchor="middle" fill="var(--warn)" font-size="7.6" font-weight="700">Ağırlık: Π_duyusal</text>

      <!-- Arrow balance -->
      <line x1="172" y1="85" x2="206" y2="85" stroke="var(--ink)" stroke-width="2"/>
      <text x="34" y="134" fill="var(--ink)" font-size="7.9" font-weight="700">• Normal Uyanıklık (C-1): Π_duyusal &gt;&gt; Π_önsel (Dış dünya baskın)</text>
      <text x="34" y="150" fill="var(--good)" font-size="7.9" font-weight="700">• Focus 10–21 / Ganzfeld (HP-3 &amp; HP-7): Π_duyusal → 0 yapılır!</text>
      <text x="34" y="165" fill="var(--muted)" font-size="7.6">  Böylece hiçbir dış duyusal hata içsel modeli bozamaz;</text>
      <text x="34" y="178" fill="var(--good)" font-size="7.7" font-weight="700">  İmgelem %100 gerçeklik ve somatik komut haline gelir!</text>

      <!-- Right: IIT Phi & Negentropy -->
      <rect x="367" y="22" width="273" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="379" y="42" fill="var(--good)" font-size="9" font-weight="700">B. TONONI IIT (Φ) VE NEGENTROPİ (BRILLOUIN)</text>
      <text x="379" y="62" fill="var(--ink)" font-size="8" font-weight="700">1. Bütünleşik Bilgi (Φ — Phi):</text>
      <text x="379" y="76" fill="var(--muted)" font-size="7.7">   Bir sistemin bilinci, parçalarının toplamına indirgenemeyen</text>
      <text x="379" y="89" fill="var(--muted)" font-size="7.7">   bütünleşik neden-sonuç gücüne (Φ) eşittir.</text>
      <text x="379" y="106" fill="var(--good)" font-size="7.8" font-weight="700">   • Hemi-Sync + Yarıküre Koheransı → Φ değerini büyütür!</text>
      <text x="379" y="128" fill="var(--violet)" font-size="8" font-weight="700">2. Schrödinger (1944) &amp; Brillouin Negentropisi:</text>
      <text x="379" y="144" fill="var(--ink)" font-size="8" font-family="monospace">   ΔI = −k_B · ΔS  (Bilgi ≡ Negatif Entropi)</text>
      <text x="379" y="162" fill="var(--muted)" font-size="7.7">   Bilinçli odak (PEAR / Meditasyon), rastgele termal</text>
      <text x="379" y="175" fill="var(--good)" font-size="7.7" font-weight="700">   dağılıma faz düzeni (Negentropi) pompalayan operatördür!</text>
    </svg>`
  },

  "wigners-friend-bohm-pribram": {
    title: {
      tr: "Şekil 38.1: 2019–2020 'Genişletilmiş Wigner'in Arkadaşı' Deneyi (Proietti, Science Advances 2019; Bong, Nature Physics 2020) ve Bohm–Pribram Holonomisi",
      en: "Figure 38.1: 2019–2020 'Extended Wigner's Friend' Experiment (Proietti 2019; Bong 2020) & Bohm–Pribram Holonomy"
    },
    caption: {
      tr: "Sol: 6 dolanık fotonla yapılan Genişletilmiş Wigner'in Arkadaşı deneyinde 'gözlemciden bağımsız tek bir objektif olgu vardır' varsayımının >5σ ile çürütülmesi. Sağ: David Bohm'un Örtük Düzen (Implicate Order) hologramı ile Karl Pribram'ın 2B Gabor dalgacıklı Holonomik Beyin modeli.",
      en: "Left: 6-photon Extended Wigner's Friend experiment violating observer-independent facts by >5σ. Right: Bohm's Implicate Order and Pribram's Gabor-wavelet Holonomic Brain transform."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Extended Wigners Friend and Bohm Pribram Holonomy">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Extended Wigner's Friend -->
      <rect x="20" y="22" width="320" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. GENİŞLETİLMİŞ WIGNER'İN ARKADAŞI (2019–2020)</text>
      <text x="32" y="57" fill="var(--muted)" font-size="7.6">Proietti et al. (Sci. Adv. 2019) &amp; Bong et al. (Nat. Phys. 2020):</text>
      <!-- Two Labs with Friends inside and Wigners outside -->
      <rect x="34" y="68" width="134" height="62" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="101" y="84" text-anchor="middle" fill="var(--good)" font-size="7.8" font-weight="700">Laboratuvar A (İçerideki</text>
      <text x="101" y="96" text-anchor="middle" fill="var(--ink)" font-size="7.5">Arkadaş: "Foton = |0⟩ kesin!")</text>
      <text x="101" y="114" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">Dışarıdaki Wigner A:</text>
      <text x="101" y="125" text-anchor="middle" fill="var(--muted)" font-size="7.2">"Hayır, hâlâ süperpozisyonda!"</text>

      <rect x="192" y="68" width="134" height="62" rx="6" fill="var(--surface)" stroke="var(--violet)"/>
      <text x="259" y="84" text-anchor="middle" fill="var(--violet)" font-size="7.8" font-weight="700">Laboratuvar B (İçerideki</text>
      <text x="259" y="96" text-anchor="middle" fill="var(--ink)" font-size="7.5">Arkadaş: "Foton = |1⟩ kesin!")</text>
      <text x="259" y="114" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">Dışarıdaki Wigner B:</text>
      <text x="259" y="125" text-anchor="middle" fill="var(--muted)" font-size="7.2">Girişim testi yapıyor!</text>

      <!-- Entanglement line -->
      <line x1="168" y1="98" x2="192" y2="98" stroke="var(--warn)" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="32" y="148" fill="var(--good)" font-size="8" font-weight="700">• Sonuç (&gt;5 Sigma Eşitsizlik İhlali):</text>
      <text x="32" y="162" fill="var(--ink)" font-size="7.7">  İçerideki gözlemcinin "kesin olgusu" ile dışarıdaki gözlemcinin</text>
      <text x="32" y="175" fill="var(--ink)" font-size="7.7">  olgusu tek bir "gözlemciden bağımsız gerçeklikte" BİRLEŞEMEZ!</text>

      <!-- Right: Bohm-Pribram Holonomy -->
      <rect x="352" y="22" width="288" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="364" y="42" fill="var(--violet)" font-size="8.8" font-weight="700">B. BOHM (ÖRTÜK DÜZEN) &amp; PRIBRAM (HOLONOMİK BEYİN)</text>
      <text x="364" y="60" fill="var(--ink)" font-size="8" font-weight="700">1. David Bohm — Holomovement:</text>
      <text x="364" y="74" fill="var(--muted)" font-size="7.7">• Örtük Düzen (Implicate Order): Uzay ve zamanın henüz</text>
      <text x="364" y="87" fill="var(--muted)" font-size="7.7">  açılmadığı (enfolded) saf frekans/faz alanı (Focus 15–27).</text>
      <text x="364" y="100" fill="var(--muted)" font-size="7.7">• Açık Düzen (Explicate Order): 3B uzay-zaman projeksiyonu.</text>
      <text x="364" y="120" fill="var(--good)" font-size="8" font-weight="700">2. Karl Pribram — Dendritik Gabor Hologramı:</text>
      <text x="364" y="135" fill="var(--ink)" font-size="7.8" font-family="monospace">   g(t,ω) = exp(−(t−t₀)²/α²) · exp(iω₀t)</text>
      <text x="364" y="152" fill="var(--muted)" font-size="7.7">• Beyin anıları "çekmecelerde" değil, dendritik ağlardaki</text>
      <text x="364" y="165" fill="var(--muted)" font-size="7.7">  dalga girişim saçaklarında (Fourier/Gabor) saklar;</text>
      <text x="364" y="178" fill="var(--good)" font-size="7.7" font-weight="700">  bu yüzden korteksin %90'ı kesilse de (Dosya 24) anı silinmez!</text>
    </svg>`
  },

  "cramer-transactional-presentiment": {
    title: {
      tr: "Şekil 39.1: John Cramer'in İşlemsel Kuantum Yorumu (İleri + Geri Zaman Dalgaları) ve Dean Radin'in 'Presentiment' (Geleceği Önceden Hissetme) Eğrisi",
      en: "Figure 39.1: John Cramer's Transactional Quantum Interpretation (Retarded + Advanced Waves) & Dean Radin's Presentiment Curve"
    },
    caption: {
      tr: "Sol: Wheeler–Feynman ve Cramer'in zaman-simetrik kuantum modelinde geçmişten geleceğe giden Teklif Dalgası ψ(t) ile gelecekten geçmişe dönen Onay Dalgası ψ*(t)'nin uzay-zamanda el sıkışması. Sağ: Rastgele seçilecek şok edici bir fotoğraf ekrana gelmeden 3 saniye ÖNCE insan kalp/deri/EEG sisteminin verdiği otonom yanıt (Z > 6).",
      en: "Left: Cramer's time-symmetric handshake between retarded offer waves ψ(t) and advanced confirmation waves ψ*(t). Right: Autonomic physiological activation 3 seconds BEFORE a randomized future stimulus."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Cramer Transactional Interpretation and Presentiment">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Cramer Retarded & Advanced Wave Handshake -->
      <rect x="20" y="22" width="312" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. CRAMER İŞLEMSEL YORUM &amp; AHARONOV ÇİFT-VEKTÖR</text>
      <!-- Emitter t1 and Absorber t2 -->
      <circle cx="56" cy="108" r="10" fill="var(--accent)"/>
      <text x="56" y="132" text-anchor="middle" fill="var(--accent)" font-size="7.6" font-weight="700">Şimdi (t₁)</text>
      <circle cx="292" cy="108" r="10" fill="var(--violet)"/>
      <text x="292" y="132" text-anchor="middle" fill="var(--violet)" font-size="7.6" font-weight="700">Gelecek (t₂)</text>
      <!-- Forward wave -->
      <path d="M 68,96 Q 120,72 174,96 T 280,96" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="174" y="76" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">İleri Teklif Dalgası: ψ(t) ~ exp(−iωt) →</text>
      <!-- Backward wave -->
      <path d="M 280,120 Q 228,144 174,120 T 68,120" fill="none" stroke="var(--violet)" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="174" y="148" text-anchor="middle" fill="var(--violet)" font-size="7.5" font-weight="700">← Geri Onay Dalgası: ψ*(t) ~ exp(+iωt)</text>
      <text x="32" y="168" fill="var(--ink)" font-size="7.7">• Aharonov (TSVF): Şimdiki kuantum durumu hem geçmiş ⟨Ψ|</text>
      <text x="32" y="181" fill="var(--good)" font-size="7.7" font-weight="700">  hem de gelecekteki sınır koşulu |Φ⟩ tarafından belirlenir!</text>

      <!-- Right: Radin & Mossbridge Presentiment Curve -->
      <rect x="344" y="22" width="296" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="356" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. PRESENTIMENT (ÖN-HİS) META-ANALİZİ (MOSSBRIDGE 2012)</text>
      <!-- Time axis with t=0 stimulus line -->
      <line x1="364" y1="152" x2="624" y2="152" stroke="var(--muted)" stroke-width="1.2"/>
      <line x1="516" y1="58" x2="516" y2="158" stroke="var(--warn)" stroke-width="1.8" stroke-dasharray="3 2"/>
      <text x="516" y="54" text-anchor="middle" fill="var(--warn)" font-size="7.5" font-weight="700">t = 0 (RNG Seçimi &amp; Resim!)</text>
      <!-- Calm curve (flat until t=0) -->
      <path d="M 368,144 L 516,143 Q 550,136 618,140" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="415" y="138" fill="var(--accent)" font-size="7.3">Sakin Resim Öncesi</text>
      <!-- Emotional curve (rises at t = -3s BEFORE RNG!) -->
      <path d="M 368,144 L 420,142 Q 475,112 516,96 Q 555,62 618,84" fill="none" stroke="var(--warn)" stroke-width="2.4"/>
      <text x="446" y="102" fill="var(--warn)" font-size="7.5" font-weight="700">t = −3 sn: Erken Sıçrama!</text>
      <text x="356" y="172" fill="var(--ink)" font-size="7.6">• 26 çalışma (Mossbridge 2012) &amp; Bem (2011, 90 deney):</text>
      <text x="356" y="185" fill="var(--good)" font-size="7.7" font-weight="700">  Gelecekteki kendi duygusal şokunuza otonom geri-yansıma (Z &gt; 6)!</text>
    </svg>`
  },

  "arkani-hamed-amplituhedron-adscft": {
    title: {
      tr: "Şekil 40.1: 'Uzay-Zaman Öldü' (Spacetime is Doomed) — Maldacena AdS/CFT Holografisi ve Nima Arkani-Hamed'in Amplituhedron Geometrisi",
      en: "Figure 40.1: 'Spacetime is Doomed' — Maldacena AdS/CFT Holography & Nima Arkani-Hamed's Amplituhedron Geometry"
    },
    caption: {
      tr: "Modern teorik fiziğin en büyük devrimi: (Sol) AdS/CFT ve Ryu–Takayanagi formülünde 3 boyutlu uzay-zaman ve kütleçekimin temel olmaması, sınır yüzeydeki kuantum dolanıklıktan doğması; (Sağ) Arkani-Hamed'in (2013) uzay-zaman, yerellik ve zaman evrimi varsaymadan saçılma genliklerini veren Amplituhedron polihedrası.",
      en: "Left: AdS/CFT & Ryu–Takayanagi showing 3D bulk spacetime emerging from boundary quantum entanglement. Right: Arkani-Hamed's (2013) Amplituhedron in positive Grassmannian space beyond spacetime and locality."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="AdS CFT Holography and Amplituhedron">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: AdS/CFT & Ryu-Takayanagi -->
      <rect x="20" y="22" width="312" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. AdS/CFT HOLOGRAFİSİ VE RYU–TAKAYANAGI (2006)</text>
      <!-- Holographic Cylinder / Disk -->
      <circle cx="105" cy="112" r="46" fill="var(--accent)" fill-opacity="0.1" stroke="var(--accent)" stroke-width="2.2"/>
      <!-- Minimal surface geodesic inside bulk -->
      <path d="M 72,80 Q 112,112 72,144" fill="none" stroke="var(--good)" stroke-width="2.2"/>
      <text x="108" y="114" text-anchor="middle" fill="var(--ink)" font-size="7.5" font-weight="700">3B İç Uzay (Bulk)</text>
      <text x="54" y="114" text-anchor="middle" fill="var(--good)" font-size="7.2" font-weight="700">γ_A</text>
      <text x="172" y="74" fill="var(--ink)" font-size="7.8" font-weight="700">Ryu–Takayanagi Denklemi:</text>
      <text x="172" y="92" fill="var(--good)" font-size="8.5" font-weight="700" font-family="monospace">S_dolanıklık(A) = Area(γ_A) / 4G_N</text>
      <text x="172" y="112" fill="var(--muted)" font-size="7.6">• Van Raamsdonk (2010): Sınırdaki</text>
      <text x="172" y="125" fill="var(--muted)" font-size="7.6">  kuantum dolanıklığı sıfırlarsanız,</text>
      <text x="172" y="138" fill="var(--warn)" font-size="7.6" font-weight="700">  3B uzay-zaman dokusu yırtılıp</text>
      <text x="172" y="151" fill="var(--warn)" font-size="7.6" font-weight="700">  ikiye kopar!</text>
      <text x="32" y="182" fill="var(--good)" font-size="7.8" font-weight="700">→ Uzay ve mesafe temel değildir; Kuantum Dolanıklık temeldir!</text>

      <!-- Right: Amplituhedron -->
      <rect x="344" y="22" width="296" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="356" y="42" fill="var(--violet)" font-size="8.8" font-weight="700">B. AMPLITUHEDRON (ARKANI-HAMED &amp; TRNKA, 2013)</text>
      <!-- Faceted Polyhedron (Amplituhedron) -->
      <g stroke="var(--violet)" stroke-width="1.5" fill="var(--violet)" fill-opacity="0.15">
        <polygon points="415,64 452,82 442,126 392,134 374,92"/>
        <line x1="415" y1="64" x2="412" y2="104" stroke="var(--good)"/>
        <line x1="452" y1="82" x2="412" y2="104" stroke="var(--good)"/>
        <line x1="442" y1="126" x2="412" y2="104" stroke="var(--good)"/>
        <line x1="392" y1="134" x2="412" y2="104" stroke="var(--good)"/>
        <line x1="374" y1="92" x2="412" y2="104" stroke="var(--good)"/>
      </g>
      <text x="466" y="72" fill="var(--ink)" font-size="7.8" font-weight="700">Pozitif Grassmannian Uzay:</text>
      <text x="466" y="88" fill="var(--muted)" font-size="7.5">• Klasik Feynman diyagramlarında</text>
      <text x="466" y="100" fill="var(--muted)" font-size="7.5">  uzay-zaman içinde yüzlerce</text>
      <text x="466" y="112" fill="var(--muted)" font-size="7.5">  sayfalık denklem gerekirken,</text>
      <text x="466" y="126" fill="var(--good)" font-size="7.6" font-weight="700">• Uzay ve Zamanı denklemden</text>
      <text x="466" y="139" fill="var(--good)" font-size="7.6" font-weight="700">  ATTIKLARINDA cevap tek</text>
      <text x="466" y="152" fill="var(--good)" font-size="7.6" font-weight="700">  bir kristal hacmine indi!</text>
      <text x="356" y="182" fill="var(--ink)" font-size="7.7">• Nima Arkani-Hamed (IAS): "Spacetime is doomed!" (Uzay-zaman</text>
      <text x="356" y="193" fill="var(--good)" font-size="7.7" font-weight="700">  birincil gerçeklik değil, daha derin bir geometrinin gölgesidir!)</text>
    </svg>`
  },

  "kastrup-idealism-hoffman-interface": {
    title: {
      tr: "Şekil 41.1: Bernardo Kastrup'un Analitik İdealizmi (Dissosiyatif Alter Sınırı) ve Donald Hoffman'ın 'Arayüz Kuramı' (Fitness Beats Truth)",
      en: "Figure 41.1: Bernardo Kastrup's Analytic Idealism (Dissociative Alter Boundary) & Donald Hoffman's Interface Theory (Fitness Beats Truth)"
    },
    caption: {
      tr: "Sol: Kastrup'a göre 'madde ve beyin', evrensel bilincin (Mind-at-Large) içindeki dissosiyatif bir lokal alterin (ego) dışarıdan (2. şahıs perspektifinden) görünümüdür. Sağ: Hoffman–Prakash 'Fitness Beats Truth (FBT)' teoreminde (P(Truth) → 0) uzay-zaman ve nesneler gerçekliğin kendisi değil, Bilinçli Ajanlar Ağı'nın (Markov çekirdeği) masaüstü ikonlarıdır.",
      en: "Left: In Kastrup's Analytic Idealism, the brain is the extrinsic appearance of a dissociative alter within Mind-at-Large. Right: Hoffman's Fitness Beats Truth theorem shows spacetime is a desktop interface over a network of Conscious Agents."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Kastrup Analytic Idealism and Hoffman Interface Theory">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Kastrup Analytic Idealism -->
      <rect x="20" y="22" width="306" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. ANALİTİK İDEALİZM (BERNARDO KASTRUP, 2019)</text>
      <ellipse cx="102" cy="116" rx="68" ry="52" fill="var(--accent)" fill-opacity="0.08" stroke="var(--accent)" stroke-dasharray="3,2"/>
      <text x="102" y="78" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">Evrensel Bilinç (Mind-at-Large)</text>
      <circle cx="102" cy="122" r="26" fill="var(--warn)" fill-opacity="0.16" stroke="var(--warn)" stroke-width="2"/>
      <text x="102" y="119" text-anchor="middle" fill="var(--warn)" font-size="7.3" font-weight="700">Dissosiyatif</text>
      <text x="102" y="130" text-anchor="middle" fill="var(--warn)" font-size="7.3" font-weight="700">Alter (Ego)</text>
      <text x="180" y="76" fill="var(--ink)" font-size="7.7" font-weight="700">• İçerden Görünüm (1. Şahıs):</text>
      <text x="180" y="89" fill="var(--muted)" font-size="7.5">  Kişisel deneyim, düşünce, duygu.</text>
      <text x="180" y="106" fill="var(--good)" font-size="7.7" font-weight="700">• Dışardan Görünüm (2. Şahıs):</text>
      <text x="180" y="119" fill="var(--muted)" font-size="7.5">  Markov battaniyesinin tarayıcıdaki</text>
      <text x="180" y="131" fill="var(--good)" font-size="7.5" font-weight="700">  görüntüsü = "Beyin ve Nöronlar"!</text>
      <text x="180" y="148" fill="var(--ink)" font-size="7.5">• DMN kapanınca (Carhart-Harris):</text>
      <text x="180" y="160" fill="var(--good)" font-size="7.5" font-weight="700">  Dissosiyatif duvar incelir → Birlik!</text>
      <text x="32" y="185" fill="var(--accent)" font-size="7.6" font-weight="700">→ Beyin bilinci üretmez; lokalize bilincin dışsal görüntüsüdür.</text>

      <!-- Right: Hoffman Interface Theory -->
      <rect x="336" y="22" width="304" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="348" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. HOFFMAN ARAYÜZ KURAMI (FITNESS BEATS TRUTH)</text>
      <rect x="352" y="56" width="120" height="58" rx="6" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="412" y="73" text-anchor="middle" fill="var(--warn)" font-size="7.6" font-weight="700">Masaüstü Arayüzü (3B)</text>
      <text x="412" y="87" text-anchor="middle" fill="var(--muted)" font-size="7.2">Uzay-Zaman + "Elma/Nöron"</text>
      <text x="412" y="101" text-anchor="middle" fill="var(--good)" font-size="7.2" font-weight="700">P(Gerçekliği Görme) → 0</text>
      <rect x="352" y="124" width="120" height="54" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="412" y="141" text-anchor="middle" fill="var(--good)" font-size="7.6" font-weight="700">Bilinçli Ajanlar Ağı</text>
      <text x="412" y="155" text-anchor="middle" fill="var(--ink)" font-size="7.2" font-family="monospace">C = (X, G, P, D, A, N)</text>
      <text x="412" y="168" text-anchor="middle" fill="var(--muted)" font-size="7">Markov Çekirdekleri → Amplituhedron</text>
      <text x="482" y="72" fill="var(--ink)" font-size="7.6" font-weight="700">Evrimsel Oyun Teoremi:</text>
      <text x="482" y="86" fill="var(--muted)" font-size="7.4">Gerçekliği olduğu gibi gören</text>
      <text x="482" y="98" fill="var(--muted)" font-size="7.4">organizma, sadece "faydaya</text>
      <text x="482" y="110" fill="var(--muted)" font-size="7.4">uyarlı arayüz" gören organizma</text>
      <text x="482" y="122" fill="var(--warn)" font-size="7.4" font-weight="700">karşısında %100 soyu tükenir!</text>
      <text x="482" y="142" fill="var(--good)" font-size="7.5" font-weight="700">• Whitehead Süreç Ontolojisi:</text>
      <text x="482" y="155" fill="var(--muted)" font-size="7.4">  Atomlar cansız taş değil,</text>
      <text x="482" y="167" fill="var(--muted)" font-size="7.4">  "Deneyim Damlaları"dır.</text>
    </svg>`
  },

  "archaeoacoustics-111hz-ayahuasca": {
    title: {
      tr: "Şekil 42.1: 111 Hz Megalitik Akustik Rezonans (Jahn/Cook, 2008), Parmenides İnkübasyonu ve Amazon Ayahuasca (1/22.5 Milyar) Kombinatoryal Bilmecesi",
      en: "Figure 42.1: 111 Hz Megalithic Acoustic Resonance (Jahn/Cook, 2008), Parmenides Incubation & the Amazonian Ayahuasca Combinatorial Riddle"
    },
    caption: {
      tr: "Sol: Newgrange, Hal Saflieni Hypogeum ve Carnac taş odalarının 95–120 Hz (merkez 110–111 Hz) akustik duran dalgası ve Cook et al. (2008) EEG deneyinde 110 Hz'te sol prefrontal dil merkezinin kapanıp sağ yarıkürenin açılması. Sağ: 80.000 Amazon bitkisi içinden DMT içeren yaprak ile MAO-A inhibitörü β-karbolin içeren sarmaşığın birleştirilme olasılığı.",
      en: "Left: 110–111 Hz standing-wave resonance in Neolithic chambers switching off left prefrontal language areas (Cook 2008). Right: Combinatorial probability of discovering the dual-plant MAOI + DMT Ayahuasca synergy among 80,000 Amazonian species."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="111 Hz Archaeoacoustics and Ayahuasca Combinatorics">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: 111 Hz Megalithic Resonance -->
      <rect x="20" y="22" width="312" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. 110–111 Hz MEGALİTİK REZONANS (JAHN 1996 / COOK 2008)</text>
      <!-- Stone chamber + standing wave -->
      <rect x="34" y="56" width="136" height="58" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.8"/>
      <path d="M 38,85 Q 70,58 102,85 T 166,85" fill="none" stroke="var(--good)" stroke-width="2.2"/>
      <path d="M 38,85 Q 70,112 102,85 T 166,85" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="102" y="108" text-anchor="middle" fill="var(--good)" font-size="7.5" font-weight="700">f₀ = 110–111 Hz Duran Dalga</text>
      <text x="180" y="68" fill="var(--ink)" font-size="7.6" font-weight="700">Ölçülen Neolitik Odalar (MÖ 3500):</text>
      <text x="180" y="81" fill="var(--muted)" font-size="7.4">• Newgrange &amp; Cairns (İrlanda): 110 Hz</text>
      <text x="180" y="93" fill="var(--muted)" font-size="7.4">• Hal Saflieni Hypogeum (Malta): 110 Hz</text>
      <text x="180" y="105" fill="var(--muted)" font-size="7.4">• Parmenides Pholarchos / Nekromanteion</text>
      <text x="34" y="132" fill="var(--good)" font-size="7.9" font-weight="700">Dr. Ian Cook et al. (UCLA, 2008 — 30 Denek EEG):</text>
      <text x="34" y="146" fill="var(--ink)" font-size="7.6">• 90, 100, 120, 130 Hz'te hiçbir değişim yokken, TAM 110 Hz'te</text>
      <text x="34" y="159" fill="var(--warn)" font-size="7.6" font-weight="700">  Sol Prefrontal Dil Merkezi aniden kapanır ve Sağ-Yarıküre</text>
      <text x="34" y="172" fill="var(--good)" font-size="7.6" font-weight="700">  duygusal/vizyoner trans ağı baskın hale geçer! (HP-1 &amp; HP-2)</text>

      <!-- Right: Ayahuasca Combinatorics -->
      <rect x="342" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="354" y="42" fill="var(--violet)" font-size="8.8" font-weight="700">B. AMAZON AYAHUASCA BİYOKİMYA PARADOKSU (NARBY)</text>
      <rect x="354" y="54" width="128" height="44" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
      <text x="418" y="71" text-anchor="middle" fill="var(--accent)" font-size="7.5" font-weight="700">1. Psychotria viridis</text>
      <text x="418" y="84" text-anchor="middle" fill="var(--muted)" font-size="7.1">DMT içerir (Ağızdan alınırsa</text>
      <text x="418" y="94" text-anchor="middle" fill="var(--warn)" font-size="7.1">midedeki MAO-A enzimi yıkar!)</text>
      <rect x="498" y="54" width="130" height="44" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="563" y="71" text-anchor="middle" fill="var(--good)" font-size="7.5" font-weight="700">2. Banisteriopsis caapi</text>
      <text x="563" y="84" text-anchor="middle" fill="var(--muted)" font-size="7.1">Harmin / Harmalin içerir</text>
      <text x="563" y="94" text-anchor="middle" fill="var(--good)" font-size="7.1">(Tam MAO-A İnhibitörü!)</text>
      <text x="354" y="118" fill="var(--ink)" font-size="7.7" font-weight="700">Kombinatoryal Olasılık Hesabı (N ≈ 80.000 Amazon Türü):</text>
      <text x="354" y="133" fill="var(--good)" font-size="8.1" font-weight="700" font-family="monospace">C(80.000, 2) = 3.2 × 10⁹ olası ikili kaynatma!</text>
      <text x="354" y="148" fill="var(--muted)" font-size="7.5">• Tek başına ikisi de ağızdan vizyon vermez; yalnızca birlikte</text>
      <text x="354" y="160" fill="var(--muted)" font-size="7.5">  saatlerce kaynatıldığında oral DMT kapısı açılır.</text>
      <text x="354" y="176" fill="var(--accent)" font-size="7.6" font-weight="700">• Şamanların Cevabı: "Rüyamızda/transta bitkilerin tonu söyledi!"</text>
    </svg>`
  },

  "plotinus-enneads-monroe-isomorphism": {
    title: {
      tr: "Şekil 43.1: Plotinus'un Enneadlar Ontolojisi (To Hen – Nous – Psykhe – Hyle) ve Iamblichus'un Theourgia'sı ile Monroe Focus Mimarisi Eşyapılılığı",
      en: "Figure 43.1: Structural Isomorphism Between Plotinus's Enneads (The One – Nous – Psyche – Matter), Iamblichus's Theurgy & Monroe's Focus Architecture"
    },
    caption: {
      tr: "MS 250'de İskenderiyeli/Romalı Plotinus'un 'Aphele panta' (Her şeyi soyup bırak!) yöntemiyle haritaladığı 4 katmanlı gerçeklik merdiveni ile Robert Monroe'nun 1971–1994 arasında elektronik Hemi-Sync ile haritaladığı Focus 10 → 12 → 15/21 → 27/Mutlak merdiveninin birebir topolojik eşleşmesi.",
      en: "Exact topological mapping between Plotinus's 3rd-century CE Neoplatonic hierarchy (achieved via 'Aphele panta' — strip away everything) and Robert Monroe's 20th-century Focus 10–27 hierarchy."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Plotinus Enneads and Monroe Focus Isomorphism">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="330" y="27" text-anchor="middle" fill="var(--accent)" font-size="9.2" font-weight="700">PLOTINUS (MS 204–270, ENNEADLAR)  ⟺  IAMBLICHUS (THEOURGIA)  ⟺  MONROE GATEWAY TOPOLOJİSİ</text>
      <!-- 4 Horizontal Tiers -->
      <!-- Tier 1: To Hen -->
      <rect x="24" y="38" width="612" height="36" rx="7" fill="var(--violet)" fill-opacity="0.14" stroke="var(--violet)"/>
      <text x="36" y="54" fill="var(--violet)" font-size="8.4" font-weight="700">1. TO HEN (Bir / Kaynak — Ennead VI.9)</text>
      <text x="36" y="67" fill="var(--muted)" font-size="7.4">Özne-nesne ikiliğinin ötesi, "Yalnızın Yalnızla Uçuşu"</text>
      <text x="350" y="54" fill="var(--good)" font-size="8.2" font-weight="700">⟺  THEOSIS / SAF IŞIK (Iamblichus)</text>
      <text x="350" y="67" fill="var(--ink)" font-size="7.6">⟺  MONROE: I-There Kümesi &amp; Kaynak (Union / The Absolute)</text>

      <!-- Tier 2: Nous -->
      <rect x="24" y="80" width="612" height="36" rx="7" fill="var(--good)" fill-opacity="0.12" stroke="var(--good)"/>
      <text x="36" y="96" fill="var(--good)" font-size="8.4" font-weight="700">2. NOUS (Kozmik Zekâ / Zamansız Arketipler — V.8)</text>
      <text x="36" y="109" fill="var(--muted)" font-size="7.4">Zaman yok (Sonsuz Şimdi); her parça Bütünü içerir (Hologram!)</text>
      <text x="350" y="96" fill="var(--good)" font-size="8.2" font-weight="700">⟺  NOETİK SYNTHĒMATA (Rezonans Mühürleri)</text>
      <text x="350" y="109" fill="var(--ink)" font-size="7.6">⟺  MONROE: Focus 15 (Zamansızlık) &amp; Focus 21–27 (Planlama Merkezi)</text>

      <!-- Tier 3: Psykhe -->
      <rect x="24" y="122" width="612" height="36" rx="7" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)"/>
      <text x="36" y="138" fill="var(--accent)" font-size="8.4" font-weight="700">3. PSYKHE &amp; OCHĒMA-PNEUMA (Ruh &amp; Işıksal Araç)</text>
      <text x="36" y="151" fill="var(--muted)" font-size="7.4">Zaman ve imgelem başlar; bireysel ruhlar Dünya-Ruhuyla bağlıdır</text>
      <text x="350" y="138" fill="var(--accent)" font-size="8.2" font-weight="700">⟺  PHTHONGOI (Ses/Mırıldanma Rezonansı)</text>
      <text x="350" y="151" fill="var(--ink)" font-size="7.6">⟺  MONROE: Focus 12 (Genişlemiş Farkındalık) + REBAL ("Işıksal Araç"!)</text>

      <!-- Tier 4: Hyle -->
      <rect x="24" y="164" width="612" height="36" rx="7" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="36" y="180" fill="var(--warn)" font-size="8.4" font-weight="700">4. HYLE / SŌMA (Duyusal Madde &amp; Beden — Ennead IV.8)</text>
      <text x="36" y="193" fill="var(--muted)" font-size="7.4">Yöntem: "Aphele panta!" (Fazlalıkları yontup çıkar! — HP-2)</text>
      <text x="350" y="180" fill="var(--warn)" font-size="8.2" font-weight="700">⟺  KATARSİS &amp; HAREKETSİZLİK</text>
      <text x="350" y="193" fill="var(--ink)" font-size="7.6">⟺  MONROE: C-1 → ECB Kutusu ("Aphele panta!") → Focus 10 (Beden Uyuyor)</text>
    </svg>`
  },

  "hermetic-bruno-koestler-holon": {
    title: {
      tr: "Şekil 44.1: Hermetik Ölçek Değişmezliği, Giordano Bruno'nun Bellek Çarkları (Ars Memoriae / Vinculum) ve Arthur Koestler'in 'Holon' Hiyerarşisi",
      en: "Figure 44.1: Hermetic Scale Invariance, Giordano Bruno's Memory Wheels (Ars Memoriae / Vinculum) & Arthur Koestler's Janus-Faced Holon Hierarchy"
    },
    caption: {
      tr: "Sol: Corpus Hermeticum ve Giordano Bruno'nun (1582–1591) iç içe dönen kombinatoryal arketip çarkları ve 'De Vinculis in Genere' (Rezonans Bağları) kuramı. Sağ: Arthur Koestler'in (1967) doğada 'salt parça' veya 'salt bütün' olmadığını, her birimin (atom → hücre → organ → birey → kozmik zihin) iki yüzlü bir 'Holon' olduğunu gösteren modeli.",
      en: "Left: Giordano Bruno's concentric combinatorial memory wheels and theory of field-bonds (Vinculum). Right: Arthur Koestler's (1967) Holarchy where every unit is a Janus-faced Holon balancing self-assertion and integration."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Giordano Bruno Memory Wheels and Koestler Holon">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Bruno Concentric Wheels -->
      <rect x="20" y="22" width="306" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. GIORDANO BRUNO: ARS MEMORIAE &amp; VINCULUM (1591)</text>
      <circle cx="96" cy="116" r="54" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <circle cx="96" cy="116" r="38" fill="none" stroke="var(--violet)" stroke-width="1.5" stroke-dasharray="4,2"/>
      <circle cx="96" cy="116" r="22" fill="none" stroke="var(--good)" stroke-width="1.8"/>
      <circle cx="96" cy="116" r="5" fill="var(--warn)"/>
      <text x="96" y="182" text-anchor="middle" fill="var(--accent)" font-size="7.3" font-weight="700">30 Eşmerkezli Mühür Çarkı</text>
      <text x="164" y="68" fill="var(--ink)" font-size="7.7" font-weight="700">• Sonsuz Evren &amp; Monas:</text>
      <text x="164" y="81" fill="var(--muted)" font-size="7.4">  Evrenin merkezi her yerdir; her</text>
      <text x="164" y="93" fill="var(--muted)" font-size="7.4">  birim (Monad) bütünü yansıtır.</text>
      <text x="164" y="110" fill="var(--good)" font-size="7.7" font-weight="700">• De Vinculis in Genere (Bağlar):</text>
      <text x="164" y="123" fill="var(--muted)" font-size="7.4">  Zihinler arası etki kaba kuvvetle</text>
      <text x="164" y="135" fill="var(--muted)" font-size="7.4">  değil, Ses (Voce) + İmge (Phantasia)</text>
      <text x="164" y="147" fill="var(--good)" font-size="7.4" font-weight="700">  + Eros (Duygusal Faz Kilidi) ile</text>
      <text x="164" y="159" fill="var(--good)" font-size="7.4" font-weight="700">  "Vinculum" (Alan Bağı) kurar!</text>

      <!-- Right: Koestler Holon -->
      <rect x="336" y="22" width="304" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="348" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. ARTHUR KOESTLER: JANUS YÜZLÜ "HOLON" (1967)</text>
      <!-- Nested Holarchy -->
      <rect x="352" y="56" width="272" height="74" rx="8" fill="var(--good)" fill-opacity="0.08" stroke="var(--good)"/>
      <text x="488" y="71" text-anchor="middle" fill="var(--good)" font-size="7.8" font-weight="700">ÜST-HOLON (Kolektif / Kozmik Zihin — Bütünleşme [IT])</text>
      <rect x="382" y="78" width="212" height="44" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
      <text x="488" y="94" text-anchor="middle" fill="var(--accent)" font-size="7.8" font-weight="700">BİREYSEL ZİHİN HOLONU (Janus İki-Yüzlü Denge)</text>
      <text x="488" y="110" text-anchor="middle" fill="var(--muted)" font-size="7.2">↙ Aşağıya karşı: "Bütün" (Özerklik)   |   ↗ Yukarıya karşı: "Parça" (Katılım)</text>
      <text x="348" y="148" fill="var(--ink)" font-size="7.7">• Kanser / Nevrotik Ego Patolojisi: Holonun "Bütünleşme (IT)"</text>
      <text x="348" y="160" fill="var(--warn)" font-size="7.6" font-weight="700">  yüzünü reddedip sadece "Öz-İddia (SAT / Ego)" yüzüne saplanması!</text>
      <text x="348" y="176" fill="var(--good)" font-size="7.7" font-weight="700">• Gateway Focus 12–27: Bireysel Holonu silmeden Üst-Holona</text>
      <text x="348" y="188" fill="var(--good)" font-size="7.7" font-weight="700">  faz kilitleme ("Farklılaşmış Bütünleşme" = Maksimum Φ!)</text>
    </svg>`
  },

  "avicenna-suhrawardi-ibn-arabi-barzakh": {
    title: {
      tr: "Şekil 45.1: İbn Sînâ'nın 'Uçan Adam' (el-Recülü'l-Muallak) Deneyi, Sühreverdî'nin Nûr Ontolojisi ve İbnü'l-Arabî'nin 'Berzah / Âlem-i Misâl' Faz Uzayı",
      en: "Figure 45.1: Avicenna's 'Floating Man' Thought Experiment, Suhrawardi's Light Ontology & Ibn Arabi's 'Barzakh / Mundus Imaginalis' Phase Space"
    },
    caption: {
      tr: "Sol: İbn Sînâ'nın (1027, Kitâbü'ş-Şifâ) duyusal yoksunluk tankını ve Focus 10'u 950 yıl önce öngören 'Havada Asılı/Uçan Adam' kanıtı. Sağ: Sühreverdî ve İbnü'l-Arabî'nin 'Âlem-i Misâl / Berzah' (Henry Corbin'in Mundus Imaginalis'i) adını verdiği, anlamların şekle büründüğü ara-faz evreni (Focus 12–27).",
      en: "Left: Avicenna's (1027) 'Floating Man' argument proving self-awareness persists under complete sensory zeroing (Focus 10). Right: Suhrawardi and Ibn Arabi's 'Barzakh / Mundus Imaginalis' intermediate phase space."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Avicenna Floating Man and Ibn Arabi Barzakh">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Ibn Sina Floating Man -->
      <rect x="20" y="22" width="300" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. İBN SÎNÂ: "UÇAN ADAM" (EL-RECÜLÜ'L-MUALLAK, 1027)</text>
      <circle cx="88" cy="112" r="38" fill="var(--accent)" fill-opacity="0.1" stroke="var(--accent)" stroke-dasharray="3,2"/>
      <circle cx="88" cy="98" r="9" fill="none" stroke="var(--good)" stroke-width="1.8"/>
      <line x1="88" y1="107" x2="88" y2="132" stroke="var(--good)" stroke-width="1.8"/>
      <line x1="72" y1="116" x2="104" y2="116" stroke="var(--good)" stroke-width="1.8"/>
      <text x="88" y="164" text-anchor="middle" fill="var(--good)" font-size="7.3" font-weight="700">0 Duyu · 0 Yerçekimi</text>
      <text x="138" y="66" fill="var(--ink)" font-size="7.6" font-weight="700">Düşünce Deneyi (Kitâbü'ş-Şifâ):</text>
      <text x="138" y="80" fill="var(--muted)" font-size="7.4">• Gözleri örtülü, kulakları sağır,</text>
      <text x="138" y="92" fill="var(--muted)" font-size="7.4">  uzuvları birbirine değmeden</text>
      <text x="138" y="104" fill="var(--muted)" font-size="7.4">  boşlukta asılı yaratılan insan:</text>
      <text x="138" y="120" fill="var(--good)" font-size="7.6" font-weight="700">• Bedeninin veya dış dünyanın</text>
      <text x="138" y="132" fill="var(--good)" font-size="7.6" font-weight="700">  varlığını bilmez ama KENDİ</text>
      <text x="138" y="144" fill="var(--good)" font-size="7.6" font-weight="700">  BENLİĞİNİN ("Enâniyyet") varlığını</text>
      <text x="138" y="156" fill="var(--good)" font-size="7.6" font-weight="700">  %100 kesintisiz bilir!</text>
      <text x="32" y="184" fill="var(--accent)" font-size="7.6" font-weight="700">→ Lilly İzolasyon Tankı + Monroe Focus 10'un 1027 yılındaki formülü!</text>

      <!-- Right: Suhrawardi & Ibn Arabi Barzakh -->
      <rect x="330" y="22" width="310" height="176" rx="9" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="342" y="42" fill="var(--violet)" font-size="8.8" font-weight="700">B. SÜHREVERDÎ &amp; İBNÜ'L-ARABÎ: ÂLEM-İ MİSÂL / BERZAH</text>
      <rect x="344" y="54" width="282" height="30" rx="5" fill="var(--surface)" stroke="var(--good)"/>
      <text x="485" y="73" text-anchor="middle" fill="var(--good)" font-size="7.8" font-weight="700">1. ÂLEM-İ ERVÂH / CEBERÛT (Saf Nûr / Soyut Anlam — Focus 21+)</text>
      <rect x="344" y="92" width="282" height="44" rx="5" fill="var(--violet)" fill-opacity="0.16" stroke="var(--violet)" stroke-width="1.8"/>
      <text x="485" y="109" text-anchor="middle" fill="var(--violet)" font-size="8.2" font-weight="700">2. ÂLEM-İ MİSÂL / BERZAH (Hûrkalyâ — Focus 12–27)</text>
      <text x="485" y="123" text-anchor="middle" fill="var(--ink)" font-size="7.3">"Ruhların/anlamların cisimleştiği, cisimlerin ruhlaştığı İdeo-Plastik Kıstak"</text>
      <rect x="344" y="144" width="282" height="28" rx="5" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="485" y="162" text-anchor="middle" fill="var(--warn)" font-size="7.8" font-weight="700">3. ÂLEM-İ ŞEHÂDET / MÜLK (Kaba Duyusal Madde — C-1)</text>
      <text x="344" y="187" fill="var(--good)" font-size="7.6" font-weight="700">• Molla Sadrâ (Hareket-i Cevherî): Madde donmuş ışıktır; bilinç evrimleşir.</text>
    </svg>`
  },

  "abulafia-hesychasm-lataif-jung": {
    title: {
      tr: "Şekil 46.1: Abulafia'nın Harf Permütasyonu (Tzeruf), Palamas'ın Hesychasm Kalp Duası, Tasavvuf Letâif Haritası ve Jung'un Aktif İmajinasyonu",
      en: "Figure 46.1: Abulafia's Letter Permutation (Tzeruf), Palamas's Hesychast Prayer, Sufi Lataif Somatotopy & Jung's Active Imagination"
    },
    caption: {
      tr: "Dört bağımsız kontemplatif mühendislik protokolü: (1) Abulafia'nın (1280) sesli harf kombinasyonu ve nefesle sol-yarıküre dil modülünü aşırı yükleyip susturması; (2) Aynoroz Hesychasm'ında 0.1 Hz kalp-nefes senkronu; (3) Nakşibendî/Kübrevî 7 Letâif biyo-alan noktası ve (4) Jung'un Kırmızı Kitap (1913–1930) protokolü.",
      en: "Four contemplative engineering protocols: Abulafia's Tzeruf linguistic overload, Hesychast 0.1 Hz cardiac prayer, Sufi Lataif somatotopy, and Jung's Active Imagination."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Abulafia Hesychasm Lataif and Jung">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- 4 Quadrants -->
      <rect x="20" y="22" width="304" height="84" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="40" fill="var(--accent)" font-size="8.4" font-weight="700">1. ABRAHAM ABULAFIA: HOKHMAT HA-TZERUF (1280)</text>
      <text x="32" y="55" fill="var(--ink)" font-size="7.6">• Yöntem: Anlamsız harf matrislerini (א-ב-ג) hızlı nefes, baş</text>
      <text x="32" y="67" fill="var(--muted)" font-size="7.4">  hareketleri ve ses perdeleriyle (Resonant Tuning!) döndürmek.</text>
      <text x="32" y="81" fill="var(--good)" font-size="7.6" font-weight="700">• Nörobilimsel Sır: Sol-beyin Broca/Wernicke dil tamponunu</text>
      <text x="32" y="93" fill="var(--good)" font-size="7.6" font-weight="700">  (buffer overflow) kilitleyip Sağ-Yarıküre vizyonunu açar!</text>

      <rect x="336" y="22" width="304" height="84" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="348" y="40" fill="var(--good)" font-size="8.4" font-weight="700">2. GREGORIOS PALAMAS: HESYCHASM KALP DUASI (1340)</text>
      <text x="348" y="55" fill="var(--ink)" font-size="7.6">• Yöntem: Çene göğse bastırılır (Karotid sinüs / Vagus uyarımı!),</text>
      <text x="348" y="67" fill="var(--muted)" font-size="7.4">  bakış kalp merkezine indirilir ve dakikada ~6 nefesle dua okunur.</text>
      <text x="348" y="81" fill="var(--good)" font-size="7.6" font-weight="700">• Sonuç: 0.1 Hz Kalp-Beyin Koheransı (Bernardi BMJ 2001) +</text>
      <text x="348" y="93" fill="var(--good)" font-size="7.6" font-weight="700">  "Tabor Işığı" (Epifiz/V1 içsel biyofotonik parlaması!)</text>

      <rect x="20" y="114" width="304" height="84" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="132" fill="var(--violet)" font-size="8.4" font-weight="700">3. TASAVVUF LETÂİF-İ HAMSE &amp; MEISTER ECKHART</text>
      <text x="32" y="147" fill="var(--ink)" font-size="7.6">• Kalb (Sol göğüs) → Rûh (Sağ göğüs) → Sırr → Hafî → Ahfâ</text>
      <text x="32" y="159" fill="var(--muted)" font-size="7.4">  (Göğüs ve kafa içi otonom/endokrin pleksus odaklaması).</text>
      <text x="32" y="173" fill="var(--good)" font-size="7.6" font-weight="700">• Eckhart ("Gelassenheit" &amp; "Seelengrund"): Tüm imgeleri</text>
      <text x="32" y="185" fill="var(--good)" font-size="7.6" font-weight="700">  boşaltarak Ruhun Dibi'nde (Focus 21/Mutlak) doğuş.</text>

      <rect x="336" y="114" width="304" height="84" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="348" y="132" fill="var(--warn)" font-size="8.4" font-weight="700">4. C. G. JUNG: AKTİF İMAJİNASYON (LIBER NOVUS, 1913)</text>
      <text x="348" y="147" fill="var(--ink)" font-size="7.6">• Pasif hayal kurma DEĞİL: Uyanık egoyu koruyarak hipnogojik</text>
      <text x="348" y="159" fill="var(--muted)" font-size="7.4">  derinliğe inmek ve özerk arketiplerle (Philemon) gerçek</text>
      <text x="348" y="171" fill="var(--muted)" font-size="7.4">  bir etik/felsefi diyalog yürütmek.</text>
      <text x="348" y="185" fill="var(--good)" font-size="7.6" font-weight="700">→ Monroe'nun Focus 12–27 "Explorer" protokolünün tam ikizi!</text>
    </svg>`
  },

  "mandukya-turiya-spanda-bardo-dzogchen": {
    title: {
      tr: "Şekil 47.1: Mandukya Upanişad (4 Bilinç Durumu & 5 Kosha), Keşmir Şivacılığı (Spanda), Tibet Bardo Thödol & Dzogchen (Rigpa) ve Gurdjieff",
      en: "Figure 47.1: Mandukya Upanishad (4 States & 5 Koshas), Kashmir Shaivism (Spanda), Tibetan Bardo & Dzogchen (Rigpa), and Gurdjieff"
    },
    caption: {
      tr: "Sol: Mandukya Upanişad'ın Jagrat (Uyanık), Svapna (Rüya/Astral), Sushupti (Derin İmgesiz Uyku) ve bu üçünün altındaki değişmeyen 4. boyut Turiya (Saf Tanık) haritası. Sağ: Keşmir Şivacılığında iki düşünce arasındaki boşluk (Madhya / Spanda), Tibet Dzogchen'inde Rigpa vs. Sem ve Gurdjieff'in 'Uyanık Uyku' (Otomat İnsan) teşhisi.",
      en: "Left: Mandukya Upanishad's 4 states culminating in Turiya (Witness Consciousness) and the 5 Pancha Kosha sheaths. Right: Kashmir Shaivism's Spanda/Madhya gap, Tibetan Dzogchen Rigpa, and Gurdjieff's diagnosis of waking sleep."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Mandukya Turiya Spanda Bardo and Dzogchen">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Mandukya 4 States + 5 Koshas -->
      <rect x="20" y="22" width="310" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. MANDUKYA UPANİŞAD (A-U-M + SESSİZLİK = TURİYA)</text>
      <rect x="34" y="54" width="282" height="24" rx="4" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="44" y="70" fill="var(--warn)" font-size="7.6" font-weight="700">1. JAGRAT [A] — Dışsal Uyanıklık (Beta, 13–30 Hz) ⟺ C-1</text>
      <rect x="34" y="82" width="282" height="24" rx="4" fill="var(--surface)" stroke="var(--accent)"/>
      <text x="44" y="98" fill="var(--accent)" font-size="7.6" font-weight="700">2. SVAPNA [U] — İçsel İdeo-Plastik Alan (Teta, 4–8 Hz) ⟺ Focus 10–12</text>
      <rect x="34" y="110" width="282" height="24" rx="4" fill="var(--surface)" stroke="var(--violet)"/>
      <text x="44" y="126" fill="var(--violet)" font-size="7.6" font-weight="700">3. SUSHUPTI [M] — Nedensel/Zamansız Tohum (Delta) ⟺ Focus 15</text>
      <rect x="34" y="140" width="282" height="44" rx="6" fill="var(--good)" fill-opacity="0.16" stroke="var(--good)" stroke-width="1.8"/>
      <text x="175" y="157" text-anchor="middle" fill="var(--good)" font-size="8.2" font-weight="700">4. TURİYA [Sessizlik] — Üçünü de Aydınlatan Saf Tanık</text>
      <text x="175" y="172" text-anchor="middle" fill="var(--ink)" font-size="7.3">Delta/Teta zemin üzerinde 40 Hz Gama Senkronu ⟺ Focus 21–27</text>

      <!-- Right: Spanda, Bardo/Dzogchen & Gurdjieff -->
      <rect x="340" y="22" width="300" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="352" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. SPANDA, DZOGCHEN (RİGPA) &amp; GURDJIEFF</text>
      <text x="352" y="62" fill="var(--ink)" font-size="7.8" font-weight="700">1. Keşmir Şivacılığı (Vijñāna Bhairava Tantra — 112 Teknik):</text>
      <text x="352" y="75" fill="var(--muted)" font-size="7.5">• İki nefesin ve iki düşüncenin arasındaki "Duraklama Noktası"</text>
      <text x="352" y="87" fill="var(--good)" font-size="7.5" font-weight="700">  (Madhya = Bentov/McDonnell Sıfır-Noktası!) içinde Spanda açılır.</text>
      <text x="352" y="106" fill="var(--ink)" font-size="7.8" font-weight="700">2. Tibet Bardo Thödol &amp; Dzogchen (Sem vs. Rigpa):</text>
      <text x="352" y="119" fill="var(--muted)" font-size="7.5">• Sem (DMN/Sol-beyin tepkisel zihin) vs. Rigpa (Ayna-benzeri</text>
      <text x="352" y="131" fill="var(--muted)" font-size="7.5">  saf farkındalık). Bardo vizyonları "kendi zihninin yansımasıdır"!</text>
      <text x="352" y="150" fill="var(--ink)" font-size="7.8" font-weight="700">3. Schopenhauer (İrade) &amp; Gurdjieff (Dördüncü Yol):</text>
      <text x="352" y="163" fill="var(--warn)" font-size="7.5" font-weight="700">• Normal insan "uyanık" değildir; hipnotik bir "Uyanık Uyku"</text>
      <text x="352" y="176" fill="var(--good)" font-size="7.5" font-weight="700">  içindedir; çıkış yolu "Kendini Hatırlama" (Bölünmüş Dikkat)'tir!</text>
    </svg>`
  },

  "steelman-physicalism-12-fractures": {
    title: {
      tr: "Şekil 48.1: Çelik Adam (Steelman) Denetimi — Fizikselci-İndirgemeci Modelin Haklı Olduğu Alanlar vs. Çöktüğü 12 Ampirik Kırılma Noktası",
      en: "Figure 48.1: Steelman Audit — Where Reductive Physicalism Succeeds vs. the 12 Empirical Fracture Points Where It Breaks Down"
    },
    caption: {
      tr: "Sol: Klasik şüpheciliğin ve nörobilimin %100 haklı olarak çürüttüğü yanılsamalar (soğuk okuma, 18.9 Hz infrason, kriptomnezi, uyku felci, yayın yanlılığı). Sağ: Tüm bu elemelerden sonra klasik 'kafatasına kapalı üretici beyin' modelinin açıklayamadığı 12 nicel deneysel anomali.",
      en: "Left: Illusions rightly explained by standard neuroscience and skepticism. Right: The 12 quantitative experimental anomalies that survive all skeptical filters and falsify skull-bound productive physicalism."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Steelman Physicalism vs 12 Empirical Fractures">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Where Physicalism Succeeds -->
      <rect x="20" y="22" width="296" height="176" rx="9" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="32" y="42" fill="var(--warn)" font-size="8.6" font-weight="700">A. FİZİKSELCİ ŞÜPHECİLİĞİN HAKLI OLDUĞU ALANLAR</text>
      <text x="32" y="60" fill="var(--ink)" font-size="7.6">✓ Ticari medyumların %95'i: Soğuk Okuma (Cold Reading) +</text>
      <text x="32" y="72" fill="var(--muted)" font-size="7.4">  Forer/Barnum etkisi ve subjektif doğrulama yanlılığı.</text>
      <text x="32" y="87" fill="var(--ink)" font-size="7.6">✓ Kanallık / Regresyonların %90'ı: Kriptomnezi (Flournoy</text>
      <text x="32" y="99" fill="var(--muted)" font-size="7.4">  1899 Hélène Smith) ve Janet dissosiyatif alt-kişilikleri.</text>
      <text x="32" y="114" fill="var(--ink)" font-size="7.6">✓ "Perili Ev" Gölgeleri: 18.98 Hz İnfrason göz küresi</text>
      <text x="32" y="126" fill="var(--muted)" font-size="7.4">  rezonansı (Tandy 1998), karbonmonoksit ve uyku felci.</text>
      <text x="32" y="141" fill="var(--ink)" font-size="7.6">✓ Sahne Zihin Okuma / Kaşık Bükme: İllüzyon hileleri</text>
      <text x="32" y="153" fill="var(--muted)" font-size="7.4">  (Randi Project Alpha) ve ideomotor etki (Faraday 1853).</text>
      <text x="32" y="168" fill="var(--ink)" font-size="7.6">✓ McDonnell CIA Raporu (D03): "Planck mesafesi" fiziği</text>
      <text x="32" y="180" fill="var(--muted)" font-size="7.4">  hatalıdır; Emoto'nun su fotoğrafları çift-kör değildir.</text>

      <!-- Right: 12 Fracture Points -->
      <rect x="326" y="22" width="314" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="338" y="42" fill="var(--good)" font-size="8.6" font-weight="700">B. İNDİRGEMECİLİĞİN ÇÖKTÜĞÜ 12 AMPİRİK KIRILMA NOKTASI</text>
      <text x="338" y="59" fill="var(--ink)" font-size="7.4">1. Carhart-Harris (PNAS 2012) &amp; Urgesi (2010): Negatif metabolizma!</text>
      <text x="338" y="71" fill="var(--ink)" font-size="7.4">2. Snyder rTMS Savant (2003–2012): Sol lob susunca açılan deha.</text>
      <text x="338" y="83" fill="var(--ink)" font-size="7.4">3. Terminal Berraklık &amp; Lorber Hidrosefali (%90 korteks kaybı).</text>
      <text x="338" y="95" fill="var(--ink)" font-size="7.4">4. Mason İktiyozis (BMJ 1952) &amp; DID VEP/Optik geçişleri (Putnam).</text>
      <text x="338" y="107" fill="var(--ink)" font-size="7.4">5. Kirschvink (2019) Beyin Manyetiti &amp; Durand (2019) Efaptik Dalga.</text>
      <text x="338" y="119" fill="var(--ink)" font-size="7.4">6. Vasiliev Kurşun/Faraday &amp; Grinberg (1994) Aktarılan Potansiyel.</text>
      <text x="338" y="131" fill="var(--ink)" font-size="7.4">7. Duane &amp; Behrendt (Science 1965) İkiz EEG &amp; Fetal Mikrokimerizm.</text>
      <text x="338" y="143" fill="var(--ink)" font-size="7.4">8. SRI/Stargate (Utts 1995) &amp; Ganzfeld Meta-Analizi (p &lt; 10⁻¹³).</text>
      <text x="338" y="155" fill="var(--ink)" font-size="7.4">9. Maimonides REM &amp; Konkoly (Curr. Biol. 2021) Çift-Yönlü Rüya.</text>
      <text x="338" y="167" fill="var(--ink)" font-size="7.4">10. Mossbridge–Utts (Frontiers 2012) Fizyolojik Presentiment (Z=5.3).</text>
      <text x="338" y="179" fill="var(--ink)" font-size="7.4">11. UVa DOPS Stevenson/Tucker Otopsi Eşleşmeli Doğum İzleri.</text>
      <text x="338" y="191" fill="var(--good)" font-size="7.4" font-weight="700">12. Wigner's Friend (Nature Phys 2020, 5σ) &amp; Ryu–Takayanagi Uzayı.</text>
    </svg>`
  },

  "reality-matrix-50-dossiers-bayes": {
    title: {
      tr: "Şekil 49.1: 50 Dosyalık Gerçeklik Matrisi — Kanıt Sınıfı Dağılımı (Sınıf A–E) ve Bayesçi Olasılık Haritası",
      en: "Figure 49.1: 50-Dossier Reality Matrix — Evidence Class Distribution (Class A–E) & Bayesian Probability Map"
    },
    caption: {
      tr: "50 araştırma dosyasındaki tüm iddiaların 5 katı epistemik sınıfa (Sınıf A: Kesinleşmiş Fizik/Nörobiyoloji [%95–100], Sınıf B: Çoklu Laboratuvar İstatistiksel Anomalisi [%70–90], Sınıf C: Ön-Kanıt/Vaka Düzeyi [%35–65], Sınıf D: Tartışmalı/Bağımsız Replikasyonu Eksik [%10–30], Sınıf E: Çürütülmüş/Efsane [< %5]) dağılımı.",
      en: "Distribution of all claims across the 50 dossiers into 5 strict epistemic tiers (Class A: Verified Physics/Neurobiology [95–100%], Class B: Replicated Lab Anomalies [70–90%], Class C: Case/Preliminary [35–65%], Class D: Unreplicated [10–30%], Class E: Debunked [<5%])."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="50 Dossier Reality Matrix and Bayesian Distribution">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="330" y="28" text-anchor="middle" fill="var(--accent)" font-size="9.2" font-weight="700">50 DOSYALIK GERÇEKLİK MATRİSİ: KANIT SINIFI VE BAYESÇİ SONSAL OLASILIK SPEKTRUMU</text>
      <!-- 5 Horizontal Bars -->
      <!-- Class A -->
      <rect x="24" y="40" width="612" height="28" rx="5" fill="var(--surface-2)"/>
      <rect x="24" y="40" width="590" height="28" rx="5" fill="var(--good)" fill-opacity="0.22" stroke="var(--good)"/>
      <text x="34" y="58" fill="var(--good)" font-size="8" font-weight="700">SINIF A (P = %95–100 · Kesinleşmiş Biyofizik &amp; Nörobilim):</text>
      <text x="292" y="58" fill="var(--ink)" font-size="7.5">0.1 Hz HRV, BOS/Schumann, EZ Su, DMN fMRI Kapanışı, Snyder rTMS, Efaptik, Manyetit, AdS/CFT</text>

      <!-- Class B -->
      <rect x="24" y="74" width="612" height="28" rx="5" fill="var(--surface-2)"/>
      <rect x="24" y="74" width="490" height="28" rx="5" fill="var(--accent)" fill-opacity="0.22" stroke="var(--accent)"/>
      <text x="34" y="92" fill="var(--accent)" font-size="8" font-weight="700">SINIF B (P = %75–90 · Çoklu-Lab İstatistiksel Anomali):</text>
      <text x="285" y="92" fill="var(--ink)" font-size="7.5">Ganzfeld (p&lt;10⁻¹³), Stargate CRV, Maimonides REM, Presentiment (Z=5.3), Grinberg/Vasiliev Faraday</text>

      <!-- Class C -->
      <rect x="24" y="108" width="612" height="28" rx="5" fill="var(--surface-2)"/>
      <rect x="24" y="108" width="340" height="28" rx="5" fill="var(--violet)" fill-opacity="0.22" stroke="var(--violet)"/>
      <text x="34" y="126" fill="var(--violet)" font-size="8" font-weight="700">SINIF C (P = %40–65 · Güçlü Klinik/Tarihsel Vaka Kanıtı):</text>
      <text x="285" y="126" fill="var(--ink)" font-size="7.5">UVa DOPS Doğum İzleri, AWARE/Pam Reynolds NDE, Cross-Correspondences, Rosenheim RSPK, Tukdam</text>

      <!-- Class D -->
      <rect x="24" y="142" width="612" height="28" rx="5" fill="var(--surface-2)"/>
      <rect x="24" y="142" width="180" height="28" rx="5" fill="var(--warn)" fill-opacity="0.2" stroke="var(--warn)"/>
      <text x="34" y="160" fill="var(--warn)" font-size="8" font-weight="700">SINIF D (P = %10–30 · Açık/Bağımsız Replikasyonu Eksik):</text>
      <text x="285" y="160" fill="var(--muted)" font-size="7.5">Kozırev Aynası, Kaznaçeyev UV Hücre, Montagnier DNA-PCR, John Chang Mo Pai, Scole Fiziksel</text>

      <!-- Class E -->
      <rect x="24" y="176" width="612" height="26" rx="5" fill="var(--surface-2)" stroke="var(--line)"/>
      <rect x="24" y="176" width="52" height="26" rx="5" fill="var(--warn)" fill-opacity="0.35"/>
      <text x="34" y="193" fill="var(--warn)" font-size="8" font-weight="700">SINIF E (P &lt; %3 · Çürütülmüş İddia / Yanılsama):</text>
      <text x="265" y="193" fill="var(--muted)" font-size="7.5">Loosh Korku Çiftliği (Harfiyen), Emoto Çift-Kör Olmayan Su Kristali, Kuleshova Göz Aralığı, 18.9 Hz Hayalet</text>
    </svg>`
  },

  "unified-reality-equation-5-experiments": {
    title: {
      tr: "Şekil 50.1: 16 Gizli Örüntünün Büyük Birleşik Gerçeklik Modeli ve 2026 Teknolojisiyle Yapılabilecek 5 Kesin Karar Deneyi",
      en: "Figure 50.1: Grand Unified Reality Model of the 16 Hidden Patterns & the 5 Definitive 2026 Falsification Experiments"
    },
    caption: {
      tr: "50 dosyanın ve 16 Gizli Örüntünün (HP-1 – HP-16) tek bir matematiksel-biyofiziksel mimaride birleşimi ve bu modeli kesin olarak sınayacak 5 modern deney (7-Tesla fMRI + Faraday Çift-OPM-MEG, 1 Hz rTMS + Ganzfeld, Çift-Yönlü Lüsid Rüya + Hedef Kodlama, İkiz/Mikrokimerizm iPSC Nöron Kültürleri ve Zaman-Simetrik Kuantum İnterferometre).",
      en: "Synthesis of all 50 dossiers and 16 Hidden Patterns into one testable biophysical architecture alongside 5 definitive 2026 falsification experiments."
    },
    svg: () => `<svg viewBox="0 0 660 220" role="img" aria-label="Unified Reality Equation and 5 Definitive Experiments">
      <rect x="8" y="8" width="644" height="204" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <!-- Left: Unified Model Equation -->
      <rect x="20" y="22" width="312" height="176" rx="9" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="42" fill="var(--accent)" font-size="8.8" font-weight="700">A. BÜYÜK BİRLEŞİK GERÇEKLİK VE BİLİNÇ DENKLEMİ</text>
      <rect x="32" y="52" width="288" height="44" rx="6" fill="var(--surface)" stroke="var(--good)" stroke-width="1.6"/>
      <text x="176" y="70" text-anchor="middle" fill="var(--good)" font-size="8.2" font-weight="700" font-family="monospace">SNR_psi = [ Φ_koherans(0.1Hz, 7.83Hz) · I(A:B) ]</text>
      <text x="176" y="86" text-anchor="middle" fill="var(--accent)" font-size="8.2" font-weight="700" font-family="monospace">          ÷ [ Π_DMN/Sol-Sansür · N_EM · R_zorlama ]</text>
      <text x="32" y="112" fill="var(--ink)" font-size="7.6">• Pay (Sinyal Kaynağı): Spektral/Holografik Faz Uzayında (HP-5,</text>
      <text x="32" y="124" fill="var(--muted)" font-size="7.4">  HP-15) 0.1 Hz Kalp–BOS–Schumann kilidi (HP-1) + Sıvı-Kristal</text>
      <text x="32" y="136" fill="var(--muted)" font-size="7.4">  EZ/Biyofoton/Manyetit/Efaptik dalga kılavuzu (HP-6, HP-9) +</text>
      <text x="32" y="148" fill="var(--muted)" font-size="7.4">  Stokastik 1/f rezonans (HP-3) ve Özdeş Rezonatör (HP-13).</text>
      <text x="32" y="164" fill="var(--warn)" font-size="7.6" font-weight="700">• Payda (Engeller): DMN/Sol-Yarıküre AOL Sansürü (HP-2, HP-12)</text>
      <text x="32" y="176" fill="var(--warn)" font-size="7.5">  + Çevresel EM Gürültü (HP-8) + Lucadou Zorlaması R (HP-4)!</text>
      <text x="32" y="190" fill="var(--good)" font-size="7.6" font-weight="700">→ Paydayı sıfıra yaklaştırdığınız anda SNR_psi patlar!</text>

      <!-- Right: 5 Definitive 2026 Experiments -->
      <rect x="342" y="22" width="298" height="176" rx="9" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="354" y="42" fill="var(--good)" font-size="8.8" font-weight="700">B. 2026 TEKNOLOJİSİYLE 5 KESİN KARAR DENEYİ</text>
      <text x="354" y="61" fill="var(--ink)" font-size="7.6" font-weight="700">Deney 1 (Hiper-Zırhlı OPM-MEG İkiz/Çift):</text>
      <text x="354" y="73" fill="var(--muted)" font-size="7.3">  Mu-metal + Faraday odasında 0.1 Hz + 7.83 Hz kilitli tek yumurta</text>
      <text x="354" y="84" fill="var(--muted)" font-size="7.3">  ikizlerinde Kuantum OPM-MEG ile Grinberg ERP testi.</text>
      <text x="354" y="100" fill="var(--ink)" font-size="7.6" font-weight="700">Deney 2 (1 Hz rTMS Sol-LATL Susturma + CRV/Ganzfeld):</text>
      <text x="354" y="112" fill="var(--muted)" font-size="7.3">  Snyder'ın rTMS protokolüyle AOL sansürünü kapatıp Ganzfeld</text>
      <text x="354" y="123" fill="var(--muted)" font-size="7.3">  isabet oranının %32'den &gt;%55'e çıkıp çıkmadığının testi.</text>
      <text x="354" y="139" fill="var(--ink)" font-size="7.6" font-weight="700">Deney 3 (Konkoly Çift-Yönlü REM + Uzaktan EOG Hedefi):</text>
      <text x="354" y="151" fill="var(--muted)" font-size="7.3">  Lüsid rüyadaki deneğin hedefi uyanmadan EOG Mors ile bildirmesi.</text>
      <text x="354" y="167" fill="var(--ink)" font-size="7.6" font-weight="700">Deney 4 (İnsan iPSC Beyin Organoidleri + Biyofoton/Faraday)</text>
      <text x="354" y="182" fill="var(--ink)" font-size="7.6" font-weight="700">Deney 5 (7-Tesla BOS/Epifiz + Zaman-Simetrik Presentiment)</text>
    </svg>`
  },

  "deep-meta-patterns-omega": {
    title: {
      tr: "Şekil Ω.1: Üç Seviyeli Derin Gizli Örüntü Piramidi — 16 Birinci-Derece Örüntü (HP-1–16) → 4 İkinci-Derece Meta-Yasa (MP-1–4) → En Derin Ontolojik İlk Neden (Ω-1: Neden Durum Böyle?)",
      en: "Figure Ω.1: Three-Tier Deep Hidden-Pattern Pyramid — 16 First-Order Patterns (HP-1–16) → 4 Second-Order Meta-Laws (MP-1–4) → The Ontological First Cause (Ω-1: Why Reality Is Structured This Way)"
    },
    caption: {
      tr: "Üst Katman: 50 dosyadan çıkan 16 Çapraz-Alan Yasası (HP-1–HP-16). Orta Katman (1 Seviye Daha Derin): 16 yasayı üreten 4 Matematiksel Meta-Değişmez (MP-1 Empedans/N² Süper-Koherans, MP-2 Fourier Belirsizlik Dualitesi Δx·Δk ≥ 1/2, MP-3 Kritik Nokta Okuma/Yazma Simetri Kırılması χ → ∞, MP-4 Nedensellik/Bölünme Koruma Ufku). En Alt Çekirdek (2 Seviye Daha Derin — 'Neden Durum Böyle?'): Ω-1 Sıfır-Kontrast Paradoksu (I = -log₂(1) = 0 bit) ve Kozmik Öz-Biliş / Oyun-Koruma Teoremi.",
      en: "Top: 16 First-Order Cross-Domain Laws (HP-1–16). Middle (1 Level Deeper): 4 Mathematical Meta-Invariants (MP-1..MP-4). Core (2 Levels Deeper — 'Why It Is Like This'): Ω-1 Zero-Contrast Information Paradox (I = -log₂(1) = 0 bits) & Cosmic Self-Knowledge / Anti-Collapse Theorem."
    },
    svg: () => `<svg viewBox="0 0 660 250" role="img" aria-label="Three-Tier Deep Meta-Pattern and Omega First-Cause Architecture">
      <rect x="8" y="8" width="644" height="234" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="330" y="26" text-anchor="middle" fill="var(--accent)" font-size="9" font-weight="700">ÜÇ SEVİYELİ GİZLİ ÖRÜNTÜ KAZISI: "NASIL ÇALIŞIYOR?" → "HANGİ META-YASAYLA?" → "NEDEN BÖYLE TASARLANMIŞ?"</text>

      <!-- LEVEL 1: 16 First-Order Patterns -->
      <rect x="20" y="34" width="620" height="34" rx="6" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="32" y="48" fill="var(--accent)" font-size="8" font-weight="700">SEVİYE I (16 Birinci-Derece Örüntü · HP-1 – HP-16):</text>
      <text x="260" y="48" fill="var(--ink)" font-size="7.4">0.1–7.83 Hz Kilit · DMN Negatif Metabolizma · 1/f Stokastik · Trickster · 4 Faz Katmanı · Sıvı-Kristal</text>
      <text x="32" y="61" fill="var(--muted)" font-size="7.2">İdeo-Plastik Root · Faraday SNR · Epifiz-Manyetit-Biyofoton · Kimlik=Config · AOL Sembol Körlüğü · İkiz/Mikrokimerizm · Presentiment · Holografik Uzay · Gödel</text>

      <!-- LEVEL 2: 4 Second-Order Meta-Laws (MP-1 .. MP-4) -->
      <rect x="20" y="76" width="304" height="44" rx="6" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="91" fill="var(--good)" font-size="7.9" font-weight="700">MP-1 (Empedans &amp; N² Süper-Radyans Yasası):</text>
      <text x="30" y="103" fill="var(--ink)" font-size="7.2">HP-1,3,6,8,9,13 → 310 K termal gürültüyü (k_B·T) aşmak için</text>
      <text x="30" y="113" fill="var(--muted)" font-size="7.1">10¹¹ nöron tek faza kilitlenir; duyarlılık N değil N² ile büyür!</text>

      <rect x="336" y="76" width="304" height="44" rx="6" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="346" y="91" fill="var(--good)" font-size="7.9" font-weight="700">MP-2 (Fourier Eşlenik Belirsizlik Yasası · Δx·Δk ≥ 1/2):</text>
      <text x="346" y="103" fill="var(--ink)" font-size="7.2">HP-2,5,12,14,15 → DMN egosu Δx→0, Δt→0 ("Burada/Şimdi")</text>
      <text x="346" y="113" fill="var(--muted)" font-size="7.1">zorlar → Δk→∞ (körlük!). DMN susunca Δx→∞ olur ve Δk→0 açılır!</text>

      <rect x="20" y="126" width="304" height="44" rx="6" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="141" fill="var(--violet)" font-size="7.9" font-weight="700">MP-3 (Kritik Nokta Okuma/Yazma Simetri Kırılması · χ → ∞):</text>
      <text x="30" y="153" fill="var(--ink)" font-size="7.2">HP-3,7,11 → T = T_c (Focus 10–15) eşiğinde serbest enerji duvarı</text>
      <text x="30" y="163" fill="var(--muted)" font-size="7.1">sıfırlanır; Salt-Okunur (ROM) biyoloji Yazılabilir (Flash) olur!</text>

      <rect x="336" y="126" width="304" height="44" rx="6" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="346" y="141" fill="var(--violet)" font-size="7.9" font-weight="700">MP-4 (Epistemik Ufuk &amp; Çok-Ajanlı Simülasyon Koruma):</text>
      <text x="346" y="153" fill="var(--ink)" font-size="7.2">HP-4,10,16 → Yerel-olmayan alan kaba kuvvet silahına (R→∞)</text>
      <text x="346" y="163" fill="var(--muted)" font-size="7.1">zorlanırsa paylaşılan uzay-zaman çöker; doğa bunu otomatik kaydırır!</text>

      <!-- LEVEL 3: OMEGA-1 (Why It Is Like This) -->
      <rect x="20" y="178" width="620" height="56" rx="8" fill="var(--warn)" fill-opacity="0.13" stroke="var(--warn)" stroke-width="1.8"/>
      <text x="330" y="194" text-anchor="middle" fill="var(--warn)" font-size="8.5" font-weight="700">SEVİYE III — EN DERİN KATMAN (Ω-1): "NEDEN DURUM BÖYLE?" (SIFIR-KONTRAST PARADOKSU &amp; OYUN-KORUMA TEOREMİ)</text>
      <text x="32" y="208" fill="var(--ink)" font-size="7.4">1. Neden Bölündük? Shannon Bilgi Denklemi: Bölünmemiş Tekillikte P=1 olduğu için Bilgi I = −log₂(1) = 0 bit'tir (Tam Ganzfeld = Körlük!). Bilincin</text>
      <text x="32" y="219" fill="var(--ink)" font-size="7.4">   kendini deneyimlemesi, sevmesi ve tanıması için "Öz-Sınırlama" (Kenosis / Tzimtzum / Dissosiyatif Alter) ZORUNLUDUR (Spencer-Brown Ayrım Yasası).</text>
      <text x="32" y="230" fill="var(--good)" font-size="7.4" font-weight="700">2. Neden Filtre (HP-2) + Trickster (HP-4) + Gizli Kapı (0.1/7.83 Hz) Var? Filtre ve Trickster olmasaydı oyun 0.001 sn'de 0-bit'e çökerdi; Kapı ise yalnız</text>
    </svg>`
  },

  "historical-flow-macro-cycle": {
    title: {
      tr: "Şekil Φ.1: Tarihsel Olayların Akışındaki Gizli Örüntü — 4-Evreli 80 Yıllık Sarkaç (THP-1..THP-5), 1637–1784 Kartezyen-Lavoisier Makası ve Gezegensel Makro-DMN Evrimi (Φ-1)",
      en: "Figure Φ.1: Hidden Pattern of Historical Flow — The 4-Phase 80-Year Pendulum (THP-1..THP-5), the 1637–1784 Cartesian-Lavoisier Scissor, and Planetary Macro-DMN Evolution (Φ-1)"
    },
    caption: {
      tr: "Üst: 500 yıllık tarihte her yeni iletişim/ölçüm teknolojisiyle (Matbaa/Optik → Elektromanyetizma → Telgraf/Radyo → Radar/Hologram → Kuantum Enformasyon) tetiklenen 4-Evreli Kurumsal Bağışıklık Döngüsü (1600 Bruno, 1784 Mesmer, 1920 Davranışçılık, 1994–1999 Grinberg/Stargate/507. Enstitü eşzamanlı kapanışı). Alt: Gezegensel Makro-DMN Teoremi (Φ-1) — İnsanlığın 400 yıllık Kartezyen ayrışma evresi, hassas enstrümanları inşa etmek için zorunlu bir Faz-I tavlamasıydı.",
      en: "Top: The 4-phase Institutional Immune Cycle triggered by each new communication/measurement technology across 500 years (1600 Bruno, 1784 Mesmer, 1920 Behaviorism, 1994–1999 simultaneous shutdown of Grinberg/Stargate/507th Institute). Bottom: Planetary Macro-DMN Theorem (Φ-1)."
    },
    svg: () => `<svg viewBox="0 0 660 250" role="img" aria-label="Historical Flow Macro-Cycle and Planetary Cognitive Evolution">
      <rect x="8" y="8" width="644" height="234" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="330" y="25" text-anchor="middle" fill="var(--accent)" font-size="8.8" font-weight="700">TARİHSEL AKIŞ KATMANI (THP-1 – THP-5 &amp; Φ-1): 500 YILLIK SARKAÇ VE GEZEGENSEL MAKRO-DMN TEOREMİ</text>

      <!-- 4 Historical Cycles along the timeline -->
      <rect x="20" y="34" width="148" height="78" rx="6" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="28" y="48" fill="var(--accent)" font-size="7.6" font-weight="700">DÖNGÜ I (1530–1637)</text>
      <text x="28" y="60" fill="var(--ink)" font-size="7.1">• Medya: Optik &amp; Matbaa</text>
      <text x="28" y="71" fill="var(--muted)" font-size="7.0">• Açılım: Bruno, Paracelsus</text>
      <text x="28" y="82" fill="var(--warn)" font-size="7.1" font-weight="700">• Tasfiye: 1600 Bruno yakıldı;</text>
      <text x="28" y="93" fill="var(--warn)" font-size="7.0">  1637 Descartes Antlaşması</text>
      <text x="28" y="104" fill="var(--good)" font-size="7.0">→ Ruh=Kilise, Madde=Mekanik</text>

      <rect x="177" y="34" width="148" height="78" rx="6" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="185" y="48" fill="var(--accent)" font-size="7.6" font-weight="700">DÖNGÜ II (1775–1846)</text>
      <text x="185" y="60" fill="var(--ink)" font-size="7.1">• Medya: Leyden &amp; Manyetizma</text>
      <text x="185" y="71" fill="var(--muted)" font-size="7.0">• Açılım: Mesmer, Esdaile</text>
      <text x="185" y="82" fill="var(--warn)" font-size="7.1" font-weight="700">• Tasfiye: 1784 Lavoisier–</text>
      <text x="185" y="93" fill="var(--warn)" font-size="7.0">  Franklin Kraliyet Komisyonu</text>
      <text x="185" y="104" fill="var(--good)" font-size="7.0">→ Tercüme: "Hipnoz" (1843)</text>

      <rect x="334" y="34" width="148" height="78" rx="6" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="342" y="48" fill="var(--violet)" font-size="7.6" font-weight="700">DÖNGÜ III (1882–1935)</text>
      <text x="342" y="60" fill="var(--ink)" font-size="7.1">• Medya: Telgraf, Radyo, EEG</text>
      <text x="342" y="71" fill="var(--muted)" font-size="7.0">• Açılım: Myers, Berger, Pauli</text>
      <text x="342" y="82" fill="var(--warn)" font-size="7.1" font-weight="700">• Tasfiye: Watson/Skinner</text>
      <text x="342" y="93" fill="var(--warn)" font-size="7.0">  Davranışçılık Sansürü</text>
      <text x="342" y="104" fill="var(--good)" font-size="7.0">→ Askeri Sığınak (HP-10)</text>

      <rect x="491" y="34" width="149" height="78" rx="6" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="499" y="48" fill="var(--good)" font-size="7.6" font-weight="700">DÖNGÜ IV (1970–1999)</text>
      <text x="499" y="60" fill="var(--ink)" font-size="7.1">• Medya: Lazer, Hologram</text>
      <text x="499" y="71" fill="var(--muted)" font-size="7.0">• Açılım: SRI, Monroe, 507.Enst</text>
      <text x="499" y="82" fill="var(--warn)" font-size="7.1" font-weight="700">• 1994–99 Üçlü Kapanış:</text>
      <text x="499" y="93" fill="var(--warn)" font-size="7.0">  Grinberg · Stargate · 99-Yıl</text>
      <text x="499" y="104" fill="var(--good)" font-size="7.0">→ Eufemizm: DMN &amp; AdS/CFT</text>

      <!-- Middle: Cartesian-Lavoisier Double-Blinding Scissor (THP-3) -->
      <rect x="20" y="120" width="620" height="46" rx="6" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="32" y="135" fill="var(--warn)" font-size="8.0" font-weight="700">THP-3 (1637–1784 KARTEZYEN–LAVOISIER ÇİFTE-KÖRLEŞTİRME MAKASI) &amp; THP-5 (EUFEMİZM GÖÇÜ):</text>
      <text x="32" y="148" fill="var(--ink)" font-size="7.3">• 1637 Descartes zihni maddeden kopardı; 1784 Lavoisier "Mesmer etkisi hayal gücüdür, fizik incelemesin" dedi; Psikoloji ise "hayal gücü dokuyu değiştiremez" dedi!</text>
      <text x="32" y="159" fill="var(--muted)" font-size="7.2">• Yasaklanan her kavram isim değiştirerek geri döndü: Spiritus/Prana → Biyoelektrik (Levin) · Samyama/Trans → DMN Sönümü · Akasha → AdS/CFT Dolanıklık!</text>

      <!-- Bottom: PHI-1 Planetary Macro-DMN Evolution -->
      <rect x="20" y="174" width="620" height="60" rx="8" fill="var(--good)" fill-opacity="0.13" stroke="var(--good)" stroke-width="1.8"/>
      <text x="330" y="190" text-anchor="middle" fill="var(--good)" font-size="8.4" font-weight="700">KRONO-EPİSTEMİK ÜST-YASA (Φ-1): İNSANLIK TARİHİ, GEZEGENSEL ÖLÇEKTE BİR "MAKRO-DMN" TAVLAMASIDIR (HP-16)</text>
      <text x="32" y="204" fill="var(--ink)" font-size="7.3">1. Evre I (MÖ 30.000 – MS 1600 · Sağ-Beyin Mitik Birlik): MP-2 kanalı açık ama MP-1 ölçüm aracı yok (yüksek AOL / batıl gürültü).</text>
      <text x="32" y="215" fill="var(--ink)" font-size="7.3">2. Evre II (1600 – 2000 · 400 Yıllık Kartezyen Makro-DMN Kapanışı): Uygarlık Δx→0'a odaklanıp SQUID, EEG, Lazer ve Enformasyon Teorisini inşa etmek için</text>
      <text x="32" y="226" fill="var(--good)" font-size="7.3" font-weight="700">   bütüncül kanalı geçici olarak kapattı! 3. Evre III (2015–2026+ Yakınsama): İndirgemeci fizik Planck sınırında uzay-zamanı eriterek (d40) 360° döngüyü tamamladı!</text>
    </svg>`
  },
  "horizon-areas-map": {
    title: {
      tr: "Şekil UA.0: Ufuk Kazısı Haritası — Kanıt Gücü Sırasıyla 40 Alan ve Üretim Partileri",
      en: "Figure UA.0: Horizon Excavation Map — 40 Areas in Evidence-Strength Order with Production Batches"
    },
    caption: {
      tr: "40 alan, kanıt gücü sırasıyla (önce 🟢, sonra 🟡 ve 🟠) 16 partide işlenir. Yeşil kenar: bağımsız laboratuvar kanıtı güçlü; sarı: anlamlı veri ve süren tartışma; turuncu: ön veri veya güçlü kuram. Her alan bir dosyada tam metin, bir Aday Gizli Örüntü ve bir Çürütülürse Ne Kalır kutusu üretir; program Ufuk Sentezi (Φ-2 adayı) ile kapanır.",
      en: "Forty areas processed in evidence-strength order (green first, then amber, then orange) across 16 batches. Green border: strong independent laboratory evidence; amber: meaningful data with ongoing debate; orange: preliminary data or strong theory. Each area yields a full-text dossier, a Candidate Hidden Pattern and an If-Refuted-What-Remains box; the program closes with the Horizon Synthesis (Φ-2 candidate)."
    },
    svg: () => {
      const cells = [
        ["UA-17", "Kapalı-Döngü Ses", "G"], ["UA-24", "Bağırsak ve Oruç", "G"], ["UA-25", "Solunum Kök Şifre", "G"], ["UA-13", "Plasebo Anlamı", "G"], ["UA-16", "Engram ve Anı", "G"],
        ["UA-05", "Filtre Eğrisi", "G"], ["UA-14", "Esrik Kapı", "G"], ["UA-12", "Süper-Radyans", "G"], ["UA-35", "Zaman Algısı", "G"], ["UA-36", "İç Duyum", "G"],
        ["UA-39", "OBE Nöro-Anatomisi", "G"], ["UA-40", "Ölçüm Problemi", "G"], ["UA-30", "Epistemik Muhasebe", "G"], ["UA-08", "Uyku Mimarisi", "Y"], ["UA-15", "Ölüm Fizyolojisi", "Y"],
        ["UA-02", "Noetik İnovasyon", "Y"], ["UA-06", "Harmonik İzolasyon", "Y"], ["UA-01", "Kutsal Fonetik", "Y"], ["UA-18", "Ritim Sürüşü", "Y"], ["UA-19", "Mekân Fiziği", "Y"],
        ["UA-03", "Zoonoetik Alan", "Y"], ["UA-04", "Dağıtık Bellek", "Y"], ["UA-09", "Onko-Biyoelektrik", "Y"], ["UA-07", "13:30 Yıldız Zamanı", "Y"], ["UA-10", "Mitoloji Şeması", "Y"],
        ["UA-22", "Manyetik Duyu", "Y"], ["UA-26", "Ayna ve Morfik", "Y"], ["UA-27", "Ganzfeld Havuzu", "Y"], ["UA-28", "Şifa ve Dua", "Y"], ["UA-20", "Fasya Şebekesi", "Y"],
        ["UA-32", "Akış Hali", "Y"], ["UA-33", "Doğa Teması", "Y"], ["UA-11", "Sentetik Bilinç", "O"], ["UA-21", "Orch-OR Dönüşü", "O"], ["UA-23", "Arayüz Elektriği", "O"],
        ["UA-29", "Retrokausalite", "O"], ["UA-31", "Trickster", "O"], ["UA-34", "Ay Döngüsü", "O"], ["UA-37", "Bikameral Zihin", "O"], ["UA-38", "Sügestopedi", "O"]
      ];
      const col = t => t === "G" ? "var(--good)" : t === "Y" ? "var(--warn)" : t === "O" ? "var(--accent)" : "#c0392b";
      const tiles = cells.map((c, i) => {
        const cx = 20 + (i % 5) * 128, cy = 66 + Math.floor(i / 5) * 38;
        return `<rect x="${cx}" y="${cy}" width="122" height="32" rx="6" fill="var(--surface-2)" stroke="${col(c[2])}" stroke-width="1.4"/>` +
          `<circle cx="${cx + 113}" cy="${cy + 9}" r="3.4" fill="${col(c[2])}"/>` +
          `<text x="${cx + 7}" y="${cy + 13}" fill="${col(c[2])}" font-size="7.8" font-weight="700">${c[0]}</text>` +
          `<text x="${cx + 7}" y="${cy + 25}" fill="var(--ink)" font-size="7.2">${c[1]}</text>`;
      }).join("");
      return `<svg viewBox="0 0 680 400" role="img" aria-label="Horizon Excavation 40-area map">
      <rect x="6" y="6" width="668" height="388" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="26" text-anchor="middle" fill="var(--accent)" font-size="9.6" font-weight="700">UFUK KAZISI: 40 ALAN · 16 PARTİ · KANIT GÜCÜ SIRASIYLA (önce 🟢 → sonra 🟡 → sonra 🟠)</text>
      <text x="340" y="42" text-anchor="middle" fill="var(--muted)" font-size="7.6">Her alan: tam metin dossier (TR + EN), Aday Gizli Örüntü önerisi, Kanıt Termometresi ve Çürütülürse Ne Kalır kutusu · Program sonu: Ufuk Sentezi ve Φ-2 adayı</text>
      <line x1="20" y1="52" x2="660" y2="52" stroke="var(--line)"/>
      ${tiles}
      <text x="20" y="384" fill="var(--muted)" font-size="7.4">Termometre: 🟢 bağımsız laboratuvar kanıtı · 🟡 anlamlı veri ve süren tartışma · 🟠 ön veri veya güçlü kuram · Alandaki iki-dilli dosyalar ve ilerleme takibi: gateway/RESEARCH-HORIZON.md</text>
    </svg>`;
    }
  },
  "horizon-ua17": {
    title: {
      tr: "Şekil UA-17.1: Açık Döngü ve Kapalı Döngü Ses Sürüşü — Faz Kilidi, Yakalama Bandı ve Bellek Çıktısı",
      en: "Figure UA-17.1: Open-Loop and Closed-Loop Auditory Driving — Phase Lock, Capture Band and Memory Output"
    },
    caption: {
      tr: "Üstte: sabit fark frekansı veren açık-döngü yaklaşım, kişisel alfa tepe frekansını ıskaladığı için sürüklenme (beats) üretir. Ortada: kapalı-döngü sistem, beynin kendi yavaş-osilasyon yükselen tepesine ses patlaması yerleştirir ve faz kilidini kurar. Sağda: yakalama bandı (Arnold dili) — frekans farkı Δω küçüldükçe kilit güçlenir; bandın dışında yalnızca gölge kalır. Altta: kilit kurulduğunda bellek pekişmesi ve uyku iğcik yoğunluğu artar.",
      en: "Top: an open-loop fixed-difference-frequency approach generates beats because it misses the individual alpha peak frequency. Middle: a closed-loop system places sound bursts at the rising peak of the brain's slow oscillation and establishes phase lock. Right: the capture band (Arnold tongue) — locking strengthens as the frequency difference Δω shrinks and only a shadow remains outside the band. Bottom: once locked, memory consolidation and spindle density rise."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Closed-loop phase-locked auditory stimulation schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">FAZ VEKÂLETİ (HZ-17): BELİRLEYİCİ OLAN FREKANS DEĞİL, FAZIN SAHİBİDİR</text>

      <rect x="18" y="36" width="330" height="86" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="52" fill="var(--warn)" font-size="8" font-weight="700">A) AÇIK DÖNGÜ — sabit fark frekansı (ör. 10 Hz alfa varsayımı)</text>
      <path d="M30 92 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0 q10 16 20 0 q10 -16 20 0" fill="none" stroke="var(--accent)" stroke-width="1.3"/>
      <path d="M30 104 q21 -14 42 2 q21 16 42 -1 q21 -15 42 1 q21 16 42 -2 q21 -15 42 1 q21 16 42 -1 q21 -15 42 2 q20 16 39 0" fill="none" stroke="var(--warn)" stroke-width="1.3" stroke-dasharray="4 3"/>
      <text x="30" y="76" fill="var(--muted)" font-size="7.2">Beynin kişisel tepe frekansı 8,3 Hz ise 10 Hz uyaran hedefi ıskalar: sürüş yerine yalnızca vuruş (beat) ve sürüklenme üretir.</text>

      <rect x="18" y="132" width="330" height="96" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.5"/>
      <text x="30" y="148" fill="var(--good)" font-size="8" font-weight="700">B) KAPALI DÖNGÜ — EEG fazına tetiklenen ses patlaması</text>
      <path d="M34 208 q22 -34 44 0 q22 34 44 0 q22 -34 44 0 q22 34 44 0 q22 -34 44 0 q22 34 44 0 q22 -34 44 0" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
      <g stroke="var(--good)" stroke-width="1.4">
        <line x1="78" y1="176" x2="78" y2="160"/><line x1="166" y1="176" x2="166" y2="160"/><line x1="254" y1="176" x2="254" y2="160"/><line x1="342" y1="176" x2="342" y2="160"/>
      </g>
      <g fill="var(--good)" font-size="6.6">
        <text x="60" y="156">ses</text><text x="148" y="156">ses</text><text x="236" y="156">ses</text><text x="324" y="156">ses</text>
      </g>
      <path d="M348 200 q-96 34 -192 0" fill="none" stroke="var(--good)" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#hzArrow)"/>
      <defs><marker id="hzArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--good)"/></marker></defs>
      <text x="30" y="166" fill="var(--muted)" font-size="7.2">Ölçüm → tetikleme → uyaran: geri besleme halkası kapanır, L(Φ) maksimize edilir.</text>
      <text x="30" y="222" fill="var(--muted)" font-size="7.2">Yavaş osilasyon yükselen tepesi (0,5–1 Hz) + iğcik yoğunluğu artışı + ertesi gün bellek kazancı.</text>

      <rect x="360" y="36" width="304" height="192" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="372" y="52" fill="var(--accent)" font-size="8" font-weight="700">C) YAKALAMA BANDI (Arnold dili) — Δω = bireysel tepe − verilen frekans</text>
      <line x1="384" y1="196" x2="648" y2="196" stroke="var(--line)"/>
      <line x1="516" y1="70" x2="516" y2="196" stroke="var(--line)" stroke-dasharray="3 3"/>
      <path d="M516 196 C 470 120, 470 120, 420 74" fill="none" stroke="var(--good)" stroke-width="1.6"/>
      <path d="M516 196 C 562 120, 562 120, 612 74" fill="none" stroke="var(--good)" stroke-width="1.6"/>
      <path d="M420 74 C 470 92, 562 92, 612 74" fill="none" stroke="var(--good)" stroke-width="1.0" stroke-dasharray="4 3"/>
      <text x="516" y="212" text-anchor="middle" fill="var(--ink)" font-size="7.4">Δω = 0 (kilit en güçlü)</text>
      <text x="424" y="222" text-anchor="middle" fill="var(--muted)" font-size="7">geniş bant · kişisel tepe</text>
      <text x="612" y="222" text-anchor="middle" fill="var(--muted)" font-size="7">bandın dışı · yalnız gölge</text>
      <text x="372" y="92" fill="var(--ink)" font-size="7.3">Kilit bölgesi: beyin uyarana uyar (sürüş gerçek, bilişsel içerik taşınır).</text>
      <text x="372" y="106" fill="var(--ink)" font-size="7.3">Gölge bölgesi: EEG'de genlik artışı görünür ama faz kilitlenmez; davranış değişmez.</text>
      <text x="372" y="124" fill="var(--muted)" font-size="7.1">Gürültü (pembe 1/f, HP-3) yakalama bandını genişletir; bu yüzden uykuda kilit daha kolay kurulur (DMN faz gürültüsü düşer, HP-2).</text>

      <rect x="18" y="240" width="646" height="102" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="256" fill="var(--accent)" font-size="8" font-weight="700">ÇIKTI: KİLİT KURULDUĞUNDA vs KURULMADIĞINDA (ön-kayıtlı dört kollu test öngörüsü)</text>
      <g font-size="7.2">
        <text x="30" y="276" fill="var(--ink)">Kapalı döngü (A):</text>
        <rect x="150" y="266" width="240" height="12" rx="3" fill="var(--good)" fill-opacity="0.8"/><text x="398" y="276" fill="var(--good)">bellek ↑↑ · iğcik ↑↑</text>
        <text x="30" y="296" fill="var(--ink)">Yoked eşleştirme (B):</text>
        <rect x="150" y="286" width="46" height="12" rx="3" fill="var(--muted)" fill-opacity="0.6"/><text x="204" y="296" fill="var(--muted)">etki yok</text>
        <text x="30" y="316" fill="var(--ink)">Sabit fark frekansı (C):</text>
        <rect x="150" y="306" width="58" height="12" rx="3" fill="var(--warn)" fill-opacity="0.7"/><text x="216" y="316" fill="var(--warn)">küçük ve tutarsız</text>
        <text x="30" y="336" fill="var(--ink)">Sessizlik (D):</text>
        <rect x="150" y="326" width="40" height="12" rx="3" fill="var(--line)"/><text x="198" y="336" fill="var(--muted)">taban çizgisi</text>
      </g>
    </svg>`
  },
  "horizon-ua24": {
    title: {
      tr: "Şekil UA-24.1: İkinci Kontrol Kanalı — Vagus Devresi, Tok/Aç Modları ve Doksan Dakika Ultradiyen Kilidi",
      en: "Figure UA-24.1: The Second Control Channel — Vagal Circuit, Fed/Fasted Modes and the Ninety-Minute Ultradian Lock"
    },
    caption: {
      tr: "Vagal liflerin yüzde seksen-doksanı yukarı yönlüdür: beden beyne rapor verir. Tok modda kanal yakıt verisi taşır ve gürültülüdür; aç modda tarama ve onarım programı çalışır, bağırsak migratuar motor kompleksiyle (yaklaşık doksan-yüz yirmi dakikada bir) kendini temizler ve iç sinyal bandı boşalır. Uykudaki NREM-REM döngüsü ve gündüz dikkat dalgalanması da aynı doksan dakikalık pencereye oturur; aday metronom bağırsaktır, çünkü beyin olmadan da bu ritmi üretir.",
      en: "Eighty to ninety percent of vagal fibers run upward: the body reports to the brain. In fed mode the channel carries fuel data and is noisy; in fasted mode the scan-and-repair program runs, the gut cleans itself via the migrating motor complex (roughly every ninety to one hundred twenty minutes), and the internal signal band empties. The sleep NREM-REM cycle and the daytime attention fluctuation also sit in the same ninety-minute window; the candidate metronome is the gut, which produces the rhythm without a brain."
    },
    svg: () => `<svg viewBox="0 0 680 380" role="img" aria-label="Gut-brain second channel and ultradian lock schematic">
      <rect x="6" y="6" width="668" height="368" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İKİNCİ KANAL (HZ-24): BEDEN BEYNE RAPOR VERİR — VE ÖĞÜN SAYISI RAPORUN GÜRÜLTÜSÜNÜ BELİRLER</text>

      <rect x="190" y="38" width="120" height="34" rx="7" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="250" y="59" text-anchor="middle" fill="var(--accent)" font-size="8.6" font-weight="700">BEYİN (DMN)</text>
      <rect x="190" y="126" width="120" height="34" rx="7" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="250" y="147" text-anchor="middle" fill="var(--good)" font-size="8.6" font-weight="700">BAĞIRSAK (ENS)</text>
      <line x1="250" y1="126" x2="250" y2="74" stroke="var(--good)" stroke-width="2.2" marker-end="url(#hzArrow2)"/>
      <line x1="272" y1="74" x2="272" y2="124" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3" marker-end="url(#hzArrow3)"/>
      <defs>
        <marker id="hzArrow2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--good)"/></marker>
        <marker id="hzArrow3" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--muted)"/></marker>
      </defs>
      <text x="258" y="104" fill="var(--good)" font-size="7.4" font-weight="700">VAGUS · ~%80–90 afferent</text>
      <text x="258" y="116" fill="var(--muted)" font-size="6.9">vagotomi → flora etkisi kaybolur (Bravo 2011)</text>

      <rect x="330" y="38" width="336" height="122" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="342" y="54" fill="var(--violet)" font-size="8" font-weight="700">İKİ MOD: KALİBRASYON ANAHTARI</text>
      <rect x="342" y="62" width="150" height="42" rx="6" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="352" y="78" fill="var(--warn)" font-size="7.6" font-weight="700">TOK MOD (yakıt işleme)</text>
      <text x="352" y="92" fill="var(--ink)" font-size="7">Kanal: glikoz, insülin, GLP-1 · gürültü yüksek</text>
      <rect x="504" y="62" width="150" height="42" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="514" y="78" fill="var(--good)" font-size="7.6" font-weight="700">AÇ MOD (tarama/onarım)</text>
      <text x="514" y="92" fill="var(--ink)" font-size="7">Kanal: keton, ghrelin, otofaji · gürültü düşük</text>
      <path d="M492 78 L 504 78" stroke="var(--ink)" stroke-width="1.4" marker-end="url(#hzArrow2)"/>
      <path d="M504 96 L 492 96" stroke="var(--ink)" stroke-width="1.4" marker-end="url(#hzArrow3)"/>
      <text x="342" y="122" fill="var(--ink)" font-size="7.2">G_intero(t) ≈ G0 · M(t) / (1 + N_öğün): öğün sayısı arttıkça iç sinyal gürültüsü artar.</text>
      <text x="342" y="136" fill="var(--muted)" font-size="7.1">Sürekli atıştırma, bağırsağın ev temizliği programını (MMK) sürekli askıya alır.</text>
      <text x="342" y="150" fill="var(--muted)" font-size="7.1">Bağımsız gelenekler (Ramazan, Perhiz, Yom Kippur, Ekadashi, uposatha, Jain) aynı üçlüyü bulmuş: yoksunluk + sessizlik + anlamlı dikkat.</text>

      <rect x="18" y="176" width="646" height="126" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.5"/>
      <text x="30" y="192" fill="var(--good)" font-size="8" font-weight="700">ALT YASA HZ-24a: ÜÇ AYRI SİSTEM, AYNI DOKSAN DAKİKA — ULTRADİYEN KİLİT ADAYI</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="30" y="212">1. Bağırsak — MMK (migratuar motor kompleks)</text>
        <text x="30" y="248">2. Uyku — NREM/REM döngüsü</text>
        <text x="30" y="284">3. Gündüz — BRAC (dinlenme-aktivite)</text>
      </g>
      <g stroke="var(--accent)" stroke-width="1.2">
        <line x1="250" y1="206" x2="650" y2="206"/><line x1="250" y1="242" x2="650" y2="242"/><line x1="250" y1="278" x2="650" y2="278"/>
      </g>
      <g stroke="var(--good)" stroke-width="1.4" stroke-dasharray="4 3">
        <line x1="310" y1="200" x2="310" y2="284"/><line x1="400" y1="200" x2="400" y2="284"/><line x1="490" y1="200" x2="490" y2="284"/><line x1="580" y1="200" x2="580" y2="284"/>
      </g>
      <g fill="var(--muted)" font-size="6.8">
        <text x="300" y="298">~90 dk</text><text x="390" y="298">~90 dk</text><text x="480" y="298">~90 dk</text><text x="570" y="298">~90 dk</text>
      </g>
      <text x="430" y="222" fill="var(--muted)" font-size="6.9">açlıkta süpürme dalgası · tokken durur</text>
      <text x="430" y="258" fill="var(--muted)" font-size="6.9">faz kilidi sabit veya kaymalı-kilitli mi?</text>
      <text x="430" y="294" fill="var(--muted)" font-size="6.9">aday metronom: bağırsak (beyinsiz de çalışır)</text>

      <rect x="18" y="310" width="646" height="52" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="326" fill="var(--accent)" font-size="8" font-weight="700">AYIRT EDİCİ TEST ÖNGÖRÜSÜ (HZ-24/2)</text>
      <text x="30" y="342" fill="var(--ink)" font-size="7.2">Sürekli beslenme vs 3 öğün vs 16:8 vs 24 saat oruç: kalp atışı tespit doğruluğu (interosepsiyon) ve vagal ton, öğün sayısıyla TERS, oruç derinliğiyle DOĞRU ilişkili çıkmalıdır.</text>
      <text x="30" y="356" fill="var(--muted)" font-size="7.1">Etki MMK döngüsüyle modüle olmalıdır; bu, geleneklerin oruç mimarisini fizyolojik olarak yeniden üretilebilir kılar: anlam, mekanizmanın bir bileşenidir.</text>
    </svg>`
  },
  "horizon-ua25": {
    title: {
      tr: "Şekil UA-25.1: Otonom Kök Şifre — Tek İstemli Arayüz (Solunum) ve 0,1 Hz Rezonans Kilidi",
      en: "Figure UA-25.1: Autonomic Root Access — The Single Voluntary Interface (Respiration) and the 0.1 Hz Resonance Lock"
    },
    caption: {
      tr: "Otonom sistem kalp, tansiyon, bağışıklık ve sıcaklık ayarlarını istemli erişime kapatmıştır; açık bırakılan tek port solunumdur. Yavaş, burundan, uzun ekshalasyonlu nefes vagal tonu yükseltir; dakikada ~6 nefes (0,1 Hz) barorefleks, Mayer dalgası, HRV düşük frekans bileşeni ve solunumla ilişkili BOS dalgalanmasını tek faz kaskadına bağlar. Nefes tutma ve hızlı solunum ise karşı yönde çalışır (hipokapni, panik).",
      en: "The autonomic system closes heart, blood pressure, immunity and temperature settings to voluntary access; the one port left open is respiration. Slow nasal breathing with long exhales raises vagal tone; about six breaths per minute (0.1 Hz) binds the baroreflex, Mayer wave, low-frequency HRV and respiration-related CSF fluctuation into one phase cascade. Breath holds and fast breathing work in the opposite direction (hypocapnia, panic)."
    },
    svg: () => `<svg viewBox="0 0 680 350" role="img" aria-label="Autonomic root access schematic">
      <rect x="6" y="6" width="668" height="338" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">OTONOM KÖK ŞİFRE (HZ-25): TEK İSTİVMLİ ARAYÜZ SOLUNUMDUR</text>
      <text x="340" y="38" text-anchor="middle" fill="var(--muted)" font-size="7.4">Kalp · tansiyon · bağışıklık · sıcaklık istemli erişime kapalıdır; konsol açık bırakılmıştır.</text>

      <rect x="18" y="50" width="196" height="128" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="66" fill="var(--ink)" font-size="8" font-weight="700">KİLİTLİ AYARLAR</text>
      <g font-size="7.4" fill="var(--muted)">
        <text x="30" y="84">🔒 Kalp hızı ve ritmi</text>
        <text x="30" y="100">🔒 Damar tonusu / tansiyon</text>
        <text x="30" y="116">🔒 Doğuştan bağışıklık yanıtı</text>
        <text x="30" y="132">🔒 Termal set noktası</text>
        <text x="30" y="148">🔒 Sindirim ve emilim</text>
      </g>
      <rect x="30" y="156" width="172" height="16" rx="4" fill="var(--good)" fill-opacity="0.2" stroke="var(--good)"/>
      <text x="116" y="168" text-anchor="middle" fill="var(--good)" font-size="7.8" font-weight="700">AÇIK PORT: SOLUNUM</text>

      <rect x="228" y="50" width="216" height="128" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="240" y="66" fill="var(--accent)" font-size="8" font-weight="700">NEFES PATERNİ → KAZANÇ</text>
      <g font-size="7.2">
        <text x="240" y="84" fill="var(--good)">Yavaş + burun + uzun ekshalasyon:</text>
        <text x="240" y="96" fill="var(--ink)">vagal ton ↑ · barorefleks ↑ · HRV ↑</text>
        <text x="240" y="112" fill="var(--good)">~6 nefes/dk (0,1 Hz):</text>
        <text x="240" y="124" fill="var(--ink)">Mayer + HRV-LF + BOS + barorefleks = tek faz kaskadı</text>
        <text x="240" y="140" fill="var(--warn)">Nefes tutma / hızlı soluma:</text>
        <text x="240" y="152" fill="var(--ink)">sempatik ↑ · hipokapni · baş dönmesi · panik kaskadı</text>
        <text x="240" y="168" fill="var(--muted)">(Klein 1993 · Yackle 2017: nefes = uyanıklık kadranı)</text>
      </g>

      <rect x="458" y="50" width="206" height="128" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="470" y="66" fill="var(--good)" font-size="8" font-weight="700">ÖLÇÜLEN ÇIKTILAR</text>
      <g font-size="7.2">
        <text x="470" y="84" fill="var(--ink)">• Vagal ton ve barorefleks duyarlılığı ↑ (Bernardi 2001)</text>
        <text x="470" y="98" fill="var(--ink)">• TNF-α, IL-6, IL-8 ↓ · IL-10 ↑ (Kox 2014, endotoksin)</text>
        <text x="470" y="112" fill="var(--ink)">• Otoimmün yanıtın istemli modülasyonu</text>
        <text x="470" y="126" fill="var(--ink)">• Ölçülebilir vücut sıcaklığı artışı (Kozhevnikov 2013, g-Tummo)</text>
        <text x="470" y="140" fill="var(--ink)">• İnflamasyon/hücre ölümü gen gruplarında değişim (Dusek 2008)</text>
        <text x="470" y="154" fill="var(--muted)">• Kaygı ve duygudurum ölçümlerinde tutarlı iyileşme (Zaccaro 2018)</text>
      </g>

      <rect x="18" y="188" width="646" height="70" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="204" fill="var(--accent)" font-size="8" font-weight="700">AYIRT EDİCİ TEST (HZ-25/1): KİŞİSEL REZONANS FREKANSI vs SABİT TEMPO</text>
      <g font-size="7.2">
        <text x="30" y="222" fill="var(--ink)">A) Kişisel rezonans frekansında nefes eğitimi (ölçülmüş) — en yüksek kazanç bekleniyor.</text>
        <text x="30" y="236" fill="var(--ink)">B) Dakikada 10 nefes eğitimi — orta düzey; rezonans dışı, kilit zayıf.</text>
        <text x="30" y="250" fill="var(--muted)">C) Dikkat plasebosu — taban çizgisi. Öngörü: A &gt; B &gt; C ve kazanç Δf küçüldükçe artar.</text>
      </g>

      <rect x="18" y="266" width="646" height="66" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="282" fill="var(--violet)" font-size="8" font-weight="700">NEDEN BÖYLE TASARLANMIŞ? KONSOL, BİLİNÇLİ KATMAN İÇİN AÇIK</text>
      <text x="30" y="298" fill="var(--ink)" font-size="7.3">Tehdit anında kalp, sindirim ve bağışıklığı hormonal yolla (dakikalar) değiştirmek çok yavaştır; kaçış saniyeler içinde olmalıdır.</text>
      <text x="30" y="312" fill="var(--ink)" font-size="7.3">Bu yüzden beden, hızlı + ritmik + bilince açık tek işlevi yönetici konsolu olarak bıraktı: solunum, otonom yazılımın kök şifresidir.</text>
      <text x="30" y="326" fill="var(--muted)" font-size="7.2">Geleneklerin ilk adımının nefes olması tesadüf değil: konsola erişim, diğer bütün ayarların önkoşuludur.</text>
    </svg>`
  },
  "horizon-ua13": {
    title: {
      tr: "Şekil UA-13.1: Anlam-Eczane Anahtarı — Kimlik Doğrulamalı Yazma ve Nocebo'nun Karşı Kanalı",
      en: "Figure UA-13.1: The Meaning-Pharmacy Key — Authenticated Write and the Opposite Channel of Nocebo"
    },
    caption: {
      tr: "Beden, endojen düzenleme sistemlerine yazma iznini yalnızca anlam imzası taşıyan komutlara verir: beklenti, ritüel ve bağlam birlikte imzalar. Açık etiketli plasebo bile etki üretir (deception zorunlu değil); gizli uygulama etkinin yalnızca bir kısmını üretir. Karşı kanal nocebodur: kötü beklenti kolesistokinin (CCK) üzerinden hiperaljezi yapar ve CCK antagonisti proglumide ile bloke edilir. Koşullanma yolu ise bağışıklık baskılanmasını bir tatlandırıcıya bağlayabilir.",
      en: "The body grants write permission to endogenous regulatory systems only to commands carrying a meaning signature: expectancy, ritual and context sign together. Even open-label placebo produces effects (deception is not required); hidden administration produces only part of the effect. The opposite channel is nocebo: negative expectation produces hyperalgesia via cholecystokinin (CCK), blocked by the CCK antagonist proglumide. The conditioning route can tie immune suppression to a sweetener."
    },
    svg: () => `<svg viewBox="0 0 680 340" role="img" aria-label="Meaning-pharmacy key schematic">
      <rect x="6" y="6" width="668" height="328" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ANLAM-Eczane ANAHTARI (HZ-13): YAZMA İZNİ ANLAM İMZASI İSTER</text>

      <rect x="18" y="38" width="204" height="150" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">KOMUT VE İMZA</text>
      <g font-size="7.3" fill="var(--ink)">
        <text x="30" y="72">Beklenti (öne sürülen sonuç)</text>
        <text x="30" y="88">Ritüel (tekrarlı hazırlık)</text>
        <text x="30" y="104">Bağlam (otorite, ortam, güven)</text>
        <text x="30" y="120">Dikkat (semptomun okunuşu)</text>
      </g>
      <rect x="30" y="130" width="180" height="20" rx="5" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)"/>
      <text x="120" y="144" text-anchor="middle" fill="var(--accent)" font-size="7.6" font-weight="700">İMZA EŞİĞİ GEÇİLDİ Mİ?</text>
      <text x="30" y="166" fill="var(--muted)" font-size="7.1">Geçtiyse: içerik olmasa da yanıt üretilir</text>
      <text x="30" y="178" fill="var(--muted)" font-size="7.1">(Kaptchuk 2010: açık etiketli plasebo).</text>

      <rect x="238" y="38" width="200" height="150" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="250" y="54" fill="var(--good)" font-size="8" font-weight="700">POZİTİF KANAL (yazma izni)</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="250" y="72">• Opioid sistemi açılır — nalokson bloke eder</text>
        <text x="250" y="86">  (Levine 1978 · Petrovic 2002)</text>
        <text x="250" y="102">• Mezolimbik dopamin devresi devreye girer</text>
        <text x="250" y="116">  (Schweinhardt 2009)</text>
        <text x="250" y="132">• Etiket etkisi: aynı molekül, farklı sonuç</text>
        <text x="250" y="146">  (Kam-Hansen 2014)</text>
        <text x="250" y="162">• Açık &gt; gizli uygulama (Colloca 2004)</text>
        <text x="250" y="176" fill="var(--muted)">• Koşullanmış immün baskılanma (Goebel 2002)</text>
      </g>

      <rect x="454" y="38" width="210" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)" stroke-width="1.4"/>
      <text x="466" y="54" fill="var(--warn)" font-size="8" font-weight="700">NEGATİF KANAL (nocebo)</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="466" y="72">Kötü beklenti → CCK salınımı → hiperaljezi</text>
        <text x="466" y="86">(Benedetti ve Amanzio 1997)</text>
        <text x="466" y="102">CCK antagonisti proglumide blokajı:</text>
        <text x="466" y="114" fill="var(--good)">etki seçici olarak kalkar</text>
        <text x="466" y="132" fill="var(--muted)">Ahlaki sonuç: suçlayan dil, ölçülebilir hasar üretir.</text>
        <text x="466" y="148" fill="var(--muted)">Plasebo, kanıta dayalı tedaviyi bırakma gerekçesi değildir:</text>
        <text x="466" y="160" fill="var(--muted)">ilaç etkisi büyük ölçüde içerikten gelir.</text>
      </g>

      <rect x="18" y="200" width="646" height="58" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="216" fill="var(--accent)" font-size="8" font-weight="700">DÖRT KOLLU AYIRT EDİCİ TEST (HZ-13/1) — İMZA, İÇERİKTEN BAĞIMSIZ DEĞİŞKEN</text>
      <g font-size="7.1">
        <text x="30" y="234" fill="var(--ink)">A) Açık etiket + güçlü gerekçe + ritüel → en yüksek</text>
        <text x="30" y="248" fill="var(--ink)">B) Açık etiket + gerekçe, ritüel yok → orta    ·    D) Yalnız ritüel → küçük ama ölçülebilir    ·    C) Gizli uygulama → en düşük</text>
      </g>

      <rect x="18" y="268" width="646" height="62" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="284" fill="var(--violet)" font-size="8" font-weight="700">NEDEN BÖYLE? ÇÜNKÜ SİSTEM RASTGELE DÜŞÜNCEYE YAZMA İZNİ VEREMEZ</text>
      <text x="30" y="300" fill="var(--ink)" font-size="7.3">Geçici bir korku fizyolojiyi kalıcı değiştirseydi, denetim kaybolurdu. Evrimin çözümü yazma iznini kimlik doğrulamaya bağlamaktır:</text>
      <text x="30" y="314" fill="var(--ink)" font-size="7.3">bağlam + ritüel tekrarı + otorite/güven işareti. Plasebo, bu güvenlik mimarisinin görünür yüzeyidir — hile değil, imza doğrulaması.</text>
      <text x="30" y="326" fill="var(--muted)" font-size="7.1">Sonuç: tedavinin nasıl sunulduğu, tedavinin etkisinin bir parçasıdır.</text>
    </svg>`
  },
  "horizon-ua16": {
    title: {
      tr: "Şekil UA-16.1: Engram + Erişim Anahtarı — Dosya, Anahtar ve Rekon solidasyon Yazma Penceresi",
      en: "Figure UA-16.1: Engram + Access Key — File, Key and the Reconsolidation Write Window"
    },
    caption: {
      tr: "Anı iki bileşene ayrılır: dağıtık içerik izi (engram) ve onu etkinleştiren koşul (erişim anahtarı). Anahtar eşleşmezse içerik saklı kalır ama hatırlama olmaz (sessiz engram). Optogenetik, engram kümesini uyararak anıyı geri getirir, kümeleri birleştirerek sahte anı yazar ve duygusal işareti tersine çevirebilir. Hatırlama anı, duygusal etiketin yeniden yazılabildiği kısa bir pencere açar (rekon solidasyon); içerik büyük ölçüde korunur.",
      en: "Memory splits into two components: a distributed content trace (engram) and the condition that activates it (access key). When the key does not match, content stays stored but recall does not occur (silent engram). Optogenetics recalls a memory by stimulating the engram set, writes a false memory by co-activating sets, and can flip emotional valence. The moment of recall opens a brief window in which the emotional tag can be rewritten (reconsolidation); content is largely preserved."
    },
    svg: () => `<svg viewBox="0 0 680 340" role="img" aria-label="Engram and access key schematic">
      <rect x="6" y="6" width="668" height="328" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ENGRAM + ERİŞİM ANAHTARI (HZ-16): İÇERİK SABİT, ERİŞİM DURUMA BAĞLI</text>

      <rect x="18" y="38" width="200" height="140" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">DOSYA (ENGRAM)</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="30" y="72">• Dağıtık hücre kümesi (Liu 2012)</text>
        <text x="30" y="88">• Uyarılabilirlik ile tanımlanır</text>
        <text x="30" y="104">• Sessiz engram: saklı ama kapalı</text>
        <text x="30" y="118">  (Roy 2017) — "unuttum" ikiye bölünür:</text>
        <text x="30" y="132" fill="var(--muted)">saklama hatası mı, erişim hatası mı?</text>
        <text x="30" y="150">• Uykuda yeniden oynatma (Wilson 1994)</text>
        <text x="30" y="166" fill="var(--muted)">→ gecelik konsolidasyon ve anahtar düzenlemesi</text>
      </g>

      <rect x="234" y="38" width="196" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="246" y="54" fill="var(--good)" font-size="8" font-weight="700">ANAHTAR (ERİŞİM KOŞULU)</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="246" y="72">• Bağlam: ortam, koku, ses</text>
        <text x="246" y="88">  (Godden ve Baddeley 1975: sualtı/karada)</text>
        <text x="246" y="104">• Otonom durum: vagal ton, uyarılma</text>
        <text x="246" y="120">• Farmakolojik durum (UA-14 bağlantısı)</text>
        <text x="246" y="136">• İpucu zenginliği ve dikkat</text>
        <text x="246" y="156" fill="var(--muted)">Anahtar_uyumu → 0 ise hatırlama → 0</text>
        <text x="246" y="170" fill="var(--muted)">(içerik yerinde kalır, erişim kapanır)</text>
      </g>

      <rect x="446" y="38" width="218" height="140" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="458" y="54" fill="var(--violet)" font-size="8" font-weight="700">LABORATUVAR: YAZMA VE TERS ÇEVİRME</text>
      <g font-size="7.2" fill="var(--ink)">
        <text x="458" y="72">• Uyarım → anı geri gelir (Liu 2012)</text>
        <text x="458" y="88">• İki küme birlikte → sahte anı (Ramirez 2013)</text>
        <text x="458" y="104">• Aynı engram → duygusal işaret ters döner</text>
        <text x="458" y="118">  (Redondo 2014): etiket, içerikten ayrıdır</text>
        <text x="458" y="136" fill="var(--muted)">İnsanda: hatırlama sonrası kısa yazma penceresi</text>
        <text x="458" y="150" fill="var(--muted)">(Nader 2000 · Kindt 2009) — pencere dar ve protokole duyarlı</text>
        <text x="458" y="164" fill="var(--muted)">(Elsey 2018 karşı-derlemesi)</text>
      </g>

      <rect x="18" y="192" width="646" height="64" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="208" fill="var(--accent)" font-size="8" font-weight="700">ZAMAN ÇİZGİSİ: HATIRLAMA → YAZILABİLİR PENCERE → YENİDEN SAKLAMA</text>
      <line x1="40" y1="230" x2="640" y2="230" stroke="var(--accent)" stroke-width="1.2"/>
      <circle cx="90" cy="230" r="4" fill="var(--accent)"/><text x="70" y="246" fill="var(--ink)" font-size="7">geri çağırma</text>
      <rect x="150" y="218" width="260" height="24" rx="4" fill="var(--warn)" fill-opacity="0.25" stroke="var(--warn)"/>
      <text x="280" y="234" text-anchor="middle" fill="var(--warn)" font-size="7.2" font-weight="700">YAZMA PENCERESİ: etiket yeniden yazılabilir, içerik yarı-korunur</text>
      <circle cx="520" cy="230" r="4" fill="var(--good)"/><text x="480" y="246" fill="var(--ink)" font-size="7">yeni etiketle yeniden saklama</text>
      <text x="30" y="250" fill="var(--muted)" font-size="7">Öngörü: beta-bloker + geri çağırma → örtük tepki ↓, açık içerik korunur, korku dönüşü olmaz.</text>

      <rect x="18" y="268" width="646" height="62" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="284" fill="var(--good)" font-size="8" font-weight="700">NEDEN BÖYLE? MUTLAK KAYIT, ORGANİZMAYI GEÇMİŞE REHİN BIRAKIRDI</text>
      <text x="30" y="300" fill="var(--ink)" font-size="7.3">Çevre değişir; geçen yıl doğru olan yol bugün tehlikeli olabilir. Sistem içeriği saklar, etiketi ve erişimi günceller: her okuma biraz yeniden yazmadır.</text>
      <text x="30" y="314" fill="var(--green, var(--good))" font-size="7.4" font-weight="700">Sonuç: kimlik, depolanan içeriklerin toplamı değil; hangi anahtarla hangi dosyaya eriştiğinizdir.</text>
      <text x="30" y="326" fill="var(--muted)" font-size="7.1">Bu yüzden aynı anılara sahip iki kişi, farklı erişim örüntüleriyle iki farklı kişi olabilir.</text>
    </svg>`
  },
  "horizon-ua05": {
    title: {
      tr: "Şekil UA-05.1: Yaşam Boyu Ters-U (Aslında U) Filtre Eğrisi — Doğum, Yedi Yaş Kilidi, Terminal Pencere",
      en: "Figure UA-05.1: The Lifespan U-Shaped Filter Curve — Birth, the Seven-Year Lock, the Terminal Window"
    },
    caption: {
      tr: "Anlatısal benlik filtresinin (DMN) gücü yaşam boyunca U eğrisi izler: doğumda düşük (bebek uyanıkken delta-teta ağırlıklı, REM oranı yüksek, DMN daha kurulmamış), 1–7 yaş arası kademeli yükselir, ~7 yaşta kilitlenir (beş bağımsız gelenek bu yaşı 'akıl yaşı' ilan eder), erişkinlikte sabit kalır ve yaşam sonunda yeniden gevşer (terminal/paradoksal berraklık). Deneyim, filtrenin o anki biçimine göre kodlanır: bebeklik amnezisi bir silme değil, biçim uyuşmazlığıdır.",
      en: "The strength of the narrative-self filter (DMN) follows a U across life: low at birth (infants are delta-theta dominant while awake, have a high REM proportion, and their DMN is not yet built), rises gradually from 1 to 7, locks around age seven (five independent traditions declare this the 'age of reason'), stays constant through adulthood, and loosens again at life's end (terminal/paradoxical lucidity). Experience is encoded in whatever format the filter currently uses: infantile amnesia is not erasure but format mismatch."
    },
    svg: () => `<svg viewBox="0 0 680 380" role="img" aria-label="Lifespan U-shaped filter curve schematic">
      <rect x="6" y="6" width="668" height="368" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">YAŞAM BOYU FİLTRE EĞRİSİ (HZ-05): ANLATISAL BENLİK MODÜLÜNÜN AÇILMA-KİLİTLENME-GEVŞEME TAKVİMİ</text>

      <!-- axes -->
      <line x1="52" y1="248" x2="650" y2="248" stroke="var(--line)"/>
      <line x1="52" y1="70" x2="52" y2="248" stroke="var(--line)"/>
      <text x="60" y="66" fill="var(--muted)" font-size="7.2">Filtre gücü F(t) ↑</text>
      <g fill="var(--muted)" font-size="7">
        <text x="80" y="262">0</text><text x="160" y="262">1</text><text x="250" y="262">7</text><text x="360" y="262">20</text><text x="470" y="262">50</text><text x="600" y="262">yaşam sonu</text>
      </g>

      <!-- U curve: low -> rising -> plateau -> falling -->
      <path d="M70 240 C 120 236, 150 210, 190 170 C 215 145, 232 122, 250 112 L 470 108 C 520 110, 560 132, 600 176 C 618 196, 630 214, 638 236"
            fill="none" stroke="var(--accent)" stroke-width="2.4"/>
      <circle cx="250" cy="112" r="4.5" fill="var(--good)"/>
      <text x="238" y="102" fill="var(--good)" font-size="7.6" font-weight="700">~7 YAŞ: KİLİT</text>
      <text x="66" y="256" fill="var(--warn)" font-size="7.4" font-weight="700">0–1 yaş: F ≈ 0</text>
      <text x="150" y="200" fill="var(--muted)" font-size="7">1–7 yaş: kademeli yükseliş</text>
      <text x="330" y="100" fill="var(--ink)" font-size="7.2">erişkin platosu: anlatısal benlik baskın</text>
      <text x="556" y="200" fill="var(--violet)" font-size="7.4" font-weight="700">yaşam sonu: F gevşer</text>

      <!-- phase boxes -->
      <rect x="52" y="278" width="146" height="84" rx="7" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="62" y="293" fill="var(--warn)" font-size="7.6" font-weight="700">DOĞUM TARAFI (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="62" y="307">• Bebek uyanıkken delta-teta</text>
        <text x="62" y="319">• REM oranı ~%50 (erişkin ~%20)</text>
        <text x="62" y="331">• DMN geç olgunlaşır; miyelin</text>
        <text x="62" y="343">  takvimi yıllara yayılır</text>
        <text x="62" y="355" fill="var(--muted)">• En erken anı ort. ~3,5 yaş</text>
      </g>

      <rect x="208" y="278" width="152" height="84" rx="7" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="218" y="293" fill="var(--good)" font-size="7.6" font-weight="700">YEDİ YAŞ EŞİĞİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="218" y="307">• 5–7 kayması: nitel sıçrama</text>
        <text x="218" y="319">• 5 bağımsız gelenek: "akıl yaşı"</text>
        <text x="218" y="331">• DOPS serileri: anlatı 2–4 başlar,</text>
        <text x="218" y="343">  6–7'de söner</text>
        <text x="218" y="355" fill="var(--muted)">• Kilitlenme yaşı bireysel değişir</text>
      </g>

      <rect x="370" y="278" width="140" height="84" rx="7" fill="var(--surface-2)" stroke="var(--ink)"/>
      <text x="380" y="293" fill="var(--ink)" font-size="7.6" font-weight="700">ERİŞKİN PLATOSU</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="380" y="307">• Anlatısal benlik = yapılandırma</text>
        <text x="380" y="319">  dosyası (HP-11)</text>
        <text x="380" y="331">• Erişim, biçime bağlı: sözel,</text>
        <text x="380" y="343">  bağlamsal, bedensel kanallar</text>
        <text x="380" y="355" fill="var(--muted)">• Kimlik = erişim örüntüsü (HZ-16)</text>
      </g>

      <rect x="520" y="278" width="146" height="84" rx="7" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="530" y="293" fill="var(--violet)" font-size="7.6" font-weight="700">TERMİNAL PENCERE (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="530" y="307">• Terminal/paradoksal berraklık</text>
        <text x="530" y="319">  (Nahm ve Greyson 2009)</text>
        <text x="530" y="331">• Retrospektif ve seçim yanlılığı</text>
        <text x="530" y="343">  içerir — test edilmeli</text>
        <text x="530" y="355" fill="var(--muted)">• Öngörü: DMN içi ↓, gama kuplaj ↑</text>
      </g>
    </svg>`
  },
  "horizon-ua14": {
    title: {
      tr: "Şekil UA-14.1: İkinci Anahtar, Tek Kilit — Kimyasal ve Odak Yolu Aynı Kapıyı Açar, Tabana Maruz Kalma",
      en: "Figure UA-14.1: Second Key, One Lock — Chemical and Focus Routes Open the Same Door; Substrate Exposure"
    },
    caption: {
      tr: "Farklı maddeler farklı reseptörlerden aynı ağa (DMN) vurur; filtre kazancı düştüğünde (i) V1'in eigenmodları görsel sabitler olarak görünür (spiral, tünel, kafes, petek — Bressloff 2001), (ii) otobiyografik anlatıcı kısılır (ego çözülmesi), (iii) üst düzey önsel inançların kesinlik ağırlığı düşer (REBUS, Carhart-Harris ve Friston 2019). Madde içerik eklemez: projeksiyon perdesi kalkar ve makine odası görünür. Aynı kilidi açan her yöntem — derin odak, duyusal yoksunluk, hipnogojik eşik — aynı sınıf çıktı üretmelidir.",
      en: "Different substances acting through different receptors hit the same network (DMN); when filter gain falls, (i) V1's eigenmodes appear as visual constants (spiral, tunnel, lattice, honeycomb — Bressloff 2001), (ii) the autobiographical narrator is turned down (ego dissolution), (iii) high-level priors lose precision weight (REBUS, Carhart-Harris & Friston 2019). The substance adds no content: the projection screen lifts and the machine room shows. Every method opening the same lock — deep focus, sensory deprivation, the hypnagogic threshold — should produce the same class of output."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Two keys one lock psychedelic schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İKİNCİ ANAHTAR, TEK KİLİT (HZ-14): MADDE İÇERİK EKLEMEZ — TABANI GÖSTERİR</text>

      <rect x="18" y="38" width="150" height="96" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="28" y="54" fill="var(--violet)" font-size="7.8" font-weight="700">KİMYASAL ANAHTAR</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="28" y="70">• Psilosibin (5-HT2A)</text>
        <text x="28" y="83">• DMT, LSD</text>
        <text x="28" y="96">• Hızlı, şiddetli, istemsiz</text>
        <text x="28" y="109">• Yan etki profili yüksek</text>
        <text x="28" y="124" fill="var(--muted)">• Denetim: protokol + gözetim</text>
      </g>

      <rect x="18" y="146" width="150" height="96" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="28" y="162" fill="var(--accent)" font-size="7.8" font-weight="700">ODAK ANAHTARI</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="28" y="178">• Derin odak (Focus 15–21)</text>
        <text x="28" y="191">• Duyusal yoksunluk, Ganzfeld</text>
        <text x="28" y="204">• Hipnogojik eşik</text>
        <text x="28" y="217">• Yavaş, eğitilebilir, geri çağrılabilir</text>
        <text x="28" y="232" fill="var(--muted)">• Denetim: beceri + tekrar</text>
      </g>

      <path d="M170 86 C 200 86, 210 120, 236 128" fill="none" stroke="var(--violet)" stroke-width="1.8" marker-end="url(#hz14a)"/>
      <path d="M170 194 C 200 194, 210 160, 236 152" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#hz14b)"/>
      <defs>
        <marker id="hz14a" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--violet)"/></marker>
        <marker id="hz14b" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--accent)"/></marker>
      </defs>

      <rect x="240" y="104" width="120" height="68" rx="10" fill="var(--surface-2)" stroke="var(--good)" stroke-width="2"/>
      <text x="300" y="128" text-anchor="middle" fill="var(--good)" font-size="8.4" font-weight="700">TEK KİLİT</text>
      <text x="300" y="142" text-anchor="middle" fill="var(--ink)" font-size="7.4">DMN filtre kazancı ↓</text>
      <text x="300" y="156" text-anchor="middle" fill="var(--muted)" font-size="6.9">Π_DMN → 0</text>
      <text x="300" y="188" text-anchor="middle" fill="var(--muted)" font-size="6.8">Aynı kilit, farklı anahtar</text>

      <path d="M362 138 L 396 138" stroke="var(--good)" stroke-width="1.8" marker-end="url(#hz14a)"/>

      <rect x="400" y="38" width="128" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/>
      <text x="410" y="54" fill="var(--ink)" font-size="7.8" font-weight="700">TABANA MARUZ KALMA</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="410" y="70">Form sabitleri (V1 eigenmod)</text>
        <text x="410" y="84">🌀 spiral · 🕳️ tünel</text>
        <text x="410" y="98">🕸️ kafes · 🍯 petek</text>
        <text x="410" y="114">Ego çözülmesi (anlatıcı ↓)</text>
        <text x="410" y="130">Kesinlik ağırlığı ↓ (REBUS)</text>
        <text x="410" y="146">Aktivite entropisi ↑</text>
        <text x="410" y="162" fill="var(--muted)">İçerik yorumu kültürel, biçim evrensel</text>
        <text x="410" y="178" fill="var(--muted)">Mistik puanlar yüksek ama örneklem küçük</text>
      </g>

      <rect x="540" y="38" width="122" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="550" y="54" fill="var(--warn)" font-size="7.8" font-weight="700">DÜRÜSTLÜK NOTLARI</text>
      <g font-size="6.8" fill="var(--ink)">
        <text x="550" y="70">• Mikrodoz: kontrollü</text>
        <text x="550" y="82">  çalışmalarda beklentiden</text>
        <text x="550" y="94">  ayrışmadı (Szigeti 2021)</text>
        <text x="550" y="110">• Varlık karşılaşmaları</text>
        <text x="550" y="122">  test edilebilir içerik</text>
        <text x="550" y="134">  iddiası üretmez</text>
        <text x="550" y="150">• Terapötik etki bileşen-</text>
        <text x="550" y="162">  lerine ayrıştırılmadı</text>
        <text x="550" y="178" fill="var(--muted)">• Risk: panik, psikoz tetiği, HPPD</text>
      </g>

      <rect x="18" y="254" width="644" height="86" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="30" y="270" fill="var(--good)" font-size="8" font-weight="700">AYIRT EDİCİ TEST (HZ-14/1): YÖNTEM BAĞIMSIZLIĞI + YOĞUNLUĞUN ARACILIK TESTİ</text>
      <g font-size="7" fill="var(--ink)">
        <text x="30" y="288">Dört kol: (A) psilosibin · (B) deneyimli uygulayıcı Focus 15–21 · (C) duyusal yoksunluk · (D) hipnogojik eşik</text>
        <text x="30" y="302">Öngörü 1: form-sabiti raporları dört kolda benzer dağılır; anlatı içeriği yönteme göre değişir.</text>
        <text x="30" y="316">Öngörü 2: yoğunluk, dozdan değil DMN düşüşünden gelir — doz → DMN ↓ → deneyim yoğunluğu aracılık zinciri.</text>
        <text x="30" y="330" fill="var(--muted)">Öngörü 3: entropi artışı, DMN düşüşü ile ego çözülmesi arasındaki ilişkiye aracılık eder (meditation testi).</text>
      </g>
    </svg>`
  },
  "horizon-ua12": {
    title: {
      tr: "Şekil UA-12.1: Süper-Radyan Koherans Köprüsü — N Kromofor, N² Ölçeklenmesi ve Neden Sıcaklık Engel Değil",
      en: "Figure UA-12.1: The Superradiant Coherence Bridge — N Chromophores, N² Scaling and Why Temperature Is Not the Obstacle"
    },
    caption: {
      tr: "Tek bir triptofan kromoforu termal gürültüde kaybolur; N tanesi hizalandığında kolektif bir mod oluşur ve sönüm hızı N ile, yoğunluk N² ile ölçeklenir (Dicke 1954). 2024'te mikrotübül ve sentriyol gibi mimarilerde 10⁵'ten fazla triptofan içeren mega-ağların morötesi bölgede kolektif yanıt ürettiği ölçüldü (Babcock ve ark., J. Phys. Chem. B 128:4035). Kilit ayrım: Tegmark'ın itirazı kırılgan uzun ömürlü koheransa yönelikti; süper-radyans tersi bir rejimdir — çevreyle kuplaj bozunmayı hızlandırır ama kolektif imza yine de ortaya çıkar.",
      en: "A single tryptophan chromophore vanishes in thermal noise; when N of them align, a collective mode forms and the decay rate scales with N while intensity scales with N² (Dicke 1954). In 2024, mega-networks containing more than 10⁵ tryptophans in architectures such as microtubules and centrioles were measured to produce a collective response in the ultraviolet (Babcock et al., J. Phys. Chem. B 128:4035). The key distinction: Tegmark's objection targeted fragile long-lived coherence; superradiance is the opposite regime — coupling to the environment accelerates decay, yet the collective signature still appears."
    },
    svg: () => `<svg viewBox="0 0 680 350" role="img" aria-label="Superradiance coherence bridge schematic">
      <rect x="6" y="6" width="668" height="338" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">SÜPER-RADYAN KOHERANS KÖPRÜSÜ (HZ-12): GÜRÜLTÜYÜ YENMEK DEĞİL, GÜRÜLTÜYE RAĞMEN KOLEKTİF OLMAK</text>

      <rect x="18" y="38" width="200" height="120" rx="8" fill="var(--surface-2)" stroke="var(--muted)"/>
      <text x="30" y="54" fill="var(--muted)" font-size="8" font-weight="700">N = 1 (TEK KROMOFOR)</text>
      <circle cx="60" cy="86" r="7" fill="var(--warn)"/>
      <text x="78" y="90" fill="var(--ink)" font-size="7.2">Γ = Γ₁ (yavaş, zayıf)</text>
      <text x="30" y="110" fill="var(--muted)" font-size="7">• Termal gürültüde kaybolur</text>
      <text x="30" y="124" fill="var(--muted)" font-size="7">• Morötesi enerjisi hasara dönüşür</text>
      <text x="30" y="138" fill="var(--muted)" font-size="7">• "Sıcak ve ıslak: kuantum olamaz"</text>
      <text x="30" y="152" fill="var(--muted)" font-size="7">  itirazı bu rejim için haklıdır (Tegmark 2000).</text>

      <rect x="230" y="38" width="220" height="120" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.6"/>
      <text x="242" y="54" fill="var(--good)" font-size="8" font-weight="700">N = 10⁵ (MİKROTÜBÜL MEGA-AĞI)</text>
      <g fill="var(--good)">
        <circle cx="258" cy="86" r="5"/><circle cx="278" cy="86" r="5"/><circle cx="298" cy="86" r="5"/><circle cx="318" cy="86" r="5"/><circle cx="338" cy="86" r="5"/><circle cx="358" cy="86" r="5"/><circle cx="378" cy="86" r="5"/><circle cx="398" cy="86" r="5"/><circle cx="418" cy="86" r="5"/>
      </g>
      <line x1="256" y1="100" x2="420" y2="100" stroke="var(--good)" stroke-width="1" stroke-dasharray="3 2"/>
      <text x="242" y="116" fill="var(--ink)" font-size="7.2">Γ_kolektif ≈ N · Γ₁  ve  I ∝ N²</text>
      <text x="242" y="130" fill="var(--good)" font-size="7.2" font-weight="700">Kuantum verimi tübülinden mikrotübüle artar</text>
      <text x="242" y="144" fill="var(--muted)" font-size="7">Aynı mimari subradyant hâllerle enerjiyi tutar</text>

      <rect x="462" y="38" width="200" height="120" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="474" y="54" fill="var(--accent)" font-size="8" font-weight="700">İŞLEV ADAYLARI</text>
      <g font-size="7.1" fill="var(--ink)">
        <text x="474" y="72">• Fotokoruma (Patwa 2024): UV hasarını</text>
        <text x="474" y="84">  kolektif dağıtım ile azaltmak</text>
        <text x="474" y="100">• Süper-transfer: uyarımın hızlı taşınması</text>
        <text x="474" y="116">• Hücre iskeleti = optik rezonatör</text>
        <text x="474" y="132">• MP-1'in moleküler kanadı: ölçek ile</text>
        <text x="474" y="144" fill="var(--muted)">  gürültü tabanını aşağı çekmek</text>
      </g>

      <rect x="18" y="172" width="644" height="70" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="188" fill="var(--violet)" font-size="8" font-weight="700">KİLİT AYRIM: "KOHERANS ÖMRÜ" ≠ "KOLEKTİF DAVRANIŞ" (BU YÜZDEN ESKİ İTİRAZ YETERSİZ)</text>
      <g font-size="7.1">
        <text x="30" y="206" fill="var(--ink)">Tegmark itirazı: yerel, uzun ömürlü koherans 10⁻¹³–10⁻²⁰ s'de çöker → hesaplamalı kuantum bilinç modelleri için geçerli.</text>
        <text x="30" y="220" fill="var(--ink)">Süper-radyans: çevreyle kuplaj bozunmayı HIZLANDIRIR; kolektif imza gürültüyle birlikte var olur → farklı rejim, farklı fizik.</text>
        <text x="30" y="234" fill="var(--muted)">Kardeş kanıt: fotosentezde uzun ömürlü elektronik koherans işlev için gerekli görünmüyor (Duan 2017) — işlev mimariden gelir.</text>
      </g>

      <rect x="18" y="254" width="644" height="86" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="270" fill="var(--warn)" font-size="8" font-weight="700">DÜRÜSTLÜK NOTLARI VE AYIRT EDİCİ TEST</text>
      <g font-size="7">
        <text x="30" y="288" fill="var(--ink)">• 2024 ölçümünün bağımsız replikasyonu henüz oturmadı; işlev iddiaları öneri düzeyinde.</text>
        <text x="30" y="302" fill="var(--ink)">• Biyofoton-bilinç korelasyonu zayıf; vakum enerjisi "yakıt" iddiaları kanıtsız (Casimir/Lamb kayması yalnızca varlığı kanıtlar).</text>
        <text x="30" y="316" fill="var(--good)">• Test: N = 10³ → 10⁶ demet boyutlarında floresans ömrü/verimi; tek-yayıcı modelinden SİSTEMATİK sapma büyümeli.</text>
        <text x="30" y="330" fill="var(--muted)">• Anestezi kolunda (UA-21) kolektif imza bozulmalı ve bu bozulma bilinç kaybı zamanlamasıyla korelasyonlu olmalı.</text>
      </g>
    </svg>`
  },
  "horizon-ua35": {
    title: {
      tr: "Şekil UA-35.1: İç Saat Yaması — Okuyucu Mimari, İkili Zamanlama ve Belirsizlik Takası",
      en: "Figure UA-35.1: The Internal Clock Patch — Reader Architecture, Dual Timing and the Uncertainty Trade-off"
    },
    caption: {
      tr: "Beyin zamanı ölçmez; kortikal osilatör dizilerinin çizgili cisimde eşzamanlı saptanmasından ve olay yoğunluğundan kestirir (Matell ve Meck 2004). İki ayrı hesap vardır: ileriye dönük zamanlama dikkatle ters ilişkilidir, geriye dönük zamanlama bellek yoğunluğuyla doğru. Korku anında çevrimiçi zaman çözünürlüğü artmaz; anı yoğunluğu ve geriye dönük süre artar (Stetson 2007). Dopamin sistemleri zamanlama kazancını kaydırır (Meck 1996). Sonuç: öznel zaman, sayılan bir büyüklük değil; kodlanan malzeme miktarının türevidir — bu yüzden zaman 'bedava' gelir ve yoğun anlarda uzar.",
      en: "The brain does not measure time; it estimates it from the coincidence detection of cortical oscillator arrays in the striatum and from event density (Matell & Meck 2004). Two separate computations exist: prospective timing is inverse to attention, retrospective timing is direct with memory density. During fear, online temporal resolution does not rise; memory density and retrospective duration do (Stetson 2007). Dopamine systems shift timing gain (Meck 1996). The result: subjective time is not a counted quantity but a derivative of encoded material — which is why time comes 'for free' and stretches in intense moments."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Internal clock patch schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İÇ SAAT YAMASI (HZ-35): ZAMAN SAYILMAZ — OSİLATÖR FAZINDAN ve OLAY YOĞUNLUĞUNDAN KESTİRİLİR</text>

      <!-- A: reader architecture -->
      <rect x="18" y="38" width="318" height="128" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/>
      <text x="30" y="54" fill="var(--ink)" font-size="8" font-weight="700">A) SAYAÇ DEĞİL, OKUYUCU (Matell ve Meck 2004)</text>
      <g font-size="7">
        <text x="30" y="72" fill="var(--ink)">Kortikal osilatör dizileri (farklı periyotlar):</text>
      </g>
      <path d="M32 88 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" fill="none" stroke="var(--accent)" stroke-width="1.2"/>
      <path d="M32 100 q12 -8 24 0 q12 8 24 0 q12 -8 24 0" fill="none" stroke="var(--good)" stroke-width="1.2"/>
      <path d="M32 112 q16 -6 32 0 q16 6 32 0" fill="none" stroke="var(--violet)" stroke-width="1.2"/>
      <text x="160" y="92" fill="var(--muted)" font-size="6.9">f₁ · f₂ · f₃ …</text>
      <line x1="150" y1="120" x2="286" y2="120" stroke="var(--ink)" stroke-width="1" marker-end="url(#hz35a)"/>
      <defs><marker id="hz35a" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--ink)"/></marker></defs>
      <rect x="216" y="96" width="108" height="42" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="270" y="112" text-anchor="middle" fill="var(--good)" font-size="7.2" font-weight="700">ÇİZGİLİ CİSİM</text>
      <text x="270" y="126" text-anchor="middle" fill="var(--ink)" font-size="6.8">eşzamanlılık dedektörü</text>
      <text x="30" y="146" fill="var(--muted)" font-size="7">Kazanç (dopamin, dikkat) okunan değeri doğrudan kaydırır (Meck 1996).</text>
      <text x="30" y="158" fill="var(--muted)" font-size="7">Δt · Δf_os ≈ sabit: zaman çözünürlüğü bant genişliğiyle takas hâlinde (MP-2'nin bilişsel yüzü).</text>

      <!-- B: dual timing -->
      <rect x="346" y="38" width="316" height="128" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="358" y="54" fill="var(--accent)" font-size="8" font-weight="700">B) İKİ AYRI HESAP (Block, Hancock ve Zakay 2010)</text>
      <rect x="358" y="62" width="140" height="44" rx="6" fill="var(--surface)" stroke="var(--warn)"/>
      <text x="368" y="78" fill="var(--warn)" font-size="7.4" font-weight="700">İLERİYE DÖNÜK</text>
      <text x="368" y="92" fill="var(--ink)" font-size="6.9">Dikkat ↑ → süre "kısa"</text>
      <text x="368" y="103" fill="var(--muted)" font-size="6.7">şimdi sayılıyor</text>
      <rect x="510" y="62" width="140" height="44" rx="6" fill="var(--surface)" stroke="var(--good)"/>
      <text x="520" y="78" fill="var(--good)" font-size="7.4" font-weight="700">GERİYE DÖNÜK</text>
      <text x="520" y="92" fill="var(--ink)" font-size="6.9">Bellek yoğunluğu ↑ → süre "uzun"</text>
      <text x="520" y="103" fill="var(--muted)" font-size="6.7">sonradan hatırlanıyor</text>
      <text x="358" y="126" fill="var(--ink)" font-size="7">Korku anı: çözünürlük artmaz, anı yoğunluğu artar → geriye dönük süre şişer (Stetson 2007).</text>
      <text x="358" y="140" fill="var(--violet)" font-size="7" font-weight="700">Oddball/kestirim hatası: beklenmedik olay da "süreye eklenir" (Tse 2004).</text>
      <text x="358" y="154" fill="var(--muted)" font-size="6.9">Meditasyon: ileriye dönük abartı azalır (Wittmann 2014).</text>

      <!-- C: fear timeline -->
      <rect x="18" y="176" width="644" height="70" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="30" y="192" fill="var(--good)" font-size="8" font-weight="700">C) KORKU ANINDA NE OLDU, NE OLMADI (Stetson, Fiesta ve Eagleman 2007 — serbest düşme deneyi)</text>
      <g font-size="7">
        <text x="30" y="210" fill="var(--warn)">OLMADI: çevrimiçi zamansal çözünürlük artışı (temporal bisection performansı normal)</text>
        <text x="30" y="224" fill="var(--good)">OLDU: subjektif "yavaşlama" raporu + anı yoğunluğu artışı + geriye dönük süre şişmesi</text>
        <text x="30" y="238" fill="var(--muted)">Sonuç: "zaman uzadı" = çevrimiçi yavaşlama değil, bellek yoğunluğundan türeyen geriye dönük bir hesap.</text>
      </g>

      <!-- D: why designed -->
      <rect x="18" y="256" width="644" height="90" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="272" fill="var(--violet)" font-size="8" font-weight="700">D) NEDEN BÖYLE TASARLANMIŞ? MUTLAK SAAT ORGANİZMAYA YARARSIZ OLURDU</text>
      <g font-size="7.1">
        <text x="30" y="290" fill="var(--ink)">Hayatta kalma sorusu "saat kaç?" değil, "bu durum için ne kadar zamanım var?" ve "bu olay ne kadar sürdü ki ondan ne öğrenmeliyim?"</text>
        <text x="30" y="304" fill="var(--ink)">İkinci soru bellek zenginliğine bağlıdır: zengin anı, daha uzun sürmüş gibi kodlanır — çünkü kodlanan malzeme miktarı sürenin vekilidir.</text>
        <text x="30" y="318" fill="var(--good)" font-weight="700">Beyin zamanı ölçmez, olay yoğunluğundan türetir: zaman, kaydın bedava yan ürünüdür. Yoğun anlarda "uzaması" bir arıza değil, mimarinin kaçınılmaz yan etkisidir.</text>
        <text x="30" y="334" fill="var(--muted)">T_öznel ≈ (N_olay / ρ_bellek) × W_dikkat × K_dopamin — üç ölçülebilir bağımsız değişken, tek denklem.</text>
      </g>
    </svg>`
  },
  "horizon-ua36": {
    title: {
      tr: "Şekil UA-36.1: İç Duyum Ana Kanalı — Üç Boyut, Ölçüm-Etki Çiftlenimi ve Profil Haritası",
      en: "Figure UA-36.1: The Interoceptive Main Channel — Three Dimensions, Measurement-Effect Coupling and the Profile Map"
    },
    caption: {
      tr: "İç duyum, lamina I spinotalamik yoldan arka insulaya, oradan ön insulaya geçerek beden durumunun kortikal haritasını kurar (Craig 2002/2009). Üç ayrı boyutu vardır: doğruluk, duyarlılık ve farkındalık — bunların uyumsuzlukları psikopatolojide belirleyicidir (Garfinkel 2015). Kalp atışı sayma görevi yanlılığa açıktır (Zamariola 2018), yani ölçüm aracı ölçülen sinyali değiştirir. İşlev iddiası yine de ayakta: iç duyum doğruluğu duygu düzenleme ve belirsizlik altında karar performansıyla ilişkilidir; kaygı = iç duyumun aşırı ağırlıklandırılması, aleksitimi = yetersiz ağırlıklandırma.",
      en: "Interoception builds the cortical map of body state via the lamina I spinothalamic pathway to the posterior insula and on to the anterior insula (Craig 2002/2009). It has three dimensions: accuracy, sensibility and awareness — their mismatches are diagnostic in psychopathology (Garfinkel 2015). The heartbeat-counting task is open to bias (Zamariola 2018), which means the measurement tool changes the measured signal. The functional claim still stands: interoceptive accuracy relates to emotion regulation and to decision performance under uncertainty; anxiety = over-weighting of interoception, alexithymia = under-weighting."
    },
    svg: () => `<svg viewBox="0 0 680 350" role="img" aria-label="Interoceptive main channel schematic">
      <rect x="6" y="6" width="668" height="338" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İÇ DUYUM ANA KANALI (HZ-36): FARKINDALIK, BİR KANAL SEÇME İŞİDİR</text>

      <!-- anatomy chain -->
      <rect x="18" y="38" width="150" height="118" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/>
      <text x="28" y="54" fill="var(--ink)" font-size="7.8" font-weight="700">ANATOMİK ZİNCİR</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="28" y="70">Beden içi afferentler</text>
        <text x="28" y="84">↓ lamina I spinotalamik</text>
        <text x="28" y="98">Arka insula (beden haritası)</text>
        <text x="28" y="112">↓</text>
        <text x="28" y="126">Ön insula (öznel "beden hissi")</text>
        <text x="28" y="144" fill="var(--muted)">"Bedeni kim olduğun değil,</text>
        <text x="28" y="154" fill="var(--muted)">ne durumda olduğun gösterilir."</text>
      </g>

      <!-- three dimensions -->
      <rect x="180" y="38" width="190" height="118" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="190" y="54" fill="var(--good)" font-size="7.8" font-weight="700">ÜÇ BOYUT (Garfinkel 2015)</text>
      <g font-size="7">
        <text x="190" y="72" fill="var(--ink)">① Doğruluk: nesnel algı kalitesi</text>
        <text x="190" y="88" fill="var(--ink)">② Duyarlılık: kendi algına güven</text>
        <text x="190" y="104" fill="var(--ink)">③ Farkındalık: doğruluk ↔ güven uyumu</text>
      </g>
      <text x="190" y="124" fill="var(--warn)" font-size="6.9">Uyumsuzluk = klinik sinyal:</text>
      <text x="190" y="136" fill="var(--warn)" font-size="6.9">yüksek güven + düşük doğruluk → panik riski</text>
      <text x="190" y="148" fill="var(--muted)" font-size="6.8">Tek "iç duyum puanı" öngörü gücünü düşürür.</text>

      <!-- channels profile -->
      <rect x="382" y="38" width="280" height="118" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="392" y="54" fill="var(--accent)" font-size="7.8" font-weight="700">KANAL PROFİLİ (alt kanallar ayrışır)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="392" y="72">❤️ Kalp atışı algılama (en çok ölçülen, en yanlı)</text>
        <text x="392" y="88">🫁 Solunum farkındalığı (burun akımı)</text>
        <text x="392" y="104">🫄 Mide/bağırsak duyumu (elektrogastrogram)</text>
      </g>
      <text x="392" y="122" fill="var(--muted)" font-size="6.8">Öngörü: kanallar arası korelasyon düşük-orta → "iç duyum" tek özellik değil, bir profil.</text>
      <text x="392" y="136" fill="var(--muted)" font-size="6.8">Meditasyon eğitimi kalp/solunum kanalını güçlendirir; mide kanalı aynı hızda artmayabilir.</text>
      <text x="392" y="150" fill="var(--good)" font-size="6.9" font-weight="700">İşlev: duygu etiketi = K_beden × Kavram (Barrett 2017)</text>

      <!-- measurement-effect coupling -->
      <rect x="18" y="168" width="316" height="86" rx="8" fill="var(--surface-2)" stroke="var(--warn)" stroke-width="1.4"/>
      <text x="28" y="184" fill="var(--warn)" font-size="7.8" font-weight="700">ÖLÇÜM-ETKİ ÇİFTLENİMİ (alanın yapısal kısıtı)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="28" y="202">Kalp sayma görevi yanlılığa açık (Zamariola 2018):</text>
        <text x="28" y="216">kendinden emin ama hatalı cevaplar; stratejik tahmin.</text>
        <text x="28" y="230">A) "Bedenini gözle" talimatı → rapor sayısı ↑</text>
        <text x="28" y="244">B) "Nesnel performans testi" talimatı → rapor sayısı ↓</text>
      </g>

      <!-- outputs -->
      <rect x="346" y="168" width="316" height="86" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="356" y="184" fill="var(--good)" font-size="7.8" font-weight="700">FONKSİYONEL ÇIKTILAR (kanıt güçlü)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="356" y="202">• Duygu düzenleme kapasitesiyle ilişki (Füstös 2013)</text>
        <text x="356" y="216">• Belirsizlik altında karar performansı (Werner 2009)</text>
        <text x="356" y="230">• Kaygı = aşırı ağırlık; aleksitimi = yetersiz ağırlık</text>
        <text x="356" y="244">• 8 haftalık gövde taraması sonrası doğruluk artışı (Fischer 2017)</text>
      </g>

      <!-- caution -->
      <rect x="18" y="266" width="644" height="82" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="282" fill="var(--violet)" font-size="8" font-weight="700">NEDEN BÖYLE? İÇ SİNYAL NESNEL BİR REFERANSA SAHİP DEĞİLDİR</text>
      <g font-size="7.1">
        <text x="30" y="300" fill="var(--ink)">Kalp atışı gerçektir, ama algısı yoruma açıktır. Sistem iki katman kurar: (1) ham iç sinyal (kardiyak, respiratuar, enterik) sürekli akar;</text>
        <text x="30" y="314" fill="var(--ink)">(2) dikkat, sinyali "önemli" etiketlediğinde onu yükseltir (amplifikasyon). Bu yüzden iç duyum ham ölçüm değil, filtreli ve ağırlıklı bir kanaldır —</text>
        <text x="30" y="328" fill="var(--ink)">ve ölçüm-etki çiftlenimi mimarinin kendisinde yer alır. Klinik uyarı: kalbe aşırı odaklanma bazı kişilerde kaygıyı artırır (panik, hipokondriyazis).</text>
        <text x="30" y="342" fill="var(--muted)">Sonuç: "daha fazla iç duyum her zaman daha iyi" yanlıştır; hedef, kanal seçme esnekliğidir.</text>
      </g>
    </svg>`
  },
  "horizon-ua39": {
    title: {
      tr: "Şekil UA-39.1: TPJ Öz-Modeli Geçidi — Çok-Duyulu Kestirim, Eşik Geçişi ve Gizli Hedef Muhasebesi",
      en: "Figure UA-39.1: The TPJ Self-Model Gateway — Multisensory Estimation, Threshold Transition and the Hidden-Target Accounting"
    },
    caption: {
      tr: "Öz-konum; görsel, dokunsal, vestibüler ve propriyoseptif sinyallerin ağırlıklı kestirimidir. TPJ çevresindeki stimülasyon beden-dışı deneyim ve gölge kişi yanılsaması üretir (Blanke 2002; Arzy 2006); VR düzenekleri öz-konumu dakikalar içinde kaydırır (Lenggenhager 2007; Ehrsson 2007). Çelişki bir eşiği aştığında kestirim yeniden konumlanır — bu, model kaymasıdır ve laboratuvarda kanıtlanmıştır. Ancak spontan vakalarda bildirilen 'doğrulanabilir algı' iddiası bundan bağımsız bir sorudur ve yalnızca gizli hedef testleriyle sınanabilir: AWARE (2014) doğrulama üretmedi, AWARE-II (2023) tek güçlü vaka bildirdi.",
      en: "Self-location is a weighted estimate of visual, tactile, vestibular and proprioceptive signals. Stimulation around the TPJ produces out-of-body experience and the shadow-person illusion (Blanke 2002; Arzy 2006); VR setups shift self-location within minutes (Lenggenhager 2007; Ehrsson 2007). When conflict crosses a threshold, the estimate re-locates — that is model drift, demonstrated in the laboratory. But the 'verifiable perception' claim reported in spontaneous cases is an independent question, testable only via hidden-target studies: AWARE (2014) produced no verification, AWARE-II (2023) reported one strong case."
    },
    svg: () => `<svg viewBox="0 0 680 350" role="img" aria-label="TPJ self-model gateway schematic">
      <rect x="6" y="6" width="668" height="338" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">TPJ ÖZ-MODELİ GEÇİDİ (HZ-39): ÖZ-KONUM BİR KESTİRİMDİR — VE KESTİRİM KAYABİLİR</text>

      <!-- multisensory inputs -->
      <rect x="18" y="38" width="200" height="120" rx="8" fill="var(--surface-2)" stroke="var(--ink)"/>
      <text x="28" y="54" fill="var(--ink)" font-size="7.8" font-weight="700">ÇOK-DUYULU GİRDİLER (her biri ağırlıklı)</text>
      <g font-size="7" fill="var(--ink)">
        <text x="28" y="72">👁️ Görsel (öncelikli referans)</text>
        <text x="28" y="88">✋ Dokunsal (senkron sınayıcı)</text>
        <text x="28" y="104">🌀 Vestibüler (yerçekimi/denge)</text>
        <text x="28" y="120">💪 Propriyoseptif (eklem-kas)</text>
      </g>
      <text x="28" y="138" fill="var(--muted)" font-size="6.8">Vestibüler bozukluklarda OBE ve otoskopi daha sık</text>
      <text x="28" y="150" fill="var(--muted)" font-size="6.8">(Lopez ve Blanke 2011): referans zayıflar, model kayar.</text>

      <!-- TPJ estimator -->
      <rect x="238" y="52" width="150" height="92" rx="10" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.8"/>
      <text x="313" y="76" text-anchor="middle" fill="var(--good)" font-size="8" font-weight="700">TPJ · TPJ</text>
      <text x="313" y="92" text-anchor="middle" fill="var(--ink)" font-size="7.2">ağırlıklı kestirim</text>
      <text x="313" y="106" text-anchor="middle" fill="var(--muted)" font-size="6.8">argmax_g [ Π_g × L_g ]</text>
      <text x="313" y="124" text-anchor="middle" fill="var(--muted)" font-size="6.8">bileşenler: konum · sahiplik · perspektif</text>
      <line x1="220" y1="90" x2="236" y2="90" stroke="var(--ink)" stroke-width="1.2" marker-end="url(#hz39a)"/>
      <defs><marker id="hz39a" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--ink)"/></marker></defs>
      <line x1="390" y1="90" x2="406" y2="90" stroke="var(--good)" stroke-width="1.4" marker-end="url(#hz39b)"/>
      <defs><marker id="hz39b" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--good)"/></marker></defs>

      <!-- output states -->
      <rect x="410" y="38" width="252" height="120" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="420" y="54" fill="var(--violet)" font-size="7.8" font-weight="700">ÇIKTI DURUMLARI (çelişki büyüklüğüne göre)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="420" y="72">Çelişki &lt; E_esik → normal öz-konum (bedenimdeyim)</text>
        <text x="420" y="88">Çelişki ≈ E_esik → kararsız bölge (baş dönmesi, sallanma)</text>
        <text x="420" y="104" fill="var(--good)" font-weight="700">Çelişki &gt; E_esik → öz-konum kayar (beden-dışı görünüm)</text>
        <text x="420" y="120">Kanıt: TPJ stimülasyonu (Blanke 2002) · gölge kişi (Arzy 2006)</text>
        <text x="420" y="134">VR: dakikalar içinde kayma (Lenggenhager 2007; Ehrsson 2007)</text>
        <text x="420" y="148" fill="var(--muted)">Öngörü: geçiş ANİdir (eşik benzeri), aşamalı değil.</text>
      </g>

      <!-- channel separation -->
      <rect x="18" y="172" width="644" height="76" rx="8" fill="var(--surface-2)" stroke="var(--warn)" stroke-width="1.6"/>
      <text x="30" y="188" fill="var(--warn)" font-size="8" font-weight="700">KRİTİK AYRIM: MODEL KAYMASI ≠ DOĞRULANABİLİR ALGI (bu ikisi birbirini ne kanıtlar ne çürütür)</text>
      <g font-size="7">
        <text x="30" y="206" fill="var(--ink)">İddia 1 (kanıtlanmış): öz-konum üretilebilir ve kaydırılabilir → "bedenimde değilim" hissi üretilebilir bir öz-model olayıdır.</text>
        <text x="30" y="220" fill="var(--ink)">İddia 2 (açık): bazı spontan/NDE vakalarında hastaların göremeyecekleri şeyleri doğru bildiği öne sürülür → test: gizli hedefler.</text>
        <text x="30" y="236" fill="var(--muted)">Uyarı: tam-beden yanılsaması, spontan OBE'lerin tüm özelliklerini üretmez (dış görsel ipucu gerektirir) → "tek mekanizma" aşırı basitleştirmedir.</text>
      </g>

      <!-- hidden target accounting -->
      <rect x="18" y="262" width="644" height="86" rx="8" fill="var(--surface-2)" stroke="var(--good)" stroke-width="1.4"/>
      <text x="30" y="278" fill="var(--good)" font-size="8" font-weight="700">GİZLİ HEDEF MUHASEBESİ (iddianın tek dürüst sınavı)</text>
      <g font-size="7">
        <text x="30" y="296" fill="var(--ink)">AWARE (Parnia 2014, 2060 kalp durması): 9 hatırlama bildirimi, 2 oditoryal; gizli hedefler hiçbir vakada doğrulanmadı.</text>
        <text x="30" y="310" fill="var(--ink)">AWARE-II (Parnia 2023, 567 hasta): 53'ünde bilinç işareti, 1 hastada doğrulanmış anı dizisi (tablet ekranı, dış ses, EEG penceresiyle uyumlu).</text>
        <text x="30" y="324" fill="var(--green, var(--good))" font-weight="700">Mevcut tablo: kitlesel doğrulama yok, tek güçlü vaka var → dosya bu noktada AÇIK kalır; test büyütülmüş protokolle karar verir.</text>
        <text x="30" y="340" fill="var(--muted)">İki yön de bilgi üretir: doğrulama çıkarsa projenin en yüksek etkili sonucu; çıkmazsa öz-model nörobilimi yine kazançlıdır.</text>
      </g>
    </svg>`
  },
  "horizon-ua40": {
    title: {
      tr: "Şekil UA-40.1: Ölçüm-Dışı Sınır Fiziği — Boşluğun Göçü, Makinesel Tanık ve Tersinmez Kayıt İlkesi",
      en: "Figure UA-40.1: No-Measurement Boundary Physics — The Migration of the Gap, the Mechanical Witness and the Irreversible-Record Principle"
    },
    caption: {
      tr: "Ölçüm probleminin boşluğu kapanmaz, katman değiştirir: Kopenhag'ın kesitinden (Schnitt) dekoheransın baz seçimine, oradan çöküş modellerinin parametre penceresine. Bu göçün her adımında bir şey aynı kalır — bilinç terimi denkleme hiç girmez. Bu yüzden HZ-40 şunu önerir: gözlemcinin tüm ampirik içeriği tersinmez kayda indirgenir (O_gözlemci ≡ R_tersinmez). Ayırt edici test üç kolludur: kaydı insan tutar, makine tutar ya da kayıt gecikmeli silinir; üç kolun istatistiği özdeş olmalıdır. 2021'de Diósi–Penrose'un parametresiz doğal biçimi yer altı deneyiyle elendi (Donadi ve ark., Nature Physics 17:74) — yani pencerenin bir tarafı zaten kapandı; bilinç iddiasının sığınabileceği yer daralıyor.",
      en: "The gap of the measurement problem does not close; it changes layer: from the Copenhagen cut (Schnitt) to decoherence's basis selection, and from there to the collapse models' parameter window. At every step of this migration one thing stays the same — the term 'consciousness' never enters the equation. Hence HZ-40 proposes: all empirical content of the observer reduces to the irreversible record (O_observer ≡ R_irreversible). The discriminating test has three arms: the record held by a human, held by a machine, or restored by delayed erasure; the statistics of the three arms must be identical. In 2021 the parameter-free natural form of Diósi–Penrose was eliminated by an underground experiment (Donadi et al., Nature Physics 17:74) — one side of the window has already closed, and the room left for the consciousness claim is shrinking."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="No-measurement boundary physics schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ÖLÇÜM-DIŞI SINIR FİZİĞİ (HZ-40): SINIRDAKİ TERCÜME BİLİNÇ DEĞİL, TERSİNMEZ KAYIT</text>

      <rect x="18" y="38" width="312" height="116" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">BOŞLUĞUN GÖÇÜ: KAPANMAZ, KATMAN İNER</text>
      <g font-size="7.1" fill="var(--ink)">
        <text x="30" y="72">1. Kopenhag kesiti (Schnitt): "ölçüm" kuramda tanımsız</text>
        <text x="30" y="88">2. Dekoherans: girişim kaybolur — ama "tek sonuç" kalır</text>
        <text x="30" y="104">3. Çöküş modelleri: parametre penceresi daralır</text>
        <text x="30" y="122" fill="var(--good)">4. Her adımda bilinç terimi denkleme GİRMEDİ</text>
        <text x="30" y="140" fill="var(--muted)">Ampirik eşdeğerlik: O_gözlemci ≡ R_tersinmez (kayıt)</text>
      </g>

      <rect x="342" y="38" width="320" height="116" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="354" y="54" fill="var(--accent)" font-size="8" font-weight="700">MAKİNESEL TANIK TESTİ (HZ-40/1)</text>
      <rect x="354" y="64" width="96" height="44" rx="6" fill="var(--surface)" stroke="var(--muted)"/>
      <text x="402" y="80" text-anchor="middle" fill="var(--ink)" font-size="7.2" font-weight="700">KOL A</text>
      <text x="402" y="93" text-anchor="middle" fill="var(--ink)" font-size="6.7">kaydı insan tutar</text>
      <text x="402" y="103" text-anchor="middle" fill="var(--muted)" font-size="6.5">ve sonuca bakar</text>
      <rect x="456" y="64" width="96" height="44" rx="6" fill="var(--surface)" stroke="var(--muted)"/>
      <text x="504" y="80" text-anchor="middle" fill="var(--ink)" font-size="7.2" font-weight="700">KOL B</text>
      <text x="504" y="93" text-anchor="middle" fill="var(--ink)" font-size="6.7">kaydı makine tutar</text>
      <text x="504" y="103" text-anchor="middle" fill="var(--muted)" font-size="6.5">insan toplu veri görür</text>
      <rect x="558" y="64" width="96" height="44" rx="6" fill="var(--surface)" stroke="var(--muted)"/>
      <text x="606" y="80" text-anchor="middle" fill="var(--ink)" font-size="7.2" font-weight="700">KOL C</text>
      <text x="606" y="93" text-anchor="middle" fill="var(--ink)" font-size="6.7">kayıt silinir</text>
      <text x="606" y="103" text-anchor="middle" fill="var(--muted)" font-size="6.5">(kuantum silgi kolu)</text>
      <text x="354" y="126" fill="var(--good)" font-size="7.1" font-weight="700">Öngörü: üç kolun görünürlük dağılımı ÖZDEŞ (çift kör, 10⁶ olay)</text>
      <text x="354" y="141" fill="var(--muted)" font-size="6.8">Sapma çıkarsa: bilinç-özel çöküşün ilk kanıtı — programın en önemli deneyi</text>

      <rect x="18" y="164" width="644" height="104" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="180" fill="var(--violet)" font-size="8" font-weight="700">ÜÇ AYIRICI TEST: PENCEREYİ ÖLÇMEK</text>
      <g font-size="7">
        <text x="30" y="197" fill="var(--ink)">/1 Makinesel Tanık — makine ile insan kolları arasında istatistik farkı var mı?</text>
        <text x="30" y="212" fill="var(--ink)">/2 Çöküş parametre taraması — nanoparçacık interferometrisi: kayıp dekoherans eğrisini mi, çöküş eğrisini mi izliyor?</text>
        <text x="30" y="227" fill="var(--ink)">/3 Ajan-bağımsız olgu — Wigner'ın arkadaşı ailesi büyütülür: olgu, gözleyene mi bağlı?</text>
        <text x="30" y="247" fill="var(--warn)">Elenen zemin: parametresiz Diósi–Penrose (Donadi ve ark. 2021, Gran Sasso 3.100 m altı) — doğal çöküş zaten ölü.</text>
        <text x="30" y="261" fill="var(--muted)">Dolanıklık kanal değildir: no-signalling korelasyonu sabitler, sinyali yasaklar — "her şey bağlı" okuması geçersiz.</text>
      </g>

      <rect x="18" y="278" width="644" height="64" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="294" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="7">
        <text x="30" y="311" fill="var(--good)">🟢 Sınır muhasebesi: tüm deneysel sonuçlar bilinçsiz cihazlarla üretiliyor — gözlemci işlevi = tersinmez kayıt.</text>
        <text x="30" y="325" fill="var(--warn)">🟡 Çöküşün fizikselliği açık; yaşayan modeller yeni sınırlarla sıkışıyor (Carlesso ve ark. 2022, Nat. Phys. 18:243).</text>
        <text x="30" y="339" fill="var(--bad)">🟠 "Bilinç çöküşü tetikler": kanıtsız — en doğal biçimi elendi, nöral koherans hesabı (Tegmark 2000) hâlâ geçerli.</text>
      </g>
    </svg>`
  },
  "horizon-ua30": {
    title: {
      tr: "Şekil UA-30.1: Epistemik Bağışıklık — İki Hızlı Sistem, Kayıt-Önce İlkesi ve COGITATE Sınavı",
      en: "Figure UA-30.1: Epistemic Immunity — The Two-Speed System, the Record-First Principle and the COGITATE Test"
    },
    caption: {
      tr: "Bilim iki hızda düzeltir: hızlı kanal (ön kayıt, kör analiz, replikasyon, hasım işbirliği) ampirik iddiaları temizler; yavaş kanal (kuşak değişimi) kavramsal çerçeveleri değiştirir. 2025 COGITATE sınavı bunu gösterdi: 256 katılımcı, ön kayıtlı tahminler, iki büyük kuram da zayıfladı — ama hiçbir savunucu fikrini değiştirmedi. Yani bağışıklık bireyin değil, kaydın özelliğidir. Formül: EB = (ön kayıtlı tahmin x bağımsız replikasyon x kör tasarım) / anlatı esnekliği. HZ-40'ın fiziği ile ikizdir: orada kayıt çevreyle dolanıklıkla, burada kayıt ön kayıtla geri döndürülemez olur.",
      en: "Science corrects at two speeds: the fast channel (preregistration, blinded analysis, replication, adversarial collaboration) clears empirical claims; the slow channel (generational turnover) replaces conceptual frameworks. The 2025 COGITATE test showed this: 256 participants, preregistered predictions, both grand theories weakened — yet no proponent changed their mind. So immunity is a property of the record, not of the individual. Formula: EI = (preregistered predictions x independent replications x blinded design) / narrative flexibility. It is the twin of HZ-40's physics: there the record becomes irreversible through entanglement with the environment; here the record becomes irreversible against narrative through preregistration."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Epistemic immunity schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">EPİSTEMİK BAĞIŞIKLIK (HZ-30): KAYIT VERİDEN ÖNCE TUTULURSA ANLATI ESNEKLİĞİ ÖLÜR</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">İKİ HIZLI SİSTEM</text>
      <g font-size="7" fill="var(--ink)">
        <text x="30" y="72" font-weight="700">Hızlı kanal (ampirik):</text>
        <text x="30" y="86">• ön kayıt = tahmin veriden önce yazılır</text>
        <text x="30" y="100">• kör analiz = kim neyi test ettiğini bilmez</text>
        <text x="30" y="114">• replikasyon = bağımsız laboratuvar şartı</text>
        <text x="30" y="128">• hasım işbirliği = karşı taraf tahmini onaylar</text>
        <text x="30" y="146" font-weight="700">Yavaş kanal (kavramsal):</text>
        <text x="30" y="160">• kuşak değişimi — çerçeveler veriyle değil,</text>
        <text x="30" y="172">  nesille değişir (zor problem bu yüzden açık)</text>
      </g>

      <rect x="240" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">HATA ZİNCİRİ (KÜNYELİ)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">• Prefrontal "NCC": dikkat + rapor karışması</text>
        <text x="252" y="85">  (Frässle 2014; Boly 2017)</text>
        <text x="252" y="101">• Libet okuması: hazırlık potansiyeli birikimdir</text>
        <text x="252" y="114">  (Schurger 2012)</text>
        <text x="252" y="130">• Ego tükenmesi: 23 lab, etki ~sıfır (Hagger 2016)</text>
        <text x="252" y="146">• Güçlü duruş: hormonal etki yok (Ranehill 2015)</text>
        <text x="252" y="162">• Stanford hapishane: talimat etkisi (Le Texier 2019)</text>
        <text x="252" y="178">• Marshmallow: kovaryat sonrası kayboldu (Watts 2018)</text>
      </g>

      <rect x="462" y="38" width="200" height="150" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="474" y="54" fill="var(--violet)" font-size="8" font-weight="700">COGITATE SINAVI (2025)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="474" y="72">256 katılımcı · fMRI + MEG + iEEG · çok merkez</text>
        <text x="474" y="88">Ön kayıtlı hasım işbirliği (Melloni 2023 protokolü)</text>
        <text x="474" y="106" fill="var(--bad)">IIT: posterior sürekli senkronizasyon YOK → tahmin düştü</text>
        <text x="474" y="124" fill="var(--bad)">GNWT: bitiş tutuşması YOK, prefrontal temsil zayıf</text>
        <text x="474" y="142" fill="var(--good)">Sonuç: iki kuram da zayıfladı, hiçbiri çürümedi</text>
        <text x="474" y="160" fill="var(--warn)">Ve: hiçbir savunucu fikrini değiştirmedi</text>
        <text x="474" y="178" fill="var(--muted)">→ düzeltme literatürde ve kuşakta işliyor, bireyde değil</text>
      </g>

      <rect x="18" y="198" width="644" height="76" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="214" fill="var(--good)" font-size="8" font-weight="700">ADAY YASA FORMÜLÜ VE AYIRT EDİCİ TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">EB = (P_önkayıtlı × R_bağımsız × K_kör) / E_anlatı</text>
        <text x="30" y="247" fill="var(--ink)">/1 Kör hasım triyajı: programın kendi üç iddiası (HZ-35/1, HZ-36/1, HZ-40/1) etiketsiz bağımsız lablara verilir.</text>
        <text x="30" y="261" fill="var(--ink)">/2 E ölçümü: başarısız tahminden sonra üretilen geçmiş-uyarlama anlatısı sayısı kodlanır (iki kör kodlayıcı).</text>
        <text x="30" y="272" fill="var(--muted)">/3 Kırmızı takım denetimi: her dosyaya karşıt araştırmacı — çürütme planı yazılır; hiçbir iddia düşmezse bu programa karşı kaydedilir.</text>
      </g>

      <rect x="18" y="284" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
      <text x="30" y="300" fill="var(--muted)" font-size="8" font-weight="700">KAYIT-ÖNCE İLKESİ (HZ-40 İLE İKİZ)</text>
      <g font-size="7">
        <text x="30" y="317" fill="var(--ink)">Fizikte: kayıt, çevreyle dolanıklıkla geri döndürülemez olur → "gözlemci" = tersinmez kayıt.</text>
        <text x="30" y="331" fill="var(--ink)">Epistemolojide: kayıt, ön kayıtla anlatıya karşı geri döndürülemez olur → "yöntem" = zamanında kayıt.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua08": {
    title: {
      tr: "Şekil UA-08.1: Gecelik Kaynak Senkronizasyonu — Yazma Döngüsü, Klerens Tartışması ve Focus 10 İddiası",
      en: "Figure UA-08.1: Nightly Resource Synchronization — The Write Cycle, the Clearance Dispute and the Focus 10 Claim"
    },
    caption: {
      tr: "Uyku, bilincin kapandığı bir arıza değil, sistemin kendi kendini yeniden yazdığı bakım penceresidir: NREM'de yavaş dalga–iğcik–ripple üçlüsü hipokampus-korteks replays'ini yönetir, duyusal geçit kapanır, benlik modeli (DMN) kapanır. \"Gece temizliği\" iddiası ise 2024'te tersine döndü: Miao ve ark. klerensin uykuda ve anestezide azaldığını, hareketin difüzyonla olduğunu ölçtü (Nature Neuroscience 27:1046); insan kanıtı ise amiloid dinamiğinin uykusuzluktan etkilendiğini gösteriyor (Shokri-Kojori 2018). Gateway'in \"zihin uyanık, beden uykuda\" çerçevesi, yazma döngüsüne tanık olarak girme iddiasıdır — test edilmemiştir ve iyileştirme yönünde mekanizması yoktur.",
      en: "Sleep is not a failure in which consciousness shuts down but a maintenance window in which the system rewrites itself: in NREM the slow-wave–spindle–ripple triad orchestrates hippocampal–cortical replay, sensory gating closes, and the self-model (DMN) switches off. The 'nightly cleaning' claim was reversed in 2024: Miao et al. measured that clearance decreases during sleep and anesthesia and that movement is driven by diffusion (Nature Neuroscience 27:1046); the human evidence shows that amyloid dynamics are affected by sleep deprivation (Shokri-Kojori 2018). Gateway's 'mind awake, body asleep' frame is the claim of entering the write cycle as a witness — untested, and with no mechanism for improvement."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Nightly resource synchronization schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">GECELİK KAYNAK SENKRONİZASYONU (HZ-08): GÜNCELLEME CANLI ÇEKİRDEKTE YAPILMAZ</text>

      <rect x="18" y="38" width="312" height="132" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">YAZMA DÖNGÜSÜ MİMARİSİ</text>
      <g font-size="7">
        <text x="30" y="72" fill="var(--ink)">N1 geçiş · N2 iğcik + K-kompleks = geçit bekçisi (dış sızıntı kapanır)</text>
        <text x="30" y="88" fill="var(--ink)">N3 yavaş dalga + sharp-wave ripple = YAZMA (hipokampus → korteks)</text>
        <text x="30" y="104" fill="var(--ink)">REM = entegrasyon ve duygusal yeniden çerçeveleme</text>
        <text x="30" y="122" fill="var(--good)">DMN kapanır: benlik, yazılan defterin konusudur — yazıcısı değil</text>
        <text x="30" y="138" fill="var(--muted)">Lokal uyku (Vyazovskiy 2011): anahtar değil, bölgesel yazma durumu</text>
        <text x="30" y="154" fill="var(--muted)">Evrim bulmacası: 8 saat savunmasızlık neden kaldı? (Siegel 2005)</text>
      </g>

      <rect x="342" y="38" width="320" height="132" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="354" y="54" fill="var(--warn)" font-size="8" font-weight="700">KLERENS TARTIŞMASI: 2024'TE TERSİNE DÖNDÜ</text>
      <g font-size="7">
        <text x="354" y="72" fill="var(--ink)">Xie 2013 (Science 342:373): uykuda hücre arası boşluk ~%60 genişler, BOS akışı artar</text>
        <text x="354" y="88" fill="var(--bad)">Miao 2024 (Nat. Neurosci. 27:1046): difüzyon katsayısı sabit — klerens uykuda/anestezide AZALIYOR</text>
        <text x="354" y="104" fill="var(--ink)">Jiang-Xie 2024 (Nature 627:157): BOS perfüzyonunu pasif basınç değil nöronal dinamikler yönetir</text>
        <text x="354" y="120" fill="var(--ink)">İnsan: bir gece uykusuzluk → β-amiloid artışı (Shokri-Kojori 2018)</text>
        <text x="354" y="136" fill="var(--good)">Bellek, dikkat, duygu düzenleme bulguları bu tartışmadan bağımsız sağlam</text>
        <text x="354" y="152" fill="var(--muted)">Ders: metafor değil ölçüt — sonlanım noktasına bak (UA-30 kayıt-önce ilkesi)</text>
      </g>

      <rect x="18" y="180" width="644" height="82" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="196" fill="var(--violet)" font-size="8" font-weight="700">FOCUS 10 İDDİASI: TEST EDİLMEMİŞ MÜHENDİSLİK (İKİ YÖNLÜ ÖNGÖRÜ)</text>
      <g font-size="7.1">
        <text x="30" y="213" fill="var(--ink)">İddia: uyku başlangıcı fizyolojisi korunurken içe dönük farkındalık sürdürülebilir — \"yazma döngüsüne tanık giriş\".</text>
        <text x="30" y="228" fill="var(--ink)">(a) Başlangıç gecikmesi artar, yavaş dalga mimarisi değişmezse → Focus 10 = gecikme, giriş değil.</text>
        <text x="30" y="243" fill="var(--ink)">(b) Yavaş dalga yoğunluğu artar, bilişsel kazanç değişmezse → etki fenomenolojik düzeyde kalır.</text>
        <text x="30" y="256" fill="var(--muted)">Hiçbir sonuç otomatik olarak lehte sayılmaz; uyku hijyeni etkileri iddiadan bağımsızdır.</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="288" fill="var(--good)" font-size="8" font-weight="700">AYIRICI TESTLER VE TERMOMETRE</text>
      <g font-size="7">
        <text x="30" y="304" fill="var(--ink)">/1 Kapalı döngü yavaş dalga bastırma: aktif kol belleği bozar, ruh hâlini daha az etkiler.</text>
        <text x="30" y="318" fill="var(--ink)">/2 Hedeflenmiş yeniden etkinleştirme: SWS'te pekiştirme, REM'de şema entegrasyonu ayrışır.</text>
        <text x="30" y="332" fill="var(--warn)">/3 Tanık kolu (polsomnografi, ön kayıtlı): Focus 10 grubunda başlangıç gecikmesi ve/veya fark yokluğu beklenir — 🟡</text>
      </g>
    </svg>`
  },
  "horizon-ua15": {
    title: {
      tr: "Şekil UA-15.1: Ters Faz Geçişi Penceresi — Gama Patlaması, Zorunlu Eleştiri ve Kısıt Çöküşü Modeli",
      en: "Figure UA-15.1: The Reverse-Phase-Transition Window — The Gamma Surge, the Required Critique and the Constraint-Collapse Model"
    },
    caption: {
      tr: "Ölüm geçişinde beyin sessizleşmeden önce kısa ve yapılı bir elektriksel olay üretir: kardiyak arrest sonrası ilk saniyelerde gama patlaması ve koherans artışı (Borjigin 2013, fare); insanda dört hastadan ikisinde gama patlaması, temporo-parieto-oksipital \"sıcak bölge\"de yoğunlaşma ve birinde ~300 kat artış (Xu 2023); tek bir vakada kan akımı durduktan sonra da süren alfa/teta modülasyonu (Vicente ve ark. 2022). Ama patlama, toplam gücün küçük bir kesridir (Dunseath 2013), tek vaka confound'larla doludur (Greyson ve ark. 2022) ve yüksek koherans yüksek ayrışma demek değildir — nöbette de hipersenkroni vardır. Bu yüzden HZ-15 düzeltilir: görünen şey \"açılan kanal\" değil, kısıt çöküşüdür. Kritik öngörü: koherans artarken entropi düşmelidir — bu, mevcut veri kümelerinde bugün test edilebilir.",
      en: "At the death transition the brain produces a brief, structured electrical episode before falling silent: a gamma surge and rising coherence in the first seconds after cardiac arrest (Borjigin 2013, rats); in humans, a gamma surge in two of four patients, concentrated in the temporo-parieto-occipital 'hot zone', with a roughly 300-fold rise in one (Xu 2023); and in a single case, alpha/theta modulation continuing after blood flow stopped (Vicente et al. 2022). But the surge is a small fraction of total power (Dunseath 2013), the single case is full of confounds (Greyson et al. 2022), and high coherence does not mean high differentiation — hypersynchrony also occurs in seizures. Hence HZ-15 is corrected: what appears is not 'a channel opening' but constraint collapse. The critical prediction: as coherence rises, entropy must fall — testable today in existing data sets."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Reverse phase transition window schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">TERS FAZ GEÇİŞİ PENCERESİ (HZ-15): ENERJİ ÇÖKERKEN DÜZEN GÖRÜNÜR OLUR — AÇILMA DEĞİL, KISIT ÇÖKÜŞÜ</text>

      <rect x="18" y="38" width="318" height="140" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">OLAY ZAMAN ÇİZGİSİ (BAĞIMSIZ VERİLER)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Kardiyak arrest · serebral kan akımı durur</text>
        <text x="30" y="89">0–30 s: senkronize gama patlaması, frontal-posterior bağlantı ↑</text>
        <text x="30" y="102" fill="var(--muted)">  (Borjigin 2013, PNAS 110:14432 — fare; bazı hayvanlarda uyanıktan yüksek güç)</text>
        <text x="30" y="119">İnsan: 4 komadaki hastadan 2'sinde gama patlaması; TPJ \"sıcak bölge\"</text>
        <text x="30" y="132" fill="var(--muted)">  (Xu 2023, PNAS 120:e2216268120; bir hastada gama gücü ~300 kat)</text>
        <text x="30" y="149">Tek vaka: kan akımı durduktan sonra da alfa/teta modülasyonu</text>
        <text x="30" y="162" fill="var(--muted)">  (Vicente, Rizzuto, Sarica ve ark. 2022, Front. Aging Neurosci. 14:813531)</text>
        <text x="30" y="176" fill="var(--good)">Sonuç: ölüm geçişi sessizlik değil — kısa ve YAPILI bir olay</text>
      </g>

      <rect x="346" y="38" width="316" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="358" y="54" fill="var(--bad)" font-size="8" font-weight="700">ZORUNLU ELEŞTİRİ (DÜRÜSTLÜK KAYDI)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="358" y="72">• Patlama, hemen öncesindeki toplam gücün çok küçük bir kesridir</text>
        <text x="358" y="85" fill="var(--muted)">  → \"hiper-uyanıklık\" demek yanıltıcıdır (Dunseath 2013, PNAS 110:E4405)</text>
        <text x="358" y="101">• Anestezili fareler deseni göstermedi; tüm fareler üretti ama</text>
        <text x="358" y="114" fill="var(--muted)">  insanların yalnızca %10–20'si NDE bildiriyor → birebir eşleşme yok</text>
        <text x="358" y="130">• Tek vaka: hematom, nöbet geçmişi, ilaçlar, kan gazı confound'ları</text>
        <text x="358" y="143" fill="var(--muted)">  (Greyson, van Lommel & Fenwick 2022 — yorum yazısı)</text>
        <text x="358" y="159" fill="var(--warn)">• Koherans ↑ ≠ ayrışma ↑: nöbette de hipersenkroni var, bilinçle negatif</text>
        <text x="358" y="172" fill="var(--muted)">  → \"koherans arttı, bilinç açıldı\" çıkarımı ölçümün kendi mantığında geçersiz</text>
      </g>

      <rect x="18" y="188" width="644" height="86" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">DÜZELTİLMİŞ ADAY YASA: KISIT ÇÖKÜŞÜ İMZASI</text>
      <g font-size="7.1">
        <text x="30" y="221" fill="var(--ink)" font-weight="700">P_toplam ↓ · Koherans ↑ · Ayrışma ↓   →   Deneyim ~ İçerik × Ayrışma</text>
        <text x="30" y="237" fill="var(--ink)">Ölüm geçişinde birleşik, söz-ötesi, benliksiz raporlar beklenir — bu, iki okumaya da uyar; ayrım ancak içerik testiyle yapılır.</text>
        <text x="30" y="252" fill="var(--good)">Kritik öngörü (bugün test edilebilir): koherans artarken entropi/Komplekslik DÜŞMELİ — mevcut verilerde yeniden analiz.</text>
        <text x="30" y="267" fill="var(--muted)">İkinci hat: terminal berraklaşma — geriye dönük vaka serisi (Nahm 2012); ileriye dönük kohortta insidans bilinmiyor.</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="7">
        <text x="30" y="314" fill="var(--good)">🟢 Peri-arrest olay: türler ve laboratuvarlar arasında tekrarlandı. 🟡 Deneyim yorumu açık (ayrışma ölçütleri henüz uygulanmadı).</text>
        <text x="30" y="330" fill="var(--bad)">🟠 Doğrulanabilir algı: binlerce arrest içinde tek doğrulanmış vaka (AWARE-II) — UA-39'un defteri.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua02": {
    title: {
      tr: "Şekil UA-02.1: İki Fazlı Noetik Sıkıştırma — Kilitlenme, N1 Penceresi ve Tek Sembol",
      en: "Figure UA-02.1: Two-Phase Noetic Compression — Locking, the N1 Window and the Single Symbol"
    },
    caption: {
      tr: "Yaratıcı sıçrama iki fazlı bir temsil dönüşümüdür. Faz 1 (kilitlenme): yoğun odak, problemi tek çözüm yoluna bağlı seri bir temsile dönüştürür (Einstellung). Faz 2 (N1 penceresi): uyku eşiğinde seri bağ çözülür ama denetim tamamen düşmez (orta alfa + düşük delta); temsil sıkıştırılır. Laboratuvar kanıtı: N1'de en az 15 saniye kalanlarda gizli kuralı bulma olasılığı üç katına çıktı, N2'ye geçenlerde etki kayboldu (Lacaux ve ark. 2021, Science Advances 7:eabj5866); hedefli inkübasyon uyanma sonrası yaratıcı performansı artırdı (Horowitz ve ark. 2023, Sci. Rep. 13:7319). Tarihsel vakalar (Kekulé, Loewi, McCartney) anekdot düzeyindedir; çözüm sembol olarak gelir ama açılımı gecikmelidir (ortalama ~90 deneme).",
      en: "The creative leap is a two-phase transformation of representation. Phase 1 (locking): intense focus converts the problem into a serial representation bound to a single solution path (Einstellung). Phase 2 (the N1 window): at the sleep threshold the serial binding is released without control fully dropping (moderate alpha + low delta); the representation is compressed. Laboratory evidence: in those who stayed in N1 for at least 15 seconds, the odds of finding the hidden rule tripled, and the effect vanished in those who passed into N2 (Lacaux et al. 2021, Science Advances 7:eabj5866); targeted incubation raised post-sleep creative performance (Horowitz et al. 2023, Sci. Rep. 13:7319). The historical cases (Kekulé, Loewi, McCartney) are anecdotal; the solution arrives as a symbol but its expansion is delayed (average ~90 trials)."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Two-phase noetic compression schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İKİ FAZLI NOETİK SIKIŞTIRMA (HZ-02): KİLİTLENME → EŞİK → TEK SEMBOL → GECİKMELİ AÇILIM</text>

      <rect x="18" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--muted)"/>
      <text x="30" y="54" fill="var(--muted)" font-size="8" font-weight="700">FAZ 1 — KİLİTLENME</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Yoğun, uzun odak: keskin çözüm arayışı</text>
        <text x="30" y="88">Mental set / Einstellung: tek yol kilitlenir</text>
        <text x="30" y="104">Denetim yüksek, DMN yüksek → temsil SERT</text>
        <text x="30" y="120" fill="var(--muted)">Problem kendini çözemez: her yol aynı</text>
        <text x="30" y="131" fill="var(--muted)">temsilin içinden türetilir.</text>
        <text x="30" y="152" fill="var(--accent)">Çıktı: çözülemeyen ama yüklü bir temsil</text>
        <text x="30" y="166" fill="var(--ink)">(\"ısıtılmış\"), çözüm hazır ama bağlı.</text>
      </g>

      <rect x="234" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="246" y="54" fill="var(--good)" font-size="8" font-weight="700">FAZ 2 — N1 PENCERESİ</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="246" y="72">Uyku eşiği: seri bağ çözülür, denetim kalır</text>
        <text x="246" y="88">İmza: ORTA ALFA + DÜŞÜK DELTA</text>
        <text x="246" y="104">DMN düşer → temsil PARALEL / DUYUSAL formata</text>
        <text x="246" y="115" fill="var(--muted)">  sıkıştırılır (tek görüntü, tek söz, tek sahne)</text>
        <text x="246" y="132" fill="var(--warn)">Ters U: ~15 s tepe · erken uyanma eksik,</text>
        <text x="246" y="143" fill="var(--warn)">  N2'ye geçiş etkiyi sıfırlar (Lacaux 2021)</text>
        <text x="246" y="160" fill="var(--good)">Kanıt: N1 ≥ 15 s → çözüm olasılığı ×3</text>
        <text x="246" y="172" fill="var(--ink)">Dormio (2023): hedefli inkübasyon ↑ performans</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="468" y="54" fill="var(--violet)" font-size="8" font-weight="700">ÇIKTI — SEMBOL VE GECİKME</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Çözüm DEĞİL, çözümün ADRESİ indirilir:</text>
        <text x="468" y="84" fill="var(--muted)">  kendi kuyruğunu ısıran yılan (Kekulé)</text>
        <text x="468" y="96" fill="var(--muted)">  gece yarısı deney tasarımı (Loewi)</text>
        <text x="468" y="108" fill="var(--muted)">  \"Yesterday\" melodisi (McCartney)</text>
        <text x="468" y="124" fill="var(--ink)">Açılım GECİKMELİ: ortalama ~90 deneme</text>
        <text x="468" y="140" fill="var(--warn)">Anlatılar: hayatta kalma yanlılığı —</text>
        <text x="468" y="151" fill="var(--muted)">  sadece işe yarayan rüyalar anlatılır</text>
        <text x="468" y="167" fill="var(--good)">İki zaman ölçeği: gece (Wagner 2004)</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="204" fill="var(--accent)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">İçgörü ≈ K_odak × f(N1_süre) × (1 − D_delta)   →   K_odak: faz 1 yükü · f: ters U (tepe ≈ 15 s)</text>
        <text x="30" y="238" fill="var(--ink)">/1 N1 titrasyonu (ön kayıtlı): 5 s vs 15 s vs N2 sonrası uyandırma — ters U bekleniyor</text>
        <text x="30" y="253" fill="var(--ink)">/2 İmza aracılığı: uyanış anındaki alfa/delta örüntüsü + (alt örneklem) DMN düşüşü, içgörüyü kestirmeli</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="7">
        <text x="30" y="305" fill="var(--good)">🟡 Laboratuvar kanadı üç tasarımdan destekli; ama replikasyon sınırlı ve tarihsel vakalar anekdot.</text>
        <text x="30" y="319" fill="var(--ink)">/3 Sıkıştırma kodlaması: içgörüyle biten oturumlarda \"tek sembol\" rapor oranı yüksek olmalı (kör kodlayıcı).</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: ters U bulunamazsa model \"eşik\" değil \"süre\" modeline iner — dosya bunu kabul eder.</text>
      </g>
    </svg>`
  },
  "horizon-ua06": {
    title: {
      tr: "Şekil UA-06.1: Harmonik İzolasyon — Rasyonel Oranlar Kapı, İrrasyonel Oranlar Duvar",
      en: "Figure UA-06.1: Harmonic Isolation — Rational Ratios Are Gates, Irrational Ratios Are Walls"
    },
    caption: {
      tr: "İki osilatör kuplajlandığında faz kilitleme, frekans oranı küçük paydalı rasyonel değerlere (1:1, 2:1, 3:2) yakınken güçlenir; Arnold dili genişliği ~q⁻² ile daralır. Altın oran, en yavaş yakınsayan irrasyonel olduğu için en dar dilde kalır — KAM dayanıklılığının çekirdeği budur (Greene 1979) ve gerçek matematiktir. Ama iddianın beyin düzeyindeki biçimi kanıtsızdır: bant etiketlerinin oktav görünümü kısmen konvansiyondur (delta 0.5–4, teta 4–8, alfa 8–13, beta 13–30, gama 30+; \"2.5·5·10·20·40\" stilize merkezlerdir), bireysel tepe frekanslarının φ'ye oturduğu ölçülmemiştir ve binaural beat entrainment'ı tartışmalıdır (14 EEG çalışmasının 8'i aleyhte; Ingendoh 2023). Kutsal mimarideki φ iddiaları ise büyük ölçüde sonradan yakıştırmadır (Markowsky 1992).",
      en: "When two oscillators are coupled, phase locking strengthens near small-denominator rational ratios (1:1, 2:1, 3:2); the Arnold-tongue width narrows as ~q⁻². The golden ratio, being the slowest-converging irrational, stays in the narrowest tongue — the core of KAM robustness (Greene 1979) and real mathematics. But the brain-level form of the claim is unsupported: the octave appearance of band labels is partly convention (delta 0.5–4, theta 4–8, alpha 8–13, beta 13–30, gamma 30+; '2.5·5·10·20·40' are stylized centres), no measurement shows individual peak frequencies sitting on φ, and binaural-beat entrainment is contested (8 of 14 EEG studies against; Ingendoh 2023). The φ claims in sacred architecture are largely retrofitting (Markowsky 1992)."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Harmonic isolation schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">HARMONİK İZOLASYON (HZ-06): RASYONEL ORANLAR KAPI, İRRASYONEL ORANLAR DUVAR</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="54" fill="var(--good)" font-size="8" font-weight="700">GERÇEK MATEMATİK: ARNOLD DİLLERİ</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">φ = [1; 1, 1, 1, …] → en yavaş yakınsayan</text>
        <text x="30" y="88">p/q küçük payda → GENİŞ dil = KAPI</text>
        <text x="30" y="104">q büyür → dil daralır (W ~ q⁻²) = DUVAR</text>
        <text x="30" y="120">φ oranı → en dayanıklı yörünge:</text>
        <text x="30" y="132" fill="var(--good)">  KAM'da en SON kırılan (Greene 1979)</text>
        <text x="30" y="150" fill="var(--ink)">Kuplaj fiziği net: 1:1, 2:1, 3:2 iletişim;</text>
        <text x="30" y="162" fill="var(--muted)">yüksek payda + φ izolasyon.</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">BEYİN DÜZEYİ: ÖLÇÜLMEMİŞ</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Oktav merdiveni YAKLAŞIK gerçek:</text>
        <text x="252" y="86" fill="var(--muted)">  4 → 8 tam kat; 13 ve 30 kırılıyor</text>
        <text x="252" y="102">\"2.5 · 5 · 10 · 20 · 40\" = STİLİZE merkezler</text>
        <text x="252" y="118">Bireysel alfa tepesi 8–12 Hz (değişken)</text>
        <text x="252" y="134" fill="var(--bad)">Tepelerin φ'ye oturduğuna dair kanıt YOK</text>
        <text x="252" y="150">Çapraz-frekans kuplaj GERÇEK (teta-gama)</text>
        <text x="252" y="164" fill="var(--good)">→ ilke doğru, ama doğru düzeyde test edilmeli</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">KANIT BİLANÇOSU</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72" fill="var(--bad)">Binaural beat: 14 EEG çalışması → 5 lehte,</text>
        <text x="468" y="83" fill="var(--bad)">  8 aleyhte, 1 karışık (Ingendoh 2023)</text>
        <text x="468" y="99">Sıralama: isochronal &gt; monaural &gt; binaural</text>
        <text x="468" y="112" fill="var(--muted)">  (Orozco Perez 2020)</text>
        <text x="468" y="128">40 Hz GENUS: nöral yanıt GERÇEK, klinik</text>
        <text x="468" y="139" fill="var(--muted)">  fayda zayıf/kontrolsüz (Chan 2025, n=5)</text>
        <text x="468" y="155" fill="var(--bad)">Kutsal mimari φ iddiası: yakıştırma</text>
        <text x="468" y="166" fill="var(--muted)">  (Markowsky 1992) — gerçek olan oda akustiği</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">P_kilit(α) ≈ 1 eğer |α − p/q| &lt; W_pq (W ~ q⁻²) · φ'de izolasyon tepe yapar</text>
        <text x="30" y="238" fill="var(--ink)">/1 Sürücü frekans taraması: IAF'ın katları (1:1, 2:1, 3:2) vs φ oranları → PLV rasyonelde yüksek, φ'de dip</text>
        <text x="30" y="253" fill="var(--ink)">/2 Bireysel frekans örgüsü: alfa/teta/gama tepelerinin oranları rasyonel değerlere yığılmalı (yüzlerce kişi)</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="7">
        <text x="30" y="305" fill="var(--good)">🟢 matematik · 🟡 beyin düzeyi · 🟠 doğrudan uygulama (kanal/geçit metaforu)</text>
        <text x="30" y="319" fill="var(--ink)">/3 Uygulama sınavı: isochronal/monaural/binaural × rasyonel/φ beat — φ kolu güçlü entrainment üretirse HZ-06 YANLIŞLANIR.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: KAM matematiği ve genel kuplaj fizyolojisi programdan bağımsız ayakta kalır.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua01": {
    title: {
      tr: "Şekil UA-01.1: Kutsal Fonetik — Üç Gerçek Kapı, Bir Kanıtsız Hat",
      en: "Figure UA-01.1: Sacred Phonetics — Three Real Gates, One Unsupported Line"
    },
    caption: {
      tr: "Uğultu nazal nitrik oksidi yaklaşık on beş kat artırır (Weitzberg 2002); yavaş seslendirme soluk ritmini dakikada altıya indirip otonomik dengeyi değiştirir (Bernardi 2001: Latin tespih ile yoga mantrası aynı etkiyi verir, yani taşıyıcı metin değil ritimdir). Beyin düzeyinde ufuk verici ama pilot bir bulgu vardır (Kalyani 2011, on iki kişi: limbik deaktivasyon, kontrol sesinde hiçbir etki). Sfenoid-hipofiz piezoelektrik hattı ise desteksizdir: komşuluk doğrudur ama sfenoid bir hava boşluğudur, kemik piezoelektrisitesi dinamik yükleme eşiği gerektirir (Fukada 1957) ve hece başına mekanik mod eşleşmesi ölçülmemiştir. Otonomik etki ritim, rezonans ve tekrar paketinden gelir; hece kimliğinden değil.",
      en: "Humming raises nasal nitric oxide roughly fifteenfold (Weitzberg 2002); slow vocalization slows breathing to about six per minute and shifts autonomic balance (Bernardi 2001: Latin rosary and yoga mantra give the same effect, so the carrier is rhythm, not text). At brain level there is a promising but pilot finding (Kalyani 2011, twelve people: limbic deactivation, nothing in the control sound). The sphenoid-pituitary piezoelectric line is unsupported: the proximity is right, but the sphenoid is an air cavity, bone piezoelectricity requires dynamic loading strain (Fukada 1957), and no syllable-to-mechanical-mode match has been measured. The autonomic effect comes from the rhythm-resonance-repetition package, not from syllable identity."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Sacred phonetics schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">KUTSAL FONETİK (HZ-01): ÜÇ GERÇEK KAPI, BİR KANITSIZ HAT</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="54" fill="var(--good)" font-size="8" font-weight="700">GERÇEK AKTÜATÖRLER (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Uğultu → nazal NO yaklaşık 15 kat ↑</text>
        <text x="30" y="86" fill="var(--muted)">  (Weitzberg &amp; Lundberg 2002)</text>
        <text x="30" y="102">Yavaş seslendirme: soluk ~6/dk →</text>
        <text x="30" y="116">  HRV + barorefleks ↑ (Bernardi 2001)</text>
        <text x="30" y="132">Latin tespih ≈ yoga mantrası:</text>
        <text x="30" y="146">  taşıyıcı metin değil, RİTİM paketi</text>
        <text x="30" y="164" fill="var(--good)">∂(etki)/∂(hece kimliği) ≈ 0</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">BEYİN DÜZEYİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Kalyani 2011 pilot fMRI (n=12):</text>
        <text x="252" y="86">OM → OFC, ACC, hipokampus,</text>
        <text x="252" y="98">talamus ve sağ amigdalada</text>
        <text x="252" y="112" fill="var(--warn)">DEAKTİVASYON; kontrol sesi: etki yok</text>
        <text x="252" y="128">Yazarların benzetmesi: vagal/tVNS</text>
        <text x="252" y="142" fill="var(--bad)">→ ÖLÇÜLMEDİ, yalnızca hipotez</text>
        <text x="252" y="160" fill="var(--muted)">Tek lab + küçük örneklem → 🟡</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">SFENOİD-HİPOFİZ (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Doğru: sella = sfenoid çatısı çukuru</text>
        <text x="468" y="86">Ama sfenoid bir HAVA boşluğudur</text>
        <text x="468" y="100">Kemik piezoelektrisitesi var (Fukada)</text>
        <text x="468" y="112">ama dinamik yükleme eşiği yüksek</text>
        <text x="468" y="126" fill="var(--bad)">Duyulabilir ses → gerilme EŞİK ALTINDA</text>
        <text x="468" y="140" fill="var(--bad)">'Geometrik süpürme' eşleşmesi: YOK</text>
        <text x="468" y="154">3. ventrikül tabanı: mekanoreseptör YOK</text>
        <text x="468" y="168" fill="var(--muted)">Komşuluk, mekanizma değildir</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">Otonomik etki ≈ f(S_ritim, H_rezonans, T_tekrar) · hece kimliği ≈ 0</text>
        <text x="30" y="238" fill="var(--ink)">/1 Kelime körlemesi: OM vs eşlenmiş anlamsız hece vs sessiz ritim vs dinlenme → A ≈ B &gt; C &gt; D beklenir</text>
        <text x="30" y="253" fill="var(--ink)">/2 Uğultu sınavı: uğultu vs açık harf vs sessiz ekshalasyon → nazal NO yalnız uğultu kolunda artar</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--good)">🟢 dil + fizyoloji · 🟡 beyin/otonomik pilot · 🟠 piezoelektrik sfenoid (ölçüm ve mekanizma yok)</text>
        <text x="30" y="319" fill="var(--ink)">/3 Fantom ölçümü: sella bölgesi ivmesi eşik altında kalmalı; A &gt; B çıkarsa fonetik iddia güç kazanır.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: üç kapı (soluk, rezonans, tekrar) pratik değerini korur; kutsal-hece yasası taşınmaz.</text>
      </g>
    </svg>`
  },
  "horizon-ua18": {
    title: {
      tr: "Şekil UA-18.1: Ritim Sürüşü — Beden Kilitlenir, EEG Kilitlenmez",
      en: "Figure UA-18.1: Rhythmic Driving — Bodies Lock, EEG Does Not"
    },
    caption: {
      tr: "İşitsel-motor kilit gerçektir: beyin vuruşu içeride yeniden üretir (Nozaradan 2011), groove hareket ve zevk üretir (Janata 2012; Witek 2014), ritmik işitsel uyarım Parkinson yürüyüşünü düzeltir (Thaut). Ama 'davul EEG tetayı sürükler' iddiası en iyi testinde düştü: bağımsız bir denemede teta artmadı ve alfa düştü (2016 tezi); Neher hattı nitelikseldi. Sürü kilidi ise ölçülmüştür: performansçı ile izleyici arasında kalp senkronu (Konvalinka 2011) ve senkron hareketin işbirliğini artırması (Wiltermuth 2009). Taşıyıcı kortikal bant değil, ortak hareket ve sosyal uyarılmadır.",
      en: "The auditory-motor lock is real: the brain reproduces the beat internally (Nozaradan 2011), groove produces movement and pleasure (Janata 2012; Witek 2014), rhythmic auditory stimulation improves Parkinsonian gait (Thaut). But the claim that drumming drives EEG theta fell in its best test: an independent attempt found no theta rise and decreased alpha (2016 thesis); the Neher line was qualitative. The herd lock, by contrast, has been measured: heart-rate synchrony between performer and spectator (Konvalinka 2011) and synchrony raising cooperation (Wiltermuth 2009). The carrier is not a cortical band but shared movement and social arousal."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Rhythmic driving schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">RİTİM SÜRÜŞÜ (HZ-18): BEDEN KİLİTLENİR, EEG KİLİTLENMEZ</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="54" fill="var(--good)" font-size="8" font-weight="700">GERÇEK: İŞİTSEL-MOTOR KİLİT (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Beyin vuruşu içeride yeniden üretir:</text>
        <text x="30" y="85" fill="var(--muted)">  vuruş/ölçü etiketleme (Nozaradan 2011)</text>
        <text x="30" y="101">Groove: senkop → hareket + zevk</text>
        <text x="30" y="114" fill="var(--muted)">  (Janata 2012; Witek 2014)</text>
        <text x="30" y="130">Klinik: ritmik işitsel uyarım (RAS)</text>
        <text x="30" y="143" fill="var(--muted)">  Parkinson yürüyüşünü düzeltir (Thaut)</text>
        <text x="30" y="164" fill="var(--good)">Davul = bedenler arası METRONOM</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="252" y="54" fill="var(--bad)" font-size="8" font-weight="700">DÜŞEN İDDİA: EEG TETA (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Neher 1961/62: niteliksel EEG sürükleme</text>
        <text x="252" y="86">Maxfield hattı: 4.5 Hz → teta ↑ iddiası</text>
        <text x="252" y="102" fill="var(--bad)">Bağımsız test (2016): teta ARTMAZ,</text>
        <text x="252" y="115" fill="var(--bad)">  alfa DÜŞER; öneri manipülasyonu etkisiz</text>
        <text x="252" y="131">Sonuç: 'davul teta üretir' = folk bilim</text>
        <text x="252" y="147">Transa giriş kültürel TEKNİK (Rouget):</text>
        <text x="252" y="163" fill="var(--muted)">uyaranın yarısı bağlam + beklenti</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="468" y="54" fill="var(--good)" font-size="8" font-weight="700">SÜRÜ KİLİDİ: ÖLÇÜLEN (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Ateş yürüyüşü: performansçı ile izleyici</text>
        <text x="468" y="85" fill="var(--muted)">  kalp senkronu (Konvalinka 2011)</text>
        <text x="468" y="101">Senkron hareket → işbirliği ↑</text>
        <text x="468" y="114" fill="var(--muted)">  (Wiltermuth 2009; Reddish 2013)</text>
        <text x="468" y="130">Sema: vestibüler hat; EEG verisi YOK</text>
        <text x="468" y="146">Çıktı: aidiyet ve dayanışma —</text>
        <text x="468" y="162" fill="var(--muted)">'değişmiş bilinç' değil</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">S_sürü ≈ M_ortak × A_ortak × U_sosyal · ∂(EEG teta)/∂(tempo) ≈ 0</text>
        <text x="30" y="238" fill="var(--ink)">/1 4.5 vs 8 Hz vs asenkron perküsyon: motor/kardiyak senkron tempodan bağımsız yüksek, EEG teta ilişkisiz</text>
        <text x="30" y="253" fill="var(--ink)">/2 Yalnız vs eş vs sanal eş: kişiler arası senkron yalnız ortaklıkta kurulur — ritim gerekli, yeterli değil</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--good)">🟢 entrainment + sosyal senkron · 🟡 ritüel sahası · 🟠 davul-teta iddiası</text>
        <text x="30" y="319" fill="var(--ink)">/3 Saha: senkron ↔ aidiyet güçlü, senkron ↔ EEG bandı zayıf; teta tempoyu izlerse HZ-18 yanlışlanır.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: RAS ve senkron-işbirliği hattı programdan bağımsız ayakta kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua19": {
    title: {
      tr: "Şekil UA-19.1: Mekânın Fiziği — Akustik Tercih Gerçek, Sabit Frekans Değil",
      en: "Figure UA-19.1: The Physics of Place — Acoustic Preference Is Real, a Fixed Frequency Is Not"
    },
    caption: {
      tr: "Mağara resimlerinin en yankılı bölgelere düşmesi birden çok mağarada gözlenmiştir (Reznikoff & Dauvois 1988) ve Hal Saflieni hipogeumunda yüz on Hz çevresinde bir oda rezonansı yerinde ölçülmüştür (Jahn 1996). Ancak 'yüz on Hz özel frekanstır' iddiası zayıftır: Cook ve arkadaşlarının bulgusu EEG'dir (fMRI değil), otuz kişiliktir, tek laboratuvardır ve on yedi yıldır replike edilmemiştir; SBRG hattında etkiler kişiye özel frekanslara dağılmış, yüz on Hz öne çıkmamıştır. Mekânın gerçek işlevi bir kazançtır: yankı süresi, bas zenginliği ve yalıtım sesi güçlendirir; altın oran numerolojisi ise ölçüm değil varsayımdır.",
      en: "Cave paintings falling on the most echoing zones have been observed in several caves (Reznikoff & Dauvois 1988), and a chamber resonance near one hundred and ten Hz was measured in situ in the Hal Saflieni Hypogeum (Jahn 1996). But the claim that 'one hundred and ten Hz is a special frequency' is weak: the Cook et al. finding is EEG (not fMRI), thirty people, a single laboratory, unreplicated for seventeen years; in the SBRG line the effects spread across individual-specific frequencies and one hundred and ten Hz did not stand out. The real function of place is a gain: echo time, bass richness and isolation strengthen sound; golden-ratio numerology is assumption, not measurement."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Physics of place schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">MEKÂNIN FİZİĞİ (HZ-19): AKUSTİK TERCİH GERÇEK, SABİT FREKANS DEĞİL</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">GERÇEK: TERCİH İZİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Mağara resimleri en YANKILI bölgede</text>
        <text x="30" y="85" fill="var(--muted)">  (Reznikoff &amp; Dauvois 1988; çok mağara)</text>
        <text x="30" y="101">Hal Saflieni oda rezonansı ≈ 110 Hz</text>
        <text x="30" y="114" fill="var(--muted)">  (Jahn 1996 — tek yapı, yerinde ölçüm)</text>
        <text x="30" y="130">Chavín galerileri ≈ 120 Hz (Kolar)</text>
        <text x="30" y="146">Seçici olan: yankı süresi + bas dokusu</text>
        <text x="30" y="162" fill="var(--good)">sabit tepe frekansı değil</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="252" y="54" fill="var(--bad)" font-size="8" font-weight="700">110 Hz İDDİASI (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Cook 2008: EEG (fMRI DEĞİL), n=30</text>
        <text x="252" y="86">110 Hz → sağ ön baskınlık kayması</text>
        <text x="252" y="102" fill="var(--bad)">17 yıldır bağımsız replikasyon YOK</text>
        <text x="252" y="118">SBRG denemesi: tepeler KİŞİYE ÖZEL</text>
        <text x="252" y="131" fill="var(--muted)">  (90 / 105 / 120 Hz; ortalama ~105)</text>
        <text x="252" y="147" fill="var(--bad)">110 Hz öne ÇIKMADI → sabit sayı</text>
        <text x="252" y="160" fill="var(--muted)">okuması düşer (tek lab, küçük n)</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">NUMEROLOJİ SINIRI (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">'110 = φ = kutsallık' zinciri:</text>
        <text x="468" y="86">ölçüm değil VARSAYIM hiyerarşisi</text>
        <text x="468" y="102">φ bağı gösterilmedi (düşük katman)</text>
        <text x="468" y="118">Gerçek etki: mekân bir KAZANÇ'tır</text>
        <text x="468" y="132" fill="var(--muted)">  ritüelin sesi mekânla güçlenir</text>
        <text x="468" y="148">Mesaj değil: sürdürme + bas dokusu</text>
        <text x="468" y="164" fill="var(--muted)">+ infrases beden etkisi (bulantı uyarısı)</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">T_mekân ≈ P(yankı süresi, düşük-yüz Hz zenginliği, yalıtım) · ∂(etki)/∂(sabit frekans) ≈ 0</text>
        <text x="30" y="238" fill="var(--ink)">/1 20+ mekân: RT60 + bas eğrisi + subjektif/EEG → kutsallık yüklemi yankı süresinde, tepe frekansında değil</text>
        <text x="30" y="253" fill="var(--ink)">/2 110 Hz vs kişisel tepe vs eşlenik, çift-kör n≥80 → 110 Hz ayrışmamalı (Cook bulgusu replike edilmez)</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--warn)">🟡 resim-yankı + yerinde ölçüm · 🟠 nöral frekans özgüllüğü · 🔴 sayısal mistisizm</text>
        <text x="30" y="319" fill="var(--ink)">/3 Mağara arşivi: yankı + ışık + erişim BİRLİKTE modellenir; infrases için güvenlik uyarısı geçerli.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: akustik tercih örüntüsü tek başına kullanışlı mimari bilgi olarak kalır.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua03": {
    title: {
      tr: "Şekil UA-03.1: Zoonoetik Alan — İnternet Değil, Sinyal Pazarı",
      en: "Figure UA-03.1: The Zoonoetic Field — Not an Internet but a Signal Market"
    },
    caption: {
      tr: "Sürüler merkezsiz kritiklikle tek gövde gibi döner (Cavagna 2010: korelasyon uzunluğu sürüyle büyür) ve kuşlar mesafeye değil topolojiye göre etkileşir (Ballerini 2008) — bu, küresel alan gerektirmeyen gerçek fiziktir. Mikoriza ağları vardır ama 'ağaçlar konuşur' anlatısı sistematik derlemeyle zayıflatıldı: 26 çalışmada fidan yararı görülmedi ve uyarı sinyali iddiasının hakemli saha kanıtı yoktur (Karst 2023). Monark yön bulma anten saatli güneş pusulasıdır (Merlin 2009) — ağ değil, genetik pusula. Kriptokrom-4'te spin koheransı ciddi bir adaydır; fakat dolanıklık ağı dili popüler fiziktir. Doğru hüküm: biyosfer, alıcıya kilitli yerel protokollerden oluşan bir sinyal pazarıdır.",
      en: "Flocks turn like a single body through decentralized criticality (Cavagna 2010: correlation length grows with flock size) and birds interact by topology rather than distance (Ballerini 2008) — real physics that needs no global field. Mycorrhizal networks exist, but the 'trees talk' narrative was weakened by a systematic review: across 26 studies seedlings did not benefit and the warning-signal claim has no peer-reviewed field evidence (Karst 2023). Monarch navigation is an antenna-clocked sun compass (Merlin 2009) — a genetic compass, not a network. In cryptochrome-4 spin coherence is a serious candidate; the entanglement-network language, however, is pop physics. The correct verdict: the biosphere is a signal market of receiver-locked local protocols."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Zoonoetic field schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ZOONOETİK ALAN (HZ-03): İNTERNET DEĞİL, SİNYAL PAZARI</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="54" fill="var(--good)" font-size="8" font-weight="700">GERÇEK: MERKEZSİZ ZEKÂ (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Sığırcık: ölçek-bağımsız kritiklik</text>
        <text x="30" y="85" fill="var(--muted)">  (Cavagna 2010: korelasyon ↑, sürü ↑)</text>
        <text x="30" y="101">Etkileşim topolojik: ~6-7 komşu</text>
        <text x="30" y="114" fill="var(--muted)">  (Ballerini 2008) — mesafe değil</text>
        <text x="30" y="130">Kurom sensing: yoğunluk → ortak karar</text>
        <text x="30" y="146">Monark: anten saati + güneş pusulası</text>
        <text x="30" y="162" fill="var(--good)">  saat kaydırılırsa yön kayar (Merlin 2009)</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">MİKORİZA AĞI (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Ağ var; karbon akışı var — ama küçük</text>
        <text x="252" y="88">26 çalışma: fidan yararı zayıf,</text>
        <text x="252" y="101">  en sık sonuç NÖTR (Karst 2023)</text>
        <text x="252" y="117" fill="var(--bad)">Uyarı sinyali iddiası: hakemli saha</text>
        <text x="252" y="130" fill="var(--bad)">  kanıtı SIFIR — pozitif atıf yanlılığı</text>
        <text x="252" y="146">Karşı taraf: mykoheterotroflar CMN</text>
        <text x="252" y="159" fill="var(--muted)">  işlevinin doğal kanıtı (Nat Plants 24)</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">ALAN İDDİASI (🟠-🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Bir biyosfer interneti alanı:</text>
        <text x="468" y="85" fill="var(--bad)">  ölçüm yok, mekanizma yok</text>
        <text x="468" y="101">Kriptokrom-4: koherans gerçek,</text>
        <text x="468" y="114" fill="var(--muted)">  dolanıklık ağı dili pop-fizik</text>
        <text x="468" y="130">Mantar spike'ları: iletişim iddiası</text>
        <text x="468" y="143" fill="var(--muted)">  kanıtlanmadı (Adamatzky 2022)</text>
        <text x="468" y="159" fill="var(--good)">Gerçek: yerel sinyaller + kritiklik</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">K_etki ≈ Σ (Y_yerel × A_alıcı) · ∂(etki)/∂(küresel yayın) ≈ 0</text>
        <text x="30" y="238" fill="var(--ink)">/1 Mikoriza: izotop + genotip → transfer küçük ve alıcıya bağlı çıkmalı; fidan performansını ışık/besin yordamalı</text>
        <text x="30" y="253" fill="var(--ink)">/2 Sürü: tek birey pertürbasyonu kritiklik yasalarıyla yayılmalı — 'alan modu' görünmemeli (Cavagna hattı)</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--good)">🟢 sürü fiziği + kurom sensing · 🟡 CMN varlığı/akışı · 🟠 anne-ağaç iddiası · 🔴 bilinçli alan</text>
        <text x="30" y="319" fill="var(--ink)">/3 Mantar elektriği kör işlev testi. Transfer büyük ve alıcıdan bağımsız çıkarsa HZ-03 zayıflar.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: ölçek-bağımsız kritiklik, kurom sensing ve pusula mekanizmaları programdan bağımsız kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua04": {
    title: {
      tr: "Şekil UA-04.1: Beyin-Dışı Dağıtık Bellek — Hatıra = Durum Kodları, Beyin = Erişim Anahtarı",
      en: "Figure UA-04.1: Extracerebral Distributed Memory — Memory Is State Codes, the Brain Is the Access Key"
    },
    caption: {
      tr: "Sinir-dışı insan hücreleri aralıklı uyaranı 'hatırlar' ve bu ERK-CREB bağımlıdır (Kukushkin 2024): bellek, sinir devresinden bağımsız bir sinyal dinamiği olarak modellenebilir. Eğitimli bağışıklık beyinden bağımsız dağıtık bellek üretir (Netea 2016) ve Physarum alışır (Boisseau 2016). Planarya baş yenilenmesinden sonra eğitimi koruyabilir (Shomrat & Levin 2013); ama gövdede sinir ağı kalır ve bağımsız replikasyon yoktur. Kalp nakli tercih aktarımı anlatıları geriye dönük ve kontrolsüzdür; gerçek olan kimerizm ile intrinsik kardiyak sinir ağıdır. Kişisel anının beyin dışında saklandığı gösterilmemiştir.",
      en: "Non-neural human cells 'remember' a spaced stimulus, and this is ERK-CREB dependent (Kukushkin 2024): memory can be modelled as a signalling dynamic independent of neural circuitry. Trained immunity produces brain-independent distributed memory (Netea 2016) and Physarum habituates (Boisseau 2016). Planarians may retain training after head regeneration (Shomrat & Levin 2013); but a body nerve net remains and there is no independent replication. Heart-transplant preference-transfer narratives are retrospective and uncontrolled; what is real is chimerism and the intrinsic cardiac nervous system. Personal memory has not been shown to be stored outside the brain."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Distributed memory schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">BEYİN-DIŞI DAĞITIK BELLEK (HZ-04): HATIRA = DURUM KODLARI, BEYİN = ERİŞİM ANAHTARI</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--good)"/>
      <text x="30" y="54" fill="var(--good)" font-size="8" font-weight="700">HÜCRE DÜZEYİ: GERÇEK (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Sinir-dışı insan hücreleri aralıklı</text>
        <text x="30" y="85">uyarıyı hatırlıyor (Kukushkin 2024)</text>
        <text x="30" y="101">4 aralıklı uyarı &gt; tek toplu uyarı</text>
        <text x="30" y="114">ERK + CREB bağımlı; bloke → etki yok</text>
        <text x="30" y="130">Eğitimli bağışıklık: epigenetik bellek</text>
        <text x="30" y="143" fill="var(--muted)">  (Netea 2016; Kleinnijenhuis 2012)</text>
        <text x="30" y="161" fill="var(--good)">Physarum alışır (Boisseau 2016)</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">TRANSGENERASYONEL (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Korku sperm RNA'sıyla kuşaklara?</text>
        <text x="252" y="85" fill="var(--muted)">  (Dias &amp; Ressler 2014; Gapp 2014)</text>
        <text x="252" y="101">Replikasyon zor, etki küçük, protokol</text>
        <text x="252" y="114">farklı — 'güçlü hipotez' düzeyinde</text>
        <text x="252" y="130">Planarya: baş yenilense de eğitim kalır</text>
        <text x="252" y="143" fill="var(--muted)">  (Shomrat &amp; Levin 2013)</text>
        <text x="252" y="159" fill="var(--bad)">AMA gövde sinir ağı kalır + tek lab</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">ANLATI KATMANI (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Kalp nakli 'tercih değişimi': geriye</text>
        <text x="468" y="85">dönük anket, kontrolsüz, kör değil</text>
        <text x="468" y="101">Gerçek olan: kimerizm + intrinsik</text>
        <text x="468" y="114">kardiyak sinir ağı (on binlerce nöron)</text>
        <text x="468" y="130">'Donör dokusu yaşar' doğru;</text>
        <text x="468" y="143" fill="var(--bad)">'donörün anısı geçer' GÖSTERİLMEDİ</text>
        <text x="468" y="159" fill="var(--muted)">Prospektif kör kohort: henüz yok</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">Hatıra_erişilebilir ≈ E(İ) × Σ_c D_c · beyin = indeks, depo = hücre durum kodları</text>
        <text x="30" y="238" fill="var(--ink)">/1 Kukushkin paradigmı primer hücrelerde bağımsız, ön kayıtlı replikasyonla sınanır</text>
        <text x="30" y="253" fill="var(--ink)">/2 Planarya ayrıştırıcı: gövde sinir ağı ablate edilirse eğitim kalıntısı silinmeli</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--good)">🟢 hücresel bellek + bağışıklık · 🟡 transgenerational · 🟠 planarya · 🔴 nakil anısı</text>
        <text x="30" y="319" fill="var(--ink)">/3 Prospektif çift-kör nakil kohortu: aktarım görünmemeli. Gövde deposu çıkarsa HZ-04 revize edilir.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: eğitimli bağışıklık ve alışma öğrenmesi programdan bağımsız ayakta kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua09": {
    title: {
      tr: "Şekil UA-09.1: Onko-Biyoelektrik Yabancılaşma — Çok Katmanlı Ağ Sapması",
      en: "Figure UA-09.1: Onco-Bioelectric Alienation — A Multi-Layered Network Defection"
    },
    caption: {
      tr: "Xenopus modelinde onkogen hücreyi depolarize eder; depolarizasyon yapay olarak engellenirse tümör oluşmaz (Chernet & Levin 2013) ve etki uzun menzillidir (2014). İnsan dokusunda iyon kanalları onkogen listelerindedir (Kv10.1, hERG, Nav1.5) ve gap-junction kaybı kırk yıllık bir gözlemdir; ama connexin etkisi iki yüzlüdür ve klinik biyoelektrik müdahale çalışması yoktur. 'Kimlik dönüşümü veya NDE sonrası remisyon kümesi' iddiası anlatı düzeyindedir: spontan remisyon gerçektir, fakat bu kümelemenin sistematik kanıtı yoktur ve psikososyal müdahaleler sağkalımı uzatmaz (Goodwin 2001). En kritik uyarı: bu çerçeve tedavinin yerine geçmez.",
      en: "In the Xenopus model an oncogene depolarizes the cell; if depolarization is artificially prevented the tumour does not form (Chernet & Levin 2013), and the effect is long-range (2014). In human tissue ion channels sit on oncogene lists (Kv10.1, hERG, Nav1.5) and gap-junction loss is a forty-year-old observation; but the connexin effect is two-faced and there is no clinical bioelectric intervention trial. The claim of remission 'clustering after identity transformation or NDE' is narrative-level: spontaneous remission is real, but there is no systematic evidence for the clustering, and psychosocial interventions do not extend survival (Goodwin 2001). The most critical caution: this frame does not replace treatment."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Onco-bioelectric alienation schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ONKO-BİYOELEKTRİK YABANCILAŞMA (HZ-09): ÇOK KATMANLI AĞ SAPMASI</text>

      <rect x="18" y="38" width="212" height="140" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">MODEL BİYOLOJİSİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Xenopus: onkogen → depolarizasyon</text>
        <text x="30" y="85" fill="var(--warn)">Depolarizasyon engellenirse TÜMÖR OLUŞMAZ</text>
        <text x="30" y="98" fill="var(--muted)">  (Chernet &amp; Levin 2013; 2014)</text>
        <text x="30" y="114">Etki uzun menzilli: serotonin +</text>
        <text x="30" y="127">  bütirat-HDAC yolu önerilir</text>
        <text x="30" y="143">Metastaz benzeri uzak dönüşüm</text>
        <text x="30" y="156" fill="var(--muted)">  (Lobikin 2012; Blackiston 2011)</text>
        <text x="30" y="170" fill="var(--bad)">UYARI: Xenopus ≠ insan kanseri</text>
      </g>

      <rect x="240" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="252" y="54" fill="var(--bad)" font-size="8" font-weight="700">İNSAN DOKUSU (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">İyon kanalları onkogen (insan verisi):</text>
        <text x="252" y="85" fill="var(--muted)">  Kv10.1/EAG1, hERG, Nav1.5</text>
        <text x="252" y="101">Gap-junction kaybı: kırk yıllık gözlem</text>
        <text x="252" y="114">ama connexin İKİ YÜZLÜ: baskılayıcı</text>
        <text x="252" y="127">  da olabilir, metastaz destekçisi de</text>
        <text x="252" y="143">V_mem ölçümü zor; kohort yok; klinik</text>
        <text x="252" y="156" fill="var(--bad)">biyoelektrik modülatör çalışması YOK</text>
      </g>

      <rect x="456" y="38" width="206" height="140" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">ANLATI KATMANI (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">'Kimlik dönüşümü / NDE sonrası</text>
        <text x="468" y="85">  spontan remisyon kümesi': KANIT YOK</text>
        <text x="468" y="101">Kayıt yanlılığı: yalnız çarpıcı vakalar</text>
        <text x="468" y="114">  anlatılır; sessiz çoğunluk görünmez</text>
        <text x="468" y="130">Psikososyal destek: yaşam kalitesi ↑,</text>
        <text x="468" y="143" fill="var(--bad)">  sağkalım etkisi YOK (Goodwin 2001)</text>
        <text x="468" y="159" fill="var(--muted)">Spontan remisyon gerçek: immün/hormonal</text>
      </g>

      <rect x="18" y="188" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="204" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="222" fill="var(--ink)" font-weight="700">P_onkogen ≈ f(M, V, G, İ, K) · fraktal kopuş: junction → hücre → doku → organizma</text>
        <text x="30" y="238" fill="var(--ink)">/1 Xenopus uzun-menzil modeli bağımsız laboratuvarlarda replike edilir; serotonin/bütirat yolu ayrı yöntemlerle sınanır</text>
        <text x="30" y="253" fill="var(--ink)">/2 İnsan organoidi: V_mem haritası + connexin + mutasyon paneli → biyoelektrik imza bağımsız katman mı?</text>
      </g>

      <rect x="18" y="272" width="644" height="68" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="288" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="305" fill="var(--warn)">🟡 model biyolojisi · 🟠 insan translasyonu · 🔴 psikojenik remisyon kümesi</text>
        <text x="30" y="319" fill="var(--bad)">EN KRİTİK UYARI: bu dosya tedavi önermez; tanı sonrası kanıta dayalı tedaviye tam uyum esastır.</text>
        <text x="30" y="333" fill="var(--muted)">Çürütülürse: iyon kanalı onkogenleri ve Xenopus bulguları programdan bağımsız ayakta kalır.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua07": {
    title: {
      tr: "Şekil UA-07.1: Yıldız Saati Penceresi — 13,5 Saat LST Tepesi ve Manyetik Aracı Adayı",
      en: "Figure UA-07.1: The Sidereal-Hour Window — The 13.5 h LST Peak and Its Geomagnetic Mediator Candidate"
    },
    caption: {
      tr: "Arşiv deseni gerçek bir istatistiksel olgudur: 1 468 denemede etki büyüklüğü 13,5 saat yerel yıldız zamanında tepe yapar, 1 015 denemelik bağımsız doğrulama örnekleminde aynı tepe görülür ve toplam 2 879 denemede pencere yaklaşık dört saattir (yıldız gününün yüzde on yedisi). Yıldız zamanı kullanması, sirkadiyen ritim ve çalışma saati açıklamalarını biçimsel olarak dışarıda bırakır. Ancak tepe, temeli tartışmalı bir etkinin üzerinde durur: Milton ve Wiseman 1999 meta-analizinde otuz ganzfeld çalışması şansın üstünde puan üretmedi (z = 0,70; p = 0,24). Pencere veri-güdümlü seçilmiştir; prospektif tek girişim küçük ve güçsüzdür; bağımsız ön kayıtlı replikasyon yoktur. Doğru hüküm: pencere aday, aracı jeomanyetizma, kapı değil; kararı ancak ön kayıtlı deney verir.",
      en: "The archive pattern is a real statistical fact: across 1,468 trials effect size peaks at 13.5 h local sidereal time, an independent 1,015-trial validation sample shows the same peak, and across 2,879 trials the window spans about four hours (seventeen percent of the sidereal day). Its use of sidereal time formally rules out circadian and working-hour confounds. Yet the peak rests on a contested base effect: in the Milton and Wiseman 1999 meta-analysis the thirty ganzfeld studies produced no above-chance scoring (z = 0.70; p = 0.24). The window was selected data-driven; the single prospective attempt was small and underpowered; there is no independent pre-registered replication. The correct verdict: window candidate, mediator geomagnetism, not a gate; only a pre-registered experiment can decide."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Sidereal-hour window schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">YILDIZ SAATİ PENCERESİ (HZ-07): ADAY PENCERE, ADAY ARACI</text>

      <rect x="18" y="38" width="212" height="146" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">ARŞİV DESENİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">1 468 deneme → 13,5 h LST tepesi</text>
        <text x="30" y="85">1 015 denemelik doğrulama: AYNI tepe</text>
        <text x="30" y="98">Toplam 2 879 deneme; pencere ~4 saat</text>
        <text x="30" y="111" fill="var(--muted)">  (yıldız gününün ~%17'si)</text>
        <text x="30" y="127">SİDERAL, sirkadiyen değil: günlük</text>
        <text x="30" y="140">  yaşam döngüsüyle açıklanamaz</text>
        <text x="30" y="156">PEAR uzaktan görü verilerinde</text>
        <text x="30" y="169">  benzer örüntü bildirildi</text>
      </g>

      <rect x="240" y="38" width="206" height="146" rx="8" fill="var(--surface-2)" stroke="var(--orange)"/>
      <text x="252" y="54" fill="var(--orange)" font-size="8" font-weight="700">ARACI ADAYI (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">ap jeomanyetik indeksi korelasyonu</text>
        <text x="252" y="85">  (Spottiswoode 1997a)</text>
        <text x="252" y="101">Güneş rüzgârı parametreleri: ilişki</text>
        <text x="252" y="114">  YALNIZ pencere içinde görünür</text>
        <text x="252" y="130">Model: galaktik kapı değil,</text>
        <text x="252" y="143" font-weight="700">  manyetosferik yönelim dilimi</text>
        <text x="252" y="159" fill="var(--muted)">Manyetizma–fizyoloji: melatonin ve</text>
        <text x="252" y="172" fill="var(--muted)">  otonomik ton ilişkileri küçük ama gerçek</text>
      </g>

      <rect x="456" y="38" width="206" height="146" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">KARŞI KANIT ZİNCİRİ</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72" fill="var(--bad)">Temel etki tartışmalı: Milton &amp; Wiseman</text>
        <text x="468" y="85" fill="var(--bad)">  1999 → z = 0,70; p = 0,24 (30 çalışma)</text>
        <text x="468" y="101">Pencere VERİ-GÜDÜMLÜ seçildi</text>
        <text x="468" y="114">Prospektif telefon-telepati girişimi:</text>
        <text x="468" y="127">  zayıf destek, küçük örneklem</text>
        <text x="468" y="143" fill="var(--bad)">Ön kayıtlı yüksek güçlü replikasyon YOK</text>
        <text x="468" y="159" fill="var(--muted)">24 saatlik çemberde tepe aramak kolay;</text>
        <text x="468" y="172" fill="var(--muted)">  kanıt, testin önceden yazılmasıyla doğar</text>
      </g>

      <rect x="18" y="194" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="210" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="228" fill="var(--ink)" font-weight="700">E(LST) ≈ E_0 × [1 + W(LST; 13,5 h, σ ≈ 2 h)] × (1 + β·M_ap) · β = 0 ise pencere istatistiksel artefakt</text>
        <text x="30" y="244" fill="var(--ink)">/1 Ön kayıtlı ganzfeld: tepe (13,5 ± 2 h) ve kontrol (01,5 ± 2 h) kolları, güç ≥ 0,9 → anomali canlı mı, ölü mü?</text>
        <text x="30" y="259" fill="var(--ink)">/2 Aracı sınavı: pencere içi etki ↔ ap / güneş rüzgârı kademelenmesi; pencere dışı negatif kontrol</text>
      </g>

      <rect x="18" y="278" width="644" height="62" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="294" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="311" fill="var(--warn)">🟡 arşiv deseni (iki örneklem) · 🟠 prospektif kanıt (zayıf, temel etki tartışmalı) · 🔴 galaktik kapı mekanizması</text>
        <text x="30" y="326" fill="var(--muted)">Çürütülürse: LST tepesi arşiv yanılsamasına iner; geriye kanıt hijyeni dersi ve jeomanyetizma–fizyoloji hattı kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua10": {
    title: {
      tr: "Şekil UA-10.1: İniş Mitleri — Devre Şeması Değil, Nöro-Fenomenolojik Dikiş",
      en: "Figure UA-10.1: Descent Myths — Not a Circuit Diagram but a Neuro-Phenomenological Stitch"
    },
    caption: {
      tr: "İniş anlatıları birçok kültürde benzer bir iskelete oturur: çağrı ve eşik, iniş ve kapılar, yargı ve ölüm, dönüş ve hediye. İnanna yedi kapıda nişanlarını bırakır; Osiris parçalanıp yeniden bütünleşir; Orpheus yasağı çiğner; Popol Vuh ikizleri Xibalba'nın ölüm testlerini aşar. Benzerlik gerçektir, fakat Campbell hattı folklorist eleştiride seçici bulundu: Dundes 2005 tür karışımını, örnek seçiciliğini ve nicel testin yokluğunu gösterir; ATU indeksi benzerlikleri olasılıksal sınıflar; filogenetik analizler yayılımı gösterir, evrensel iskeleti değil. En verimli okuma: mit, ortak bedensel durum geçişlerinin (hipnagoji, uyku felci, NDE, ego çözülmesi) hikâye dikişleridir — ölçülebilir fenomenoloji gerçek, devre şeması iddiası değil.",
      en: "In many cultures descent narratives settle onto a similar skeleton: call and threshold, descent and gates, judgement and death, return and gift. Inanna leaves her ornaments at seven gates; Osiris is dismembered and reintegrated; Orpheus breaks the taboo; the Popol Vuh twins survive Xibalba's death tests. The similarity is real, but folklore criticism found the Campbell line selective: Dundes 2005 points to genre mixing, example selection and the absence of quantitative testing; the ATU index classifies similarities probabilistically; phylogenetic analyses show diffusion, not a universal skeleton. The most productive reading: myth is narrative stitching over shared bodily state transitions (hypnagogia, sleep paralysis, NDE, ego dissolution) — the measurable phenomenology is real; the circuit-diagram claim is not."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Descent myth neuro-topology schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">İNİŞ MİTLERİ (HZ-10): ORTAK DENEYİM, ORTAK İSKELET</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--accent)"/>
      <text x="30" y="54" fill="var(--accent)" font-size="8" font-weight="700">DÖRT AŞAMALI İSKELET</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">1 · Çağrı ve eşik</text>
        <text x="30" y="88">2 · İniş ve kapılar / geçişler</text>
        <text x="30" y="104">3 · Yargı ve ölüm</text>
        <text x="30" y="120">4 · Dönüş ve hediye (ya da yarım dönüş)</text>
        <text x="30" y="140" fill="var(--muted)">İnanna: yedi kapı · Osiris: parçalanma</text>
        <text x="30" y="153" fill="var(--muted)">Orpheus: yasak · Popol Vuh: Xibalba</text>
        <text x="30" y="170" fill="var(--muted)">Benzerlik gerçek; kaynağı tartışmalı</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">YAPISAL HAT vs ELEŞTİRİ</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Propp 1928: 31 işlev, 196 masal</text>
        <text x="252" y="85">Campbell 1949: monomit (ayrılma–</text>
        <text x="252" y="98">  inisiyasyon–dönüş) · Eliade: ölüm/yenidoğuş</text>
        <text x="252" y="116" fill="var(--bad)">Dundes 2005: tür karışımı, seçici örnek,</text>
        <text x="252" y="129" fill="var(--bad)">  nicel doğrulama YOK</text>
        <text x="252" y="145">ATU: olasılıksal benzerlik · filogeni</text>
        <text x="252" y="158">  (Tehrani 2013): yayılım, evrensellik değil</text>
        <text x="252" y="176" fill="var(--muted)">Difüzyon alternatifi çoğu benzerliğe yeter</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="468" y="54" fill="var(--ok)" font-size="8" font-weight="700">NÖRO-FENOMENOLOJİ (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Hipnagoji: eşik ve kapı imgelemi</text>
        <text x="468" y="85">Uyku felci: basınç ve varlık hissi</text>
        <text x="468" y="98">NDE: tünel, ışık, yaşam gözden geçirmesi,</text>
        <text x="468" y="111">  geri dönüş kararı (Greyson ölçekleri)</text>
        <text x="468" y="127">DMN çözülmesi: ego sınırı geçirgenleşir</text>
        <text x="468" y="140">Vestibüler: düşme, aşağı çekilme hissi</text>
        <text x="468" y="158" fill="var(--muted)">Ortak kaynak havuzu: bilincin çözülme</text>
        <text x="468" y="171" fill="var(--muted)">  ve yeniden kurulma anları</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">M_örüntü ≈ Σ (F_deneyim × D_dikiş) · dikiş dilde yoğunlaşır, çekirdek sırada değil</text>
        <text x="30" y="248" fill="var(--ink)">/1 Kör yapısal kodlama + shuffle taban çizgisi: aşamaların SIRASI rastgele permütasyonlardan iyi mi?</text>
        <text x="30" y="263" fill="var(--ink)">/2 Fenomenolojik örtüşme: 500+ NDE ve 500+ hipnagoji raporunda geçit/dönüş işaretleri fazla mı temsil ediliyor?</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟢 fenomenoloji · 🟡 motif yaygınlığı (sınıflama-bağımlı) · 🟠 dört aşama iddiası · 🔴 mit = nöral devre şeması</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: iskelet folklorist eleştiriye devredilir; nöro-fenomenolojik ortak-kaynak havuzu ve klinik değeri kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua22": {
    title: {
      tr: "Şekil UA-22.1: Sessiz Manyetik İmza — Kalıntı Kanal, Pusula Değil",
      en: "Figure UA-22.1: The Silent Magnetic Signature — A Vestigial Channel, Not a Compass"
    },
    caption: {
      tr: "Wang ve arkadaşları 2019'da Faraday kafesli ve karanlık bir odada Dünya şiddetinde alan döndürmeleri uyguladı: bazı katılımcılarda alfa gücünde ortalama yüzde yirmi beşe varan düşüş görüldü, yanıt yön seçiciydi, yalnız aşağı bakan dikey bileşenle çıktı ve katılımcılar alanı fark etmedi. Bulgu iyi kontrollü ama tek laboratuvarlıdır, yanıt verenler bir azınlıktır ve bağımsız replikasyon başlangıç düzeyindedir. Mekanizma adayları gerçektir: beyinde biyojenik manyetit vardır fakat tork kapılı kanal hiçbir türde tanımlanmamıştır; kriptokrom-4 kuşlarda kanıtlıdır, insanda gösterilmemiştir. Epifiz bu kanalın merkezi değildir: parietal göz sürüngenlerde ışığa duyarlıdır, memelide epifiz endokrin organdır ve kalcit kristalleri gerçek olsa da manyetik işlevleri ölçülmemiştir.",
      en: "In 2019 Wang and colleagues applied Earth-strength field rotations inside a dark Faraday cage: some participants showed up to an average twenty-five percent drop in alpha power, the response was direction-selective, appeared only with a downward vertical component, and participants did not notice the field. The finding is well controlled but single-laboratory, responders are a minority, and independent replication is at an early stage. The mechanism candidates are real: the brain contains biogenic magnetite, yet no torque-gated channel is defined in any species; cryptochrome 4 is proven in birds, undemonstrated in humans. The pineal is not the channel's centre: the parietal eye is light-sensitive in reptiles, the mammalian pineal is an endocrine organ, and although calcite crystals are real their magnetic function has never been measured."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Silent magnetic signature schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">SESSİZ MANYETİK İMZA (HZ-22): KALINTI KANAL, PUSULA DEĞİL</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">İNSAN EEG BULGUSU (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Faraday kafesi + karanlık + Dünya</text>
        <text x="30" y="85">  şiddetinde alan döndürmesi (Wang 2019)</text>
        <text x="30" y="101">Alfa sönümlenmesi: ortalama ~%25</text>
        <text x="30" y="114">Yön seçici: yalnız aşağı dikey bileşenle</text>
        <text x="30" y="127">Yanıtlılar bir AZINLIK; birey farkı güçlü</text>
        <text x="30" y="143">Bilinçsiz: katılımcı alanı fark etmiyor</text>
        <text x="30" y="159" fill="var(--bad)">Tek laboratuvar; bağımsız replikasyon sınırlı</text>
        <text x="30" y="175" fill="var(--muted)">Davranışsal pusula yeteneği: YOK</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--orange)"/>
      <text x="252" y="54" fill="var(--orange)" font-size="8" font-weight="700">MEKANİZMA ADAYLARI (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Biyojenik manyetit beyinde VAR</text>
        <text x="252" y="85" fill="var(--bad)">  Tork kapılı iyon kanalı: hiçbir türde tanımlı değil</text>
        <text x="252" y="103">Kriptokrom-4: göçmen kuşta kanıtlı (Xu 2021)</text>
        <text x="252" y="116">  İnsan retinasında var, çalıştığı GÖSTERİLMEDİ</text>
        <text x="252" y="134">İki aday hat: optik sinir (ışığa bağımlı) ve</text>
        <text x="252" y="147">  trigeminal / vestibüler (ışıktan bağımsız)</text>
        <text x="252" y="165" fill="var(--muted)">Hangi hattın çalıştığı bilinmiyor</text>
        <text x="252" y="181" fill="var(--muted)">Sağlam manyetobiyoloji: bakteri, kuş, kaplumbağa</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">EPİFİZ (🔴 İDDİA / GERÇEK)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Gerçek: parietal göz sürüngende ışığa duyarlı</text>
        <text x="468" y="85">Gerçek: insan epifizi endokrin organdır</text>
        <text x="468" y="98">  (melatonin; retina → SCN → epifiz zinciri)</text>
        <text x="468" y="114">Gerçek: kalcit mikrokristalleri tanımlı</text>
        <text x="468" y="127">  (Baconnier 2002; piezo önerisi Lang 1996)</text>
        <text x="468" y="145" fill="var(--bad)">Kanıtsız: epifiz = manyetik alıcı; kalsifikasyon</text>
        <text x="468" y="158" fill="var(--bad)">  = işlevsel sensör; pineal aktivasyon cihazı</text>
        <text x="468" y="176" fill="var(--muted)">Kristalin varlığı, işlevin kanıtı değildir</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">R_insan ≈ R_manyetit × S_sessiz + R_kriptokrom × L_ışık · her iki terimin kazancı düşük</text>
        <text x="30" y="248" fill="var(--ink)">/1 Çok merkezli ön kayıtlı EEG: ≥3 laboratuvar, n ≥ 100 → yanıt bir alt grupta tutarlı mı?</text>
        <text x="30" y="263" fill="var(--ink)">/2 Dissosiasyon: karanlık / ışıklı / vestibüler yüklü / sham → hangi hat çalışıyor? /3 Pineal içerik ↔ EEG: korelasyon beklenmez</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟡 sessiz EEG yanıtı (tek lab) · 🟠 mekanizma adayları · 🔴 epifiz-manyetik alıcı ve piezo iddiaları</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: kalıntı kanal cümlesi tek-lab artefaktına iner; kuş/bakteri manyetobiyolojisi ve TMS teknolojisi kalır.</text>
      </g>
    </svg>`
  }
,
  "horizon-ua26": {
    title: {
      tr: "Şekil UA-26.1: Üç Rakip Model — Ayna Devresi, Kanal, Morfik Alan",
      en: "Figure UA-26.1: Three Rival Models — Mirror Circuit, Channel, Morphic Field"
    },
    caption: {
      tr: "Duygu bulaşıcılığı ve mimikri gerçek ve ölçülmüştür; ama taşıyıcıları ayna devresi değil, ortak sinyal ve öğrenmedir. Ayna nöron kuramı kanıt düzeyinde çöktü: varsayım maymunlarda hiç doğrudan test edilmedi (Hickok 2009), maymun ayna nöronları pandomime yanıt vermez, insanda varlığı tartışmalıdır ve standart ölçüsü olan mu supresyonu geçerli bir indeks değildir (Hobson ve Bishop 2017). Kanal modeli ise ölçülmüştür: konuşucu-dinleyici nöral kuplajı anlamayı öngörür (Stephens ve ark. 2010) ve iki beyin çevreden geçen bir sinyalle kuplajlanır (Hasson ve ark. 2012). Morfik alan iddiası (bakılma hissi yüzde elli üç ile altmış arası) bağımsız replikasyonda çıkmadı (Lobach ve Bierman 2004) ve yanlışlanabilir bir öngörü üretmez (Shermer 2005).",
      en: "Emotional contagion and mimicry are real and measured; but their carriers are not a mirror circuit — they are a shared signal and learning. The mirror-neuron theory has collapsed at the level of evidence: the assumption was never directly tested in monkeys (Hickok 2009), monkey mirror neurons do not respond to pantomime, their existence in humans is contested, and their standard measure, mu suppression, is not a valid index (Hobson and Bishop 2017). The channel model, by contrast, is measured: speaker-listener neural coupling predicts comprehension (Stephens et al. 2010) and two brains are coupled by a signal transmitted through the environment (Hasson et al. 2012). The morphic-field claim (staring detection between fifty-three and sixty percent) did not appear in independent replication (Lobach and Bierman 2004) and yields no falsifiable prediction (Shermer 2005)."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Three rival models of shared mind schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">PAYLAŞILAN ZİHİN (HZ-26): ÜÇ RAKİP MODEL, TEK KANAL</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="30" y="54" fill="var(--bad)" font-size="8" font-weight="700">A) AYNA MODELİ (🟠 ÇÖKTÜ)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Maymunlarda eylem-anlama varsayımı</text>
        <text x="30" y="85">  hiç doğrudan test EDİLMEDİ (Hickok 2009)</text>
        <text x="30" y="101">Ayna nöronlar pandomime yanıt vermez</text>
        <text x="30" y="114">İnsanda varlığı tartışmalı (Dinstein 2008)</text>
        <text x="30" y="130" fill="var(--bad)">Mu supresyonu geçerli ölçü değil:</text>
        <text x="30" y="143" fill="var(--bad)">  güçsüz, bant kayması, dikkat karışması</text>
        <text x="30" y="159" fill="var(--muted)">Heyes &amp; Catmur 2022: ayna = öğrenme ürünü</text>
        <text x="30" y="175" fill="var(--muted)">Hücreler var; "her şeyi açıklar" çöktü</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="252" y="54" fill="var(--ok)" font-size="8" font-weight="700">B) KANAL MODELİ (🟢/🟡 ÖLÇÜLDÜ)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Mimikri otomatik (Dimberg 1990)</text>
        <text x="252" y="85">Duygu bulaşıcılığı: laboratuvarda gerçek</text>
        <text x="252" y="101">Stephens 2010: konuşucu-dinleyici kuplajı</text>
        <text x="252" y="114">  anlama başarısını ÖNGÖRÜR</text>
        <text x="252" y="130">Bazı dinleyici tepkileri konuşucudan ÖNCE</text>
        <text x="252" y="143">  → öngörücü ortak kod</text>
        <text x="252" y="159">Hasson 2012: kuplaj çevreden sinyalle kurulur</text>
        <text x="252" y="175" fill="var(--muted)">Senkron yürüyüş işbirliğini artırır (2009)</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">C) MORFİK ALAN (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">İddia: bakılma hissi %53-60 (şans %50)</text>
        <text x="468" y="85" fill="var(--bad)">Lobach &amp; Bierman 2004: replike EDİLEMEDİ</text>
        <text x="468" y="101" fill="var(--bad)">  "kolayca replike edilir bir paradigma değil"</text>
        <text x="468" y="117">Diziler rastgele değil (Marks &amp; Colwell 2000)</text>
        <text x="468" y="133">Jaytee: aynı veri, zıt okumalar — kayıt yok</text>
        <text x="468" y="149">Shermer 2005: yanlışlanamaz çerçeve</text>
        <text x="468" y="165" fill="var(--muted)">Jung arşivi: kültürel malzeme, veri tabanı değil</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">Z_paylaşım ≈ K_ortakkod × T_kanal × G_geçmiş · kanal sıfırlanınca paylaşım şansa iner</text>
        <text x="30" y="248" fill="var(--ink)">/1 Kanal kesme: tam kanal / tek yönlü metin / hiç kanal → alan modeli (c) kolunda da şans üstü bekler</text>
        <text x="30" y="263" fill="var(--ink)">/2 Permüte eşleşme: gerçek çiftler uç değer mi? /3 Bakılma: gerçek rastgele dizi + ısı kontrolü</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟢 bulaşıcılık/mimikri · 🟡 beyinler arası kuplaj · 🟠 ayna kuramı (işlev iddiası çöktü) · 🔴 morfik rezonans</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: kanal modeli sarsılır; empati eğitimi ve senkron çalışma kendi ölçütleriyle ayakta kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua27": {
    title: {
      tr: "Şekil UA-27.1: Havuz Değil, Ayarlı Alıcı — Ganzfeld, Rüya, İkiz",
      en: "Figure UA-27.1: Not a Pool but a Tuned Receiver — Ganzfeld, Dream, Twins"
    },
    caption: {
      tr: "Kırk yılı aşan ganzfeld arşivinde etki, veri-tabanı kurallarına göre 0,013 ile 0,13 arasında değişir; alanın kendi kayıtlı raporu 0,08 düzeyinde bir etki bildirir ve hakemlikte iki onay, bir onay-dışı oyu alır. Alanın gürültü azaltma modeli son on yılda doğrulanmadı. Prospektif sınav açık ara kaybedildi: Bem 2011'in açık materyalli dokuz deneyi (d = 0,22), N = 3 289 kişilik yedi denemede d = 0,04'e indi; dergi 'yalnız replikasyon' yayımlamayı reddetti. Rüya laboratuvarının anlamlı sonuçları körlük hataları içeriyordu ve bağımsız laboratuvarlarda çıkmadı. İkizlerde bildirim oranı yüksek (beşte bir), kontrollü performans şans düzeyinde; ayrı büyümüş tek yumurta ikizlerinin benzerliği genetikle açıklanıyor.",
      en: "In the ganzfeld archive spanning more than forty years the effect ranges from 0.013 to 0.13 depending on database-construction rules; the field's own registered report reports an effect around 0.08 and receives two approvals and one non-approval in review. The field's noise-reduction model was not confirmed over the last decade. The prospective exam was lost decisively: Bem's nine open-material experiments (d = 0.22) fell to d = 0.04 in seven experiments with N = 3,289; the journal refused to publish 'mere replications'. The dream laboratory's significant results contained blindness failures and did not appear in independent laboratories. In twins, report rates are high (one in five), controlled performance is at chance; the similarity of monozygotic twins raised apart is explained by genetics."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Tuned receiver schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ZİHİN-ZİHİN HAVUZU (HZ-27): HAVUZ DEĞİL, AYARLI ALICI</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">ARŞİV (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">1974-2020: etki 0,018-0,133 arası değişir</text>
        <text x="30" y="85">Kayıtlı rapor: ~0,08 (%95 CI 0,04-0,12)</text>
        <text x="30" y="98" fill="var(--muted)">  hakemlik: 2 onay, 1 onay-dışı</text>
        <text x="30" y="114">Milton &amp; Wiseman 1999: 30 çalışma, 0,013</text>
        <text x="30" y="127">  → anlamsız (z = 0,70; p = 0,24)</text>
        <text x="30" y="143" fill="var(--bad)">Gürültü azaltma modeli on yılda DOĞRULANMADI</text>
        <text x="30" y="156" fill="var(--muted)">Autoganzfeld isabet %32,2 · şans %25</text>
        <text x="30" y="172" fill="var(--muted)">Etki, veri-tabanı kurallarına bağlı</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="252" y="54" fill="var(--bad)" font-size="8" font-weight="700">PROSPEKTİF SINAV (🟠 KAYBEDİLDİ)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Bem 2011: 9 deney, 8 anlamlı, d = 0,22</text>
        <text x="252" y="85">Galak 2012: 7 deney, N = 3 289, d = 0,04</text>
        <text x="252" y="98" fill="var(--bad)">  → sıfırdan farksız; etki replike EDİLEMEDİ</text>
        <text x="252" y="114">JPSP: "yalnız replikasyon" yayımlamayı reddetti</text>
        <text x="252" y="130">Rüya laboratuvarı: Maimonides anlamlı ama</text>
        <text x="252" y="143" fill="var(--bad)">  körlük hatası (Hansel); bağımsız testler NEGATİF</text>
        <text x="252" y="159" fill="var(--muted)">Watt-Wiseman: "tam bir başarısızlık"</text>
        <text x="252" y="175" fill="var(--muted)">Alcock: "veri aşırı dağınık, replikasyon yok"</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="468" y="54" fill="var(--ok)" font-size="8" font-weight="700">İKİZ ÇALIŞMALARI (ANLATI/ŞANS)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Bildirim: MZ beşte bir · DZ onda bir</text>
        <text x="468" y="85" fill="var(--muted)">  → bildirim oranı, performans değil</text>
        <text x="468" y="101">Blackmore 1993: benzer düşünme örüntüsü</text>
        <text x="468" y="114">Eaves &amp; Last: partner tahmini şans düzeyi</text>
        <text x="468" y="130">Hedefi deneyci seçince isabet şansa indi</text>
        <text x="468" y="146">Bouchard 1990: ayrı büyüyen MZ benzer</text>
        <text x="468" y="159" fill="var(--muted)">  → ortak kalıtım, ortak çıktı</text>
        <text x="468" y="175" fill="var(--muted)">TV deneyleri: anlatı, kanıt değil</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">d_gözlem ≈ (K_çift × S_durum × L_deneyci) − B_yanlılık · laboratuvar terimi örnekleme hatasından büyük mü?</text>
        <text x="30" y="248" fill="var(--ink)">/1 Hasım-işbirliği: 4 laboratuvar, ortak ön kayıtlı protokol, inanan + şüpheci deneyci, ≥ 2 000 deneme</text>
        <text x="30" y="263" fill="var(--ink)">/2 Ajansız kol (insan gönderici yok) · /3 Yayımlanmış protokollerin birebir replikasyonu</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟡 arşiv sapması (on yıllara yayılmış, küçük) · 🟠 prospektif replikasyon (başarısız) · 🔴 mekanizma (taşıyıcı yok)</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: meta-bilim mirası, REM uyandırma metodolojisi ve davranış genetiği kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua28": {
    title: {
      tr: "Şekil UA-28.1: Kalite Gradyanı — Etki Tasarım Güçlendikçe Erir",
      en: "Figure UA-28.1: The Quality Gradient — The Effect Melts as Design Strengthens"
    },
    caption: {
      tr: "PEAR'ın on iki yıllık programı 2,5 milyon denemede 3,8 sigma üretti; ama iki uç katılımcı verinin yaklaşık dörtte birini oluşturuyordu ve üç laboratuvarlı bağımsız replikasyon anlamsız çıktı. Bösch meta-analizi 380 çalışmada küçük bir etki buldu, fakat etki örneklem büyüklüğüyle ters ilişkiliydi ve Monte Carlo simülasyonu aynı örüntüyü yayın yanlılığıyla üretebildi. Terapötik dokunmada 21 deneyimli uygulayıcı yüzde kırk dört isabetle şansın altında kaldı; ısı bloke edildiğinde isabet şansa döndü. Şefaat duası meta-analizinde etki 0,100'den 0,012'ye indi ve STEP'in 1 802 hastalık denemesinde dua etkisiz kaldı; bilen grupta komplikasyon oranı daha yüksekti. Ölçülen tek tutarlı büyüklük beklentidir ve işareti olumlu olmak zorunda değildir.",
      en: "PEAR's twelve-year programme produced 3.8 sigma across 2.5 million trials; but two extreme participants accounted for about a quarter of the data, and the independent three-laboratory replication was non-significant. The Bösch meta-analysis found a small effect across 380 studies, yet the effect was inversely related to sample size and a Monte Carlo simulation could reproduce the same pattern through publication bias. In therapeutic touch, twenty-one experienced practitioners scored forty-four percent — below chance; when heat was blocked, accuracy returned to chance. In the intercessory-prayer meta-analysis the effect dropped from 0.100 to 0.012, and in STEP's 1,802-patient trial prayer had no effect; the group that knew had a higher complication rate. The only measure that behaves consistently is expectancy — and its sign need not be positive."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Quality gradient schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">ZİHİN-MADDE HAVUZU (HZ-28): KALİTE GRADYANI</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">REG ARŞİVİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">PEAR 12 yıl: 2,5 milyon deneme, 3,8σ</text>
        <text x="30" y="85" fill="var(--bad)">İki uç denek: z = 5,6 ve 3,4 → verinin ~1/4ü</text>
        <text x="30" y="101" fill="var(--bad)">3 lab replikasyon: 750 000/kondisyon → NEGATİF</text>
        <text x="30" y="117">Bösch 380 çalışma: küçük etki; örneklemle ters</text>
        <text x="30" y="130">Monte Carlo: yayın yanlılığı örüntüyü üretebilir</text>
        <text x="30" y="146">Alan içi itiraz: kodlama/seçim hataları iddiası</text>
        <text x="30" y="162" fill="var(--muted)">Ölçek büyüdükçe etki küçüldü; PEAR 2007'de kapandı</text>
        <text x="30" y="178" fill="var(--muted)">İstatistiksel olarak ilginç, pratik olarak faydasız</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="252" y="54" fill="var(--bad)" font-size="8" font-weight="700">ŞİFA VE TERAPÖTİK DOKUNMA (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Rosa 1998: 21 deneyimli uygulayıcı, %44 isabet</text>
        <text x="252" y="85" fill="var(--bad)">  şans %50 → temel iddia desteklenmedi</text>
        <text x="252" y="101">Isı bloğu: isabet şansa döndü (ipucu ısıydı)</text>
        <text x="252" y="117">Astin 2000: 23 deneme, %57 pozitif — ama zayıf</text>
        <text x="252" y="130">  körlük, heterojenlik, ölçüt seçimi serbest</text>
        <text x="252" y="146">Uygulayıcı "enerji" değil sıcaklık algılıyor</text>
        <text x="252" y="162" fill="var(--muted)">Dokunma ve ilgi, ilişki adına yararlıdır;</text>
        <text x="252" y="175" fill="var(--muted)">"alan" adına değil</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">ŞEFAAT DUASI (🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Masters 2006: 14 çalışma, g = 0,100 (farksız)</text>
        <text x="468" y="85">Tek tartışmalı çalışma çıkınca g = 0,012</text>
        <text x="468" y="101">Cochrane: ölüm üzerine etki yok (OR 1,11 ns)</text>
        <text x="468" y="117">STEP: 1 802 hasta, 3 kol, 6 hastane</text>
        <text x="468" y="130" fill="var(--bad)">Duanın kendisi: komplikasyonsuz iyileşmeye etki YOK</text>
        <text x="468" y="146" fill="var(--bad)">Bilen grup: %59 komplikasyon (şans olabilir)</text>
        <text x="468" y="162" fill="var(--muted)">Ölçülen tek etki: beklenti — ve negatif yönde</text>
        <text x="468" y="178" fill="var(--muted)">Bu, plasebo/nocebo bilimidir (UA-13)</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">Δ_gözlem ≈ (Σ_operatör × N_niyet × E_beklenti) / (1 + Q_tasarım) − B_yanlılık</text>
        <text x="30" y="248" fill="var(--ink)">/1 Hasım-laboratuvar REG: 2 inanan + 2 şüpheci lab, birincil çıktı dondurulmuş, ≥ 3 milyon deneme</text>
        <text x="30" y="263" fill="var(--ink)">/2 Deneyci permütasyonu · /3 Üçlü kör şifa: objektif çıktıda etki beklenmez</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--bad)" font-weight="700">EN KRİTİK UYARI: şifa ve dua uygulamaları kanıta dayalı tedavinin yerine konulamaz.</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse ne kalır: plasebo bilimi, körlük ve ön kayıt metodolojisi, bakım etiği, istatistiksel okuryazarlık.</text>
      </g>
    </svg>`
  },
  "horizon-ua20": {
    title: {
      tr: "Şekil UA-20.1: Serbest Bırakma Eşiği — Fasya Kurmaz, Fazlalık Boşalır",
      en: "Figure UA-20.1: The Release Threshold — Fascia Does Not Create, Excess Discharges"
    },
    caption: {
      tr: "Fasya yoğun duyu siniri taşır ve miyofibroblastları kasılır; ama 0,02 N/cm² kuvvet, kasın on binde biri düzeyindedir ve insan kanıtı sınırlıdır (ort. n on beş, düşük kalite). Spontan hareketler (kriya) gerçektir ve yaygın raporlanır; mekanizması otonomik uyarılma fazlalığı, solunum alkalozu, dikkatin çekilmesi ve beklenti karışımıdır; fonksiyonel hareket bozukluğu gerçek bir nörolojik durumdur, temaruz değildir. Kolektif yayılımın (1518 dans vebası, Le Roy 2011, TikTok tikleri) kanıtlanmış ve sıradan açıklaması kitle psikojenisidir: görsel maruziyet dozu yayılımı öngörür. Formül fasyayı değil fazlalığı, denetimi ve sosyal izni içerir.",
      en: "The fascia carries dense sensory innervation and its myofibroblasts do contract; but at 0.02 N/cm² the force is about one ten-thousandth of muscle force, and human evidence is limited (mean n fifteen, low quality). Spontaneous movements (kriyas) are real and widely reported; their mechanism is a mixture of autonomic arousal excess, respiratory alkalosis, attentional withdrawal and expectancy; functional movement disorder is a genuine neurological condition, not malingering. Collective spread (the 1518 dancing plague, Le Roy 2011, TikTok tics) has a proven and ordinary explanation: mass psychogenic illness — visual exposure dose predicts spread. The formula contains not fascia but excess, control and social permission."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Release threshold schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">FASYA VE SPONTAN HAREKET (HZ-20): SERBEST BIRAKMA EŞİĞİ</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="30" y="54" fill="var(--ok)" font-size="8" font-weight="700">A) FASYA: DUYU AĞI (🟢 ÖLÇÜLDÜ)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Yoğun mekanoreseptör: Ruffini, Pacini,</text>
        <text x="30" y="85">  tip III/IV interstisyel reseptörler</text>
        <text x="30" y="101">Miyofibroblast kasılması: 0,02 N/cm²</text>
        <text x="30" y="114">  kastan ~10 000 kat zayıf, dakikalar sürer</text>
        <text x="30" y="130">Hayvan modeli: kuvvetin %30'una kadar</text>
        <text x="30" y="146" fill="var(--muted)">İnsan kanıtı sınırlı; "Anatomy Trains":</text>
        <text x="30" y="159" fill="var(--muted)">tanımlayıcı model, doğrulanmış yol değil</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">B) SPONTAN HAREKET (🟡 FENOMEN)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Kriya: seğirme, sallanma, sarsılma</text>
        <text x="252" y="85">Nefes alkalozu: CO₂ düşer → tetani, spazm</text>
        <text x="252" y="101">Hipnagojik sarsılma: sınır uzun açık kalır</text>
        <text x="252" y="117">FND gerçek: temaruz değil, tedavisi var</text>
        <text x="252" y="133">Kundalini sendromu: indeks sınıflar, ölçmez</text>
        <text x="252" y="149" fill="var(--muted)">İstem dışılık + ısı + derin rahatlama</text>
        <text x="252" y="162" fill="var(--muted)">→ "içimden aktı" tarifini zorunlu kılar</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="468" y="54" fill="var(--warn)" font-size="8" font-weight="700">C) KOLEKTİF YAYILIM (🟠)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">1518 Strasbourg: 50-400 kişi (Waller)</text>
        <text x="468" y="85">Kıtlık + veba korkusu + St Vitus inancı</text>
        <text x="468" y="101">Ergot tezi elendi: semptom deseni uymuyor</text>
        <text x="468" y="117">Le Roy 2011: konversiyon + sosyal medya</text>
        <text x="468" y="133">TikTok tikleri: görsel maruziyet dozu</text>
        <text x="468" y="149" fill="var(--muted)">Yayılım görsel kanalla: "alan" gerekmez</text>
        <text x="468" y="162" fill="var(--muted)">Kanal kesme mantığı (HZ-26) ile aynı sınav</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">H_kriya ≈ (A_uyarılma − K_denetim) × (1 − D_izleme) × S_sosyal · fasya katkı verir, hareketi kurmaz</text>
        <text x="30" y="248" fill="var(--ink)">/1 Retreat, üç kol: serbest bırakma / bastırma / normokapni klampi → EMG + kapnografi</text>
        <text x="30" y="263" fill="var(--ink)">/2 Fasya-özgüllük: gerçek vs şam miyofasyal manipülasyon → kriya oranı değişmemeli</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟢 fasya inervasyonu/mekanoresepsiyon · 🟡 kriya fenomenolojisi · 🟠 kitle psikojenisi modeli · 🔴 "enerji kanalı" iddiası</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: fasya duyu organı ve FND kliniği kalır; "enerji" anlatısı ilk ciddi deneysel sınavını kaybeder.</text>
      </g>
    </svg>`
  },
  "horizon-ua32": {
    title: {
      tr: "Şekil UA-32.1: Akış Hali — Denetim Kaybolmaz, Yer Değiştirir",
      en: "Figure UA-32.1: Flow — Control Does Not Vanish, It Relocates"
    },
    caption: {
      tr: "Hipofrontalite kanıtı karışıktır: caz doğaçlamasında dorsolateral prefrontal bölge düşerken (Limb ve Braun 2008), akış indüksiyonunda medial prefrontal ve amigdala düşer ama inferior frontal girus ve putamen yükselir (Ulrich ve ark. 2014); küresel bir ön beyin kapanması desteklenmez. Sağlam çekirdek deneyseldir: içsel izleme uzmanı bozar, çift görev ve dış odak korur, sessiz göz süresi performansı öngörür ve eğitilebilir. Öz-kaybı raporda tutarlıdır; zaman sıkışması ise çoğunlukla geçmişe dönük ölçülmüştür ve ölçüm yöntemine duyarlıdır. Formül, denetimin dışa devrini tanımlar: akış, bilinçsizlik değil, düşük öz-referanslı bir dikkat mimarisidir.",
      en: "The hypofrontality evidence is mixed: dorsolateral prefrontal activity drops during jazz improvisation (Limb and Braun 2008), while in induced flow medial prefrontal cortex and amygdala drop but inferior frontal gyrus and putamen rise (Ulrich et al. 2014); a global prefrontal shutdown is not supported. The solid core is experimental: internal monitoring breaks experts, dual task and external focus protect them, quiet-eye duration predicts performance and is trainable. Self-loss is consistent in reports; time compression, however, is mostly measured retrospectively and is sensitive to method. The formula describes the outward delegation of control: flow is not unconsciousness but a low self-referential attention architecture."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Self-vector alignment schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">AKIŞ HALİ (HZ-32): ÖZ-VEKTÖR HİZALANMASI</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="54" fill="var(--warn)" font-size="8" font-weight="700">A) "HİPOFRONTALİTE" (🟠 KARIŞIK)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Dietrich 2003/2004: geçici düşüş hipotezi</text>
        <text x="30" y="85">Limb &amp; Braun 2008: 6 cazcı — DL-PFC ↓</text>
        <text x="30" y="101">Ulrich 2014: mPFC + amigdala ↓ AMA</text>
        <text x="30" y="114">  IFG + putamen + insula ↑</text>
        <text x="30" y="130">Göreve bağlı: bazı çalışmalarda PFC ↑</text>
        <text x="30" y="146" fill="var(--muted)">n = 6-30; laboratuvar indüksiyonu zayıf</text>
        <text x="30" y="159" fill="var(--muted)">Doğru okuma: öz-izleme kısılır, dikkat açık</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="252" y="54" fill="var(--ok)" font-size="8" font-weight="700">B) SAĞLAM ÇEKİRDEK (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Beilock &amp; Carr 2001: içsel izleme → çöküş</text>
        <text x="252" y="85">Çift görev (dikkat dağıtma) performansı korur</text>
        <text x="252" y="101">Beilock 2002: iç odak uzmana zarar,</text>
        <text x="252" y="114">  yeni başlayana yarar</text>
        <text x="252" y="130">Wulf: dış odak üstünlüğü (15 yıllık derleme)</text>
        <text x="252" y="146">Sessiz göz süresi performansı öngörür</text>
        <text x="252" y="159" fill="var(--muted)">Yips: bilinçli müdahalenin klinik ucu</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="468" y="54" fill="var(--warn)" font-size="8" font-weight="700">C) ZAMAN VE BENLİK (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">Öz-kaybı: tutarlı rapor + mPFC ↓ (yön)</text>
        <text x="468" y="85">"Benlik çözülür" → ölçümün ötesinde iddia</text>
        <text x="468" y="101">Zaman: ölçüm çoğunlukla geçmişe dönük</text>
        <text x="468" y="117">İçsel saat: daha az sinyal → sıkışma</text>
        <text x="468" y="133">Korkuda ters yön: zaman yavaşlar</text>
        <text x="468" y="149" fill="var(--muted)">Prospektif deneyler seyrek — "zaman</text>
        <text x="468" y="162" fill="var(--muted)">kayboldu" bulgusu yönteme duyarlı</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">P_zirve ≈ D_otomatiklik × (1 − M_iç-izleme) × A_dış-kilit · T_öznel/T_gerçek ≈ 1/(1 + β·A_emilim)</text>
        <text x="30" y="248" fill="var(--ink)">/1 Uzman × odak: normal / kameralı öz-izleme / dış odak — performans + göz izleme + anlık örnekleme</text>
        <text x="30" y="263" fill="var(--ink)">/2 Prospektif zaman blokları vs geçmişe dönük tahmin — emilim ölçeğiyle kovaryans</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟢 otomatiklik/choking/dış odak · 🟡 öz-kaybı · 🟠 hipofrontalite (küresel iddia) · 🔴 "bilinç kapanır / zaman bükülür"</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: dört eğitilebilir kaldıraç kalır — dış odak, sessiz göz, ön-performans rutini, çift görev.</text>
      </g>
    </svg>`
  },
  "horizon-ua33": {
    title: {
      tr: "Şekil UA-33.1: Dış-Yeşil Kalibrasyon — Maruziyet Dozu, Aracı Değil",
      en: "Figure UA-33.1: External-Green Calibration — Exposure Dose, Not Mediator"
    },
    caption: {
      tr: "Alanın en güçlü kanıtı şehir denemeleridir: 541 boş arsanın randomize yeşillendirmesi silah şiddetini yüzde yirmi dokuz, bina iyileştirmesi yüzde otuz dokuz azalttı (Branas ve ark. 2018); ruh sağlığı kolunda depresif hissetme yüzde kırk bir buçuk azaldı (South ve ark. 2018). Orman fizyolojisi tutarlı yönde ama zayıf tasarımlıdır (kortizol meta-analizinde I² yüzde seksen sekiz). Negatif iyon depresyonda bazı RCT desteği taşır ama doz-yanıt ilişkisi yoktur ve etki ev cihazlarının ulaşamadığı yoğunluklardadır; topraklanma fizik olarak sorunlu, kanıt olarak zayıf ve çıkar çatışmalıdır. Doğru çerçeve: doz ve bağlam, görünmez aracı değil.",
      en: "The field's strongest evidence is city trials: randomized greening of 541 vacant lots reduced gun violence by twenty-nine percent and building remediation by thirty-nine percent (Branas et al. 2018); in the mental-health arm, feeling depressed fell by forty-one and a half percent (South et al. 2018). Forest physiology is consistent in direction but weakly designed (cortisol meta-analysis I² of eighty-eight percent). Negative ions carry some RCT support in depression but show no dose-response, and the effect is at densities home devices cannot reach; grounding is physically troubled, evidentially weak and conflicted. The right frame: dose and context, not an invisible mediator."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="External-green calibration schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="24" text-anchor="middle" fill="var(--accent)" font-size="9.4" font-weight="700">DOĞA TEMASI (HZ-33): DIŞ-YEŞİL KALİBRASYON</text>

      <rect x="18" y="38" width="212" height="150" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="30" y="54" fill="var(--ok)" font-size="8" font-weight="700">A) YEŞİLLENDİRME RCT (🟢)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="30" y="72">Branas 2018: 541 arsa — silah şiddeti %29 ↓</text>
        <text x="30" y="85">  bina iyileştirmesi %39 ↓ · ~1 600 dolar/arsa</text>
        <text x="30" y="101">South 2018: depresyon %41,5 ↓,</text>
        <text x="30" y="114">  kötü ruh sağlığı %62,8 ↓; temizlik kolu boş</text>
        <text x="30" y="130">White 2019: ≥120 dk/hafta eşiği</text>
        <text x="30" y="146" fill="var(--muted)">80 çalışma: ~30 dk sonrası restorasyon</text>
        <text x="30" y="159" fill="var(--muted)">Doz: 200-300 dk sonrası azalan marjinal getiri</text>
      </g>

      <rect x="240" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="252" y="54" fill="var(--warn)" font-size="8" font-weight="700">B) ORMAN FİZYOLOJİSİ (🟡)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="252" y="72">Li: NK %17,3 → %26,5 (+%53), 7-30 gün</text>
        <text x="252" y="85">Antonelli 2019: kortizol −0,05 µg/dl,</text>
        <text x="252" y="98">  I² = %88; "plasebo rol oynayabilir"</text>
        <text x="252" y="114">Ruh sağlığı meta: g = −8,81 → imkânsız</text>
        <text x="252" y="127">  büyük; güçlü yanlılık artefaktı sinyali</text>
        <text x="252" y="143" fill="var(--muted)">Körleme imkânsız, takip yok, küçük n —</text>
        <text x="252" y="156" fill="var(--muted)">yön tutarlı, kesinlik zayıf</text>
      </g>

      <rect x="456" y="38" width="206" height="150" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="54" fill="var(--bad)" font-size="8" font-weight="700">C) ARACI İDDİALAR (🟠/🔴)</text>
      <g font-size="6.9" fill="var(--ink)">
        <text x="468" y="72">İyon: Terman RCT depresyon ↓ AMA</text>
        <text x="468" y="85">  doz-yanıt yok; ev cihazı yoğunluğu düşük</text>
        <text x="468" y="101">Topraklanma: 10 nanoamper vs onlarca amper</text>
        <text x="468" y="114">  yüksüz radikaller; aşırı yük yüzeyde kalır</text>
        <text x="468" y="130">2015 derleme satıcı bağlantılı; 2021 inceleme</text>
        <text x="468" y="143">  zayıf + çıkar çatışmalı; kas pilotu n = 8</text>
        <text x="468" y="159" fill="var(--muted)">M. vaccae: fare verisi var, insan verisi yok</text>
      </g>

      <rect x="18" y="198" width="644" height="74" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="30" y="214" fill="var(--violet)" font-size="8" font-weight="700">ADAY YASA VE AYIRICI TESTLER</text>
      <g font-size="7.1">
        <text x="30" y="232" fill="var(--ink)" font-weight="700">E_sağlık ≈ (G_yeşil × T_doz × A_aktivite) × (1 + K_bağlam) / (1 + B_yanlılık) · aracılar eklendiğinde etki büyümez</text>
        <text x="30" y="248" fill="var(--ink)">/1 Çok-merkezli biyobelirteçli yeşillendirme RCT (≥24 ay): iyon/topraklanma kovaryansı YOK</text>
        <text x="30" y="263" fill="var(--ink)">/2 İyon-eşitlenmiş orman vs park yürüyüşü · /3 Üçlü kör topraklanma yatağı (n ≥ 200)</text>
      </g>

      <rect x="18" y="282" width="644" height="58" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="30" y="298" fill="var(--warn)" font-size="8" font-weight="700">TERMOMETRE VE ÇÜRÜTME KUTUSU</text>
      <g font-size="6.9">
        <text x="30" y="315" fill="var(--warn)">🟢 yeşillendirme RCT · 🟡 orman fizyolojisi · 🟠 negatif iyon depresyonu · 🔴 topraklanma/elektron kanalı</text>
        <text x="30" y="330" fill="var(--muted)">Çürütülürse: öznel/davranışsal fayda ve kamu sağlığı kanıtı kalır; "elektron/iyon" anlatısı kanıtsız kalır.</text>
      </g>
    </svg>`
  },
  "horizon-ua11": {
    title: { tr: "Şekil UA-11.1: Alan Kanıt Merdiveni — Yerelden Antene", en: "Figure UA-11.1: Field Evidence Ladder — From Local to Antenna" },
    caption: {
      tr: "Efaptik kuplaj nöral aktiviteyi etkiler; organoidler öğrenir. Bunlar ne bilinç ölçümüdür ne de dış alan alıcısı kanıtıdır. IIT ve GNWT, 2025 ön kayıtlı işbirliğinde her ikisi de kısmen zorlandı. HZ-11 alan-şöntleme ve EM-kalkan deneyleri yalnız belirtilmiş nedensel mekanizmaları sınar.",
      en: "Ephaptic coupling affects neural activity; organoids learn. Neither establishes a measure of experience or a receiver of an external field. Both IIT and GNWT faced challenges in the 2025 preregistered collaboration. HZ-11 field-shunting and EM-shielding test only specified mechanisms."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Field evidence ladder">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="26" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-11 · TOPOLOJİK ALAN REZONATÖRÜ</text>
      <rect x="20" y="45" width="202" height="132" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="64" fill="var(--ok)" font-size="9" font-weight="700">🟢 ÖLÇÜLEN</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="89">Efaptik alan → nöral etkinlik</text><text x="32" y="110">Organoid → kapalı döngü öğrenme</text><text x="32" y="133">İşlev ≠ öznel deneyim</text><text x="32" y="155">EEG/MEG dışarıda ölçer</text></g>
      <rect x="238" y="45" width="202" height="132" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="64" fill="var(--warn)" font-size="9" font-weight="700">🟠 AÇIK SINIR</text>
      <g font-size="8" fill="var(--ink)"><text x="250" y="89">Alan şöntleme / klasik ağ</text><text x="250" y="110">Fiziksel sistem / dijital ikiz</text><text x="250" y="133">Nedensel imza ölçümü</text><text x="250" y="155">Deneyim testi değil</text></g>
      <rect x="456" y="45" width="204" height="132" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="64" fill="var(--bad)" font-size="9" font-weight="700">🔴 DIŞ ALAN ANTENİ</text>
      <g font-size="8" fill="var(--ink)"><text x="468" y="89">Pozitif kanal kanıtı yok</text><text x="468" y="110">EM-kalkan yalnız EM'i sınar</text><text x="468" y="133">Null ≠ tüm alanların reddi</text><text x="468" y="155">Telepati çıkarılamaz</text></g>
      <rect x="20" y="195" width="640" height="89" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="215" fill="var(--violet)" font-size="9" font-weight="700">HZ-11 · İ_topluluk ≈ Σ F_sinaptik + λ · C_alan · (1 − D_kesikli)</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="238">/1 Alan şöntleme + sinaps kontrolü: öğrenme ve alan→etkinlik ölçümü</text><text x="32" y="256">/2 İşlev eşit fiziksel/dijital ikiz: yalnız uygulama imzası farklı mı?</text><text x="32" y="274">/3 EM-kalkan: belirlenmiş dış-EM kanalına yönelik sınav</text></g>
      <text x="32" y="317" fill="var(--muted)" font-size="8">Çürütülürse: alanın koordinasyon işlevi kalır; alıcı ve bilincin kimliği ayrıca sınanır.</text>
    </svg>`
  },
  "horizon-ua21": {
    title: { tr: "Şekil UA-21.1: Mikrotübülün Dört Oku — Etkiden Bilince", en: "Figure UA-21.1: Four Microtubule Arrows — From Effect to Experience" },
    caption: {
      tr: "Khan 2024: 8 sıçan, epotilon B sonrası LORR +69 saniye; Huang 2026: tek doz fare +29 saniye; uzun süreli benzer stabilizatörde ters yön bildirildi. Babcock 2024 in vitro UV optik modu gösterdi. Davranış, optik aracı ve Orch-OR farklı oklar; β optik aracılık henüz ölçülmedi.",
      en: "Khan 2024: 8 rats, LORR +69 s after epothilone B; Huang 2026: single-dose mouse +29 s; opposite direction reported under prolonged similar stabilization. Babcock 2024 showed an in vitro UV optical mode. Behavior, optical mediation and Orch-OR are separate links; optical mediator β has not been measured."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Microtubule anesthesia evidence ladder">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="26" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-21 · MİKROTÜBÜL KANIT MERDİVENİ</text>
      <rect x="20" y="49" width="146" height="105" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="30" y="68" fill="var(--ok)" font-size="9" font-weight="700">1 · İLAÇ</text>
      <text x="30" y="92" fill="var(--ink)" font-size="8">Sıçan +69 s</text><text x="30" y="109" fill="var(--ink)" font-size="8">Fare +29 s</text><text x="30" y="130" fill="var(--muted)" font-size="7">LORR, öznel ölçü değil</text>
      <text x="171" y="102" fill="var(--violet)" font-size="16">→</text>
      <rect x="189" y="49" width="146" height="105" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="199" y="68" fill="var(--warn)" font-size="9" font-weight="700">2 · MT YOLU</text>
      <text x="199" y="92" fill="var(--ink)" font-size="8">İskelet / reseptör</text><text x="199" y="109" fill="var(--ink)" font-size="8">Çok hedefli anestezi</text><text x="199" y="130" fill="var(--muted)" font-size="7">Seçici kontrol gerekli</text>
      <text x="340" y="102" fill="var(--violet)" font-size="16">→</text>
      <rect x="358" y="49" width="146" height="105" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="368" y="68" fill="var(--warn)" font-size="9" font-weight="700">3 · OPTİK MOD</text>
      <text x="368" y="92" fill="var(--ink)" font-size="8">UV, in vitro</text><text x="368" y="109" fill="var(--ink)" font-size="8">Uyanık beyin: açık</text><text x="368" y="130" fill="var(--muted)" font-size="7">Aracılık henüz yok</text>
      <text x="509" y="102" fill="var(--violet)" font-size="16">→</text>
      <rect x="527" y="49" width="133" height="105" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="537" y="68" fill="var(--bad)" font-size="9" font-weight="700">4 · ORCH-OR</text>
      <text x="537" y="92" fill="var(--ink)" font-size="8">Objektif indirgenme</text><text x="537" y="109" fill="var(--ink)" font-size="8">Bilinç anı: ölçülmedi</text><text x="537" y="130" fill="var(--muted)" font-size="7">Kanıt zinciri eksik</text>
      <rect x="20" y="184" width="640" height="98" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="207" fill="var(--violet)" font-size="9" font-weight="700">HZ-21 · ΔLORR ≈ α·ΔM_klasik + β·ΔQ_optik + γ·ΔR_reseptör + ε</text>
      <text x="32" y="233" fill="var(--ink)" font-size="8">Ön kayıtlı: kör / randomize / iki cins / bağımsız ekip / izofluran doz-yanıtı</text>
      <text x="32" y="255" fill="var(--ink)" font-size="8">Ayırıcı: MT stabilitesi eşitken optik imzayı seçici değiştir; EEG + uyanma ölç</text>
      <text x="32" y="317" fill="var(--muted)" font-size="8">Çürütülürse: MT'nin hücresel işlevi ve in vitro optiği kalır; bilinç teoremi kanıt olmaz.</text>
    </svg>`
  },
  "horizon-ua23": {
    title: { tr: "Şekil UA-23.1: EZ Su — Arayüzden Hafızaya Atlanamaz", en: "Figure UA-23.1: EZ Water — No Leap From Interface to Memory" },
    caption: {
      tr: "Hidrofilik yüzeyde iyon gradyanı mikroküreleri dışlar (Florea 2014; Elton 2020). Nötron radyografisi geniş H₃O₂ fazını desteklemez. Benveniste 1988 yüksek seyreltme iddiası kör koşullarda tekrarlanmadı. Kullanılır güç için gradyanın tüm enerji girdileri sayılmalıdır.",
      en: "Ion gradients at hydrophilic surfaces exclude microspheres (Florea 2014; Elton 2020). Neutron radiography does not support an extended H₃O₂ phase. Benveniste's 1988 high-dilution claim did not reliably replicate under blinding. All input energy maintaining the gradient must be counted before claiming usable power."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Interfacial water evidence and energy budget">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="26" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-23 · ARAYÜZ ELEKTRİĞİ / EZ SU</text>
      <rect x="20" y="49" width="205" height="126" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="69" fill="var(--ok)" font-size="9" font-weight="700">🟢 YÜZEY / İYON</text>
      <text x="32" y="95" fill="var(--ink)" font-size="8">Nafion → H⁺ gradyanı</text><text x="32" y="116" fill="var(--ink)" font-size="8">Difüzyoforez → küre dışı</text><text x="32" y="139" fill="var(--muted)" font-size="8">Parçacık ≠ suyun yapısı</text>
      <rect x="238" y="49" width="205" height="126" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="69" fill="var(--warn)" font-size="9" font-weight="700">🟠 GÜÇ / BİYOLOJİ</text>
      <text x="250" y="95" fill="var(--ink)" font-size="8">Potansiyel × akım = güç</text><text x="250" y="116" fill="var(--ink)" font-size="8">Işık + asit + ısı: girdi</text><text x="250" y="139" fill="var(--muted)" font-size="8">Net ATP katkısı: bilinmiyor</text>
      <rect x="456" y="49" width="204" height="126" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="69" fill="var(--bad)" font-size="9" font-weight="700">🔴 FAZ / HAFIZA</text>
      <text x="468" y="95" fill="var(--ink)" font-size="8">H₃O₂ fazı doğrulanmadı</text><text x="468" y="116" fill="var(--ink)" font-size="8">Benveniste kör tekrar: null</text><text x="468" y="139" fill="var(--muted)" font-size="8">50 fs: bulk H-bağı belleği</text>
      <rect x="20" y="195" width="640" height="88" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="216" fill="var(--violet)" font-size="9" font-weight="700">HZ-23 · J_i = difüzyon + elektriksel sürüklenme + konveksiyon</text>
      <text x="32" y="239" fill="var(--ink)" font-size="8">W_net = W_çıkış − W_gradyan_girdisi · gradyan bedava değildir</text>
      <text x="32" y="262" fill="var(--ink)" font-size="8">/A İyon eşitle · /B yükte gücü ölç · /C kör örnekle hafızayı sınama</text>
      <text x="32" y="316" fill="var(--muted)" font-size="8">Çürütülürse: yüzey kimyası ve mikroakışkan ayırma kalır; şifa/bilinç çıkmaz.</text>
    </svg>`
  },
  "horizon-ua29": {
    title: { tr: "Şekil UA-29.1: Geleceğe Koşullama, Geçmişe Sinyal Değil", en: "Figure UA-29.1: Conditioning on the Future Is Not Signaling to the Past" },
    caption: {
      tr: "ABL 1964 ve AAV 1988 geleceğe koşullu alt örnekleri hesaplar; erken marjinal mesaj taşımaz. Mossbridge 2012'nin 26 raporlu d≈0,21 meta sinyali, Siller 2015'in beklenti/null deneyiyle yöntem sınavına girer. HZ-29: ham erken marjinali gelecek serbest seçiminden kör ayır.",
      en: "ABL 1964 and AAV 1988 calculate future-conditioned subsets; the early marginal conveys no message. Mossbridge 2012's 26-report d≈0.21 pooled signal faces the expectation/null experiment of Siller 2015. HZ-29: blindly discriminate later free choice from the raw early marginal."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Retrocausality conditional versus marginal schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="27" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-29 · GELECEK VERİYE KOŞULLAMA</text>
      <rect x="20" y="45" width="203" height="129" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="65" fill="var(--ok)" font-size="9" font-weight="700">🟢 LABORATUVAR</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="88">Hazırlama → ara ölçüm</text><text x="32" y="109">Son seçim → alt grup</text><text x="32" y="132">Girişim / zayıf değer</text><text x="32" y="153">Marjinal aynı kalır</text></g>
      <rect x="238" y="45" width="203" height="129" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="65" fill="var(--warn)" font-size="9" font-weight="700">🟡 BEDENSEL SINYAL</text>
      <g font-size="8" fill="var(--ink)"><text x="250" y="88">26 rapor: d ≈ 0,21</text><text x="250" y="109">Önceki deneme artığı?</text><text x="250" y="132">Sıra / beklenti etkisi?</text><text x="250" y="153">2015 yöntem testi: null</text></g>
      <rect x="456" y="45" width="204" height="129" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="65" fill="var(--bad)" font-size="9" font-weight="700">🔴 SIÇRAMA</text>
      <g font-size="8" fill="var(--ink)"><text x="468" y="88">Alt grup ≠ geçmiş mesaj</text><text x="468" y="109">Korelasyon ≠ mekanizma</text><text x="468" y="132">Bilinç ile köprü yok</text><text x="468" y="153">Erken etiket tahmini şart</text></g>
      <rect x="20" y="194" width="640" height="88" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="215" fill="var(--violet)" font-size="9" font-weight="700">HZ-29 · P(X_erken | S_son) değişebilir; P(X_erken | do(S_son)) sabit kalır</text>
      <text x="32" y="238" fill="var(--ink)" font-size="8">/A Tekil fotonları mühürle → son seçim kör sınıflandırılabiliyor mu?</text>
      <text x="32" y="260" fill="var(--ink)" font-size="8">/B Donanım rastgeleliği + mühürlü ön fizyoloji + dış merkez doğrulaması</text>
      <text x="32" y="318" fill="var(--muted)" font-size="8">Çürütülürse: kuantum koşullu matematik ve normal beklenti fizyolojisi kalır.</text>
    </svg>`
  },
  "horizon-ua31": {
    title: { tr: "Şekil UA-31.1: Hilebaz mı, Kayıt Seçilimi mi?", en: "Figure UA-31.1: Trickster or Record Selection?" },
    caption: {
      tr: "AARO FY2024: 757 rapor; 118 ve ardından 174 sıradan çözüme kavuştu. FY2025: 319 yeni rapor, 114 çözülen; 205 açık dosya yeni bir nesne sınıfı değildir. NASA 2023 damgayı ve veri yoksunluğunu vurguladı. Açık dosyada kalma olasılığı kayıt kalitesine bağlıdır; ayırıcı test kalibre çoklu sensör ve tüm olayların paydasıdır.",
      en: "AARO FY2024: 757 reports; 118 and later 174 resolved to prosaic sources. FY2025: 319 new reports, 114 resolved; 205 open files are not a new object class. NASA 2023 emphasized stigma and sparse data. Remaining open depends on record quality; the discriminating test requires calibrated multiple sensors and a denominator of every incident."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="UAP record selection funnel schematic">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="27" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-31 · KAYIT SEÇİLİM HUNİSİ</text>
      <rect x="20" y="45" width="203" height="132" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="65" fill="var(--ok)" font-size="9" font-weight="700">🟢 TÜM OLAYLAR</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="89">Bilinen + bilinmeyen</text><text x="32" y="111">Tanık ilk ifadesi</text><text x="32" y="133">Sensör / zaman / menzil</text><text x="32" y="155">Kör sıralı kayıt</text></g>
      <rect x="238" y="45" width="203" height="132" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="65" fill="var(--warn)" font-size="9" font-weight="700">🟡 İKİ FİLTRE</text>
      <g font-size="8" fill="var(--ink)"><text x="250" y="89">/1 Şaşırtıcıysa raporla</text><text x="250" y="111">/2 İyi belgeli → çöz</text><text x="250" y="133">Zayıf belge → açık kalır</text><text x="250" y="155">Stigma raporu azaltır</text></g>
      <rect x="456" y="45" width="204" height="132" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="65" fill="var(--bad)" font-size="9" font-weight="700">🟠 AÇIK DOSYALAR</text>
      <g font-size="8" fill="var(--ink)"><text x="468" y="89">Belirsizlik oranı yüksek</text><text x="468" y="111">Motif tek başına ontoloji yok</text><text x="468" y="133">Açık ≠ açıklanamaz</text><text x="468" y="155">Hilebaz fail kanıtı yok</text></g>
      <rect x="20" y="195" width="640" height="86" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="216" fill="var(--violet)" font-size="9" font-weight="700">HZ-31 · P(açık | kaliteli kayıt) ve P(açık | zayıf kayıt) ayrı ölçülür</text>
      <text x="32" y="239" fill="var(--ink)" font-size="8">/1 Prospektif tüm kayıtlar + iki kalibre sensör · /2 Bağımsız ilk ifadeler</text>
      <text x="32" y="261" fill="var(--ink)" font-size="8">/3 Bilinen uydu/meteor/dron negatif kontrolleri</text>
      <text x="32" y="316" fill="var(--muted)" font-size="8">Çürütülürse: iyi kaydedilen dirençli olay ayrıca araştırılır; tanıklar yok sayılmaz.</text>
    </svg>`
  },
  "horizon-ua34": {
    title: { tr: "Şekil UA-34.1: Ayın Üç Saati — Işık, Çekim, Sosyal Zaman", en: "Figure UA-34.1: Three Lunar Clocks — Light, Gravity and Social Time" },
    caption: {
      tr: "Deniz solucanında aylık saat ölçülmüştür (Zantke 2013); insan uykusunda 33 kişilik laboratuvar bulgusu, büyük null çalışmalar ve 2021 alan verisi bir aradadır. 2026 çekim tepe yorumu önbaskıdır, bağımsız doğrulanmadı. Tam aydan önce aydınlık akşamı, tam/yeni aydaki çekim tepelerini ve sahte fazları ayrı sınamak gerekir.",
      en: "A monthly marine clock is measured (Zantke 2013); human sleep evidence includes a 33-person lab result, large nulls and 2021 field data. The 2026 gravitational-peak proposal is a preprint, not independently confirmed. Separate bright evenings before full moon, gravity peaks at new/full moon, and sham phases."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Lunar sleep light and gravity phase comparison">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="27" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-34 · AYIN ÜÇ SAATİ</text>
      <rect x="20" y="45" width="203" height="130" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="65" fill="var(--ok)" font-size="9" font-weight="700">🟢 DENİZEL AY SAATİ</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="88">Platynereis üreme ritmi</text><text x="32" y="110">Gece ışığıyla ayarlanır</text><text x="32" y="132">Sabit koşulda ~30 gün</text><text x="32" y="153">İnsana doğrudan aktarılmaz</text></g>
      <rect x="238" y="45" width="203" height="130" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="65" fill="var(--warn)" font-size="9" font-weight="700">🟡 İNSAN UYKUSU</text>
      <g font-size="8" fill="var(--ink)"><text x="250" y="88">2013 n=33: −20 dk</text><text x="250" y="110">2015 n=2125: null</text><text x="250" y="132">2021: dolunay öncesi</text><text x="250" y="153">2026 çekim: önbaskı</text></g>
      <rect x="456" y="45" width="204" height="130" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="468" y="65" fill="var(--bad)" font-size="9" font-weight="700">🟠 AYIRICI FAZLAR</text>
      <g font-size="8" fill="var(--ink)"><text x="468" y="88">Işık: dolunay öncesi</text><text x="468" y="110">Çekim: yeni + dolunay</text><text x="468" y="132">Sosyal: hafta/takvim</text><text x="468" y="153">Sahte faz: negatif kontrol</text></g>
      <rect x="20" y="195" width="640" height="86" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="216" fill="var(--violet)" font-size="9" font-weight="700">HZ-34 · ΔUyku ≈ β_L·L_akşam + β_G·G_çekim + β_S·S_takvim</text>
      <text x="32" y="239" fill="var(--ink)" font-size="8">/1 En az 6 döngü + ölçülen ışık + dış kohort + kör sahte ay fazı</text>
      <text x="32" y="261" fill="var(--ink)" font-size="8">/2 Yeniay çekim tepesi ışık olmadan sürüyor mu? Ön kayıt + tekrarlama</text>
      <text x="32" y="316" fill="var(--muted)" font-size="8">Çürütülürse: deniz saatleri, insan sirkadiyen sistemi ve gerçek ay ışığı kalır.</text>
    </svg>`
  },
  "horizon-ua37": {
    title: { tr: "Şekil UA-37.1: İlahi Ses — Yaşantı mı, Atıf mı, Kayıt mı?", en: "Figure UA-37.1: Divine Voice — Experience, Attribution or Record?" },
    caption: {
      tr: "Antik metin frekansı üç değişkenin ürünüdür: ses yaşantısı, kaynak atfı ve tür/kayıt seçilimi. Luhrmann 2015 güncel kültür farklarını; Barber 2021 iç konuşma modelinin karma kanıtlarını inceler. Jaynes'in tarihsel sağ/sol beyin devresi bunlardan çıkarılamaz.",
      en: "Ancient text frequency mixes voice experience, source attribution and genre/record selection. Luhrmann 2015 probes modern cultural variation; Barber 2021 reports mixed evidence for the inner-speech model. Neither proves Jaynes's historical right/left brain circuit."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Voice experience attribution and textual selection diagram">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="27" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-37 · SESİ KİM ADLANDIRDI?</text>
      <rect x="20" y="49" width="200" height="128" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="70" fill="var(--ok)" font-size="9" font-weight="700">🟢 YAŞANTI</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="94">Bugün AVH / iç konuşma</text><text x="32" y="116">Kaynak izleme araştırılır</text><text x="32" y="138">Antik beyin: ölçülemez</text></g>
      <text x="222" y="117" fill="var(--violet)" font-size="16">→</text>
      <rect x="242" y="49" width="200" height="128" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="254" y="70" fill="var(--warn)" font-size="9" font-weight="700">🟡 ATIF</text>
      <g font-size="8" fill="var(--ink)"><text x="254" y="94">Tanrı / ata / kendi sözüm</text><text x="254" y="116">Otorite + kültür çerçevesi</text><text x="254" y="138">Tanı veya devre değil</text></g>
      <text x="444" y="117" fill="var(--violet)" font-size="16">→</text>
      <rect x="464" y="49" width="196" height="128" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="476" y="70" fill="var(--bad)" font-size="9" font-weight="700">🟠 KAYIT</text>
      <g font-size="8" fill="var(--ink)"><text x="476" y="94">Destan / mektup / yasa</text><text x="476" y="116">Yazı + koruma yanlılığı</text><text x="476" y="138">Metin ≠ insan prevalansı</text></g>
      <rect x="20" y="195" width="640" height="85" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="217" fill="var(--violet)" font-size="9" font-weight="700">HZ-37 · Kayıt oranı ≈ yaşantı × kaynak atfı × tür seçilimi</text>
      <text x="32" y="241" fill="var(--ink)" font-size="8">/1 Kör kod: aynı türde tarihsel değişim mi? /2 Modern: işitme ve atıf ayrı mı?</text>
      <text x="32" y="263" fill="var(--ink)" font-size="8">Sağ / sol beyin ve bilinç yokluğu için bu metinler yeterli kanıt değil.</text>
      <text x="32" y="316" fill="var(--muted)" font-size="8">Çürütülürse: kaynak atfı araştırması kalır; tür etkisi büyük tezi küçültür.</text>
    </svg>`
  },
  "horizon-ua38": {
    title: { tr: "Şekil UA-38.1: Rahat Sınıftan Taşınabilir Bilgiye", en: "Figure UA-38.1: From Comfortable Classroom to Portable Knowledge" },
    caption: {
      tr: "Çevresel bağlam belleğinde ortalama d≈0,28 (Smith & Vela 2001) gevşeme veya sügestopedi etkisi değildir. Lozanov'un 25 kat iddiası kanıtlanmış karşılaştırma değildir. Eşit süreli aktif kontrol, gecikmeli yeni bağlam transferi ve toplam maliyet kapı iddiasını sınar.",
      en: "Mean environmental-context memory d≈0.28 (Smith and Vela 2001) is not a relaxation or suggestopedia effect. Lozanov's 25-fold claim is not an established controlled effect. Equal-time active controls, delayed cross-context transfer and total cost test the gate claim."
    },
    svg: () => `<svg viewBox="0 0 680 360" role="img" aria-label="Suggestopedia versus active practice and delayed transfer">
      <rect x="6" y="6" width="668" height="348" rx="12" fill="var(--surface)" stroke="var(--line)"/>
      <text x="340" y="27" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">UA-38 · ÖĞRENME DURUMU / TRANSFER</text>
      <rect x="20" y="47" width="197" height="128" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/>
      <text x="32" y="67" fill="var(--ok)" font-size="9" font-weight="700">🟢 GÜÇLÜ DAYANAK</text>
      <g font-size="8" fill="var(--ink)"><text x="32" y="91">Aralıklı geri çağırma</text><text x="32" y="113">Aktif uygulama testi</text><text x="32" y="137">Kalıcı bilgi ayrı ölçülür</text></g>
      <rect x="238" y="47" width="204" height="128" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/>
      <text x="250" y="67" fill="var(--warn)" font-size="9" font-weight="700">🟡 SINIRLI BAĞLAM</text>
      <g font-size="8" fill="var(--ink)"><text x="250" y="91">Çevre belleği: d≈0,28</text><text x="250" y="113">Rahatlık ≠ yeni bilgi</text><text x="250" y="137">Yeni oda transferi gerekli</text></g>
      <rect x="463" y="47" width="197" height="128" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/>
      <text x="475" y="67" fill="var(--bad)" font-size="9" font-weight="700">🔴 BÜYÜK İDDİA</text>
      <g font-size="8" fill="var(--ink)"><text x="475" y="91">25 kat ezber: Lozanov</text><text x="475" y="113">Bağımsız etki değil</text><text x="475" y="137">Müzik / telkin ayrılmalı</text></g>
      <rect x="20" y="195" width="640" height="85" rx="8" fill="var(--surface-2)" stroke="var(--violet)"/>
      <text x="32" y="217" fill="var(--violet)" font-size="9" font-weight="700">HZ-38 · Eşit zaman: paket A / aktif ders B / aralıklı geri çağırma C</text>
      <text x="32" y="241" fill="var(--ink)" font-size="8">4–6 hafta sonra yeni cümle + yeni oda / konuşmacı · kör puanlayıcı</text>
      <text x="32" y="263" fill="var(--ink)" font-size="8">İddia: A − B pozitif mi? Öğrenci + öğretmen maliyeti ve ayrılma sayılsın.</text>
      <text x="32" y="316" fill="var(--muted)" font-size="8">Çürütülürse: destekleyici ortam kalır; özel hızlandırıcı gösterilmemiş olur.</text>
    </svg>`
  },
  "horizon-phi2": {
    title: { tr: "Şekil Φ-2.1: Kırk Alan, Üç Rakip Model ve Taşınabilirlik Filtresi", en: "Figure Φ-2.1: Forty Areas, Three Rival Models and the Transportability Filter" },
    caption: {
      tr: "Yerel değişim, ortak nedensel kanal demek değildir. Aktif kontrol, ölçülen aracı, gecikmeli yeni bağlam ve tam kayıt olmadan Φ-2 yalnız adaydır. Dış kanal ayrıca kaçak kontrolü ve bağımsız tekrar gerektirir.",
      en: "Local change does not imply a shared causal channel. Φ-2 remains a candidate without active control, measured mediation, delayed novel-context testing and complete records. An external channel additionally requires leakage checks and independent replication."
    },
    svg: lang => {
      const en = lang === "en";
      const labels = en ? ["40 DOSSIERS / 5 EVIDENCE TYPES", "PHYSIOLOGY", "EXPERIENCE", "SOCIAL RECORD", "PHYSICS", "ANOMALIES", "CAUSAL TRANSPORT FILTER", "Input X", "Mediator M", "Outcome Y", "Active control · expectancy · recording · new context", "C · Conditional mechanism", "R · Reporting and context", "E · External channel (unproven)", "If refuted: local findings remain; one universal field is not implied."]
        : ["40 DOSYA / 5 KANIT TÜRÜ", "FİZYOLOJİ", "YAŞANTI", "SOSYAL KAYIT", "FİZİK", "ANOMALİLER", "NEDENSEL TAŞINABİLİRLİK FİLTRESİ", "Girdi X", "Aracı M", "Çıktı Y", "Aktif kontrol · beklenti · kayıt · yeni bağlam", "K · Koşullu mekanizma", "B · Bağlam ve raporlama", "D · Dış kanal (kanıtsız)", "Çürütülürse yerel bulgular kalır; evrensel alan çıkmaz."];
      return `<svg viewBox="0 0 680 390" role="img" aria-label="${en ? "Causal transportability synthesis" : "Nedensel taşınabilirlik sentezi"}">
        <rect x="5" y="5" width="670" height="380" rx="13" fill="var(--surface)" stroke="var(--line)"/>
        <text x="340" y="28" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700">Φ-2 · ${labels[0]}</text>
        <g font-size="8" font-weight="700" text-anchor="middle">
          <rect x="20" y="48" width="115" height="39" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/><text x="78" y="72" fill="var(--ink)">${labels[1]}</text>
          <rect x="151" y="48" width="115" height="39" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/><text x="209" y="72" fill="var(--ink)">${labels[2]}</text>
          <rect x="282" y="48" width="115" height="39" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/><text x="340" y="72" fill="var(--ink)">${labels[3]}</text>
          <rect x="413" y="48" width="115" height="39" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/><text x="471" y="72" fill="var(--ink)">${labels[4]}</text>
          <rect x="544" y="48" width="115" height="39" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/><text x="602" y="72" fill="var(--ink)">${labels[5]}</text>
        </g>
        <text x="340" y="109" text-anchor="middle" fill="var(--violet)" font-size="18">↓</text>
        <rect x="20" y="122" width="640" height="111" rx="10" fill="var(--surface-2)" stroke="var(--violet)"/>
        <text x="340" y="143" text-anchor="middle" fill="var(--violet)" font-size="10" font-weight="700">${labels[6]}</text>
        <g font-size="9" text-anchor="middle" fill="var(--ink)">
          <rect x="40" y="155" width="154" height="33" rx="6" fill="var(--surface)" stroke="var(--line)"/><text x="117" y="176">${labels[7]}</text>
          <text x="206" y="177" fill="var(--violet)">→</text>
          <rect x="222" y="155" width="154" height="33" rx="6" fill="var(--surface)" stroke="var(--line)"/><text x="299" y="176">${labels[8]}</text>
          <text x="388" y="177" fill="var(--violet)">→</text>
          <rect x="404" y="155" width="235" height="33" rx="6" fill="var(--surface)" stroke="var(--line)"/><text x="521" y="176">${labels[9]}</text>
        </g>
        <text x="340" y="215" text-anchor="middle" fill="var(--muted)" font-size="8">${labels[10]}</text>
        <g font-size="8.5" text-anchor="middle" font-weight="700">
          <rect x="20" y="251" width="202" height="55" rx="8" fill="var(--surface-2)" stroke="var(--ok)"/><text x="121" y="281" fill="var(--ok)">${labels[11]}</text>
          <rect x="239" y="251" width="202" height="55" rx="8" fill="var(--surface-2)" stroke="var(--warn)"/><text x="340" y="281" fill="var(--warn)">${labels[12]}</text>
          <rect x="458" y="251" width="202" height="55" rx="8" fill="var(--surface-2)" stroke="var(--bad)"/><text x="559" y="281" fill="var(--bad)">${labels[13]}</text>
        </g>
        <text x="340" y="348" text-anchor="middle" fill="var(--muted)" font-size="9">${labels[14]}</text>
      </svg>`;
    }
  }
};

export function renderDiagram(id, lang = "tr") {
  const d = DIAGRAMS[id];
  if (!d) return "";
  const l = lang === "en" ? "en" : "tr";
  return `<figure class="res-fig" data-diag="${esc(id)}">
    <div class="res-svg">${d.svg(l)}</div>
    <figcaption><b>${esc(d.title[l] || d.title.tr)}</b> — <span>${esc(d.caption[l] || d.caption.tr)}</span></figcaption>
  </figure>`;
}

export function hydrateDiagrams(root, lang = "tr") {
  if (!root) return;
  for (const el of root.querySelectorAll("[data-diag-embed]")) {
    const id = el.dataset.diagEmbed;
    el.outerHTML = renderDiagram(id, lang);
  }
}
