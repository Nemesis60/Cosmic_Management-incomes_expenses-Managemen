const express = require('express');
const expenseCtr = require('../../controllers/expenseController');

const expenseRoute = express.Router();

expenseRoute.get('/expenses', expenseCtr.getAllExpenses);
expenseRoute.get('/detail/expense', expenseCtr.getExpense);
expenseRoute.post('/new/expense', expenseCtr.createExpense);
expenseRoute.patch('/update/expense/:id', expenseCtr.updateExpense);
expenseRoute.delete('/delete/expense/:id', expenseCtr.deleteExpense);

module.exports = expenseRoute;