const bcrypt = require('bcrypt');
const { verify } = require('jsonwebtoken');

const pool = require('../config/database');
const sendMail = require('../config/nodemailer');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

/**
 * @desc signup
 * @route POST /api/auth/signup
 * @acces Public 
 */
exports.signup = (req, res, next) => {
    const { email, password, name, surname } = req.body;
    console.log(req.body);
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
        else {
            const sql = `INSERT INTO users (email, password, name, surname) 
            VALUES (${pool.escape(email)}, ${pool.escape(hash)}, ${pool.escape(name)}, ${pool.escape(surname)})`;

            pool.query(sql, (error, results) => {

                if (error && error.code == "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        success: false,
                        error: "User already exist by given e-mail"
                    })
                }
                else if (error) {
                    return res.status(500).json({
                        success: false,
                        error: error
                    });
                }
                else {
                    const mail = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Verifica il tuo Account",
                        html: "<a href='http://localhost:3000/'>Clicca il seguente link per verificare il tuo account</a>",
                        auth: {
                            user: process.env.EMAIL,
                            refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
                            accessToken: process.env.NODEMAILER_ACCESS_TOKEN,
                            expires: 3599,
                        }
                    }
                    const emailResponse = sendMail(mail);
                    console.log(emailResponse);
                    return res.status(200).json({
                        success: true,
                        data: results,
                    })
                }
            })
        }
    })


}

/**
 * 
 * @desc Login an user
 * @route Post /api/auth/login
 * @acces Public 
 */
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const sql = `SELECT id, password, isAdmin FROM users WHERE email = ${pool.escape(email)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
        else if (!results[0]) {
            return res.status(401).json({
                success: false,
                error: "Wrong data"
            });
        }
        else {
            const { id, password: hash, isAdmin } = results[0];

            if (!bcrypt.compareSync(password, hash)) {
                return res.status(401).json({
                    success: false,
                    error: "Wrong data"
                })
            }
            else {
                /* req.session.userId = id;
                req.session.isAdmin = isAdmin; */

                res.cookie("jwt", createRefreshToken(id, isAdmin), {
                    httpOnly: true
                });

                return res.status(200).json({
                    success: true,
                    token: createAccessToken(id, isAdmin),
                })
            }
        }

    });
}

exports.logout = (req, res) => {
    res.clearCookie("jwt");

    res.status(200).json({
        success: true
    })
}


/**
 * 
 * @desc Edit user password
 * @route Patch /api/auth/editPassword
 * @acces Private 
 */
exports.editPassword = async (req, res, next) => {
    const { userId } = req.userData;
    const { password, newPassword } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }
        connection.beginTransaction(err => {
            if (err) {
                connection.rollback();
                return res.status(500).json({
                    success: false,
                    error: err
                });
            }
            const passwordSql = `SELECT password FROM users WHERE id = ${connection.escape(userId)}`
            connection.query(passwordSql, (error, results) => {
                if (error) {
                    connection.rollback();
                    return res.status(500).json({
                        success: false,
                        error
                    });
                }
                console.log('1query', results[0].password);

                bcrypt.compare(password, results[0].password, (err, match) => {
                    if (err) {
                        connection.rollback();
                        return res.status(500).json({
                            success: false,
                            error: err
                        });
                    }
                    else if (match) {
                        bcrypt.hash(newPassword, 10, (err, hash) => {
                            if (err) {
                                connection.rollback();
                                return res.status(500).json({
                                    success: false,
                                    error: err
                                });
                            }
                            const changePasswordSql = `UPDATE users SET password = ${connection.escape(hash)} WHERE id = ${connection.escape(userId)}`;

                            connection.query(changePasswordSql, (error, results) => {
                                if (error) {
                                    console.log(error)
                                    connection.rollback();
                                    return res.status(500).json({
                                        success: false,
                                        error
                                    });
                                }
                                connection.commit(err => {
                                    if (err) {
                                        connection.rollback();
                                        return res.status(500).json({
                                            success: false,
                                            error: err
                                        });
                                    }
                                });
                                return res.status(200).json({
                                    success: true,
                                });
                            });
                        });
                    }
                    else {
                        return res.status(500).json({
                            success: false,
                            error: "La password inserita è sbagliata"
                        })
                    }
                });
            });

        });
    });
}



exports.refreshToken = (req, res) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(500).json({ success: false, error: "No token" });
    }

    try {
        const { userId, isAdmin } = verify(token, process.env.JWT_REFRESH_SECRET);
        return res.status(200).json({
            success: true,
            token: createAccessToken(userId, isAdmin)
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}