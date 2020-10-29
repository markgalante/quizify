import { gql } from "@apollo/client"; 


const NEW_QUESTION = gql`
    subscription NewQuestionAdded($id: String!){
        quizAdded(id: $id){
            id
            title
            questions
            creator
        }
    }
`; 

console.log(NEW_QUESTION); 