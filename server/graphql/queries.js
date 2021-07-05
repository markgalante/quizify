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
                return Quiz.findById(args.id)
                    .then(quiz => {
                        if (!quiz) throw new Error();
                        return quiz;
                    }).catch(() => {
                        throw new Error("This quiz does not exist");
                    });
            },
        },
        quizes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent, args, req) {
                return Quiz.find();
            }
        },
        submittedQuizzes: { //lists submitted quizzes that were not completed or created by logged in user. 
            type: new GraphQLList(types.QuizType),
            resolve(parent, args, req) {
                if (!req.user) return;
                return Quiz.find({ submitted: true, $nor: [{ 'completedBy.user': req.user._id }, { creatorId: req.user._id }] });
            }
        },
        userCompletedQuizzes: {
            type: types.UserType,
            args: {
                userId: { type: GraphQLID },
            },
            resolve(parent, args, req) {
                return User.findById(args.userId)
                    .then(user => {
                        if (!user) throw new Error();
                        return user;
                    })
                    .catch(err => {
                        throw new Error("This user does not exist")
                    });
            },
        },
        myQuizzes: { //Quizzes created by user
            type: new GraphQLList(types.QuizType),
            resolve(parent, args, req) {
                if (!req.user) {
                    throw new Error("You need to be logged in to view this");
                }
                return Quiz.find({ creatorId: req.user._id, submitted: true });
            }
        },
        myUnsubmittedQuizzes: {
            type: new GraphQLList(types.QuizType),
            resolve(parent, args, req) {
                if (!req.user) {
                    throw new Error("You need to be logged in to view this");
                }
                return Quiz.find({ creatorId: req.user._id, submitted: false });
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
                return User.findById(args.id).then(user => {
                    if (!user) throw new Error();
                    return user;
                }).catch(err => {
                    throw new Error("This user does not exist");
                })
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
                } else {
                    return User.findById(user.id)
                        .then(user => {
                            if (!user) throw new Error();
                            return user;
                        })
                        .catch(() => {
                            throw new Error("No user found");
                        });
                }

            }
        },
    },
});

module.exports = RootQuery;