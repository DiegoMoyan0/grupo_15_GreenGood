const path = require('path');
const { body } = require('express-validator');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const validations = [
    body('email').notEmpty().withMessage('Tienes que ingresar tu e-mail o nombre de usuario!')
    .custom(async (value, { req }) => {

        let emailInDb = ''

        if (req.body.email.indexOf('@') > -1) {
            //Search user by email first
            emailInDb = await db.User.findOne({
                where: { email: req.body.email },
            });
        } else {
            //Search user by username
            emailInDb = await db.User.findOne({
                where: { username: req.body.email },
            });
        };

        if (!emailInDb) {
            throw new Error(`Ese e-mail no se ha encontrado!`);
        };
        return true;
    }),
    
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
]

module.exports = validations;