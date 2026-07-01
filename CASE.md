# Campus Service Request and Maintenance System

## 1. Judul Proyek dan Deskripsi Singkat

**Judul Proyek:** Campus Service Request and Maintenance System

**Deskripsi Singkat:**
Sistem ini dirancang untuk memfasilitasi pelaporan, penanganan, dan pemantauan permintaan layanan pemeliharaan fasilitas kampus. Sistem memungkinkan pelapor mengirimkan laporan kerusakan atau kebutuhan layanan, administrator mengelola prioritas dan penugasan, teknisi memproses pekerjaan, serta manajer fasilitas memantau perkembangan penanganan secara keseluruhan.

---

## 2. Aktor Sistem

Berikut aktor utama yang terlibat dalam sistem:

- **Pelapor**
  - Mengirimkan laporan masalah atau permintaan pemeliharaan.
  - Melihat status laporan yang telah dibuat.
  - Menambahkan komentar pada laporan yang sedang diproses.

- **Administrator**
  - Mengelola daftar laporan secara menyeluruh.
  - Menentukan prioritas laporan.
  - Menugaskan laporan kepada teknisi yang sesuai.
  - Memantau proses review dan penanganan.

- **Teknisi**
  - Melihat laporan yang ditugaskan kepada dirinya.
  - Memperbarui status pekerjaan.
  - Menambahkan catatan kerja atau komentar teknis.

- **Manajer Fasilitas**
  - Melihat ringkasan performa penanganan layanan.
  - Memantau laporan prioritas tinggi dan progress penyelesaian.
  - Menilai efektivitas pemeliharaan fasilitas kampus.

---

## 3. Alur Status Laporan

Laporan layanan akan melewati tahapan status berikut secara berurutan:

1. **Submitted** – laporan baru telah dibuat dan masuk ke sistem.
2. **Under Review** – laporan sedang diperiksa oleh administrator.
3. **Assigned** – laporan telah ditugaskan ke teknisi tertentu.
4. **In Progress** – teknisi sedang menangani laporan.
5. **Resolved** – pekerjaan dianggap selesai.
6. **Closed** – laporan ditutup setelah verifikasi akhir.

### Representasi Alur

```text
Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed
```

---

## 4. Functional Requirements (FR)

Berikut adalah daftar kebutuhan fungsional minimum yang harus tersedia pada sistem:

### FR-01: Pembuatan Laporan
Sistem harus memungkinkan pelapor membuat laporan baru dengan data minimal berupa judul, deskripsi, lokasi, dan kategori masalah.

### FR-02: Penyimpanan Data Laporan
Sistem harus menyimpan laporan yang dibuat beserta metadata seperti ID laporan, tanggal dibuat, prioritas, status, dan pelapor terkait.

### FR-03: Detail Laporan
Sistem harus menyediakan halaman detail laporan yang menampilkan informasi lengkap laporan, termasuk deskripsi, lokasi, kategori, prioritas, pelapor, dan teknisi terkait.

### FR-04: Daftar Laporan
Sistem harus menampilkan daftar seluruh laporan yang tersedia dalam bentuk terstruktur dan mudah dibaca.

### FR-05: Pencarian Laporan
Sistem harus memungkinkan pengguna mencari laporan berdasarkan kata kunci seperti judul atau lokasi.

### FR-06: Filter Laporan
Sistem harus memungkinkan pengguna memfilter laporan berdasarkan status, kategori, dan prioritas.

### FR-07: Penugasan Teknisi
Administrator harus dapat menugaskan laporan kepada teknisi tertentu melalui antarmuka sistem.

### FR-08: Penetapan Prioritas
Administrator harus dapat mengubah prioritas laporan, misalnya Low, Medium, High, atau Urgent.

### FR-09: Form Komentar
Sistem harus memungkinkan pengguna menambahkan komentar atau catatan pada laporan tertentu.

### FR-10: Timeline Riwayat Status
Sistem harus menampilkan riwayat perubahan status laporan secara kronologis sebagai timeline.

