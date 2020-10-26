import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUIZ } from "../graphql/mutations";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [createQuiz, { data, error }] = useMutation(CREATE_QUIZ);
    function handleSubmit(e) {
        e.preventDefault();
        createQuiz({
            variables: {
                title,
                creatorId: "5f9400bfa74aa73a3cee98ac",
            }
        });
        setTitle('');
        if (error) console.log(error)
        console.log({ data, error });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setTitle(e.target.value)} required/>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz; 
