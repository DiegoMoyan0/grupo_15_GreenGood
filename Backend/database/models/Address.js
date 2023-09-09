module.exports = (sequelize, DataTypes) => {
    const alias = 'Address';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false, 
            references: {
                model: 'users',
                key: 'id'
            }  
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,    
        }
    };

    const config = {
        tableName: 'user_addresses',
        timestamps: false, 
    };

    const Address = sequelize.define(alias, cols, config);

    Address.associate = models => {

        Address.belongsTo(models.User, {
            as: 'address',
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });   

        Address.hasMany(models.OrderDetail, {
            as: 'userAddress',
            foreignKey: 'user_address_id',
        });

    }; 

    return Address;
};