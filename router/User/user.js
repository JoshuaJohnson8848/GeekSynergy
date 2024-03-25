const express = require('express');
const router = express.Router();

const userController = require('../../controller/User/user');

router.get('', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('', userController.addUser);

router.put('', userController.resetPass);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
