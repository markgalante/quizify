const graphql = require("graphql"); 

const Option = require("../models/option");

const OptionTypeInject = require("./option");

const types = {}; 
types.OptionType = OptionTypeInject(types); 
const OptionType = types.OptionType; 

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