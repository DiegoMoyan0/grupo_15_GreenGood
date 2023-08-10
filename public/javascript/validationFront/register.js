window.onload = function () {

    document.getElementById("form-login").addEventListener("submit", function (event) {
        const nombre = document.getElementById("first_name").value;
        const Apellido = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const imagenInput = document.getElementById("foto");

        if (Apellido.length < 2) {
            alert("Apellido debe tener al menos 2 caracteres.");
            event.preventDefault();
            return;
        }
        if (nombre.length < 2) {
            alert("Nombre debe tener al menos 2 caracteres.");
            event.preventDefault();
            return;
        }

        // if ()) {
        //     alert("Ingresa un email válido.");
        //     event.preventDefault();
        //     return;
        // }


        // if () {
        //     alert("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.");
        //     event.preventDefault();
        //     return;
        // }

        // const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        // if (algo)) {
        //     alert("La imagen debe tener una extensión válida")
        // }
    }
    )
}