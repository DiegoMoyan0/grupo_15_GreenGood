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
                model: 'products',
                key: 'id'
            } 
        },
        user_id: {
            type: DataTypes.STRING(255),  
            allowNull: true, 
            references: {
                model: 'user',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'liked_products',
        timestamps: false
    };

    const LikedProduct = sequelize.define(alias, cols, config);

    LikedProduct.associate = models => {

        LikedProduct.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
        LikedProduct.belongsTo(models.Product, {
            as: 'favproduct',
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        }); 
    };

    return LikedProduct;
};