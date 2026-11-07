# Security Policy

## Melaporkan kerentanan

Kalau menemukan kerentanan keamanan di repo ini, **jangan** dibuka sebagai issue publik. Laporkan lewat GitHub Private Vulnerability Reporting di repo ini (tab Security > Report a vulnerability), atau hubungi maintainer repo secara langsung.

Sertakan di laporan: langkah reproduksi, dampak yang mungkin terjadi, dan kalau ada, saran perbaikan. Laporan akan dibaca dan ditindaklanjuti secepatnya. Jangan menguji kerentanan terhadap data produksi atau akun orang lain.

## Ruang lingkup

Repo ini adalah frontend CMS. Kerentanan di sisi server (validasi, otorisasi, rate limiting, penyimpanan data) umumnya milik [himti-api](https://github.com/LitbangHimtiUMT/himti-api) — laporkan ke repo itu. Yang masuk ruang lingkup repo ini antara lain: token yang bocor ke UI atau log, XSS, dan kontrol akses yang salah di tampilan sehingga pengguna bisa melakukan aksi yang bukan haknya.

## Aturan dasar

- Jangan pernah commit secret, token, password, atau API key ke repo, termasuk ke git history. Kalau tidak sengaja ter-commit, kabari maintainer segera supaya secret-nya bisa di-revoke, lalu bersihkan dari history.
- Token autentikasi tidak disimpan di repo. API memakai JWT; kredensial hanya ada di environment masing-masing deployment.
- Akses admin dan super admin dibatasi. Perubahan role hanya boleh dilakukan SUPER_ADMIN, baik di UI maupun di server.
- Dependency yang punya kerentanan diketahui akan diperbarui begitu ada perbaikan yang tersedia.

## Versi yang didukung

Branch `dev` (yang sedang berjalan) dan yang sudah live di production. Branch lama yang sudah di-merge tidak lagi diperbaiki.
