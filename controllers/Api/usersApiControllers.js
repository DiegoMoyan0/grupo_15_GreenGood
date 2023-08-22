const path = require('path');
const db = require('../../database/models');
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;
/* const moment = require('moment'); */


const usersController = {

    getAll: async (req, res) => {

        try {
            const users = await db.User.findAll({
                raw: true,
                nest: true,
                // include: ["address"],
                attributes: ['id', 'first_name', 'last_name', 'email'] //Pending to check detail url
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    count: users.length,
                    url: 'api/user/users'
                },
                users: users
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