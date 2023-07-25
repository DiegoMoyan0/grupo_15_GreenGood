const path = require('path');
const { body } = require('express-validator');
// const userModel = require('../models/User.js');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const validations = [
    body('name_data').notEmpty().withMessage('Tienes que ingresar tu nombre completo!'),
    body('user_name').notEmpty().withMessage('Tienes que ingresar tu nombre de usuario!').bail()
        .custom (async (value,{req}) => {
            let userNameInDb = await db.User.findOne(
				{where:{username: req.body.user_name}});
            if(userNameInDb){
                throw new Error('Nombre de usuario ya existente, prueba con otro.');
            };
            return true;
        }),
    body('birth_date').notEmpty().withMessage('Tienes que ingresar tu fecha de nacimiento!'),
    body('email')
        .notEmpty().withMessage('Tienes que ingresar tu e-mail!').bail()
        .trim().isEmail().withMessage('Debes escribir un e-mail con formato valido').bail()
        .custom(async(value, {req}) => {
            let emailInDb = await db.User.findOne(
                {where:{email: req.body.email}});
            if(emailInDb){
                throw new Error(`Ese e-mail ya se encuentra registrado!`);
            };
            return true;
        }),
    body('address').notEmpty().withMessage('Tienes que ingresar tu dirección!'),
    body('phone').optional().isMobilePhone().withMessage('El formato de nro. de tel. celular no es válido'),
    body('password').notEmpty().withMessage('Tienes que ingresar una contraseña!'),
    body('password_confirm')
        .notEmpty().withMessage('Tienes que ingresar nuevamente la contraseña!').bail()
        .custom((value, {req}) => {
            if(req.body.password !== req.body.password_confirm){
                throw new Error('Las contraseñas deben ser identicas');
            };
            return true;
        }),
    body('address').notEmpty().withMessage('Tienes que ingresar tu dirección!'),
    body('user_image').optional().custom((value, {req}) => {
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