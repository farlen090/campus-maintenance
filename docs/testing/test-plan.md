# Test Plan

## Tujuan Dokumen
Dokumen ini menjelaskan rencana pengujian untuk **Campus Service Request and Maintenance System**. Test plan dibuat agar requirement dapat dibuktikan melalui automated test dan manual verification saat deployment.

Dokumen terkait:

- Requirements: `docs/requierments/03-requirements.md`
- User Stories: `docs/requierments/04-user-stories.md`
- GitHub Issues: `docs/planning/github-issues.md`
- Architecture Design: `docs/design/01-architecture-design.md`
- Database and API Design: `docs/design/02-database-api-design.md`
- UI Flow and Wireframe: `docs/design/03-ui-flow-wireframe.md`

## Strategi Pengujian
Pengujian dibagi menjadi beberapa level:

| Level Test | Tujuan |
|---|---|
| Unit Test | Menguji fungsi kecil seperti validasi, filter, search, dan business rule status. |
| Component Test | Menguji komponen UI penting seperti form laporan, daftar laporan, dan dashboard. |
| API Test | Menguji endpoint Cloudflare Workers. |
| Integration Test | Menguji alur dari aksi user ke perubahan data. |
| Deployment Smoke Test | Mengecek aplikasi dan API setelah deployment. |

## Tools yang Direncanakan

| Area | Tool |
|---|---|
| Unit dan component test frontend | Vitest, React Testing Library |
| API test worker | Vitest atau Miniflare-compatible testing |
| Coverage dasar | Vitest coverage |
| Manual smoke test deployment | Browser dan endpoint health check |

## Scope Pengujian

Yang diuji:

- Membuat laporan.
- Menampilkan daftar laporan.
- Search dan filter.
- Detail laporan.
- Review admin.
- Menentukan prioritas.
- Assign teknisi.
- Tugas teknisi.
- Update status.
- Komentar/catatan.
- Status history.
- Close dan reopen.
- Dashboard.
- API response.
- D1 schema dan persistence.
- Deployment smoke test.

Tidak diuji pada scope awal:

- Upload foto.
- Email notification.
- Login Google.
- QR code ruangan.
- AI kategori.
- Inventory spare part.
- Vendor management.
- Cloud Functions.

## Test Data

Test data mengikuti dummy data awal:

| Data | Nilai |
|---|---|
| Status | Submitted, Under Review, Assigned, In Progress, Resolved, Closed |
| Prioritas | Low, Medium, High, Urgent |
| Kategori | Internet, AC, Peralatan Kelas, Kebersihan, Laboratorium, Lainnya |
| Role | student, staff, admin, technician, facility_manager |
| User Admin | USR-003 |
| User Teknisi | USR-004 |
| User Pelapor | USR-001 |

## Automated Test Cases

### Frontend Foundation

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-001 | Render app shell | NFR-01, NFR-02 | Semua | Layout utama tampil tanpa error. |
| TC-002 | Render navigasi utama | NFR-02 | Semua | Menu Dashboard, Daftar Laporan, Buat Laporan, dan Tugas Teknisi tampil. |
| TC-003 | Role selector mengubah role aktif | NFR-06 | Semua | Role aktif berubah sesuai pilihan user. |

### Data Model dan Dummy Data

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-004 | Dummy users memiliki role valid | FR-02 | US-01 | Semua user dummy memiliki role yang dikenal sistem. |
| TC-005 | Dummy requests memiliki status valid | FR-02 | US-02 | Semua laporan dummy memiliki status yang valid. |
| TC-006 | Constants status mengikuti alur bisnis | BR-02 | US-10 | Urutan status sesuai Submitted sampai Closed. |

### Form Membuat Laporan

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-007 | Submit laporan valid | FR-01, FR-02 | US-01 | Laporan baru berhasil dibuat. |
| TC-008 | Validasi field wajib | FR-01, FR-02 | US-01 | Sistem menolak submit jika field wajib kosong. |
| TC-009 | Status awal laporan baru | FR-13, BR-01 | US-01 | Laporan baru berstatus Submitted dan memiliki status history awal. |

