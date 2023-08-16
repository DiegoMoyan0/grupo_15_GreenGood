
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


    inputFields.forEach(field => {
        field.setAttribute('disabled', 'true');
    });

    userTypeInput.forEach(radioButton => {
        radioButton.setAttribute('disabled', 'true');
    });

    photoUpdateButton.style.display = 'none';

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

let validateFirstName = () => {
    if (!firstNameInput.value.trim()) {

        errors.firstName = 'El nombre es requerido.';
        firstNameInput.classList.remove('is-valid');
        firstNameInput.classList.add('not-valid');

        if (!errorSpan) {
            inputFields[0].errorSpan = document.createElement("span");
            firstNameInput.parentNode.appendChild(inputFields[0].errorSpan);
            inputFields[0].errorSpan.style.color = '#d92929';
            inputFields[0].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[0].errorSpan.textContent = errors.firstName;

    } else {

        errors.firstName = '';
        firstNameInput.classList.add('is-valid');
        firstNameInput.classList.remove('not-valid');

        if (inputFields[0].errorSpan) {
            inputFields[0].errorSpan.remove();
            inputFields[0].errorSpan = null;
        }
    }
};

let validateLastName = () => {

    if (!lastNameInput.value.trim()) {
        errors.lastName = 'El apellido es requerido.';
        lastNameInput.classList.remove('is-valid');
        lastNameInput.classList.add('not-valid');

        if (!errorSpan) {
            inputFields[1].errorSpan = document.createElement("span");
            lastNameInput.parentNode.appendChild(inputFields[1].errorSpan);
            inputFields[1].errorSpan.style.color = '#d92929';
            inputFields[1].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[1].errorSpan.textContent = errors.lastName;


    } else {
        errors.lastName = '';
        lastNameInput.classList.add('is-valid');
        lastNameInput.classList.remove('not-valid');

        if (inputFields[1].errorSpan) {
            inputFields[1].errorSpan.remove();
            inputFields[1].errorSpan = null;
        }


    }

};


let validateUserName = () => {

    const user = userNameInput.value.trim()

    if (!userNameInput.value.trim()) {

        if (inputFields[2].errorSpan) {
            inputFields[2].errorSpan.remove();
            inputFields[2].errorSpan = null;
        }
        errors.userName = ''

        errors.userName = 'El usuario es requerido.';
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('not-valid');

        if (!errorSpan) {
            inputFields[2].errorSpan = document.createElement("span");
            userNameInput.parentNode.appendChild(inputFields[2].errorSpan);
            inputFields[2].errorSpan.style.color = '#d92929';
            inputFields[2].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[2].errorSpan.textContent = errors.userName;


    } else {
        errors.userName = '';
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('not-valid');


        if (inputFields[2].errorSpan) {
            inputFields[2].errorSpan.remove();
            inputFields[2].errorSpan = null;
        }

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


                if (!errorSpan) {
                    inputFields[2].errorSpan = document.createElement("span");
                    userNameInput.parentNode.appendChild(inputFields[2].errorSpan);
                    inputFields[2].errorSpan.style.color = '#d92929';
                    inputFields[2].errorSpan.style.fontSize = '0.8rem'
                }


                inputFields[2].errorSpan.textContent = errors.userName;

                userNameInput.classList.remove('is-valid');
                userNameInput.classList.add('not-valid');
            }

        } else {

            //errors.userName = { msg: 'El usuario está disponible en nuestra base de datos' };
            // errors.userName.textContent = errors.userName.msg;


            userNameInput.classList.add('is-valid');
            userNameInput.classList.remove('not-valid');

            if (inputFields[2].errorSpan) {
                inputFields[2].errorSpan.remove();
                inputFields[2].errorSpan = null;
            }

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
        phoneInput.classList.remove('is-valid');
        phoneInput.classList.add('not-valid');

        if (inputFields[3].errorSpan) {
            inputFields[3].errorSpan.remove();
            inputFields[3].errorSpan = null;
        }

        if (!errorSpan) {
            inputFields[3].errorSpan = document.createElement("span");
            phoneInput.parentNode.appendChild(inputFields[3].errorSpan);
            inputFields[3].errorSpan.style.color = '#d92929';
            inputFields[3].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[3].errorSpan.textContent = errors.phone;


    } else {

        const phoneRegex = /^[0-9]{7,}$/;

        errors.phone = '';


        if (!phoneRegex.test(phoneInput.value.trim()) && phoneInput.value.trim() > 0) {

            if (inputFields[3].errorSpan) {
                inputFields[3].errorSpan.remove();
                inputFields[3].errorSpan = null;
            }

            if (!inputFields[3].errorSpan) {
                inputFields[3].errorSpan = document.createElement("span");
                phoneInput.parentNode.appendChild(inputFields[3].errorSpan);
                inputFields[3].errorSpan.style.color = '#d92929';
                inputFields[3].errorSpan.style.fontSize = '0.8rem'
            }

            phoneInput.classList.remove('is-valid');
            phoneInput.classList.add('not-valid');

            errors.phone = 'Debe tener al menos 7 digitos';

            inputFields[3].errorSpan.textContent = errors.phone

        } else {

            errors.phone = '';
            phoneInput.classList.add('is-valid');
            phoneInput.classList.remove('not-valid');

            if (inputFields[3].errorSpan) {
                inputFields[3].errorSpan.remove();
                inputFields[3].errorSpan = null;
            }
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



    if (inputFields[4].errorSpan) {
        inputFields[4].errorSpan.remove();
        inputFields[4].errorSpan = null;
    }

    if (!birthDateInput.value.trim()) {
        birthDateInput.classList.add('not-valid');
        birthDateInput.classList.remove('is-valid');


        if (!inputFields[4].errorSpan) {
            inputFields[4].errorSpan = document.createElement("span");
            birthDateInput.parentNode.appendChild(inputFields[4].errorSpan);
            inputFields[4].errorSpan.style.color = '#d92929';
            inputFields[4].errorSpan.style.fontSize = '0.8rem'
        }


        errors.birthDate = "Debes indicar tu fecha de nacimiento";

        inputFields[4].errorSpan.textContent = errors.birthDate


    } else if (age < 18) {
        birthDateInput.classList.remove('is-valid');
        birthDateInput.classList.add('not-valid');
        errors.birthDate = "Debes ser mayor de 18 años";


        if (!inputFields[4].errorSpan) {
            inputFields[4].errorSpan = document.createElement("span");
            birthDateInput.parentNode.appendChild(inputFields[4].errorSpan);
            inputFields[4].errorSpan.style.color = '#d92929';
            inputFields[4].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[4].errorSpan.textContent = errors.birthDate


    } else {
        delete errors.birthDate;

        birthDateInput.classList.add('is-valid');
        birthDateInput.classList.remove('not-valid');

        if (inputFields[4].errorSpan) {
            inputFields[4].errorSpan.remove();
            inputFields[4].errorSpan = null;
        }
    };

};




// Address validation

///////////////////////////////////////////////////////////////////////

let validateAddressStreet = () => {



    if (!addressStreet.value.trim()) {

        errors.addressStreet = 'La calle es requerida.';
        addressStreet.classList.remove('is-valid');
        addressStreet.classList.add('not-valid');



        if (!inputFields[5].errorSpan) {
            inputFields[5].errorSpan = document.createElement("span");
            inputFields[5].parentNode.insertBefore(inputFields[5].errorSpan, addressStreet.nextSibling);
            inputFields[5].errorSpan.style.color = '#d92929';
            inputFields[5].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[5].errorSpan.textContent = errors.addressStreet



    } else {
        errors.addressStreet = '';
        // delete  errors.addressStreet
        addressStreet.classList.add('is-valid');
        addressStreet.classList.remove('not-valid');


        if (inputFields[5].errorSpan) {
            inputFields[5].errorSpan.remove();
            inputFields[5].errorSpan = null;
        }

    }
};

let validateAddressNumber = () => {



    if (inputFields[6].errorSpan) {
        inputFields[6].errorSpan.remove();
        inputFields[6].errorSpan = null;
    }

    if (!addressNumber.value.trim()) {
        errors.addressNumber = 'La numeración es requerida.';
        addressNumber.classList.remove('is-valid');
        addressNumber.classList.add('not-valid');


        if (!inputFields[6].errorSpan) {
            inputFields[6].errorSpan = document.createElement("span");
            inputFields[6].parentNode.insertBefore(inputFields[6].errorSpan, addressNumber.nextSibling);
            inputFields[6].errorSpan.style.color = '#d92929';
            inputFields[6].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[6].errorSpan.textContent = errors.addressNumber


    } else if (addressNumber.value.trim().length < 2) {
        addressNumber.classList.add('not-valid');
        errors.addressNumber = "Mínimo 2 caracteres para el Numero";

        if (!inputFields[6].errorSpan) {
            inputFields[6].errorSpan = document.createElement("span");
            inputFields[6].parentNode.insertBefore(inputFields[6].errorSpan, addressNumber.nextSibling);
            inputFields[6].errorSpan.style.color = '#d92929';
            inputFields[6].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[6].errorSpan.textContent = errors.addressNumber
    } else {
        delete errors.addressStreet;
        addressNumber.classList.add('is-valid');
        addressNumber.classList.remove('not-valid');

        if (inputFields[6].errorSpan) {
            inputFields[6].errorSpan.remove();
            inputFields[6].errorSpan = null;
        }


    };

};


let validateAddressCity = () => {

    if (!addressCity.value.trim()) {
        errors.addressCity = 'La ciudad es requerida.';
        addressCity.classList.remove('is-valid');
        addressCity.classList.add('not-valid');

        if (!inputFields[7].errorSpan) {
            inputFields[7].errorSpan = document.createElement("span");
            inputFields[7].parentNode.insertBefore(inputFields[7].errorSpan, addressCity.nextSibling);
            inputFields[7].errorSpan.style.color = '#d92929';
            inputFields[7].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[7].errorSpan.textContent = errors.addressCity

    } else {
        errors.addressCity = '';
        addressCity.classList.add('is-valid');
        addressCity.classList.remove('not-valid');

        if (inputFields[7].errorSpan) {
            inputFields[7].errorSpan.remove();
            inputFields[7].errorSpan = null;
        }
    }
};

let validateAddressProvince = () => {
    if (!addressProvince.value.trim()) {
        errors.addressProvince = 'La provincia es requerida.';
        addressProvince.classList.remove('is-valid');
        addressProvince.classList.add('not-valid');

        if (!inputFields[8].errorSpan) {
            inputFields[8].errorSpan = document.createElement("span");
            inputFields[8].parentNode.insertBefore(inputFields[8].errorSpan, addressProvince.nextSibling);
            inputFields[8].errorSpan.style.color = '#d92929';
            inputFields[8].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[8].errorSpan.textContent = errors.addressProvince


    } else {
        errors.addressProvince = '';
        addressProvince.classList.add('is-valid');
        addressProvince.classList.remove('not-valid');

        if (inputFields[8].errorSpan) {
            inputFields[8].errorSpan.remove();
            inputFields[8].errorSpan = null;
        }
    }

};

let validateAddressCountry = () => {
    if (!addressCountry.value.trim()) {

        errors.addressCountry = 'El país es requerido.';
        addressCountry.classList.remove('is-valid');
        addressCountry.classList.add('not-valid');

        if (!inputFields[9].errorSpan) {
            inputFields[9].errorSpan = document.createElement("span");
            inputFields[9].parentNode.insertBefore(inputFields[9].errorSpan, addressCountry.nextSibling);
            inputFields[9].errorSpan.style.color = '#d92929';
            inputFields[9].errorSpan.style.fontSize = '0.8rem'
        }

        inputFields[9].errorSpan.textContent = errors.addressCountry
    } else {
        errors.addressCountry = '';
        addressCountry.classList.add('is-valid');
        addressCountry.classList.remove('not-valid');


        if (inputFields[9].errorSpan) {
            inputFields[9].errorSpan.remove();
            inputFields[9].errorSpan = null;
        }
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

            userImageInput.classList.add('not-valid');
            userImageInput.classList.remove('is-valid');

            if (!inputFields[10].errorSpan) {
                inputFields[10].errorSpan = document.createElement("span");
                inputFields[10].parentNode.insertBefore(inputFields[10].errorSpan, userImageInput.nextSibling);
                inputFields[10].errorSpan.style.color = '#d92929';
                inputFields[10].errorSpan.style.fontSize = '0.8rem';
                inputFields[10].errorSpan.style.margin = '1rem'
            }

            errors.userImage = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;
            inputFields[10].errorSpan.textContent = errors.userImage;

        } else {

            console.log('extensión VALIDA');


            userImageInput.classList.add('is-valid');
            userImageInput.classList.remove('not-valid');
            delete errors.userImage
            console.log(errors.userImage)

            if (inputFields[10].errorSpan) {
                inputFields[10].errorSpan.remove();
                inputFields[10].errorSpan = null;
            }

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

