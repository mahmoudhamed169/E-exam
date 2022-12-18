const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    levelName: { type: String },
    createdBy : {type :mongoose.Schema.Types.ObjectID , ref : "users"}
  },
  {
    timestamps: true,
  }
);


module.exports = levelSchema ; 