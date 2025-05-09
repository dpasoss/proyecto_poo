// ================================
// Registro de Empresa
// ================================
import { User } from "../models/user.js";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('companyForm');
    if (registerForm) registerForm.addEventListener('submit', handleCompanySubmit);
});

// ================================
// Función Principal
// ================================

async function handleCompanySubmit(e) {
    e.preventDefault();

    // Elementos del formulario
    const companyName = document.getElementById('companyName');
    const taxId = document.getElementById('taxId');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const fields = [companyName, taxId, email, password, confirmPassword];
    clearValidation(fields);

    // Validación
    if (!validateCompanyForm(companyName, taxId, email, password, confirmPassword)) return;

    // Desactivar botón
    const submitBtn = e.target.querySelector('button[type="submit"]');
    disableButton(submitBtn, 'Creando cuenta...');

    const user = new User(companyName.value, email.value, password.value, 'empleador', { identificacionFiscal: taxId.value })

    // Enviar solicitud
    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: user.nombre,
                correo: user.correo,
                contraseña: user.contraseña,
                rol: 'empleador',
                datosEmpleador: user.datosEmpleador
            })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            const successMsg = document.getElementById('success-message');
            if (successMsg) {
                successMsg.style.display = 'block';
            }
        
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            showError(email, data.msg || 'Error al registrar empresa');
            enableButton(submitBtn, 'Crear cuenta');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(email, 'Error del servidor');
        enableButton(submitBtn, 'Crear cuenta');
    }
}

// ================================
// Validación de Empresa
// ================================

function validateCompanyForm(name, taxId, email, password, confirmPassword) {
    let isValid = true;

    isValid &= checkRequired(name, 'El nombre de la empresa es obligatorio');
    isValid &= checkRequired(taxId, 'El RUC/NIT/RFC es obligatorio');
    isValid &= checkEmail(email);
    isValid &= checkPassword(password);
    isValid &= checkMatch(password, confirmPassword, 'Las contraseñas no coinciden');

    return Boolean(isValid);
}
