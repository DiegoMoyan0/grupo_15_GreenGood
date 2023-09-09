const path = require('path');
const { body } = require('express-validator');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const passwordValidator = require("password-validator")

let schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

/* schema.validate(req.body.password, { details: true }) */

const validations = [

    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!').bail().isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres'),
    body('password_confirm')
        .notEmpty().withMessage('Tienes que ingresar nuevamente la contraseña!').bail()
        .custom((value, { req }) => {
            if (req.body.password !== req.body.password_confirm) {
                throw new Error('Las contraseñas deben ser identicas');
            };
            return true;
        }),
];

module.exports = validations;
