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
    GraphQLBoolean
} = graphql;

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
                return newQuiz.save();
            }
        },
        updateQuiz: {
            type: types.QuizType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const updatedQuiz = {
                    title: args.title
                }
                return Quiz.findByIdAndUpdate(args.id, updatedQuiz);
            },
        },
        deleteQuiz: {
            type: types.QuizType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("you need to be logged on to do this"); 
                    return "You need to be logged on to do this."
                }
                Quiz.findByIdAndDelete(args.id)
                    .then(quiz => {
                        console.log(`Deleted quiz ${quiz.title}`);
                        Question.deleteMany({ quizId: args.id })
                            .then(questions => {
                                console.log(`Deleted questions ${questions}`);
                                Option.deleteMany({ questionId: questions.id })
                                    .then(opt => console.log(`Deleted options ${opt}`))
                                    .catch(err => console.log(`Error deleting option due to ${err.message}`));
                            })
                            .catch(err => console.log(`Error deleting question due to ${err.message}`));
                    })
                    .catch(err => console.log(`Error deleting quiz ${err.message}`));
            }
        },
        addQuestion: {
            type: types.QuestionType,
            args: {
                question: { type: new GraphQLNonNull(GraphQLString) },
                quizId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const question = new Question({
                    question: args.question,
                    quizId: args.quizId
                });
                return question.save();
            },
        },
        updateQuestion: {
            type: types.QuestionType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                question: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const updatedQuestion = {
                    question: args.question
                };
                return Question.findByIdAndUpdate(args.id, updatedQuestion);
            },
        },
        deleteQuestion: {
            type: types.QuestionType,
            args: {
                questionId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Question.findByIdAndDelete(args.questionId)
                    .then(quest => {
                        console.log(`Deleted question ${quest.question}`);
                        Option.deleteMany({ questionId: args.id })
                            .then(opt => console.log(`Deleted options ${opt}`))
                            .catch(err => console.log(`Error deleting options ${err.message}`));
                    })
                    .catch(err => console.log(`Error deleting question due to ${err.message}`))
            }
        },
        addOption: {
            type: types.OptionType,
            args: {
                option: { type: GraphQLString },
                isCorrect: { type: GraphQLBoolean },
                questionId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const option = new Option({
                    option: args.option,
                    isCorrect: args.isCorrect,
                    questionId: args.questionId,
                });
                return option.save();
            }
        },
        updateOption: {
            type: types.OptionType,
            args: {
                id: { type: GraphQLID },
                questionId: { type: GraphQLID },
                option: { type: GraphQLString },
                isCorrect: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                updatedOption = {
                    option: args.option,
                    isCorrect: args.isCorrect
                }
                if (args.isCorrect) {
                    Option.findOne({ questionId: args.questionId, isCorrect: true })
                        .then(option => {
                            return Option.findByIdAndUpdate(option._id, { isCorrect: false })
                        })
                        .catch(err => console.log({ err }));
                }
                return Option.findByIdAndUpdate(args.id, updatedOption);
            },
        },
        deleteOption: {
            type: types.OptionType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Option.findByIdAndDelete(args.id)
                    .then(opt => console.log(`Successfully deleted option: ${opt.option} ID: ${opt.id}`))
                    .catch(err => console.log(`Error deleting option due to ${err.message}`));
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
        }
    },
});

module.exports = Mutation; 