const path = require('path');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;
/* const moment = require('moment'); */

const productsController = {
    'list': async (req, res) => {

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

            //-------To render only the name values of associated tables
            products.forEach(product => {
                product.category = product.category.name;
                product.subcategory = product.subcategory.name;
                product.type = product.type.name;
                product.manufacturer = product.manufacturer.name;
            });

            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }; 
            return res.json(response);
        }catch (error) {
            console.log(error);
            res.json({meta: {catch: error}});
        };
    },
    'detail':  async (req, res) => {

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
            let response = {};

            if(product){
                response = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/product/:id'
                    },
                    data: product
                };
            }else{
                response = {
                    meta: {
                        status: 204,
                        total: product.length,
                        error: "The product searched does not exist at DDBB",
                        url: '/api/product/:id'
                    },
                    data: ""
                };
            };
            
            return res.json(respuesta);
    
        } catch (error) {
            console.log(error);
            res.json({meta: {catch: error}});
        };

    },
    'new': async (req, res) => {
        try {
            let newestProducts =  await db.Product.findAll({
                order : [
                    ['created_at', 'DESC']
                ],
                limit: 10
            });
    
            let response = {
                meta: {
                    status: 200,
                    total: newestProducts.length,
                    url: '/api/product/newests'
                },
                data: newestProducts
            };
    
            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({meta: {catch: error}});
        };
    },
    'mostSelled': async (req, res) => {
        try {
            let mostSelledProducts =  await db.Product.findAll({
                order : [
                    ['sales_amount', 'DESC']
                ],
                limit: 5
            });
    
            let response = {
                meta: {
                    status: 200,
                    total: mostSelledProducts.length,
                    url: '/api/product/mostSelled'
                },
                data: mostSelledProducts
            };
    
            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({meta: {catch: error}});
        };
    },
    'sale': async (req, res) => {
        try {
            let SaleProducts =  await db.Product.findAll({
                where: {
                    discount: {[db.Sequelize.Op.gte] : 14}
                },
                order: [
                    ['discount', 'DESC']
                ]
            });
    
            let response = {
                meta: {
                    status: 200,
                    total: SaleProducts.length,
                    sale: "Discount greater than 14%",
                    url: '/api/product/sale'
                },
                data: SaleProducts
            };
    
            return res.json(response);
            
        } catch (error) {
            console.log(error);
            res.json({meta: {catch: error}});
        };
    }
}

module.exports = productsController;