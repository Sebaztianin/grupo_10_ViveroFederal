/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de usuario */
const Color = db.Color;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Creamos el módulo y exportamos */
let colorsController = {

    panel: function (req, res) {

        Color.findAll()
            .then(colors => {

                res.render('colors/panel', { colors: colors });

            });

    },

    add: function (req, res) {

        res.render('colors/createColor');

    },

    store: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Creamos nuevo elemento con los datos del formulario
            let newColor = {
                name: req.body.name
            };

            // Agregar elemento a la BD
            Color.create(newColor)
                .then(createdColor => {

                    // Redireccionamos al panel
                    res.redirect('/colors/panel');

                });


        } else {   // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            res.render('colors/createColor', { errors: errors.array(), old: req.body });

        }

    },

    edit: function (req, res) {

        Color.findByPk(req.params.id)
            .then(color => {
                res.render('colors/editColor', { color: color });
            });

    },

    update: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Actualizo elemento
            let editedColor = {
                name: req.body.name
            }

            // Actualizo elemento
            Color.update(editedColor, {
                where: { id: req.params.id }
            })
                .then(updatedColor => {

                    // Redireccionamos al panel
                    res.redirect('/colors/panel');

                });

        } else { // Hay errores, volvemos al formulario

            // Volvemos al formulario con los errores y los datos viejos
            Color.findByPk(req.params.id)
                .then(color => {
                    res.render('colors/editColor', { errors: errors.array(), old: req.body, color: color });
                });

        }

    },

    disable: function (req, res) {

        Color.update({
            disabled: 1
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/colors/panel')
            });

    },

    enable: function (req, res) {

        Color.update({
            disabled: 0
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/colors/panel')
            });

    }

};

module.exports = colorsController;