const graphql = require("graphql");

const Option = require("../models/option");
const Quiz = require("../models/quiz");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInputObjectType } = graphql;


const QuestionType = types => new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: {
            type: new GraphQLList(types.OptionType),
        },
        quizCreator: {
            type: GraphQLBoolean,
            resolve: (parent, args, req) => {
                if (!req.user) return false;
                return Quiz.findById(parent.quizId)
                    .then(quiz => {
                        if (req.user._id.equals(quiz.creatorId)) return true;
                        else return false;
                    });
            }
        },
    }),
});

module.exports = QuestionType;