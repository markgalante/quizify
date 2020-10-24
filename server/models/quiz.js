const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    createdBy: {
        name: String,
        userId: String
    }
});

module.exports = mongoose.model("Quiz", quizSchema); 