import { gql } from "@apollo/client";

export const GET_QUIZZES = gql`
    {
        quizes {
            id
            title
            creator {
                id
                name
            }
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