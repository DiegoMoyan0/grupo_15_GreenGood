const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));



// --------- Establecemos el motor ejs para la propiedad motor de vistas mediante set del entry point ------//

app.set('view engine', 'ejs');



//------Accedo a recursos estaticos (que no se renderizan: img, css, etc) -----//

app.use(express.static('public'));

//----------//


// Requiero las rutas de las vistas//

const mainRoutes = require('./routes/mainRoutes');



//Implemento o uso las rutas con express//

app.use('/', mainRoutes);
app.use('/faqs', mainRoutes);
app.use('/info', mainRoutes);
app.use('/login', mainRoutes);
app.use('/post', mainRoutes);
app.use('/register', mainRoutes);
app.use('/product', mainRoutes);
app.use('/productCart', mainRoutes);
app.use('/productDetail', mainRoutes);
app.use('/sale', mainRoutes);
app.use('/post', mainRoutes);


//-------//


app.listen(3001, () => {
    console.log('Server on-line on port 3001');
});