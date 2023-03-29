/* Importamos los módulos a utilizar */
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

/* Recuperamos los modelos que se utilizan */
const Product = db.Product;
const Category = db.Category;
const Color = db.Color;
const Size = db.Size;
const CartItem = db.CartItem;
const Favorite = db.Favorite;

/* Importamos las validaciones */
const { validationResult } = require('express-validator');

/* Separador de miles para los números */
const toThousand = n => parseFloat(n).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Creamos el módulo y exportamos */
let productsController = {

    // Listado de productos
    index: function (req, res) {

        // Creamos filtro
        let queryFilter = { include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }] };
        queryFilter.where = { disabled: 0 };

        // Agregamos filtro de categoría, color o tamaño
        if (req.query.category) {
            queryFilter.where.category_id = req.query.category;
        }
        if (req.query.color) {
            queryFilter.where.color_id = req.query.color;
        }
        if (req.query.size) {
            queryFilter.where.size_id = req.query.size;
        }
        if (req.query.search) {
            queryFilter.where.name = { [Op.like]: '%' + req.query.search + '%' };
        }

        // Paginación
        let pageSize = 8;

        // Verifico que haya un número de página ingresado, sino lo seteo en 1
        if (!req.query.page) { req.query.page = 1 };

        // Inserto filtros y offset
        if (req.query.page != 1) {
            queryFilter.limit = pageSize + 1;
            queryFilter.offset = (req.query.page - 1) * pageSize;
        } else {
            queryFilter.limit = pageSize + 1;
        }

        // Recuperamos productos con filtro
        let products = Product.findAll(queryFilter);

        // Recuperamos categorías, colores y tamaños para los filtros
        let categories = Category.findAll({ where: { disabled: 0 } });
        let colors = Color.findAll({ where: { disabled: 0 } });
        let sizes = Size.findAll({ where: { disabled: 0 } });

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([products, categories, colors, sizes])
            .then(([products, categories, colors, sizes]) => {


                // Defino página siguiente y anterior, si las hay
                let prevPage = req.query.page - 1;
                let nextPage = 0;

                // Remuevo último elemento y verifico si existe
                let lastProduct = products.splice(pageSize, 1);
                if (lastProduct.length != 0) {
                    nextPage = parseInt(req.query.page) + 1; // Existe, así que hay otra página
                }

                // Renderizo
                res.render('products/products', { toThousand: toThousand, products: products, categories: categories, colors: colors, sizes: sizes, query: req.query, nextPage: nextPage, prevPage: prevPage });

            });

    },

    // Panel de productos
    panel: function (req, res) {

        // Creamos filtro de query
        let queryFilter = { include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }] };
        queryFilter.where = {}; // Acá debo mostrar deshabilitados por si los quiero habilitar de nuevo

        // Recuperamos productos con filtro
        let products = Product.findAll(queryFilter);

        // Recuperamos categorías, colores y tamaños para los filtros
        let categories = Category.findAll({ where: { disabled: 0 } });
        let colors = Color.findAll({ where: { disabled: 0 } });
        let sizes = Size.findAll({ where: { disabled: 0 } });

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([products, categories, colors, sizes])
            .then(([products, categories, colors, sizes]) => {
                res.render('products/panel', { products: products, categories: categories, colors: colors, sizes: sizes });
            });

    },

    search: function (req, res) {

        // Redirecciono pasando parámetros para la query
        res.redirect('/products?search=' + req.body.search);

    },

    // Detalle de productos
    detail: function (req, res) {

        // Buscamos detalles del producto
        Product.findByPk(req.params.id, {
            include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }]
        })
            .then(product => {

                // Buscamos detalles de productos relacionados (por ahora sólo mostramos productos de la misma categoría)
                Product.findAll({
                    where: {
                        category_id: product.category_id,
                        id: { [Op.ne]: product.id }
                    }
                })
                    .then(relatedProducts => {

                        // Enviamos producto y sus relacionados a la vista
                        res.render('products/productDetail', { product: product, relatedProducts: relatedProducts, toThousand: toThousand });

                    });

            });

    },

    // Formulario de creación de producto
    create: function (req, res) {

        // Recuperamos categorías, colores y tamaños para los filtros
        let categories = Category.findAll({ where: { disabled: 0 } });
        let colors = Color.findAll({ where: { disabled: 0 } });
        let sizes = Size.findAll({ where: { disabled: 0 } });

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([categories, colors, sizes])
            .then(([categories, colors, sizes]) => {
                res.render('products/createProduct', { categories: categories, colors: colors, sizes: sizes });
            });

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
                color_id: (req.body.color_id != '') ? req.body.color_id : null,
                size_id: (req.body.size_id != '') ? req.body.size_id : null,
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

            // Recuperamos categorías, colores y tamaños para los filtros
            let categories = Category.findAll({ where: { disabled: 0 } });
            let colors = Color.findAll({ where: { disabled: 0 } });
            let sizes = Size.findAll({ where: { disabled: 0 } });

            // Promesa para cuando obtengamos todos estos datos
            Promise.all([categories, colors, sizes])
                .then(([categories, colors, sizes]) => {

                    // Volvemos al formulario con los errores y los datos viejos
                    res.render('products/createProduct', { errors: errors.array(), old: req.body, categories: categories, colors: colors, sizes: sizes });

                });

        }

    },

    // Formulario de edición de producto
    edit: function (req, res) {

        // Recuperamos producto
        let product = Product.findByPk(req.params.id);

        // Recuperamos categorías, colores y tamaños para los filtros
        let categories = Category.findAll({ where: { disabled: 0 } });
        let colors = Color.findAll({ where: { disabled: 0 } });
        let sizes = Size.findAll({ where: { disabled: 0 } });

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([product, categories, colors, sizes])
            .then(([product, categories, colors, sizes]) => {
                res.render('products/editProduct', { product: product, categories: categories, colors: colors, sizes: sizes, toThousand: toThousand });
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
                            color_id: (req.body.color_id != '') ? req.body.color_id : null,
                            size_id: (req.body.size_id != '') ? req.body.size_id : null,
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
                    category_id: req.body.category_id,
                    color_id: (req.body.color_id != '') ? req.body.color_id : null,
                    size_id: (req.body.size_id != '') ? req.body.size_id : null
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

            // Recuperamos producto
            let product = Product.findByPk(req.params.id);

            // Recuperamos categorías, colores y tamaños para los filtros
            let categories = Category.findAll({ where: { disabled: 0 } });
            let colors = Color.findAll({ where: { disabled: 0 } });
            let sizes = Size.findAll({ where: { disabled: 0 } });

            // Promesa para cuando obtengamos todos estos datos
            Promise.all([product, categories, colors, sizes])
                .then(([product, categories, colors, sizes]) => {
                    res.render('products/editProduct', { errors: errors.array(), old: req.body, product: product, categories: categories, colors: colors, sizes: sizes, toThousand: toThousand });
                });

        }

    },

    // Deshabilitar producto
    disable: function (req, res) {

        // Marco como deshabilitado en BD
        Product.update({
            disabled: 1
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/products/panel')
            });

    },

    // Habilitar producto
    enable: function (req, res) {

        // Marco como habilitado en BD
        Product.update({
            disabled: 0
        }, {
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/products/panel')
            });

    },

    // Carrito
    cart: function (req, res) {

        // Busco el carrito del usuario logeado
        CartItem.findAll({
            where: { user_id: req.session.userLogged.id },
            include: [{ association: 'product' }, { association: 'user' }]
        })
            .then(cartItems => {
                res.render('products/productCart', { cartItems: cartItems, toThousand: toThousand });
            });

    },

    // Agregar al carrito
    cartAdd: function (req, res) {

        // Busco este producto en el carrito del usuario logeado
        CartItem.findOne({
            where: { user_id: req.session.userLogged.id, product_id: req.params.id }
        })
            .then(cartItem => {

                if (cartItem) { // Existe el producto

                    // Actualizo esa fila del carrito, sumándole la cantidad seleccionada por el usuario
                    CartItem.update({
                        quantity: cartItem.quantity + (req.body.quantity ? parseInt(req.body.quantity) : 1) // Controlo que exista quantity en el body, ya que si lo agrego al producto directo del listado, no lo tiene
                    }, {
                        where: { user_id: req.session.userLogged.id, product_id: req.params.id }
                    })
                        .then(cartItemUpdated => {

                            // Redirecciono al carrito
                            res.redirect('/products/productCart');

                        });

                } else { // No existe el producto

                    // Agrego la fila al carrito
                    CartItem.create({
                        user_id: req.session.userLogged.id,
                        product_id: req.params.id,
                        quantity: req.body.quantity ? parseInt(req.body.quantity) : 1 // Controlo que exista quantity en el body, ya que si agrego al producto directo del listado, no lo tiene
                    })
                        .then(cartItemInserted => {

                            // Redirecciono al carrito
                            res.redirect('/products/productCart');

                        });

                }

            });

    },

    // Sacar del carrito
    cartRemove: function (req, res) {

        CartItem.destroy({
            where: { user_id: req.session.userLogged.id, product_id: req.params.id }
        })
            .then(cartItemDestroyed => {

                // Redirecciono al carrito
                res.redirect('/products/productCart');

            });

    },

    // Favoritos
    favorites: function (req, res) {

        // Obtengo favoritos, incluyendo productos asociados
        Favorite.findAll({
            where: { user_id: req.session.userLogged.id },
            include: [{ association: 'product' }, { association: 'user' }]
        })
            .then(favorites => {
                res.render('products/favorites', { favorites: favorites, toThousand: toThousand });
            });

    },

    // Agregar a favoritos
    favoritesAdd: function (req, res) {

        // Busco este producto en los favoritos del usuario logeado
        Favorite.findOne({
            where: { user_id: req.session.userLogged.id, product_id: req.params.id }
        })
            .then(favorite => {

                if (favorite) { // Existe el producto en favoritos

                    // Redirecciono a favoritos
                    res.redirect('/products/favorites');

                } else { // No existe el producto

                    // Agrego el producto a favoritos
                    Favorite.create({
                        user_id: req.session.userLogged.id,
                        product_id: req.params.id
                    })
                        .then(favoriteInserted => {

                            // Redirecciono al carrito
                            res.redirect('/products/favorites');

                        });

                }

            });
    },

    // Sacar de favoritos
    favoritesRemove: function (req, res) {

        Favorite.destroy({
            where: { user_id: req.session.userLogged.id, product_id: req.params.id }
        })
            .then(favoriteDestroyed => {

                // Redirecciono al carrito
                res.redirect('/products/favorites');

            });

    }

};

module.exports = productsController;