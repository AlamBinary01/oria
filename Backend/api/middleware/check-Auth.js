const jwt = require("jsonwebtoken");
const secretKey= process.env.SECRET_KEY
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, secretKey);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed",
        });
    }
};



