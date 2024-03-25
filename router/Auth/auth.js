const express = require('express');
const router = express.Router();

const authController = require('../../controller/Auth/auth');

router.post('', authController.signup);

module.exports = router;
