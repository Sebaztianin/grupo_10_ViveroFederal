// Trabajamos con la query
let query = new URLSearchParams(location.search);

// Obtengo los elementos de la paginación
let prevPage = document.querySelector('section.profile div.pages a.prevPage');
let nextPage = document.querySelector('section.profile div.pages a.nextPage');

// Saco el atributo page del query
query.delete('page');

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (prevPage.getAttribute("href") == 0) {
    prevPage.style.display = "none";
} else {

    // Agrego al href lo que sigue
    query.append('page', prevPage.getAttribute('href'));
    prevPage.setAttribute('href', '/users/panel?' + query.toString());

    // Saco de query para operar con el que sigue
    query.delete('page');

} 

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (nextPage.getAttribute('href') == 0) {
    nextPage.style.display = 'none';
} else {

    // Agrego al href lo que sigue
    query.append('page', nextPage.getAttribute('href'));
    nextPage.setAttribute('href', '/users/panel?' + query.toString());

    // Saco de query para operar con el que sigue
    query.delete('page');

} 