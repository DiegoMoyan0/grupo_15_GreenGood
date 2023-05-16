const express = require('express');
const productRoutes = express.Router();

// Rutas raiz de las vistas de product, productCart y productDetail//

const productsController = require('../controllers/productsControllers');

productRoutes.get('/product', productsController.getProduct);

productRoutes.get('/productCart', productsController.getProductCart);

productRoutes.get('/productDetail', productsController.getProductDetail);

//------------------------------//

module.exports = productRoutes;