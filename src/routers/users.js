
/* Importamos módulos */
const express = require('express');
const app = express();
const path = require('path');

/* Importamos módulos de ruteo */
const usersController = require('../controllers/usersController'); 

/* Importamos y configuramos las validaciones */
const { body } = require('express-validator');

/* Validaciones del formulario de registración */
let registerForm = [
	body('firstName').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
		.isLength({ min: 2 }).withMessage('El nombre no puede tener un largo menor a 2.'),
	body('lastName').notEmpty().withMessage('El apellido no puede estar vacío.').bail()
    .isLength({ min: 2 }).withMessage('El apellido no puede tener un largo menor a 2.'),
	body('email').notEmpty().withMessage('El email no puede estar vacío.').bail()
		.isEmail().withMessage('Ingrese un correo válido.'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña.').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe contener por lo menos 8 caracteres.'),
	body('passwordConfirmation').custom((value, { req }) => {
		if (value != req.body.password) {
			throw new Error('Las contraseñas no coinciden.');
		}
		return true;
	}),
	body('avatar').custom((value, { req }) => {
		if (!req.file) {
			throw new Error('Se requiere una imagen.');
		} else if (path.extname(req.file.filename) != '.jpg') {
			throw new Error('Se requiere un archivo de extensión .jpg.');
		}
		return true;
	})
];

/* Importamos y configuramos Multer para las imágenes */
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/users'));
	},
	filename: function (req, file, cb) {
		cb(null, `img-${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`);
	}
});

const uploadFile = multer({ storage: storage });

/* Creamos el módulo y definimos las rutas para main */
let router = express.Router();

router.get('/login', usersController.index);
router.post('/register', uploadFile.single('avatar'), registerForm, usersController.register);

module.exports = router;