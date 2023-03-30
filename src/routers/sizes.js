/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const sizesController = require('../controllers/sizesController');

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

// Panel de tamaños
router.get('/panel', adminAuthMiddleware, sizesController.panel);
router.post('/panel/search', adminAuthMiddleware, sizesController.panelSearch);

// Nuevo
router.get('/add', adminAuthMiddleware, sizesController.add);
router.post('/add', adminAuthMiddleware, createForm, sizesController.store);

// Edición 
router.get('/edit/:id', adminAuthMiddleware, sizesController.edit);
router.put('/edit/:id', adminAuthMiddleware, editForm, sizesController.update);

// Deshabilitación 
router.delete('/delete/:id', adminAuthMiddleware, sizesController.disable);

// Habilitación 
router.put('/enable/:id', adminAuthMiddleware, sizesController.enable);


module.exports = router;