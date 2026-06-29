# 02 - Database and API Design

## Tujuan Dokumen
Dokumen ini menjelaskan rancangan database dan API untuk **Campus Service Request and Maintenance System**. Desain ini menjadi dasar implementasi Cloudflare Workers dan Cloudflare D1.

Requirement terkait:

- FR-01 sampai FR-16.
- NFR-03, NFR-05, NFR-06, NFR-07, NFR-08.
- BR-01 sampai BR-08.

## Prinsip Desain Data
Desain database dibuat sederhana tetapi cukup untuk menelusuri proses laporan dari awal sampai selesai.

Prinsip yang digunakan:

1. Data laporan utama disimpan pada tabel `service_requests`.
2. User dummy disimpan pada tabel `users`.
3. Komentar dan catatan disimpan pada tabel `request_comments`.
4. Setiap perubahan status disimpan pada tabel `status_histories`.
5. Relasi dibuat menggunakan ID agar data mudah dilacak.
6. Scope awal tidak menyimpan foto, file upload, token login, atau secret.

## Rancangan Tabel Database

### 1. Tabel `users`
Tabel ini menyimpan user dummy untuk simulasi role.

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | TEXT | Ya | ID unik user, contoh `USR-001`. |
| `name` | TEXT | Ya | Nama user. |
| `email` | TEXT | Ya | Email dummy user. |
| `role` | TEXT | Ya | `student`, `staff`, `admin`, `technician`, atau `facility_manager`. |
| `department` | TEXT | Tidak | Program studi, unit kerja, atau divisi teknisi. |
| `created_at` | TEXT | Ya | Waktu data dibuat. |
| `updated_at` | TEXT | Ya | Waktu data terakhir diubah. |

Contoh data:

| id | name | role | department |
|---|---|---|---|
| USR-001 | Farlen Mahasiswa | student | Teknik Informatika |
| USR-002 | Sinta Staff | staff | Akademik |
| USR-003 | Budi Admin | admin | Sarana Prasarana |
| USR-004 | Andi Teknisi IT | technician | IT Support |
| USR-005 | Rina Manajer | facility_manager | Fasilitas |

### 2. Tabel `service_requests`
Tabel ini menyimpan data utama laporan kerusakan.

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | TEXT | Ya | ID laporan, contoh `REQ-001`. |
| `title` | TEXT | Ya | Judul laporan. |
| `description` | TEXT | Ya | Deskripsi kerusakan. |
| `location` | TEXT | Ya | Lokasi fasilitas. |
| `category` | TEXT | Ya | Kategori laporan. |
| `priority` | TEXT | Ya | `Low`, `Medium`, `High`, atau `Urgent`. Default awal `Medium` atau ditentukan admin. |
| `status` | TEXT | Ya | `Submitted`, `Under Review`, `Assigned`, `In Progress`, `Resolved`, atau `Closed`. |
| `reporter_id` | TEXT | Ya | Relasi ke `users.id`. |
| `assigned_technician_id` | TEXT | Tidak | Relasi ke `users.id` untuk teknisi. |
| `reviewed_by` | TEXT | Tidak | Relasi ke `users.id` untuk admin yang memeriksa. |
| `reviewed_at` | TEXT | Tidak | Waktu review. |
| `resolved_at` | TEXT | Tidak | Waktu laporan ditandai resolved. |
| `closed_at` | TEXT | Tidak | Waktu laporan ditutup. |
| `reopen_reason` | TEXT | Tidak | Alasan laporan dibuka kembali. |
| `created_at` | TEXT | Ya | Waktu laporan dibuat. |
| `updated_at` | TEXT | Ya | Waktu laporan terakhir diubah. |

Requirement terkait: FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-14, FR-15.

### 3. Tabel `request_comments`
Tabel ini menyimpan komentar atau catatan pada laporan.

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | TEXT | Ya | ID komentar, contoh `COM-001`. |
| `request_id` | TEXT | Ya | Relasi ke `service_requests.id`. |
| `author_id` | TEXT | Ya | Relasi ke `users.id`. |
| `comment_type` | TEXT | Ya | `comment`, `work_note`, atau `reopen_note`. |
| `message` | TEXT | Ya | Isi komentar atau catatan. |
| `created_at` | TEXT | Ya | Waktu komentar dibuat. |

Requirement terkait: FR-12.

