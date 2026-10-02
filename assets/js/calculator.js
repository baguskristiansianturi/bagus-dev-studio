// assets/js/calculator.js - Estimator Projek Bali Bagus Dev Studio
const ProjectCalculator = {
  basePrices: {
    'copy-entry': 490000,
    'copy-core': 1490000,
    'copy-premium': 2990000,
    'lp-starter': 2490000,
    'lp-business': 3490000,
    'lp-conversion': 4990000
  },

  addOns: {
    'express-delivery': 500000,   // Pengerjaan Kilat
    'extra-revisions': 300000,    // Tambahan 2x Revisi
    'setup-analytics': 400000,   // Integrasi Tracking & Pixel
    'additional-page-copy': 350000 // Tambahan Copy per Halaman
  },

  calculateTotal: function(baseProductKey, selectedAddOns = []) {
    let total = this.basePrices[baseProductKey] || 0;
    
    selectedAddOns.forEach(addonKey => {
      if (this.addOns[addonKey]) {
        total += this.addOns[addonKey];
      }
    });

    return {
      formattedTotal: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total),
      rawTotal: total
    };
  }
};