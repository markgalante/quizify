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
            submitted
            creator{
                email
                id
            }
            questions{
                id
                question
                options{
                    option
                }
                quizCreator
            }
        }
    }
`;

export const QUIZ_OF_USER = gql`
    query($id: ID!){
        quizOfUser(id: $id) {
            id
            title
            submitted
            creator{
                email
                id
            }
            questions{
                id
                question
                options{
                    option
                    isCorrect
                }
                quizCreator
            }
        }
    }
`;

export const GET_QUESTIONS = gql`
    query($id: ID!){
        quiz(id:$id){
            id
            title
            creator{
                id
            }
            questions{
                id
                question
                options{
                    option
                    isCorrect
                }
            }
        }
    }
`;

export const UNSUBMITTED_QUIZZES = gql`
    {
        myUnsubmittedQuizzes {
            id
            title
            questions {
                id
                question
                options {
                    option
                    isCorrect
                }
            }
        }
    }
`;

export const SUBMITTED_QUIZZES = gql`
    {
        submittedQuizzes {
            id
            title
    }
}
`;

export const USER_QUIZZES = gql`
    {
        myQuizzes {
            id
            title
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

export const USER = gql`
        query($id:ID!){
            user(id:$id){
                id
                email
                username
            }
        }
`;

export const COMPLETED_QUIZZES = gql`
    query($userId: ID){
        userCompletedQuizzes(userId: $userId) {
            completedQuizzes {
                quiz {
                    id
                    title
                }
                score
                totalQuestions
            }
        }
    }
`;