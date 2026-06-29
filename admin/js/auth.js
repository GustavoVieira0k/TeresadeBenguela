document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const loginInput = document.getElementById('login').value;
            const passwordInput = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login: loginInput, password: passwordInput })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('adminToken', data.token);
                    window.location.href = 'index.html';
                } else {
                    errorMessage.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Erro no login:', error);
                errorMessage.classList.remove('hidden');
            }
        });
    }
});