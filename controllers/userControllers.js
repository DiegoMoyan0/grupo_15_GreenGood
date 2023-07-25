const fs = require('fs');
const path = require('path');
const userModel = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require("../database/models");
const { log } = require('console');
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
			console.log(req.body);
			console.log(req.file);
			return res.render('userViews/register', {
				title: "Registro",
				errors: resultsValidations.mapped(), // mapped() used to transform the validations results into a literal object.
				oldData: req.body,
				oldFile: req.file
			});
		};

		// delete user.password_confirm;

        try {

            let newData = req.body;

            const newUser = await db.User.create({
                first_name : newData.name_data,
                last_name : newData.name_data,
                // info: newData.info,
                username: newData.user_name,
                birth_date : Number(newData.birth_date),
                email : newData.email,
                image : req.file ? req.file.filename : "default-product-image.jpg",
                type : newData.user_type,
                phone: Number(newData.phone),
                password: newData.password,
            });
			console.log(newUser);

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
		
		try {
	//Search user by email first
	let searchedUser = await db.User.findOne(
		{where:{email: req.body.email}});
	
		if (!searchedUser) {
		//Search user by username
			searchedUser = await db.User.findOne(
				{where:{username: req.body.user_name}});
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
		
				userToLoggin = searchedUser;
				delete userToLoggin.password;

				//Add the logged user to session!
				
				req.session.userLogged = userToLoggin;
				
				//Create cookie called "userEmail" to save user logged when "RememberUser is checked"
				console.log(req.body);
				
				if (req.body.rememberUser) {
					res.cookie('userEmail', searchedUser.email, { maxAge: 1000 * 60 * 60 * 24 * 360 });
				};
				
				//--------------------------//
				
				return res.redirect('/user/profile');

} catch (error) {
	console.log(error);
	res.redirect('/mainViews/error');
}
	},
	updateUser: async (req, res) => {

		// /* Previous validations to edit data from a user */
		// const resultsValidations = validationResult(req);

		// if (resultsValidations.errors.length > 0) {
		// 	return res.render('users/profile', {
		// 		title: "Tu perfil",
		// 		errors: resultsValidations.mapped(),
		// 		oldData: req.body,
		// 		oldFile: req.file
		// 	});
		// };

		// let userNameInDb = await db.User.findOne(
		// 	{where:{username: req.body.user_name}});

		// if (userNameInDb) {
		// 	return res.render('users/profile', {
		// 		title: "Tu perfil",
		// 		errors: {
		// 			user_name: {
		// 				msg: 'Nombre de usuario ya existente, prueba con otro.'
		// 			}
		// 		},
		// 		oldData: req.body,
		// 		oldFile: req.file
		// 	});
		// }

		// let mailInDb = await db.User.findOne(
		// 	{where:{email: req.body.email}});

		// if (mailInDb) {
		// 	return res.render('users/profile', {
		// 		title: "Tu perfil",
		// 		errors: {
		// 			email: {
		// 				msg: 'Ese e-mail ya se encuentra registrado!'
		// 			}
		// 		},
		// 		oldData: req.body,
		// 		oldFile: req.file
		// 	});
		// }

		/* Update user data  */
	 	let user_image = req.file ? req.file.filename : "default-user-photo.jpg";

		try {
			let newData = req.body;

			const updatedUser = await db.User.update({
				first_data: newData.name_data,
				last_data: newData.name_data,
				username: newData.user_name,
				birth_date: newData.birth_date,
				email: newData.email,
				password: newData.password,
				//  adress: newData.adress,
				image: user_image,
				type: newData.user_type,
				phone: newData.phone
			}, {
				where: {
					id: req.params.id
				}
			});

console.log("NEWDATAAAAAAAAAAAAAAAAAAAAAAA");
console.log(newData);
			res.redirect('/user/profile');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		}
	}
	// updateUser: (req, res) => {

	// 	/* Previous validations to edit data from a user */
	// 	const resultsValidations = validationResult(req);

	// 	if (resultsValidations.errors.length > 0) {
	// 		return res.render('users/profile', {
	// 			title: "Tu perfil",
	// 			errors: resultsValidations.mapped(),
	// 			oldData: req.body,
	// 			oldFile: req.file
	// 		});
	// 	};

	// 	let userNameInDb = userModel.findByFiled('user_name', req.body.user_name);

	// 	if (userNameInDb) {
	// 		return res.render('users/profile', {
	// 			title: "Tu perfil",
	// 			errors: {
	// 				user_name: {
	// 					msg: 'Nombre de usuario ya existente, prueba con otro.'
	// 				}
	// 			},
	// 			oldData: req.body,
	// 			oldFile: req.file
	// 		});
	// 	}

	// 	let mailInDb = userModel.findByFiled('email', req.body.email);

	// 	if (mailInDb) {
	// 		return res.render('users/profile', {
	// 			title: "Tu perfil",
	// 			errors: {
	// 				email: {
	// 					msg: 'Ese e-mail ya se encuentra registrado!'
	// 				}
	// 			},
	// 			oldData: req.body,
	// 			oldFile: req.file
	// 		});
	// 	}

	// 	/* Update user data  */
	// 	const user = { ...req.body };

	// 	const hashedPassword = bcrypt.hashSync(user.password, 12);
	// 	user.password = hashedPassword;
	// 	delete user.password_confirm;

	// 	user.user_image = req.file ? req.file.filename : "default-user-photo.jpg";

	// 	userModel.updateById(user.id, user);

	// 	res.redirect('/');

	// },
}

module.exports = controller;