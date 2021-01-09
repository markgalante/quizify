import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
    mutation CreateQuiz($title: String!, $creatorId: ID!){
        createQuiz(title: $title, creatorId: $creatorId){
            id
            title
        }
    }
`;

export const UPDATE_QUIZ = gql`
    mutation UpdateQuiz($id: ID!, $title: String!, $creator: ID!){
        updateQuiz(id:$id, title:$title, creator:$creator){
            id
        }
    }
`;

export const DELETE_QUIZ = gql`
    mutation DeleteQuiz($id:ID!, $creator:ID!){
        deleteQuiz(id:$id, creator:$creator){
            id
            title
        }
    }
`;

export const ADD_QUESTION = gql`
    mutation AddQuestion($question:String!, $quizId: ID!, $creator: ID!, $options: [InputOptions]){
        addQuestion(question:$question, quizId:$quizId, creator:$creator, options: $options){
            id
            question
        }
    }
`;

export const UPDATE_QUESTION = gql`
    mutation UpdateQuestion($questionId: ID!, $creator: ID!, $question: String!, $options: [InputOptions]){
        updateQuestion(questionId:$questionId, creator:$creator, question:$question, options:$options){
            id
        }
    }
`;

export const DELETE_QUESTION = gql`
    mutation DeleteQuestion($questionId:ID!, $creator: ID!){
        deleteQuestion(questionId:$questionId, creator: $creator){
            id
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($email: String!, $password: String!){
        addUser(email:$email, password:$password){
            id
        }
    }
`;

export const UPDATE_USER = gql`
    mutation {
        updateUser{
            id
        }
    }
`;

export const SUBMIT_ANSWERS = gql`
    mutation SubmitAnswers($options:[InputAnswers!], $quizId:ID!){
        submitAnswers(options:$options, quizId:$quizId){
            id
        }
    }
`;
