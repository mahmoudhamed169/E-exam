const mongoose = require('mongoose');
const examSchema = require('../schema/examSchema');



const Exam = mongoose.model('exams', examSchema );
module.exports = Exam