// Funciones utilitarias compartidas
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const error = formGroup.querySelector('.error-message') || document.createElement('small');
    error.className = 'error-message';
    error.style.color = 'red';
    error.textContent = message;
    formGroup.appendChild(error);
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// Validación básica de email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validación de contraseña (mínimo 8 caracteres)
function isValidPassword(password) {
    return password.length >= 8;
}

// Cambio entre pestañas
function setupTabSwitcher() {
    const userTypeTabs = document.querySelectorAll('.user-type-tab');
    if (userTypeTabs.length > 0) {
        userTypeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                userTypeTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const type = this.getAttribute('data-type');
                if (type === 'candidate') {
                    window.location.href = 'registroCandidato.html'; 
                } else if (type === 'company') {
                    window.location.href = 'registroEmpresa.html';
                }
            });
        });
    }
}

// Inicialización común
document.addEventListener('DOMContentLoaded', function() {
    setupTabSwitcher();
});

