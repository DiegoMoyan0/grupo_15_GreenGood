// ************ Require's ************//

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const logger = require('morgan');// A tool that logs HTTP requests in the terminal
const db = require("./database/models");

//------ Login Mw -------//
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userLoggedMw = require('./middlewares/userLoggedMw');


/////////////////////////////////////////////////////

// To use new HTTP methods: PATCH, DELETE Y PUT//

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


const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

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


/*** FRONTEND TO BACKEND VALIDATIONS (PREVIEW) ***/

app.get('/verify-email', async (req, res) => {
  const emailInForm = req.query.email; // Get the email parameter from the query

  try {
      let exists = false; 

      if (emailInForm.indexOf('@') > -1) {
          // Find a user by email and retrieve only the 'email'
          const userByEmail = await db.User.findOne({
              where: { email: emailInForm },
              attributes: ['email'],
              raw: true,
          });
          exists = !!userByEmail;
      } else {
          // Find a user by username and retrieve the 'username'
          const userByUsername = await db.User.findOne({
              where: { username: emailInForm },
              attributes: ['username'],
              raw: true,
          });
          exists = !!userByUsername;
      }
      res.send(exists.toString()); // Send a response indicating whether the email/username exists as a string
  } catch (error) {
      res.status(500).send('Error en la consulta desde el servidor :' + error); 
  }
});


/**/ 



//*Normalize PORT*/
const port = process.env.PORT || '3000';

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