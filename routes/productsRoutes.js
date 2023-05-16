const express = require('express');
const productRoutes = express.Router();

// Rutas raiz de las vistas de product, productCart y productDetail//

const productsController = require('../controllers/productsControllers');

productRoutes.get('/', productsController.getProduct);

productRoutes.get('/cart', productsController.getProductCart);

productRoutes.get('/detail', productsController.getProductDetail);

productRoutes.get('/sale', productsController.getProductSale);

productRoutes.get('/post', productsController.getProductPost);

//------------------------------//

module.exports = productRoutes;