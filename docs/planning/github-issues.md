# GitHub Issues Plan

## Tujuan Dokumen
Dokumen ini berisi rencana GitHub Issues untuk proyek **Campus Service Request and Maintenance System**. Setiap issue dibuat agar pekerjaan dapat ditelusuri dari requirement, user story, design, kode, test, pull request, sampai deployment.

Dokumen terkait:

- Requirements: `docs/requierments/03-requirements.md`
- User Stories: `docs/requierments/04-user-stories.md`
- Architecture Design: `docs/design/01-architecture-design.md`
- Database and API Design: `docs/design/02-database-api-design.md`
- UI Flow and Wireframe: `docs/design/03-ui-flow-wireframe.md`
- Test Plan: `docs/testing/test-plan.md`
- Deployment Plan: `docs/deployment/deployment-plan.md`

## Strategi Issue
Issue dibagi berdasarkan modul agar proyek tetap modular dan mudah diuji.

Prinsip:

1. Satu issue fokus pada satu bagian pekerjaan.
2. Setiap issue memiliki requirement dan user story yang jelas.
3. Setiap issue memiliki acceptance checklist.
4. Setiap issue diarahkan ke automated test.
5. Pull request dibuat berdasarkan kelompok issue yang saling berhubungan.

## Label yang Digunakan

| Label | Keterangan |
|---|---|
| `type:docs` | Pekerjaan dokumentasi. |
| `type:frontend` | Pekerjaan React dan TypeScript. |
| `type:backend` | Pekerjaan Cloudflare Workers API. |
| `type:database` | Pekerjaan Cloudflare D1 dan schema. |
| `type:test` | Pekerjaan automated test. |
| `type:deployment` | Pekerjaan deployment Cloudflare. |
| `priority:must` | Wajib untuk MVP. |
| `priority:should` | Penting tetapi dapat dilakukan setelah MVP dasar. |
| `status:ready` | Siap dikerjakan. |
| `status:blocked` | Terhambat oleh pekerjaan lain. |

## Milestone

| Milestone | Tujuan |
|---|---|
| M1 - Documentation and Planning | Requirements, design, issue plan, test plan, deployment plan, dan evidence AI. |
| M2 - Frontend Dummy MVP | UI React dengan dummy data untuk laporan, detail, status, dan dashboard sederhana. |
| M3 - Worker API and D1 | API Cloudflare Workers dan database Cloudflare D1. |
| M4 - Testing and Traceability | Automated test minimal 20 dan traceability evidence. |
| M5 - Cloudflare Deployment | Deployment ke Cloudflare Pages, Workers, dan D1. |

## Daftar Issue

### ISSUE-01 - Setup Struktur Project React TypeScript

**Tipe:** Frontend  
**Prioritas:** Must  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** NFR-01, NFR-02, NFR-03, NFR-06, NFR-07  
**User Story:** Semua user story sebagai fondasi UI  
**Design Reference:** `docs/design/01-architecture-design.md`

Deskripsi:

Menyiapkan struktur frontend React + TypeScript sesuai rancangan modular.

Scope:

- Membuat struktur `src/app`, `src/features`, dan `src/shared`.
- Menyiapkan route dasar aplikasi.
- Menyiapkan layout utama.
- Menyiapkan role selector dummy.

Acceptance Checklist:

- Struktur folder frontend mengikuti architecture design.
- Aplikasi dapat dijalankan secara lokal.
- Layout dasar memiliki navigasi utama.
- Role selector tersedia untuk simulasi role.

Test Reference:

- TC-001
- TC-002
- TC-003

Rencana PR: PR-01 - Frontend foundation and dummy app shell.

---

### ISSUE-02 - Implementasi Data Model dan Dummy Data

**Tipe:** Frontend  
**Prioritas:** Must  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-02, NFR-05, NFR-06  
**User Story:** US-01, US-02, US-05  
**Design Reference:** `docs/design/02-database-api-design.md`

Deskripsi:

Membuat tipe data TypeScript dan dummy data awal untuk user, laporan, komentar, dan status history.

Scope:

- Membuat type `User`, `ServiceRequest`, `RequestComment`, dan `StatusHistory`.
- Membuat constants kategori, prioritas, status, dan role.
- Membuat dummy data awal.
- Menyimpan struktur agar siap dipindah ke API/D1.

Acceptance Checklist:

- Type data sesuai rancangan database.
- Dummy data mencakup minimal beberapa role user.
- Dummy data mencakup beberapa status laporan.
- Tidak ada token atau secret di data dummy.

Test Reference:

- TC-004
- TC-005
- TC-006

Rencana PR: PR-01 - Frontend foundation and dummy app shell.

