module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    };

    const config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: 'categoryProducts',
            foreignKey: 'category_id',
        })
    };

    return Category;
};