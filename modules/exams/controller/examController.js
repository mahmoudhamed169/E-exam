const { StatusCodes } = require("http-status-codes");
const Exam = require("../model/examModel");
const Subject = require("../../subject/model/subjectModel");

const getAllExam = async (req, res) => {
  const exams = await Exam.find({});
  res.json({ message: "All Exam", data: exams });
};

const getSpacificExam = async (req, res) => {
  try {
    let { subject } = req.params;
    const exams = await Exam.find({ subject });
    res.json({ message: " exams", data: exams });
  } catch (error) {
    console.log(error);
  }
};

// const createNewExam = async (req, res) => {
//   let { examName, subject, timer } = req.body;
//   if (theUser.role == "professor") {
//     res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
//   } else {
//     try {
//       const exam = await Exam.findOne({ examName, subject });
//       const subjectData = await Subject.findOne({ subject });
//       if (exam) {
//         res.status(StatusCodes.BAD_REQUEST).json({
//           massege: "exam is already existes",
//         });
//       } else {
//         let newexam = new Exam({ examName, subject, timer });
//         if(theUser._id == subjectData.prof){
//         await newexam.save();
//         res.json({ massege: "Added success", newexam });
//         }else{
//           res.status(StatusCodes.UNAUTHORIZED).json({ message: "Sorry You are not the teacher of this subject" });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

const createNewExam = async (req, res) => {
  let { examName, subject, timer, finalScore } = req.body;
  console.log(subject);
  const thisSubject = await Subject.findOne({ _id: subject });

  if (thisSubject.prof == theUser._id) {
    try {
      const exam = await Exam.findOne({ examName, subject });
      const thisSubject = await Subject.findOne({ _id: subject });
      console.log(thisSubject.subjectName);
      if (exam) {
        res.status(StatusCodes.BAD_REQUEST).json({
          massege: "exam is already existes",
        });
      } else {
        let newexam = new Exam({
          examName ,
          subjectName: thisSubject.subjectName,
          subject,
          timer,
          finalScore,
          author: theUser._id,
        });
        await newexam.save();
        res.json({ message: "Added success", newexam });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Sorry You are not the teacher of this subject" });
  }
};

module.exports = {
  getAllExam,
  getSpacificExam,
  createNewExam,
};
