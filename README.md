# HIMTI CMS

Admin panel untuk himtiumt.org. Dipakai pengurus HIMTI UMT untuk mengelola konten dan data yang tampil di web utama, LMS, dan layanan HIMTI lainnya. Semua data diambil dan disimpan lewat HIMTI API, repo ini murni frontend.

**Status: production-ready.** Live di https://cms.himtiumt.org, deploy otomatis dari branch `dev` via Vercel. Audit terakhir 7 November 2026: tidak ada temuan Critical; temuan High/Medium sudah diperbaiki dan di-merge ke `dev`.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS, Material Tailwind, MUI
- React Router 6, TanStack Query, axios
- API: [himti-api](https://github.com/LitbangHimtiUMT/himti-api) (`https://api.himtiumt.org`)

## Fitur

- Manajemen pengguna dan role (USER, ANGGOTA, ADMIN, SUPER_ADMIN)
- Acara dan sub-acara (rundown, tanpa absensi di sub-acara), pendaftaran acara
- Anggota, angkatan, dosen, struktural, prodi structural
- Periode, contact info, potential user keys
- Event meeting dan absensi
- LMS: kategori, kelas, mentor
- Histories dan manajemen versi

## Menjalankan lokal

Butuh Node.js 18+ dan npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Buka http://localhost:5173, login dengan akun admin.

Perintah lain:

```bash
npm run build    # tsc + vite build
npm run lint     # eslint
npm run preview  # jalankan hasil build
```

## Environment variables

Salin `.env.example` ke `.env`. Variabel yang dipakai:

| Variabel | Keterangan |
| --- | --- |
| `HIMTI_BASE_URL` | Base URL API, default `https://api.himtiumt.org` |
| `HIMTI_APP_NAME` | Nama aplikasi yang tampil di UI |

API autentikasi pakai JWT saja. Tidak ada API key atau secret yang perlu diisi di sini, dan jangan pernah commit file `.env` atau secret apa pun ke repo.

## Struktur proyek

```
src/
  core/       # config, service API, model, util, aset
  features/   # fitur per modul (admin, auth, lms, ...)
  @types/     # deklarasi tipe tambahan
```

Service API ada di `src/core/services/`, satu file per modul. Routing ada di `src/core/utils/routes.tsx`, menu sidebar di `src/features/_global/config/ConfigMenus.tsx`.

## Branching

Branch utama adalah `dev`. Semua perubahan masuk lewat pull request ke `dev`, satu commit per perubahan logis, pesan commit gaya conventional commits (`fix(users): ...`). Sebelum push, pastikan `npm run build` dan `npm run lint` lolos. Detailnya ada di [CONTRIBUTING.md](CONTRIBUTING.md).

## Repo terkait

- [himti-api](https://github.com/LitbangHimtiUMT/himti-api) — backend yang dipakai CMS ini
- [himti-web-revamp](https://github.com/LitbangHimtiUMT/himti-web-revamp) — web utama himtiumt.org

## Lisensi

MIT. Lihat [LICENSE](LICENSE).
