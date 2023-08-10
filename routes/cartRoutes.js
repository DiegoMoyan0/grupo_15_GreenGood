//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartControllers = require('../controllers/cartControllers');


/*** @GET PRODUCTS CART SHOPPING VIEW ***/ 
routes.get('/', cartControllers.getCart);


module.exports = routes;
