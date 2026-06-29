# Deployment Plan

## Tujuan Dokumen
Dokumen ini menjelaskan rencana deployment **Campus Service Request and Maintenance System** ke Cloudflare. Deployment dilakukan sesuai instruksi proyek, yaitu menggunakan Cloudflare Pages, Cloudflare Workers, dan Cloudflare D1.

Requirement terkait:

- NFR-03: Aplikasi dibuat menggunakan React, TypeScript, Cloudflare Workers, dan Cloudflare D1.
- NFR-04: Aplikasi harus dapat berjalan pada layanan Cloudflare gratis.
- NFR-08: Repository tidak boleh menyimpan token, password, atau secret.
- FR-01 sampai FR-16: Fitur aplikasi harus tetap berjalan setelah deployment.

## Target Deployment

| Komponen | Layanan | Keterangan |
|---|---|---|
| Frontend | Cloudflare Pages | Hosting aplikasi React + TypeScript. |
| Backend/API | Cloudflare Workers | Menyediakan endpoint `/api`. |
| Database | Cloudflare D1 | Menyimpan users, service requests, comments, dan status histories. |
| Konfigurasi | Wrangler | Mengelola Worker, D1 binding, dan deployment. |
| Repository | GitHub | Media pengumpulan kode dan dokumentasi. |

## Batasan Deployment
Deployment tidak menggunakan:

- Cloud Functions.
- Firebase Functions.
- Google Cloud Functions.
- AWS Lambda.
- Backend server tradisional.

Alasan:

Proyek sudah menetapkan Cloudflare Workers sebagai backend/API, sehingga Cloud Functions tidak diperlukan dan tidak sesuai scope.

## Arsitektur Deployment

```text
User Browser
    |
    v
Cloudflare Pages
    |
    v
React Frontend
    |
    v
Cloudflare Workers API
    |
    v
Cloudflare D1 Database
```

## Environment

| Environment | Fungsi |
|---|---|
| Local Development | Menjalankan frontend, Worker, dan D1 lokal untuk pengembangan. |
| Preview Deployment | Deployment sementara dari branch atau PR jika tersedia. |
| Production Deployment | Deployment utama yang dikumpulkan ke dosen. |

## File Konfigurasi yang Dibutuhkan

| File | Fungsi |
|---|---|
| `wrangler.jsonc` | Konfigurasi Worker, D1 binding, dan nama project. |
| `database/schema.sql` | Schema database D1. |
| `database/seed.sql` | Data dummy awal untuk D1. |
| `package.json` | Script build, test, dan deploy. |
| `.gitignore` | Mencegah file secret atau hasil build tidak perlu masuk repo. |
| `.github/workflows/*` | Opsional untuk CI jika waktu mencukupi. |

## Rencana Struktur Deployment

```text
campus-service-project/
├── src/
├── worker/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   └── deployment/
│       └── deployment-plan.md
├── evidence/
│   └── deployment-evidence.md
├── wrangler.jsonc
└── package.json
```

## Rencana Cloudflare D1

### Tabel yang Digunakan
Database D1 akan memiliki tabel:

1. `users`
2. `service_requests`
3. `request_comments`
4. `status_histories`

Referensi detail:

- `docs/design/02-database-api-design.md`

### Binding D1
Binding yang direncanakan:

```json
{
  "binding": "DB",
  "database_name": "campus-maintenance-db",
  "database_id": "diisi-setelah-d1-dibuat"
}
```

Catatan:

`database_id` tidak dibuat manual sebelum database Cloudflare D1 tersedia. Nilai ini diisi setelah database dibuat melalui Cloudflare/Wrangler.

## Rencana Cloudflare Workers

Worker menyediakan endpoint:

| Endpoint | Fungsi |
|---|---|
| `GET /api/health` | Health check API. |
| `GET /api/requests` | Daftar laporan, search, dan filter. |
| `POST /api/requests` | Membuat laporan baru. |
| `GET /api/requests/:id` | Detail laporan. |
| `PATCH /api/requests/:id/review` | Admin review laporan. |
| `PATCH /api/requests/:id/assign` | Admin menentukan prioritas dan teknisi. |
| `PATCH /api/requests/:id/status` | Update status pekerjaan, close, dan reopen. |
| `POST /api/requests/:id/comments` | Menambahkan komentar/catatan. |
| `GET /api/dashboard/summary` | Ringkasan dashboard. |

Referensi detail:

- `docs/design/02-database-api-design.md`

## Rencana Cloudflare Pages

Cloudflare Pages digunakan untuk men-deploy frontend React.

Rencana konfigurasi:

