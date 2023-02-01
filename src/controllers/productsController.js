const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let productsController = {

    // Listado de productos
    index: function (req, res) {
        res.render('products/products', { products: products, toThousand: toThousand });
    },

    // Detalle de productos
    detail: function (req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/productDetail', { product: product, toThousand: toThousand });
    },

    // Carrtito
    cart: function (req, res) {
        res.render('products/productCart');
    },

    // Formulario de creación de producto
    create: function (req, res) {
        res.render('products/createProduct');
    },

    // Crear producto
    store: function (req, res) {

        // Obtener id
        let id = products[products.length - 1].id + 1;
        let newProduct = {};

        // Agregar datos del producto a la variable
        newProduct.id = id;
        newProduct.name = req.body.name;
        newProduct.description = req.body.description;
        newProduct.price = req.body.price;
        newProduct.discount = req.body.discount;
        newProduct.category = req.body.category;
        newProduct.image = req.file.filename;

        // Agregar producto a la lista de productos
        let productsNew = products;
        productsNew.push(newProduct);

        // Sobreescribir JSON con producto agregado
        fs.writeFileSync(productsFilePath, JSON.stringify(productsNew));

        // Redireccionamos al detalle del producto
        res.redirect('/products/detail/' + id);
    },

    // Formulario de edición de producto
    edit: function (req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/editProduct', { product: product, toThousand: toThousand });
    },

    // Editar producto
    update: function (req, res) {

        // Validar si hay una imagen seleccionada
		if (req.file) {

			// Encontrar objeto en array y actualizar sus datos. 
			let newProducts = products;
			let imageOld = '';
			for (i = 0; i < newProducts.length; i++) {
				if (newProducts[i].id == req.params.id) {
					newProducts[i].name = req.body.name;
					newProducts[i].description = req.body.description;
					newProducts[i].price = req.body.price;
					newProducts[i].discount = req.body.discount;
					newProducts[i].category = req.body.category;
					imageOld = newProducts[i].image;    // Obtengo nombre de imagen vieja para eliminarla luego.
					newProducts[i].image = req.file.filename;
				}
			}

			// Eliminar (unlink) la imagen vieja.
			fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageOld));
	
			// Sobreescribir JSON con producto editado
			fs.writeFileSync(productsFilePath, JSON.stringify(newProducts));

		} else {

			// Encontrar objeto en array y actualizar sus datos
            let newProducts = products;
            for (i = 0; i < newProducts.length; i++) {
                if (newProducts[i].id == req.params.id) {
                    newProducts[i].name = req.body.name;
                    newProducts[i].description = req.body.description;
                    newProducts[i].price = req.body.price;
                    newProducts[i].discount = req.body.discount;
                    newProducts[i].category = req.body.category;
                }
            }
    
            // Sobreescribir JSON con producto editado
            fs.writeFileSync(productsFilePath, JSON.stringify(newProducts));

		}

        // Redireccionamos al detalle del producto
        res.redirect('/products/detail/' + req.params.id);
    }
};

module.exports = productsController;