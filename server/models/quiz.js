const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String, 
    questions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Question'
    }]
}); 

module.exports = mongoose.model("Quiz", quizSchema); 