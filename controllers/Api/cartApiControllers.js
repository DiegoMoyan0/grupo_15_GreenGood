const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const Op = db.Sequelize.Op;

// -------Pending ShoppingCart------- //

const controller = {

    getShoppingSession: async (req, res) => {

        try {
            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                /* raw: true, */ //Cannot get an array of cartItems if it is true
                nest: true,
                include: ["user", "cartItems"],
            });

            let response = {};
            
            if(shopSession) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'api/cart/shoppingSession'
                    },
                    data: shopSession
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'api/cart/shoppingSession'
                    },
                    data: shopSession
                }
            }; 

            return res.json(response);
            
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

            return res.json(response);

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
    modifQuantity: async (req, res) => {
    
        try {
            const idCartItem = Number(req.body.cartItem_id);
            const newQuantity = Number(req.body.quantity);

            if(newQuantity <= 0){
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        message: `Edited cart item quantity is not valid: '${newQuantity}'`
                    }
                });
            };

            let prevCartItem = await db.CartItem.findOne({ where:{ id: idCartItem } });

            let response = {};
            let updatedCartItem = {}

            if(prevCartItem){
                updatedCartItem = await db.CartItem.update({
                    quantity: newQuantity
                },{ 
                    where:{ id: idCartItem}
                });
                if(updatedCartItem){
                    response ={
                        meta:{
                            status: 201, //, 201 for successful resource edition
                            success: true,
                            message: `Cart Item id = ${prevCartItem.id}, edited quantity successfully.`,
                            url: 'api/cart/quantity',
                        },                   
                        data: updatedCartItem
                    };
                }else{
                    response ={
                        meta: {
                            status: 500,
                            success: false,
                            message: `Cart Item id = ${prevCartItem.id}, edited quantity failed.`,
                            url: 'api/cart/quantity'
                        }
                    };
                };
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        message: `Cart item id is not valid: '${idCartItem}'`,
                        url: 'api/cart/quantity'
                    },
                    data: prevCartItem
                } 
            };

            return res.json(response);

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

    removeCartItem: async (req, res) => {
    
        try {

            let deletedCartItem = await db.CartItem.destroy({
                where: {
                    id: req.query.id
                }
            });
            if(deletedCartItem){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: `Cart Item deletion successfully.`,
                        url: 'api/cart/delete',
                    },                   
                    data: deletedCartItem
                };
            }else{
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: `Cart Item deletion failed.`,
                        url: 'api/cart/delete'
                    },
                    data: deletedCartItem
                };
            };

            return res.json(response);
            
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
    }

};

module.exports = controller;

