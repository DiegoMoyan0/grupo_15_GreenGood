// User

let firstNameInput = document.querySelector('input[name="first_name"]');
let lastNameInput = document.querySelector('input[name="last_name"]');
let userNameInput = document.querySelector('input[name="user_name"]')
let phoneInput = document.querySelector('input[name="phone"]');
let birthDateInput = document.querySelector('input[name="birth_date"]')
let userImageInput = document.querySelector('input[name="user_image"]')
let photoUpdateButton = document.getElementById('change_photo')
let userTypeInput = document.querySelectorAll('input[name="user_type"]')
const img = document.getElementById('img');

// Constant elements

const userNameCurrent = userNameInput.value
const updateProfileForm = document.querySelector(".form-login")

// User Address

let addressStreet = document.querySelector('input[name="street"]');
let addressNumber = document.querySelector('input[name="number"]');
let addressCity = document.querySelector('input[name="city"]');
let addressProvince = document.querySelector('input[name="province"]');
let addressCountry = document.querySelector('input[name="country"]');

// Edit, save and cancel buttons

let editButton = document.querySelector('.save-button-icon')
let cancelButton = document.querySelector('.cancelar-button')
let saveButton = document.querySelector('.save-button');



let errors = {
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    birthDate: '',
    addressStreet: '',
    addressNumber: '',
    addressCity: '',
    addressProvince: '',
    addressCountry: '',
    userImage: ''
};


let inputFields = [
    firstNameInput,
    lastNameInput,
    userNameInput,
    phoneInput,
    birthDateInput,
    addressStreet,
    addressNumber,
    addressCity,
    addressProvince,
    addressCountry,
    userImageInput,
];

let addressFields = [
    addressStreet,
    addressNumber,
    addressCity,
    addressProvince,
    addressCountry
]

