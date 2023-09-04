// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require("../database/models");


// ************ Controller Require ************
const userController = require('../controllers/userControllers');
const validationsRegisterMw = require('../middlewares/validateRegisterMw');
const validationsLoginMw = require('../middlewares/validateLoginMw');
const validationsUpdateMw = require('../middlewares/validateUpdateMw');
const validationsUserLoggedMw = require('../middlewares/userLoggedMw');
const guestMw = require('../middlewares/guestMw');
const authMw = require('../middlewares/authMw');


// **** Config Disk Storage with Multer module ****/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb (null, './public/images/users');
    },

    filename: function (req, file, cb){
        cb (null, `img-user-${Date.now()}-${file.originalname}`);
    },
})

const uploadPhoto = multer({storage});

//---------------------------------------------------------//

/*** GET FORMS ***/ 
router.get('/login', guestMw, userController.getLogin); 
router.get('/register', guestMw, userController.getRegister);
router.get('/profile', authMw, validationsUserLoggedMw, userController.getProfile);  
router.get('/favs', authMw, validationsUserLoggedMw, userController.getUserFavs);  
router.get('/logout', authMw, userController.getLogout);  


/*** POST FORMS ***/ 
router.post('/entry',validationsLoginMw, userController.loginUser); 
router.post('/register', uploadPhoto.single('user_image'), validationsRegisterMw, userController.registerUser);
router.put('/:id/update', uploadPhoto.single('user_image'), validationsUpdateMw, userController.updateUser);

router.delete('/:id/delete', userController.hardDeleteUser);

module.exports = router;
