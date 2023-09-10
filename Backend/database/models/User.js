const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const alias = 'User';

    const cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(), // To generate an UUID automatically when creating a new user
            primaryKey: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identity_document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordResetToken:{
            type: DataTypes.STRING, 
            defaultValue: null, 
          },
        resetTokenExpiration:   {
        type: DataTypes.DATE, 
        defaultValue: null, 
        },
    };

    const config = {
        tableName: 'users',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      //  paranoid : true,  
        deletedAt: "deleted_at" 
    };

    const User = sequelize.define(alias, cols, config);

    //----------------------------//


    User.associate = models => {

        User.hasMany(models.Product, {
            as: 'user',
            foreignKey: 'user_id'
        })
        User.hasOne(models.Address, {
            as: 'address',
            foreignKey: 'user_id',
            onDelete: 'CASCADE',  // This ensures that when a user is deleted, the associated address is also deleted.
        });
        User.hasMany(models.ShoppingSession, {
            as: 'shoppingSessions',
            foreignKey: 'user_id',
        });
        User.hasMany(models.LikedProduct, {
            as: 'favproducts',
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });    
        User.hasMany(models.OrderDetail, {
            as: 'ordersDetail',
            foreignKey: 'user_id',
        });  
  
    };

    return User;
};