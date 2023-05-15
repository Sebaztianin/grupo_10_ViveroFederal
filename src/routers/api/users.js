/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const usersApiController = require('../../controllers/api/usersApiController');

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

// Rutas de API
router.get('/', usersApiController.list)
router.get('/:id', usersApiController.detail)

module.exports = router;