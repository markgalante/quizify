const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

const UserTypeInject = require("./user");
const QuizTypeInject = require("./quiz"); 
const QuestionTypeInject = require("./question"); 
const OptionTypeInject = require("./option");
const RootQueryInject = require("./queries"); 

const types = {}; 
types.UserType = UserTypeInject(types); 
types.QuizType = QuizTypeInject(types); 
types.QuestionType = QuestionTypeInject(types); 
types.OptionType = OptionTypeInject(types);
types.RootQuery = RootQueryInject(types);  

const UserType = types.UserType; 
const QuizType = types.QuizType; 
const QuestionType = types.QuestionType; 
const OptionType = types.OptionType; 
const RootQuery = types.RootQuery; 

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
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
            resolve(parent, args) {
                const newQuiz = new Quiz({
                    title: args.title,
                    creatorId: args.creatorId,
                });
                pubsub.publish(NEW_QUIZ_ADDED, { quizAdded: { title: newQuiz.title } });
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
            resolve(parent, args) {
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
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const user = new User({
                    name: args.name
                });
                return user.save(); //5f9400bfa74aa73a3cee98ac
            },
        },
    },
});

module.exports = Mutation; 