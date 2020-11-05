const express = require('express');
const router = express.Router();

const { getUserOrders, deleteOrder, postOrder, getPendingOrders } = require('../controllers/orders');
const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');

router.route("/")
    .get(checkAuth, checkAdmin, getPendingOrders)
    .post(checkAuth, postOrder);

router.route('/:id')
    .delete(checkAuth, deleteOrder);

router.route('/personal')
    .get(checkAuth, getUserOrders);

module.exports = router;