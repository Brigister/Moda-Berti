const { sign } = require('jsonwebtoken');

exports.createAccessToken = (id, isAdmin) => {
    return sign({ id, isAdmin }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15min",
        algorithm: "HS256",
    });
}

exports.createRefreshToken = (id, isAdmin) => {
    return sign({ id, isAdmin }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
        algorithm: "HS256",
    });
}