const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const {createNewExam , getAllExam , getSpacificExam} = require('../controller/examController');
const {createNewExamSchema } = require('../joi/examValidation');
const router = require('express').Router();


router.post('/createNewExam', isAuthenticated(), validtateReq(createNewExamSchema), createNewExam);
router.get('/getAllExam', getAllExam);
router.get("/getSpacificExam/:subject", isAuthenticated() ,getSpacificExam);


 





module.exports = router ;