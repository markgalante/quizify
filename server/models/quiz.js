const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    creatorId: String,
    submitted: { type: Boolean, default: false },
    completedBy: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            score: Number,
            totalQuestions: Number
        }
    ]
});

module.exports = mongoose.model("Quiz", quizSchema); 