import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION, UPDATE_QUESTION } from "../graphql/mutations";
import { QUIZ_OF_USER } from "../graphql/queries";

const SubmitQuestion = (props) => {
    const match = useRouteMatch();
    const [updateQuestion] = useMutation(UPDATE_QUESTION, {
        onCompleted: () => console.log("Completed updateQuestion mutation"),
        onError: err => console.log({ err }),
    });
    const [addQuestion] = useMutation(ADD_QUESTION);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        for (let i = 0; i < props.options.length; i++) {
            if (props.options[i].isCorrect) setDisabled(false);
        }
        if (!props.options.length) setDisabled(true);
    }, [props.options, disabled, setDisabled]);

    function handleSubmit() {
        if (props.task === "EditQuestion") {
            updateQuestion({
                variables: {
                    question: props.question,
                    questionId: props.questionId,
                    options: props.options,
                    creator: props.creator.id
                },
                refetchQueries: [{ query: QUIZ_OF_USER, variables: { id: match.params.id } }]
            });
            props.setEditQuestion(false);
        }
        if (props.task === "AddQuestion") {
            addQuestion({
                variables: {
                    question: props.question,
                    quizId: props.quizId,
                    creator: props.creator.id,
                    options: props.options,
                },
                refetchQueries: [{ query: QUIZ_OF_USER, variables: { id: props.quizId } }]
            });
        }

    };

    return (
        <>
            {disabled
                ? <button disabled>Choose Correct Option</button>
                : <button onClick={handleSubmit}>Submit Question</button>}
        </>
    );
};

export default SubmitQuestion;