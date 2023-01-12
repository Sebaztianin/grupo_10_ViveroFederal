
/* Importamos módulos */
const path = require('path');

/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
};

module.exports = productsController;