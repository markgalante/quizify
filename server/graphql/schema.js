const graphql = require("graphql");

const UserTypeInject = require("./user");
const QuizTypeInject = require("./quiz");
const QuestionTypeInject = require("./question");
const OptionTypeInject = require("./option");
const RootQueryInject = require("./queries");
const MutationInject = require("./mutations");
const SubscriptionInject = require("./subscriptions"); 

const types = {};
types.UserType = UserTypeInject(types);
types.QuizType = QuizTypeInject(types);
types.QuestionType = QuestionTypeInject(types);
types.OptionType = OptionTypeInject(types);
types.RootQuery = RootQueryInject(types);
types.Mutation = MutationInject(types);
types.Subscription = SubscriptionInject(types); 

const RootQuery = types.RootQuery;
const Mutation = types.Mutation;
const Subscription = types.Subscription; 

const { GraphQLSchema } = graphql;


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription,
}); 