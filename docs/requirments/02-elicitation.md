# 02 - Elicitation

## Tujuan
Dokumen ini berisi pertanyaan untuk menggali kebutuhan stakeholder pada sistem Campus Service Request and Maintenance System. Jawaban dari pertanyaan ini akan digunakan sebagai dasar pembuatan functional requirement, non-functional requirement, user story, business rule, dan acceptance criteria.

## Stakeholder
- Mahasiswa
- Staff
- Administrator
- Teknisi
- Manajer Fasilitas

## Pertanyaan untuk Mahasiswa dan Staff

| ID | Pertanyaan | Jawaban / Asumsi Sementara |
|---|---|---|
| EQ-01 | Informasi apa saja yang harus diisi saat membuat laporan? | Judul, deskripsi, lokasi, kategori, dan identitas pelapor. |
| EQ-02 | Apakah pelapor perlu melihat status laporan? | Ya, pelapor harus dapat melihat status laporan yang sudah dibuat. |
| EQ-03 | Apakah pelapor dapat menambahkan komentar? | Ya, pelapor dapat menambahkan komentar jika ada informasi tambahan. |
| EQ-04 | Apakah pelapor dapat mengonfirmasi pekerjaan selesai? | Ya, pelapor dapat mengonfirmasi jika masalah sudah benar-benar selesai. |
| EQ-05 | Apakah pelapor dapat membuka kembali laporan? | Ya, jika masalah belum selesai setelah ditandai resolved. |

## Pertanyaan untuk Administrator

| ID | Pertanyaan | Jawaban / Asumsi Sementara |
|---|---|---|
| EQ-06 | Apa yang dilakukan admin setelah laporan masuk? | Admin memeriksa laporan, menentukan kategori dan prioritas, lalu menugaskan teknisi. |
| EQ-07 | Apakah admin dapat mengubah prioritas laporan? | Ya, admin dapat menentukan prioritas low, medium, high, atau urgent. |
| EQ-08 | Apakah admin dapat menutup laporan? | Ya, admin dapat menutup laporan setelah pekerjaan selesai dan dikonfirmasi. |
| EQ-09 | Apakah admin dapat membuka kembali laporan? | Ya, admin dapat membuka kembali laporan jika masalah masih terjadi. |
| EQ-10 | Apakah admin perlu melihat semua laporan? | Ya, admin perlu melihat semua laporan dari semua pelapor. |

## Pertanyaan untuk Teknisi

| ID | Pertanyaan | Jawaban / Asumsi Sementara |
|---|---|---|
| EQ-11 | Apa yang perlu dilihat teknisi? | Teknisi perlu melihat daftar tugas yang ditugaskan kepadanya. |
| EQ-12 | Apakah teknisi dapat menerima tugas? | Ya, teknisi dapat menerima tugas sebelum mengerjakan. |
| EQ-13 | Apakah teknisi dapat mengubah status pekerjaan? | Ya, teknisi dapat mengubah status menjadi in progress dan resolved. |
| EQ-14 | Apakah teknisi dapat menambahkan catatan pekerjaan? | Ya, teknisi dapat menambahkan catatan progres atau hasil pekerjaan. |
| EQ-15 | Apakah teknisi dapat menutup laporan? | Tidak, penutupan laporan dilakukan oleh administrator. |

## Pertanyaan untuk Manajer Fasilitas

| ID | Pertanyaan | Jawaban / Asumsi Sementara |
|---|---|---|
| EQ-16 | Informasi apa yang perlu dilihat manajer fasilitas? | Ringkasan jumlah laporan, status laporan, prioritas, dan kategori masalah. |
| EQ-17 | Apakah manajer fasilitas perlu mengubah data laporan? | Tidak, manajer fasilitas hanya melihat dashboard dan laporan ringkas. |
| EQ-18 | Apakah dashboard perlu grafik kompleks? | Tidak, dashboard sederhana cukup untuk tahap awal. |

## Pertanyaan Teknis

| ID | Pertanyaan | Jawaban / Asumsi Sementara |
|---|---|---|
| EQ-19 | Apakah aplikasi menggunakan database? | Ya, menggunakan Cloudflare D1 pada tahap deployment. |
| EQ-20 | Apakah tahap awal boleh menggunakan dummy data? | Ya, dummy data digunakan untuk desain awal dan testing. |
| EQ-21 | Apakah aplikasi membutuhkan upload foto? | Tidak wajib untuk scope awal. |
| EQ-22 | Apakah aplikasi membutuhkan login Google? | Tidak wajib untuk scope awal. Role dapat disimulasikan terlebih dahulu. |
| EQ-23 | Apakah aplikasi menggunakan Cloud Functions? | Tidak, aplikasi menggunakan Cloudflare Workers dan Pages. |
| EQ-24 | Apakah aplikasi harus gratis? | Ya, menggunakan layanan Cloudflare pada paket gratis. |

## Keputusan Awal
1. Sistem akan memiliki empat aktor utama: pelapor, administrator, teknisi, dan manajer fasilitas.
2. Mahasiswa dan staff digabung sebagai pelapor.
3. Aplikasi menggunakan data dummy pada tahap awal.
4. Fitur upload foto, email notification, QR code, dan login Google tidak dikerjakan pada scope awal.
5. Status laporan mengikuti alur: Submitted, Under Review, Assigned, In Progress, Resolved, Closed.
6. Setiap requirement harus dapat dilacak ke user story, design, GitHub issue, kode, dan test.

## Output Elicitation
Hasil dari elicitation ini akan digunakan untuk membuat:
- functional requirements
- non-functional requirements
- business rules
- user stories
- acceptance criteria
- traceability matrix