const expenseModel = require('../models/expensesModel');
const userModel = require('../models/usersModel');

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find().populate('UserCreator');
        if (expenses) {
            res.status(200).json({ expenses });
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Get Expenses: ${error}`);
    }
}

const getExpense = async (req, res) => {
    try {
        const id = req.params.id;

        const expense = await expenseModel.findById(id).populate('UserCreator');
        if (expense) {
            res.status(200).json({ expense });
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Get Expense: ${error}`);
    }
}

const createExpense = async (req, res) => {
    try {
        const { UserCreator, outTitle, outDescription, outAmount } = req.body;

        if (UserCreator.length === 0) {
            res.status(401).json({ message: 'need token' })
        } else {
            const user = await userModel.findById(UserCreator);

            const expenseObject = {
                UserCreator: user._id, outTitle, outDescription, outAmount
            }

            const expenseCreated = await expenseModel.create(expenseObject);

            user.expenses = user.expenses.concat(expenseCreated._id)
            await user.save()
            if (expenseCreated) {
                res.status(201).json({ expenseCreated });
            } else {
                res.status(401).json({ message: 'Need token' });
            }
        }
    } catch (error) {
        console.log(`Ups Create Expense: ${error}`);
    }
}

const updateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const { outTitle, outDescription, outAmount } = req.body;

        const newExpenseObject = {
            outTitle, outDescription, outAmount
        }

        const expenseUpdated = await expenseModel.findByIdAndUpdate(id, newExpenseObject, { new: true })
        if (expenseUpdated) {
            res.status(201).json({ expenseUpdated });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Update Expense: ${error}`);
    }
}

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;

        const expenseDeleted = await expenseModel.findByIdAndDelete(id);
        if (expenseDeleted) {
            res.status(201).json({ message: "Expense Deleted" });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Delete Expense: ${error}`);
    }
}

module.exports = {
    getAllExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
}