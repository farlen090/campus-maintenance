# 05 - Prioritization

## Tujuan
Dokumen ini menentukan prioritas requirement dan user story agar pekerjaan dapat dilakukan bertahap. Prioritas menggunakan kategori Must, Should, Could, dan Won't untuk scope awal.

## Metode Prioritas
- Must: wajib dikerjakan agar sistem inti berjalan.
- Should: penting, tetapi bisa dikerjakan setelah fitur inti.
- Could: berguna, tetapi tidak wajib untuk versi awal.
- Won't: tidak dikerjakan pada scope awal.

## Prioritas Functional Requirements

| ID | Requirement Singkat | Prioritas | Alasan |
|---|---|---|---|
| FR-01 | Membuat laporan baru | Must | Fitur utama sistem. |
| FR-02 | Menyimpan informasi laporan | Must | Data laporan harus tersimpan. |
| FR-03 | Melihat daftar laporan | Must | Pengguna perlu melihat laporan yang masuk. |
| FR-04 | Mencari laporan | Should | Membantu penggunaan ketika data bertambah. |
| FR-05 | Filter laporan | Should | Membantu admin dan manajer menganalisis laporan. |
| FR-06 | Melihat detail laporan | Must | Dibutuhkan untuk memahami isi laporan. |
| FR-07 | Memeriksa laporan | Must | Admin harus memproses laporan baru. |
| FR-08 | Menentukan prioritas | Must | Admin harus memilah tingkat kepentingan laporan. |
| FR-09 | Menugaskan teknisi | Must | Laporan perlu pihak yang bertanggung jawab. |
| FR-10 | Teknisi melihat tugas | Must | Teknisi perlu daftar pekerjaan. |
| FR-11 | Teknisi update status | Must | Progres pekerjaan harus terlihat. |
| FR-12 | Menambahkan komentar | Should | Berguna untuk komunikasi dan catatan tambahan. |
| FR-13 | Menyimpan riwayat status | Must | Dibutuhkan untuk traceability proses laporan. |
| FR-14 | Menutup laporan | Must | Siklus laporan harus bisa selesai. |
| FR-15 | Membuka kembali laporan | Should | Berguna jika masalah belum selesai. |
| FR-16 | Dashboard sederhana | Should | Dibutuhkan untuk ringkasan dan presentasi. |

## Prioritas User Stories

| ID | User Story | Prioritas | Rencana Issue |
|---|---|---|---|
| US-01 | Membuat laporan baru | Must | Issue 01 |
| US-02 | Melihat daftar laporan | Must | Issue 02 |
| US-05 | Melihat detail laporan | Must | Issue 03 |
| US-06 | Memeriksa laporan | Must | Issue 04 |
| US-07 | Menentukan prioritas | Must | Issue 05 |
| US-08 | Menugaskan teknisi | Must | Issue 06 |
| US-09 | Melihat tugas teknisi | Must | Issue 07 |
| US-10 | Memperbarui status pekerjaan | Must | Issue 08 |
| US-12 | Menutup laporan | Must | Issue 09 |
| US-03 | Mencari laporan | Should | Issue 10 |
| US-04 | Menyaring laporan | Should | Issue 11 |
| US-11 | Menambahkan komentar | Should | Issue 12 |
| US-13 | Membuka kembali laporan | Should | Issue 13 |
| US-14 | Melihat dashboard | Should | Issue 14 |

## Minimum Viable Product
Versi awal aplikasi harus memiliki fitur berikut:
1. Membuat laporan baru.
2. Melihat daftar laporan.
3. Melihat detail laporan.
4. Admin memeriksa laporan.
5. Admin menentukan prioritas.
6. Admin menugaskan teknisi.
7. Teknisi memperbarui status.
8. Riwayat status tersimpan.
9. Admin menutup laporan.
10. Data tersimpan dan dapat dibuka kembali setelah refresh.

## Fitur Setelah MVP
Fitur berikut dikerjakan setelah MVP stabil:
1. Pencarian laporan.
2. Filter laporan.
3. Komentar atau catatan.
4. Membuka kembali laporan.
5. Dashboard sederhana.

## Fitur Tidak Dikerjakan Pada Scope Awal
1. Upload foto.
2. Email notification.
3. Login Google.
4. QR code ruangan.
5. AI otomatis untuk kategori.
6. Inventory spare part.
7. Vendor management.

## Risiko dan Keputusan

| Risiko | Dampak | Keputusan |
|---|---|---|
| Waktu pengerjaan terbatas | Fitur bisa tidak selesai | Kerjakan Must terlebih dahulu. |
| Integrasi database terlambat | Data belum persisten | Gunakan dummy data saat desain awal, lalu pindah ke D1. |
| Fitur terlalu banyak | Scope melebar | Fitur non-wajib ditunda. |
| Role user belum memakai login asli | Hak akses belum realistis | Role disimulasikan untuk scope awal dan dijelaskan di limitation. |

## Catatan Human Review
Mahasiswa perlu memeriksa apakah prioritas ini sesuai dengan instruksi dosen dan kapasitas waktu pengerjaan. Jika waktu terbatas, fitur Must harus selesai lebih dulu sebelum fitur Should.
