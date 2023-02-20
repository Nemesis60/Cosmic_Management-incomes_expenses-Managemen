const express = require('express');
const userCtr = require('../../controllers/userController');

const userRoute = express.Router();

userRoute.get('/users', userCtr.getAllUsers);
userRoute.get('/profile/:id', userCtr.userProfile);
userRoute.post('/new/user', userCtr.createUser);
userRoute.patch('/update/user/:id', userCtr.updateUser);
userRoute.delete('/delete/user/:id', userCtr.deleteUser);

userRoute.get('/user/expenses', userCtr.getExpensesByUser);

module.exports = userRoute;