module.exports = (sequelize, dataTypes) => {

    let alias = 'CartItem';

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
        },

        quantity: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }

    };

    let config = {
        tableName: 'cart_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = function (models) {

        CartItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });

        CartItem.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

    };

    return CartItem;

};