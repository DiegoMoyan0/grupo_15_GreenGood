const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('name_data').notEmpty().withMessage('Tienes que ingresar tu nombre completo!'),
    body('user_name').notEmpty().withMessage('Tienes que ingresar tu nombre de usuario!'),
    body('birthDate')
        .notEmpty().withMessage('Tienes que ingresar tu fecha de nacimiento!'),
    body('email')
        .notEmpty().withMessage('Tienes que ingresar tu e-mail!').bail()
        .isEmail().withMessage('Debes escribir un e-mail con formato valido'),
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
    body('password_confirm')
        .notEmpty().withMessage('Tienes que ingresar nuevamente la contraseña!').bail()
        .custom((value, {req}) => {
            if(req.body.password !== req.body.passwordConfirm){
                throw new Error('Las contraseñas deben ser identicas');
            };
            return true;
        }),
    body('adress').notEmpty().withMessage('Tienes que ingresar tu dirección!'),
    body('user_image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if(file){
            let extension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(extension)) {
                throw new Error(`Tienes que subir una foto en formato ${acceptedExtensions.join(', ')}`);
            };
        };
        return true;
    }),
    body('user_type').notEmpty().withMessage('Tienes que decirnos que tipo de usuario sos!') 
];

module.exports = validations;