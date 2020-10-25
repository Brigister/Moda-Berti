const express = require('express');
const router = express.Router();
const checkAdmin = require('../middleware/checkAdmin');
const checkAuth = require('../middleware/checkAuth');


const { getUsers, getUser, deleteUser } = require('../controllers/users');

router.route('/')
    .get(checkAuth, checkAdmin, getUsers);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)



module.exports = router;