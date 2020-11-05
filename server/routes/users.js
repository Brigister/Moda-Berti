const express = require('express');
const router = express.Router();
const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');


const { getUsers, getUser, deleteUser, forgotPassword } = require('../controllers/users');

router.route('/')
    .get(checkAuth, checkAdmin, getUsers);

router.route('/:id')
    .get(checkAuth, getUser)
    .delete(checkAuth, checkAdmin, deleteUser);

router.route('/forgotPassword')
    .patch(forgotPassword)

module.exports = router;