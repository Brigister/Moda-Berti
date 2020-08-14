const express = require('express');
const router = express.Router();

const { signup, login, editPassword } = require('../controllers/auth');

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/editPassword/:id').patch(editPassword);

module.exports = router