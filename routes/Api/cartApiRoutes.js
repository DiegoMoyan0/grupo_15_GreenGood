//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartApiController = require('../../controllers/Api/cartApiControllers');


/*** @GET SHOPPING SESSION WITH THE CART ITEMS ***/ 
routes.get('/shoppingSession/:idUser/get', cartApiController.getShoppingSession);

/*** @GET ALL THE CART ITEMS ***/ 
routes.get('/allItems/:idUser/get', cartApiController.getCart);

/*** @POST CREATE A NEW SHOPPING SESSION***/ 
routes.get('/shoppingSession/:idUser/init', cartApiController.initShoppingSession);

/*** @POST NEW CART ITEM ADDED ***/ 
routes.post('/add', cartApiController.addCartItem);

/*** @PATCH EDIT QUANTITY OF ONE ITEM ***/ 
routes.patch('/:idCartItem/updateQuantity', cartApiController.modifQuantity);

/*** @DELETE REMOVE ONE CART ITEM ***/ 
routes.delete('/:idCartItem/delete', cartApiController.removeCartItem);


module.exports = routes;