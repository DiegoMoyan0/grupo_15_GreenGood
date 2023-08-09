const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { Sequelize } = require("sequelize")

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
        }
    };

    const config = {
        tableName: 'users',
        timestamps: false
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
            onDelete: 'CASCADE',  // Esto asegura que si se elimina un usuario, también se elimine su dirección asociada
        });
        User.hasOne(models.ShoppingSession, {
            as: 'shoppingSession',
            foreignKey: 'shopping_session_id',
            onDelete: 'CASCADE',  
        });
    };

    return User;
};