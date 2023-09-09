let db = require("../database/models");


 let  validationsUserExistenceMw = async (req, res, next)  =>{

    const email = req.session.email
    
    console.log(req.session.email)
    console.log(req.body.email)

    //if (!req.body.email || !req.body.identity_document) {
    if (!email) {
        return res.status(400).json({ error: 'You do not have access to this route or the email/identity document validations failed.' });
    }

    let emailInDb = ''

    emailInDb = await db.User.findOne({
        where: { email: email },
    });
    

    if (!emailInDb) {
        return res.status(400).json({ error: 'You do not have access to this route or the email/identity document validations failed.' });
    } else {
        next();
    }
}

module.exports = validationsUserExistenceMw;


