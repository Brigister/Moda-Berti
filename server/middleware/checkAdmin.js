module.exports = (req, res, next) => {
    if (req.userData.isAdmin) {
        next();
    }
    else {
        return res.status(401).json({
            message: "Access Denied - Admin",
        });
    }
};
