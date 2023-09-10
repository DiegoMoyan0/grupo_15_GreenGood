window.onload = function () {

    const password = document.getElementById("password");
    const repassword = document.getElementById("repassword");
    const passResetForm = document.getElementById("pass-confirm-form")

    let errorMessages = {}
    
    let validatePassword = () => {

        if (emptyField(password.value)) {
            password.classList.add('not-valid');
            password.classList.remove('is-valid');
            errorMessages.password = "La contraseña no puede quedar vacío";
        } else if (!/\d/.test(password.value)) {
            password.classList.add('not-valid');
            password.classList.remove('is-valid');
            errorMessages.password = "La contraseña debe contener al menos un número";
        } else if (!/[A-Z]/.test(password.value)) {
            password.classList.add('not-valid');
            password.classList.remove('is-valid');
            errorMessages.password = "La contraseña debe contener al menos una letra mayúscula";
        } else if (!/[^a-zA-Z0-9]/.test(password.value)) {
            password.classList.add('not-valid');
            password.classList.remove('is-valid');
            errorMessages.password = "La contraseña debe contener al menos un caracter especial";
        } else if (password.value.length < 8) {
            password.classList.add('not-valid');
            password.classList.remove('is-valid');
            errorMessages.password = "La contraseña debe tener al menos 8 caracteres";
        } else {
            delete errorMessages.password;
            password.classList.remove('not-valid');
            password.classList.add('is-valid');
        }

        displayErrors();
    }

    let validateRepassword = () => {
        if (emptyField(repassword.value)) {
            repassword.classList.add('not-valid');
            repassword.classList.remove('is-valid');
            errorMessages.repassword = "La contraseña no puede quedar vacía";
        } else if (repassword.value !== password.value) {
            repassword.classList.add('not-valid');
            repassword.classList.remove('is-valid');
            errorMessages.repassword = "Las contraseñas deben coincidir";
        } else {
            delete errorMessages.repassword;
            repassword.classList.remove('not-valid');
            repassword.classList.add('is-valid');
        }

        displayErrors();
    }

    let  emptyField = (inputValue) => {
        return inputValue.trim() == ""
    };


    let displayErrors = () => {

        const errorElements = document.getElementsByClassName("error");
        for (const errorElement of errorElements) {
            errorElement.textContent = "";
        };

        for (const field in errorMessages) {
            if (errorMessages.hasOwnProperty(field)) {
                document.getElementById(`${field}-error`).innerHTML = errorMessages[field]
                document.getElementById(`${field}-error`).style.opacity = 1;
            };
        };
    };

    password.addEventListener("input", validatePassword)
    repassword.addEventListener("input", validateRepassword)

    passResetForm.addEventListener("submit", e => {
        e.preventDefault();
        validatePassword();
        validateRepassword();

        if (!Object.keys(errorMessages).length > 0) {
            passResetForm.submit()
        }

    })
}


