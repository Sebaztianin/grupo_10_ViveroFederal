const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos los modelos a utilizar */
const Product = db.Product;
const Category = db.Category;

/* Separador de miles para los números */
const toThousand = n => parseFloat(n).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let mainController = {

    index: function (req, res) {

        // Recuperamos productos 
        let products = Product.findAll({
            include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }]
        });

        // Recuperamos categorías
        let categories = Category.findAll();

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([products, categories])
            .then(([products, categories]) => {
                res.render('main/index', { products: products, categories: categories, toThousand: toThousand });
            });

    },

    adminPanel: function (req, res) {

        res.render('main/admin/panel');

    }

};

module.exports = mainController;
