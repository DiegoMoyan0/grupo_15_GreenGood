
// User

let firstNameInput = document.querySelector('input[name="first_name"]');
let lastNameInput = document.querySelector('input[name="last_name"]');
let userNameInput = document.querySelector('input[name="user_name"]')
let phoneInput = document.querySelector('input[name="phone"]');
let birthDateInput = document.querySelector('input[name="birth_date"]')

// User Address

let addressStreet = document.querySelector('input[name="street"]');
let addressNumber = document.querySelector('input[name="number"]');
let addressCity = document.querySelector('input[name="city"]');
let addressProvince = document.querySelector('input[name="province"]');
let addressCountry = document.querySelector('input[name="country"]');

// Edit save and cancel buttons

let editButton = document.querySelector('.save-button-icon')
let cancelButton = document.querySelector('.cancelar-button')
let saveButton = document.querySelector('.save-button');



saveButton.addEventListener('click', () => {
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    editButton.style.display = 'block';
});


// Except email

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
    addressCountry: ''
};

// Except email

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
    addressCountry
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.onload = () => {

    firstNameInput.addEventListener('change', validateFirstName);
    lastNameInput.addEventListener('change', validateLastName);
    userNameInput.addEventListener('change', validateUserName);
    phoneInput.addEventListener('change', validatePhone);
    birthDateInput.addEventListener('change', validateBirthDate);

    addressStreet.addEventListener('change', validateAddressStreet);
    addressNumber.addEventListener('change', validateAddressNumber);
    addressCity.addEventListener('change', validateAddressCity);
    addressProvince.addEventListener('change', validateAddressProvince);
    addressCountry.addEventListener('change', validateAddressCountry);


    inputFields.forEach(field => {
        field.setAttribute('disabled', 'true');
    });

    editButton.addEventListener('click', (e) => {

        e.preventDefault();

        // console.log('Click en el botón de edición');

        inputFields.forEach(field => {
            field.removeAttribute('disabled');
        });

        editButton.style.display = 'none';
        cancelButton.style.display = 'block';
        saveButton.style.display = 'block';

    })


    cancelButton.addEventListener('click', (e) => {

        e.preventDefault();
        // console.log('Click en el botón CANCELAR edición');

        inputFields.forEach(field => {
            field.setAttribute('disabled', 'true');
            field.classList.remove('is-valid');
            field.classList.remove('not-valid');

        });

        saveButton.style.display = 'none';
        editButton.style.display = 'block';
        cancelButton.style.display = 'none'
    })



}


////////////////////////////////////////////////////////////////////////

// User validation

let validateFirstName = () => {

    if (!firstNameInput.value.trim()) {
        errors.firstName = 'El nombre es requerido.';
        firstNameInput.classList.remove('is-valid');
        firstNameInput.classList.add('not-valid');
    } else {
        errors.firstName = '';
        firstNameInput.classList.add('is-valid');
        firstNameInput.classList.remove('not-valid');
    }

};

let validateLastName = () => {

    if (!lastNameInput.value.trim()) {
        errors.lastName = 'El apellido es requerido.';
        lastNameInput.classList.remove('is-valid');
        lastNameInput.classList.add('not-valid');
    } else {
        errors.lastName = '';
        lastNameInput.classList.add('is-valid');
        lastNameInput.classList.remove('not-valid');
    }

};


let validateUserName = () => {

    if (!userNameInput.value.trim()) {
        errors.userName = 'El usuario es requerido.';
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('not-valid');
    } else {
        errors.userName = '';
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('not-valid');
    }

};


let validatePhone = () => {

    if (!phoneInput.value.trim()) {
        errors.phone = 'El teléfono es requerido.';
        phoneInput.classList.remove('is-valid');
        phoneInput.classList.add('not-valid');

    } else {
        errors.phone = '';
        phoneInput.classList.add('is-valid');
        phoneInput.classList.remove('not-valid');
    }
};

let validateBirthDate = () => {

    if (!birthDateInput.value.trim()) {
        errors.birthDate = 'La fecha de nacimiento es requerida.';
        birthDateInput.classList.remove('is-valid');
        birthDateInput.classList.add('not-valid');
    } else {

        errors.birthDate = '';
        birthDateInput.classList.add('is-valid');
        birthDateInput.classList.remove('not-valid');
    }

}

// Address validation

let validateAddressStreet = () => {
    if (!addressStreet.value.trim()) {
        errors.addressStreet = 'La calle es requerida.';
        addressStreet.classList.remove('is-valid');
        addressStreet.classList.add('not-valid');
    } else {
        errors.addressStreet = '';
        addressStreet.classList.add('is-valid');
        addressStreet.classList.remove('not-valid');
    }
};

let validateAddressNumber = () => {
    if (!addressNumber.value.trim()) {
        errors.addressNumber = 'La numeración es requerida.';
        addressNumber.classList.remove('is-valid');
        addressNumber.classList.add('not-valid');
    } else {
        errors.addressNumber = '';
        addressNumber.classList.add('is-valid');
        addressNumber.classList.remove('not-valid');
    }
};

let validateAddressCity = () => {
    if (!addressCity.value.trim()) {
        errors.addressCity = 'La ciudad es requerida.';
        addressCity.classList.remove('is-valid');
        addressCity.classList.add('not-valid');
    } else {
        errors.addressCity = '';
        addressCity.classList.add('is-valid');
        addressCity.classList.remove('not-valid');
    }
};

let validateAddressProvince = () => {
    if (!addressProvince.value.trim()) {
        errors.addressProvince = 'La provincia es requerida.';
        addressProvince.classList.remove('is-valid');
        addressProvince.classList.add('not-valid');
    } else {
        errors.addressProvince = '';
        addressProvince.classList.add('is-valid');
        addressProvince.classList.remove('not-valid');
    }
};

let validateAddressCountry = () => {
    if (!addressCountry.value.trim()) {
        errors.addressCountry = 'El país es requerido.';
        addressCountry.classList.remove('is-valid');
        addressCountry.classList.add('not-valid');
    } else {
        errors.addressCountry = '';
        addressCountry.classList.add('is-valid');
        addressCountry.classList.remove('not-valid');
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const defaultFile = '/images/users/default-user-photo.png';
const file = document.getElementById('foto');
const img = document.getElementById('img');
file.addEventListener('change', e => {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

