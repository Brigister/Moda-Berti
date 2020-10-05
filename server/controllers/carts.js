const Cart = require('../models/cart');
const pool = require('../config/database');
const cart = require('../models/cart');

/**
 * @desc get a cart based on userId
 * @router GET /api/cart/:id
 * @access ?
 */
exports.getUserCart = (req, res,) => {
    const { id } = req.params;

    const sql = `SELECT * FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE status = 'cart' && orders.user_id  = ${pool.escape(id)}`

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
    })
}

/**
 * @desc insert product in a cart
 * @router POST /api/cart
 * @access Public
 */
exports.insertProduct = async (req, res, next) => {
    console.log(req.body)

    const { id } = req.params;
    const checkCart = `SELECT id FROM orders WHERE user_id = ${pool.escape(id)} AND status ='cart'`;
    const createCart = `INSERT INTO orders (user_id) VALUES (${pool.escape(id)})`;

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

                            const addToCart = `INSERT INTO order_items SET order_id=${results.insertId}, ${pool.escape(req.body)}`;
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
    const { id } = req.params;

    const sql = `DELETE FROM orders WHERE status = 'cart' AND user_id = ${pool.escape(id)}`;

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