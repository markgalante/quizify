import { useQuery } from "@apollo/client";
import React from "react";
import { GET_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";

const QuizList = () => {
    const { loading, data, error } = useQuery(GET_QUIZZES);
    if (loading) console.log("loading")
    if (data) console.log({ data });
    if (error) console.log({ error });

    return (
        <div className="quiz-list">
            {
                loading
                    ? (<LoadingSpinner />)
                    : error
                        ? <Error />
                        : <ul>
                            {
                                data.quizes.map(quiz => (
                                    <li key={quiz.id}>{quiz.title}</li>
                                ))
                            }
                        </ul>
            }
        </div>
    )
};

export default QuizList; 