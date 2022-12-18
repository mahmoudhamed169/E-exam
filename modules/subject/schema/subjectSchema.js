const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String },
    department : {type :mongoose.Schema.Types.ObjectID , ref : "departments"},
    level : {type :mongoose.Schema.Types.ObjectID , ref : "levels"}, 
    prof : {type :mongoose.Schema.Types.ObjectID , ref : "users"},

 },
  {
    timestamps: true,
  }
);


module.exports = subjectSchema ;