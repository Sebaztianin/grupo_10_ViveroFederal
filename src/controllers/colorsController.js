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

        // Creamos filtro
        let queryFilter = {};
        queryFilter.where = {}; // Acá debo mostrar deshabilitados por si los quiero habilitar de nuevo

        // Aplicamos filtro de query si existe
        if (req.query.searchPanel) {
            queryFilter.where.name = { [Op.like]: '%' + req.query.searchPanel + '%' };
        }

        // Paginación
        let pageSize = 8;

        // Verifico que haya un número de página ingresado, sino lo seteo en 1
        if (!req.query.page || req.query.page < 1) { req.query.page = 1 };

        // Filtros y offset
        if (req.query.page != 1) {
            queryFilter.limit = pageSize + 1;
            queryFilter.offset = (req.query.page - 1) * pageSize;
        } else {
            queryFilter.limit = pageSize + 1;
        }

        // Recuperamos elementos con filtro
        Color.findAll(queryFilter)
            .then(colors => {

                // Defino página siguiente y anterior, si las hay
                let prevPage = req.query.page - 1;
                let nextPage = 0;

                // Remuevo último elemento y verifico si existe
                let lastColor = colors.splice(pageSize, 1);
                if (lastColor.length != 0) {
                    nextPage = parseInt(req.query.page) + 1; // Existe, así que hay otra página
                }

                // Renderizo
                res.render('colors/panel', { colors: colors, query: req.query, prevPage: prevPage, nextPage: nextPage });

            });

    },

    // Búsqueda en panel
    panelSearch: function (req, res) {

        // Redirecciono pasando parámetros para la query
        res.redirect('/colors/panel?searchPanel=' + req.body.searchPanel);

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