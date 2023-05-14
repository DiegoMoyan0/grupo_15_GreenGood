// Controladores de las vistas de login, post y register//


const userController = {
    login: (req,res) => {
        return res.render('login');
    },
    post:(req,res) => {
        return res.render('post');
    },
    register:(req,res) => {
        return res.render('register');
    },
    post:(req,res) => {
        return res.render('post');
    },
    sale:(req,res) => {
        return res.render('sale');
    }
}

// ------------------//

module.exports = userController;