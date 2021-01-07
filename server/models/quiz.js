const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    creatorId: String,
    submitted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Quiz", quizSchema); 