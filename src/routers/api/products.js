/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const productsApiController = require('../../controllers/api/productsApiController');

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

// Rutas de API
router.get('/', productsApiController.list)
router.get('/:id', productsApiController.detail)

module.exports = router;