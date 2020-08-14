const Cart = require('../models/cart');

const stripe = require("stripe")(process.env.STRIPE_SECRET);


const calculateOrderAmount = async (id) => {
    try {
        const cart = await Cart.findOne({ userId: id });

        const total = await cart.products.reduce((currentTotal, product) => currentTotal + product.price, 0);
        console.log(total);

        return total;
    } catch (err) {
        console.log(err.message);
    }
};

exports.getPayment = (req, res) => {
    res.send("hello");
}

exports.postPayment = async (req, res) => {

    try {
        const { id } = req.body;
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: await calculateOrderAmount(id),
            currency: "eur"
        });
        res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
};