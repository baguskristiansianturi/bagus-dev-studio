/**
 * Bali Bagus Dev Studio - Enhanced UI/UX & Interactive Logic
 * Toast Notifications, Form Validation, Dynamic Cart, & Product Filters
 */

// --- 1. DICTIONARY TRANSLATIONS (ID / EN) ---
const translations = {
    id: {
        nav_home: "Beranda",
        nav_services: "Layanan",
        nav_products: "Produk Digital",
        nav_pricing: "Harga & Paket",
        nav_about: "Tentang Kami",
        nav_contact: "Kontak",
        nav_blog: "Blog",
        nav_faq: "FAQ & Bantuan",
        nav_login: "Masuk",
        nav_register: "Daftar",
        cart_empty: "Keranjang belanja Anda masih kosong.",
        cart_total: "Total Tagihan:",
        copy_success: "Nomor rekening berhasil disalin!",
        added_to_cart: "Produk berhasil ditambahkan ke keranjang!",
        removed_from_cart: "Produk dihapus dari keranjang."
    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_products: "Digital Products",
        nav_pricing: "Pricing & Packages",
        nav_about: "About Us",
        nav_contact: "Contact",
        nav_blog: "Blog",
        nav_faq: "FAQ & Help",
        nav_login: "Sign In",
        nav_register: "Sign Up",
        cart_empty: "Your shopping cart is empty.",
        cart_total: "Total Amount:",
        copy_success: "Account number copied to clipboard!",
        added_to_cart: "Product successfully added to cart!",
        removed_from_cart: "Product removed from cart."
    }
};

// --- 2. TOAST NOTIFICATION SYSTEM (UX Interactive Alert) ---
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-card border-accent text-emerald-400' : 'bg-card border-red-500 text-red-400';
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.className = `animate-toast pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold ${bgColor}`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- 3. LANGUAGE SWITCHER ---
function setLanguage(lang) {
    localStorage.setItem('bb_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('bg-accent', 'text-dark', 'font-bold');
            btn.classList.remove('text-slate-400');
        } else {
            btn.classList.remove('bg-accent', 'text-dark', 'font-bold');
            btn.classList.add('text-slate-400');
        }
    });
}

function getCurrentLanguage() {
    return localStorage.getItem('bb_lang') || 'id';
}

// --- 4. CART LOGIC WITH DYNAMIC RENDER & TOAST ---
function getCart() {
    return JSON.parse(localStorage.getItem('bb_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('bb_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
}

function addToCart(productId, title, price, licenseType = 'Standard') {
    let cart = getCart();
    if (cart.some(item => item.id === productId)) {
        showToast('Produk ini sudah ada di dalam keranjang.', 'error');
        return;
    }

    cart.push({ id: productId, title: title, price: price, licenseType: licenseType });
    saveCart(cart);
    const lang = getCurrentLanguage();
    showToast(translations[lang].added_to_cart, 'success');
}

function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    const lang = getCurrentLanguage();
    showToast(translations[lang].removed_from_cart, 'success');
}

function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.length;
        badge.classList.toggle('hidden', cart.length === 0);
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');
    if (!container) return;

    const cart = getCart();
    const lang = getCurrentLanguage();

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-center py-8 text-sm">${translations[lang].cart_empty}</p>`;
        if (totalEl) totalEl.innerText = 'Rp 0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const numericPrice = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        total += numericPrice;
        return `
            <div class="flex items-center justify-between p-4 bg-card rounded-xl border border-border animate-fade-in">
                <div>
                    <h4 class="font-bold text-white text-sm">${item.title}</h4>
                    <span class="text-xs text-slate-400">Lisensi: ${item.licenseType}</span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-bold text-accent text-sm">${item.price}</span>
                    <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-400 transition-colors">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    if (totalEl) {
        totalEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
    }
}

// --- 5. REAL-TIME FORM VALIDATION UX ---
function initFormValidation() {
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('input-error');
                input.classList.remove('input-success');
            } else if (input.type === 'email' && input.value && !/\S+@\S+\.\S+/.test(input.value)) {
                input.classList.add('input-error');
                input.classList.remove('input-success');
            } else if (input.value) {
                input.classList.remove('input-error');
                input.classList.add('input-success');
            }
        });
    });
}

// --- 6. PRODUCT SEARCH & FILTER UX ---
function filterProducts(query, category = 'all') {
    const products = document.querySelectorAll('.product-card');
    products.forEach(card => {
        const title = card.getAttribute('data-title')?.toLowerCase() || '';
        const cardCategory = card.getAttribute('data-category') || 'all';

        const matchesSearch = title.includes(query.toLowerCase());
        const matchesCategory = category === 'all' || cardCategory === category;

        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
            card.classList.add('animate-fade-in');
        } else {
            card.classList.add('hidden');
        }
    });
}

// --- 7. CLIPBOARD UTILITY ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const lang = getCurrentLanguage();
        showToast(translations[lang].copy_success, 'success');
    });
}

// Initialize Logic
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(getCurrentLanguage());
    updateCartBadge();
    renderCartItems();
    initFormValidation();
});