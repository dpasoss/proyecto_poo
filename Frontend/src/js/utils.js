// // ================================
// // Utilidades de Validación
// // ================================

// function showError(input, message) {
//     const formGroup = input.parentElement;
//     formGroup.classList.add('error');

//     let error = formGroup.querySelector('.error-message');
//     if (!error) {
//         error = document.createElement('small');
//         error.className = 'error-message';
//         error.style.color = 'red';
//         formGroup.appendChild(error);
//     }

//     error.textContent = message;
// }

// function clearError(input) {
//     const formGroup = input.parentElement;
//     formGroup.classList.remove('error');

//     const error = formGroup.querySelector('.error-message');
//     if (error) error.remove();
// }

// function checkRequired(input, message) {
//     if (input.value.trim() === '') {
//         showError(input, message);
//         return false;
//     }
//     return true;
// }

// function checkEmail(input) {
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!pattern.test(input.value.trim())) {
//         showError(input, 'Correo electrónico inválido');
//         return false;
//     }
//     return true;
// }

// function checkPassword(input) {
//     if (input.value.trim().length < 8) {
//         showError(input, 'La contraseña debe tener al menos 8 caracteres');
//         return false;
//     }
//     return true;
// }

// function checkMatch(input1, input2, message) {
//     if (input1.value !== input2.value) {
//         showError(input2, message);
//         return false;
//     }
//     return true;
// }

// function disableButton(button, text) {
//     button.disabled = true;
//     button.textContent = text;
// }

// function enableButton(button, text) {
//     button.disabled = false;
//     button.textContent = text;
// }

function checkRequired(input, message) {
    if (!input.value.trim()) {
        showError(input, message);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim()) {
        showError(input, 'El correo electrónico es obligatorio');
        return false;
    } else if (!re.test(input.value.trim())) {
        showError(input, 'El correo no es válido');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkPassword(input) {
    if (input.value.length < 8) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkMatch(input1, input2, message) {
    if (input1.value !== input2.value) {
        showError(input2, message);
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    input.classList.add('error');
    input.classList.remove('success');
    if (error) error.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    input.classList.remove('error');
    input.classList.add('success');
    if (error) error.textContent = '';
}

function clearValidation(inputs) {
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.textContent = '';
    });
}

function disableButton(button, text) {
    button.disabled = true;
    button.textContent = text;
}

function enableButton(button, text) {
    button.disabled = false;
    button.textContent = text;
}
