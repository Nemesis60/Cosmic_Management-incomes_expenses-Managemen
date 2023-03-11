const express = require('express');
const userCtr = require('../../controllers/userController');

const userRoute = express.Router();

userRoute.get('/', userCtr.getAllUsers);
userRoute.get('/:id', userCtr.getUser);
userRoute.post('/', userCtr.createUser);
userRoute.patch('/:id', userCtr.updateUser);
userRoute.delete('/:id', userCtr.deleteUser);

module.exports = userRoute;