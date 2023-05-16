
// Controladores de las vistas de home, faqs e info //


const mainController = {
    getHome: (req,res) => {
        return res.render('home');
    },
    getFaqs:(req,res) => {
        return res.render('faqs');
    },
    getInfo:(req,res) => {
        return res.render('info');
    },
} 

// ------------------//

module.exports = mainController;