const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const optionSchema = new Schema({
    option: String, 
    isCorrect: Boolean, 
}); 

module.exports = mongoose.model("Option", optionSchema); 