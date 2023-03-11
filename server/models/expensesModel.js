const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
        UserCreator: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        outTitle: {
            type: String,
            required: true,
            trim: true
        },
        outDescription: {
            type: String,
            required: true,
            trim: true
        },
        outAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Expense = mongoose.model('Expenses', expenseSchema);

module.exports = Expense;