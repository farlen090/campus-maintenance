# AI Usage Log

## Tujuan Dokumen
Dokumen ini mencatat penggunaan AI dalam proyek **Campus Service Request and Maintenance System**. AI digunakan sebagai alat bantu, tetapi hasil akhir tetap harus direview, dipahami, dan disetujui oleh mahasiswa.

Dokumen ini mendukung prinsip:

- AI boleh membantu.
- Mahasiswa tetap melakukan review.
- Setiap hasil AI harus bisa ditelusuri ke requirement, design, issue, test, dan deployment.

## Pernyataan Penggunaan AI
AI digunakan untuk membantu:

1. Menyusun draft dokumen requirements.
2. Menyusun draft architecture design.
3. Menyusun draft database dan API design.
4. Menyusun draft UI flow dan wireframe.
5. Menyusun draft GitHub issues plan.
6. Menyusun draft test plan.
7. Menyusun draft deployment plan.
8. Menyusun evidence penggunaan AI.

AI tidak digunakan sebagai pengganti pemahaman mahasiswa. Mahasiswa tetap bertanggung jawab untuk membaca, memeriksa, mengubah jika perlu, menjalankan test, dan memastikan hasil akhir sesuai instruksi dosen.

## Log Penggunaan AI

| Tanggal | Aktivitas | Output | Status Review Mahasiswa |
|---|---|---|---|
| 2026-06-28 | Membantu memahami instruksi proyek Software Engineering dari file dosen. | Ringkasan kebutuhan proyek dari Requirements Engineering sampai Deployment Cloudflare. | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun dokumen inception. | `docs/requierments/01-inception.md` | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun elicitation. | `docs/requierments/02-elicitation.md` | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun functional requirement, non-functional requirement, dan business rule. | `docs/requierments/03-requirements.md` | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun user stories dan acceptance criteria. | `docs/requierments/04-user-stories.md` | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun prioritization. | `docs/requierments/05-prioritization.md` | Perlu review mahasiswa. |
| 2026-06-28 | Membantu menyusun validation, change request, dan traceability awal. | `docs/requierments/06-traceability.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun architecture design. | `docs/design/01-architecture-design.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun database dan API design. | `docs/design/02-database-api-design.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun UI flow dan wireframe. | `docs/design/03-ui-flow-wireframe.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun GitHub issues plan. | `docs/planning/github-issues.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun test plan. | `docs/testing/test-plan.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun deployment plan Cloudflare. | `docs/deployment/deployment-plan.md` | Perlu review mahasiswa. |
| 2026-06-29 | Membantu menyusun AI usage evidence. | `evidence/ai-usage-log.md` | Perlu review mahasiswa. |

## Bagian yang Harus Direview Mahasiswa
Mahasiswa perlu melakukan review pada:

1. Apakah requirement sudah sesuai instruksi dosen.
2. Apakah scope tidak memasukkan fitur non-wajib.
3. Apakah role user sudah sesuai studi kasus.
4. Apakah alur status sudah benar.
5. Apakah issue plan realistis untuk dikerjakan.
6. Apakah test plan mencakup minimal 20 automated test.
7. Apakah deployment plan benar-benar menggunakan Cloudflare Pages, Workers, dan D1.
8. Apakah tidak ada secret/token di repository.
9. Apakah dokumen menggunakan bahasa yang rapi dan bisa dijelaskan saat presentasi.

## Keputusan yang Dibuat oleh Mahasiswa
Keputusan proyek yang perlu dikonfirmasi oleh mahasiswa:

| Keputusan | Alasan |
|---|---|
| Menggunakan role selector/dummy role pada tahap awal. | Login Google tidak wajib dan dapat menambah kompleksitas. |
| Menggunakan dummy data sebelum D1 penuh. | Tahap awal fokus pada requirement, design, dan UI workflow. |
| Tidak membuat upload foto pada scope awal. | Upload foto tidak wajib menurut scope awal. |
| Tidak menggunakan Cloud Functions. | Proyek menggunakan Cloudflare Workers sebagai backend/API. |
| Membuat modular/deep modular. | Memenuhi requirement maintainability dan memudahkan traceability. |

## Contoh Pernyataan untuk Presentasi
Jika ditanya dosen tentang AI, jawaban yang dapat digunakan:

> Saya menggunakan AI sebagai alat bantu untuk menyusun draft dokumentasi, issue plan, test plan, dan deployment plan. Namun saya tetap membaca dan mereview hasilnya. Keputusan scope, teknologi, dan implementasi tetap mengikuti instruksi tugas, yaitu React, TypeScript, Cloudflare Workers, Cloudflare Pages, dan Cloudflare D1. AI tidak digunakan untuk menggantikan pemahaman, tetapi untuk mempercepat penyusunan dokumen yang kemudian saya validasi.

## Batasan Penggunaan AI
AI tidak boleh:

1. Memasukkan fitur di luar requirement tanpa persetujuan.
2. Menyimpan token, password, atau secret ke repository.
3. Menghapus perubahan mahasiswa tanpa izin.
4. Menggantikan review mahasiswa.
5. Mengklaim deployment berhasil sebelum benar-benar dilakukan.

## Status Review
Status saat ini:

- Draft requirements: sudah dibuat, perlu review akhir mahasiswa.
- Draft design: sudah dibuat, perlu review akhir mahasiswa.
- Draft planning issues: sudah dibuat, perlu review akhir mahasiswa.
- Draft test plan: sudah dibuat, perlu review akhir mahasiswa.
- Draft deployment plan: sudah dibuat, perlu review akhir mahasiswa.
- Coding: belum dimulai pada tahap dokumen ini.
- Deployment: belum dilakukan pada tahap dokumen ini.

## Catatan Akhir
Dokumen ini harus diperbarui jika AI kembali digunakan pada tahap coding, testing, debugging, atau deployment. Setiap penggunaan AI sebaiknya dicatat agar proses pengerjaan transparan dan dapat dipertanggungjawabkan.
