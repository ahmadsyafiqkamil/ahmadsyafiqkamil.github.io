# Contentful Setup Guide

## Masalah: Access Token Invalid (401 Error)

Error yang terjadi menunjukkan bahwa token yang digunakan adalah **Content Management API token** (`CFPAT-...`), padahal untuk aplikasi frontend yang hanya membaca data, kita perlu **Content Delivery API token**.

## Cara Mendapatkan Content Delivery API Token

### Langkah 1: Login ke Contentful
1. Buka https://app.contentful.com
2. Login ke akun Anda

### Langkah 2: Buka Space Settings
1. Pilih Space Anda (g5eaudim28lq)
2. Klik **Settings** di menu atas
3. Pilih **API keys**

### Langkah 3: Buat atau Gunakan Content Delivery API Token
1. Di halaman API keys, Anda akan melihat beberapa token:
   - **Content Delivery API** - untuk membaca data (yang kita butuhkan)
   - **Content Preview API** - untuk preview draft content
   - **Content Management API** - untuk write operations (CFPAT-...)

2. **Jika sudah ada Content Delivery API token:**
   - Copy **Access token** (bukan CFPAT-...)
   - Token biasanya panjang dan tidak ada prefix khusus

3. **Jika belum ada, buat baru:**
   - Klik **Add API key**
   - Beri nama (contoh: "Portfolio Blog")
   - Copy **Access token** yang diberikan

### Langkah 4: Update .env.local

Update file `.env.local` dengan token yang benar:

```env
VITE_CONTENTFUL_SPACE_ID=g5eaudim28lq
VITE_CONTENTFUL_ACCESS_TOKEN=<PASTE_CONTENT_DELIVERY_API_TOKEN_DISINI>
VITE_CONTENTFUL_ENVIRONMENT=master
```

**PENTING:**
- Jangan gunakan token yang dimulai dengan `CFPAT-` (itu Management API token)
- Gunakan Content Delivery API token (biasanya lebih panjang, tidak ada prefix khusus)
- Token harus memiliki permission untuk membaca content

### Langkah 5: Restart Dev Server

Setelah update `.env.local`:
1. Stop dev server (Ctrl+C)
2. Start lagi: `npm run dev`
3. Refresh browser

## Verifikasi

Setelah update token, buka `http://localhost:3000/#/test-contentful` dan:
1. Klik "Debug Contentful"
2. Cek apakah masih ada error 401
3. Jika berhasil, Anda akan melihat content types dan entries

## Perbedaan Token Types

| Token Type | Prefix | Use Case | Read Data? |
|------------|--------|----------|------------|
| Content Delivery API | None | Public read access | ✅ Yes |
| Content Preview API | None | Preview draft content | ✅ Yes (draft) |
| Content Management API | CFPAT- | Write/edit content | ❌ No |

Untuk aplikasi frontend yang hanya membaca published content, gunakan **Content Delivery API token**.
