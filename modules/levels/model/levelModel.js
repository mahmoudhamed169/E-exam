const mongoose = require('mongoose');
const levelSchema = require('../schema/levelSchema');



const Level = mongoose.model("levels",levelSchema)
module.exports = Level;