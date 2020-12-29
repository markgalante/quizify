import React from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../graphql/mutations";
import { QUIZ } from "../graphql/queries";

const SubmitQuestion = (props) => {
    const [addQuestion] = useMutation(ADD_QUESTION);
    const history = useHistory();
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
        <button onClick={submitQuestion}>Submit Question</button>
    );
};

export default SubmitQuestion; 