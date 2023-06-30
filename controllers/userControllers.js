const fs = require('fs');
const path = require('path');
const userModel = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const controller = {

	getLogin: (req, res) => {
		return res.render('userViews/login', { title: "Login" });
	},

	getRegister: (req, res) => {
		return res.render('userViews/register', { title: "Registro" });
	},

	getProfile: (req, res) => {
		return res.render('userViews/profile', {
			title: "Tu perfil de usuario",
			user: req.session.userLogged,
			error: false
		});
	},

	getLogout: (req, res) => {
		req.session.destroy;
		res.clearCookie('userMail');
		return res.redirect('/');
	},

	registerUser: (req, res) => {

		/* Previous validations to create a new user */
		const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {
			console.log(req.body);
			console.log(req.file);
			return res.render('userViews/register', {
				title: "Registro",
				errors: resultsValidations.mapped(), // mapped() used to transform the validations results into a literal object.
				oldData: req.body,
				oldFile: req.file
			});
		};

		/* Create a new user */
		const user = { ...req.body };

		const hashedPassword = bcrypt.hashSync(user.password, 12);
		user.password = hashedPassword;


		/* let full_name = user.name_data
		let first_name = "" //Decidir concatenar y/o separar campos en el formulario
		let last_name = ""  //Decidir concatenar y/o separar campos en el formulario
		user.name_data = { full_name, first_name, last_name }
 */
		delete user.password_confirm;
		user.user_image = req.file ? req.file.filename : "default-user-photo.png";

		userModel.createOne(user);

		return res.redirect('/user/login');

	},

	loginUser: (req, res) => {

		/* Previous validations to login a user */
		const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {
			return res.render('userViews/login', {
				title: "Login",
				errors: resultsValidations.mapped(),
				oldData: req.body,
			});
		};


		//Search user by email first
		let searchedUser = userModel.findByFiled('email', req.body.email);
	
		if (!searchedUser) {
		//Search user by username
			searchedUser = userModel.findByFiled('user_name', req.body.email);
		}

		if (!searchedUser) {

			return res.render('userViews/login', {
				title: "Login",
				errors: {
					email: {
						msg: 'No estas registrado!'
					}
				},
				oldData: req.body,
			});
		};

		const { password: hashedPw } = searchedUser;
		const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);

		if (!isCorrect) {
			return res.render('userViews/login', {
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

		if (req.body.rememberUser) {
			res.cookie('userEmail', req.cookies.email, { maxAge: 1000 * 60 * 60 * 24 * 360 });
		};

		//--------------------------//

		return res.redirect('/user/profile');

	},

	updateUser: (req, res) => {

		/* Previous validations to edit data from a user */
		const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {
			return res.render('users/profile', {
				title: "Tu perfil",
				errors: resultsValidations.mapped(),
				oldData: req.body,
				oldFile: req.file
			});
		};

		let userNameInDb = userModel.findByFiled('user_name', req.body.user_name);

		if (userNameInDb) {
			return res.render('users/profile', {
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
			return res.render('users/profile', {
				title: "Tu perfil",
				errors: {
					email: {
						msg: 'Ese e-mail ya se encuentra registrado!'
					}
				},
				oldData: req.body,
				oldFile: req.file
			});
		}

		/* Update user data  */
		const user = { ...req.body };

		const hashedPassword = bcrypt.hashSync(user.password, 12);
		user.password = hashedPassword;
		delete user.password_confirm;

		user.user_image = req.file ? req.file.filename : "default-user-photo.jpg";

		userModel.updateById(user.id, user);

		res.redirect('/');

	},
}

module.exports = controller;