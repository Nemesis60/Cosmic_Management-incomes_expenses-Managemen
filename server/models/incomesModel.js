const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
        UserCreator: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        inTitle: {
            type: String,
            required: true,
            trim: true
        },
        inDescription: {
            type: String,
            required: true,
            trim: true
        },
        inAmount: {
            type: Number,
            required: true
        }

    },
    { timestamps: true }    
);

const Income = mongoose.model('Incomes', incomeSchema);

module.exports = Income;