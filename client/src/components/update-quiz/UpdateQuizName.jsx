import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { UPDATE_QUIZ } from "../../graphql/mutations";
import { QUIZ, CURRENT_USER } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";

const UpdateQuizName = ({ title, setEdit }) => {
    const match = useRouteMatch();
    const { data: userData } = useQuery(CURRENT_USER);
    const [updateQuiz] = useMutation(UPDATE_QUIZ, {
        onError: err => console.log({ err })
    });

    const [newTitle, setTitle] = useState(title);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userData) setUser(userData.currentUser);
    }, [user, setUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateQuiz({
            variables: {
                id: match.params.id,
                title: newTitle,
                creator: user.id
            },
            refetchQueries: [
                {
                    query: QUIZ,
                    variables: { id: match.params.id }
                }
            ],
        });
        setEdit(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setTitle(e.target.value)} value={newTitle || ""} />
            <button type="submit">Edit</button>
        </form>
    );
};

export default UpdateQuizName;