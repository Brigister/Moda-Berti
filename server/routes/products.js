const express = require('express');
const router = express.Router();

const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');

const {
    getAllProducts,
    getProduct,
    postProduct,
    deleteProduct,
    editProduct,
    getProductByGender,
    editSizes,
    addProductPhotos
} = require('../controllers/products');

router.route('/')
    .get(getProductByGender)
    .post(checkAuth, checkAdmin, postProduct)
    .delete(checkAuth, checkAdmin, deleteProduct);

router.route('/all')
    .get(checkAuth, checkAdmin, getAllProducts);

router.route('/:id')
    .get(getProduct)
    .patch(checkAuth, checkAdmin, editProduct);

router.route('/:id/editSizes')
    .patch(checkAuth, checkAdmin, editSizes);

module.exports = router;