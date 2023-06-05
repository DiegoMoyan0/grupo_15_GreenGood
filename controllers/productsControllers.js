//Requires y 

const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');


// Controladores de las vistas de product, productCart y productDetail, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {

    // Show all products

    getAllProducts: (req,res) => {
        const products = productModel.findAll();

        return res.render('products-list', {
            title: "Todos los productos",
            products
        });
    },

    getProductCart:(req,res) => {
        return res.render('shopping-cart', {title: "Carrito de Compras"});
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
        const productos = productModel.findAll();

        return res.render('productsViews/products-publications', {title: "Productos publicados", productos});
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
        
    },
    ///////////////////////////////////////////

    softDeleteProduct:(req,res) => {

        //Soft-delete a product
 
        let id = Number(req.params.id);
        let productToSoftDelete = productModel.softDeleteById(id);

        if(productToSoftDelete === "Eliminado") {
           res.send("El producto con ID No. " + id +  " fue eliminado existosamente")

        }else{
            res.send("Error, el producto con ID No. " + id +  " ya había sido eliminado o nunca existió")
     
        }


    },


    hardDeleteProduct:(req,res) => {

        //hard-delete a product
 
        let id = Number(req.params.id);
        let productToHardDelete = productModel.deleteById(id);

        productToHardDelete

        res.send("El producto con ID No. " + id +  " fue eliminado de manera PERMANENTE existosamente")

    },
        // @GET /products/create
        getCreate: (req, res) => {
            res.render('productsViews/createProduct');
        },
    
        // @POST /products
        postProduct: (req, res) => {
            let datos = req.body;
        
            datos.price = Number(datos.price);

            productModel.createOne(datos);
    
            res.redirect('/product/publications');
        }

    ///////////////////////////////////////////

}
// exportamos el controller //
module.exports = controller;