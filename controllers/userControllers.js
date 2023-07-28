const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require("../database/models");
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
				console.log('es un correo')
				searchedUser = await db.User.findOne(
					{
						raw: true,
						nest: true,
						include: [
							{ association: 'address' }
						],
					},{
						where: { email: req.body.email }
					}
				);
			} else if (req.body.email.indexOf('@') == -1) {
				//Search user by username
				console.log('es un username')
				searchedUser = await db.User.findOne(
					{
						raw: true,
						nest: true,
						include: [
							{ association: 'address' },
						],
					},{
						where: { username: req.body.user_name }
					}
				);
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

			userToLoggin = searchedUser;

			delete userToLoggin.password; 

			//Add the logged user to session!

			req.session.userLogged = userToLoggin;

			console.log(req.session.userLogged);

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

            if(!req.file){
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
			}, {
				where: {
					id: req.params.id
				}
			});

			const updatedAddress = await db.Address.update({
				street: newData.street,
				number: newData.number,
				city: newData.city,
				province: newData.province,
				country: newData.country
			}, {
				where: {
					user_id: req.session.userLogged.id
				}
			});

			res.redirect('/');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		};
	},


	hardDeleteUser: async (req, res) => {

		try {
			let DeletedUser = await db.User.destroy({
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