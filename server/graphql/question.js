const graphql = require("graphql"); 

const Option = require("../models/option");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = graphql; 


const QuestionType = types => new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: {
            type: new GraphQLList(types.OptionType),
            resolve(parent, args) {
                return Option.find({ questionId: parent.id });
            },
        },
    })
});

module.exports = QuestionType; 