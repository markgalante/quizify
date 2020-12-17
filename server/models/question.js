const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    quizId: String,
    options: [
        {
            option: String,
            isCorrect: Boolean
        }
    ],
    creator: {
        id: {
            type: Schema.Types.ObjectId, 
            ref: "User"
        }
    }
});

module.exports = mongoose.model("Question", questionSchema); 