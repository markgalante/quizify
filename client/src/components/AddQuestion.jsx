import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../graphql/mutations";
import { QUESTION_LIST } from "../graphql/queries"

const AddQuestion = ({ id }) => {
    const [question, setQuestion] = useState('');
    const [addQuestion] = useMutation(ADD_QUESTION);
    function handleSubmit(e) {
        e.preventDefault();
        addQuestion({
            variables: {
                question,
                quizId: id
            },
            refetchQueries: [{
                query: QUESTION_LIST,
                variables: { id: id },
            }]
        });
        setQuestion('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Add question</label>
                <input id="question" onChange={e => setQuestion(e.target.value)} value={question} required />
                <button type="submit">Add Question</button>
            </form>
        </div>
    )
};

export default AddQuestion; 