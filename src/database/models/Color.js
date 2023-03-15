module.exports = (sequelize, dataTypes) => {

    let alias = 'Color';

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
        }

    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {

        Color.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'color_id'
        });

    };

    return Color;

};