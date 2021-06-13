import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SUBMITTED_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import { useHistory } from "react-router-dom";
import QuizCard from "./QuizCard";

const QuizList = () => {
    //Using useQuery above useState only causes useEffect to run once. 
    const { loading, data, error } = useQuery(SUBMITTED_QUIZZES);
    const [quizzes, setQuizzes] = useState(null);
    const [pageLoading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);

    useEffect(() => {
        if (!loading) setLoading(false);
        if (error) setError(error);
        if (data) setQuizzes(data.submittedQuizzes);
    }, [loading, data, error, quizzes]);

    return (
        <div className="quiz-list">
            {pageLoading
                ? (<LoadingSpinner />)
                : fetchError
                    ? <Error message={error.message} />
                    :
                    quizzes ?
                        <div className="quiz-list" >
                            <ul className="quiz-list-element">
                                <QuizCard quizList={quizzes} />
                            </ul>
                        </div>
                        : null}
        </div>
    );
};

export default QuizList;