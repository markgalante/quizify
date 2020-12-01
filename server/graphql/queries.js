const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Option = require("../models/option");
const User = require("../models/user");


const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
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
        currentUser: {
            type: types.UserType, 
            resolve(parent, args, req) { 
                return User.findById(req.user._id); 
            }
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