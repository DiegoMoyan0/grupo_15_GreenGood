const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require("../database/models");
const Op = db.Sequelize.Op;

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
		req.session.destroy();
		res.clearCookie('userEmail');
		return res.redirect('/');
	},

	registerUser: async (req, res) => {

		/* Previous validations to create a new user */
		const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {

			return res.render('userViews/register', {
				title: "Registro",
				errors: resultsValidations.mapped(), // mapped() used to transform the validations results into a literal object.
				oldData: req.body,
				oldFile: req.file
			});
		};

		delete req.body.password_confirm;

		try {

			let newData = req.body;

			let hashedPassword = await bcrypt.hash(req.body.password, 10);

			//Temporary line for testing purposes

			//let hashedPassword =req.body.password

			const newUser = await db.User.create({
				first_name: newData.first_name,
				last_name: newData.last_name,
				username: newData.user_name,
				birth_date: newData.birth_date,
				email: newData.email,
				image: req.file ? req.file.filename : "default-user-photo.png",
				type: newData.user_type,
				phone: Number(newData.phone),
				password: hashedPassword,
			});

			const newAdress = await db.Address.create({
				street: newData.street,
				number: newData.number,
				city: newData.city,
				province: newData.province,
				country: newData.country,
				user_id: newUser.id
			});

			res.redirect('/user/login');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		};
	},

	loginUser: async (req, res) => {

		/* Previous validations to login a user */
		const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {
			return res.render('userViews/login', {
				title: "Login",
				errors: resultsValidations.mapped(),
				oldData: req.body,
			});
		};

		let searchedUser = {};

		try {

			if (req.body.email.indexOf('@') > -1) {
				//Search user by email first
				searchedUser = await db.User.findOne({
					where: { email: req.body.email },
					raw: true,
					nest: true,
					include: ["address"],
				});
			} else {
				//Search user by username
				searchedUser = await db.User.findOne({
					where: { username: req.body.email },
					raw: true,
					nest: true,
					include: ["address"],
				});
			};

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


			//Users with hashed password

			const { password: hashedPw } = searchedUser;
			const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);

			// Temporary line for testing purposes

			//let isCorrect = req.body.password === searchedUser.password;

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

			userToLoggin = searchedUser;

			delete userToLoggin.password;

			//Add the logged user to session!

			req.session.userLogged = userToLoggin;

			//Create cookie called "userEmail" to save user logged when "RememberUser ichecked"

			if (req.body.rememberUser) {
				res.cookie('userEmail', searchedUser.email, { maxAge: 1000 * 60 * 60 * 24 * 360 });
			};

			//--------------------------//

			return res.redirect('/user/profile');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		};
	},

	updateUser: async (req, res) => {
		/* Update user data  */
		let user_image = req.file ? req.file.filename : "default-user-photo.jpg";

		try {
			let newData = req.body;

			//--> To save the previous image of the user edited and use it when "req.file" is 'undefined':

			const user = await db.User.findByPk(req.session.userLogged.id);
			let user_prev_img = '';

			if (!req.file) {
				user_prev_img = user.image;
			};

			//--------------------------------------------//

			const updatedUser = await db.User.update({
				first_name: newData.first_name,
				last_name: newData.last_name,
				username: newData.user_name,
				birth_date: newData.birth_date,
				image: typeof req.file === 'undefined' ? user_prev_img : req.file.filename,
				type: newData.user_type,
				phone: newData.phone
			},
				{
					where: { id: req.params.id }
				});

			const updatedAddress = await db.Address.update({
				street: newData.street,
				number: newData.number,
				city: newData.city,
				province: newData.province,
				country: newData.country
			}, {
				where: { user_id: req.session.userLogged.id }
			});


			// Instant update of the user data in req.session

			if (updatedUser && updatedAddress) {

				req.session.userLogged.first_name = newData.first_name
				req.session.userLogged.last_name = newData.last_name
				req.session.userLogged.username = newData.user_name
				req.session.userLogged.birth_date = newData.birth_date
				req.session.userLogged.image = typeof req.file === 'undefined' ? user_prev_img : req.file.filename,
				req.session.userLogged.type = newData.user_type
				req.session.userLogged.phone = newData.phone

				req.session.userLogged.address.street = newData.street
				req.session.userLogged.address.number = newData.number
				req.session.userLogged.address.city = newData.city
				req.session.userLogged.address.province = newData.province
				req.session.userLogged.address.country = newData.country
			}


			return res.redirect('/user/profile');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		};
	},

	hardDeleteUser: async (req, res) => {

		try {
			let deletedUser = await db.User.destroy({
				where: {
					id: req.params.id
				},
				/* force: true */ // Hard deletion with paranoid model
			});

			req.session.destroy();
			res.clearCookie('userEmail');

			return res.redirect('/');
		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		};
	}

};

module.exports = controller;