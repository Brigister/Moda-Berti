const pool = require('../config/database');

/**
 * 
 * @desc Get all the users
 * @route GET /api/users
 * @acces Public 
 */
exports.getUsers = (req, res, next) => {

    const sql = "SELECT id, email, name, surname FROM users"

    pool.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
        else return res.status(200).json({
            success: true,
            results,
        })
    })
}

/**
 * 
 * @desc Get user by id
 * @route GET /api/users/:id
 * @acces Private 
 */
exports.getUser = (req, res, next) => {
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
exports.deleteUser = (req, res, next) => {
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