// Controladores de las vistas de home, faqs e info, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {
    getHome: (req,res) => {
        return res.render('mainViews/home', {title: "Inicio"});
    },
    getFaqs:(req,res) => {
        return res.render('mainViews/faqs', {title: "Preguntas Frecuentes"});
    },
    getInfo:(req,res) => {
        return res.render('mainViews/info', {title: "Informacion"});
    }
} 
// exportamos el controller //
module.exports = controller;