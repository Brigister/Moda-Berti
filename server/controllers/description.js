const pool = require('../config/database');

exports.getDescriptions = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT id, description FROM descriptions WHERE product_id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else if (results.lenght < 1) {
            return res.status(404).json({
                success: false,
                error: "Description not found by given id"
            })
        }
        else return res.status(200).json({
            success: true,
            data: results
        });
    });
}

/**
 * 
 * @desc Add description to a product
 * @route  /api/descriptions/:id
 * @acces Private 
 */
exports.addDescription = (req, res) => {
    const { id } = req.params;

    const sql = `INSERT INTO descriptions (description, product_id) VALUES ?`;

    pool.query(sql,
        [req.body.data.map(info => [info.description, id])],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error
                });
            }
            else return res.status(200).json({
                success: true,
                data: results
            });
        });
}

/**
 * 
 * @desc update a description of a product
 * @route  patch /api/descriptions/:id
 * @acces Private 
 */
exports.editDescription = (req, res) => {
    const { id } = req.params;
    const { description } = req.body

    const sql = `UPDATE descriptions SET description = ${pool.escape(description)} WHERE id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else if (results.lenght < 1) {
            return res.status(404).json({
                success: false,
                error: "Description not found by given id"
            })
        }
        else return res.status(200).json({
            success: true,
            data: results
        });
    });
}

/**
 * 
 * @desc Patch a description of a product
 * @route  patch /api/products/addDescription/:id
 * @acces Private 
 */
exports.deleteDescription = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM descriptions WHERE id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else if (results.lenght < 1) {
            return res.status(404).json({
                success: false,
                error: "Description not found by given id"
            })
        }
        else return res.status(200).json({
            success: true,
            data: results
        });
    });
}