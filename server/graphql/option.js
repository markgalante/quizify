const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } = graphql;

const OptionType = () => new GraphQLObjectType({
    name: "Option",
    fields: () => ({
        option: { type: new GraphQLNonNull(GraphQLString) },
        isCorrect: { type: GraphQLBoolean }
    })
});

module.exports = OptionType; 