
let db = require("../database/models");
const Op = db.Sequelize.Op;

// Controladores de las vistas de home, faqs e info, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {
    
    getHome: async (req,res) => {

        try {
            const products = await db.Product.findAll({
                raw: true,
                nest: true,
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
                },
            );

            //-------To render only the name values of associated tables
            products.forEach(product => {
                product.category = product.category.name;
                product.subcategory = product.subcategory.name;
                product.type = product.type.name;
                product.manufacturer = product.manufacturer.name;
            });

            return res.render('mainViews/home', {
                title: "Inicio",
                products
            });

        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };   
    },
    
    getSearch: async (req, res) => {

        const searchTerm = req.query.product

        try {
            const searchedProducts = await db.Product.findAll({
                raw: true,
                nest: true,
                where: {
                    description: { [Op.like]: `%${searchTerm}%` }
                },
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
            }
            );

            res.render("mainViews/search", { results: searchedProducts, title: 'Resultados de tu busqueda', searchTerm: searchTerm });
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET SEARCH."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getFaqs:(req,res) => {
        return res.render('mainViews/faqs', {title: "Preguntas Frecuentes"});
    },

    getInfo:(req,res) => {
        return res.render('mainViews/info', {title: "Informacion"});
    },
} 
// exportamos el controller //
module.exports = controller;