//Requires y 

const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');


// Controladores de las vistas de product, productCart y productDetail, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {

    // Show all products

    getProducts: (req,res) => {
        const products = productModel.findAll();

        return res.render('productsViews/products-list', {
            title: "Todos los productos",
            products
        });
    },

    getProductCart:(req,res) => {
        return res.render('productsViews/shopping-cart', {title: "Carrito de Compras"});
    },

    // Detail - Detail from one product

    getProductDetail:(req,res) => {
        let id = Number(req.params.id);
		
		let theProduct = productModel.findById(id);

		if (!theProduct){
			let message = 'El producto que buscas no se encuentra disponible en estos momentos o se ha eliminado';
			return res.send(message);
		};

        return res.render('productsViews/detail', {
            title: theProduct.title, 
            theProduct
        });
    },

    getProductPublications:(req,res) => {
        return res.render('productsViews/products-publications', {title: "Productos publicados"});
    },

    // Form to edit @GET

    getProductEdit:(req,res) => {
        let id = Number(req.params.id);

		let productToEdit = productModel.findById(id);

		if (!productToEdit) {
            return res.send('error de id');
        }

        return res.render('productsViews/edit-create-forms', {
            title: productToEdit.title,
			productToEdit
        });
    }
}
// exportamos el controller //
module.exports = controller;