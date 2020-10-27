import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
    mutation CreateQuiz($title: String!, $creatorId: ID!){
        createQuiz(title: $title, creatorId: $creatorId){
            id
            title
        }
    }
`;
export const ADD_QUESTION = gql`
    mutation AddQuestion($question:String!, $quizId: ID!){
        addQuestion(question:$question, quizId:$quizId){
            id
            question
        }
    }
`;
