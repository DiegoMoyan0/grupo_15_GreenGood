const path = require('path');
const db = require('../../database/models');
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;
/* const moment = require('moment'); */


const usersController = {


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