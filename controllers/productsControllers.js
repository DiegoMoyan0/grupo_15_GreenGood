
const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');


const controller = {

    // -------Render procutcs Views by GET------- //

    getAllProducts: (req, res) => {
        const products = productModel.findAll();

        return res.render('productsViews/products-list', {
            title: "Todos los productos",
            products
        });
    },

    getProductCart: (req, res) => {
        return res.render('productsViews/shopping-cart', { 
            title: "Carrito de Compras" 
        });
    },

    getProductDetail: (req, res) => {
        let id = Number(req.params.id);

        let theProduct = productModel.findById(id);

        if (!theProduct) {
            let message = 'El producto que buscas no se encuentra disponible en estos momentos o se ha eliminado';
            return res.send(message);
        };

        return res.render('productsViews/detail', {
            title: theProduct.title,
            theProduct
        });
    },

    getProductPublications: (req, res) => {
        const products = productModel.findAll();

        return res.render('productsViews/products-publications', { 
            title: "Productos publicados",
            products
        });

    },

       
    // -------Products managment controllers------- //
    

    createProduct: (req, res) => {
        let newData = req.body;

        newData.price = Number(newData.price);
        newData.discount = Number(newData.discount);
        newData.salesAmount = Number(newData.salesAmount);
        newData.image = req.file ? req.file.filename : "sin foto";

        productModel.createOne(newData);

        res.redirect('/product/publications');
    },


    updateProduct: (req, res) => {
        let id = Number(req.params.id);
        let newData = req.body;

        newData.price = Number(newData.price);
        newData.discount = Number(newData.discount);
        newData.salesAmount = Number(newData.salesAmount);
        newData.image = req.file.filename;
        if(newData.deleted == "false"){
            newData.deleted = false;
        }else if(newData.deleted == "true"){
            newData.deleted = true;
        };
        
        productModel.updateById(id, newData);
        
        res.redirect('/product/publications');
    },
    
    
    softDeleteProduct: (req, res) => {
        
        let id = Number(req.params.id);
        let softDeletedProduct = productModel.softDeleteById(id);
        
        if (softDeletedProduct) {
            res.send("El producto: " + softDeletedProduct.title + " fue removido existosamente");
            
        } else {
            return res.send("Error, el producto: " + softDeletedProduct.title + " fue removido existosamente");
        };

        return res.redirect('/product/publications');
    },
    
    
    hardDeleteProduct: (req, res) => {
        
        let id = Number(req.params.id);
        let hardDeletedProduct = productModel.deleteById(id);
        
        res.send("El producto fue eliminado exitosamente de la base de datos");

        return res.redirect('/product/publications');
    },      
};


///////////////////////////////////////

module.exports = controller;