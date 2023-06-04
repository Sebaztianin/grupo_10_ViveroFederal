module.exports = (sequelize, dataTypes) => {

    let alias = 'Category';

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

        image: {
            type: dataTypes.STRING,
            allowNull: false
        },

        disabled: {
            type: dataTypes.TINYINT
        }

    };

    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {

        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });

    };

    return Category;

};