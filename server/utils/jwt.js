const { sign } = require('jsonwebtoken');

exports.createAccessToken = (userId, isAdmin) => {
    return sign({ userId, isAdmin }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15min",
        algorithm: "HS256",
    });
}

exports.createRefreshToken = (userId, isAdmin) => {
    return sign({ userId, isAdmin }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
        algorithm: "HS256",
    });
}