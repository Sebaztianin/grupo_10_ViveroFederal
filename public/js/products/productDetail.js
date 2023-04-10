// Recuperamos el botón
let deleteForm = document.querySelector('form.edit');

// Reemplazamos acción al clickear
deleteForm.addEventListener('submit', function (e) {

    if (!confirm('¿Desea habilitar/deshabilitar este producto?')) {
        e.preventDefault();
    }

});

console.log(deleteForm);