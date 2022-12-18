const mongoose = require('mongoose');

const gradSchema = require('../schema/gradSchema');

const Grad = mongoose.model('grads', gradSchema);



module.exports = Grad;
