const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

const UserTypeInject = require("./user");
const QuizTypeInject = require("./quiz"); 
const QuestionTypeInject = require("./question"); 
const OptionTypeInject = require("./option");
const RootQueryInject = require("./queries"); 
const MutationInject = require("./mutations"); 

const types = {}; 
types.UserType = UserTypeInject(types); 
types.QuizType = QuizTypeInject(types); 
types.QuestionType = QuestionTypeInject(types); 
types.OptionType = OptionTypeInject(types);
types.RootQuery = RootQueryInject(types);  
types.Mutation = MutationInject(types); 

const UserType = types.UserType; 
const QuizType = types.QuizType; 
const QuestionType = types.QuestionType; 
const OptionType = types.OptionType; 
const RootQuery = types.RootQuery; 
const Mutation = types.Mutation; 

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const NEW_QUIZ_ADDED = "new_quiz_added";

const Subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
        quizAdded: {
            type: QuizType,
            subscribe: () => {
                pubsub.asyncIterator(NEW_QUIZ_ADDED);
            },
            resolve: payload => payload,
        },
        questionAdded: {
            type: QuestionType,
            subscribe: () => pubsub.asyncIterator("questionAdded"),
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription,
}); 