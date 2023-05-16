// Controladores de las vistas de product, productCart y productDetail//


const productController = {
    getProduct: (req,res) => {
        return res.render('productsViews/product');
    },
    getProductCart:(req,res) => {
        return res.render('productsViews/productCart');
    },
    getProductDetail:(req,res) => {
        return res.render('productsViews/productDetail');
    }
}

// ------------------//

module.exports = productController;