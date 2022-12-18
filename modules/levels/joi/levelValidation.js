const joi = require('joi');


module.exports = {
    addLevelSchemaa :{
        body : joi.object().required().keys({
            levelName: joi.string().required()           
        }),
    },
};