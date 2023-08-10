const fs = require('fs');
const path = require('path');
let db = require("../database/models");
const Op = db.Sequelize.Op;

// -------Pending ShoppingCart------- //

const controller = {

    getCart: async (req, res) => {

        try {
            let cartItems = await db.CartItem.findAll({
                where: { shopping_session_id: 1 },
                raw: true,
                nest: true,
                include: ["shoppingSession","product"],
            });
            console.log(cartItems);
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error al obtener los elementos del carrito.' });
        };
        return res.render('cartViews/shopping-cart', {
            title: "Carrito de Compras"
        });
    }

};

module.exports = controller;

