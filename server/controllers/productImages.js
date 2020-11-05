const fs = require('fs');
const pool = require('../config/database');
const { uploadArray } = require('../middleware/multer');

exports.getProductPhotos = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT image_url FROM product_images WHERE product_id = ${pool.escape(id)}`;

    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }
        else return res.status(200).json({
            success: true,
            data: results
        });
    });
}

exports.addProductPhotos = (req, res) => {
    uploadArray(req, res, (err) => {
        console.log("files", req.files);
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }
        else {
            const { id } = req.params
            const sql = `INSERT INTO product_images (image_url, product_id) VALUES ?`;

            pool.query(sql,
                [req.files.map(file => [file.path.replace("\\", "/"), id])],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: err
                        });
                    }
                    else return res.status(200).json({
                        success: true,
                        data: results
                    })
                })
        }
    })
}

exports.deleteProductPhotos = (req, res) => {
    const { image_url } = req.body;

    const sql = 'DELETE FROM product_images WHERE image_url IN (?)';

    pool.query(sql, [image_url], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }
        else {
            image_url.forEach(image => {
                fs.unlinkSync(image);

            });
            return res.status(200).json({
                success: true,
                data: results
            });
        }
    });
}