# Contributing

Terima kasih sudah mau berkontribusi ke HIMTI CMS. Aturan di bawah ini dibuat supaya repo tetap gampang dirawat, termasuk oleh penerus yang belum tentu paham semua konteksnya.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Alur kerja

1. Branch dari `dev`, bukan dari `main`. Nama branch: `fix/<topik>` untuk perbaikan, `feat/<topik>` untuk fitur baru.
2. Kerjakan satu perubahan logis per branch. Kalau ketemu masalah lain di tengah jalan, catat saja, jangan dicampur ke branch yang sama.
3. Satu commit per perubahan logis. Pesan commit pakai conventional commits, ditulis seperti engineer nulis, singkat dan jelas: `fix(users): ...`, `feat(acara): ...`, `chore(deps): ...`.
4. Pull request ke `dev`. Jelaskan di deskripsi PR: apa yang diubah, kenapa, dan bagaimana cara ngetesnya. Kalau ada screenshot perubahan UI, lampirkan.
5. Jangan merge sendiri tanpa review kalau PR-nya menyentuh auth, role, atau penghapusan data.

## Sebelum push

Jalankan dan pastikan lolos:

```bash
npm run build
npm run lint
```

Build yang lolos saja tidak cukup. Cek juga: tidak ada bug yang kelihatan, tidak ada duplikasi kode yang tidak perlu, tidak ada data yang hilang atau tertukar, dan tidak ada secret yang kebawa ke repo atau log.

## Hal-hal yang tidak boleh dilakukan

- Jangan commit file `.env`, secret, token, atau password dalam bentuk apa pun.
- Jangan mengubah perilaku role, auth, atau middleware tanpa diskusi dulu.
- Jangan menambah dependency berat tanpa alasan yang jelas. CMS ini di-hosting dengan resource terbatas.
- Jangan mengubah branch `main` langsung. `main` hanya menerima hasil sync dari `dev`.

## Kode

- TypeScript, hindari `any` kalau bisa dihindari.
- Ikuti pola yang sudah ada di modul sebelahnya dulu sebelum bikin pola baru. Kalau dua komponen melakukan hal yang sama, pakai yang sudah ada.
- Jangan biarkan kode yang di-comment-out menumpuk. Kalau sudah tidak dipakai, hapus saja.

## Butuh bantuan?

Buka issue di repo ini dengan penjelasan yang jelas: langkah reproduksi, yang diharapkan, dan yang sebenarnya terjadi.
