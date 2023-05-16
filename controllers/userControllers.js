// Controladores de las vistas de login, post y register//


const userController = {
    getLogin: (req,res) => {
        return res.render('login');
    },
    getPost:(req,res) => {
        return res.render('post');
    },
    getRegister:(req,res) => {
        return res.render('register');
    },
    getSale:(req,res) => {
        return res.render('sale');
    }
}

// ------------------//

module.exports = userController;