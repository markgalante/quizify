import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../graphql/mutations"

const AddQuestion = ({ id }) => {
    const [question, setQuestion] = useState('');
    const [addQuestion, { data }] = useMutation(ADD_QUESTION);
    function handleSubmit(e) {
        e.preventDefault();
        addQuestion({
            variables: {
                question,
                quizId: id
            }
        });
        setQuestion(''); 
    };
    console.log({ data })
    console.log({ question, addQuestion })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Add question</label>
                <input id="question" onChange={e => setQuestion(e.target.value)} />
                <button type="submit">Add Question</button>
            </form>
        </div>
    )
};

export default AddQuestion; 