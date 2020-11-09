import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_QUESTION } from "../graphql/mutations";
import { QUESTION_LIST } from "../graphql/queries";
import { useParams } from "react-router-dom";

const UpdateQuestion = ({ question, questionId, editQuestion }) => {
    const params = useParams();
    const [updateQuestion] = useMutation(UPDATE_QUESTION);
    const [updatedQuestion, setQuestion] = useState(question);
    
    function handleSubmit(e) {
        e.preventDefault();
        updateQuestion({
            variables: {
                id: questionId,
                question: updatedQuestion,
            },
            refetchQueries: [{ query: QUESTION_LIST, variables: { id: params.id } }]
        });
        editQuestion = false;
        setQuestion("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={updatedQuestion || ""} onChange={e => setQuestion(e.target.value)} />
        </form>
    );
};

export default UpdateQuestion; 