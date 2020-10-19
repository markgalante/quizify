const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    questions: [questionID]
}); 

module.exports = mongoose.model("Quiz", quizSchema); 