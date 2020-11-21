const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

const UserTypeInject = require("./user");
const QuizTypeInject = require("./quiz"); 
const QuestionTypeInject = require("./question"); 
const OptionTypeInject = require("./option");

const types = {}; 
types.UserType = UserTypeInject(types); 
types.QuizType = QuizTypeInject(types); 
types.QuestionType = QuestionTypeInject(types); 
types.OptionType = OptionTypeInject(types); 

const UserType = types.UserType; 
const QuizType = types.QuizType; 
const QuestionType = types.QuestionType; 
const OptionType = types.OptionType; 

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const RootQuery = types => new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        quiz: {
            type: types.QuizType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Quiz.findById(args.id);
            },
        },
        quizes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent, args) {
                return Quiz.find();
            }
        },
        user: {
            type: types.UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(types.UserType),
            resolve() {
                return User.find();
            },
        },
        options: {
            type: new GraphQLList(types.OptionType),
            args: { questionId: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Option.find({ questionId: args.questionId });
            }
        }
    },
});

module.exports = RootQuery; 