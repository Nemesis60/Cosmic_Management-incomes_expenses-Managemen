const express = require('express');
const incomeCtr = require('../../controllers/incomeController');

const incomeRoute = express.Router();

incomeRoute.get('/', incomeCtr.getAllIncomes);
incomeRoute.get('/:id', incomeCtr.getIncome);
incomeRoute.post('/', incomeCtr.createIncome);
incomeRoute.patch('/:id', incomeCtr.updateIncome);
incomeRoute.delete('/:id', incomeCtr.deleteIncome);

module.exports = incomeRoute;