const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let mainController = {
    index: function(req, res) {
        res.render('main/index', {products: products, toThousand: toThousand});
    }
};

module.exports = mainController;
