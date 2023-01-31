
/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const productsController = require('../controllers/productsController'); 

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

router.get('/', productsController.index);
router.get('/productCart', productsController.cart);
router.get('/createProduct', productsController.create);
router.get('/:id/editProduct', productsController.edit);
router.get('/:id', productsController.detail);

module.exports = router;