// Convertimos el querystring en un objeto
let querystring = window.location.search.substring(1);
let query = querystring ? JSON.parse('{"' + decodeURI(querystring).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : '';

// Si existe warning, alertamos al usuario con el mensaje correspondiente
if (query.warning && query.warning == 'notAdmin') {
    alert('Debe estar logeado como administrador para realizar esta acción.');
}

if (query.warning && query.warning == 'notLogged') {
    alert('Debe estar logeado para realizar esta acción.');
}

if (query.warning && query.warning == 'notUser') {
    alert('No puede realizar esta acción en otro perfil.');
}