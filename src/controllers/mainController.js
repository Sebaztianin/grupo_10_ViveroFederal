const fs = require('fs');
const path = require('path');

/* Recuperamos el modelo de producto */
const Product = require('../models/Product');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let mainController = {
    index: function(req, res) {
        let products = Product.findAll();
        res.render('main/index', {products: products, toThousand: toThousand});
    }
};

module.exports = mainController;
