const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    postProduct,
    deleteProduct,
    editProduct,
    addDescription
} = require('../controllers/products');

router.route('/')
    .get(getProducts)
    .post(postProduct);

router.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .patch(editProduct);

module.exports = router;