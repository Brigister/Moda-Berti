const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const { getPayment, createPayment, capturePayment } = require('../controllers/stripe');

router.route('/create-payment-intent')
    .get(checkAuth, getPayment)
    .post(checkAuth, createPayment);

router.route('/:paymentId')
    .post(capturePayment);

module.exports = router;