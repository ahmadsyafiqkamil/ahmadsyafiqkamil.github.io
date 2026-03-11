# Panduan Setup Contentful untuk Blog

Dokumentasi ini menjelaskan langkah-langkah untuk mengatur Contentful CMS agar aplikasi blog dapat mengambil data artikel dari Contentful.

## Prerequisites

1. Akun Contentful (gratis tersedia di [contentful.com](https://www.contentful.com))
2. Space ID dan Access Token dari Contentful
3. Environment variables sudah dikonfigurasi (lihat `.env.example`)

## Langkah 1: Membuat Content Type "BlogPost"

1. Login ke [Contentful Web App](https://app.contentful.com)
2. Pilih space Anda
3. Navigasi ke **Content model** di sidebar kiri
4. Klik **Add content type**
5. Isi nama: `BlogPost` (pastikan menggunakan huruf kapital B dan P)
6. Klik **Create**

## Langkah 2: Menambahkan Fields ke Content Type

Tambahkan fields berikut ke Content Type `BlogPost`:

### Field 1: title
- **Field ID**: `title`
- **Name**: Title
- **Type**: Short text, single line
- **Required**: ✅ Yes
- **Appearance**: Default

### Field 2: slug
- **Field ID**: `slug`
- **Name**: Slug
- **Type**: Short text, single line
- **Required**: ✅ Yes
- **Appearance**: Slug (untuk auto-generate dari title)
- **Validation**: Unique values ✅

### Field 3: excerpt
- **Field ID**: `excerpt`
- **Name**: Excerpt
- **Type**: Short text, single line
- **Required**: ✅ Yes
- **Appearance**: Default

### Field 4: image
- **Field ID**: `image`
- **Name**: Image
- **Type**: Media
- **Required**: ✅ Yes
- **Appearance**: Default
- **Validations**: 
  - Accepted media types: Images only ✅

### Field 5: category
- **Field ID**: `category`
- **Name**: Category
- **Type**: Short text, single line
- **Required**: ✅ Yes
- **Appearance**: Default

### Field 6: date
- **Field ID**: `date`
- **Name**: Date
- **Type**: Date & time
- **Required**: ✅ Yes
- **Appearance**: Default

### Field 7: readTime
- **Field ID**: `readTime`
- **Name**: Read Time
- **Type**: Short text, single line
- **Required**: ✅ Yes
- **Appearance**: Default
- **Hint**: Contoh: "8 min read"

### Field 8: tags
- **Field ID**: `tags`
- **Name**: Tags
- **Type**: Short text, list
- **Required**: ❌ No
- **Appearance**: Default

### Field 9: introduction
- **Field ID**: `introduction`
- **Name**: Introduction
- **Type**: Rich text
- **Required**: ✅ Yes
- **Appearance**: Default
- **Description**: Paragraf pembuka artikel. Gunakan Rich Text Editor untuk formatting (bold, italic, links, dll)

### Field 10: body
- **Field ID**: `body`
- **Name**: Body
- **Type**: Rich text
- **Required**: ✅ Yes
- **Appearance**: Default
- **Description**: **INI ADALAH FIELD UTAMA UNTUK KONTEN BLOG**. Gunakan Rich Text Editor untuk menulis konten utama artikel.

**Fitur Rich Text Editor yang tersedia:**
- **Headings** (H1, H2, H3, H4): Untuk judul section
- **Bold & Italic**: Untuk emphasis
- **Lists**: Bulleted dan numbered lists
- **Links**: Hyperlinks ke website lain
- **Code blocks**: Untuk menampilkan code dengan syntax highlighting
- **Quotes**: Blockquotes untuk kutipan
- **Images**: Embed gambar langsung dari Contentful
- **Line breaks**: Untuk spacing

**Tips menggunakan Rich Text Editor:**
- Gunakan Heading 2 (H2) untuk judul section utama
- Gunakan Heading 3 (H3) untuk sub-section
- Gunakan code blocks untuk menampilkan code snippets
- Embed images langsung dari Contentful untuk performa yang lebih baik
- Gunakan lists untuk membuat poin-poin penting

### Field 11: conclusion
- **Field ID**: `conclusion`
- **Name**: Conclusion
- **Type**: Rich text
- **Required**: ✅ Yes
- **Appearance**: Default
- **Description**: Paragraf penutup/kesimpulan artikel. Gunakan Rich Text Editor untuk formatting

## Langkah 3: Publish Content Type

Setelah semua fields ditambahkan:

1. Klik **Save** di kanan atas
2. Klik **Publish** untuk mempublish content type
3. Content type sekarang siap digunakan

## Langkah 4: Membuat Blog Post Pertama

1. Navigasi ke **Content** di sidebar
2. Klik **Add entry**
3. Pilih **BlogPost**
4. Isi semua field yang required:

**Contoh data untuk testing:**

- **Title**: "Building Scalable React Applications with TypeScript"
- **Slug**: "scalable-react-typescript" (akan auto-generate dari title)
- **Excerpt**: "Learn best practices for structuring large-scale React applications using TypeScript, including design patterns and performance optimization techniques."
- **Image**: Upload gambar atau gunakan URL gambar
- **Category**: "React"
- **Date**: Pilih tanggal publikasi
- **Read Time**: "8 min read"
- **Tags**: ["React", "TypeScript", "Architecture", "Best Practices"]
- **Introduction**: "Building large-scale React applications requires careful planning and adherence to best practices..."

- **Sections** (JSON) - **INI ADALAH FIELD UTAMA UNTUK KONTEN BLOG**:
```json
[
  {
    "heading": "Project Structure and Organization",
    "content": "A well-organized project structure is the foundation of scalability. Use feature-based folder organization rather than type-based. Group related components, hooks, and utilities together. This makes it easier to locate code and understand the relationships between different parts of your application.",
    "codeExample": {
      "language": "typescript",
      "code": "src/\n  features/\n    auth/\n      components/\n        LoginForm.tsx\n      hooks/\n        useAuth.ts"
    }
  },
  {
    "heading": "Type-Safe Component Patterns",
    "content": "TypeScript enables you to create robust, self-documenting components. Always define explicit prop types and use generics for reusable components. This catches errors early and improves the developer experience with better autocomplete."
  },
  {
    "heading": "State Management and Performance",
    "content": "Choose the right state management solution for your needs. For global state, consider Zustand or Redux Toolkit with TypeScript. Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  }
]
```

**Penjelasan Field Sections:**
- **`heading`** (required): Judul section (contoh: "Project Structure", "Best Practices")
- **`content`** (required): Isi konten section dalam bentuk teks
- **`codeExample`** (optional): Object untuk menampilkan code block dengan:
  - `language`: Bahasa pemrograman (contoh: "typescript", "javascript", "css")
  - `code`: Kode yang akan ditampilkan
- **`image`** (optional): URL gambar untuk section tersebut

**Tips mengisi Sections:**
- Setiap object dalam array adalah satu section
- Anda bisa membuat banyak section sesuai kebutuhan
- Section tanpa `codeExample` dan `image` tetap valid (hanya perlu `heading` dan `content`)

- **Conclusion**: "Building scalable React applications with TypeScript requires discipline and adherence to best practices..."

5. Klik **Publish** untuk mempublish entry

## Langkah 5: Mengatur Environment Variables

### Development (Local)

Buat file `.env.local` di root project:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

### Production (GitHub Pages)

Tambahkan secrets di GitHub repository:

1. Buka repository di GitHub
2. Navigasi ke **Settings** → **Secrets and variables** → **Actions**
3. Tambahkan secrets berikut:
   - `VITE_CONTENTFUL_SPACE_ID`: Space ID Anda
   - `VITE_CONTENTFUL_ACCESS_TOKEN`: Access Token (Delivery API token)
   - `VITE_CONTENTFUL_ENVIRONMENT`: `master` (atau environment lain)

## Langkah 6: Mendapatkan Credentials dari Contentful

### Space ID
1. Di Contentful dashboard, klik **Settings** → **General settings**
2. Copy **Space ID**

### Access Token (Delivery API)
1. Di Contentful dashboard, klik **Settings** → **API keys**
2. Klik **Add API key** atau gunakan yang sudah ada
3. Copy **Content Delivery API - access token**
4. **PENTING**: Gunakan Delivery API token, bukan Management API token

## Testing

Setelah setup selesai:

1. Pastikan environment variables sudah di-set
2. Jalankan aplikasi: `npm run dev`
3. Navigasi ke section Blog di aplikasi
4. Blog posts dari Contentful seharusnya muncul

## Troubleshooting

### Blog posts tidak muncul
- ✅ Pastikan Content Type sudah di-publish
- ✅ Pastikan Blog Post entries sudah di-publish
- ✅ Pastikan environment variables sudah benar
- ✅ Check browser console untuk error messages
- ✅ Pastikan menggunakan Delivery API token, bukan Management API token

### Error: "Contentful credentials are missing"
- ✅ Pastikan file `.env.local` ada di root project
- ✅ Pastikan nama variable dimulai dengan `VITE_`
- ✅ Restart development server setelah menambahkan environment variables

### Error: "Content type not found"
- ✅ Pastikan Content Type ID adalah `blogPost` (case-sensitive)
- ✅ Pastikan Content Type sudah di-publish

### Rich Text tidak tampil dengan benar
- ✅ Pastikan field menggunakan tipe "Rich text", bukan "Long text" atau "JSON object"
- ✅ Pastikan Rich Text content sudah di-publish
- ✅ Check browser console untuk error rendering
- ✅ Pastikan package @contentful/rich-text-react-renderer sudah terinstall

## Tips

1. **Slug**: Pastikan setiap blog post memiliki slug yang unik
2. **Date**: Gunakan format date yang konsisten untuk sorting
3. **Images**: Upload gambar ke Contentful dan embed langsung di Rich Text untuk performa yang lebih baik
4. **Rich Text**: Gunakan Rich Text Editor dengan konsisten:
   - H2 untuk judul section utama
   - H3 untuk sub-section
   - Code blocks untuk code snippets
   - Bold/Italic untuk emphasis
5. **Categories**: Buat kategori yang konsisten untuk filtering yang lebih baik
6. **Body Content**: Field `body` adalah konten utama - tulis semua konten artikel di sini menggunakan Rich Text Editor

## Cara Menggunakan Rich Text Editor di Contentful

1. **Menambahkan Heading**: 
   - Pilih teks → Klik dropdown format → Pilih "Heading 2" atau "Heading 3"

2. **Menambahkan Code Block**:
   - Klik tombol "+" di toolbar → Pilih "Code block"
   - Pilih bahasa pemrograman dari dropdown
   - Paste atau ketik code Anda

3. **Menambahkan Image**:
   - Klik tombol "+" di toolbar → Pilih "Embedded asset"
   - Upload gambar baru atau pilih dari media library

4. **Formatting Text**:
   - **Bold**: Ctrl/Cmd + B atau klik tombol **B**
   - **Italic**: Ctrl/Cmd + I atau klik tombol *I*
   - **Code inline**: Pilih teks → Klik tombol `</>`

5. **Menambahkan List**:
   - Klik tombol bullet list atau numbered list di toolbar
   - Ketik item list, tekan Enter untuk item baru

## Next Steps

Setelah setup selesai, Anda dapat:
- Menambahkan lebih banyak blog posts melalui Contentful dashboard
- Mengedit posts tanpa perlu deploy ulang aplikasi
- Menggunakan Contentful Preview API untuk preview draft content
- Menambahkan fields baru sesuai kebutuhan (jangan lupa update TypeScript types)
