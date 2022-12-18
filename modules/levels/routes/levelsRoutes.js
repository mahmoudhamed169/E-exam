const validtateReq = require('../../../common/validtateReq');
const { getAllLevels, addNewLevel,removeSpacificLevel ,updateLevel } = require('../controller/levelController');
const { addLevelSchemaa } = require('../joi/levelValidation');
const isAuthenticated = require("../../../common/isAuthrized")

const router = require('express').Router();



router.get("/levels" , getAllLevels) ; 
router.post("/addLevels" ,validtateReq(addLevelSchemaa), isAuthenticated() , addNewLevel );
router.delete("/removeLevels/:id" , isAuthenticated() , removeSpacificLevel );
router.put("/updateLevels" , isAuthenticated() , updateLevel );

module.exports = router ;