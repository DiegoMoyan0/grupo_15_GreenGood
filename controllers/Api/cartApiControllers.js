const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const Op = db.Sequelize.Op;

// -------Pending ShoppingCart------- //

const controller = {

    addCartItem: async (req, res) => {
    
        try {
            const idProduct = Number(req.body.product_id);
            const idShoppingSession = Number(req.body.shopping_session_id);

            let prevCartItem = await db.CartItem.findOne({ where:{ product_id: idProduct, shopping_session_id: idShoppingSession } });

            let updatedCartItem;
            let createdCartItem;

            if(prevCartItem){
                let newQuantity = prevCartItem.quantity + 1 ;
                updatedCartItem = await db.CartItem.update({
                    quantity: newQuantity
                },{ 
                    where:{ product_id: idProduct}
                });
            }else{
                createdCartItem = await db.CartItem.create({
                    product_id: idProduct,
                    shopping_session_id: idShoppingSession
                });
            };

            let response = {};

            if(updatedCartItem){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: `Cart Item id = ${prevCartItem.id}, incremented quantity successfully.`,
                        url: 'api/cart/add',
                    },                   
                    data: updatedCartItem
                };
            }else if (createdCartItem){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: `Cart Item created successfully.`,
                        url: 'api/cart/add',
                    },                   
                    data: createdCartItem
                };
            }else{
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: `Cart Item id = ${prevCartItem.id}, incremented quantity failed.`,
                        url: 'api/cart/add'
                    }
                };
            };

            res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });            
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

            let cartItems = await db.CartItem.findAll({
                where: { shopping_session_id: shopSession.id },
                raw: true,
                nest: true,
                include: ["shoppingSession","product"],
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
            
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        }; 
    }

};

module.exports = controller;

