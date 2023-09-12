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
            defaultValue: 1, // Green Good as default manufacturer for any product by now.
            references: {
                model: 'manufacturers',
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
        },        
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), 
        },
        updated_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal(
              "NULL"),
        },

        //Pending to double-check if deleted_at requires any parameters while using paranoid
    };

    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid : true, // Pending to soft-delete 
        deletedAt: "deleted_at" 
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
            foreignKey: 'manufacturer_id',
            onDelete: 'CASCADE'
        });

        Product.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.CartItem, {
            as: 'product',
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.LikedProduct, {
            as: 'favproduct',
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });
        
        Product.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'product_id'
        });
        
    };

    return Product;
};