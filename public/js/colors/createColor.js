// Elementos para validación del formulario
let form = document.querySelector('section.create form.new');
let name = document.querySelector('section.create input#name');
let error_name = document.querySelector('section.create p#name');
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

    // Prevenir default y mostrar los errores
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
