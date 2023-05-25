// Controladores de las vistas de product, productCart y productDetail, cada metodo se utiliza para renderizar la vista 'UserViews/' y pasa un objeto con el título " " como dato para cambiar el nombre del titulo de cada vista)//
const controller = {
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
// exportamos el controller //
module.exports = controller;