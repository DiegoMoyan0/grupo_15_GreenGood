module.exports = (sequelize, DataTypes) => {
    const alias = 'Subcategory';

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
        tableName: 'subcategories',
        timestamps: false
    };

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = models => {
        Subcategory.hasMany(models.Product, {
            as: 'subcategoryProducts',
            foreignKey: 'subcategory_id'
        })
    };

    return Subcategory;
};