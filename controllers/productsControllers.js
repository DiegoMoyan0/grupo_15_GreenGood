// Controladores de las vistas de product, productCart y productDetail//


const productController = {
    getProduct: (req,res) => {
        return res.render('product');
    },
    getProductCart:(req,res) => {
        return res.render('productCart');
    },
    getProductDetail:(req,res) => {
        return res.render('productDetail');
    }
}

// ------------------//

module.exports = productController;