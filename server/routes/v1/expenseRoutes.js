const express = require('express');
const expenseCtr = require('../../controllers/expenseController');

const expenseRoute = express.Router();

expenseRoute.get('/', expenseCtr.getAllExpenses);
expenseRoute.get('/:id', expenseCtr.getExpense);
expenseRoute.post('/', expenseCtr.createExpense);
expenseRoute.patch('/:id', expenseCtr.updateExpense);
expenseRoute.delete('/:id', expenseCtr.deleteExpense);

module.exports = expenseRoute;