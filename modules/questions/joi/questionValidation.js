const joi = require("joi");
module.exports = {
  McqQuestionSchema: {
    body: joi.object().required().keys({
      question: joi.string().required(),
      exam: joi.string().required(),
      answer1: joi.string().required(),
      answer2: joi.string().required(),
      answer3: joi.string().required(),
      answer4: joi.string().required(),
      correctAnswer: joi.string().required(),
    }),
  },
  trueFalseQuestionSchema: {
    body: joi.object().required().keys({
      question: joi.string().required(),
      exam: joi.string().required(),
      answer1: joi.string().required(),
      answer2: joi.string().required(),
      correctAnswer: joi.string().required(),
    }),
  },
 
};
