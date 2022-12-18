const joi = require("joi");


module.exports = {
    createNewExamSchema: {
        body: joi.object().required().keys({    
            examName: joi.string().required(),
            subject : joi.string().required(),
            timer : joi.number().required(),
            finalScore : joi.number().required(),
        }),
    },
   
};
            

