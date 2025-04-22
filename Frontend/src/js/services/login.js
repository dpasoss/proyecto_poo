// // login.js
// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('loginForm');

//     if (loginForm) {
//         loginForm.addEventListener('submit', async function(e) {
//             e.preventDefault();

//             const email = document.getElementById('email');
//             const password = document.getElementById('password');
//             const submitBtn = loginForm.querySelector('button[type="submit"]');
//             let isValid = true;

//             // Validaciones usando utils.js
//             isValid = checkEmail(email) && isValid;
//             isValid = checkPassword(password) && isValid;

//             if (isValid) {
//                 disableButton(submitBtn, 'Iniciando sesión...');

//                 try {
//                     const res = await fetch('http://localhost:3000/api/auth/login', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             correo: email.value.trim(),
//                             contraseña: password.value.trim()
//                         })
//                     });

//                     const data = await res.json();

//                     if (!res.ok) {
//                         throw new Error(data.msg || 'Error al iniciar sesión');
//                     }

//                     // Puedes guardar la sesión en localStorage o cookies si lo necesitas
//                     localStorage.setItem('usuario', JSON.stringify(data.usuario));

//                     // Redirigir al perfil o dashboard
//                     data.usuario.rol === 'empleador' 
//                     ? window.location.href = 'postulacionEmpleo.html'
//                     : window.location.href = 'buscadorEmpleo.html'
                    
//                 } catch (err) {
//                     // Mostrar error general
//                     alert(err.message);
//                     enableButton(submitBtn, 'Iniciar sesión');
//                 }
//             }
//         });

//         // Limpiar errores al escribir
//         const inputs = loginForm.querySelectorAll('input');
//         inputs.forEach(input => {
//             input.addEventListener('input', function() {
//                 clearError(this);
//             });
//         });
//     }

//     // Login social (sin cambios)
//     const googleLoginBtn = document.querySelector('.social-icon.google');
//     const linkedinLoginBtn = document.querySelector('.social-icon.linkedin');

//     if (googleLoginBtn) {
//         googleLoginBtn.addEventListener('click', function() {
//             alert('Funcionalidad de Google login no implementada en este demo');
//         });
//     }

//     if (linkedinLoginBtn) {
//         linkedinLoginBtn.addEventListener('click', function() {
//             alert('Funcionalidad de LinkedIn login no implementada en este demo');
//         });
//     }
// });


// ================================
// Login
// ================================



document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
});

// ================================
// Función Principal
// ================================

async function handleLoginSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Validación visual
    clearValidation([email, password]);

    let isValid = true;
    isValid &= checkEmail(email);
    isValid &= checkRequired(password, 'La contraseña es obligatoria');

    if (!isValid) return;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    disableButton(submitBtn, 'Iniciando sesión...');

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correo: email.value,
                contraseña: password.value
            })
        });

        const data = await res.json();
        console.log('Respuesta del servidor:', data);

        if (res.ok) {
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            // Redireccionar según rol
            // const destino = data.usuario.rol === 'solicitante' ? 'buscadorEmpleo.html' : 'index.html';
            // window.location.href = destino;

            let destino;
            switch (data.usuario.rol) {
                case 'solicitante':
                    destino = 'buscadorEmpleo.html';
                    break;
                case 'empleador':
                    destino = 'panelEmpresarial.html';
                    break;
                case 'admin':
                    destino = 'panelAdministrador.html';
                    break;
                default:
                    destino = 'index.html';
            }

            window.location.href = destino;
        
        } else {
            showError(email, data.msg || 'Correo o contraseña incorrectos');
            enableButton(submitBtn, 'Iniciar Sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(email, 'Error del servidor');
        enableButton(submitBtn, 'Iniciar Sesión');
    }
}



