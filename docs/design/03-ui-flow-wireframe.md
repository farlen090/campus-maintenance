# 03 - UI Flow and Wireframe

## Tujuan Dokumen
Dokumen ini menjelaskan rancangan halaman, user flow, dan wireframe teks sederhana untuk **Campus Service Request and Maintenance System**.

Desain UI dibuat agar:

1. Mudah dipahami oleh mahasiswa, staff, admin, teknisi, dan manajer fasilitas.
2. Mendukung alur laporan dari `Submitted` sampai `Closed`.
3. Menampilkan status laporan dengan jelas.
4. Tetap responsif di desktop dan mobile.
5. Tidak menambahkan fitur di luar requirement awal.

Requirement terkait:

- FR-01 sampai FR-16.
- NFR-01, NFR-02, NFR-06, NFR-07.
- BR-01 sampai BR-08.

## Prinsip UI/UX

| Prinsip | Penerapan |
|---|---|
| Sederhana | Setiap halaman fokus pada satu tujuan utama. |
| Mudah dipahami | Label menggunakan bahasa yang jelas seperti "Buat Laporan", "Status", dan "Teknisi". |
| Responsif | Layout daftar dan detail dapat dibaca di desktop dan mobile. |
| Role jelas | Role aktif ditampilkan melalui role selector pada scope awal. |
| Status terlihat | Status laporan ditampilkan sebagai badge atau label yang mudah dibedakan. |
| Tidak terlalu ramai | Informasi tambahan seperti komentar dan riwayat status diletakkan di section terpisah. |
| Traceable | Setiap halaman dan aksi dikaitkan dengan ID requirement dan user story. |

## Halaman Aplikasi

### 1. Dashboard
Dashboard menjadi halaman awal untuk melihat ringkasan laporan.

Isi utama:

- Total laporan.
- Jumlah laporan berdasarkan status.
- Ringkasan kategori.
- Ringkasan prioritas.
- Daftar laporan terbaru.
- Shortcut ke daftar laporan dan form buat laporan.

Requirement terkait: FR-16, US-14.

### 2. Daftar Laporan
Halaman ini menampilkan semua laporan yang dapat dilihat user.

Isi utama:

- Tabel atau list laporan.
- Kolom nomor laporan, judul, lokasi, kategori, prioritas, status, dan teknisi.
- Search berdasarkan judul atau lokasi.
- Filter status, kategori, dan prioritas.
- Tombol untuk membuka detail laporan.

Requirement terkait: FR-03, FR-04, FR-05, US-02, US-03, US-04.

### 3. Form Buat Laporan
Halaman ini digunakan mahasiswa atau staff untuk membuat laporan baru.

Field:

- Judul laporan.
- Deskripsi.
- Lokasi.
- Kategori.
- Pelapor berdasarkan user dummy atau role selector.

Setelah submit:

- Sistem membuat laporan dengan status `Submitted`.
- Sistem menyimpan riwayat status awal.
- User diarahkan ke detail laporan atau daftar laporan.

Requirement terkait: FR-01, FR-02, FR-13, BR-01, US-01.

### 4. Detail Laporan
Halaman ini menampilkan informasi lengkap satu laporan.

Isi utama:

- Judul, deskripsi, lokasi, kategori, prioritas, status.
- Data pelapor.
- Teknisi yang ditugaskan.
- Tombol aksi sesuai role dan status.
- Komentar atau catatan.
- Riwayat status.

Requirement terkait: FR-06, FR-12, FR-13, US-05, US-11.

### 5. Assignment Teknisi
Bagian ini dapat berada di detail laporan untuk admin.

Isi utama:

- Pilihan prioritas.
- Pilihan teknisi.
- Catatan assignment.
- Tombol assign.

Requirement terkait: FR-08, FR-09, BR-03, BR-04, US-07, US-08.

### 6. Dashboard Manajer/Admin
Dashboard ini dapat memakai halaman yang sama dengan dashboard utama, tetapi fokus pada ringkasan laporan.

Isi utama:

- Total laporan aktif.
- Laporan urgent.
- Laporan berdasarkan status.
- Laporan berdasarkan kategori.
- Laporan resolved dan closed.

Requirement terkait: FR-16, US-14.

## Navigasi Utama

```text
[Dashboard] [Daftar Laporan] [Buat Laporan] [Tugas Teknisi] [Role Selector]
```

Catatan:

- `Tugas Teknisi` dapat ditampilkan ketika role aktif adalah teknisi.
- Aksi admin seperti review, assign, close, dan reopen muncul di halaman detail sesuai role dan status.
- Role selector digunakan pada scope awal karena login Google tidak termasuk requirement awal.

## User Flow

### 1. Pelapor Membuat Laporan
Requirement terkait: FR-01, FR-02, FR-13, BR-01, US-01.

```text
Pelapor membuka aplikasi
  -> memilih role Mahasiswa atau Staff
  -> membuka halaman Buat Laporan
  -> mengisi judul, deskripsi, lokasi, dan kategori
  -> menekan Simpan Laporan
  -> sistem validasi field wajib
  -> sistem membuat laporan status Submitted
  -> sistem menyimpan status history
  -> pelapor melihat detail laporan
```

