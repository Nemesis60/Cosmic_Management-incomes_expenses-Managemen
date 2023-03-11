const feedbackModel = require('../models/feedbackModel');
const userModel = require('../models/usersModel');

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find().populate('User');

        if (feedbacks) {
            res.status(200).json({ feedbacks });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Get feedbacks: ${error}`);
    }
}

const createFeedback = async (req, res) => {
    try {
        const { User, feedback } = req.body

        if (User.length === 0) {
            res.status(401).json({ message: 'need token' })
        } else {
            const user = await userModel.findById(User)
            
            const feedbackObject = {
                User, feedback
            }

            const feedbackCreated = await feedbackModel.create(feedbackObject)

            user.feedbacks = user.feedbacks.concat(feedbackCreated._id)
            await user.save()
            if (feedbackCreated) {
                res.status(201).json({ feedbackCreated });
            } else {
                res.status(401).json({ error: error.message });
            }
        }
    } catch (error) {
        console.log(`Ups Create feedbacks: ${error}`);
    }
}

const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params
        const { feedback } = req.body;

        const newFeedbackObject = {
            feedback
        }

        const feedbackUpdated = await feedbackModel.findByIdAndUpdate(id, newFeedbackObject, { new: true })

        if (feedbackUpdated) {
            res.status(201).json({ feedbackUpdated });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Update feedbacks: ${error}`);    
    }
}

const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params

        const feedbackDeleted = await feedbackModel.findByIdAndDelete(id)

        if (feedbackDeleted) {
            res.status(201).json({ message: "feedback deleted" });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log(`Ups Delete feedbacks: ${error}`); 
    }
}

module.exports = {
    getAllFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback
}