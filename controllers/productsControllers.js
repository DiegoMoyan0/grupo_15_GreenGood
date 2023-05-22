// Controladores de las vistas de product, productCart y productDetail//


const productController = {
    getProduct: (req,res) => {
        return res.render('productsViews/product', {title: "Productos"});
    },
    getProductCart:(req,res) => {
        return res.render('productsViews/productCart', {title: "Carrito de Compras"});
    },
    getProductDetail:(req,res) => {
        return res.render('productsViews/productDetail', {title: "Detalle de Producto"});
    },
    getProductSale:(req,res) => {
        return res.render('productsViews/sale', {title: "Vender"});
    }
}

// ------------------//

module.exports = productController;