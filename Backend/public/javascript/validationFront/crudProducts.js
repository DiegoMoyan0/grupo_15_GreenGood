                            //CREATE NEW PRODUCT//

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
    }else if (Number(category.value) != 1 && Number(category.value) != 2){
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
            document.getElementById(`${field}-error`).style.opacity = 1;
        };
    };
};

    //5 - User intereactions with inputs

image.addEventListener('input', validateImage);
title.addEventListener('input', validateTitle);
description.addEventListener('input', validateDescription);
category.addEventListener('change', validateCategory);

firstNextBtnParent.addEventListener('click', e => {
    e.preventDefault();
    
    validateImage();
    validateTitle();
    validateDescription();
    validateCategory();
    
    if(Object.keys(errorMessages).length > 0){  
        firstNextBtn.disabled = true; 
    }else{
        firstNextBtn.disabled = false;
    };
});

//------------Second create modal-form validations--------------: //

    //1- HTML elements:
const subcategory = document.getElementById('subcategory-children');
const type = document.getElementById('type-children');
const price = document.getElementById('price-children');
const discount = document.getElementById('discount-children');
const secondNextBtn = document.getElementById('btn-next2');
const secondNextBtnParent = document.getElementById('btn-next2-parent');
secondNextBtn.disabled = true;

    //2- Validate functions for each input:

function validateSubcategory() {
    const subcategoriesIds = ["1", "2", "3", "4"];

    if(emptyField(subcategory.value)){
        subcategory.classList.add('not-valid');
        subcategory.classList.remove('is-valid');
        errorMessages.subcategory = "Debes elegir una sub-categoría";
    }else if (!subcategoriesIds.includes(subcategory.value)){
        errorMessages.subcategory = "Categoría inválida";
        subcategory.classList.add('not-valid');
    }else{
        subcategory.classList.add('is-valid');
        subcategory.classList.remove('not-valid');
        delete errorMessages.subcategory;
    };    
    
    displayErrors(); 
};

function validateType() {
    const typesIds= ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    if(emptyField(type.value)){
        type.classList.add('not-valid');
        type.classList.remove('is-valid');
        errorMessages.type = "Debes elegir un tipo";
    }else if (!typesIds.includes(type.value)){
        errorMessages.type = "Tipo inválido";
        type.classList.add('not-valid');
    }else{
        type.classList.add('is-valid');
        type.classList.remove('not-valid');
        delete errorMessages.type;
    };    
    
    displayErrors(); 
};

function validatePrice() {
    let value = Number(price.value);

    if(emptyField(price.value)){
        price.classList.add('not-valid');
        price.classList.remove('is-valid');
        errorMessages.price = "Debes indicar un precio";
    }else if ((value < 100 || value > 100000) || typeof(value) != "number"){
        errorMessages.price = "precio debe ser un número, mínimo de $100 y máximo de $100.000";
        price.classList.add('not-valid');
        price.classList.remove('is-valid');
    }else{
        price.classList.add('is-valid');
        price.classList.remove('not-valid');
        delete errorMessages.price;
    };    
    
    displayErrors(); 
};

function validateDiscount() {
    let valueD = Number(discount.value);

    if(emptyField(discount.value)){
        discount.classList.add('not-valid');
        discount.classList.remove('is-valid');
        errorMessages.discount = "Indica 0 si no tiene descuento";
    }else if ((valueD < 0 || valueD > 95) || typeof(valueD) != "number"){
        errorMessages.discount = "Porcentaje de descuento mínimo de 0% y máximo de 95%";
        discount.classList.add('not-valid');
        discount.classList.remove('is-valid');
    }else{
        discount.classList.add('is-valid');
        discount.classList.remove('not-valid');
        delete errorMessages.discount;
    };    
    
    displayErrors(); 
};

    //3 - User intereactions with inputs

subcategory.addEventListener('change', validateSubcategory);
type.addEventListener('change', validateType);
price.addEventListener('input', validatePrice);
discount.addEventListener('input', validateDiscount);

