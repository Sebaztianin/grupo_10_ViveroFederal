
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

// Obtengo los elementos a de los filtros
let categoriesItems = document.querySelectorAll('div.filters div.categories ul li a');
let colorsItems = document.querySelectorAll('div.filters div.colors ul li a');
let sizesItems = document.querySelectorAll('div.filters div.sizes ul li a');
let clean = document.querySelector('div.filters a.clean');

// Trabajo con las categorías
if (!query.category) { // No hay un parámetro seleccionado

    categoriesItems.forEach(category => {

        // Agrego al href lo que sigue
        if (querystring) {
            category.setAttribute('href', '/products?category=' + category.getAttribute('href') + '&' + querystring);
        } else {
            category.setAttribute('href', '/products?category=' + category.getAttribute('href'));
        }

    });

} else { // Hay un parámetro seleccionado

    categoriesItems.forEach(category => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.category == category.getAttribute('href')) {
            category.style.fontWeight = 'bold';
            category.setAttribute('href', '#');
        } else {
            category.style.display = 'none';
        }

    });

}

// Trabajo con los colores
if (!query.color) { // No hay un parámetro seleccionado

    colorsItems.forEach(color => {

        // Agrego al href lo que sigue
        if (querystring) {
            color.setAttribute('href', '/products?color=' + color.getAttribute('href') + '&' + querystring);
        } else {
            color.setAttribute('href', '/products?color=' + color.getAttribute('href'));
        }

    });

} else { // Hay un parámetro seleccionado

    colorsItems.forEach(color => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.color == color.getAttribute('href')) {
            color.style.fontWeight = 'bold';
            color.setAttribute('href', '#');
        } else {
            color.style.display = 'none';
        }

    });

}

// Trabajo con los tamaños
if (!query.size) { // No hay un parámetro seleccionado

    sizesItems.forEach(size => {

        // Agrego al href lo que sigue
        if (querystring) {
            size.setAttribute('href', '/products?size=' + size.getAttribute('href') + '&' + querystring);
        } else {
            size.setAttribute('href', '/products?size=' + size.getAttribute('href'));
        }

    });

} else { // Hay un parámetro seleccionado

    sizesItems.forEach(size => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.size == size.getAttribute('href')) {
            size.style.fontWeight = 'bold';
            size.setAttribute('href', '#');
        } else {
            size.style.display = 'none';
        }

    });

}

// Hago que el botón limpiar filtros mantenga lo tipeado por el usuario
if (query.search) {
    clean.setAttribute('href', '/products?search=' + query.search)
}

// Obtengo los elementos de la paginación
let prevPage = document.querySelector('div.products div.pages a.prevPage');
let nextPage = document.querySelector('div.products div.pages a.nextPage');

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (prevPage.getAttribute("href") == 0) {
    prevPage.style.display = "none";
} else {
    
    if (querystring) {
        prevPage.setAttribute('href', '/products?page=' + prevPage.getAttribute("href") + '&' + querystring);
    } else {
        prevPage.setAttribute('href', '/products?page=' + prevPage.getAttribute("href"));
    }
    
}

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (nextPage.getAttribute('href') == 0) {
    nextPage.style.display = 'none';
} else {
    
    if (querystring) {
        nextPage.setAttribute('href', '/products?page=' + nextPage.getAttribute("href") + '&' + querystring);
    } else {
        nextPage.setAttribute('href', '/products?page=' + nextPage.getAttribute("href"));
    }

}