### 4. Tabel `status_histories`
Tabel ini menyimpan riwayat perubahan status laporan.

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | TEXT | Ya | ID riwayat, contoh `HIS-001`. |
| `request_id` | TEXT | Ya | Relasi ke `service_requests.id`. |
| `changed_by` | TEXT | Ya | Relasi ke `users.id`. |
| `from_status` | TEXT | Tidak | Status sebelumnya. Kosong untuk status awal. |
| `to_status` | TEXT | Ya | Status baru. |
| `note` | TEXT | Tidak | Catatan perubahan status. |
| `created_at` | TEXT | Ya | Waktu perubahan status. |

Requirement terkait: FR-13.

## Relasi Antar Tabel

```text
users.id
  |-- service_requests.reporter_id
  |-- service_requests.assigned_technician_id
  |-- service_requests.reviewed_by
  |-- request_comments.author_id
  |-- status_histories.changed_by

service_requests.id
  |-- request_comments.request_id
  |-- status_histories.request_id
```

Penjelasan:

1. Satu user dapat membuat banyak laporan.
2. Satu teknisi dapat ditugaskan ke banyak laporan.
3. Satu laporan dapat memiliki banyak komentar.
4. Satu laporan dapat memiliki banyak riwayat status.
5. Setiap perubahan status memiliki user yang melakukan perubahan.

