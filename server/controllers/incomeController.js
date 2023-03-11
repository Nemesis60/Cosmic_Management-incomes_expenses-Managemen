const incomeModel = require('../models/incomesModel');
const userModel = require('../models/usersModel');

const getAllIncomes = async (req, res) => {
    try {
        const incomes = await incomeModel.find().populate('UserCreator');
        if (incomes) {
            res.status(200).json({ incomes });
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Get Incomes: ${error}`);
    }
}

const getIncome = async (req, res) => {
    try {
        const id = req.params.id;

        const income = await incomeModel.findById(id).populate('UserCreator');
        if (income) {
            res.status(200).json({ income });
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Get Income: ${error}`);
    }
}

const createIncome = async (req, res) => {
    try {
        const { UserCreator, inTitle, inDescription, inAmount } = req.body;

        if (UserCreator.length === 0) {
            res.status(401).json({ message: 'need token' })
        } else {
            const user = await userModel.findById(UserCreator);

            const incomeObject = {
                UserCreator, inTitle, inDescription, inAmount
            }

            const incomeCreated = await incomeModel.create(incomeObject);

            user.incomes = user.incomes.concat(incomeCreated._id)
            await user.save()
            if (incomeCreated) {
                res.status(201).json({ incomeCreated });
            } else {
                res.status(401).json({ error: error.message });
            }
        }
    } catch (error) {
        console.log(`Ups Create Income: ${error}`);
    }
}

const updateIncome = async (req, res) => {
    try {
        const id = req.params.id;
        const { inTitle, inDescription, inAmount } = req.body;

        const newIncomeObject = {
            inTitle, inDescription, inAmount
        }

        const incomeUpdated = await incomeModel.findByIdAndUpdate(id, newIncomeObject, { new: true })
        if (incomeUpdated) {
            res.status(201).json({ incomeUpdated });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Update Income: ${error}`);
    }
}

const deleteIncome = async (req, res) => {
    try {
        const id = req.params.id;

        const incomeDeleted = await incomeModel.findByIdAndDelete(id);
        if (incomeDeleted) {
            res.status(201).json({ message: "Expense Deleted" });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Delete Income: ${error}`);
    }
}

module.exports = {
    getAllIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome
}