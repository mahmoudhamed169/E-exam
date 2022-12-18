const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");

const getAllDepartment = async (req, res) => {
  const departments = await Department.find({}).populate("createdBy");
  res.json({ message: "All Department", data: departments });
};

const addNewDepartment = async (req, res) => {
  let { departmentName } = req.body;
  if(theUser.role == "admin"){
    try {
      const department = await Department.findOne({ departmentName : departmentName.toLowerCase() });
      if (department) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "department is already existes",
        });
      } else {
        let newDepartment = new Department({ departmentName : departmentName.toLowerCase() , createdBy:theUser._id});
        await newDepartment.save();
        res.json({ message: "Added success", Department: newDepartment });
      }
    } catch (error) {
      console.log(error);
    }
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
  }
  
};
const removeSpacificDepartment = async (req, res) => {
 if (theUser.role == "admin") {
    try {
      const department = await Department.findById(req.params.id);
      if (department) {
        await Department.findByIdAndDelete(req.params.id);
        res.json({ message: "department deleted" });
      } else {
        res 
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "department not found" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const updateDepartment = async (req, res) => {
  let { departmentId, departmentName } = req.body;
  const department = await Department.findById(departmentId);
  if(theUser.role == "admin"){
    try {
      if (department) {
        await Department.findByIdAndUpdate(departmentId, { departmentName : departmentName.toLowerCase() });
        res.json({ message: "department updated" });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "department not found" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};





















module.exports = {
  getAllDepartment,
  addNewDepartment,
  removeSpacificDepartment,
  updateDepartment,
  
};

