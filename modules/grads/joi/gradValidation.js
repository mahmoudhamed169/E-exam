const joi = require('joi');



module.exports = {
  
    createNewGradSchema: {
        body: joi.object().required().keys({
            exam: joi.string().required(),
            yourScore: joi.number().required(),
        }),
    },
};