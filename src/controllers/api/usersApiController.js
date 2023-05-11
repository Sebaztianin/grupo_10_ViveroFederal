/* Importamos los módulos a utilizar */
const fs = require('fs');
const db = require('../../database/models');
const sequelize = db.sequelize;

/* Recuperamos los modelos que se utilizan */
const User = db.User;

/* Creamos el módulo y exportamos */
let apiUsersController = {

    // Listado de usuarios
    list: function (req, res) {

        // Creamos filtro
        let queryFilter = {};
        queryFilter.where = {}; // Acá debo mostrar deshabilitados, ya que es un panel de administración
        queryFilter.attributes = [
            'id',
            'first_name',
            'last_name',
            'email',
            [sequelize.fn('concat', '/api/users/', sequelize.col('user.id')), 'detail'] // Agrego la URL del detalle del usuario
        ];

        // Paginación
        let pageSize = 10;

        // Verifico que haya un número de página ingresado, sino lo seteo en 1
        if (!req.query.page || req.query.page < 1) { req.query.page = 1 };

        // Filtros y offset
        if (req.query.page != 1) {
            queryFilter.limit = pageSize + 1;
            queryFilter.offset = (req.query.page.toString() - 1) * pageSize;
        } else {
            queryFilter.limit = pageSize + 1;
        }

        // Recuperamos todos los usuarios (para obtener el total)
        let usersCount = User.count();

        // Recuperamos usuarios con filtro
        let users = User.findAll(queryFilter)

        // Promesa para cuando obtengamos todos estos datos
        Promise.all([users, usersCount])
            .then(([users, usersCount]) => {

                // Defino página siguiente y anterior, si las hay
                let prevPage = req.query.page - 1;
                let nextPage = 0;

                // Remuevo último elemento y verifico si existe
                let lastUser = users.splice(pageSize, 1);
                if (lastUser.length != 0) {
                    nextPage = parseInt(req.query.page) + 1; // Existe, así que hay otra página
                }

                // Respuesta
                let respuesta = {
                    meta: {
                        status: 200,
                        count: usersCount,
                        url: '/api/users',
                        page: req.query.page.toString(),
                        pageSize: pageSize,
                        prev: prevPage != 0 ? '/api/users?page=' + prevPage : null,
                        next: nextPage != 0 ? '/api/users?page=' + nextPage : null
                    },
                    users: users
                }

                res.json(respuesta);

            });

    },

    // Detalle de usuario
    detail: function (req, res) {

        // Buscamos detalles del usuario
        User.findByPk(req.params.id, {
            attributes: {
                include:
                    [
                        [sequelize.fn('concat', '/images/users/', sequelize.col('user.image')), 'imageUrl'] // Agregamos la URL de la imagen del usuario
                    ],
                exclude: ['password', 'user_category_id'] // Excluímos contraseña y categoría de la consulta
            }
        })
            .then(user => {

                // Respuesta
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/users/' + user.id
                    },
                    user: user
                }

                res.json(respuesta);

            });

    }

};

module.exports = apiUsersController;