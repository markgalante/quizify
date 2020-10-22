const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const optionSchema = new Schema({
    option: String, 
    isCorrect: Boolean, 
    questionId: String,
}); 

module.exports = mongoose.model("Option", optionSchema); 