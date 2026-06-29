// Verifica se o usuário está logado
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token && !window.location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
    }
}

// Retorna headers padrão com o token
function getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Configurar o botão de logout
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminToken');
            window.location.href = 'login.html';
        });
    }
});

// Script auxiliar para mostrar alertas de feedback na tela
function showAlert(message, type = 'success') {
    const alertDiv = document.getElementById('alert-message');
    if (!alertDiv) return;

    alertDiv.textContent = message;
    alertDiv.className = `mb-4 rounded-md p-4 transition-all duration-300 ${type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`;
    alertDiv.classList.remove('hidden');

    setTimeout(() => {
        alertDiv.classList.add('opacity-0');
        setTimeout(() => {
            alertDiv.classList.add('hidden');
            alertDiv.classList.remove('opacity-0');
        }, 300);
    }, 3000);
}