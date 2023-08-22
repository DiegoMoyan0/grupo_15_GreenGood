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

let errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>`;

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
    addressCountry,
    userImageInput
];

// Fields with mutiple or additional errors

let errors = {
    userName: '',
    phone: '',
    birthDate: '',
    addressNumber: '',
    userImage: ''
};

// Single error fields

firstNameInput.error = 'El nombre es requerido';
lastNameInput.error = 'El apellido es requerido';

addressStreet.error = 'La dirección es requerida';;
addressCity.error = 'La ciudad es requerida';
addressProvince.error = 'La provincia es requerida';
addressCountry.error = 'El país es requerido';


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

    if (!errorSpan && (addressFields.indexOf(field) === -1)) {
        field.errorSpan = document.createElement("span");
        field.parentNode.appendChild(field.errorSpan);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem'
        field.errorSpan.innerHTML= field.error + errorIcon
    }
    if (!errorSpan && (addressFields.indexOf(field) > -1) && field !== userImageInput) {
        field.errorSpan = document.createElement("span");
        field.parentNode.insertBefore(field.errorSpan, field.nextSibling);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem';
        field.errorSpan.style.marginBottom = '1rem';
        field.errorSpan.innerHTML= field.error + errorIcon
    } else if (field == userImageInput) {
        field.errorSpan = document.createElement("span");
        field.parentNode.insertBefore(field.errorSpan, field.nextSibling);
        field.errorSpan.style.color = '#d92929';
        field.errorSpan.style.fontSize = '0.8rem';
        field.errorSpan.style.margin = '1rem';
        field.errorSpan.innerHTML= field.error + errorIcon
    }

}


let removeErrors = (field) => {

    field.classList.add('is-valid');
    field.classList.remove('not-valid');

    if (field.errorSpan) {
        field.errorSpan.remove();
        field.errorSpan = null;
    }
    field.error = ''
}


let validateFirstName = () => {
    if (!firstNameInput.value.trim()) {
        displayErrors(firstNameInput)
    } else {
        removeErrors(firstNameInput);
    }
};

let validateLastName = () => {
    if (!lastNameInput.value.trim()) {
        displayErrors(lastNameInput)
    } else {
        removeErrors(lastNameInput);
    }
};

let validateUserName = () => {

    const user = userNameInput.value.trim()
    removeErrors(userNameInput);
    userNameInput.error = 'El usuario es requerido';

    if (!userNameInput.value.trim()) {
        displayErrors(userNameInput);
    } else {
        removeErrors(userNameInput);
        verifyEmail(user)
    }

};

// Function to check if username is already taken on the database via API and provide instant feedback
let verifyEmail = async (user) => {
    try {
        const response = await fetch('/api/user/verify-email?email=' + user);
        const result = await response.text();

        if (result === 'true') {

            if (user == userNameCurrent) {

                errors.userName = 'Este es tu usuario actual';
                if (!errorSpan) {
                    userNameInput.errorSpan = document.createElement("span");
                    userNameInput.parentNode.appendChild(userNameInput.errorSpan);
                    userNameInput.errorSpan.style.color = '#9fc476';
                    userNameInput.errorSpan.style.fontSize = '0.8rem'
                }
                userNameInput.errorSpan.textContent = errors.userName;
                userNameInput.classList.add('is-valid');
                userNameInput.classList.remove('not-valid');

            } else {
                removeErrors(userNameInput);
                errors.userName = 'Ese usuario ya está registrado';
                displayErrors(userNameInput);
                userNameInput.errorSpan.innerHTML= errors.userName + errorIcon;
            }

        } else {
            errors.userName = ''
            removeErrors(userNameInput);
        }
    } catch (error) {
        errors.userName.textContent = 'Error al verificar el correo electrónico.';
        console.log(error);
    }
};

let validatePhone = () => {

    if (!phoneInput.value.trim()) {
        removeErrors(phoneInput);
        phoneInput.error = 'El teléfono es requerido';
        displayErrors(phoneInput);
    } else {
        removeErrors(phoneInput);
        const phoneRegex = /^[0-9]{7,}$/;

        if (!phoneRegex.test(phoneInput.value.trim()) && phoneInput.value.trim() > 0) {
            errors.phone = 'Debe tener al menos 7 digitos';
            displayErrors(phoneInput)
            phoneInput.errorSpan.innerHTML = errors.phone + errorIcon
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
        birthDateInput.error = 'La fecha de nacimiento es requerida';
        displayErrors(birthDateInput)
    } else if (age < 18) {
        errors.birthDate = "Debes ser mayor de 18 años";
        displayErrors(birthDateInput)
        birthDateInput.errorSpan.innerHTML = errors.birthDate + errorIcon
    } else {
        errors.birthDate = '';
        removeErrors(birthDateInput)
    };

};

// Address validation

///////////////////////////////////////////////////////////////////////

let validateAddressStreet = () => {

    if (!addressStreet.value.trim()) {
        displayErrors(addressStreet)
    } else {
        removeErrors(addressStreet)
    }
};

let validateAddressNumber = () => {

    removeErrors(addressNumber)

    if (!addressNumber.value.trim()) {
        addressNumber.error = 'El número de la dirección es requerido'
        displayErrors(addressNumber)
    } else if (addressNumber.value.trim().length < 2) {
        errors.addressNumber = "Mínimo 2 caracteres para el número";
        displayErrors(addressNumber)
        addressNumber.errorSpan.innerHTML = errors.addressNumber + errorIcon
    } else {
        errors.addressStreet = '';
        removeErrors(addressNumber)
    };

};

let validateAddressCity = () => {

    if (!addressCity.value.trim()) {
        displayErrors(addressCity)
    } else {
        removeErrors(addressCity)
    };
}

let validateAddressProvince = () => {

    if (!addressProvince.value.trim()) {
        displayErrors(addressProvince)
    } else {
        removeErrors(addressProvince)
    }

};

let validateAddressCountry = () => {
    if (!addressCountry.value.trim()) {
        displayErrors(addressCountry)
    } else {
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
            displayErrors(userImageInput)
            errors.userImage = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;
            userImageInput.errorSpan.innerHTML = errors.userImage + errorIcon;

        } else {

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
