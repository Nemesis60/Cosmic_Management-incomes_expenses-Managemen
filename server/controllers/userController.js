const userModel = require('../models/usersModel');
const incomeModel = require('../models/incomesModel');
const expenseModel = require('../models/expensesModel');
const feedbackModel = require('../models/feedbackModel');
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

const getUser = async (req, res) => {
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

        const user = await userModel.findById(id)
        const rol = user.rol
        if (rol === 'Admin') {
            res.status(401).json({ message: "You can't delete Admins" })
        } else {
            const userDeleted = await userModel.findByIdAndDelete(id);
            if (userDeleted) {
                const incomesDeleted = await incomeModel.deleteMany({
                    UserCreator: id
                })
                const expensesDeleted = await expenseModel.deleteMany({
                    UserCreator: id
                })
                const feedbacksDeleted = await feedbackModel.deleteMany({
                    User: id
                })

                res.status(201).json({ message: "User Deleted" })
            } else {
                res.status(401).json({ error: error.message })
            }
        }
    } catch (error) {
        console.log(`Ups Delete User: ${error}`)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}