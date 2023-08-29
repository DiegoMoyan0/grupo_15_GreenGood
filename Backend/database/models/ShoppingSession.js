module.exports = (sequelize, DataTypes) => {
    const alias = 'ShoppingSession';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        init_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING(255),  
            allowNull: true, // Pending to delete this property after testing
            references: {
                model: 'users',
                key: 'id'
            }  
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    };

    const config = {
        tableName: 'shopping_session',
        timestamps: false
    };

    const ShoppingSession = sequelize.define(alias, cols, config);

    ShoppingSession.associate = models => {

        ShoppingSession.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        ShoppingSession.hasMany(models.CartItem, {
            as: 'cartItems',
            foreignKey: 'shopping_session_id'
        });
      
    };

    return ShoppingSession;
};