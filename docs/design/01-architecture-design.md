# 01 - Architecture Design

## Tujuan Dokumen
Dokumen ini menjelaskan rancangan arsitektur sistem **Campus Service Request and Maintenance System**. Rancangan ini menjadi penghubung antara requirement, desain teknis, implementasi kode, pengujian, dan deployment.

Dokumen ini mendukung requirement berikut:

| Area | Requirement Terkait |
|---|---|
| Pembuatan dan pengelolaan laporan | FR-01, FR-02, FR-03, FR-06 |
| Review, prioritas, assignment, dan status | FR-07, FR-08, FR-09, FR-10, FR-11, FR-13, FR-14, FR-15 |
| Komentar dan dashboard | FR-12, FR-16 |
| Kualitas sistem | NFR-01, NFR-02, NFR-03, NFR-04, NFR-05, NFR-06, NFR-07, NFR-08 |
| Aturan bisnis | BR-01 sampai BR-08 |

## Tujuan Arsitektur
Arsitektur sistem dibuat untuk:

1. Memisahkan frontend, backend/API, database, dan deployment agar mudah dipahami.
2. Mendukung pengembangan modular dan deep modular.
3. Memudahkan penelusuran dari requirement ke desain, issue, kode, test, dan deployment.
4. Menyediakan fondasi untuk implementasi awal menggunakan dummy data, lalu dapat dilanjutkan ke Cloudflare D1.
5. Menjaga scope proyek agar tidak menambahkan fitur di luar requirement awal.
6. Mendukung deployment publik menggunakan Cloudflare Pages dan Cloudflare Workers.

## Teknologi yang Digunakan

| Komponen | Teknologi | Fungsi |
|---|---|---|
| Frontend | React | Membuat tampilan aplikasi dan interaksi pengguna. |
| Bahasa Frontend | TypeScript | Menjaga tipe data agar kode lebih aman dan mudah dirawat. |
| Backend/API | Cloudflare Workers | Menyediakan endpoint API untuk laporan, assignment, komentar, status, dan dashboard. |
| Database | Cloudflare D1 | Menyimpan data laporan, user dummy, komentar, dan riwayat status. |
| Hosting Frontend | Cloudflare Pages | Men-deploy aplikasi React ke URL publik. |
| Konfigurasi Cloudflare | Wrangler | Mengatur Worker, D1 binding, dan proses deployment. |
| Testing | Vitest atau test runner sejenis | Menjalankan automated test untuk logika dan komponen penting. |

## Arsitektur Umum

Sistem menggunakan arsitektur web sederhana:

```text
User Browser
    |
    v
React + TypeScript Frontend
    |
    v
Cloudflare Workers API
    |
    v
Cloudflare D1 Database
```

Penjelasan:

1. Pengguna membuka aplikasi melalui browser.
2. Frontend React menampilkan halaman dashboard, daftar laporan, form laporan, detail laporan, dan halaman tugas teknisi.
3. Frontend mengirim request ke API yang berjalan di Cloudflare Workers.
4. Cloudflare Workers memvalidasi request, menjalankan business rule, lalu membaca atau menyimpan data ke Cloudflare D1.
5. API mengembalikan response JSON ke frontend.
6. Frontend memperbarui tampilan berdasarkan response dari API.

## Alasan Tidak Menggunakan Cloud Functions
Proyek ini tidak menggunakan Cloud Functions karena teknologi yang ditentukan adalah **Cloudflare Workers**. Cloudflare Workers sudah cukup untuk kebutuhan backend/API pada sistem ini, seperti membuat laporan, mengambil daftar laporan, memperbarui status, menambahkan komentar, dan menampilkan ringkasan dashboard.

Keputusan ini juga menjaga scope proyek tetap sesuai instruksi:

- Backend menggunakan Cloudflare Workers.
- Database menggunakan Cloudflare D1.
- Frontend di-host menggunakan Cloudflare Pages.
- Tidak menambahkan layanan cloud lain yang tidak diminta.

Requirement terkait: NFR-03, NFR-04.

## Prinsip Modular dan Deep Modular
Sistem dibuat modular agar setiap bagian memiliki tanggung jawab yang jelas. Deep modular berarti modul tidak hanya dipisah berdasarkan halaman, tetapi juga berdasarkan domain fitur, service, tipe data, validasi, dan komponen UI.

Prinsip yang digunakan:

