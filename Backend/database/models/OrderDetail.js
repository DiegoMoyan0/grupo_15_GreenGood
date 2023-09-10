const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const alias = 'OrderDetail';

    const cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(), 
            primaryKey: true,
            allowNull: false,
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
        user_address_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Address',
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


    OrderDetail.associate = models => {

        OrderDetail.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'user_address_id',
        });
        OrderDetail.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'order_detail_id'
        });
        OrderDetail.belongsTo(models.UserPayment, {
            as: 'payment',
            foreignKey: 'user_payment_id',
        });
        OrderDetail.belongsTo(models.User, {
            as: 'userDetail',
            foreignKey: 'user_id',
        });
        
    };


    return OrderDetail;
};