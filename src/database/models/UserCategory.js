module.exports = (sequelize, dataTypes) => {

    let alias = 'UserCategory';

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
        tableName: 'user_categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {

        UserCategory.hasMany(models.User, {
            as: 'users',
            foreignKey: 'user_category_id'
        });

    };

    return UserCategory;

};