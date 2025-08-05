// =================================
// JAVASCRIPT UNTUK HALAMAN STRUK/INVOICE
// =================================

class InvoiceManager {
    constructor() {
        this.transactionData = null;
        this.init();
    }
    
    init() {
        this.loadTransactionData();
        this.populateInvoiceData();
        this.setupPrintButton();
        this.generateTransactionId();
    }
    
    loadTransactionData() {
        // Ambil data dari localStorage jika tersedia
        const savedData = localStorage.getItem('lastTransaction');
        if (savedData) {
            this.transactionData = JSON.parse(savedData);
        }
    }
    
    populateInvoiceData() {
        // Ambil parameter dari URL
        const urlParams = new URLSearchParams(window.location.search);
        
        // Update informasi transaksi
        this.updateField('invoice-nama', urlParams.get('nama') || 'Nama tidak tersedia');
        this.updateField('invoice-pembayaran', urlParams.get('pembayaran') || 'Tidak dipilih');
        this.updateField('invoice-tanggal', urlParams.get('tanggal') || this.getCurrentDate());
        this.updateField('invoice-waktu', urlParams.get('waktu') || this.getCurrentTime());
        this.updateField('invoice-meja', urlParams.get('meja') || 'Tidak dipilih');
        this.updateField('invoice-jumlah-orang', urlParams.get('jumlah_orang') || '1');
        this.updateField('invoice-catatan', urlParams.get('catatan') || 'Tidak ada catatan');
        
        // Update daftar produk dan total
        this.updateProductList(urlParams);
        this.updateTotal(urlParams);
    }
    
    updateField(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }
    
    updateProductList(urlParams) {
        const products = urlParams.getAll('produk[]');
        let productHTML = '';
        let calculatedTotal = 0;
        
        const productPrices = {
            'Kopi Hitam': 15000,
            'Café Latte': 20000,
            'Roti Bakar': 10000
        };
        
        if (products.length > 0) {
            products.forEach(product => {
                let quantity = 0;
                let price = productPrices[product] || 0;
                
                // Ambil quantity berdasarkan produk
                switch (product) {
                    case 'Kopi Hitam':
                        quantity = parseInt(urlParams.get('jumlah_kopi')) || 0;
                        break;
                    case 'Café Latte':
                        quantity = parseInt(urlParams.get('jumlah_latte')) || 0;
                        break;
                    case 'Roti Bakar':
                        quantity = parseInt(urlParams.get('jumlah_roti')) || 0;
                        break;
                }
                
                if (quantity > 0) {
                    const subtotal = price * quantity;
                    calculatedTotal += subtotal;
                    
                    productHTML += `
                        <div class="product-item-invoice">
                            <div>
                                <span class="product-name">${product}</span>
                                <span class="product-quantity">x${quantity}</span>
                            </div>
                            <div class="product-price">Rp ${subtotal.toLocaleString('id-ID')}</div>
                        </div>
                    `;
                }
            });
        } else {
            productHTML = '<div class="no-products">Tidak ada produk yang dipilih</div>';
        }
        
        const productContainer = document.getElementById('invoice-products');
        if (productContainer) {
            productContainer.innerHTML = productHTML;
        }
        
        // Update total yang dihitung
        this.updateCalculatedTotal(calculatedTotal);
    }
    
    updateTotal(urlParams) {
        const totalFromUrl = urlParams.get('total');
        const totalElement = document.getElementById('invoice-total');
        
        if (totalElement) {
            if (totalFromUrl) {
                totalElement.textContent = `Rp ${totalFromUrl}`;
            } else {
                totalElement.textContent = 'Rp 0';
            }
        }
    }
    
    updateCalculatedTotal(total) {
        const calculatedTotalElement = document.getElementById('calculated-total');
        if (calculatedTotalElement) {
            calculatedTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
    }
    
    getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    
    generateTransactionId() {
        // Generate atau ambil transaction ID
        let transactionId = '';
        
        if (this.transactionData && this.transactionData.id) {
            transactionId = this.transactionData.id;
        } else {
            const now = new Date();
            const dateStr = now.getFullYear().toString() + 
                           (now.getMonth() + 1).toString().padStart(2, '0') + 
                           now.getDate().toString().padStart(2, '0');
            const timeStr = now.getHours().toString().padStart(2, '0') + 
                           now.getMinutes().toString().padStart(2, '0') + 
                           now.getSeconds().toString().padStart(2, '0');
            const randomStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            
            transactionId = `CS${dateStr}${timeStr}${randomStr}`;
        }
        
        const transactionIdElement = document.getElementById('transaction-id');
        if (transactionIdElement) {
            transactionIdElement.textContent = transactionId;
        }
    }
    
    setupPrintButton() {
        // Buat tombol print jika belum ada
        if (!document.getElementById('print-button')) {
            const printButton = document.createElement('button');
            printButton.id = 'print-button';
            printButton.className = 'print-button';
            printButton.innerHTML = '🖨️ Cetak Struk';
            printButton.onclick = () => this.printInvoice();
            
            // Tambahkan setelah container invoice
            const container = document.querySelector('.invoice-container') || document.body;
            container.parentNode.insertBefore(printButton, container.nextSibling);
        }
        
        // Setup event listener untuk print
        const existingButton = document.getElementById('print-button');
        if (existingButton) {
            existingButton.onclick = () => this.printInvoice();
        }
    }
    
    printInvoice() {
        // Simpan scroll position
        const scrollPos = window.scrollY;
        
        // Print halaman
        window.print();
        
        // Restore scroll position setelah print dialog ditutup
        setTimeout(() => {
            window.scrollTo(0, scrollPos);
        }, 1000);
    }
    
    // Method untuk kembali ke halaman transaksi
    goBackToTransaction() {
        window.location.href = 'transaksi.html';
    }
    
    // Method untuk download invoice sebagai PDF (jika diperlukan)
    downloadAsPDF() {
        // Implementasi download PDF bisa ditambahkan di sini
        // Menggunakan library seperti jsPDF
        alert('Fitur download PDF akan segera hadir!');
    }
}

// =================================
// UTILITY FUNCTIONS
// =================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// =================================
// ENHANCED INVOICE DISPLAY
// =================================

function enhanceInvoiceDisplay() {
    // Tambahkan efek loading saat halaman dimuat
    const loadingOverlay = document.createElement('div');
    loadingOverlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: Arial, sans-serif;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #8B4513;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p style="color: #8B4513; font-weight: bold;">Memproses Struk...</p>
            </div>
        </div>
    `;
    
    // Tambahkan CSS untuk animasi loading
    const loadingCSS = document.createElement('style');
    loadingCSS.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingCSS);
    
    document.body.appendChild(loadingOverlay);
    
    // Hapus loading setelah 2 detik
    setTimeout(() => {
        loadingOverlay.remove();
    }, 2000);
}

// =================================
// INITIALIZATION
// =================================

document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah ini halaman invoice/cetak
    if (window.location.pathname.includes('cetak.html') || 
        document.title.includes('Struk') || 
        document.querySelector('.invoice-container')) {
        
        enhanceInvoiceDisplay();
        
        // Inisialisasi invoice manager setelah loading
        setTimeout(() => {
            window.invoiceManager = new InvoiceManager();
        }, 2000);
    }
});

// Export untuk digunakan di file lain jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InvoiceManager, formatCurrency, formatDateTime };
}
