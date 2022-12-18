const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const { createNewGradSchema} = require('../joi/gradValidation');
const { getAllGrads,getStudentGrads,getspacificGrads,createNewGrad, getAllMyGrads} = require('../controller/gradController');
const router = require('express').Router();






router.get("/allGrads",getAllGrads);
router.get("/allMyGrads",isAuthenticated(),getAllMyGrads);
router.get("/spacificGrad/:exam", isAuthenticated(),getspacificGrads);
router.post("/addGrad", isAuthenticated(),validtateReq(createNewGradSchema) ,createNewGrad);
router.get("/studentGrads/:exam", isAuthenticated(),getStudentGrads);




module.exports = router;
