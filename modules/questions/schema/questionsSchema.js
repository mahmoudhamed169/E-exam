const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },    
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
    answer1: { type: String },
    answer2: { type: String  },
    answer3: { type: String  },
    answer4: { type: String },
    correctAnswer: { type: String, required: true },
});

module.exports = questionSchema;