## SQL Draft
Draft awal untuk Cloudflare D1:

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE service_requests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT NOT NULL,
  reporter_id TEXT NOT NULL,
  assigned_technician_id TEXT,
  reviewed_by TEXT,
  reviewed_at TEXT,
  resolved_at TEXT,
  closed_at TEXT,
  reopen_reason TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (reporter_id) REFERENCES users(id),
  FOREIGN KEY (assigned_technician_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

CREATE TABLE request_comments (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  comment_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (request_id) REFERENCES service_requests(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE status_histories (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (request_id) REFERENCES service_requests(id),
  FOREIGN KEY (changed_by) REFERENCES users(id)
);
```

## Dummy Data Awal
Dummy data digunakan untuk tahap awal sebelum seluruh integrasi database selesai.

### Users

```json
[
  {
    "id": "USR-001",
    "name": "Farlen Mahasiswa",
    "email": "farlen@student.campus.ac.id",
    "role": "student",
    "department": "Teknik Informatika"
  },
  {
    "id": "USR-003",
    "name": "Budi Admin",
    "email": "budi.admin@campus.ac.id",
    "role": "admin",
    "department": "Sarana Prasarana"
  },
  {
    "id": "USR-004",
    "name": "Andi Teknisi IT",
    "email": "andi.it@campus.ac.id",
    "role": "technician",
    "department": "IT Support"
  }
]
```

### Service Requests

```json
[
  {
    "id": "REQ-001",
    "title": "Proyektor Ruang 101 tidak menyala",
    "description": "Proyektor tidak menampilkan gambar saat digunakan untuk kelas.",
    "location": "Ruang 101",
    "category": "Peralatan Kelas",
    "priority": "High",
    "status": "Submitted",
    "reporter_id": "USR-001",
    "assigned_technician_id": null
  },
  {
    "id": "REQ-002",
    "title": "Internet laboratorium bermasalah",
    "description": "Koneksi internet sering putus saat praktikum.",
    "location": "Laboratorium Komputer",
    "category": "Internet",
    "priority": "Urgent",
    "status": "Assigned",
    "reporter_id": "USR-002",
    "assigned_technician_id": "USR-004"
  }
]
```

## Endpoint API

Base path API:

```text
/api
```

Format response sukses umum:

```json
{
  "success": true,
  "data": {}
}
```

Format response error umum:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field title wajib diisi."
  }
}
```

### 1. `GET /api/health`
Mengecek apakah API aktif.

Requirement terkait: NFR-03, NFR-04.

Contoh response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "campus-maintenance-api"
  }
}
```

### 2. `GET /api/requests`
Mengambil daftar laporan.

Requirement terkait: FR-03, FR-04, FR-05.

Query parameter opsional:

| Parameter | Contoh | Keterangan |
|---|---|---|
| `q` | `internet` | Pencarian berdasarkan judul atau lokasi. |
| `status` | `Submitted` | Filter status. |
| `category` | `Internet` | Filter kategori. |
| `priority` | `High` | Filter prioritas. |
| `technician_id` | `USR-004` | Filter tugas teknisi. |

Contoh response:

```json
{
  "success": true,
  "data": [
    {
      "id": "REQ-001",
      "title": "Proyektor Ruang 101 tidak menyala",
      "location": "Ruang 101",
      "category": "Peralatan Kelas",
      "priority": "High",
      "status": "Submitted",
      "reporter_name": "Farlen Mahasiswa",
      "assigned_technician_name": null,
      "created_at": "2026-06-29T08:00:00Z"
    }
  ]
}
```

### 3. `POST /api/requests`
Membuat laporan baru.

Requirement terkait: FR-01, FR-02, FR-13, BR-01.

Contoh request body:

```json
{
  "title": "AC Ruang 204 tidak dingin",
  "description": "AC menyala tetapi ruangan tetap panas.",
  "location": "Ruang 204",
  "category": "AC",
  "reporter_id": "USR-001"
}
```

Contoh response:

```json
{
  "success": true,
  "data": {
    "id": "REQ-003",
    "title": "AC Ruang 204 tidak dingin",
    "status": "Submitted",
    "priority": "Medium",
    "created_at": "2026-06-29T08:15:00Z"
  }
}
```

### 4. `GET /api/requests/:id`
Mengambil detail laporan, komentar, dan riwayat status.

Requirement terkait: FR-06, FR-12, FR-13.

Contoh response:

```json
{
  "success": true,
  "data": {
    "request": {
      "id": "REQ-001",
      "title": "Proyektor Ruang 101 tidak menyala",
      "description": "Proyektor tidak menampilkan gambar saat digunakan untuk kelas.",
      "location": "Ruang 101",
      "category": "Peralatan Kelas",
      "priority": "High",
      "status": "Submitted",
      "reporter_name": "Farlen Mahasiswa",
      "assigned_technician_name": null
    },
    "comments": [],
    "status_histories": [
      {
        "from_status": null,
        "to_status": "Submitted",
        "changed_by_name": "Farlen Mahasiswa",
        "created_at": "2026-06-29T08:00:00Z"
      }
    ]
  }
}
```

### 5. `PATCH /api/requests/:id/review`
Admin memeriksa laporan baru dan mengubah status menjadi `Under Review`.

Requirement terkait: FR-07, FR-13, BR-02.

Contoh request body:

```json
{
  "admin_id": "USR-003",
  "note": "Laporan sudah diperiksa dan siap diprioritaskan."
}
```

Contoh response:

```json
{
  "success": true,
  "data": {
    "id": "REQ-001",
    "status": "Under Review",
    "reviewed_by": "USR-003",
    "reviewed_at": "2026-06-29T08:30:00Z"
  }
}
```

### 6. `PATCH /api/requests/:id/assign`
Admin menentukan prioritas dan menugaskan teknisi.

Requirement terkait: FR-08, FR-09, FR-13, BR-03, BR-04.

Contoh request body:

```json
{
  "admin_id": "USR-003",
  "priority": "Urgent",
  "technician_id": "USR-004",
  "note": "Internet lab mengganggu praktikum, perlu diprioritaskan."
}
```

Contoh response:

```json
{
  "success": true,
  "data": {
    "id": "REQ-002",
    "priority": "Urgent",
    "assigned_technician_id": "USR-004",
    "status": "Assigned"
  }
}
```

### 7. `PATCH /api/requests/:id/status`
Mengubah status pekerjaan.

Requirement terkait: FR-11, FR-13, FR-14, FR-15, BR-05, BR-06, BR-07, BR-08.

Contoh request body teknisi:

```json
{
  "user_id": "USR-004",
  "status": "In Progress",
  "note": "Teknisi mulai memeriksa jaringan."
}
```

Contoh request body admin close:

```json
{
  "user_id": "USR-003",
  "status": "Closed",
  "note": "Laporan ditutup setelah pekerjaan resolved."
}
```

Contoh request body reopen:

```json
{
  "user_id": "USR-001",
  "status": "Under Review",
  "reopen_reason": "Masalah masih terjadi setelah laporan ditutup."
}
```

Contoh response:

```json
{
  "success": true,
  "data": {
    "id": "REQ-002",
    "status": "In Progress",
    "updated_at": "2026-06-29T09:00:00Z"
  }
}
```

### 8. `POST /api/requests/:id/comments`
Menambahkan komentar atau catatan.

Requirement terkait: FR-12.

Contoh request body:

```json
{
  "author_id": "USR-004",
  "comment_type": "work_note",
  "message": "Kabel jaringan sudah dicek, kemungkinan masalah pada switch."
}
```

Contoh response:

```json
{
  "success": true,
  "data": {
    "id": "COM-001",
    "request_id": "REQ-002",
    "author_id": "USR-004",
    "comment_type": "work_note",
    "message": "Kabel jaringan sudah dicek, kemungkinan masalah pada switch.",
    "created_at": "2026-06-29T09:10:00Z"
  }
}
```

### 9. `GET /api/dashboard/summary`
Mengambil ringkasan dashboard.

Requirement terkait: FR-16.

Contoh response:

```json
{
  "success": true,
  "data": {
    "total_requests": 24,
    "by_status": {
      "Submitted": 5,
      "Under Review": 3,
      "Assigned": 4,
      "In Progress": 6,
      "Resolved": 2,
      "Closed": 4
    },
    "by_category": {
      "Internet": 7,
      "AC": 5,
      "Peralatan Kelas": 6,
      "Kebersihan": 3,
      "Laboratorium": 3
    },
    "by_priority": {
      "Low": 4,
      "Medium": 10,
      "High": 7,
      "Urgent": 3
    }
  }
}
```

## Validasi Input

| Aksi | Validasi |
|---|---|
| Membuat laporan | `title`, `description`, `location`, `category`, dan `reporter_id` wajib diisi. |
| Review laporan | User harus memiliki role `admin`; status awal harus `Submitted`. |
| Menentukan prioritas | User harus `admin`; priority harus salah satu dari `Low`, `Medium`, `High`, `Urgent`. |
| Assign teknisi | User harus `admin`; `technician_id` harus user dengan role `technician`. |
| Update status teknisi | Teknisi hanya dapat update laporan yang ditugaskan kepadanya. |
| Close laporan | User harus `admin`; status sebaiknya sudah `Resolved`. |
| Reopen laporan | Status awal harus `Closed`; `reopen_reason` wajib diisi. |
| Komentar | `author_id`, `comment_type`, dan `message` wajib diisi. |

## Aturan Transisi Status

| Dari Status | Ke Status | Aktor |
|---|---|---|
| Submitted | Under Review | Admin |
| Under Review | Assigned | Admin |
| Assigned | In Progress | Teknisi yang ditugaskan |
| In Progress | Resolved | Teknisi yang ditugaskan |
| Resolved | Closed | Admin |
| Closed | Under Review | Pelapor atau Admin |

Transisi status harus selalu menghasilkan record baru pada tabel `status_histories`.

## Error Response

| HTTP Status | Code | Kondisi |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Field wajib kosong atau format tidak valid. |
| 403 | `FORBIDDEN` | Role tidak memiliki akses. |
| 404 | `NOT_FOUND` | Data laporan atau user tidak ditemukan. |
| 409 | `INVALID_STATUS_TRANSITION` | Perubahan status tidak sesuai business rule. |
| 500 | `INTERNAL_ERROR` | Kesalahan server atau database. |

Contoh error:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATUS_TRANSITION",
    "message": "Status Submitted hanya dapat diubah menjadi Under Review oleh admin."
  }
}
```

## Traceability API ke Requirement

| Endpoint | Requirement | User Story |
|---|---|---|
| `GET /api/health` | NFR-03, NFR-04 | - |
| `GET /api/requests` | FR-03, FR-04, FR-05 | US-02, US-03, US-04 |
| `POST /api/requests` | FR-01, FR-02, FR-13 | US-01 |
| `GET /api/requests/:id` | FR-06, FR-12, FR-13 | US-05, US-11 |
| `PATCH /api/requests/:id/review` | FR-07, FR-13 | US-06 |
| `PATCH /api/requests/:id/assign` | FR-08, FR-09, FR-13 | US-07, US-08 |
| `PATCH /api/requests/:id/status` | FR-11, FR-13, FR-14, FR-15 | US-10, US-12, US-13 |
| `POST /api/requests/:id/comments` | FR-12 | US-11 |
| `GET /api/dashboard/summary` | FR-16 | US-14 |
