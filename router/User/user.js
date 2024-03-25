const express = require('express');
const router = express.Router();

const userController = require('../../controller/User/user');

router.post('', userController.addUser);

router.get('', userController.getUsers);

router.get('/:id', userController.getUserById);

module.exports = router;
