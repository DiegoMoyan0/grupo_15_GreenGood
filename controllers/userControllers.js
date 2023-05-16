// Controladores de las vistas de login, post y register//


const userController = {
    getLogin: (req,res) => {
        return res.render('UserViews/login');
    },
    getPost:(req,res) => {
        return res.render('productsViews/post');
    },
    getRegister:(req,res) => {
        return res.render('UserViews/register');
    },
    getSale:(req,res) => {
        return res.render('productsViews/sale');
    }
}

// ------------------//

module.exports = userController;