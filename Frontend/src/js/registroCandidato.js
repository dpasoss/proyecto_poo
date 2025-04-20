// ================================
// Registro de Candidato
// ================================

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('candidateForm');
    if (registerForm) registerForm.addEventListener('submit', handleCandidateSubmit);
});

// ================================
// Función Principal
// ================================

async function handleCandidateSubmit(e) {
    e.preventDefault();

    // Elementos del formulario
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const fields = [fullName, email, password, confirmPassword];

    // Validación
    if (!validateCandidateForm(fullName, email, password, confirmPassword)) return;

    // Desactivar botón
    const submitBtn = e.target.querySelector('button[type="submit"]');
    disableButton(submitBtn, 'Creando cuenta...');

    // Enviar solicitud
    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: fullName.value,
                correo: email.value,
                contraseña: password.value,
                rol: 'candidato',
                datosCandidato: {}
            })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = 'buscadorEmpleo.html';
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

        } else {
            alert(data.msg || 'Error al registrar candidato');
            enableButton(submitBtn, 'Registrarse');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error del servidor');
        enableButton(submitBtn, 'Registrarse');
    }
}

// ================================
// Validación de Candidato
// ================================

function validateCandidateForm(fullName, email, password, confirmPassword) {
    let isValid = true;

    isValid &= checkRequired(fullName, 'El nombre completo es requerido');
    isValid &= checkEmail(email);
    isValid &= checkPassword(password);
    isValid &= checkMatch(password, confirmPassword, 'Las contraseñas no coinciden');

    return Boolean(isValid);
}
