window.onload = function () {

    const tokenInput = document.getElementById("token-input");
    const tokenResetForm = document.getElementById("token-form")
    const errorSpan = document.getElementById('error');
    const confirmTokenButton = document.getElementById('token-button');
    let errors = {};

    // Validate token input

    tokenInput.addEventListener('change', () => {
        const token = tokenInput.value.trim();
        if (!token) {
            errors.token = { msg: 'El token es requerido.' };
            errorSpan.innerHTML = errors.token.msg,
            errorSpan.style.color = '#d92929';
            errorSpan.style.opacity = 1;
            tokenInput.classList.remove('is-valid');
            tokenInput.classList.add('not-valid');
        } else {
            delete errors.token
        }

        validateForm();
    })

    let validateForm = () => {
        if (Object.keys(errors).length === 0) {
            confirmTokenButton.removeAttribute('disabled');
        } else {
            confirmTokenButton.setAttribute('disabled', true);
        }
    };

    tokenResetForm.addEventListener('submit', (event) => {
        if (Object.keys(errors).length > 0 || !tokenInput.value.trim()) { // Double-check that there are no errors nor empty fields...
            event.preventDefault();
            errorSpan.textContent = 'Por favor, ingrese el Token.';
        }
    });


}

