// Convertimos el querystring en un objeto
let querystring = window.location.search.substring(1);
let query = querystring ? JSON.parse('{"' + decodeURI(querystring).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : '';

// Rearmo querystring sin el parámetro de la página
querystring = '';
Object.keys(query).forEach(param => {
    if (param != 'page') {querystring = querystring + param + '=' + query[param] + '&'}
});

// Saco el último &
querystring = querystring.substring(0, querystring.length - 1);

// Obtengo los elementos de la paginación
let prevPage = document.querySelector('section.list div.pages a.prevPage');
let nextPage = document.querySelector('section.list div.pages a.nextPage');

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (prevPage.getAttribute("href") == 0) {
    prevPage.style.display = "none";
} else {
    
    if (querystring) {
        prevPage.setAttribute('href', '/sizes/panel?page=' + prevPage.getAttribute("href") + '&' + querystring);
    } else {
        prevPage.setAttribute('href', '/sizes/panel?page=' + prevPage.getAttribute("href"));
    }
    
}

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (nextPage.getAttribute('href') == 0) {
    nextPage.style.display = 'none';
} else {
    
    if (querystring) {
        nextPage.setAttribute('href', '/sizes/panel?page=' + nextPage.getAttribute("href") + '&' + querystring);
    } else {
        nextPage.setAttribute('href', '/sizes/panel?page=' + nextPage.getAttribute("href"));
    }

}