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
        timestamps: false
    };

    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = models => {
        CartItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });
        CartItem.belongsTo(models.ShoppingSession, {
            as: 'shoppingSession',
            foreignKey: 'shopping_session_id',
            onDelete: 'CASCADE'
        });
    };

    return CartItem;
};