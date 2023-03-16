
/* Importamos módulos */
const express = require('express');
const app = express();

/* Importamos módulos de ruteo */
const mainController = require('../controllers/mainController');

/* Importamos middlewares de chequeo de sesión */
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

// Home
router.get('/', mainController.index);

// Panel de administrador
router.get('/admin/panel', adminAuthMiddleware, mainController.adminPanel)

module.exports = router;