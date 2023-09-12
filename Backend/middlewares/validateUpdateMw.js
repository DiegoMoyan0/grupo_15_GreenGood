const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('first_name').notEmpty().withMessage('Tienes que ingresar tu nombre/s tal cual figura en el DNI.'),
    body('last_name').notEmpty().withMessage('Tienes que ingresar tu apellido/s tal cual figura en el DNI.'),
    body('user_name').notEmpty().withMessage('Tienes que ingresar tu nombre de usuario!'),
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
        
            throw new Error('Debes ser mayor de 18 años');
        }),
    body('street').notEmpty().withMessage('Tienes que ingresar nombre de la calle.'),
    body('number').notEmpty().withMessage('Tienes que ingresar la numeración.'),
    body('city').notEmpty().withMessage('Tienes que ingresar la ciudad.'),
    body('province').notEmpty().withMessage('Tienes que ingresar la provincia.'),
    body('country').notEmpty().withMessage('Tienes que ingresar país.'),
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