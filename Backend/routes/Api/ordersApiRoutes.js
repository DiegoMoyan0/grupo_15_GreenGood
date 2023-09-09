//*** Require's ***/

const express = require('express');
const routes = express.Router();

// ************ Controller Require ************/
const ordersApiController = require('../../controllers/Api/ordersApiControllers');


/*** @GET ALL FINISHED SHOPPING SESSIONS BY ONE USER ***/ 
routes.get('/shoppingSession/:idUser/getLast', ordersApiController.getLastFinishedShoppingSessions);

/*** @GET ALL USER PAYMENTS ***/ 
routes.get('/payments/:idUser/get', ordersApiController.getUserPayments);

/*** @GET ALL USER ADRESSES ***/ 
routes.get('/addresses/:idUser/get', ordersApiController.getUserAddresses);

/*** @POST CREATE A NEW PAYMENT***/ 
routes.post('/payments/:idUser/create', ordersApiController.addPayment);

/*** @POST A NEW PURCHASE ORDER***/ 
routes.post('/:idUser/create', ordersApiController.createOrder);

/*** @GET THE PURCHASE ORDER***/ 
routes.get('/:idOrder/get', ordersApiController.getOrder);


module.exports = routes;