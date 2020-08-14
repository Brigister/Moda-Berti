const express = require('express');
const router = express.Router();

const { insertProduct, getUserCart, removeFromCart, deleteUserCart } = require('../controllers/carts');

router.route('/')
    .post(insertProduct)
    .patch(removeFromCart);

router.route('/:id')
    .get(getUserCart)
    .delete(deleteUserCart);

module.exports = router