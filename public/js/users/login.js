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


// Elementos para validación del login
let loginForm = document.querySelector('section.login form.login');
let email_login = document.querySelector('section.login input#emailLogin');
let error_email_login = document.querySelector('section.login p#emailLogin');
let password_login = document.querySelector('section.login input#passwordLogin');
let error_password_login = document.querySelector('section.login p#passwordLogin');
let loginErrors = document.querySelector('section.login div.errors');

// Validaciones al enviar el formulario
loginForm.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    loginErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y formato
    if (email_login.value == '') {
        errors.push('El email no puede estar vacío.');
    } else if (!validator.isEmail(email_login.value)) {
        errors.push('El email debe tener un formato válido.');
    }

    // Validación para campo vacío y formato
    if (password_login.value == '') {
        errors.push('La contraseña no puede estar vacía.');
    }

    // Prevenir default y mostrar errores
    if (errors.length > 0) {

        // Evito que se mande el formulario
        event.preventDefault();

        // Muestro errores del front
        loginErrors.style.display = 'flex';
        errors.forEach(error => {
            loginErrors.innerHTML += '<p class="error"><i class="fas fa-exclamation-circle"></i> ' + error + '</p>'
        });

    }

});

email_login.addEventListener('blur', function () {

    if (this.value == '') {
        email_login.style.border = '2px solid #a84d36';
        error_email_login.innerText = 'El email no puede estar vacío.';
    } else if (!validator.isEmail(this.value)) {
        email_login.style.border = '2px solid #a84d36';
        error_email_login.innerText = 'El email debe tener un formato válido.';
    } else {
        email_login.style.border = '';
        error_email_login.innerText = '';
    }

});

password_login.addEventListener('blur', function () {

    if (this.value == '') {
        password_login.style.border = '2px solid #a84d36';
        error_password_login.innerText = 'La contraseña no puede estar vacía.';
    } else {
        password_login.style.border = '';
        error_password_login.innerText = '';
    }

});

// Escondemos errores al clickearlos
email_login.addEventListener('click', function () {

    error_email_login.innerText = '';
    this.style.border = '';

});

password_login.addEventListener('click', function () {

    error_password_login.innerText = '';
    this.style.border = '';

});


// Elementos para validación del registro
let registerForm = document.querySelector('section.register form.register');
let first_name_register = document.querySelector('section.register input#first_name');
let error_first_name_register = document.querySelector('section.register p#first_name');
let last_name_register = document.querySelector('section.register input#last_name');
let error_last_name_register = document.querySelector('section.register p#last_name');
let email_register = document.querySelector('section.register input#email');
let error_email_register = document.querySelector('section.register p#email');
let password_register = document.querySelector('section.register input#password');
let error_password_register = document.querySelector('section.register p#password');
let passwordConfirmation_register = document.querySelector('section.register input#passwordConfirmation');
let error_passwordConfirmation_register = document.querySelector('section.register p#passwordConfirmation');
let avatar_register = document.querySelector('section.register input#avatar');
let error_avatar_register = document.querySelector('section.register p#avatar');
let input_info_avatar_register = document.querySelector('section.register p.input-info');
let registerErrors = document.querySelector('section.register div.errors');

// Validaciones al enviar el formulario
registerForm.addEventListener('submit', event => {

    // Limpiamos errores anteriores
    registerErrors.innerHTML = '';

    // Creamos array de errores
    let errors = [];

    // Validación para campo vacío y longitud
    if (first_name_register.value == '') {
        errors.push('El nombre no puede estar vacío.');
    } else if (first_name_register.value.length < 3) {
        errors.push('El nombre debe contener más de 2 caracteres.');
    }

    // Validación para campo vacío y longitud
    if (last_name_register.value == '') {
        errors.push('El apellido no puede estar vacío.');
    } else if (last_name_register.value.length < 3) {
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
    if (passwordConfirmation_register.value == '') {
        errors.push('La confirmación de la contraseña no puede estar vacía.');
    } else if (password.value != passwordConfirmation_register.value) {
        errors.push('Las contraseñas no coinciden.')
    }

    // Obtenemos la extensión del archivo de imagen
    let file = avatar_register.value.split('.');
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
        registerErrors.style.display = 'flex';
        errors.forEach(error => {
            registerErrors.innerHTML += '<p class="error"><i class="fas fa-exclamation-circle"></i> ' + error + '</p>'
        });

    }

});

