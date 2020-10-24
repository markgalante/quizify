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
`