/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de usuario */
const Category = db.Category;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Creamos el módulo y exportamos */
let categoriesController = {

    panel: function (req, res) {

        Category.findAll()
            .then(categories => {

                res.render('categories/panel', { categories: categories });

            });

    },

    add: function (req, res) {

        res.render('categories/createCategory');

    },

    store: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Creamos nueva categoría con los datos del formulario
            let newCategory = {
                name: req.body.name,
                image: req.file.filename
            };

            // Agregar categoría a la BD
            Category.create(newCategory)
                .then(createdCategory => {

                    // Redireccionamos al panel
                    res.redirect('/categories/panel');

                });


        } else {   // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/categories/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/categories/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            res.render('categories/createCategory', { errors: errors.array(), old: req.body });

        }

    },

    edit: function (req, res) {

        Category.findByPk(req.params.id)
            .then(category => {
                res.render('categories/editCategory', { category: category });
            });

    },

    update: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Validar si hay una imagen seleccionada
            if (req.file) {

                // Obtengo nombre de imagen vieja para eliminarla
                Category.findByPk(req.params.id)
                    .then(categoryOld => {

                        // Crear objeto editado
                        let editedCategory = {
                            name: req.body.name,
                            image: req.file.filename
                        }

                        // Actualizo categoría
                        Category.update(editedCategory, {
                            where: { id: req.params.id }
                        })
                            .then(updatedCategory => {

                                // Validar si imagen vieja existe y eliminarla (unlink)
                                if (categoryOld.image && fs.existsSync(path.join(__dirname, '../../public/images/categories/', categoryOld.image))) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/images/categories/', categoryOld.image));
                                }

                                // Redireccionamos al panel de categorías
                                res.redirect('/categories/panel');

                            });

                    });

            } else {

                // Actualizo categoría
                let editedCategory = {
                    name: req.body.name
                }

                // Actualizo categoría
                Category.update(editedCategory, {
                    where: { id: req.params.id }
                })
                    .then(updatedCategory => {

                        // Redireccionamos al panel de categorías
                        res.redirect('/categories/panel');

                    });

            }

        } else { // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/categories/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/categories/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            Category.findByPk(req.params.id)
                .then(category => {
                    res.render('categories/editCategory', { errors: errors.array(), old: req.body, category: category });
                });

        }

    },

    disable: function (req, res) {

        Category.update({
            disabled: 1
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/categories/panel')
            });

    },

    enable: function (req, res) {

        Category.update({
            disabled: 0
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/categories/panel')
            });

    }

};

module.exports = categoriesController;