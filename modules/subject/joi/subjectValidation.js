const joi = require("joi");

module.exports = {
  addSubjectSchema: {
    body: joi.object().required().keys({
        subjectName: joi.string().required(),
        level: joi.string().required(),
        department: joi.string().required(),
        prof: joi.string().required(),
    }),
  },
  // getSpacificSubjectSchema: {
  //   body: joi.object().required().keys({
  //       department: joi.string().required(),
  //   }),
  // },
};
