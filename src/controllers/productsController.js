/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de producto */
const Product = db.Product;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Separador de miles para los números */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let productsController = {

    // Listado de productos
    index: function (req, res) {
        Product.findAll()
            .then(products => {
                res.render('products/products', { products: products, toThousand: toThousand });
            });
    },

    // Detalle de productos
    detail: function (req, res) {
        Product.findByPk(req.params.id, {
                include: [{association: 'category'}, {association: 'color'}, {association: 'size'}]
        })
            .then(product => {
                res.render('products/productDetail', { product: product, toThousand: toThousand });
            });
    },

    // Carrito
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

            // Creamos nuevo producto con los datos del formulario
            let newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.category_id,
                image: req.file.filename
            };

            // Agregar producto a la BD
            Product.create(newProduct)
                .then(createdProduct => {

                    // Redireccionamos al detalle del producto
                    res.redirect('/products/detail/' + createdProduct.id);

                });


        } else {   // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            res.render('products/createProduct', { errors: errors.array(), old: req.body });

        }

    },

    // Formulario de edición de producto
    edit: function (req, res) {
        Product.findByPk(req.params.id)
            .then(product => {
                res.render('products/editProduct', { product: product, toThousand: toThousand });
            });
    },

    // Editar producto
    update: function (req, res) {

        // Recuperamos resultados de la validación
        let errors = validationResult(req);

        // Consultamos si no existen errores
        if (errors.isEmpty()) {   // No hay errores, continuamos...

            // Validar si hay una imagen seleccionada
            if (req.file) {

                // Obtengo nombre de imagen vieja para eliminarla
                let imageOld = Product.findByPk(req.params.id).image;

                // Crear objeto editado
                let editedProduct = {
                    id: parseInt(req.params.id), // Se utiliza parseInt para convertir a entero el :id que la ruta pasa como String
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount: req.body.discount,
                    category: req.body.category,
                    image: req.file.filename
                }

                // Actualizo producto
                Product.edit(editedProduct);

                // Validar si imagen vieja existe y eliminarla (unlink)
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', imageOld))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageOld));
                }

            } else {

                // Obtengo nombre de imagen vieja para mantener el dato, ya que esta no se cambió
                let imageOld = Product.findByPk(req.params.id).image;

                // Crear objeto editado
                let editedProduct = {
                    id: parseInt(req.params.id), // Se utiliza parseInt para convertir a entero el :id que la ruta pasa como String
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount: req.body.discount,
                    category: req.body.category,
                    image: imageOld
                }

                // Actualizo producto
                Product.edit(editedProduct);

            }

            // Redireccionamos al detalle del producto
            res.redirect('/products/detail/' + req.params.id);

        } else { // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            let product = Product.findByPk(req.params.id);
            res.render('products/editProduct', { errors: errors.array(), old: req.body, product: product, toThousand: toThousand });

        }

    },

    // Eliminar producto
    destroy: function (req, res) {

        // Obtener nombre de la imagen
        let imageName = Product.findByPk(req.params.id).image;

        // Validar si imagen existe y eliminarla (unlink)
        if (fs.existsSync(path.join(__dirname, '../../public/images/products/', imageName))) {
            fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageName));
        }

        // Eliminar producto
        Product.delete(req.params.id);

        // Redireccionar a productos
        res.redirect('/products');

    }

};

module.exports = productsController;