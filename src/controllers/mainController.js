/* Creamos el módulo y exportamos */
let mainController = {
    index: function(req, res) {
        res.render('main/index');
    },
    admin: function(req,res) {
        res.render('main/admin');
    }
};

module.exports = mainController;
