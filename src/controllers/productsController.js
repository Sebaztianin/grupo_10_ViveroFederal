const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let productsController = {
    index: function(req, res) {
        res.render('products/products', {products: products, toThousand: toThousand});
    },
    detail: function(req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/productDetail', {product: product, toThousand: toThousand});
    },
    cart: function(req, res) {
        res.render('products/productCart');
    },
    create: function(req, res) {
        res.render('products/createProduct');
    },
    edit: function(req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/editProduct', {product: product, toThousand: toThousand});
    }
};

module.exports = productsController;