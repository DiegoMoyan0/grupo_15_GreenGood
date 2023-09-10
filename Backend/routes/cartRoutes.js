//*** Require's ***/
const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartControllers = require('../controllers/cartControllers');
const authMw = require('../middlewares/authMw');


/*** @GET PRODUCTS CART SHOPPING VIEW ***/ 
routes.get('/', cartControllers.getCart);

/*** @GET PRODUCTS CART SHOPPING VIEW ***/ 
routes.get('/generate-order/:idOrderDetail', cartControllers.generateOrderPDF);


module.exports = routes;
