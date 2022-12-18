const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const{ getAllAnswers, getSpecificAnswer, AddAnswerHistory } = require('../controller/answerController');
const {  AddAnswerHistorySchema } = require('../joi/answerValidation');


const router = require('express').Router();

router.get("/allAnswers",getAllAnswers);
router.get("/spacificAnswer/:exam", isAuthenticated(),getSpecificAnswer);
router.post("/addAnswerHistory", isAuthenticated(),validtateReq(AddAnswerHistorySchema) ,AddAnswerHistory);



module.exports = router;