### FR-11: Status Update oleh Teknisi
Teknisi harus dapat memperbarui status laporan yang ditugaskan kepada dirinya sesuai tahapan pemrosesan.

### FR-12: Tampilan Berbasis Peran
Sistem harus menampilkan antarmuka yang berbeda sesuai peran pengguna (pelapor, administrator, teknisi, dan manajer fasilitas).

### FR-13: Login Simulasi Multi-Aktor
Sistem harus menyediakan mekanisme login simulasi sederhana yang memungkinkan pengguna masuk sebagai pelapor, administrator, atau teknisi melalui input dummy dan penyimpanan sesi lokal.

### FR-14: Logout Session
Sistem harus menyediakan fitur logout yang menghapus sesi aktif dan mengembalikan pengguna ke halaman login simulasi.

---

## 5. Non-Functional Requirements (NFR)

Berikut kebutuhan non-fungsional yang wajib dipenuhi:

### NFR-01: Performa
Sistem harus mampu menampilkan daftar laporan dan detail laporan dalam waktu yang cepat, dengan respons yang terasa lancar untuk data dalam jumlah kecil sampai menengah.

### NFR-02: Responsivitas Mobile
Antarmuka harus dapat digunakan dengan baik pada perangkat mobile dan tablet, termasuk layout yang menyesuaikan ukuran layar.

### NFR-03: Kemudahan Penggunaan (Usability)
Tata letak sistem harus sederhana, jelas, dan intuitif agar pengguna baru dapat memahami alur kerja tanpa pelatihan yang rumit.

### NFR-04: Konsistensi UI
Desain antarmuka harus konsisten pada seluruh halaman, termasuk halaman dashboard, daftar laporan, detail laporan, form komentar, dan halaman login.

### NFR-05: Keandalan Data Sesi
Sistem harus menjaga konsistensi status sesi pengguna selama satu interaksi, termasuk saat login simulasi dan logout.

### NFR-06: Aksesibilitas Dasar
Elemen interaktif seperti tombol, form, dan navigasi harus mudah dipahami dan dapat digunakan dengan jelas melalui tampilan visual yang konsisten.

---

## 6. Business Rules (BR)

Berikut aturan bisnis yang diterapkan pada sistem:

### BR-01: Laporan Wajib Memiliki Informasi Dasar
Setiap laporan baru wajib memiliki judul, deskripsi, lokasi, dan kategori sebelum dapat disimpan.

### BR-02: Status Laporan Harus Mengikuti Alur yang Benar
Perubahan status laporan hanya boleh mengikuti urutan yang sudah ditentukan: Submitted, Under Review, Assigned, In Progress, Resolved, Closed.

### BR-03: Prioritas Dapat Diubah oleh Administrator
Hanya administrator yang diperbolehkan mengubah prioritas laporan.

### BR-04: Penugasan Hanya Dapat Dilakukan oleh Administrator
Penugasan laporan kepada teknisi hanya dapat dilakukan oleh administrator.

### BR-05: Komentar Hanya Dapat Ditambahkan pada Laporan yang Ada
Komentar hanya boleh ditambahkan pada laporan yang sudah tersedia dalam sistem.

### BR-06 (Session Security): Pengguna yang sedang aktif dalam satu sesi peran tidak diizinkan mengubah perannya secara langsung dari dalam sistem. Untuk mengganti peran, pengguna wajib melakukan proses "Logout" terlebih dahulu untuk membersihkan token sesi lokal (localStorage).

---

## 7. Ringkasan Tujuan Sistem

Sistem ini bertujuan untuk memberikan solusi digital sederhana namun efektif untuk mengelola permintaan layanan pemeliharaan kampus, mulai dari pelaporan, review, penugasan, pemantauan status, hingga komunikasi antar pihak terkait.

---

## 8. Catatan Tambahan

Dokumen ini disusun sebagai spesifikasi kebutuhan awal untuk pengembangan frontend dan alur simulasi multi-aktor pada sistem Campus Service Request and Maintenance System.
