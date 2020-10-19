const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const questionSchema = new Schema({
    question: String, 
    options: [optionID]
}); 

module.exports = mongoose.model("Question", questionSchema); 