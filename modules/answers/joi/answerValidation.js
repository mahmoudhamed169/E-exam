const joi = require("joi");


module.exports = {
    AddAnswerHistorySchema: {
        body: joi.object().required().keys({
            exam: joi.string().required(),
            question: joi.string().required(),
            selectedAnswer: joi.string().required(),
            isCorrect: joi.boolean().required(),
        }),
    },
  
};


