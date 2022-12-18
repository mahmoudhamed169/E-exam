const { StatusCodes } = require("http-status-codes");
const Grad = require("../model/gradModel");
const Exam = require("../../exams/model/examModel");

const getAllGrads = async (req, res) => {
  try {
    const grads = await Grad.find({}).populate("student"); 
    res.json({ message: "All Grads", data: grads });
  } catch (error) {
    console.log(error);
  }
};

const getStudentGrads = async (req, res) => {
  try {
    let { exam } = req.params;
    const thisExam = await Exam.find({ _id: exam });
    if (!thisExam.author == theUser._id) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Sorry You are not the teacher of this subject",
      });
      
    } else {
      const grads = await Grad.find({ exam }).populate("student").populate("exam");
      res.json({ message: "All Grads", data: grads });  
    }
   
   
  } catch (error) {
    console.log(error);
  }
};

const getspacificGrads = async (req, res) => {
  try {
    let { exam } = req.params;
    const grads = await Grad.find({ exam, student: theUser._id });
    res.json({ message: " Your Score ", grads });
  } catch (error) {
    console.log(error);
  }
};

const createNewGrad = async (req, res) => {
  let { exam, yourScore } = req.body;
  //console.log(theUser._id)
  try {
      const thisGrad = await Grad.findOne({ exam, student: theUser._id });
      if (!thisGrad) {  
        const newGrad = new Grad({
          exam,
          yourScore,
          student: theUser._id,
        });
        await newGrad.save();
        res.json({ message: "Added success", newGrad });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "You have already taken this exam",
        });
      }  
    }
 
  catch (error) { 
    console.log(error);
  }
};







const getAllMyGrads = async (req, res) => {
  try {
    const grads = await Grad.find({ student: theUser._id }).populate("exam");    
    res.json({ message: "All Grads", data: grads  });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllGrads,
  getStudentGrads,
  getspacificGrads,
  createNewGrad,
  getAllMyGrads
};
