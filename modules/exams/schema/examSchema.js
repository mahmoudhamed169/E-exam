const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
      examName: { type: String },
      subjectName: { type: String },
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "subjects" },
      author : {type :mongoose.Schema.Types.ObjectID , ref : "users"},
      timer : {type: Number},
      finalScore : {type: Number},
  },

  {
    timestamps: true,
  }
);
module.exports = examSchema ;
