
const { StatusCodes } = require("http-status-codes");
const Answer = require("../model/answerModel");

const getAllAnswers = async(req, res) => {
    try{
        const answers = await Answer.find({ });
        res.status(StatusCodes.OK).json({ message: " answers", data: answers });
    }
    catch(error){
        console.log(error);
    }
}



const getSpecificAnswer = async(req, res) => {
   try{
       let {exam} = req.params ; 
       const answers = await Answer.find({ exam , student : theUser._id}).populate("question");
       res.status(StatusCodes.OK).json({ message: " answers", data: answers });    
   }
    catch(error){
        console.log(error);
    }
}


const AddAnswerHistory = async(req, res) => {
    try
    { 
     let { exam, question, selectedAnswer,isCorrect } = req.body;
    const answer = await Answer.findOne({ exam, student : theUser._id});
    if(answer){
        res.status(StatusCodes.BAD_REQUEST).json({ message: "answer is already existes" });
    }
    else{
        let newAnswer = new Answer({ exam, question, selectedAnswer,isCorrect,student : theUser._id});
        await newAnswer.save();
        res.json({ message: "Added success", newAnswer });
    }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllAnswers,
    getSpecificAnswer,
    AddAnswerHistory
}
 

