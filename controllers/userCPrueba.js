const fs = require('fs');
const path = require('path');
const userModel = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require("../database/models");
const Op = db.Sequelize.Op;

const controller = {

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