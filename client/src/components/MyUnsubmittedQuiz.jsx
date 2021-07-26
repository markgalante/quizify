import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUIZ_OF_USER, CURRENT_USER } from "../graphql/queries";

//React-Router
import { useRouteMatch } from "react-router-dom";

//Components 
import LoadingSpinner from "./LoadingSpinner";
import Questions from "./unsubmitted-quiz/Questions";
import QuizTitle from "./unsubmitted-quiz/QuizTitle"; 

//Style: 
import "../styles/quiz.css"; 

const MyUnsubmittedQuiz = () => {
    const match = useRouteMatch();
    const { data: userData } = useQuery(CURRENT_USER);
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUIZ_OF_USER, { variables: { id: match.params.id } });

    const [questions, setQuestions] = useState(null);
    const [title, setTitle] = useState(null);
    const [creator, setCreator] = useState(null);
    const [quizId, setQuizId] = useState(null);

    useEffect(() => {
        console.log({ quizData });
        console.log({ creator })
        if (quizData) {
            setQuestions(quizData.quizOfUser.questions);
            setTitle(quizData.quizOfUser.title);
            setCreator(quizData.quizOfUser.creator);
            setQuizId(quizData.quizOfUser.id);
        };
    }, [userData, creator, questions, setQuestions, quizData, quizLoading, quizError, title, setTitle, creator, setCreator, quizId, setQuizId]);

    switch (quizLoading) {
        case true:
            return <LoadingSpinner />;
        case false:
            if (!questions) {
                return <p>Error</p>
            } else {
                return (
                    <div className="quiz-container">
                        <QuizTitle title={title} creator={creator} />
                        <Questions questions={questions} creator={creator} quizId={quizId} />
                    </div>);
            };
    };
};

export default MyUnsubmittedQuiz;