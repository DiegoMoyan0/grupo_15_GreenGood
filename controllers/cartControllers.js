const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const Op = db.Sequelize.Op;

// -------Pending ShoppingCart------- //

const controller = {

    newCartItem: async (req, res) => {
    
        try {

            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                raw: true,
                nest: true,
                include: ["user", "cartItems"],
            });
            if (shopSession == null){
                await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });

                shopSession = await db.ShoppingSession.findOne({
                    where: { user_id: req.session.userLogged.id },
                    raw: true,
                    nest: true,
                    include: ["cartItems"]
                });
            };

            await db.CartItem.create({
                product_id: Number(req.params.id),
                shopping_session_id: shopSession.id
            });

            res.redirect(`/product/${req.params.id}/detail`);
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    },

    getCart: async (req, res) => {

        try {
            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                raw: true,
                nest: true,
                include: ["user", "cartItems"],
            });
            if (shopSession == null){
                await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });
                shopSession = await db.ShoppingSession.findOne({
                    where: { user_id: req.session.userLogged.id },
                    raw: true,
                    nest: true,
                    include: ["cartItems"],
                });
            };

            console.log(shopSession);

            let cartItems = await db.CartItem.findAll({
                where: { shopping_session_id: shopSession.id },
                raw: true,
                nest: true,
                include: ["shoppingSession","product"],
            });
            console.log(cartItems);
            
            return res.render('cartViews/shopping-cart', {
                title: "Carrito de Compras",
                cartItems
            });
            
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error al obtener los elementos del carrito.' });
        };
        
    },

    removeCartItem: async (req, res) => {
    
        try {

            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                raw: true,
                nest: true,
                include: ["user", "cartItems"],
            });
            if (shopSession == null){
                await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });

                shopSession = await db.ShoppingSession.findOne({
                    where: { user_id: req.session.userLogged.id },
                    raw: true,
                    nest: true,
                    include: ["cartItems"]
                });
            };

            await db.CartItem.destroy({
                where: {
                    product_id: req.params.id
                }
            });

            res.redirect(`/cart`);
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    },

    modifItemQuantity: async (req, res) => {
    
        try {

            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                raw: true,
                nest: true,
                include: ["user", "cartItems"],
            });
            if (shopSession == null){
                await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });

                shopSession = await db.ShoppingSession.findOne({
                    where: { user_id: req.session.userLogged.id },
                    raw: true,
                    nest: true,
                    include: ["cartItems"]
                });
            };

            await db.CartItem.update({
                quantity: Number(req.body.quantity),
                product_id: Number(req.params.id),
                shopping_session_id: shopSession.id
            },{
                where: {
                    product_id: req.params.id
                }
            });

            res.redirect(`/cart`);
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    }



};

module.exports = controller;

