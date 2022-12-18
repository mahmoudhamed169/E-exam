
const isAuthenticated = require("../../../common/isAuthrized");
const validtateReq = require("../../../common/validtateReq");

const { addMcqQuestion, addTrueFalseQuestion,getAllQuestion, getSpacificQuestion } = require("../controller/questionController");
const { McqQuestionSchema, trueFalseQuestionSchema  } = require('../joi/questionValidation');
const router = require('express').Router();







router.get('/getAllQuestions', getAllQuestion);
router.get("/getSpacificQuestion/:exam",isAuthenticated() ,getSpacificQuestion);
router.post('/trueFalseQuestion',isAuthenticated(),validtateReq(trueFalseQuestionSchema), addTrueFalseQuestion);
router.post('/addMcqQuestion', isAuthenticated(), validtateReq(McqQuestionSchema),addMcqQuestion);


 
module.exports = router ;