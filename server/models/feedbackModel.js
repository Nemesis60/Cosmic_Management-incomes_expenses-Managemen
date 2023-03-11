const mongoose = require('mongoose')

const feedBackSchema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    feedback: {
        type: String,
        trim: true,
        required: true
    }
    },
    {
        timestamps: true
    }
)

const FeedBack = mongoose.model('Feedbacks', feedBackSchema);

module.exports = FeedBack;