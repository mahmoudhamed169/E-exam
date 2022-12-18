const express = require('express');
const connection = require('./configration/config');
const userRouter = require("./modules/users/routes/userRouts");
const levelRouter = require("./modules/levels/routes/levelsRoutes") ; 
const departmentRouter = require("./modules/departments/routes/departmentRoutes");
const subjectRouter = require("./modules/subject/routes/subjectRoutes");
const examRouter = require("./modules/exams/routes/examRoutes");
const questionRouter = require("./modules/questions/routes/questionRoutes");
const answerRouter = require("./modules/answers/routes/answerRoutes");
const gradRouter = require("./modules/grads/routes/gradRoutes");
var cors = require('cors');


require('dotenv').config() ; 



const app = express() ; 
app.use(cors())
app.use(express.json());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(userRouter) ;
app.use(levelRouter) ;
app.use(departmentRouter) ;
app.use(subjectRouter) ;
app.use(examRouter) ;
app.use(questionRouter) ;
app.use(answerRouter) ;
app.use(gradRouter) ;

const port = process.env.PORT;

connection()
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));