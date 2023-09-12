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

    getAll: async (req, res) => {

        try {

            const page = parseInt(req.query.page) || 1
            const limit = 10
            const offset = (page - 1) * limit

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

    getUsersList: async (req, res) => {

        try {
            const users = await db.User.findAll({
                raw: true,
                nest: true,
            },
            );
            const port = '3001'

            users.forEach(user => {
                //Image path
                const imagePath = `http://localhost:${port}/images/users/${user.image}`;
                //Change Date format
                user.created_at = new Date(user.created_at).toLocaleDateString();
                user.updated_at = user.updated_at != null ? new Date(user.updated_at).toLocaleDateString() : '(Sin cambios)';
                user.image = imagePath;
            });


            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: users.length,
                    url: 'api/user/full-list'
                },
                usersList: users
            };
            return res.json(response);
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

    getUserById: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                raw: true,
                nest: true,
                attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'type', 'username'],
            });

            const port = '3001'

            //Image path
            const imagePath = `http://localhost:${port}/images/users/${user.image}`;
            //Change Date format
            user.image = imagePath;

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/users/:id'
                },
                users: user
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

    getUserDetailById: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Address,
                        as: 'address',
                    }
                ],
            });

            const port = '3001'

            //Image path
            const imagePath = `http://localhost:${port}/images/users/${user.image}`;
            //Change Date format
            user.image = imagePath;
            typeof user.created_at === 'undefined' ? user.created_at = '01/01/2023' : user.created_at
            typeof user.updated_at === 'undefined' ? user.updated_at = '01/01/2023' : user.created_at

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/users/:id/detail'
                },
                user: user
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

    getUserImageById: async (req, res) => {


        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: ['image', 'id'],
            });

            if (!user) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        success: false,
                        message: 'User Img not found',
                    },
                });
            }

            const port = '3001'

            const imagePath = `http://localhost:${port}/images/users/${user.image}`;

            let response = {
                meta: {
                    status: 200,
                    success: true,
                    url: 'api/user/image/:id',
                },
                userImage: imagePath,
            };

            return res.json(response)


        } catch (error) {
            console.log(error);
            res.status(500).json({
                meta: {
                    status: 503,
                    success: false,
                    message: 'An error occurred while processing your request.',
                },
            });
        }
    },


    getUserByType: async (req, res) => {

        try {
            const users = await db.User.findAll({
                attributes: ['type'],
                raw: true,
            });

            let userCount = {};

            users.forEach(user => {
                if (user.type in userCount) {
                    userCount[user.type]++;
                } else {
                    userCount[user.type] = 1;
                }
            });

            let response = {
                meta: {
                    status: 200,  //200 for success with content,
                    success: true,
                    url: 'api/user/type-count'
                },
                counts: userCount,
                total_users: users.length
            };

            return res.json(response)
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: 'An error occurred while processing your request.',
                },
            });
        }
    },

    GetLastRegistered: async (req, res) => {
        try {
            let lastUserRegistered = await db.User.findOne({
                raw: true,
                nest: true,
                order: [
                    ['created_at', 'DESC']
                ],
                include: [
                    {
                        model: db.Address,
                        as: 'address',
                        attributes: ['country', 'province']
                    }
                ],
                attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'type', 'created_at'],
            });


            const port = '3001'

            //Image path
            const imagePath = `http://localhost:${port}/images/users/${lastUserRegistered.image}`;
            //Change Date format
            lastUserRegistered.image = imagePath;

            let response = {
                meta: {
                    status: 200,  //200 for success with content,
                    success: true,
                    total: 1,
                    url: '/api/user/last-registered'
                },
                user: lastUserRegistered,
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });

        }
    },

    GetMonthlyRegistrations: async (req, res) => {

        try {

            const users = await db.User.findAll();

            const monthsMap = {
                '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
                '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
                '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic'
            };

            let registrationsByMonth = {};

            users.forEach(user => {
                const createdAt = new Date(user.created_at)
                const month = monthsMap[(createdAt.getMonth()+1).toString().padStart(2, '0')]
                if (!registrationsByMonth[month]) {
                    registrationsByMonth[month] = 1
                } else {
                    registrationsByMonth[month]++
                }
            });

            const sortedMonths = {};
            Object.keys(monthsMap).forEach(key => {
              const month = monthsMap[key];
              if (registrationsByMonth[month]) {
                sortedMonths[month] = registrationsByMonth[month];
              }
            });
            
            registrationsByMonth = sortedMonths
            const results = [];

            for (const month in registrationsByMonth) {
                results.push({ month, count: registrationsByMonth[month] })
            }

            let response = {
                meta: {
                    status: 200,
                    success: true,
                    total: results.length,
                    url: '/api/user/monthly-registrations'
                },
                registrationsByMonth: results
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request."
                }
            });
        }
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
                        status: 503,
                        success: false,
                        message: "User profile edition failed.",
                        url: 'api/user/users/:id/update'
                    }
                };
            };

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

            if (newUser && newAdress) {
                response = {
                    meta: {
                        status: 201, // 201 for successful resource creation
                        success: true,
                        message: "User registered successfully.",
                        url: 'api/user/register',
                    },
                    data: newUser
                };
            } else {
                response = {
                    meta: {
                        status: 503, // This code indicates that something went wrong on the server side.
                        success: false,
                        message: "User registration failed.",
                        url: 'api/user/register'
                    }
                };
            };
            res.json(response);

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
            if (deletedUser) {
                response = {
                    meta: {
                        status: 201, //, 201 for successful resource deletion
                        success: true,
                        message: "User profile deleted successfully.",
                        url: 'api/user/:id/delete',
                    },
                    data: deletedUser
                };
            } else {
                response = {
                    meta: {
                        status: 503,
                        success: false,
                        message: "User profile deletion failed.",
                        url: 'api/user/:id/delete'
                    }
                };
            };
            res.json(response);

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

    getProvinceSum: async (req, res) => {

        try {

            const orderDetail = await db.OrderDetail.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Address,
                        as: 'userDataAddress',
                        attributes: ['province']
                    }
                ],
                group: ['userDataAddress.province', 'OrderDetail.detail_total']
            });

            let provinceSum = orderDetail

            const provinceTotals = {};

            provinceSum.forEach(provinceOrder => {
                const province = provinceOrder.userDataAddress.province;
                const detailTotal = parseFloat(provinceOrder.detail_total);

                if (province) {
                    provinceTotals[province] = (provinceTotals[province] || 0) + detailTotal;
                }
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/province-sum',
                },
                provinceSum: provinceTotals
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

    getCountrySum: async (req, res) => {

        try {

            const orderDetail = await db.OrderDetail.findAll({
              //  raw: true,
               // nest: true,
               include: [
                {
                    model: db.Address,
                    as: 'address',
                    attributes: ['country']
                }
            ],
    
            
             //group: ['country', 'OrderDetail.detail_total']
        },
        );

            let countrySum = orderDetail

            const countryTotals = {};

            countrySum.forEach(countryOrder => {
                const country = countryOrder.address.country; // Accede al país a través de la asociación 'address'
                const detailTotal = parseFloat(countryOrder.detail_total);
              
                if (country) {
                  if (!countryTotals[country]) {
                    countryTotals[country] = 0;
                  }
                  countryTotals[country] += detailTotal;
                }
              });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/country-sum',
                },
                countrySum: countryTotals,
              //  countryTotal: orderDetail
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

    getUserCountry: async (req, res) => {

        try {

            const users = await db.User.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Address,
                        as: 'address',
                        attributes: ['country']
                    }
                ],
            });

            const userPerCountry = {};
            users.forEach(user => {
                const country = user.address.country;
                userPerCountry[country] = (userPerCountry[country] || 0) + 1;
            });


            const countryShortNames = {
                Colombia: 'co',
                Argentina: 'ar',
                Brasil: 'br',
                Chile: 'cl',
                Perú:'pe',
                Paraguay: 'py',
                Ecuador: 'ec',
                Venezuela: 've',
                Bolivia: 'bo',
                Uruguay: 'uy',
                Suriname: 'sr',
                Guyana: 'gy'
              };
              
              const userCountrydata = [];
              
              for (const country in userPerCountry) {
                const countryShortName = countryShortNames[country];
                if (countryShortName) {
                    userCountrydata.push([countryShortName, userPerCountry[country]]);
                }
              }

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/users-per-country',
                },
                countryData:  userCountrydata,
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

    getUserProvince: async (req, res) => {

        try {

            const users = await db.User.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Address,
                        as: 'address',
                        attributes: ['province']
                    }
                ],
            });

            const userPerProvince = {};
            users.forEach(user => {
                const country = user.address.province;
                userPerProvince[country] = (userPerProvince[country] || 0) + 1;
            });


            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    url: 'api/user/users-per-province',
                },
                userPerProvince: userPerProvince,
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


};

module.exports = usersController;