///App Mw to render views with user logged data
let db = require("../database/models");

async function userLoggedMw(req, res, next) {

    try {
        
        if(req.session.userLogged){
            res.locals.isLogged = true; // Create local variable "isLogged" 
            res.locals.userLogged = req.session.userLogged;
            return next();
        };

        res.locals.isLogged = false; 
        let emailInCookie = req.cookies.userEmail;
        
        if (!emailInCookie) {
            return next();
        };

        let userFromCookie = await db.User.findOne(   
            {
                raw: true,
                nest: true,
                include: [
                    { association: 'address' },
                ],
                where:{email: emailInCookie}
            },
        );

        if(userFromCookie){
            delete userFromCookie.password;
            req.session.userLogged = userFromCookie;
        };
        
        if(req.session && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged; // User logged data to views
        };

        next();
            
    } catch (error) {
        console.log(error);
        res.redirect('/mainViews/error');
    };
    
};

module.exports = userLoggedMw;