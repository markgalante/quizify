import React, { useEffect, useReducer } from "react";

//GraphQL: 
import { useMutation } from "@apollo/client";
import { SUBMIT_ANSWERS } from "../graphql/mutations"

import { reducer, initialState } from "./submitQuiz/SubmitQuizReducer"

import SubmittedOptions from "./SubmittedOptions";


const SubmittedQuestions = ({ questions, quizId }) => {
    const [state] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log(state.answer, "To submit to form");
    }, [state]);

    const [submitAnswers] = useMutation(SUBMIT_ANSWERS, {
        onError: err => console.log(err),
    })
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
            {
                questions.map((question, index) => (
                    <div key={index}>
                        <h3>{index + 1}. {question.question}</h3>
                        <SubmittedOptions options={question.options} question={question.id} questionIndex={index} />
                    </div>
                ))
            }
            <input type="submit" value="Submit Answers" />
        </form>
    )
};

export default SubmittedQuestions;

