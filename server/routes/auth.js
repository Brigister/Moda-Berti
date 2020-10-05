const express = require('express');
const router = express.Router();

const { signup, login, editPassword, refreshToken, logout } = require('../controllers/auth');

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/refreshToken').post(refreshToken);

router.route('/editPassword/:id').patch(editPassword);

module.exports = router