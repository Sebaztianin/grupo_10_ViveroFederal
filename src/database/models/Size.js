module.exports = (sequelize, dataTypes) => {

    let alias = 'Size';

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

        disabled: {
            type: dataTypes.TINYINT
        }

    };

    let config = {
        tableName: 'sizes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Size = sequelize.define(alias, cols, config);

    Size.associate = function (models) {

        Size.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'size_id'
        });

    };

    return Size;

};