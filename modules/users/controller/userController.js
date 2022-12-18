const User = require("../model/userModel");
const Department = require("../../departments/model/departmentModel");
const Level = require("../../levels/model/levelModel");
const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate("level")
    .populate("department")
    .select("-password");
  res.json({ message: "allUsers", users });
};

const sign_up = async (req, res) => {
  let { fristName, lastName, email, level, department, password, role } =
    req.body;
  try {
    const departmentdata = await Department.findOne({
      departmentName: department.toLowerCase(),
    });
    const leveldata = await Level.findOne({ levelName: level.toLowerCase() });
    const user = await User.findOne({ email });
    if (user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "email is already existes",
      });
    } else {
      if(departmentdata && leveldata){
      let newUser = new User({
        fristName,
        lastName,
        email,
        level : leveldata._id,
        department : departmentdata._id,
        password,
        role,
      });
      await newUser.save();
      res.status(StatusCodes.CREATED).json({ massege: "resgisted success" });
    }
    else{
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "department or level is not existes",
      });
    }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ massge: "error", error });
    console.log(error);
  }
};

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
            level: user.level,
            department: user.department,
          },
          "shhhhh"
        );
        res.status(StatusCodes.OK).json({ message: "login success",
          token,
          user: {
            name: user.fristName + " " + user.lastName,
            email: user.email,
            role: user.role,
            level: user.level,
            department: user.department,
          },
        });
      } else {
        res.json({ message: "password is not corrected" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

const getAllProfessors = async (req, res) => {
  console.log(theUser);
  if (theUser.role == "admin") {
    const users = await User.find({ role: "professor" })
      .populate("level")
      .populate("department")
      .select("-password");
    res.json({ message: "allprofessor", users });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const addNewProfessor = async (req, res) => {
  let { fristName, lastName, email, password } = req.body;
  if (theUser.role == "admin") {
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "email is already existes",
        });
      } else {
        let newUser = new User({
          fristName,
          lastName,
          email,
          password,
          role: "professor",
        });
        await newUser.save();
        res.status(StatusCodes.CREATED).json({ message: "added success" });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "error", error });
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ massege: "UNAUTHORIZED" });
  }
};

const deleteUser = async (req, res) => {
  if (theUser.role == "admin") {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "user not found",
        });
      } else {
        res.status(StatusCodes.OK).json({ message: "deleted success" });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "error",
        error,
      });
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const updateUser = async (req, res) => {
  if (theUser.role == "admin") {
    try {
      let { professorId , fristName, lastName, email, password } = req.body;
      const user = await User.findByIdAndUpdate( professorId, { fristName, lastName, email, password });
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "user not found",
        });
      } else {
        res.status(StatusCodes.OK).json({ message: "updated success" });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "error",
        error,
      });
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};




module.exports = {
  getAllUsers,
  sign_up,
  sign_in,
  getAllProfessors,
  addNewProfessor,
  deleteUser,
  updateUser,
};
