const graphql = require("graphql"); 

const Question = require("../models/question"); 
const User = require("../models/user"); 

const QuestionType = require("./question"); 
const UserType = require("./user");

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql; 

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
        }
    })
});

module.exports = QuizType; 