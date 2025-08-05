# DOKUMENTASI WEBSITE CAFÉ CERITA SAJA

## Overview
Website Café Cerita Saja adalah aplikasi web untuk mengelola transaksi dan pemesanan café dengan fitur lengkap dan tampilan yang modern.

## Struktur File

### HTML Files
- `index.html` - Halaman beranda dengan informasi café dan promo
- `produk.html` - Halaman menu/produk café dengan deskripsi lengkap
- `transaksi.html` - Halaman form transaksi dengan validasi
- `cetak.html` - Halaman struk/invoice transaksi
- `tentang.html` - Halaman tentang café dan kontak

### CSS Files
- `css/global.css` - CSS dasar untuk semua halaman
- `css/product.css` - CSS khusus halaman produk
- `css/transaction.css` - CSS khusus halaman transaksi
- `css/invoice.css` - CSS khusus halaman struk
- `css/about.css` - CSS khusus halaman tentang
- `styles.css` - CSS utama yang mengimport semua CSS
- `styles-new.css` - CSS alternatif dengan import

### JavaScript Files
- `js/transaction.js` - Logic untuk halaman transaksi
- `js/invoice.js` - Logic untuk halaman struk/invoice

### Assets
- `images/` - Folder berisi gambar produk dan foto

## Fitur Utama

### 1. Halaman Beranda (index.html)
- Header dengan logo dan tagline café
- Navigation menu yang responsif
- Sidebar dengan promo dan berita terkini
- Section utama dengan welcome message
- Footer informatif

### 2. Halaman Produk (produk.html)
- Tampilan grid produk yang menarik
- Informasi detail produk (harga, deskripsi, rasa)
- Tombol "Pesan Sekarang" yang terintegrasi
- Sidebar dengan diskon dan menu baru
-Responsive Design

### 3. Halaman Transaksi (transaksi.html)
- Form transaksi yang lengkap dan tervalidasi
- Pilihan produk dengan quantity input
- Metode pembayaran (Tunai/Transfer)
- Pilihan nomor meja
- Auto-calculate total dan timestamp
- Validasi form real-time

### 4. Halaman Struk (cetak.html)
- Layout struk yang profesional
- Detail transaksi lengkap
- QR code section untuk review
- Print-friendly design
- Responsive layout

### 5. Halaman Tentang (tentang.html)
- Profil lengkap café
- Visi & Misi perusahaan
- Informasi kontak dan pemilik
- Jam operasional
- Statistik perusahaan

## 🎨 Design System

### Color Palette
- Primary: #8B4513 (Brown)
- Secondary: #A0522D (Saddle Brown)
- Accent: #F0E68C (Khaki)
- Background: #FFFAF0 (Floral White)
- Text: #333333 (Dark Gray)

### Typography
- Primary Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Invoice Font: 'Courier New', monospace
- Size Range: 0.8em - 2.8em

### Layout
- Container max-width: 1200px
- Responsive breakpoint: 768px
- Grid system dengan flexbox
- Card-based components

## 🔧 JavaScript Features

### Transaction Management
- Real-time calculation
- Form validation
- Auto-fill timestamp
- Local storage untuk riwayat
- Notification system

### Invoice Generation
- URL parameter parsing
- Dynamic content generation
- Print functionality
- Transaction ID generator

## Responsive Design
- Mobile-first approach
- Flexible grid system
- Touch-friendly buttons
- Optimized images
- Adaptive navigation

## Print Optimization
- Print-specific CSS
- Hidden elements for print
- Optimized layout untuk struk
- Professional invoice design

## 🔄 How to Use

### Untuk Pelanggan:
1. Buka `index.html` untuk melihat beranda
2. Klik "Menu" untuk melihat produk
3. Pilih produk dan klik "Pesan Sekarang"
4. Isi form transaksi lengkap
5. Klik "Checkout & Cetak Struk"
6. Struk akan terbuka di tab baru

### Untuk Developer:
1. Semua file sudah tertata rapi
2. CSS modular untuk easy maintenance
3. JavaScript terpisah per functionality
4. Dokumentasi lengkap tersedia

## Menu Produk

### Kopi Hitam - Rp 15.000
-Kopi Hitam klasik dengan aroma kuat
- Rasa pahit dengan aftertaste asam
- Cocok untuk penikmat kopi sejati

### Café Latte - Rp 20.000
- Perpaduan espresso dan susu segar
- Rasa creamy dan lembut
- Foam yang sempurna

### Roti Bakar - Rp 10.000
-Roti Bakar dengan isian coklat/keju
- Tekstur renyah luar, lembut dalam
- Cocok sebagai teman kopi

## Informasi Café

**Nama:** Café Cerita Saja
**Pemilik:** Muhamad Arya Pratama
**Alamat:** Jl. Kopi Nikmat No. 123, Jakarta
**Email:** cafe@ceritasaja.com
**Instagram:** @ceritasaja

### Jam Operasional:
- Senin-Jumat: 07:00 - 23:00 WIB
- Sabtu-Minggu: 08:00 - 24:00 WIB
- Hari Libur: 09:00 - 22:00 WIB

## 🔒 Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## Performance
- Lightweight CSS (< 50KB total)
- Optimized JavaScript
- Compressed images
- Fast loading time

## 🛠️ Maintenance Notes
- Update menu di `produk.html` dan `js/transaction.js`
- Harga produk di 3 tempat: produk.html, transaction.js, invoice.js
- Gambar disimpan di folder `images/`
- CSS dapat dikustomisasi per halaman

## Future Enhancements
- Database integration
- Online payment gateway
- Customer login system
- Inventory management
- Analytics dashboard

---
*Dokumentasi ini dibuat untuk memudahkan maintenance dan development website Café Cerita Saja.*
