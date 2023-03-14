const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de producto */
const Product = db.Product;

/* Separador de miles para los números */
const toThousand = n => parseFloat(n).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let mainController = {
    index: function (req, res) {
        Product.findAll({
            include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }]
        })
            .then(products => {

                res.render('main/index', { products: products, toThousand: toThousand });

            });
    }
};

module.exports = mainController;