// Validaciones en tiempo real
first_name_register.addEventListener('blur', function () {

    if (this.value == '') {
        first_name_register.style.border = '2px solid #a84d36';
        error_first_name_register.innerText = 'El nombre no puede estar vacío.';
    } else if (this.value.length < 3) {
        first_name_register.style.border = '2px solid #a84d36';
        error_first_name_register.innerText = 'El nombre debe contener más de 2 caracteres.';
    } else {
        first_name_register.style.border = '';
        error_first_name_register.innerText = '';
    }

});

last_name_register.addEventListener('blur', function () {

    if (this.value == '') {
        last_name_register.style.border = '2px solid #a84d36';
        error_last_name_register.innerText = 'El apellido no puede estar vacío.';
    } else if (this.value.length < 3) {
        last_name_register.style.border = '2px solid #a84d36';
        error_last_name_register.innerText = 'El apellido debe contener más de 2 caracteres.';
    } else {
        last_name_register.style.border = '';
        error_last_name_register.innerText = '';
    }

});

email_register.addEventListener('blur', function () {

    if (this.value == '') {
        email_register.style.border = '2px solid #a84d36';
        error_email_register.innerText = 'El email no puede estar vacío.';
    } else if (!validator.isEmail(this.value)) {
        email_register.style.border = '2px solid #a84d36';
        error_email_register.innerText = 'El email debe tener un formato válido.';
    } else {
        email_register.style.border = '';
        error_email_register.innerText = '';
    }

});

password_register.addEventListener('blur', function () {

    if (this.value == '') {
        password_register.style.border = '2px solid #a84d36';
        error_password_register.innerText = 'La contraseña no puede estar vacía.';
    } else if (!validator.isStrongPassword(this.value)) {
        password_register.style.border = '2px solid #a84d36';
        error_password_register.innerText = 'Formato incorrecto.';
    } else {
        password_register.style.border = '';
        error_password_register.innerText = '';
    }

});

passwordConfirmation_register.addEventListener('blur', function () {

    if (this.value == '') {
        passwordConfirmation_register.style.border = '2px solid #a84d36';
        error_passwordConfirmation_register.innerText = 'La confirmación de la contraseña no puede estar vacía.';
    } else if (this.value != password.value) {
        passwordConfirmation_register.style.border = '2px solid #a84d36';
        error_passwordConfirmation_register.innerText = 'Las contraseñas no coinciden.';
    } else {
        passwordConfirmation_register.style.border = '';
        error_passwordConfirmation_register.innerText = '';
    }

});

avatar_register.addEventListener('change', function () {

    // Obtenemos la extensión del archivo
    let file = this.value.split('.');
    let extension = file[file.length - 1];
    file = this.value.split('\\');
    let fileName = file[file.length - 1];
    input_info_avatar_register.innerText = file != '' ? fileName : 'Ningún archivo seleccionado.' ;

    // Validamos
    if (extension != 'jpg' &&
        extension != 'jpeg' &&
        extension != 'png' &&
        extension != 'gif' &&
        extension != '') {
        avatar_register.style.border = '2px solid #a84d36';
        error_avatar_register.innerText = 'Extensiones aceptadas: jpg, jpeg, png o gif.';
    } else {
        avatar_register.style.border = '';
        error_avatar_register.innerText = '';
    }

});

// Escondemos botones al clickearlos
first_name_register.addEventListener('click', function () {

    error_first_name_register.innerText = '';
    this.style.border = '';

});

last_name_register.addEventListener('click', function () {

    error_last_name_register.innerText = '';
    this.style.border = '';

});

email_register.addEventListener('click', function () {

    error_email_register.innerText = '';
    this.style.border = '';

});

password_register.addEventListener('click', function () {

    error_password_register.innerText = '';
    this.style.border = '';

});

passwordConfirmation_register.addEventListener('click', function () {

    error_passwordConfirmation_register.innerText = '';
    this.style.border = '';

});

