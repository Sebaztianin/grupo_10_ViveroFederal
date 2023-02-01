
/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const productsController = require('../controllers/productsController'); 

/* Configuramos Multer */
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/products'));
	},
	filename: function (req, file, cb) {
		cb(null, `img-${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`);
	}
});

const uploadFile = multer({storage: storage});

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
router.post('/', uploadFile.single('image'), productsController.store); 

// Editar producto
router.get('/:id/editProduct', productsController.edit);


module.exports = router;