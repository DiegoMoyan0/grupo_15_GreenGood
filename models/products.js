const path = require('path');
const fs = require('fs');

const models = {

    // -------Store the products BBDD rute------- //

    route: '../dataBase/productsDataBase.json',


    // -------Get the whole products from de DDBB------- //

    findAll: function () {
        const productsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8')
        const products = JSON.parse(productsJSON);

        return products;
    },


    // -------Search by ID and return one product from de DDBB------- //

    findById: function (id) {

        const products = this.findAll();

        let searched = products.find(item => item.id === id);

        (!searched)? searched = null: searched; // Para mostrar null en vez de undefined cuando no existe el ID

        return searched;
        
    },   
    

    // -------Create a new product and store it into de DDBB------- //

    createOne: function (newProduct) {

        let products = this.findAll();

        newProduct.id = products[products.length - 1].id + 1;

        products.push(newProduct);

        const productsJSON = JSON.stringify(products, null, " ");

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    },
    

    // -------Edit one product by ID------- //

    updateById: function (id, newData) {

        let products = this.findAll();

        const index = products.findIndex(item => item.id === id);

        const {title, price, description, image, discount, stock, info, category, subcategory, type, deleted, salesAmount} = newData 

        products[index] = {
            id: products[index].id,
            title,
            price,
            description, 
            image, 
            discount, 
            stock, 
            info, 
            category, 
            subcategory, 
            type,
            deleted,
            salesAmount
        };

        fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(products, null, " "));
        
    },


    // -------Mark product as sold------- //


    softDeleteById: function(id){

        let products = this.findAll();

        let searched = products.find(item => item.id === id);

        (!searched)? searched = null: searched; 
        
        if (searched != null && searched.deleted !== true){
            searched.deleted = true;
           // searched.stock = 0;
            fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(products, null, " "));
           // console.log(`Product id =${searched.id} marked as sold`);
            return searched;
        }

        if (searched != null && searched.deleted == true){
            searched.deleted = false;
           // searched.stock = 1;
            fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(products, null, " "));
           // console.log(`Product id =${searched.id} marked as available`)
            return searched;
        }
   
    },

    // -------Eliminate one prodcut from the DDBB------- //

    deleteById: function (id) {
        let products = this.findAll();

        products = products.filter(product => product.id !== id);

        const productsJSON = JSON.stringify(products, null, " ");

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    },

}

module.exports = models;