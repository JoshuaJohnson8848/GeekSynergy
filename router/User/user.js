const express = require('express');
const router = express.Router();

const userController = require('../../controller/User/user');

router.get('', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('', userController.addUser);

router.put('/:id', userController.updateUser);

module.exports = router;
