
/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const productsController = require('../controllers/productsController');

/* Importamos middlewares de chequeo de sesión */
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

/* Importamos y configuramos las validaciones */
const { body } = require('express-validator');

/* Validaciones del formulario de creación de productos */
let validateCreateForm = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El nombre no puede tener un largo menor a 2.'),
    body('price').notEmpty().withMessage('El precio no puede estar vacío.').bail()
        .isFloat().withMessage('El precio debe ser un número.'),
    body('discount').notEmpty().withMessage('El descuento no puede estar vacío.').bail()
        .isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser un número entre 0 y 100.'),
    body('category_id').notEmpty().withMessage('Debe seleccionar una categoría.'),
    body('description').notEmpty().withMessage('La descripción no puede estar vacia.').bail()
        .isLength({ min: 10 }).withMessage('La descripción no puede tener un largo menor a 10.'),
    body('image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Se requiere una imagen.');
        } else if (path.extname(req.file.filename) != '.jpg') {
            throw new Error('Se requiere un archivo de extensión .jpg.');
        }
        return true;
    })
];

/* Validaciones del formulario de edición de productos */
let validateEditForm = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isLength({ min: 2 }).withMessage('El nombre no puede tener un largo menor a 2.'),
    body('price').notEmpty().withMessage('El precio no puede estar vacío.').bail()
        .isFloat().withMessage('El precio debe ser un número.'),
    body('discount').notEmpty().withMessage('El descuento no puede estar vacío.').bail()
        .isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser un número entre 0 y 100.'),
    body('category_id').notEmpty().withMessage('Debe seleccionar una categoría.'),
    body('description').notEmpty().withMessage('La descripción no puede estar vacia.').bail()
        .isLength({ min: 10 }).withMessage('La descripción no puede tener un largo menor a 10.'),
    body('image').custom((value, { req }) => {
        if (req.file) {
            if (path.extname(req.file.filename) != '.jpg') {
                throw new Error('Se requiere un archivo de extensión .jpg.');
            }
        }
        return true;
    })
];

/* Importamos y configuramos Multer para las imágenes */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb) {
        cb(null, `img-${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({ storage: storage });

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

// Listar productos
router.get('/', productsController.index);

// Detalle de producto
router.get('/detail/:id', productsController.detail);

// Crear producto
router.get('/createProduct', adminAuthMiddleware, productsController.create);
router.post('/', uploadFile.single('image'), validateCreateForm, productsController.store);

// Editar producto
router.get('/:id/editProduct', adminAuthMiddleware, productsController.edit);
router.put('/:id/edit', uploadFile.single('image'), validateEditForm, productsController.update);

// Eliminar producto
router.delete('/:id', productsController.destroy);

// Carrito de compras
router.get('/productCart', productsController.cart);

// Agregar al carrito
router.post('/productCart/add/:id', productsController.cartAdd);

// Sacar del carrito
router.delete('/productCart/remove/:id', productsController.cartRemove);


module.exports = router;