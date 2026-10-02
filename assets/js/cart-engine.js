// assets/js/cart-engine.js - Cart State & Storage Engine

const CartEngine = {
    STORAGE_KEY: 'bb_studio_cart',

    getCart: function() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },

    saveCart: function(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateBadge();
    },

    addItem: function(id, name, price, type) {
        let cart = this.getCart();
        let existing = cart.find(item => item.id === id);

        if (existing) {
            alert('Produk ini sudah ada di dalam keranjang belanja Anda.');
        } else {
            cart.push({ id, name, price, type });
            this.saveCart(cart);
            alert(`"${name}" berhasil ditambahkan ke keranjang!`);
        }
    },

    removeItem: function(id) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== id);
        this.saveCart(cart);
        if (typeof renderCartPage === 'function') renderCartPage();
    },

    clearCart: function() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateBadge();
    },

    getTotal: function() {
        let cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.price, 0);
    },

    updateBadge: function() {
        let cart = this.getCart();
        let badge = document.getElementById('cart-count');
        if (badge) {
            badge.innerText = cart.length;
        }
    }
};

// Initialize Cart Count on Load
document.addEventListener('DOMContentLoaded', () => {
    CartEngine.updateBadge();
});