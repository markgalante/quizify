const graphql = require("graphql");

const Option = require("../models/option");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInputObjectType } = graphql;


const QuestionType = types => new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: {
            type: new GraphQLList(types.OptionType),
        },
    })
});

module.exports = QuestionType; 