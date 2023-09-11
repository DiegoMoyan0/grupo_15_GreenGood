window.onload = function () {

    //1- HTML elements:
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const email = document.getElementById("email");
    const username = document.getElementById("user_name");
    const birthdate = document.getElementById("birth_date");
    const phone = document.getElementById("phone");
    const image = document.getElementById("user_image");
    const street = document.getElementById("street");
    const number = document.getElementById("number");
    const city = document.getElementById("city");
    const province = document.getElementById("province");
    const country = document.getElementById("country");
    const password = document.getElementById("password");
    const repassword = document.getElementById("repassword");
    const registerForm = document.getElementById("register-form")

    //2- Objeto para almacenar los errores
    let errorMessages = {};

    //3- Validate functions for each input:
    function validateFirstName() {
        if (emptyField(first_name.value)) {
            first_name.classList.add('not-valid');
            first_name.classList.remove('is-valid');
            errorMessages.first_name = "El nombre no puede quedar vacío";
        } else if (first_name.value.length < 2) {
            first_name.classList.add('not-valid');
            errorMessages.first_name = "Mínimo 2 caracteres para el nombre";
        } else {
            delete errorMessages.first_name;
            first_name.classList.add('is-valid');
            first_name.classList.remove('not-valid');
        };
        displayErrors();
    };

    function validateLastName() {//validateTitle
        if (emptyField(last_name.value)) {
            last_name.classList.add('not-valid');
            last_name.classList.remove('is-valid');
            errorMessages.last_name = "El apellido no puede quedar vacío";
        } else if (last_name.value.length < 2) {
            last_name.classList.add('not-valid');
            errorMessages.last_name = "Mínimo 2 caracteres para el apellido";
        } else {
            delete errorMessages.last_name;
            last_name.classList.add('is-valid');
            last_name.classList.remove('not-valid');
        };
        displayErrors();
    };

    //VALIDAR email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    function validateEmail() {
        if (emptyField(email.value)) {
            email.classList.add('not-valid');
            email.classList.remove('is-valid');
            errorMessages.email = "El email no puede quedar vacío";
        } else if (!emailRegex.test(email.value)) {
            email.classList.add('not-valid');
            errorMessages.email = "Formato de email inválido";
        } else {
            delete errorMessages.email;
            email.classList.add('is-valid');
            email.classList.remove('not-valid');
            verifyEmail(email.value)
        };
        displayErrors();
    };


    function validateUsername() {
        if (emptyField(username.value)) {
            username.classList.add('not-valid');
            username.classList.remove('is-valid');
            errorMessages.username = "El nombre de usuario no puede quedar vacío";
        } else if (username.value.length < 2) {
            username.classList.add('not-valid');
            errorMessages.username = "Mínimo 2 caracteres para el nombre";
        } else {
            delete errorMessages.username;
            username.classList.add('is-valid');
            username.classList.remove('not-valid');
            verifyUser(username.value)
        };
        displayErrors();
    };

    // Functions to check if user name and email are already registered on the database via API and provide instant feedback

    let verifyUser = async (user) => {
        try {
            const response = await fetch('/api/user/verify-email?email=' + user);
            const result = await response.text();

            if (result === 'true') {
                username.classList.add('not-valid');
                errorMessages.username = 'El usuario ya está registrado en nuestra base de datos, prueba con otro'
                displayErrors();
            }
        } catch (error) {
            errors.userName.textContent = 'Error al verificar el usuario.';
            console.log(error);
        }
    };

    let verifyEmail = async (emailRegister) => {
        try {
            const response = await fetch('/api/user/verify-email?email='+ emailRegister);
            const result = await response.text();

            if (result === 'true') {
                email.classList.add('not-valid');
                errorMessages.email = 'El email ya está registrado en nuestra base de datos, prueba con otro'
                displayErrors();
            }
        } catch (error) {
            errors.userName.textContent = 'Error al verificar el correo electrónico.';
            console.log(error);
        }
    };
    //

    function validateBirthdate() {
        console.log('Dentro de la funcion');

        let birthday = new Date(birthdate.value);
        let today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        let monthDiff = today.getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
            age--;
        };
        console.log(age);

        if (emptyField(birthdate.value)) {
            birthdate.classList.add('not-valid');
            birthdate.classList.remove('is-valid');
            errorMessages.birthdate = "Debes indicar tu fecha de nacimiento";
        } else if (age < 18) {
            birthdate.classList.add('not-valid');
            errorMessages.birthdate = "Debes ser mayor de 18 años";
        } else {
            delete errorMessages.birthdate;
            birthdate.classList.add('is-valid');
            birthdate.classList.remove('not-valid');
        };

        displayErrors();
    };


    //------------------------------------------------------------------------//
    //VALIDAR TELEFONO VALIDO
    // Expresión regular para validar que el teléfono sea numérico y tenga al menos 7 dígitos
    const phoneRegex = /^[0-9]{7,}$/;
    function validatePhone() {

        if (emptyField(phone.value)) {
            phone.classList.add('not-valid');
            phone.classList.remove('is-valid');
            errorMessages.phone = "El telefono no puede quedar vacío";
            console.log("ENTRO AL IF");
        } else if (!phoneRegex.test(phone.value)) {
            phone.classList.add('not-valid');
            errorMessages.phone = "El telefono debe ser valido";
            console.log("ENTRO AL ELSE IF");
        } else {
            delete errorMessages.phone;
            phone.classList.remove('not-valid');
            phone.classList.add('is-valid');
            console.log("ENTRO AL ELSE");
        };
        displayErrors();
    };


    function validateImage() {
        console.log('Dentro de validate image');
        const acceptedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
        const selectedFile = image.files[0];

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                console.log(fileExtension);
                image.classList.add('not-valid');
                image.classList.remove('is-valid');
                errorMessages.image = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;
            } else {
                image.classList.add('is-valid');
                image.classList.remove('not-valid');
                delete errorMessages.image;
            };
        };
        displayErrors();
    };
    function validateStreet() {
        if (emptyField(street.value)) {
            street.classList.add('not-valid');
            street.classList.remove('is-valid');
            errorMessages.street = "La calle no puede quedar vacía";
        } else {
            delete errorMessages.street;
            street.classList.add('is-valid');
            street.classList.remove('not-valid');
        };
        displayErrors();
    };
    function validateNumber() {

        if (emptyField(number.value)) {
            number.classList.add('not-valid');
            number.classList.remove('is-valid');
            errorMessages.number = "El Numero no puede quedar vacío";
        } else if (number.value.length < 2) {
            number.classList.add('not-valid');
            errorMessages.number = "Mínimo 2 caracteres para el Numero";
        } else {
            delete errorMessages.number;
            number.classList.add('is-valid');
            number.classList.remove('not-valid');
        };
        displayErrors();
    };
    function validateCity() {
        if (emptyField(city.value)) {
            city.classList.add('not-valid');
            city.classList.remove('is-valid');
            errorMessages.city = "La ciudad no puede quedar vacía";
        } else {
            delete errorMessages.city;
            city.classList.add('is-valid');
            city.classList.remove('not-valid');
        };
        displayErrors();
    };
    function validateProvince() {
        if (emptyField(province.value)) {
            province.classList.add('not-valid');
            province.classList.remove('is-valid');
            errorMessages.province = "La provincia no puede quedar vacía";
        } else {
            delete errorMessages.province;
            province.classList.add('is-valid');
            province.classList.remove('not-valid');
        };
        displayErrors();
    };
    function validateCountry() {
        if (emptyField(country.value)) {
            country.classList.add('not-valid');
            country.classList.remove('is-valid');
            errorMessages.country = "El pais no puede quedar vacío";
        } else {
            delete errorMessages.country;
            country.classList.add('is-valid');
            country.classList.remove('not-valid');
        };
        displayErrors();
    };
    //VALIDAR CONTRASEÑAS

    function validatePassword() {
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
        //La función test es un método que se utiliza en JavaScript con expresiones regulares para verificar si una cadena de texto cumple con un patrón específico. Las expresiones regulares (también conocidas como regex) son patrones que describen conjuntos de cadenas de texto. La función test devuelve true si la cadena coincide con el patrón, y false si no coincide.

        displayErrors();
    }
    function validateRepassword() {
        if (emptyField(repassword.value)) {
            repassword.classList.add('not-valid');
            repassword.classList.remove('is-valid');
            errorMessages.repassword = "La contraseña no puede quedar vacío";
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

    // 4- General validation functions:
    function emptyField(inputValue) {
        return inputValue.trim() == ""
    };

    function displayErrors() {
        // To clear prev errors
        const errorElements = document.getElementsByClassName("error");
        const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>`;
        for (const errorElement of errorElements) {
            errorElement.textContent = "";
        };
        // To show spans with errors
        for (const field in errorMessages) {
            if (errorMessages.hasOwnProperty(field)) {
                document.getElementById(`${field}-error`).innerHTML = errorMessages[field] + errorIcon;
                document.getElementById(`${field}-error`).style.opacity = 1;
            };
        };
    };

    //5 - User intereactions with inputs
    first_name.addEventListener('input', validateFirstName);
    last_name.addEventListener('input', validateLastName);
    email.addEventListener('input', validateEmail);
    username.addEventListener('input', validateUsername);
    birthdate.addEventListener('blur', validateBirthdate);
    phone.addEventListener('input', validatePhone);
    image.addEventListener('input', validateImage);
    street.addEventListener('input', validateStreet);
    number.addEventListener('input', validateNumber);
    city.addEventListener('input', validateCity);
    province.addEventListener('input', validateProvince);
    country.addEventListener('input', validateCountry);
    password.addEventListener("input", validatePassword)
    repassword.addEventListener("input", validateRepassword)

    registerForm.addEventListener("submit", e => {
        e.preventDefault();
        validateFirstName();
        validateLastName();
        validateEmail();
        validateUsername();
        validateBirthdate();
        validatePhone();
        validateImage();
        validateStreet();
        validateNumber();
        validateCity();
        validateProvince();
        validateCountry();
        validatePassword();
        validateRepassword();

        if (!Object.keys(errorMessages).length > 0) {
            registerForm.submit()
        }

    })
}