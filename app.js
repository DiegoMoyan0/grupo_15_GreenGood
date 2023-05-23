const express = require('express');
const app = express();
const path = require('path');

// Requerimos las rutas de las vistas//
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');

//resuelve y devuelve la ruta absoluta del directorio "public" en relación con el directorio actual (__dirname).//
const publicPath = path.resolve(__dirname, './public');

//------Accedo a recursos estaticos (que no se renderizan: img, css, etc) -----//
app.use(express.static(publicPath));

// --------- Establecemos el motor ejs para la propiedad motor de vistas mediante set del entry point ------//
app.set('view engine', 'ejs');

//Implemento o uso las rutas con express//
app.use(mainRoutes);
app.use('/user',userRoutes);
app.use('/product',productsRoutes);

//---Levantamos el servidor en el puerto 3000----//
app.listen(3001, () => {
    console.log('Server on-line on port 3001');
});