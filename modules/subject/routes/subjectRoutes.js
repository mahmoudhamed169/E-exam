
const validtateReq = require('../../../common/validtateReq');
const isAuthenticated = require("../../../common/isAuthrized");
const {getAllsubject , addNewSubject ,  getStudentSubjects, getTeacherSubjects,removeSpacificSubject,updateSpacificSubject} = require('../controller/subjectController');
const { addSubjectSchema , getSpacificSubjectSchema} = require('../joi/subjectValidation');

const router = require('express').Router();




router.get('/subjects', isAuthenticated(),getAllsubject);    
router.post('/addSubject', validtateReq(addSubjectSchema), isAuthenticated(), addNewSubject);
router.get('/studentSubjects', isAuthenticated(), getStudentSubjects);
router.get("/teacherSubjects", isAuthenticated(), getTeacherSubjects);
router.delete('/removeSubject/:id', isAuthenticated(), removeSpacificSubject);
router.put('/updateSpacificSubject', isAuthenticated(), updateSpacificSubject);










module.exports = router ;