// assets/js/need-finder.js - Logika Kualifikasi Sederhana
const NeedFinder = {
  recommend: function(userAnswers) {
    // 1. Jika butuh pesan/narasi tanpa sistem rumit -> Copywriting
    if (userAnswers.primaryNeed === 'copy') {
      return {
        recommendedProduct: 'Core Website Copy',
        targetUrl: 'products.html?category=copywriting',
        reason: 'Sangat cocok untuk memperjelas pesan bisnis dan meningkatkan daya pikat penawaran Anda.'
      };
    }
    
    // 2. Jika butuh halaman promosi cepat -> Landing Page
    if (userAnswers.primaryNeed === 'landing-page') {
      return {
        recommendedProduct: 'Conversion Landing Page',
        targetUrl: 'products.html?category=landing-page',
        reason: 'Solusi ideal untuk kampanye promosi dan pengumpulan prospek (leads) berkonversi tinggi.'
      };
    }

    // 3. Jika belum tahu atau butuh sistem kustom -> Konsultasi (Rp990rb)
    return {
      recommendedProduct: 'Consultation Session (Rp990.000 / 60 min)',
      targetUrl: 'booking.html',
      reason: 'Untuk kebutuhan kustom atau jika Anda belum pasti, sesi konsultasi akan memberikan roadmap dan scope yang terukur.'
    };
  }
};