//To avoid entring to user profile if not logged

function authMw(req, res, next) {
    if(!req.session.userLogged){
        return res.redirect('/users/login');
    };

    next();
}

module.exports = authMw;