const pool = require('../config/database');
const { queryPromise } = require('../utils/mysql-promise-wrapper');
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { postOrder } = require('./orders')

const calculateOrderAmount = async (id) => {
    console.log(id);
    const SqlOrderId = `SELECT orders.id FROM orders JOIN users ON users.id = orders.user_id WHERE orders.status = 'cart' AND users.id = ?`

    const orderId = await queryPromise(pool, SqlOrderId, id).catch(error => {
        /* connection.rollback(); */
        return res.status(500).json({
            success: false,
            error
        });
    })
    console.log('orderId', orderId);
    const sql = `SELECT SUM(price) as total FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = ?`
    const res = await queryPromise(pool, sql, orderId[0].id).catch(error => {
        /*   connection.rollback(); */
        return res.status(500).json({
            success: false,
            error
        });
    })
    /*  connection.commit(); */
    console.log('total', res);
    return res[0].total


};

exports.getPayment = (req, res) => {
    res.send("hello");
}

exports.createPayment = async (req, res) => {
    const { userId } = req.userData
    console.log(userId)
    try {
        /* const { id, email } = req.body; */

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: await calculateOrderAmount(userId),
            currency: "eur",
            /*  receipt_email: email, */
            capture_method: 'manual'

        });
        const result = await postOrder(req.userData.userId);
        console.log(result);
        res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
};

exports.capturePayment = async (req, res) => {
    const { paymentId } = req.params
    console.log(paymentId);

    try {
        const intent = await stripe.paymentIntents.capture(paymentId);
        console.log('intent', intent);
        const result = await queryPromise(pool, sql, req.userData.userId);
        console.log(result);
        return res.status(200).json({
            success: true,
            data: intent
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err
        })

    }
}