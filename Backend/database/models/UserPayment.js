module.exports = (sequelize, DataTypes) => {
    const alias = 'UserPayment';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        payment_vendor: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        card_number: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        card_exp: {
            type: DataTypes.STRING,
            allowNull: false,    
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false, 
            references: {
                model: 'users',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'user_payments',
        timestamps: false, 
    };

    const UserPayment = sequelize.define(alias, cols, config);

    UserPayment.associate = models => {

        UserPayment.belongsTo(models.User, {
            as: 'userPayment',
            foreignKey: 'user_id',
        });
        UserPayment.hasMany(models.OrderDetail, {
            as: 'orderPayment',
            foreignKey: 'user_payment_id',
        });
        
    }; 

    return UserPayment;
};