### 2. Admin Review dan Assign Teknisi
Requirement terkait: FR-07, FR-08, FR-09, FR-13, BR-03, BR-04, US-06, US-07, US-08.

```text
Admin membuka daftar laporan
  -> memilih laporan status Submitted
  -> membuka detail laporan
  -> menekan Review
  -> status berubah menjadi Under Review
  -> admin memilih prioritas
  -> admin memilih teknisi
  -> admin menekan Assign Teknisi
  -> status berubah menjadi Assigned
  -> sistem menyimpan status history
```

### 3. Teknisi Update Status
Requirement terkait: FR-10, FR-11, FR-12, FR-13, BR-05, BR-06, US-09, US-10, US-11.

```text
Teknisi membuka aplikasi
  -> memilih role Teknisi
  -> membuka Tugas Teknisi
  -> memilih tugas yang diberikan
  -> membuka detail laporan
  -> mengubah status Assigned menjadi In Progress
  -> menambahkan catatan pekerjaan
  -> setelah selesai mengubah status menjadi Resolved
  -> sistem menyimpan komentar dan status history
```

### 4. Admin Close Laporan
Requirement terkait: FR-14, FR-13, BR-07, US-12.

```text
Admin membuka detail laporan Resolved
  -> memeriksa catatan teknisi
  -> menekan Close Laporan
  -> sistem mengubah status menjadi Closed
  -> sistem menyimpan status history
  -> laporan tetap dapat dilihat di daftar dan detail
```

### 5. Laporan Dibuka Kembali
Requirement terkait: FR-15, FR-13, BR-08, US-13.

```text
Pelapor atau admin membuka detail laporan Closed
  -> memilih Reopen
  -> mengisi alasan pembukaan kembali
  -> sistem validasi alasan
  -> sistem mengubah status menjadi Under Review
  -> sistem menyimpan alasan dan status history
```

## Wireframe Teks

### 1. Layout Umum

```text
+------------------------------------------------------------+
| Campus Maintenance                         Role: Admin [v] |
+------------------------------------------------------------+
| Dashboard | Daftar Laporan | Buat Laporan | Tugas Teknisi  |
+------------------------------------------------------------+
|                                                            |
| Konten halaman sesuai menu aktif                           |
|                                                            |
+------------------------------------------------------------+
```

### 2. Dashboard

```text
+------------------------------------------------------------+
| Dashboard                                                  |
+------------------------------------------------------------+
| Total Laporan | Aktif | Urgent | Resolved | Closed         |
+------------------------------------------------------------+
| Ringkasan Status                                           |
| Submitted: 5 | Under Review: 3 | Assigned: 4               |
| In Progress: 6 | Resolved: 2 | Closed: 4                  |
+------------------------------------------------------------+
| Ringkasan Kategori             | Ringkasan Prioritas        |
| Internet: 7                    | Low: 4                    |
| AC: 5                          | Medium: 10                |
| Peralatan Kelas: 6             | High: 7                   |
| Kebersihan: 3                  | Urgent: 3                 |
+------------------------------------------------------------+
| Laporan Terbaru                                             |
| REQ-001 | Proyektor rusak | Ruang 101 | Submitted          |
| REQ-002 | Internet lambat | Lab Komp  | Assigned           |
+------------------------------------------------------------+
```

### 3. Daftar Laporan

```text
+------------------------------------------------------------+
| Daftar Laporan                              [Buat Laporan] |
+------------------------------------------------------------+
| Search: [internet________________]                         |
| Status: [Semua v] Kategori: [Semua v] Prioritas: [Semua v] |
+------------------------------------------------------------+
| ID      | Judul              | Lokasi   | Prioritas | Status |
| REQ-001 | Proyektor rusak    | R.101    | High      | Submitted |
| REQ-002 | Internet lambat    | Lab      | Urgent    | Assigned  |
+------------------------------------------------------------+
| [Lihat Detail] tersedia pada setiap baris                  |
+------------------------------------------------------------+
```

### 4. Form Buat Laporan

```text
+------------------------------------------------------------+
| Buat Laporan Baru                                          |
+------------------------------------------------------------+
| Judul       : [__________________________________________]  |
| Lokasi      : [__________________________________________]  |
| Kategori    : [Internet / AC / Peralatan Kelas / ... v]    |
| Deskripsi   : [__________________________________________]  |
|              [__________________________________________]  |
|              [__________________________________________]  |
+------------------------------------------------------------+
| [Batal]                                      [Simpan]       |
+------------------------------------------------------------+
```

### 5. Detail Laporan

