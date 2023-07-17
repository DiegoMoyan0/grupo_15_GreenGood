const { v4: UUIDV4} = require('uuid');
const bcrypt = require('bcryptjs');
const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const alias = 'User';

    const cols = {
        id: {
            type: DataTypes.UUID, //SQL == CHAR(36) BINARY
            defaultValue: Sequelize.UUIDV4 ,
            primaryKey: true,
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
            allowNull: false,   
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

    // Hook to hash user password before register:

    User.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
    });

    //----------------------------//


    User.associate = models => {
        
    };

    return User;
};