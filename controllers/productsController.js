
/* Importamos módulos */
const path = require('path');

/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/products.html'));
    },
    cart: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/productCart.html'))
    },
    detail: function(req, res) {
        /* No usamos req.params.id todavía, porque no tenemos varios productos, así que mandamos todo a la misma página */
        res.sendFile(path.join(__dirname, '../views/productDetail.html'))
    }
};

module.exports = productsController;