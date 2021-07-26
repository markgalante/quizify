import React, { useState, useEffect } from "react";

//Stylesheet:
import "../styles/quiz.css";

//React-Router
import { useRouteMatch } from "react-router-dom";

//GraphQL
import { useQuery } from "@apollo/client";
import { QUIZ, QUIZ_OF_USER } from "../graphql/queries";

//Components 
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubmittedQuestions from "./SubmittedQuestions";

const SubmittedQuiz = () => {
    const match = useRouteMatch();
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUIZ, { variables: { id: match.params.id } });
    const { data: quizOfUserData, loading: quizOfUserLoading, error: quizOfUserError } = useQuery(QUIZ_OF_USER, { variables: { id: match.params.id } });
    const [quiz, setQuiz] = useState(null);


    useEffect(() => {
        if (quizData) setQuiz(quizData.quiz);
        if (quizOfUserData) setQuiz(quizOfUserData.quizOfUser);
    }, [quizData, quizOfUserData, quiz, setQuiz])

    return (
        <>
            {quizLoading || quizOfUserLoading
                ? <LoadingSpinner />
                : quizError
                    ? <Error message={quizError.message} />
                    : null}
            {quiz
                ? (<div className="quiz-container">
                    <h1>{quiz.title}</h1>
                    <p>{quiz.creator.email}</p>
                    <SubmittedQuestions questions={quiz.questions} quizId={quiz.id} creator={quiz.creator.id} />
                </div>)
                : null}
        </>
    );
};

export default SubmittedQuiz;