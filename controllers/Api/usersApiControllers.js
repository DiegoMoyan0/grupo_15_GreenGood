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

            console.log( usersWithDetail.length );
                        
            const totalPages = (usersWithDetail.length + limit - 1) / limit;
            const nextPage = page < totalPages ? page + 1 : null
            const prevPage = page > 1 ? page - 1 : null


            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    count: usersWithDetail.length,
                    url: 'api/user/users',
                    next:  nextPage ? `/api/user/users?page=${nextPage}` : null,
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
                attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'type','username'],
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