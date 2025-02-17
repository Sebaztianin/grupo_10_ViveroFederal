
/* Importamos módulos */
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const rememberMeMiddleware = require('./middlewares/rememberMeMiddleware'); // Middleware propio para recordar al usuario
const globalVariableMiddleware = require('./middlewares/globalVariableMiddleware'); // Middleware propio para crear variables globales

/* Importamos variables de entorno */
require('dotenv').config();

/* Importamos módulos propios de ruteo */
const mainRoutes = require('./routers/main');
const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const colorsRoutes = require('./routers/colors');
const sizesRoutes = require('./routers/sizes');
const usersRoutes = require('./routers/users');
const productsApiRoutes = require('./routers/api/products.js');
const usersApiRoutes = require('./routers/api/users.js');

/* Configuramos EJS como el motor de vistas y cambiamos la carpeta de vistas a /src/views */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* Para poder hacer consultas a la API */
app.use(cors());

/* Declaramos carpeta static */
app.use(express.static('./public'));

/* Middlewares */
app.use(express.urlencoded({ extended: false })); // Para enviar datos
app.use(express.json()); // Para enviar datos
app.use(methodOverride('_method')); // Para poder pisar el método POST en los formularios por PUT y DELETE
app.use(session({ secret: "secret", resave: true, saveUninitialized: true })); // Para usar session
app.use(cookieParser()); // Para usar cookies
app.use(rememberMeMiddleware); // Para recordar al usuario en toda la app
app.use(globalVariableMiddleware); // Para crear variables globales

/* Levantamos server */
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/* Definimos rutas */
app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/colors', colorsRoutes);
app.use('/sizes', sizesRoutes);
app.use('/users', usersRoutes);

/* Rutas de la API */
app.use('/api/products', productsApiRoutes);
app.use('/api/users', usersApiRoutes);
app.use('/api', (req, res, next) => {
    res.render('api/index')
});

// Para hacer los 404 not found más bonitos
app.use((req, res, next) => { 
    res.status(404).render('main/notFound');
});