const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        let userId = verifyToken.userId;
        if (req.body.id && req.body.id !== userId) {
            throw "Invalid Request";
        } else {
            req.userId = verifyToken.userId;
            next()
        }
    } catch{
        res.status(404).json({
            status: "error",
            error: "Unathorized"
        })
    }
} 