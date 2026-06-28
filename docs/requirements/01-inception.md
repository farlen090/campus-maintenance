# 01 - Inception

## Nama Proyek
Campus Service Request and Maintenance System

## Latar Belakang
Di lingkungan kampus, kerusakan fasilitas seperti proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, atau ruangan kotor sering dilaporkan secara manual. Cara manual membuat laporan sulit dilacak, status pengerjaan tidak jelas, dan pihak yang bertanggung jawab bisa terlambat menerima informasi.

Sistem ini dibuat untuk membantu mahasiswa dan staff melaporkan masalah fasilitas kampus melalui aplikasi web. Laporan akan diperiksa oleh administrator, diberikan kepada teknisi, lalu diperbarui statusnya sampai pekerjaan selesai.

## Masalah Utama
Belum ada sistem terpusat untuk mencatat, memantau, dan mengelola laporan kerusakan fasilitas kampus secara jelas dari awal laporan dibuat sampai laporan ditutup.

## Tujuan Sistem
1. Memudahkan mahasiswa dan staff membuat laporan kerusakan fasilitas.
2. Membantu administrator memeriksa laporan dan menentukan prioritas.
3. Membantu administrator menugaskan laporan kepada teknisi.
4. Membantu teknisi melihat tugas dan memperbarui status pekerjaan.
5. Membantu pelapor melihat perkembangan laporan.
6. Menyediakan dashboard sederhana untuk memantau jumlah dan status laporan.

## Stakeholder dan Aktor

| Aktor | Peran |
|---|---|
| Mahasiswa | Membuat laporan, melihat status laporan, menambahkan komentar, dan mengonfirmasi hasil. |
| Staff | Membuat laporan, melihat status laporan, menambahkan komentar, dan mengonfirmasi hasil. |
| Administrator | Memeriksa laporan, menentukan kategori dan prioritas, menugaskan teknisi, serta menutup laporan. |
| Teknisi | Melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai. |
| Manajer Fasilitas | Melihat dashboard dan laporan ringkas. |

## Scope Aplikasi

### Termasuk Dalam Scope
- Membuat laporan baru.
- Melihat daftar laporan.
- Mencari dan menyaring laporan.
- Melihat detail laporan.
- Memeriksa laporan.
- Menentukan prioritas laporan.
- Menugaskan teknisi.
- Mengubah status pekerjaan.
- Menambahkan komentar atau catatan.
- Menyimpan riwayat status.
- Menutup atau membuka kembali laporan.
- Menampilkan dashboard sederhana.
- Menggunakan data dummy pada tahap awal.
- Deploy ke Cloudflare.

### Tidak Termasuk Dalam Scope Awal
- Upload foto.
- Email notification.
- Login menggunakan akun Google.
- QR code ruangan.
- AI otomatis untuk menentukan kategori.
- Inventory spare part.
- Vendor management.
- Pembayaran atau layanan berbayar.

## Alur Status Awal
1. Submitted
2. Under Review
3. Assigned
4. In Progress
5. Resolved
6. Closed

## Asumsi
- Mahasiswa dan staff dapat berperan sebagai pelapor.
- Administrator bertanggung jawab memeriksa dan mengatur laporan.
- Teknisi hanya menangani laporan yang ditugaskan.
- Data dummy digunakan pada tahap awal sebelum database final selesai.
- Aplikasi dibuat menggunakan React, TypeScript, Cloudflare Workers, dan Cloudflare D1.
- Deployment dilakukan menggunakan Cloudflare tanpa layanan berbayar.

## Batasan
- Proyek harus dapat dikerjakan sebagai proyek akhir mata kuliah Software Engineering.
- Fitur dibuat secara bertahap berdasarkan GitHub Issues.
- Setiap requirement harus dapat dilacak ke design, issue, kode, dan test.
- Aplikasi tidak menggunakan Cloud Functions.
- Fitur tambahan tidak boleh dibuat jika tidak ada dalam requirement.

## Pertanyaan Terbuka
1. Apakah sistem perlu login sederhana, atau role user cukup disimulasikan dengan data dummy?
2. Apakah mahasiswa dan staff memiliki tampilan yang sama sebagai pelapor?
3. Apakah teknisi bisa menolak tugas, atau hanya menerima dan mengerjakan?
4. Apakah laporan yang sudah closed bisa dibuka kembali oleh pelapor atau hanya admin?
5. Apakah dashboard hanya untuk admin, atau juga untuk manajer fasilitas?
6. Apakah prioritas laporan ditentukan manual oleh admin atau otomatis dari kategori?
7. Apakah komentar dapat ditambahkan oleh semua aktor atau hanya aktor tertentu?

## Output Inception
Dokumen ini menjadi dasar awal untuk membuat elicitation questions, functional requirements, non-functional requirements, user stories, business rules, GitHub Issues, design architecture, testing plan, dan traceability matrix.
