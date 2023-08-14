///App Mw to render views with user logged data
let db = require("../database/models");
const Op = db.Sequelize.Op;

const userModel = require('../models/User.js');

async function userLoggedMw(req, res, next) {

    try {
        res.locals.isLogged = false; // Create local variable "isLogged" on FALSE

        let emailInCookie = req.cookies.userEmail;

        
        if (!emailInCookie) {
            return next()
        }


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
            
        // let userType = await db.User.findOne(
        // 	{where:{user_type: req.body.user_type}});

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