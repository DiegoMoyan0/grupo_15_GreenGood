window.onload = function () {

    //------------Fisrt create modal-form validations--------------: //
    
    //1- HTML elements:
    const image = document.getElementById('image-children');
    const title = document.getElementById('title-children');
    const description = document.getElementById('description-children');
    const category = document.getElementById('category-children');
    const firstNextBtn = document.getElementById('btn-next1');
    const firstNextBtnParent = document.getElementById('btn-next1-parent');

    //2- First next button disabled and errors declaration:
    firstNextBtn.disabled = true;
    let errorMessages = {};

    //3- Validate functions for each input:
    function validateImage () {
        const acceptedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
        const selectedFile = image.files[0];

        if(selectedFile){
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                console.log(fileExtension);
                image.classList.add('not-valid');
                image.classList.remove('is-valid');
                errorMessages.image = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;
            }else{
                image.classList.add('is-valid');
                image.classList.remove('not-valid');
                delete errorMessages.image;
            };
        };
        displayErrors(); 
    };

    function validateTitle() {
        if(emptyField(title.value)){
            title.classList.add('not-valid');
            title.classList.remove('is-valid');
            errorMessages.title = "El título no puede quedar vacío";
        }else if(title.value.length < 4){
            title.classList.add('not-valid');
            errorMessages.title = "Mínimo 4 caracteres para el título";
        }else{
            delete errorMessages.title;
            title.classList.add('is-valid');
            title.classList.remove('not-valid');
        };
        displayErrors();
    };

    function validateDescription() {
        if(emptyField(description.value)){
            description.classList.add('not-valid');
            description.classList.remove('is-valid');
            errorMessages.description = "La descripción no puede quedar vacía";
        }else if(description.value.length < 20){
            description.classList.add('not-valid');
            errorMessages.description = "Mínimo 20 caracteres";
        }else{
            delete errorMessages.description;
            description.classList.add('is-valid');
            description.classList.remove('not-valid');
        };
        displayErrors();
    };

    function validateCategory() {

        if(emptyField(category.value)){
            category.classList.add('not-valid');
            category.classList.remove('is-valid');
            errorMessages.category = "Debes elegir una categoría";
        }else if (category.value != "Cultivo" && category.value != "Medicinal"){
            errorMessages.category = "Categoría inválida";
            category.classList.add('not-valid');
        }else{
            category.classList.add('is-valid');
            category.classList.remove('not-valid');
            delete errorMessages.category;
        };
        displayErrors();   
    };

    // 4- General validation functions:
    function emptyField (inputValue) {  
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
            document.getElementById(`${field}-error`).innerHTML = errorMessages[field] + errorIcon ;
            };
        };
    };
 
    
    //5 - User intereactions with inputs

    image.addEventListener('input', validateImage);
    title.addEventListener('input', validateTitle);
    description.addEventListener('blur', validateDescription);
    category.addEventListener('input', validateCategory);

    firstNextBtnParent.addEventListener('click', e => {
        validateImage(image);
        validateTitle(title);
        validateDescription(description);
        validateCategory(category);
        console.log("dentro");
        
        if(Object.keys(errorMessages).length > 0){
            firstNextBtn.disabled = false; // To pass to the 2d step
        };
    });
};