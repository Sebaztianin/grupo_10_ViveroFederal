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