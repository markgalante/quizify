const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        quizes: {
            type: new GraphQLList(QuizType),
            resolve(parent, args) {
                return Quiz.find({ creatorId: parent.id });
            }
        }
    }),
});

const OptionType = new GraphQLObjectType({
    name: "Option",
    fields: () => ({
        id: { type: GraphQLID },
        option: { type: GraphQLString },
        isCorrect: { type: GraphQLBoolean }
    })
});

const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: {
            type: new GraphQLList(OptionType),
            resolve(parent, args) {
                return Option.find({ questionId: parent.id });
            },
        },
    })
});

const QuizType = new GraphQLObjectType({
    name: "Quiz",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({ quizId: parent.id });
            }
        },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creatorId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        quiz: {
            type: QuizType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Quiz.findById(args.id);
            },
        },
        quizes: {
            type: new GraphQLList(QuizType),
            resolve(parent, args) {
                return Quiz.find();
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find();
            },
        },
    },
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createQuiz: {
            type: QuizType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                creatorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const newQuiz = {
                    title: args.title,
                    creatorId: args.creatorId,
                };
                const quiz = new Quiz(newQuiz);
                return quiz.save();
            }
        },
        deleteQuiz: {
            type: QuizType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Quiz.findByIdAndDelete(args.id);
            }
        },
        addQuestion: {
            type: QuestionType,
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
        addOption: {
            type: OptionType,
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
        addUser: {
            type: UserType,
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

const Subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
        quizAdded: {
            type: QuizType,
            subscribe: () => {
                pubsub.asyncIterator(NEW_QUIZ_ADDED);
            },
        },
        questionAdded: {
            type: QuestionType,
            subscribe: () => pubsub.asyncIterator("questionAdded"),
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription,
}); 