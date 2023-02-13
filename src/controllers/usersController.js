/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

/* Recuperamos el modelo de usuario */
const User = require('../models/User');

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

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Creamos nuevo usuario con los datos del form
            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                category: 'cliente',
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file ? req.file.filename : 'avatar.jpg'
            };

            // Agregar usuario a la BD
            User.create(newUser);

            // Obtenemos datos del usuario creado
            let userToLogin = User.findByField('email', req.body.email);

            // Seteamos el usuario de la sesión
            req.session.userLogged = userToLogin

            // Llevamos al usuario a su perfil
            res.redirect('/users/profile');

        } else {   // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/users/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/users/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            res.render('users/login', { errorsRegister: errors.array(), oldRegister: req.body });

        }

    },

    login: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Obtenemos datos del usuario
            let userToLogin = User.findByField('email', req.body.email);

            // Validamos correo
            if (userToLogin) {

                // Validamos contraseña
                if (bcrypt.compareSync(req.body.password, userToLogin.password)) {

                    // Seteamos el usuario de la sesión
                    req.session.userLogged = userToLogin

                    // Seteamos el usuario en la cookie si lo requiere
                    if (req.body.remember) {res.cookie('userLogged', userToLogin, {maxAge: 1000 * 60 * 60 * 24 * 30});}

                    // Llevamos al usuario a su perfil
                    res.redirect('/users/profile');

                } else {

                    // Convertimos los errores a array y agregamos un error personalizado
                    let errorsArray = errors.array();
                    errorsArray.push({ value: "", msg: "Los datos ingresados son incorrectos.", param: "email", location: "body" });

                    // Volvemos al formulario con los errores y los datos viejos
                    res.render('users/login', { errorsLogin: errorsArray });

                }

            } else {

                // Convertimos los errores a array y agregamos un error personalizado
                let errorsArray = errors.array();
                errorsArray.push({ value: "", msg: "Email no registrado.", param: "email", location: "body" });

                // Volvemos al formulario con los errores y los datos viejos
                res.render('users/login', { errorsLogin: errorsArray });

            }

        } else {   // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            res.render('users/login', { errorsLogin: errors.array(), oldLogin: req.body });

        }

    },

    logout: function (req, res) {
        res.clearCookie('userLogged');
        req.session.destroy();
        res.redirect('/');
    },

    profile: function (req, res) {
        res.render('users/profile');
    }

};

module.exports = usersController;