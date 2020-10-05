const express = require('express');
const router = express.Router();

const { insertProduct, getUserCart, removeFromCart, deleteUserCart } = require('../controllers/carts');

router.route('/')

router.route('/:id')
    .get(getUserCart)
    .post(insertProduct)
    .patch(removeFromCart)
    .delete(deleteUserCart);

module.exports = router