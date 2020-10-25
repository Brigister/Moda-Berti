const express = require('express');
const router = express.Router();


const { signup, login, editPassword, refreshToken, logout } = require('../controllers/auth');
const checkAuth = require('../middleware/checkAuth');

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/refreshToken').post(refreshToken);

router.route('/editPassword').patch(checkAuth, editPassword);

module.exports = router