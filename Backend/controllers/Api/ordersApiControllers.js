let db = require("../../database/models");

const controller = {

    getLastFinishedShoppingSessions: async (req, res) => {

        try {
            const idUser = req.params.idUser;

            let lastSessions = await db.ShoppingSession.findAll({
                where: { user_id: idUser },
                order : [
                    ['finish_date', 'DESC']
                ],
                nest: true,
                include: ["user", "cartItems"],
            });

            let response = {};
            
            if(lastSessions) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/orders/shoppingSession/:idUser/getLast'
                    },
                    data: lastSessions
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/orders/shoppingSession/:idUser/getLast'
                    },
                    data: lastSessions
                }
            }; 

            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while getting the last shopping sessions."
                }
            });
        };
    },

    getUserPayments: async (req, res) => {

        try {
            const idUser = req.params.idUser;

            let userPayments = await db.UserPayment.findAll({
                where: { user_id: idUser },
                raw: true,
                nest: true
            });

            let response = {};
            
            if(userPayments) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/orders/payments/:idUser/get'
                    },
                    data: userPayments
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/orders/payments/:idUser/get'
                    },
                    data: userPayments
                }
            }; 

            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while getting the user payments."
                }
            });
        };
        
    },

    addPayment: async (req, res) => {
        try {
            /* Pendding validations to create payments */
		    /* const resultsValidations = validationResult(req); */

            const newData = req.body;
            const idUser = req.params.idUser;

            let createdPayment = await db.UserPayment.create({
                payment_type : newData.type,
                payment_vendor : newData.vendor,
                account_number: newData.account_number,
                card_number: Number(newData.card_number),
                card_exp : newData.card_exp,
                user_id: idUser,
            });

            let response = {};

            if(createdPayment){
                response ={
                    meta: {
                        status: 201, // 201 for successful resource creation
                        success: true,
                        message: "Payment created successfully.",
                        url: 'http://localhost:3001/api/orders/payments/:idUser/create',
                    },                    
                    data:createdPayment
                };
            }else{
                response ={
                    meta: {
                        status: 500, // This code indicates that something went wrong on the server side.
                        success: false,
                        message: "Payment creation failed.",
                        url: 'http://localhost:3001/api/orders/payments/:idUser/create'
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
                    message: "An error occurred while add a new user payment."
                }
            });            
        };
    },

    createOrder: async (req, res) => {
        try {
            /* Pendding validations to create order */
		    /* const resultsValidations = validationResult(req); */

            const newData = req.body;
            const idUser = req.params.idUser;

            let newOrder = await db.OrderDetail.create({
                order_date : new Date(),
                detail_total : newData.detail_total,
                user_payment_id: Number(newData.user_payment_id),
                user_address_id: Number(newData.user_address_id),
                user_id: idUser,
            });

            const lastOrderId = newOrder.id;
            let cartItems = Array.from(newData.cartItems);// An array of objects 

            const orderItemsToCreate = cartItems.map(cartItem => ({
                quantity: cartItem.quantity,
                amount: cartItem.price,
                order_detail_id: lastOrderId,
                cart_item_id: cartItem.id
            }));

            // To add all order items in one query
            let newOrderItems = await db.OrderItem.bulkCreate(orderItemsToCreate);

            let response = {};

            if(newOrder && newOrderItems){
                response ={
                    meta: {
                        status: 201, // 201 for successful resource creation
                        success: true,
                        message: "Order created successfully.",
                        url: 'http://localhost:3001/api/orders/:idUser/create',
                    },                    
                    data:{ newOrder, newOrderItems }
                };
            }else{
                response ={
                    meta: {
                        status: 500, // This code indicates that something went wrong on the server side.
                        success: false,
                        message: "Order creation failed.",
                        url: 'http://localhost:3001/api/orders/:idUser/create'
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
                    message: "An error occurred while creating a new order."
                }
            });            
        };
    },

    getOrderDetail: async (req, res) => {

        try {
            const idUser = req.params.idUser;

            let lastSessions = await db.ShoppingSession.findAll({
                where: { user_id: idUser },
                order : [
                    ['finish_date', 'DESC']
                ],
                nest: true,
                include: ["user", "cartItems"],
            });

            let response = {};
            
            if(lastSessions) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/orders/shoppingSession/:idUser/getLast'
                    },
                    data: lastSessions
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/orders/shoppingSession/:idUser/getLast'
                    },
                    data: lastSessions
                }
            }; 

            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while getting the last shopping sessions."
                }
            });
        };
    },
};

module.exports = controller;