secondNextBtnParent.addEventListener('click', e => {
    e.preventDefault();
    
    validateSubcategory();
    validateType();
    validatePrice();
    validateDiscount();
    
    if(Object.keys(errorMessages).length > 0){
        secondNextBtn.disabled = true;
    }else{ 
        secondNextBtn.disabled = false;
    };
});

//------------Third create modal-form validations--------------: //

    //1- HTML elements:
const stock = document.getElementById('stock-children');
const info = document.getElementById('info-children');
const thirdNextBtn = document.getElementById('btn-next3');
const thirdNextBtnParent = document.getElementById('btn-next3-parent');
thirdNextBtn.disabled = true;

    //2- Validate functions for each input:

function validateStock() {
    let valueS = Number(stock.value);

    if(emptyField(stock.value)){
        stock.classList.add('not-valid');
        stock.classList.remove('is-valid');
        errorMessages.stock = "Debes indicar un stock inicial.";
    }else if ((valueS < 1 || valueS > 100000) || typeof(valueS) != "number"){
        errorMessages.stock = "Como mínimo debe ser 1 el stock.";
        stock.classList.add('not-valid');
        stock.classList.remove('is-valid');
    }else{
        stock.classList.add('is-valid');
        stock.classList.remove('not-valid');
        delete errorMessages.stock;
    };    
    
    displayErrors(); 
};

function validateInfo() {
    if(emptyField(info.value)){
        info.classList.add('not-valid');
        info.classList.remove('is-valid');
        errorMessages.info = "Debes redactar el detalle del producto";
    }else if(info.value.length < 40){
        info.classList.add('not-valid');
        errorMessages.info = "Mínimo 40 caracteres";
    }else{
        delete errorMessages.info;
        info.classList.add('is-valid');
        info.classList.remove('not-valid');
    };
    displayErrors();
};

    //3 - User intereactions with inputs

stock.addEventListener('input', validateStock);
info.addEventListener('input', validateInfo);

thirdNextBtnParent.addEventListener('click', e => {
    e.preventDefault();
    
    validateStock();
    validateInfo();
    
    if(Object.keys(errorMessages).length > 0){
        thirdNextBtn.disabled = true;
    }else{ 
        thirdNextBtn.disabled = false;
    };
});  

                                //UPDATE ONE PRODUCT//
                            
//-----------------------Edit dropdown-form validations--------------------------: //

        //1- Get all edit-forms:
const editFormsArray = Array.from(document.querySelectorAll('#edit-form'));

        //2- For each form, get the inputs:

