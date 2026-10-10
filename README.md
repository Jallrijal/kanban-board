# Kanban Board

Aplikasi papan Kanban sederhana untuk mencatat dan mengelola tugas secara visual. Pindahkan tugas antarstatus, atur prioritas dan tenggat, lalu temukan tugas dengan pencarian. Data disimpan di browser sehingga tetap tersedia setelah halaman dimuat ulang.

## Fitur

- Mengelola tugas: tambah, edit, dan hapus dengan konfirmasi.
- Mengatur tugas dalam tiga kolom: **To Do**, **In Progress**, dan **Done**.
- Memindahkan tugas antar kolom dan mengurutkannya dengan drag-and-drop.
- Mendukung drag-and-drop menggunakan keyboard.
- Menambahkan deskripsi, prioritas, dan tenggat waktu pada tugas.
- Menandai tenggat yang sudah terlewat.
- Mencari tugas berdasarkan judul, deskripsi, atau label.
- Menyimpan tugas secara otomatis di `localStorage` browser.
- Mengikuti preferensi tema terang atau gelap dari sistem operasi.

## Tech Stack

- **React 19** — antarmuka pengguna.
- **JavaScript** — bahasa pemrograman.
- **Vite 8** — server pengembangan dan proses build.
- **Tailwind CSS 4** — styling.
- **dnd-kit** — drag-and-drop yang mendukung keyboard.
- **nanoid** — pembuatan ID tugas.
- **localStorage** — penyimpanan data di browser.

## Instalasi dan Menjalankan Aplikasi

Pastikan [Node.js](https://nodejs.org/) versi **20.19+** atau **22.12+** dan npm sudah terpasang.

1. Clone repositori dan masuk ke folder proyek:

   ```bash
   git clone https://github.com/Jallrijal/kanban-board.git
   cd kanban-board
   ```

2. Pasang dependensi:

   ```bash
   npm install
   ```

3. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

4. Buka URL lokal yang ditampilkan di terminal, biasanya `http://localhost:5173`.

## Perintah Tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Membuat build produksi di folder `dist` |
| `npm run preview` | Meninjau build produksi secara lokal |
| `npm run lint` | Memeriksa kode dengan ESLint |

> Data disimpan di `localStorage` browser yang digunakan dan tidak disinkronkan ke perangkat atau pengguna lain.