### Daftar Laporan, Search, dan Filter

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-010 | Menampilkan daftar laporan | FR-03 | US-02 | Daftar laporan menampilkan ID, judul, lokasi, kategori, prioritas, dan status. |
| TC-011 | Search berdasarkan judul | FR-04 | US-03 | Search mengembalikan laporan dengan judul yang cocok. |
| TC-012 | Search berdasarkan lokasi | FR-04 | US-03 | Search mengembalikan laporan dengan lokasi yang cocok. |
| TC-013 | Filter status, kategori, prioritas | FR-05 | US-04 | Filter mengembalikan data sesuai kriteria. |

### Detail, Komentar, dan Riwayat Status

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-014 | Detail laporan tampil lengkap | FR-06 | US-05 | Detail menampilkan informasi laporan yang dipilih. |
| TC-015 | Status history tampil | FR-13 | US-05 | Riwayat status tampil pada halaman detail. |
| TC-016 | Tambah komentar | FR-12 | US-11 | Komentar baru tampil dengan pembuat, isi, dan waktu. |

### Admin Workflow

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-017 | Admin review laporan Submitted | FR-07, FR-13 | US-06 | Status berubah dari Submitted menjadi Under Review. |
| TC-018 | Admin menentukan prioritas | FR-08, BR-03 | US-07 | Prioritas berubah dan tampil di daftar serta detail. |
| TC-019 | Admin assign teknisi | FR-09, BR-04 | US-08 | Teknisi tersimpan dan status berubah menjadi Assigned. |
| TC-020 | Non-admin tidak dapat assign | BR-04 | US-08 | Aksi assign tidak tersedia atau ditolak untuk non-admin. |

### Teknisi Workflow

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-021 | Teknisi melihat tugasnya | FR-10, BR-05 | US-09 | Teknisi hanya melihat laporan yang ditugaskan kepadanya. |
| TC-022 | Teknisi mulai pekerjaan | FR-11, BR-06 | US-10 | Status berubah dari Assigned menjadi In Progress. |
| TC-023 | Teknisi menyelesaikan pekerjaan | FR-11, BR-06 | US-10 | Status berubah dari In Progress menjadi Resolved. |
| TC-024 | Catatan pekerjaan teknisi | FR-12 | US-11 | Catatan tersimpan sebagai komentar atau work note. |

### Close dan Reopen

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-025 | Admin close laporan | FR-14, BR-07 | US-12 | Status berubah dari Resolved menjadi Closed. |
| TC-026 | Laporan Closed tetap terlihat | FR-14 | US-12 | Laporan closed tetap muncul pada daftar/detail. |
| TC-027 | Reopen laporan dengan alasan | FR-15, BR-08 | US-13 | Status berubah menjadi Under Review dan alasan tersimpan. |

### Dashboard

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-028 | Dashboard total laporan | FR-16 | US-14 | Total laporan tampil sesuai data. |
| TC-029 | Dashboard ringkasan status | FR-16 | US-14 | Jumlah per status dihitung benar. |
| TC-030 | Dashboard kategori dan prioritas | FR-16 | US-14 | Ringkasan kategori dan prioritas dihitung benar. |

### API Test

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-031 | GET `/api/health` | NFR-03, NFR-04 | - | API mengembalikan status ok. |
| TC-032 | GET `/api/requests` | FR-03 | US-02 | API mengembalikan daftar laporan. |
| TC-033 | GET `/api/requests?q=` | FR-04 | US-03 | API mengembalikan hasil search. |
| TC-034 | GET `/api/requests?status=` | FR-05 | US-04 | API mengembalikan hasil filter. |
| TC-035 | POST `/api/requests` valid | FR-01, FR-02 | US-01 | API membuat laporan baru. |
| TC-036 | POST `/api/requests` invalid | FR-01, FR-02 | US-01 | API mengembalikan validation error. |
| TC-037 | GET `/api/requests/:id` | FR-06, FR-13 | US-05 | API mengembalikan detail, komentar, dan history. |
| TC-038 | PATCH review dan assign | FR-07, FR-08, FR-09 | US-06, US-07, US-08 | API mengubah status dan assignment. |
| TC-039 | PATCH status teknisi | FR-11, FR-13 | US-10 | API mengubah status dan mencatat history. |
| TC-040 | POST komentar | FR-12 | US-11 | API menyimpan komentar baru. |

