const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: String,
    password: { type: String, select: false },
    username: String,
    completedQuizzes: [
        {
            quiz: {
                type: Schema.Types.ObjectId,
                ref: "Quiz"
            },
            score: Number,
            totalQuestions: Number
        }
    ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);