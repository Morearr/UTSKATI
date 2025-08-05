// =================================
// JAVASCRIPT UNTUK TRANSAKSI CAFÉ
// =================================

class CafeTransaction {
    constructor() {
        this.products = {
            'Kopi Hitam': { price: 15000, image: 'images/kopi-hitam.jpg' },
            'Café Latte': { price: 20000, image: 'images/latte.jpg' },
            'Roti Bakar': { price: 10000, image: 'images/rotibakar.jpg' }
        };
        
        this.cart = {
            items: [],
            total: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDateTime();
        this.startDateTimeUpdate();
        this.calculateTotal();
    }
    
    setupEventListeners() {
        // Event listeners untuk checkbox produk
        document.querySelectorAll('input[name="produk[]"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleProductSelection();
                this.toggleQuantityInput(checkbox);
            });
        });
        
        // Event listeners untuk input quantity
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', () => this.calculateTotal());
            input.addEventListener('change', () => this.calculateTotal());
        });
        
        // Event listener untuk form submission
        const form = document.getElementById('form-transaksi');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Event listener untuk validasi nama
        const namaInput = document.querySelector('input[name="nama"]');
        if (namaInput) {
            namaInput.addEventListener('blur', () => this.validateName());
        }
    }
    
    updateDateTime() {
        const now = new Date();
        
        // Format tanggal: dd/mm/yyyy
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateString = `${day}/${month}/${year}`;
        
        // Format waktu: hh:mm:ss
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Update input fields
        const dateInput = document.getElementById('input-tanggal');
        const timeInput = document.getElementById('input-waktu');
        
        if (dateInput) dateInput.value = dateString;
        if (timeInput) timeInput.value = timeString;
    }
    
    startDateTimeUpdate() {
        // Update waktu setiap detik
        setInterval(() => this.updateDateTime(), 1000);
    }
    
    toggleQuantityInput(checkbox) {
        const productName = checkbox.value;
        const quantityInput = this.getQuantityInput(productName);
        
        if (quantityInput) {
            if (checkbox.checked) {
                quantityInput.disabled = false;
                quantityInput.style.backgroundColor = '#fff';
                if (!quantityInput.value || quantityInput.value === '0') {
                    quantityInput.value = '1';
                }
            } else {
                quantityInput.disabled = true;
                quantityInput.style.backgroundColor = '#f5f5f5';
                quantityInput.value = '';
            }
        }
    }
    
    handleProductSelection() {
        document.querySelectorAll('input[name="produk[]"]').forEach(checkbox => {
            const productName = checkbox.value;
            const quantityInput = this.getQuantityInput(productName);
            
            if (checkbox.checked) {
                // Jika produk dipilih, set minimum quantity 1
                if (quantityInput && (!quantityInput.value || quantityInput.value === '0')) {
                    quantityInput.value = '1';
                }
                this.addToCart(productName);
            } else {
                // Jika produk tidak dipilih, reset quantity ke 0
                if (quantityInput) {
                    quantityInput.value = '';
                }
                this.removeFromCart(productName);
            }
        });
        
        this.calculateTotal();
    }
    
    getQuantityInput(productName) {
        const inputMap = {
            'Kopi Hitam': 'jumlah_kopi',
            'Café Latte': 'jumlah_latte',
            'Roti Bakar': 'jumlah_roti'
        };
        
        const inputName = inputMap[productName];
        return inputName ? document.querySelector(`input[name="${inputName}"]`) : null;
    }
    
    addToCart(productName) {
        if (!this.cart.items.find(item => item.name === productName)) {
            this.cart.items.push({
                name: productName,
                price: this.products[productName].price,
                quantity: 1
            });
        }
    }
    
    removeFromCart(productName) {
        this.cart.items = this.cart.items.filter(item => item.name !== productName);
    }
    
    calculateTotal() {
        let total = 0;
        
        document.querySelectorAll('input[name="produk[]"]:checked').forEach(checkbox => {
            const productName = checkbox.value;
            const quantityInput = this.getQuantityInput(productName);
            const quantity = quantityInput ? parseInt(quantityInput.value) || 0 : 0;
            const price = this.products[productName].price;
            
            total += price * quantity;
        });
        
        this.cart.total = total;
        this.updateTotalDisplay();
    }
    
    updateTotalDisplay() {
        const totalInput = document.getElementById('input-total');
        if (totalInput) {
            totalInput.value = `Rp ${this.cart.total.toLocaleString('id-ID')}`;
        }
    }
    
    validateName() {
        const namaInput = document.querySelector('input[name="nama"]');
        if (namaInput) {
            const name = namaInput.value.trim();
            if (name.length < 2) {
                namaInput.classList.add('error');
                this.showNotification('Nama harus diisi minimal 2 karakter', 'error');
                return false;
            } else {
                namaInput.classList.remove('error');
                return true;
            }
        }
        return false;
    }
    
    validateForm() {
        let isValid = true;
        const errors = [];
        
        // Validasi nama
        if (!this.validateName()) {
            isValid = false;
            errors.push('Nama lengkap harus diisi');
        }
        
        // Validasi produk
        const selectedProducts = document.querySelectorAll('input[name="produk[]"]:checked');
        if (selectedProducts.length === 0) {
            isValid = false;
            errors.push('Pilih minimal satu produk');
        }
        
        // Validasi quantity untuk produk yang dipilih
        selectedProducts.forEach(checkbox => {
            const quantityInput = this.getQuantityInput(checkbox.value);
            if (quantityInput) {
                const quantity = parseInt(quantityInput.value) || 0;
                if (quantity <= 0) {
                    isValid = false;
                    errors.push(`Jumlah ${checkbox.value} harus lebih dari 0`);
                }
            }
        });
        
        // Validasi metode pembayaran
        const paymentMethod = document.querySelector('input[name="pembayaran"]:checked');
        if (!paymentMethod) {
            isValid = false;
            errors.push('Pilih metode pembayaran');
        }
        
        // Validasi nomor meja
        const mejaSelect = document.querySelector('select[name="meja"]');
        if (mejaSelect && !mejaSelect.value) {
            isValid = false;
            errors.push('Pilih nomor meja');
        }
        
        // Tampilkan error jika ada
        if (!isValid) {
            this.showNotification(errors.join('<br>'), 'error');
        }
        
        return isValid;
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            // Generate transaction ID
            const transactionId = this.generateTransactionId();
            
            // Simpan data transaksi ke localStorage
            this.saveTransactionData(transactionId);
            
            // Redirect ke halaman cetak dengan parameter
            this.redirectToInvoice();
            
            this.showNotification('Transaksi berhasil! Mengarahkan ke struk...', 'success');
        }
    }
    
    generateTransactionId() {
        const now = new Date();
        const dateStr = now.getFullYear().toString() + 
                       (now.getMonth() + 1).toString().padStart(2, '0') + 
                       now.getDate().toString().padStart(2, '0');
        const timeStr = now.getHours().toString().padStart(2, '0') + 
                       now.getMinutes().toString().padStart(2, '0') + 
                       now.getSeconds().toString().padStart(2, '0');
        const randomStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `CS${dateStr}${timeStr}${randomStr}`;
    }
    
    saveTransactionData(transactionId) {
        const formData = new FormData(document.getElementById('form-transaksi'));
        const transactionData = {
            id: transactionId,
            timestamp: new Date().toISOString(),
            items: this.cart.items,
            total: this.cart.total
        };
        
        // Simpan ke localStorage
        localStorage.setItem('lastTransaction', JSON.stringify(transactionData));
        
        // Simpan riwayat transaksi
        const history = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        history.push(transactionData);
        localStorage.setItem('transactionHistory', JSON.stringify(history));
    }
    
    redirectToInvoice() {
        const form = document.getElementById('form-transaksi');
        if (form) {
            // Submit form untuk redirect ke cetak.html
            setTimeout(() => {
                form.submit();
            }, 1000);
        }
    }
    
    showNotification(message, type = 'info') {
        // Hapus notifikasi sebelumnya
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Buat notifikasi baru
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        
        // Styling notifikasi
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '9999',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease-out'
        });
        
        // Warna berdasarkan type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #dc3545, #fd7e14)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #17a2b8, #6f42c1)';
        }
        
        document.body.appendChild(notification);
        
        // Hapus notifikasi setelah 5 detik
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Method untuk menampilkan ringkasan pesanan
    showOrderSummary() {
        const selectedProducts = document.querySelectorAll('input[name="produk[]"]:checked');
        if (selectedProducts.length === 0) {
            return;
        }
        
        let summaryHTML = '<div class="order-summary"><h4>Ringkasan Pesanan:</h4><ul>';
        
        selectedProducts.forEach(checkbox => {
            const productName = checkbox.value;
            const quantityInput = this.getQuantityInput(productName);
            const quantity = quantityInput ? parseInt(quantityInput.value) || 0 : 0;
            const price = this.products[productName].price;
            const subtotal = price * quantity;
            
            if (quantity > 0) {
                summaryHTML += `<li>${productName} x${quantity} = Rp ${subtotal.toLocaleString('id-ID')}</li>`;
            }
        });
        
        summaryHTML += `</ul><strong>Total: Rp ${this.cart.total.toLocaleString('id-ID')}</strong></div>`;
        
        return summaryHTML;
    }
}

// CSS untuk animasi notifikasi
const animationCSS = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.order-summary {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    border: 2px solid #dee2e6;
}

.order-summary h4 {
    color: #8B4513;
    margin-bottom: 10px;
}

.order-summary ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
}

.order-summary li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}

.order-summary li:last-child {
    border-bottom: none;
}
`;

// Inject CSS ke halaman
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Inisialisasi transaksi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman transaksi
    if (document.getElementById('form-transaksi')) {
        window.cafeTransaction = new CafeTransaction();
    }
});

// Export untuk digunakan di file lain jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CafeTransaction;
}
