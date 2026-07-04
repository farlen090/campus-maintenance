Tugas Kuliah: Proyek Software Engineering (Campus Service Request)

Nama: Munggilung, Farlen Bernet

NIM: 105022410083

Kelas: (Software Engineering - A)

1. URL Repositori GitHub (Kode Sumber & Dokumentasi Utuh CASE.md):
https://github.com/farlen090/campus-maintenance

2. URL Aplikasi Live (Cloudflare Workers):
https://campus-maintenance.campus-maintenance.workers.dev

# Campus Maintenance

Aplikasi web campus service request untuk mendukung proses pengelolaan laporan perbaikan fasilitas kampus.

## Fitur Utama
- **Dashboard Ringkasan Laporan:** Menampilkan statistik visual status laporan untuk pemantauan cepat.
- **Manajemen Laporan:** Daftar laporan, detail laporan, komentar, dan pelacakan riwayat status secara real-time.
- **Form Pembuatan Laporan:** Memudahkan pelapor (mahasiswa/staf) mengirimkan keluhan fasilitas.
- **Simulasi Login Multi-Role:** Demonstrasi hak akses antarmuka berdasarkan peran pengguna (Pelapor, Admin, Teknisi, dan Manajer Fasilitas).

## Petunjuk Login Simulasi (Demo Akun)
Aplikasi ini menggunakan sistem sesi yang aman. Setelah masuk, pengguna wajib melakukan logout sebelum dapat mengganti peran atau memulai sesi baru.

Gunakan salah satu kata kunci berikut pada layar login untuk mencoba fitur simulasi:
- Ketik `pelapor` -> Masuk sebagai Peran Pelapor (Akses membuat & melihat laporan sendiri).
- Ketik `admin` -> Masuk sebagai Peran Administrator (Akses penuh menugaskan teknisi & mengatur prioritas).
- Ketik `teknisi` -> Masuk sebagai Peran Teknisi (Akses memperbarui progres pengerjaan fasilitas).
- Ketik `manajer` / `manajer fasilitas` / `facility_manager` -> Masuk sebagai Peran Manajer Fasilitas (**Akses Khusus Monitoring/Read-Only** untuk melihat dashboard, statistik, dan detail laporan tanpa hak eksekusi/modifikasi data)

## Menjalankan Aplikasi Secara Lokal
1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   ```
3. Buka alamat berikut di browser:
   ```text
   http://localhost:5173
   ```

## Verifikasi
Untuk memastikan aplikasi berjalan dengan baik, jalankan:
```bash
npm run test
npm run build
```
## Panduan Autentikasi dan Deployment (Cloudflare Wrangler)

Aplikasi ini dideploy menggunakan Cloudflare Workers. Jika ingin menjalankan ulang proses deployment atau melakukan autentikasi dari terminal lokal, ikuti langkah-langkah berikut:

1. **Login ke Akun Cloudflare**
   Jalankan perintah berikut di terminal untuk menghubungkan terminal laptop dengan akun Cloudflare:
   ```bash
   npx wrangler login