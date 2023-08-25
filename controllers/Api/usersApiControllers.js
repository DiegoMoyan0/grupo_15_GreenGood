const path = require('path');
const db = require('../../database/models');
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;
/* const moment = require('moment'); */


const usersController = {

    getAll: async (req, res) => {

        try {


            const page = parseInt(req.query.page) || 1
            const limit = 10
            const offset = (page - 1) * limit

            console.log(req.query.page)

            const users = await db.User.findAll({
                raw: true,
                nest: true,
                attributes: ['id', 'first_name', 'last_name', 'email'],
                limit,
                offset
            });

            //Create function that adds the detail URL to the users

            let addUrl = (user) => {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    user_detail: `/api/user/users/${user.id}`
                };
            }

            //Apply or execute the function that adds the detail URL to the users

            const usersWithDetail = users.map(addUrl);

            //Pagination logic for user list

            console.log(usersWithDetail.length);

            const totalPages = (usersWithDetail.length + limit - 1) / limit;
            const nextPage = page < totalPages ? page + 1 : null
            const prevPage = page > 1 ? page - 1 : null


            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    count: usersWithDetail.length,
                    url: 'api/user/users',
                    next: nextPage ? `/api/user/users?page=${nextPage}` : null,
                    previous: prevPage ? `/api/user/users?page=${prevPage}` : null

                },
                users: usersWithDetail,
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },

    getUserById: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                raw: true,
                nest: true,
                attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'type', 'username'],
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/users/:id'
                },
                users: user,
                user_image: `/images/users/${user.image}`
            };
            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },

    updateUser: async (req, res) => {
        
        try {

            const resultsValidations = validationResult(req);

            if (resultsValidations.errors.length > 0) {
                return res.json({
                    meta: {
                        status: 400,
                        success: false,
                        errors: validationErrors.errors
                    }
                });
            };

            let newData = req.body;

            //--> To save the previous image of the updated user and use it when "req.file" is 'undefined':

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

            if(updatedUser && updatedAddress){

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

            let response = {};

            if (updatedUser && updatedAddress) {
                response = {
                    meta: {
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: "User profile updated successfully.",
                        url: 'api/user/users/:id/update',
                    },
                    user_data: newData
                };
            } else {
                response = {
                    meta: {
                        status: 500,
                        success: false,
                        message: "User profile edition failed.",
                        url: 'api/user/users/:id/update'
                    }
                };
            };

            /*

            if (response.meta.success) {
                res.redirect('/user/profile');
            } else {
                res.json(response);
            }

            */

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });
        };

    },

    registerUser: async (req, res) => {

		/* Previous validations to create a new user */
		const resultsValidations = validationResult(req);

        if (resultsValidations.errors.length > 0) {
            return res.json({
                meta: {
                    status: 400,
                    success: false,
                    errors: validationErrors.errors
                }
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


            let response = {};

            if(newUser && newAdress){
                response ={
                    meta: {
                        status: 201, // 201 for successful resource creation
                        success: true,
                        message: "User registered successfully.",
                        url: 'api/user/register',
                    },                    
                    data:newUser
                };
            }else{
                response ={
                    meta: {
                        status: 500, // This code indicates that something went wrong on the server side.
                        success: false,
                        message: "User registration failed.",
                        url: 'api/user/register'
                    }
                };
            };
            res.json(response);


             /*

            if (response.meta.success) {
                res.redirect('/user/login');
            } else {
                res.json(response);
            }

            */
                    
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });
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

            
            let response = {};
            if(deletedUser){
                response ={
                    meta: {
                        status: 201, //, 201 for successful resource deletion
                        success: true,
                        message: "User profile deleted successfully.",
                         url: 'api/user/:id/delete',
                    },
                    data:deletedUser
                };
            }else{
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: "User profile deletion failed.",
                        url: 'api/user/:id/delete'
                    }
                };
            };
            res.json(response);


            /*

            if (response.meta.success) {
               return res.redirect('/');
            } else {
                res.json(response);
            }

            */
			
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });
        };
    },

    verifyEmail: async (req, res) => {
        const emailInForm = req.query.email; // Get the email parameter from the query

        try {
            let exists = false;

            if (emailInForm.indexOf('@') > -1) {
                // Find a user by email and retrieve the 'email'
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
    },

};

module.exports = usersController;