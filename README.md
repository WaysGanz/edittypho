# Typo Trail

Editor foto typography berbasis browser dengan 12 gaya poster pendakian.
Situs statis: tanpa build, tanpa dependensi, tanpa server.

## Fitur
- Unggah foto sendiri (foto tidak dikirim ke mana pun, semua diproses di browser)
- 12 gaya: Poster, Summit, Hold, Healing, Majestic, Editorial, Papan, Kartu pos, Outline, Feed, Hero, Mono
- Teks, ukuran judul, warna aksen, zoom, geser, dan gelap foto bisa diatur
- Simpan sebagai PNG 1080 x 1350

## Struktur
```
index.html   halaman
style.css    tampilan editor
app.js       logika canvas dan semua template
favicon.svg  ikon
vercel.json  konfigurasi Vercel
```

## Deploy ke Vercel lewat GitHub
1. Buat repo baru di GitHub, lalu upload semua file di folder ini (Add file > Upload files).
2. Buka vercel.com > Add New > Project > pilih repo tadi > Import.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan.
4. Klik Deploy. Situs langsung aktif.

Untuk uji lokal, buka `index.html` di browser. Font dimuat dari Google Fonts, jadi perlu internet agar tampil sesuai desain.

## Menambah gaya baru
Buka `app.js`:
1. Tambah satu objek di array `TPL` (id, nama, field yang dipakai, teks bawaan).
2. Tambah fungsi dengan id yang sama di objek `DRAW`.

Buka `?tpl=nama` di URL untuk langsung membuka gaya tertentu, misalnya `/?tpl=signboard`.
# edittypho
# edittypho
