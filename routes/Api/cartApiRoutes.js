//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartApiController = require('../../controllers/Api/cartApiControllers');


/*** @GET PRODUCTS CART SHOPPING VIEW ***/ 
routes.get('/', cartApiController.getCart);

/*** @POST NEW CART ITEM ADDED ***/ 
routes.post('/add', cartApiController.addCartItem);

/*** @DELETE REMOVE ONE CART ITEM ***/ 
routes.delete('/:id/delete', cartApiController.removeCartItem);

/*** @PATCH EDIT QUANTITY OF ONE ITEM ***/ 
routes.patch('/:id/updateQuantity', cartApiController.modifItemQuantity);


module.exports = routes;