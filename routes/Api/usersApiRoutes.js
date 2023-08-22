//*** Require's ***/

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const validationsCrudProducts = require('../../middlewares/validateCrudProductsMw');


// ************ Controller Require ************/
const userApiController = require('../../controllers/Api/usersApiControllers');


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

/*** @GET EXISTING EMAIL OR USERNAME CONFIRMATION ***/ 

routes.get('/verify-email', userApiController.verifyEmail)

module.exports = routes;