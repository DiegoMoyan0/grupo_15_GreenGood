module.exports = (sequelize, DataTypes) => {
    const alias = 'CartItem';

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
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'product',
                key: 'id'
            }  
        },
        shopping_session_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'shopping_session',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'cart_items',
        timestamps: false
    };

    const CartItem = sequelize.define(alias, cols, config);

    return CartItem;
};