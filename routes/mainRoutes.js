const express = require('express');
const mainRoutes = express.Router();

// Rutas raiz de las vistas del home, faqs e info//

const mainController = require('../controllers/mainControllers');

mainRoutes.get('/', mainController.home);

mainRoutes.get('/faqs', mainController.faqs);

mainRoutes.get('/info', mainController.info); 


//------------------------------//


module.exports = mainRoutes;