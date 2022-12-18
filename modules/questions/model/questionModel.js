const mongoose = require('mongoose');
const questionSchema = require('../schema/questionsSchema');


const Question = mongoose.model('questions', questionSchema);
module.exports = Question;