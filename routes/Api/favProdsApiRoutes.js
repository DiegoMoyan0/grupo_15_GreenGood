//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const cartApiController = require('../../controllers/Api/favprodsApiControllers');


/*** @GET ALL FAV PRODUCTS ***/ 
routes.get('/all/:idUser/get', cartApiController.getAllByUser);

/*** @POST A NEW LIST OF FAV PRODUCTS***/ 
routes.post('/:idUser/store', cartApiController.storeFavProducts);

module.exports = routes;