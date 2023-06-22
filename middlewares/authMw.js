//Para impedir el acceso a profile cuando el usuario NO inicio session

function authMw(req, res, next) {
    if(!req.session.userLogged){
        return res.redirect('/users/login');
    };

    next();
}

module.exports = authMw;