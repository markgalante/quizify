const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const Subscription = types => new GraphQLObjectType({
    name: "Subscription",
    fields: {
        quizAdded: {
            type: types.QuizType,
            subscribe: () => {
                pubsub.asyncIterator(NEW_QUIZ_ADDED);
            },
            resolve: payload => payload,
        },
        questionAdded: {
            type: types.QuestionType,
            subscribe: () => pubsub.asyncIterator("questionAdded"),
        }
    }
});

module.exports = Subscription; 