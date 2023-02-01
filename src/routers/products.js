
/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const productsController = require('../controllers/productsController');

/* Importamos y configuramos las validaciones */
const { check } = require('express-validator');

let validateCreateForm = [
	check('name').notEmpty().withMessage('El nombre no puede estar vacio.').bail()
		.isLength({min: 2}).withMessage('El nombre no puede tener un largo menor a 2.'),
	check('price').notEmpty().withMessage('El precio no puede estar vacio.').bail()
	.isFloat().withMessage('El precio debe ser un número.'),
	check('discount').notEmpty().withMessage('El descuento no puede estar vacio.').bail()
	.isFloat({min: 0, max: 100}).withMessage('El precio debe ser un número entre 0 y 100.'),
	check('image').notEmpty().withMessage('Debe seleccionar una imagen.'),
	check('category').notEmpty().withMessage('Debe seleccionar una categoría.'),
	check('name').notEmpty().withMessage('La descripción no puede estar vacia.').bail()
		.isLength({min: 10}).withMessage('La descripción no puede tener un largo menor a 10.')
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

// Carrito de productos
router.get('/productCart', productsController.cart);

// Crear producto
router.get('/createProduct', productsController.create);
router.post('/', validateCreateForm, uploadFile.single('image'), productsController.store);

// Editar producto
router.get('/:id/editProduct', productsController.edit);
router.put('/:id/edit', uploadFile.single('image'), productsController.update);

// Eliminar producto
router.delete('/:id', productsController.destroy);


module.exports = router;