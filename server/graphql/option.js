const graphql = require("graphql"); 

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean }  = graphql;

const OptionType = types => new GraphQLObjectType({
    name: "Option",
    fields: () => ({
        id: { type: GraphQLID },
        option: { type: GraphQLString },
        isCorrect: { type: GraphQLBoolean }
    })
});

module.exports = OptionType; 