1. **Feature-based module**: kode dikelompokkan berdasarkan fitur seperti reports, assignments, comments, status history, dan dashboard.
2. **Separation of concerns**: tampilan, akses API, validasi, tipe data, dan business rule tidak dicampur dalam satu file besar.
3. **Reusable shared component**: komponen umum seperti button, input, badge status, table, dan empty state ditempatkan di modul shared.
4. **Traceable code**: nama modul dan test mengacu pada requirement atau user story yang relevan.
5. **Small API handlers**: setiap endpoint API memiliki handler yang fokus pada satu aksi.
6. **Dummy-first, database-ready**: implementasi awal dapat memakai dummy data, tetapi struktur data tetap disiapkan agar mudah dipindahkan ke Cloudflare D1.

Requirement terkait: NFR-06, NFR-07.

## Struktur Folder Frontend
Struktur frontend yang direncanakan:

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers/
├── features/
│   ├── reports/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── validation.ts
│   ├── assignments/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   ├── comments/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   ├── status-history/
│   │   ├── components/
│   │   └── types.ts
│   └── dashboard/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── types.ts
├── shared/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── main.tsx
```

Penjelasan modul frontend:

| Folder | Tanggung Jawab | Requirement Terkait |
|---|---|---|
| `features/reports` | Membuat laporan, daftar laporan, pencarian, filter, dan detail laporan. | FR-01 sampai FR-06 |
| `features/assignments` | Menampilkan dan mengelola assignment teknisi. | FR-09, FR-10 |
| `features/comments` | Menambahkan dan menampilkan komentar/catatan. | FR-12 |
| `features/status-history` | Menampilkan riwayat perubahan status. | FR-13 |
| `features/dashboard` | Menampilkan ringkasan laporan. | FR-16 |
| `shared/components` | Komponen umum seperti button, input, select, table, status badge. | NFR-01, NFR-02 |
| `shared/types` | Tipe data yang digunakan lintas modul. | NFR-06 |

## Struktur Folder Worker/Backend
Struktur backend yang direncanakan:

```text
worker/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── health.routes.ts
│   │   ├── requests.routes.ts
│   │   └── dashboard.routes.ts
│   ├── modules/
│   │   ├── requests/
│   │   │   ├── request.handlers.ts
│   │   │   ├── request.repository.ts
│   │   │   ├── request.service.ts
│   │   │   ├── request.validation.ts
│   │   │   └── request.types.ts
│   │   ├── comments/
│   │   │   ├── comment.handlers.ts
│   │   │   ├── comment.repository.ts
│   │   │   └── comment.types.ts
│   │   ├── status-history/
│   │   │   ├── status-history.repository.ts
│   │   │   └── status-history.types.ts
│   │   └── dashboard/
│   │       ├── dashboard.handlers.ts
│   │       ├── dashboard.repository.ts
│   │       └── dashboard.types.ts
│   ├── shared/
│   │   ├── constants.ts
│   │   ├── errors.ts
│   │   ├── response.ts
│   │   └── validation.ts
│   └── types/
│       └── env.ts
└── tests/
```

Penjelasan layer backend:

| Layer | Fungsi |
|---|---|
| Routes | Memetakan URL dan method HTTP ke handler. |
| Handler | Membaca request, memanggil service, dan mengirim response. |
| Service | Menjalankan business rule dan validasi proses. |
| Repository | Mengakses Cloudflare D1 atau dummy data. |
| Validation | Memeriksa input agar sesuai requirement. |
| Shared | Helper response, error, constants, dan tipe umum. |

## Alur Data

### 1. Pelapor Membuat Laporan
Requirement terkait: FR-01, FR-02, FR-13, BR-01.

```text
Pelapor
  -> Form Buat Laporan
  -> POST /api/requests
  -> Validasi input
  -> Simpan service_requests dengan status Submitted
  -> Simpan status_histories
  -> Response laporan baru
  -> Frontend menampilkan detail atau daftar laporan
```

### 2. Admin Review Laporan
Requirement terkait: FR-07, FR-13, BR-02.

```text
Admin
  -> Detail Laporan
  -> PATCH /api/requests/:id/review
  -> Validasi role admin
  -> Ubah status Submitted menjadi Under Review
  -> Simpan status_histories
  -> Response data terbaru
