let db = require("../../database/models");

const controller = {

    getAllByUser: async (req, res) => {
     
        try {
            const idUser = req.params.idUser;
            
            let favItems = await db.LikedProduct.findAll({
                where: { user_id: idUser },
                nest: true,
                include: ["user", "favproduct"],
            });
            let prevFavsArray = favItems.map(item => item.product_id);

            let response = {};
            
            if(favItems) {
                response = {
                    meta: {
                        status : 200, //200 for success with content,
                        success: true,
                        url: 'http://localhost:3001/api/favProducts/all/:idUser/get'
                    },
                    data: {
                        favStorage: prevFavsArray,
                        favItems
                    }
                };
            }else{
                response = {
                    meta: {
                        status : 204, //204 for success without content,
                        success: false,
                        url: 'http://localhost:3001/api/favProducts/all/:idUser/get'
                    },
                    data: favItems
                }
            }; 

            return res.json(response);

            console.log("Dentro del set time out");
            
        } catch (error) {
            console.log(error);
            res.json({
                meta: {
                    status: 503,
                    success: false,
                    message: "An error occurred while processing your request at fav products."
                }
            });
        };

    },

    storeFavProducts: async (req, res) => {
    
        try {
            const idProducts = req.body.favProducts;
            const idUser = req.params.idUser;
            console.log(idProducts);

            let response = {};

            if(!idProducts || idProducts == ""){
                return response ={
                    meta: {
                        status: 201,
                        success: true,
                        message: `0 fav Products from user id = ${idUser} at localstorage`,
                        url: 'http://localhost:3001/api/favProducts/:idUser/store'
                    }
                };
            };

            let idsArray = idProducts.split(',');

            //First clear all the previous fav products from the user logged
            await db.LikedProduct.destroy({
                where:{
                    user_id: idUser
                }
            });

            let createdFavProducts = false;

            //Finally for each id product, create a fav product with the current user id

            idsArray.forEach(async idProd => {
                let idProdNum = Number(idProd.trim())
                if(idProdNum && idProdNum > 0){
                    createdFavProducts = true;
                    await db.LikedProduct.create({
                        product_id: idProdNum,
                        user_id: idUser
                    });
                }; 
            });

            if(createdFavProducts){
                response ={
                    meta:{
                        status: 201, //, 201 for successful resource edition
                        success: true,
                        updated: true,
                        message: `Fav Products from user id = ${idUser} updated with products '${idProducts}' successfully.`,
                        url: 'http://localhost:3001/api/favProducts/:idUser/store',
                    },                   
                    data: idProducts
                };
            }else {
                response ={
                    meta: {
                        status: 500,
                        success: false,
                        message: `Error while updating fav Products from user id = ${idUser}`,
                        url: 'http://localhost:3001/api/favProducts/:idUser/store'
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
                    message: "An error occurred while processing your request."
                }
            });            
        }; 
    }
};

module.exports = controller;

