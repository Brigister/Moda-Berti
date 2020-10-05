const pool = require('../config/database');
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const calculateOrderAmount = (id) => {

    const sql = `SELECT SUM(price) as total FROM order_items LEFT JOIN products ON order_items.product_id =products.id WHERE order_id = ${pool.escape(id)}`

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results) => {
            if (error) {
                console.log(error);
            }
            else resolve(results[0].total)
        });
    });

};

exports.getPayment = (req, res) => {
    res.send("hello");
}

exports.postPayment = async (req, res) => {



    try {
        const { id, email } = req.body;
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: await calculateOrderAmount(id),
            currency: "eur",
            receipt_email: email
        });
        res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
};