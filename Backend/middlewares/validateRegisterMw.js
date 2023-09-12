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
    body('first_name').notEmpty().withMessage('Tienes que ingresar tu nombre/s tal cual figura en el DNI.').bail().isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Tienes que ingresar tu apellido/s tal cual figura en el DNI.').bail().isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),
    body('user_name').notEmpty().withMessage('Tienes que ingresar tu nombre de usuario!').bail().isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres')
        .custom(async (value, { req }) => {
            let userNameInDb = await db.User.findOne(
                { where: { username: req.body.user_name } });
            if (userNameInDb) {
                throw new Error('Nombre de usuario ya existente, prueba con otro.');
            };
            return true;
        }),
    body('birth_date').notEmpty().isDate().withMessage('Tienes que ingresar tu fecha de nacimiento!').bail()
        .custom((value) => {
            let birthday = new Date(value);
            let today = new Date();
            let age = today.getFullYear() - birthday.getFullYear();
            let monthDiff = today.getMonth() - birthday.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
                age--;
            }

            if (age >= 18) {
                return true;
            }

            throw new Error('Debes ser mayor de 18 años para registrarte');
        }),
    body('email')
        .notEmpty().withMessage('Tienes que ingresar tu e-mail!').bail()
        .trim().isEmail().withMessage('Debes escribir un e-mail con formato valido').bail()
        .custom(async (value, { req }) => {
            let emailInDb = await db.User.findOne(
                { where: { email: req.body.email } });
            if (emailInDb) {
                throw new Error(`Ese e-mail ya se encuentra registrado!`);
            };
            return true;
        }),
    body('identity_document').notEmpty().isNumeric().isLength({ min: 7 }).withMessage('El formato del documento de identidad no es válido'),
    body('street').notEmpty().withMessage('Tienes que ingresar nombre de la calle.'),
    body('number').notEmpty().withMessage('Tienes que ingresar la numeración.'),
    body('city').notEmpty().withMessage('Tienes que ingresar la ciudad.'),
    body('province').notEmpty().withMessage('Tienes que ingresar la provincia.'),
    body('country').notEmpty().withMessage('Tienes que ingresar país.'),
    body('phone').optional().isMobilePhone().withMessage('El formato de nro. de tel. celular no es válido'),
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!').bail().isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres'),
    body('password_confirm')
        .notEmpty().withMessage('Tienes que ingresar nuevamente la contraseña!').bail()
        .custom((value, { req }) => {
            if (req.body.password !== req.body.password_confirm) {
                throw new Error('Las contraseñas deben ser identicas');
            };
            return true;
        }),
    body('user_image').optional().custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (file) {
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
