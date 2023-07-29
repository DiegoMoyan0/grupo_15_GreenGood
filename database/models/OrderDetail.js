module.exports = (sequelize, DataTypes) => {
    const alias = 'OrderDetail';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: 1
        },
        detail_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1
        },
        user_payment_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'userPayment',
                key: 'id'
            }  
        },
        user_id: {
            type: DataTypes.STRING(255),  
            allowNull: true, // Pending to delete this property after testing
            references: {
                model: 'users',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'order_details',
        timestamps: false
    };

    const OrderDetail = sequelize.define(alias, cols, config);

    return OrderDetail;
};