//Avoid entring to a route if user is logged

function guestMw(req, res, next) {
    if(req.session.userLogged){
        return res.redirect('/users/profile');
    };

    next();
}

module.exports = guestMw;