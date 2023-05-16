
// Controladores de las vistas de home, faqs e info //


const mainController = {
    getHome: (req,res) => {
        return res.render('mainViews/home');
    },
    getFaqs:(req,res) => {
        return res.render('mainViews/faqs');
    },
    getInfo:(req,res) => {
        return res.render('mainViews/info');
    },
} 

// ------------------//

module.exports = mainController;