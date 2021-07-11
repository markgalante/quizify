import React, { useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "./submitQuiz/SubmitQuizReducer";

const SubmittedOptions = ({ options, question, questionIndex, isCreator }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        // console.log({ answer });
        dispatch({ type: "ADD_ANSWER", payload: answer });
    }, [answer, setAnswer]);

    function selectAnswer(option, index) {
        setAnswer({
            index: questionIndex,
            option: option.option,
        });
    };

    return (
        <div>
            {
                options.map((option, index) => (
                    <div key={index}>
                        <input type="radio" value={option.option} name={question} onChange={() => selectAnswer(option, index)} checked={isCreator && option.isCorrect} />
                        <label>{option.option}</label>
                    </div>
                ))
            }
        </div>
    )
};

export default SubmittedOptions;