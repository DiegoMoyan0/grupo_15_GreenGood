
const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');
const userModel = require('../models/User.js');

let db = require("../database/models");
const Category = require('../database/models/Category');
const Op = db.Sequelize.Op;


const controller = {

    // -------Render product Views by GET------- //

    getAllProducts: async (req, res) => {

        try {
            const products = await db.Product.findAll(
                {
                    include: [
                        {association : 'category' },
                        {association : 'subcategory' },
                        {association : 'type' },
                        {association : 'manufacturer' }],
                }
            );
            
            //-------To render only the name values of associated tables
            products.forEach(product => {
                product.category = product.category.name;
                product.subcategory = product.subcategory.name;
                product.type = product.type.name;
                product.manufacturer = product.manufacturer.name;
            });

            console.log(products[0].category);

            return res.render('productsViews/products-list', {
                title: "Todos los productos",
                products: products
            });           

        } catch (error) {
            //error message
            res.send('Ha ocurrido un error')
        }
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

        if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
            return res.render('productsViews/detail', {
                title: theProduct.title,
                theProduct,
                vendedor: false
            });

        } else {

            if (req.session.userLogged.user_type === 'Comprador') {
                return res.render('productsViews/detail', {
                    title: theProduct.title,
                    theProduct,
                    vendedor: false,
                });

            }

            if (req.session.userLogged.user_type === 'Vendedor') {

                return res.render('productsViews/detail', {
                    title: theProduct.title,
                    theProduct,
                    vendedor: true
                });
            }
        }
    },

    getProductPublications: (req, res) => {


        if (typeof req.session === 'undefined' || typeof req.session.userLogged === 'undefined') {
            return res.render('userViews/login', { title: "Login" });

        } else {

            if (req.session.userLogged.user_type === 'Comprador') {

                return res.render('userViews/profile', {
                    title: "Tu perfil de usuario",
                    user: req.session.userLogged,
                    error: true
                });

            }

            if (req.session.userLogged.user_type === 'Vendedor') {

                const products = productModel.findAll();

                return res.render('productsViews/products-publications', {
                    title: "Productos publicados",
                    products
                });
            }

        }


    },


    // -------Products managment controllers------- //


    createProduct: (req, res) => {
        let newData = req.body;

        newData.price = Number(newData.price);
        newData.discount = Number(newData.discount);
        newData.salesAmount = 0;
        newData.deleted = false;
        newData.manufactured = "Green Good";
        newData.image = req.file ? req.file.filename : "default-product-image.jpg";

        productModel.createOne(newData);

        res.redirect('/product/publications');
    },


    updateProduct: (req, res) => {
        let id = Number(req.params.id);
        let newData = req.body;
        let productToEdit = productModel.findById(id)

        newData.price = Number(newData.price);
        newData.discount = Number(newData.discount);
        newData.salesAmount = Number(newData.salesAmount);
        newData.image = req.file ? req.file.filename : productToEdit.image;
        if (newData.deleted == "false") {
            newData.deleted = false;
        } else if (newData.deleted == "true") {
            newData.deleted = true;
        };

        productModel.updateById(id, newData);

        res.redirect('/product/publications');
    },


    softDeleteProduct: (req, res) => {

        let id = Number(req.params.id);
        productModel.softDeleteById(id);

        return res.redirect('/product/publications');
    },

    softDeleteProductDetail: (req, res) => {

        let id = Number(req.params.id);
        productModel.softDeleteById(id);

        return res.redirect('/product/' + req.params.id + '/detail');

    },


    hardDeleteProduct: (req, res) => {

        let id = Number(req.params.id);
        productModel.deleteById(id);
        res.redirect('/product/publications');
    },

};


///////////////////////////////////////

module.exports = controller;