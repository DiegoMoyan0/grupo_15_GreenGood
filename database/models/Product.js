module.exports = (sequelize, DataTypes) => {
    const alias = 'Product';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        info: {
            type: DataTypes.STRING(100000),
            allowNull: false,  
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,   
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,   
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,   
        },
        sales_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,   
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'categories',
                key: 'id'
            }  
        },
        subcategory_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: 'subcategories',
                key: 'id'
            }  
        },
        manufacturer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1, // Green Good as default manufacturer for any product.
            references: {
                model: 'manufacturers',
                key: 'id'
            }  
        },
        user_id: {
            type: DataTypes.INTEGER,  // Pending to change Data type to one that allows UUID
            allowNull: true, // Pending to delete this property after testing
            references: {
                model: 'users',
                key: 'id'
            }  
        }
    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsTo(models.Subcategory, {
            as: 'subcategory',
            foreignKey: 'subcategory_id'
        });

        Product.belongsTo(models.Type, {
            as: 'type',
            foreignKey: 'type_id'
        });
        
        Product.belongsTo(models.Manufacturer, {
            as: 'manufacturer',
            foreignKey: 'manufacturer_id'
        });

        Product.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        
    };

    return Product;
};