const fs = require('fs');
const pool = require('../config/database');
const { upload } = require('../middleware/multer');
const tinify = require('../config/tinify')

const { queryPromise } = require('../utils/mysql-promise-wrapper');

/**
 * 
 * @desc Get all the products
 * @route GET /api/products
 * @acces Public 
 */
exports.getAllProducts = (req, res, next) => {
    const sql = "CALL products()"
    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else return res.status(200).json({
            success: true,
            data: JSON.parse(results[0][0].products)
        });
    });
}

/**
 * 
 * @desc Get product by id
 * @route GET /api/products/:id
 * @acces Public 
 */
exports.getProduct = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const sql = `CALL product_details(${id})`;


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
                error: "Product not found"
            });
        }
        else {
            const parsed = JSON.parse(results[0][0].product_details);
            return res.status(200).json({
                success: true,
                data: parsed
            });
        }
    });
}

exports.getProductByGender = async (req, res, next) => {
    const { gender, page } = req.query;
    const sql = `SELECT * FROM products WHERE gender = ${pool.escape(gender)} ORDER BY create_time ASC LIMIT 10 OFFSET ${pool.escape(page * 10)} `

    try {
        const result = await queryPromise(pool, sql, gender);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}

/**
 * 
 * @desc Post a product
 * @route Post /api/products
 * @acces Private 
 */
exports.postProduct = (req, res, next) => {
    upload(req, res, (err) => {
        console.log(req.file)

        if (err) {
            console.log('qui')
            return res.status(500).json({
                success: false,
                error: err
            })
        }
        else {
            const source = tinify.fromFile(req.file.path.replace("\\", "/"));
            fs.unlinkSync(req.file.path)
            source.toFile(req.file.path);
            const { name, brand, gender, collection, price, } = req.body;

            const product = {
                name,
                brand,
                gender,
                collection,
                price,
                image_url: req.file.path.replace("\\", "/")
            };

            const productSql = `INSERT INTO products SET ${pool.escape(product)}`;

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

                    connection.query(productSql, (error, results) => {
                        if (error) {
                            connection.rollback();
                            return res.status(500).json({
                                success: false,
                                error
                            });
                        }
                        const insertedId = results.insertId;
                        let sizes = JSON.parse(req.body.sizes);

                        const sizesSql = `INSERT INTO sizes (size, quantity, product_id) VALUES ?`;

                        connection.query(sizesSql,
                            [sizes.map(size => [size.size.toUpperCase(), size.quantity, insertedId])],
                            (error, results) => {
                                if (error) {
                                    connection.rollback();
                                    return res.status(500).json({
                                        success: false,
                                        error
                                    });
                                }

                                connection.commit();

                                return res.status(200).json({
                                    success: true,
                                    data: newProduct = {
                                        id: insertedId,
                                        ...product
                                    }
                                })
                            }
                        );
                    });
                });
            });
        }
    });
}

/**
 * 
 * @desc Delete a product
 * @route Delete /api/products/:id
 * @acces Private 
 */
exports.deleteProduct = (req, res, next) => {
    const { id, image_url } = req.body;

    const sql = `DELETE FROM products WHERE id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error
            });
        }
        else {
            console.log(results);
            fs.unlinkSync(image_url);
            return res.status(200).json({
                success: true,
                data: id
            });
        }
    });
}

/**
 * 
 * @desc Edit a product
 * @route Edit /api/products/:id
 * @acces Private 
 */
exports.editProduct = (req, res) => {
    const { userId } = req.userData;
    const { table } = req.body;
    delete req.body.table;

    const sql = `UPDATE ?? SET ? WHERE id = ${pool.escape(userId)}`;

    pool.query(sql, [table, req.body], (error, results) => {

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
    })

}

exports.editSizes = (req, res) => {
    const { id } = req.params;
    const { sizes } = req.body;

    const deleteSQL = `DELETE FROM sizes WHERE product_id = ${id}`;
    const insertSQL = `INSERT INTO sizes (size, quantity, product_id) VALUES ?`;

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

            connection.query(deleteSQL, (error, results) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        error
                    });
                }
            });

            connection.query(insertSQL,
                [sizes.map(size => [size.size.toUpperCase(), size.quantity, id])],
                (error, results) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            error
                        });
                    }

                    connection.commit();

                    return res.status(200).json({
                        success: true,
                        data: results
                    });
                });
        });
    });
}