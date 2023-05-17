// Trabajamos con la query
let query = new URLSearchParams(location.search);

// Si existe warning, alertamos al usuario con el mensaje correspondiente
if (query.has('warning') && query.get('warning') == 'notAdmin') {
    alert('Debe estar logeado como administrador para realizar esta acción.');
}

if (query.has('warning') && query.get('warning') == 'notLogged') {
    alert('Debe estar logeado para realizar esta acción.');
}

if (query.has('warning') && query.get('warning') == 'notUser') {
    alert('No puede realizar esta acción en otro perfil.');
}

// Elementos para validación del formulario
let editForm = document.querySelector('section.edit-user form.edit-user');
let first_name_edit = document.querySelector('section.edit-user input#first_name');
let error_first_name_edit = document.querySelector('section.edit-user p#first_name');
let last_name_edit = document.querySelector('section.edit-user input#last_name');
let error_last_name_edit = document.querySelector('section.edit-user p#last_name');
let image_edit = document.querySelector('section.edit-user input#image');
let error_image_edit = document.querySelector('section.edit-user p#image');
let input_info_image_edit = document.querySelector('section.edit-user p.input-info');
let editErrors = document.querySelector('section.edit-user div.errors');

// Validaciones al enviar el formulario
editForm.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    editErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y longitud
    if (first_name_edit.value == '') {
        errors.push('El nombre no puede estar vacío.');
    } else if (first_name_edit.value.length < 3) {
        errors.push('El nombre debe contener más de 2 caracteres.');
    }

    // Validación para campo vacío y longitud
    if (last_name_edit.value == '') {
        errors.push('El apellido no puede estar vacío.');
    } else if (last_name_edit.value.length < 3) {
        errors.push('El apellido debe contener más de 2 caracteres.');
    }
    
    // Obtenemos la extensión del archivo de imagen
    let file = image_edit.value.split('.');
    let extension = file[file.length - 1];

    // Validamos la imagen
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
        editErrors.style.display = 'flex';
        errors.forEach(error => {
            editErrors.innerHTML += '<p class="error"><i class="fas fa-exclamation-circle"></i> ' + error + '</p>'
        });

    }

});


// Validaciones en tiempo real
first_name_edit.addEventListener('blur', function () {

    if (this.value == '') {
        first_name_edit.style.border = '2px solid #a84d36';
        error_first_name_edit.innerText = 'El nombre no puede estar vacío.';
    } else if (this.value.length < 3) {
        first_name_edit.style.border = '2px solid #a84d36';
        error_first_name_edit.innerText = 'El nombre debe contener más de 2 caracteres.';
    } else {
        first_name_edit.style.border = '';
        error_first_name_edit.innerText = '';
    }

});

last_name_edit.addEventListener('blur', function () {

    if (this.value == '') {
        last_name_edit.style.border = '2px solid #a84d36';
        error_last_name_edit.innerText = 'El apellido no puede estar vacío.';
    } else if (this.value.length < 3) {
        last_name_edit.style.border = '2px solid #a84d36';
        error_last_name_edit.innerText = 'El apellido debe contener más de 2 caracteres.';
    } else {
        last_name_edit.style.border = '';
        error_last_name_edit.innerText = '';
    }

});

image_edit.addEventListener('change', function () {

    // Obtenemos la extensión del archivo
    let file = this.value.split('.');
    let extension = file[file.length - 1];
    file = this.value.split('\\');
    let fileName = file[file.length - 1];
    input_info_image_edit.innerText = file != '' ? fileName : 'Ningún archivo seleccionado.' ;

    // Validamos
    if (extension != 'jpg' &&
        extension != 'jpeg' &&
        extension != 'png' &&
        extension != 'gif' &&
        extension != '') {
            image_edit.style.border = '2px solid #a84d36';
        error_image_edit.innerText = 'Extensiones aceptadas: jpg, jpeg, png o gif.';
    } else {
        image_edit.style.border = '';
        error_image_edit.innerText = '';
    }

});