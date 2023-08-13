
// Declare variables according to the HTML elements to be validated
let emailInput = document.getElementById('email-input');
let passwordInput = document.getElementById('password-input');
let errorSpan = document.getElementById('error');
let errorSpanPass = document.getElementById('error-password');
let loginForm = document.getElementById('login-form');
let loginButton = document.getElementById('login-button');

let errors = {};

// Validate email/username input

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (!email) {
        errors.email = { msg: 'El campo de email/usuario es requerido.' };
    } else {
        delete errors.email;
        verifyEmail(email);
    }
    validateForm();
});


// Validate password input

passwordInput.addEventListener('change', () => {
    const password = passwordInput.value.trim();
    if (!password) {
        errors.password = { msg: 'El campo de contraseña es requerido.' };
        errorSpanPass.textContent = errors.password.msg;
        errorSpanPass.style.color = 'red';
        errorSpanPass.style.fontSize = '11px';
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('not-valid');
    } else {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('not-valid');
        delete errors.password;
    }
    validateForm();
});

let validateForm = () => {
    if (Object.keys(errors).length === 0) {
        loginButton.removeAttribute('disabled');
    } else {
        loginButton.setAttribute('disabled', 'disabled');
    }
};

// Function to check if email exists on the database via API and provide instant feedback
let verifyEmail = async (email) => {
    try {
        const response = await fetch('/verify-email?email=' + email);
        const result = await response.text();

        if (result === 'true') {
            errorSpan.textContent = 'El email/usuario está registrado en nuestra base de datos';
            errorSpan.style.color = 'green';
            errorSpan.style.fontSize = '11px';
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('not-valid');
        } else {
            errorSpan.textContent = 'El email/usuario no está registrado en la base de datos.';
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '11px';
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('not-valid');
        }
    } catch (error) {
        errorSpan.textContent = 'Error al verificar el correo electrónico.';
        console.log(error);
    }
};

// Add an event listener to the form for the 'submit' event
loginForm.addEventListener('submit', (event) => {
    if (Object.keys(errors).length > 0 || !emailInput.value.trim() || !passwordInput.value.trim()) { // Double check that there are no errors nor empty fields...
        event.preventDefault();
        errorSpan.textContent = 'Por favor, complete todos los campos requeridos.';
        errorSpan.style.color = 'red';
    }
});
