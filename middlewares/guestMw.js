//Avoid entering to a route if user is logged

function guestMw(req, res, next) {
    if(req.session.userLogged){
        return res.redirect('/user/profile');
    };
    next();
}

module.exports = guestMw;