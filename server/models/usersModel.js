const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        default: "User",
        trim: true
    },
    imagePath: {
        type: String,
        default: "",
        trim: true
    },
    incomes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Incomes'
    }],
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expenses'
    }]
    },
    { timestamps: true }
)

const User = mongoose.model('Users', userSchema);

module.exports = User;