---

### ISSUE-03 - Form Membuat Laporan Baru

**Tipe:** Frontend  
**Prioritas:** Must  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-01, FR-02, FR-13, BR-01  
**User Story:** US-01  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat halaman form laporan baru untuk mahasiswa dan staff.

Scope:

- Field judul, deskripsi, lokasi, dan kategori.
- Validasi field wajib.
- Laporan baru otomatis berstatus `Submitted`.
- Status awal dicatat ke status history.

Acceptance Checklist:

- Pelapor dapat mengisi form laporan.
- Sistem menolak form jika field wajib kosong.
- Laporan baru memiliki status `Submitted`.
- Status history awal tersimpan.

Test Reference:

- TC-007
- TC-008
- TC-009

Rencana PR: PR-02 - Report creation and report list UI.

---

### ISSUE-04 - Daftar Laporan, Search, dan Filter

**Tipe:** Frontend  
**Prioritas:** Must dan Should  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-03, FR-04, FR-05  
**User Story:** US-02, US-03, US-04  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat halaman daftar laporan yang mendukung pencarian dan filter.

Scope:

- Menampilkan ID, judul, lokasi, kategori, prioritas, status, dan teknisi.
- Search berdasarkan judul atau lokasi.
- Filter berdasarkan status, kategori, dan prioritas.
- Empty state jika data tidak ditemukan.

Acceptance Checklist:

- Daftar laporan tampil dari dummy data.
- Search menemukan laporan berdasarkan judul atau lokasi.
- Filter status, kategori, dan prioritas berjalan.
- Pesan data tidak ditemukan tampil jika hasil kosong.

Test Reference:

- TC-010
- TC-011
- TC-012
- TC-013

Rencana PR: PR-02 - Report creation and report list UI.

---

### ISSUE-05 - Detail Laporan, Komentar, dan Riwayat Status

**Tipe:** Frontend  
**Prioritas:** Must dan Should  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-06, FR-12, FR-13  
**User Story:** US-05, US-11  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat halaman detail laporan yang menampilkan informasi lengkap, komentar, dan riwayat status.

Scope:

- Menampilkan detail laporan.
- Menampilkan komentar/catatan.
- Menambahkan komentar baru.
- Menampilkan status history secara urut.

Acceptance Checklist:

- Detail laporan dapat dibuka dari daftar.
- Riwayat status tampil pada detail.
- Komentar menampilkan pembuat, isi, dan waktu.
- User dapat menambahkan komentar sesuai role yang disimulasikan.

Test Reference:

- TC-014
- TC-015
- TC-016

Rencana PR: PR-03 - Report detail, comments, and history.

---

### ISSUE-06 - Admin Review, Priority, dan Assign Teknisi

**Tipe:** Frontend  
**Prioritas:** Must  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-07, FR-08, FR-09, FR-13, BR-03, BR-04  
**User Story:** US-06, US-07, US-08  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat aksi admin untuk review laporan, menentukan prioritas, dan menugaskan teknisi.

Scope:

- Tombol review untuk laporan `Submitted`.
- Pilihan prioritas.
- Pilihan teknisi.
- Status berubah menjadi `Assigned` setelah teknisi dipilih.
- Status history tercatat.

Acceptance Checklist:

- Hanya role admin yang melihat aksi review dan assign.
- Review mengubah status menjadi `Under Review`.
- Assign mengisi teknisi dan mengubah status menjadi `Assigned`.
- Riwayat status bertambah setelah perubahan.

Test Reference:

- TC-017
- TC-018
- TC-019
- TC-020

Rencana PR: PR-04 - Admin workflow.

---

### ISSUE-07 - Teknisi Melihat Tugas dan Update Status

**Tipe:** Frontend  
**Prioritas:** Must  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-10, FR-11, FR-12, FR-13, BR-05, BR-06  
**User Story:** US-09, US-10, US-11  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat halaman tugas teknisi dan aksi update status pekerjaan.

Scope:

- Menampilkan tugas berdasarkan teknisi aktif.
- Teknisi dapat mengubah `Assigned` menjadi `In Progress`.
- Teknisi dapat mengubah `In Progress` menjadi `Resolved`.
- Teknisi dapat menambahkan catatan pekerjaan.

Acceptance Checklist:

- Teknisi hanya melihat tugas yang ditugaskan kepadanya.
- Status dapat berubah sesuai aturan.
- Perubahan status tersimpan ke status history.
- Catatan pekerjaan tersimpan sebagai komentar bertipe `work_note`.

Test Reference:

- TC-021
- TC-022
- TC-023
- TC-024

Rencana PR: PR-05 - Technician workflow and status update.

---

