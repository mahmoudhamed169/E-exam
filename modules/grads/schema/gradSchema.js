const mongoose = require('mongoose');



const gradSchema = new mongoose.Schema(
    {
        exam : {type :mongoose.Schema.Types.ObjectID , ref : "exams"},
        yourScore : {type: Number},
        student : {type :mongoose.Schema.Types.ObjectID , ref : "users"},
    }
);

module.exports = gradSchema ;