const express = require('express');
const mainRoutes = express.Router();

// Rutas raiz de las vistas del home, faqs e info//

const mainController = require('../controllers/mainControllers');

mainRoutes.get('/', mainController.getHome);

mainRoutes.get('/faqs', mainController.getFaqs);

mainRoutes.get('/info', mainController.getInfo); 


//------------------------------//


module.exports = mainRoutes;