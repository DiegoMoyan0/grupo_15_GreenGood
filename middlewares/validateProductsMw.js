const path = require('path');
const { body } = require('express-validator');

const validations = [

    body('title').notEmpty().withMessage('Tienes que ingresar un nombre para el producto!').bail().isLength({ min:5 }).withMessage('Debe tener al menos 5 caracteres'),
    ,
    body('description').notEmpty().withMessage('Tienes que ingresar un nombre de descripcion para el producto!').bail().isLength({ min: 20 }).withMessage('Debe tener al menos 20 caracteres'),
        
    body('image').optional().custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (file) {
            let extension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(extension)) {
                throw new Error(`Tienes que subir una foto en formato ${acceptedExtensions.join(', ')}`);
            };
        };
        return true;
    })
]
module.exports = validations;