// LocalStorage Key
const CART_STORAGE_KEY = 'bb_dev_studio_cart';

// Inisialisasi Keranjang saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    // Jika berada di halaman cart.html, rendir item
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
});

// Mengambil data keranjang dari LocalStorage
function getCart() {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Menyimpan data keranjang ke LocalStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Menambahkan Produk ke Keranjang
function addToCart(id, name, price) {
    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    saveCart(cart);
    alert(`${name} telah ditambahkan ke keranjang!`);
}

// Menghapus Produk dari Keranjang
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartPage();
}

// Memperbarui Badge Keranjang di Header
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;

    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    if (totalQty > 0) {
        badge.textContent = totalQty;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Format Angka Rupiah
function formatRupiah(number) {
    return 'Rp' + number.toLocaleString('id-ID');
}

// Merender Tampilan Halaman Keranjang (cart.html)
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
                <i class="fa-solid fa-basket-shopping text-3xl mb-3 text-slate-600"></i>
                <p>Keranjang Anda masih kosong.</p>
                <a href="products.html" class="inline-block mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition">
                    Lihat Katalog Produk
                </a>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = 'Rp0';
        if (totalEl) totalEl.textContent = 'Rp0';
        return;
    }

    let html = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;

        html += `
            <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h4 class="font-bold text-white text-base">${item.name}</h4>
                    <span class="text-xs text-indigo-400 font-semibold">${formatRupiah(item.price)} x ${item.qty}</span>
                </div>
                <div class="flex items-center gap-6">
                    <span class="text-sm font-extrabold text-white">${formatRupiah(itemTotal)}</span>
                    <button onclick="removeFromCart('${item.id}')" class="text-slate-500 hover:text-red-400 transition" title="Hapus Item">
                        <i class="fa-solid fa-trash-can text-base"></i>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = formatRupiah(grandTotal);
    if (totalEl) totalEl.textContent = formatRupiah(grandTotal);
}