/* Importamos los módulos a utilizar */
const fs = require('fs');
const db = require('../../database/models');
const sequelize = db.sequelize;

/* Recuperamos los modelos que se utilizan */
const Product = db.Product;

/* Creamos el módulo y exportamos */
let apiProductsController = {

    // Listado de productos
    list: function (req, res) {

        // Creamos filtro
        let queryFilter = { include: [{ association: 'category', attributes: ['id', 'name', 'image'] }] };
        queryFilter.where = {}; // Acá debo mostrar deshabilitados, ya que es un panel de administración
        queryFilter.attributes = [
            'id',
            'name',
            'description',
            [sequelize.fn('concat', '/api/products/', sequelize.col('product.id')), 'detail'] // Agrego la URL del detalle del producto
        ];

        // Paginación
        let pageSize = 10;

        // Verifico que haya un número de página ingresado, sino lo seteo en 1
        if (!req.query.page) { req.query.page = 1 };

        // Filtros y offset
        if (req.query.page != 1) {
            queryFilter.limit = pageSize + 1;
            queryFilter.offset = (req.query.page.toString() - 1) * pageSize;
        } else {
            queryFilter.limit = pageSize + 1;
        }

        // Recuperamos todos los productos (para obtener el total)
        let productsCount = Product.count();

        // Recuperamos productos con filtro
        let products = Product.findAll(queryFilter);

        // Recuperamos productos por categoría, acá hacemos una query pura a la BD para hacerlo más simple
        let productsByCategory = sequelize.query(
            'select categories.name category, count(categories.name) totalProducts from products ' +
            'inner join categories ' +
            'on products.category_id = categories.id ' +
            'group by categories.name ',
            { type: sequelize.QueryTypes.SELECT } // Este atributo indica a sequelize que no traiga la metadata de la consulta
        );

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([products, productsCount, productsByCategory])
            .then(([products, productsCount, productsByCategory]) => {

                // Defino página siguiente y anterior, si las hay
                let prevPage = req.query.page - 1;
                let nextPage = 0;

                // Remuevo último elemento y verifico si existe
                let lastProduct = products.splice(pageSize, 1);
                if (lastProduct.length != 0) {
                    nextPage = parseInt(req.query.page) + 1; // Existe, así que hay otra página
                }

                // Respuesta
                let respuesta = {
                    meta: {
                        status: 200,
                        count: productsCount,
                        url: '/api/products',
                        countByCategory: productsByCategory,
                        page: req.query.page.toString(),
                        pageSize: pageSize,
                        prev: prevPage != 0 ? '/api/products?page=' + prevPage : null,
                        next: nextPage != 0 ? '/api/products?page=' + nextPage : null
                    },
                    products: products
                }

                res.json(respuesta);

            });

    },

    // Detalle de producto
    detail: function (req, res) {

        // Buscamos detalles del producto
        Product.findByPk(req.params.id, {
            include: [{ association: 'category' }, { association: 'color' }, { association: 'size' }],
            attributes: {
                include: [
                    [sequelize.fn('concat', '/images/products/', sequelize.col('product.image')), 'imageUrl'] // Agregamos la URL de la imagen del producto
                ]
            }
        })
            .then(product => {

                // Respuesta
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/products/' + product.id
                    },
                    product: product
                }

                res.json(respuesta);

            });

    }

};

module.exports = apiProductsController;