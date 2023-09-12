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

    getUserAddresses: async (req, res) => {

        try {
            const idUser = req.params.idUser;

            let userAddresses = await db.Address.findAll({
                where: { user_id: idUser },
                nest: true
            });

            let response = {};
            
            if(userAddresses) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/orders/addresses/:idUser/get'
                    },
                    data: userAddresses
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/orders/addresses/:idUser/get'
                    },
                    data: userAddresses
                }
            }; 

            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while getting the user addresses."
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
                payment_type : newData.payment_type,
                payment_vendor : newData.payment_vendor,
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
                amount: cartItem.amount,
                order_detail_id: lastOrderId,
                product_id: cartItem.id
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

    getOrder: async (req, res) => {

        try {
            const idOrder = req.params.idOrder;

            let orderDetail = await db.OrderDetail.findByPk(idOrder, {
                nest: true,
                include: ["address", "orderItems", "payment", "userDetail"],
            });

            let orderItems = await db.OrderItem.findAll({
                where:{
                    order_detail_id: idOrder
                },
                include: ["product"],
                nest: true,
                raw: true
            })


            let response = {};
            
            if(orderDetail && orderItems) {

                const filteredUserDetail = {
                    id: orderDetail.userDetail.id,
                    first_name: orderDetail.userDetail.first_name,
                    last_name: orderDetail.userDetail.last_name,
                    username: orderDetail.userDetail.username,
                    birth_date: orderDetail.userDetail.birth_date,
                    email: orderDetail.userDetail.email,
                    phone: orderDetail.userDetail.phone,
                };
                delete orderDetail.userDetail;

                const filteredOrderItems = orderItems.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    amount: item.amount,
                    order_detail_id: item.order_detail_id,
                    product_id: item.product_id,
                    product: {
                        id: item.product.id,
                        title: item.product.title,
                        image: item.product.image,
                        description: item.product.description,
                        price: item.product.price,
                        discount: item.product.discount,
                        stock: item.product.stock,
                        category_id: item.product.category_id,
                        subcategory_id: item.product.subcategory_id,
                        manufacturer_id: item.product.manufacturer_id,
                        type_id: item.product.type_id,
                    }
                }));

                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/orders/:idOrder/get'
                    },
                    data: { orderDetail, orderItems: filteredOrderItems, user: filteredUserDetail }
                }
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/orders/:idOrder/get'
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
                    message: "An error occurred at server while getting the purchase order."
                }
            });
        };
    },
};

module.exports = controller;