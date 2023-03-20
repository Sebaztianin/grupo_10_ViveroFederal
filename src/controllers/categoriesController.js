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

        

    }

};

module.exports = categoriesController;