for (let index = 0; index < editFormsArray.length; index++) {
    const editForm = editFormsArray[index];

    const imageEdit = editForm.querySelector('#image-edit');
    const titleEdit = editForm.querySelector('#title-edit');
    const title = editForm.querySelector('#title');
    const descriptionEdit = editForm.querySelector('#description-edit');
    const priceEdit = editForm.querySelector('#price-edit');
    const discountEdit = editForm.querySelector('#discount-edit');
    const stockEdit = editForm.querySelector('#stock-edit');
    const categoryEdit = editForm.querySelector('#category-edit');
    const subcategoryEdit = editForm.querySelector('#subcategory-edit');
    const typeEdit = editForm.querySelector('#type-edit');
    const infoEdit = editForm.querySelector('#info-edit');
    const editButton = editForm.querySelector('#edit-btn');
    
        //3- Errors declaration:
    let errorMessagesEdit = {}; 

        //4- Validate functions for each input:
    function validateImageEdit () {
        const acceptedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
        const selectedFile = imageEdit.files[0];

        if(selectedFile){
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                console.log(fileExtension);
                imageEdit.classList.add('not-valid');
                imageEdit.classList.remove('is-valid');
                errorMessagesEdit.imageEdit = `Extensiones válidas: ${acceptedExtensions.join(', ')}.`;
            }else{
                imageEdit.classList.add('is-valid');
                imageEdit.classList.remove('not-valid');
                delete errorMessagesEdit.imageEdit;
            };
        };
        displayErrorsE(); 
    };

    function validateTitleEdit() {
        if(emptyField(titleEdit.value)){
            titleEdit.classList.add('not-valid');
            titleEdit.classList.remove('is-valid');
            errorMessagesEdit.titleEdit = "El título no puede quedar vacío";
        }else if(titleEdit.value.length < 4){
            titleEdit.classList.add('not-valid');
            errorMessagesEdit.titleEdit = "Mínimo 4 caracteres para el título";
        }else{
            delete errorMessagesEdit.titleEdit;
            titleEdit.classList.add('is-valid');
            titleEdit.classList.remove('not-valid');
        };
        displayErrorsE();
    };

    function validateDescriptionEdit() {
        if(emptyField(descriptionEdit.value)){
            descriptionEdit.classList.add('not-valid');
            descriptionEdit.classList.remove('is-valid');
            errorMessagesEdit.descriptionEdit = "La descripción no puede quedar vacía";
        }else if(descriptionEdit.value.length < 20){
            descriptionEdit.classList.add('not-valid');
            errorMessagesEdit.descriptionEdit = "Mínimo 20 caracteres";
        }else{
            delete errorMessagesEdit.descriptionEdit;
            descriptionEdit.classList.add('is-valid');
            descriptionEdit.classList.remove('not-valid');
        };
        displayErrorsE();
    };

    function validateCategoryEdit() {

        if(emptyField(categoryEdit.value)){
            categoryEdit.classList.add('not-valid');
            categoryEdit.classList.remove('is-valid');
            errorMessagesEdit.categoryEdit = "Debes elegir una categoría";
        }else if (Number(categoryEdit.value) != 1 && Number(categoryEdit.value) != 2){
            errorMessagesEdit.categoryEdit = "Categoría inválida";
            categoryEdit.classList.add('not-valid');
        }else{
            categoryEdit.classList.add('is-valid');
            categoryEdit.classList.remove('not-valid');
            delete errorMessagesEdit.categoryEdit;
        };
        displayErrorsE();   
    };
    function validateSubcategoryEdit() {
        const subcategoriesIds = ["1", "2", "3", "4"];

        if(emptyField(subcategoryEdit.value)){
            subcategoryEdit.classList.add('not-valid');
            subcategoryEdit.classList.remove('is-valid');
            errorMessagesEdit.subcategoryEdit = "Debes elegir una sub-categoría";
        }else if (!subcategoriesIds.includes(subcategoryEdit.value)){
            errorMessagesEdit.subcategoryEdit = "Categoría inválida";
            subcategoryEdit.classList.add('not-valid');
        }else{
            subcategoryEdit.classList.add('is-valid');
            subcategoryEdit.classList.remove('not-valid');
            delete errorMessagesEdit.subcategoryEdit;
        };    
        
        displayErrorsE(); 
    };

    function validateTypeEdit() {
        const typesIds= ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

        if(emptyField(typeEdit.value)){
            typeEdit.classList.add('not-valid');
            typeEdit.classList.remove('is-valid');
            errorMessagesEdit.typeEdit = "Debes elegir un tipo";
        }else if (!typesIds.includes(typeEdit.value)){
            errorMessagesEdit.typeEdit = "Tipo inválido";
            typeEdit.classList.add('not-valid');
        }else{
            typeEdit.classList.add('is-valid');
            typeEdit.classList.remove('not-valid');
            delete errorMessagesEdit.typeEdit;
        };    
        
        displayErrorsE(); 
    };

    function validatePriceEdit() {
        let value = Number(priceEdit.value);

        if(emptyField(priceEdit.value)){
            priceEdit.classList.add('not-valid');
            priceEdit.classList.remove('is-valid');
            errorMessagesEdit.priceEdit = "Debes indicar un precio";
        }else if ((value < 100 || value > 100000) || typeof(value) != "number"){
            errorMessagesEdit.priceEdit = "precio debe ser un número, mínimo de $100 y máximo de $100.000";
            priceEdit.classList.add('not-valid');
            priceEdit.classList.remove('is-valid');
        }else{
            priceEdit.classList.add('is-valid');
            priceEdit.classList.remove('not-valid');
            delete errorMessagesEdit.priceEdit;
        };    
        
        displayErrorsE(); 
    };

    function validateDiscountEdit() {
        let valueD = Number(discountEdit.value);

        if(emptyField(discountEdit.value)){
            discountEdit.classList.add('not-valid');
            discountEdit.classList.remove('is-valid');
            errorMessagesEdit.discountEdit = "Indica 0 si no tiene descuento";
        }else if ((valueD < 0 || valueD > 95) || typeof(valueD) != "number"){
            errorMessagesEdit.discountEdit = "Porcentaje de descuento mínimo de 0% y máximo de 95%";
            discountEdit.classList.add('not-valid');
            discountEdit.classList.remove('is-valid');
        }else{
            discountEdit.classList.add('is-valid');
            discountEdit.classList.remove('not-valid');
            delete errorMessagesEdit.discountEdit;
        };    
        
        displayErrorsE(); 
    };
    function validateStockEdit() {
        let valueS = Number(stockEdit.value);

        if(emptyField(stockEdit.value)){
            stockEdit.classList.add('not-valid');
            stockEdit.classList.remove('is-valid');
            errorMessagesEdit.stockEdit = "Debes indicar un stock inicial.";
        }else if ((valueS < 1 || valueS > 100000) || typeof(valueS) != "number"){
            errorMessagesEdit.stockEdit = "Como mínimo debe ser 1 el stock.";
            stockEdit.classList.add('not-valid');
            stockEdit.classList.remove('is-valid');
        }else{
            stockEdit.classList.add('is-valid');
            stockEdit.classList.remove('not-valid');
            delete errorMessagesEdit.stockEdit;
        };    
        
        displayErrorsE(); 
    };

    function validateInfoEdit() {
        if(emptyField(infoEdit.value)){
            infoEdit.classList.add('not-valid');
            infoEdit.classList.remove('is-valid');
            errorMessagesEdit.infoEdit = "Debes redactar el detalle del producto";
        }else if(infoEdit.value.length < 40){
            infoEdit.classList.add('not-valid');
            errorMessagesEdit.infoEdit = "Mínimo 40 caracteres";
        }else{
            delete errorMessagesEdit.infoEdit;
            infoEdit.classList.add('is-valid');
            infoEdit.classList.remove('not-valid');
        };
        displayErrorsE();
    };
            
            // 4- General validation functions:

    function displayErrorsE() {
        // To clear prev errors
        const errorElements = editForm.querySelectorAll(".errorE");
        const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>`;
        for (const errorElement of errorElements) {
        errorElement.textContent = "";
        };
        // To show spans with errors
        for (const field in errorMessagesEdit) {
            if (errorMessagesEdit.hasOwnProperty(field)) {
                editForm.querySelector(`#${field}-error`).innerHTML = errorMessagesEdit[field] + errorIcon ;
                document.getElementById(`${field}-error`).style.opacity = 1;
            };
        };
        
    };

            //5 - User intereactions with inputs

    imageEdit.addEventListener('input', validateImageEdit);
    titleEdit.addEventListener('input', validateTitleEdit);
    descriptionEdit.addEventListener('input', validateDescriptionEdit);
    categoryEdit.addEventListener('change', validateCategoryEdit);
    subcategoryEdit.addEventListener('change', validateSubcategoryEdit);
    typeEdit.addEventListener('change', validateTypeEdit);
    priceEdit.addEventListener('input', validatePriceEdit);
    discountEdit.addEventListener('input', validateDiscountEdit);
    stockEdit.addEventListener('input', validateStockEdit);
    infoEdit.addEventListener('input', validateInfoEdit);
        
    editForm.addEventListener('submit', e => {
        e.preventDefault();
        validateImageEdit();
        validateTitleEdit();
        validateDescriptionEdit();
        validateCategoryEdit();
        validateSubcategoryEdit();
        validateTypeEdit();
        validatePriceEdit();
        validateDiscountEdit();
        validateStockEdit();
        validateInfoEdit();
        
        if(!Object.keys(errorMessagesEdit).length > 0){
            editForm.submit()
        };
    });
};
