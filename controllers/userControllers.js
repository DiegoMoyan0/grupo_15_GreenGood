// Controladores de las vistas de login, post y register//


const userController = {
    getLogin: (req,res) => {
        return res.render('UserViews/login', {title: "Login"});
    },
    getRegister:(req,res) => {
        return res.render('UserViews/register', {title: "Registro"});
    },
    
}

// ------------------//

module.exports = userController;