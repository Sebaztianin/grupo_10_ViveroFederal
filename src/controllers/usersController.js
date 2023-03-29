/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de usuario */
const User = db.User;
const UserCategory = db.UserCategory;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Creamos el módulo y exportamos */
let usersController = {

    index: function (req, res) {
        res.render('users/login'); // No necesito llevar las categorías porque automáticamente le pone categoría cliente
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
                user_category_id: 2,
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
                        include: [{ association: 'user_category' }],
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
                include: [{ association: 'user_category' }],
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

        // Creamos filtro
        let queryFilter = { include: [{ association: 'user_category' }] };
        queryFilter.where = {};

        // Aplicamos filtro de query si existe
        if (req.query.searchPanel) {
            queryFilter.where = {
                [Op.or]:
                    [
                        {
                            first_name:
                            {
                                [Op.like]: '%' + req.query.searchPanel + '%'
                            }
                        },
                        {
                            last_name:
                            {
                                [Op.like]: '%' + req.query.searchPanel + '%'
                            }
                        },
                        {
                            email:
                            {
                                [Op.like]: '%' + req.query.searchPanel + '%'
                            }
                        }
                    ]
            }
        }

        // Agrego un filtro al where para que no aparezca admin principal, el cual no debe ser editable
        queryFilter.where.email = { [Op.ne]: 'admin@gmail.com' };

        // Buscamos usuarios que cumplen con el filtro
        User.findAll(queryFilter)
            .then(users => {
                res.render('users/panel', { users: users, query: req.query });
            });

    },

    panelSearch: function (req, res) {

        // Redirecciono pasando parámetros para la query
        res.redirect('/users/panel?searchPanel=' + req.body.searchPanel);

    },

    editCategory: function (req, res) {

        // Recupero tabla de categorías
        let user_categories = UserCategory.findAll({ where: { disabled: 0 } });
        let user = User.findByPk(req.params.id, {
            include: [{ association: 'user_category' }],
        });

        // Vuelvo al formulario luego de obtener los datos
        Promise.all([user_categories, user])
            .then(([user_categories, user]) => {
                res.render('users/editCategory', { user: user, user_categories: user_categories });
            });

    },

    updateCategory: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Actualizo usuario
            User.update({
                user_category_id: req.body.user_category_id
            }, {
                where: { id: req.params.id }
            })
                .then(userUpdated => {

                    // Redireccionamos al panel
                    res.redirect('/users/panel');

                });


        } else { // Hay errores, volvemos al formulario

            // Recupero tabla de categorías
            let user_categories = UserCategory.findAll({ where: { disabled: 0 } });
            let user = User.findByPk(req.params.id, {
                include: [{ association: 'user_category' }],
            });

            // Vuelvo al formulario luego de obtener los datos
            Promise.all([user_categories, user])
                .then(([user_categories, user]) => {
                    res.render('users/editCategory', { errors: errors.array(), old: req.body, user: user, user_categories: user_categories });
                });

        }

    },

    editProfile: function (req, res) {

        // Recupero tabla de categorías
        let user_categories = UserCategory.findAll({ where: { disabled: 0 } });
        let user = User.findByPk(req.params.id, {
            include: [{ association: 'user_category' }],
        });

        // Vuelvo al formulario luego de obtener los datos
        Promise.all([user_categories, user])
            .then(([user_categories, user]) => {
                res.render('users/editProfile', { user: user, user_categories: user_categories });
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
                User.findByPk(req.params.id, {
                    include: [{ association: 'user_category' }],
                })
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
                                User.findByPk(req.params.id, {
                                    include: [{ association: 'user_category' }],
                                })
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
                        User.findByPk(req.params.id, {
                            include: [{ association: 'user_category' }],
                        })
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

            // Recupero tabla de categorías
            let user_categories = UserCategory.findAll({ where: { disabled: 0 } });
            let user = User.findByPk(req.params.id, {
                include: [{ association: 'user_category' }],
            });

            // Vuelvo al formulario luego de obtener los datos
            Promise.all([user_categories, user])
                .then(([user_categories, user]) => {
                    res.render('users/editProfile', { errors: errors.array(), old: req.body, user: user, user_categories: user_categories });
                });

        }

    }

};

module.exports = usersController;