let userFields = [
    firstNameInput,
    lastNameInput,
    userNameInput,
    phoneInput,
    birthDateInput,
    userImageInput,
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = () => {

    firstNameInput.addEventListener('change', validateFirstName);
    lastNameInput.addEventListener('change', validateLastName);
    userNameInput.addEventListener('change', validateUserName);
    phoneInput.addEventListener('change', validatePhone);
    birthDateInput.addEventListener('change', validateBirthDate);
    userImageInput.addEventListener('change', validateImage);

    addressStreet.addEventListener('change', validateAddressStreet);
    addressNumber.addEventListener('change', validateAddressNumber);
    addressCity.addEventListener('change', validateAddressCity);
    addressProvince.addEventListener('change', validateAddressProvince);
    addressCountry.addEventListener('change', validateAddressCountry);

    // Disable fields on load

    photoUpdateButton.style.display = 'none';

    inputFields.forEach(field => {
        field.setAttribute('disabled', 'true');
    });

    userTypeInput.forEach(radioButton => {
        radioButton.setAttribute('disabled', 'true');
    });

    // Add event listeners to form buttons
    editButton.addEventListener('click', (e) => {

        e.preventDefault();

        inputFields.forEach(field => {
            field.removeAttribute('disabled');
        });

        userTypeInput.forEach(radioButton => {
            radioButton.removeAttribute('disabled');
        });

        editButton.style.display = 'none';
        cancelButton.style.display = 'block';
        saveButton.style.display = 'block';
        photoUpdateButton.style.display = 'unset';

    })

    // Add event listeners to form buttons
    cancelButton.addEventListener('click', (e) => {

        e.preventDefault();

        inputFields.forEach(field => {
            field.setAttribute('disabled', 'true');
            field.classList.remove('is-valid');
            field.classList.remove('not-valid');

        });

        userTypeInput.forEach(radioButton => {
            radioButton.setAttribute('disabled', 'true');
        });

        photoUpdateButton.style.display = 'none';
        saveButton.style.display = 'none';
        editButton.style.display = 'block';
        cancelButton.style.display = 'none'
    })


}

////////////////////////////////////////////////////////////////////////

// User validation

let errorSpan = null;

let displayErrors = (field) => {

    field.classList.remove('is-valid');
    field.classList.add('not-valid');

    if (!errorSpan && addressFields.indexOf(field == -1)) {
        field.errorSpan = document.createElement("span");
        field.parentNode.appendChild(field.errorSpan);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem'
    }
    if (!errorSpan && addressFields.indexOf(field > -1)) {
        field.errorSpan = document.createElement("span");
        field.parentNode.insertBefore(field.errorSpan, field.nextSibling);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem'
    }
    
    if (errorSpan && field == userImageInput) {
        field.errorSpan = document.createElement("span");
        field.parentNode.insertBefore(field.errorSpan, field.nextSibling);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem'
        field.errorSpan.style.margin = '1rem'
    }
}


let removeErrors = (field) => {

    field.classList.add('is-valid');
    field.classList.remove('not-valid');

    if (field.errorSpan) {
        field.errorSpan.remove();
        field.errorSpan = null;
    }

}


let validateFirstName = () => {
    if (!firstNameInput.value.trim()) {

        errors.firstName = 'El nombre es requerido.';
        displayErrors(firstNameInput)
        inputFields[0].errorSpan.textContent = errors.firstName;

    } else {

        errors.firstName = '';
        removeErrors(firstNameInput);
    }
};

let validateLastName = () => {

    if (!lastNameInput.value.trim()) {
        errors.lastName = 'El apellido es requerido.';
        displayErrors(lastNameInput)
        inputFields[1].errorSpan.textContent = errors.lastName;

    } else {
        errors.lastName = '';
        removeErrors(lastNameInput);
    }

};

let validateUserName = () => {

    const user = userNameInput.value.trim()

    if (!userNameInput.value.trim()) {
        errors.userName = ''
        removeErrors(userNameInput);
        errors.userName = 'El usuario es requerido.';
        displayErrors(userNameInput);
        inputFields[2].errorSpan.textContent = errors.userName;
    } else {
        errors.userName = '';
        removeErrors(userNameInput);
        verifyEmail(user)
    }

};

// Function to check if username is already taken on the database via API and provide instant feedback
let verifyEmail = async (user) => {
    try {
        const response = await fetch('user/verify-email?email=' + user);
        const result = await response.text();

        if (result === 'true') {

            if (user == userNameCurrent) {

                errors.userName = 'Este es tu usuario actual';
                if (!errorSpan) {
                    inputFields[2].errorSpan = document.createElement("span");
                    userNameInput.parentNode.appendChild(inputFields[2].errorSpan);
                    inputFields[2].errorSpan.style.color = '#9fc476';
                    inputFields[2].errorSpan.style.fontSize = '0.8rem'
                }

                inputFields[2].errorSpan.textContent = errors.userName;

                userNameInput.classList.add('is-valid');
                userNameInput.classList.remove('not-valid');

            } else {

                errors.userName = 'El usuario ya está registrado en nuestra base de datos, prueba con otro';
                displayErrors(userNameInput);
                inputFields[2].errorSpan.textContent = errors.userName;
            }

        } else {
            removeErrors(userNameInput);
            errors.userName = ''

        }
    } catch (error) {
        errors.userName.textContent = 'Error al verificar el correo electrónico.';
        console.log(error);
    }
};

let validatePhone = () => {

    if (!phoneInput.value.trim()) {

        errors.phone = 'El teléfono es requerido.';
        //removeErrors(phoneInput);
        displayErrors(phoneInput)
        inputFields[3].errorSpan.textContent = errors.phone;
    } else {

        const phoneRegex = /^[0-9]{7,}$/;
        errors.phone = '';

        if (!phoneRegex.test(phoneInput.value.trim()) && phoneInput.value.trim() > 0) {

            errors.phone = 'Debe tener al menos 7 digitos';
            //removeErrors(phoneInput);
            displayErrors(phoneInput)
            inputFields[3].errorSpan.textContent = errors.phone

        } else {
            errors.phone = '';
            removeErrors(phoneInput);
        }

    }
};

let validateBirthDate = () => {

    let birthday = new Date(birthDateInput.value);

    let today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    let monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    };

    removeErrors(birthDateInput);

    if (!birthDateInput.value.trim()) {

        errors.birthDate = "Debes indicar tu fecha de nacimiento";
        displayErrors(birthdayInput)
        inputFields[4].errorSpan.textContent = errors.birthDate

    } else if (age < 18) {
        errors.birthDate = "Debes ser mayor de 18 años";
        displayErrors(birthDateInput)
        inputFields[4].errorSpan.textContent = errors.birthDate

    } else {
        errors.birthDate = '';
        removeErrors(birthDateInput)
    };

};



