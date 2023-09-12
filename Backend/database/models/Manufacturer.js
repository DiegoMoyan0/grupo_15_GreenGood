module.exports = (sequelize, DataTypes) => {
    const alias = 'Manufacturer';

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
        phone: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    };

    const config = {
        tableName: 'manufacturers',
        timestamps: false
    };

    const Manufacturer = sequelize.define(alias, cols, config);

    Manufacturer.associate = models => {
        Manufacturer.hasMany(models.Product, {
            as: 'manufacturer',
            foreignKey: 'manufacturer_id'
        })
    };

    return Manufacturer;
};