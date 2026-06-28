# 03 - Requirements

## Tujuan
Dokumen ini menjelaskan kebutuhan sistem Campus Service Request and Maintenance System. Kebutuhan dibagi menjadi functional requirements, non-functional requirements, dan business rules.

## Functional Requirements

| ID | Requirement | Aktor Utama | Prioritas | Sumber |
|---|---|---|---|---|
| FR-01 | Sistem harus memungkinkan mahasiswa atau staff membuat laporan kerusakan fasilitas kampus. | Pelapor | Must | EQ-01 |
| FR-02 | Sistem harus menyimpan informasi laporan berupa judul, deskripsi, lokasi, kategori, prioritas, status, dan pelapor. | Pelapor | Must | EQ-01 |
| FR-03 | Sistem harus menampilkan daftar laporan yang telah dibuat. | Semua Aktor | Must | EQ-02, EQ-10 |
| FR-04 | Sistem harus menyediakan pencarian laporan berdasarkan kata kunci. | Semua Aktor | Should | EQ-10 |
| FR-05 | Sistem harus menyediakan filter laporan berdasarkan status, kategori, dan prioritas. | Semua Aktor | Should | EQ-10 |
| FR-06 | Sistem harus menampilkan detail laporan termasuk status, komentar, dan riwayat perubahan status. | Semua Aktor | Must | EQ-02 |
| FR-07 | Sistem harus memungkinkan administrator memeriksa laporan yang baru masuk. | Administrator | Must | EQ-06 |
| FR-08 | Sistem harus memungkinkan administrator menentukan atau mengubah prioritas laporan. | Administrator | Must | EQ-07 |
| FR-09 | Sistem harus memungkinkan administrator menugaskan laporan kepada teknisi. | Administrator | Must | EQ-06 |
| FR-10 | Sistem harus memungkinkan teknisi melihat daftar tugas yang ditugaskan kepadanya. | Teknisi | Must | EQ-11 |
| FR-11 | Sistem harus memungkinkan teknisi memperbarui status pekerjaan. | Teknisi | Must | EQ-13 |
| FR-12 | Sistem harus memungkinkan pelapor, administrator, dan teknisi menambahkan komentar atau catatan pada laporan. | Pelapor, Administrator, Teknisi | Should | EQ-03, EQ-14 |
| FR-13 | Sistem harus menyimpan riwayat perubahan status laporan. | Sistem | Must | EQ-13 |
| FR-14 | Sistem harus memungkinkan administrator menutup laporan setelah pekerjaan selesai. | Administrator | Must | EQ-08 |
| FR-15 | Sistem harus memungkinkan laporan dibuka kembali jika masalah belum selesai. | Pelapor, Administrator | Should | EQ-05, EQ-09 |
| FR-16 | Sistem harus menampilkan dashboard sederhana berisi ringkasan jumlah laporan berdasarkan status, prioritas, dan kategori. | Administrator, Manajer Fasilitas | Should | EQ-16 |

## Non-Functional Requirements

| ID | Requirement | Kategori | Prioritas | Sumber |
|---|---|---|---|---|
| NFR-01 | Aplikasi harus dapat diakses melalui browser modern pada desktop dan mobile. | Usability | Must | EQ-24 |
| NFR-02 | Antarmuka harus sederhana, mudah dipahami, dan mendukung alur kerja pelapor, admin, teknisi, dan manajer fasilitas. | Usability | Must | EQ-16 |
| NFR-03 | Aplikasi harus dibangun menggunakan React, TypeScript, Cloudflare Workers, dan Cloudflare D1. | Technology | Must | EQ-19 |
| NFR-04 | Aplikasi harus dapat berjalan pada layanan Cloudflare paket gratis. | Deployment | Must | EQ-24 |
| NFR-05 | Sistem harus menyimpan data laporan secara konsisten agar data tidak hilang setelah halaman di-refresh. | Reliability | Must | EQ-19 |
| NFR-06 | Kode harus dibuat modular agar fitur laporan, status, komentar, dashboard, API, dan data dapat dikembangkan terpisah. | Maintainability | Must | Instruksi dosen |
| NFR-07 | Setiap requirement harus memiliki traceability ke user story, design, issue, kode, dan test. | Process | Must | Instruksi dosen |
| NFR-08 | Tidak boleh ada token, password, atau secret yang disimpan di repository GitHub. | Security | Must | Checklist deployment |

## Business Rules

| ID | Business Rule | Sumber |
|---|---|---|
| BR-01 | Laporan baru selalu dibuat dengan status awal Submitted. | Alur status |
| BR-02 | Laporan hanya dapat berpindah status mengikuti urutan Submitted, Under Review, Assigned, In Progress, Resolved, Closed. | Alur status |
| BR-03 | Hanya administrator yang dapat menentukan prioritas dan menugaskan teknisi. | EQ-06, EQ-07 |
| BR-04 | Teknisi hanya dapat memperbarui laporan yang ditugaskan kepadanya. | EQ-11, EQ-13 |
| BR-05 | Teknisi dapat menandai pekerjaan sebagai Resolved, tetapi tidak dapat menutup laporan. | EQ-15 |
| BR-06 | Administrator dapat menutup laporan setelah pekerjaan selesai atau dikonfirmasi oleh pelapor. | EQ-08 |
| BR-07 | Laporan yang sudah Closed dapat dibuka kembali jika masalah masih terjadi. | EQ-05, EQ-09 |
| BR-08 | Deskripsi laporan harus cukup jelas agar admin dan teknisi memahami masalah. | EQ-01 |

## Data Awal yang Dibutuhkan

| Data | Contoh |
|---|---|
| Kategori | Internet, AC, Peralatan Kelas, Kebersihan, Laboratorium, Lainnya |
| Prioritas | Low, Medium, High, Urgent |
| Status | Submitted, Under Review, Assigned, In Progress, Resolved, Closed |
| Lokasi | Ruang 101, Laboratorium Komputer, Perpustakaan, Aula, Kantin |
| Teknisi | Teknisi AC, Teknisi IT, Teknisi Fasilitas, Teknisi Laboratorium |

## Catatan Human Review
- Mahasiswa harus memeriksa apakah requirement di atas sudah sesuai instruksi dosen.
- Jika ada fitur tambahan yang tidak ada pada scope, fitur tersebut harus ditunda.
- Requirement final akan menjadi dasar GitHub Issues, design, testing, dan traceability matrix.
