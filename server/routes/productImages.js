const express = require('express');
const router = express.Router();

const { addProductPhotos, deleteProductPhotos, getProductPhotos } = require("../controllers/productImages");

const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');

router.route('/');

router.route('/:id')
    .get(getProductPhotos)
    .post(addProductPhotos)
    .delete(deleteProductPhotos);

module.exports = router