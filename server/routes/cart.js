const express = require('express');
const router = express.Router();

const { insertProduct, getUserCart, removeFromCart, deleteUserCart } = require('../controllers/carts');
const checkAuth = require('../middleware/checkAuth');

router.route('/')
    .get(checkAuth, getUserCart)
    .post(checkAuth, insertProduct)
    .delete(checkAuth, deleteUserCart);



router.route('/:id')
    .patch(removeFromCart)

module.exports = router