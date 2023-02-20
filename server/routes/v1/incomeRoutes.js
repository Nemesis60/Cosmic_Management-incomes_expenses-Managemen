const express = require('express');
const incomeCtr = require('../../controllers/incomeController');

const incomeRoute = express.Router();

incomeRoute.get('/incomes', incomeCtr.getAllIncomes);
incomeRoute.get('/detail/income', incomeCtr.getIncome);
incomeRoute.post('/new/income', incomeCtr.createIncome);
incomeRoute.patch('/update/income/:id', incomeCtr.updateIncome);
incomeRoute.delete('/delete/income/:id', incomeCtr.deleteIncome);

module.exports = incomeRoute;