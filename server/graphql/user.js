const graphql = require("graphql");

const Quiz = require("../models/quiz");

const QuizType = require("./quiz");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} = graphql;

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
        }
    }),
});

module.exports = UserType; 