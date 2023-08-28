let db = require("../../database/models");

const controller = {

    getShoppingSession: async (req, res) => {

        try {
            const idUser = req.params.idUser;

            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: idUser },
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
                        url: 'http://localhost:3000/api/cart/shoppingSession/:idUser/get'
                    },
                    data: shopSession
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3000/api/cart/shoppingSession/:idUser/get'
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
                    message: "An error occurred while processing your request at shopping session."
                }
            });
        };
    },

    initShoppingSession: async (req, res) => {
        try {
            const idUser = req.params.idUser;

            let shopSession = await db.ShoppingSession.create({
                init_date: Date.now(),
                user_id: idUser
            });

            if(shopSession) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3000/api/cart/shoppingSession/:idUser/init'
                    },
                    data: shopSession
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3000/api/cart/shoppingSession/:idUser/init'
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
                    message: "An error occurred while processing your request at shopping session."
                }
            }); 
        };
    },

    getCart: async (req, res) => {

        try {
            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.params.idUser },
                /* raw: true, */ //Cannot get an array of cartItems if it is true
                nest: true,
                include: ["user", "cartItems"],
            });

            let cartItems = await db.CartItem.findAll({
                where: { shopping_session_id: shopSession.id },
                raw: true,
                nest: true,
                include: ["shoppingSession","product"],
            });
            
            if(cartItems) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3000/api/cart/allItems/:idUser/get'
                    },
                    data: cartItems
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3000/api/cart/allItems/:idUser/get'
                    },
                    data: cartItems
                }
            }; 

            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while getting all the cart items."
                }
            }); 
        };
    },

    addCartItem: async (req, res) => {
    
        try {
            const idProduct = Number(req.body.product_id);
            const idShoppingSession = Number(req.body.shopping_session_id);
            const quantityValue = Number(req.body.quantity);

            let prevCartItem = await db.CartItem.findOne({ where:{ product_id: idProduct, shopping_session_id: idShoppingSession } });

            let updatedCartItem;
            let createdCartItem;

            if(prevCartItem){
                let newQuantity = prevCartItem.quantity += quantityValue;
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
                        updated: true,
                        message: `Cart Item id = ${prevCartItem.id}, incremented quantity successfully.`,
                        url: 'http://localhost:3000/api/cart/add',
                    },                   
                    data: updatedCartItem
                };
            }else if (createdCartItem){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        created: true,
                        message: `Cart Item created successfully.`,
                        url: 'http://localhost:3000/api/cart/add',
                    },                   
                    data: createdCartItem
                };
            }else{
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: `Cart Item id = ${prevCartItem.id}, incremented quantity failed.`,
                        url: 'http://localhost:3000/api/cart/add'
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
            const idCartItem = Number(req.params.idCartItem);
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
                            url: 'http://localhost:3000/api/cart/:idCartItem/updateQuantity',
                        },                   
                        data: updatedCartItem
                    };
                }else{
                    response ={
                        meta: {
                            status: 500,
                            success: false,
                            message: `Cart Item id = ${prevCartItem.id}, edited quantity failed.`,
                            url: 'http://localhost:3000/api/cart/:idCartItem/updateQuantity'
                        }
                    };
                };
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        message: `Cart item id is not valid: '${idCartItem}'`,
                        url: 'http://localhost:3000/api/cart/:idCartItem/updateQuantity'
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

            const idCartItem = req.params.idCartItem;

            let deletedCartItem = await db.CartItem.destroy({
                where: {
                    id: idCartItem
                }
            });
            if(deletedCartItem){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: `Cart Item deletion successfully.`,
                        url: 'http://localhost:3000/api/cart/:idCartItem/delete',
                    },                   
                    data: deletedCartItem
                };
            }else{
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: `Cart Item deletion failed.`,
                        url: 'http://localhost:3000/api/cart/:idCartItem/delete'
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

