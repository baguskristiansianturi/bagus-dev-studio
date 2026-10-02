/**
 * Simple Route & Access Protection Guard
 * Memastikan pengguna memiliki session sebelum masuk ke Portal Klien atau Admin Panel.
 */
(function checkAccess() {
    const path = window.location.pathname;
    const isDashboard = path.includes('/dashboard/');
    const isAdmin = path.includes('/admin/');

    const currentUser = JSON.parse(localStorage.getItem('bb_user'));

    if (isDashboard && !currentUser) {
        window.location.href = '../login.html?redirect=dashboard';
    } else if (isAdmin) {
        if (!currentUser || currentUser.role !== 'admin') {
            window.location.href = '../login.html?redirect=admin';
        }
    }
})();