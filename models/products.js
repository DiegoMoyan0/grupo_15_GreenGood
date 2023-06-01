const path = require('path');
const fs = require('fs');

const models = {

    //Ruta del JSON productos

    route: '../dataBase/productsDataBase.json',


    //Trae toda la lista de los productos

    findAll: function () {
        const productsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8')
        const products = JSON.parse(productsJSON);

        return products;
    },

    //Traer un producto por ID

    findById: function (id) {

        const products = this.findAll();

        const searched = products.find(item => item.id === id);

        (!searched)? searched = null: searched; // Para mostrar null en vez de undefined cuando no existe el ID

        return searched;
        
    },

    //Eliminar un producto x

    deleteById: function (id) {

        let products = this.findAll();

        products = products.filter(item => item.id !== id);

        fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(products)); // modifico el JSON de base de datos

        return products;
    },

    //Editar un producto x

    updateById: function (id, newData) {

        let products = this.findAll();


        // Guardo el indice del array donde esta guardado el elemento buscado
        const index = products.findIndex(item => item.id === id);

        const {title, price} = newData // con destructuring me ahorro poner todo dentro del nuevo objeto. Podria hacerlo directamente en el parametro newData

        //Actualizamos los nuevos datos
        products[index] = {
            id: products[index].id,
            title,
            price
        }

        //Convertimos a JSON y Sobrescribimos
        fs.writeFileSync(path.join(__dirname, this.route), JSON.stringify(products));
        
    },

    //Crear un producto x

    createOne: function (newProduct) {

        // Buscamos todos los productos
        let products = this.findAll();

        // Le damos el ID al producto nuevo
        newProduct.id = products[products.length - 1].id + 1;

        // Agregamos el producto nuevo al array original
        products.push(newProduct);

        // Convertimos a JSON el array
        const productsJSON = JSON.stringify(products);

        // Sobreescribimos el JSON
        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    },
}

module.exports = models;