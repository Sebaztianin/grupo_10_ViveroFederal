// Elementos para validación del formulario
let form = document.querySelector('section.create form.new');
let name = document.querySelector('section.create input#name');
let error_name = document.querySelector('section.create p#name');
let image = document.querySelector('section.create input#image');
let error_image = document.querySelector('section.create p#image');
let formErrors = document.querySelector('section.create div.errors');

// Validaciones al enviar el formulario
form.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    formErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y longitud
    if (name.value == '') {
        errors.push('El nombre no puede estar vacío.');
    } else if (name.value.length < 2) {
        errors.push('El nombre debe contener, al menos, 2 caracteres.');
    }

    // Obtenemos la extensión del archivo de imagen
    let file = image.value.split('.');
    let extension = file[file.length - 1];

    // Validamos que haya una imagen seleccionada
    if (!extension) {
        errors.push('Se requiere una imagen.');
    }

    // Validamos la imagen seleccionada
    if (extension != 'jpg' &&
        extension != 'jpeg' &&
        extension != 'png' &&
        extension != 'gif' &&
        extension != '') {
        errors.push('Extensiones aceptadas: jpg, jpeg, png o gif.');
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
    } else if (this.value.length < 2) {
        name.style.border = '2px solid #a84d36';
        error_name.innerText = 'El nombre debe contener, al menos, 2 caracteres.';
    } else {
        name.style.border = '';
        error_name.innerText = '';
    }

});

image.addEventListener('change', function () {

    // Obtenemos la extensión del archivo
    let file = this.value.split('.');
    let extension = file[file.length - 1];

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