//*** Require's ***/

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const validationsCrudProducts = require('../middlewares/validateCrudProductsMw');


// ************ Controller Require ************/
const productsController = require('../controllers/productsControllers');

// --- Config Disk Storage with Multer module ---/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb (null, './public/images/products');
    },

    filename: function (req, file, cb){
        cb (null, `img-${Date.now()}-${file.originalname}`);
    },
})

const uploadFile = multer({storage});



//---------------------------------------------------------//


/*** @GET ALL PRODUCTS VIEW ***/ 
routes.get('/list', productsController.getAllProducts);


/*** @GET ONE PRODUCT DETAIL VIEW ***/ 
routes.get('/:id/detail', productsController.getProductDetail);


/*** @GET PRODUCTS PUBLICATIONS VIEW ***/ 
routes.get('/publications', productsController.getProductPublications);


/*** @POST / CREATE ONE PRODUCT ***/ 
routes.post('/create', uploadFile.single('image'),validationsCrudProducts, productsController.createProduct);


/*** @EDIT ONE PRODUCT ***/ 
routes.put('/:id/update',uploadFile.single('image'),validationsCrudProducts, productsController.updateProduct);


/*** @DELETE AND @PATCH ONE PRODUCT ***/ 

routes.patch('/:id/edit-delete', productsController.softDeleteProduct);

routes.patch('/:id/detail-delete', productsController.softDeleteProductDetail);

routes.delete('/:id/delete', productsController.hardDeleteProduct);


///////////////////////////////////


module.exports = routes;