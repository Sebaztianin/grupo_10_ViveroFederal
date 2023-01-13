/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.render('users/login');
    }
};

module.exports = productsController;