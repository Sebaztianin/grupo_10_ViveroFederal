/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de usuario */
const User = db.User;

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
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                category: 'cliente',
                password: bcrypt.hashSync(req.body.password, 10)
            };

            // Agrego imagen si fue seleccionado un archivo.
            if (req.file) {
                newUser.image = req.file.filename;
            }

            // Agregar usuario a la BD
            User.create(newUser)
                .then(userCreated => {

                    // Obtenemos datos del usuario creado
                    User.findOne({
                        where: { email: userCreated.email }
                    })
                        .then(userToLogin => {

                            // Seteamos el usuario de la sesión
                            req.session.userLogged = userToLogin;

                            // Llevamos al usuario a su perfil
                            res.redirect('/users/profile');

                        });

                });

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
            User.findOne({
                where: { email: req.body.email }
            })
                .then(userToLogin => {

                    // Validamos correo
                    if (userToLogin) {

                        // Validamos contraseña
                        if (bcrypt.compareSync(req.body.password, userToLogin.password)) {

                            // Seteamos el usuario de la sesión
                            req.session.userLogged = userToLogin;

                            // Seteamos el usuario en la cookie si lo requiere
                            if (req.body.remember) { res.cookie('userLogged', userToLogin, { maxAge: 1000 * 60 * 60 * 24 * 30 }); }

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

                });

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
    },

    panel: function (req, res) {
        User.findAll({
            where: { email: { [Op.ne]: 'admin@gmail.com' } }        // Filtro el admin principal para que no sea editable
        })
            .then(users => {
                res.render('users/panel', { users: users });
            });
    },

    editCategory: function (req, res) {
        User.findByPk(req.params.id)
            .then(user => {
                res.render('users/editCategory', { user: user });
            });
    },

    updateCategory: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Actualizo usuario
            User.update({
                category: req.body.category
            }, {
                where: { id: req.params.id }
            })
                .then(userUpdated => {

                    // Redireccionamos al panel
                    res.redirect('/users/panel');

                });


        } else { // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            User.findByPk(req.params.id)
                .then(user => {
                    res.render('users/editCategory', { errors: errors.array(), old: req.body, user: user });
                });

        }

    },

    editProfile: function (req, res) {

        User.findByPk(req.params.id)
            .then(user => {
                res.render('users/editProfile', { user: user });
            });

    },

    updateProfile: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Validar si hay una imagen seleccionada
            if (req.file) {

                // Obtengo usuario viejo
                User.findByPk(req.params.id)
                    .then(userOld => {

                        // Edito el usuario
                        User.update({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            image: req.file.filename
                        }, {
                            where: { id: userOld.id }
                        })
                            .then(updatedUser => {

                                // Obtengo nuevos datos de usuario
                                User.findByPk(req.params.id)
                                    .then(updatedUser => {

                                        // Actualizamos dato de cookie
                                        req.session.userLogged = updatedUser;

                                        // Si hay una cookie, actualizarla también
                                        if (req.cookies.userLogged) { res.cookie('userLogged', updatedUser, { maxAge: 1000 * 60 * 60 * 24 * 30 }); }

                                        // Validar si imagen vieja existe y eliminarla (unlink)
                                        if (userOld.image && fs.existsSync(path.join(__dirname, '../../public/images/users/', userOld.image))) {
                                            fs.unlinkSync(path.join(__dirname, '../../public/images/users/', userOld.image));
                                        }

                                        // Redireccionamos al perfil
                                        res.redirect('/users/profile');

                                    });

                            });

                    });

            } else {

                // Edito el usuario
                User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                }, {
                    where: { id: req.params.id }
                })
                    .then(updatedUser => {

                        // Obtengo nuevos datos de usuario
                        User.findByPk(req.params.id)
                            .then(updatedUser => {

                                // Actualizamos dato de cookie
                                req.session.userLogged = updatedUser;

                                // Si hay una cookie, actualizarla también
                                if (req.cookies.userLogged) { res.cookie('userLogged', updatedUser, { maxAge: 1000 * 60 * 60 * 24 * 30 }); }

                                // Redireccionamos al perfil
                                res.redirect('/users/profile');

                            });

                    });

            }

        } else { // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/users/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/users/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            User.findByPk(req.params.id)
                .then(user => {
                    res.render('users/editProfile', { errors: errors.array(), old: req.body, user: user });
                });

        }

    }

};

module.exports = usersController;