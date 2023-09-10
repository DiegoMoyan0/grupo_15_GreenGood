let db = require("../database/models");

const controller = {

    getCart: async (req, res) => {
        let cartItems;
        if(!req.session.userLogged){
            return res.render('cartViews/shopping-cart', {
                title: "Carrito de Compras",
                cartItems: null
            });
        }
        try {
            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id, finish_date: null}
            });
            
            let newShoppingSession = {};
            if (shopSession == null){
                newShoppingSession = await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });
                shopSession = await db.ShoppingSession.findByPk(newShoppingSession.id,{
                    nest: true
                });
            };

            cartItems = await db.CartItem.findAll({
                where: { shopping_session_id: shopSession.id },
                raw: true,
                nest: true,
                include: ["shoppingSession","product"],
            });
            
            return res.render('cartViews/shopping-cart', {
                title: "Carrito de Compras",
                user: req.session.userLogged,
                cartItems
            });
            
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error al obtener los elementos del carrito.' });
        };
    },
    generateOrderPDF: async (req, res) => {
        try {
            const idOrder = req.params.idOrderDetail;

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
                        url: 'http://localhost:3001/cart/generate-order/:idOrderDetail'
                    },
                    data: { orderDetail, orderItems: filteredOrderItems, user: filteredUserDetail }
                }

                return res.json(response);
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/cart/generate-order/:idOrderDetail'
                    }
                };
            }; 
            
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

        
    }
};

module.exports = controller;

