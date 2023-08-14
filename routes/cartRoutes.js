//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartControllers = require('../controllers/cartControllers');
const authMw = require('../middlewares/authMw');


/*** @GET PRODUCTS CART SHOPPING VIEW ***/ 
routes.get('/',authMw, cartControllers.getCart);

/*** @POST NEW CART ITEM ADDED ***/ 
routes.post('/addCartItem/:id',authMw, cartControllers.newCartItem);

/*** @DELETE REMOVE ONE CART ITEM ***/ 
routes.delete('/:id/delete',authMw, cartControllers.removeCartItem);

/*** @EDIT QUANTITY OF ONE ITEM ***/ 
routes.put('/:id/updateQuantity',authMw, cartControllers.modifItemQuantity);


module.exports = routes;
