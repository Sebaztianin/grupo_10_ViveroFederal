/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

/* Creamos el path de usuarios y recuperamos el JSON parseado en users */
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Creamos el módulo y exportamos */
let usersController = {

    index: function (req, res) {
        res.render('users/login');
    },

    register: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);
        let passwordVerification;

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Obtener id
            let id = users[users.length - 1].id + 1;
            let newUser = {};

            // Agregar datos del usuario a la variable
            newUser.id = id;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.email = req.body.email;
            newUser.category = 'cliente';
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.image = req.file.filename;

            // Agregar usuario a la lista de usuarios
            let usersNew = users;
            usersNew.push(newUser);

            // Sobreescribir JSON con producto agregado
            fs.writeFileSync(usersFilePath, JSON.stringify(usersNew));

            // Redireccionamos al main (deberíamos redirigir al perfil del usuario)
            res.redirect('/');

        } else {   // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/users/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/users/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            res.render('users/login', { errors: errors.array(), old: req.body });

        }

    },

    login: function (req, res) {

        // Obtenemos id del usuario
        let id = 0;
        let hashedPassword;
        for (i = 0; i < users.length; i++) {
            if(users[i].email == req.body.email) {
                id = users[i].id;
                hashedPassword = users[i].password;   // Los primeros 5 users tienen password 123456 para probar.
            } 
        }

        // Validamos contraseña
        if (bcrypt.compareSync(req.body.password, hashedPassword)) {
            // Cambiar lógica.
            res.send('Usuario logeado: ' + id + '.');
        }

        // Cambiar lógica.
        res.send('Los datos ingresados son incorrectos.');

    }

};

module.exports = usersController;