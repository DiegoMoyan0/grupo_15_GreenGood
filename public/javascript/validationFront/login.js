// Declare variables according to the HTML elements to be validated
let emailInput = document.getElementById('email-input');
let passwordInput = document.getElementById('password-input');
let messageDiv = document.getElementById('message');
let loginForm = document.getElementById('login-form');
let loginButton = document.getElementById('login-button');

let errors = {};

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

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value.trim();
    if (!password) {
        errors.password = { msg: 'El campo de contraseña es requerido.' };
    } else {
        delete errors.password;
    }
    validateForm();
});

function validateForm() {
    if (Object.keys(errors).length === 0) {
        loginButton.removeAttribute('disabled');
    } else {
        loginButton.setAttribute('disabled', 'disabled');
    }
}

// Function to check if email exists on the database via API and provide instant feedback
async function verifyEmail(email) {
    try {
        const response = await fetch('/verify-email?email=' + email);

        const result = await response.text();

        if (result === 'true') {
            messageDiv.textContent = 'El email/usuario está registrado en nuestra base de datos';
            messageDiv.style.color = 'green';
            messageDiv.style.fontSize = '0.8rem';
        } else {
            console.log(result);
            messageDiv.textContent = 'El email/usuario no está registrado en la base de datos.';
            messageDiv.style.color = 'red';
            messageDiv.style.fontSize = '0.8rem';
        }
    } catch (error) {
        messageDiv.textContent = 'Error al verificar el correo electrónico.';
    }
}

// Add an event listener to the form for the 'submit' event
loginForm.addEventListener('submit', (event) => {
    if (Object.keys(errors).length > 0 || !emailInput.value.trim() || !passwordInput.value.trim()) { // Double check that there are no errors nor empty fields...
        event.preventDefault();
        messageDiv.textContent = 'Por favor, complete todos los campos requeridos.';
        messageDiv.style.color = 'red';
    }
});
