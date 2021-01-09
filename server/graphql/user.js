const graphql = require("graphql");

const Quiz = require("../models/quiz");

const QuizType = require("./quiz");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = graphql;

const CompletedQuizzesType = new GraphQLObjectType({
    name: "CompletedQuizzes",
    fields: () => ({
        id: { type: GraphQLID },
        score: { type: GraphQLInt },
        totalQuestions: { type: GraphQLInt }
    })
});

const UserType = types => new GraphQLObjectType({
    name: "User",
    fields: () => ({
        email: { type: GraphQLString },
        id: { type: GraphQLID },
        quizes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent) {
                return Quiz.find({ creatorId: parent.id });
            }
        },
        completedQuizes: { type: new GraphQLList(CompletedQuizzesType) }
    }),
});

module.exports = UserType; 