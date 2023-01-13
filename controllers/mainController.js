
/* Importamos módulos */
const path = require('path');

/* Creamos el módulo y exportamos */
let mainController = {
    index: function(req, res) {
        res.sendFile(path.join(__dirname, '../src/views/main/index.html'));
    }
};

module.exports = mainController;