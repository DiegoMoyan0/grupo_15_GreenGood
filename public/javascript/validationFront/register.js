window.onload = function () {

    function validation() {

        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("user_name").value;
        const birthdate = document.getElementById("birth_date").value;
        const phone = document.getElementById("phone").value;
        const image = document.getElementById("user_image");
        const street = document.getElementById("street").value;
        const number = document.getElementById("number").value;
        const city = document.getElementById("city").value;
        const province = document.getElementById("province").value;
        const country = document.getElementById("country").value;
        const password = document.getElementById("password").value;
        const repassword = document.getElementById("password_confirm").value;

        const errors = {}; // Objeto para almacenar los errores

        // Limpia los mensajes de error anteriores
        const errorElements = document.getElementsByClassName("error");
        for (const errorElement of errorElements) {
            errorElement.textContent = "";
        }

        if (nombre.length < 2) {
            errors.first_name = "Nombre debe tener al menos 2 caracteres";

        }

        if (Apellido.length < 2) {
            errors.last_name = "Nombre debe tener al menos 2 caracteres";
        }

        if (!birthdateIsValid(birthdate)) {
            errors.birthdate = "Fecha de nacimiento inválida";
        }
        // Expresión regular para validar el formato de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email)) {
            errors.email = "Ingresa un email válido.";
        }


        if () {
            errors.password ="La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.";

        }

        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        if (algo)) {
            alert("La imagen debe tener una extensión válida")
        }
    }

    validation();

    document.getElementById("form-login").addEventListener("submit", function (event) {
    }
    )
}

// Realiza otras validaciones similares para los demás campos...

// Muestra los errores en los elementos del formulario
for (const field in errors) {
    if (errors.hasOwnProperty(field)) {
        document.getElementById(`${field}-error`).textContent = errors[field];
    }
}

// Si no hay errores, puedes proceder al envío del formulario
if (Object.keys(errors).length === 0) {
    // Envía el formulario al servidor o realiza otras acciones
}
  });

function birthdateIsValid(value) {
    // Implementa la validación de la fecha de nacimiento aquí

    let birthday = new Date(value);
    let today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    let monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    if (age >= 18) {
        return true;
    }
}
// Implementa las funciones de validación restantes (phoneIsValid, emailIsValid, etc.)


//--------------------------------------------------------------------------------//


//FORMA DINÁMICA DE MOSTRAR ERRORES:

//Puedes utilizar el evento input para mostrar y ocultar los mensajes de error en tiempo real mientras el usuario llena los campos del formulario:

// Agregar eventos "input" a los campos para validar en tiempo real
form.name.addEventListener("input", validateName);
form.birthdate.addEventListener("input", validateBirthdate);
// Agrega eventos similares para los otros campos...

function validateName() {
    const name = form.name.value;
    if (name.length < 2) {
        errorMessages.name = "Nombre debe tener al menos 2 caracteres";
    } else {
        delete errorMessages.name;
    }
    displayErrors();
}

// function validateBirthdate() {
//     const birthdate = form.birthdate.value;
//     if (!birthdateIsValid(birthdate)) {
//         errorMessages.birthdate = "Fecha de nacimiento inválida";
//     } else {
//         delete errorMessages.birthdate;
//     }
//     displayErrors();
// }

// Agrega funciones de validación y eventos "input" similares para los otros campos...

function displayErrors() {
    // Limpia los mensajes de error anteriores
    const errorElements = document.getElementsByClassName("error");
    for (const errorElement of errorElements) {
        errorElement.textContent = "";
    }

    // Muestra los errores en los elementos del formulario
    for (const field in errorMessages) {
        if (errorMessages.hasOwnProperty(field)) {
            document.getElementById(`${field}-error`).textContent = errorMessages[field];
        }
    }
}

// Agregar evento "submit" al formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Realiza la validación final aquí antes de enviar el formulario
});

//Este código utiliza los eventos input para validar cada campo en tiempo real a medida que el usuario llena el formulario. Los mensajes de error se muestran y ocultan automáticamente en función del contenido del campo. La función displayErrors se llama cada vez que ocurre un evento input en cualquier campo, lo que actualiza los mensajes de error visibles en el formulario.


//----------------------------------------------------------------------------//

//VALIDAR CONTRASEÑAS

// Agregar evento "input" al campo de contraseña
form.password.addEventListener("input", validatePassword);

function validatePassword() {
    const password = form.password.value;

    // Limpia el mensaje de error anterior
    document.getElementById("password-error").textContent = "";

    if (password.length < 8) {
        errorMessages.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/\d/.test(password)) {
        errorMessages.password = "La contraseña debe contener al menos un número";
    } else if (!/[A-Z]/.test(password)) {
        errorMessages.password = "La contraseña debe contener al menos una letra mayúscula";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
        errorMessages.password = "La contraseña debe contener al menos un caracter no alfanumérico";
    } else {
        delete errorMessages.password;
    }
    //La función test es un método que se utiliza en JavaScript con expresiones regulares para verificar si una cadena de texto cumple con un patrón específico. Las expresiones regulares (también conocidas como regex) son patrones que describen conjuntos de cadenas de texto. La función test devuelve true si la cadena coincide con el patrón, y false si no coincide.

    displayErrors();
}

function displayErrors() {
    // Resto del código para mostrar los errores
}

//El código anterior implementa una función validatePassword que verifica que la contraseña cumpla con los siguientes criterios:
/* 
Tener al menos 8 caracteres.
Contener al menos un número.
Contener al menos una letra mayúscula.
Contener al menos un caracter no alfanumérico.
Cada vez que el usuario ingrese o modifique la contraseña, el evento input activará la función validatePassword, que verificará si la contraseña cumple con los criterios establecidos y actualizará los mensajes de error en consecuencia.

Asegúrate de completar la función displayErrors y agregar los eventos input necesarios para los otros campos del formulario. */




/*1) ^[a-zA-Z0-9._-]+: Al menos un carácter alfanumérico, punto, guión bajo o guión antes de la '@'.
2) @: El carácter '@'.
3) [a-zA-Z0-9.-]+: Al menos un carácter alfanumérico, punto o guión después de la '@'.
4) \.: El carácter '.' que separa el dominio de nivel superior.
5) [a-zA-Z]{2,4}$: De 2 a 4 caracteres alfabéticos para el dominio de nivel superior. */


//------------------------------------------------------------------------//
//VALIDAR TELEFONO VALIDO

// Expresión regular para validar que el teléfono sea numérico y tenga al menos 7 dígitos

const phoneRegex = /^[0-9]{7,}$/;

/* 1) ^: Comienzo de la cadena.
2) [0-9]{7,}: Al menos 7 dígitos numéricos.
3) $: Fin de la cadena.  */