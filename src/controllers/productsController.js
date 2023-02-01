/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');

/* Creamos el path de productos y recuperamos el JSON parseado en products */
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Separador de miles para los números */
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

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

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

        } else {   // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            res.render('products/createProduct', {errors: errors.array(), old: req.body});

        }

    },

    // Formulario de edición de producto
    edit: function (req, res) {
        let product = products.find(product => product.id == req.params.id);
        res.render('products/editProduct', {product: product, toThousand: toThousand});
    },

    // Editar producto
    update: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

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
                        imageOld = newProducts[i].image;    // Obtengo nombre de imagen vieja para eliminarla luego
                        newProducts[i].image = req.file.filename;
                    }
                }

                // Validar si imagen existe y eliminarla (unlink)
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', imageOld))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageOld));
                }

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

        } else {// Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            let product = products.find(product => product.id == req.params.id);
            res.render('products/editProduct', {errors: errors.array(), old: req.body, product: product, toThousand: toThousand});

        }

    },

    // Eliminar producto
    destroy: function (req, res) {

        // Obtener nombre de la imagen
        let imageName;
        for (i = 0; i < products.length; i++) {
            if (products[i].id == req.params.id) {
                imageName = products[i].image;
            }
        }

        // Validar si imagen existe y eliminarla (unlink)
        if (fs.existsSync(path.join(__dirname, '../../public/images/products/', imageName))) {
            fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageName));
        }

        // Sacar producto del array
        let productsNew = products.filter(product => product.id != req.params.id);

        // Sobreescribir JSON sin el producto
        fs.writeFileSync(productsFilePath, JSON.stringify(productsNew));

        // Redireccionar a productos
        res.redirect('/products');

    }

};

module.exports = productsController;