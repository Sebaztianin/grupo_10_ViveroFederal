/* Creamos el módulo y exportamos */
let mainController = {
    index: function(req, res) {
        res.render('main/index');
    }
};

module.exports = mainController;