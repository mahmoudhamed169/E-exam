const Level = require("../model/levelModel");
const { StatusCodes } = require("http-status-codes");

const getAllLevels = async (req, res) => {
  const levels = await Level.find({}).populate("createdBy");
  res.json({ message: "allLevels", levels });
};

const addNewLevel = async (req, res) => {
  let { levelName } = req.body;     
  if(theUser.role == "admin"){
    try {
      const level = await Level.findOne({ levelName });
      if (level) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "This Level is already existes",
        });
      } else {
        let newlevel = new Level({ levelName :levelName.toLowerCase() , createdBy:theUser._id});
        await newlevel.save()
        res.json({ message: "Added success", level: newlevel });
        console.log(theUser._id)
      }
    } catch (error) {
      console.log(error);
    }

  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
  }
  

};

const removeSpacificLevel = async (req, res) => {
  if (theUser.role == "admin") {
    try {
      const level = await Level.findById(req.params.id);
      if (level) {
        await Level.findByIdAndDelete(req.params.id);
        res.json({ message: "level deleted" });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "level not found" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
  }
};

const updateLevel = async (req, res) => {
  try{
    let {  levelId, levelName } = req.body;
    const level = await Level.findById(levelId);
    if(theUser.role == "admin"){
      if(level){
        await Level.findByIdAndUpdate(levelId,{levelName:levelName.toLowerCase()})
        res.json({message:"level updated"})
      }
      else{
        res.status(StatusCodes.NOT_FOUND).json({message:"level not found"})
      }
    }
    else{
      res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
    }
  }
  catch(error){
    console.log(error)
  }
};

   


    
    
 


module.exports = {
  getAllLevels,
  addNewLevel,
  removeSpacificLevel,
  updateLevel,
};



