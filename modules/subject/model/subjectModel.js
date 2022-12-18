const mongoose = require('mongoose');

const subjectSchema = require('../schema/subjectSchema');




const Subject = mongoose.model("subjects" , subjectSchema);

module.exports = Subject ; 