const express = require('express');
const router = express.Router();

const { getUserOrders, deleteOrder, postOrder } = require('../controllers/orders');

router.route("/")
    .post(postOrder);

router.route('/:id')
    .get(getUserOrders)
    .delete(deleteOrder);

module.exports = router;