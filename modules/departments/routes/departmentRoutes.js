const { getAllDepartment, addNewDepartment, removeSpacificDepartment ,updateDepartment } = require("../controller/departmentController");
const validtateReq = require('../../../common/validtateReq');
const { addDepartentSchemaa } = require("../joi/departmentValidation");
const isAuthenticated = require("../../../common/isAuthrized")

const router = require("express").Router();


router.get("/departments" , getAllDepartment);
router.post("/addDepartment" ,validtateReq(addDepartentSchemaa), isAuthenticated(),addNewDepartment);
router.delete("/deleteDepartment/:id" , isAuthenticated() ,removeSpacificDepartment);
router.put("/updateDepartment" , isAuthenticated() ,updateDepartment);







module.exports = router