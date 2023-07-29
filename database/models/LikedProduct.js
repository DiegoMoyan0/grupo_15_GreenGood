module.exports = (sequelize, DataTypes) => {
    const alias = 'LikedProduct';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'product',
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
        tableName: 'liked_products',
        timestamps: false
    };

    const LikedProduct = sequelize.define(alias, cols, config);

    return LikedProduct;
};