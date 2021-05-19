import React, { useState, useEffect } from "react";

//React-Router
import { useRouteMatch } from "react-router-dom";

//GraphQL
import { useQuery } from "@apollo/client";
import { QUIZ } from "../graphql/queries";

//Components 
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubmittedQuestions from "./SubmittedQuestions";

const SubmittedQuiz = () => {
    const match = useRouteMatch();
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUIZ, { variables: { id: match.params.id } });
    const [quiz, setQuiz] = useState(null);


    useEffect(() => {
        if (quizData) setQuiz(quizData.quiz);
    }, [quizData, quiz, setQuiz])

    return (
        <>
            {quizLoading
                ? <LoadingSpinner />
                : quizError
                    ? <Error />
                    : null}
            {quiz
                ? (<div>
                    <h1>{quiz.title}</h1>
                    <SubmittedQuestions questions={quiz.questions} quizId={quiz.id} />
                </div>)
                : null}
        </>
    );
};

export default SubmittedQuiz;