window.onload = function () {

    const emailInput = document.getElementById("email-input");
    const identityDocumentInput = document.getElementById("identity_document");
    const credentialsForm = document.getElementById("confirmation-form")
    const errorSpan = document.getElementById('error');
    const errorSpanId = document.getElementById('error-id');
    const confirmCredentialsButton = document.getElementById('confirmation-button');
    let errors = {};

    // Validate credentials input

    emailInput.addEventListener('change', () => {
        const email = emailInput.value.trim();
        if (!email) {
            errors.email = { msg: 'El email es requerido.' };
            errorSpan.innerHTML = errors.email.msg,
            errorSpan.style.color = '#d92929';
            errorSpan.style.opacity = 1;
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('not-valid');
        } else {
            delete errors.email
            emailInput.classList.remove('not-valid');
            verifyEmail(email);
        }

        validateForm();
    })

    let verifyEmail = async (email) => {
        try {
            const response = await fetch('/api/user/verify-email?email=' + email);
            const result = await response.text();

            if (result === 'true') {

                errorSpan.textContent = 'El email está registrado en nuestra base de datos';
                errorSpan.style.opacity = 1;
                errorSpan.style.color = '#9fc476';
                emailInput.classList.add('is-valid');
                emailInput.classList.remove('not-valid');

            } else {

                errors.email = { msg: 'El email no está registrado en nuestra base de datos' };
                errorSpan.innerHTML = errors.email.msg;
                errorSpan.style.opacity = 1;
                errorSpan.style.color = '#d92929';
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('not-valid');
            }
        } catch (error) {
            errorSpan.textContent = 'Error al verificar el correo electrónico.';
            console.log(error);
        }
    };

    identityDocumentInput.addEventListener('change', () => {
        const id = identityDocumentInput.value.trim();
        if (!id) {
            errors.id = { msg: 'El documento de identidad es requerido.' };
            errorSpanId.innerHTML = errors.id.msg,
            errorSpanId.style.color = '#d92929';
            errorSpanId.style.opacity = 1;
            identityDocumentInput.classList.remove('is-valid');
            identityDocumentInput.classList.add('not-valid');
        } else {
            delete errors.id
        }

        validateForm();
    })


    let validateForm = () => {
        if (Object.keys(errors).length === 0) {
            confirmCredentialsButton.removeAttribute('disabled');
        } else {
            confirmCredentialsButton.setAttribute('disabled', true);
        }
    };

    credentialsForm.addEventListener('submit', (event) => {
        if (Object.keys(errors).length > 0 || !identityDocumentInput.value.trim() || !emailInput.value.trim()) { // Double-check that there are no errors nor empty fields...
            event.preventDefault();
            errorSpan.textContent = 'Por favor, ingrese los datos requeridos.';
        }
    });


}


