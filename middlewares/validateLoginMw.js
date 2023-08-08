const path = require('path');
const { body } = require('express-validator');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const validations = [
    body('email').notEmpty().withMessage('Tienes que ingresar tu e-mail o nombre de usuario!').isEmail().withMessage('Tienes que ingresar un e-mail valido')
    .custom(async (value, { req }) => {
        let emailInDb = await db.User.findOne(
            { where: { email: req.body.email } });
        if (!emailInDb) {
            throw new Error(`Ese e-mail no se ha encoetrado!`);
        };
        return true;
    }),
    
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
]

module.exports = validations;