### ISSUE-08 - Admin Close dan Reopen Laporan

**Tipe:** Frontend  
**Prioritas:** Must dan Should  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-14, FR-15, FR-13, BR-07, BR-08  
**User Story:** US-12, US-13  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat aksi close dan reopen laporan.

Scope:

- Admin dapat close laporan `Resolved`.
- Pelapor atau admin dapat reopen laporan `Closed`.
- Reopen wajib memiliki alasan.
- Status history mencatat close dan reopen.

Acceptance Checklist:

- Close hanya tampil untuk admin.
- Laporan closed tetap dapat dilihat.
- Reopen meminta alasan.
- Setelah reopen, status berubah menjadi `Under Review`.

Test Reference:

- TC-025
- TC-026
- TC-027

Rencana PR: PR-05 - Technician workflow and status update.

---

### ISSUE-09 - Dashboard Ringkasan

**Tipe:** Frontend  
**Prioritas:** Should  
**Milestone:** M2 - Frontend Dummy MVP  
**Requirement:** FR-16  
**User Story:** US-14  
**Design Reference:** `docs/design/03-ui-flow-wireframe.md`

Deskripsi:

Membuat dashboard sederhana untuk admin dan manajer fasilitas.

Scope:

- Total laporan.
- Ringkasan berdasarkan status.
- Ringkasan berdasarkan kategori.
- Ringkasan berdasarkan prioritas.
- Daftar laporan terbaru.

Acceptance Checklist:

- Dashboard menampilkan total laporan.
- Dashboard menampilkan jumlah laporan berdasarkan status.
- Dashboard menampilkan ringkasan kategori dan prioritas.
- Dashboard mudah dibaca pada desktop dan mobile.

Test Reference:

- TC-028
- TC-029
- TC-030

Rencana PR: PR-06 - Dashboard and frontend polish.

---

### ISSUE-10 - Cloudflare Workers API

**Tipe:** Backend  
**Prioritas:** Must  
**Milestone:** M3 - Worker API and D1  
**Requirement:** FR-01 sampai FR-16, NFR-03, NFR-06  
**User Story:** US-01 sampai US-14  
**Design Reference:** `docs/design/02-database-api-design.md`

Deskripsi:

Membuat endpoint API menggunakan Cloudflare Workers sesuai desain API.

Scope:

- `GET /api/health`
- `GET /api/requests`
- `POST /api/requests`
- `GET /api/requests/:id`
- `PATCH /api/requests/:id/review`
- `PATCH /api/requests/:id/assign`
- `PATCH /api/requests/:id/status`
- `POST /api/requests/:id/comments`
- `GET /api/dashboard/summary`

Acceptance Checklist:

- Semua endpoint utama tersedia.
- Response sukses menggunakan format konsisten.
- Response error menggunakan format konsisten.
- Validasi input dasar tersedia.

Test Reference:

- TC-031 sampai TC-040

Rencana PR: PR-07 - Worker API implementation.

---

### ISSUE-11 - Cloudflare D1 Schema dan Seed Data

**Tipe:** Database  
**Prioritas:** Must  
**Milestone:** M3 - Worker API and D1  
**Requirement:** FR-02, FR-12, FR-13, NFR-05  
**User Story:** US-01, US-05, US-11  
**Design Reference:** `docs/design/02-database-api-design.md`

Deskripsi:

Membuat schema Cloudflare D1 untuk user, laporan, komentar, dan status history.

Scope:

- Tabel `users`.
- Tabel `service_requests`.
- Tabel `request_comments`.
- Tabel `status_histories`.
- Seed data untuk user dan laporan awal.

Acceptance Checklist:

- Schema sesuai database design.
- Relasi antar tabel tersedia.
- Seed data dapat dijalankan.
- Data tetap tersimpan setelah refresh dan restart lokal.

Test Reference:

- TC-041
- TC-042
- TC-043

Rencana PR: PR-08 - D1 schema and persistence.

---

### ISSUE-12 - Automated Test Minimal 20

**Tipe:** Test  
**Prioritas:** Must  
**Milestone:** M4 - Testing and Traceability  
**Requirement:** NFR-06, NFR-07  
**User Story:** US-01 sampai US-14  
**Design Reference:** `docs/testing/test-plan.md`

Deskripsi:

Membuat automated test untuk memastikan requirement utama berjalan.

Scope:

- Unit test validation.
- Unit test business rule status.
- Component test UI penting.
- API test untuk endpoint utama.
- Dashboard summary test.

Acceptance Checklist:

- Minimal 20 automated test tersedia.
- Test dapat dijalankan lokal.
- Test mengacu ke test plan.
- Hasil test didokumentasikan di evidence.

