
/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const mainController = require('../controllers/mainController');

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

router.get('/', mainController.index);

module.exports = router;