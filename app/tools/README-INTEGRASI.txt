NETFIX TOOLS — IMPORT PACKAGE

SUMBER
File generator diambil dari MikroTik-Generator-main.zip yang diunggah pada percakapan ini.
Logika HTML/JavaScript asli dipertahankan. Judul tab dan strip brand diganti menjadi NETFIX TOOLS.
Script sosial opsional Facebook/GitHub Buttons pada NTH dilepas; generator logic tidak diubah.

ISI PAKET
public/netfix-tools/
  bgp-generator.html
  pcc-clean.html
  nth.html
  mikrotik-failover-script-generator-4-wan.html
  static-routing-games.html
  mikrotik-backup-to-mail-clean.html
  mikrotik-hide-my-router-from-isp.html

INTEGRASI KE NEXT.JS
1. Salin folder public/netfix-tools ke root repository PON (sejajar dengan folder app).
   Next.js static export akan menerbitkan file tersebut di:
   https://mikrotikscript.github.io/PON/netfix-tools/<nama-file>

2. Buka app/tools/page.tsx.
   Cari bagian katalog yang menampilkan:
     <div className="nt-card-grid">
   Tempel isi file tools-page-integration-snippet.tsx setelah penutup </div> milik nt-card-grid,
   masih di dalam cabang katalog (bagian `active ? ... : (...)`).

3. Tempel isi tools-page-integration.css di bagian paling bawah app/tools.css.

4. Commit ke branch main, tunggu GitHub Actions selesai, lalu buka:
   https://mikrotikscript.github.io/PON/tools/

CATATAN AUDIT SUMBER
- Paket ZIP berisi 18 file HTML, tetapi beberapa halaman generator memakai Firebase Auth,
  login.js, login.css, jQuery atau resource eksternal yang tidak disertakan dalam ZIP.
- Untuk menghindari halaman rusak atau menampilkan login yang tidak berfungsi, paket ini hanya
  memasukkan 7 generator yang tidak memerlukan folder login/Firebase.
- Generator yang belum dimasukkan perlu diaudit dan dimigrasikan satu per satu sebelum dipublikasikan.
- Hasil script RouterOS tetap harus ditinjau sesuai versi RouterOS, interface, gateway, routing,
  dan topologi aktual. Uji di lab/Safe Mode sebelum produksi.


UPDATE TEMA
Seluruh 7 halaman generator pada paket ini sudah diberi override tema NETFIX TOOLS:
- Header charcoal (#292929) dengan aksen orange (#f26a12)
- Latar halaman abu-abu terang
- Panel/form putih dengan teks gelap
- Tombol dan link orange
- Panel output script tetap gelap agar kode mudah dibaca
- Layout responsif untuk layar ponsel
Tema ini diselaraskan dengan tampilan utama NETFIX TOOLS/PONCALC.
