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
		/* const resultsValidations = validationResult(req);

		if (resultsValidations.errors.length > 0) {
			console.log(req.body);
			console.log(req.file);
			return res.render('userViews/register', {
				title: "Registro",
				errors: resultsValidations.mapped(), // mapped() used to transform the validations results into a literal object.
				oldData: req.body,
				oldFile: req.file
			});
		}; */

		// delete user.password_confirm;

        try {

            let newData = req.body;
			console.log(newData);

            const newUser = await db.User.create({
                first_name : newData.first_name,
                last_name : newData.last_name,
                username: newData.user_name,
                birth_date : newData.birth_date,
                email : newData.email,
                image : req.file ? req.file.filename : "default-user-photo.png",
                type : newData.user_type,
                phone: Number(newData.phone),
                password: newData.password,
            });

			const newAdress = await db.Address.create({
				street: newData.street,
				number: newData.number,
				city: newData.city,
				province: newData.province,
				country: newData.country,
				user_id: newUser.id
			});

			console.log(newUser);
			console.log(newAdress);

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
			let searchedUser = await db.User.findOne({
				raw: true,
				nest: true,
				include: [
					{ association: 'address' },
				],
			},
			{where:{email: req.body.email}});

			console.log(searchedUser);
		
			if (!searchedUser) {
			//Search user by username
				searchedUser = await db.User.findOne({
					raw: true,
					nest: true,
					include: [
						{ association: 'address' },
					],
				},
				{
					where:{username: req.body.user_name}
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
			/* delete userToLoggin.password; */ // We want to update password at profile by now

			//Add the logged user to session!
					
			req.session.userLogged = userToLoggin;
					
			//Create cookie called "userEmail" to save user logged when "RememberUser ichecked"
			console.log(userToLoggin);
					
			if (req.body.rememberUser) {
				res.cookie('userEmail', searchedUser.email, { maxAge: 1000 * 60 * 60 * 24 * 360 });
			}
					
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

			const updatedUser = await db.User.update({
				first_name: newData.first_name,
				last_name: newData.last_name,
				username: newData.user_name,
				birth_date: newData.birth_date,
				// email: newData.email,
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

			res.redirect('/user/profile');

		} catch (error) {
			console.log(error);
			res.redirect('/mainViews/error');
		}
	},


    hardDeleteUser: async (req, res) => {

        try {
            let DeletedUser = await db.User.destroy({
                where: {
                    id: req.params.id
                },
                force: true // Hard deletion with paranoid model
            });
           
            return res.redirect('userViews/login');
        } catch (error) {
            console.log(error);
            res.redirect('/mainViews/error');
        };
    }
	
}

module.exports = controller;