const graphql = require("graphql");

//Import of Mongoose Schemas: 
const Quiz = require("../models/quiz");
const Option = require("../models/option");
const User = require("../models/user");
const Question = require("../models/question");


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
        submittedQuizzes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent, args) {
                return Quiz.find({ submitted: true })
            }
        },
        myQuizzes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent, args, req) {
                if (!req.user) {
                    console.log("you need to be logged on for this");
                    return;
                }
                console.log(req.user._id);
                return Quiz.find({ creatorId: req.user._id });
            }
        },
        questions: {
            type: new GraphQLList(types.QuestionType),
            args: { quizId: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Question.find({ quizId: args.quizId });
            }
        },
        user: {
            type: types.UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return User.findById(args.id);
            },
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
                const user = req.user
                if (!user) {
                    console.log("req.user is undefined");
                    return undefined
                } else {
                    console.log("user", user)
                }
                return User.findById(user.id);
            }
        },
    },
});

module.exports = RootQuery; 