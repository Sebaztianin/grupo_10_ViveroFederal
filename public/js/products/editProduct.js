// Elementos para validación del formulario
let form = document.querySelector('section.create-product form.new-product');
let name = document.querySelector('section.create-product input#name');
let error_name = document.querySelector('section.create-product p#name');
let price = document.querySelector('section.create-product input#price');
let error_price = document.querySelector('section.create-product p#price');
let discount = document.querySelector('section.create-product input#discount');
let error_discount = document.querySelector('section.create-product p#discount');
let image = document.querySelector('section.create-product input#image');
let error_image = document.querySelector('section.create-product p#image');
let input_info_image = document.querySelector('section.create-product p.input-info');
let category_id = document.querySelector('section.create-product select#category_id');
let error_category_id = document.querySelector('section.create-product p#category_id');
let description = document.querySelector('section.create-product textarea#description');
let error_description = document.querySelector('section.create-product p#description');
let formErrors = document.querySelector('section.create-product div.errors');

// Validaciones al enviar el formulario
form.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    formErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y longitud
    if (name.value == '') {
        errors.push('El nombre no puede estar vacío.');
    } else if (name.value.length < 5) {
        errors.push('El nombre debe contener, al menos, 5 caracteres.');
    }

    // Validación para campo vacío y valores
    if (price.value == '') {
        errors.push('El precio no puede estar vacío.');
    } else if (!validator.isFloat(price.value, { gt: 0 })) {
        errors.push('El precio debe ser un número positivo.');
    }

    // Validación para campo vacío y valores
    if (discount.value == '') {
        errors.push('El descuento no puede estar vacío.');
    } else if (!validator.isFloat(discount.value, { ge: 0, lt: 100 })) {
        errors.push('El descuento debe ser un número entre 0 y 100.');
    }

    // Obtenemos la extensión del archivo de imagen
    let file = image.value.split('.');
    let extension = file[file.length - 1];

    // Validamos la imagen seleccionada
    if (extension != 'jpg' &&
        extension != 'jpeg' &&
        extension != 'png' &&
        extension != 'gif' &&
        extension != '') {
        errors.push('Extensiones aceptadas: jpg, jpeg, png o gif.');
    }

    // Validación para campo vacío
    if (category_id.value == '') {
        errors.push('Debe seleccionar una categoría.');
    } 

    // Validación para campo vacío y longitud
    if (description.value == '') {
        errors.push('La descripción no puede estar vacía.');
    } else if (description.value.length < 20) {
        errors.push('La descripción debe contener, al menos, 20 caracteres.');
    }

    // Prevenir default y mostrar errores
    if (errors.length > 0) {

        // Evito que se mande el formulario
        event.preventDefault();

        // Muestro errores del front
        formErrors.style.display = 'flex';
        errors.forEach(error => {
            formErrors.innerHTML += '<p class="error"><i class="fas fa-exclamation-circle"></i> ' + error + '</p>'
        });

    }

});

// Validaciones en tiempo real
name.addEventListener('blur', function () {

    if (this.value == '') {
        name.style.border = '2px solid #a84d36';
        error_name.innerText = 'El nombre no puede estar vacío.';
    } else if (this.value.length < 5) {
        name.style.border = '2px solid #a84d36';
        error_name.innerText = 'El nombre debe contener, al menos, 5 caracteres.';
    } else {
        name.style.border = '';
        error_name.innerText = '';
    }

});

price.addEventListener('blur', function () {

    if (this.value == '') {
        price.style.border = '2px solid #a84d36';
        error_price.innerText = 'El precio no puede estar vacío.';
    } else if (!validator.isFloat(price.value, { gt: 0 })) {
        price.style.border = '2px solid #a84d36';
        error_price.innerText = 'El precio debe ser un número positivo.';
    } else {
        price.style.border = '';
        error_price.innerText = '';
    }

});

discount.addEventListener('blur', function () {

    if (this.value == '') {
        discount.style.border = '2px solid #a84d36';
        error_discount.innerText = 'El descuento no puede estar vacío.';
    } else if (!validator.isFloat(discount.value, { ge: 0, lt: 100 })) {
        discount.style.border = '2px solid #a84d36';
        error_discount.innerText = 'El descuento debe ser un número entre 0 y 100.';
    } else {
        discount.style.border = '';
        error_discount.innerText = '';
    }

});

image.addEventListener('change', function () {

    // Obtenemos la extensión del archivo
    let file = this.value.split('.');
    let extension = file[file.length - 1];
    file = this.value.split('\\');
    let fileName = file[file.length - 1];
    input_info_image.innerText = file != '' ? fileName : 'Ningún archivo seleccionado.' ;

    // Validamos
    if (extension != 'jpg' &&
        extension != 'jpeg' &&
        extension != 'png' &&
        extension != 'gif' &&
        extension != '') {
        image.style.border = '2px solid #a84d36';
        error_image.innerText = 'Extensiones aceptadas: jpg, jpeg, png o gif.';
    } else {
        image.style.border = '';
        error_image.innerText = '';
    }

});

category_id.addEventListener('blur', function () {

    if (this.value == '') {
        category_id.style.border = '2px solid #a84d36';
        error_category_id.innerText = 'Debe seleccionar una categoría.';
    } else {
        category_id.style.border = '';
        error_category_id.innerText = '';
    }

});

description.addEventListener('blur', function () {

    if (this.value == '') {
        description.style.border = '2px solid #a84d36';
        error_description.innerText = 'La descripción no puede estar vacía.';
    } else if (this.value.length < 20) {
        description.style.border = '2px solid #a84d36';
        error_description.innerText = 'La descripción debe contener, al menos, 20 caracteres.';
    } else {
        description.style.border = '';
        error_description.innerText = '';
    }

});
