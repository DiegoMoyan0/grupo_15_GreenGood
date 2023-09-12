const express = require('express');
const routes = express.Router();

// Se importa el controlador de main//
const mainController = require('../controllers/mainControllers');

// routes hace un pedido, en el primer parametro deja en que vista lo quiere y con el segundo parametro utiliza el controlador que ya renderiza la vista//
routes.get('/', mainController.getHome);

routes.get('/faqs', mainController.getFaqs);

routes.get('/info', mainController.getInfo); 

/*** @GET SEARCHED PRODUCTS ***/ 
routes.get('/search', mainController.getSearch);

//exportamos routes//
module.exports = routes;