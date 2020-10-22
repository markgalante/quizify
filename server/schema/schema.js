const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

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
            type: QuizType,
            resolve(parent, args) {
                return Quiz.find();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
}); 