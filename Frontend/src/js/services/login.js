// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            let isValid = true;

            // Validaciones usando utils.js
            isValid = checkEmail(email) && isValid;
            isValid = checkPassword(password) && isValid;

            if (isValid) {
                disableButton(submitBtn, 'Iniciando sesión...');

                try {
                    const res = await fetch('http://localhost:3000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            correo: email.value.trim(),
                            contraseña: password.value.trim()
                        })
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.msg || 'Error al iniciar sesión');
                    }

                    // Puedes guardar la sesión en localStorage o cookies si lo necesitas
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                    // Redirigir al perfil o dashboard
                    data.usuario.rol === 'empleador' 
                    ? window.location.href = 'postulacionEmpleo.html'
                    : window.location.href = 'buscadorEmpleo.html'
                    
                } catch (err) {
                    // Mostrar error general
                    alert(err.message);
                    enableButton(submitBtn, 'Iniciar sesión');
                }
            }
        });

        // Limpiar errores al escribir
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    // Login social (sin cambios)
    const googleLoginBtn = document.querySelector('.social-icon.google');
    const linkedinLoginBtn = document.querySelector('.social-icon.linkedin');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            alert('Funcionalidad de Google login no implementada en este demo');
        });
    }

    if (linkedinLoginBtn) {
        linkedinLoginBtn.addEventListener('click', function() {
            alert('Funcionalidad de LinkedIn login no implementada en este demo');
        });
    }
});
