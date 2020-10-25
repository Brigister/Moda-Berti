const pool = require('../config/database');

/**
 * @desc get a cart based on userId
 * @router GET /api/cart/:id
 * @access ?
 */
exports.getUserCart = (req, res) => {
    const { userId } = req.userData;
    console.log(userId)
    const sql = `CALL cart_details(${pool.escape(userId)})`

    pool.query(sql, (error, results) => {
        if (error) {
            console.log('errore');
            return res.status(500).json({
                succes: false,
                error
            });
        }
        else {
            if (results[0][0]) {
                const parsed = JSON.parse(results[0][0].cart);
                return res.status(200).json({
                    succes: true,
                    data: parsed
                });
            }
            else return res.status(404).json({
                succes: false,
                error: "Non c'è un carello"
            })
        }
    })
}

/**
 * @desc insert product in a cart
 * @router POST /api/cart
 * @access Public
 */
exports.insertProduct = async (req, res, next) => {
    console.log(req.body)

    const { userId } = req.userData;
    console.log(userId);
    const checkCart = `SELECT id FROM orders WHERE user_id = ${pool.escape(userId)} AND status ='cart'`;
    const createCart = `INSERT INTO orders (user_id) VALUES (${pool.escape(userId)})`;

    if (!req.body.size || !req.body.product_id) {
        return res.status(500).json({
            succes: false,
            error: "Missing data"
        })
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }
        else {
            connection.beginTransaction(err => {
                if (err) {
                    connection.rollback();
                    return res.status(500).json({
                        success: false,
                        error: err
                    });
                }
                //controllo che abbia un carello
                connection.query(checkCart, (error, results) => {
                    if (error) {
                        connection.rollback();
                        return res.status(500).json({
                            success: false,
                            error
                        });
                    }
                    //se non ce l'ha glielo creo e mi salvo il cartId
                    else if (results.length == 0) {
                        connection.query(createCart, (error, results) => {
                            if (error) {
                                connection.rollback();
                                return res.status(500).json({
                                    success: false,
                                    error
                                });
                            }
                            console.log("non c'era carello")
                            console.log(results.insertId);
                            const addToCart = `INSERT INTO order_items SET order_id=${pool.escape(results.insertId)}, ${pool.escape(req.body)}`;
                            console.log(addToCart);
                            connection.query(addToCart, (error, results) => {
                                if (error) {
                                    connection.rollback();
                                    return res.status(500).json({
                                        success: false,
                                        error
                                    });
                                }
                                else {
                                    connection.commit();
                                    console.log("prodotto aggiunto");
                                    return res.status(200).json({
                                        succes: true,
                                        data: results
                                    });
                                }
                            })
                        });
                    }
                    else {
                        //se ce l'ha mi prendo il cartId dalla prima query
                        console.log("c'era carrello", results[0].id)

                        //aggiungo un prodotto
                        const addToCart = `INSERT INTO order_items SET order_id=${results[0].id}, ${pool.escape(req.body)}`;
                        connection.query(addToCart, (error, results) => {
                            if (error) {
                                connection.rollback();
                                return res.status(500).json({
                                    success: false,
                                    error
                                });
                            }
                            else {
                                connection.commit();
                                return res.status(200).json({
                                    succes: true,
                                    data: results
                                });
                            }
                        });
                    }
                });
            });
        }
    });
}

/**
 * @desc Delete a product from user cart
 * @router patch /api/cart/:id
 * @access Public
 */
exports.removeFromCart = async (req, res,) => {
    //id = id dell'entry del cart da rimuovere
    const { id } = req.params;
    console.log(id);
    const sql = `DELETE FROM order_items WHERE id = ${pool.escape(id)}`;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                succes: false,
                error
            });
        }
        else return res.status(200).json({
            succes: true,
            data: results
        });
    });
}

/**
 * @desc Delete user cart by userId
 * @router delete /api/cart/:id
 * @access Private
 */
exports.deleteUserCart = async (req, res,) => {
    const { userId } = req.userData;

    const sql = `DELETE FROM orders WHERE status = 'cart' AND user_id = ${pool.escape(userId)}`;

    pool.query(sql, (error, results) => {
        console.log('rimosso carello');
        if (error) {
            return res.status(500).json({
                succes: false,
                error
            });
        }
        else return res.status(200).json({
            succes: true,
            data: results
        });
    });

}