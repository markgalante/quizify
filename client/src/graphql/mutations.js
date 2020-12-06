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
    mutation UpdateQuiz($id: ID!, $title: String!){
        updateQuiz(id:$id, title:$title){
            id
            title
        }
    }
`;

export const DELETE_QUIZ = gql`
    mutation DeleteQuiz($id:ID!){
        deleteQuiz(id:$id){
            id
            title
        }
    }
`;

export const ADD_QUESTION = gql`
    mutation AddQuestion($question:String!, $quizId: ID!, $creator: ID!){
        addQuestion(question:$question, quizId:$quizId, creator:$creator){
            id
            question
        }
    }
`;

export const UPDATE_QUESTION = gql`
    mutation UpdateQuestion($id: ID!, $question: String!, $creator:ID!){
        updateQuestion(id:$id, question:$question, creator:$creator){
            id
            question
        }
    }
`;

export const DELETE_QUESTION = gql`
    mutation DeleteQuestion($questionId:ID!){
        deleteQuestion(questionId:$questionId){
            id
        }
    }
`;

export const ADD_OPTION = gql`
    mutation AddOption($option:String!, $isCorrect: Boolean, $questionId: ID!){
        addOption(option:$option, isCorrect:$isCorrect, questionId:$questionId){
            id
            option
            isCorrect
        }
    }
`;

export const UPDATE_OPTION = gql`
    mutation UpdateOption($option: String!, $isCorrect: Boolean, $id:ID!, $questionId: ID!){
        updateOption(id:$id, questionId:$questionId, option:$option, isCorrect:$isCorrect){
            id
            option
            isCorrect
        }
    }
`;

export const DELETE_OPTION = gql`
    mutation DeleteOption($id:ID!){
        deleteOption(id:$id){
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
