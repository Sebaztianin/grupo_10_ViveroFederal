/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos el modelo de producto */
const Product = db.Product;
const CartItem = db.CartItem;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Separador de miles para los números */
const toThousand = n => parseFloat(n).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
            include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }]
        })
            .then(product => {
                res.render('products/productDetail', { product: product, toThousand: toThousand });
            });
    },

    // Carrito
    cart: function (req, res) {
        CartItem.findAll({
            where: { user_id: req.session.userLogged.id },
            include: [{ association: 'product' }, { association: 'user' }]
        })
            .then(cartItems => {
                res.render('products/productCart', { cartItems: cartItems, toThousand: toThousand  });
            })
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
                Product.findByPk(req.params.id)
                    .then(productOld => {

                        // Crear objeto editado
                        let editedProduct = {
                            name: req.body.name,
                            description: req.body.description,
                            price: req.body.price,
                            discount: req.body.discount,
                            category_id: req.body.category_id,
                            image: req.file.filename
                        }

                        // Actualizo producto
                        Product.update(editedProduct, {
                            where: { id: req.params.id }
                        })
                            .then(updatedProduct => {

                                // Validar si imagen vieja existe y eliminarla (unlink)
                                if (productOld.image && fs.existsSync(path.join(__dirname, '../../public/images/products/', productOld.image))) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', productOld.image));
                                }

                                // Redireccionamos al detalle del producto
                                res.redirect('/products/detail/' + req.params.id);

                            });

                    });

            } else {

                // Actualizo producto
                let editedProduct = {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount: req.body.discount,
                    category_id: req.body.category_id
                }

                // Actualizo producto
                Product.update(editedProduct, {
                    where: { id: req.params.id }
                })
                    .then(updatedProduct => {

                        // Redireccionamos al detalle del producto
                        res.redirect('/products/detail/' + req.params.id);

                    });

            }

        } else { // Hay errores, volvemos al formulario

            // Eliminamos archivo mal cargado si es que se seleccionó un archivo en el formulario y existe tal archivo
            if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../../public/images/products/', req.file.filename))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', req.file.filename));
                }
            }

            // Volvemos al formulario con los errores y los datos viejos
            Product.findByPk(req.params.id)
                .then(product => {
                    res.render('products/editProduct', { errors: errors.array(), old: req.body, product: product, toThousand: toThousand });
                });

        }

    },

    // Eliminar producto
    destroy: function (req, res) {

        // Obtengo usuario viejo
        Product.findByPk(req.params.id)
            .then(eliminatedProduct => {

                // Validar si imagen existe y eliminarla (unlink)
                if (eliminatedProduct.image && fs.existsSync(path.join(__dirname, '../../public/images/products/', eliminatedProduct.image))) {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', eliminatedProduct.image));
                }

                // Eliminar producto
                Product.destroy({
                    where: { id: req.params.id }
                })
                    .then(eliminatedProduct => {

                        // Redireccionar a productos
                        res.redirect('/products');

                    });

            });

    }

};

module.exports = productsController;