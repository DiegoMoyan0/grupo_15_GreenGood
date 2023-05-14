const express = require('express');
const mainRouter = express.Router();

// Rutas raiz de las vistas del home, faqs e info//

const mainController = require('../controllers/mainControllers');

mainRouter.get('/', mainController.home);

mainRouter.get('/faqs', mainController.faqs);

mainRouter.get('/info', mainController.info); 



const productsController = require('../controllers/productsControllers');

mainRouter.get('/product', productsController.product);

mainRouter.get('/productCart', productsController.productCart);

mainRouter.get('/productDetail', productsController.productDetail);



const userController = require('../controllers/userControllers');

mainRouter.get('/login', userController.login);

mainRouter.get('/post', userController.post);

mainRouter.get('/register', userController.register);

mainRouter.get('/post', userController.post);

mainRouter.get('/sale', userController.sale);

//------------------------------//


module.exports = mainRouter;