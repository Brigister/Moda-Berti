const fs = require('fs');
const pool = require('../config/database');
const upload = require('../middleware/multer');

/**
 * 
 * @desc Get all the products
 * @route GET /api/products
 * @acces Public 
 */
exports.getProducts = (req, res, next) => {
    const sql = "SELECT * FROM products";
    console.log(req.cookies.jid)
    pool.query(sql, (error, results) => {
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
 * @desc Get product by id
 * @route GET /api/products/:id
 * @acces Public 
 */
exports.getProduct = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    /*     const sql = `SELECT * FROM products RIGHT JOIN sizes ON products.id = sizes.product_id WHERE products.id = ${pool.escape(id)}`;*/
    const sql = `CALL product_details(${id})`;
    const sql2 = `SELECT json_object(
		'id', p.id,
		'article_id', p.article_id,
		'name', p.name,
		'brand', p.brand,
		'gender', p.gender,
		'collection', p.collection,
		'price', p.price,
		'image_url', p.image_url,
		'sizes', (
			SELECT json_arrayagg(json_object(
                'id', s.id,
				'size', s.size
			))
			FROM sizes as s
			WHERE s.product_id = p.id
		),
		'descriptions', (
			SELECT json_arrayagg(json_object(
                'id', d.id,
				'description', d.description
			))
			FROM descriptions as d
			WHERE d.product_id = p.id
		)
	) as product_details
	FROM products as p
    WHERE p.id = ${pool.escape(id)}`
    pool.query(sql2, (error, results) => {
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
            const parsed = JSON.parse(results[0].product_details);
            return res.status(200).json({
                success: true,
                data: parsed
            });
        }
    });
}

/**
 * 
 * @desc Post a product
 * @route Post /api/products
 * @acces Private 
 */
exports.postProduct = (req, res, next) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
        else {
            const { name, brand, gender, collection, price, } = req.body;

            const product = {
                article_id: "ao2222",
                name,
                brand,
                gender: "Woman",
                collection: "FW20",
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

                            });

                    });

                    connection.commit();
                    return res.status(200).json({
                        success: true,
                        data: product
                    })
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
    const { id } = req.params;
    console.log(req.body);
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
            fs.unlinkSync(req.body.image_url);
            return res.status(200).json({
                success: true,
                data: results
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
exports.editProduct = (req, res, next) => {
    const { id } = req.params;
    const { table } = req.body;
    delete req.body.table;

    const sql = `UPDATE ?? SET ? WHERE id = ${pool.escape(id)}`;

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