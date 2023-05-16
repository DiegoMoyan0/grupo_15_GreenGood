// Controladores de las vistas de login, post y register//


const userController = {
    getLogin: (req,res) => {
        return res.render('UserViews/login');
    },
    getRegister:(req,res) => {
        return res.render('UserViews/register');
    },
    
}

// ------------------//

module.exports = userController;