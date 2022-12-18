const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: { type: String },
    // levelName: { type: mongoose.Schema.Types.ObjectId, ref: "level" },
    createdBy : {type :mongoose.Schema.Types.ObjectID , ref : "users"}
  },
  {
    timestamps: true,
  }
);



module.exports = departmentSchema ; 
