const { getAllUsers ,sign_up,sign_in  , getAllProfessors,addNewProfessor,deleteUser ,updateUser } = require("../controller/userController");
const isAuthenticated = require("../../../common/isAuthrized");
const validateRequest = require("../../../common/validtateReq");
const { singUpSchema, singInSchema  } = require("../joi/userValidation");

const router = require("express").Router();



router.get("/users" , getAllUsers);

router.post("/sign_Up", validateRequest(singUpSchema), sign_up);
router.post("/sign_In", validateRequest(singInSchema), sign_in);

router.get("/professors",isAuthenticated(),getAllProfessors);
router.post("/addProfessor",isAuthenticated(),addNewProfessor);
router.delete("/deleteUser/:id",isAuthenticated(),deleteUser);
router.put("/updateUser",isAuthenticated(),updateUser);





module.exports = router;

