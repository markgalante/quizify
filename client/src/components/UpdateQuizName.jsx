import React, { useState } from "react";
import { UPDATE_QUIZ } from "../graphql/mutations";
import { QUIZ, GET_QUIZZES } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { showQuizEdit } from "../cache"; 

const UpdateQuizName = ({ title, id, creator }) => {
    const [updateQuiz] = useMutation(UPDATE_QUIZ);
    const [newTitle, setTitle] = useState(title);
    function handleSubmit(e) {
        e.preventDefault();
        updateQuiz({
            variables: {
                id,
                title: newTitle,
                creator
            },
            refetchQueries: [
                {
                    query: QUIZ,
                    variables: { id }
                },
                { query: GET_QUIZZES }
            ], 
        });
        showQuizEdit(false); 
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setTitle(e.target.value)} value={newTitle || ""} />
            <button type="submit">Edit</button>
        </form>
    );
};

export default UpdateQuizName; 