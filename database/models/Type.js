module.exports = (sequelize, DataTypes) => {
    const alias = 'Type';

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
        tableName: 'types',
        timestamps: false
    };

    const Type = sequelize.define(alias, cols, config);

    Type.associate = models => {
        Type.hasMany(models.Product, {
            as: 'typeProducts',
            foreignKey: 'type_id'
        })
    };

    return Type;
};