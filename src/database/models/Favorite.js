module.exports = (sequelize, dataTypes) => {

    let alias = 'Favorite';

    let cols = {

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }

    };

    let config = {
        tableName: 'favorites',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Favorite = sequelize.define(alias, cols, config);

    Favorite.associate = function (models) {

        Favorite.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });

        Favorite.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

    };

    return Favorite;

};