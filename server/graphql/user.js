const graphql = require("graphql");

const Quiz = require("../models/quiz");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = graphql;

const CompletedQuizzesType = types => new GraphQLObjectType({
    name: "CompletedQuizzes",
    fields: () => ({
        quiz: {
            type: types.QuizType,
            async resolve(parent) {
                return await Quiz.findById(parent.quiz)
            }
        },
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
        completedQuizzes: { type: new GraphQLList(CompletedQuizzesType(types)) }
    }),
});

module.exports = UserType; 