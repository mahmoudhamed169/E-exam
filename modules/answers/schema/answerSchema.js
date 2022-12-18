const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema(
    {
        exam : {type :mongoose.Schema.Types.ObjectID , ref : "exams"},
        question : {type :mongoose.Schema.Types.ObjectID , ref : "questions"},
        selectedAnswer : {type: String},
        isCorrect : {type: Boolean},
        studentId :{type :mongoose.Schema.Types.ObjectID , ref : "users"},
    }
);

module.exports = answerSchema ;