/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const colorsController = require('../controllers/colorsController');

/* Importamos middlewares de chequeo de sesión */
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

/* Importamos y configuramos las validaciones */
const { body } = require('express-validator');

/* Validaciones del formulario de registración */
let createForm = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El nombre no puede tener un largo menor a 2.')
];

/* Validaciones del formulario de edición */
let editForm = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El nombre no puede tener un largo menor a 2.')
];

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

// Panel de colores
router.get('/panel', adminAuthMiddleware, colorsController.panel);
router.post('/panel/search', adminAuthMiddleware, colorsController.panelSearch);

// Nuevo
router.get('/add', adminAuthMiddleware, colorsController.add);
router.post('/add', adminAuthMiddleware, createForm, colorsController.store);

// Edición 
router.get('/edit/:id', adminAuthMiddleware, colorsController.edit);
router.put('/edit/:id', adminAuthMiddleware, editForm, colorsController.update);

// Deshabilitación 
router.delete('/delete/:id', adminAuthMiddleware, colorsController.disable);

// Habilitación 
router.put('/enable/:id', adminAuthMiddleware, colorsController.enable);


module.exports = router;