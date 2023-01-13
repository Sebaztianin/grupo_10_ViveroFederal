/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.render('products/products');
    },
    cart: function(req, res) {
        res.render('products/productCart');
    },
    detail: function(req, res) {
        /* No usamos req.params.id todavía, porque no tenemos varios productos, así que mandamos todo a la misma página */
        res.render('products/productDetail');
    }
};

module.exports = productsController;