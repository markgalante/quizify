import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../graphql/mutations";
import { QUIZ } from "../graphql/queries";

const SubmitQuestion = (props) => {
    const [addQuestion] = useMutation(ADD_QUESTION);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    useEffect(() => {
        for (let i = 0; i < props.options.length; i++) {
            if (props.options[i].isCorrect) setDisabled(false);
        }
        if (!props.options.length) setDisabled(true);
    }, [props.options, disabled, setDisabled]);

    function submitQuestion() {
        addQuestion({
            variables: {
                question: props.question,
                quizId: props.id,
                creator: props.creator,
                options: props.options,
            },
            refetchQueries: [{ query: QUIZ, variables: { id: props.id } }]
        });
        history.push(`/${props.id}`);
    };

    return (
        <>
            {
                disabled
                    ? <button disabled>Choose Correct Option</button>
                    : <button onClick={submitQuestion}>Submit Question</button>
            }
        </>
    );
};

export default SubmitQuestion; 