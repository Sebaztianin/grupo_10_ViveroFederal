/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.render('products/products');
    },
    detail: function(req, res) {
        /* No usamos req.params.id todavía, porque no tenemos varios productos, así que mandamos todo a la misma página */
        res.render('products/productDetail');
    },
    cart: function(req, res) {
        res.render('products/productCart');
    },
    create: function(req, res) {
        res.render('products/createProduct');
    },
};

module.exports = productsController;