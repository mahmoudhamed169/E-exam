const Exam = require("../../exams/model/examModel");
const Question = require("../model/questionModel");
const { StatusCodes } = require("http-status-codes");

const getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (err) {
    res.json({ message: err });
  }
};

const getSpacificQuestion = async (req, res) => {
  
  try {
    let { exam } = req.params;
    const questions = await Question.find({ exam });
    res.json(questions);
  } catch (err) {
    res.json({ message: err });
  }
};

const addMcqQuestion = async (req, res) => {
  let { question, answer1, answer2, answer3, answer4, correctAnswer, exam } =
    req.body;
  const thisExam = await Exam.findOne({ _id: exam });  
  const thisQuestion = await Question.findOne({  question  , exam });
  
  if (thisExam.author == theUser._id) {
    if (thisQuestion) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Question is already existes",
      });
    } else {
      try {
        let newQuestion = new Question({
          question,
          answer1,
          answer2,
          answer3,
          answer4,
          correctAnswer,
          exam,          
        });
        await newQuestion.save();
        res.json({ message: "Added success", newQuestion });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Sorry You are not the teacher of this subject" });
  }
};



const addTrueFalseQuestion = async (req, res) => {
  let { question, answer1, answer2,  correctAnswer, exam } =
    req.body;
  const thisExam = await Exam.findOne({ exam, exam });
  console.log(thisExam);
  const thisQuestion = await Question.findOne({ _id: question });
  if (thisExam.author == theUser._id) {
    if (thisQuestion) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Question is already existes",
      });
    } else {
      try {
        let newQuestion = new Question({
          question,
          answer1,
          answer2,          
          correctAnswer,
          exam,
          author: theUser._id,
        });
        await newQuestion.save();
        res.json({ message: "Added success", newQuestion });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Sorry You are not the teacher of this subject" });
  }
};

module.exports = {
  addMcqQuestion,
  addTrueFalseQuestion,
  getAllQuestion,
  getSpacificQuestion,
};
