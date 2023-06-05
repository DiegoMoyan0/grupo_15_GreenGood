//*** Require's ***/

const express = require('express');
const routes = express.Router();
const multer = require('multer');
//const path = require('path');


// ************ Controller Require ************/
const productsController = require('../controllers/productsControllers');

// **** Config Disk Storage with Multer module ****/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb (null, './public/images/product');
    },

    filename: function (req, file, cb){
        cb (null, `img-${Date.now()}-${file.originalname}`);
    },
})

//const uploadFile = multer({storage});

//---------------------------------------------------------//

// routes hace un pedido, en el primer parametro deja en que vista lo quiere y con el segundo parametro utiliza el controlador que ya renderiza la vista// 


/*** GET ALL PRODUCTS ***/ 
routes.get('/list', productsController.getAllProducts);


/*** GET ONE PRODUCT ***/ 
routes.get('/:id/detail', productsController.getProductDetail);

/*** CREATE ONE PRODUCT ***/ 
routes.post('/', productsController.postProduct);

routes.get('/create', productsController.getCreate);


/*** EDIT ONE PRODUCT ***/ 
routes.get('/:id/edit', productsController.getProductEdit);

routes.get('/:id/update', productsController.getUpdate);

routes.put('/:id/update', productsController.updateProduct);

routes.get('/cart', productsController.getProductCart);

routes.get('/publications', productsController.getProductPublications);

///////////////////////////////////

/*** DELETE ONE PRODUCT ***/ 

routes.patch('/:id/edit-delete', productsController.softDeleteProduct);

routes.delete('/:id/edit-delete', productsController.hardDeleteProduct);

routes.delete('/:id/delete', productsController.deleteProduct);

///////////////////////////////////

//exportamos routes//
module.exports = routes;