```text
+------------------------------------------------------------+
| REQ-001 - Proyektor Ruang 101 tidak menyala                |
| Status: Submitted | Prioritas: High | Kategori: Peralatan  |
+------------------------------------------------------------+
| Deskripsi                                                  |
| Proyektor tidak menampilkan gambar saat digunakan kelas.   |
+------------------------------------------------------------+
| Informasi                                                  |
| Lokasi     : Ruang 101                                    |
| Pelapor    : Farlen Mahasiswa                             |
| Teknisi    : Belum ditugaskan                             |
| Dibuat     : 2026-06-29                                   |
+------------------------------------------------------------+
| Aksi Role Admin                                            |
| [Review] [Pilih Prioritas] [Assign Teknisi] [Close]        |
+------------------------------------------------------------+
| Komentar dan Catatan                                       |
| [Tulis komentar_________________________________________]  |
| [Tambah Komentar]                                          |
+------------------------------------------------------------+
| Riwayat Status                                             |
| Submitted - dibuat oleh Farlen Mahasiswa                   |
| Under Review - diperiksa oleh Budi Admin                   |
+------------------------------------------------------------+
```

### 6. Assignment Teknisi

```text
+------------------------------------------------------------+
| Assignment Teknisi                                         |
+------------------------------------------------------------+
| Prioritas : [Low / Medium / High / Urgent v]               |
| Teknisi   : [Andi Teknisi IT v]                            |
| Catatan   : [__________________________________________]    |
+------------------------------------------------------------+
| [Assign Teknisi]                                           |
+------------------------------------------------------------+
```

### 7. Tugas Teknisi

```text
+------------------------------------------------------------+
| Tugas Teknisi - Andi Teknisi IT                            |
+------------------------------------------------------------+
| ID      | Judul           | Lokasi | Prioritas | Status     |
| REQ-002 | Internet lambat | Lab    | Urgent    | Assigned   |
+------------------------------------------------------------+
| Detail Tugas                                               |
| [Mulai Pekerjaan] [Tandai Resolved] [Tambah Catatan]       |
+------------------------------------------------------------+
```

### 8. Tampilan Mobile Sederhana

```text
+------------------------------+
| Campus Maintenance           |
| Role: Mahasiswa [v]          |
+------------------------------+
| [Dashboard] [Laporan] [+]    |
+------------------------------+
| REQ-001                      |
| Proyektor rusak              |
| Ruang 101                    |
| High | Submitted             |
| [Detail]                     |
+------------------------------+
```

## Aksi Berdasarkan Role

| Aksi | Mahasiswa | Staff | Admin | Teknisi | Manajer |
|---|---|---|---|---|---|
| Membuat laporan | Ya | Ya | Opsional | Opsional | Tidak utama |
| Melihat daftar laporan | Ya | Ya | Ya | Ya | Ya |
| Melihat detail laporan | Ya | Ya | Ya | Ya | Ya |
| Review laporan | Tidak | Tidak | Ya | Tidak | Tidak |
| Menentukan prioritas | Tidak | Tidak | Ya | Tidak | Tidak |
| Assign teknisi | Tidak | Tidak | Ya | Tidak | Tidak |
| Update status pekerjaan | Tidak | Tidak | Tidak | Ya | Tidak |
| Tambah komentar | Ya | Ya | Ya | Ya | Tidak utama |
| Close laporan | Tidak | Tidak | Ya | Tidak | Tidak |
| Reopen laporan | Ya | Ya | Ya | Tidak | Tidak |
| Melihat dashboard | Terbatas | Terbatas | Ya | Terbatas | Ya |

## Aksi Berdasarkan Status

| Status | Aksi Utama |
|---|---|
| Submitted | Admin dapat review. |
| Under Review | Admin dapat menentukan prioritas dan assign teknisi. |
| Assigned | Teknisi dapat mulai pekerjaan. |
| In Progress | Teknisi dapat menambahkan catatan dan menandai resolved. |
| Resolved | Admin dapat close laporan. |
| Closed | Pelapor atau admin dapat reopen jika masalah belum selesai. |

## Traceability UI ke Requirement

| UI / Flow | Requirement | User Story |
|---|---|---|
| Form Buat Laporan | FR-01, FR-02 | US-01 |
| Daftar Laporan | FR-03 | US-02 |
| Search laporan | FR-04 | US-03 |
| Filter laporan | FR-05 | US-04 |
| Detail Laporan | FR-06, FR-13 | US-05 |
| Tombol Review | FR-07 | US-06 |
| Pilihan Prioritas | FR-08 | US-07 |
| Assignment Teknisi | FR-09 | US-08 |
| Tugas Teknisi | FR-10 | US-09 |
| Update Status Teknisi | FR-11, FR-13 | US-10 |
| Komentar dan Catatan | FR-12 | US-11 |
| Close Laporan | FR-14 | US-12 |
| Reopen Laporan | FR-15 | US-13 |
| Dashboard | FR-16 | US-14 |

## Catatan Implementasi UI
Pada tahap awal, UI dapat menggunakan dummy data dan role selector. Ketika API dan database sudah siap, service frontend dapat diarahkan ke endpoint Cloudflare Workers tanpa mengubah struktur halaman utama.

Fitur yang tidak perlu ditampilkan pada UI scope awal:

- Upload foto.
- Email notification.
- Login Google.
- QR code ruangan.
- AI kategori.
- Inventory spare part.
- Vendor management.
- Cloud Functions.
