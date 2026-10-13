# Sesli rehber kayıtlarını tamamlama — PC'de çalışacak yapay zekâ için görev notu

Bu not, Gateway uygulamasının **kayıtlı sesli rehber paketlerini** (Türkçe + İngilizce) bir PC'de,
internet erişimi olan bir yapay zekâ ajanıyla tamamlamak içindir. Aşağıdaki "Agent brief" bölümü
İngilizcedir; ajana doğrudan verilebilir.

## Durum (v0.5.3 itibarıyla)

| | Türkçe | İngilizce |
|---|---|---|
| Sesli satır (benzersiz) | 534 | 533 |
| Kayıtlı | 112 | 109 |
| Ses | `voice-00` (Arena nöral ses, kadın) | `voice-01` (Arena nöral ses) |
| Klipler | `content/voice/tr/` | `content/voice/en/` |

Kalan satırlar şimdilik telefonun metin okuma (TTS) sesiyle okunuyor; Ayarlar → "Kayıtlı sesli rehber"
satırında kapsama oranı görünür.

## Nasıl çalışır (özet)

- Her sesli satırın anahtarı metninin karmasıdır: `voiceKey(text) = sha1(NFC(text)).hex[:12]`.
  **Metinleri değiştirme** — anahtar değişir ve kayıt düşer.
- Satır envanteri: `node tools/voice-lines.mjs` → `{ tr: { lines: [{ key, text, uses, shared }] }, en: … }`.
- Klip deposu: `content/voice/<dil>/<key>.mp3` + `content/voice/<dil>/index.json`.
- `node tools/build.mjs` klipleri paketlere birleştirir; `node tools/test-voice.mjs` doğrular.

## Seçenek A (önerilen, PC'de ~15 dakika): Edge nöral sesleriyle satır satır üretim

```bash
# depo kökünde
pip install edge-tts numpy soundfile imageio-ffmpeg
edge-tts --list-voices | grep -i "tr-TR\|en-GB\|en-US"
# Türkçe: tr-TR-EmelNeural (kadın) veya tr-TR-AhmetNeural (erkek); İngilizce: en-GB-SoniaNeural, en-US-JennyNeural, en-GB-RyanNeural
python tools/voice-edge-tts.py --lang tr --voice tr-TR-EmelNeural --rate -8% --out /tmp/voice-tr --all
python tools/voice-edge-tts.py --lang en --voice en-GB-SoniaNeural --rate -8% --out /tmp/voice-en --all
python tools/voice-pack.py import --lang tr --dir /tmp/voice-tr --voice "tr-TR-EmelNeural (edge-tts)"
python tools/voice-pack.py import --lang en --dir /tmp/voice-en --voice "en-GB-SoniaNeural (edge-tts)"
python tools/voice-pack.py status
node tools/build.mjs && node tools/test-voice.mjs && npm test
```

**Önemli:** bir oturumda iki farklı ses karışmasın diye `--all` ile **tüm** satırlar aynı sesle yeniden
üretilir (mevcut 112 + 109 Arena klibi üzerine yazılır). Mevcut Arena sesi korunacaksa bu yol
kullanılmaz; kalan satırlar Arena'da "devam et" turlarıyla tamamlanır (Seçenek C).

`import` her dosyayı ses seviyesine göre dengeler (−20 dBFS medyan RMS), baş/son sessizliğini kırpar
(0,10 / 0,22 s pay), 22,05 kHz mono 48 kb/s MP3 olarak yazar ve `index.json`'a `check: "import"` ile ekler.

## Seçenek B: başka bir TTS (ElevenLabs, Google Cloud TTS, Piper, Azure …)

1. `node tools/voice-lines.mjs > /tmp/lines.json` ile envanteri al.
2. Her satır için `text` alanını seslendir, dosyayı **`<key>.mp3`** (veya `.wav/.flac/.ogg`) adıyla bir
   dizine kaydet (dil başına ayrı dizin). Hız: doğal anlatımın %90'ı civarı; sakin, tek düze değil.
3. `python tools/voice-pack.py import --lang tr --dir DIZIN --voice "ses adı"` → build → test.

## Seçenek C: Arena'da devam

Arena sohbetinde "devam et" denince kalan toplu işler (dil başına 23 toplu işin 5'i bitti) aynı seslerle
sürdürülür; tur başına ≈ 4 + 4 toplu iş (≈ 100 + 100 satır).

## Kontrol listesi (hangi seçenek olursa olsun)

- [ ] `python tools/voice-pack.py status` → her iki dilde `534/534` ve `533/533`.
- [ ] `node tools/build.mjs` çıktısında `voice tr: 534/534 lines recorded in N packs`.
- [ ] `node tools/test-voice.mjs` ve `npm test` yeşil.
- [ ] Rastgele 5–10 klibi dinle (`content/voice/tr/*.mp3`): kesik hece yok, seviye dengeli, metinle aynı.
- [ ] Uygulamada bir oturum başlat (Wave I → "Focus 10'a Giriş"): yönergeler kayıtlı sesle, ekran kilitliyken de çalıyor.
- [ ] `git add content/voice && git commit -m "voice packs: full tr/en coverage (<ses adı>)" && git push origin arena/7bfeab7d-eye`
  (dil başına ≈ 15 MB; `content/voice/raw/` git tarafından yok sayılır).

---

## Agent brief (English)

You are completing the recorded voice packs of the Gateway PWA in this repository (branch
`arena/7bfeab7d-eye`). Spoken guidance lines (Turkish and English, 534 + 533 unique lines) are stored as
one MP3 clip per line under `content/voice/<lang>/<key>.mp3`, where `key = sha1(NFC(text))[:12]`.
`tools/build.mjs` merges the clips into packs and the app mixes them into the session audio.
Currently 112 (tr) and 109 (en) lines are recorded with Arena's neural voices.

Recommended route: regenerate **all** lines per language with one consistent Microsoft Edge neural voice
(`pip install edge-tts`), import them, build, test, commit:

```bash
# from the repository root
pip install edge-tts numpy soundfile imageio-ffmpeg
python tools/voice-edge-tts.py --lang tr --voice tr-TR-EmelNeural --rate -8% --out /tmp/voice-tr --all
python tools/voice-edge-tts.py --lang en --voice en-GB-SoniaNeural --rate -8% --out /tmp/voice-en --all
python tools/voice-pack.py import --lang tr --dir /tmp/voice-tr --voice "tr-TR-EmelNeural (edge-tts)"
python tools/voice-pack.py import --lang en --dir /tmp/voice-en --voice "en-GB-SoniaNeural (edge-tts)"
python tools/voice-pack.py status            # expect 534/534 and 533/533
node tools/build.mjs && node tools/test-voice.mjs && npm test
git add content/voice && git commit -m "voice packs: full tr/en coverage (edge-tts)" && git push origin arena/7bfeab7d-eye
```

Rules: never edit the texts (keys would change); keep one voice per language; do not commit
`content/voice/raw/`; Windows: use `python` and a writable output directory instead of `/tmp`.
Any other TTS works too: produce `<key>.mp3` files from `node tools/voice-lines.mjs` and run `import`.
