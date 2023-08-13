
// Declare variables according to the HTML elements to be validated
let emailInput = document.getElementById('email-input');
let passwordInput = document.getElementById('password-input');
let errorSpan = document.getElementById('error');
let errorSpanPass = document.getElementById('error-password');
let loginForm = document.getElementById('login-form');
let loginButton = document.getElementById('login-button');
/*
let errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>`;
*/

let errors = {};

// Validate email/username input

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (!email) {

        errors.email = { msg: 'El campo de email/usuario es requerido.' };
        errorSpan.textContent =   errors.email.msg;
      // errorSpan.innerHTML = errorIcon + ' ' + errors.email.msg;

        emailInput.classList.remove('is-valid');
        emailInput.classList.add('not-valid');

    } else {

        emailInput.classList.add('is-valid');
        emailInput.classList.remove('not-valid');

        errorSpan.style.color = 'red';

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
       // errorSpanPass.innerHTML = errorIcon + ' ' + errors.password.msg;
        
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('not-valid');

    } else {

        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('not-valid');

        delete errors.password;

        errorSpanPass.textContent ='';
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
        const response = await fetch('user/verify-email?email=' + email);
        const result = await response.text();

        if (result === 'true') {

            errorSpan.textContent = 'El email/usuario está registrado en nuestra base de datos';

            errorSpan.style.color = 'green';

            emailInput.classList.add('is-valid');
            emailInput.classList.remove('not-valid');

        } else {

            errors.email = { msg: 'El email/usuario no está registrado en nuestra base de datos'};
            errorSpan.textContent = errors.email.msg;
           // errorSpan.innerHTML = errorIcon + ' ' + errors.email.msg;

            errorSpan.style.color = 'red';

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
    if (Object.keys(errors).length > 0 || !emailInput.value.trim() || !passwordInput.value.trim()) { // Double-check that there are no errors nor empty fields...
        event.preventDefault();
        errorSpan.textContent = 'Por favor, complete todos los campos requeridos.';
        errorSpan.style.color = 'red';
    }
});
