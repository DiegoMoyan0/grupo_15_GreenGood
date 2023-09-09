module.exports = (sequelize, DataTypes) => {
    const alias = 'OrderItem';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1
        },
        order_detail_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'orderDetail',
                key: 'id'
            }  
        },
        cart_item_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'cartItems',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'order_items',
        timestamps: false
    };

    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = models => {

        OrderItem.belongsTo(models.OrderDetail, {
            as: 'orderDetail',
            foreignKey: 'order_detail_id'
        });
        OrderItem.belongsTo(models.CartItem, {
            as: 'cartItem',
            foreignKey: 'cart_item_id'
        });
      
    };

    return OrderItem;
};