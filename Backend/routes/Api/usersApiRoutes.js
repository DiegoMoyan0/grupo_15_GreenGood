//*** Require's ***/
const express = require('express');
const routes = express.Router();
const multer = require('multer');


// ************ Controller Require ************
const validationsRegisterMw = require('../../middlewares/validateRegisterMw');
const validationsUpdateMw = require('../../middlewares/validateUpdateMw');

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

const uploadPhoto = multer({storage});

//---------------------------------------------------------//

/*** @GET EXISTING EMAIL OR USERNAME CONFIRMATION ***/ 
routes.get('/verify-email', userApiController.verifyEmail)

/*** @GET ALL USERS WITH LIMITED FIELDS ***/ 
routes.get('/users', userApiController.getAll)

/*** @GET ALL USERS WITH ALL FIELDS ***/ 
routes.get('/full-list', userApiController.getUsersList)

/*** @GET USER BY ID WITH LIMITED DETAILS***/ 
routes.get('/users/:id', userApiController.getUserById)

/*** @GET USER BY ID ALL LIMITED DETAILS***/ 
routes.get('/users/:id/detail', userApiController.getUserDetailById)

/*** @GET USER IMAGE BY ID ***/ 
routes.get('/image/:id', userApiController.getUserImageById)

/*** @GET LAST USER REGISTERED ***/ 
routes.get('/last-registered', userApiController.GetLastRegistered)

/*** @GET MONTHLY REGISTERED USERS ***/ 
routes.get('/monthly-registrations', userApiController.GetMonthlyRegistrations)

/*** @GET USER COUNT BY TYPE ***/ 
routes.get('/type-count', userApiController.getUserByType)

/*** @GET USERS PURCHASES BY PROVINCE ***/ 
routes.get('/province-sum', userApiController.getProvinceSum)

/*** @GET USERS PURCHASES BY COUNTRY ***/ 
routes.get('/country-sum', userApiController.getCountrySum)

/*** @GET REGISTERED USERS BY COUNTRY***/ 
routes.get('/users-per-country', userApiController.getUserCountry)

/*** @GET REGISTERED USERS BY PROVINCE***/ 
routes.get('/users-per-province', userApiController.getUserProvince)

/*** @PUT UPDATE USER PROFILE INFO ***/ 
routes.put('/users/:id/update', uploadPhoto.single('user_image'), validationsUpdateMw, userApiController.updateUser);

/*** @POST REGISTER USER ***/ 
routes.post('/register', uploadPhoto.single('user_image'), validationsRegisterMw, userApiController.registerUser);

/*** @DELETE USER ***/ 
routes.delete('/:id/delete', userApiController.hardDeleteUser);



module.exports = routes;