
/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const usersController = require('../controllers/usersController'); 

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

router.get('/login', usersController.index);

module.exports = router;