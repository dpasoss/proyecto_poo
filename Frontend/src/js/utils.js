// ================================
// Utilidades de Validación
// ================================

function checkRequired(input, message) {
    if (!input.value.trim()) {
        showError(input, message);
        return false;
    }
    clearError(input);
    return true;
}

function checkEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim()) {
        showError(input, 'El correo electrónico es requerido');
        return false;
    } else if (!regex.test(input.value.trim())) {
        showError(input, 'Ingresa un correo electrónico válido');
        return false;
    }
    clearError(input);
    return true;
}

function checkPassword(input) {
    if (!input.value.trim()) {
        showError(input, 'La contraseña es requerida');
        return false;
    } else if (input.value.length < 8) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres');
        return false;
    }
    clearError(input);
    return true;
}

function checkMatch(input1, input2, message) {
    if (input1.value !== input2.value) {
        showError(input2, message);
        return false;
    }
    clearError(input2);
    return true;
}

// ================================
// Utilidades Visuales
// ================================

function showError(input, message) {
    const errorText = input.nextElementSibling;
    if (errorText) errorText.textContent = message;
    input.classList.add('input-error');
}

function clearError(input) {
    const errorText = input.nextElementSibling;
    if (errorText) errorText.textContent = '';
    input.classList.remove('input-error');
}

function disableButton(btn, text) {
    btn.disabled = true;
    btn.textContent = text;
}

function enableButton(btn, text) {
    btn.disabled = false;
    btn.textContent = text;
}
