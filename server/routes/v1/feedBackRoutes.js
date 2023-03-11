const express = require('express');
const feedBackCtr = require('../../controllers/feedBackController');

const feedBackRoute = express.Router();

feedBackRoute.get('/', feedBackCtr.getAllFeedbacks)
feedBackRoute.post('/', feedBackCtr.createFeedback)
feedBackRoute.patch('/:id', feedBackCtr.updateFeedback)
feedBackRoute.delete('/:id', feedBackCtr.deleteFeedback)

module.exports = feedBackRoute;