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
    },
    getProductPost:(req,res) => {
        return res.render('productsViews/post');
    },
    getProductSale:(req,res) => {
        return res.render('productsViews/sale');
    }
}

// ------------------//

module.exports = productController;