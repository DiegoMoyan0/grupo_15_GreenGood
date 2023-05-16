const express = require('express');
const path = require('path');

// Requiero las rutas de las vistas//

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');

//---------------//

const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));



// --------- Establecemos el motor ejs para la propiedad motor de vistas mediante set del entry point ------//

app.set('view engine', 'ejs');



//------Accedo a recursos estaticos (que no se renderizan: img, css, etc) -----//

app.use(express.static('public'));

//----------//



//Implemento o uso las rutas con express//

app.use(mainRoutes);
app.use(userRoutes);
app.use('/product',productsRoutes);


//-------//


app.listen(3001, () => {
    console.log('Server on-line on port 3001');
});