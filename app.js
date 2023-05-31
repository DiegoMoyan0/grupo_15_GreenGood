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


//*Normalize PORT*/
const port = process.env.PORT || '3000';


/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => { 
  console.log(`\\*-------------------------*\\`);
  console.log(`Server running in ${port} port`);
  console.log(`Now, you can open http://localhost:${port} in your favorite browser `);
  
  console.log(`\\*-------------------------*\\`);
});


// ************ exports app ************
module.exports = app;