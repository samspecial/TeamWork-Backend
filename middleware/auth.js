const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = verifyToken.userId;
        if (req.body.id && req.body.id !== userId) {
            throw "Invalid Request";
        } else (
            next()
        )
    } catch{
        res.status(404).json({
            status: "error",
            error: "Unathorized"
        })
    }
}