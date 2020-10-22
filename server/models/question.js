const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const questionSchema = new Schema({
    question: String, 
    quizId: String,
}); 

module.exports = mongoose.model("Question", questionSchema); 