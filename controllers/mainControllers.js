
// Controladores de las vistas de home, faqs e info //


const mainController = {
    home: (req,res) => {
        return res.render('home');
    },
    faqs:(req,res) => {
        return res.render('faqs');
    },
    info:(req,res) => {
        return res.render('info');
    },
} 

// ------------------//

module.exports = mainController;