| Item | Nilai Rencana |
|---|---|
| Framework | React + TypeScript |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` |
| Public URL | Diisi setelah deployment berhasil |

## Variabel dan Secret
Pada scope awal, tidak ada secret yang boleh disimpan di repository.

Aturan:

1. Token Cloudflare tidak dimasukkan ke GitHub.
2. Password atau credential tidak ditulis di file dokumentasi.
3. Jika memakai GitHub Actions, secret disimpan di GitHub repository secrets.
4. File `.env` tidak di-commit.
5. `.dev.vars` tidak di-commit.

Requirement terkait: NFR-08.

## Langkah Deployment Lokal

### 1. Install dependency

```bash
npm install
```

### 2. Jalankan test

```bash
npm test
```

### 3. Build frontend

```bash
npm run build
```

### 4. Jalankan Worker lokal

```bash
npx wrangler dev
```

### 5. Jalankan migration D1 lokal

```bash
npx wrangler d1 execute campus-maintenance-db --local --file=database/schema.sql
```

### 6. Jalankan seed D1 lokal

```bash
npx wrangler d1 execute campus-maintenance-db --local --file=database/seed.sql
```

Catatan:

Command dapat disesuaikan dengan script final pada `package.json`.

## Langkah Deployment Production

### 1. Login Cloudflare

```bash
npx wrangler login
```

### 2. Buat database D1

```bash
npx wrangler d1 create campus-maintenance-db
```

Output dari command ini digunakan untuk mengisi `database_id` pada `wrangler.jsonc`.

### 3. Jalankan schema production

```bash
npx wrangler d1 execute campus-maintenance-db --remote --file=database/schema.sql
```

### 4. Jalankan seed production

```bash
npx wrangler d1 execute campus-maintenance-db --remote --file=database/seed.sql
```

### 5. Deploy Worker

```bash
npx wrangler deploy
```

### 6. Deploy frontend ke Cloudflare Pages
Deployment frontend dapat dilakukan melalui:

1. Cloudflare Dashboard dengan menghubungkan GitHub repository.
2. Wrangler Pages jika konfigurasi sudah siap.

Command rencana:

```bash
npm run build
npx wrangler pages deploy dist --project-name campus-maintenance
```

## Deployment Verification

Setelah deployment selesai, lakukan verifikasi:

| Verifikasi | Cara Cek | Expected Result |
|---|---|---|
| Frontend terbuka | Buka URL Cloudflare Pages | Aplikasi tampil. |
| API health | Buka `/api/health` atau URL Worker health | Response status ok. |
| Daftar laporan | Buka halaman daftar laporan | Data laporan tampil. |
| Buat laporan | Submit form laporan | Laporan baru berstatus Submitted. |
| Dashboard | Buka dashboard | Ringkasan status/kategori/prioritas tampil. |
| Secret check | Cek repo GitHub | Tidak ada token/password/secret. |

## Deployment Evidence
Evidence deployment yang perlu dikumpulkan:

| Evidence | Lokasi Rencana |
|---|---|
| URL Cloudflare Pages | `evidence/deployment-evidence.md` |
| URL Worker API | `evidence/deployment-evidence.md` |
| Screenshot frontend | `evidence/` |
| Screenshot API health | `evidence/` |
| Hasil test | `evidence/test-results.md` |
| Catatan deployment | `docs/deployment/deployment-plan.md` atau `evidence/deployment-evidence.md` |

## Rollback Plan
Jika deployment gagal:

1. Periksa build error.
2. Periksa konfigurasi `wrangler.jsonc`.
3. Periksa D1 binding.
4. Periksa schema database.
5. Rollback ke commit terakhir yang berhasil.
6. Deploy ulang setelah perbaikan.

## Risiko Deployment

| Risiko | Dampak | Mitigasi |
|---|---|---|
| D1 binding salah | API gagal membaca database | Verifikasi `database_id` dan binding `DB`. |
| Build frontend gagal | Pages tidak bisa deploy | Jalankan build lokal sebelum deploy. |
| Endpoint API berbeda dengan frontend | Frontend gagal mengambil data | Samakan base URL API pada konfigurasi. |
| Secret tidak sengaja masuk repo | Risiko keamanan | Cek `.gitignore` dan gunakan GitHub Secrets. |
| Migration belum dijalankan | Data tidak tersedia | Jalankan schema dan seed sebelum verifikasi. |

## Kriteria Deployment Berhasil
Deployment dianggap berhasil jika:

1. URL Cloudflare Pages dapat dibuka publik.
2. API health check mengembalikan status ok.
3. Aplikasi dapat menampilkan laporan.
4. Fitur utama MVP dapat dicoba.
5. Database D1 dapat menyimpan data.
6. Tidak ada secret di repository.
7. URL publik dicatat untuk pengumpulan.

## Traceability Deployment

| Deployment Item | Requirement | Evidence |
|---|---|---|
| Cloudflare Pages | NFR-04 | URL frontend publik |
| Cloudflare Workers | NFR-03, NFR-04 | URL API atau health check |
| Cloudflare D1 | NFR-03, NFR-05 | Schema, seed, dan data persistence |
| Secret management | NFR-08 | Repo check dan `.gitignore` |
| Test sebelum deploy | NFR-07 | Test result evidence |

## Status Saat Ini
Saat dokumen ini dibuat, proyek masih berada pada tahap planning sebelum coding. Deployment belum dilakukan. URL publik akan diisi setelah implementasi dan deployment selesai.
