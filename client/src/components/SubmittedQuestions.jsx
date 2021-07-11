import React, { useEffect, useReducer } from "react";

//GraphQL: 
import { useMutation, useQuery } from "@apollo/client";
import { SUBMIT_ANSWERS } from "../graphql/mutations"
import { CURRENT_USER } from "../graphql/queries";

import { reducer, initialState } from "./submitQuiz/SubmitQuizReducer"

import SubmittedOptions from "./SubmittedOptions";


const SubmittedQuestions = ({ questions, quizId, creator }) => {
    const [state] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log(state.answer, "To submit to form");
        console.log(currentUserData.currentUser);
    }, [state]);

    const [submitAnswers] = useMutation(SUBMIT_ANSWERS, {
        onError: err => console.log(err),
    });
    const { data: currentUserData } = useQuery(CURRENT_USER);
    function handleSubmit(e) {
        e.preventDefault();
        submitAnswers({
            variables: {
                quizId,
                options: state.answer
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{index + 1}. {question.question}</h3>
                    <SubmittedOptions options={question.options} question={question.id} questionIndex={index} isCreator={question.quizCreator} />
                </div>
            ))}
            {currentUserData.currentUser
                ? currentUserData.currentUser.id === creator
                    ? null
                    : <input type="submit" value="Submit Answers" className="submit-answers-button auth-submit-button" />
                : null}
        </form>
    )
};

export default SubmittedQuestions;

