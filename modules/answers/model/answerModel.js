const mongoose = require('mongoose');
const answerSchema = require('../schema/answerSchema');



const Answer = mongoose.model('answers', answerSchema);
module.exports = Answer;