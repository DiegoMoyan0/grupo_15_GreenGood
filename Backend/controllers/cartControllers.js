let db = require("../database/models");

const controller = {

    getCart: async (req, res) => {

        try {
            let shopSession = await db.ShoppingSession.findOne({
                where: { user_id: req.session.userLogged.id },
                /* raw: true, */ //Cannot get an array of cartItems if it is true
                nest: true,
                include: ["user", "cartItems"],
            });
            console.log(shopSession);
            if (shopSession == null){
                await db.ShoppingSession.create({
                    init_date: Date.now(),
                    user_id: req.session.userLogged.id
                });
                shopSession = await db.ShoppingSession.findOne({
                    where: { user_id: req.session.userLogged.id },
                   /*  raw: true,  */
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
            
            return res.render('cartViews/shopping-cart', {
                title: "Carrito de Compras",
                cartItems
            });
            
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error al obtener los elementos del carrito.' });
        };
    }
};

module.exports = controller;
