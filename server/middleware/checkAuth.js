const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, process.env.JWT_ACCESS_SECRET);
        console.log(decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Access Denied",
        });
    }
};
