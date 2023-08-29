const fs = require('fs');
const path = require('path');
let db = require("../database/models");

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
    

    getFaqs:(req,res) => {
        return res.render('mainViews/faqs', {title: "Preguntas Frecuentes"});
    },


    getInfo:(req,res) => {
        return res.render('mainViews/info', {title: "Informacion"});
    }
} 
// exportamos el controller //
module.exports = controller;