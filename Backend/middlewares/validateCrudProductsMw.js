const path = require('path');
const { body } = require('express-validator');

const validations = [
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
    }),
    body('title').trim().notEmpty().withMessage('Tienes que ingresar un nombre para el producto!').bail().isLength({ min:5 }).withMessage('Debe tener al menos 5 caracteres'),
    body('description').trim().notEmpty().withMessage('Tienes que ingresar una descripcion para su producto!').bail().isLength({ min: 20 }).withMessage('Debe tener al menos 20 caracteres'),
    body('category').trim().notEmpty().withMessage('Tienes que seleccionar una categoría principal de tu producto'),
    body('subcategory').trim().notEmpty().withMessage('Tienes que seleccionar una sub-categoría para tu producto'),
    body('type').trim().notEmpty().withMessage('Tienes que seleccionar el tipo de producto'),
    body('price').trim().notEmpty().withMessage('Tienes que ingresar un precio').bail().custom((value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue) || parsedValue < 100 || parsedValue > 100000) {
          throw new Error('El precio debe estar comprendido entre $100 y $100000');
        }
        return true;
      }),
    body('discount').trim().notEmpty().withMessage('Tienes que indicar el porcentaje de descuento').bail().custom((value) => {
        const parsedValue = parseInt(value,10);
        if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 95) {
          throw new Error('El descuento debe estar comprendido entre el 0% y el 95%');
        }
        return true;
      }),
    body('stock').trim().notEmpty().withMessage('Tienes que ingresar el stock').bail().custom((value) => {
        const parsedValue = parseInt(value,10);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100000) {
          throw new Error('El stock del producto debe ser minimamente de 1 y hasta 100000 unidades');
        }
        return true;
      }),
    body('info').trim().isLength({ min: 2 }).withMessage('Debe ingresar un detalle válido').bail().isLength({ max: 100000000 }).withMessage('Has superado el máximo de caracteres permitidos (100000000)'),
]
module.exports = validations;