```

### 3. Admin Menentukan Prioritas dan Menugaskan Teknisi
Requirement terkait: FR-08, FR-09, FR-13, BR-03, BR-04.

```text
Admin
  -> Panel Assignment
  -> PATCH /api/requests/:id/assign
  -> Validasi role admin, priority, dan technician_id
  -> Update priority, assigned_technician_id, status Assigned
  -> Simpan status_histories
  -> Response assignment terbaru
```

### 4. Teknisi Update Status
Requirement terkait: FR-10, FR-11, FR-13, BR-05, BR-06.

```text
Teknisi
  -> Daftar Tugas
  -> Detail Tugas
  -> PATCH /api/requests/:id/status
  -> Validasi teknisi yang ditugaskan
  -> Ubah status ke In Progress atau Resolved
  -> Simpan status_histories
  -> Response status terbaru
```

### 5. Admin Menutup atau Membuka Kembali Laporan
Requirement terkait: FR-14, FR-15, FR-13, BR-07, BR-08.

```text
Admin atau Pelapor sesuai aturan
  -> Detail Laporan
  -> PATCH /api/requests/:id/status
  -> Validasi transisi status
  -> Ubah status menjadi Closed atau Under Review
  -> Simpan alasan jika reopen
  -> Simpan status_histories
```

## Role User
Pada scope awal, role disimulasikan menggunakan dummy data atau role selector sesuai change request CR-01.

| Role | Hak Akses Utama | Requirement Terkait |
|---|---|---|
| Mahasiswa | Membuat laporan, melihat status, komentar, konfirmasi atau meminta reopen. | FR-01, FR-03, FR-06, FR-12, FR-15 |
| Staff | Sama seperti mahasiswa sebagai pelapor. | FR-01, FR-03, FR-06, FR-12, FR-15 |
| Administrator | Review laporan, menentukan prioritas, assign teknisi, close laporan, reopen jika perlu. | FR-07, FR-08, FR-09, FR-14, FR-15 |
| Teknisi | Melihat tugas, update status, menambahkan catatan pekerjaan. | FR-10, FR-11, FR-12 |
| Manajer Fasilitas | Melihat dashboard dan laporan ringkas. | FR-16 |

## Modul Utama Sistem

| Modul | Deskripsi | Requirement |
|---|---|---|
| Reports | Modul inti untuk membuat, melihat, mencari, memfilter, dan membuka detail laporan. | FR-01 sampai FR-06 |
| Assignments | Modul untuk admin menugaskan teknisi dan teknisi melihat tugasnya. | FR-09, FR-10 |
| Comments | Modul untuk komentar pelapor, admin, dan teknisi. | FR-12 |
| Status History | Modul untuk menyimpan dan menampilkan riwayat perubahan status. | FR-13 |
| Dashboard | Modul ringkasan jumlah laporan berdasarkan status, kategori, dan prioritas. | FR-16 |
| Shared UI | Komponen UI umum agar tampilan konsisten dan responsif. | NFR-01, NFR-02, NFR-06 |

## Traceability ke Requirement

| Design Decision | Requirement | User Story |
|---|---|---|
| Frontend React menampilkan form laporan. | FR-01, FR-02 | US-01 |
| Daftar laporan menggunakan API `GET /api/requests`. | FR-03, FR-04, FR-05 | US-02, US-03, US-04 |
| Detail laporan memuat komentar dan status history. | FR-06, FR-12, FR-13 | US-05, US-11 |
| Admin review memakai endpoint khusus. | FR-07 | US-06 |
| Admin menentukan prioritas. | FR-08, BR-03 | US-07 |
| Admin assign teknisi. | FR-09, BR-04 | US-08 |
| Teknisi melihat tugas dan update status. | FR-10, FR-11, BR-05, BR-06 | US-09, US-10 |
| Status history disimpan setiap perubahan status. | FR-13 | US-05, US-10 |
| Admin close laporan. | FR-14, BR-07 | US-12 |
| Reopen laporan disediakan dengan alasan. | FR-15, BR-08 | US-13 |
| Dashboard ringkasan status, kategori, prioritas. | FR-16 | US-14 |

## Batasan Desain
Fitur berikut tidak dimasukkan ke desain awal:

- Upload foto.
- Email notification.
- Login Google.
- QR code ruangan.
- AI otomatis menentukan kategori.
- Inventory spare part.
- Vendor management.
- Cloud Functions.

Fitur tersebut dapat menjadi pengembangan lanjutan jika ada perubahan requirement baru.
