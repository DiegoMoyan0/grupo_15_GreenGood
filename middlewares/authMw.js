//To avoid entering to user profile if not logged

function authMw(req, res, next) {

    if(!req.session.userLogged){
        return res.redirect('/user/login');
    }
    
    next();
}

module.exports = authMw;