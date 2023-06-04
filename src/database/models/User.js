module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {

        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },

        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },

        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: dataTypes.STRING,
            allowNull: false
        },

        user_category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },

        image: {
            type: dataTypes.STRING,
            allowNull: true
        },

    };

    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {

        User.hasMany(models.CartItem, {
            as: 'cart_items',
            foreignKey: 'user_id'
        });

        User.belongsTo(models.UserCategory, {
            as: 'user_category',
            foreignKey: 'user_category_id'
        });

    };

    return User;

};