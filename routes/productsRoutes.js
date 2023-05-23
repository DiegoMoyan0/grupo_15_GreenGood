const express = require('express');
const routes = express.Router();

// Se importa el controlador de productos//
const productsController = require('../controllers/productsControllers');

// routes hace un pedido, en el primer parametro deja en que vista lo quiere y con el segundo parametro utiliza el controlador que ya renderiza la vista// 
routes.get('/', productsController.getProduct);

routes.get('/cart', productsController.getProductCart);

routes.get('/detail', productsController.getProductDetail);

routes.get('/sale', productsController.getProductSale);

//exportamos routes//
module.exports = routes;