const graphql = require("graphql"); 

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean }  = graphql;

const OptionType = () => new GraphQLObjectType({
    name: "Option",
    fields: () => ({
        id: { type: GraphQLID },
        option: { type: GraphQLString },
        isCorrect: { type: GraphQLBoolean }
    })
});

module.exports = OptionType; 