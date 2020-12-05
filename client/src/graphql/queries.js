import { gql } from "@apollo/client";

export const GET_QUIZZES = gql`
    {
        quizes {
            id
            title
        }
    }
`;

export const GET_QUIZ = gql`
    query($id: ID!){
        quiz(id:$id){
            id
            title
            questions{
                id
                question
                options{
                    id
                    option
                    isCorrect
                }
            }
        }
    }
`;

export const QUESTION_LIST = gql`
    query($id: ID!){
        quiz(id: $id) {
            questions {
                id
                question
                options {
                    option
                    id
                    isCorrect
                }
            }
        }
    }
`;

export const SHOW_OPTIONS = gql`
    query($questionId: ID!){
        options(questionId:$questionId){
            option
            isCorrect
            id
        }
    }
`;

export const CURRENT_USER = gql`
    {
        currentUser {
            id
            email
        }
    }
`; 