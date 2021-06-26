const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLList,
} = graphql;

const InputOptionsType = new GraphQLInputObjectType({
    name: "InputOptions",
    fields: () => ({
        option: { type: new GraphQLNonNull(GraphQLString) },
        isCorrect: { type: new GraphQLNonNull(GraphQLBoolean) }
    })
});

const InputAnswersType = new GraphQLInputObjectType({
    name: "InputAnswers",
    fields: () => ({
        option: { type: new GraphQLNonNull(GraphQLString) }
    }),
})

const Mutation = types => new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createQuiz: {
            type: types.QuizType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                creatorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("You need to be signed in for this");
                    return "You need to be logged on to create a quiz";
                }
                const newQuiz = new Quiz({
                    title: args.title,
                    creatorId: req.user._id,
                });
                console.log({ newQuiz });
                newQuiz.save();
                return newQuiz
            }
        },
        updateQuiz: {
            type: types.QuizType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                creator: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("You need to be logged in to do this");
                    return null;
                }
                if (req.user._id == args.creator) {
                    const updatedQuiz = {
                        title: args.title
                    }
                    return Quiz.findByIdAndUpdate(args.id, updatedQuiz);
                }
                console.log("You do not have authorisation to do this")
                return null;
            },
        },
        deleteQuiz: {
            type: types.QuizType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                creator: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("you need to be logged on to do this");
                    return "You need to be logged on to do this."
                }
                if (req.user._id != args.creator) {
                    console.log("req.user._id: ", `--${req.user._id}--${typeof req.user._id}`);
                    console.log("args.creator: ", `--${args.creator}--${typeof args.creator}`);
                    console.log("you do not have authorisation to do this  req.user._id !== args.creator");
                    return null;
                }
                Quiz.findById(args.id)
                    .then(quiz => {
                        if (quiz.creatorId === req.user.id) {
                            quiz.deleteOne()
                                .then(deletedQuiz => {
                                    Question.find({ quizId: args.id })
                                        .then(questions => {
                                            for (let i = 0; i < questions.length; i++) {
                                                questions[i].deleteOne()
                                            };
                                        });
                                }).catch(err => console.log(`ERROR deleting Quiz ${err}`))
                        } else {
                            console.log("you do not have the authority to do this.");
                            return null;
                        }
                    });
            }
        },
        submitQuiz: {
            type: types.QuizType,
            args: {
                quizId: { type: new GraphQLNonNull(GraphQLID) },
                creator: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("You need to be logged in to do this");
                    return;
                }
                if (req.user._id != args.creator) {
                    console.log(`req.user._id: ${req.user._id}, != args.creator${args.creator}`)
                    console.log("You are not authorised to do this");
                    return;
                }
                Quiz.findByIdAndUpdate(args.quizId, { submitted: true }).then(() => console.log("SUCCESS")).catch(err => console.log({ err }))
            }
        },
        addQuestion: {
            type: types.QuestionType,
            args: {
                question: { type: new GraphQLNonNull(GraphQLString) },
                quizId: { type: new GraphQLNonNull(GraphQLID) },
                creator: { type: new GraphQLNonNull(GraphQLID) },
                options: { type: new GraphQLList(InputOptionsType) }
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("You need to be logged in to do this.");
                    return null;
                }
                if (req.user._id != args.creator) {
                    console.log(req.user._id, args.creator)
                    console.log("You are not authorised to do this.");
                    return null;
                }
                for (let i = 0; i < args.options.length; i++) {
                    if (args.options[i].isCorrect) {
                        const question = new Question({
                            question: args.question,
                            quizId: args.quizId,
                            options: args.options,
                            creator: { id: args.creator },
                        });
                        return question.save();
                    }
                }
                console.log("INVALID QUESTION: This question requires a correct option");
                return null;
            },
        },
        updateQuestion: {
            type: types.QuestionType,
            args: {
                questionId: { type: new GraphQLNonNull(GraphQLID) },
                creator: { type: new GraphQLNonNull(GraphQLID) },
                question: { type: new GraphQLNonNull(GraphQLString) },
                options: { type: new GraphQLList(InputOptionsType) }
            },
            resolve(parent, args, req) {
                console.log({ args });
                if (!req.user) {
                    console.log("You need to be logged in to do this.");
                    return null;
                }
                if (req.user._id != args.creator) {
                    console.log(req.user._id, args.creator)
                    console.log("You are not authorised to do this.");
                    return null;
                }
                for (let i = 0; i < args.options.length; i++) {
                    if (args.options[i].isCorrect) {
                        const updatedQuestion = {
                            question: args.question,
                            options: args.options,
                        };
                        return Question.findByIdAndUpdate(args.questionId, updatedQuestion).then(q => console.log({ q }))
                            .catch(err => console.log({ err }));
                    }
                }
            },
        },
        deleteQuestion: {
            type: types.QuestionType,
            args: {
                questionId: { type: new GraphQLNonNull(GraphQLID) },
                creator: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("You need to be logged in to do this.");
                    return null;
                }
                if (req.user._id != args.creator) {
                    console.log(req.user._id, args.creator)
                    console.log("You are not authorised to do this.");
                    return null;
                }
                Question.findByIdAndDelete(args.questionId)
                    .then(quest => {
                        console.log(`Deleted question ${quest.question}`);
                    })
                    .catch(err => console.log(`Error deleting question due to ${err.message}`))
            }
        },
        addUser: {
            type: types.UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const user = {
                    email: args.email
                };
                User.register(user, args.password, (err, user) => {
                    if (err) console.log("Error", err.message);
                    else {
                        console.log(user);
                    }
                })
            },
        },
        updateUser: {
            type: types.UserType,
            resolve(parent) {
                console.log(parent);
            }
        },
        submitAnswers: {
            type: types.QuizType,
            args: {
                options: { type: new GraphQLList(new GraphQLNonNull(InputAnswersType)) },
                quizId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, req) {
                let score = 0;
                let totalQuestions = 0;
                Quiz.findById(args.quizId).then(quiz => {
                    if (req.user._id.equals(quiz.creatorId)) { //Determines if you made the quiz. 
                        throw new Error();
                    }
                    if (req.user.completedQuizzes.length <= quiz.completedBy.length) {
                        for (let i = 0; i < req.user.completedQuizzes.length; i++) {
                            if (req.user.completedQuizzes[i].quiz.equals(args.quizId)) {
                                console.log("You've done this quiz already.");
                                return;
                            };
                        };
                    } else {
                        for (let i = 0; i < quiz.completedBy.length; i++) {
                            if (req.user._id.equals(quiz.completedBy[i].user)) { //Determines if you've done this quiz.
                                console.log("You've done this quiz already!");
                                return;
                            };
                        };
                    }
                    Question.find({ quizId: args.quizId })
                        .then(question => {
                            totalQuestions = question.length;
                            for (let i = 0; i < args.options.length; i++) {
                                for (let x = 0; x < question[i].options.length; x++) {
                                    if (question[i].options[x].option === args.options[i].option) {
                                        if (question[i].options[x].isCorrect) {
                                            score++;
                                        }
                                    }
                                }
                            }
                            const quizPayload = {
                                user: req.user._id,
                                score: score,
                                totalQuestions: totalQuestions
                            }
                            Quiz.findByIdAndUpdate(args.quizId, { $push: { completedBy: quizPayload } })
                                .then(() => console.log("SUCCESS"))
                                .catch(err => console.log("ERROR UPDATING QUIZ", err))

                            const userPayload = {
                                quiz: args.quizId,
                                score,
                                totalQuestions
                            }
                            User.findByIdAndUpdate(req.user._id, { $push: { completedQuizzes: userPayload } })
                                .then(user => console.log("UPDATED USER", user))
                                .catch(err => console.log("ERROR UPDATING USER", err))
                        })
                        .catch(err => console.log(err))
                }).catch(err => new Error("You cannot perform this function", err));
            }
        }
    },
});

module.exports = Mutation;