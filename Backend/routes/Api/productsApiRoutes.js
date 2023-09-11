//*** Require's ***/

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const validationsCrudProducts = require('../../middlewares/validateCrudProductsMw');


// ************ Controller Require ************/
const productsApiController = require('../../controllers/Api/productsApiControllers');
const productsController = require('../../controllers/Api/productsApiControllers');


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

/*** @GET ALL PRODUCTS ***/ 
routes.get('/list', productsApiController.getAll);

/*** @GET LIST WITH PAGES OF PRODUCTS ***/ 
routes.get('/getPages', productsApiController.getPages);

/*** @GET PRODUCTS STATS ***/ 
routes.get('/stats', productsApiController.getAssociationsStats);

/*** @GET TOTALS OF SALES AMOUNTS PER MONTH ***/ 
routes.get('/stats/sales-amounts-per-month', productsApiController.getSalesAmountsPerMonth);

/*** @GET ALL PRODUCTS BY CATEGORY***/ 
routes.get('/list/category', productsApiController.getAllByCategory);

/*** @GET ALL PRODUCTS BY SUBCATEGORY***/ 
routes.get('/list/subcategory', productsApiController.getAllBySubcategory);

/*** @GET ALL PRODUCTS BY TYPE***/ 
routes.get('/list/type', productsApiController.getAllByType);

/*** @GET ONE PRODUCT DETAIL ***/ 
routes.get('/:id/detail', productsApiController.getDetail);

/*** @GET 10 of the latests created products ***/ 
routes.get('/newests', productsApiController.getNewests);

/*** @GET TOP 5 OF THE MOST SELLED PRODUCTS***/ 
routes.get('/mostSelled', productsApiController.getMostSelled);

/*** @GET LIST OF PRODUCTS WITH MORE THAN 14% OF DISCOUNT (DESC) ***/ 
routes.get('/sale', productsApiController.getSale);

/*** @POST / CREATE ONE PRODUCT ***/ 
routes.post('/create', uploadFile.single('image'),validationsCrudProducts, productsApiController.postCreate);

/*** @EDIT ONE PRODUCT ***/ 
routes.put('/:id/update',uploadFile.single('image'),validationsCrudProducts, productsApiController.putUpdate);

/*** @DELETE AND @PATCH (DISCONTINUE) ONE PRODUCT ***/ 
routes.patch('/:id/softdelete', productsApiController.softDelete);
routes.delete('/:id/delete', productsApiController.delete);


///////////////////////////////////

module.exports = routes;