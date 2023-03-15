module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';

    let cols = {

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        },

        description: {
            type: dataTypes.TEXT('long'),
            allowNull: false
        },

        price: {
            type: dataTypes.DECIMAL(12, 2),
            allowNull: false
        },

        discount: {
            type: dataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        image: {
            type: dataTypes.STRING,
            allowNull: true
        },

        category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

        color_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },

        size_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        }

    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'color_id'
        });

        Product.belongsTo(models.Size, {
            as: 'size',
            foreignKey: 'size_id'
        });

        Product.hasMany(models.CartItem, {
            as: 'cart_items',
            foreignKey: 'product_id'
        });

    };

    return Product;

};