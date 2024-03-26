const express = require('express');
const router = express.Router();

const userController = require('../../controller/User/user');
const isAuth = require('../../middleware/isAuth');

router.get('', userController.getUsers);

router.get('/:id', isAuth, userController.getUserById);

router.post('', isAuth, userController.addUser);

router.put('', userController.resetPass);

router.put('/:id', isAuth, userController.updateUser);

router.delete('/:id', isAuth, userController.deleteUser);

module.exports = router;
