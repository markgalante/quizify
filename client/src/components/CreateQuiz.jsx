import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import PopulateQuiz from "./PopulateQuiz";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_QUIZ } from "../graphql/mutations";
import { GET_QUIZZES, CURRENT_USER, QUIZ } from "../graphql/queries";
import Error from "./Error";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [quizId, setQuizId] = useState(null);

    const [createQuiz, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_QUIZ, {
        onCompleted: data => { setQuizId(data.createQuiz.id) },
        onError: error => console.log(`Error getting data back ${error}`)
    });
    const { data: userData } = useQuery(CURRENT_USER);
    const { data: quizData, loading: quizLoading } = useQuery(QUIZ, { variables: { id: quizId } });

    // useEffect(() => {
    // }, [quizId, quizData]);

    function handleSubmit(e) {
        e.preventDefault();
        createQuiz({
            variables: {
                title,
                creatorId: userData.currentUser.id,
            },
            refetchQueries: [{ query: GET_QUIZZES }],
        });
        setTitle('');
    }

    useEffect(() => {
        setTitle('');
    }, []);

    return (
        <>
            {
                !quizId
                    ? (
                        <form onSubmit={handleSubmit}>
                            <input type="text" onChange={e => setTitle(e.target.value)} value={title} required />
                            <button type="submit">Create Quiz</button>
                        </form>
                    )
                    : null
            }

            {
                mutationError
                    ? <Error message={mutationError.message} />
                    : null
            }
            {
                mutationLoading
                    ? <LoadingSpinner />
                    : null
            }
            {
                quizLoading
                    ? <LoadingSpinner />
                    : quizData
                        ? <PopulateQuiz quizData={quizData} />
                        : null
            }
        </>
    );
};

export default CreateQuiz; 
