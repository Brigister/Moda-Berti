const express = require('express');
const router = express.Router();

const { getUserOrders, deleteOrder, postOrder, getPendingOrders, manageOrder } = require('../controllers/orders');
const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');

router.route("/")
    .get(checkAuth, checkAdmin, getPendingOrders)
    .post(checkAuth, postOrder);

router.route('/:id')
    .delete(checkAuth, deleteOrder)
    .patch(checkAuth, checkAdmin, manageOrder);

router.route('/personal')
    .get(checkAuth, getUserOrders);

module.exports = router;