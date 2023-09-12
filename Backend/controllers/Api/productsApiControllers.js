const db = require('../../database/models');
const { validationResult } = require('express-validator');
/* const { where } = require('sequelize'); */
const Op = db.Sequelize.Op;

const productsController = {
    getAll: async (req, res) => {

        try {
            const products = await db.Product.findAll({
                raw: true,
                nest: true,
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
            },
            );

            const port = '3001';

            //-------Replaced some properties for a better access ------//
            products.forEach(product => {
                //Image path
                const imagePath = `http://localhost:${port}/images/products/${product.image}`;
                //Change Date format
                product.createdDate = new Date(product.created_at).toLocaleDateString();
                product.updatedDate = product.updated_at != null ? new Date(product.updated_at).toLocaleDateString() : '(Sin cambios)';
                product.softDeletedDate = product.deleted_at != null ? new Date(product.deleted_at).toLocaleDateString() : '(Aún venta)';
                product.category = product.category.name;
                product.subcategory = product.subcategory.name;
                product.type = product.type.name;
                product.manufacturer = product.manufacturer.name;
                product.image = imagePath;
            });


            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: products.length,
                    url: 'api/product/list'
                },
                data: products
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET ALL."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getAllByCategory: async (req, res) => {

        try {
            const products = await db.Category.findAll({
                raw: true,
                nest: true,
                include: [
                    { association: 'categoryProducts' },
                ],
                where: {
                    name: req.query.category
                }
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: products.length,
                    url: 'api/product/list/category'
                },
                data: products
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET ALL BY CATEGORY."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getAllBySubcategory: async (req, res) => {

        try {
            const products = await db.Subcategory.findAll({
                raw: true,
                nest: true,
                include: [
                    { association: 'subcategoryProducts' },
                ],
                where: {
                    name: req.query.subcategory
                }
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: products.length,
                    url: 'api/product/list/subcategory'
                },
                data: products
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET ALL BY SUBCATEGORY."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getAllByType: async (req, res) => {

        try {
            const products = await db.Type.findAll({
                raw: true,
                nest: true,
                include: [
                    { association: 'typeProducts' },
                ],
                where: {
                    name: req.query.type
                }
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: products.length,
                    url: 'api/product/list/type'
                },
                data: products
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET ALL BY TYPE."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getAssociationsStats: async (req, res) => {

        try {
            const products = await db.Product.findAll({
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'favproduct' },
                    { association: 'manufacturer' }
                ],
                where: {
                    deleted_at: null
                }
            });

            const productsJSON = products.map(product => product.toJSON()); // Instead of RAW and NEST

            productsJSON.forEach(product => {
                //Image path
                const port = '3001';
                const imagePath = `http://localhost:${port}/images/products/${product.image}`;
                product.image = imagePath;
            });

            //Fav Counts
            let favCounts = {};
            let favArray = productsJSON.map(product => {
                return product.favproduct.length ? {
                    sum: product.favproduct.length,
                    title: product.title,
                    description: product.description,
                    image: product.image
                } : null;
            });
            let filteredArray = favArray.filter(item => item !== null && item !== undefined);//To eliminate null values
            favCounts = filteredArray.sort((a, b) => b.sum - a.sum); //To order desc.

            let typeCounts = {};
            let categoryCounts = {};
            let subcategoryCounts = {};
            let manufacturerCounts = {};

            //Categoy Counts
            productsJSON.forEach(product => {
                if (product.category && product.category.name in categoryCounts) {
                    categoryCounts[product.category.name]++;
                } else if (product.category) {
                    categoryCounts[product.category.name] = 1;
                };
            });

            //Types Counts
            productsJSON.forEach(product => {
                if (product.type && product.type.name in typeCounts) {
                    typeCounts[product.type.name]++;
                } else if (product.type) {
                    typeCounts[product.type.name] = 1;
                };
            });

            //Subcategory Counts
            productsJSON.forEach(product => {
                if (product.subcategory && product.subcategory.name in subcategoryCounts) {
                    subcategoryCounts[product.subcategory.name]++;
                } else if (product.subcategory) {
                    subcategoryCounts[product.subcategory.name] = 1;
                };
            });

            //Manufacturer Counts
            productsJSON.forEach(product => {
                if (product.manufacturer && product.manufacturer.name in manufacturerCounts) {
                    manufacturerCounts[product.manufacturer.name]++;
                } else if (product.manufacturer) {
                    manufacturerCounts[product.manufacturer.name] = 1;
                };
            });

            let response = {
                meta: {
                    status: 200,  //200 for success with content,
                    success: true,
                    url: 'api/product/stats'
                },
                total_products: productsJSON.length,
                typeCounts,
                categoryCounts,
                subcategoryCounts,
                manufacturerCounts,
                favCounts
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
    getSalesAmountsPerMonth: async (req, res) => {

        try {
            const orderDetails = await db.OrderDetail.findAll();

            const monthsMap = {
                '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
                '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
                '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic'
            };

            const salesAmountsPerMonth = {};

            orderDetails.forEach(order => {
                const orderDate = new Date(order.order_date);
                const detailTotal = Number(order.detail_total)
                const month = monthsMap[(orderDate.getMonth() + 1).toString().padStart(2, '0')]
                if (!salesAmountsPerMonth[month]) {
                    salesAmountsPerMonth[month] = detailTotal;
                } else {
                    salesAmountsPerMonth[month] += detailTotal;
                };
            });

            const results = [];

            for (const month in salesAmountsPerMonth) {
                results.push({ month, count: salesAmountsPerMonth[month] })
            };

            let response = {
                meta: {
                    status: 200,  //200 for success with content,
                    success: true,
                    url: 'api/product/stats/sales-amounts-per-month'
                },
                salesAmountsPerMonth: results,
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
    getPages: async (req, res) => {

        const currentPage = Number(req.query.page) || 1;
        const productsPerPage = Number(req.query.per_page) || 10;

        try {
            const offset = (currentPage - 1) * productsPerPage;

            const products = await db.Product.findAll({
                raw: true,
                nest: true,
                limit: productsPerPage,
                offset: offset,
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
            },
            );


            const port = '3001';

            //-------Replaced some properties for a better access ------//
            products.forEach(product => {
                //Image path
                const imagePath = `http://localhost:${port}/images/products/${product.image}`;
                //Change Date format
                product.createdDate = new Date(product.created_at).toLocaleDateString();
                product.updatedDate = product.updated_at != null ? new Date(product.updated_at).toLocaleDateString() : '(Sin cambios)';
                product.softDeletedDate = product.deleted_at != null ? new Date(product.deleted_at).toLocaleDateString() : '(Aún venta)';
                product.category = product.category.name;
                product.subcategory = product.subcategory.name;
                product.type = product.type.name;
                product.manufacturer = product.manufacturer.name;
                product.image = imagePath;
            });

            let response = {
                meta: {
                    status: 200, //200 for success with content,
                    success: true,
                    total: products.length,
                    currentPage: currentPage,
                    url: 'api/product/getPages?page=1&per_page=10'
                },
                data: products
            };
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request at GET PAGES."
                    //503 (Service Unavailable) to indicate that the server is currently unable to handle the request.
                }
            });
        };
    },
    getDetail: async (req, res) => {

        try {
            let id = Number(req.params.id);
            const product = await db.Product.findByPk(id, {
                raw: true,
                nest: true,
                include: [
                    { association: 'category' },
                    { association: 'subcategory' },
                    { association: 'type' },
                    { association: 'manufacturer' }],
            },
            );
            //-------Replaced some properties for a better access ------//

            //Image path
            const port = '3001';
            const imagePath = `http://localhost:${port}/images/products/${product.image}`;
            product.image = imagePath;
            //Change Date format
            product.createdDate = new Date(product.created_at).toLocaleDateString();
            product.updatedDate = product.updated_at != null ? new Date(product.updated_at).toLocaleDateString() : '(Sin cambios)';
            product.softDeletedDate = product.deleted_at != null ? new Date(product.deleted_at).toLocaleDateString() : '(Aún venta)';
            //Change associations
            product.category = product.category.name;
            product.subcategory = product.subcategory.name;
            product.type = product.type.name;
            product.manufacturer = product.manufacturer.name;


            let response = {};

            if (product) {
                response = {
                    meta: {
                        status: 200, // 200 for success with content,
                        success: true,
                        total: product.length,
                        url: '/api/product/:id/detail'
                    },
                    data: product
                };
            } else {
                response = {
                    meta: {
                        status: 204, //204 for success without content,
                        success: false,
                        total: product.length,
                        error: "The product searched does not exist at DDBB",
                        url: '/api/product/:id/detail'
                    },
                    data: ""
                };
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET DETAIL."
                }
            });
        };

    },
    getNewests: async (req, res) => {
        try {
            let newestProducts = await db.Product.findAll({
                order: [
                    ['created_at', 'DESC']
                ],
                limit: 10
            });

            newestProducts.forEach(product => {
                //Image path
                const port = '3001';
                const imagePath = `http://localhost:${port}/images/products/${product.image}`;
                product.image = imagePath;
            });

            let response = {
                meta: {
                    status: 200, // 200 for success with content,
                    success: true,
                    total: newestProducts.length,
                    url: '/api/product/newests'
                },
                data: newestProducts
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET NEWESTS."
                }
            });
        };
    },
    getMostSelled: async (req, res) => {
        try {
            let mostSelledProducts = await db.Product.findAll({
                order: [
                    ['sales_amount', 'DESC']
                ],
                limit: 5,
                where: {
                    sales_amount: { [Op.gt]: 5 }
                }
            });

            mostSelledProducts.forEach(product => {
                //Image path
                const port = '3001';
                const imagePath = `http://localhost:${port}/images/products/${product.image}`;
                product.image = imagePath;
                //Change Date format
                product.createdDate = new Date(product.created_at).toLocaleDateString();
                product.updatedDate = product.updated_at != null ? new Date(product.updated_at).toLocaleDateString() : '(Sin cambios)';
                product.softDeletedDate = product.deleted_at != null ? new Date(product.deleted_at).toLocaleDateString() : '(Aún venta)';
                product.image = imagePath;
            });

            let response = {
                meta: {
                    status: 200, //  200 for success with content.
                    success: true,
                    total: mostSelledProducts.length,
                    url: '/api/product/mostSelled'
                },
                data: mostSelledProducts
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET MOST SELLED."
                }
            });
        };
    },
    getSale: async (req, res) => {
        try {
            const minDiscountPercentage = 14;

            let SaleProducts = await db.Product.findAll({
                where: {
                    discount: { [Op.gte]: minDiscountPercentage }
                },
                order: [
                    ['discount', 'DESC']
                ]
            });

            let response = {
                meta: {
                    status: 200, // 200 for success with content,
                    success: true,
                    total: SaleProducts.length,
                    sale: `List of products with discount greater than ${minDiscountPercentage}%`,
                    url: '/api/product/sale'
                },
                data: SaleProducts
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request GET SALE."
                }
            });
        };
    },
    postCreate: async (req, res) => {
        try {
            /* Previous validations to create a new product */
            const resultsValidations = validationResult(req);

            if (resultsValidations.errors.length > 0) {
                return res.status(400).json({
                    meta: {
                        success: false,
                        status: 400,
                        errors: validationErrors.errors
                    }
                });
                //400 Bad Request: the request is malformed or has invalid data, such as missing required fields or improperly formatted input.
            };

            let newData = req.body;

            let createdProduct = await db.Product.create({
                title: newData.title,
                description: newData.description,
                info: newData.info,
                stock: Number(newData.stock),
                price: Number(newData.price),
                discount: Number(newData.discount),
                sales_amount: 0,
                image: newData.file ? newData.file : "default-product-image.jpg",
                category_id: Number(newData.category),
                subcategory_id: Number(newData.subcategory),
                type_id: Number(newData.type),
                user_id: req.session.userLogged.id,
                manufacturer_id: 1 // Only "Green Good" by now ...
            });

            let response = {};

            if (createdProduct) {
                response = {
                    meta: {
                        status: 201, // 201 for successful resource creation
                        success: true,
                        message: "Product created successfully.",
                        url: 'api/product/create',
                    },
                    data: createdProduct
                };
            } else {
                response = {
                    meta: {
                        status: 500, // This code indicates that something went wrong on the server side.
                        success: false,
                        message: "Product creation failed.",
                        url: 'api/product/create'
                    }
                };
            };
            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request POST CREATE."
                }
            });
        };
    },
    putUpdate: async (req, res) => {
        try {
            /* Previous validations to update a product */
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
            let idProduct = req.params.id;
            let newData = req.body;

            let updatedProduct = await db.Product.update({
                title: newData.title,
                description: newData.description,
                info: newData.info,
                stock: Number(newData.stock),
                price: Number(newData.price),
                discount: Number(newData.discount),
                sales_amount: Number(newData.sales_amount),
                image: newData.file ? newData.file : "default-product-image.jpg",
                category_id: Number(newData.category),
                subcategory_id: Number(newData.subcategory),
                type_id: Number(newData.type),
                user_id: req.session.userLogged.id,
                manufacturer_id: 1 // Only "Green Good" by now ...
            }, {
                where: { id: idProduct }
            });

            let response = {};

            if (updatedProduct) {
                response = {
                    meta: {
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        message: "Product updated successfully.",
                        url: 'api/product/:id/update',
                    },
                    data: updatedProduct
                };
            } else {
                response = {
                    meta: {
                        status: 500,
                        success: false,
                        message: "Product edition failed.",
                        url: 'api/product/:id/update'
                    }
                };
            };

            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request PUT UPDATE."
                }
            });
        };
    },
    delete: async (req, res) => {
        try {
            let idProduct = req.params.id;

            let deletedProduct = await db.Product.destroy({ where: { id: idProduct }, force: true });

            let response = {};
            if (deletedProduct) {
                response = {
                    meta: {
                        status: 201, //, 201 for successful resource deletion
                        success: true,
                        message: "Product deleted successfully.",
                        url: 'api/product/:id/deleted',
                    },
                    data: deletedProduct
                };
            } else {
                response = {
                    meta: {
                        status: 500,
                        success: false,
                        message: "Product detetion failed.",
                        url: 'api/product/:id/deleted'
                    }
                };
            };
            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request DELETE."
                }
            });
        };
    },
    softDelete: async (req, res) => {
        try {
            let idProduct = req.params.id;

            let softDeletedProduct = await db.Product.destroy({ where: { id: idProduct } });

            let response = {};
            if (softDeletedProduct) {
                response = {
                    meta: {
                        status: 201, //, 201 for successful resource deletion
                        success: true,
                        message: "Product discontinued successfully.",
                        url: 'api/product/:id/softdelete',
                    },
                    data: softDeletedProduct
                };
            } else {
                response = {
                    metsa: {
                        status: 500,
                        success: false,
                        message: "Product discontinuation failed.",
                        url: 'api/product/:id/softdelete'
                    }
                };
            };
            return res.json(response);

        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request SOFT DELETE."
                }
            });
        };
    }
};

module.exports = productsController;