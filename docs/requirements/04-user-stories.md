# 04 - User Stories

## Tujuan
Dokumen ini mengubah requirement menjadi user story dan acceptance criteria. Setiap user story memiliki minimal dua acceptance criteria agar dapat diuji.

## User Stories dan Acceptance Criteria

### US-01 - Membuat Laporan Baru
Sebagai pelapor, saya ingin membuat laporan kerusakan fasilitas agar masalah di kampus dapat diketahui dan ditangani.

Requirement terkait: FR-01, FR-02

Acceptance Criteria:
- AC-01.1: Sistem menerima input judul, deskripsi, lokasi, kategori, dan pelapor.
- AC-01.2: Setelah laporan dikirim, sistem membuat nomor laporan dan status awal Submitted.
- AC-01.3: Sistem menolak laporan jika field wajib kosong.

### US-02 - Melihat Daftar Laporan
Sebagai pengguna, saya ingin melihat daftar laporan agar saya dapat mengetahui laporan yang sudah masuk ke sistem.

Requirement terkait: FR-03

Acceptance Criteria:
- AC-02.1: Sistem menampilkan daftar laporan dengan nomor, judul, lokasi, kategori, prioritas, dan status.
- AC-02.2: Daftar laporan tetap tampil setelah halaman di-refresh.

### US-03 - Mencari Laporan
Sebagai pengguna, saya ingin mencari laporan berdasarkan kata kunci agar saya dapat menemukan laporan tertentu dengan cepat.

Requirement terkait: FR-04

Acceptance Criteria:
- AC-03.1: Sistem dapat mencari laporan berdasarkan judul atau lokasi.
- AC-03.2: Jika tidak ada hasil, sistem menampilkan pesan bahwa laporan tidak ditemukan.

### US-04 - Menyaring Laporan
Sebagai pengguna, saya ingin menyaring laporan berdasarkan status, kategori, dan prioritas agar daftar laporan lebih mudah dianalisis.

Requirement terkait: FR-05

Acceptance Criteria:
- AC-04.1: Sistem dapat menampilkan laporan berdasarkan status yang dipilih.
- AC-04.2: Sistem dapat menggabungkan filter status, kategori, dan prioritas.

### US-05 - Melihat Detail Laporan
Sebagai pengguna, saya ingin melihat detail laporan agar saya dapat memahami informasi lengkap dan progres penanganan.

Requirement terkait: FR-06, FR-13

Acceptance Criteria:
- AC-05.1: Sistem menampilkan detail laporan, komentar, dan riwayat status.
- AC-05.2: Sistem menampilkan status terbaru laporan secara jelas.

### US-06 - Memeriksa Laporan
Sebagai administrator, saya ingin memeriksa laporan baru agar laporan dapat diproses ke tahap berikutnya.

Requirement terkait: FR-07

Acceptance Criteria:
- AC-06.1: Administrator dapat mengubah status laporan dari Submitted menjadi Under Review.
- AC-06.2: Sistem mencatat perubahan status ke riwayat status.

### US-07 - Menentukan Prioritas
Sebagai administrator, saya ingin menentukan prioritas laporan agar laporan penting dapat ditangani lebih cepat.

Requirement terkait: FR-08

Acceptance Criteria:
- AC-07.1: Administrator dapat memilih prioritas Low, Medium, High, atau Urgent.
- AC-07.2: Prioritas yang dipilih tampil pada daftar dan detail laporan.

### US-08 - Menugaskan Teknisi
Sebagai administrator, saya ingin menugaskan laporan kepada teknisi agar ada pihak yang bertanggung jawab menangani laporan.

Requirement terkait: FR-09

Acceptance Criteria:
- AC-08.1: Administrator dapat memilih teknisi untuk sebuah laporan.
- AC-08.2: Setelah teknisi dipilih, status laporan berubah menjadi Assigned.

### US-09 - Melihat Tugas Teknisi
Sebagai teknisi, saya ingin melihat tugas yang ditugaskan kepada saya agar saya tahu pekerjaan yang harus dilakukan.

Requirement terkait: FR-10

Acceptance Criteria:
- AC-09.1: Sistem menampilkan daftar laporan yang ditugaskan kepada teknisi.
- AC-09.2: Teknisi dapat membuka detail laporan dari daftar tugas.

### US-10 - Memperbarui Status Pekerjaan
Sebagai teknisi, saya ingin memperbarui status pekerjaan agar admin dan pelapor mengetahui progres penanganan.

Requirement terkait: FR-11, FR-13

Acceptance Criteria:
- AC-10.1: Teknisi dapat mengubah status Assigned menjadi In Progress.
- AC-10.2: Teknisi dapat mengubah status In Progress menjadi Resolved.
- AC-10.3: Sistem menyimpan riwayat perubahan status.

### US-11 - Menambahkan Komentar
Sebagai pengguna, saya ingin menambahkan komentar pada laporan agar informasi tambahan dapat dicatat.

Requirement terkait: FR-12

Acceptance Criteria:
- AC-11.1: Pelapor, administrator, dan teknisi dapat menambahkan komentar.
- AC-11.2: Komentar menampilkan nama pembuat, isi komentar, dan waktu dibuat.

### US-12 - Menutup Laporan
Sebagai administrator, saya ingin menutup laporan agar laporan yang selesai tidak tercampur dengan laporan aktif.

Requirement terkait: FR-14

Acceptance Criteria:
- AC-12.1: Administrator dapat mengubah status Resolved menjadi Closed.
- AC-12.2: Laporan Closed tetap dapat dilihat di daftar laporan.

### US-13 - Membuka Kembali Laporan
Sebagai pelapor atau administrator, saya ingin membuka kembali laporan jika masalah belum selesai agar laporan dapat ditangani ulang.

Requirement terkait: FR-15

Acceptance Criteria:
- AC-13.1: Laporan yang sudah Closed dapat diubah kembali menjadi Under Review.
- AC-13.2: Sistem mencatat alasan pembukaan kembali laporan.

### US-14 - Melihat Dashboard
Sebagai administrator atau manajer fasilitas, saya ingin melihat dashboard agar saya dapat mengetahui ringkasan kondisi laporan fasilitas.

Requirement terkait: FR-16

Acceptance Criteria:
- AC-14.1: Dashboard menampilkan jumlah laporan berdasarkan status.
- AC-14.2: Dashboard menampilkan ringkasan laporan berdasarkan kategori dan prioritas.

## Catatan
User story ini akan digunakan untuk membuat GitHub Issues, test case, dan traceability matrix.
