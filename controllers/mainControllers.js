
// Controladores de las vistas de home, faqs e info //


const mainController = {
    getHome: (req,res) => {
        return res.render('mainViews/home', {title: "Inicio"});
    },
    getFaqs:(req,res) => {
        return res.render('mainViews/faqs', {title: "Preguntas Frecuentes"});
    },
    getInfo:(req,res) => {
        return res.render('mainViews/info', {title: "Informacion"});
    },
} 

// ------------------//

module.exports = mainController;