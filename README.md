# 🚀 Hashtag Generator Pro — Panduan Deploy ke Vercel

Aplikasi AI-powered Hashtag Generator siap deploy. Ikuti langkah berikut.

---

## 📋 Yang Kamu Butuhkan

- Akun **GitHub** (gratis) → https://github.com
- Akun **Vercel** (gratis) → https://vercel.com
- **Anthropic API Key** → https://console.anthropic.com

---

## 🔑 STEP 1 — Dapatkan Anthropic API Key

1. Buka https://console.anthropic.com
2. Daftar / Login
3. Klik **"API Keys"** di sidebar kiri
4. Klik **"Create Key"** → beri nama misal `hashtag-pro`
5. **Copy dan simpan** API key-nya (hanya ditampilkan sekali!)
   Contoh: `sk-ant-api03-xxxxxxxxxxxxx`

> ⚠️ **Penting:** API Anthropic berbayar per penggunaan.
> Untuk estimasi biaya, model `claude-3-5-haiku` sangat murah (~$0.001 per generate).
> Tambahkan credit minimal $5 di https://console.anthropic.com/settings/billing

---

## 📁 STEP 2 — Upload ke GitHub

### Cara A: Via GitHub Web (Tanpa Git)

1. Buka https://github.com/new
2. Beri nama repo: `hashtag-generator-pro`
3. Pilih **Public** atau **Private** → klik **Create repository**
4. Klik **"uploading an existing file"**
5. Upload **semua file & folder** dari project ini:
   ```
   hashtag-generator-pro/
   ├── api/
   │   └── generate.js        ← Backend API (jangan lupa!)
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── index.js
   │   └── App.js
   ├── package.json
   └── vercel.json
   ```
6. Klik **Commit changes**

### Cara B: Via Terminal (Jika punya Git)

```bash
cd hashtag-generator-pro
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/hashtag-generator-pro.git
git push -u origin main
```

---

## ▲ STEP 3 — Deploy ke Vercel

1. Buka https://vercel.com → Login dengan akun GitHub
2. Klik **"Add New Project"**
3. Pilih repo `hashtag-generator-pro` → klik **Import**
4. Pada bagian **"Configure Project"**:
   - Framework Preset: **Create React App**
   - Root Directory: `.` (biarkan default)
5. Klik **"Environment Variables"** → tambahkan:
   ```
   Name  : ANTHROPIC_API_KEY
   Value : sk-ant-api03-xxxxxxxxxxxxx   ← API key kamu
   ```
6. Klik **Deploy** → tunggu ~2 menit

---

## ✅ STEP 4 — Selesai! Aplikasi Live

Setelah deploy selesai, Vercel memberikan URL seperti:
```
https://hashtag-generator-pro.vercel.app
```

URL ini bisa langsung dibagikan ke siapapun!

---

## 🌐 Custom Domain (Opsional)

Jika ingin domain sendiri seperti `hashtagpro.com`:

1. Beli domain di Niagahoster, Namecheap, dll
2. Di Vercel → Project → **Settings** → **Domains**
3. Tambahkan domain → ikuti instruksi DNS

---

## 🔄 Update Aplikasi

Setiap kali push ke GitHub, Vercel otomatis **re-deploy** dalam ~1 menit.

```bash
# Edit file → lalu:
git add .
git commit -m "Update fitur X"
git push
```

---

## ❓ Troubleshooting

| Problem | Solusi |
|---|---|
| "API key not configured" | Pastikan `ANTHROPIC_API_KEY` sudah ditambah di Vercel → Settings → Environment Variables |
| Gagal generate | Cek billing Anthropic, pastikan ada credit |
| White screen | Buka browser console (F12), lihat error message |
| Deploy gagal | Pastikan semua file sudah di-upload, termasuk folder `api/` |

---

## 💰 Estimasi Biaya

| Item | Biaya |
|---|---|
| Vercel Hosting | **GRATIS** (Free tier) |
| Domain .com | ~Rp 150.000/tahun (opsional) |
| Anthropic API | ~$0.001 per generate (sangat murah) |
| 1000 generate/bulan | ~$1/bulan |

---

Dibuat dengan ❤️ menggunakan React + Vercel + Claude AI
