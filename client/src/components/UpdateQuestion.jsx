import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_QUESTION } from "../graphql/mutations";
import { QUESTION_LIST } from "../graphql/queries";

const UpdateQuestion = ({ question, id, editQuestion }) => {
    const [updateQuestion] = useMutation(UPDATE_QUESTION);
    const [updatedQuestion, setQuestion] = useState(question);
    function handleSubmit(e) {
        console.log({question, editQuestion});
        e.preventDefault();
        updateQuestion({
            variables: {
                id,
                question: updatedQuestion,
            },
            refetchQueries: [{ query: QUESTION_LIST, variables: { id } }]
        });
        editQuestion = false;
        setQuestion("");
        console.log({question, id, editQuestion}); 
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={updatedQuestion || ""} onChange={e => setQuestion(e.target.value)} />
        </form>
    );
};

export default UpdateQuestion; 