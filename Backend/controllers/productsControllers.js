const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;


const controller = {
    // -------Render product Views by GET------- //

    getAllProducts: async (req, res) => {

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

            return res.render('productsViews/products-list', {
                title: "Todos los productos",
                products: products
            });

        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }
    },

    // ----------------------- //

    getProductDetail: async (req, res) => {

        try {

            let id = Number(req.params.id);
            const theProduct = await db.Product.findByPk(id, {
                raw: true,
                nest: true,
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
                });

            if (!theProduct) {
                return res.redirect('/mainViews/error')
            };

            if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
                return res.render('productsViews/detail', {
                    title: theProduct.title,
                    theProduct,
                    vendedor: false
                });

            } else {

                if (req.session.userLogged.type === 'Comprador') {
                    return res.render('productsViews/detail', {
                        title: theProduct.title,
                        theProduct,
                        vendedor: false,
                    });
                };

                if (req.session.userLogged.type === 'Vendedor') {

                    return res.render('productsViews/detail', {
                        title: theProduct.title,
                        theProduct,
                        vendedor: true
                    });
                };
            };

        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };

    },

    //Render the view where sellers-users can create, update and delete their own products 
    
    getProductPublications: async (req, res) => {

        
        if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
            return res.render('userViews/login', { title: "Login" });

        } else {
        

            //temporary line 

           // type  = 'Vendedor';

            ///



           if (req.session.userLogged.type === 'Comprador') {

            //temporary line 

         //  if (type === 'Comprador') {

            //

                return res.render('userViews/profile', {
                    title: "Tu perfil de usuario",
                    user: req.session.userLogged,
                    error: true
                });

            };

            if (req.session.userLogged.type === 'Vendedor') {

            //temporary line 

             // if (type === 'Vendedor') {

                try {
                   let allProducts = await db.Product.findAll(

                    //temporary line 

                    //let products = await db.Product.findAll(
                    
                    {
                        raw: true,
                        nest: true,
                        include: [
                            { association: 'category' },
                            { association: 'subcategory' },
                            { association: 'type' },
                            { association: 'manufacturer' },
                            { association: 'user' }
                        ],
                    });

                        

                    let userSellerProducts = allProducts.filter(function(products){
                        return products.user_id === req.session.userLogged.id;
                    });
     
                    let products = userSellerProducts;
                    

                    let categories = await db.Category.findAll({raw: true});
                    let subcategories = await db.Subcategory.findAll({raw: true});
                    let types = await db.Type.findAll({raw: true});
                    let manufacturers = await db.Manufacturer.findAll({raw: true});
        
                    return res.render('productsViews/products-publications', {
                        title: "Productos publicados",
                        products,
                        categories,
                        subcategories,
                        types,
                        manufacturers 
                    });
                    
                } catch (error) {
                    console.log(error);
                    res.redirect('/mainViews/error');
                };

            };

        };

    },

    // --------------------------------------------------------- //


    // -------Products managment controllers------- //

    createProduct: async (req, res) => {
    
        try {
            /* Previous validations to create a new product */
		    const resultsValidations = validationResult(req);

            if (resultsValidations.errors.length > 0) {
                return res.json(resultsValidations.errors)
            };

            let newData = req.body;

            await db.Product.create({
                title : newData.title,
                description : newData.description,
                info: newData.info,
                stock: Number(newData.stock),
                price : Number(newData.price),
                discount : Number(newData.discount),
                sales_amount : 0,
                image : req.file ? req.file.filename : "default-product-image.jpg",
                category_id: Number(newData.category),
                subcategory_id: Number(newData.subcategory),
                type_id: Number(newData.type),
                user_id: req.session.userLogged.id,
                manufacturer_id: 1 // Only "Green Good" by now ...
            });

            res.redirect('/product/publications');
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    },

    updateProduct: async (req, res) => {
        
        try {

            /* Previous validations to create a new product */
		    const resultsValidations = validationResult(req);

            if (resultsValidations.errors.length > 0) {
                return res.json(resultsValidations.errors)
            };

            let newData = req.body;

            //--> To save the previous image of the product edited and use it when "req.file" is 'undefined':

            const product = await db.Product.findByPk(req.params.id);
            let product_prev_img = '';

            if(!req.file){
                product_prev_img = product.image;
            };

            //--------------------------------------------//
        
            const updatedProduct = await db.Product.update({
                id: req.params.id,
                title : newData.title,
                description : newData.description,
                info: newData.info,
                stock: Number(newData.stock),
                price : Number(newData.price),
                discount : Number(newData.discount),
                sales_amount : 0,
                image : typeof req.file === 'undefined' ? product_prev_img : req.file.filename,
                category_id: Number(newData.category),
                subcategory_id: Number(newData.subcategory),
                type_id: Number(newData.type),
                user_id: req.session.userLogged.id,
                manufacturer_id: 1, // Only "Green Good" by now ...
               // created_at: null,
                updated_at: new Date(),
                //deleted_at: null
            }, {
                where: {
                    id: req.params.id 
                }
            });

            res.redirect('/product/publications');
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    },

    softDeleteProduct: async (req, res) => {

        try {

            if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
                return res.render('userViews/login', { title: "Login" });
            };

            let softDeletedProduct = await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });
           
            return res.redirect('/product/publications');
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };  
    },

    softDeleteProductDetail: async (req, res) => {
        try {

            if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
                return res.render('userViews/login', { title: "Login" });
            };

            let softDeletedProduct = await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });
           
            return res.redirect('/product/' + req.params.id + '/detail');
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };
    },

    hardDeleteProduct: async (req, res) => {

        try {
            let DeletedProduct = await db.Product.destroy({
                where: {
                    id: req.params.id
                },
                force: true // Hard deletion with paranoid model
            });
           
            return res.redirect('/product/publications');
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };
    },

    // --------------------------------------------------------- //

};


///////////////////////////////////////

module.exports = controller;