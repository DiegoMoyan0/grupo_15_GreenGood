const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('email').notEmpty().withMessage('Tienes que ingresar tu e-mail o nombre de usuario!'),
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
]

module.exports = validations;