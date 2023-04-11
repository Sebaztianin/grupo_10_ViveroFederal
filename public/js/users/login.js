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


// Elementos para validación del registro
let registerForm = document.querySelector('section.register form.register');
let first_name = document.querySelector('section.register input#first_name');
let error_first_name = document.querySelector('section.register p#first_name');
let last_name = document.querySelector('section.register input#last_name');
let error_last_name = document.querySelector('section.register p#last_name');
let email = document.querySelector('section.register input#email');
let error_email = document.querySelector('section.register p#email');
let password = document.querySelector('section.register input#password');
let error_password = document.querySelector('section.register p#password');
let passwordConfirmation = document.querySelector('section.register input#passwordConfirmation');
let error_passwordConfirmation = document.querySelector('section.register p#passwordConfirmation');
let registerErrors = document.querySelector('section.register div.errors');

// Validaciones al enviar el formulario
registerForm.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    registerErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y longitud
    if (first_name.value == '') {
        errors.push('El nombre no puede estar vacío.');
    } else if (first_name.value.length < 3) {
        errors.push('El nombre debe contener más de 2 caracteres.');
    }

    // Validación para campo vacío y longitud
    if (last_name.value == '') {
        errors.push('El apellido no puede estar vacío.');
    } else if (last_name.value.length < 3) {
        errors.push('El apellido debe contener más de 2 caracteres.');
    }

    // Validación para campo vacío y formato
    if (email.value == '') {
        errors.push('El email no puede estar vacío.');
    } else if (!validator.isEmail(email.value)) {
        errors.push('El email debe tener un formato válido.');
    }

    // Validación para campo vacío y formato
    if (password.value == '') {
        errors.push('La contraseña no puede estar vacía.');
    } else if (!validator.isStrongPassword(password.value)) {
        errors.push('La contraseña debe contener por lo menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.');
    }

    // Validación para campo vacío y coincidencia
    if (passwordConfirmation.value == '') {
        errors.push('La confirmación de la contraseña no puede estar vacía.');
    } else if (password.value != passwordConfirmation.value) {
        errors.push('Las contraseñas no coinciden.')
    }

    // Prevenir default y mostrar errores
    if (errors.length > 0) {

        // Evito que se mande el formulario
        event.preventDefault();

        // Muestro errores del front
        registerErrors.style.display = 'flex';
        errors.forEach(error => {
            registerErrors.innerHTML += '<p class="error"><i class="fas fa-exclamation-circle"></i> ' + error + '</p>'
        });

    }

});

// Validaciones en tiempo real
first_name.addEventListener('blur', function () {

    if (this.value == '') {
        first_name.style.border = '2px solid #a84d36';
        error_first_name.innerText = 'El nombre no puede estar vacío.';
    } else if (this.value.length < 3) {
        first_name.style.border = '2px solid #a84d36';
        error_first_name.innerText = 'El nombre debe contener más de 2 caracteres.';
    } else {
        first_name.style.border = '';
        error_first_name.innerText = '';
    }

});

last_name.addEventListener('blur', function () {

    if (this.value == '') {
        last_name.style.border = '2px solid #a84d36';
        error_last_name.innerText = 'El apellido no puede estar vacío.';
    } else if (this.value.length < 3) {
        last_name.style.border = '2px solid #a84d36';
        error_last_name.innerText = 'El apellido debe contener más de 2 caracteres.';
    } else {
        last_name.style.border = '';
        error_last_name.innerText = '';
    }

});

email.addEventListener('blur', function () {

    if (this.value == '') {
        email.style.border = '2px solid #a84d36';
        error_email.innerText = 'El email no puede estar vacío.';
    } else if (!validator.isEmail(this.value)) {
        email.style.border = '2px solid #a84d36';
        error_email.innerText = 'El email debe tener un formato válido.';
    } else {
        email.style.border = '';
        error_email.innerText = '';
    }

});

password.addEventListener('blur', function () {

    if (this.value == '') {
        password.style.border = '2px solid #a84d36';
        error_password.innerText = 'La contraseña no puede estar vacía.';
    } else if (!validator.isStrongPassword(this.value)) {
        password.style.border = '2px solid #a84d36';
        error_password.innerText = 'La contraseña debe contener por lo menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.';
    } else {
        password.style.border = '';
        error_password.innerText = '';
    }

});

passwordConfirmation.addEventListener('blur', function () {

    if (this.value == '') {
        passwordConfirmation.style.border = '2px solid #a84d36';
        error_passwordConfirmation.innerText = 'La confirmación de la contraseña no puede estar vacía.';
    } else if (this.value != password.value) {
        passwordConfirmation.style.border = '2px solid #a84d36';
        error_passwordConfirmation.innerText = 'Las contraseñas no coinciden.';
    } else {
        passwordConfirmation.style.border = '';
        error_passwordConfirmation.innerText = '';
    }

});
