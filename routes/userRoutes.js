const express = require('express');
const routes = express.Router();

// Se importa el controlador de usuarios//
const userController = require('../controllers/userControllers');

// routes hace un pedido, en el primer parametro deja en que vista lo quiere y con el segundo parametro utiliza el controlador que ya renderiza la vista// 
routes.get('/login', userController.getLogin);

routes.get('/register', userController.getRegister);

//exportamos routes//
module.exports = routes;