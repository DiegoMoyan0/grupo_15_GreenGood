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
                model: 'products',
                key: 'id'
            }
        },
        shopping_session_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'shoppingSession',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'cart_items',
        timestamps: false,
        //To ensure that in the same session there cannot be more than one cart item with the same product id 
        indexes: [
            {
                unique: true,
                fields: ['product_id', 'shopping_session_id']
            }
        ]
    };

    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = models => {
        CartItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
        });
        CartItem.belongsTo(models.ShoppingSession, {
            as: 'shoppingSession',
            foreignKey: 'shopping_session_id',
        });
        
    };

    return CartItem;
};