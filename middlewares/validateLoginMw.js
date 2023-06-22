const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('user_name').notEmpty().withMessage('Tienes que ingresar tu nombre de usuario!'),
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
]

module.exports = validations;