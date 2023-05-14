// Controladores de las vistas de product, productCart y productDetail//


const productController = {
    product: (req,res) => {
        return res.render('product');
    },
    productCart:(req,res) => {
        return res.render('productCart');
    },
    productDetail:(req,res) => {
        return res.render('productDetail');
    }
}

// ------------------//

module.exports = productController;