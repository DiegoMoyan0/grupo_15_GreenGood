let db = require("../database/models");
const Op = db.Sequelize.Op;

let validateUserTokenMw = async (req, res, next) => {

    const token = req.session.token;

    if (!token) {
        return res.status(400).json({ error: 'You do not have access to this route or the Token validation failed.' });
    }

    const userToken = await db.User.findOne({
        where: {
            passwordresetToken: token,
            resetTokenExpiration: { [Op.gte]: new Date() },
        },
    });

    if (!userToken) {
        return res.status(400).json({ error: 'You do not have access to this route or the Token validation failed.' });
    } else {
        next();
    }
}

module.exports = validateUserTokenMw;






