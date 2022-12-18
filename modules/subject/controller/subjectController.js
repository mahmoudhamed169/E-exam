const { StatusCodes } = require("http-status-codes");

const Department = require("../../departments/model/departmentModel");
const Level = require("../../levels/model/levelModel");
const User = require("../../users/model/userModel");
const Subject = require("../model/subjectModel");

const getAllsubject = async (req, res) => {
  if (theUser.role == "admin") {
    try {
      const subjects = await Subject.find({})
        .populate("prof")
        .populate("department")
        .populate("level");
      res.json({ message: "All Subjects", data: subjects });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};

const getStudentSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      department: theUser.department,
      level: theUser.level,
    });
    res.json({ message: " subjects", data: subjects });
  } catch (error) {
    console.log(error);
  }
};

const addNewSubject = async (req, res) => {
  let { subjectName, department, level, prof } = req.body;
  if (theUser.role == "admin") {
    try {
      const departmentdata = await Department.findOne({
        departmentName: department,
      });
      const leveldata = await Level.findOne({ levelName: level });
      const profdata = await User.findOne({ email: prof });
      const subject = await Subject.findOne({
        subjectName: subjectName

      });
      if (subject) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "subject is already existes",
        });
      } else {
        if (departmentdata && leveldata && profdata) {
          let newsubject = new Subject({
            subjectName: subjectName.toLowerCase(),
            department: departmentdata._id,
            level: leveldata._id,
            prof: profdata._id,
          });
          await newsubject.save();
          res.json({ message: "Added success", newsubject });
        } else {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please enter correct data",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const removeSpacificSubject = async (req, res) => {
  if (theUser.role == "admin") {
    try {
      const subject = await Subject.findById(req.params.id);
      if (subject) {
        await Subject.findByIdAndDelete(req.params.id);
        res.json({ message: "subject deleted" });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "subject not found" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const updateSpacificSubject = async (req, res) => {
  try {
    let { subjectId, subjectName, department, level, prof } = req.body;
    const departmentdata = await Department.findOne({
      departmentName: department,
    });
    const leveldata = await Level.findOne({ levelName: level });
    const profdata = await User.findOne({ email: prof });
    if (theUser.role == "admin") {
      if(subjectId){
        const subject = await Subject.findById(subjectId);
        if(subject){
          if (departmentdata && leveldata && profdata) {
            await Subject.findByIdAndUpdate(subjectId, {
              subjectName: subjectName.toLowerCase(),
              department: departmentdata._id,
              level: leveldata._id,
              prof: profdata._id,
            });
            res.json({ message: "subject updated" });
          } else {
            res.status(StatusCodes.BAD_REQUEST).json({
              message: "Please enter correct data",
            });
          }
        }else{
          res.status(StatusCodes.NOT_FOUND).json({
            message: "subject not found",
          });
        }
      }
      
      
     
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getTeacherSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ prof: theUser._id });
    res.json({ message: " subjects", data: subjects });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllsubject,
  getStudentSubjects,
  addNewSubject,
  getTeacherSubjects,
  removeSpacificSubject,
  updateSpacificSubject,
};
