const pool = require('../config/database');
const bcrypt = require('bcrypt');
const sendMail = require('../config/nodemailer');


/**
 * 
 * @desc Get all the users
 * @route GET /api/users
 * @acces Public 
 */
exports.getUsers = (req, res, next) => {

    const sql = "SELECT id, email, name, surname, isAdmin, create_time FROM users"

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
        else return res.status(200).json({
            success: true,
            data: results,
        })
    })
}

/**
 * 
 * @desc Get user by id
 * @route GET /api/users/:id
 * @acces Private 
 */
exports.getUser = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT email, name, surname, isAdmin, create_time FROM users WHERE id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                success: false,
                error
            });
        }
        else if (results.length > 0) {
            res.status(200).json({
                success: true,
                data: results,
            })
        }
        else return res.status(404).json({
            success: false,
            error: "User not found"
        });
    });
}

/**
 * 
 * @desc Delete user based on id
 * @route Delete /api/users/:id
 * @acces Private 
 */
exports.deleteUser = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM users WHERE id = ${pool.escape(id)}`

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else if (!results.affectedRows) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        else return res.status(200).json({
            success: true,
            data: results
        });
    });
}

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    console.log(email);
    const newPassword = Math.random().toString(36).substring(2, 12);
    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err,
            });
        }
        else {
            const sql = `UPDATE users SET password = ? WHERE email = ?`;
            pool.query(sql, [hash, email], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err,
                    });
                }
                else {
                    const mail = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Nuova password Moda Berti",
                        html: `<h1>Richiesta password provvisoria</h1><p>Questa è la tua password provvisoria: ${newPassword}.</p><p>Ti inviatiamo a cambiarla appena effettuerai il login</p><br><h3>Il team di Moda Berti</h3>`,
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
                        data: results
                    });
                }
            });
        }
    });
}