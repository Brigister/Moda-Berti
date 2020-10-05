const express = require('express');
const router = express.Router();

const { addDescription, editDescription, deleteDescription, getDescriptions } = require('../controllers/description');

router.route('/:id')
    .get(getDescriptions)
    .post(addDescription)
    .patch(editDescription)
    .delete(deleteDescription);


module.exports = router