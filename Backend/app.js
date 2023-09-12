// ************ Require's ************//

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const logger = require('morgan');// A tool that logs HTTP requests in the terminal
require('dotenv').config();

//------ Login Mw -------//
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userLoggedMw = require('./middlewares/userLoggedMw');

//---------Routes requires---------//

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

const productsApiRoutes = require('./routes/Api/productsApiRoutes');
const usersApiRoutes = require('./routes/Api/usersApiRoutes');
const cartApiRoutes = require('./routes/Api/cartApiRoutes');
const favProdsApiRoutes = require('./routes/Api/favProdsApiRoutes');
const ordersApiRoutes = require('./routes/Api/ordersApiRoutes');


/////////////////////////////////////////////////////

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride ("_method"))

//------- Loggin -----//
app.use(logger('dev')); 
app.use(session ({
  secret: "Green Good Project TOP SECRET xxx",
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser());
app.use(userLoggedMw); /*App Mw for logged user with cookie*/


/////////////////////////////////////////////////////


// **Statics resources** //
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// --------- View engine setup --------//
app.set('view engine', 'ejs');

//**Use routes with express**//
app.use(mainRoutes);
app.use('/user',userRoutes);
app.use('/product',productsRoutes);
app.use('/cart',cartRoutes);

//**API REST ENDPOINTS *//
app.use('/api/product',productsApiRoutes);
app.use('/api/user',usersApiRoutes);
app.use('/api/cart',cartApiRoutes);
app.use('/api/favProducts',favProdsApiRoutes); 
app.use('/api/orders',ordersApiRoutes); 


//*Normalize PORT*/
const port = process.env.PORT || '3001';

app.use((req, res)=>{
  res.render("mainViews/error")
});

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