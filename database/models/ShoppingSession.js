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
            allowNull: false,
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
        tableName: 'shopping_sessions',
        timestamps: false
    };

    const ShoppingSession = sequelize.define(alias, cols, config);

    ShoppingSession.associate = models => {
        
        ShoppingSession.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
    }

    return ShoppingSession;
};