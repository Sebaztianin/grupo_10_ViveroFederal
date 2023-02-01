
/* Importamos módulos */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

/* Importamos módulos propios de ruteo */
const mainRoutes = require('./routers/main')
const productsRoutes = require('./routers/products')
const usersRoutes = require('./routers/users')

/* Declaramos carpeta static */
app.use(express.static('./public'));

/* Middlewares */
app.use(express.urlencoded({ extended: false })); // Para enviar datos
app.use(express.json()); // Para enviar datos
app.use(methodOverride('_method')); // Para poder pisar el método POST en los formularios por PUT y DELETE

/* Configuramos EJS como el motor de vistas y cambiamos la carpeta de vistas a /src/views */
app.set('view engine', 'ejs')
app.set('views', './src/views')

/* Levantamos server */
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

/* Definimos rutas */
app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