// Address validation

///////////////////////////////////////////////////////////////////////

let validateAddressStreet = () => {

    if (!addressStreet.value.trim()) {

        errors.addressStreet = 'La calle es requerida.';
        displayErrors(addressStreet)
        inputFields[5].errorSpan.textContent = errors.addressStreet

    } else {
        errors.addressStreet = '';
        removeErrors(addressStreet)
    }
};

let validateAddressNumber = () => {

    // removeErrors(addressNumber)

    if (!addressNumber.value.trim()) {
        errors.addressNumber = 'La numeración es requerida.';
        displayErrors(addressNumber)
        inputFields[6].errorSpan.textContent = errors.addressNumber
    } else if (addressNumber.value.trim().length < 2) {
        errors.addressNumber = "Mínimo 2 caracteres para el Numero";
        displayErrors(addressNumber)
        inputFields[6].errorSpan.textContent = errors.addressNumber
    } else {
        errors.addressStreet = '';
        remove
    };

};

let validateAddressCity = () => {

    if (!addressCity.value.trim()) {
        errors.addressCity = 'La ciudad es requerida.';
        displayErrors(addressCity)

        inputFields[7].errorSpan.textContent = errors.addressCity

    } else {
        errors.addressCity = '';
        removeErrors(addressCity)
    };
}

let validateAddressProvince = () => {
    if (!addressProvince.value.trim()) {
        errors.addressProvince = 'La provincia es requerida.';
        displayErrors(addressProvince)
        inputFields[8].errorSpan.textContent = errors.addressProvince
    } else {
        errors.addressProvince = '';
        removeErrors(addressProvince)
    }

};

let validateAddressCountry = () => {
    if (!addressCountry.value.trim()) {

        errors.addressCountry = 'El país es requerido.';
        displayErrors(addressCountry)
        inputFields[9].errorSpan.textContent = errors.addressCountry
    } else {
        errors.addressCountry = '';
        removeErrors(addressCountry)
    }
};

let validateImage = () => {

    const acceptedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    const selectedFile = userImageInput.files[0];
    const defaultFile = '/images/users/default-user-photo.png';
    const file = document.getElementById('foto');

    if (selectedFile) {
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {

            console.log('extensión invalida');
            console.log(errors.userImage)
            console.log(fileExtension);

            displayErrors(userImageInput)

            errors.userImage = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;

            userImageInput.errorSpan.textContent = errors.userImage;

        } else {

            //console.log('extensión VALIDA');

            errors.userImage = '';
            console.log(errors.userImage)

            removeErrors(userImageInput)

            file.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        img.src = e.target.result;
                    }
                    reader.readAsDataURL(e.target.files[0]);
                } else {
                    img.src = defaultFile;
                }
            })

        };
    };

};


/////////////////////////////////////////////////////////

saveButton.addEventListener('click', () => {

    errors.userName == 'Este es tu usuario actual' ? errors.userName = '' : errors.userName

    updateProfileForm.addEventListener('submit', (e) => {

        if (Object.values(errors).some(error => error !== '')) {

            e.preventDefault();

            alert('Hay errores en los campos, por favor verifica los datos ingresados');

        } else {

            alert('Actualización de datos exitosa');

            updateProfileForm.submit();
            console.log(updateProfileForm.submit())

            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            editButton.style.display = 'block';
        }
    });
});