### Database dan Persistence

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-041 | D1 schema users dan requests | FR-02 | US-01 | Tabel utama berhasil dibuat. |
| TC-042 | D1 schema comments dan histories | FR-12, FR-13 | US-05, US-11 | Tabel komentar dan status history berhasil dibuat. |
| TC-043 | Data tetap tersimpan | NFR-05 | US-02 | Data laporan tetap ada setelah refresh atau request ulang. |

### Deployment Smoke Test

| ID | Nama Test | Requirement | User Story | Expected Result |
|---|---|---|---|---|
| TC-044 | Frontend URL publik terbuka | NFR-04 | Semua | Cloudflare Pages menampilkan aplikasi. |
| TC-045 | API health publik | NFR-03, NFR-04 | - | Endpoint health mengembalikan status ok. |
| TC-046 | Tidak ada secret di repository | NFR-08 | Semua | Repository tidak menyimpan token, password, atau secret. |

## Minimal Automated Test
Ketentuan dosen meminta minimal 20 automated test. Rencana ini menyediakan 46 test case, dengan minimal 20 yang wajib diotomatisasi sebelum deployment.

Prioritas automated test minimum:

| Prioritas | Test Case |
|---|---|
| Wajib MVP | TC-007 sampai TC-020 |
| Wajib workflow status | TC-021 sampai TC-027 |
| Wajib API dasar | TC-031 sampai TC-040 |
| Wajib deployment smoke | TC-044 sampai TC-046 |

## Traceability Test ke Requirement

| Requirement | Test Case |
|---|---|
| FR-01 | TC-007, TC-008, TC-035, TC-036 |
| FR-02 | TC-004, TC-005, TC-007, TC-035, TC-041 |
| FR-03 | TC-010, TC-032 |
| FR-04 | TC-011, TC-012, TC-033 |
| FR-05 | TC-013, TC-034 |
| FR-06 | TC-014, TC-037 |
| FR-07 | TC-017, TC-038 |
| FR-08 | TC-018, TC-038 |
| FR-09 | TC-019, TC-038 |
| FR-10 | TC-021 |
| FR-11 | TC-022, TC-023, TC-039 |
| FR-12 | TC-016, TC-024, TC-040, TC-042 |
| FR-13 | TC-009, TC-015, TC-017, TC-019, TC-039, TC-042 |
| FR-14 | TC-025, TC-026 |
| FR-15 | TC-027 |
| FR-16 | TC-028, TC-029, TC-030 |
| NFR-01 | TC-001 |
| NFR-02 | TC-001, TC-002 |
| NFR-03 | TC-031, TC-045 |
| NFR-04 | TC-044, TC-045 |
| NFR-05 | TC-043 |
| NFR-06 | TC-003, TC-006 |
| NFR-07 | Semua test case memiliki ID dan mapping requirement. |
| NFR-08 | TC-046 |

## Kriteria Lulus Testing
Sistem dianggap siap deployment awal jika:

1. Minimal 20 automated test lulus.
2. Semua test untuk fitur Must lulus.
3. Tidak ada error pada build frontend.
4. API health check berjalan.
5. Tidak ada secret di repository.
6. Hasil test dicatat pada evidence atau README deployment.

## Catatan Review Mahasiswa
Test plan ini dapat dibuat dengan bantuan AI, tetapi mahasiswa tetap harus membaca, memeriksa, dan menyesuaikan test dengan implementasi aktual sebelum dikumpulkan.
