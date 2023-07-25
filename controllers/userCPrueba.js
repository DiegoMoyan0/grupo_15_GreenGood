const controller = {

	updateUser: async (req, res) => {

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

		let userNameInDb = await db.User.findOne(
			{where:{username: req.body.user_name}});

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

		let mailInDb = await db.User.findOne(
			{where:{email: req.body.email}});

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

		try {
			let newData = req.body;

			const updatedUser = await db.User.update({
				name_data: newData.first_name,
				name_data: newData.last_name,
				user_name: newData.user_name,
				birth_date: newData.birth_date,
				email: newData.email,
				password: newData.password,
				adress: newData.adress,
				user_image: newData.user_image,
				user_type: newData.user_type,
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
}

module.exports = controller;