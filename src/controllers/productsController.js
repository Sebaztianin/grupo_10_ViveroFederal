const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let productsController = {

    // Listado de productos
    index: function(req, res) {
        res.render('products/products', {products: products, toThousand: toThousand});
    },

    // Detalle de productos
    detail: function(req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/productDetail', {product: product, toThousand: toThousand});
    },

    // Carrtito
    cart: function(req, res) {
        res.render('products/productCart');
    },

    // Formulario de creación de producto
    create: function(req, res) {
        res.render('products/createProduct');
    },

    // Crear producto
    store: function(req, res) {

        // Get product id
		let id = products[products.length - 1].id + 1;
		let newProduct = {};

		// Add data to product variable
		newProduct.id = id;
		newProduct.name = req.body.name;
		newProduct.description = req.body.description;
		newProduct.price = req.body.price;
		newProduct.discount = req.body.discount;
		newProduct.category = req.body.category;
		newProduct.image = req.file.filename;

		// Add product to list
		let productsNew = products;
		productsNew.push(newProduct);

		// Rewrite file with product
		fs.writeFileSync(productsFilePath, JSON.stringify(productsNew));

		res.redirect('/products');
    },

    // Formulario de edición de producto
    edit: function(req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/editProduct', {product: product, toThousand: toThousand});
    }
};

module.exports = productsController;