/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de usuario */
const Size = db.Size;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Creamos el módulo y exportamos */
let sizesController = {

    panel: function (req, res) {

        Size.findAll()
            .then(sizes => {

                res.render('sizes/panel', { sizes: sizes });

            });

    },

    add: function (req, res) {

        res.render('sizes/createSize');

    },

    store: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Creamos nuevo elemento con los datos del formulario
            let newSize = {
                name: req.body.name
            };

            // Agregar elemento a la BD
            Size.create(newSize)
                .then(createdSize => {

                    // Redireccionamos al panel
                    res.redirect('/sizes/panel');

                });


        } else {   // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            res.render('sizes/createSize', { errors: errors.array(), old: req.body });

        }

    },

    edit: function (req, res) {

        Size.findByPk(req.params.id)
            .then(size => {
                res.render('sizes/editSize', { size: size });
            });

    },

    update: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Actualizo elemento
            let editedSize = {
                name: req.body.name
            }

            // Actualizo elemento
            Size.update(editedSize, {
                where: { id: req.params.id }
            })
                .then(updatedSize => {

                    // Redireccionamos al panel
                    res.redirect('/sizes/panel');

                });

        } else { // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            Size.findByPk(req.params.id)
                .then(size => {
                    res.render('sizes/editSize', { errors: errors.array(), old: req.body, size: size });
                });

        }

    },

    disable: function (req, res) {

        Size.update({
            disabled: 1
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/sizes/panel')
            });

    },

    enable: function (req, res) {

        Size.update({
            disabled: 0
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/sizes/panel')
            });

    }

};

module.exports = sizesController;