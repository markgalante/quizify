import { gql } from "@apollo/client";

export const GET_QUIZZES = gql`
    {
        quizes {
            id
            title
        }
    }
`;

export const QUIZ = gql`
    query($id: ID!){
        quiz(id: $id) {
            id
            title
            creator{
                email
                id
            }
            questions{
                question
                options{
                    option
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