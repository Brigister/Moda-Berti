const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProduct,
    postProduct,
    deleteProduct,
    editProduct,
    addDescription,
    getProductByGender
} = require('../controllers/products');

router.route('/')
    .get(getProductByGender)
    .post(postProduct)
    .delete(deleteProduct);

router.route('/all')
    .get(getAllProducts);

router.route('/:id')
    .get(getProduct)

    .patch(editProduct);



module.exports = router;