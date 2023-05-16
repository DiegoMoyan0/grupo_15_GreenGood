const express = require('express');
const productRoutes = express.Router();

// Rutas raiz de las vistas de product, productCart y productDetail//

const productsController = require('../controllers/productsControllers');

productRoutes.get('/', productsController.getProduct);

productRoutes.get('/cart', productsController.getProductCart);

productRoutes.get('/detail', productsController.getProductDetail);

//------------------------------//

module.exports = productRoutes;