# Campus Maintenance

Aplikasi web campus service request untuk mendukung proses pengelolaan laporan perbaikan fasilitas kampus.

## Fitur Utama
- Dashboard ringkasan laporan
- Daftar laporan dan detail laporan
- Form pembuatan laporan
- Simulasi login untuk demonstrasi role pengguna

## Petunjuk Login Simulasi (Demo Akun)
Aplikasi ini menggunakan sistem sesi yang aman. Setelah masuk, pengguna wajib melakukan logout sebelum dapat mengganti peran atau memulai sesi baru.

Gunakan salah satu kata kunci berikut pada layar login untuk mencoba fitur simulasi:
- Ketik `pelapor` -> Masuk sebagai Peran Pelapor (Mahasiswa/Staff)
- Ketik `admin` -> Masuk sebagai Peran Administrator
- Ketik `teknisi` -> Masuk sebagai Peran Teknisi

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
