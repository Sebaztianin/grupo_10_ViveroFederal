// Trabajamos con la query
let query = new URLSearchParams(location.search);

// Obtengo los elementos a de los filtros
let categoriesItems = document.querySelectorAll('div.filters div.categories ul li a');
let colorsItems = document.querySelectorAll('div.filters div.colors ul li a');
let sizesItems = document.querySelectorAll('div.filters div.sizes ul li a');
let clean = document.querySelector('div.filters a.clean');

// Trabajo con las categorías
if (!query.has('category')) { // No hay un parámetro seleccionado

    categoriesItems.forEach(category => {

        // Agrego al href lo que sigue
        query.append('category', category.getAttribute('href'));
        category.setAttribute('href', '/products?' + query.toString());

        // Saco de query para operar con el que sigue
        query.delete('category');

    });

} else { // Hay un parámetro seleccionado

    categoriesItems.forEach(category => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.get('category') == category.getAttribute('href')) {
            category.style.fontWeight = 'bold';
            category.setAttribute('href', '#');
        } else {
            category.style.display = 'none';
        }

    });

}

// Trabajo con los colores
if (!query.has('color')) { // No hay un parámetro seleccionado

    colorsItems.forEach(color => {

        // Agrego al href lo que sigue
        query.append('color', color.getAttribute('href'));
        color.setAttribute('href', '/products?' + query.toString());

        // Saco de query para operar con el que sigue
        query.delete('color');

    });

} else { // Hay un parámetro seleccionado

    colorsItems.forEach(color => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.get('color') == color.getAttribute('href')) {
            color.style.fontWeight = 'bold';
            color.setAttribute('href', '#');
        } else {
            color.style.display = 'none';
        }

    });

}

// Trabajo con los tamaños
if (!query.has('size')) { // No hay un parámetro seleccionado

    sizesItems.forEach(size => {

        // Agrego al href lo que sigue
        query.append('size', size.getAttribute('href'));
        size.setAttribute('href', '/products?' + query.toString());

        // Saco de query para operar con el que sigue
        query.delete('size');

    });

} else { // Hay un parámetro seleccionado

    sizesItems.forEach(size => {

        // Resalto el elemento seleccionado y escondo los demás
        if (query.get('size') == size.getAttribute('href')) {
            size.style.fontWeight = 'bold';
            size.setAttribute('href', '#');
        } else {
            size.style.display = 'none';
        }

    });

}

// Hago que el botón limpiar filtros mantenga lo tipeado por el usuario
if (query.has('search')) {
    clean.setAttribute('href', '/products?search=' + query.get('search'));
}

// Obtengo los elementos de la paginación
let prevPage = document.querySelector('div.products div.pages a.prevPage');
let nextPage = document.querySelector('div.products div.pages a.nextPage');

// Saco el atributo page del query
query.delete('page');

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (prevPage.getAttribute("href") == 0) {
    prevPage.style.display = "none";
} else {

    // Agrego al href lo que sigue
    query.append('page', prevPage.getAttribute('href'));
    prevPage.setAttribute('href', '/products?' + query.toString());

    // Saco de query para operar con el que sigue
    query.delete('page');

} 

// Si es igual a 0, osea, no hay otro elemento, desactivo el botón. Si es distinto de 0, seteo href
if (nextPage.getAttribute('href') == 0) {
    nextPage.style.display = 'none';
} else {

    // Agrego al href lo que sigue
    query.append('page', nextPage.getAttribute('href'));
    nextPage.setAttribute('href', '/products?' + query.toString());

    // Saco de query para operar con el que sigue
    query.delete('page');

} 