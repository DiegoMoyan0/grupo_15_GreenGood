const fs = require('fs');
const path = require('path');
const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const controller = {

    getLogin: (req,res) => {
        return res.render('userViews/login', {title: "Login"});
    },

    getRegister:(req,res) => {
        return res.render('userViews/register', {title: "Registro"});
    },
    
	getProfile: (req, res) => {
		return res.render('userViews/profile',{
            title: "Tu perfil de usuario",
			user: req.session.userLogged
		});
	},
    
	getLogout: (req, res) => {
		req.session.destroy;
		res.clearCookie('userMail');
		return res.redirect('/');
	},

	registerUser: (req, res) => {

		/* Previeus validations to create a new user */
		const resultsValidations = validationResult(req);

		if(resultsValidations.errors.length > 0){
			return res.render('userViews/register',{
                title: "Registro",
				errors: resultsValidations.mapped(), // mapped() used to transform the validations results into a literal object.
				oldData: req.body,
				oldFile: req.file
			});
		};

		let mailInDb = userModel.findByFiled('email', req.body.email);

		if (mailInDb) {
			return res.render('userViews/register',{
                title: "Registro",
				errors: {
					mail: {
						msg: 'Ese e-mail ya se encuentra registrado!'
					}
				}, 
				oldData: req.body,
				oldFile: req.file
			}); 
		}

		let userNameInDb = userModel.findByFiled('user_name', req.body.user_name);

		if (userNameInDb) {
			return res.render('userViews/register',{
                title: "Registro",
				errors: {
					user_name: {
						msg: 'Nombre de usuario ya existente, prueba con otro.'
					}	
				}, 
				oldData: req.body,
				oldFile: req.file
			}); 
		}

		/* Create a new user */
		const user = {...req.body};

		const newPassword = bcrypt.hashSync(user.password, 12);
		user.password = newPassword;
		delete user.password_confirm;

		user.user_image = req.file? req.file.filename : "default-user-photo.jpg";

		userModel.createOne(user);

		res.redirect('/');

	},

	loginUser: (req, res) => {

		/* Previeus validations to login a user */
		const resultsValidations = validationResult(req);

		if(resultsValidations.errors.length > 0){
			return res.render('userViews/login', {
                title: "Login",
				errors: resultsValidations.mapped(),
				oldData: req.body,
			});
		};

		const searchedUser = userModel.findByFiled('user_name', req.body.userName);

		if(!searchedUser){
			return res.render('userViews/login', {
                title: "Login",
				errors: {
					user_name: {
						msg: 'No estas registrado!'
					}	
				}, 
				oldData: req.body,
			}); 
		};
		
		const {password: hashedPw} = searchedUser;
		const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);

		if(!isCorrect){
			return res.render('userViews/login',{
                title: "Login",
				errors: {
					password: {
						msg: 'Contraseña incorrecta!'
					}
				}, 
				oldData: req.body,
			}); 
		};

		userToLoggin = userModel.findByFiled('email', searchedUser.email);
		delete userToLoggin.password;

		//Add the logged user to session!

		req.session.userLogged = userToLoggin;

		//Create cookie called "userEmail" to save user logged when "RememberUser is checked"

		if(req.body.rememberUser){
			res.cookie('userEmail', req.cookies.email, {maxAge: 1000 * 60 * 60 * 24 * 360}); 
		};

		//--------------------------//

		return res.redirect('/users/profile');
		
	},

	updateUser: (req, res) => {

		/* Previeus validations to edit data from a user */
		const resultsValidations = validationResult(req);

		if(resultsValidations.errors.length > 0){
			return res.render('users/profile',{
				title: "Tu perfil",
				errors: resultsValidations.mapped(), 
				oldData: req.body,
				oldFile: req.file
			});
		};

		let userNameInDb = userModel.findByFiled('user_name', req.body.user_name);

		if (userNameInDb) {
			return res.render('users/profile',{
				title: "Tu perfil",
				errors: {
					user_name: {
						msg: 'Nombre de usuario ya existente, prueba con otro.'
					}	
				}, 
				oldData: req.body,
				oldFile: req.file
			}); 
		}

		let mailInDb = userModel.findByFiled('email', req.body.email);

		if (mailInDb) {
			return res.render('users/profile',{
				title: "Tu perfil",
				errors: {
					email: {
						msg: 'Ese e-mail ya se encuentra registradox!'
					}
				}, 
				oldData: req.body,
				oldFile: req.file
			}); 
		}

		/* Update user data  */
		const user = {...req.body};

		const newPassword = bcrypt.hashSync(user.password, 12);
		user.password = newPassword;
		delete user.password_confirm;

		user.user_image = req.file? req.file.filename : "default-user-photo.jpg";

		userModel.updateById(user.id, user);

		res.redirect('/');

	},
}

module.exports = controller;