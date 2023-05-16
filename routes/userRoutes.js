const express = require('express');
const userRoutes = express.Router();

// Rutas raiz de las vistas del login, post e register//

const userController = require('../controllers/userControllers');

userRoutes.get('/login', userController.login);

userRoutes.get('/post', userController.post);

userRoutes.get('/register', userController.register);

userRoutes.get('/sale', userController.sale);

userRoutes.get('/post', userController.post);

//------------------------------//

module.exports = userRoutes;