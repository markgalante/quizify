const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const QuizType = new GraphQLObjectType({
    name: "Quiz",
    fields: () => ({
        id: { GraphQLID },
        title: { GraphQLString },
    })
});

const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { GraphQLID },
        question: { GraphQLString },
    })
});

const OptionType = new GraphQLObjectType({
    name: "Option",
    fields: () => ({
        id: { GraphQLID },
        option: { GraphQLString },
        isCorrect: { GraphQLBoolean }
    })
}); 