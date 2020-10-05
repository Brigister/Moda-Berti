const express = require('express');
const router = express.Router();

const { postPayment, getPayment } = require('../controllers/stripe');

router.route('/create-payment-intent')
    .get(getPayment)
    .post(postPayment);

module.exports = router;