Test Reference:

- TC-001 sampai TC-043

Rencana PR: PR-09 - Automated tests and traceability evidence.

---

### ISSUE-13 - Deployment Cloudflare Pages, Workers, dan D1

**Tipe:** Deployment  
**Prioritas:** Must  
**Milestone:** M5 - Cloudflare Deployment  
**Requirement:** NFR-03, NFR-04, NFR-08  
**User Story:** Semua user story yang sudah selesai  
**Design Reference:** `docs/deployment/deployment-plan.md`

Deskripsi:

Melakukan deployment frontend ke Cloudflare Pages, API ke Cloudflare Workers, dan database ke Cloudflare D1.

Scope:

- Konfigurasi `wrangler.jsonc`.
- D1 database binding.
- Build frontend.
- Deploy Cloudflare Pages.
- Deploy Worker.
- Dokumentasi URL publik.

Acceptance Checklist:

- Frontend memiliki URL publik.
- API health check berjalan.
- Tidak ada secret di repository.
- Deployment steps terdokumentasi.

Test Reference:

- TC-044
- TC-045
- TC-046

Rencana PR: PR-10 - Cloudflare deployment configuration.

## Rencana Pull Request

| PR | Isi | Issue Terkait |
|---|---|---|
| PR-01 | Frontend foundation, struktur modular, role selector, dummy data awal. | ISSUE-01, ISSUE-02 |
| PR-02 | Form buat laporan, daftar laporan, search, dan filter. | ISSUE-03, ISSUE-04 |
| PR-03 | Detail laporan, komentar, dan status history. | ISSUE-05 |
| PR-04 | Admin review, priority, dan assign teknisi. | ISSUE-06 |
| PR-05 | Teknisi update status, close, dan reopen laporan. | ISSUE-07, ISSUE-08 |
| PR-06 | Dashboard ringkasan dan polish UI responsif. | ISSUE-09 |
| PR-07 | Cloudflare Workers API. | ISSUE-10 |
| PR-08 | Cloudflare D1 schema, migration, dan seed. | ISSUE-11 |
| PR-09 | Automated test dan evidence traceability. | ISSUE-12 |
| PR-10 | Deployment Cloudflare dan dokumentasi URL publik. | ISSUE-13 |

## Traceability Issue ke Requirement

| Issue | Requirement | User Story | Design | Test |
|---|---|---|---|---|
| ISSUE-01 | NFR-01, NFR-02, NFR-03, NFR-06, NFR-07 | Semua | 01 Architecture | TC-001 sampai TC-003 |
| ISSUE-02 | FR-02, NFR-05, NFR-06 | US-01, US-02, US-05 | 02 Database API | TC-004 sampai TC-006 |
| ISSUE-03 | FR-01, FR-02, FR-13, BR-01 | US-01 | 03 UI Flow | TC-007 sampai TC-009 |
| ISSUE-04 | FR-03, FR-04, FR-05 | US-02, US-03, US-04 | 03 UI Flow | TC-010 sampai TC-013 |
| ISSUE-05 | FR-06, FR-12, FR-13 | US-05, US-11 | 03 UI Flow | TC-014 sampai TC-016 |
| ISSUE-06 | FR-07, FR-08, FR-09, FR-13 | US-06, US-07, US-08 | 03 UI Flow | TC-017 sampai TC-020 |
| ISSUE-07 | FR-10, FR-11, FR-12, FR-13 | US-09, US-10, US-11 | 03 UI Flow | TC-021 sampai TC-024 |
| ISSUE-08 | FR-14, FR-15, FR-13 | US-12, US-13 | 03 UI Flow | TC-025 sampai TC-027 |
| ISSUE-09 | FR-16 | US-14 | 03 UI Flow | TC-028 sampai TC-030 |
| ISSUE-10 | FR-01 sampai FR-16, NFR-03, NFR-06 | US-01 sampai US-14 | 02 Database API | TC-031 sampai TC-040 |
| ISSUE-11 | FR-02, FR-12, FR-13, NFR-05 | US-01, US-05, US-11 | 02 Database API | TC-041 sampai TC-043 |
| ISSUE-12 | NFR-06, NFR-07 | US-01 sampai US-14 | Test Plan | TC-001 sampai TC-043 |
| ISSUE-13 | NFR-03, NFR-04, NFR-08 | Semua selesai | Deployment Plan | TC-044 sampai TC-046 |

## Catatan untuk Eksekusi
Coding dimulai setelah dokumen planning, test plan, deployment plan, dan evidence AI selesai direview. Implementasi dilakukan per issue dan setiap PR wajib menyebutkan issue serta requirement yang dikerjakan.
