const express = require('express');
const userRoutes = express.Router();

// Rutas raiz de las vistas del login, post e register//

const userController = require('../controllers/userControllers');

userRoutes.get('/login', userController.getLogin);

userRoutes.get('/register', userController.getRegister);

//------------------------------//

module.exports = userRoutes;