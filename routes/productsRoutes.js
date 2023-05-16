const express = require('express');
const productRoutes = express.Router();

// Rutas raiz de las vistas de product, productCart y productDetail//

const productsController = require('../controllers/productsControllers');

productRoutes.get('/product', productsController.product);

productRoutes.get('/productCart', productsController.productCart);

productRoutes.get('/productDetail', productsController.productDetail);

//------------------------------//

module.exports = productRoutes;