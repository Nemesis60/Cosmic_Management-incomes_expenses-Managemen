const userModel = require('../models/usersModel');
const incomeModel = require('../models/incomesModel');
const expenseModel = require('../models/expensesModel');
const bcrypt = require('bcrypt');
const { json } = require('express');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().populate('incomes', { UserCreator: 0 }).populate('expenses', { UserCreator: 0 });
        if (users) {
            res.status(200).json({ users });
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Users: ${error}`)
    }
};

const userProfile = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id).populate('incomes', { UserCreator: 0 }).populate('expenses', { UserCreator: 0 });;
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Profile: ${error}`)
    }
}

const createUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, rol, imagePath } = req.body;

        const hashed = await bcrypt.hash(password, 10)

        const userObject = {
            username, email, password: hashed, phoneNumber, rol, imagePath
        }

        const userCreated = await userModel.create(userObject);
        if (userCreated) {
            res.status(201).json({ userCreated });
        } else {
            res.status(400).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Create User: ${error}`)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        const { username, email, password, phoneNumber, rol, imagePath } = req.body;

        const newUserObject = {
            username, email, password, phoneNumber, rol, imagePath
        }

        const userUpdated = await userModel.findByIdAndUpdate(id, newUserObject, { new: true })
        if (userUpdated) {
            res.status(201).json({ userUpdated });
        } else {
            res.status(401).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Update User: ${error}`)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const userDeleted = await userModel.findByIdAndDelete(id);
        if (userDeleted) {
            res.status(201).json({ message: "User Deleted" })
        } else {
            res.status(401).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups Delete User: ${error}`)
    }
}

const getIncomesByUser = async (req, res) => {
    try {
        // refer to the objectId that income model have
        const id = req.params.id;

        const incomes = await incomeModel.find({ User: id })
        if (incomes) {
            res.status(200).json({ incomes })
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups IncomeBy: ${error}`);
    }
}

const getExpensesByUser = async (req, res) => {
    try {
        // refer to the objectId that expense model have
        const id = req.params.id;

        const expenses = await expenseModel.find({ User: id }, {})
        console.log(expenses)
        if (expenses) {
            res.status(200).json({ expenses })
        } else {
            res.status(404).json({ error: error.message })
        }
    } catch (error) {
        console.log(`Ups ExpenseBy: ${error}`);
    }
}

module.exports = {
    getAllUsers,
    userProfile,
    createUser,
    updateUser,
    deleteUser,
    getIncomesByUser,
    getExpensesByUser
}