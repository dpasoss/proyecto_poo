// ================================
// Registro de solicitante
// ================================
import { User } from "../models/user.js";

// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('candidateForm');
//     if (registerForm) registerForm.addEventListener('submit', handleCandidateSubmit);

//     // Limpia errores al escribir
//     const inputs = document.querySelectorAll('#candidateForm input');
//     inputs.forEach(input => {
//         input.addEventListener('input', () => clearError(input));
//     });

// });

// // ================================
// // Función Principal
// // ================================

// async function handleCandidateSubmit(e) {
//     e.preventDefault();

//     // Elementos del formulario
//     const fullName = document.getElementById('fullName');
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     const confirmPassword = document.getElementById('confirmPassword');
//         // Desactivar botón
//     const submitBtn = e.target.querySelector('button[type="submit"]');

//     const isValid = validateCandidateForm(fullName, email, password, confirmPassword);
//     if (!isValid) return;

//     disableButton(submitBtn, 'Creando cuenta...');
    
//     const fields = [fullName, email, password, confirmPassword];

//     // Validación
//     if (!validateCandidateForm(fullName, email, password, confirmPassword)) return;


//     disableButton(submitBtn, 'Creando cuenta...');

//     const user = new User(fullName.value, email.value, password.value, 'solicitante', {})

//     // Enviar solicitud
//     try {
//         const res = await fetch('http://localhost:3000/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 nombre: user.nombre,
//                 correo: user.correo,
//                 contraseña: user.contraseña,
//                 rol: user.rol,
//                 datosCandidato: user.datosCandidato
//             })
//         });

//         const data = await res.json();

//         if (res.ok) {
//             window.location.href = 'buscadorEmpleo.html';
//             localStorage.setItem('usuario', JSON.stringify(data.usuario));

//         } else {
//             alert(data.msg || 'Error al registrar solicitante');
//             enableButton(submitBtn, 'Registrarse');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error del servidor');
//         enableButton(submitBtn, 'Registrarse');
//     }
// }

// // ================================
// // Validación de Candidato
// // ================================

// function validateCandidateForm(fullName, email, password, confirmPassword) {
//     let isValid = true;

//     isValid &= checkRequired(fullName, 'El nombre completo es requerido');
//     isValid &= checkEmail(email);
//     isValid &= checkPassword(password);
//     isValid &= checkMatch(password, confirmPassword, 'Las contraseñas no coinciden');

//     return Boolean(isValid);
// }

// function showError(input, message) {
//     const errorDiv = document.getElementById(`error-${input.id}`);
//     if (errorDiv) {
//         errorDiv.textContent = message;
//         input.classList.add('error');
//         input.classList.remove('success');

//         // Ocultar el error automáticamente a los 5s
//         setTimeout(() => {
//             clearError(input);
//         }, 5000);
//     }
// }

// function showSuccess(input) {
//     input.classList.remove('error');
//     input.classList.add('success');
// }

// function clearError(input) {
//     const errorDiv = document.getElementById(`error-${input.id}`);
//     if (errorDiv) {
//         errorDiv.textContent = '';
//         input.classList.remove('error');
//         input.classList.remove('success');
//     }
// }

// function checkRequired(input, message) {
//     if (!input.value.trim()) {
//         showError(input, message);
//         return false;
//     } else {
//         clearError(input);
//         showSuccess(input);
//         return true;
//     }
// }

// function checkEmail(input) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!regex.test(input.value.trim())) {
//         showError(input, 'Correo inválido');
//         return false;
//     } else {
//         clearError(input);
//         showSuccess(input);
//         return true;
//     }
// }

// function checkPassword(input) {
//     if (input.value.length < 8) {
//         showError(input, 'La contraseña debe tener al menos 8 caracteres');
//         return false;
//     } else {
//         clearError(input);
//         showSuccess(input);
//         return true;
//     }
// }

// function checkMatch(pass1, pass2, message) {
//     if (pass1.value !== pass2.value) {
//         showError(pass2, message);
//         return false;
//     } else {
//         clearError(pass2);
//         showSuccess(pass2);
//         return true;
//     }
// }

// function disableButton(button, text) {
//     button.disabled = true;
//     button.textContent = text;
// }

// function enableButton(button, text) {
//     button.disabled = false;
//     button.textContent = text;
// }

// ================================
// Registro de solicitante
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('candidateForm');
    if (registerForm) registerForm.addEventListener('submit', handleCandidateSubmit);

    // Limpia errores al escribir
    const inputs = document.querySelectorAll('#candidateForm input');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });
});

// ================================
// Función principal
// ================================

async function handleCandidateSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    const isValid = validateCandidateForm(fullName, email, password, confirmPassword);

    if (!isValid) return;

    disableButton(submitBtn, 'Creando cuenta...');

    const nuevoUsuario = {
        nombre: fullName.value.trim(),
        correo: email.value.trim(),
        contraseña: password.value.trim(),
        rol: 'solicitante',
        datosCandidato: {}
    };

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            window.location.href = 'login.html';
        } else {
            showFormError(email, data.msg || 'Error al registrar el usuario');
            enableButton(submitBtn, 'Crear cuenta');
        }
    } catch (error) {
        console.error('Error:', error);
        showFormError(email, 'Error del servidor');
        enableButton(submitBtn, 'Crear cuenta');
    }
}

// ================================
// Validaciones con feedback visual
// ================================

function validateCandidateForm(fullName, email, password, confirmPassword) {
    let isValid = true;

    if (!fullName.value.trim()) {
        showError(fullName, 'El nombre completo es requerido');
        isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
        showError(email, 'Correo electrónico no válido');
        isValid = false;
    }

    if (!isValidPassword(password.value.trim())) {
        showError(password, 'La contraseña debe tener al menos 8 caracteres');
        isValid = false;
    }

    if (password.value.trim() !== confirmPassword.value.trim()) {
        showError(confirmPassword, 'Las contraseñas no coinciden');
        isValid = false;
    }

    return isValid;
}

// ================================
// Utilidades visuales
// ================================

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('small');
        errorMsg.className = 'error-message';
        errorMsg.style.color = 'red';
        formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function showFormError(input, message) {
    showError(input, message);
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const error = formGroup.querySelector('.error-message');
    if (error) error.remove();
}

function disableButton(button, text) {
    button.disabled = true;
    button.textContent = text;
}

function enableButton(button, text) {
    button.disabled = false;
    button.textContent = text;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

