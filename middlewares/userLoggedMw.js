//App Mw to render views with user logged data

const userModel = require('../models/User.js');

function userLoggedMw(req, res, next) {
    
    res.locals.isLogged = false; // Create local variable "isLogged" on FALSE

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = userModel.findByFiled('email', emailInCookie);
    let userType = userModel.findByFiled('user_type', req.body.user_type);

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    };
    
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; // User logged to views
    };

    

    next();
}

module.exports = userLoggedMw;