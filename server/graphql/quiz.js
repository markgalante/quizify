const graphql = require("graphql");

const Question = require("../models/question");
const User = require("../models/user");

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean } = graphql;

const CompletedQuizType = new GraphQLObjectType({
    name: "CompletedQuiz",
    fields: () => ({
        id: { type: GraphQLID },
        score: { type: GraphQLInt },
        totalQuestions: { type: GraphQLInt },
    })
});

const QuizType = types => new GraphQLObjectType({
    name: "Quiz",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        questions: {
            type: new GraphQLList(types.QuestionType),
            resolve(parent, args) {
                return Question.find({ quizId: parent.id });
            }
        },
        creator: {
            type: types.UserType,
            resolve(parent, args) {
                return User.findById(parent.creatorId);
            }
        },
        submitted: { type: GraphQLBoolean },
        completedBy: { type: new GraphQLList(CompletedQuizType) },
    })
});

module.exports = QuizType; 